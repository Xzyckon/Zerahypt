var target : Transform;
var Waypoint : Transform;

var Stranger : Transform;

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
var Missile5 : Transform;
var Missile6 : Transform;
var Missile7 : Transform;
var Missile8 : Transform;
var Missile9 : Transform;
var Missile10 : Transform;
var Missile11 : Transform;
var Missile12 : Transform;
var Missile13 : Transform;
var Missile14 : Transform;
var Missile15 : Transform;
var Missile16 : Transform;
var CMissile : Transform;
var Drone1 : GameObject;
var Vult : GameObject;
var DroneSpawn1 : Transform;
var DroneSpawn2 : Transform;

var PresentDrone1 : GameObject;
var PresentDrone2 : GameObject;

var Drone1AI : MevNavBattledroneAI;
var Drone2AI : MevNavBattledroneAI;

var Gate : Transform;

var GateSound : AudioSource;

var Turret1TF : Transform;
var Turret2TF : Transform;
var Turret1RB : Rigidbody;
var Turret2RB : Rigidbody;
var Gun1 : NPCGun;
var Gun2 : NPCGun;
var Gyro : MevNavGyro;
var Trig : BoxCollider;
var ThrusterEffect1 : GameObject;
var ThrusterEffect2 : GameObject;
var ThrusterEffect3 : GameObject;
var ThrusterEffect4 : GameObject;
var ThrusterEffect5 : GameObject;
var ThrusterEffect6 : GameObject;
var ThrusterEffect7 : GameObject;
var ThrusterEffect8 : GameObject;
var Presence : GameObject;

var PissedAtTC0a = 0;

var PissedAtTC1 = 0;
var PissedAtTC3 = 0;
var PissedAtTC4 = 0;
var PissedAtTC5 = 0;
var PissedAtTC6 = 0;
var PissedAtTC8 = 0;
var PissedAtTC9 = 0;

var FoundSmall : boolean;
var FoundMedium : boolean;
var FoundBig : boolean;

var Hunting : boolean;
var Attacking : boolean;
var Obstacle : boolean = false;
var Stuck : boolean = false;
var StuckTimer = 0;
var StuckCounter = 0;
var Emergency : boolean;
var Damaged : boolean;

var OnHull : boolean;

var TurnRight : boolean;
var TurnLeft : boolean;

var RightDist : float = 200;
var LeftDist : float = 200;

var RUP : float = 0;

var RRUP : float = 0;

var RRUPz : float = 0;

var AngClamp = 2;

var Wall : boolean;
var RWall : boolean;
var LWall : boolean;

var Pointu : Vector3;
var Pointd : Vector3;

var RPointu : Vector3;
var RPointur : Vector3;
var RPointd : Vector3;

var LPointu : Vector3;
var LPointul : Vector3;
var LPointd : Vector3;

var localV : Vector3;

var Vel : float = 0;

var targetLayers : LayerMask;

var DangerSense = 0;

var DangerTick : boolean;

var LaunchingCM : boolean;

var DistantThreat : boolean;

var TargetClose : boolean;

var GOpen : boolean;
var GClose : boolean;

var SpawnCounter = 0;

var Spot = 0;

var Ignorage = 0;

var StoredMissileBatches = 8;
var StoredCMissiles = 4;

var GyroOff : boolean;

InvokeRepeating("Regenerator", 1, 1);

InvokeRepeating("Targety", 15, 15);

InvokeRepeating("Shooty", Random.Range(2, 3), 0.2);

InvokeRepeating("Launchy", 1, 11);

InvokeRepeating("EmergencyLaunchy", 1, 1.2);

InvokeRepeating("CalcLead", 1, 0.15);

