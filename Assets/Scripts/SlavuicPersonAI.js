var target : Transform;
var eventualTarget : Transform;
var lookTarget : Transform;
var ResetView : Transform;
var LocalView : Transform;

var LocalSpace : Transform;
var LocalWaypoint : Transform;

var Waypoint : Transform;

var Stranger : Transform;

var Leader : Transform;
var LLotteryNum = 0;

var BodyTF : Transform;
var BodyRB : Rigidbody;

var HeadTF : Transform;

var Trig : SphereCollider;

var TCCol : Transform;

var thisTransform : Transform;
var thisVTransform : Transform;

var WheelRB : Rigidbody;

var WheelJoint : HingeJoint;

var GunGO : GameObject;
var GunTF : Transform;
var GunBarrelTF : Transform;

var Gun : PersonGunScript;

var UpperBodyAni : Animation;

var TorsoTF : Transform;
var TorsoAP : Transform;
var GTorso : Transform;

var RFemurTF : Transform;
var LFemurTF : Transform;

var RTibiaTF : Transform;
var LTibiaTF : Transform;

var RFootTF : Transform;
var LFootTF : Transform;

var RFemurAP : Transform;
var LFemurAP : Transform;

var RTibiaAP : Transform;
var LTibiaAP : Transform;

var RFootAP : Transform;
var LFootAP : Transform;

var GRFemur : Transform;
var GLFemur : Transform;

var GRTibia : Transform;
var GLTibia : Transform;

var GRFoot : Transform;
var GLFoot : Transform;

var GRHumerus : Transform;
var GLHumerus : Transform;

var GRRadius : Transform;
var GLRadius : Transform;

var Possession1 : Transform;
var Possession2 : Transform;
var Favourite1 : Transform;
var Pos1Area : Vector3;
var Pos2Area : Vector3;
var Fav1Area : Vector3;

var movementClock1 : float = 0;
var movementClock2 : float = 0;

var VelClamp : float = 0;

var MoveSpeed : float = 200;
var MoveForce : float = 1;

var LocoSpeed : float = 1;

var StabForce : float = 1;

var RotForce : float = 1;

var TurnForce : float = 1;

var Force : float = 1;

var PissedAtTC0a = 0;
var PissedAtTC1 = 0;
var PissedAtTC3 = 0;
var PissedAtTC4 = 0;
var PissedAtTC6 = 0;
var PissedAtTC7 = 0;
var PissedAtTC8 = 0;
var PissedAtTC9 = 0;

var Break1 = 0;

var Vert : float = 0;
var Hori : float = 0;

var VertAbs : float = 0;
var HoriAbs : float = 0;

var VNClamp : float = 0;
var HNClamp : float = 0;

var AimSpeed : float = 0.1;

var FuckingRead : float = 0;

var torsoCurve : AnimationCurve = new AnimationCurve();

var femurCurve : AnimationCurve = new AnimationCurve();
var tibiaCurve : AnimationCurve = new AnimationCurve();

var torsoCurveR : AnimationCurve = new AnimationCurve();

var femurCurveR : AnimationCurve = new AnimationCurve();
var tibiaCurveR : AnimationCurve = new AnimationCurve();

var humerusCurve : AnimationCurve = new AnimationCurve();
var radiusCurve : AnimationCurve = new AnimationCurve();

var humerusCurveR : AnimationCurve = new AnimationCurve();
var radiusCurveR : AnimationCurve = new AnimationCurve();

var NoShoot : boolean;

var AimStance : boolean;

var AimGunOnce : boolean;
var IdleGunOnce : boolean;
var StandOnce : boolean;
var WalkOnce : boolean;

var Sitting : boolean;

var Walking : boolean;

var Running : boolean;

var Fidgeting : boolean;

var FreeRoam : boolean;

var IHas : boolean;
var IHappy : boolean;
var IEcstatic : boolean;
var IBliiiiiin : boolean;
var LookingAtLostItem : boolean;

var Holding : boolean;

var Grounded : boolean;

var Obscured : boolean;

var Obstacle = 0;

var Stuckage = 0;

var RestlessLegs = 0;

var Anger = 0;

var Pathfind = 0;

var Ogle = 0;

var Blyats = 0;

var Blyat1: AudioClip;
var Bliin1: AudioClip;
var Cyka1: AudioClip;

var RayDist : float = 5;

var RaySideDist : float = 5;

var RightDist : float = 200;
var LeftDist : float = 200;

var RightNum = 0;
var LeftNum = 0;

var RStep : int = 1;
var LStep : int = 1;

var AngVelMod : float = 0;

var RPClamp : float;

var targetLayers : LayerMask;
var MtargetLayers : LayerMask;

private var StatTurnForce : int = 1;

InvokeRepeating("Refresher", 1, 0.5);

function Start (){

var hitG : RaycastHit;

      Debug.DrawRay (BodyTF.position + -BodyTF.up * 1.08, Vector3.down * 8, Color.white);
if (Physics.Raycast (BodyTF.position + -BodyTF.up * 1.08, Vector3.down, hitG, 8, targetLayers)){
Waypoint.parent = hitG.collider.transform;
if(!hitG.collider.name.Contains ("T5B"))
FreeRoam = true;
}

StatTurnForce = TurnForce;

RayDist = 5;

RaySideDist = 1.2;

RStep = 1;
LStep = 3;

if(Sitting){
TorsoAP.position = TorsoTF.position;
TorsoAP.rotation = TorsoTF.rotation;

RFemurAP.position = RFemurTF.position;
RFemurAP.rotation = RFemurTF.rotation;
LFemurAP.position = LFemurTF.position;
LFemurAP.rotation = LFemurTF.rotation;

RTibiaAP.position = RTibiaTF.position;
RTibiaAP.rotation = RTibiaTF.rotation;
LTibiaAP.position = LTibiaTF.position;
LTibiaAP.rotation = LTibiaTF.rotation;

RFootAP.position = RFootTF.position;
RFootAP.rotation = RFootTF.rotation;
LFootAP.position = LFootTF.position;
LFootAP.rotation = LFootTF.rotation;
}

yield WaitForSeconds (1);

Pathfind = 240;
}

