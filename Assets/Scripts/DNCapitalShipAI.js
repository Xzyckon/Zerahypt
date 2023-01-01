
var target : Transform;

var Forward : Transform;

var Waypoint : Transform;

var thisTransform : Transform;
var thisVTransform : Transform;

var thisParent : Transform;

var vRigidbody : Rigidbody;

var TargetTrace : Transform;
var TargetLead : Transform;
var TLCol : SphereCollider;

var LeadCurve : AnimationCurve = new AnimationCurve();

var LeadAmount : float = 0.017;

var PDTurretSpawnF : Transform;
var PDTurretSpawnFNum = 6;
var PDTurretSpawn : Transform;
var PDTurretSpawnNum = 24;

var PDTurretFR : Transform;
var PDTurretFRAI : SurfaceTurretAI;
var PDTurretFRActive : boolean;
var PDTurretFL : Transform;
var PDTurretFLAI : SurfaceTurretAI;
var PDTurretFLActive : boolean;

var PDTurretR1 : Transform;
var PDTurretR1AI : SurfaceTurretAI;
var PDTurretR1Active : boolean;
var PDTurretR2 : Transform;
var PDTurretR2AI : SurfaceTurretAI;
var PDTurretR2Active : boolean;
var PDTurretL1 : Transform;
var PDTurretL1AI : SurfaceTurretAI;
var PDTurretL1Active : boolean;
var PDTurretL2 : Transform;
var PDTurretL2AI : SurfaceTurretAI;
var PDTurretL2Active : boolean;

var PDTurretDR1 : Transform;
var PDTurretDR1AI : SurfaceTurretAI;
var PDTurretDR1Active : boolean;
var PDTurretDR2 : Transform;
var PDTurretDR2AI : SurfaceTurretAI;
var PDTurretDR2Active : boolean;
var PDTurretDL1 : Transform;
var PDTurretDL1AI : SurfaceTurretAI;
var PDTurretDL1Active : boolean;
var PDTurretDL2 : Transform;
var PDTurretDL2AI : SurfaceTurretAI;
var PDTurretDL2Active : boolean;

var TPivot1HJ : HingeJoint;
var TPivot2HJ : HingeJoint;
var TPivot3HJ : HingeJoint;
var TPivot4HJ : HingeJoint;

var TPivot1HJTP : float;
var TPivot2HJTP : float;
var TPivot3HJTP : float;
var TPivot4HJTP : float;

var Turret1TF : Transform;
var Turret2TF : Transform;
var Turret3TF : Transform;
var Turret4TF : Transform;

var T1ElevationJoint : HingeJoint;
var T2ElevationJoint : HingeJoint;
var T3ElevationJoint : HingeJoint;
var T4ElevationJoint : HingeJoint;

var T1TraverseJoint : HingeJoint;
var T2TraverseJoint : HingeJoint;
var T3TraverseJoint : HingeJoint;
var T4TraverseJoint : HingeJoint;

var Gun1 : NPCGun;
var Gun2 : NPCGun;
var Gun3 : NPCGun;
var Gun4 : NPCGun;

var Muzzle1 : Transform;
var Muzzle2 : Transform;
var Muzzle3 : Transform;
var Muzzle4 : Transform;

var Gun1Model : Transform;
var Gun2Model : Transform;
var Gun3Model : Transform;
var Gun4Model : Transform;

var Gun1Fire : boolean;
var Gun2Fire : boolean;
var Gun3Fire : boolean;
var Gun4Fire : boolean;

var G1RN = 0;
var G2RN = 0;
var G3RN = 0;
var G4RN = 0;

var RecoilCurve : AnimationCurve = new AnimationCurve();

var AngerLevel = 0;

var PissedAtTC0a = 0;

var PissedAtTC1 = 0;
var PissedAtTC2 = 0;
var PissedAtTC3 = 0;
var PissedAtTC4 = 0;
var PissedAtTC5 = 0;
var PissedAtTC6 = 0;
var PissedAtTC7 = 0;
var PissedAtTC8 = 0;

var loops = 0;
var VicinityPoint : Transform;
var VPRadius : int;
var VPFX : ParticleSystem;

var FoundSmall : boolean;
var FoundMedium : boolean;
var FoundBig : boolean;

var Dist : float;

var Attacking : boolean;

var OffDuty : boolean;

var Obstacle : boolean;

var Parked : boolean;

var useHullAim : boolean;

var TurnRight : boolean;
var TurnLeft : boolean;

var StrafeRight : boolean;
var StrafeLeft : boolean;

var RightDist : float;
var LeftDist : float;

var RaySpreadMod : float;
var RaySpreadWidth : float;
private var RaySpread : float;

var RayLengthObstacle : float;
var RayLengthTurn : float;

var SD = 0;   //Front Shaped obstacle circumvent ray : Distance
var SDf = 0;  //Front Shaped obstacle circumvent ray : Forward Location
var SDl = 0;  //Front Shaped obstacle circumvent ray : Right Outwards Location
var SDr = 0;  //Front Shaped obstacle circumvent ray : Left Outwards Location
var SDa = 2;  //Front Shaped obstacle circumvent ray : Both Rotation Angle

var SD2 = 0;   //Rear Shaped obstacle circumvent ray : Distance
var SD2f = 0;  //Rear Shaped obstacle circumvent ray : Forward Location
var SD2l = 0;  //Rear Shaped obstacle circumvent ray : Right Outwards Location
var SD2r = 0;  //Rear Shaped obstacle circumvent ray : Left Outwards Location
var SD2a = 2;  //Rear Shaped obstacle circumvent ray : Both Rotation Angle

var DirForce : float;
var BrakeForce : float;

var AngForce : float;

var Vel : float;

var VelClampMod : float;

var MaxVel : float;

var RPClamp : float;
var RPClamp2 : float;

var targetLayers : LayerMask;
var targetLayers2 : LayerMask;
var targetLayersD : LayerMask;

