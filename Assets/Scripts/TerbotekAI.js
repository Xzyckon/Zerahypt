var target : Transform;

var Waypoint : Transform;

var Station : Transform;
var StationRAP : Transform;

var TargetTrace : Transform;
var TargetLead : Transform;
var TargetLead2 : Transform;
var TLCol : SphereCollider;

var thisTransform : Transform;
var thisVTransform : Transform;

var vRigidbody : Rigidbody;

var ResetAimpoint : Transform;

var AIAnchor : Transform;

var MissileAmmo : GameObject;
var MissilePR1 : Transform;
var MissilePR2 : Transform;
var MissilePL1 : Transform;
var MissilePL2 : Transform;

var Gun1RB : Rigidbody;
var Gun2RB : Rigidbody;
var Gun1TF : Transform;
var Gun2TF : Transform;
var Gun1 : NPCGun;
var Gun2 : NPCGun;
var Trig : BoxCollider;
var WarningSound : GameObject;
var EngageSound : GameObject;

var PissedAtTC0a = 0;

var PissedAtTC1 = 0;
var PissedAtTC2 = 0;
var PissedAtTC3 = 0;
var PissedAtTC4 = 0;
var PissedAtTC6 = 0;
var PissedAtTC7 = 0;
var PissedAtTC8 = 0;
var PissedAtTC9 = 0;

var FoundSmall : boolean;

var TargetInFront : boolean;

var Emergency : boolean;

var Patrolling : boolean;
var Attacking : boolean;
var Obstacle : boolean;
var Stuck : boolean;

var Stuckage = 0;

var TurnRight : boolean;
var TurnLeft : boolean;

var AimForce : float = 0;
var TurnForce : float = 0;

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

var MtargetLayers : LayerMask;

var DangerSense = 0;

var DangerTick : boolean;

var EngageTime = 0;

var Warn = 0;

var Spot = 0;

var PatrolTime = 0;

var Returning : boolean;

var TargetDist = 0;

var CanLaunch : boolean;

var Launching = 0;
var LaunchInt = 0;

var StoredMissileBatches = 8;

InvokeRepeating("Regenerator", 1, 1);

InvokeRepeating("LeaveMarker", 1, 3);

InvokeRepeating("Shooty", Random.Range(2, 3), 0.12);

InvokeRepeating("Launchy", Random.Range(2, 3), 0.3);

InvokeRepeating("CalcLead", 1, 0.15);

function Start () {

}

function Update () {

if(!DangerTick)
thisTransform.rotation = AIAnchor.transform.rotation;

thisTransform.position = AIAnchor.transform.position;

if(Attacking){
if(target == null){
target = ResetAimpoint;
Attacking = false;
Spot = 0;
FoundSmall = false;
}else{
if(target.name.Contains ("bro")){
target = ResetAimpoint;
Cramped = 0;
Attacking = false;
Spot = 0;
}
}
}

if(TurnLeft){
  AimForce = 0;
  TurnForce = -80;
}

if(TurnRight){
  AimForce = 0;
  TurnForce = 80;
}
	
localV = thisVTransform.InverseTransformDirection(vRigidbody.velocity);

var newRot2 : Vector3;

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

var Vel = vRigidbody.velocity.magnitude * 2;
var VelClamp = Mathf.Clamp(Vel,10,80);

Debug.DrawRay (thisTransform.position + thisTransform.up * RUP, newRot2 * VelClamp, Color.white);
if (Physics.Raycast (thisTransform.position + thisTransform.up * RUP, newRot2, hit1, VelClamp, targetLayers))
Point1u = hit1.point;
else
Point1u = Vector3(2,2,2);

Debug.DrawRay (thisTransform.position + -thisTransform.up * 1 + thisTransform.up * RUP, newRot2 * VelClamp, Color.white);
if (Physics.Raycast (thisTransform.position + -thisTransform.up * 1 + thisTransform.up * RUP, newRot2, hit2, VelClamp, targetLayers))
Point1d = hit2.point;
else
Point1d = Vector3(8,8,8);

if(Vector3.Distance(Point1u, Point1d) < 2){
Wall = true;
}

Obstacle = false;

Debug.DrawRay (thisTransform.position, thisTransform.forward * VelClamp, Color.green);
if (Physics.Raycast (thisTransform.position, thisTransform.forward, hit, VelClamp, targetLayers))
     if(Wall)
     Obstacle = true;
     
if(Vel > 2){
Debug.DrawRay (thisTransform.position + thisTransform.right * 5, thisTransform.forward * VelClamp, Color.green);
if (Physics.Raycast (thisTransform.position + thisTransform.right * 5, thisTransform.forward, hit, VelClamp, targetLayers))
     if(RWall)
     Obstacle = true;

Debug.DrawRay (thisTransform.position + -thisTransform.right * 5, thisTransform.forward * VelClamp, Color.green);
if (Physics.Raycast (thisTransform.position + -thisTransform.right * 5, thisTransform.forward, hit, VelClamp, targetLayers))
     if(LWall)
     Obstacle = true;
}

newRot2 = (thisTransform.forward * 0.4f + thisTransform.right * 0.1f).normalized;
Debug.DrawRay (thisTransform.position + thisTransform.right * 6 + thisTransform.up * RRUP, newRot2 * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.right * 6 + thisTransform.up * RRUP, newRot2, hit1, VelClamp, targetLayers)){
RPoint1u = hit1.point;
}else{
RPoint1u = Vector3(2,2,2);
}

