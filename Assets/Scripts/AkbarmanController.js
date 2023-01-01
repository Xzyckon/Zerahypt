#pragma strict

var Target : Transform;

var Ani : Animation;

var DeathEffect : GameObject;

var IsOut: boolean;

var AkbarLight : boolean;
var AkbarHeavy : boolean;

var Grounded : boolean;
var Land : boolean;

var targetLayers : LayerMask;

InvokeRepeating("PlayAni", 0.1, Random.Range(0.8, 1));

private var once: boolean;

function Start () {
yield WaitForSeconds (1);
IsOut = true;
yield WaitForSeconds (15);
OldAge();
}

function Update () {
		var fwd = transform.TransformDirection (Vector3.down);
		if (Physics.Raycast (transform.position, fwd, 2.3, targetLayers)) {
			Grounded = true;
			rigidbody.drag = 1;
		}else{
		    Grounded = false;
		    rigidbody.drag = 0.05;
		    Land = false;
		    Ani.CrossFade("AkbarAirborneAni");
		}
		
		if(Land == false && Grounded == true){
		
		if(AkbarLight)
		Ani.CrossFade("AkbarFlailAni1");
		if(AkbarHeavy)
		Ani.CrossFade("Akbar2FlailAni1");
		
		Land = true;
	}
}

function FixedUpdate(){

if (rigidbody.velocity.magnitude > 60 && !once && IsOut) {

once = true;

OldAge();
}

if(Grounded){

if(Target == null){
   rigidbody.AddForce(transform.forward * 1.4);
   }else{
   rigidbody.AddForce(transform.forward * 0.7);
   rigidbody.AddForce((Target.position - transform.position).normalized * 0.7);
   }
   

}
}

function PlayAni () {

if(Grounded == false)
return;

if(AkbarLight){
var randomValue : int = Random.Range(1, 4);

            switch (randomValue) {
    		case 1:
    		Ani.CrossFade("AkbarFlailAni1");
    		break;
    		case 2:
    		Ani.CrossFade("AkbarFlailAni2");
    		break;
    		case 3:
    		Ani.CrossFade("AkbarFlailAni3");
    		break;
    		}
}

if(AkbarHeavy){
var randomValueH : int = Random.Range(1, 3);

            switch (randomValueH) {
    		case 1:
    		Ani.CrossFade("Akbar2FlailAni1");
    		break;
    		case 2:
    		Ani.CrossFade("Akbar2FlailAni2");
    		break;
    		}
}
}

function OldAge(){

Instantiate(DeathEffect, transform.position, transform.rotation);

Destroy(gameObject);

}