var Damaged : boolean;

var CollisionFX : GameObject;

var DamageColRayFR : Transform;
var DamageColRayFRGO : GameObject;
var FRCollide : boolean;
var DamageColRayFL : Transform;
var DamageColRayFLGO : GameObject;
var FLCollide : boolean;
var FrontCollide : boolean;
var FrontCollideSFX : AudioSource;

var DamageColRayRR : Transform;
var DamageColRayRRGO : GameObject;
var RRCollide : boolean;
var DamageColRayRL : Transform;
var DamageColRayRLGO : GameObject;
var RLCollide : boolean;
var RearCollide : boolean;
var RearCollideSFX : AudioSource;

InvokeRepeating("Ticker", 1, 1);

InvokeRepeating("CalcLead", 1, 0.15);

InvokeRepeating("Shooty", 1, 4);

function Start () {

DamageColRayFRGO = DamageColRayFR.gameObject;
DamageColRayFLGO = DamageColRayFL.gameObject;

DamageColRayRRGO = DamageColRayRR.gameObject;
DamageColRayRLGO = DamageColRayRL.gameObject;

if(WorldInformation.instance.AreaSpace)
useHullAim = true;
else
useHullAim = false;

}

function Update () {

if(Damaged)
return;

if(Attacking){
if(target == Waypoint){
target = Forward;
Attacking = false;
Hunting = true;
FoundSmall = false;
FoundMedium = false;
FoundBig = false;
}
if(target == null){
target = Forward;
Attacking = false;
Hunting = true;
FoundSmall = false;
FoundMedium = false;
FoundBig = false;
}
}else{
if(target == null){
target = Forward;
Hunting = true;
FoundSmall = false;
FoundMedium = false;
FoundBig = false;
}
}

}

function FixedUpdate () {

var localV = thisVTransform.InverseTransformDirection(vRigidbody.velocity);

if(Damaged){

var hitD : RaycastHit;

if(!FRCollide){
      Debug.DrawRay (DamageColRayFR.position + Vector3.up * 64, -Vector3.up * 64, Color.magenta);
if (Physics.Raycast (DamageColRayFR.position + Vector3.up * 64, -Vector3.up, hitD, 64, targetLayersD)){

FRCollide = true;

var theRB1 = DamageColRayFRGO.AddComponent ("Rigidbody");
theRB1.mass = vRigidbody.mass * 0.05;
theRB1.drag = 16;
theRB1.useGravity = false;

var theSpringJoint1 = DamageColRayFRGO.AddComponent ("SpringJoint");
theSpringJoint1.spring = vRigidbody.mass * 0.2;
theSpringJoint1.damper = vRigidbody.mass * 0.05;

var theFixedJoint1 = DamageColRayFRGO.AddComponent ("FixedJoint");
theFixedJoint1.connectedBody = vRigidbody;

var theSphereCol1 = DamageColRayFRGO.AddComponent ("SphereCollider");
theSphereCol1.radius = vRigidbody.mass * 0.0005;

var NormalAngle1 = Quaternion.LookRotation(hitD.normal);
Instantiate(CollisionFX, DamageColRayFR.position, NormalAngle1);
}
}

if(!FLCollide){
      Debug.DrawRay (DamageColRayFL.position + Vector3.up * 64, -Vector3.up * 64, Color.magenta);
if (Physics.Raycast (DamageColRayFL.position + Vector3.up * 64, -Vector3.up, hitD, 64, targetLayersD)){

FLCollide = true;

var theRB2 = DamageColRayFLGO.AddComponent ("Rigidbody");
theRB2.mass = vRigidbody.mass * 0.05;
theRB2.drag = 16;
theRB2.useGravity = false;

var theSpringJoint2 = DamageColRayFLGO.AddComponent ("SpringJoint");
theSpringJoint2.spring = vRigidbody.mass * 0.2;
theSpringJoint2.damper = vRigidbody.mass * 0.05;

var theFixedJoint2 = DamageColRayFLGO.AddComponent ("FixedJoint");
theFixedJoint2.connectedBody = vRigidbody;

var theSphereCol2 = DamageColRayFLGO.AddComponent ("SphereCollider");
theSphereCol2.radius = vRigidbody.mass * 0.0005;

var NormalAngle2 = Quaternion.LookRotation(hitD.normal);
Instantiate(CollisionFX, DamageColRayFL.position, NormalAngle2);
}
}

if(!RRCollide){
      Debug.DrawRay (DamageColRayRR.position + Vector3.up * 64, -Vector3.up * 64, Color.magenta);
if (Physics.Raycast (DamageColRayRR.position + Vector3.up * 64, -Vector3.up, hitD, 64, targetLayersD)){

RRCollide = true;

var theRB3 = DamageColRayRRGO.AddComponent ("Rigidbody");
theRB3.mass = vRigidbody.mass * 0.05;
theRB3.drag = 16;
theRB3.useGravity = false;

var theSpringJoint3 = DamageColRayRRGO.AddComponent ("SpringJoint");
theSpringJoint3.spring = vRigidbody.mass * 0.2;
theSpringJoint3.damper = vRigidbody.mass * 0.05;

var theFixedJoint3 = DamageColRayRRGO.AddComponent ("FixedJoint");
theFixedJoint3.connectedBody = vRigidbody;

var theSphereCol3 = DamageColRayRRGO.AddComponent ("SphereCollider");
theSphereCol3.radius = vRigidbody.mass * 0.0005;

var NormalAngle3 = Quaternion.LookRotation(hitD.normal);
Instantiate(CollisionFX, DamageColRayRR.position, NormalAngle3);
}
}

if(!RLCollide){
      Debug.DrawRay (DamageColRayRL.position + Vector3.up * 64, -Vector3.up * 64, Color.magenta);
if (Physics.Raycast (DamageColRayRL.position + Vector3.up * 64, -Vector3.up, hitD, 64, targetLayersD)){

RLCollide = true;

var theRB4 = DamageColRayRLGO.AddComponent ("Rigidbody");
theRB4.mass = vRigidbody.mass * 0.05;
theRB4.drag = 16;
theRB4.useGravity = false;

var theSpringJoint4 = DamageColRayRLGO.AddComponent ("SpringJoint");
theSpringJoint4.spring = vRigidbody.mass * 0.2;
theSpringJoint4.damper = vRigidbody.mass * 0.05;

var theFixedJoint4 = DamageColRayRLGO.AddComponent ("FixedJoint");
theFixedJoint4.connectedBody = vRigidbody;

var theSphereCol4 = DamageColRayRLGO.AddComponent ("SphereCollider");
theSphereCol4.radius = vRigidbody.mass * 0.0005;

var NormalAngle4 = Quaternion.LookRotation(hitD.normal);
Instantiate(CollisionFX, DamageColRayRL.position, NormalAngle4);
}
}

if(!FRCollide && !FLCollide && !RRCollide && !RLCollide){
vRigidbody.AddTorque(thisTransform.up * -AngForce * vRigidbody.mass * 0.5);
vRigidbody.AddTorque(thisTransform.right * AngForce * vRigidbody.mass * 0.8);

GravDiv = -Physics.gravity.y;

vRigidbody.AddForce(Vector3.up * vRigidbody.mass * 0.5 * GravDiv);
}

if(!FrontCollide){
if(FRCollide || FLCollide){
FrontCollideSFX.Play();
FrontCollide = true;
}
}

if(!RearCollide){
if(RRCollide || RLCollide){
RearCollideSFX.Play();
RearCollide = true;
}
}

return;
}

var VelClamp = Mathf.Clamp(Vel * VelClampMod,16,2048);

var hit : RaycastHit;

if(target)
Dist = Vector3.Distance(thisTransform.position, target.position);
else
Dist = 64;

Vel = -localV.y * 2.24;




if(RaySpread < RaySpreadWidth){
RaySpread += RaySpreadMod;
}else{
RaySpread = RaySpreadMod;
Obstacle = false;
}






Debug.DrawRay (thisTransform.position + thisTransform.forward * RayLengthObstacle + thisTransform.right * RaySpread, thisTransform.forward * VelClamp, Color.red);
Debug.DrawRay (thisTransform.position + thisTransform.forward * RayLengthObstacle + -thisTransform.right * RaySpread, thisTransform.forward * VelClamp, Color.red);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * RayLengthObstacle + thisTransform.right * RaySpread, thisTransform.forward, VelClamp, targetLayers)
|| Physics.Raycast (thisTransform.position + thisTransform.forward * RayLengthObstacle + -thisTransform.right * RaySpread, thisTransform.forward, VelClamp, targetLayers))
Obstacle = true;