Debug.DrawRay (thisTransform.position + thisTransform.right * 6 + -thisTransform.up * 1 + thisTransform.up * RRUP, newRot2 * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.right * 6 + -thisTransform.up * 1 + thisTransform.up * RRUP, newRot2, hit2, VelClamp, targetLayers)){
RPoint1d = hit2.point;
RightDist = hit2.distance;
}else{
RPoint1d = Vector3(8,8,8);
RightDist = 512;
}

if(Vector3.Distance(RPoint1u, RPoint1d) < 3){
RWall = true;
}

newRot2 = (thisTransform.forward * 0.4f + -thisTransform.right * 0.1f).normalized;
Debug.DrawRay (thisTransform.position + -thisTransform.right * 6 + thisTransform.up * LRUP, newRot2 * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + -thisTransform.right * 6 + thisTransform.up * LRUP, newRot2, hit1, VelClamp, targetLayers)){
LPoint1u = hit1.point;
}else{
LPoint1u = Vector3(2,2,2);
}

Debug.DrawRay (thisTransform.position + -thisTransform.right * 6 + -thisTransform.up * 1 + thisTransform.up * LRUP, newRot2 * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + -thisTransform.right * 6 + -thisTransform.up * 1 + thisTransform.up * LRUP, newRot2, hit2, VelClamp, targetLayers)){
LPoint1d = hit2.point;
LeftDist = hit2.distance;
}else{
LPoint1d = Vector3(8,8,8);
LeftDist = 512;
}

if(Vector3.Distance(LPoint1u, LPoint1d) < 3){
LWall = true;
}

Debug.DrawRay (thisTransform.position + thisTransform.up * 5 + thisTransform.forward * VelClamp, thisTransform.up * -20f, Color.white);
if (!Physics.Raycast (thisTransform.position + thisTransform.up * 5 + thisTransform.forward * VelClamp, -thisTransform.up, 20))
     Obstacle = true;

//---------------------------------------------------------------------------------------------
             Debug.DrawRay (thisTransform.position + thisTransform.up * 10 
                                  + thisTransform.right * 10
                                  + thisTransform.forward * VelClamp, thisTransform.up * -20f, Color.white);
if (!Physics.Raycast (thisTransform.position + thisTransform.up * 10 
                                        + thisTransform.right * 10 
                                        + thisTransform.forward * VelClamp, -thisTransform.up, 20))
     TurnLeft = true;

             Debug.DrawRay (thisTransform.position + thisTransform.up * 10 
                                  + -thisTransform.right * 10
                                  + thisTransform.forward * VelClamp, thisTransform.up * -20f, Color.white);
if (!Physics.Raycast (thisTransform.position + thisTransform.up * 10 
                                        + -thisTransform.right * 10 
                                        + thisTransform.forward * VelClamp, -thisTransform.up, 20))
     TurnRight = true;
//---------------------------------------------------------------------------------------------

if(RightDist > LeftDist && LWall){
     TurnRight = true;
     }
     
 if(LeftDist > RightDist && RWall){
     TurnLeft = true;
     }
    
if(Stuck)
  TurnRight = true;
}


