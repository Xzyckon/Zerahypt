var target : Transform;
var Waypoint : Transform;

var guardPost1 : Transform;
var guardPost2 : Transform;

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
var viewPoint : Transform;

var AIAnchor : Transform;

var MissileAmmo : GameObject;
var Missile1 : Transform;
var Missile2 : Transform;

var Turret1TF : Transform;
var Turret1RB : Rigidbody;
var Gun1 : NPCGun;
var Trig : BoxCollider;
var Hover1 : AdvancedHoverScript;
var Hover2 : AdvancedHoverScript;
var Hover3 : AdvancedHoverScript;
var Hover4 : AdvancedHoverScript;
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

var isClose : boolean;

var inView : boolean;

var TurnRight : boolean;
var TurnLeft : boolean;
var StrafeRight : boolean;
var StrafeLeft : boolean;

var DirForce = 400;

var TurnForce = 0;

var TurretForce = 0;

var RPClamp : float = 0;
var RPMod : float = 0;

var RightDist : float = 200;
var LeftDist : float = 200;

var RRUP : float = 0;

var AngClamp = 2;

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

var LeadMod2 : float = 0.005;

var targetLayers : LayerMask;

var MtargetLayers : LayerMask;

var DangerSense : boolean;

var FarFromTarget : boolean;

var Ignorage = 0;

var shotAssumption = 0;

var canLaunch : boolean;

var StoredMissileBatches = 32;


InvokeRepeating("Regenerator", 1, 1);

InvokeRepeating("Shooty", Random.Range(2, 3), 0.2);

InvokeRepeating("Launchy", 1, 7);

InvokeRepeating("CalcLead", 1, 0.15);

function Start () {
if(TerrahyptianNetwork.instance.AnodianBase)
Base = TerrahyptianNetwork.instance.AnodianBase;
if(TerrahyptianNetwork.instance.TerrahyptianBase)
Base = TerrahyptianNetwork.instance.TerrahyptianBase;

if(TerrahyptianNetwork.instance.TerrahyptianGuardPost1){
guardPost1 = TerrahyptianNetwork.instance.TerrahyptianGuardPost1;
if(Vector3.Distance(thisTransform.position, guardPost1.position) < 32)
onPost = true;
}
if(TerrahyptianNetwork.instance.TerrahyptianGuardPost2){
guardPost2 = TerrahyptianNetwork.instance.TerrahyptianGuardPost2;
if(Vector3.Distance(thisTransform.position, guardPost2.position) < 32)
onPost = true;
}

if(onPost){
Hover1.breaksOn = true;
Hover2.breaksOn = true;
Hover3.breaksOn = true;
Hover4.breaksOn = true;
}

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

if(TurnRight && TurnLeft && Obstacle)
  TurnForce = -4000;
	
localV = thisVTransform.InverseTransformDirection(vRigidbody.velocity);

Vel = vRigidbody.velocity.magnitude;

VelDir = vRigidbody.velocity;

if(target)
var RelativeTarget = thisVTransform.InverseTransformPoint(target.position);

if(Base)
var RelativeTargetB = thisVTransform.InverseTransformPoint(Base.position);

if(!Stuck){
if(TurnLeft)
TurnForce = -4000;
if(TurnRight)
TurnForce = 4000;

}else{
if(RelativeTarget.x > 0)
TurnForce = -4000;
else
TurnForce = 4000;
}

RPMod = RelativeTarget.x * 200;
RPClamp = Mathf.Clamp(RPMod,-4000,4000);

if(RRUP < 15){
RRUP += 1.5;
}else{
RRUP = 1;
}

var newRot : Vector3 = (-thisVTransform.up * 2 + thisVTransform.right * -1).normalized;

var VelClamp = Mathf.Clamp(Vel * 6,8,300);
AngClamp = Mathf.Clamp(Vel * 0.1,4,16);

var hit : RaycastHit;

var hit1 : RaycastHit;
var hit2 : RaycastHit;
var hit3 : RaycastHit;

Debug.DrawRay (thisTransform.position + thisTransform.forward * 10 + -thisTransform.up * 0.7, thisTransform.forward * VelClamp, Color.white);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 10 + -thisTransform.up * 0.7, thisTransform.forward, hit1, VelClamp, targetLayers))
Pointu = hit1.point;
else
Pointu = Vector3(2,2,2);

