var target : Transform;
var Waypoint : Transform;

var guardPost1 : Transform;
var guardPost2 : Transform;

var Base : Transform;

var Stranger : Transform;

var TargetTrace : Transform;
var TargetLead : Transform;
var TLCol : BoxCollider;

var thisTransform : Transform;
var thisVTransform : Transform;

var vRigidbody : Rigidbody;

var ResetAimpoint : Transform;

var topPoint : Transform;
var viewPoint : Transform;

var AIAnchor : Transform;

var Turret1TF : Transform;
var Turret1RB : Rigidbody;
var Gun1 : NPCGun;
var Gun1Sec : NPCGun;
var Trig : SphereCollider;
var Hover1 : AdvancedHoverScript;
var Hover2 : AdvancedHoverScript;
var Hover3 : AdvancedHoverScript;
var Hover4 : AdvancedHoverScript;
var Presence : GameObject;
var AttackSound : GameObject;
var RejectSound : GameObject;

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

var Hunting : boolean;
var onPost : boolean;
var Watch : boolean;
var Attacking : boolean;
var Obstacle : boolean = false;
var Stuck : boolean = false;
var StuckTimer = 0;
var Unsticking = 0;
var lastPos : Vector3;

var inView : boolean;

var TurnRight : boolean;
var TurnLeft : boolean;

var TFClamp = 0;

var TurnForce = 0;

var TurretForce : float = 0;

var RPClamp : float = 0;
var RPMod : float = 0;

var RightDist : float = 200;
var LeftDist : float = 200;

var RRUP : float = 0;

var Wall : boolean;

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

var RelativeTarget : Vector3;

var LeadMod2 : float = 0.005;

var targetLayers : LayerMask;

var TtargetLayers : LayerMask;

var MtargetLayers : LayerMask;

var CanDangerSense : boolean;
var DangerSense : boolean;

var FarFromTarget : boolean;

var Ignorage = 0;

var shotAssumption = 0;

InvokeRepeating("Regenerator", 1, 1);

InvokeRepeating("Shooty", Random.Range(2, 3), 0.05);

InvokeRepeating("CalcLead", 1, 0.15);

function Start () {
if(DutvutanianNetwork.instance.DutvutanianBase)
Base = DutvutanianNetwork.instance.DutvutanianBase;

if(DutvutanianNetwork.instance.DutvutanianGuardPost1){
guardPost1 = DutvutanianNetwork.instance.DutvutanianGuardPost1;
if(Vector3.Distance(thisTransform.position, guardPost1.position) < 32)
onPost = true;
}
if(DutvutanianNetwork.instance.DutvutanianGuardPost2){
guardPost2 = DutvutanianNetwork.instance.DutvutanianGuardPost2;
if(Vector3.Distance(thisTransform.position, guardPost2.position) < 32)
onPost = true;
}

if(onPost){
Hover1.breaksOn = true;
Hover2.breaksOn = true;
Hover3.breaksOn = true;
Hover4.breaksOn = true;
}

Dist = 4;

TurnForce = 600;

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
FoundBig = false;
}
if(target == null){
target = ResetAimpoint;
Attacking = false;
Hunting = true;
FoundSmall = false;
FoundMedium = false;
FoundBig = false;
}
}else{
if(target == null){
target = ResetAimpoint;
Hunting = true;
FoundSmall = false;
FoundMedium = false;
FoundBig = false;
}
}

TurnForce = 0;

TurnLeft = false;
TurnRight = false;
	
localV = thisVTransform.InverseTransformDirection(vRigidbody.velocity);

Vel = vRigidbody.velocity.magnitude;

VelDir = vRigidbody.velocity;

if(target)
RelativeTarget = thisVTransform.InverseTransformPoint(target.position);

if(Base)
var RelativeTargetB = thisVTransform.InverseTransformPoint(Base.position);

RPMod = RelativeTarget.x * 4;
RPClamp = Mathf.Clamp(RPMod,-100,100);

if(RRUP < 8){
RRUP += 1.5;
}else{
RRUP = 1;
}

var newRot : Vector3 = (-thisVTransform.up * 2 + thisVTransform.right * -1).normalized;

var VelClamp = Mathf.Clamp(Vel * 2,8,200);