Debug.DrawRay (thisTransform.position + thisTransform.forward * RayLengthTurn + thisTransform.right * RaySpread, thisTransform.forward * VelClamp * 2, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * RayLengthTurn + thisTransform.right * RaySpread, thisTransform.forward, hit, VelClamp * 2, targetLayers))
RightDist = hit.distance;
else
RightDist = 200;

Debug.DrawRay (thisTransform.position + thisTransform.forward * RayLengthTurn + -thisTransform.right * RaySpread, thisTransform.forward * VelClamp * 2, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * RayLengthTurn + -thisTransform.right * RaySpread, thisTransform.forward, hit, VelClamp * 2, targetLayers))
LeftDist = hit.distance;
else
LeftDist = 200;

if(RightDist > LeftDist)
TurnRight = true;
     
if(LeftDist > RightDist)
TurnLeft = true;

var newRot2 : Vector3;

newRot2 = (thisTransform.forward * 32 + thisTransform.right * -SDa).normalized;
Debug.DrawRay (thisTransform.position + thisTransform.forward * SDf + thisTransform.right * SDl, newRot2 * SD, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * SDf + thisTransform.right * SDl, newRot2, hit, SD, targetLayers))
RightDist = hit.distance;
else
RightDist = 512;
 
newRot2 = (thisTransform.forward * 32 + thisTransform.right * SDa).normalized;
Debug.DrawRay (thisTransform.position + thisTransform.forward * SDf + -thisTransform.right * SDr, newRot2 * SD, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * SDf + -thisTransform.right * SDr, newRot2, hit, SD, targetLayers))
LeftDist = hit.distance;
else
LeftDist = 512;
		
newRot2 = (thisTransform.forward * 32 + thisTransform.right * -SD2a).normalized;
Debug.DrawRay (thisTransform.position + thisTransform.forward * SD2f + thisTransform.right * SD2l, newRot2 * SD2, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * SD2f + thisTransform.right * SD2l, newRot2, hit, SD2, targetLayers))
RightDist = 1;
 
newRot2 = (thisTransform.forward * 32 + thisTransform.right * SD2a).normalized;
Debug.DrawRay (thisTransform.position + thisTransform.forward * SD2f + -thisTransform.right * SD2r, newRot2 * SD2, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * SD2f + -thisTransform.right * SD2r, newRot2, hit, SD2, targetLayers))
LeftDist = 1;
 
if(RightDist > LeftDist)
StrafeRight = true;
     
if(LeftDist > RightDist)
StrafeLeft = true;








if(target)
var relativePoint = thisTransform.InverseTransformPoint(target.position);

LAndR = relativePoint.x * 8;

RPClamp = Mathf.Clamp(LAndR / Dist,-1,1);

if(useHullAim){
UAndD = relativePoint.y * 8;
RPClamp2 = Mathf.Clamp(UAndD / Dist,-1,1);
}






if(TurnLeft && !TurnRight)
vRigidbody.AddTorque(thisTransform.up * -AngForce * vRigidbody.mass);

