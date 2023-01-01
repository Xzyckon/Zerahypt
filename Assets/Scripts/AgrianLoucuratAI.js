var target : Transform;
var Waypoint : Transform;
var Waypoint2 : Transform;
var Ignore : Transform;

var VantagePoint : Transform;

var TargetTrace : Transform;
var TargetLead : Transform;
var TLCol : SphereCollider;

var thisTransform : Transform;
var thisVTransform : Transform;
var thisCTransform : Transform;

var vRigidbody : Rigidbody;

var VesselTF : Transform;
var VesselTip : GameObject;
var VPoint : Transform;
var VPoint2 : Transform;
var SPoint : Transform;
var RayBurst : GameObject;
var RaySpawn : Transform;
var RaySpawn2 : Transform;
var Trig : CapsuleCollider;

var Gyro : StrongGyroStabilizer;

var LTurret : GameObject;
var RTurret : GameObject;

var LTMuzzle : Transform;
var RTMuzzle : Transform;

var LTPivot : Transform;
var RTPivot : Transform;

var LTBase : Transform;
var RTBase : Transform;

var TurretShot : GameObject;

var SubduerPrefab : GameObject;
var SubduerSpawn1 : GameObject;
var SubduerSpawn2 : GameObject;

var HasFiredSubduers : boolean;

var RearWing : GameObject;
var TopWing : GameObject;

var VesselRotator : BigVesselRotator;

var TurretLight : GameObject;

var WarningLight : GameObject;

var AttackSound : GameObject;

var GroundClear : boolean;

var Pursuing : boolean;
var PursueTime = 0;

var FoundBig : boolean;
var FoundMedium : boolean;
var FoundSmall : boolean;

var Warning : boolean;
var WarningLightOn : boolean;

var NeedsTurrets : boolean;

var PissedAtTC0a = 0;

var PissedAtTC1 = 0;
var PissedAtTC3 = 0;
var PissedAtTC4 = 0;
var PissedAtTC5 = 0;
var PissedAtTC6 = 0;
var PissedAtTC7 = 0;
var PissedAtTC8 = 0;
var PissedAtTC9 = 0;

var DangerSense = 0;
var DangerDirection : Vector3;

var DangerName : String;

var interrogating : boolean;

var InterrogateTimer = 0;

var angerLevel = 0;

var WatchTick = 0;

var TrigTick = 0;

var TargetStill = 0;

var Orbit = 0;

var LTLineOfFire : boolean;
var RTLineOfFire : boolean;

var LineOfFire : boolean;

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
var localAV : Vector3;

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

InvokeRepeating("FireRay", 1, 3);

InvokeRepeating("FireTurrets", 1, 1.2);

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
VPoint.transform.rotation = Quaternion.LookRotation(rigidbody.velocity);
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

