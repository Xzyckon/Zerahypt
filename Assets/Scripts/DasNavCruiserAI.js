var target : Transform;
var Waypoint : Transform;

var Base : Transform;

var Stranger : Transform;

var TargetTrace : Transform;
var TargetLead : Transform;
var TLCol : SphereCollider;

var thisTransform : Transform;
var thisVTransform : Transform;

var vRigidbody : Rigidbody;

var ResetAimpoint : Transform;

var topPoint : Transform;

var AIAnchor : Transform;

var MissileAmmo : GameObject;
var Missile1 : Transform;
var Missile2 : Transform;
var Missile3 : Transform;
var Missile4 : Transform;

var Turret1TF : Transform;
var Turret1RB : Rigidbody;
var Gun1 : NPCGun;
var Trig : BoxCollider;
var Presence : GameObject;
var AttackSound : GameObject;
var RejectSound : GameObject;

var PissedAtTC0a = 0;

var PissedAtTC1 = 0;
var PissedAtTC4 = 0;
var PissedAtTC5 = 0;
var PissedAtTC6 = 0;
var PissedAtTC7 = 0;
var PissedAtTC8 = 0;
var PissedAtTC9 = 0;

var FoundSmall : boolean;
var FoundMedium : boolean;

var Hunting : boolean;
var Watch : boolean;
var Attacking : boolean;
var Obstacle : boolean = false;
var Stuck : boolean = false;
var StuckTimer = 0;
var Unsticking = 0;
var lastPos : Vector3;

var OnHull : boolean;

var TurnRight : boolean;
var TurnLeft : boolean;

var TurnForce = 0;

var RPClamp : float = 0;
var RPMod : float = 0;

var RightDist : float = 200;
var LeftDist : float = 200;

var RRUP : float = 0;

var AngClamp = 2;

var Wall : boolean;
var RWall : boolean;
var LWall : boolean;

var Pointu : Vector3;
var Pointd : Vector3;

var RPointu : Vector3;
var RPointd : Vector3;

var LPointu : Vector3;
var LPointd : Vector3;

var localV : Vector3;

var VelDir : Vector3;

var Vel : float = 0;

var Dist : float = 0;

var targetDist : float = 0;

var LeadMod2 : float = 0.005;

var targetLayers : LayerMask;

var MtargetLayers : LayerMask;

var DangerSense : boolean;

var Orbit : boolean;

var FarFromTarget : boolean;

var Ignorage = 0;

var shotAssumption = 0;

var canLaunch : boolean;

var StoredMissileBatches = 30;

InvokeRepeating("Regenerator", 1, 1);

InvokeRepeating("Shooty", Random.Range(2, 3), 0.2);

InvokeRepeating("Launchy", 1, 7);

InvokeRepeating("CalcLead", 1, 0.15);

InvokeRepeating("Targety", 10, 15);

function Start () {
if(TerrahyptianNetwork.instance.AnodianBase)
Base = TerrahyptianNetwork.instance.AnodianBase;
}