function Update () {

var hit : RaycastHit;

LocalSpace.position = thisTransform.position;

if(target == null){
target = ResetView;
if(Anger > 10)
Anger = 10;
}else{
if(AimStance){
NoShoot = false;
      Debug.DrawRay (GunBarrelTF.position + GunBarrelTF.forward * 0.3, GunBarrelTF.forward * 250, Color.yellow);
if (Physics.Raycast (GunBarrelTF.position + GunBarrelTF.forward * 0.3, GunBarrelTF.forward, hit, 250, targetLayers))
	 if(hit.collider.tag.Contains ("tru") || hit.collider.name.Contains ("T5"))
	 NoShoot = true;

if(!NoShoot){
if(target.name.Contains ("Reset")){
if(Anger > 10)
Anger = 10;
NoShoot = true;
}
if(target.name.Contains ("Way")){
target = ResetView;
NoShoot = true;
}
}

}
}

if(eventualTarget == null){
eventualTarget = ResetView;
}else{
if(Anger > 0){
if(!Obscured){
target = eventualTarget;
}else{
Waypoint.position = eventualTarget.position;
target = LocalWaypoint;
}
}
}

if(SlavuicNetwork.Attention)
if(Vector3.Distance(thisTransform.position, PlayerInformation.instance.Pirizuka.position) < 500){
lookTarget = PlayerInformation.instance.Pirizuka;
Ogle = 20;
}

//if(!Sitting){
//if(MoveForce < 1)
//MoveForce += 0.02;
//}else{
//if(MoveForce > 0)
//MoveForce -= 0.05;
//}

}

private var NewRotation : Quaternion;
private var NewRotation2 : Quaternion;