Debug.DrawRay (thisTransform.position + thisTransform.forward * 10 + -thisTransform.up * 1.7, thisTransform.forward * VelClamp, Color.white);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 10 + -thisTransform.up * 1.7, thisTransform.forward, hit2, VelClamp, targetLayers))
Pointd = hit2.point;
else
Pointd = Vector3(8,8,8);

if(Vector3.Distance(Pointu, Pointd) < AngClamp){
Wall = true;
}

Debug.DrawRay (thisTransform.position + thisTransform.forward * 12 + thisTransform.up * 12, thisTransform.forward * VelClamp, Color.green);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 12 + thisTransform.up * 12, thisTransform.forward, hit, VelClamp, targetLayers))
     Wall = true;

newRot = (-thisVTransform.up * 4 + thisVTransform.right * 1).normalized;
Debug.DrawRay (thisTransform.position + thisTransform.right * 16, newRot * VelClamp * 0.7, Color.green);
if (Physics.Raycast (thisTransform.position + thisTransform.right * 16, newRot, hit, VelClamp * 0.7, targetLayers)){
     if(Wall)
     Obstacle = true;
     else
     TurnLeft = true;
     }

newRot = (-thisVTransform.up * 4 + -thisVTransform.right * 1).normalized;
Debug.DrawRay (thisTransform.position + -thisTransform.right * 16, newRot * VelClamp * 0.7, Color.green);
if (Physics.Raycast (thisTransform.position + -thisTransform.right * 16, newRot, hit, VelClamp * 0.7, targetLayers)){
     if(Wall)
     Obstacle = true;
     else
     TurnRight = true;
     }

if(inView){
if(!isClose){
Debug.DrawRay (thisTransform.position + thisTransform.forward * 10 + thisTransform.right * RRUP + -thisTransform.up * 0.7, thisTransform.forward * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 10 + thisTransform.right * RRUP + -thisTransform.up * 0.7, thisTransform.forward, hit1, VelClamp, targetLayers)){
RPointu = hit1.point;
}else{
RPointu = Vector3(2,2,2);
}

Debug.DrawRay (thisTransform.position + thisTransform.forward * 10 + thisTransform.right * RRUP + -thisTransform.up * 1.7, thisTransform.forward * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 10 + thisTransform.right * RRUP + -thisTransform.up * 1.7, thisTransform.forward, hit2, VelClamp, targetLayers)){
RPointd = hit2.point;
RightDist = hit2.distance;
}else{
RPointd = Vector3(8,8,8);
RightDist = 512;
}

Debug.DrawRay (thisTransform.position + thisTransform.forward * 10 + -thisTransform.right * RRUP + -thisTransform.up * 0.7, thisTransform.forward * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 10 + -thisTransform.right * RRUP + -thisTransform.up * 0.7, thisTransform.forward, hit1, VelClamp, targetLayers)){
LPointu = hit1.point;
}else{
LPointu = Vector3(2,2,2);
}

Debug.DrawRay (thisTransform.position + thisTransform.forward * 10 + -thisTransform.right * RRUP + -thisTransform.up * 1.7, thisTransform.forward * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 10 + -thisTransform.right * RRUP + -thisTransform.up * 1.7, thisTransform.forward, hit2, VelClamp, targetLayers)){
LPointd = hit2.point;
LeftDist = hit2.distance;
}else{
LPointd = Vector3(8,8,8);
LeftDist = 512;
}
}else{
Debug.DrawRay (thisTransform.position + -thisTransform.forward * 10 + thisTransform.right * RRUP + -thisTransform.up * 2, -thisTransform.forward * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + -thisTransform.forward * 10 + thisTransform.right * RRUP + -thisTransform.up * 2, -thisTransform.forward, hit2, VelClamp, targetLayers))
RightDist = hit2.distance;
else
RightDist = 512;

