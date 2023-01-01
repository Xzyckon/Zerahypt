var target : Transform;
var Waypoint : Transform;

var TargetTrace : Transform;
var TargetLead : Transform;
var TargetLead2 : Transform;
var TLCol : SphereCollider;

var thisTransform : Transform;
var thisVTransform : Transform;

var vRigidbody : Rigidbody;

var ResetAimpoint : Transform;

var AIAnchor : Transform;

var HasRequested : boolean;

var MissileAmmo : GameObject;
var CMissileAmmo : GameObject;
var Missile1 : Transform;
var Missile2 : Transform;
var Missile3 : Transform;
var Missile4 : Transform;
var CMissile : Transform;

var Turret1 : GameObject;
var Turret2 : GameObject;
var Gun1 : NPCGun;
var Gun2 : NPCGun;
var Gyro : MevNavGyro;
var Trig : CapsuleCollider;
var ThrusterEffect1 : GameObject;
var ThrusterEffect2 : GameObject;
var ThrusterEffect3 : GameObject;
var ThrusterEffect4 : GameObject;
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

var Attacking : boolean;
var Obstacle : boolean = false;
var Stuck : boolean = false;
var Emergency : boolean;
var Damaged : boolean;

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

var Point1u : Vector3;
var Point1d : Vector3;

var RPoint1u : Vector3;
var RPoint1d : Vector3;

var LPoint1u : Vector3;
var LPoint1d : Vector3;

var localV : Vector3;

var targetLayers : LayerMask;

var DangerSense = 0;

var DangerTick : boolean;

var LaunchingCM : boolean;

var Spot = 0;

var FarFromEnemy = 0;

var StoredMissileBatches = 8;
var StoredCMissiles = 4;

var Dist3 = 6;

var GyroOff : boolean;

InvokeRepeating("Regenerator", 1, 1);

InvokeRepeating("LeaveMarker", 1, 10);

InvokeRepeating("Targety", 15, 15);

InvokeRepeating("Shooty", Random.Range(2, 3), 0.2);

InvokeRepeating("Launchy", 1, 15);

InvokeRepeating("EmergencyLaunchy", 1, 1.2);

InvokeRepeating("CalcLead", 1, 0.15);