function FixedUpdate () {

var WAV = BodyTF.InverseTransformDirection(WheelRB.angularVelocity);

AngVelMod = WAV.x * 0.5;

VelClamp = Mathf.Clamp(AngVelMod,0.5,8);
//var localV = BodyTF.InverseTransformDirection(BodyRB.velocity);
//var LVClamp = Mathf.Clamp(localV.z,0.5,4);
//var LVClamp2 = Mathf.Clamp(localV.z,2,4);
var localAV = BodyTF.InverseTransformDirection(BodyRB.angularVelocity);

RayLV = VelClamp * RayDist;

var AngComb = localAV.x + localAV.z;

var AVModX = localAV.x * 4;
var AVClampX = Mathf.Clamp(AVModX,0,1);

var AVModY = localAV.y * 0.2;
//var AVClampY = Mathf.Clamp(AVModY,0,1);

var AVModZ = localAV.z * 4;
var AVClampZ = Mathf.Clamp(AVModZ,0,1);

BodyRB.AddTorque(BodyTF.right * -AVClampX);
//BodyRB.AddTorque(BodyTF.up * -AVClampY);
BodyRB.AddTorque(BodyTF.forward * -AVClampZ);

BodyRB.AddForceAtPosition(Vector3.up * StabForce, thisVTransform.up * 1);
BodyRB.AddForceAtPosition(-Vector3.up * StabForce, -thisVTransform.up * 1);


if(LLotteryNum > 0)
LLotteryNum -= 1;


if(target){
var RelativeTarget = BodyTF.InverseTransformPoint(target.position);
RPClamp = Mathf.Clamp(RelativeTarget.x,-TurnForce,TurnForce);
var RPMod = RPClamp / AVModY;

var RelativeG = GunTF.InverseTransformPoint(target.position);

Vert = RelativeG.z;
Hori = RelativeG.x;

VertAbs = Mathf.Abs(Vert);
HoriAbs = Mathf.Abs(Hori);

DistModV = VertAbs / Vector3.Distance(thisTransform.position, target.position);
DistModH = HoriAbs / Vector3.Distance(thisTransform.position, target.position);

VNClamp = Mathf.Clamp(DistModV * AimSpeed,0,2);
HNClamp = Mathf.Clamp(DistModH * AimSpeed,0,2);

if(AimSpeed < 2)
AimSpeed += 0.02;

FuckingRead = HoriAbs + VertAbs;

if(Walking || Anger > 5 || Ogle > 5)
BodyRB.AddTorque(BodyTF.up * RPClamp);
}

if(lookTarget){

NewRotation = Quaternion.LookRotation(lookTarget.position - HeadTF.position);
HeadTF.rotation = Quaternion.RotateTowards(HeadTF.rotation, NewRotation, 4);

if(HeadTF.localEulerAngles.x > 200)
if(HeadTF.localEulerAngles.x < 340)
HeadTF.localEulerAngles.x = 340;
if(HeadTF.localEulerAngles.x < 90)
if(HeadTF.localEulerAngles.x > 40)
HeadTF.localEulerAngles.x = 40;

if(HeadTF.localEulerAngles.z > 30)
if(HeadTF.localEulerAngles.z < 180)
HeadTF.localEulerAngles.z = 30;
if(HeadTF.localEulerAngles.z < 330)
if(HeadTF.localEulerAngles.z > 180)
HeadTF.localEulerAngles.z = 330;

if(HeadTF.localEulerAngles.y < 300 && HeadTF.localEulerAngles.y > 180)
HeadTF.localEulerAngles.y = 300;
if(HeadTF.localEulerAngles.y > 60 && HeadTF.localEulerAngles.y < 180)
HeadTF.localEulerAngles.y = 60;

}

if(Fidgeting){
if(!IBliiiiiin){
BodyRB.AddTorque(thisTransform.up * Random.Range (-Force, Force));
if(BodyTF.localEulerAngles.x > 345 || BodyTF.localEulerAngles.x < 15)
BodyRB.AddTorque(thisTransform.right * Random.Range (-Force, Force));
if(BodyTF.localEulerAngles.z > 345 || BodyTF.localEulerAngles.z < 15)
BodyRB.AddTorque(thisTransform.forward * Random.Range (-Force, Force));
}else{
BodyRB.AddTorque(thisTransform.up * Random.Range (-Force, Force));
BodyRB.AddTorque(thisTransform.right * Random.Range (-Force, Force));
BodyRB.AddTorque(thisTransform.forward * Random.Range (-Force, Force));
}
}







TorsoTF.position = TorsoAP.position;
TorsoTF.rotation = TorsoAP.rotation;

RFemurTF.position = RFemurAP.position;
RFemurTF.rotation = RFemurAP.rotation;
LFemurTF.position = LFemurAP.position;
LFemurTF.rotation = LFemurAP.rotation;

RTibiaTF.position = RTibiaAP.position;
RTibiaTF.rotation = RTibiaAP.rotation;
LTibiaTF.position = LTibiaAP.position;
LTibiaTF.rotation = LTibiaAP.rotation;

RFootTF.position = RFootAP.position;
RFootTF.rotation = RFootAP.rotation;
LFootTF.position = LFootAP.position;
LFootTF.rotation = LFootAP.rotation;

//[Standing]=================================================================================================================

if(!Sitting){

      Debug.DrawRay (BodyTF.position + -BodyTF.up * 1.1, Vector3.down * 0.6, Color.white);
if (Physics.Raycast (BodyTF.position + -BodyTF.up * 1.1, Vector3.down, 0.6, targetLayers)){
Grounded = true;
}else{
Grounded = false;
}

if(Grounded){

BodyRB.angularDrag = 32;
TurnForce = StatTurnForce;

if(AngComb < 2){
if(StabForce < 6)
StabForce += 0.2;
}else{
StabForce = 0.1;
}

if(Walking){

if(Obstacle < 20){
WheelJoint.motor.targetVelocity = MoveSpeed;
WheelJoint.motor.force = MoveForce;
}else{
WheelJoint.motor.targetVelocity = MoveSpeed;
WheelJoint.motor.force = 0;
}
}else{
WheelJoint.motor.targetVelocity = MoveSpeed;
WheelJoint.motor.force = 0;
}

}else{

BodyRB.angularDrag = 1;
StabForce = 0.1;
TurnForce = 0;

WheelJoint.motor.targetVelocity = MoveSpeed;
WheelJoint.motor.force = 0;
}

//[Standing]=================================================================================================================

}else{

//[Sitting]=================================================================================================================

      Debug.DrawRay (BodyTF.position, Vector3.down * 1.6, Color.white);
if (Physics.Raycast (BodyTF.position, Vector3.down, 1.6, targetLayers)){
Grounded = true;
}else{
Grounded = false;
}

if(Grounded){

BodyRB.angularDrag = 0.1;
StabForce = 1;
TurnForce = 0;

Force = 2;

WheelJoint.motor.targetVelocity = MoveSpeed;
WheelJoint.motor.force = 0;

}else{

BodyRB.angularDrag = 0.1;
StabForce = 0.1;
TurnForce = 0;

WheelJoint.motor.targetVelocity = MoveSpeed;
WheelJoint.motor.force = 0;
}
}

//[Sitting]=================================================================================================================

if(Pathfind > 0){

var hit : RaycastHit;

LocalView.position = HeadTF.position;
LocalView.position.y -= 2;

      Debug.DrawRay (LocalView.position + LocalView.right * RaySideDist, LocalView.forward * RayLV, Color.black);
if (Physics.Raycast (LocalView.position + LocalView.right * RaySideDist, LocalView.forward, hit, RayLV, targetLayers)){
if (LeftNum < 5)
if(Obstacle < 80)
RightDist = hit.distance;
}else{
if(Obstacle < 80)
RightDist = 64;
if(RightNum > 0)
RightNum -= 1;
}

      Debug.DrawRay (LocalView.position + -LocalView.right * RaySideDist, LocalView.forward * RayLV, Color.black);
if (Physics.Raycast (LocalView.position + -LocalView.right * RaySideDist, LocalView.forward, hit, RayLV, targetLayers)){
if (RightNum < 5)
if(Obstacle < 80)
LeftDist = hit.distance;
}else{
if(Obstacle < 80)
LeftDist = 64;
if(LeftNum > 0)
LeftNum -= 1;
}

      Debug.DrawRay (LocalView.position + LocalView.forward * RayLV + LocalView.right * RaySideDist, -LocalView.up * 1, Color.black);
if (!Physics.Raycast (LocalView.position + LocalView.forward * RayLV + LocalView.right * RaySideDist, -LocalView.up, hit, 1, targetLayers)){
RightDist = 0.1;
if(Pathfind > 20)
Pathfind -= 20;
if(RayDist > 2)
RayDist -= 0.5;
if(RaySideDist > 0.6)
RaySideDist -= 0.05;
}else{
if(RaySideDist < 1.2)
RaySideDist += 0.01;
if(RayDist < 5)
RayDist += 0.01;
}

      Debug.DrawRay (LocalView.position + LocalView.forward * RayLV + -LocalView.right * RaySideDist, -LocalView.up * 1, Color.black);
if (!Physics.Raycast (LocalView.position + LocalView.forward * RayLV + -LocalView.right * RaySideDist, -LocalView.up, hit, 1, targetLayers)){
LeftDist = 0.1;
if(Pathfind > 20)
Pathfind -= 20;
if(RayDist > 2)
RayDist -= 0.5;
if(RaySideDist > 0.6)
RaySideDist -= 0.05;
}else{
if(RaySideDist < 1.2)
RaySideDist += 0.01;
if(RayDist < 5)
RayDist += 0.01;
}

if(RightDist > LeftDist){
LocalView.localEulerAngles.y += 1.5;
if (RightNum < 10)
RightNum += 1;
if(Anger > 5 || Running)
if(Pathfind > 30)
Pathfind = 30;
}
     
if(LeftDist > RightDist){
LocalView.localEulerAngles.y -= 1.5;
if (LeftNum < 10)
LeftNum += 1;
if(Anger > 5 || Running)
if(Pathfind > 30)
Pathfind = 30;
}
     
if(LeftDist == RightDist){
if(LeftNum > 0)
LeftNum -= 1;
}


       Debug.DrawRay (LocalView.position, LocalView.forward * RayLV * 0.75, Color.white);
if(Pathfind < 4){
if(Grounded && !Walking){
RStep = 1;
LStep = 3;
}
if (!Physics.Raycast (LocalView.position, LocalView.forward, hit, RayLV * 0.75, targetLayers)){
LocalWaypoint.position = LocalView.position;
LocalWaypoint.rotation = LocalView.rotation;
LocalWaypoint.Translate(Vector3.forward * 15);
Break1 = 60;
if(!IEcstatic && Ogle < 1){
target = LocalWaypoint;
Walking = true;
}
}else{
Pathfind = 30;
}
LeftNum = 0;
RightNum = 0;
}else{

if (!Physics.Raycast (LocalView.position, LocalView.forward, hit, RayLV * 0.75, targetLayers)){
if(Obstacle > 0)
Obstacle -= 1;
}else{
if(Obstacle < 80)
Obstacle += 4;
}

      Debug.DrawRay (LocalView.position + LocalView.forward * RayLV * 0.5, -LocalView.up * 1, Color.white);
if (!Physics.Raycast (LocalView.position + LocalView.forward * RayLV * 0.5, -LocalView.up, hit, 1, targetLayers))
if(Obstacle < 80)
Obstacle += 8;

if(Obstacle > 80){
RightDist = 0.1;
LeftDist = 0.1;
}

if(Obstacle > 60)
if(VelClamp == 0.5){
RightDist = 0.1;
LeftDist = 0.1;
}

if(RightDist == 0.1 && LeftDist == 0.1)
LocalView.localEulerAngles.y += 1.5;

if(!FreeRoam){
if(LeftDist == RightDist && Obstacle < 1){
if(Vector3.Distance(thisTransform.position, Waypoint.position) > 50){

NewRotation2 = Quaternion.LookRotation(Waypoint.position - LocalView.position);
LocalView.rotation = Quaternion.RotateTowards(LocalView.rotation, NewRotation2, 1);

LocalView.localEulerAngles.x = 0;
LocalView.localEulerAngles.z = 0;
}
if(eventualTarget)
if(Anger > 5){

NewRotation2 = Quaternion.LookRotation(eventualTarget.position - LocalView.position);
LocalView.rotation = Quaternion.RotateTowards(LocalView.rotation, NewRotation2, 1);

LocalView.localEulerAngles.x = 0;
LocalView.localEulerAngles.z = 0;
}
}
}else{
if(LeftDist == RightDist && Obstacle < 1){
if(Leader){
if(Vector3.Distance(thisTransform.position, Waypoint.position) > 8){

NewRotation2 = Quaternion.LookRotation(Waypoint.position - LocalView.position);
LocalView.rotation = Quaternion.RotateTowards(LocalView.rotation, NewRotation2, 1);

LocalView.localEulerAngles.x = 0;
LocalView.localEulerAngles.z = 0;

}
}
if(eventualTarget)
if(Anger > 5){

NewRotation2 = Quaternion.LookRotation(eventualTarget.position - LocalView.position);
LocalView.rotation = Quaternion.RotateTowards(LocalView.rotation, NewRotation2, 1);

LocalView.localEulerAngles.x = 0;
LocalView.localEulerAngles.z = 0;
}
}
}

}

if(Pathfind > 0)
Pathfind -= 1;
}else{
RestlessLegs += 1;

if(RestlessLegs > 300){
RestlessLegs = 0;
if(Grounded && !Walking){
RStep = 1;
LStep = 3;
}
if (!Physics.Raycast (LocalView.position, LocalView.forward, hit, RayLV * 0.75, targetLayers)){
LocalWaypoint.position = LocalView.position;
LocalWaypoint.rotation = LocalView.rotation;
LocalWaypoint.Translate(Vector3.forward * 15);
Break1 = 60;
if(!IEcstatic && Ogle < 1){
target = LocalWaypoint;
Walking = true;
}
}else{
Pathfind = 30;
}
LeftNum = 0;
RightNum = 0;
}

}

if(Pathfind == 0 && Walking)
Pathfind = 240;






//(StateSetters)===============================================================

if(!Sitting){
if(Walking){
if(Grounded){
if(VelClamp < 0.6){
if(Break1 < 1){
if(Anger > 0){
if(Obscured)
Walking = false;
}else{
Walking = false;
}
}else{
if(Obstacle < 1 && Ogle < 1)
Walking = true;
}

if(Break1 > 0)
Break1 -= 1;

if(!AimStance){
AniStand();
}else{
AniAimStand();
}
}else{

if(Break1 > 0)
Break1 -= 1;

AniWalk();
}
}
}else{

if(!AimStance){
AniStand();
}else{
AniAimStand();
}


}
}

//(ActionSetters)===============================================================

if(!Sitting){
if(Walking){

if(Anger < 11){
if(Anger > 0 && !Obscured)
Walking = false;
Gun.Firing = false;
}else{
if(FuckingRead < 8 && !NoShoot)
Gun.Firing = true;
else
Gun.Firing = false;
}

if(Anger > 5 && RPClamp < 0.5){
if(!Obscured)
Walking = false;
AimStance = true;
}

}else{

if(Anger < 11){
Gun.Firing = false;
}else{
if(FuckingRead < 8 && !NoShoot)
Gun.Firing = true;
else
Gun.Firing = false;
}

if(Anger > 1){


if(RestlessLegs > 120 && Ogle < 1){
if(RPClamp > 0.5){
RestlessLegs = 0;
Walking = true;
}else{
if(!Obscured){
Walking = false;
AimStance = true;
}else{
RestlessLegs = 0;
Walking = true;
}
}
}


}

if(Anger < 1)
AimStance = false;

}
}




//[MovementMechanism]=================================================================================================================

if(Walking){
if(movementClock1 < 60){
movementClock1 += 1 * LocoSpeed;
}else{
movementClock1 = 0;
movementClock2 = 30;
}

if(movementClock2 < 60){
movementClock2 += 1 * LocoSpeed;
}else{
movementClock2 = 0;
movementClock1 = 30;
}

if(!Running){
LocoSpeed = VelClamp * 0.45;
GTorso.localEulerAngles.y = torsoCurve.Evaluate(movementClock1);

GRFemur.localEulerAngles.x = femurCurve.Evaluate(movementClock1);
GLFemur.localEulerAngles.x = femurCurve.Evaluate(movementClock2);
GRTibia.localEulerAngles.x = tibiaCurve.Evaluate(movementClock1);
GLTibia.localEulerAngles.x = tibiaCurve.Evaluate(movementClock2);

}else{
GTorso.localEulerAngles.y = torsoCurveR.Evaluate(movementClock1);

if(VelClamp < 3){
LocoSpeed = VelClamp * 0.45;
GRFemur.localEulerAngles.x = femurCurve.Evaluate(movementClock1);
GLFemur.localEulerAngles.x = femurCurve.Evaluate(movementClock2);
GRTibia.localEulerAngles.x = tibiaCurve.Evaluate(movementClock1);
GLTibia.localEulerAngles.x = tibiaCurve.Evaluate(movementClock2);
}else{
LocoSpeed = VelClamp * 0.3;
GRFemur.localEulerAngles.x = femurCurveR.Evaluate(movementClock1);
GLFemur.localEulerAngles.x = femurCurveR.Evaluate(movementClock2);
GRTibia.localEulerAngles.x = tibiaCurveR.Evaluate(movementClock1);
GLTibia.localEulerAngles.x = tibiaCurveR.Evaluate(movementClock2);
}
}

if(!Holding){
if(!Running){
LocoSpeed = VelClamp * 0.45;
GRHumerus.localEulerAngles.z = humerusCurve.Evaluate(movementClock1);
GLHumerus.localEulerAngles.z = -humerusCurve.Evaluate(movementClock2);
GRRadius.localEulerAngles.z = radiusCurve.Evaluate(movementClock1);
GLRadius.localEulerAngles.z = -radiusCurve.Evaluate(movementClock2);
}else{
LocoSpeed = VelClamp * 0.3;
GRHumerus.localEulerAngles.z = humerusCurveR.Evaluate(movementClock1);
GLHumerus.localEulerAngles.z = -humerusCurveR.Evaluate(movementClock2);
GRRadius.localEulerAngles.z = radiusCurveR.Evaluate(movementClock1);
GLRadius.localEulerAngles.z = -radiusCurveR.Evaluate(movementClock2);
}
}

}else{
movementClock1 = 0;
movementClock2 = 30;
}

}



















