var target : Transform;
var Waypoint : Transform;
var Waypoint2 : Transform;
var Ignore : Transform;

var AIAnchor : Transform;
var VantagePoint : Transform;

var TargetTrace : Transform;
var TargetLead : Transform;
var TLCol : SphereCollider;

var thisTransform : Transform;
var thisVTransform : Transform;
var thisCTransform : Transform;

var vRigidbody : Rigidbody;

var VPoint : Transform;
var VPoint2 : Transform;
var SPoint : Transform;
var Trig : CapsuleCollider;

var Gyro : StrongGyroStabilizer;

var RearWing : GameObject;
var TopWing : GameObject;

var VesselRotator : BigVesselRotator;

var AttackSound : GameObject;

var CapRB : Rigidbody;
var CapSFX : AudioSource;
var CapJoint : ConfigurableJoint;

var DistributorRack : GameObject;
var DistributorRackPF : GameObject;

var isDistributing : boolean;

var GroundClear : boolean;

var Pursuing : boolean;

var FoundBig : boolean;
var FoundMedium : boolean;
var FoundSmall : boolean;

var PissedAtTC0a = 0;

var PissedAtTC1 = 0;
var PissedAtTC3 = 0;
var PissedAtTC4 = 0;
var PissedAtTC5 = 0;
var PissedAtTC6 = 0;
var PissedAtTC7 = 0;
var PissedAtTC8 = 0;
var PissedAtTC9 = 0;

var angerLevel = 0;

var WatchTick = 0;

var TrigTick = 0;

var Orbit = 0;

var Stabilize : boolean;

var InView : boolean;

var OnHull : boolean;

var Stop : boolean;

var Obstacle : boolean;
var Reverse : boolean;
var TurnLeft : boolean;
var TurnRight : boolean;
var StrafeLeft : boolean;
var StrafeRight : boolean;
var Downtorque : boolean;
var Uptorque : boolean;

var Upforce : boolean;
var LiftForce : boolean;

var UDist : float;
var DDist : float;

var RightDist : float;
var LeftDist : float;

var VelClamp : float;
var VelClamp2 : float;

var velMag : float;
var angVelMag : float;

var localV : Vector3;

var SlowSpeed = 0;

var VarLength : float;

var targetLayers : LayerMask;

var OtargetLayers : LayerMask;

var MtargetLayers : LayerMask;

var DirForce = 200;

var RayDist = 2;
var ObsDist = 100;

var targDist : float;

var AccelSound : GameObject;
var DecelSound : GameObject;

var DecelOnce : boolean;
var AccelOnce : boolean;

var Tick : boolean;

InvokeRepeating("LeaveMarker", 1, 5);

InvokeRepeating("Regenerator", 1, 0.5);

InvokeRepeating("CalcLead", 1, 0.15);

function Start (){
rigidbody.freezeRotation = true;
target = Waypoint;

velMag = 0.1;

UDist = 2048;
DDist = 2048;

Trig.center = Vector3(0,0,450);
Trig.radius = 500;
Trig.height = 1000;

KabrianLaw.KabrianPolicePresent = true;
}

