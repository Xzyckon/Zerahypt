#pragma strict

var RayStart : float = 0.2;
var RayEnd : float = 0.2;

var Pad : Transform;
var PadGO : GameObject;

var Attached : boolean;

var JackJoint : ConfigurableJoint;
var JackArm : HingeJoint;

var targetLayers : LayerMask;

function Start () {

}

function Update () {

var hit : RaycastHit;
if(!Attached){
          Debug.DrawRay (Pad.position + Pad.forward * RayStart, Pad.forward * RayEnd, Color.white);
	if (Physics.Raycast (Pad.position + Pad.forward * RayStart, Pad.forward, hit, RayEnd, targetLayers)){
	if(hit.rigidbody){
	
	Attached = true;
	
	JackJoint = PadGO.AddComponent ("ConfigurableJoint");
    JackJoint.connectedBody = hit.rigidbody;
    JackJoint.xDrive.mode = JointDriveMode.Position;
    JackJoint.yDrive.mode = JointDriveMode.Position;
    JackJoint.zDrive.mode = JointDriveMode.Position;
    JackJoint.angularXDrive.mode = JointDriveMode.Position;
    JackJoint.angularYZDrive.mode = JointDriveMode.Position;
   
    JackJoint.xDrive.positionSpring = 10000;
    JackJoint.yDrive.positionSpring = 10000;
    JackJoint.zDrive.positionSpring = 0.001;
    
    JackJoint.angularXDrive.positionSpring = 10000;
    JackJoint.angularYZDrive.positionSpring = 10000;
   
    JackJoint.xDrive.positionDamper = 1;
    JackJoint.yDrive.positionDamper = 1;
    JackJoint.zDrive.positionDamper = 1;
    
    JackJoint.angularXDrive.positionDamper = 1;
    JackJoint.angularYZDrive.positionDamper = 1;
    
    JackJoint.enableCollision = true;
    }
}

if(JackArm.spring.targetPosition > 0)
JackArm.spring.targetPosition -= 0.1;

}else{

if(JackArm.spring.targetPosition < 15)
JackArm.spring.targetPosition += 0.1;

       Debug.DrawRay (Pad.position + Pad.forward * RayStart, Pad.forward * RayEnd, Color.white);
if (!Physics.Raycast (Pad.position + Pad.forward * RayStart, Pad.forward, hit, RayEnd, targetLayers)){
if(JackJoint){
Attached = false;
Destroy(JackJoint);
}
}

}
}