function Update () {

if(!DangerSense)
thisTransform.rotation = AIAnchor.transform.rotation;

thisTransform.position = AIAnchor.transform.position;

if(Attacking){
if(target == Waypoint){
target = ResetAimpoint;
Attacking = false;
Hunting = true;
FoundSmall = false;
FoundMedium = false;
}
if(target == null){
target = ResetAimpoint;
Attacking = false;
Hunting = true;
FoundSmall = false;
FoundMedium = false;
}
}else{
if(target == null){
target = ResetAimpoint;
Hunting = true;
FoundSmall = false;
FoundMedium = false;
}
}

TurnForce = 0;

if(TurnRight && TurnLeft && Obstacle)
  TurnForce = -34000;
	
localV = thisVTransform.InverseTransformDirection(vRigidbody.velocity);

Vel = vRigidbody.velocity.magnitude;

VelDir = vRigidbody.velocity;

if(target)
var RelativeTarget = thisTransform.InverseTransformPoint(target.position);

if(Base)
var RelativeTargetB = thisTransform.InverseTransformPoint(Base.position);

if(!Stuck){
if(TurnLeft)
TurnForce = -45000;
if(TurnRight)
TurnForce = 45000;

}else{
if(RelativeTarget.x > 0)
TurnForce = -45000;
else
TurnForce = 45000;
}

if(!Orbit){
RPMod = RelativeTarget.x * 500;
RPClamp = Mathf.Clamp(RPMod,-45000,45000);
}else{
if(Attacking){
RPMod = RelativeTarget.z * 500;
RPClamp = Mathf.Clamp(RPMod,-45000,45000);
}else{
RPMod = RelativeTargetB.z * 500;
RPClamp = Mathf.Clamp(RPMod,-45000,45000);
}
}

if(RRUP < 40){
RRUP += 4;
}else{
RRUP = 2;
}

var newRot : Vector3 = (-thisVTransform.up * 2 + thisVTransform.right * -1).normalized;

var VelClamp = Mathf.Clamp(Vel * 8,150,600);
var VelClamp2 = Mathf.Clamp(Vel * 4,75,300);
AngClamp = Mathf.Clamp(Vel * 0.1,4,16);

var DMod1 = 160 - Vel;
var DMod = Mathf.Clamp(DMod1,1,160);

var hit : RaycastHit;

var hit1 : RaycastHit;
var hit2 : RaycastHit;
var hit3 : RaycastHit;

Debug.DrawRay (thisTransform.position + -thisTransform.up * 10, thisTransform.forward * VelClamp, Color.white);
if (Physics.Raycast (thisTransform.position + -thisTransform.up * 10, thisTransform.forward, hit1, VelClamp, targetLayers))
Pointu = hit1.point;
else
Pointu = Vector3(2,2,2);

Debug.DrawRay (thisTransform.position + -thisTransform.up * 11, thisTransform.forward * VelClamp, Color.white);
if (Physics.Raycast (thisTransform.position + -thisTransform.up * 11, thisTransform.forward, hit2, VelClamp, targetLayers))
Pointd = hit2.point;
else
Pointd = Vector3(8,8,8);

if(Vector3.Distance(Pointu, Pointd) < AngClamp){
Wall = true;
}

if(!OnHull && !Watch)
Obstacle = false;

Debug.DrawRay (thisTransform.position + thisTransform.forward * 25 + thisTransform.up * 16, thisTransform.forward * VelClamp, Color.green);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 25 + thisTransform.up * 16, thisTransform.forward, hit, VelClamp, targetLayers))
     Wall = true;

newRot = (-thisVTransform.up * 2 + thisVTransform.right * 1).normalized;
Debug.DrawRay (thisTransform.position + thisTransform.right * 28, newRot * VelClamp2, Color.green);
if (Physics.Raycast (thisTransform.position + thisTransform.right * 28, newRot, hit, VelClamp, targetLayers)){
     if(Wall)
     Obstacle = true;
     else
     TurnLeft = true;
     }

newRot = (-thisVTransform.up * 2 + -thisVTransform.right * 1).normalized;
Debug.DrawRay (thisTransform.position + -thisTransform.right * 28, newRot * VelClamp2, Color.green);
if (Physics.Raycast (thisTransform.position + -thisTransform.right * 28, newRot, hit, VelClamp, targetLayers)){
     if(Wall)
     Obstacle = true;
     else
     TurnRight = true;
     }

Debug.DrawRay (thisTransform.position + thisTransform.right * RRUP + -thisTransform.up * 10, thisTransform.forward * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.right * RRUP + -thisTransform.up * 10, thisTransform.forward, hit1, VelClamp, targetLayers)){
RPointu = hit1.point;
}else{
RPointu = Vector3(2,2,2);
}

Debug.DrawRay (thisTransform.position + thisTransform.right * RRUP + -thisTransform.up * 11, thisTransform.forward * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.right * RRUP + -thisTransform.up * 11, thisTransform.forward, hit2, VelClamp, targetLayers)){
RPointd = hit2.point;
RightDist = hit2.distance;
}else{
RPointd = Vector3(8,8,8);
RightDist = 512;
}