function FixedUpdate () {
 
var localV = thisVTransform.InverseTransformDirection(vRigidbody.velocity);

if(Obstacle){

if(-localV.y > 0){
  vRigidbody.AddForce(thisVTransform.up * 40);
  }
  
}

if(target)
if(Attacking){
if(TargetInFront){
if(TargetDist > 64){

if(-localV.y < 20)
if(!Obstacle && !Stuck)
vRigidbody.AddForce(-thisVTransform.up * 10);
vRigidbody.AddTorque(thisTransform.up * TurnForce);

}else{

if (!Physics.Linecast (thisTransform.position, target.position, MtargetLayers)){

if(TargetDist < 16)
if(localV.y < 20)
if(!Stuck)
vRigidbody.AddForce(thisVTransform.up * 10);
vRigidbody.AddTorque(thisTransform.up * TurnForce);

}else{
if(-localV.y < 10)
if(!Obstacle && !Stuck)
vRigidbody.AddForce(-thisVTransform.up * 10);
vRigidbody.AddTorque(thisTransform.up * TurnForce);
}

}
if(!Stuck)
vRigidbody.AddForce(thisVTransform.right * TurnForce * 0.15);
vRigidbody.AddTorque(-thisVTransform.right * TargetDist * 0.007);
}else{
if(TargetDist < 128){
if(localV.y < 20)
vRigidbody.AddForce(thisVTransform.up * 10);
vRigidbody.AddTorque(thisTransform.up * TurnForce);
}else{
if(-localV.y < 20)
if(!Obstacle && !Stuck)
vRigidbody.AddForce(-thisVTransform.up * 10);
vRigidbody.AddTorque(thisTransform.up * TurnForce);
}
}
}

if(Spot > 0 && !Obstacle && !Attacking){
if(-localV.y > 0)
  vRigidbody.AddForce(thisVTransform.up * 10);
}

if(Patrolling){
if(!Attacking && !Obstacle && Spot < 1 && !Stuck && !TurnLeft && !TurnRight)
if(-localV.y < 10)
  vRigidbody.AddForce(-thisVTransform.up * 10);

if(Stuck)
if(localV.y < 4)
  vRigidbody.AddForce(thisVTransform.up * 10);
  
vRigidbody.AddTorque(thisTransform.up * TurnForce);
}else{
if(!Attacking && Spot < 1){
if(!Returning){
vRigidbody.AddForce((Station.position - thisTransform.position).normalized * 1);
if(-localV.y > 0)
  vRigidbody.AddForce(thisVTransform.up * 10);
}else{
vRigidbody.AddTorque(thisTransform.up * TurnForce);
if(!Obstacle && !Stuck && !TurnLeft && !TurnRight) 
if(-localV.y < 10)
  vRigidbody.AddForce(-thisVTransform.up * 10);
}
}
}

if(target){
if(Attacking){
Gun1RB.AddForceAtPosition((TargetLead.position - Gun1TF.position).normalized * 0.05, -Gun1TF.up * 2);
Gun1RB.AddForceAtPosition((TargetLead.position - Gun1TF.position).normalized * -0.05, Gun1TF.up * 2);
Gun2RB.AddForceAtPosition((TargetLead.position - Gun2TF.position).normalized * 0.05, -Gun2TF.up * 2);
Gun2RB.AddForceAtPosition((TargetLead.position - Gun2TF.position).normalized * -0.05, Gun2TF.up * 2);
if(TargetDist > 64){
vRigidbody.AddForceAtPosition((TargetLead2.position - thisTransform.position).normalized * AimForce, thisTransform.forward * 2);
vRigidbody.AddForceAtPosition((TargetLead2.position - thisTransform.position).normalized * -AimForce, -thisTransform.forward * 2);
}else{
vRigidbody.AddForceAtPosition((target.position - thisTransform.position).normalized * AimForce, thisTransform.forward * 2);
vRigidbody.AddForceAtPosition((target.position - thisTransform.position).normalized * -AimForce, -thisTransform.forward * 2);
}
}else{
Gun1RB.AddForceAtPosition((ResetAimpoint.position - Gun1TF.position).normalized * 0.05, -Gun1TF.up * 2);
Gun1RB.AddForceAtPosition((ResetAimpoint.position - Gun1TF.position).normalized * -0.05, Gun1TF.up * 2);
Gun2RB.AddForceAtPosition((ResetAimpoint.position - Gun2TF.position).normalized * 0.05, -Gun2TF.up * 2);
Gun2RB.AddForceAtPosition((ResetAimpoint.position - Gun2TF.position).normalized * -0.05, Gun2TF.up * 2);
vRigidbody.AddForceAtPosition((target.position - thisTransform.position).normalized * AimForce, thisTransform.forward * 2);
vRigidbody.AddForceAtPosition((target.position - thisTransform.position).normalized * -AimForce, -thisTransform.forward * 2);
}

}



}

