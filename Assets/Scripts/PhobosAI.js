var target : Transform;

var Waypoint : Transform;

var Station : Transform;
var StationRAP : Transform;

var StationPath0 : Transform;
var StationPath1 : Transform;
var StationPath2 : Transform;
var StationPath3 : Transform;
var StationPath4 : Transform;

var thisTransform : Transform;
var thisVTransform : Transform;

var vRigidbody : Rigidbody;

var ResetAimpoint : Transform;

var AIAnchor : Transform;

var Cap : Transform;
var CapDown : boolean;

var Turret : TurretAI;
var SecondTurret : TurretAI;
var Trig : BoxCollider;
var WarningSound : GameObject;
var EngageSound : GameObject;

var PissedAtTC0a = 0;

var PissedAtTC1 = 0;
var PissedAtTC2 = 0;
var PissedAtTC3 = 0;
var PissedAtTC4 = 0;
var PissedAtTC5 = 0;
var PissedAtTC7 = 0;
var PissedAtTC8 = 0;
var PissedAtTC9 = 0;

var FoundBigger : boolean;

var Emergency : boolean;

var freeRoam : boolean;

var Patrolling : boolean;
var Attacking : boolean;
var Obstacle : boolean;
var Stuck : boolean;

var Stuckage = 0;

var PathNum = 0;

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

var PatrolTime = 0;

var Returning : boolean;

var TargetDist = 0;

InvokeRepeating("Shooty", 0.3, 0.3);

InvokeRepeating("Regenerator", 1, 1);

InvokeRepeating("LeaveMarker", 1, 3);

function Start () {
if(AbiaSyndicateNetwork.instance.BasePath0){
StationPath0 = AbiaSyndicateNetwork.instance.BasePath0;
StationPath1 = AbiaSyndicateNetwork.instance.BasePath1;
StationPath2 = AbiaSyndicateNetwork.instance.BasePath2;
StationPath3 = AbiaSyndicateNetwork.instance.BasePath3;
StationPath4 = AbiaSyndicateNetwork.instance.BasePath4;
}else{
freeRoam = true;
PathNum = 8;
}
}