function OnTriggerEnter (other : Collider) {

ON = other.name;
OT = other.transform;

if(ON.Contains ("TFC")){
if(!ON.Contains ("TFC5")){

var relativePoint = OT.InverseTransformPoint(thisTransform.position);

RPXabs = Mathf.Abs(relativePoint.x);
RPYabs = Mathf.Abs(relativePoint.y);

if(relativePoint.z < 0)
return;

if(RPXabs > 4 || RPYabs > 4)
return;

if(ON.Contains ("TFC0a"))
PissedAtTC0a += 4;

if(ON.Contains ("TFC1"))
PissedAtTC1 += 4;

if(ON.Contains ("TFC4"))
PissedAtTC4 += 4;

if(ON.Contains ("TFC7"))
PissedAtTC7 += 4;

if(ON.Contains ("TFC8"))
PissedAtTC8 += 4;

if(ON.Contains ("TFC9"))
PissedAtTC9 += 4;

if(Anger < 120)
Anger += 10;
}
}

}

function OnTriggerStay (other : Collider) {

if(LookingAtLostItem || Force == 0)
return;

if(target)
if(target.name.Contains ("TC"))
return;

ON = other.name;
OT = other.transform;

if(ON.Contains ("TC"))
if(!ON.Contains ("TC5")){
if(Ogle > 0 && Anger < 1){
  lookTarget = OT;
  Stranger = OT;
  
if(Blyats > 0){
   IdiNahui();
   Blyats = 0;
}

Trig.center = Vector3(0,0,0);
Trig.radius = 25;
}

if(PissedAtTC0a > 1)
if(ON.Contains ("TC0a")){

lookTarget = OT;
eventualTarget = OT;

if(!Physics.Linecast (thisTransform.position, OT.position, MtargetLayers)){
lookTarget = OT;
target = OT;
Obscured = false;
Trig.center = Vector3(0,0,0);
Trig.radius = Vector3.Distance(thisTransform.position, OT.position);
}

if(PissedAtTC0a > 4)
Anger = 60;
}

if(PissedAtTC1 > 1)
if(ON.Contains ("TC1")){

lookTarget = OT;
eventualTarget = OT;

if(!Physics.Linecast (thisTransform.position, OT.position, MtargetLayers)){
lookTarget = OT;
target = OT;
Obscured = false;
Trig.center = Vector3(0,0,0);
Trig.radius = Vector3.Distance(thisTransform.position, OT.position);
}

if(PissedAtTC1 > 4)
Anger = 60;
}

if(PissedAtTC3 > 1)
if(!ON.Contains ("cT"))
if(ON.Contains ("TC3")){

lookTarget = OT;
eventualTarget = OT;

if(!Physics.Linecast (thisTransform.position, OT.position, MtargetLayers)){
lookTarget = OT;
target = OT;
Obscured = false;
Trig.center = Vector3(0,0,0);
Trig.radius = Vector3.Distance(thisTransform.position, OT.position);
}

if(PissedAtTC3 > 4)
Anger = 60;
}

if(PissedAtTC4 > 1)
if(ON.Contains ("TC4")){

lookTarget = OT;
eventualTarget = OT;

if(!Physics.Linecast (thisTransform.position, OT.position, MtargetLayers)){
lookTarget = OT;
target = OT;
Obscured = false;
Trig.center = Vector3(0,0,0);
Trig.radius = Vector3.Distance(thisTransform.position, OT.position);
}

if(PissedAtTC4 > 4)
Anger = 60;
}

if(!ON.Contains ("cT"))
if(ON.Contains ("TC6")){
if(!other.name.Contains ("csT")){

lookTarget = OT;
eventualTarget = OT;

if(!Physics.Linecast (thisTransform.position, OT.position, MtargetLayers)){
lookTarget = OT;
target = OT;
Obscured = false;
Trig.center = Vector3(0,0,0);
Trig.radius = Vector3.Distance(thisTransform.position, OT.position);
}

Anger = 60;
}
}

if(PissedAtTC7 > 1)
if(!ON.Contains ("cT"))
if(ON.Contains ("TC7")){

lookTarget = OT;
eventualTarget = OT;

if(!Physics.Linecast (thisTransform.position, OT.position, MtargetLayers)){
lookTarget = OT;
target = OT;
Obscured = false;
Trig.center = Vector3(0,0,0);
Trig.radius = Vector3.Distance(thisTransform.position, OT.position);
}

if(PissedAtTC7 > 4)
Anger = 60;
}

if(PissedAtTC8 > 1)
if(!ON.Contains ("cT"))
if(ON.Contains ("TC8")){

lookTarget = OT;
eventualTarget = OT;

if(!Physics.Linecast (thisTransform.position, OT.position, MtargetLayers)){
lookTarget = OT;
target = OT;
Obscured = false;
Trig.center = Vector3(0,0,0);
Trig.radius = Vector3.Distance(thisTransform.position, OT.position);
}

if(PissedAtTC8 > 4)
Anger = 60;
}

if(PissedAtTC9 > 1)
if(!ON.Contains ("cT"))
if(ON.Contains ("TC9")){

lookTarget = OT;
eventualTarget = OT;

if(!Physics.Linecast (thisTransform.position, OT.position, MtargetLayers)){
lookTarget = OT;
target = OT;
Obscured = false;
Trig.center = Vector3(0,0,0);
Trig.radius = Vector3.Distance(thisTransform.position, OT.position);
}

if(PissedAtTC9 > 4)
Anger = 60;
}

}

if(ON.Contains ("TC5"))
if(Vector3.Distance(thisTransform.position, OT.position) > 1){










if(FreeRoam){

if(TCCol.name.Contains ("sTC5b")){
LLotteryNum = 128;
TCCol.name = "sTC5";
}

if(!Leader){
if(ON.Contains ("sTC5l")){

if(TCCol.name.Contains ("5l"))
OT.name = "sTC5b";
else
Leader = OT;

}else{

if(!TCCol.name.Contains ("5l"))
if(LLotteryNum == 0){
if(ON.Contains ("sTC5"))
OT.name = "sTC5l";
LLotteryNum = Random.Range(48, 64);
}

}
}
}











if(Ogle > 0 && Anger < 1){
  lookTarget = OT;
  
if(Blyats > 0){
   Privet();
   Blyats = 0;
}

Trig.center = Vector3(0,0,0);
Trig.radius = 25;
}
}

if(Favourite1 == null)
if(ON.Contains ("Vodka"))
if(Vector3.Distance(thisTransform.position, OT.position) < 6){
Favourite1 = OT;
ResetView.position = OT.position;
lookTarget = other.gameObject.transform;
Ogle = 0;
}

if(Possession1 == null)
if(ON.Contains ("BK"))
if(Vector3.Distance(thisTransform.position, OT.position) < 6){
Possession1 = OT;
ResetView.position = OT.position;
lookTarget = other.gameObject.transform;
Ogle = 0;
}

if(Possession2 == null)
if(ON.Contains ("Slav_Radio"))
if(Vector3.Distance(thisTransform.position, OT.position) < 6){
Possession2 = OT;
ResetView.position = OT.position;
lookTarget = other.gameObject.transform;
Ogle = 0;
}

}