function OnTriggerEnter (other : Collider) {

var OTF1 = other.transform;
var ON1 = other.name;

if(Warn < 1 && !Attacking){
if (!Physics.Linecast (thisTransform.position, OTF1.position, MtargetLayers)){
if(ON1.Contains ("TC"))
if(!ON1.Contains ("TC5")){
Spot = 8;
target = OTF1;
}
}
}

if(ON1.Contains ("TFC"))
if(!ON1.Contains ("TFC5")){

if(ON1.Contains ("TFC0a")){
if(PissedAtTC0a < 8)
PissedAtTC0a += 4;
if(PissedAtTC1 > 0)
PissedAtTC1 -= 4;
if(PissedAtTC3 > 0)
PissedAtTC3 -= 4;
if(PissedAtTC4 > 0)
PissedAtTC4 -= 4;
if(PissedAtTC7 > 0)
PissedAtTC7 -= 4;
if(PissedAtTC8 > 0)
PissedAtTC8 -= 4;
if(PissedAtTC9 > 0)
PissedAtTC9 -= 4;
}

if(ON1.Contains ("TFC1")){
if(PissedAtTC1 < 8)
PissedAtTC1 += 4;
if(PissedAtTC0a > 0)
PissedAtTC0a -= 4;
if(PissedAtTC3 > 0)
PissedAtTC3 -= 4;
if(PissedAtTC4 > 0)
PissedAtTC4 -= 4;
if(PissedAtTC7 > 0)
PissedAtTC7 -= 4;
if(PissedAtTC8 > 0)
PissedAtTC8 -= 4;
if(PissedAtTC9 > 0)
PissedAtTC9 -= 4;
}

if(ON1.Contains ("TFC3")){
if(PissedAtTC3 < 8)
PissedAtTC3 += 4;
if(PissedAtTC0a > 0)
PissedAtTC0a -= 4;
if(PissedAtTC1 > 0)
PissedAtTC1 -= 4;
if(PissedAtTC4 > 0)
PissedAtTC4 -= 4;
if(PissedAtTC7 > 0)
PissedAtTC7 -= 4;
if(PissedAtTC8 > 0)
PissedAtTC8 -= 4;
if(PissedAtTC9 > 0)
PissedAtTC9 -= 4;
}

if(ON1.Contains ("TFC4")){
if(PissedAtTC4 < 8)
PissedAtTC4 += 4;
if(PissedAtTC0a > 0)
PissedAtTC0a -= 4;
if(PissedAtTC1 > 0)
PissedAtTC1 -= 4;
if(PissedAtTC3 > 0)
PissedAtTC3 -= 4;
if(PissedAtTC7 > 0)
PissedAtTC7 -= 4;
if(PissedAtTC8 > 0)
PissedAtTC8 -= 4;
if(PissedAtTC9 > 0)
PissedAtTC9 -= 4;
}

if(ON1.Contains ("TFC7")){
if(PissedAtTC7 < 8)
PissedAtTC7 += 4;
if(PissedAtTC0a > 0)
PissedAtTC0a -= 4;
if(PissedAtTC1 > 0)
PissedAtTC1 -= 4;
if(PissedAtTC3 > 0)
PissedAtTC3 -= 4;
if(PissedAtTC4 > 0)
PissedAtTC4 -= 4;
if(PissedAtTC8 > 0)
PissedAtTC8 -= 4;
if(PissedAtTC9 > 0)
PissedAtTC9 -= 4;
}

if(ON1.Contains ("TFC8")){
if(PissedAtTC8 < 8)
PissedAtTC8 += 4;
if(PissedAtTC0a > 0)
PissedAtTC0a -= 4;
if(PissedAtTC1 > 0)
PissedAtTC1 -= 4;
if(PissedAtTC3 > 0)
PissedAtTC3 -= 4;
if(PissedAtTC4 > 0)
PissedAtTC4 -= 4;
if(PissedAtTC7 > 0)
PissedAtTC7 -= 4;
if(PissedAtTC9 > 0)
PissedAtTC9 -= 4;
}

if(ON1.Contains ("TFC9")){
if(PissedAtTC9 < 8)
PissedAtTC9 += 4;
if(PissedAtTC0a > 0)
PissedAtTC0a -= 4;
if(PissedAtTC1 > 0)
PissedAtTC1 -= 4;
if(PissedAtTC3 > 0)
PissedAtTC3 -= 4;
if(PissedAtTC4 > 0)
PissedAtTC4 -= 4;
if(PissedAtTC7 > 0)
PissedAtTC7 -= 4;
if(PissedAtTC8 > 0)
PissedAtTC8 -= 4;
}

if(!Attacking){
DangerSense = 10;
target = Waypoint;
if(OTF1.rigidbody)
Waypoint.position = OTF1.position;
}
}

}