function Update () {

if(target){
var relativePoint = thisVTransform.InverseTransformPoint(target.position);
FAndB = relativePoint.y;
thisCTransform.position = thisVTransform.position;
var WrelativePoint = thisCTransform.InverseTransformPoint(target.position);
UAndD = WrelativePoint.y;
}

var hit : RaycastHit;
var newRot : Vector3 = (VPoint2.forward * 0.6f ).normalized;

VelClamp = Mathf.Clamp(velMag * 0.01,1,4);

if(velMag > 20)
VPoint.transform.rotation = Quaternion.LookRotation(vRigidbody.velocity);
else
VPoint.transform.rotation = VPoint2.transform.rotation;

Obstacle = false;

TurnRight = false;
TurnLeft = false;

StrafeRight = false;
StrafeLeft = false;

Reverse = false;

Debug.DrawRay (VPoint.position + VPoint.right * RayDist * 0.5, VPoint.forward * ObsDist, Color.red);
Debug.DrawRay (VPoint.position + -VPoint.right * RayDist * 0.5, VPoint.forward * ObsDist, Color.red);
if (Physics.Raycast (VPoint.position + VPoint.right * RayDist * 0.5, VPoint.forward, ObsDist, MtargetLayers)
 || Physics.Raycast (VPoint.position + -VPoint.right * RayDist * 0.5, VPoint.forward, ObsDist, MtargetLayers))
		Obstacle = true;
	
Debug.DrawRay (VPoint2.position, VPoint2.forward * 40, Color.red);
if (Physics.Raycast (VPoint2.position, VPoint2.forward, hit, 40, MtargetLayers))
		Reverse = true;
		
if(velMag > 64)
ObsDist = velMag;
else
ObsDist = 64;

if(velMag > 16){
Debug.DrawRay (VPoint2.position + -VPoint2.forward * 10 + -VPoint2.up * 4 + VPoint2.right * RayDist, VPoint2.forward * velMag, Color.black);
if (Physics.Raycast (VPoint2.position + -VPoint2.forward * 10 + -VPoint2.up * 4 + VPoint2.right * RayDist, VPoint2.forward, hit, velMag, MtargetLayers))
     RightDist = hit.distance;
     else
     RightDist = 200;

Debug.DrawRay (VPoint2.position + -VPoint2.forward * 10 + -VPoint2.up * 4 + -VPoint2.right * RayDist, VPoint2.forward * velMag, Color.black);
if (Physics.Raycast (VPoint2.position + -VPoint2.forward * 10 + -VPoint2.up * 4 + -VPoint2.right * RayDist, VPoint2.forward, hit, velMag, MtargetLayers))
	 LeftDist = hit.distance;
	 else
	 LeftDist = 200;
	 
}else{

var newRot2 : Vector3 = (thisVTransform.up * -0.6f + thisTransform.right * 0.1f).normalized;

newRot2 = (thisVTransform.up * -0.6f + thisVTransform.right * 0.2f).normalized;
Debug.DrawRay (VPoint2.position + -VPoint2.forward * 10 + -VPoint2.up * 4 + VPoint2.right * 15, newRot2 * 64, Color.black);
if (Physics.Raycast (VPoint2.position + -VPoint2.forward * 10 + -VPoint2.up * 4 + VPoint2.right * 15, newRot2, hit, 64, MtargetLayers))
     RightDist = hit.distance;
     else
     RightDist = 200;

newRot2 = (thisVTransform.up * -0.6f + thisVTransform.right * -0.1f).normalized;
Debug.DrawRay (VPoint2.position + -VPoint2.forward * 10 + -VPoint2.up * 4 + -VPoint2.right * 15, newRot2 * 64, Color.black);
if (Physics.Raycast (VPoint2.position + -VPoint2.forward * 10 + -VPoint2.up * 4 + -VPoint2.right * 15, newRot2, hit, 64, MtargetLayers))
	 LeftDist = hit.distance;
	 else
	 LeftDist = 200;
}
 
 if(RightDist > LeftDist){
     TurnRight = true;
     StrafeRight = true;
     }
     
 if(LeftDist > RightDist){
     TurnLeft = true;
     StrafeLeft = true;
     }

var UpDist = 2.0;

Debug.DrawRay (VPoint2.position + VPoint.up * 0.5, VPoint.forward * velMag, Color.black);
if (Physics.Raycast (VPoint2.position + VPoint.up * 0.5, VPoint.forward, hit, velMag, MtargetLayers))
     UpDist = hit.distance;

Debug.DrawRay (VPoint2.position + -VPoint.up * 0.5, VPoint.forward * velMag, Color.black);
if (Physics.Raycast (VPoint2.position + -VPoint.up * 0.5, VPoint.forward, hit, velMag, MtargetLayers)){

var Angle = Mathf.Abs(UpDist - hit.distance);

SlowSpeed = 200;

if(Angle < 4) { SlowSpeed = 150; }
if(Angle < 3.5) { SlowSpeed = 100; }
if(Angle < 3) { SlowSpeed = 50; }
if(Angle < 2.5) { SlowSpeed = 25; }

}

 
newRot = (-VPoint2.up * 0.6f).normalized;

VarLength = 100;

VarLength += -localV.y * 0.5;
 
 VarLength = 100;
 
  Debug.DrawRay (VPoint2.position + VPoint2.forward * VarLength, newRot * 40f, Color.blue);
if (Physics.Raycast (VPoint2.position + VPoint2.forward * VarLength, newRot, 40, MtargetLayers)) {
     Downtorque = false;
 } else {
     if(!GroundClear)
     Downtorque = true;
 }

if(target){

if(target.name.Contains ("TC")){
if(targDist < 48){
Reverse = true;
Obstacle = true;
}

if(targDist > 1000){
Debug.DrawRay (VPoint2.position + VPoint2.forward * VarLength, newRot * 20f, Color.blue);
if (Physics.Raycast (VPoint2.position + VPoint2.forward * VarLength, newRot, 20, MtargetLayers)) {
Uptorque = true;
Upforce = true;
}else{
Uptorque = false;
}
}else{
Debug.DrawRay (VPoint2.position + VPoint2.forward * VarLength, newRot * 128, Color.blue);
if (Physics.Raycast (VPoint2.position + VPoint2.forward * VarLength, newRot, 128, MtargetLayers)) {
Uptorque = true;
Upforce = true;
}else{
Uptorque = false;
}
}

}else{

Debug.DrawRay (VPoint2.position + VPoint2.forward * VarLength, newRot * 20f, Color.blue);
if (Physics.Raycast (VPoint2.position + VPoint2.forward * VarLength, newRot, 20, MtargetLayers)) {
     Uptorque = true;
     Upforce = true;
 } else {
     Uptorque = false;
 }

}

if(targDist < 100)
VesselRotator.RotateThreshold = 0.3;
else
VesselRotator.RotateThreshold = 0.1;
  
}

if(!TurnLeft && !TurnRight && !Obstacle)
VesselRotator.TorqueForce = -80000;

if(TurnLeft || TurnRight || Obstacle)
VesselRotator.TorqueForce = 0;

if (Physics.Raycast (thisTransform.position, Vector3.down, 1000, MtargetLayers)){
GroundClear = false;
vRigidbody.useGravity = true;
}else{
Downtorque = false;
GroundClear = true;
vRigidbody.useGravity = false;
}

if(localV.y > 1){
RearWing.gameObject.SetActive (false);
TopWing.gameObject.SetActive (false);
}else{
RearWing.gameObject.SetActive (true);
TopWing.gameObject.SetActive (true);
}

if(target){
if(target.name.Contains ("xbT"))
if(targDist < 100)
Upforce = true;

if(target.name.Contains ("bT"))
if(targDist < 50)
Upforce = true;
}

}