function Update () {

if(!DangerTick)
thisTransform.rotation = AIAnchor.transform.rotation;

thisTransform.position = AIAnchor.transform.position;

if(Attacking){
if(target == null){
target = ResetAimpoint;
Attacking = false;
FoundBigger = false;
}else{
if(target.name.Contains ("bro")){
target = ResetAimpoint;
Cramped = 0;
Attacking = false;
}
}
}

if(Warn < 1 && DangerSense < 1 && !freeRoam){
if(Patrolling && !Attacking){
if(PathNum == 0){
if(Vector3.Distance(thisTransform.position, StationPath0.position) > 16)
target = StationPath0;
else
PathNum = 1;
}

if(PathNum == 1){
if(Vector3.Distance(thisTransform.position, StationPath1.position) > 16)
target = StationPath1;
else
PathNum = 2;
}

if(PathNum == 2){
if(Vector3.Distance(thisTransform.position, StationPath2.position) > 16)
target = StationPath2;
else
PathNum = 3;
}

if(PathNum == 3){
if(Vector3.Distance(thisTransform.position, StationPath3.position) > 16)
target = StationPath3;
else
PathNum = 4;
}

if(PathNum == 4){
if(Vector3.Distance(thisTransform.position, StationPath4.position) > 16){
target = StationPath4;
}else{
PathNum = 0;
PatrolTime = 160;
Patrolling = false;
}
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

var Vel = vRigidbody.velocity.magnitude * 4;
var VelClamp = Mathf.Clamp(Vel,40,80);

Debug.DrawRay (thisTransform.position + -thisTransform.up * 22 + thisTransform.up * RUP, newRot2 * VelClamp, Color.white);
if (Physics.Raycast (thisTransform.position + -thisTransform.up * 22 + thisTransform.up * RUP, newRot2, hit1, VelClamp, targetLayers))
Point1u = hit1.point;
else
Point1u = Vector3(2,2,2);

Debug.DrawRay (thisTransform.position + -thisTransform.up * 23 + thisTransform.up * RUP, newRot2 * VelClamp, Color.white);
if (Physics.Raycast (thisTransform.position + -thisTransform.up * 23 + thisTransform.up * RUP, newRot2, hit2, VelClamp, targetLayers))
Point1d = hit2.point;
else
Point1d = Vector3(8,8,8);

if(Vector3.Distance(Point1u, Point1d) < 2){
Wall = true;
}

if(Vel > 0){
Debug.DrawRay (thisTransform.position + -thisTransform.up * 23, thisTransform.forward * VelClamp, Color.green);
if (Physics.Raycast (thisTransform.position + -thisTransform.up * 23, thisTransform.forward, hit, VelClamp, targetLayers))
     if(Wall)
     Obstacle = true;
}else{
Debug.DrawRay (thisTransform.position + -thisTransform.up * 23, -thisTransform.forward * VelClamp, Color.green);
if (Physics.Raycast (thisTransform.position + -thisTransform.up * 23, -thisTransform.forward, hit, VelClamp, targetLayers))
     if(Wall)
     Obstacle = true;
}
     
if(Vel > 2){
Debug.DrawRay (thisTransform.position + thisTransform.right * 5 + -thisTransform.up * 23, thisTransform.forward * VelClamp, Color.green);
if (Physics.Raycast (thisTransform.position + thisTransform.right * 5 + -thisTransform.up * 23, thisTransform.forward, hit, VelClamp, targetLayers))
     if(RWall)
     Obstacle = true;

Debug.DrawRay (thisTransform.position + -thisTransform.right * 5 + -thisTransform.up * 23, thisTransform.forward * VelClamp, Color.green);
if (Physics.Raycast (thisTransform.position + -thisTransform.right * 5 + -thisTransform.up * 23, thisTransform.forward, hit, VelClamp, targetLayers))
     if(LWall)
     Obstacle = true;
}

newRot2 = (thisTransform.forward * 0.4f + thisTransform.right * 0.1f).normalized;
Debug.DrawRay (thisTransform.position + thisTransform.right * 6 + -thisTransform.up * 22 + thisTransform.up * RRUP, newRot2 * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.right * 6 + -thisTransform.up * 22 + thisTransform.up * RRUP, newRot2, hit1, VelClamp, targetLayers)){
RPoint1u = hit1.point;
}else{
RPoint1u = Vector3(2,2,2);
}

Debug.DrawRay (thisTransform.position + thisTransform.right * 6 + -thisTransform.up * 23 + thisTransform.up * RRUP, newRot2 * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.right * 6 + -thisTransform.up * 23 + thisTransform.up * RRUP, newRot2, hit2, VelClamp, targetLayers)){
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
Debug.DrawRay (thisTransform.position + -thisTransform.right * 6 + -thisTransform.up * 22 + thisTransform.up * LRUP, newRot2 * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + -thisTransform.right * 6 + -thisTransform.up * 22 + thisTransform.up * LRUP, newRot2, hit1, VelClamp, targetLayers)){
LPoint1u = hit1.point;
}else{
LPoint1u = Vector3(2,2,2);
}

Debug.DrawRay (thisTransform.position + -thisTransform.right * 6 + -thisTransform.up * 23 + thisTransform.up * LRUP, newRot2 * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + -thisTransform.right * 6 + -thisTransform.up * 23 + thisTransform.up * LRUP, newRot2, hit2, VelClamp, targetLayers)){
LPoint1d = hit2.point;
LeftDist = hit2.distance;
}else{
LPoint1d = Vector3(8,8,8);
LeftDist = 512;
}

if(Vector3.Distance(LPoint1u, LPoint1d) < 3){
LWall = true;
}

Debug.DrawRay (thisTransform.position + thisTransform.up * 4 + thisTransform.forward * VelClamp, Vector3.down * 32, Color.white);
if (!Physics.Raycast (thisTransform.position + thisTransform.up * 4 + thisTransform.forward * VelClamp, Vector3.down, 32))
     Obstacle = true;

//---------------------------------------------------------------------------------------------
             Debug.DrawRay (thisTransform.position + thisTransform.up * 4 
                                  + thisTransform.right * 16
                                  + thisTransform.forward * VelClamp, Vector3.down * 32, Color.white);
if (!Physics.Raycast (thisTransform.position + thisTransform.up * 4 
                                        + thisTransform.right * 16
                                        + thisTransform.forward * VelClamp, Vector3.down, 32))
     TurnLeft = true;

             Debug.DrawRay (thisTransform.position + thisTransform.up * 4 
                                  + -thisTransform.right * 16
                                  + thisTransform.forward * VelClamp, Vector3.down * 32, Color.white);
if (!Physics.Raycast (thisTransform.position + thisTransform.up * 4 
                                        + -thisTransform.right * 16 
                                        + thisTransform.forward * VelClamp, Vector3.down, 32))
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

if(localV.y > 0)
  vRigidbody.AddForce(-thisVTransform.up * 40);
  else
  vRigidbody.AddForce(thisVTransform.up * 40);
  
}

