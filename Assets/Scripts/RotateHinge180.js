#pragma strict
var MainVessel: Transform;
var Rotated : boolean;

var Mirrored : boolean;

var OneHundredDeg : boolean;

function Start () {

}

function Update () {
if(WorldInformation.playerCar.Contains(MainVessel.name)){
if(Input.GetKeyDown("x") && !Rotated)
Rotated = true;
else if(Input.GetKeyDown("x") && Rotated)
Rotated = false;
}
}

function FixedUpdate () {
if(!OneHundredDeg){
if(Rotated && gameObject.hingeJoint.spring.targetPosition < 180)
gameObject.hingeJoint.spring.targetPosition += 4;
if(!Rotated && gameObject.hingeJoint.spring.targetPosition > 0)
gameObject.hingeJoint.spring.targetPosition -= 4;
}else{
if(!Mirrored){
if(Rotated && gameObject.hingeJoint.spring.targetPosition < 100)
gameObject.hingeJoint.spring.targetPosition += 1;
if(!Rotated && gameObject.hingeJoint.spring.targetPosition > 0)
gameObject.hingeJoint.spring.targetPosition -= 1;
}else{
if(Rotated && gameObject.hingeJoint.spring.targetPosition > -100)
gameObject.hingeJoint.spring.targetPosition -= 1;
if(!Rotated && gameObject.hingeJoint.spring.targetPosition < 0)
gameObject.hingeJoint.spring.targetPosition += 1;
}
}
}