var hit : RaycastHit;

var hit1 : RaycastHit;
var hit2 : RaycastHit;
var hit3 : RaycastHit;

Debug.DrawRay (thisTransform.position + thisTransform.forward * 4 + -thisTransform.up * 1, thisTransform.forward * VelClamp, Color.white);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 4 + -thisTransform.up * 1, thisTransform.forward, hit1, VelClamp, targetLayers))
Pointu = hit1.point;
else
Pointu = Vector3(2,2,2);

Debug.DrawRay (thisTransform.position + thisTransform.forward * 4 + -thisTransform.up * 1.7, thisTransform.forward * VelClamp, Color.white);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 4 + -thisTransform.up * 1.7, thisTransform.forward, hit2, VelClamp, targetLayers))
Pointd = hit2.point;
else
Pointd = Vector3(8,8,8);

if(Vector3.Distance(Pointu, Pointd) < 2){
Wall = true;
}

Debug.DrawRay (thisTransform.position + thisTransform.forward * 4 + thisTransform.up * 8, thisTransform.forward * VelClamp, Color.green);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 4 + thisTransform.up * 8, thisTransform.forward, VelClamp, targetLayers))
     Obstacle = true;

Debug.DrawRay (thisTransform.position + thisTransform.forward * 4 + thisTransform.right * RRUP + -thisTransform.up * 1, thisTransform.forward * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 4 + thisTransform.right * RRUP + -thisTransform.up * 1, thisTransform.forward, hit1, VelClamp, targetLayers)){
RPointu = hit1.point;
}else{
RPointu = Vector3(2,2,2);
}

Debug.DrawRay (thisTransform.position + thisTransform.forward * 4 + thisTransform.right * RRUP + -thisTransform.up * 1.7, thisTransform.forward * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 4 + thisTransform.right * RRUP + -thisTransform.up * 1.7, thisTransform.forward, hit2, VelClamp, targetLayers)){
RPointd = hit2.point;
RightDist = hit2.distance;
}else{
RPointd = Vector3(8,8,8);
RightDist = 512;
}

Debug.DrawRay (thisTransform.position + thisTransform.forward * 4 + -thisTransform.right * RRUP + -thisTransform.up * 1, thisTransform.forward * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 4 + -thisTransform.right * RRUP + -thisTransform.up * 1, thisTransform.forward, hit1, VelClamp, targetLayers)){
LPointu = hit1.point;
}else{
LPointu = Vector3(2,2,2);
}

Debug.DrawRay (thisTransform.position + thisTransform.forward * 4 + -thisTransform.right * RRUP + -thisTransform.up * 1.7, thisTransform.forward * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 4 + -thisTransform.right * RRUP + -thisTransform.up * 1.7, thisTransform.forward, hit2, VelClamp, targetLayers)){
LPointd = hit2.point;
LeftDist = hit2.distance;
}else{
LPointd = Vector3(8,8,8);
LeftDist = 512;
}

Debug.DrawRay (thisTransform.position + -Vector3.down * 10 + thisTransform.forward * VelClamp, Vector3.down * 30, Color.white);
if (!Physics.Raycast (thisTransform.position + -Vector3.down * 10 + thisTransform.forward * VelClamp, Vector3.down, 30))
     Obstacle = true;

//---------------------------------------------------------------------------------------------
             Debug.DrawRay (thisTransform.position + -Vector3.down * 10 
                                  + thisTransform.right * 10
                                  + thisTransform.forward * VelClamp, Vector3.down * 30, Color.white);
if (!Physics.Raycast (thisTransform.position + -Vector3.down * 10
                                        + thisTransform.right * 10 
                                        + thisTransform.forward * VelClamp, Vector3.down, 30))
     TurnLeft = true;

             Debug.DrawRay (thisTransform.position + -Vector3.down * 10
                                  + -thisTransform.right * 10
                                  + thisTransform.forward * VelClamp, Vector3.down * 30, Color.white);
if (!Physics.Raycast (thisTransform.position + -Vector3.down * 10
                                        + -thisTransform.right * 10 
                                        + thisTransform.forward * VelClamp, Vector3.down, 30))
     TurnRight = true;
//---------------------------------------------------------------------------------------------


