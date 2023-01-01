var target : Transform;
var Waypoint : Transform;
var Threat : Transform;

var TargetTrace : Transform;
var TargetLead : Transform;
var TLCol : SphereCollider;

var ResetAimpoint : Transform;

var DeusDamage : VehicleDamage;

var AIAnchor : Transform;

var LightClouter : boolean;

var Belfry : boolean;

var Archer : boolean;
var Scabbard : boolean;

var HasRequested : boolean;

var MissileAmmo : GameObject;
var Missile1 : Transform;
var Missile2 : Transform;

var ActiveMissile : GameObject;

var thisTransform : Transform;
var thisVTransform : Transform;

var vRigidbody : Rigidbody;

var Turret : GameObject;
var Gun : NPCGun;
var Gyro : MevNavGyro;
var Trig : CapsuleCollider;
var ThrusterEffect1 : GameObject;
var ThrusterEffect2 : GameObject;
var Presence : GameObject;
var SpotSound : GameObject;
var AttackSound : GameObject;
var RejectSound : GameObject;

var PissedAtTC0a = 0;

var PissedAtTC1 = 0;
var PissedAtTC2 = 0;
var PissedAtTC3 = 0;
var PissedAtTC4 = 0;
var PissedAtTC5 = 0;
var PissedAtTC6 = 0;
var PissedAtTC8 = 0;
var PissedAtTC9 = 0;

var FoundSmall : boolean;

var LeftThreat : boolean;

var Hunting : boolean;
var Attacking : boolean;
var Obstacle : boolean = false;
var Stuck : boolean = false;
var Emergency : boolean;
var Standby : boolean;

var Parked : boolean;

var TurnRight : boolean;
var TurnLeft : boolean;

var RightDist : float = 200;
var LeftDist : float = 200;

var RUP : float = 0;

var RRUP : float = 0;
var LRUP : float = 0;

var Wall : boolean;
var RWall : boolean;
var LWall : boolean;

var DangerSense = 0;

var DangerTick : boolean;

var targetLayers : LayerMask;

var MtargetLayers : LayerMask;

var Point1u : Vector3;
var Point1d : Vector3;

var RPoint1u : Vector3;
var RPoint1d : Vector3;

var LPoint1u : Vector3;
var LPoint1d : Vector3;

var localV : Vector3;

var AngleThreshold : float = 2;

var Spot = 0;

var Ogle = 0;

var JustNoticed = 0;

var ShootFrequency : float = 3;

var ScabbardCounter = 0;

var MissedShots = 0;

var Dist3 = 6;

var TAimForce = 40;

var StoredMissileBatches = 8;
var Cramped = 0;

var TurnertDist = 100;

var GyroOff : boolean;

InvokeRepeating("Regenerator", 1, 1);

InvokeRepeating("LeaveMarker", 8, 4);

InvokeRepeating("Targety", 15, 15);

InvokeRepeating("Shooty", Random.Range(2, 3), ShootFrequency);

InvokeRepeating("EmergencyLaunchy", 1, 1.2);

InvokeRepeating("CalcLead", 1, 0.15);

function Start (){
if(Belfry){
Standby = true;
vRigidbody.useGravity = false;
yield WaitForSeconds (4);
vRigidbody.useGravity = true;
yield WaitForSeconds (0.5);
Standby = false;
Reverse();
}
}

function Update () {

if(Standby)
return;

if(!DangerTick)
thisTransform.rotation = AIAnchor.transform.rotation;

thisTransform.position = AIAnchor.transform.position;

if(Attacking){
if(target == ResetAimpoint){
target = ResetAimpoint;
Gyro.AimTarget = ResetAimpoint;
Cramped = 0;
Attacking = false;
Spot = 0;
Hunting = true;
}
if(target == null){
target = ResetAimpoint;
Gyro.AimTarget = ResetAimpoint;
Cramped = 0;
Attacking = false;
Spot = 0;
Hunting = true;
FoundSmall = false;
}else{
if(target.name.Contains ("broken")){
target = ResetAimpoint;
Gyro.AimTarget = ResetAimpoint;
Cramped = 0;
Attacking = false;
Spot = 0;
Hunting = true;
}
}
}

if(TurnLeft){
  Gyro.AimForce = 0;
  if(!LightClouter)
  Gyro.TurnForce = -1000;
  if(LightClouter)
  Gyro.TurnForce = -80;
}

if(TurnRight){
  Gyro.AimForce = 0;
  if(!LightClouter)
  Gyro.TurnForce = 1000;
  if(LightClouter)
  Gyro.TurnForce = 80;
}

if(!Stuck)
if(TurnRight && TurnLeft && Obstacle){
  if(!LightClouter)
  Gyro.TurnForce = -1000;
  if(LightClouter)
  Gyro.TurnForce = -80;
}

if(Attacking || Spot > 1)
if(!Obstacle && target != null)
if(!TurnRight && !TurnLeft){

if(Vector3.Distance(thisTransform.position, target.position) < TurnertDist && !TurnRight && !TurnLeft){
if(!LightClouter){
Gyro.AimForce = 300;
Gyro.TurnForce = -500;
}else{
if(!Archer){
Gyro.AimForce = 30;
Gyro.TurnForce = -60;
}else{
Gyro.AimForce = -30;
Gyro.TurnForce = -60;
}
}
}

if(Vector3.Distance(thisTransform.position, target.position) > TurnertDist && !TurnRight && !TurnLeft){
if(!LightClouter){
Gyro.AimForce = 300;
Gyro.TurnForce = -400;
}else{
Gyro.AimForce = 30;
Gyro.TurnForce = -50;
}
}

}

localV = thisVTransform.InverseTransformDirection(vRigidbody.velocity);

var newRot2 : Vector3;

if(-localV.y > 10)
newRot2 = (vRigidbody.velocity);
else
newRot2 = (thisTransform.forward);

var hit : RaycastHit;

var hit1 : RaycastHit;
var hit2 : RaycastHit;

if(RUP < 3)
RUP += 0.5;
else
RUP = 0;

if(RRUP < 3)
RRUP += 0.5;
else
RRUP = 0;

if(LRUP < 3)
LRUP += 0.5;
else
LRUP = 0;

var VelClamp = Mathf.Clamp(vRigidbody.velocity.magnitude * 2,20,200);

Debug.DrawRay (thisTransform.position + -thisTransform.up * 2 + thisTransform.up * RUP, newRot2 * VelClamp, Color.white);
if (Physics.Raycast (thisTransform.position + -thisTransform.up * 2 + thisTransform.up * RUP, newRot2, hit1, VelClamp, targetLayers))
Point1u = hit1.point;
else
Point1u = Vector3(2,2,2);

Debug.DrawRay (thisTransform.position + -thisTransform.up * 3 + thisTransform.up * RUP, newRot2 * VelClamp, Color.white);
if (Physics.Raycast (thisTransform.position + -thisTransform.up * 3 + thisTransform.up * RUP, newRot2, hit2, VelClamp, targetLayers))
Point1d = hit2.point;
else
Point1d = Vector3(8,8,8);

if(Vector3.Distance(Point1u, Point1d) < 2){
Wall = true;
}

Obstacle = false;

Debug.DrawRay (thisTransform.position, newRot2 * VelClamp, Color.green);
if (Physics.Raycast (thisTransform.position, newRot2, hit, VelClamp, targetLayers))
     if(Wall)
     Obstacle = true;

Debug.DrawRay (thisTransform.position + thisTransform.right * 4, newRot2 * VelClamp, Color.green);
if (Physics.Raycast (thisTransform.position + thisTransform.right * 4, newRot2, hit, VelClamp, targetLayers))
     if(Wall)
     Obstacle = true;

Debug.DrawRay (thisTransform.position + -thisTransform.right * 4, newRot2 * VelClamp, Color.green);
if (Physics.Raycast (thisTransform.position + -thisTransform.right * 4, newRot2, hit, VelClamp, targetLayers))
     if(Wall)
     Obstacle = true;

if(LightClouter){
Debug.DrawRay (thisTransform.position + thisTransform.right * 6 + -thisTransform.up * 2 + thisTransform.up * RRUP, thisTransform.forward * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.right * 6 + -thisTransform.up * 2 + thisTransform.up * RRUP, thisTransform.forward, hit1, VelClamp, targetLayers)){
RPoint1u = hit1.point;
}else{
RPoint1u = Vector3(2,2,2);
}

Debug.DrawRay (thisTransform.position + thisTransform.right * 6 + -thisTransform.up * 3 + thisTransform.up * RRUP, thisTransform.forward * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.right * 6 + -thisTransform.up * 3 + thisTransform.up * RRUP, thisTransform.forward, hit2, VelClamp, targetLayers)){
RPoint1d = hit2.point;
RightDist = hit2.distance;
}else{
RPoint1d = Vector3(8,8,8);
RightDist = 512;
}

