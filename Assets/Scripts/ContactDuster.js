#pragma strict

var targetLayers : LayerMask;

var VelSource : GameObject;

var Beige : boolean;
var Pale : boolean;

var Contact : boolean;
var ContactDist : float = 2;
var MagnitudeValue : float = 30;
var EmissionRate : float = 100;

var xValue : float;

var speed : float;

var Stop : boolean;

function Start () {
if(Pale && WorldInformation.instance.AreaBeige == true)
Destroy(gameObject);
if(Beige && WorldInformation.instance.AreaGray == true)
Destroy(gameObject);
if(WorldInformation.instance.AreaDark == true)
Destroy(gameObject);
particleSystem.emissionRate = 0;
}

function Update () {
if(!Stop){

if(VelSource)
xValue = VelSource.rigidbody.velocity.magnitude / MagnitudeValue;
else
xValue = 0;

speed = xValue;

if (Physics.Raycast (transform.position + Vector3(0,1,0), transform.up, ContactDist, targetLayers)) {
		Contact = true;
		} else {
		Contact = false;
		}

	if(speed > 0.3){													
		if(particleSystem.emissionRate < EmissionRate && Contact == true){
		particleSystem.emissionRate += 5;
}
}
	if(speed > 0.1 ){
	    if(particleSystem.emissionRate < EmissionRate && Contact == true){
		particleSystem.emissionRate += 1;
}
}
    if(speed < 0.1 ){
		particleSystem.emissionRate -= 5;
}
    if(Contact == false){
		particleSystem.emissionRate -= 20;
}

    if(particleSystem.emissionRate < 0){
		particleSystem.emissionRate = 0;


}
}else{
particleSystem.emissionRate = 0;
}
}