if(TurnRight && !TurnLeft)
vRigidbody.AddTorque(thisTransform.up * AngForce * vRigidbody.mass);

if(!TurnRight && !TurnLeft){
vRigidbody.AddTorque(thisTransform.up * AngForce * vRigidbody.mass * RPClamp);

if(useHullAim)
vRigidbody.AddTorque(thisTransform.right * AngForce * vRigidbody.mass * -RPClamp2);

}







if(StrafeRight && !StrafeLeft){
  vRigidbody.AddForce(thisVTransform.right * DirForce * vRigidbody.mass);
}

if(StrafeLeft && !StrafeRight){
  vRigidbody.AddForce(-thisVTransform.right * DirForce * vRigidbody.mass);
}








if(!Parked){
if(Obstacle){
if(Vel > 0)
vRigidbody.AddForce(thisVTransform.up * BrakeForce * vRigidbody.mass);
}else{
if(Vel < MaxVel)
vRigidbody.AddForce(-thisVTransform.up * DirForce * vRigidbody.mass);
}
}










if(target){
var RelPoint1 = Turret1TF.InverseTransformPoint(TargetLead.position);
var RelPoint2 = Turret2TF.InverseTransformPoint(TargetLead.position);
var RelPoint3 = Turret3TF.InverseTransformPoint(TargetLead.position);
var RelPoint4 = Turret4TF.InverseTransformPoint(TargetLead.position);
}

if(Attacking){

Vert = Mathf.Clamp(-RelPoint1.z * 800 / Dist,-64,64);
Hori = Mathf.Clamp(RelPoint1.x * 800 / Dist,-64,64);
T1ElevationJoint.motor.targetVelocity = Vert;
T1TraverseJoint.motor.targetVelocity = Hori;

Vert = Mathf.Clamp(-RelPoint2.z * 800 / Dist,-64,64);
Hori = Mathf.Clamp(RelPoint2.x * 800 / Dist,-64,64);
T2ElevationJoint.motor.targetVelocity = Vert;
T2TraverseJoint.motor.targetVelocity = Hori;

Vert = Mathf.Clamp(-RelPoint3.z * 800 / Dist,-64,64);
Hori = Mathf.Clamp(RelPoint3.x * 800 / Dist,-64,64);
T3ElevationJoint.motor.targetVelocity = Vert;
T3TraverseJoint.motor.targetVelocity = Hori;

Vert = Mathf.Clamp(-RelPoint4.z * 800 / Dist,-64,64);
Hori = Mathf.Clamp(RelPoint4.x * 800 / Dist,-64,64);
T4ElevationJoint.motor.targetVelocity = Vert;
T4TraverseJoint.motor.targetVelocity = Hori;

}else{

RelPoint1 = Turret1TF.InverseTransformPoint(Forward.position);
Vert = Mathf.Clamp(-RelPoint1.z,-64,64);
Hori = Mathf.Clamp(RelPoint1.x,-64,64);
T1ElevationJoint.motor.targetVelocity = Vert;
T1TraverseJoint.motor.targetVelocity = Hori;

RelPoint2 = Turret2TF.InverseTransformPoint(Forward.position);
Vert = Mathf.Clamp(-RelPoint2.z,-64,64);
Hori = Mathf.Clamp(RelPoint2.x,-64,64);
T2ElevationJoint.motor.targetVelocity = Vert;
T2TraverseJoint.motor.targetVelocity = Hori;

RelPoint3 = Turret3TF.InverseTransformPoint(Forward.position);
Vert = Mathf.Clamp(-RelPoint3.z,-64,64);
Hori = Mathf.Clamp(RelPoint3.x,-64,64);
T3ElevationJoint.motor.targetVelocity = Vert;
T3TraverseJoint.motor.targetVelocity = Hori;

RelPoint4 = Turret4TF.InverseTransformPoint(Forward.position);
Vert = Mathf.Clamp(-RelPoint4.z,-64,64);
Hori = Mathf.Clamp(RelPoint4.x,-64,64);
T4ElevationJoint.motor.targetVelocity = Vert;
T4TraverseJoint.motor.targetVelocity = Hori;

}















if(AngerLevel > 100){

T1ElevationJoint.limits.min = -40;
T2ElevationJoint.limits.min = -40;
T3ElevationJoint.limits.min = -40;
T4ElevationJoint.limits.min = -40;

if(-TPivot1HJTP < 45)
TPivot1HJTP -= 0.5;
if(-TPivot2HJTP < 45)
TPivot2HJTP -= 0.5;
if(-TPivot3HJTP < 45)
TPivot3HJTP -= 0.5;
if(-TPivot4HJTP < 45)
TPivot4HJTP -= 0.5;

if(-TPivot1HJTP > 44){
TPivot1HJTP = -45;
Attacking = true;
}

}else{

T1ElevationJoint.limits.min = 0;
T2ElevationJoint.limits.min = 0;
T3ElevationJoint.limits.min = 0;
T4ElevationJoint.limits.min = 0;

if(-TPivot1HJTP > 0)
TPivot1HJTP += 0.5;
if(-TPivot2HJTP > 0)
TPivot2HJTP += 0.5;
if(-TPivot3HJTP > 0)
TPivot3HJTP += 0.5;
if(-TPivot4HJTP > 0)
TPivot4HJTP += 0.5;

if(-TPivot1HJTP < 44)
Attacking = false;

}

TPivot1HJ.spring.targetPosition = -TPivot1HJTP;
TPivot2HJ.spring.targetPosition = -TPivot2HJTP;
TPivot3HJ.spring.targetPosition = -TPivot3HJTP;
TPivot4HJ.spring.targetPosition = -TPivot4HJTP;

