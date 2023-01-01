var target : Transform;

var thisTransform : Transform;
var thisRB : Rigidbody;

var thrusterTransform : Transform;
var thrusterRB : Rigidbody;

var RayOrigin1 : Transform;
var RayOrigin2 : Transform;
var RayOrigin3 : Transform;
var RayOrigin4 : Transform;

var SFX : AudioSource;
var SFX2 : AudioSource;

var FX1 : ParticleSystem;
var FX2 : ParticleSystem;

var Claw1 : Transform;
var Claw2 : Transform;
var Claw3 : Transform;

var thrusterAngJoint : SpringJoint;

var Force : float;
var StartForce : float;

var AimForce : float;
var TAimForce : float;

var TargetTrace : Transform;
var TargetLead : Transform;

var LeadAmount = 0.08;

var Lead1Time = 0;
var Lead2Time = 0;

var Dist1 : float;
var Dist2 : float;

var isAttached : boolean;

var turningOff : boolean;
var turnedOff : boolean;

var AttachNoise : GameObject;

var theJoint : ConfigurableJoint;

var localHit : Vector3;
var Normrot : Vector3;
var isRotting : boolean;
var Normrotted : boolean;

var targetLayers : LayerMask;
var MtargetLayers : LayerMask;

InvokeRepeating("Ticker", 0.9, 1.3);

function Start () {

if(AgrianNetwork.instance.SubdueTarget)
target = AgrianNetwork.instance.SubdueTarget;
else
target = PlayerInformation.instance.PiriTarget;

thisRB.AddForce(thisTransform.forward * StartForce);

TargetTrace.parent = null;
TargetLead.parent = null;

}

function FixedUpdate () {

if(turnedOff){

if(SFX.volume > 0.1)
SFX.volume = 0.1;
else
SFX.volume -= 0.01;

return;
}

if(isRotting)
thisTransform.rotation = Quaternion.LookRotation(-Normrot);

if(!isAttached){

thisRB.AddForce(thisTransform.forward * Force);

thisRB.AddForceAtPosition((TargetLead.position - thisTransform.position).normalized * AimForce, thisTransform.forward * 1);
thisRB.AddForceAtPosition((TargetLead.position - thisTransform.position).normalized * -AimForce, -thisTransform.forward * 1);

var hit : RaycastHit;

if (Physics.Raycast (thisTransform.position, thisTransform.forward, hit, 2, targetLayers)){

if (!Physics.Raycast (RayOrigin1.position, RayOrigin1.forward, 1, targetLayers) ||
    !Physics.Raycast (RayOrigin2.position, RayOrigin2.forward, 1, targetLayers) ||
    !Physics.Raycast (RayOrigin3.position, RayOrigin3.forward, 1, targetLayers) ||
    !Physics.Raycast (RayOrigin4.position, RayOrigin4.forward, 1, targetLayers))
return;

localHit = hit.point;

thisTransform.position = localHit;

thisRB.constraints = RigidbodyConstraints.FreezeRotationX 
                      | RigidbodyConstraints.FreezeRotationY
                      | RigidbodyConstraints.FreezeRotationZ;

Claw1.localEulerAngles.x = -55;
Claw2.localEulerAngles.x = -55;
Claw3.localEulerAngles.x = -55;

isRotting = true;

isAttached = true;

thrusterAngJoint.maxDistance = 0.9;

thisRB.angularDrag = 1;

Normrot = hit.normal;
Normrotted = true;

Attach(hit.rigidbody, hit.distance);


}
}else{

VelClamp = Mathf.Clamp(thisRB.velocity.magnitude * 0.2,1,12);

if (Physics.Raycast (thisTransform.position, Vector3.down, 64, MtargetLayers)){
thisRB.AddForce(thrusterTransform.forward * Force * VelClamp);
thrusterRB.AddForceAtPosition((thisRB.velocity).normalized * TAimForce, -thrusterTransform.forward * 2);
thrusterRB.AddForceAtPosition((thisRB.velocity).normalized * -TAimForce, thrusterTransform.forward * 2);
}else{
thisRB.AddForce(thrusterTransform.forward * Force * 12);
thrusterRB.AddForceAtPosition(Vector3.up * TAimForce, -thrusterTransform.forward * 2);
thrusterRB.AddForceAtPosition(-Vector3.up * TAimForce, thrusterTransform.forward * 2);
}

}

if(Lead1Time < 1){
Lead1Time = 8;
Lead2Time = 4;
Lead1();
}else{
Lead1Time -= 1;
}

if(Lead2Time < 1){
Lead2Time = 8;
Lead2Time = 4;
Lead2();
}else{
Lead2Time -= 1;
}

}

function Attach (hitV : Rigidbody, hitVDist : float){

thisTransform.position = localHit;

if(Normrotted)
thisTransform.rotation = Quaternion.LookRotation(-Normrot);

theJoint = thisTransform.gameObject.AddComponent ("ConfigurableJoint");
theJoint.connectedBody = hitV.rigidbody;
theJoint.xDrive.mode = JointDriveMode.Position;
theJoint.yDrive.mode = JointDriveMode.Position;
theJoint.zDrive.mode = JointDriveMode.Position;
theJoint.angularXDrive.mode = JointDriveMode.Position;
theJoint.angularYZDrive.mode = JointDriveMode.Position;
   
theJoint.xDrive.positionSpring = 10000;
theJoint.yDrive.positionSpring = 10000;
theJoint.zDrive.positionSpring = 10000;
    
theJoint.angularXDrive.positionSpring = 10000;
theJoint.angularYZDrive.positionSpring = 10000;
   
theJoint.xDrive.positionDamper = 1;
theJoint.yDrive.positionDamper = 1;
theJoint.zDrive.positionDamper = 1;

theJoint.angularXDrive.positionDamper = 1;
theJoint.angularYZDrive.positionDamper = 1;

theJoint.targetPosition = Vector3(0,0,0.75);

gameObject.layer = 23;

var TheThing2 = Instantiate(AttachNoise, thisTransform.position, thisTransform.rotation);
	TheThing2.transform.parent = thisTransform;
	
thisTransform.position = localHit;

if(Normrotted)
thisTransform.rotation = Quaternion.LookRotation(-Normrot);

Rotting();

}

function Rotting (){

thisRB.constraints = RigidbodyConstraints.None;

thisRB.useGravity = true;

isRotting = false;

AgrianNetwork.TargetSubdual += 1;

}

function Lead1 (){
if(target)
TargetTrace.position = target.position;
}

function Lead2 (){

if(target){

Dist1 = Vector3.Distance(TargetTrace.position, target.position);

TargetTrace.LookAt(target);

TargetLead.position = TargetTrace.position;
TargetLead.rotation = TargetTrace.rotation;

TargetLead.position += TargetLead.forward * Dist1 * LeadAmount;

}
}

function Ticker () {

if(target)
if(target.name.Contains ("rok")){
if(!turningOff){
turningOff = true;
TurnOff();
}
}

}

function TurnOff () {

yield WaitForSeconds (5);

TargetSubdual = 0;

AgrianNetwork.TargetSubdual = 0;

turnedOff = true;
FX1.Stop();
FX2.Stop();
SFX2.Play();
thisRB.useGravity = true;
thisRB.drag = 0.1;
thisRB.angularDrag = 0.1;

}