if(RightDist > LeftDist){
if(Vector3.Distance(LPointu, LPointd) < 2){
     TurnRight = true;
     }
     }
     
 if(LeftDist > RightDist){
 if(Vector3.Distance(RPointu, RPointd) < 2){
     TurnLeft = true;
     }
     }

}


function FixedUpdate () {

if(TurretForce < 15)
TurretForce += 0.1;

TFClamp = Mathf.Clamp(Vel * 7,200,600);

if(!Stuck){

Debug.DrawRay (thisTransform.position + thisTransform.forward * 10 + -thisTransform.up * 1.5, thisTransform.right * 8, Color.green);
Debug.DrawRay (thisTransform.position + thisTransform.forward * 10 + -thisTransform.up * 1.5, -thisTransform.right * 8, Color.green);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 10 + -thisTransform.up * 1.5, thisTransform.right, 8, targetLayers)){
vRigidbody.AddTorque(thisVTransform.forward * -100);
Obstacle = true;
}
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 10 + -thisTransform.up * 1.5, -thisTransform.right, 8, targetLayers)){
vRigidbody.AddTorque(thisVTransform.forward * 100);
Obstacle = true;
}

if(TurnLeft)
TurnForce = -TFClamp;
if(TurnRight)
TurnForce = TFClamp;

}else{
if(RelativeTarget.x > 0)
TurnForce = -TFClamp;
else
TurnForce = TFClamp;
}
     
if(TurnRight && TurnLeft){
TurnForce = -TFClamp * 0.5;
Obstacle = true;
}

if(Stuck || TurnLeft || TurnRight){
vRigidbody.AddTorque(thisVTransform.forward * TurnForce);
}else{
if(Dist > 1000){
vRigidbody.AddTorque(thisVTransform.forward * RPClamp);
}else{
if(inView)
vRigidbody.AddTorque(thisVTransform.forward * RPClamp);
}
}

if(Obstacle){
if(-localV.y > 0)
  vRigidbody.AddForce(thisVTransform.up * 100);
}else{
if(inView){
if(-localV.y > 0)
  vRigidbody.AddForce(thisVTransform.up * 50);
}else{
if(!onPost){
if(Stuck)
if(localV.y < 8)
  vRigidbody.AddForce(thisVTransform.up * 50);
  
if(!Stuck && !TurnLeft && !TurnRight)
if(-localV.y < 150)
  vRigidbody.AddForce(-thisVTransform.up * 50);
}
}
}
 
if(target){
if(Turret1RB.angularVelocity.magnitude < 2){
if(target == ResetAimpoint){
Turret1RB.AddForceAtPosition((ResetAimpoint.position - Turret1TF.position).normalized * TurretForce, -Turret1TF.up * 8);
Turret1RB.AddForceAtPosition((ResetAimpoint.position - Turret1TF.position).normalized * -TurretForce, Turret1TF.up * 8);
}else{
Turret1RB.AddForceAtPosition((TargetLead.position - Turret1TF.position).normalized * TurretForce, -Turret1TF.up * 8);
Turret1RB.AddForceAtPosition((TargetLead.position - Turret1TF.position).normalized * -TurretForce, Turret1TF.up * 8);
}

}
}

}