if(Gun1Fire){
G1RN += 1;
if(G1RN > 40){
G1RN = 0;
Gun1Fire = false;
}
Gun1Model.localPosition.y = RecoilCurve.Evaluate(G1RN);
}
if(Gun2Fire){
G2RN += 1;
if(G2RN > 40){
G2RN = 0;
Gun2Fire = false;
}
Gun2Model.localPosition.y = RecoilCurve.Evaluate(G2RN);
}
if(Gun3Fire){
G3RN += 1;
if(G3RN > 40){
G3RN = 0;
Gun3Fire = false;
}
Gun3Model.localPosition.y = RecoilCurve.Evaluate(G3RN);
}
if(Gun4Fire){
G4RN += 1;
if(G4RN > 40){
G4RN = 0;
Gun4Fire = false;
}
Gun4Model.localPosition.y = RecoilCurve.Evaluate(G4RN);
}

}

function OnTriggerEnter (other : Collider) {

var hitT : RaycastHit;

ON = other.name;
OT = other.transform;

if(ON.Contains ("TFC"))
if(!ON.Contains ("TFC9")){

if(AngerLevel < 200)
AngerLevel += 45;

var RTT = OT.InverseTransformPoint(thisVTransform.position);

RTPx = Mathf.Abs(RTT.x);
RTPy = Mathf.Abs(RTT.y);

RTP = RTPx + RTPy;

VicinityPoint.position = OT.position;

if(ON.Contains ("TFC0a"))
PissedAtTC0a += 1;
if(ON.Contains ("TFC1"))
PissedAtTC1 += 1;
if(ON.Contains ("TFC2"))
PissedAtTC2 += 1;
if(ON.Contains ("TFC3"))
PissedAtTC3 += 1;
if(ON.Contains ("TFC4"))
PissedAtTC4 += 1;
if(ON.Contains ("TFC5"))
PissedAtTC5 += 1;
if(ON.Contains ("TFC6"))
PissedAtTC6 += 1;
if(ON.Contains ("TFC7"))
PissedAtTC7 += 1;
if(ON.Contains ("TFC8"))
PissedAtTC8 += 1;

}

}

function Ticker () {

if(Damaged)
return;

TurnLeft = false;
TurnRight = false;
StrafeRight = false;
StrafeLeft = false;

if(target){

if(PDTurretFRAI)
PDTurretFRAI.target = target;

if(PDTurretFLAI)
PDTurretFLAI.target = target;

if(PDTurretR1AI)
PDTurretR1AI.target = target;

if(PDTurretR2AI)
PDTurretR2AI.target = target;

if(PDTurretL1AI)
PDTurretL1AI.target = target;

if(PDTurretL2AI)
PDTurretL2AI.target = target;

if(PDTurretDR1AI)
PDTurretDR1AI.target = target;

if(PDTurretDR2AI)
PDTurretDR2AI.target = target;

if(PDTurretDL1AI)
PDTurretDL1AI.target = target;

if(PDTurretDL2AI)
PDTurretDL2AI.target = target;

if(target.name.Contains ("sT"))
FoundSmall = true;

if(target.name.Contains ("mT"))
FoundMedium = true;

if(target.name.Contains ("bT"))
FoundBig = true;
DutvutanianNetwork.instance.EnemyTargetMed = target;

if(!target.name.Contains ("TC"))
if(DutvutanianNetwork.AlertTime > 200){
Waypoint.position = DutvutanianNetwork.instance.PriorityWaypoint.position;
target = Waypoint;
}
}

if(AngerLevel > 0)
AngerLevel -= 1;

PissedAtTC1 = DutvutanianNetwork.TC1CriminalLevel;
PissedAtTC2 = DutvutanianNetwork.TC2CriminalLevel;
PissedAtTC3 = DutvutanianNetwork.TC3CriminalLevel;
PissedAtTC4 = DutvutanianNetwork.TC4CriminalLevel;
PissedAtTC5 = DutvutanianNetwork.TC5CriminalLevel;
PissedAtTC6 = DutvutanianNetwork.TC6CriminalLevel;
PissedAtTC7 = DutvutanianNetwork.TC7CriminalLevel;
PissedAtTC8 = DutvutanianNetwork.TC8CriminalLevel;

VicinityCheck();

}