function OnTriggerStay (other : Collider) {

if(other.collider.name.Contains ("TC"))
if(!other.collider.name.Contains ("TC5")){

var OTF = other.transform;
var ON = other.name;

if(Vector3.Distance(thisTransform.position, OTF.position) < 48){
if(!ON.Contains ("TC2")){

if (!Physics.Linecast (thisTransform.position, OTF.position, MtargetLayers)){

if(Warn < 1 && !Attacking){
Spot = 6;
Warn = 6;
target = OTF;
WarningNoise();

if(ON.Contains ("TC0a"))
PissedAtTC0a += 1;

if(ON.Contains ("TC1"))
PissedAtTC1 += 1;

if(ON.Contains ("TC3"))
PissedAtTC3 += 1;

if(ON.Contains ("TC4"))
PissedAtTC4 += 1;

if(ON.Contains ("TC6"))
PissedAtTC6 += 1;

if(ON.Contains ("TC7"))
PissedAtTC7 += 1;

if(ON.Contains ("TC8"))
PissedAtTC8 += 1;

if(ON.Contains ("TC9"))
PissedAtTC9 += 1;
}
if(Vector3.Distance(thisTransform.position, OTF.position) < 32){
if(Warn < 2){
  Spot = 0;
  target = OTF;
  if(!Attacking)
  AttackNoise();
  Patrolling = false;
  Attacking = true;
}
}

}

}
}
  

 if(ON.Contains ("TC0a")){
 if(PissedAtTC0a > 4){
 if(ON.Contains ("sT") && !FoundSmall || !ON.Contains ("sT")){
 
  Spot = 0;
  target = OTF;
  
  if(!Attacking)
  AttackNoise();
  Patrolling = false;
  Attacking = true;
}
}
}
  
if(ON.Contains ("TC1")){
 if(PissedAtTC1 > 4){
 if(ON.Contains ("sT") && !FoundSmall || !ON.Contains ("sT")){
 
  Spot = 0;
  target = OTF;
  
  if(!Attacking)
  AttackNoise();
  Patrolling = false;
  Attacking = true;
}
}
}

if(!ON.Contains ("cT"))
if(ON.Contains ("TC3")){
 if(PissedAtTC3 > 4){
 if(ON.Contains ("sT") && !FoundSmall || !ON.Contains ("sT")){
 
  Spot = 0;
  target = OTF;
  
  if(!Attacking)
  AttackNoise();
  Patrolling = false;
  Attacking = true;
}
}
}

if(ON.Contains ("TC4")){
 if(PissedAtTC4 > 4){
 if(ON.Contains ("sT") && !FoundSmall || !ON.Contains ("sT")){
 
  Spot = 0;
  target = OTF;
  
  if(!Attacking)
  AttackNoise();
  Patrolling = false;
  Attacking = true;
}
}
}

if(!ON.Contains ("cT"))
if(ON.Contains ("TC7")){
 if(PissedAtTC7 > 4){
 if(ON.Contains ("sT") && !FoundSmall || !ON.Contains ("sT")){
 
  Spot = 0;
  target = OTF;
  
  if(!Attacking)
  AttackNoise();
  Patrolling = false;
  Attacking = true;
}
}
}

if(!ON.Contains ("cT"))
if(ON.Contains ("TC8")){
 if(PissedAtTC8 > 4){
 if(ON.Contains ("sT") && !FoundSmall || !ON.Contains ("sT")){
 
  Spot = 0;
  target = OTF;
  
  if(!Attacking)
  AttackNoise();
  Patrolling = false;
  Attacking = true;
}
}
}

if(!ON.Contains ("cT"))
if(ON.Contains ("TC9")){
 if(PissedAtTC9 > 4){
 if(ON.Contains ("sT") && !FoundSmall || !ON.Contains ("sT")){
 
  Spot = 0;
  target = OTF;
  
  if(!Attacking)
  AttackNoise();
  Patrolling = false;
  Attacking = true;
}
}
}

if(!ON.Contains ("cT"))
if(ON.Contains ("TC6")){
 if(PissedAtTC6 > 4){
 if(ON.Contains ("sT") && !FoundSmall || !ON.Contains ("sT")){
 
  Spot = 0;
  target = OTF;
  
  if(!Attacking)
  AttackNoise();
  Patrolling = false;
  Attacking = true;
}
}else{
if(!ON.Contains ("csT")){

  Spot = 0;
  target = OTF;

if(!Attacking)
  AttackNoise();
  Patrolling = false;
  Attacking = true;
}
}
}

}
}