Debug.DrawRay (thisTransform.position + -thisTransform.forward * 10 + -thisTransform.right * RRUP + -thisTransform.up * 2, -thisTransform.forward * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + -thisTransform.forward * 10 + -thisTransform.right * RRUP + -thisTransform.up * 2, -thisTransform.forward, hit2, VelClamp, targetLayers))
LeftDist = hit2.distance;
else
LeftDist = 512;
}
}else{
Debug.DrawRay (thisTransform.position + thisTransform.forward * 10 + thisTransform.right * RRUP + -thisTransform.up * 0.7, thisTransform.forward * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 10 + thisTransform.right * RRUP + -thisTransform.up * 0.7, thisTransform.forward, hit1, VelClamp, targetLayers)){
RPointu = hit1.point;
}else{
RPointu = Vector3(2,2,2);
}

Debug.DrawRay (thisTransform.position + thisTransform.forward * 10 + thisTransform.right * RRUP + -thisTransform.up * 1.7, thisTransform.forward * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 10 + thisTransform.right * RRUP + -thisTransform.up * 1.7, thisTransform.forward, hit2, VelClamp, targetLayers)){
RPointd = hit2.point;
RightDist = hit2.distance;
}else{
RPointd = Vector3(8,8,8);
RightDist = 512;
}

Debug.DrawRay (thisTransform.position + thisTransform.forward * 10 + -thisTransform.right * RRUP + -thisTransform.up * 0.7, thisTransform.forward * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 10 + -thisTransform.right * RRUP + -thisTransform.up * 0.7, thisTransform.forward, hit1, VelClamp, targetLayers)){
LPointu = hit1.point;
}else{
LPointu = Vector3(2,2,2);
}

Debug.DrawRay (thisTransform.position + thisTransform.forward * 10 + -thisTransform.right * RRUP + -thisTransform.up * 1.7, thisTransform.forward * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 10 + -thisTransform.right * RRUP + -thisTransform.up * 1.7, thisTransform.forward, hit2, VelClamp, targetLayers)){
LPointd = hit2.point;
LeftDist = hit2.distance;
}else{
LPointd = Vector3(8,8,8);
LeftDist = 512;
}
}

Debug.DrawRay (thisTransform.position + thisTransform.up * 20 + thisTransform.forward * VelClamp, -thisTransform.up * 60, Color.white);
if (!Physics.Raycast (thisTransform.position + thisTransform.up * 20 + thisTransform.forward * VelClamp, -thisTransform.up, 60))
     Obstacle = true;

//---------------------------------------------------------------------------------------------
             Debug.DrawRay (thisTransform.position + thisTransform.up * 20 
                                  + thisTransform.right * 20
                                  + thisTransform.forward * VelClamp, thisTransform.up * -60, Color.white);
if (!Physics.Raycast (thisTransform.position + thisTransform.up * 20
                                        + thisTransform.right * 20 
                                        + thisTransform.forward * VelClamp, -thisTransform.up, 60))
     TurnLeft = true;

             Debug.DrawRay (thisTransform.position + thisTransform.up * 20
                                  + -thisTransform.right * 20
                                  + thisTransform.forward * VelClamp, thisTransform.up * -60, Color.white);
if (!Physics.Raycast (thisTransform.position + thisTransform.up * 20
                                        + -thisTransform.right * 20 
                                        + thisTransform.forward * VelClamp, -thisTransform.up, 60))
     TurnRight = true;
//---------------------------------------------------------------------------------------------