function AniStand (){

if(!StandOnce){
StandOnce = true;
Holding = false;
if(GunGO.activeSelf){
GunGO.SetActive (false);
UpperBodyAni.CrossFade("PlastStand", 0.3f);
}
}

//(TorsoMovement)===============================================================
if(GTorso.localEulerAngles.y < 360 && GTorso.localEulerAngles.y > 180)
GTorso.localEulerAngles.y += 1;
if(GTorso.localEulerAngles.y > 0 && GTorso.localEulerAngles.y < 180)
GTorso.localEulerAngles.y -= 1;

if(GTorso.localEulerAngles.x < 360 && GTorso.localEulerAngles.x > 180)
GTorso.localEulerAngles.x += 1;
if(GTorso.localEulerAngles.x > 0 && GTorso.localEulerAngles.x < 180)
GTorso.localEulerAngles.x -= 1;

//(LegMovement)===============================================================
if(GRFemur.localEulerAngles.x < 357 && GRFemur.localEulerAngles.x > 180)
GRFemur.localEulerAngles.x += 1 * LocoSpeed;
if(GRFemur.localEulerAngles.x > 3 && GRFemur.localEulerAngles.x < 180)
GRFemur.localEulerAngles.x -= 1 * LocoSpeed;

if(GLFemur.localEulerAngles.x < 357 && GLFemur.localEulerAngles.x > 180)
GLFemur.localEulerAngles.x += 1 * LocoSpeed;
if(GLFemur.localEulerAngles.x > 3 && GLFemur.localEulerAngles.x < 180)
GLFemur.localEulerAngles.x -= 1 * LocoSpeed;

if(GRTibia.localEulerAngles.x < 360 && GRTibia.localEulerAngles.x > 180)
GRTibia.localEulerAngles.x += 1 * LocoSpeed;
if(GRTibia.localEulerAngles.x > 0 && GRTibia.localEulerAngles.x < 180)
GRTibia.localEulerAngles.x -= 1 * LocoSpeed;

if(GLTibia.localEulerAngles.x < 360 && GLTibia.localEulerAngles.x > 180)
GLTibia.localEulerAngles.x += 1 * LocoSpeed;
if(GLTibia.localEulerAngles.x > 0 && GLTibia.localEulerAngles.x < 180)
GLTibia.localEulerAngles.x -= 1 * LocoSpeed;

if(GRFemur.localEulerAngles.y < 15 || GRFemur.localEulerAngles.y > 270)
GRFemur.localEulerAngles.y += 1 * LocoSpeed;

if(GLFemur.localEulerAngles.y > 345 || GLFemur.localEulerAngles.y < 90)
GLFemur.localEulerAngles.y -= 1 * LocoSpeed;

if(GRFemur.localEulerAngles.z < 5 || GRFemur.localEulerAngles.z > 270)
GRFemur.localEulerAngles.z += 1 * LocoSpeed;

if(GLFemur.localEulerAngles.z > 355 || GLFemur.localEulerAngles.z < 90)
GLFemur.localEulerAngles.z -= 1 * LocoSpeed;

//(ArmMovement)===============================================================
if(GRHumerus.localEulerAngles.z < 357 && GRHumerus.localEulerAngles.z > 180)
GRHumerus.localEulerAngles.z += 1 * LocoSpeed;
if(GRHumerus.localEulerAngles.z > 3 && GRHumerus.localEulerAngles.z < 180)
GRHumerus.localEulerAngles.z -= 1 * LocoSpeed;

if(GLHumerus.localEulerAngles.z < 357 && GLHumerus.localEulerAngles.z > 180)
GLHumerus.localEulerAngles.z += 1 * LocoSpeed;
if(GLHumerus.localEulerAngles.z > 3 && GLHumerus.localEulerAngles.z < 180)
GLHumerus.localEulerAngles.z -= 1 * LocoSpeed;

if(GRRadius.localEulerAngles.z < 360 && GRRadius.localEulerAngles.z > 180)
GRRadius.localEulerAngles.z += 1 * LocoSpeed;
if(GRRadius.localEulerAngles.z > 0 && GRRadius.localEulerAngles.z < 180)
GRRadius.localEulerAngles.z -= 1 * LocoSpeed;

if(GLRadius.localEulerAngles.z < 360 && GLRadius.localEulerAngles.z > 180)
GLRadius.localEulerAngles.z += 1 * LocoSpeed;
if(GLRadius.localEulerAngles.z > 0 && GLRadius.localEulerAngles.z < 180)
GLRadius.localEulerAngles.z -= 1 * LocoSpeed;

}