if(Vector3.Distance(RPointu, RPointd) < 2)
RWall = true;

Debug.DrawRay (thisTransform.position + -thisTransform.right * RRUP + -thisTransform.up * 10, thisTransform.forward * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + -thisTransform.right * RRUP + -thisTransform.up * 10, thisTransform.forward, hit1, VelClamp, targetLayers)){
LPointu = hit1.point;
}else{
LPointu = Vector3(2,2,2);
}

Debug.DrawRay (thisTransform.position + -thisTransform.right * RRUP + -thisTransform.up * 11, thisTransform.forward * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + -thisTransform.right * RRUP + -thisTransform.up * 11, thisTransform.forward, hit2, VelClamp, targetLayers)){
LPointd = hit2.point;
LeftDist = hit2.distance;
}else{
LPointd = Vector3(8,8,8);
LeftDist = 512;
}

if(Vector3.Distance(LPointu, LPointd) < 2)
LWall = true;

Debug.DrawRay (thisTransform.position + thisTransform.up * 70 + thisTransform.forward * VelClamp, -thisTransform.up * DMod, Color.white);
if (!Physics.Raycast (thisTransform.position + thisTransform.up * 70 + thisTransform.forward * VelClamp, -thisTransform.up, DMod))
     Obstacle = true;

//---------------------------------------------------------------------------------------------
             Debug.DrawRay (thisTransform.position + thisTransform.up * 80 
                                  + thisTransform.right * 40
                                  + thisTransform.forward * VelClamp, thisTransform.up * -160, Color.white);
if (!Physics.Raycast (thisTransform.position + thisTransform.up * 80
                                        + thisTransform.right * 40 
                                        + thisTransform.forward * VelClamp, -thisTransform.up, 160))
     TurnLeft = true;

             Debug.DrawRay (thisTransform.position + thisTransform.up * 80
                                  + -thisTransform.right * 40
                                  + thisTransform.forward * VelClamp, thisTransform.up * -160, Color.white);