function Update () {

if(Damaged)
return;

if(!DangerTick)
thisTransform.rotation = AIAnchor.transform.rotation;

thisTransform.position = AIAnchor.transform.position;

if(Attacking){
if(target == Waypoint){
target = ResetAimpoint;
Gyro.AimTarget = ResetAimpoint;
Attacking = false;
Spot = 0;
Hunting = true;
FoundSmall = false;
FoundMedium = false;
}
if(target == null){
target = ResetAimpoint;
Gyro.AimTarget = ResetAimpoint;
Attacking = false;
Spot = 0;
Hunting = true;
FoundSmall = false;
FoundMedium = false;
}else{
if(target.name.Contains ("broken")){
target = ResetAimpoint;
Gyro.AimTarget = ResetAimpoint;
Attacking = false;
Spot = 0;
Hunting = true;
FoundSmall = false;
FoundMedium = false;
}
}
}

if(!Stuck){
if(TurnLeft){
Gyro.AimForce = 0;
Gyro.TurnForce = -3200000;
}

if(TurnRight){
Gyro.AimForce = 0;
Gyro.TurnForce = 3200000;
}
}else{
Gyro.AimForce = 0;
Gyro.TurnForce = 3200000;
}

if(TurnRight && TurnLeft && Obstacle){
  Gyro.TurnForce = -3200000;
}

if(Attacking && !Obstacle && target != null){
if(!TurnRight && !TurnLeft){

if(Vector3.Distance(thisTransform.position, target.position) > 300 && !TurnRight && !TurnLeft){
Gyro.AimForce = 200000;
Gyro.TurnForce = -1600000;
}

}
}
	
localV = thisVTransform.InverseTransformDirection(vRigidbody.velocity);

Vel = vRigidbody.velocity.magnitude;

var hit : RaycastHit;

var hit1 : RaycastHit;
var hit2 : RaycastHit;
var hit3 : RaycastHit;

if(RUP < 4)
RUP += 1;
else
RUP = 0;

if(RRUP < 80){
RRUP += 4;
RRUPz -= 2;
}else{
RRUP = 2;
RRUPz = 70;
}

var VelClamp = Mathf.Clamp(Vel * 4,80,400);
AngClamp = Mathf.Clamp(Vel * 0.15,2,8);

var DMod1 = 160 - Vel;
var DMod = Mathf.Clamp(DMod1,1,160);

Debug.DrawRay (thisTransform.position + thisTransform.forward * 70 + -thisTransform.up * 14 + thisTransform.up * RUP, thisTransform.forward * VelClamp, Color.white);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 70 + -thisTransform.up * 14 + thisTransform.up * RUP, thisTransform.forward, hit1, VelClamp, targetLayers))
Pointu = hit1.point;
else
Pointu = Vector3(2,2,2);

Debug.DrawRay (thisTransform.position + thisTransform.forward * 70 + -thisTransform.up * 15 + thisTransform.up * RUP, thisTransform.forward * VelClamp, Color.white);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 70 + -thisTransform.up * 15 + thisTransform.up * RUP, thisTransform.forward, hit2, VelClamp, targetLayers))
Pointd = hit2.point;
else
Pointd = Vector3(8,8,8);

if(Vector3.Distance(Pointu, Pointd) < AngClamp){
Wall = true;
}

if(!OnHull)
Obstacle = false;

Debug.DrawRay (thisTransform.position + thisTransform.forward * 70 + thisTransform.right * 40, thisTransform.forward * VelClamp, Color.green);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 70 + thisTransform.right * 40, thisTransform.forward, hit, VelClamp, targetLayers))
     if(Wall)
     Obstacle = true;

Debug.DrawRay (thisTransform.position + thisTransform.forward * 70 + -thisTransform.right * 40, thisTransform.forward * VelClamp, Color.green);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 70 + -thisTransform.right * 40, thisTransform.forward, hit, VelClamp, targetLayers))
     if(Wall)
     Obstacle = true;

Debug.DrawRay (thisTransform.position + thisTransform.forward * RRUPz + thisTransform.right * RRUP + -thisTransform.up * 10 + thisTransform.up * RUP, thisTransform.forward * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * RRUPz + thisTransform.right * RRUP + -thisTransform.up * 10 + thisTransform.up * RUP, thisTransform.forward, hit1, VelClamp, targetLayers)){
RPointu = hit1.point;
}else{
RPointu = Vector3(2,2,2);
}

Debug.DrawRay (thisTransform.position + thisTransform.forward * RRUPz + thisTransform.right * RRUP + thisTransform.right * 1 + -thisTransform.up * 10 + thisTransform.up * RUP, thisTransform.forward * VelClamp, Color.blue);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * RRUPz + thisTransform.right * RRUP + thisTransform.right * 1 + -thisTransform.up * 10 + thisTransform.up * RUP, thisTransform.forward, hit3, VelClamp, targetLayers)){
RPointur = hit3.point;
}else{
RPointur = Vector3(4,4,4);
}