private var NewRotation : Quaternion;
function FixedUpdate () {

thisTransform.position = AIAnchor.position;
thisTransform.rotation = AIAnchor.rotation;

var hit : RaycastHit;

if (target) {

targDist = Vector3.Distance(thisTransform.position, target.position);

NewRotation = Quaternion.LookRotation(target.position - thisTransform.position);

//----------------------------------------------------------------------------------------------------------------------------------------
localV = thisVTransform.InverseTransformDirection(vRigidbody.velocity);

velMag = Mathf.Clamp(vRigidbody.velocity.magnitude,8,2048);
angVelMag = vRigidbody.angularVelocity.magnitude;

VelClamp2 = Mathf.Clamp(velMag,125,250);

Debug.DrawRay (VPoint.position + VPoint.forward * 10 + -VPoint.up * 3.5, VPoint.forward * velMag, Color.white);
if (Physics.Raycast (VPoint.position + VPoint.forward * 10 + -VPoint.up * 3.5, VPoint.forward, hit, velMag, OtargetLayers))
UDist = hit.distance;
else
UDist = 2048;

Debug.DrawRay (VPoint.position + VPoint.forward * 10 + -VPoint.up * 4.5, VPoint.forward * velMag, Color.white);
if (Physics.Raycast (VPoint.position + VPoint.forward * 10 + -VPoint.up * 4.5, VPoint.forward, hit, velMag, OtargetLayers))
DDist = hit.distance;
else
DDist = 1024;

var DAngle = Mathf.Abs(UDist - DDist);

if(DAngle < 2)
Obstacle = true;


Debug.DrawRay (VPoint.position + SPoint.right * 10, VPoint.forward * ObsDist * 2, Color.red);
Debug.DrawRay (VPoint.position + -SPoint.right * 10, VPoint.forward * ObsDist * 2, Color.red);
if (Physics.Raycast (VPoint.position + SPoint.right * 10, VPoint.forward, ObsDist * 2, OtargetLayers)
|| Physics.Raycast (VPoint.position + -SPoint.right * 10, VPoint.forward, ObsDist * 2, OtargetLayers)){
Obstacle = true;
}else{
SPoint.Rotate(0,0,10);
}

     if(RayDist < 40)
     RayDist += 2;
     if(RayDist == 40)
     RayDist = 2;

if(targDist > 1000){

Debug.DrawRay (VPoint2.position + VPoint2.forward * 24.5, Vector3.down * 16, Color.yellow);
Debug.DrawRay (VPoint2.position + -VPoint2.forward * 18, Vector3.down * 16, Color.yellow);
Debug.DrawRay (VPoint2.position + -VPoint2.up * 4, Vector3.down * 24, Color.yellow);
if (Physics.Raycast (VPoint2.position + VPoint2.forward * 24.5, Vector3.down, 16, OtargetLayers) ||
    Physics.Raycast (VPoint2.position + -VPoint2.forward * 18, Vector3.down, 16, OtargetLayers) ||
    Physics.Raycast (VPoint2.position + -VPoint2.up * 4, Vector3.down, 24, OtargetLayers))
LiftForce = true;
else
LiftForce = false;
		
}else{

Debug.DrawRay (VPoint2.position + VPoint2.forward * 24.5, Vector3.down * 128, Color.yellow);
Debug.DrawRay (VPoint2.position + -VPoint2.forward * 18, Vector3.down * 128, Color.yellow);
Debug.DrawRay (VPoint2.position + -VPoint2.up * 4, Vector3.down * 120, Color.yellow);
if (Physics.Raycast (VPoint2.position + VPoint2.forward * 24.5, Vector3.down, 128, OtargetLayers) ||
    Physics.Raycast (VPoint2.position + -VPoint2.forward * 18, Vector3.down, 128, OtargetLayers) ||
    Physics.Raycast (VPoint2.position + -VPoint2.up * 4, Vector3.down, 120, OtargetLayers))
LiftForce = true;
else
LiftForce = false;

}

if(!isDistributing){

if(-localV.y > 0)
if(!TurnLeft && !TurnRight && !Obstacle || InView){
if(targDist > 1000){
if(angVelMag < 1){
if(Upforce){
if(velMag > 50){
  vRigidbody.AddForceAtPosition((target.transform.position - thisVTransform.position).normalized * 10000, -thisVTransform.up * 20);
  vRigidbody.AddForceAtPosition((target.transform.position - thisVTransform.position).normalized * -10000, thisVTransform.up * 20);
}else{
  vRigidbody.AddForceAtPosition((TargetLead.transform.position - thisVTransform.position).normalized * 1500, -thisVTransform.up * 20);
  vRigidbody.AddForceAtPosition((TargetLead.transform.position - thisVTransform.position).normalized * -1500, thisVTransform.up * 20);
}
}else{
if(velMag > 50){
  vRigidbody.AddForceAtPosition((target.transform.position - thisVTransform.position).normalized * 3000, -thisVTransform.up * 20);
  vRigidbody.AddForceAtPosition((target.transform.position - thisVTransform.position).normalized * -3000, thisVTransform.up * 20);
}else{
  vRigidbody.AddForceAtPosition((TargetLead.transform.position - thisVTransform.position).normalized * 1500, -thisVTransform.up * 20);
  vRigidbody.AddForceAtPosition((TargetLead.transform.position - thisVTransform.position).normalized * -1500, thisVTransform.up * 20);
}
}
}
}else{
if(Upforce){

  vRigidbody.AddForceAtPosition((TargetLead.transform.position - thisVTransform.position).normalized * 3000, -thisVTransform.up * 20);
  vRigidbody.AddForceAtPosition((TargetLead.transform.position - thisVTransform.position).normalized * -3000, thisVTransform.up * 20);

}else{

  vRigidbody.AddForceAtPosition((TargetLead.transform.position - thisVTransform.position).normalized * 1000, -thisVTransform.up * 20);
  vRigidbody.AddForceAtPosition((TargetLead.transform.position - thisVTransform.position).normalized * -1000, thisVTransform.up * 20);

}
}

}

if(OnHull){
Gyro.force = 4;
}else{
if(-localV.y > 0)
Gyro.force = 400;
else
Gyro.force = 2000;
}

}else{
Gyro.force = 1600;
}

if(localV.y > 0)
  DirForce = 0;

if(!Reverse){
  
  if(targDist < 64){
  vRigidbody.drag = 10;
  if(!Obstacle)
  DirForce = -1000;
  }else{
  vRigidbody.drag = 0.1;
  if(!Obstacle)
  DirForce = 1000;
  }
  
  if(!Obstacle){
  if(-localV.y > 20 && -localV.y < 350){
  
  if(!Pursuing){
  if(targDist > 64){
  vRigidbody.drag = 0.1;
  if(!Stop)
  DirForce = 32000;
  else
  DirForce = 8000;
  }
  }else{
  if(targDist < 200){
  vRigidbody.drag = 0.2;
  DirForce = 2000;
  }else{
  vRigidbody.drag = 0.1;
  DirForce = 16000;
  }
  }
  
  }
if(localV.y > 1)
  DirForce = 16000;
}
  
  if(Obstacle)
  if(-localV.y > SlowSpeed){
  if(-localV.y < 100){
  if(-localV.y > 0)
  DirForce = -8000;
  }else{
  DirForce = -32000;
  }
  }
 
  }else{
  if(localV.y < 20){
  if(-localV.y > 20)
  DirForce = -8000;
  else
  DirForce = -2000;
  
  if(Obstacle)
  if(-localV.y > 0)
  DirForce = -32000;
  
  }
  vRigidbody.drag = 1;
  }
  
  thisTransform.rotation = Quaternion.RotateTowards(thisTransform.rotation, NewRotation, Time.deltaTime * 100);

if(-localV.y > 120 && !AccelOnce){
DecelOnce = false;
AccelOnce = true;
var TheThing1 = Instantiate(AccelSound, thisTransform.position, thisTransform.rotation);
  TheThing1.transform.parent = thisTransform;
}

if(-localV.y < 60 && !DecelOnce){
AccelOnce = false;
DecelOnce = true;
var TheThing2 = Instantiate(DecelSound, thisTransform.position, thisTransform.rotation);
  TheThing2.transform.parent = thisTransform;
}

if(Stabilize){

vRigidbody.drag = 0.2;
vRigidbody.angularDrag = 8;

}else{

vRigidbody.angularDrag = 4;

if(TurnRight)
  vRigidbody.AddTorque(-thisVTransform.forward * -64000);

if(TurnLeft)
  vRigidbody.AddTorque(-thisVTransform.forward * 64000);
  
if(StrafeRight)
  vRigidbody.AddForce(thisVTransform.right * 8000);

if(StrafeLeft)
  vRigidbody.AddForce(thisVTransform.right * -8000);

if(Uptorque)
vRigidbody.AddTorque(-thisVTransform.right * 8000 * VelClamp);

if(Downtorque)
vRigidbody.AddTorque(-thisVTransform.right * -8000);

if(Upforce && !LiftForce)
vRigidbody.AddForce(thisVTransform.forward * VelClamp2 * 60);

if(LiftForce)
vRigidbody.AddForce(Vector3.up * 8000);

if(target)
if(OnHull){
Upforce = false;
UpTorque = false;
if(target.name.Contains ("TC"))
  vRigidbody.AddTorque(-thisVTransform.up * 16000);
}

if(!isDistributing){
vRigidbody.AddForce(-thisVTransform.up * DirForce);
}else{
if(Obstacle)
vRigidbody.AddForce(-thisVTransform.up * DirForce);
}

}

}
}