function VicinityCheck () {

var gos : GameObject[];
gos = GameObject.FindGameObjectsWithTag("TC");

//var Blip = Resources.Load("Prefabs/RadarBlip", GameObject) as GameObject;
 
for (var go : GameObject in gos) {

var ON = go.name;
var OT = go.transform;

if(!ON.Contains ("9")){

if(VPRadius < 2000)
VPRadius += 100;

if(target)
if(!target.name.Contains ("TC"))
Attacking = false;


if(Vector3.Distance(VicinityPoint.position, OT.position) < VPRadius){

//Debug.Log(ON);
//Instantiate(Blip, OT.position, OT.rotation);

if(Vector3.Distance(thisTransform.position, OT.position) < 150)
if(ON.Contains ("TC"))
  Stranger = OT;
  
if(ON.Contains ("xb")){
if(ON.Contains ("C1")){DutvutanianNetwork.AnExtraBigTC1 = OT;}
if(ON.Contains ("C2")){DutvutanianNetwork.AnExtraBigTC4 = OT;}
if(ON.Contains ("C3")){DutvutanianNetwork.AnExtraBigTC4 = OT;}
if(ON.Contains ("C4")){DutvutanianNetwork.AnExtraBigTC4 = OT;}
if(ON.Contains ("C5")){DutvutanianNetwork.AnExtraBigTC5 = OT;}
if(ON.Contains ("C6")){DutvutanianNetwork.AnExtraBigTC6 = OT;}
if(ON.Contains ("C7")){DutvutanianNetwork.AnExtraBigTC7 = OT;}
if(ON.Contains ("C8")){DutvutanianNetwork.AnExtraBigTC4 = OT;}
}
  
if(PissedAtTC0a > 1)
 if(ON.Contains ("TC0a")){
 
 if(ON.Contains ("sT") && !FoundSmall ||
    ON.Contains ("mT") && !FoundMedium ||
    ON.Contains ("bT")){
 
  Hunting = false;
  target = OT;
  AngerLevel = 200;
  
  VPRadius = 32;
  
  Attacking = true;
 }
}
  
if(PissedAtTC1 > 1)
if(ON.Contains ("TC1")){
 
 if(ON.Contains ("sT") && !FoundSmall ||
    ON.Contains ("mT") && !FoundMedium ||
    ON.Contains ("bT")){
 
  Hunting = false;
  target = OT;
  AngerLevel = 200;
  
  VPRadius = 32;
  
  Attacking = true;
}
}

if(PissedAtTC2 > 1)
if(ON.Contains ("TC2")){
 
 if(ON.Contains ("sT") && !FoundSmall ||
    ON.Contains ("mT") && !FoundMedium ||
    ON.Contains ("bT")){
 
  Hunting = false;
  target = OT;
  AngerLevel = 200;
  
  VPRadius = 32;
  
  Attacking = true;
}
}

if(PissedAtTC3 > 1)
if(ON.Contains ("TC3")){
 
 if(ON.Contains ("sT") && !FoundSmall ||
    ON.Contains ("mT") && !FoundMedium ||
    ON.Contains ("bT")){
 
  Hunting = false;
  target = OT;
  AngerLevel = 200;
  
  VPRadius = 32;
  
  Attacking = true;
}
}

if(PissedAtTC4 > 1)
 if(ON.Contains ("TC4")){
 
 if(ON.Contains ("sT") && !FoundSmall ||
    ON.Contains ("mT") && !FoundMedium ||
    ON.Contains ("bT")){
 
  Hunting = false;
  target = OT;
  AngerLevel = 200;
  
  VPRadius = 32;
  
  Attacking = true;
}
}

if(PissedAtTC5 > 1)
 if(ON.Contains ("TC5")){
 
 if(ON.Contains ("sT") && !FoundSmall ||
    ON.Contains ("mT") && !FoundMedium ||
    ON.Contains ("bT")){
 
  Hunting = false;
  target = OT;
  AngerLevel = 200;
  
  VPRadius = 32;
  
  Attacking = true;
}
}

if(PissedAtTC6 > 1)
 if(ON.Contains ("TC6")){
 
 if(ON.Contains ("sT") && !FoundSmall ||
    ON.Contains ("mT") && !FoundMedium ||
    ON.Contains ("bT")){
 
  Hunting = false;
  target = OT;
  AngerLevel = 200;
  
  VPRadius = 32;
  
  Attacking = true;
}
}

if(PissedAtTC7 > 1)
 if(ON.Contains ("TC7")){
 
 if(ON.Contains ("sT") && !FoundSmall ||
    ON.Contains ("mT") && !FoundMedium ||
    ON.Contains ("bT")){
 
  Hunting = false;
  target = OT;
  AngerLevel = 200;
  
  VPRadius = 32;
  
  Attacking = true;
}
}

if(PissedAtTC8 > 1)
if(ON.Contains ("TC8")){
 
 if(ON.Contains ("sT") && !FoundSmall ||
    ON.Contains ("mT") && !FoundMedium ||
    ON.Contains ("bT")){
 
  Hunting = false;
  target = OT;
  AngerLevel = 200;
  
  VPRadius = 32;
  
  Attacking = true;
}
}



}
}


//++loops;
//if(loops > 64) {
//Debug.LogError("64 loops");
//loops = 0;
//break;
//}

}

//Debug.Log(loops + " loops");
//loops = 0;

}

function FireRay () {

var hit : RaycastHit;

var HCN : String;

if(Gun1)
if(target != null)
if (target.name.Contains ("TC") && Dist < 8000)
if (Physics.Raycast (Muzzle1.position, Muzzle1.forward, hit, 8000, targetLayers2)){

HCN = hit.collider.name;

if(!HCN.Contains("C9"))
if(HCN.Contains("TL"))
hit.transform.Translate(Vector3.down * -512);

if(!HCN.Contains("C9"))
if(HCN.Contains("TL"))
hit.transform.Translate(Vector3.down * -512);


if(!hit.collider.name.Contains("C9"))
if(hit.collider.name.Contains ("TC") || hit.collider.name.Contains ("TL9")){
Gun1Fire = true;
Gun1.Fire();

}
}

yield WaitForSeconds (0.3);

if(Gun2)
if(target != null)
if (target.name.Contains ("TC") && Dist < 8000)
if (Physics.Raycast (Muzzle2.position, Muzzle2.forward, hit, 8000, targetLayers2)){

HCN = hit.collider.name;

if(!HCN.Contains("C9"))
if(HCN.Contains("TL"))
hit.transform.Translate(Vector3.down * -512);

if(!HCN.Contains("C9"))
if(HCN.Contains("TL"))
hit.transform.Translate(Vector3.down * -512);

if(!hit.collider.name.Contains("C9"))
if(hit.collider.name.Contains ("TC") || hit.collider.name.Contains ("TL9")){
Gun2Fire = true;
Gun2.Fire();

}
}

yield WaitForSeconds (0.3);

if(Gun3)
if(target != null)
if (target.name.Contains ("TC") && Dist < 8000)
if (Physics.Raycast (Muzzle3.position, Muzzle3.forward, hit, 8000, targetLayers2)){

HCN = hit.collider.name;

if(!HCN.Contains("C9"))
if(HCN.Contains("TL"))
hit.transform.Translate(Vector3.down * -512);

if(!HCN.Contains("C9"))
if(HCN.Contains("TL"))
hit.transform.Translate(Vector3.down * -512);

if(!hit.collider.name.Contains("C9"))
if(hit.collider.name.Contains ("TC") || hit.collider.name.Contains ("TL9")){
Gun3Fire = true;
Gun3.Fire();

}
}

yield WaitForSeconds (0.3);

if(Gun4)
if(target != null)
if (target.name.Contains ("TC") && Dist < 8000)
if (Physics.Raycast (Muzzle4.position, Muzzle4.forward, hit, 8000, targetLayers2)){

HCN = hit.collider.name;

if(!HCN.Contains("C9"))
if(HCN.Contains("TL"))
hit.transform.Translate(Vector3.down * -512);

if(!HCN.Contains("C9"))
if(HCN.Contains("TL"))
hit.transform.Translate(Vector3.down * -512);

if(!HCN.Contains("C9"))
if(HCN.Contains ("TC") || HCN.Contains ("TL9")){
Gun4Fire = true;
Gun4.Fire();

}
}

}