function AniAimStand (){

if(!AimGunOnce){
AimGunOnce = true;

Holding = true;
GunGO.SetActive (true);
if(Anger > 5){
if(!Obscured){
if(!UpperBodyAni.IsPlaying("PlastAimGun")){
UpperBodyAni.CrossFade("PlastAimGun", 0.3f);
AimSpeed = 0.1;
}
}else{
if(!UpperBodyAni.IsPlaying("PlastIdleGun")){
UpperBodyAni.CrossFade("PlastIdleGun", 0.3f);
AimSpeed = 0.1;
}
}
}
}else{
if(Anger < 6 && !IdleGunOnce){
IdleGunOnce = true;
if(!UpperBodyAni.IsPlaying("PlastIdleGun")){
UpperBodyAni.CrossFade("PlastIdleGun", 0.3f);
AimSpeed = 0.1;
}
}
}

//(TorsoMovement)===============================================================

if(Anger > 5 && !Obscured){
if(Vert < 0)
GTorso.localEulerAngles.x += VNClamp;
else
GTorso.localEulerAngles.x -= VNClamp;

if(Hori < 0)
GTorso.localEulerAngles.y -= HNClamp;
else
GTorso.localEulerAngles.y += HNClamp;
}else{
if(GTorso.localEulerAngles.y < 360 && GTorso.localEulerAngles.y > 180)
GTorso.localEulerAngles.y += 1;
if(GTorso.localEulerAngles.y > 0 && GTorso.localEulerAngles.y < 180)
GTorso.localEulerAngles.y -= 1;

if(GTorso.localEulerAngles.x < 360 && GTorso.localEulerAngles.x > 180)
GTorso.localEulerAngles.x += 1;
if(GTorso.localEulerAngles.x > 0 && GTorso.localEulerAngles.x < 180)
GTorso.localEulerAngles.x -= 1;
}

if(GTorso.localEulerAngles.x > 45 && GTorso.localEulerAngles.x < 180)
GTorso.localEulerAngles.x = 45;
if(GTorso.localEulerAngles.x < 315 && GTorso.localEulerAngles.x > 180)
GTorso.localEulerAngles.x = 315;

if(GTorso.localEulerAngles.y > 30 && GTorso.localEulerAngles.y < 180)
GTorso.localEulerAngles.y = 30;
if(GTorso.localEulerAngles.y < 330 && GTorso.localEulerAngles.y > 180)
GTorso.localEulerAngles.y = 330;

//(LegMovement)===============================================================
if(GRFemur.localEulerAngles.x < 10 || GRFemur.localEulerAngles.x > 180)
GRFemur.localEulerAngles.x += 1;
if(GRFemur.localEulerAngles.x > 10 && GRFemur.localEulerAngles.x < 180)
GRFemur.localEulerAngles.x -= 1;

if(GLFemur.localEulerAngles.x > 350 || GLFemur.localEulerAngles.x < 180)
GLFemur.localEulerAngles.x -= 1;
if(GLFemur.localEulerAngles.x < 350 && GLFemur.localEulerAngles.x > 180)
GLFemur.localEulerAngles.x += 1;

if(GRTibia.localEulerAngles.x < 360 && GRTibia.localEulerAngles.x > 180)
GRTibia.localEulerAngles.x += 1;
if(GRTibia.localEulerAngles.x > 0 && GRTibia.localEulerAngles.x < 180)
GRTibia.localEulerAngles.x -= 1;

if(GLTibia.localEulerAngles.x < 360 && GLTibia.localEulerAngles.x > 180)
GLTibia.localEulerAngles.x += 1;
if(GLTibia.localEulerAngles.x > 0 && GLTibia.localEulerAngles.x < 180)
GLTibia.localEulerAngles.x -= 1;

if(GRFemur.localEulerAngles.y < 45 || GRFemur.localEulerAngles.y > 270)
GRFemur.localEulerAngles.y += 1;

if(GLFemur.localEulerAngles.y > 360 || GLFemur.localEulerAngles.y < 90)
GLFemur.localEulerAngles.y -= 1;

if(GLFemur.localEulerAngles.y < 360 && GLFemur.localEulerAngles.y > 180)
GLFemur.localEulerAngles.y += 1;

if(GRFemur.localEulerAngles.z < 5 || GRFemur.localEulerAngles.z > 270)
GRFemur.localEulerAngles.z += 1;

}