if(RightDist > LeftDist){
if(Vector3.Distance(LPointu, LPointd) < 4){
     if(!isClose)
     TurnRight = true;
     }
     if(isClose)
     StrafeRight = true;
     }
     
 if(LeftDist > RightDist){
 if(Vector3.Distance(RPointu, RPointd) < 4){
     if(!isClose)
     TurnLeft = true;
     }
     if(isClose)
     StrafeLeft = true;
     }

if(DangerSense){
TurnLeft = false;
TurnRight = false;
}

}


function FixedUpdate () {

if(TurretForce < 150)
TurretForce += 2;

if(Stuck || TurnLeft || TurnRight){
vRigidbody.AddTorque(thisVTransform.forward * TurnForce);
}else{
vRigidbody.AddTorque(thisVTransform.forward * RPClamp);
}

if(Obstacle){
if(!isClose){
if(-localV.y > 0)
  vRigidbody.AddForce(thisVTransform.up * DirForce);
  }else{
  if(!StrafeRight && !StrafeLeft)
  vRigidbody.AddForce(thisVTransform.up * DirForce);
  if(StrafeRight)
  vRigidbody.AddForce(-thisVTransform.right * DirForce);
  if(StrafeLeft)
  vRigidbody.AddForce(thisVTransform.right * DirForce);
  }
}

if(Stuck)
if(localV.y < 8)
  vRigidbody.AddForce(thisVTransform.up * DirForce);
  
if(!Obstacle && !Stuck && !TurnLeft && !TurnRight) 
if(-localV.y < 60)
  vRigidbody.AddForce(-thisVTransform.up * DirForce);
 
if(target){
Turret1RB.AddTorque(-Turret1TF.right * Dist * 0.015);
if(Turret1RB.angularVelocity.magnitude < 1){
Turret1RB.AddForceAtPosition((TargetLead.position - Turret1TF.position).normalized * TurretForce, -Turret1TF.up * 8);
Turret1RB.AddForceAtPosition((TargetLead.position - Turret1TF.position).normalized * -TurretForce, Turret1TF.up * 8);
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

if(shotAssumption < 0){

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

}

if(other.rigidbody){
Waypoint.position = OT.position;
DangerSense = true;
thisTransform.LookAt(Waypoint);
}

}else{

if(ON.Contains ("3_P"))
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

if(FoundBig)
return;
  
if(PissedAtTC0a > 1)
 if(ON.Contains ("TC0a")){
 
 if(ON.Contains ("sT") && !FoundSmall ||
    ON.Contains ("mT") && !FoundMedium ||
    ON.Contains ("bT")){
 
  Hunting = false;
  target = OT;
  TurretForce = 0;
  
  Trig.center = Vector3(0,0,0);
  Trig.size = Vector3(1,1,1);
  
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
  
  Trig.center = Vector3(0,0,0);
  Trig.size = Vector3(1,1,1);
  
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
  
  Trig.center = Vector3(0,0,0);
  Trig.size = Vector3(1,1,1);
  
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
  
  Trig.center = Vector3(0,0,0);
  Trig.size = Vector3(1,1,1);
  
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
  
  Trig.center = Vector3(0,0,0);
  Trig.size = Vector3(1,1,1);
  
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
  
  Trig.center = Vector3(0,0,0);
  Trig.size = Vector3(1,1,1);
  
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
  
  Trig.center = Vector3(0,0,0);
  Trig.size = Vector3(1,1,1);
  
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
  TurretForce = 0;
  
  Trig.center = Vector3(0,0,0);
  Trig.size = Vector3(1,1,1);
  
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
if(Attacking)
if(target)
if(!target.name.Contains ("sT")){
if(Gun1)
Gun1.Fire();
Gun1.gunTarget = target;
}

}

function Launchy () {
if(Attacking && target){

var hit8 : RaycastHit;

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
if(Measure.y < 0 && -localV.y > 17 && Vector3.Distance(thisTransform.position, target.position) < 330)
return;

StoredMissileBatches -= 1;

var _SpawnedObject1 = Instantiate(MissileAmmo, Missile1.position, Missile1.rotation);
    _SpawnedObject1.rigidbody.velocity = vRigidbody.velocity * 1;
    _SpawnedObject1.transform.GetComponent(MissileScript).target = target;

yield WaitForSeconds (0.3);

var _SpawnedObject2 = Instantiate(MissileAmmo, Missile2.position, Missile2.rotation);
    _SpawnedObject2.rigidbody.velocity = vRigidbody.velocity * 1;
    _SpawnedObject2.transform.GetComponent(MissileScript).target = target;

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
TLCol.radius = Vector3.Distance(thisTransform.position, target.position) * 0.025;
else
TLCol.radius = 0.1;

}
}

function Regenerator () {

var hitV : RaycastHit;

if(target){

targetDist = Vector3.Distance(transform.position, target.position);

if(TerrahyptianNetwork.TC1CriminalLevel > 10){
PissedAtTC1 = TerrahyptianNetwork.TC1CriminalLevel;
if(target.name.Contains ("TC1")){
Attacking = true;
Hunting = false;

if(TerrahyptianNetwork.TC1CriminalLevel > 480)
TerrahyptianNetwork.AlertLVL2 = 1;

}
}
if(TerrahyptianNetwork.TC4CriminalLevel > 10){
PissedAtTC4 = TerrahyptianNetwork.TC4CriminalLevel;
if(target.name.Contains ("TC4")){
Attacking = true;
Hunting = false;

if(TerrahyptianNetwork.TC4CriminalLevel > 480)
TerrahyptianNetwork.AlertLVL2 = 4;

}
}
if(TerrahyptianNetwork.TC5CriminalLevel > 10){
PissedAtTC5 = TerrahyptianNetwork.TC5CriminalLevel;
if(target.name.Contains ("TC5")){
Attacking = true;
Hunting = false;

if(TerrahyptianNetwork.TC5CriminalLevel > 480)
TerrahyptianNetwork.AlertLVL2 = 5;

}
}
if(TerrahyptianNetwork.TC6CriminalLevel > 10){
PissedAtTC6 = TerrahyptianNetwork.TC6CriminalLevel;
if(target.name.Contains ("TC6")){
Attacking = true;
Hunting = false;

if(TerrahyptianNetwork.TC6CriminalLevel > 480)
TerrahyptianNetwork.AlertLVL2 = 6;

}
}
if(TerrahyptianNetwork.TC7CriminalLevel > 10){
PissedAtTC7 = TerrahyptianNetwork.TC7CriminalLevel;
if(target.name.Contains ("TC7")){
Attacking = true;
Hunting = false;

if(TerrahyptianNetwork.TC7CriminalLevel > 480)
TerrahyptianNetwork.AlertLVL2 = 7;

}
}
if(TerrahyptianNetwork.TC8CriminalLevel > 10){
PissedAtTC8 = TerrahyptianNetwork.TC8CriminalLevel;
if(target.name.Contains ("TC8")){
Attacking = true;
Hunting = false;

if(TerrahyptianNetwork.TC8CriminalLevel > 480)
TerrahyptianNetwork.AlertLVL2 = 8;

}
}
if(TerrahyptianNetwork.TC9CriminalLevel > 10){
PissedAtTC9 = TerrahyptianNetwork.TC9CriminalLevel;
if(target.name.Contains ("TC9")){
Attacking = true;
Hunting = false;

if(TerrahyptianNetwork.TC9CriminalLevel > 480)
TerrahyptianNetwork.AlertLVL2 = 9;

}
}

if(TerrahyptianNetwork.TC4CriminalLevel > 480)
if(target.name.Contains ("C4"))
TerrahyptianNetwork.AlertLVL2 = 4;

if(TerrahyptianNetwork.TC5CriminalLevel > 480)
if(target.name.Contains ("C5"))
TerrahyptianNetwork.AlertLVL2 = 5;

if(TerrahyptianNetwork.TC6CriminalLevel > 480)
if(target.name.Contains ("C6"))
TerrahyptianNetwork.AlertLVL2 = 6;

if(TerrahyptianNetwork.TC7CriminalLevel > 480)
if(target.name.Contains ("C7"))
TerrahyptianNetwork.AlertLVL2 = 7;

if(TerrahyptianNetwork.TC8CriminalLevel > 480)
if(target.name.Contains ("C8"))
TerrahyptianNetwork.AlertLVL2 = 8;

if(TerrahyptianNetwork.TC9CriminalLevel > 480)
if(target.name.Contains ("C9"))
TerrahyptianNetwork.AlertLVL2 = 9;

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

if(target.name.Contains ("rok")){
Attacking = false;
Watch = true;
FoundSmall = false;
FoundMedium = false;
}else{
Watch = false;
}

if(!Physics.Linecast (topPoint.position, target.position, MtargetLayers)){
canLaunch = true;
}else{
canLaunch = false;
}

if(!Watch)
Obstacle = false;

if(onPost)
DirForce = 0;
else
DirForce = 400;

if(!Attacking){
if(TerrahyptianNetwork.instance.EnemyTarget2)
target = TerrahyptianNetwork.instance.EnemyTarget2;
}else{
TerrahyptianNetwork.instance.EnemyTarget1 = target;

if(targetDist < 150){
isClose = true;
}else{
isClose = false;
if(inView)
if(targetDist < 200)
Obstacle = true;
if(targetDist > 1000)
inView = false;
}
}

viewPoint.LookAt(target);
      Debug.DrawRay (viewPoint.position, viewPoint.forward * targetDist, Color.red);
if (Physics.Raycast (viewPoint.position, viewPoint.forward, hitV, targetDist, targetLayers)){
if(hitV.collider.name.Contains ("TL") || hitV.collider.name.Contains ("TC")){
if(Attacking){
if (Physics.Raycast (viewPoint.position, viewPoint.forward, targetDist, MtargetLayers)){
inView = false;
}else{
if(targetDist < 1000)
inView = true;
}
}else{
inView = false;
}
}else{
inView = false;
}
}

if(target.name.Contains ("sT"))
FoundSmall = true;

if(target.name.Contains ("mT"))
FoundMedium = true;

if(target.name.Contains ("bT")){
FoundBig = true;
TerrahyptianNetwork.instance.EnemyTarget2 = target;
if(inView){
FoundSmall = true;
FoundMedium = true;
}
Gun1.TargetRange = 3000;
}else{
Gun1.TargetRange = 1500;
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

if(Attacking){
Trig.center = Vector3(0,0,150);
Trig.size = Vector3(300,300,600);

}else{
Trig.center = Vector3(0,0,1350);
Trig.size = Vector3(400,300,3000);

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

DangerSense = false;

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

StrafeRight = false;
StrafeLeft = false;

Notice2(lastTPos);

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
if(!Wall && Unsticking > 8)
Unsticking -= 1;

Debug.DrawRay (thisTransform.position + -thisTransform.up * 10, -thisTransform.forward * 64, Color.white);
if (Physics.Raycast (thisTransform.position + -thisTransform.up * 10, -thisTransform.forward, 64, targetLayers))
Unsticking = 16;
}

if(Unsticking > 12){
Stuck = false;
TurnRight = false;
TurnLeft = false;
Unsticking = 0;
}

if(StuckTimer > 12){
Stuck = false;
TurnRight = false;
TurnLeft = false;

if(Vector3.Distance(thisTransform.position, lastPos) < 10)
Stuck = true;

lastPos = thisTransform.position;
StuckTimer = 0;
}

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