function Shooty (){

if(Damaged)
return;

if(Attacking)
FireRay();

if(OffDuty)
return;













if(!PDTurretFRActive){
if(PDTurretSpawnFNum > 0){
PDTurretSpawnFNum -= 1;
PDTurretFRActive = true;
var Spawnionaise1 = Resources.Load("Machines/SurfaceTurret_DN", GameObject) as GameObject;
var _SpawnedObject1 = Instantiate(Spawnionaise1, PDTurretSpawnF.position, PDTurretSpawnF.rotation);
PDTurretFRAI =_SpawnedObject1.transform.GetChild(0).transform.GetComponent(SurfaceTurretAI);
PDTurretFRAI.absoluteParent = thisVTransform;
PDTurretFRAI.targetDestination = PDTurretFR;
PDTurretFRAI.upperParent = thisParent;
PDTurretFRAI.mainVesselRB = vRigidbody;

_SpawnedObject1.transform.parent = thisVTransform;
    
return;
}
}else{
if(!PDTurretFRAI)
PDTurretFRActive = false;
}

if(!PDTurretFLActive){
if(PDTurretSpawnFNum > 0){
PDTurretSpawnFNum -= 1;
PDTurretFLActive = true;
var Spawnionaise2 = Resources.Load("Machines/SurfaceTurret_DN", GameObject) as GameObject;
var _SpawnedObject2 = Instantiate(Spawnionaise2, PDTurretSpawnF.position, PDTurretSpawnF.rotation);
PDTurretFLAI =_SpawnedObject2.transform.GetChild(0).transform.GetComponent(SurfaceTurretAI);
PDTurretFLAI.absoluteParent = thisVTransform;
PDTurretFLAI.targetDestination = PDTurretFL;
PDTurretFLAI.upperParent = thisParent;
PDTurretFLAI.mainVesselRB = vRigidbody;

_SpawnedObject2.transform.parent = thisVTransform;
    
return;
}
}else{
if(!PDTurretFLAI)
PDTurretFLActive = false;
}
















if(!PDTurretR1Active){
if(PDTurretSpawnNum > 0){
PDTurretSpawnNum -= 1;
PDTurretR1Active = true;
var Spawnionaise3 = Resources.Load("Machines/SurfaceTurret_DN", GameObject) as GameObject;
var _SpawnedObject3 = Instantiate(Spawnionaise3, PDTurretSpawn.position, PDTurretSpawn.rotation);
PDTurretR1AI =_SpawnedObject3.transform.GetChild(0).transform.GetComponent(SurfaceTurretAI);
PDTurretR1AI.absoluteParent = thisVTransform;
PDTurretR1AI.targetDestination = PDTurretR1;
PDTurretR1AI.upperParent = thisParent;
PDTurretR1AI.mainVesselRB = vRigidbody;

_SpawnedObject3.transform.parent = thisVTransform;
    
return;
}
}else{
if(!PDTurretR1AI)
PDTurretR1Active = false;
}

if(!PDTurretR2Active){
if(PDTurretSpawnNum > 0){
PDTurretSpawnNum -= 1;
PDTurretR2Active = true;
var Spawnionaise4 = Resources.Load("Machines/SurfaceTurret_DN", GameObject) as GameObject;
var _SpawnedObject4 = Instantiate(Spawnionaise4, PDTurretSpawn.position, PDTurretSpawn.rotation);
PDTurretR2AI =_SpawnedObject4.transform.GetChild(0).transform.GetComponent(SurfaceTurretAI);
PDTurretR2AI.absoluteParent = thisVTransform;
PDTurretR2AI.targetDestination = PDTurretR2;
PDTurretR2AI.upperParent = thisParent;
PDTurretR2AI.mainVesselRB = vRigidbody;

_SpawnedObject4.transform.parent = thisVTransform;

return;
}
}else{
if(!PDTurretR2AI)
PDTurretR2Active = false;
}

if(!PDTurretL1Active){
if(PDTurretSpawnNum > 0){
PDTurretSpawnNum -= 1;
PDTurretL1Active = true;
var Spawnionaise5 = Resources.Load("Machines/SurfaceTurret_DN", GameObject) as GameObject;
var _SpawnedObject5 = Instantiate(Spawnionaise5, PDTurretSpawn.position, PDTurretSpawn.rotation);
PDTurretL1AI =_SpawnedObject5.transform.GetChild(0).transform.GetComponent(SurfaceTurretAI);
PDTurretL1AI.absoluteParent = thisVTransform;
PDTurretL1AI.targetDestination = PDTurretL1;
PDTurretL1AI.upperParent = thisParent;
PDTurretL1AI.mainVesselRB = vRigidbody;

_SpawnedObject5.transform.parent = thisVTransform;

return;
}
}else{
if(!PDTurretL1AI)
PDTurretL1Active = false;
}

if(!PDTurretL2Active){
if(PDTurretSpawnNum > 0){
PDTurretSpawnNum -= 1;
PDTurretL2Active = true;
var Spawnionaise6 = Resources.Load("Machines/SurfaceTurret_DN", GameObject) as GameObject;
var _SpawnedObject6 = Instantiate(Spawnionaise6, PDTurretSpawn.position, PDTurretSpawn.rotation);
PDTurretL2AI =_SpawnedObject6.transform.GetChild(0).transform.GetComponent(SurfaceTurretAI);
PDTurretL2AI.absoluteParent = thisVTransform;
PDTurretL2AI.targetDestination = PDTurretL2;
PDTurretL2AI.upperParent = thisParent;
PDTurretL2AI.mainVesselRB = vRigidbody;

_SpawnedObject6.transform.parent = thisVTransform;

return;
}
}else{
if(!PDTurretL2AI)
PDTurretL2Active = false;
}

if(!PDTurretDR1Active){
if(PDTurretSpawnNum > 0){
PDTurretSpawnNum -= 1;
PDTurretDR1Active = true;
var Spawnionaise7 = Resources.Load("Machines/SurfaceTurret_DN", GameObject) as GameObject;
var _SpawnedObject7 = Instantiate(Spawnionaise7, PDTurretSpawn.position, PDTurretSpawn.rotation);
PDTurretDR1AI =_SpawnedObject7.transform.GetChild(0).transform.GetComponent(SurfaceTurretAI);
PDTurretDR1AI.absoluteParent = thisVTransform;
PDTurretDR1AI.targetDestination = PDTurretDR2;
PDTurretDR1AI.targetFinalDestination = PDTurretDR1;
PDTurretDR1AI.upperParent = thisParent;
PDTurretDR1AI.mainVesselRB = vRigidbody;


_SpawnedObject7.transform.parent = thisVTransform;

return;
}
}else{
if(!PDTurretDR1AI)
PDTurretDR1Active = false;
}

if(!PDTurretDR2Active){
if(PDTurretSpawnNum > 0){
PDTurretSpawnNum -= 1;
PDTurretDR2Active = true;
var Spawnionaise8 = Resources.Load("Machines/SurfaceTurret_DN", GameObject) as GameObject;
var _SpawnedObject8 = Instantiate(Spawnionaise8, PDTurretSpawn.position, PDTurretSpawn.rotation);
PDTurretDR2AI =_SpawnedObject8.transform.GetChild(0).transform.GetComponent(SurfaceTurretAI);
PDTurretDR2AI.absoluteParent = thisVTransform;
PDTurretDR2AI.targetDestination = PDTurretDR2;
PDTurretDR2AI.upperParent = thisParent;
PDTurretDR2AI.mainVesselRB = vRigidbody;

_SpawnedObject8.transform.parent = thisVTransform;

return;
}
}else{
if(!PDTurretDR2AI)
PDTurretDR2Active = false;
}

if(!PDTurretDL1Active){
if(PDTurretSpawnNum > 0){
PDTurretSpawnNum -= 1;
PDTurretDL1Active = true;
var Spawnionaise9 = Resources.Load("Machines/SurfaceTurret_DN", GameObject) as GameObject;
var _SpawnedObject9 = Instantiate(Spawnionaise9, PDTurretSpawn.position, PDTurretSpawn.rotation);
PDTurretDL1AI =_SpawnedObject9.transform.GetChild(0).transform.GetComponent(SurfaceTurretAI);
PDTurretDL1AI.absoluteParent = thisVTransform;
PDTurretDL1AI.targetDestination = PDTurretDL2;
PDTurretDL1AI.targetFinalDestination = PDTurretDL1;
PDTurretDL1AI.upperParent = thisParent;
PDTurretDL1AI.mainVesselRB = vRigidbody;

_SpawnedObject9.transform.parent = thisVTransform;

return;
}
}else{
if(!PDTurretDL1AI)
PDTurretDL1Active = false;
}

if(!PDTurretDL2Active){
if(PDTurretSpawnNum > 0){
PDTurretSpawnNum -= 1;
PDTurretDL2Active = true;
var Spawnionaise10 = Resources.Load("Machines/SurfaceTurret_DN", GameObject) as GameObject;
var _SpawnedObject10 = Instantiate(Spawnionaise10, PDTurretSpawn.position, PDTurretSpawn.rotation);
PDTurretDL2AI =_SpawnedObject10.transform.GetChild(0).transform.GetComponent(SurfaceTurretAI);
PDTurretDL2AI.absoluteParent = thisVTransform;
PDTurretDL2AI.targetDestination = PDTurretDL2;
PDTurretDL2AI.upperParent = thisParent;
PDTurretDL2AI.mainVesselRB = vRigidbody;

_SpawnedObject10.transform.parent = thisVTransform;

return;
}
}else{
if(!PDTurretDL2AI)
PDTurretDL2Active = false;
}

}