if (!Physics.Raycast (thisTransform.position + thisTransform.up * 80
                                        + -thisTransform.right * 40 
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
     
if(LeftDist < 80 && LWall)
Obstacle = true;

if(RightDist < 80 && RWall)
Obstacle = true;

}


function FixedUpdate () {

if(Stuck || TurnLeft || TurnRight){
vRigidbody.AddTorque(thisVTransform.forward * TurnForce);
}else{
vRigidbody.AddTorque(thisVTransform.forward * RPClamp);
}

if(Obstacle)
if(-localV.y > 0)
  vRigidbody.AddForce(-thisVTransform.up * -3000);

if(Stuck)
if(localV.y < 8)
  vRigidbody.AddForce(thisVTransform.up * 3000);
  
if(!Obstacle && !Stuck && !TurnLeft && !TurnRight) {
if(-localV.y < 60){
if(FarFromTarget)
  vRigidbody.AddForce(-thisVTransform.up * 6000);
  else
  vRigidbody.AddForce(-thisVTransform.up * 3000);
  }
}
 
if(target){
Turret1RB.AddTorque(-Turret1TF.right * Dist * 0.025);
if(Turret1RB.angularVelocity.magnitude < 0.7){
Turret1RB.AddForceAtPosition((TargetLead.position - Turret1TF.position).normalized * 100, -Turret1TF.up * 8);
Turret1RB.AddForceAtPosition((TargetLead.position - Turret1TF.position).normalized * -100, Turret1TF.up * 8);
}
}

}

function OnTriggerEnter (other : Collider) {

var hitT : RaycastHit;

ON = other.name;
OT = other.transform;

if(ON.Contains ("TFC"))
if(!ON.Contains ("TFC3")){

var RTT = OT.InverseTransformPoint(thisVTransform.position);

RTPx = Mathf.Abs(RTT.x);
RTPy = Mathf.Abs(RTT.y);

RTP = RTPx + RTPy;

if(Vector3.Distance(thisTransform.position, OT.position) < 100){

if(ON.Contains ("TFC0a"))
PissedAtTC0a += 1;
if(ON.Contains ("TFC1"))
PissedAtTC1 += 1;
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
if(ON.Contains ("TFC9"))
PissedAtTC9 += 1;

}else{

Debug.DrawRay (OT.position + OT.forward * 8, OT.forward * 256, Color.red);
if (Physics.Raycast (OT.position, OT.forward * 8, hitT, 256, targetLayers))
if(!hitT.collider.name.Contains ("TC3"))
if(shotAssumption < 3)
shotAssumption += 2;

if(shotAssumption > 0)
return;

if(RTP < 100){
if(RTT.z > 0){
if(ON.Contains ("TFC0a"))
PissedAtTC0a += 1;
if(ON.Contains ("TFC1"))
PissedAtTC1 += 1;
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
if(ON.Contains ("TFC9"))
PissedAtTC9 += 1;
}
}

}

if(other.rigidbody){
Waypoint.position = OT.position;
DangerSense = true;
thisTransform.LookAt(Waypoint);
}

}

}

function OnTriggerStay (other : Collider) {

ON = other.name;
OT = other.transform;

if(!ON.Contains ("TC3")){

if(Vector3.Distance(thisTransform.position, OT.position) < 150)
if(ON.Contains ("TC"))
  Stranger = OT;
  
if(ON.Contains ("xb")){
if(ON.Contains ("C1")){TerrahyptianNetwork.AnExtraBigTC1 = OT;}
if(ON.Contains ("C4")){TerrahyptianNetwork.AnExtraBigTC4 = OT;}
if(ON.Contains ("C5")){TerrahyptianNetwork.AnExtraBigTC5 = OT;}
if(ON.Contains ("C6")){TerrahyptianNetwork.AnExtraBigTC6 = OT;}
if(ON.Contains ("C7")){TerrahyptianNetwork.AnExtraBigTC7 = OT;}
if(ON.Contains ("C8")){TerrahyptianNetwork.AnExtraBigTC8 = OT;}
if(ON.Contains ("C9")){TerrahyptianNetwork.AnExtraBigTC9 = OT;}
}
  
if(PissedAtTC0a > 1)
 if(ON.Contains ("TC0a")){
 
 if(ON.Contains ("sT") && !FoundSmall ||
    ON.Contains ("mT") && !FoundMedium ||
    ON.Contains ("bT")){
 
  Hunting = false;
  target = OT;
  
  if(!Attacking)
  AttackNoise();
  
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
  
  if(!Attacking)
  AttackNoise();
  
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
  
  if(!Attacking)
  AttackNoise();
  
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
  
  if(!Attacking)
  AttackNoise();
  
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
  
  if(!Attacking)
  AttackNoise();
  
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
  
  if(!Attacking)
  AttackNoise();
  
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
  
  if(!Attacking)
  AttackNoise();
  
  Attacking = true;
}
}

if(PissedAtTC9 > 1)
 if(ON.Contains ("TC9")){
 
 if(ON.Contains ("sT") && !FoundSmall ||
    ON.Contains ("mT") && !FoundMedium ||
    ON.Contains ("bT")){
 
  Hunting = false;
  target = OT;
  
  if(!Attacking)
  AttackNoise();
  
  Attacking = true;
}
}

}
}

function AttackNoise () {
var TheThing = Instantiate(AttackSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing.transform.parent = thisTransform;
}

function Shooty () {
if(Attacking && Gun1){
Gun1.Fire();
Gun1.gunTarget = target;
}
}

function Launchy () {
if(Attacking && target){

var hit8 : RaycastHit;

targetDist = Vector3.Distance(transform.position, target.position);
targetDist -= 32;

topPoint.LookAt(target);

if (Physics.Raycast (topPoint.position, topPoint.forward, hit8, 2048, targetLayers))
if(hit8.collider.name.Contains ("DV") || hit8.collider.name.Contains ("TC") || hit8.collider.name.Contains ("TL"))
LaunchSM();

}
}

function LaunchSM () {

if(target != null)
if(Attacking && StoredMissileBatches > 0 && canLaunch)
if(Vector3.Distance(thisTransform.position, target.position) < 1000 && Vector3.Distance(thisTransform.position, target.position) > 100){

var Measure = thisVTransform.InverseTransformPoint(target.position);
if(Measure.y < 0 && -localV.y > 17 && Vector3.Distance(thisTransform.position, target.position) < 300)
return;

StoredMissileBatches -= 1;

var _SpawnedObject1 = Instantiate(MissileAmmo, Missile1.position, Missile1.rotation);
    _SpawnedObject1.rigidbody.velocity = vRigidbody.velocity * 1;
    _SpawnedObject1.transform.GetComponent(MissileScript).target = target;

yield WaitForSeconds (0.3);

var _SpawnedObject2 = Instantiate(MissileAmmo, Missile2.position, Missile2.rotation);
    _SpawnedObject2.rigidbody.velocity = vRigidbody.velocity * 1;
    _SpawnedObject2.transform.GetComponent(MissileScript).target = target;

yield WaitForSeconds (0.3);
var _SpawnedObject3 = Instantiate(MissileAmmo, Missile3.position, Missile3.rotation);
    _SpawnedObject3.rigidbody.velocity = vRigidbody.velocity * 1;
    _SpawnedObject3.transform.GetComponent(MissileScript).target = target;

yield WaitForSeconds (0.3);

var _SpawnedObject4 = Instantiate(MissileAmmo, Missile4.position, Missile4.rotation);
    _SpawnedObject4.rigidbody.velocity = vRigidbody.velocity * 1;
    _SpawnedObject4.transform.GetComponent(MissileScript).target = target;

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

Dist = Dist1;

TargetTrace.LookAt(target);

TargetLead.position = TargetTrace.position;
TargetLead.rotation = TargetTrace.rotation;
TargetLead.position += TargetLead.forward * Dist1 * Dist2 * 0.02;

if (VelDir != Vector3.zero)
TargetLead.rotation = Quaternion.LookRotation(VelDir);
TargetLead.position -= TargetLead.forward * Vel * LeadMod2;

if(Attacking)
TLCol.radius = Vector3.Distance(thisTransform.position, target.position) * 0.05;
else
TLCol.radius = 0.1;

}
}

function Targety () {
if(!Attacking){
TargetArea();
}
}

function TargetArea () {
Waypoint.transform.position = TerrahyptianNetwork.instance.PriorityWaypoint.position;
target = Waypoint;
yield WaitForSeconds (5);
if(!Attacking)
target = ResetAimpoint;
}

function Regenerator () {

if(target){

if(TerrahyptianNetwork.TC1CriminalLevel > 10){
PissedAtTC1 = TerrahyptianNetwork.TC1CriminalLevel;
if(target.name.Contains ("TC1")){
Attacking = true;
Hunting = false;
}
}
if(TerrahyptianNetwork.TC4CriminalLevel > 10){
PissedAtTC4 = TerrahyptianNetwork.TC4CriminalLevel;
if(target.name.Contains ("TC4")){
Attacking = true;
Hunting = false;
}
}
if(TerrahyptianNetwork.TC5CriminalLevel > 10){
PissedAtTC5 = TerrahyptianNetwork.TC5CriminalLevel;
if(target.name.Contains ("TC5")){
Attacking = true;
Hunting = false;
}
}
if(TerrahyptianNetwork.TC6CriminalLevel > 10){
PissedAtTC6 = TerrahyptianNetwork.TC6CriminalLevel;
if(target.name.Contains ("TC6")){
Attacking = true;
Hunting = false;
}
}
if(TerrahyptianNetwork.TC7CriminalLevel > 10){
PissedAtTC7 = TerrahyptianNetwork.TC7CriminalLevel;
if(target.name.Contains ("TC7")){
Attacking = true;
Hunting = false;
}
}

if(TerrahyptianNetwork.TC8CriminalLevel > 10){
PissedAtTC8 = TerrahyptianNetwork.TC8CriminalLevel;
if(target.name.Contains ("TC8")){
Attacking = true;
Hunting = false;
}
}

if(TerrahyptianNetwork.TC9CriminalLevel > 10){
PissedAtTC9 = TerrahyptianNetwork.TC9CriminalLevel;
if(target.name.Contains ("TC9")){
Attacking = true;
Hunting = false;
}
}

if(PissedAtTC1 > 0)
PissedAtTC1 -= 1;
  
if(PissedAtTC4 > 0)
PissedAtTC4 -= 1;
  
if(PissedAtTC5 > 0)
PissedAtTC5 -= 1;
  
if(PissedAtTC6 > 0)
PissedAtTC6 -= 1;
  
if(PissedAtTC7 > 0)
PissedAtTC7 -= 1;

if(PissedAtTC8 > 0)
PissedAtTC8 -= 1;

if(PissedAtTC9 > 0)
PissedAtTC9 -= 1;

var lastTPos : Vector3 = target.position;

if(target.name.Contains ("broken")){
Attacking = false;
Watch = true;
FoundSmall = false;
FoundMedium = false;
}else{
Watch = false;
}

if(!Physics.Linecast (topPoint.position, target.position, MtargetLayers)){
StuckTimer = 0;
Stuck = false;
canLaunch = true;
}else{
canLaunch = false;
}

if(target.name.Contains ("sT"))
FoundSmall = true;

if(target.name.Contains ("mT"))
FoundMedium = true;

if(target.name.Contains ("bT")){
TerrahyptianNetwork.instance.EnemyTarget2 = target;
FoundSmall = true;
FoundMedium = true;
Gun1.TargetRange = 3000;
}else{
Gun1.TargetRange = 1500;
}

if(Vector3.Distance(thisTransform.position, target.position) > 750){
FarFromTarget = true;
}else{
if(!target.name.Contains ("bT"))
FarFromTarget = false;
}

Orbit = false;

if(!Attacking){

if(TerrahyptianNetwork.instance.EnemyTarget2)
target = TerrahyptianNetwork.instance.EnemyTarget2;

if(Base){
if(Vector3.Distance(thisTransform.position, Base.position) > 1500){
target = Base;
}else{
if(target == Base)
target = ResetAimpoint;
Orbit = true;
}
}

}else{
TerrahyptianNetwork.instance.EnemyTarget1 = target;

if(Vector3.Distance(thisTransform.position, target.position) < 500)
Orbit = true;

}

}

if(Attacking){
Trig.center = Vector3(0,0,150);
Trig.size = Vector3(300,300,600);
}else{
Trig.center = Vector3(0,0,1350);
Trig.size = Vector3(400,300,3000);
}

if(Ignorage > 4){
Ignorage = 0;
target = null;
}

if(OnHull){
OnHull = false;
Obstacle = true;
}

if(shotAssumption > 0)
shotAssumption -= 1;

DangerSense = false;

Wall = false;
RWall = false;
LWall = false;

if(!Obstacle){
TurnRight = false;
TurnLeft = false;
}

if(Watch){
Obstacle = true;
TurnRight = false;
TurnLeft = false;
}

Notice2(lastTPos);

////////////////////////////////////////////////////////////////////////////
//////////////////////////////[STUCKAROONIES]///////////////////////////////
////////////////////////////////////////////////////////////////////////////


if(!Stuck){
StuckTimer += 1;
if(TurnLeft && TurnRight)
StuckTimer += 2;
}else{
Unsticking += 1;
if(!Wall && Unsticking > 12)
Unsticking -= 1;

Debug.DrawRay (thisTransform.position + -thisTransform.up * 10, -thisTransform.forward * 64, Color.white);
if (Physics.Raycast (thisTransform.position + -thisTransform.up * 10, -thisTransform.forward, 64, targetLayers))
Unsticking = 16;
}

if(Unsticking > 15){
Stuck = false;
TurnRight = false;
TurnLeft = false;
Unsticking = 0;
}

if(StuckTimer > 15){
Stuck = false;
TurnRight = false;
TurnLeft = false;

if(Vector3.Distance(thisTransform.position, lastPos) < 100)
Stuck = true;

lastPos = thisTransform.position;
StuckTimer = 0;
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