function AttackNoise () {
var TheThing = Instantiate(EngageSound, thisTransform.position, thisTransform.rotation);
  TheThing.transform.parent = thisTransform;
}

function WarningNoise () {
var TheThing1 = Instantiate(WarningSound, thisTransform.position, thisTransform.rotation);
  TheThing1.transform.parent = thisTransform;
}

function Shooty () {
if(Attacking && EngageTime < 1){
Shoot();
}
}

function Shoot () {
if(Gun1)
Gun1.Fire();
yield WaitForSeconds (0.06);
if(Gun2)
Gun2.Fire();
}

function Launchy () {
var hitL : RaycastHit;

var TargetRelCalc = thisTransform.InverseTransformPoint(TargetLead2.position);
var RorL = Mathf.Abs(TargetRelCalc.x);
var ForB = TargetRelCalc.z;

if(ForB > 0)
TargetInFront = true;
else
TargetInFront = false;

if(target){
if(target.name.Contains ("bTC") || Emergency)
if(Attacking && CanLaunch && EngageTime < 1){
var DistMod = RorL / Vector3.Distance(thisTransform.position, TargetLead2.position);
if(DistMod < 0.2 && TargetInFront){
Debug.DrawRay (thisTransform.position, thisTransform.forward * TargetDist, Color.yellow);
if (!Physics.Raycast (thisTransform.position, thisTransform.forward, hitL, TargetDist, targetLayers)){
Launch();
}else{
if(hitL.collider.tag.Contains ("Vehicle") || hitL.collider.tag.Contains ("Metal"))
if(!hitL.collider.name.Contains ("5"))
Launch();
}
}
}
}
}

function Launch () {

if(target != null)
if(Attacking && StoredMissileBatches > 0){

var _SpawnedObject1 = Instantiate(MissileAmmo, MissilePR2.position, MissilePR2.rotation);
    _SpawnedObject1.rigidbody.velocity = vRigidbody.velocity * 1;
    
MissilePR2.localPosition.x += 0.1;

yield WaitForSeconds (0.15);
var _SpawnedObject2 = Instantiate(MissileAmmo, MissilePL2.position, MissilePL2.rotation);
    _SpawnedObject2.rigidbody.velocity = vRigidbody.velocity * 1;
    
MissilePL2.localPosition.x -= 0.1;

LaunchInt += 1;

if(LaunchInt > 15){
MissilePR2.localPosition.x = 0;
MissilePL2.localPosition.x = 0;
StoredMissileBatches -= 1;
CanLaunch = false;
LaunchInt = 0;
Launching = 8;
}

}

}

function LeaveMarker () {
var lastPos : Vector3 = thisTransform.position;
IsEscaping(lastPos);
}