if(targDist > 256){
Debug.DrawRay (VPoint2.position + VPoint2.forward * VarLength, newRot * 20f, Color.blue);
if (Physics.Raycast (VPoint2.position + VPoint2.forward * VarLength, newRot, 20, MtargetLayers)) {
     Uptorque = true;
     Upforce = true;
 } else {
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

if (Physics.Raycast (RaySpawn2.position, RaySpawn2.transform.forward, hit, 10000, targetLayers))
if(hit.collider.name.Contains (target.name) || hit.collider.name.Contains ("TL2"))
LineOfFire = true;

if(VesselTF.localEulerAngles.x < 15 || VesselTF.localEulerAngles.x > 335)
LineOfFire = false;

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
VesselTip.rigidbody.useGravity = true;
}else{
if(angerLevel < 50){
Downtorque = false;
GroundClear = true;
vRigidbody.useGravity = false;
VesselTip.rigidbody.useGravity = false;
}else{
GroundClear = false;
vRigidbody.useGravity = true;
VesselTip.rigidbody.useGravity = true;
}
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

//========================================================================================================================//
//////////////////////////////////////////////////////[INTERACTION]/////////////////////////////////////////////////////////
//========================================================================================================================//

if(NotiScript.PiriNotis)
if(Vector3.Distance(thisTransform.position, PlayerInformation.instance.Pirizuka.position) < 256){
target = PlayerInformation.instance.PiriTarget;
NotiScript.PiriNotis = false;
}

if(WorldInformation.pSpeech){
if(Vector3.Distance(thisTransform.position, WorldInformation.pSpeech.position) < WorldInformation.pSpeechRange){
if(Vector3.Distance(thisTransform.position, WorldInformation.pSpeech.position) < 256){
ProcessSpeech(WorldInformation.pSpeech.gameObject.GetComponent(TalkBubbleScript).myText);
WorldInformation.pSpeech = null;
}
}
}

}

private var NewRotation : Quaternion;
function FixedUpdate () {
var hit : RaycastHit;

if(Warning){
Warning = false;
WarningLightOn = true;
WarningLight.gameObject.SetActive (true);
}

if (target) {

targDist = Vector3.Distance(thisTransform.position, target.position);

if (DangerSense < 1)
    NewRotation = Quaternion.LookRotation(target.position - thisTransform.position);
    
if (DangerSense > 0 && DangerDirection != Vector3.zero)
    NewRotation = Quaternion.LookRotation(DangerDirection);

//----------------------------------------------------------------------------------------------------------------------------------------

localAV = VesselTF.InverseTransformDirection(vRigidbody.angularVelocity);
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

Debug.DrawRay (VPoint2.position + VPoint2.forward * 24.5, Vector3.down * 16, Color.yellow);
Debug.DrawRay (VPoint2.position, Vector3.down * 24, Color.yellow);
Debug.DrawRay (VPoint2.position + -VPoint2.forward * 18, Vector3.down * 16, Color.yellow);
if (Physics.Raycast (VPoint2.position + VPoint2.forward * 24.5, Vector3.down, 16, OtargetLayers) ||
    Physics.Raycast (VPoint2.position + -VPoint2.forward * 18, Vector3.down, 16, OtargetLayers) ||
    Physics.Raycast (VPoint2.position, Vector3.down, 24, OtargetLayers))
		LiftForce = true;
		else
		LiftForce = false;

if(-localV.y > 0)
if(!TurnLeft && !TurnRight && !Obstacle || InView)
if(targDist > 200){
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

  vRigidbody.AddForceAtPosition((TargetLead.transform.position - thisVTransform.position).normalized * 600, -thisVTransform.up * 20);
  vRigidbody.AddForceAtPosition((TargetLead.transform.position - thisVTransform.position).normalized * -600, thisVTransform.up * 20);

}else{

  vRigidbody.AddForceAtPosition((TargetLead.transform.position - thisVTransform.position).normalized * 300, -thisVTransform.up * 20);
  vRigidbody.AddForceAtPosition((TargetLead.transform.position - thisVTransform.position).normalized * -300, thisVTransform.up * 20);

}
}



if(LTMuzzle)
if(LTurret.rigidbody.angularVelocity.magnitude < 1){
  LTurret.rigidbody.AddForceAtPosition((TargetLead.transform.position - LTBase.transform.position).normalized * 10, -LTBase.transform.up * 4);
  LTurret.rigidbody.AddForceAtPosition((TargetLead.transform.position - LTBase.transform.position).normalized * -10, LTBase.transform.up * 4);
}
if(RTMuzzle)
if(RTurret.rigidbody.angularVelocity.magnitude < 1){
  RTurret.rigidbody.AddForceAtPosition((TargetLead.transform.position - RTBase.transform.position).normalized * 10, -RTBase.transform.up * 4);
  RTurret.rigidbody.AddForceAtPosition((TargetLead.transform.position - RTBase.transform.position).normalized * -10, RTBase.transform.up * 4);
}

if(OnHull){
Gyro.force = 4;
}else{
if(-localV.y > 0)
Gyro.force = 400;
else
Gyro.force = 2000;
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
  if(localAV.x < 0.1){
  if(-localV.y > 20 && -localV.y < 300){
  
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

  vRigidbody.AddForce(-thisVTransform.up * DirForce);

}
}

function OnTriggerEnter (other : Collider) {

if(other.collider.name.Contains ("TFC")){
if(Vector3.Distance(other.transform.position, thisTransform.position) > 100){
if (Physics.Linecast (VantagePoint.position, other.transform.position, MtargetLayers))
return;
}
}

if(other.rigidbody)
if(target)
if(!interrogating)
if(!target.name.Contains ("TC"))
if(other.collider.name.Contains ("TFC") && DangerSense < 1)
if(!other.collider.name.Contains ("TFC2")){
  
  DangerSense = 40;
  
  if(other.rigidbody){
  DangerDirection = -other.rigidbody.velocity.normalized;
  //target = null;
  }
  
  Trig.center = Vector3(0,0,450);
  Trig.radius = 500;
  Trig.height = 1000;
  
  }

if(other.collider.name.Contains ("TFC"))
if(!other.collider.name.Contains ("TFC2")){

if(angerLevel > 100){

  Trig.center = Vector3(0,0,450);
  Trig.radius = 500;
  Trig.height = 1000;

}

if(angerLevel == 0){
WarningLightOn = true;
WarningLight.gameObject.SetActive (true);

Trig.center = Vector3(0,0,450);
Trig.radius = 500;
Trig.height = 1000;

angerLevel = 110;
WatchTick = 5;
var TheThing0 = Instantiate(AttackSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing0.transform.parent = thisTransform;
}

if(angerLevel < 200 && WatchTick < 1)
angerLevel += 100;

Warning = true;

}

if(other.collider.name.Contains ("TFC1")){
var relativePoint0 = other.transform.InverseTransformPoint(thisTransform.position);
FAndB = relativePoint0.z;

DangerName = other.collider.name;

if(FAndB > 0)
PissedAtTC1 += 1;
if(TrigTick < 1){
Trig.center = Vector3(0,0,0);
Trig.radius = 250;
Trig.height = 250;
}
}

if(other.collider.name.Contains ("TFC3")){
DangerName = other.collider.name;
PissedAtTC3 += 1;
if(TrigTick < 1){
Trig.center = Vector3(0,0,0);
Trig.radius = 250;
Trig.height = 250;
}
}

if(other.collider.name.Contains ("TFC4")){
DangerName = other.collider.name;
PissedAtTC4 += 1;
if(TrigTick < 1){
Trig.center = Vector3(0,0,0);
Trig.radius = 250;
Trig.height = 250;
}
}

if(other.collider.name.Contains ("TFC5")){
DangerName = other.collider.name;
PissedAtTC5 += 1;
if(TrigTick < 1){
Trig.center = Vector3(0,0,0);
Trig.radius = 250;
Trig.height = 250;
}
}

if(other.collider.name.Contains ("TFC6")){
DangerName = other.collider.name;
PissedAtTC6 += 1;
if(TrigTick < 1){
Trig.center = Vector3(0,0,0);
Trig.radius = 250;
Trig.height = 250;
}
}

if(other.collider.name.Contains ("TFC7")){
DangerName = other.collider.name;
PissedAtTC7 += 1;
if(TrigTick < 1){
Trig.center = Vector3(0,0,0);
Trig.radius = 250;
Trig.height = 250;
}
}

if(other.collider.name.Contains ("TFC8")){
DangerName = other.collider.name;
PissedAtTC8 += 1;
if(TrigTick < 1){
Trig.center = Vector3(0,0,0);
Trig.radius = 250;
Trig.height = 250;
}
}

if(other.collider.name.Contains ("TFC9")){
DangerName = other.collider.name;
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

OTD = Vector3.Distance(thisTransform.position, OT.position);

if(Ignore)
if(OT == Ignore)
return;

if(interrogating)
return;

if(target){

if(AgrianNetwork.instance.SubdueTarget)
if(target == AgrianNetwork.instance.SubdueTarget)
return;

  
 if(ON.Contains ("TC0a"))
 if(PissedAtTC0a > 0){
 if(ON.Contains ("sT") && !FoundSmall ||
    ON.Contains ("mT") && !FoundMedium ||
    ON.Contains ("bT")){
 
  target = OT;
  AgrianNetwork.instance.TurretsTarget = OT;
  DangerSense = 0;
  
  Trig.center = Vector3(0,0,0);
  Trig.radius = 32;
  Trig.height = 32;
  TrigTick = 6;
  
  if(!WarningLightOn){
  WarningLightOn = true;
  WarningLight.gameObject.SetActive (true);
  angerLevel = 130;
  Warning = true;
  }
  }
  if(PissedAtTC0a > 100)
  if(targDist > OTD)
  target = OT;
  }
  
 if(ON.Contains ("TC1"))
 if(PissedAtTC1 > 0){
 if(ON.Contains ("sT") && !FoundSmall ||
    ON.Contains ("mT") && !FoundMedium ||
    ON.Contains ("bT")){
 
  target = OT;
  AgrianNetwork.instance.TurretsTarget = OT;
  DangerSense = 0;

  Trig.center = Vector3(0,0,0);
  Trig.radius = 32;
  Trig.height = 32;
  TrigTick = 0;

  if(!WarningLightOn){
  WarningLightOn = true;
  WarningLight.gameObject.SetActive (true);
  angerLevel = 130;
  Warning = true;
  }
  }
  if(PissedAtTC1 > 100)
  if(targDist > OTD)
  target = OT;
  }
 if(ON.Contains ("TC3"))
 if(PissedAtTC3 > 0){
 if(ON.Contains ("sT") && !FoundSmall ||
    ON.Contains ("mT") && !FoundMedium ||
    ON.Contains ("bT")){
 
  target = OT;
  AgrianNetwork.instance.TurretsTarget = OT;
  DangerSense = 0;

  Trig.center = Vector3(0,0,0);
  Trig.radius = 32;
  Trig.height = 32;
  TrigTick = 6;

  if(!WarningLightOn){
  WarningLightOn = true;
  WarningLight.gameObject.SetActive (true);
  angerLevel = 130;
  Warning = true;
  }
  }
  if(PissedAtTC3 > 100)
  if(targDist > OTD)
  target = OT;
 }
 
 if(ON.Contains ("TC4"))
 if(PissedAtTC4 > 0){
 if(ON.Contains ("sT") && !FoundSmall ||
    ON.Contains ("mT") && !FoundMedium ||
    ON.Contains ("bT")){
 
  target = OT;
  AgrianNetwork.instance.TurretsTarget = OT;
  DangerSense = 0;

  Trig.center = Vector3(0,0,0);
  Trig.radius = 32;
  Trig.height = 32;
  TrigTick = 6;

  if(!WarningLightOn){
  WarningLightOn = true;
  WarningLight.gameObject.SetActive (true);
  angerLevel = 130;
  Warning = true;
  }
  }
  if(PissedAtTC4 > 100)
  if(targDist > OTD)
  target = OT;
 }
 
 if(ON.Contains ("TC5"))
 if(PissedAtTC5 > 0){
 if(ON.Contains ("sT") && !FoundSmall ||
    ON.Contains ("mT") && !FoundMedium ||
    ON.Contains ("bT")){
 
  target = OT;
  AgrianNetwork.instance.TurretsTarget = OT;
  DangerSense = 0;

  Trig.center = Vector3(0,0,0);
  Trig.radius = 32;
  Trig.height = 32;
  TrigTick = 6;

  if(!WarningLightOn){
  WarningLightOn = true;
  WarningLight.gameObject.SetActive (true);
  angerLevel = 130;
  Warning = true;
  }
  }
  if(PissedAtTC5 > 100)
  if(targDist > OTD)
  target = OT;
 }
 if(ON.Contains ("TC6"))
 if(PissedAtTC6 > 0){
 if(ON.Contains ("sT") && !FoundSmall ||
    ON.Contains ("mT") && !FoundMedium ||
    ON.Contains ("bT")){

  target = OT;
  AgrianNetwork.instance.TurretsTarget = OT;
  DangerSense = 0;

  Trig.center = Vector3(0,0,0);
  Trig.radius = 32;
  Trig.height = 32;
  TrigTick = 6;

  if(!WarningLightOn){
  WarningLightOn = true;
  WarningLight.gameObject.SetActive (true);
  angerLevel = 130;
  Warning = true;
  }
  }
  if(PissedAtTC6 > 100)
  if(targDist > OTD)
  target = OT;
  }
  
if(ON.Contains ("TC7"))
if(PissedAtTC7 > 0){
 if(ON.Contains ("sT") && !FoundSmall ||
    ON.Contains ("mT") && !FoundMedium ||
    ON.Contains ("bT")){

  target = OT;
  AgrianNetwork.instance.TurretsTarget = OT;
  DangerSense = 0;

  Trig.center = Vector3(0,0,0);
  Trig.radius = 32;
  Trig.height = 32;
  TrigTick = 6;

  if(!WarningLightOn){
  WarningLightOn = true;
  WarningLight.gameObject.SetActive (true);
  angerLevel = 130;
  Warning = true;
  }
  }
  if(PissedAtTC7 > 100)
  if(targDist > OTD)
  target = OT;
  }




if(ON.Contains ("TC8"))
if(PissedAtTC8 > 0){
 if(ON.Contains ("sT") && !FoundSmall ||
    ON.Contains ("mT") && !FoundMedium ||
    ON.Contains ("bT")){

  target = OT;
  AgrianNetwork.instance.TurretsTarget = OT;
  DangerSense = 0;

  Trig.center = Vector3(0,0,0);
  Trig.radius = 32;
  Trig.height = 32;
  TrigTick = 6;

  if(!WarningLightOn){
  WarningLightOn = true;
  WarningLight.gameObject.SetActive (true);
  angerLevel = 130;
  Warning = true;
  }
  }
  if(PissedAtTC8 > 100)
  if(targDist > OTD)
  target = OT;
  }
  
  
  if(ON.Contains ("TC9"))
if(PissedAtTC9 > 0){
 if(ON.Contains ("sT") && !FoundSmall ||
    ON.Contains ("mT") && !FoundMedium ||
    ON.Contains ("bT")){

  target = OT;
  AgrianNetwork.instance.TurretsTarget = OT;
  DangerSense = 0;

  Trig.center = Vector3(0,0,0);
  Trig.radius = 32;
  Trig.height = 32;
  TrigTick = 6;

  if(!WarningLightOn){
  WarningLightOn = true;
  WarningLight.gameObject.SetActive (true);
  angerLevel = 130;
  Warning = true;
  }
  }
  if(PissedAtTC9 > 100)
  if(targDist > OTD)
  target = OT;
  }








if(ON.Contains ("TC2_P")){
if(AgrianNetwork.instance.Curiosity > 1)
if(AgrianNetwork.instance.AlertTime > 1){
target = OT;
interrogating = true;
ProcessSpeech("");
}
}












}

}

function FireRay () {

var hit : RaycastHit;

if(angerLevel > 100){

NeedsTurrets = true;

if(LineOfFire)
if(Vector3.Distance(RaySpawn2.position, RaySpawn.position) < 0.1){
	
if (Physics.Raycast (RaySpawn2.position, RaySpawn2.transform.forward, hit, 10000, targetLayers)){

NeedsTurrets = false;

if(target){
if(target.name.Contains ("TC0a") && PissedAtTC0a > 90)
if(hit.collider.name.Contains ("TC0a")){
WarningLightOn = false;
WarningLight.gameObject.SetActive (false);
var TheRay0 = Instantiate(RayBurst, RaySpawn2.position, RaySpawn2.rotation);
TheRay0.transform.parent = RaySpawn2;
angerLevel -= 50;
}
if(target.name.Contains ("TC1") && PissedAtTC1 > 90)
if(hit.collider.name.Contains ("TC1")){
WarningLightOn = false;
WarningLight.gameObject.SetActive (false);
var TheRay1 = Instantiate(RayBurst, RaySpawn2.position, RaySpawn2.rotation);
TheRay1.transform.parent = RaySpawn2;
angerLevel -= 50;
}
if(target.name.Contains ("TC3") && PissedAtTC3 > 5)
if(hit.collider.name.Contains ("TC3")){
WarningLightOn = false;
WarningLight.gameObject.SetActive (false);
var TheRay2 = Instantiate(RayBurst, RaySpawn2.position, RaySpawn2.rotation);
TheRay2.transform.parent = RaySpawn2;
angerLevel -= 50;
}
if(target.name.Contains ("TC4"))
if(hit.collider.name.Contains ("TC4")){
WarningLightOn = false;
WarningLight.gameObject.SetActive (false);
var TheRay3 = Instantiate(RayBurst, RaySpawn2.position, RaySpawn2.rotation);
TheRay3.transform.parent = RaySpawn2;
angerLevel -= 50;
}
if(target.name.Contains ("TC5") && PissedAtTC5 > 5)
if(hit.collider.name.Contains ("TC5")){
WarningLightOn = false;
WarningLight.gameObject.SetActive (false);
var TheRay4 = Instantiate(RayBurst, RaySpawn2.position, RaySpawn2.rotation);
TheRay4.transform.parent = RaySpawn2;
angerLevel -= 50;
}
if(target.name.Contains ("TC6") && PissedAtTC6 > 5)
if(hit.collider.name.Contains ("TC6")){
WarningLightOn = false;
WarningLight.gameObject.SetActive (false);
var TheRay5 = Instantiate(RayBurst, RaySpawn2.position, RaySpawn2.rotation);
TheRay5.transform.parent = RaySpawn2;
angerLevel -= 50;
}
if(target.name.Contains ("TC7") && PissedAtTC7 > 5)
if(hit.collider.name.Contains ("TC7")){
WarningLightOn = false;
WarningLight.gameObject.SetActive (false);
var TheRay6 = Instantiate(RayBurst, RaySpawn2.position, RaySpawn2.rotation);
TheRay6.transform.parent = RaySpawn2;
angerLevel -= 50;
}
if(target.name.Contains ("TC8") && PissedAtTC8 > 5)
if(hit.collider.name.Contains ("TC8")){
WarningLightOn = false;
WarningLight.gameObject.SetActive (false);
var TheRay7 = Instantiate(RayBurst, RaySpawn2.position, RaySpawn2.rotation);
TheRay7.transform.parent = RaySpawn2;
angerLevel -= 50;
}
if(target.name.Contains ("TC9") && PissedAtTC9 > 5)
if(hit.collider.name.Contains ("TC9")){
WarningLightOn = false;
WarningLight.gameObject.SetActive (false);
var TheRay8 = Instantiate(RayBurst, RaySpawn2.position, RaySpawn2.rotation);
TheRay8.transform.parent = RaySpawn2;
angerLevel -= 50;
}
}
}

}

}
}

function FireTurrets () {
Fire();
}

function Fire () {

var hit : RaycastHit;

if(RTMuzzle){

RTLineOfFire = false;

if(target)
if (Physics.Raycast (RTMuzzle.position, RTMuzzle.forward, hit, 5000, targetLayers))
if(hit.collider.name.Contains (target.name) || hit.collider.name.Contains ("TL2"))
RTLineOfFire = true;

if(RTPivot.localEulerAngles.z < 10 || RTPivot.localEulerAngles.z > 350)
RTLineOfFire = false;

if(RTLineOfFire && angerLevel > 100){
var TheThing6 = Instantiate(TurretShot, RTMuzzle.position, RTMuzzle.rotation);
  TheThing6.transform.parent = RTMuzzle;
  angerLevel -= 10;
}
}

yield WaitForSeconds (0.6);

if(LTMuzzle){

LTLineOfFire = false;

if(target)
if (Physics.Raycast (LTMuzzle.position, LTMuzzle.forward, hit, 5000, targetLayers))
if(hit.collider.name.Contains (target.name) || hit.collider.name.Contains ("TL2"))
LTLineOfFire = true;

if(RTPivot.localEulerAngles.z < 10 || RTPivot.localEulerAngles.z > 350)
LTLineOfFire = false;

if(LTLineOfFire && angerLevel > 100){
var TheThing7 = Instantiate(TurretShot, LTMuzzle.position, LTMuzzle.rotation);
  TheThing7.transform.parent = LTMuzzle;
  angerLevel -= 10;
}
}

}

function LeaveMarker () {
if(target)
var TlastPos : Vector3 = target.position;
if(Ignore)
var IlastPos : Vector3 = Ignore.position;

IsReading(TlastPos, IlastPos);

if(!interrogating)
if(TargetStill > 10){
TargetStill = 0;
Ignore = target;
WarningLightOn = false;
WarningLight.gameObject.SetActive (false);
target = Waypoint;
angerLevel = 7;
Trig.center = Vector3(0,0,450);
Trig.radius = 500;
Trig.height = 1000;
}

FoundSmall = false;
FoundMedium = false;
FoundBig = false;
}

function IsReading(TlastPos : Vector3, IlastPos : Vector3){

yield WaitForSeconds (2);

  if(target)
  if(Vector3.Distance(target.transform.position, TlastPos) < 1)
  TargetStill += 1;
  else
  TargetStill = 0;
  
  if(Ignore)
  if(Vector3.Distance(Ignore.position, IlastPos) > 1)
  Ignore = null;
  
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

if(Dist2 > 24 && angerLevel > 100){
TLCol.radius = targDist * 0.03;
Pursuing = true;
}else{
TLCol.radius = targDist * 0.03;
Pursuing = false;
}
}
}

function Regenerator () {

LineOfFire = false;

if(target != null){

if(!target.name.Contains ("bTC"))
FoundBig = false;

if(AgrianNetwork.TC1CriminalLevel < 500){
if(AgrianNetwork.TC1CriminalLevel > 240 && target.name.Contains ("TC1")){
AgrianNetwork.instance.PriorityWaypoint.position = target.position;
AgrianNetwork.instance.TC1CriminalLevel = 360;
WorldInformation.PiriExposed = 60;
}
}else{
if(target.name.Contains ("TC1")){
if(AgrianNetwork.instance.AlertTime < 300)
AgrianNetwork.instance.AlertTime = 300;
AgrianNetwork.instance.FullPriorityWaypoint.position = target.position;
AgrianNetwork.instance.TC1CriminalLevel = 620;
WorldInformation.PiriExposed = 120;
}
}

if(AgrianNetwork.TC4CriminalLevel < 500){
if(AgrianNetwork.TC4CriminalLevel > 240 && target.name.Contains ("TC4")){
AgrianNetwork.instance.PriorityWaypoint.position = target.position;
AgrianNetwork.instance.TC4CriminalLevel = 360;
}
}else{
if(target.name.Contains ("TC4")){
if(AgrianNetwork.instance.AlertTime < 300)
AgrianNetwork.instance.AlertTime = 300;
AgrianNetwork.instance.FullPriorityWaypoint.position = target.position;
AgrianNetwork.instance.TC4CriminalLevel = 620;
}
}

if(AgrianNetwork.TC5CriminalLevel < 500){
if(AgrianNetwork.TC5CriminalLevel > 240 && target.name.Contains ("TC5")){
AgrianNetwork.instance.PriorityWaypoint.position = target.position;
AgrianNetwork.instance.TC5CriminalLevel = 360;
}
}else{
if(target.name.Contains ("TC5")){
if(AgrianNetwork.instance.AlertTime < 300)
AgrianNetwork.instance.AlertTime = 300;
AgrianNetwork.instance.FullPriorityWaypoint.position = target.position;
AgrianNetwork.instance.TC5CriminalLevel = 620;
}
}

if(AgrianNetwork.TC6CriminalLevel < 500){
if(AgrianNetwork.TC6CriminalLevel > 240 && target.name.Contains ("TC6")){
AgrianNetwork.instance.PriorityWaypoint.position = target.position;
AgrianNetwork.instance.TC6CriminalLevel = 360;
}
}else{
if(target.name.Contains ("TC6")){
if(AgrianNetwork.instance.AlertTime < 300)
AgrianNetwork.instance.AlertTime = 300;
AgrianNetwork.instance.FullPriorityWaypoint.position = target.position;
AgrianNetwork.instance.TC6CriminalLevel = 620;
}
}

if(AgrianNetwork.TC7CriminalLevel < 500){
if(AgrianNetwork.TC7CriminalLevel > 240 && target.name.Contains ("TC7")){
AgrianNetwork.instance.PriorityWaypoint.position = target.position;
AgrianNetwork.instance.TC7CriminalLevel = 360;
}
}else{
if(target.name.Contains ("TC7")){
if(AgrianNetwork.instance.AlertTime < 300)
AgrianNetwork.instance.AlertTime = 300;
AgrianNetwork.instance.FullPriorityWaypoint.position = target.position;
AgrianNetwork.instance.TC7CriminalLevel = 620;
}
}

if(AgrianNetwork.TC8CriminalLevel < 500){
if(AgrianNetwork.TC8CriminalLevel > 240 && target.name.Contains ("TC8")){
AgrianNetwork.instance.PriorityWaypoint.position = target.position;
AgrianNetwork.instance.TC8CriminalLevel = 360;
}
}else{
if(target.name.Contains ("TC8")){
if(AgrianNetwork.instance.AlertTime < 300)
AgrianNetwork.instance.AlertTime = 300;
AgrianNetwork.instance.FullPriorityWaypoint.position = target.position;
AgrianNetwork.instance.TC8CriminalLevel = 620;
}
}

if(AgrianNetwork.TC9CriminalLevel < 500){
if(AgrianNetwork.TC9CriminalLevel > 240 && target.name.Contains ("TC9")){
AgrianNetwork.instance.PriorityWaypoint.position = target.position;
AgrianNetwork.instance.TC9CriminalLevel = 360;
}
}else{
if(target.name.Contains ("TC9")){
if(AgrianNetwork.instance.AlertTime < 300)
AgrianNetwork.instance.AlertTime = 300;
AgrianNetwork.instance.FullPriorityWaypoint.position = target.position;
AgrianNetwork.instance.TC9CriminalLevel = 620;
}
}

if(Pursuing){
if(angerLevel > 100)
if(target.name.Contains ("TC")){

PursueTime += 1;

if(PursueTime > 20)
if(target.name.Contains ("bT")){
PursueTime = 0;
AgrianNetwork.instance.SubdueTarget = target;
}else{
PursueTime = 0;
if(!HasFiredSubduers){
HasFiredSubduers = true;
Subduing();
}
}


}
}else{
PursueTime = 0;
}

}else{
Trig.center = Vector3(0,0,450);
Trig.radius = 500;
Trig.height = 1000;
}

if(!interrogating){

if(angerLevel == 0 && WatchTick == 0){
WarningLightOn = false;
WarningLight.gameObject.SetActive (false);
target = Waypoint;
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

if(angerLevel == 1){
WarningLightOn = false;
WarningLight.gameObject.SetActive (false);
target = Waypoint;
angerLevel = 0;
PissedAtTC1 = 0;
PissedAtTC3 = 0;
PissedAtTC5 = 0;
PissedAtTC6 = 0;
PissedAtTC7 = 0;
PissedAtTC8 = 0;
PissedAtTC9 = 0;
Trig.center = Vector3(0,0,450);
Trig.radius = 500;
Trig.height = 1000;
}

if(WatchTick > 0)
WatchTick -= 1;

if(angerLevel > 0)
angerLevel -= 1;

if(DangerSense > 0)
DangerSense -= 1;

if(target){

if(target.name.Contains ("TC0a")){
if(PissedAtTC0a > 0){
PissedAtTC0a -= 1;
}else{

if(DangerName)
if(!DangerName.Contains ("TC0a"))
angerLevel = 7;
}
}

if(target.name.Contains ("TC1")){
if(PissedAtTC1 > 0){
PissedAtTC1 -= 1;
if(AgrianNetwork.TC1CriminalLevel > 320)
angerLevel = 110;
}else{

if(DangerName)
if(!DangerName.Contains ("TC1"))
angerLevel = 7;
}
}
  
if(target.name.Contains ("TC3")){
if(PissedAtTC3 > 0){
PissedAtTC3 -= 1;
if(AgrianNetwork.TC3CriminalLevel > 320)
angerLevel = 110;
}else{

if(DangerName)
if(!DangerName.Contains ("TC3"))
angerLevel = 7;
}
}

if(target.name.Contains ("TC5")){
if(PissedAtTC5 > 0){
PissedAtTC5 -= 1;
if(AgrianNetwork.TC5CriminalLevel > 320)
angerLevel = 110;
}else{

if(DangerName)
if(!DangerName.Contains ("TC5"))
angerLevel = 7;
}
}
  
if(target.name.Contains ("TC6")){
if(PissedAtTC6 > 0){
PissedAtTC6 -= 1;
if(AgrianNetwork.TC6CriminalLevel > 320)
angerLevel = 110;
}else{

if(DangerName)
if(!DangerName.Contains ("TC6"))
angerLevel = 7;
}
}
  
if(target.name.Contains ("TC7")){
if(PissedAtTC7 > 0){
PissedAtTC7 -= 1;
if(AgrianNetwork.TC7CriminalLevel > 320)
angerLevel = 110;
}else{

if(DangerName)
if(!DangerName.Contains ("TC7"))
angerLevel = 7;
}
}

if(target.name.Contains ("TC8")){
if(PissedAtTC8 > 0){
PissedAtTC8 -= 1;
if(AgrianNetwork.TC8CriminalLevel > 320)
angerLevel = 110;
}else{

if(DangerName)
if(!DangerName.Contains ("TC8"))
angerLevel = 7;
}
}

if(target.name.Contains ("TC9")){
if(PissedAtTC9 > 0){
PissedAtTC9 -= 1;
if(AgrianNetwork.TC9CriminalLevel > 320)
angerLevel = 110;
}else{

if(DangerName)
if(!DangerName.Contains ("TC9"))
angerLevel = 7;
}
}

if(PissedAtTC0a > 20 && target.name.Contains ("TC0a")){
WarningLightOn = true;
WarningLight.gameObject.SetActive (true);
}

if(PissedAtTC1 > 20 && target.name.Contains ("TC1")){
WarningLightOn = true;
WarningLight.gameObject.SetActive (true);
}
  
if(PissedAtTC3 > 20 && target.name.Contains ("TC3")){
WarningLightOn = true;
WarningLight.gameObject.SetActive (true);
}

if(PissedAtTC5 > 20 && target.name.Contains ("TC5")){
WarningLightOn = true;
WarningLight.gameObject.SetActive (true);
}
  
if(PissedAtTC6 > 20 && target.name.Contains ("TC6")){
WarningLightOn = true;
WarningLight.gameObject.SetActive (true);
}
  
if(PissedAtTC7 > 20 && target.name.Contains ("TC7")){
WarningLightOn = true;
WarningLight.gameObject.SetActive (true);
}

if(PissedAtTC8 > 20 && target.name.Contains ("TC8")){
WarningLightOn = true;
WarningLight.gameObject.SetActive (true);
}

if(PissedAtTC9 > 20 && target.name.Contains ("TC9")){
WarningLightOn = true;
WarningLight.gameObject.SetActive (true);
}

if(target.name.Contains ("sT")){
FoundSmall = true;
if(angerLevel < 10)
if(targDist > 32)
target = Waypoint;
}

if(target.name.Contains ("mT"))
FoundMedium = true;

if(target.name.Contains ("bT"))
FoundBig = true;

if(DangerSense < 1){
if(AgrianNetwork.instance.AlertTime > 1){
if(!target.name.Contains ("TC")){
if(angerLevel < 75){
Waypoint2.position = AgrianNetwork.instance.PriorityWaypoint.position;
target = Waypoint2;
}else{
if(target.name.Contains ("Reset"))
angerLevel = 50;
}
}
}
}

if(AgrianNetwork.instance.RedAlertTime > 1){
if(!target.name.Contains ("TC")){
if(angerLevel < 76){
Waypoint2.position = AgrianNetwork.instance.FullPriorityWaypoint.position;
target = Waypoint2;
}else{
if(target.name.Contains ("Reset"))
angerLevel = 50;
}
}
}

if(angerLevel > 75)
if(!Physics.Linecast (thisTransform.position, target.position, MtargetLayers))
InView = true;

}else{
target = Waypoint;
}

}else{
if(target)
if(target.name.Contains ("TC"))
if(!target.name.Contains ("C2") && !target.name.Contains ("C1"))
interrogating = false;
}

InView = false;
Upforce = false;
OnHull = false;

if(TrigTick > 0){
TrigTick -= 1;
}else{
if(target)
if(angerLevel > 75 && target.name.Contains ("TC")){
Trig.center = Vector3(0,0,0);
  Trig.radius = 250;
  Trig.height = 250;
  }
}

DangerName = null;

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

if(interrogating){
if(InterrogateTimer == 1){
ProcessSpeech("");
}
InterrogateTimer -= 1;
}

//if(target){
//Debug.Log("Is Targeting " + target.name + " with " + angerLevel + " AngerLevel");
//}

}

function Subduing(){

TheSubduer1 = Instantiate(SubduerPrefab, SubduerSpawn1.transform.position, SubduerSpawn1.transform.rotation);
TheSubduer1.rigidbody.velocity = vRigidbody.velocity * 1;
TheSubduer1.transform.GetComponent(SubduerMissileAI).target = target;
SubduerSpawn1.SetActive (false);

yield WaitForSeconds (0.5);

TheSubduer2 = Instantiate(SubduerPrefab, SubduerSpawn2.transform.position, SubduerSpawn2.transform.rotation);
TheSubduer2.rigidbody.velocity = vRigidbody.velocity * 1;
TheSubduer2.transform.GetComponent(SubduerMissileAI).target = target;
SubduerSpawn1.SetActive (false);

}


//========================================================================================================================//
//////////////////////////////////////////////////////[INTERACTION]/////////////////////////////////////////////////////////
//========================================================================================================================//


var convNum = 0;

function ProcessSpeech (speech : String){

yield WaitForSeconds (0.1);

if(interrogating){

if(convNum == 0){
//===============================================================================
convNum = 1; 
yield WaitForSeconds (2);
ReturnSpeech("User of the Kabrian vessel, \n identify yourself immediately!");
InterrogateTimer = 28;
return;
//===============================================================================
}

if(convNum == 1){
//===============================================================================

yield WaitForSeconds (2);

ReturnSpeech("You are not a registered user. \n Prepare to be subdued.");
convNum = 2;
WorldInformation.PiriExposed = 120;
interrogating = false;

if(AgrianNetwork.instance.AlertTime < 300)
AgrianNetwork.instance.AlertTime = 300;
AgrianNetwork.instance.TC1CriminalLevel = 620;

AgrianNetwork.instance.FullPriorityWaypoint.transform.position = target.position;
AgrianNetwork.instance.RedAlertTime = 300;

if(!WarningLightOn){
  WarningLightOn = true;
  WarningLight.gameObject.SetActive (true);
  angerLevel = 240;
  Warning = true;
  var TheThingS = Instantiate(AttackSound, thisTransform.position, thisTransform.rotation);
  TheThingS.transform.parent = thisTransform;
  }

return;
}
//===============================================================================

}

}

function ReturnSpeech (yourText : String){
var Load = Resources.Load("Prefabs/TalkBubble", GameObject) as GameObject;
var TGO = Instantiate(Load, thisTransform.position, Load.transform.rotation);
TGO.name = "CFC2";
TGO.GetComponent(TalkBubbleScript).myText = yourText;
TGO.GetComponent(TalkBubbleScript).source = thisVTransform;
}