if(target){
if(Attacking){
if(TargetDist > 64){

if(-localV.y < 16)
if(!Obstacle && !Stuck)
vRigidbody.AddForce(-thisVTransform.up * 20);
vRigidbody.AddTorque(thisTransform.up * TurnForce);

}else{

if(localV.y < 10)
if(!Obstacle && !Stuck)
vRigidbody.AddForce(thisVTransform.up * 40);

}
if(!Stuck)
vRigidbody.AddForce(thisVTransform.right * TurnForce * 0.15);
vRigidbody.AddTorque(-thisVTransform.right * TargetDist * 0.007);
}else{

if(Patrolling){
if(!Obstacle && !Stuck)
if(-localV.y < 10)
  vRigidbody.AddForce(-thisVTransform.up * 20);

if(Stuck)
if(localV.y < 4)
  vRigidbody.AddForce(thisVTransform.up * 20);
  
vRigidbody.AddTorque(thisTransform.up * TurnForce);
}else{
if(!Returning){
vRigidbody.AddForce((Station.position - thisTransform.position).normalized * 1);
if(-localV.y > 0)
  vRigidbody.AddForce(thisVTransform.up * 20);
}else{
vRigidbody.AddTorque(thisTransform.up * TurnForce);
if(!Obstacle && !Stuck) 
if(-localV.y < 10)
  vRigidbody.AddForce(-thisVTransform.up * 20);
}

}
}
}

if(target){
if(vRigidbody.angularVelocity.magnitude < 0.5){
vRigidbody.AddForceAtPosition((target.position - thisTransform.position).normalized * AimForce, thisTransform.forward * 2);
vRigidbody.AddForceAtPosition((target.position - thisTransform.position).normalized * -AimForce, -thisTransform.forward * 2);
}
}

if(CapDown){
if(Cap.localEulerAngles.x < 10 || Cap.localEulerAngles.x > 180)
Cap.Rotate(0.7,0,0);
}else{
if(Cap.localEulerAngles.x > 0 && Cap.localEulerAngles.x < 180)
Cap.Rotate(-0.1,0,0);
}

}