if(Vector3.Distance(RPoint1u, RPoint1d) < 2){
RWall = true;
}

Debug.DrawRay (thisTransform.position + -thisTransform.right * 6 + -thisTransform.up * 2 + thisTransform.up * LRUP, thisTransform.forward * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + -thisTransform.right * 6 + -thisTransform.up * 2 + thisTransform.up * LRUP, thisTransform.forward, hit1, VelClamp, targetLayers)){
LPoint1u = hit1.point;
}else{
LPoint1u = Vector3(2,2,2);
}

Debug.DrawRay (thisTransform.position + -thisTransform.right * 6 + -thisTransform.up * 3 + thisTransform.up * LRUP, thisTransform.forward * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + -thisTransform.right * 6 + -thisTransform.up * 3 + thisTransform.up * LRUP, thisTransform.forward, hit2, VelClamp, targetLayers)){
LPoint1d = hit2.point;
LeftDist = hit2.distance;
}else{
LPoint1d = Vector3(8,8,8);
LeftDist = 512;
}

if(Vector3.Distance(LPoint1u, LPoint1d) < 2){
LWall = true;
}

if(LeftDist < 8 && LWall)
Obstacle = true;

if(RightDist < 8 && RWall)
Obstacle = true;

}else{
Debug.DrawRay (thisTransform.position + thisTransform.right * 10 + -thisTransform.up * 2 + thisTransform.up * RRUP, thisTransform.forward * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.right * 10 + -thisTransform.up * 2 + thisTransform.up * RRUP, thisTransform.forward, hit1, VelClamp, targetLayers)){
RPoint1u = hit1.point;
}else{
RPoint1u = Vector3(2,2,2);
}

Debug.DrawRay (thisTransform.position + thisTransform.right * 10 + -thisTransform.up * 3 + thisTransform.up * RRUP, thisTransform.forward * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.right * 10 + -thisTransform.up * 3 + thisTransform.up * RRUP, thisTransform.forward, hit2, VelClamp, targetLayers)){
RPoint1d = hit2.point;
RightDist = hit2.distance;
}else{
RPoint1d = Vector3(8,8,8);
RightDist = 512;
}

if(Vector3.Distance(RPoint1u, RPoint1d) < 2){
RWall = true;
}

Debug.DrawRay (thisTransform.position + -thisTransform.right * 10 + -thisTransform.up * 2 + thisTransform.up * LRUP, thisTransform.forward * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + -thisTransform.right * 10 + -thisTransform.up * 2 + thisTransform.up * LRUP, thisTransform.forward, hit1, VelClamp, targetLayers)){
LPoint1u = hit1.point;
}else{
LPoint1u = Vector3(2,2,2);
}

Debug.DrawRay (thisTransform.position + -thisTransform.right * 10 + -thisTransform.up * 3 + thisTransform.up * LRUP, thisTransform.forward * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + -thisTransform.right * 10 + -thisTransform.up * 3 + thisTransform.up * LRUP, thisTransform.forward, hit2, VelClamp, targetLayers)){
LPoint1d = hit2.point;
LeftDist = hit2.distance;
}else{
LPoint1d = Vector3(8,8,8);
LeftDist = 512;
}

if(Vector3.Distance(LPoint1u, LPoint1d) < 2){
LWall = true;
}

if(LeftDist < 10 && LWall)
Obstacle = true;

if(RightDist < 10 && RWall)
Obstacle = true;
}

