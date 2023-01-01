var Fin1 : GameObject;
var Fin2 : GameObject;
var FinR1 : GameObject;
var FinR2 : GameObject;

var isBigPloon : boolean;

var BurnEffect : GameObject;
var Clicker : GameObject;
var Armature : GameObject;
var ArmaMesh : GameObject;

var WeightTF : Transform;
var WeightRB : Rigidbody;

var Strength : float = 0.004;

var MinHeight : float = 2;
var MaxHeight : float = 10;

var FlapStrength : float = 0.1;
var RearFlapStrength : float = 0.1;

var lastVelocity : float;
var lastTVelocity : float;
var Gs : float;
var TGs : float;

var Burning : boolean;

var Tick : boolean;

var FlapUp : boolean;
var FlapDown : boolean;
var Distress : boolean;

function OnCollisionEnter(other : Collision) {
if(other.gameObject.name.Contains ("TFC")){
rigidbody.angularDrag = 1;
rigidbody.drag = 5;
Burn();
}
}

function FixedUpdate () {

if(Burning && Armature != null){

if(Armature.transform.localScale.x < 0.03){
Destroy(Armature);
Destroy(ArmaMesh);
}

if(Armature.transform.localScale.x > 0.02)
Armature.transform.localScale -= new Vector3(0.01, 0.01, 0.01);
}

if(Burning)
return;

var acceleration = (rigidbody.velocity.magnitude - lastVelocity) / Time.deltaTime;
    lastVelocity = rigidbody.velocity.magnitude;
    
    Gs = Mathf.Abs(acceleration);
    
var Tacceleration = (rigidbody.angularVelocity.magnitude - lastTVelocity) / Time.deltaTime;
    lastTVelocity = rigidbody.angularVelocity.magnitude;
    
    TGs = Mathf.Abs(Tacceleration);
    
    if(TGs > 400){
    Burn();
    }

    if(Gs > 1000 && TGs < 400){
    Burn();
    }

if (Physics.Raycast (transform.position + Vector3(0,0,0), transform.forward, 8)) {
		Distress = true;
		} else {
		Distress = false;
		}

if(Tick == false){
if(isBigPloon)
FlapBig();
else
Flap();
}

if(!Distress){

if(FlapDown){
Fin1.rigidbody.AddTorque(Fin1.transform.right * FlapStrength);
Fin2.rigidbody.AddTorque(Fin2.transform.right * FlapStrength);
if(isBigPloon){
FinR1.rigidbody.AddTorque(FinR1.transform.right * -RearFlapStrength);
FinR2.rigidbody.AddTorque(FinR2.transform.right * -RearFlapStrength);
}
}

if(FlapUp){
Fin1.rigidbody.AddTorque(Fin1.transform.right * -FlapStrength);
Fin2.rigidbody.AddTorque(Fin2.transform.right * -FlapStrength);
if(isBigPloon){
FinR1.rigidbody.AddTorque(FinR1.transform.right * RearFlapStrength);
FinR2.rigidbody.AddTorque(FinR2.transform.right * RearFlapStrength);
}
}

}else{

if(FlapDown){
Fin1.rigidbody.AddTorque(Fin1.transform.right * 0.003);
Fin2.rigidbody.AddTorque(Fin2.transform.right * 0.003);
if(isBigPloon){
FinR1.rigidbody.AddTorque(FinR1.transform.right * 0.003);
FinR2.rigidbody.AddTorque(FinR2.transform.right * 0.003);
}
}

if(FlapUp){
Fin1.rigidbody.AddTorque(Fin1.transform.right * -0.003);
Fin2.rigidbody.AddTorque(Fin2.transform.right * 0.003);
if(isBigPloon){
FinR1.rigidbody.AddTorque(FinR1.transform.right * -0.003);
FinR2.rigidbody.AddTorque(FinR2.transform.right * 0.003);
}
}

}

if(Physics.Raycast (WeightTF.position, WeightTF.up, MaxHeight))
WeightRB.AddForce(WeightTF.up * 0);
else
WeightRB.AddForce(WeightTF.up * Strength);

if(Physics.Raycast (WeightTF.position, WeightTF.up, MinHeight)) 
WeightRB.AddForce(WeightTF.up * -Strength);

}

function Burn () {
if(!Burning){
Burning = true;
var TheThing = Instantiate(BurnEffect, transform.position, transform.rotation);
    TheThing.transform.parent = gameObject.transform;
Destroy(Clicker);
yield WaitForSeconds (12);
Destroy(gameObject);
}
}

function Flap () {

var Interval : float = Random.Range(0, 2);

Tick = true;
FlapDown = true;
FlapUp = false;
yield WaitForSeconds (1);

if(Clicker)
Clicker.audio.Play();

FlapDown = false;
FlapUp = true;
yield WaitForSeconds (1);
FlapUp = false;
yield WaitForSeconds (Interval);
Tick = false;
}

function FlapBig () {

var Interval : float = Random.Range(0, 0.5);

if(Clicker)
Clicker.audio.Play();

Tick = true;
FlapDown = true;
FlapUp = false;
yield WaitForSeconds (1.5);
FlapDown = false;
FlapUp = true;
yield WaitForSeconds (1.5);
FlapUp = false;
yield WaitForSeconds (Interval);
Tick = false;
}