Debug.DrawRay (thisTransform.position + thisTransform.forward * RRUPz + thisTransform.right * RRUP + -thisTransform.up * 11 + thisTransform.up * RUP, thisTransform.forward * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * RRUPz + thisTransform.right * RRUP + -thisTransform.up * 11 + thisTransform.up * RUP, thisTransform.forward, hit2, VelClamp, targetLayers)){
RPointd = hit2.point;
RightDist = hit2.distance;
}else{
RPointd = Vector3(8,8,8);
RightDist = 512;
}

if(Vector3.Distance(RPointu, RPointd) < AngClamp)
RWall = true;

Debug.DrawRay (thisTransform.position + thisTransform.forward * RRUPz + -thisTransform.right * RRUP + -thisTransform.up * 10 + thisTransform.up * RUP, thisTransform.forward * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * RRUPz + -thisTransform.right * RRUP + -thisTransform.up * 10 + thisTransform.up * RUP, thisTransform.forward, hit1, VelClamp, targetLayers)){
LPointu = hit1.point;
}else{
LPointu = Vector3(2,2,2);
}

Debug.DrawRay (thisTransform.position + thisTransform.forward * RRUPz + -thisTransform.right * RRUP + -thisTransform.right * 1 + -thisTransform.up * 10 + thisTransform.up * RUP, thisTransform.forward * VelClamp, Color.blue);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * RRUPz + -thisTransform.right * RRUP + -thisTransform.right * 1 + -thisTransform.up * 10 + thisTransform.up * RUP, thisTransform.forward, hit3, VelClamp, targetLayers)){
LPointul = hit3.point;
}else{
LPointul = Vector3(4,4,4);
}

Debug.DrawRay (thisTransform.position + thisTransform.forward * RRUPz + -thisTransform.right * RRUP + -thisTransform.up * 11 + thisTransform.up * RUP, thisTransform.forward * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * RRUPz + -thisTransform.right * RRUP + -thisTransform.up * 11 + thisTransform.up * RUP, thisTransform.forward, hit2, VelClamp, targetLayers)){
LPointd = hit2.point;
LeftDist = hit2.distance;
}else{
LPointd = Vector3(8,8,8);
LeftDist = 512;
}

if(Vector3.Distance(LPointu, LPointd) < AngClamp)
LWall = true;

Debug.DrawRay (thisTransform.position + thisTransform.up * 70 + thisTransform.forward * VelClamp, -thisTransform.up * DMod, Color.white);
if (!Physics.Raycast (thisTransform.position + thisTransform.up * 70 + thisTransform.forward * VelClamp, -thisTransform.up, DMod))
     Obstacle = true;

//---------------------------------------------------------------------------------------------
             Debug.DrawRay (thisTransform.position + thisTransform.up * 80 
                                  + thisTransform.right * 80
                                  + thisTransform.forward * VelClamp, thisTransform.up * -160, Color.white);
if (!Physics.Raycast (thisTransform.position + thisTransform.up * 80
                                        + thisTransform.right * 80 
                                        + thisTransform.forward * VelClamp, -thisTransform.up, 160))
     TurnLeft = true;

             Debug.DrawRay (thisTransform.position + thisTransform.up * 80
                                  + -thisTransform.right * 80
                                  + thisTransform.forward * VelClamp, thisTransform.up * -160, Color.white);
if (!Physics.Raycast (thisTransform.position + thisTransform.up * 80
                                        + -thisTransform.right * 80 
                                        + thisTransform.forward * VelClamp, -thisTransform.up, 160))
     TurnRight = true;
//---------------------------------------------------------------------------------------------

if(RightDist > LeftDist){
if(Vector3.Distance(LPointu, LPointd) < 4)
     TurnRight = true;
     }
     
 if(LeftDist > RightDist){
 if(Vector3.Distance(RPointu, RPointd) < 4)
     TurnLeft = true;
     }
     
if(LeftDist < 160 && LWall)
Obstacle = true;

if(RightDist < 160 && RWall)
Obstacle = true;

}