function IsEscaping(lastPos : Vector3){

yield WaitForSeconds (2);

if(Stuckage > 1){
Stuckage = 0;
Stuck = false;
}

if(Attacking){
if(Vector3.Distance(thisTransform.position, lastPos) < 3){

if (Physics.Linecast (thisTransform.position, target.position, MtargetLayers)){

Stuckage += 1;
if(Stuckage > 1){
Stuck = true;
}else{
Stuck = false;
}

}else{
Stuckage = 0;
Stuck = false;
}

}else{
Stuckage = 0;
Stuck = false;
}



}else{



if(Spot < 1 && Patrolling && !Returning){
if(Vector3.Distance(thisTransform.position, lastPos) < 3){
Stuckage += 1;
if(Stuckage > 1)
Stuck = true;
else
Stuck = false;
}else{
Stuckage = 0;
Stuck = false;
}
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

TargetTrace.LookAt(target);

TargetLead.position = TargetTrace.position;
TargetLead.rotation = TargetTrace.rotation;
TargetLead2.position = TargetTrace.position;
TargetLead2.rotation = TargetTrace.rotation;
TargetLead.position += TargetLead.forward * Dist1 * Dist2 * 0.025;
TargetLead2.position += TargetLead2.forward * Dist1 * Dist2 * 0.1;

if(Attacking)
TLCol.radius = Vector3.Distance(thisTransform.position, target.position) * 0.05;
else
TLCol.radius = 0.1;

}
}

function Regenerator () {

if(Spot < 1){
if(PissedAtTC0a > 1)
PissedAtTC0a -= 1;
if(PissedAtTC1 > 1)
PissedAtTC1 -= 1;
if(PissedAtTC3 > 1)
PissedAtTC3 -= 1;
if(PissedAtTC4 > 1)
PissedAtTC4 -= 1;
if(PissedAtTC6 > 1)
PissedAtTC6 -= 1;
if(PissedAtTC7 > 1)
PissedAtTC7 -= 1;
if(PissedAtTC8 > 1)
PissedAtTC8 -= 1;
if(PissedAtTC9 > 1)
PissedAtTC9 -= 1;
}
if(PissedAtTC0a < 1)
PissedAtTC0a = SlavuicNetwork.TC0aDeathRow;
if(PissedAtTC1 < 1)
PissedAtTC1 = SlavuicNetwork.TC1DeathRow;
if(PissedAtTC4 < 1)
PissedAtTC4 = SlavuicNetwork.TC4DeathRow;
if(PissedAtTC6 < 1)
PissedAtTC6 = SlavuicNetwork.TC6DeathRow;
if(PissedAtTC7 < 1)
PissedAtTC7 = SlavuicNetwork.TC7DeathRow;
if(PissedAtTC8 < 1)
PissedAtTC8 = SlavuicNetwork.TC8DeathRow;
if(PissedAtTC9 < 1)
PissedAtTC9 = SlavuicNetwork.TC9DeathRow;
  
if(target){

TargetDist = Vector3.Distance(thisTransform.position, target.position);

if(Attacking){

if(!target.name.Contains ("TC")){
target = ResetAimpoint;
Attacking = false;
Spot = 0;
FoundSmall = false;
}

if(target.name.Contains ("sT"))
FoundSmall = true;
}else{
FoundSmall = false;
}

}

if(Attacking){
Trig.size = Vector3(128,40,128);

if(EngageTime > 0)
EngageTime -= 1;

}else{
Trig.size = Vector3(330,40,330);

EngageTime = 2;

}

if(DangerSense > 0){
if(DangerSense < 2 && !Attacking){
target = ResetAimpoint;
}

DangerSense -= 1;
}

if(Warn > 0)
Warn -= 1;

if(Spot > 0)
Spot -= 1;

if(Launching < 9)
Launching -= 1;

if(Launching < 1){
CanLaunch = true;
Launching = 9;
}


if(!Attacking){
if(Patrolling){

if(PatrolTime < 1){
PatrolTime = 160;
Patrolling = false;
}

Returning = false;
if(Spot < 1){
if(Vector3.Distance(thisTransform.position, Station.position) > 100)
target = StationRAP;
else
target = ResetAimpoint;

PatrolTime -= Random.Range(1, 3);
}
}else{

if(Spot < 1){
if(Vector3.Distance(thisTransform.position, Station.position) < 13){
Returning = false;
target = StationRAP;
}else{
Returning = true;
target = StationRAP;
}
PatrolTime -= Random.Range(1, 3);
}

if(PatrolTime < 1){
PatrolTime = 160;
Patrolling = true;
}
}
}else{
Returning = false;
}

AimForce = 50;
TurnForce = 0;

Wall = false;
RWall = false;
LWall = false;

TurnRight = false;
TurnLeft = false;

Notice();

}

function Notice (){
if(target != null && Attacking)
var lastTPos : Vector3 = target.transform.position;

if(DangerSense > 0){
DangerTick = true;
thisTransform.LookAt(Waypoint);
yield WaitForSeconds (0.1);
DangerTick = false;
}
}