#pragma strict

var VesselTF : Transform;
var VesselRB : Rigidbody;

var ForwardForce : float = 70;
var TurnForce : float = 40;
var ReverseForce : float = 40;

var statForce : float = 70;
var statTurnForce : float = 70;
var statReverseForce : float = 70;

var ForwardPivotAngle : float = 0;
var LeftPivotAngle : float = 0;
var RightPivotAngle : float = 0;
var ReversePivotAngle : float = 0;

var OnlyMove : boolean;

var OnlyDirVelRot : boolean;
var UseDirVelRot : boolean;
var ZDirVelRot : float = 0.5;

var ForceDelay : boolean;
var DelaySpeed : float = 0.5;

var RunningW : boolean;
var RunningA : boolean;
var RunningD : boolean;
var RunningS : boolean;

function Start () {
statForce = ForwardForce;
statTurnForce = TurnForce;
statReverseForce = ReverseForce;
}

function Update () {

if(WorldInformation.playerCar == transform.parent.name){
if(CameraScript.InInterface == false){
if(WorldInformation.playerCar.Contains ("broken"))
Destroy(this);

if(Input.GetKeyDown("w")){
			RunningW = true;
			if(ForceDelay)
			ForwardForce = 0;
			}
if(Input.GetKeyUp("w"))
			RunningW = false;
			
if(Input.GetKeyDown("a")){
			RunningA = true;
			if(ForceDelay && LeftPivotAngle > 0){
			TurnForce = 0;
			ForwardForce = 0;
			}
			}
if(Input.GetKeyUp("a")){
			RunningA = false;
			if(ForceDelay)
			ForwardForce = 0;
			}
			
if(Input.GetKeyDown("d")){
			RunningD = true;
			if(ForceDelay && RightPivotAngle > 0){
			TurnForce = 0;
			ForwardForce = 0;
			}
			}
if(Input.GetKeyUp("d")){
			RunningD = false;
			if(ForceDelay)
			ForwardForce = 0;
			}
			
if(Input.GetKeyDown("s")){
			RunningS = true;
			if(ForceDelay)
			ReverseForce = 0;
			}
if(Input.GetKeyUp("s"))
			RunningS = false;

}
}

	if(!OnlyDirVelRot){
	
	        hingeJoint.spring.targetPosition = 0;
	
	    if(RunningW)
            hingeJoint.spring.targetPosition = ForwardPivotAngle;
	
        if(RunningA)
            hingeJoint.spring.targetPosition = LeftPivotAngle;

		if(RunningD)
			hingeJoint.spring.targetPosition = RightPivotAngle;

		if(RunningS)
			hingeJoint.spring.targetPosition = ReversePivotAngle;

    }
}

function FixedUpdate () {

if(ForceDelay){
if(ForwardForce < statForce)
ForwardForce += DelaySpeed;
if(TurnForce < statTurnForce)
TurnForce += DelaySpeed;
if(ReverseForce < statReverseForce)
ReverseForce += DelaySpeed;
}

	if(!OnlyMove && !OnlyDirVelRot){
	
		if(RunningA)
			rigidbody.AddForce(transform.right * -TurnForce);
			
		if(RunningD)
			rigidbody.AddForce(transform.right * -TurnForce);
			
		if(RunningS)
			rigidbody.AddForce(transform.right * -ReverseForce);
	
		if(RunningW && !RunningA && !RunningD)
			rigidbody.AddForce(transform.right * -ForwardForce);
  }
  
  if(UseDirVelRot){
  var localV = VesselTF.InverseTransformDirection(VesselRB.velocity);
  if(localV.z < 10 && -localV.z < 10)
  hingeJoint.spring.targetPosition = localV.z * ZDirVelRot;
  }
}