function OnTriggerEnter (other : Collider) {

if(other.collider.name.Contains ("TFC1")){
var relativePoint0 = other.transform.InverseTransformPoint(thisTransform.position);
FAndB = relativePoint0.z;

if(FAndB > 0)
PissedAtTC1 += 1;
if(TrigTick < 1){
Trig.center = Vector3(0,0,0);
Trig.radius = 250;
Trig.height = 250;
}
}

if(other.collider.name.Contains ("TFC3")){
PissedAtTC3 += 1;
if(TrigTick < 1){
Trig.center = Vector3(0,0,0);
Trig.radius = 250;
Trig.height = 250;
}
}

if(other.collider.name.Contains ("TFC4")){
PissedAtTC4 += 1;
if(TrigTick < 1){
Trig.center = Vector3(0,0,0);
Trig.radius = 250;
Trig.height = 250;
}
}

if(other.collider.name.Contains ("TFC5")){
PissedAtTC5 += 1;
if(TrigTick < 1){
Trig.center = Vector3(0,0,0);
Trig.radius = 250;
Trig.height = 250;
}
}

if(other.collider.name.Contains ("TFC6")){
PissedAtTC6 += 1;
if(TrigTick < 1){
Trig.center = Vector3(0,0,0);
Trig.radius = 250;
Trig.height = 250;
}
}

if(other.collider.name.Contains ("TFC7")){
PissedAtTC7 += 1;
if(TrigTick < 1){
Trig.center = Vector3(0,0,0);
Trig.radius = 250;
Trig.height = 250;
}
}

if(other.collider.name.Contains ("TFC8")){
PissedAtTC8 += 1;
if(TrigTick < 1){
Trig.center = Vector3(0,0,0);
Trig.radius = 250;
Trig.height = 250;
}
}

if(other.collider.name.Contains ("TFC9")){
PissedAtTC9 += 1;
if(TrigTick < 1){
Trig.center = Vector3(0,0,0);
Trig.radius = 250;
Trig.height = 250;
}
}

}