function AniWalk (){

if(!WalkOnce)
WalkOnce = true;

if(Holding)
if(!UpperBodyAni.IsPlaying("PlastIdleGun"))
UpperBodyAni.CrossFade("PlastIdleGun", 0.3f);

if(Running){
if(GTorso.localEulerAngles.x < 14 || GTorso.localEulerAngles.x > 180)
GTorso.localEulerAngles.x += 1;
if(GTorso.localEulerAngles.x > 16 && GTorso.localEulerAngles.x < 180)
GTorso.localEulerAngles.x -= 1;
}else{
if(GTorso.localEulerAngles.x < 360 && GTorso.localEulerAngles.x > 180)
GTorso.localEulerAngles.x += 1;
if(GTorso.localEulerAngles.x > 0 && GTorso.localEulerAngles.x < 180)
GTorso.localEulerAngles.x -= 1;
}

if(GRFemur.localEulerAngles.y < 0 || GRFemur.localEulerAngles.y < 180)
GRFemur.localEulerAngles.y -= 1 * LocoSpeed;

if(GLFemur.localEulerAngles.y > 360 || GLFemur.localEulerAngles.y > 180)
GLFemur.localEulerAngles.y += 1 * LocoSpeed;

if(GRFemur.localEulerAngles.z < 0 || GRFemur.localEulerAngles.z < 180)
GRFemur.localEulerAngles.z -= 1 * LocoSpeed;

if(GLFemur.localEulerAngles.z > 360 || GLFemur.localEulerAngles.z > 180)
GLFemur.localEulerAngles.z += 1 * LocoSpeed;

}


function IdiNahui () {
yield WaitForSeconds (0.5);
audio.PlayOneShot(Blyat1);
}

function Ura () {
yield WaitForSeconds (1);
Fidgeting = true;
Force = 1;
}

function Privet () {
yield WaitForSeconds (0.5);
audio.PlayOneShot(Cyka1);
}

function Ebanytii () {
yield WaitForSeconds (2);
Fidgeting = true;
Force = 8;
audio.PlayOneShot(Bliin1);
}

function Refresher () {

  var Interval: int = Random.Range(0, 3);
       
  switch (Interval) {
  case 1:
if(Ogle < 10)
  Ogle += 2;
  break;
}


if(eventualTarget){
if(Physics.Linecast (thisTransform.position, eventualTarget.position, MtargetLayers)){
Obscured = true;
}else{
Obscured = false;
}
}

if(Ogle < 1 && Anger < 1)
lookTarget = ResetView;

if(LookingAtLostItem){
LookingAtLostItem = false;
Ogle = 0;
}else{
if(Ogle > 0)
Ogle -= 1;
}

if(Possession1){
Pos1Area = Possession1.transform.position;
if(!IHas){
IHas = true;
Blyats = 0;
}
}

if(Possession2){
Pos2Area = Possession2.transform.position;
if(!IHappy){
IHappy = true;
Blyats = 0;
Ura();
}
}

if(Favourite1){
Fav1Area = Favourite1.transform.position;
if(!IEcstatic){
IBliiiiiin = false;
Walking = false;
IEcstatic = true;
Force = 0;
Ogle = 10;
Blyats = 0;
Ebanytii();
}
}

if(Possession1 == null && IHas){
ResetView.position = Pos1Area;
lookTarget = ResetView;
IHas = false;
LookingAtLostItem = true;
Fidgeting = false;
Ogle = 10;
Blyats = 1;
}

if(Possession2 == null && IHappy){
ResetView.position = Pos2Area;
lookTarget = ResetView;
IHappy = false;
LookingAtLostItem = true;
Fidgeting = false;
Ogle = 10;
Blyats = 1;
}

if(Favourite1 == null && IEcstatic){
ResetView.position = Fav1Area;
lookTarget = ResetView;
IEcstatic = false;
LookingAtLostItem = true;
Fidgeting = false;
Ogle = 10;
Blyats = 1;
}

if(IHas && IHappy && !Fidgeting && !IEcstatic)
Ura();

if(Fidgeting && Force > 0){
ResetView.position = BodyTF.position + BodyTF.up * 1 + BodyTF.forward * 1;
}
if(PissedAtTC0a > 0)
PissedAtTC0a -= 1;

if(PissedAtTC1 > 0)
PissedAtTC1 -= 1;
if(PissedAtTC3 > 0)
PissedAtTC3 -= 1;
if(PissedAtTC4 > 0)
PissedAtTC4 -= 1;
if(PissedAtTC7 > 0)
PissedAtTC7 -= 1;
if(PissedAtTC8 > 0)
PissedAtTC8 -= 1;
if(PissedAtTC9 > 0)
PissedAtTC9 -= 1;

if(SlavuicNetwork.TC0aDeathRow > 0)
PissedAtTC0a = 8;

if(SlavuicNetwork.TC1DeathRow > 0)
PissedAtTC1 = 8;

if(SlavuicNetwork.TC3DeathRow > 0)
PissedAtTC3 = 8;

if(SlavuicNetwork.TC4DeathRow > 0)
PissedAtTC4 = 8;

if(SlavuicNetwork.TC7DeathRow > 0)
PissedAtTC7 = 8;

if(SlavuicNetwork.TC8DeathRow > 0)
PissedAtTC8 = 8;

if(SlavuicNetwork.TC9DeathRow > 0)
PissedAtTC9 = 8;

if(Anger > 0)
Anger -= 1;

if(Walking){
if(AngVelMod < 0.5){
Stuckage += 1;
}else{
if(Stuckage > 0)
Stuckage -= 1;
}

if(Stuckage > 8){
LocalView.localEulerAngles.y += 180;
Stuckage = 0;
}
}

WalkOnce = false;
if(VelClamp < 0.7)
StandOnce = false;
AimGunOnce = false;
IdleGunOnce = false;

Trig.center = Vector3(0,0,80);
Trig.radius = 100;

if(NotiScript.PiriNotis)
if(Vector3.Distance(thisTransform.position, PlayerInformation.instance.Pirizuka.position) < 128){
Walking = false;
lookTarget = PlayerInformation.instance.PiriTarget;
target = PlayerInformation.instance.PiriTarget;
Ogle = 10;
NotiScript.PiriNotis = false;
}

if(Ogle > 0)
if(WorldInformation.pSpeech)
if(Vector3.Distance(thisTransform.position, WorldInformation.pSpeech.position) < 8){
ProcessSpeech(WorldInformation.pSpeech.gameObject.GetComponent(TalkBubbleScript).myText);
WorldInformation.pSpeech = null;
}

if(FreeRoam){
if(TCCol.name.Contains ("C5l"))
Leader = null;
if(Leader)
if(!Leader.name.Contains ("5l"))
Leader = null;

if(Leader)
Waypoint.position = Leader.position;
else
Waypoint.position = LocalWaypoint.position;
}

Running = false;

if(FreeRoam)
if(Vector3.Distance(thisTransform.position, Waypoint.position) > 16)
Running = true;

if(Running){
if(Vector3.Distance(thisTransform.position, Waypoint.position) > 24)
MoveSpeed = 550;
else
MoveSpeed = 500;
}else{
MoveSpeed = 200;
}

}