function CalcLead (){

Lead();

}

function Lead (){

if(target && TargetTrace)
TargetTrace.position = target.position;

yield WaitForSeconds (0.1);

if(target && TargetTrace){

var Dist1 = Vector3.Distance(TargetTrace.position, target.position);

var Dist2 = LeadCurve.Evaluate(Dist) * Dist1;

TargetTrace.LookAt(target);

TargetLead.position = TargetTrace.position;
TargetLead.rotation = TargetTrace.rotation;
TargetLead.position += TargetLead.forward * Dist2 * LeadAmount;

TLCol.radius = 8;

}
}

function Damage () {
Damaged = true;

if(PDTurretFRAI)
PDTurretFRAI.Damage();

if(PDTurretFLAI)
PDTurretFRAI.Damage();

if(PDTurretR1AI)
PDTurretFRAI.Damage();

if(PDTurretR2AI)
PDTurretFRAI.Damage();

if(PDTurretL1AI)
PDTurretFRAI.Damage();

if(PDTurretL2AI)
PDTurretFRAI.Damage();

if(PDTurretDR1AI)
PDTurretFRAI.Damage();

if(PDTurretDR2AI)
PDTurretFRAI.Damage();

if(PDTurretDL1AI)
PDTurretFRAI.Damage();

if(PDTurretDL2AI)
PDTurretFRAI.Damage();

}