function OnTriggerEnter (other : Collider) {

var OTF1 = other.transform;
var OTN1 = other.name;

if(OTN1.Contains ("TFC"))
if(!OTN1.Contains ("TFC6")){

if(OTN1.Contains ("#3"))
CapDown = true;

if(OTN1.Contains ("TFC0a")){
if(PissedAtTC0a < 8)
PissedAtTC0a += 4;


if(PissedAtTC1 > 0)
PissedAtTC1 -= 4;
if(PissedAtTC2 > 0)
PissedAtTC2 -= 4;
if(PissedAtTC3 > 0)
PissedAtTC3 -= 4;
if(PissedAtTC4 > 0)
PissedAtTC4 -= 4;
if(PissedAtTC5 > 0)
PissedAtTC5 -= 4;
if(PissedAtTC7 > 0)
PissedAtTC7 -= 4;
if(PissedAtTC8 > 0)
PissedAtTC8 -= 4;
if(PissedAtTC9 > 0)
PissedAtTC9 -= 4;
}

if(OTN1.Contains ("TFC1")){
if(PissedAtTC1 < 8)
PissedAtTC1 += 4;


if(PissedAtTC0a > 0)
PissedAtTC0a -= 4;
if(PissedAtTC2 > 0)
PissedAtTC3 -= 4;
if(PissedAtTC2 > 0)
PissedAtTC3 -= 4;
if(PissedAtTC4 > 0)
PissedAtTC4 -= 4;
if(PissedAtTC5 > 0)
PissedAtTC5 -= 4;
if(PissedAtTC7 > 0)
PissedAtTC7 -= 4;
if(PissedAtTC8 > 0)
PissedAtTC8 -= 4;
if(PissedAtTC9 > 0)
PissedAtTC9 -= 4;
}

if(OTN1.Contains ("TFC2")){
if(PissedAtTC2 < 8)
PissedAtTC2 += 4;


if(PissedAtTC0a > 0)
PissedAtTC0a -= 4;
if(PissedAtTC3 > 0)
PissedAtTC3 -= 4;
if(PissedAtTC4 > 0)
PissedAtTC4 -= 4;
if(PissedAtTC5 > 0)
PissedAtTC5 -= 4;
if(PissedAtTC7 > 0)
PissedAtTC7 -= 4;
if(PissedAtTC8 > 0)
PissedAtTC8 -= 4;
if(PissedAtTC9 > 0)
PissedAtTC9 -= 4;
}

if(OTN1.Contains ("TFC3")){
if(PissedAtTC3 < 8)
PissedAtTC3 += 4;


if(PissedAtTC0a > 0)
PissedAtTC0a -= 4;
if(PissedAtTC1 > 0)
PissedAtTC1 -= 4;
if(PissedAtTC2 > 0)
PissedAtTC2 -= 4;
if(PissedAtTC4 > 0)
PissedAtTC4 -= 4;
if(PissedAtTC5 > 0)
PissedAtTC5 -= 4;
if(PissedAtTC7 > 0)
PissedAtTC7 -= 4;
if(PissedAtTC8 > 0)
PissedAtTC8 -= 4;
if(PissedAtTC9 > 0)
PissedAtTC9 -= 4;
}

if(OTN1.Contains ("TFC4")){
if(PissedAtTC4 < 8)
PissedAtTC4 += 4;


if(PissedAtTC0a > 0)
PissedAtTC0a -= 4;
if(PissedAtTC1 > 0)
PissedAtTC1 -= 4;
if(PissedAtTC2 > 0)
PissedAtTC2 -= 4;
if(PissedAtTC3 > 0)
PissedAtTC3 -= 4;
if(PissedAtTC5 > 0)
PissedAtTC5 -= 4;
if(PissedAtTC7 > 0)
PissedAtTC7 -= 4;
if(PissedAtTC8 > 0)
PissedAtTC8 -= 4;
if(PissedAtTC9 > 0)
PissedAtTC9 -= 4;
}

if(OTN1.Contains ("TFC5")){
if(PissedAtTC5 < 8)
PissedAtTC5 += 4;


if(PissedAtTC0a > 0)
PissedAtTC0a -= 4;
if(PissedAtTC1 > 0)
PissedAtTC1 -= 4;
if(PissedAtTC2 > 0)
PissedAtTC2 -= 4;
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

if(OTN1.Contains ("TFC7")){
if(PissedAtTC7 < 8)
PissedAtTC7 += 4;


if(PissedAtTC0a > 0)
PissedAtTC0a -= 4;
if(PissedAtTC1 > 0)
PissedAtTC1 -= 4;
if(PissedAtTC2 > 0)
PissedAtTC2 -= 4;
if(PissedAtTC3 > 0)
PissedAtTC3 -= 4;
if(PissedAtTC4 > 0)
PissedAtTC4 -= 4;
if(PissedAtTC5 > 0)
PissedAtTC5 -= 4;
if(PissedAtTC8 > 0)
PissedAtTC8 -= 4;
if(PissedAtTC9 > 0)
PissedAtTC9 -= 4;
}

if(OTN1.Contains ("TFC8")){
if(PissedAtTC8 < 8)
PissedAtTC8 += 4;


if(PissedAtTC0a > 0)
PissedAtTC0a -= 4;
if(PissedAtTC1 > 0)
PissedAtTC1 -= 4;
if(PissedAtTC2 > 0)
PissedAtTC2 -= 4;
if(PissedAtTC3 > 0)
PissedAtTC3 -= 4;
if(PissedAtTC4 > 0)
PissedAtTC4 -= 4;
if(PissedAtTC5 > 0)
PissedAtTC5 -= 4;
if(PissedAtTC7 > 0)
PissedAtTC7 -= 4;
if(PissedAtTC9 > 0)
PissedAtTC9 -= 4;
}

if(OTN1.Contains ("TFC9")){
if(PissedAtTC9 < 8)
PissedAtTC9 += 4;


if(PissedAtTC0a > 0)
PissedAtTC0a -= 4;
if(PissedAtTC1 > 0)
PissedAtTC1 -= 4;
if(PissedAtTC2 > 0)
PissedAtTC2 -= 4;
if(PissedAtTC3 > 0)
PissedAtTC3 -= 4;
if(PissedAtTC4 > 0)
PissedAtTC4 -= 4;
if(PissedAtTC5 > 0)
PissedAtTC5 -= 4;
if(PissedAtTC7 > 0)
PissedAtTC7 -= 4;
if(PissedAtTC8 > 0)
PissedAtTC8 -= 4;
}

if(!Attacking){
DangerSense = 20;
target = Waypoint;
if(OTF1.rigidbody)
Waypoint.position = OTF1.position;
}
}

}

function OnTriggerStay (other : Collider) {

if(other.collider.name.Contains ("TC"))
if(!other.collider.name.Contains ("TC6")){

var OTF = other.transform;
var OTN = other.name;

if(Vector3.Distance(thisTransform.position, OTF.position) < 32){
if(!OTN.Contains ("tT")){
if (!Physics.Linecast (thisTransform.position, OTF.position, MtargetLayers)){

if(Warn < 1 && !Attacking){
Warn = 6;
target = OTF;
WarningNoise();

if(OTN.Contains ("TC0a"))
PissedAtTC0a += 8;

if(OTN.Contains ("TC1"))
PissedAtTC1 += 8;

if(OTN.Contains ("TC2"))
PissedAtTC2 += 8;

if(OTN.Contains ("TC3"))
PissedAtTC3 += 8;

if(OTN.Contains ("TC4"))
PissedAtTC4 += 8;

if(OTN.Contains ("TC5"))
PissedAtTC5 += 8;

if(OTN.Contains ("TC7"))
PissedAtTC7 += 8;

if(OTN.Contains ("TC8"))
PissedAtTC8 += 8;

if(OTN.Contains ("TC9"))
PissedAtTC9 += 8;
}
if(Vector3.Distance(thisTransform.position, OTF.position) < 24){
if(Warn < 2){
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
  

 if(OTN.Contains ("TC0a")){
 if(PissedAtTC0a > 8){
 if(!OTN.Contains ("tT"))
 if(OTN.Contains ("sT") && !FoundBigger || !OTN.Contains ("sT")){
 
  target = OTF;
  
  if(!Attacking)
  AttackNoise();
  Patrolling = false;
  Attacking = true;
  if(!OTN.Contains ("sT"))
  FoundBigger = true;
}
}
}
  
if(OTN.Contains ("TC1")){
 if(PissedAtTC1 > 8){
 if(!OTN.Contains ("tT"))
 if(OTN.Contains ("sT") && !FoundBigger || !OTN.Contains ("sT")){
 
  target = OTF;
  
  if(!Attacking)
  AttackNoise();
  Patrolling = false;
  Attacking = true;
  if(!OTN.Contains ("sT"))
  FoundBigger = true;
}
}
}

if(OTN.Contains ("TC2")){
 if(PissedAtTC2 > 8){
 if(!OTN.Contains ("tT"))
 if(OTN.Contains ("sT") && !FoundBigger || !OTN.Contains ("sT")){
 
  target = OTF;
  
  if(!Attacking)
  AttackNoise();
  Patrolling = false;
  Attacking = true;
  if(!OTN.Contains ("sT"))
  FoundBigger = true;
}
}
}

if(OTN.Contains ("TC3")){
 if(PissedAtTC3 > 8){
 if(!OTN.Contains ("tT"))
 if(OTN.Contains ("sT") && !FoundBigger || !OTN.Contains ("sT")){
 
  target = OTF;
  
  if(!Attacking)
  AttackNoise();
  Patrolling = false;
  Attacking = true;
  if(!OTN.Contains ("sT"))
  FoundBigger = true;
}
}
}

if(OTN.Contains ("TC4")){
 if(PissedAtTC4 > 8){
 if(!OTN.Contains ("tT"))
 if(OTN.Contains ("sT") && !FoundBigger || !OTN.Contains ("sT")){
 
  target = OTF;
  
  if(!Attacking)
  AttackNoise();
  Patrolling = false;
  Attacking = true;
  if(!OTN.Contains ("sT"))
  FoundBigger = true;
}
}
}

if(OTN.Contains ("TC5")){
 if(PissedAtTC5 > 8){
 if(!OTN.Contains ("tT"))
 if(OTN.Contains ("sT") && !FoundBigger || !OTN.Contains ("sT")){
 
  target = OTF;
  
  if(!Attacking)
  AttackNoise();
  Patrolling = false;
  Attacking = true;
  if(!OTN.Contains ("sT"))
  FoundBigger = true;
}
}
}

if(OTN.Contains ("TC7")){
 if(PissedAtTC7 > 8){
 if(!OTN.Contains ("tT"))
 if(OTN.Contains ("sT") && !FoundBigger || !OTN.Contains ("sT")){
 
  target = OTF;
  
  if(!Attacking)
  AttackNoise();
  Patrolling = false;
  Attacking = true;
if(!OTN.Contains ("sT"))
  FoundBigger = true;
}
}
}

if(OTN.Contains ("TC8")){
 if(PissedAtTC8 > 8){
 if(!OTN.Contains ("tT"))
 if(OTN.Contains ("sT") && !FoundBigger || !OTN.Contains ("sT")){
 
  target = OTF;
  
  if(!Attacking)
  AttackNoise();
  Patrolling = false;
  Attacking = true;
if(!OTN.Contains ("sT"))
  FoundBigger = true;
}
}
}

if(OTN.Contains ("TC9")){
 if(PissedAtTC9 > 8){
 if(!OTN.Contains ("tT"))
 if(OTN.Contains ("sT") && !FoundBigger || !OTN.Contains ("sT")){
 
  target = OTF;
  
  if(!Attacking)
  AttackNoise();
  Patrolling = false;
  Attacking = true;
if(!OTN.Contains ("sT"))
  FoundBigger = true;
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
if(Attacking){
if(target)
Turret.NameOfTarget = target.name;
Turret.Attacking = true;
}else{
Turret.NameOfTarget = "null";
Turret.Attacking = false;
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



if(Patrolling && !Returning){
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

function Regenerator () {

if(PissedAtTC0a > 1)
PissedAtTC0a -= 1;
if(PissedAtTC1 > 1)
PissedAtTC1 -= 1;
if(PissedAtTC2 > 1)
PissedAtTC2 -= 1;
if(PissedAtTC3 > 1)
PissedAtTC3 -= 1;
if(PissedAtTC4 > 1)
PissedAtTC4 -= 1;
if(PissedAtTC5 > 1)
PissedAtTC5 -= 1;
if(PissedAtTC7 > 1)
PissedAtTC7 -= 1;
if(PissedAtTC8 > 1)
PissedAtTC8 -= 1;
if(PissedAtTC9 > 1)
PissedAtTC9 -= 1;

if(PissedAtTC1 < AbiaSyndicateNetwork.TC1CriminalLevel)
PissedAtTC1 = AbiaSyndicateNetwork.TC1CriminalLevel;
if(PissedAtTC2 < AbiaSyndicateNetwork.TC2CriminalLevel)
PissedAtTC2 = AbiaSyndicateNetwork.TC2CriminalLevel;
if(PissedAtTC3 < AbiaSyndicateNetwork.TC3CriminalLevel)
PissedAtTC3 = AbiaSyndicateNetwork.TC3CriminalLevel;
if(PissedAtTC4 < AbiaSyndicateNetwork.TC4CriminalLevel)
PissedAtTC4 = AbiaSyndicateNetwork.TC4CriminalLevel;
if(PissedAtTC5 < AbiaSyndicateNetwork.TC5CriminalLevel)
PissedAtTC5 = AbiaSyndicateNetwork.TC5CriminalLevel;
if(PissedAtTC7 < AbiaSyndicateNetwork.TC7CriminalLevel)
PissedAtTC7 = AbiaSyndicateNetwork.TC7CriminalLevel;
if(PissedAtTC8 < AbiaSyndicateNetwork.TC8CriminalLevel)
PissedAtTC8 = AbiaSyndicateNetwork.TC8CriminalLevel;
if(PissedAtTC9 < AbiaSyndicateNetwork.TC9CriminalLevel)
PissedAtTC9 = AbiaSyndicateNetwork.TC9CriminalLevel;
  
if(target){

TargetDist = Vector3.Distance(thisTransform.position, target.position);

if(Attacking){

if(Cap.localEulerAngles.x > 10)
CapDown = false;

if(!target.name.Contains ("TC")){
target = ResetAimpoint;
Attacking = false;
FoundBigger = false;
}

if(target.name.Contains ("sT") && FoundBigger){
Attacking = false;
if(SecondTurret){
SecondTurret.target = target;
SecondTurret.NameOfTarget = target.name;
SecondTurret.Attacking = true;
}
target = ResetAimpoint;

if(PissedAtTC0a > 8)
SecondTurret.PissedAtTC0a = 64;
if(PissedAtTC1 > 8)
SecondTurret.PissedAtTC1 = 64;
if(PissedAtTC2 > 8)
SecondTurret.PissedAtTC2 = 64;
if(PissedAtTC3 > 8)
SecondTurret.PissedAtTC3 = 64;
if(PissedAtTC4 > 8)
SecondTurret.PissedAtTC4 = 64;
if(PissedAtTC5 > 8)
SecondTurret.PissedAtTC5 = 64;
if(PissedAtTC7 > 8)
SecondTurret.PissedAtTC7 = 64;
if(PissedAtTC8 > 8)
SecondTurret.PissedAtTC8 = 64;
if(PissedAtTC9 > 8)
SecondTurret.PissedAtTC9 = 64;
}
}else{
FoundBigger = false;
}

}

if(Attacking){
Trig.size = Vector3(258,64,258);

if(EngageTime > 0)
EngageTime -= 1;

}else{
Trig.size = Vector3(512,64,512);

EngageTime = 2;

}

if(DangerSense > 0){

if(DangerSense < 2 && !Attacking)
target = ResetAimpoint;

DangerSense -= 1;
}else{
if(Cap.localEulerAngles.x > 10)
CapDown = false;
}

if(Warn > 0)
Warn -= 1;

if(!freeRoam){
if(!Attacking && DangerSense < 1){
if(Patrolling){

if(PatrolTime < 1){
PatrolTime = 160;
Patrolling = false;
}

Returning = false;

if(Vector3.Distance(thisTransform.position, Station.position) > 512)
target = StationRAP;

PatrolTime -= Random.Range(1, 3);

}else{

if(Vector3.Distance(thisTransform.position, Station.position) < 13){
Returning = false;
target = StationRAP;
}else{
Returning = true;
target = StationRAP;
}
PatrolTime -= Random.Range(1, 3);

if(PatrolTime < 1){
PatrolTime = 160;
Patrolling = true;
}
}
}else{
Returning = false;
}
}

AimForce = 200;
TurnForce = 0;

Wall = false;
RWall = false;
LWall = false;

TurnRight = false;
TurnLeft = false;

Obstacle = false;

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