function Update () {

if(Damaged)
return;

if(!DangerTick)
thisTransform.rotation = AIAnchor.transform.rotation;

thisTransform.position = AIAnchor.transform.position;

if(Attacking){
if(target == ResetAimpoint){
target = ResetAimpoint;
Gyro.AimTarget = ResetAimpoint;
Attacking = false;
Spot = 0;
FoundSmall = false;
}
if(target == null){
target = ResetAimpoint;
Gyro.AimTarget = ResetAimpoint;
Attacking = false;
Spot = 0;
FoundSmall = false;
}else{
if(target.name.Contains ("broken")){
target = ResetAimpoint;
Gyro.AimTarget = ResetAimpoint;
Cramped = 0;
Attacking = false;
Spot = 0;
}
}
}

if(TurnLeft){
  Gyro.AimForce = 0;
  Gyro.TurnForce = -8000;
}

if(TurnRight){
  Gyro.AimForce = 0;
  Gyro.TurnForce = 8000;
}

if(TurnRight && TurnLeft && Obstacle){
  Gyro.TurnForce = -8000;
}

if(Attacking && !Obstacle && target != null){
if(!TurnRight && !TurnLeft){

if(Vector3.Distance(thisTransform.position, target.position) < 300 && !TurnRight && !TurnLeft){
TurnertFar = false;
Gyro.AimForce = 1000;
Gyro.TurnForce = -3000;
}

if(Vector3.Distance(thisTransform.position, target.position) > 300 && !TurnRight && !TurnLeft){
TurnertFar = true;
Gyro.AimForce = 1000;
Gyro.TurnForce = -2000;
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

if(RUP < 4)
RUP += 0.5;
else
RUP = 0;

if(RRUP < 4)
RRUP += 0.5;
else
RRUP = 0;

if(LRUP < 4)
LRUP += 0.5;
else
LRUP = 0;

var VelClamp = Mathf.Clamp(vRigidbody.velocity.magnitude * 2,40,200);

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

if(RightDist > LeftDist && LWall){
     TurnRight = true;
     }
     
 if(LeftDist > RightDist && RWall){
     TurnLeft = true;
     }
     
if(LeftDist < 20 && LWall)
Obstacle = true;

if(RightDist < 20 && RWall)
Obstacle = true;
    
if(Stuck)
  TurnRight = true;
}


function FixedUpdate () {

 if (Damaged) {
  vRigidbody.angularDrag = 0.05;
  ThrusterEffect1.GetComponent("VelocityEmissionConfigurable").Broken = true;
  ThrusterEffect2.GetComponent("VelocityEmissionConfigurable").Broken = true;
  ThrusterEffect3.GetComponent("VelocityEmissionConfigurable").Broken = true;
  ThrusterEffect4.GetComponent("VelocityEmissionConfigurable").Broken = true;
  Destroy(Presence);
  Destroy(this);
 }
 
var localV = thisVTransform.InverseTransformDirection(vRigidbody.velocity);

if(Obstacle){

if(-localV.y > 0){
  vRigidbody.AddForce(-thisVTransform.up * -1000);
  }
  
}

if(Stuck)
if(-localV.y < 4)
  vRigidbody.AddForce(thisVTransform.up * 500);

if(Attacking && !Obstacle && !Stuck){
if(-localV.y < 70)
  vRigidbody.AddForce(-thisVTransform.up * 500);
}

if(Spot > 0 && !Obstacle && !Attacking && !Stuck){
if(-localV.y < 70)
  vRigidbody.AddForce(-thisVTransform.up * 250);
}
  
if(!Attacking && !Obstacle && Spot < 1 && !Stuck && !TurnLeft && !TurnRight) {
if(-localV.y < 70)
  vRigidbody.AddForce(-thisVTransform.up * 250);
}
 
if(target){
  
  Turret1.rigidbody.AddForceAtPosition((TargetLead.transform.position - Turret1.transform.position).normalized * 10, -Turret1.transform.up * 2);
  Turret1.rigidbody.AddForceAtPosition((TargetLead.transform.position - Turret1.transform.position).normalized * -10, Turret1.transform.up * 2);
  Turret2.rigidbody.AddForceAtPosition((TargetLead.transform.position - Turret2.transform.position).normalized * 10, -Turret2.transform.up * 2);
  Turret2.rigidbody.AddForceAtPosition((TargetLead.transform.position - Turret2.transform.position).normalized * -10, Turret2.transform.up * 2);
}
}

function OnTriggerEnter (other : Collider) {

ON = other.name;
OT = other.transform;

if(ON.Contains ("TFC"))
if(!ON.Contains ("TFC7")){

if(MevNavNetwork.instance.EnemyTarget1){

if(ON.Contains ("TFC0a"))
if(MevNavNetwork.instance.EnemyTarget1.name.Contains ("TFC0"))
PissedAtTC0a = 2;

if(ON.Contains ("TFC1"))
if(MevNavNetwork.instance.EnemyTarget1.name.Contains ("TFC1"))
PissedAtTC1 = 2;

if(ON.Contains ("TFC3"))
if(MevNavNetwork.instance.EnemyTarget1.name.Contains ("TFC3"))
PissedAtTC3 = 2;

if(ON.Contains ("TFC4"))
if(MevNavNetwork.instance.EnemyTarget1.name.Contains ("TFC4"))
PissedAtTC4 = 2;

if(ON.Contains ("TFC5"))
if(MevNavNetwork.instance.EnemyTarget1.name.Contains ("TFC5"))
PissedAtTC5 = 2;

if(ON.Contains ("TFC6"))
if(MevNavNetwork.instance.EnemyTarget1.name.Contains ("TFC6"))
PissedAtTC6 = 2;

if(ON.Contains ("TFC8"))
if(MevNavNetwork.instance.EnemyTarget1.name.Contains ("TFC8"))
PissedAtTC8 = 2;

if(ON.Contains ("TFC9"))
if(MevNavNetwork.instance.EnemyTarget1.name.Contains ("TFC9"))
PissedAtTC9 = 2;

}else{

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

}

if(!Attacking){
DangerSense = 10;
target = Waypoint;
Gyro.AimTarget = Waypoint;
if(other.rigidbody)
Waypoint.position = OT.position;
}
}

}

function OnTriggerStay (other : Collider) {

ON = other.name;
OT = other.transform;

if(ON.Contains ("TC"))
if(!ON.Contains ("TC7")){

if(Vector3.Distance(thisTransform.position, OT.position) < 32){
if(!ON.Contains ("TC2")){
  Spot = 0;
  FarFromEnemy = 0;
  target = OT;
  if(Gyro != null)
  Gyro.AimTarget = OT;
  
  if(!Attacking)
  AttackNoise();
  
  Attacking = true;
  }
}
  
if(PissedAtTC0a > 1)
 if(ON.Contains ("TC0a"))
 if(ON.Contains ("sT") && !FoundSmall || !ON.Contains ("sT")){
 
  Spot = 0;
  FarFromEnemy = 0;
  target = OT;
  if(Gyro != null)
  Gyro.AimTarget = OT;
  
  if(!Attacking)
  AttackNoise();
  
  Attacking = true;
  PissedAtTC0a -= 1;
}
  
if(PissedAtTC1 > 1)
if(ON.Contains ("TC1")){
if(PissedAtTC1 > 300)
FoundSmall = false;
if(ON.Contains ("sT") && !FoundSmall || !ON.Contains ("sT")){
 
  Spot = 0;
  FarFromEnemy = 0;
  target = OT;
  if(Gyro != null)
  Gyro.AimTarget = OT;
  
  if(!Attacking)
  AttackNoise();
  
  Attacking = true;
  PissedAtTC1 -= 1;
}
}

if(PissedAtTC2 > 1)
if(ON.Contains ("mTC2")){
 
  Spot = 0;
  FarFromEnemy = 0;
  target = OT;
  if(Gyro != null)
  Gyro.AimTarget = OT;
  
  if(!Attacking)
  AttackNoise();
  
  Attacking = true;
  PissedAtTC2 -= 1;
}

if(PissedAtTC3 > 1)
if(!ON.Contains ("cT"))
 if(ON.Contains ("TC3")){
 if(PissedAtTC3 > 300)
FoundSmall = false;
 if(ON.Contains ("sT") && !FoundSmall || !ON.Contains ("sT")){
 
  Spot = 0;
  FarFromEnemy = 0;
  target = OT;
  if(Gyro != null)
  Gyro.AimTarget = OT;
  
  if(!Attacking)
  AttackNoise();
  
  Attacking = true;
  PissedAtTC3 -= 1;
}
}

if(PissedAtTC4 > 1)
 if(ON.Contains ("TC4")){
 if(PissedAtTC4 > 300)
FoundSmall = false;
 if(ON.Contains ("sT") && !FoundSmall || !ON.Contains ("sT")){
 
  Spot = 0;
  FarFromEnemy = 0;
  target = OT;
  if(Gyro != null)
  Gyro.AimTarget = OT;
  
  if(!Attacking)
  AttackNoise();
  
  Attacking = true;
  PissedAtTC4 -= 1;
}
}

if(PissedAtTC5 > 1)
if(!ON.Contains ("cT"))
 if(ON.Contains ("TC5")){
 if(PissedAtTC5 > 300)
FoundSmall = false;
 if(ON.Contains ("sT") && !FoundSmall || !ON.Contains ("sT")){
 
  Spot = 0;
  FarFromEnemy = 0;
  target = OT;
  if(Gyro != null)
  Gyro.AimTarget = OT;
  
  if(!Attacking)
  AttackNoise();
  
  Attacking = true;
  PissedAtTC5 -= 1;
}
}

if(PissedAtTC6 > 1)
if(!ON.Contains ("cT"))
 if(ON.Contains ("TC6")){
 if(PissedAtTC6 > 300)
FoundSmall = false;
 if(ON.Contains ("sT") && !FoundSmall || !ON.Contains ("sT")){
 
  Spot = 0;
  FarFromEnemy = 0;
  target = OT;
  if(Gyro != null)
  Gyro.AimTarget = OT;
  
  if(!Attacking)
  AttackNoise();
  
  Attacking = true;
  PissedAtTC6 -= 1;
}
}

if(PissedAtTC8 > 1)
if(!ON.Contains ("cT"))
 if(ON.Contains ("TC8")){
 if(PissedAtTC8 > 300)
FoundSmall = false;
 if(ON.Contains ("sT") && !FoundSmall || !ON.Contains ("sT")){
 
  Spot = 0;
  FarFromEnemy = 0;
  target = OT;
  if(Gyro != null)
  Gyro.AimTarget = OT;
  
  if(!Attacking)
  AttackNoise();
  
  Attacking = true;
  PissedAtTC8 -= 1;
}
}

if(PissedAtTC9 > 1)
if(!ON.Contains ("cT"))
 if(ON.Contains ("TC9")){
 if(PissedAtTC9 > 300)
FoundSmall = false;
 if(ON.Contains ("sT") && !FoundSmall || !ON.Contains ("sT")){
 
  Spot = 0;
  FarFromEnemy = 0;
  target = OT;
  if(Gyro != null)
  Gyro.AimTarget = OT;
  
  if(!Attacking)
  AttackNoise();
  
  Attacking = true;
  PissedAtTC9 -= 1;
}
}

}
}

function AttackNoise () {
var TheThing = Instantiate(AttackSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing.transform.parent = thisTransform;
}

function Looking () {
yield WaitForSeconds (15);

  if(!Attacking){
  Spot = 0;
  var TheThing = Instantiate(RejectSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing.transform.parent = thisTransform;
  Targety();
  }
}

function Shooty () {
if(Attacking){
Shoot();
}
}

function Shoot () {
if(Attacking){
if(Gun1)
Gun1.Fire();
yield WaitForSeconds (0.25);
if(Gun2)
Gun2.Fire();
}
}

function EmergencyLaunchy () {
if(Emergency){

LaunchCM();

LaunchSM();

}
}

function Launchy () {
if(Attacking && !Emergency){

if(!LaunchingCM)
LaunchSM();
if(LaunchingCM)
LaunchCM();

}
}

function LaunchSM () {

if(target != null)
if(Attacking && StoredMissileBatches > 0 && Vector3.Distance(thisTransform.position, target.position) < 500){

if(Emergency)
Dist3 = 3;
else
Dist3 = 6;

StoredMissileBatches -= 1;

var _SpawnedObject1 = Instantiate(MissileAmmo, Missile1.position, Missile1.rotation);
    _SpawnedObject1.rigidbody.velocity = vRigidbody.velocity * 1;
    _SpawnedObject1.transform.GetComponent(MissileScript).target = TargetLead2;

yield WaitForSeconds (0.3);
var _SpawnedObject2 = Instantiate(MissileAmmo, Missile2.position, Missile2.rotation);
    _SpawnedObject2.rigidbody.velocity = vRigidbody.velocity * 1;
    _SpawnedObject2.transform.GetComponent(MissileScript).target = TargetLead2;

yield WaitForSeconds (0.3);
var _SpawnedObject3 = Instantiate(MissileAmmo, Missile3.position, Missile3.rotation);
    _SpawnedObject3.rigidbody.velocity = vRigidbody.velocity * 1;
    _SpawnedObject3.transform.GetComponent(MissileScript).target = TargetLead2;

yield WaitForSeconds (0.3);
var _SpawnedObject4 = Instantiate(MissileAmmo, Missile4.position, Missile4.rotation);
    _SpawnedObject4.rigidbody.velocity = vRigidbody.velocity * 1;
    _SpawnedObject4.transform.GetComponent(MissileScript).target = TargetLead2;
}

yield WaitForSeconds (2.4);
Dist3 = 3;

}

function LaunchCM () {

if(target != null)
if(Attacking && StoredCMissiles > 0 && Vector3.Distance(thisTransform.position, target.position) < 2000){

StoredCMissiles -= 1;
LaunchingCM = false;

var _SpawnedObject0 = Instantiate(CMissileAmmo, CMissile.position, CMissile.rotation);
    _SpawnedObject0.rigidbody.velocity = vRigidbody.velocity * 1;
    _SpawnedObject0.transform.GetComponent(MissileScript).target = target;
}
}

function Targety () {
if(Spot < 1 && !Attacking)
TargetArea();
}

function TargetArea () {

if(MevNavNetwork.AlertTime > 0 && !Attacking){
Waypoint.transform.position = MevNavNetwork.instance.PriorityWaypoint.position;
target = Waypoint;
Gyro.AimTarget = Waypoint;
}
yield WaitForSeconds (10);
if(!Attacking)
Gyro.AimTarget = ResetAimpoint;
}

function LeaveMarker () {
var lastPos : Vector3 = thisTransform.position;
IsEscaping(lastPos);
}

function IsEscaping(lastPos : Vector3){
Stuck = false;
yield WaitForSeconds (2);

  if(Vector3.Distance(thisTransform.position, lastPos) < 3){
  Stuck = true;
  yield WaitForSeconds (3);
  Stuck = false;
  }
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
TargetLead2.position = TargetTrace.position;
TargetLead2.rotation = TargetTrace.rotation;
TargetLead.position += TargetLead.forward * Dist1 * Dist2 * 0.02;
TargetLead2.position += TargetLead.forward * Dist2 * Dist3;

if(Attacking)
TLCol.radius = Vector3.Distance(thisTransform.position, target.position) * 0.05;
else
TLCol.radius = 0.1;

}
}

function Regenerator () {

if(MevNavNetwork.AlertTime > 230){
TargetArea();
MevNavNetwork.AlertTime = 230;
}

PissedAtTC1 = MevNavNetwork.TC1DeathRow;
PissedAtTC2 = MevNavNetwork.TC2DeathRow;
PissedAtTC3 = MevNavNetwork.TC3DeathRow;
PissedAtTC4 = MevNavNetwork.TC4DeathRow;
PissedAtTC5 = MevNavNetwork.TC5DeathRow;
PissedAtTC6 = MevNavNetwork.TC6DeathRow;
PissedAtTC8 = MevNavNetwork.TC8DeathRow;
PissedAtTC9 = MevNavNetwork.TC9DeathRow;

if(target && !Attacking){
  if(Vector3.Distance(thisTransform.position, target.position) < 128){
  if(target.name.Contains ("TC0a") && PissedAtTC0a < 300)
  PissedAtTC0a = 2;
  if(target.name.Contains ("TC1") && PissedAtTC1 < 300)
  PissedAtTC1 = 2;
  if(target.name.Contains ("TC3") && PissedAtTC3 < 300)
  PissedAtTC3 = 2;
  if(target.name.Contains ("TC4") && PissedAtTC4 < 300)
  PissedAtTC4 = 2;
  if(target.name.Contains ("TC5") && PissedAtTC5 < 300)
  PissedAtTC5 = 2;
  if(target.name.Contains ("TC6"))
  if(!target.name.Contains ("csT"))
  PissedAtTC6 = 2;
  if(target.name.Contains ("TC8") && PissedAtTC8 < 300)
  PissedAtTC8 = 2;
  if(target.name.Contains ("TC9") && PissedAtTC9 < 300)
  PissedAtTC9 = 2;
}
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

if(target.name.Contains ("sT"))
FoundSmall = true;

if(Attacking){

if(Vector3.Distance(thisTransform.position, target.position) > 2000)
  FarFromEnemy += 1;
  
}

if(Vector3.Distance(thisTransform.position, target.position) < 1900)
  FarFromEnemy = 0;
}

if(Attacking){
Trig.center = Vector3(0,0,0);
Trig.radius = 50;
Trig.height = 50;
}else{
Trig.center = Vector3(0,0,200);
Trig.radius = 200;
Trig.height = 800;
}

if(Spot == 1 && !Attacking){
  Spot = 0;
  var TheThing1 = Instantiate(RejectSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing1.transform.parent = thisTransform;
  target = ResetAimpoint;
  Gyro.AimTarget = ResetAimpoint;
}

if(FarFromEnemy > 30){
  Spot = 0;
  Cramped = 0;
  TurnertDist = 100;
  Attacking = false;
  var TheThing2 = Instantiate(RejectSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing2.transform.parent = thisTransform;
  target = ResetAimpoint;
  Gyro.AimTarget = ResetAimpoint;
}

if(DangerSense > 0){
if(DangerSense < 2 && !Attacking){
target = ResetAimpoint;
Gyro.AimTarget = ResetAimpoint;
}

DangerSense -= 1;
}

if(Spot > 0)
Spot -= 1;

if(target)
if(target.name.Contains ("sTC"))
FoundSmall = true;

Gyro.AimForce = 1000;

Gyro.TurnForce = 0;

Wall = false;
RWall = false;
LWall = false;

TurnRight = false;
TurnLeft = false;

Notice();

}

function Notice (){
if(target != null && StoredCMissiles > 0 && Attacking){
var lastTPos : Vector3 = target.transform.position;

yield WaitForSeconds (0.2);

if(target != null)
if(Vector3.Distance(target.transform.position, lastTPos) > 20)
LaunchingCM = true;
}

if(Attacking){
if(target != null){

if(Emergency)
MevNavNetwork.instance.EnemyTarget1 = target;

if(target.name.Contains ("bTC") && !HasRequested && StoredCMissiles < 1){
HasRequested = true;
MevNavNetwork.RequestCruiseMissile = true;
MevNavNetwork.instance.EnemyTarget2 = target;
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