function OnTriggerStay (other : Collider) {

ON = other.name;
OT = other.transform;

if(Ignore)
if(OT == Ignore)
return;
  
if(ON.Contains ("TC"))
if(OT == AgrianNetwork.instance.SubdueTarget){
 
target = OT;

Trig.center = Vector3(0,0,0);
Trig.radius = 32;
Trig.height = 32;
TrigTick = 0;

}

}

function LeaveMarker () {
if(target)
var TlastPos : Vector3 = target.position;
if(Ignore)
var IlastPos : Vector3 = Ignore.position;

FoundSmall = false;
FoundMedium = false;
FoundBig = false;
}

function CalcLead () {
Lead();
}

function Lead (){

if(target)
TargetTrace.position = target.position;

yield WaitForSeconds (0.1);

if(target){

var Dist1 = Vector3.Distance(thisTransform.position, target.position);
var Dist2 = Vector3.Distance(TargetTrace.position, target.position);

TargetTrace.LookAt(target);

TargetLead.position = TargetTrace.position;
TargetLead.rotation = TargetTrace.rotation;
TargetLead.position += TargetLead.forward * Dist1 * Dist2 * 0.025;

if(Vector3.Distance(TargetTrace.position, target.position) > 4 && angerLevel > 100){
TLCol.radius = targDist * 0.03;
Pursuing = true;
}else{
TLCol.radius = targDist * 0.03;
Pursuing = false;
}
}
}