function OnTriggerEnter (other : Collider) {

var hitT : RaycastHit;

ON = other.name;
OT = other.transform;

if(ON.Contains ("TFC"))
if(!ON.Contains ("TFC9")){

var RTT = OT.InverseTransformPoint(thisVTransform.position);

RTPx = Mathf.Abs(RTT.x);
RTPy = Mathf.Abs(RTT.y);

RTP = RTPx + RTPy;

VicinityPoint.position = OT.position;

if(Vector3.Distance(thisTransform.position, OT.position) < 100){

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

}else{

Debug.DrawRay (OT.position + OT.forward * 8, OT.forward * 256, Color.red);
if (Physics.Raycast (OT.position, OT.forward * 8, hitT, 256, TtargetLayers))
if(!hitT.collider.name.Contains ("TC9"))
if(shotAssumption < 3)
shotAssumption += 2;

if(shotAssumption < 0){

if(RTP < 100){
if(RTT.z > 0){
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
}

}

if(CanDangerSense)
if(other.rigidbody){
Waypoint.position = OT.position;
DangerSense = true;
CanDangerSense = false;
DSReset();
thisTransform.LookAt(Waypoint);
}

}

}

function AttackNoise () {
var TheThing = Instantiate(AttackSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing.transform.parent = thisTransform;
}

function Shooty () {
if(Attacking)
if(target){
if(Dist > 330){
if(Vel < 20){
Gun1.Fire();
Gun1.gunTarget = target;
}
}else{
Gun1Sec.Fire();
Gun1Sec.gunTarget = target;
}
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
var Dist3 = Mathf.Clamp(Vector3.Distance(TargetLead.position, TargetTrace.position),0.1,512);

Dist = Mathf.Clamp(Dist1,4,2048);

TargetTrace.LookAt(target);

TargetLead.position = TargetTrace.position;
TargetLead.rotation = TargetTrace.rotation;

if(Dist < 330)
TargetLead.position += TargetLead.forward * Dist1 * Dist2 * 0.02;
else
TargetLead.position += TargetLead.forward * Dist1 * Dist2 * 0.004;

if (VelDir != Vector3.zero)
TargetLead.rotation = Quaternion.LookRotation(VelDir);
TargetLead.position -= TargetLead.forward * Vel * LeadMod2;

TargetLead.LookAt(target);

if(Attacking){
TLCol.center = Vector3(0,0,Dist3 * 0.3);
TLCol.size = Vector3(8,8,Dist3);
}else{
TLCol.center = Vector3(0,0,0);
TLCol.size = Vector3(0.1,0.1,0.1);
}

}
}

function Regenerator () {

var hitV : RaycastHit;

inView = false;

if(target){

targetDist = Dist;

if(!Attacking){
if(DutvutanianNetwork.TC1CriminalLevel > 150){
PissedAtTC1 = DutvutanianNetwork.TC1CriminalLevel;
if(DutvutanianNetwork.instance.EnemyTargetMin)
if(DutvutanianNetwork.instance.EnemyTargetMin.name.Contains ("TC1"))
if(Vector3.Distance(DutvutanianNetwork.instance.EnemyTargetMin.position, thisTransform.position) < 1500){
target = DutvutanianNetwork.instance.EnemyTargetMin;
Attacking = true;
Hunting = false;
}
}
if(DutvutanianNetwork.TC2CriminalLevel > 150){
PissedAtTC2 = DutvutanianNetwork.TC2CriminalLevel;
if(DutvutanianNetwork.instance.EnemyTargetMin)
if(DutvutanianNetwork.instance.EnemyTargetMin.name.Contains ("TC2"))
if(Vector3.Distance(DutvutanianNetwork.instance.EnemyTargetMin.position, thisTransform.position) < 1500){
target = DutvutanianNetwork.instance.EnemyTargetMin;
Attacking = true;
Hunting = false;
}
}
if(DutvutanianNetwork.TC3CriminalLevel > 150){
PissedAtTC3 = DutvutanianNetwork.TC3CriminalLevel;
if(DutvutanianNetwork.instance.EnemyTargetMin)
if(DutvutanianNetwork.instance.EnemyTargetMin.name.Contains ("TC3"))
if(Vector3.Distance(DutvutanianNetwork.instance.EnemyTargetMin.position, thisTransform.position) < 1500){
target = DutvutanianNetwork.instance.EnemyTargetMin;
Attacking = true;
Hunting = false;
}
}
if(DutvutanianNetwork.TC4CriminalLevel > 150){
PissedAtTC4 = DutvutanianNetwork.TC4CriminalLevel;
if(DutvutanianNetwork.instance.EnemyTargetMin)
if(DutvutanianNetwork.instance.EnemyTargetMin.name.Contains ("TC4"))
if(Vector3.Distance(DutvutanianNetwork.instance.EnemyTargetMin.position, thisTransform.position) < 1500){
target = DutvutanianNetwork.instance.EnemyTargetMin;
Attacking = true;
Hunting = false;
}
}
if(DutvutanianNetwork.TC5CriminalLevel > 150){
PissedAtTC5 = DutvutanianNetwork.TC5CriminalLevel;
if(DutvutanianNetwork.instance.EnemyTargetMin)
if(DutvutanianNetwork.instance.EnemyTargetMin.name.Contains ("TC5"))
if(Vector3.Distance(DutvutanianNetwork.instance.EnemyTargetMin.position, thisTransform.position) < 1500){
target = DutvutanianNetwork.instance.EnemyTargetMin;
Attacking = true;
Hunting = false;
}
}
if(DutvutanianNetwork.TC6CriminalLevel > 150){
PissedAtTC6 = DutvutanianNetwork.TC6CriminalLevel;
if(DutvutanianNetwork.instance.EnemyTargetMin)
if(DutvutanianNetwork.instance.EnemyTargetMin.name.Contains ("TC6"))
if(Vector3.Distance(DutvutanianNetwork.instance.EnemyTargetMin.position, thisTransform.position) < 1500){
target = DutvutanianNetwork.instance.EnemyTargetMin;
Attacking = true;
Hunting = false;
}
}
if(DutvutanianNetwork.TC7CriminalLevel > 150){
PissedAtTC7 = DutvutanianNetwork.TC7CriminalLevel;
if(DutvutanianNetwork.instance.EnemyTargetMin)
if(DutvutanianNetwork.instance.EnemyTargetMin.name.Contains ("TC7"))
if(Vector3.Distance(DutvutanianNetwork.instance.EnemyTargetMin.position, thisTransform.position) < 1500){
target = DutvutanianNetwork.instance.EnemyTargetMin;
Attacking = true;
Hunting = false;
}
}
if(DutvutanianNetwork.TC8CriminalLevel > 150){
PissedAtTC8 = DutvutanianNetwork.TC8CriminalLevel;
if(DutvutanianNetwork.instance.EnemyTargetMin)
if(DutvutanianNetwork.instance.EnemyTargetMin.name.Contains ("TC8"))
if(Vector3.Distance(DutvutanianNetwork.instance.EnemyTargetMin.position, thisTransform.position) < 1500){
target = DutvutanianNetwork.instance.EnemyTargetMin;
Attacking = true;
Hunting = false;
}
}

if(DutvutanianNetwork.AlertTime > 0)
if(Vector3.Distance(DutvutanianNetwork.instance.PriorityWaypoint.position, thisTransform.position) > 500)
target = DutvutanianNetwork.instance.PriorityWaypoint;

}else{
if(target.name.Contains ("TC")){
DutvutanianNetwork.instance.EnemyTargetMin = target;
DutvutanianNetwork.instance.PriorityWaypoint.position = target.position;
}
}

if(PissedAtTC1 > 0)
PissedAtTC1 -= 1;

if(PissedAtTC2 > 0)
PissedAtTC2 -= 1;

if(PissedAtTC3 > 0)
PissedAtTC3 -= 1;
  
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

var lastTPos : Vector3 = target.position;

if(target.name.Contains ("rok")){
Attacking = false;
Watch = true;
FoundSmall = false;
FoundMedium = false;
}else{
Watch = false;
}

if(!Watch)
Obstacle = false;

viewPoint.LookAt(target);

      Debug.DrawRay (viewPoint.position, viewPoint.forward * Dist, Color.red);
if (Physics.Raycast (viewPoint.position, viewPoint.forward, hitV, Dist, TtargetLayers)){
if(hitV.collider.name.Contains ("TL9") || hitV.collider.name.Contains ("TC")){
if (!Physics.Raycast (viewPoint.position, viewPoint.forward, Dist, MtargetLayers)){
if(Dist < 1000)
inView = true;
}
}
}

if(target.name.Contains ("sT")){
FoundSmall = true;
if(Dist < 64)
inView = false;
}

if(target.name.Contains ("mT")){
FoundMedium = true;
if(Dist < 128)
inView = false;
}

if(target.name.Contains ("bT")){
FoundBig = true;
DutvutanianNetwork.instance.EnemyTargetMed = target;
if(Dist < 128)
inView = false;
}

if(target.name.Contains ("xbT")){
if(Dist < 330)
inView = false;
}

if(!inView){
FoundSmall = false;
FoundMedium = false;
FoundBig = false;
}else{
StuckTimer = 0;
Stuck = false;
}

}

if(!Attacking){

if(onPost){
Hover1.breaksOn = true;
Hover2.breaksOn = true;
Hover3.breaksOn = true;
Hover4.breaksOn = true;
}

}

if(Ignorage > 4){
Ignorage = 0;
target = null;
}

if(shotAssumption > 0)
shotAssumption -= 1;

Wall = false;

if(!Obstacle){
TurnRight = false;
TurnLeft = false;
}

if(Watch || onPost){
Obstacle = true;
TurnRight = false;
TurnLeft = false;
}

Notice2(lastTPos);

////////////////////////////////////////////////////////////////////////////
////////////////////////////[VICINITY_CHECKER]//////////////////////////////
////////////////////////////////////////////////////////////////////////////

VicinityCheck();

////////////////////////////////////////////////////////////////////////////
//////////////////////////////[STUCKAROONIES]///////////////////////////////
////////////////////////////////////////////////////////////////////////////

if(!onPost || inView){
if(!Stuck){
StuckTimer += 1;
if(TurnLeft && TurnRight)
StuckTimer += 2;

}else{
Unsticking += 1;
if(!Wall && Unsticking > 6)
Unsticking -= 1;

Debug.DrawRay (thisTransform.position + -thisTransform.up * 10, -thisTransform.forward * 64, Color.white);
if (Physics.Raycast (thisTransform.position + -thisTransform.up * 10, -thisTransform.forward, 64, targetLayers))
Unsticking = 16;

}

if(Unsticking > 3){
Stuck = false;
TurnRight = false;
TurnLeft = false;
Unsticking = 0;
}

if(StuckTimer > 3){
Stuck = false;
TurnRight = false;
TurnLeft = false;

if(Vector3.Distance(thisTransform.position, lastPos) < 4)
Stuck = true;

lastPos = thisTransform.position;
StuckTimer = 0;
}

}

}



















function VicinityCheck () {

var gos : GameObject[];
gos = GameObject.FindGameObjectsWithTag("TC");

//var Blip = Resources.Load("Prefabs/RadarBlip", GameObject) as GameObject;
 
for (var go : GameObject in gos) {

var ON = go.name;
var OT = go.transform;

if(!ON.Contains ("9")){

if(!Attacking){
if(ON.Contains ("bT")){
VPRadius = 750;
VicinityPoint.localPosition.z = VPRadius / 2;
}else{
if(ON.Contains ("sT")){
VPRadius = 188;
VicinityPoint.localPosition.z = VPRadius / 2;
}else{
VPRadius = 375;
VicinityPoint.localPosition.z = VPRadius / 2;
}
}
}else{
if(target)
if(Vector3.Distance(VicinityPoint.position, OT.position) < Dist / 2){
FoundBig = false;
FoundMedium = false;
FoundSmall = false;
VicinityPoint.localPosition = Vector3(0, 0, VPRadius / 2);
}
}


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
  TurretForce = 0;
  
  VPRadius = 32;
  
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
  TurretForce = 0;
  
  VPRadius = 32;
  
  if(!Attacking)
  AttackNoise();
  
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
  TurretForce = 0;
  
  VPRadius = 32;
  
  if(!Attacking)
  AttackNoise();
  
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
  TurretForce = 0;
  
  VPRadius = 32;
  
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
  TurretForce = 0;
  
  VPRadius = 32;
  
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
  TurretForce = 0;
  
  VPRadius = 32;
  
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
  TurretForce = 0;
  
  VPRadius = 32;
  
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
  TurretForce = 0;
  
  VPRadius = 32;
  
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
  TurretForce = 0;
  
  VPRadius = 32;
  
  if(!Attacking)
  AttackNoise();
  
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

yield WaitForSeconds (0.25);

//Debug.Log(loops + " loops");
//loops = 0;

if(Attacking){
VPRadius = 188;

VicinityPoint.localPosition.z = VPRadius / 2;

Trig.center = Vector3(0,0,VPRadius / 2);
Trig.radius = VPRadius;
}else{
VPRadius = 750;

VicinityPoint.localPosition.z = VPRadius / 2;

Trig.center = Vector3(0,0,VPRadius / 10);
Trig.radius = VPRadius / 5;
}

//VPFX.startSize = VPRadius * 2;

}























function DSReset (){
yield WaitForSeconds (0.2);
DangerSense = false;
yield WaitForSeconds (2);
CanDangerSense = true;
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