function FixedUpdate () {

 if (Damaged) {
  vRigidbody.angularDrag = 0.05;
  ThrusterEffect1.GetComponent("VelocityEmissionConfigurable").Broken = true;
  ThrusterEffect2.GetComponent("VelocityEmissionConfigurable").Broken = true;
  ThrusterEffect3.GetComponent("VelocityEmissionConfigurable").Broken = true;
  ThrusterEffect4.GetComponent("VelocityEmissionConfigurable").Broken = true;
  ThrusterEffect5.GetComponent("VelocityEmissionConfigurable").Broken = true;
  ThrusterEffect6.GetComponent("VelocityEmissionConfigurable").Broken = true;
  ThrusterEffect7.GetComponent("VelocityEmissionConfigurable").Broken = true;
  ThrusterEffect8.GetComponent("VelocityEmissionConfigurable").Broken = true;
  Destroy(Presence);
  Destroy(this);
 }

if(Obstacle){

if(-localV.y > 0){
  vRigidbody.AddForce(-thisVTransform.up * -40000);
  }
  
}

if(Stuck)
if(localV.y < 8)
  vRigidbody.AddForce(thisVTransform.up * 40000);
  
if(!Obstacle && !Stuck && !TurnLeft && !TurnRight) {
if(-localV.y < 60)
  vRigidbody.AddForce(-thisVTransform.up * 40000);
}
 
if(target){
  if(Turret1RB.angularVelocity.magnitude < 1){
  Turret1RB.AddForceAtPosition((TargetLead.position - Turret1TF.position).normalized * 20, -Turret1TF.up * 4);
  Turret1RB.AddForceAtPosition((TargetLead.position - Turret1TF.position).normalized * -20, Turret1TF.up * 4);
  }
  if(Turret2RB.angularVelocity.magnitude < 1){
  Turret2RB.AddForceAtPosition((TargetLead.position - Turret2TF.position).normalized * 20, -Turret2TF.up * 4);
  Turret2RB.AddForceAtPosition((TargetLead.position - Turret2TF.position).normalized * -20, Turret2TF.up * 4);
}
}

if(GOpen){
if(Gate.localPosition.z > -1.2)
Gate.localPosition.z -= 0.06;
}

if(GClose){
if(Gate.localPosition.z < 0)
Gate.localPosition.z += 0.06;
}

}