function Regenerator () {

if(!target){
Trig.center = Vector3(0,0,450);
Trig.radius = 500;
Trig.height = 1000;
}

if(AgrianNetwork.TC1CriminalLevel > 240)
PissedAtTC1 = 100;

if(AgrianNetwork.TC4CriminalLevel > 240)
PissedAtTC4 = 100;

if(AgrianNetwork.TC5CriminalLevel > 240)
PissedAtTC5 = 100;

if(AgrianNetwork.TC6CriminalLevel > 240)
PissedAtTC6 = 100;

if(AgrianNetwork.TC7CriminalLevel > 240)
PissedAtTC7 = 100;

if(AgrianNetwork.TC8CriminalLevel > 240)
PissedAtTC8 = 100;

if(AgrianNetwork.TC9CriminalLevel > 240)
PissedAtTC9 = 100;

if(WatchTick > 0)
WatchTick -= 1;

if(angerLevel > 0)
angerLevel -= 1;

if(target){

if(target.name.Contains ("TC0a")){
if(PissedAtTC0a > 0){
PissedAtTC0a -= 1;
}
}

if(target.name.Contains ("TC1")){
if(PissedAtTC1 > 0){
PissedAtTC1 -= 1;
if(AgrianNetwork.TC1CriminalLevel > 320)
angerLevel = 110;
}
}
  
if(target.name.Contains ("TC3")){
if(PissedAtTC3 > 0){
PissedAtTC3 -= 1;
if(AgrianNetwork.TC5CriminalLevel > 320)
angerLevel = 110;
}
}

if(target.name.Contains ("TC4")){
if(PissedAtTC4 > 0){
PissedAtTC4 -= 1;
if(AgrianNetwork.TC4CriminalLevel > 320)
angerLevel = 110;
}
}

if(target.name.Contains ("TC5")){
if(PissedAtTC5 > 0){
PissedAtTC5 -= 1;
if(AgrianNetwork.TC5CriminalLevel > 320)
angerLevel = 110;
}
}
  
if(target.name.Contains ("TC6")){
if(PissedAtTC6 > 0){
PissedAtTC6 -= 1;
if(AgrianNetwork.TC6CriminalLevel > 320)
angerLevel = 110;
}
}
  
if(target.name.Contains ("TC7")){
if(PissedAtTC7 > 0){
PissedAtTC7 -= 1;
if(AgrianNetwork.TC7CriminalLevel > 320)
angerLevel = 110;
}
}

if(target.name.Contains ("TC8")){
if(PissedAtTC8 > 0){
PissedAtTC8 -= 1;
if(AgrianNetwork.TC8CriminalLevel > 320)
angerLevel = 110;
}
}

if(target.name.Contains ("TC9")){
if(PissedAtTC9 > 0){
PissedAtTC9 -= 1;
if(AgrianNetwork.TC9CriminalLevel > 320)
angerLevel = 110;
}
}

if(target.name.Contains ("mT"))
FoundMedium = true;

if(target.name.Contains ("bT"))
FoundBig = true;

if(angerLevel > 75)
if(!Physics.Linecast (thisTransform.position, target.position, MtargetLayers))
InView = true;

if(TrigTick > 0){
TrigTick -= 1;
}else{
if(angerLevel > 75 && target.name.Contains ("TC")){
Trig.center = Vector3(0,0,0);
  Trig.radius = 250;
  Trig.height = 250;
  }
}

if(AgrianNetwork.TC1CriminalLevel > 500){

if(target.name.Contains ("TC1")){

if(targDist < 500)
if(!isDistributing){
isDistributing = true;
Distribute();
}

}else{
Waypoint2.position = AgrianNetwork.instance.FullPriorityWaypoint.position;
target = Waypoint2;
}
}

}

if(angVelMag > 0.5){
if(Orbit < 8)
Orbit += 1;
}else{
if(Orbit > 0)
Orbit -= 1;
}

if(Orbit == 8)
Stop = true;

if(Orbit == 0)
Stop = false;

InView = false;
Upforce = false;
OnHull = false;

}

function Distribute (){

Destroy(CapJoint);

CapRB.useGravity = true;
CapRB.AddForce(-thisVTransform.up * 5000);
CapSFX.Play();

yield WaitForSeconds (0.7);

Stabilize = true;

yield WaitForSeconds (0.7);

TheRack = Instantiate(DistributorRackPF, DistributorRack.transform.position, DistributorRack.transform.rotation);
TheRack.rigidbody.velocity = vRigidbody.velocity * 1;
TheRack.rigidbody.AddForce(-DistributorRack.transform.up * 5000);

DistributorRack.SetActive (false);

}