if(Stuck){
if(!Belfry){
TurnRight = true;
}else{
if(Threat){
if(LeftThreat)
TurnRight = true;
else
TurnLeft = true;
}else{
TurnLeft = true;
}
}
}else{

Debug.DrawRay (thisTransform.position + thisTransform.up * 10 + thisTransform.forward * VelClamp, thisTransform.up * -30f, Color.white);
if (!Physics.Raycast (thisTransform.position + thisTransform.up * 10 + thisTransform.forward * VelClamp, -thisTransform.up, 30))
     Obstacle = true;

//---------------------------------------------------------------------------------------------
             Debug.DrawRay (thisTransform.position + thisTransform.up * 10 
                                  + thisTransform.right * 20
                                  + thisTransform.forward * VelClamp, thisTransform.up * -30f, Color.white);
if (!Physics.Raycast (thisTransform.position + thisTransform.up * 10 
                                        + thisTransform.right * 20 
                                        + thisTransform.forward * VelClamp, -thisTransform.up, 30))
     TurnLeft = true;

             Debug.DrawRay (thisTransform.position + thisTransform.up * 10 
                                  + -thisTransform.right * 20
                                  + thisTransform.forward * VelClamp, thisTransform.up * -30f, Color.white);
if (!Physics.Raycast (thisTransform.position + thisTransform.up * 10 
                                        + -thisTransform.right * 20 
                                        + thisTransform.forward * VelClamp, -thisTransform.up, 30))
     TurnRight = true;
//---------------------------------------------------------------------------------------------

if(RightDist > LeftDist && JustNoticed < 1 && LWall){
     TurnRight = true;
     }
     
 if(LeftDist > RightDist && JustNoticed < 1 && RWall){
     TurnLeft = true;
     }
}
}

function FixedUpdate () {

if(Standby)
return;

if(!Parked){
if(Stuck){
if(!Belfry){
if(localV.y < 4){
  if(!LightClouter)
  vRigidbody.AddForce(thisVTransform.up * 250);
  else
  vRigidbody.AddForce(thisVTransform.up * 30);
  }
}else{
if(localV.y < 1)
  vRigidbody.AddForce(thisVTransform.up * 250);
}
}else{
if(Obstacle){
  if(-localV.y > 0){
  if(!LightClouter)
  vRigidbody.AddForce(-thisVTransform.up * -500);
  else
  vRigidbody.AddForce(-thisVTransform.up * -30);
  }
  
}
if(!Belfry)
if(Attacking && !Obstacle){
if(-localV.y < 70){
  if(!LightClouter)
  vRigidbody.AddForce(-thisVTransform.up * 250);
  else
  vRigidbody.AddForce(-thisVTransform.up * 30);
  }
}
if(!Attacking && !Obstacle && !TurnLeft && !TurnRight) {
if(!Belfry){
if(-localV.y < 70){
  if(!LightClouter)
  vRigidbody.AddForce(-thisVTransform.up * 100);
  if(LightClouter && !Scabbard)
  vRigidbody.AddForce(-thisVTransform.up * 20);
  if(Scabbard)
  vRigidbody.AddForce(-thisVTransform.up * 10);
  }
  }else{
if(-localV.y < 120)
  vRigidbody.AddForce(-thisVTransform.up * 250);
  }
}
}
}
 
if(target && !Scabbard && !Belfry){
  Turret.rigidbody.AddForceAtPosition((TargetLead.position - Turret.transform.position).normalized * TAimForce, -Turret.transform.up * 2);
  Turret.rigidbody.AddForceAtPosition((TargetLead.position - Turret.transform.position).normalized * -TAimForce, Turret.transform.up * 2);
}
}