//========================================================================================================================//
//////////////////////////////////////////////////////[INTERACTION]/////////////////////////////////////////////////////////
//========================================================================================================================//



var convNum = 0;
var boredom = 0;

function ProcessSpeech (speech : String){

yield WaitForSeconds (0.1);

if(!speech)
return;

if(convNum == 0){
//===============================================================================

if(speech.Contains ("hi") || speech.Contains ("hey") || speech.Contains ("yo")){ convNum = 1; yield WaitForSeconds (2);
ReturnSpeech("Oh, privet comrade!"); return;}

if(speech.Contains ("hello") || speech.Contains ("greet")){ convNum = 1; yield WaitForSeconds (2);
ReturnSpeech("Yes? And hello."); return; }

if(speech.Contains ("blyat") || speech.Contains ("cyka")){ convNum = 1; yield WaitForSeconds (2);
ReturnSpeech("Haha! I have never once heard \n a Thilian say that word!"); return; }
//===============================================================================
}

if(convNum == 1){
//===============================================================================
if(speech.Contains ("hi") || speech.Contains ("hey") || speech.Contains ("yo")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Do you want something?"); return;}

if(speech.Contains ("fuck") || speech.Contains ("shit") || speech.Contains ("ass")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("What!?"); return;}

if(speech.Contains ("hello") || speech.Contains ("greet")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Hello! Now what do you want?"); return; }

if(speech.Contains ("blyat") || speech.Contains ("cyka")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Yes, yes. Now do you want something?"); return;}
//===============================================================================
}

if(convNum == 2){
//===============================================================================
if(speech.Contains ("hi") || speech.Contains ("hey") || speech.Contains ("yo")){ convNum = 3; boredom = 4; yield WaitForSeconds (2);
ReturnSpeech(". . ."); return;}

if(speech.Contains ("no") || speech.Contains ("nah") || speech.Contains ("nvm")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Alright."); return;}

if(speech.Contains ("fuck") || speech.Contains ("shit") || speech.Contains ("ass")){ convNum = 3; boredom = 4; yield WaitForSeconds (2);
ReturnSpeech("Screw you, cyka."); return;}

if(speech.Contains ("hello") || speech.Contains ("greet")){ convNum = 3; boredom = 4; yield WaitForSeconds (2);
ReturnSpeech(". . ."); return; }

if(speech.Contains ("blyat") || speech.Contains ("cyka")){ convNum = 3; yield WaitForSeconds (2);
ReturnSpeech("Ok, enough games! I'm on patrol duty."); return;}
//===============================================================================
}

if(convNum > 0){
if(boredom < 3){
if(speech.Contains ("bye") || speech.Contains ("cya") || speech.Contains ("fare") || speech.Contains ("later")){ yield WaitForSeconds (2);
ReturnSpeech("Goodbye."); Ogle = 2; return;}
if(speech.Contains ("help")){ yield WaitForSeconds (2);
ReturnSpeech("Well, I don't really have \n time to help you."); Ogle = 2; return;}
}
//===============================================================================
if(speech.Contains ("fuck you")){ convNum = 99; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Well fuck you too idi nahui!"); return; }
if(speech.Contains ("fuck off")){ convNum = 99; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Ok. Thili nahui"); return; }
if(speech.Contains ("go away")){ convNum = 99; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Well then."); return; }
//===============================================================================
}else{

if(boredom < 3)
if(speech.Contains ("bye") || speech.Contains ("cya") || speech.Contains ("fare") || speech.Contains ("later")){ yield WaitForSeconds (2);
ReturnSpeech("Ok."); Ogle = 2; return;}
}

yield WaitForSeconds (2);
if(boredom == 0){ReturnSpeech("What?");}
if(boredom == 1){ReturnSpeech("What exactly do you want?"); convNum = 1;}
if(boredom == 2){ReturnSpeech("Just get to the point. \n We can't stay here forever."); convNum = 1;}
if(boredom == 3){ReturnSpeech("Well, good luck."); convNum = 4; Ogle = 4;}
if(boredom == 4){ReturnSpeech("Just go away."); convNum = 4; Ogle = 2;}
if(boredom == 5){ReturnSpeech("I told you. Go away!"); convNum = 4; Ogle = 2;}
if(boredom == 6){ReturnSpeech("If you don't leave now, \n I'll force you to!"); convNum = 4; Ogle = 2;}
if(boredom == 7){ReturnSpeech("Pizdets!"); convNum = 5; PissedAtTC1 = 8; Ogle = 2;}
boredom += 1;
}

function ReturnSpeech (yourText : String){
var Load = Resources.Load("Prefabs/TalkBubble", GameObject) as GameObject;
var TGO = Instantiate(Load, thisTransform.position, Load.transform.rotation);
TGO.name = "CFC5";
TGO.GetComponent(TalkBubbleScript).myText = yourText;
TGO.GetComponent(TalkBubbleScript).source = thisTransform;
}