function OnTriggerEnter (other : Collider) {

ON = other.name;
OT = other.transform;

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

if(ON.Contains ("#3"))
Attacking = false;

if(!Attacking && StuckCounter < 1){
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

if(!ON.Contains ("TC7")){

if(Vector3.Distance(thisTransform.position, OT.position) < 150)
if(ON.Contains ("TC"))
  Stranger = OT;
  
if(PissedAtTC0a > 1)
 if(ON.Contains ("TC0a")){
 
 if(ON.Contains ("sT") && !FoundSmall && !FoundMedium ||
    ON.Contains ("mT") && FoundSmall && !FoundMedium ||
    ON.Contains ("bT")){
 
  Spot = 0;
  Hunting = false;
  target = OT;
  if(Gyro != null)
  Gyro.AimTarget = OT;
  
  Attacking = true;
 }
}
  
if(PissedAtTC1 > 1)
if(ON.Contains ("TC1")){
 
if(PissedAtTC1 > 600)
FoundSmall = false;
FoundMedium = false;
 
 if(ON.Contains ("sT") && !FoundSmall ||
    ON.Contains ("mT") && !FoundMedium ||
    ON.Contains ("bT")){
 
  Spot = 0;
  Hunting = false;
  target = OT;
  if(Gyro != null)
  Gyro.AimTarget = OT;
  
  Attacking = true;
}
}

if(PissedAtTC3 > 1)
if(!ON.Contains ("cT"))
 if(ON.Contains ("TC3")){
 
 if(PissedAtTC3 > 600)
FoundSmall = false;
FoundMedium = false;
 
 if(ON.Contains ("sT") && !FoundSmall ||
    ON.Contains ("mT") && !FoundMedium ||
    ON.Contains ("bT")){
 
  Spot = 0;
  Hunting = false;
  target = OT;
  if(Gyro != null)
  Gyro.AimTarget = OT;
  
  Attacking = true;
}
}

if(PissedAtTC4 > 1)
 if(ON.Contains ("TC4")){
 
 if(PissedAtTC4 > 600)
FoundSmall = false;
FoundMedium = false;
 
 if(ON.Contains ("sT") && !FoundSmall ||
    ON.Contains ("mT") && !FoundMedium ||
    ON.Contains ("bT")){
 
  Spot = 0;
  Hunting = false;
  target = OT;
  if(Gyro != null)
  Gyro.AimTarget = OT;
  
  Attacking = true;
}
}

if(PissedAtTC5 > 1)
if(!ON.Contains ("cT"))
 if(ON.Contains ("TC5")){
 
 if(PissedAtTC5 > 600)
FoundSmall = false;
FoundMedium = false;
 
 if(ON.Contains ("sT") && !FoundSmall ||
    ON.Contains ("mT") && !FoundMedium ||
    ON.Contains ("bT")){
 
  Spot = 0;
  Hunting = false;
  target = OT;
  if(Gyro != null)
  Gyro.AimTarget = OT;
  
  Attacking = true;
}
}

if(PissedAtTC6 > 1)
if(!ON.Contains ("cT"))
 if(ON.Contains ("TC6")){
 
 if(PissedAtTC6 > 600)
FoundSmall = false;
FoundMedium = false;
 
 if(ON.Contains ("sT") && !FoundSmall ||
    ON.Contains ("mT") && !FoundMedium ||
    ON.Contains ("bT")){
 
  Spot = 0;
  Hunting = false;
  target = OT;
  if(Gyro != null)
  Gyro.AimTarget = OT;
  
  Attacking = true;
}
}

if(PissedAtTC8 > 1)
if(!ON.Contains ("cT"))
 if(ON.Contains ("TC8")){
 
 if(PissedAtTC8 > 600)
FoundSmall = false;
FoundMedium = false;
 
 if(ON.Contains ("sT") && !FoundSmall ||
    ON.Contains ("mT") && !FoundMedium ||
    ON.Contains ("bT")){
 
  Spot = 0;
  Hunting = false;
  target = OT;
  if(Gyro != null)
  Gyro.AimTarget = OT;
  
  Attacking = true;
}
}

if(PissedAtTC9 > 1)
if(!ON.Contains ("cT"))
 if(ON.Contains ("TC9")){
 
 if(PissedAtTC9 > 600)
FoundSmall = false;
FoundMedium = false;
 
 if(ON.Contains ("sT") && !FoundSmall ||
    ON.Contains ("mT") && !FoundMedium ||
    ON.Contains ("bT")){
 
  Spot = 0;
  Hunting = false;
  target = OT;
  if(Gyro != null)
  Gyro.AimTarget = OT;
  
  Attacking = true;
}
}

}
}

function Looking () {
yield WaitForSeconds (15);

  if(!Attacking){
  Spot = 0;
  if(Hunting)
  return;
  Hunting = true;
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
yield WaitForSeconds (0.7);
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

function SpawnDrone () {
GateSound.audio.Play();
SpawnCounter = 15;
GOpen = true;
GClose = false;
yield WaitForSeconds (0.3);
if(!DistantThreat){
if(!PresentDrone1){
    PresentDrone1 = Instantiate(Drone1, DroneSpawn1.position, DroneSpawn1.rotation) as GameObject;
    PresentDrone1.transform.GetChild(1).rigidbody.velocity = vRigidbody.velocity * 1;
    PresentDrone1.transform.GetChild(1).rigidbody.AddForce(DroneSpawn1.transform.right * 100);
    Drone1AI = PresentDrone1.transform.GetChild(0).GetComponent(MevNavBattledroneAI);
    Drone1AI.target = Stranger;
    Drone1AI.Home = AIAnchor;
    }else{
if(!PresentDrone2){
    PresentDrone2 = Instantiate(Drone1, DroneSpawn1.position, DroneSpawn1.rotation) as GameObject;
    PresentDrone2.transform.GetChild(1).rigidbody.velocity = vRigidbody.velocity * 1;
    PresentDrone2.transform.GetChild(1).rigidbody.AddForce(DroneSpawn1.transform.right * 100);
    Drone2AI = PresentDrone2.transform.GetChild(0).GetComponent(MevNavBattledroneAI);
    Drone2AI.target = Stranger;
    Drone2AI.Home = AIAnchor;
    }
    }
}else{
var _SpawnedObjectC = Instantiate(Vult, DroneSpawn2.position, DroneSpawn2.rotation);
    _SpawnedObjectC.transform.GetChild(1).rigidbody.velocity = vRigidbody.velocity * 1;
    _SpawnedObjectC.transform.GetChild(0).GetComponent(MevNavBattledroneAI).target = target;
    _SpawnedObjectC.transform.GetChild(1).rigidbody.AddForce(DroneSpawn2.transform.right * 100);
}
yield WaitForSeconds (0.35);
GOpen = false;
GClose = true;
}

function LaunchSM () {

if(target != null)
if(Attacking && StoredMissileBatches > 0)
if(Vector3.Distance(thisTransform.position, target.position) < 850 && Vector3.Distance(thisTransform.position, target.position) > 150){

var Measure = thisVTransform.InverseTransformPoint(target.position);
if(Measure.y < 0 && -localV.y > 17 && Vector3.Distance(thisTransform.position, target.position) < 330)
return;

StoredMissileBatches -= 1;

var _SpawnedObject1 = Instantiate(MissileAmmo, Missile1.position, Missile1.rotation);
    _SpawnedObject1.rigidbody.velocity = vRigidbody.velocity * 1;
    _SpawnedObject1.transform.GetComponent(MissileScript).target = TargetLead2;
yield WaitForSeconds (0.2);
var _SpawnedObject2 = Instantiate(MissileAmmo, Missile2.position, Missile2.rotation);
    _SpawnedObject2.rigidbody.velocity = vRigidbody.velocity * 1;
    _SpawnedObject2.transform.GetComponent(MissileScript).target = TargetLead2;
yield WaitForSeconds (0.2);
var _SpawnedObject3 = Instantiate(MissileAmmo, Missile3.position, Missile3.rotation);
    _SpawnedObject3.rigidbody.velocity = vRigidbody.velocity * 1;
    _SpawnedObject3.transform.GetComponent(MissileScript).target = TargetLead2;
yield WaitForSeconds (0.2);
var _SpawnedObject4 = Instantiate(MissileAmmo, Missile4.position, Missile4.rotation);
    _SpawnedObject4.rigidbody.velocity = vRigidbody.velocity * 1;
    _SpawnedObject4.transform.GetComponent(MissileScript).target = TargetLead2;
yield WaitForSeconds (0.2);
var _SpawnedObject5 = Instantiate(MissileAmmo, Missile5.position, Missile5.rotation);
    _SpawnedObject5.rigidbody.velocity = vRigidbody.velocity * 1;
    _SpawnedObject5.transform.GetComponent(MissileScript).target = TargetLead2;
yield WaitForSeconds (0.2);
var _SpawnedObject6 = Instantiate(MissileAmmo, Missile6.position, Missile6.rotation);
    _SpawnedObject6.rigidbody.velocity = vRigidbody.velocity * 1;
    _SpawnedObject6.transform.GetComponent(MissileScript).target = TargetLead2;
yield WaitForSeconds (0.2);
var _SpawnedObject7 = Instantiate(MissileAmmo, Missile7.position, Missile7.rotation);
    _SpawnedObject7.rigidbody.velocity = vRigidbody.velocity * 1;
    _SpawnedObject7.transform.GetComponent(MissileScript).target = TargetLead2;
yield WaitForSeconds (0.2);
var _SpawnedObject8 = Instantiate(MissileAmmo, Missile8.position, Missile8.rotation);
    _SpawnedObject8.rigidbody.velocity = vRigidbody.velocity * 1;
    _SpawnedObject8.transform.GetComponent(MissileScript).target = TargetLead2;

yield WaitForSeconds (5);

if(target){
if(Measure.y < 0 && -localV.y > 17 && Vector3.Distance(thisTransform.position, target.position) < 330)
return;
}else{
return;
}

if(Attacking && StoredMissileBatches > 0){
StoredMissileBatches -= 1;
var _SpawnedObject9 = Instantiate(MissileAmmo, Missile9.position, Missile9.rotation);
    _SpawnedObject9.rigidbody.velocity = vRigidbody.velocity * 1;
    _SpawnedObject9.transform.GetComponent(MissileScript).target = TargetLead2;
yield WaitForSeconds (0.2);
var _SpawnedObject10 = Instantiate(MissileAmmo, Missile10.position, Missile10.rotation);
    _SpawnedObject10.rigidbody.velocity = vRigidbody.velocity * 1;
    _SpawnedObject10.transform.GetComponent(MissileScript).target = TargetLead2;
yield WaitForSeconds (0.2);
var _SpawnedObject11 = Instantiate(MissileAmmo, Missile11.position, Missile11.rotation);
    _SpawnedObject11.rigidbody.velocity = vRigidbody.velocity * 1;
    _SpawnedObject11.transform.GetComponent(MissileScript).target = TargetLead2;
yield WaitForSeconds (0.2);
var _SpawnedObject12 = Instantiate(MissileAmmo, Missile12.position, Missile12.rotation);
    _SpawnedObject12.rigidbody.velocity = vRigidbody.velocity * 1;
    _SpawnedObject12.transform.GetComponent(MissileScript).target = TargetLead2;
yield WaitForSeconds (0.2);
var _SpawnedObject13 = Instantiate(MissileAmmo, Missile13.position, Missile13.rotation);
    _SpawnedObject13.rigidbody.velocity = vRigidbody.velocity * 1;
    _SpawnedObject13.transform.GetComponent(MissileScript).target = TargetLead2;
yield WaitForSeconds (0.2);
var _SpawnedObject14 = Instantiate(MissileAmmo, Missile14.position, Missile14.rotation);
    _SpawnedObject14.rigidbody.velocity = vRigidbody.velocity * 1;
    _SpawnedObject14.transform.GetComponent(MissileScript).target = TargetLead2;
yield WaitForSeconds (0.2);
var _SpawnedObject15 = Instantiate(MissileAmmo, Missile15.position, Missile15.rotation);
    _SpawnedObject15.rigidbody.velocity = vRigidbody.velocity * 1;
    _SpawnedObject15.transform.GetComponent(MissileScript).target = TargetLead2;
yield WaitForSeconds (0.2);
var _SpawnedObject16 = Instantiate(MissileAmmo, Missile16.position, Missile16.rotation);
    _SpawnedObject16.rigidbody.velocity = vRigidbody.velocity * 1;
    _SpawnedObject16.transform.GetComponent(MissileScript).target = TargetLead2;
}
}

}

function LaunchCM () {

if(target != null)
if(Attacking && StoredCMissiles > 0)
if(Vector3.Distance(thisTransform.position, target.position) < 1700 && Vector3.Distance(thisTransform.position, target.position) > 150){

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

if(MevNavNetwork.AlertTime > 0 && StuckCounter < 1 && !Attacking){
Waypoint.transform.position = MevNavNetwork.instance.PriorityWaypoint.position;
target = Waypoint;
Gyro.AimTarget = Waypoint;
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
TargetLead.position += TargetLead.forward * Dist1 * Dist2 * 0.017;
TargetLead2.position += TargetLead.forward * Dist2 * 3;

if(Attacking)
TLCol.radius = Vector3.Distance(thisTransform.position, target.position) * 0.1;
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

var lastTPos : Vector3 = target.position;

if(target.name.Contains ("sT"))
FoundSmall = true;

if(target.name.Contains ("mT"))
FoundMedium = true;

if(target.name.Contains ("xbT"))
if(SpawnCounter > 15)
SpawnCounter = 15;

if(Attacking){

MevNavNetwork.instance.EnemyTarget1 = target;

if(Vector3.Distance(thisTransform.position, target.position) < 150){
TargetClose = true;

if(Drone1AI && PresentDrone1)
if(Vector3.Distance(PresentDrone1.transform.position, target.position) > 300)
Drone1AI.target = target;

if(Drone2AI && PresentDrone2)
if(Vector3.Distance(PresentDrone2.transform.position, target.position) > 300)
Drone2AI.target = target;

if(SpawnCounter == 0)
SpawnDrone();
}

if(!Emergency){
if(Vector3.Distance(thisTransform.position, target.position) > 850){
if(target.name.Contains ("bT")){
DistantThreat = true;
if(SpawnCounter == 0)
SpawnDrone();
}else{
DistantThreat = false;
LaunchingCM = true;
}
}
}else{
if(Vector3.Distance(thisTransform.position, target.position) > 256){
if(target.name.Contains ("bT")){
DistantThreat = true;
if(SpawnCounter == 0)
SpawnDrone();
}else{
DistantThreat = false;
LaunchingCM = true;
}
}
}
  
}

if(Vector3.Distance(thisTransform.position, target.position) > 6000)
if(target.name.Contains ("TC")){
target = ResetAimpoint;
Attacking = false;
}

if(!target.name.Contains ("xbT"))
if(MevNavNetwork.xbTarget)
if(Vector3.Distance(thisTransform.position, MevNavNetwork.xbTarget.position) < 6000){
if(MevNavNetwork.xbTarget.name.Contains ("TC1") && PissedAtTC1 > 400){
Spot = 0;
Hunting = false;
target = MevNavNetwork.xbTarget;
if(Gyro != null)
Gyro.AimTarget = MevNavNetwork.xbTarget;
  
Attacking = true;
}
if(MevNavNetwork.xbTarget.name.Contains ("TC3") && PissedAtTC3 > 400){
Spot = 0;
Hunting = false;
target = MevNavNetwork.xbTarget;
if(Gyro != null)
Gyro.AimTarget = MevNavNetwork.xbTarget;
  
Attacking = true;
}
if(MevNavNetwork.xbTarget.name.Contains ("TC5") && PissedAtTC5 > 400){
Spot = 0;
Hunting = false;
target = MevNavNetwork.xbTarget;
if(Gyro != null)
Gyro.AimTarget = MevNavNetwork.xbTarget;
  
Attacking = true;
}
if(MevNavNetwork.xbTarget.name.Contains ("TC6") && PissedAtTC6 > 400){
Spot = 0;
Hunting = false;
target = MevNavNetwork.xbTarget;
if(Gyro != null)
Gyro.AimTarget = MevNavNetwork.xbTarget;
  
Attacking = true;
}
if(MevNavNetwork.xbTarget.name.Contains ("TC8") && PissedAtTC8 > 400){
Spot = 0;
Hunting = false;
target = MevNavNetwork.xbTarget;
if(Gyro != null)
Gyro.AimTarget = MevNavNetwork.xbTarget;
  
Attacking = true;
}
if(MevNavNetwork.xbTarget.name.Contains ("TC9") && PissedAtTC9 > 400){
Spot = 0;
Hunting = false;
target = MevNavNetwork.xbTarget;
if(Gyro != null)
Gyro.AimTarget = MevNavNetwork.xbTarget;
  
Attacking = true;
}
}

}

if(Attacking){
Trig.center = Vector3(0,0,150);
Trig.size = Vector3(300,300,600);
}else{
Trig.center = Vector3(0,0,1000);
Trig.size = Vector3(600,300,2500);
}

if(Spot == 1 && !Attacking){
  Spot = 0;
  Hunting = true;
  target = ResetAimpoint;
  Gyro.AimTarget = ResetAimpoint;
}

if(DangerSense > 0){

if(DangerSense == 1 && !Attacking){
target = ResetAimpoint;
Gyro.AimTarget = ResetAimpoint;
}

DangerSense -= 1;
}

if(Spot > 0)
Spot -= 1;

if(SpawnCounter > 0)
SpawnCounter -= 1;

if(Ignorage > 4){
Ignorage = 0;
target = null;
}

if(StuckCounter > 0){
if(!TurnLeft)
StuckCounter -= 1;
}

if(Stuck){
if(StuckCounter < 18){
Stuck = false;
StuckTimer = 0;
}
}

StuckTimer += 1;

if(StuckTimer > 16){
var lastPos : Vector3 = thisTransform.position;
IsEscaping(lastPos);
StuckTimer = 0;
}

if(target == Waypoint)
Gyro.AimForce = 100000;
else
Gyro.AimForce = 0;

Gyro.TurnForce = 0;

if(OnHull){
if(SpawnCounter == 0)
SpawnDrone();
OnHull = false;
Obstacle = true;
}

Wall = false;
RWall = false;
LWall = false;

TurnRight = false;
TurnLeft = false;

Notice();

Notice2(lastTPos);

}

function Notice(){

if(Attacking){
if(Emergency)
MevNavNetwork.instance.EnemyTarget1 = target;

if(target != null)
if(target.name.Contains ("bTC") && !HasRequested && StoredCMissiles < 1){
HasRequested = true;
MevNavNetwork.RequestCruiseMissile = true;
MevNavNetwork.instance.EnemyTarget2 = target;
}
}

if(DangerSense > 0){
DangerTick = true;
thisTransform.LookAt(Waypoint);
yield WaitForSeconds (0.1);
DangerTick = false;
}
}

function Notice2(lastTPos : Vector3){
yield WaitForSeconds (0.5);
if(target){
if(target.name.Contains ("sTC")){
if(Vector3.Distance(target.position, lastTPos) < 0.5)
  Ignorage += 1;
  else
  Ignorage = 0;
}
}
}

function IsEscaping(lastPos : Vector3){
Stuck = false;
TurnRight = false;
TurnLeft = false;
yield WaitForSeconds (1);

  if(Vector3.Distance(thisTransform.position, lastPos) < 32){
  Stuck = true;
  StuckCounter = 26;
  }
}