function OnTriggerEnter (other : Collider) {

ON = other.name;
OT = other.transform;

if(Physics.Linecast (thisTransform.position, OT.position, MtargetLayers))
return;

if(!Belfry){

if(!Attacking && Ogle < 1)
if(ON.Contains ("TC"))
if(!ON.Contains ("TC7")){
  Hunting = false;
  target = OT;
  Gyro.AimTarget = OT;
  if(!Attacking && Spot < 1){
  Spot = 30;
  var TheThing = Instantiate(SpotSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing.transform.parent = thisTransform;
  }
}

if(ON.Contains ("TFC"))
if(!ON.Contains ("TFC7")){

if(ON.Contains ("TFC0a"))
PissedAtTC0a = 2;

if(ON.Contains ("TFC1"))
PissedAtTC1 = 2;

if(ON.Contains ("TFC3"))
PissedAtTC3 = 2;

if(ON.Contains ("TFC4"))
PissedAtTC4 = 2;

if(ON.Contains ("TFC5"))
PissedAtTC5 = 2;

if(ON.Contains ("TFC6"))
PissedAtTC6 = 2;

if(ON.Contains ("TFC8"))
PissedAtTC8 = 2;

if(ON.Contains ("TFC9"))
PissedAtTC9 = 2;

if(!Attacking){
DangerSense = 8;
target = Waypoint;
Gyro.AimTarget = Waypoint;
if(other.rigidbody)
Waypoint.position = OT.position;
}
}

}
}

function OnTriggerStay (other : Collider) {

ON = other.name;
OT = other.transform;

if(!ON.Contains ("x"))
if(Physics.Linecast (thisTransform.position, OT.position, MtargetLayers))
return;

if(!Belfry){

if(PissedAtTC0a > 1)
if(ON.Contains ("TC0a")){
  if(!Attacking){
  var TheThing21 = Instantiate(AttackSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing21.transform.parent = thisTransform;
  }
  Spot = 0;
  Hunting = false;
  Attacking = true;
  target = OT;
  if(Gyro != null)
  Gyro.AimTarget = OT;
  PissedAtTC0a -= 1;

}

if(PissedAtTC1 > 1)
if(ON.Contains ("TC1")){

if(PissedAtTC1 > 300)
FoundSmall = false;

 if(ON.Contains ("sT") && !FoundSmall || !ON.Contains ("sT")){

  if(!Attacking){
  var TheThing2 = Instantiate(AttackSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing2.transform.parent = thisTransform;
  }
  Spot = 0;
  Hunting = false;
  Attacking = true;
  target = OT;
  if(Gyro != null)
  Gyro.AimTarget = OT;
  PissedAtTC1 -= 1;
}
}

if(PissedAtTC2 > 1)
if(ON.Contains ("TC2")){

if(ON.Contains ("bTC2"))
return;

  if(!Attacking){
  var TheThing3 = Instantiate(AttackSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing3.transform.parent = thisTransform;
  }
  Spot = 0;
  Hunting = false;
  Attacking = true;
  target = OT;
  if(Gyro != null)
  Gyro.AimTarget = OT;
  PissedAtTC2 -= 1;

}

if(PissedAtTC3 > 1)
if(!ON.Contains ("cT"))
if(ON.Contains ("TC3")){
if(PissedAtTC3 > 300)
FoundSmall = false;

 if(ON.Contains ("sT") && !FoundSmall || !ON.Contains ("sT")){
 
  if(!Attacking){
  var TheThing4 = Instantiate(AttackSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing4.transform.parent = thisTransform;
  }
  Spot = 0;
  Hunting = false;
  Attacking = true;
  target = OT;
  if(Gyro != null)
  Gyro.AimTarget = OT;
  PissedAtTC3 -= 1;
}
}

if(PissedAtTC4 > 1)
if(ON.Contains ("TC4")){
if(PissedAtTC4 > 300)
FoundSmall = false;
 if(ON.Contains ("sT") && !FoundSmall || !ON.Contains ("sT")){

  if(!Attacking){
  var TheThing5 = Instantiate(AttackSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing5.transform.parent = thisTransform;
  }
  Spot = 0;
  Hunting = false;
  Attacking = true;
  target = OT;
  if(Gyro != null)
  Gyro.AimTarget = OT;
  PissedAtTC4 -= 1;
}
}

if(PissedAtTC5 > 1)
if(!ON.Contains ("cT"))
if(ON.Contains ("TC5")){
if(PissedAtTC5 > 300)
FoundSmall = false;
 if(ON.Contains ("sT") && !FoundSmall || !ON.Contains ("sT")){

  if(!Attacking){
  var TheThing6 = Instantiate(AttackSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing6.transform.parent = thisTransform;
  }
  Spot = 0;
  Hunting = false;
  Attacking = true;
  target = OT;
  if(Gyro != null)
  Gyro.AimTarget = OT;
  PissedAtTC5 -= 1;
}
}

if(PissedAtTC6 > 1)
if(!ON.Contains ("cT"))
if(ON.Contains ("TC6")){
if(PissedAtTC6 > 300)
FoundSmall = false;
 if(ON.Contains ("sT") && !FoundSmall || !ON.Contains ("sT")){

  if(!Attacking){
  var TheThing7 = Instantiate(AttackSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing7.transform.parent = thisTransform;
  }
  Spot = 0;
  Hunting = false;
  Attacking = true;
  target = OT;
  if(Gyro != null)
  Gyro.AimTarget = OT;
}
}

if(PissedAtTC8 > 1)
if(!ON.Contains ("cT"))
if(ON.Contains ("TC8")){
if(PissedAtTC8 > 300)
FoundSmall = false;
 if(ON.Contains ("sT") && !FoundSmall || !ON.Contains ("sT")){

  if(!Attacking){
  var TheThing8 = Instantiate(AttackSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing8.transform.parent = thisTransform;
  }
  Spot = 0;
  Hunting = false;
  Attacking = true;
  target = OT;
  if(Gyro != null)
  Gyro.AimTarget = OT;
  PissedAtTC8 -= 1;
}
}

if(PissedAtTC9 > 1)
if(!ON.Contains ("cT"))
if(ON.Contains ("TC9")){
if(PissedAtTC9 > 300)
FoundSmall = false;
 if(ON.Contains ("sT") && !FoundSmall || !ON.Contains ("sT")){

  if(!Attacking){
  var TheThing9 = Instantiate(AttackSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing9.transform.parent = thisTransform;
  }
  Spot = 0;
  Hunting = false;
  Attacking = true;
  target = OT;
  if(Gyro != null)
  Gyro.AimTarget = OT;
  PissedAtTC9 -= 1;
}
}

}else{
if(!ON.Contains ("C7"))
if(ON.Contains ("bTC")){
Threat = OT;
MevNavNetwork.instance.Threat1 = Threat;
}
}
}

function Shoot () {
Gun.Fire();
}

function Launch () {
if(!Scabbard){
if(Attacking && StoredMissileBatches > 0){

MissedShots = 0;

StoredMissileBatches -= 1;
if(!Archer){
if(Missile1 != null){
var _SpawnedObject1 = Instantiate(MissileAmmo, Missile1.position, Missile1.rotation);
    _SpawnedObject1.rigidbody.velocity = vRigidbody.velocity * 1;
    _SpawnedObject1.transform.GetComponent(MissileScript).target = target;
}
yield WaitForSeconds (0.3);
if(Missile2 != null){
var _SpawnedObject2 = Instantiate(MissileAmmo, Missile2.position, Missile2.rotation);
    _SpawnedObject2.rigidbody.velocity = vRigidbody.velocity * 1;
    _SpawnedObject2.transform.GetComponent(MissileScript).target = target;
}
}else{
Dist3 = 6;
if(Missile1 != null){
var _SpawnedObject3 = Instantiate(MissileAmmo, Missile1.position, Missile1.rotation);
    _SpawnedObject3.rigidbody.velocity = vRigidbody.velocity * 1;
    _SpawnedObject3.transform.GetComponent(MissileScript).target = TargetLead;
}
yield WaitForSeconds (0.3);
if(Missile2 != null){
var _SpawnedObject4 = Instantiate(MissileAmmo, Missile2.position, Missile2.rotation);
    _SpawnedObject4.rigidbody.velocity = vRigidbody.velocity * 1;
    _SpawnedObject4.transform.GetComponent(MissileScript).target = TargetLead;
}
yield WaitForSeconds (3);
Dist3 = 3;
}
}
}else{
if(StoredMissileBatches > 0 && ScabbardCounter < 1){

StoredMissileBatches -= 1;

var _SpawnedObject5 = Instantiate(MissileAmmo, Missile1.position, Missile1.rotation);
    _SpawnedObject5.rigidbody.velocity = vRigidbody.velocity * 1;
    _SpawnedObject5.transform.GetComponent(MissileScript).target = target;
    ScabbardCounter = 24;
}

yield WaitForSeconds (1);

if(StoredMissileBatches > 0){

if(MevNavNetwork.RequestCruiseMissile){

StoredMissileBatches -= 1;

var _SpawnedObject6 = Instantiate(MissileAmmo, Missile1.position, Missile1.rotation);
    _SpawnedObject6.rigidbody.velocity = vRigidbody.velocity * 1;
    ActiveMissile = _SpawnedObject6;
    MevNavNetwork.RequestCruiseMissile = false;
}
}
}

}

function Shooty () {
if(Attacking && target && !Belfry){

if(!Archer){
Shoot();

if(!Gun.LineOfFire && !TurnLeft && !TurnRight && Vector3.Distance(thisTransform.position, target.position) < 200)
MissedShots += 1;

if(!LightClouter && MissedShots > 16)
Launch();

}else{
Launch();
}

}
}

function EmergencyLaunchy () {

if(!Emergency || Belfry)
return;

if(!LightClouter){
Launch();
}else{

if(Archer && !Scabbard)
Launch();

}
}

function Targety () {
if(Spot < 1 && !Attacking && !Belfry)
TargetArea();
}

function TargetArea () {

if(!Attacking && MevNavNetwork.AlertTime > 0){
Waypoint.transform.position = MevNavNetwork.instance.PriorityWaypoint.position;
target = Waypoint;
Gyro.AimTarget = Waypoint;
}

yield WaitForSeconds (10);
if(Ogle < 1)
Gyro.AimTarget = ResetAimpoint;
}

function LeaveMarker () {
var lastPos : Vector3 = thisTransform.position;
IsEscaping(lastPos);
}

function IsEscaping(lastPos : Vector3){
Stuck = false;
yield WaitForSeconds (2);

  if(Vector3.Distance(thisTransform.position, lastPos) < 1 && !Parked){
  Stuck = true;
  yield WaitForSeconds (3);
  Stuck = false;
  }
}

function Reverse(){
if(!Threat && Parked)
return;

if(Threat)
var relativePoint = thisVTransform.InverseTransformPoint(Threat.position);

if(relativePoint.x < 0)
LeftThreat = true;
else
LeftThreat = false;

Stuck = true;
TurnRight = false;
TurnLeft = false;
yield WaitForSeconds (1.5);
Stuck = false;
}

function CalcLead () {
if(!Scabbard && !Belfry)
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
if(!Archer){
TargetLead.position += TargetLead.forward * Dist1 * Dist2 * 0.02;
}else{
TargetLead.position += TargetLead.forward * Dist2 * Dist3;
}

if(Attacking)
TLCol.radius = Vector3.Distance(thisTransform.position, target.position) * 0.05;
else
TLCol.radius = 0.1;

}
}

function Notice () {

if(target != null && Attacking){
var lastTPos : Vector3 = thisTransform.position;

yield WaitForSeconds (0.2);

if(target != null)
if(Vector3.Distance(thisTransform.position, lastTPos) > 20)
MevNavNetwork.instance.EnemyTarget2 = target;
}

if(Attacking){
if(!Scabbard){
if(Emergency)
if(!MevNavNetwork.instance.EnemyTarget1)
MevNavNetwork.instance.EnemyTarget1 = target;

if(target != null)
if(target.name.Contains ("bTC") && !HasRequested){
HasRequested = true;
MevNavNetwork.RequestCruiseMissile = true;
MevNavNetwork.instance.EnemyTarget2 = target;
}
}else{

if(target != null && ActiveMissile != null)
if(target.name.Contains ("bTC"))
if(ActiveMissile.name == "Broken"){
ActiveMissile = null;
ScabbardCounter = 0;
}

}
}

if(DangerSense > 0){
DangerTick = true;
thisTransform.LookAt(Waypoint);
yield WaitForSeconds (0.1);
DangerTick = false;
}

}

function Regenerator () {

if(!Belfry){

if(MevNavNetwork.AlertTime > 230){
TargetArea();
MevNavNetwork.AlertTime = 230;
}

if(target){

if(MevNavNetwork.TC1DeathRow > 1){
PissedAtTC1 = 2;
if(MevNavNetwork.TC1DeathRow > 600)
if(target.name.Contains ("C1")){
MevNavNetwork.instance.PriorityWaypoint.position = target.position;
MevNavNetwork.AlertLVL2 = 1;
}
}

if(MevNavNetwork.TC2DeathRow > 200){
PissedAtTC2 = 2;
if(MevNavNetwork.TC2DeathRow > 600)
if(target.name.Contains ("C2"))
MevNavNetwork.AlertLVL2 = 2;
}
if(MevNavNetwork.TC3DeathRow > 1){
PissedAtTC3 = 2;
if(MevNavNetwork.TC3DeathRow > 600)
if(target.name.Contains ("C3"))
MevNavNetwork.AlertLVL2 = 3;
}
if(MevNavNetwork.TC4DeathRow > 1){
PissedAtTC4 = 2;
if(MevNavNetwork.TC4DeathRow > 600)
if(target.name.Contains ("C4"))
MevNavNetwork.AlertLVL2 = 4;
}
if(MevNavNetwork.TC5DeathRow > 1){
PissedAtTC5 = 2;
if(MevNavNetwork.TC5DeathRow > 600)
if(target.name.Contains ("C5"))
MevNavNetwork.AlertLVL2 = 5;
}
if(MevNavNetwork.TC6DeathRow > 1){
PissedAtTC6 = 2;
if(MevNavNetwork.TC6DeathRow > 600)
if(target.name.Contains ("C6"))
MevNavNetwork.AlertLVL2 = 6;
}
if(MevNavNetwork.TC8DeathRow > 1){
PissedAtTC8 = 2;
if(MevNavNetwork.TC8DeathRow > 600)
if(target.name.Contains ("C8"))
MevNavNetwork.AlertLVL2 = 8;
}
if(MevNavNetwork.TC9DeathRow > 1){
PissedAtTC9 = 2;
if(MevNavNetwork.TC9DeathRow > 600)
if(target.name.Contains ("C9"))
MevNavNetwork.AlertLVL2 = 9;
}

if(!Attacking){

if(LightClouter)
  if(Vector3.Distance(thisTransform.position, target.position) < 32){
  if(target.name.Contains ("TC0") && PissedAtTC0a < 300)
  PissedAtTC0a += 1;
  if(target.name.Contains ("TC1") && PissedAtTC1 < 300)
  PissedAtTC1 += 1;
  if(target.name.Contains ("TC3") && PissedAtTC3 < 300)
  PissedAtTC3 += 1;
  if(target.name.Contains ("TC4") && PissedAtTC4 < 300)
  PissedAtTC4 += 1;
  if(target.name.Contains ("TC5") && PissedAtTC5 < 300)
  PissedAtTC5 += 1;
  if(target.name.Contains ("TC6"))
  PissedAtTC6 += 1;
  if(target.name.Contains ("TC8") && PissedAtTC8 < 300)
  PissedAtTC8 += 1;
  if(target.name.Contains ("TC9") && PissedAtTC9 < 300)
  PissedAtTC9 += 1;
}
if(!LightClouter)
  if(Vector3.Distance(thisTransform.position, target.position) < 32){
  if(target.name.Contains ("TC0") && PissedAtTC0a < 300)
  PissedAtTC0a += 1;
  if(target.name.Contains ("TC1") && PissedAtTC1 < 300)
  PissedAtTC1 += 1;
  if(target.name.Contains ("TC3") && PissedAtTC3 < 300)
  PissedAtTC3 += 1;
  if(target.name.Contains ("TC4") && PissedAtTC4 < 300)
  PissedAtTC4 += 1;
  if(target.name.Contains ("TC5") && PissedAtTC5 < 300)
  PissedAtTC5 += 1;
  if(target.name.Contains ("TC6"))
  PissedAtTC6 += 1;
  if(target.name.Contains ("TC8") && PissedAtTC8 < 300)
  PissedAtTC8 += 1;
  if(target.name.Contains ("TC9") && PissedAtTC9 < 300)
  PissedAtTC9 += 1;
}

if(target.name.Contains ("TC6"))
if(!target.name.Contains ("csT"))
  PissedAtTC6 = 2;
  
if(Ogle > 0){
if(Vector3.Distance(thisTransform.position, target.position) < 64){
Parked = true;
Ogle -= 1;
}else{
Parked = false;
}

if(Ogle == 1){
Parked = false;
target = Waypoint;
Gyro.AimTarget = Waypoint;
}
}
  
}else{
if(target.name.Contains ("sT"))
FoundSmall = true;
}
}

if(Spot == 1 && Ogle < 1 && !Attacking){
  Spot = 0;
  Hunting = true;
  var TheThing1 = Instantiate(RejectSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing1.transform.parent = thisTransform;
  target = ResetAimpoint;
  Gyro.AimTarget = ResetAimpoint;
  Targety();
}

if(Attacking){

Trig.center = Vector3(0,0,0);
Trig.radius = 50;
Trig.height = 50;

if(target != null)
if (!Physics.Linecast (thisTransform.position, target.position, targetLayers)){
TurnRight = false;
TurnLeft = false;
JustNoticed = 2;
}

DangerSense = 0;
}else{
Trig.center = Vector3(0,0,200);
Trig.radius = 200;
Trig.height = 800;

if(DangerSense > 0){

if(DangerSense < 2){
target = ResetAimpoint;
Gyro.AimTarget = ResetAimpoint;
}

DangerSense -= 1;
}

}

}else{

Trig.center = Vector3(0,0,0);
Trig.radius = 500;
Trig.height = 500;

if(DeusDamage)
if(Vector3.Distance(thisTransform.position, Waypoint.position) > 150)
DeusDamage.RemoteDet();
}

if(Spot > 0)
Spot -= 1;

if(JustNoticed > 0)
JustNoticed -= 1;

if(ScabbardCounter > 0)
ScabbardCounter -= 1;

if(!LightClouter)
Gyro.AimForce = 300;
else
Gyro.AimForce = 30;

Gyro.TurnForce = 0;

Wall = false;
RWall = false;
LWall = false;

TurnRight = false;
TurnLeft = false;

if(!Belfry)
Notice();

//========================================================================================================================//
//////////////////////////////////////////////////////[INTERACTION]/////////////////////////////////////////////////////////
//========================================================================================================================//

if(NotiScript.PiriNotis)
if(Vector3.Distance(thisTransform.position, PlayerInformation.instance.Pirizuka.position) < 128){
if(convNum < 4){
if(!Attacking){
target = PlayerInformation.instance.PiriTarget;
Gyro.AimTarget = PlayerInformation.instance.PiriTarget;
Ogle = 20;
}else{
if(target)
if(target.name.Contains ("TC1")){
target = PlayerInformation.instance.PiriTarget;
Gyro.AimTarget = PlayerInformation.instance.PiriTarget;
Ogle = 20;
}
}
}
NotiScript.PiriNotis = false;
}

if(Ogle > 0)
if(WorldInformation.pSpeech){
if(WorldInformation.pSpeech.name.Contains ("a1"))
if(Vector3.Distance(thisTransform.position, WorldInformation.pSpeech.position) < 32){
if(target.name.Contains ("TC7"))
ProcessSpeech(WorldInformation.pSpeech.gameObject.GetComponent(TalkBubbleScript).myText, 0, 1);
else
ProcessSpeech(WorldInformation.pSpeech.gameObject.GetComponent(TalkBubbleScript).myText, 0, 0);
}

if(WorldInformation.pSpeech.name.Contains ("b1"))
if(Vector3.Distance(thisTransform.position, WorldInformation.pSpeech.position) < 128){
if(target.name.Contains ("TC7"))
ProcessSpeech(WorldInformation.pSpeech.gameObject.GetComponent(TalkBubbleScript).myText, 1, 1);
else
ProcessSpeech(WorldInformation.pSpeech.gameObject.GetComponent(TalkBubbleScript).myText, 1, 0);
}

if(WorldInformation.pSpeech.name.Contains ("c1"))
if(Vector3.Distance(thisTransform.position, WorldInformation.pSpeech.position) < 256){
if(target.name.Contains ("TC7"))
ProcessSpeech(WorldInformation.pSpeech.gameObject.GetComponent(TalkBubbleScript).myText, 2, 1);
else
ProcessSpeech(WorldInformation.pSpeech.gameObject.GetComponent(TalkBubbleScript).myText, 2, 0);
}

WorldInformation.pSpeech = null;
}

}

//========================================================================================================================//
//////////////////////////////////////////////////////[INTERACTION]/////////////////////////////////////////////////////////
//========================================================================================================================//


var convNum = 0;
var boredom = 0;

function ProcessSpeech (speech : String, mode : int, code : int){

yield WaitForSeconds (0.1);

if(!speech)
return;

if(code == 0){
if(mode == 0){
if(convNum == 0){
//===============================================================================
if(speech.Contains ("hi") || speech.Contains ("hey") || speech.Contains ("yo")){ convNum = 1; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Jet off, stranger."); return;}

if(speech.Contains ("hello") || speech.Contains ("greet")){ convNum = 1; yield WaitForSeconds (2);
ReturnSpeech("I don't know you. \n State your business!"); return; }

if(speech.Contains ("stop")){ convNum = 1; yield WaitForSeconds (2);
ReturnSpeech("What is it?"); return; }
//===============================================================================
}

if(convNum == 1){
//===============================================================================
if(speech.Contains ("go")){ convNum = 4; Ogle = 2; yield WaitForSeconds (4);
ReturnSpeech("You better bug off, now."); return; }

if(speech.Contains ("drive")){ convNum = 4; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Don't tell me what to do."); return; }

if(speech.Contains ("stop")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("You need to start talking."); return; }
//===============================================================================
}

if(convNum == 2){
//===============================================================================
if(speech.Contains ("go")){ convNum = 4; Ogle = 1; yield WaitForSeconds (2);
PissedAtTC1 = 4; FoundSmall = false; return; }

if(speech.Contains ("drive")){ convNum = 4; Ogle = 1; yield WaitForSeconds (2);
PissedAtTC1 = 4; FoundSmall = false; return; }

if(speech.Contains ("stop")){ convNum = 4; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech("Alright. We're done here."); return; }
//===============================================================================
}
}
//======================================================================================================================================
//======================================================================================================================================

if(mode == 0){
if(convNum == 0){
//===============================================================================
if(speech.Contains ("hi") || speech.Contains ("hey") || speech.Contains ("yo")){ convNum = 1; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Jet off, stranger."); return;}

if(speech.Contains ("hello") || speech.Contains ("greet")){ convNum = 1; yield WaitForSeconds (2);
ReturnSpeech("I don't know you. \n State your business!"); return; }

if(speech.Contains ("stop")){ convNum = 1; yield WaitForSeconds (2);
ReturnSpeech("What is it?"); return; }
//===============================================================================
}

if(convNum == 1){
//===============================================================================
if(speech.Contains ("go")){ convNum = 4; Ogle = 2; yield WaitForSeconds (4);
ReturnSpeech("You better bug off, now."); return; }

if(speech.Contains ("drive")){ convNum = 4; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Don't tell me what to do."); return; }

if(speech.Contains ("stop")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("You need to start talking."); return; }
//===============================================================================
}

if(convNum == 2){
//===============================================================================
if(speech.Contains ("go")){ convNum = 4; Ogle = 1; yield WaitForSeconds (2);
PissedAtTC1 = 4; FoundSmall = false; return; }

if(speech.Contains ("drive")){ convNum = 4; Ogle = 1; yield WaitForSeconds (2);
PissedAtTC1 = 4; FoundSmall = false; return; }

if(speech.Contains ("stop")){ convNum = 4; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech("Alright. We're done here."); return; }
//===============================================================================
}
}
//======================================================================================================================================
//======================================================================================================================================

if(mode == 2){
if(convNum == 0){
//===============================================================================
if(speech.Contains ("hi") || speech.Contains ("hey") || speech.Contains ("yo")){ convNum = 1; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech("Whatever you want \n I don't want to be part of it."); return;}

if(speech.Contains ("hello") || speech.Contains ("greet")){ convNum = 1; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech("I don't know you. \n Keep your distance!"); return; }

if(speech.Contains ("stop")){ convNum = 1; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech("What are you going to do?"); return; }
//===============================================================================
}
}
//=================================================================================================================================
//=================================================================================================================================
//=================================================================================================================================
//=================================================================================================================================
}else{
if(mode == 0){
if(convNum == 0){
//===============================================================================
if(speech.Contains ("deus") || speech.Contains ("vult")){ convNum = 1; yield WaitForSeconds (2);
ReturnSpeech("Deus vult, brother."); return;}

if(speech.Contains ("hi") || speech.Contains ("hey") || speech.Contains ("yo")){ convNum = 1; yield WaitForSeconds (2);
ReturnSpeech("Hello. Is there anything you want?"); return;}

if(speech.Contains ("hello") || speech.Contains ("greet")){ convNum = 1; yield WaitForSeconds (2);
ReturnSpeech("Hello, citizen. \n What is on your mind?"); return; }

if(speech.Contains ("stop")){ convNum = 1; yield WaitForSeconds (2);
ReturnSpeech("What is it?"); return; }
//===============================================================================
}

if(convNum == 1){
//===============================================================================
if(speech.Contains ("deus") || speech.Contains ("vult")){ convNum = 1; yield WaitForSeconds (2);
ReturnSpeech("Deus vult!"); return;}

if(speech.Contains ("yes")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("I don't have much time to talk."); return;}

if(speech.Contains ("no")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Well then."); return; }

if(speech.Contains ("go")){ convNum = 2; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech(". . ."); return; }

if(speech.Contains ("drive")){ convNum = 2; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech("Don't tell me what to do."); return; }

if(speech.Contains ("stop")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("You need to start talking."); return; }
//===============================================================================
}

if(convNum == 2){
//===============================================================================
if(speech.Contains ("deus") || speech.Contains ("vult")){ convNum = 1; yield WaitForSeconds (2);
ReturnSpeech("Deus \n VULT"); return;}

if(speech.Contains ("yes")){ convNum = 3; yield WaitForSeconds (2);
ReturnSpeech("Bye!"); return;}

if(speech.Contains ("no")){ convNum = 3; Ogle = 1; yield WaitForSeconds (2);
return; }

if(speech.Contains ("go")){ convNum = 3; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech("Don't be pushy now."); return; }

if(speech.Contains ("drive")){ convNum = 3; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech(". . ."); return; }

if(speech.Contains ("stop")){ convNum = 3; yield WaitForSeconds (2);
ReturnSpeech("Alright. We're done here."); return; }
//===============================================================================
}
}
//======================================================================================================================================
//======================================================================================================================================

if(mode == 1){
if(convNum == 0){
//===============================================================================
if(speech.Contains ("deus") || speech.Contains ("vult")){ convNum = 1; yield WaitForSeconds (2);
ReturnSpeech("Deus vult, brother."); Ogle = 4; return;}

if(speech.Contains ("hi") || speech.Contains ("hey") || speech.Contains ("yo")){ convNum = 1; yield WaitForSeconds (2);
ReturnSpeech("Hello. Is there anything you want?"); return;}

if(speech.Contains ("hello") || speech.Contains ("greet")){ convNum = 1; yield WaitForSeconds (2);
ReturnSpeech("Hello, citizen. \n What is on your mind?"); return; }

if(speech.Contains ("stop")){ convNum = 1; yield WaitForSeconds (2);
ReturnSpeech("What is it?"); return; }
//===============================================================================
}

if(convNum == 1){
//===============================================================================
if(speech.Contains ("deus") || speech.Contains ("vult")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Deus vult!"); Ogle = 4; return;}

if(speech.Contains ("yes")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("I don't have much time to talk."); return;}

if(speech.Contains ("no")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Well then."); return; }

if(speech.Contains ("go")){ convNum = 2; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech(". . ."); return; }

if(speech.Contains ("drive")){ convNum = 2; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech("Don't tell me what to do."); return; }

if(speech.Contains ("stop")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("You need to start talking."); return; }
//===============================================================================
}

if(convNum == 2){
//===============================================================================
if(speech.Contains ("deus") || speech.Contains ("vult")){ convNum = 3; yield WaitForSeconds (2);
ReturnSpeech("Deus \n VULT"); Ogle = 4; return;}

if(speech.Contains ("yes")){ convNum = 3; yield WaitForSeconds (2);
ReturnSpeech("Bye!"); return;}

if(speech.Contains ("no")){ convNum = 3; Ogle = 1; yield WaitForSeconds (2);
return; }

if(speech.Contains ("go")){ convNum = 3; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech("Don't be pushy now."); return; }

if(speech.Contains ("drive")){ convNum = 3; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech(". . ."); return; }

if(speech.Contains ("stop")){ convNum = 3; yield WaitForSeconds (2);
ReturnSpeech("Alright. We're done here."); return; }
//===============================================================================
}
}
//======================================================================================================================================
//======================================================================================================================================

if(mode == 2){
if(convNum == 0){
//===============================================================================
if(speech.Contains ("hi") || speech.Contains ("hey") || speech.Contains ("yo")){ convNum = 1; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech("Whatever you want \n I don't want to be part of it."); return;}

if(speech.Contains ("hello") || speech.Contains ("greet")){ convNum = 1; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech("I don't know you. \n Keep your distance!"); return; }

if(speech.Contains ("stop")){ convNum = 1; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech("What are you going to do?"); return; }
//===============================================================================
}
}
}

//=================================================================================================================================
//============================================////[Conflict Reactions]////=========================================================
//=================================================================================================================================

if(convNum == 4){
if(MevNavNetwork.TC1DeathRow > 0){
if(mode < 2){
//===============================================================================
if(speech.Contains ("ok")){ convNum = 99; Ogle = 1; yield WaitForSeconds (1);
ReturnSpeech("Poke your face out, \n and I'll shoot it off!"); return;}

if(speech.Contains ("sorry")){ convNum = 99; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech("Just get fucked!"); return; }

if(speech.Contains ("please")){ convNum = 99; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech("Cry more, idiot!"); return; }

if(speech.Contains ("stop")){ convNum = 99; Ogle = 1; yield WaitForSeconds (1);
ReturnSpeech("Stop whining and just \n accept your death."); return; }

if(speech.Contains ("excuse")){ convNum = 99; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech("How nice of you to tell us \n to stop retaliating, asshole!"); return;}
//===============================================================================
}else{
//===============================================================================
if(speech.Contains ("ok")){ convNum = 99; yield WaitForSeconds (4);
ReturnSpeech("Try and hit me, punk!"); Ogle = 1; return;}

if(speech.Contains ("sorry")){ convNum = 99; yield WaitForSeconds (4);
ReturnSpeech("Hah! You and your \n big-ass vehicle... Fuck you!"); Ogle = 1; return; }

if(speech.Contains ("please")){ convNum = 99; yield WaitForSeconds (4);
ReturnSpeech("I'll trade your virginity \n with that mean machine of yours."); Ogle = 1; return; }

if(speech.Contains ("stop")){ convNum = 99; yield WaitForSeconds (4);
ReturnSpeech("Just let me put some more \n shots into you..."); Ogle = 1; return; }

if(speech.Contains ("excuse")){ convNum = 99; yield WaitForSeconds (4);
ReturnSpeech("Stop being a bitch!"); Ogle = 1; return;}
//===============================================================================
}
}
}

if(convNum > 0){

if(boredom < 3){
if(speech.Contains ("bye") || speech.Contains ("see") || speech.Contains ("fare") || speech.Contains ("later")){ yield WaitForSeconds (2);
ReturnSpeech("Goodbye."); Ogle = 2; return;}
if(speech.Contains ("thank") || speech.Contains ("good") || speech.Contains ("like")){ yield WaitForSeconds (2);
ReturnSpeech(". . .Sure, bye."); Ogle = 2; return;}
}

//===============================================================================
if(speech.Contains ("cunt")){ boredom = 3; convNum = 4; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech("Nice to know, now fuck off."); return; }
if(speech.Contains ("ass")){ boredom = 4; convNum = 4; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech("You want a smoldering hole \n in your face?"); return; }
if(speech.Contains ("fuck you")){ boredom = 3; convNum = 4; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech("Oh, is that a threat?"); return; }
if(speech.Contains ("fuck off")){ boredom = 4; convNum = 4; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech("Say that again, motherfucker..."); return; }
if(speech.Contains ("go away")){ boredom = 3; convNum = 4; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech("Go ahead and push your luck \n one more time."); return; }
//===============================================================================
}

yield WaitForSeconds (2);
if(code == 0){
if(boredom == 0){ReturnSpeech("What?");}
if(boredom == 1){ReturnSpeech("You need to start making sense \n right about now."); convNum = 1;}
if(boredom == 2){ReturnSpeech("Get to the point. \n Or I will chase you away!"); convNum = 1;}
if(boredom == 3){ReturnSpeech("I will seriously put a \n hole in your body..."); convNum = 4; Ogle = 1;}
if(boredom == 4){ReturnSpeech("Is that your last words?"); convNum = 4; Ogle = 1;}
if(boredom == 5){ convNum = 4; PissedAtTC1 = 4; FoundSmall = false; Ogle = 1;}
boredom += 1;
}else{
if(boredom == 0){ReturnSpeech("What is it, citizen?");}
if(boredom == 1){ReturnSpeech("I'm not sure if I can \n help you with that."); convNum = 1;}
if(boredom == 2){ReturnSpeech("Ok, we're done here."); convNum = 1;}
if(boredom == 3){ReturnSpeech("Can you go away?"); convNum = 4; Ogle = 1;}
if(boredom == 4){ReturnSpeech("I'm just going to \n ignore you from now on..."); convNum = 99; Ogle = 1;}
boredom += 1;
}
}

function ReturnSpeech (yourText : String){
var Load = Resources.Load("Prefabs/TalkBubble", GameObject) as GameObject;
var TGO = Instantiate(Load, thisTransform.position, Load.transform.rotation);
TGO.name = "CFC7";
TGO.GetComponent(TalkBubbleScript).myText = yourText;
TGO.GetComponent(TalkBubbleScript).source = thisVTransform;
}