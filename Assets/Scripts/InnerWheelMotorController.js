#pragma strict

var Force : float = 1;
var BreakForce : float = 1;
var Tvelocity : float = 1500;
var RTvelocity : float = 1500;
var LeftTvelocity : float = 1500;
var RightTvelocity : float = 1500;
var breaksOn : boolean;

function Start () {
hingeJoint.spring.damper = BreakForce;
}

function Update () {
if(WorldInformation.playerCar == transform.parent.parent.name){
ParkBrake();
SWBreak();
if(breaksOn == false){
if(Input.GetKey("w")){
        hingeJoint.motor.force = Force;
        hingeJoint.motor.targetVelocity = Tvelocity;
}
if(Input.GetKeyUp("w")){
        hingeJoint.motor.force = 0;
        hingeJoint.motor.targetVelocity = Tvelocity;
}
if(Input.GetKey("s")){
        hingeJoint.motor.force = Force;
        hingeJoint.motor.targetVelocity = RTvelocity;
}
if(Input.GetKeyUp("s")){
        hingeJoint.motor.force = 0;
        hingeJoint.motor.targetVelocity = RTvelocity;
}
if(Input.GetKey("a")){
        hingeJoint.motor.force = Force;
        hingeJoint.motor.targetVelocity = LeftTvelocity;
}
if(Input.GetKeyUp("a")){
        hingeJoint.motor.force = 0;
        hingeJoint.motor.targetVelocity = LeftTvelocity;
}
if(Input.GetKey("d")){
        hingeJoint.motor.force = Force;
        hingeJoint.motor.targetVelocity = RightTvelocity;
}
if(Input.GetKeyUp("d")){
        hingeJoint.motor.force = 0;
        hingeJoint.motor.targetVelocity = RightTvelocity;
}
}
}
}

function SWBreak () {
    if(Input.GetKey("s") && Input.GetKey("w")){
    breaksOn = true;
        hingeJoint.motor.force = 0;
        hingeJoint.motor.force = 0;
        hingeJoint.spring.damper = BreakForce;
        }
}

function ParkBrake () {
   if(Input.GetKeyDown(KeyCode.P)){
        if(breaksOn == true){
            breaksOn = false;
            hingeJoint.motor.force = 0;
            hingeJoint.spring.damper = 0;
        } else {
            breaksOn = true;
            hingeJoint.motor.force = 0;
            hingeJoint.spring.damper = BreakForce;
        }
    }
}