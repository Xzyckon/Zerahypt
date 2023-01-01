var X : float = 0;
var Y : float = 0;
var Z : float = 0;

var COMFix : boolean = true;
var Configuring : boolean;

var WeightFix : boolean;

function Start () {

if(WeightFix){
rigidbody.useGravity = false;
}

if(COMFix){
Configuring = true;

yield WaitForSeconds (2);

if(!WeightFix){
Destroy(this);
}else{
Configuring = false;
}

}

}

function FixedUpdate () {

if(WeightFix)
rigidbody.AddForce(Vector3(0.0, -0.2, 0.0), ForceMode.VelocityChange);

if(Configuring)
rigidbody.centerOfMass = Vector3(X, Y, Z);

}

function OnJointBreak(breakForce : float) {
Destroy(this);
}