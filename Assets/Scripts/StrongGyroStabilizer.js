var target : GameObject;

var targetRB : Rigidbody;

var force = 10.0;

var offset = 1.0;

var Up : boolean = true;
var Forward : boolean = false;
var Right : boolean = false;

var UseAxialDamper : boolean;
var AxialDamperMod = 1.0;

function Start (){
targetRB = target.rigidbody;
}

function FixedUpdate (){

if(Up == true){
    targetRB.AddForceAtPosition(Vector3.up*force, transform.up*offset);
    targetRB.AddForceAtPosition(-Vector3.up*force, -transform.up*offset);
}

if(Forward == true){
    targetRB.AddForceAtPosition(Vector3.forward*force, transform.forward*offset);
    targetRB.AddForceAtPosition(-Vector3.forward*force, -transform.forward*offset);
}

if(Right == true){
    targetRB.AddForceAtPosition(Vector3.right*force, transform.forward*offset);
    targetRB.AddForceAtPosition(-Vector3.right*force, -transform.forward*offset);
}

if(UseAxialDamper){
var LAV = transform.InverseTransformDirection(targetRB.angularVelocity);
targetRB.AddTorque(transform.forward * -LAV.z * AxialDamperMod);
targetRB.AddTorque(transform.right * -LAV.x * AxialDamperMod);
}

}