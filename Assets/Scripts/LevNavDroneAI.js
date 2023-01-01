var target : Transform;
var ResetView : Transform;

var Trig : SphereCollider;

var thisTransform : Transform;
var thisVTransform : Transform;

var vRigidbody : Rigidbody;

var vPoint : Transform;

var Muzzle : Transform;

var Shot : GameObject;

var Gun : NPCGun;

var PissedAtTC0a = 0;
var PissedAtTC1 = 0;
var PissedAtTC4 = 0;
var PissedAtTC5 = 0;
var PissedAtTC6 = 0;
var PissedAtTC7 = 0;
var PissedAtTC8 = 0;
var PissedAtTC9 = 0;

var ObsStartY : float = 4;
var ObsStartZ : float = 0.1;

var RightDist : float = 200;
var LeftDist : float = 200;

var UpDist : float = 200;
var DownDist : float = 200;

var Dist : float = 1000;

var StabForce : float = 2;

var Diff : float = 2;

var RD : float = 1;

var Vel : float = 0;

var TurnRight : boolean;
var TurnLeft : boolean;

var TurnUp : boolean;
var TurnDown : boolean;

var TurnAway : boolean;

var Obstacle = 0;

var Hunting : boolean;
var Attacking : boolean;

var targetLayers : LayerMask;

var UniqueShootTime : float = 0.1;

InvokeRepeating("Updater", 1, 1);

InvokeRepeating("Shooty", UniqueShootTime, 0.1);

function Start (){

UniqueShootTime = Random.Range(1, 2);

Vel = 4;

Hunting = true;

}

function Update () {

var VelClamp = Mathf.Clamp(Vel,20,80);

var newRot2 : Vector3;

newRot2 = -thisVTransform.up;

vPoint.rotation = Quaternion.LookRotation(newRot2);

var newRot : Vector3 = (-thisVTransform.up).normalized;
var hit0 : RaycastHit;
var hit1 : RaycastHit;
var hit2 : RaycastHit;
	
newRot = (-thisVTransform.up * 1f + -thisVTransform.forward * 1f).normalized;

Debug.DrawRay (thisVTransform.position, newRot * Vel*2, Color.white);
if (Physics.Raycast (thisVTransform.position, newRot, hit0, Vel*2, targetLayers)) {

if(hit0.distance < 128)
Obstacle = 4;
else
Obstacle = 2;

}else{
Obstacle = 0;
}

Debug.DrawRay (thisTransform.position, vPoint.forward * VelClamp * 0.5, Color.green);

if (Physics.Raycast (thisTransform.position, vPoint.forward, hit0, VelClamp * 0.5, targetLayers)) {
     TurnAway = true;
 } else {
     TurnAway = false;
 }
 
 newRot = (thisTransform.forward * 0.8f + thisTransform.up * 0.1f).normalized;
 Debug.DrawRay (thisVTransform.position + thisVTransform.forward * 1, newRot * VelClamp, Color.blue);
if (Physics.Raycast (thisVTransform.position + thisVTransform.forward * 1, newRot, hit2, VelClamp, targetLayers))
     UpDist = hit2.distance;
     else
     UpDist = 60;

newRot = (thisTransform.forward * 0.8f + thisTransform.up * -0.1f).normalized;
Debug.DrawRay (thisVTransform.position + -thisVTransform.forward * 1, newRot * VelClamp, Color.red);
if (Physics.Raycast (thisVTransform.position + -thisVTransform.forward * 1, newRot, hit2, VelClamp, targetLayers))
	 DownDist = hit2.distance;
	 else
	 DownDist = 60;

Debug.DrawRay (thisVTransform.position + thisTransform.right * 2, vPoint.forward * VelClamp, Color.black);
if (Physics.Raycast (thisVTransform.position + thisTransform.right * 2, vPoint.forward, hit1, VelClamp, targetLayers))
     RightDist = hit1.distance;
     else
     RightDist = 60;

Debug.DrawRay (thisVTransform.position + -thisTransform.right * 2, vPoint.forward * VelClamp, Color.black);
if (Physics.Raycast (thisVTransform.position + -thisTransform.right * 2, vPoint.forward, hit1, VelClamp, targetLayers))
	 LeftDist = hit1.distance;
	 else
	 LeftDist = 60;
	 
	 if(RightDist != LeftDist)
	 if(TurnAway)
	 LeftDist = 1;
	 
Diff = Mathf.Abs(UpDist - DownDist);
 
 if(DownDist > UpDist){
     TurnDown = true;
     TurnUp = false;
     }
     
 if(UpDist > DownDist){
     TurnUp = true;
     TurnDown = false;
     }
     
if(Diff > 20){
TurnDown = false;
TurnUp = false;
}
     
 if(RightDist > LeftDist){
     TurnRight = true;
     TurnLeft = false;
     Obstacle = 8;
     }
     
 if(LeftDist > RightDist){
     TurnLeft = true;
     TurnRight = false;
     Obstacle = 8;
     }
     
 if(DownDist == UpDist){
    TurnDown = false;
    TurnUp = false;
    }
     
 if(RightDist == LeftDist){
    TurnRight = false;
    TurnLeft = false;
    }
     
}

function FixedUpdate () {

var localV = thisVTransform.InverseTransformDirection(vRigidbody.velocity);

var localAV = vPoint.InverseTransformDirection(vRigidbody.angularVelocity);

var AVModX = localAV.x;
var AVClampX = Mathf.Clamp(AVModX,-1,1);

var AVModY = localAV.y;
var AVClampY = Mathf.Clamp(AVModY,-1,1);

Vel = Mathf.Clamp(-localV.y * 2.24,4,256);

vRigidbody.AddTorque(vPoint.right * -AVClampX);
vRigidbody.AddTorque(vPoint.up * -AVClampY);

var AVModZ = localAV.z;
var AVClampZ = Mathf.Clamp(AVModZ,-1,1);

vRigidbody.AddTorque(vPoint.forward * -AVClampZ);

if(Vel < 230)
vRigidbody.AddForce(thisVTransform.up * -2);

if(TurnUp)
vRigidbody.AddTorque(-thisVTransform.right * 4);

if(TurnDown)
vRigidbody.AddTorque(thisVTransform.right * 4);

if(!TurnUp && !TurnDown){

if(Obstacle > 1){
if(Obstacle > 3)
vRigidbody.AddTorque(-thisVTransform.right * 4);
else
vRigidbody.AddTorque(-thisVTransform.right * 2);
}

}

if(TurnLeft && !TurnRight){
  vRigidbody.AddTorque(thisVTransform.forward * -3);
}

if(TurnRight && !TurnLeft){
  vRigidbody.AddTorque(thisVTransform.forward * 3);
}

vRigidbody.AddForceAtPosition(Vector3.up * StabForce, thisTransform.up * 2);
vRigidbody.AddForceAtPosition(-Vector3.up * StabForce, -thisTransform.up * 2);

vRigidbody.angularDrag = 4;

if(target){
if(!TurnLeft && !TurnRight && !TurnUp && !TurnDown){
if(Dist > 1024){
vRigidbody.AddForceAtPosition((target.position - thisTransform.position).normalized * -0.5, thisVTransform.up * 2);
vRigidbody.AddForceAtPosition((target.position - thisTransform.position).normalized * 0.5, -thisVTransform.up * 2);
}
}
}

}

function OnTriggerEnter (other : Collider) {
if(other != null){

ON = other.name;

if(ON.Contains ("TFC0a"))
PissedAtTC0a += 1;

if(ON.Contains ("TFC1"))
PissedAtTC1 += 1;

if(ON.Contains ("TFC4"))
PissedAtTC4 += 1;

if(ON.Contains ("TFC7"))
PissedAtTC7 += 1;

if(ON.Contains ("TFC8"))
PissedAtTC8 += 1;

if(ON.Contains ("TFC9"))
PissedAtTC9 += 1;

}
}

function OnTriggerStay (other : Collider) {

ON = other.name;
OT = other.transform;

if(other){
  
  if(PissedAtTC0a > 1)
  if(ON.Contains ("TC0a")){
  Attacking = true;
  Hunting = false;
  target = OT;
 }
  
  if(PissedAtTC1 > 1)
  if(ON.Contains ("TC1")){
  Attacking = true;
  Hunting = false;
  target = OT;
 }
  
  if(PissedAtTC4 > 1)
  if(ON.Contains ("TC4")){
  Attacking = true;
  Hunting = false;
  target = OT;
 }
 
  if(PissedAtTC5 > 1)
  if(!ON.Contains ("cT"))
  if(ON.Contains ("TC5")){
  Attacking = true;
  Hunting = false;
  target = OT;
 }
  
  if(PissedAtTC6 > 1)
  if(!ON.Contains ("cT"))
  if(ON.Contains ("TC6")){
  Attacking = true;
  Hunting = false;
  target = OT;
 }
  
  if(PissedAtTC7 > 1)
  if(!ON.Contains ("cT"))
  if(ON.Contains ("TC7")){
  Attacking = true;
  Hunting = false;
  target = OT;
 }
 
   if(PissedAtTC8 > 1)
  if(!ON.Contains ("cT"))
  if(ON.Contains ("TC8")){
  Attacking = true;
  Hunting = false;
  target = OT;
 }
 
   if(PissedAtTC9 > 1)
  if(!ON.Contains ("cT"))
  if(ON.Contains ("TC9")){
  Attacking = true;
  Hunting = false;
  target = OT;
 }
 
}
}

function Shooty () {
if(Attacking)
if(Gun)
Shoot();
}

function Shoot () {
yield WaitForSeconds (UniqueShootTime);
Gun.Fire();
}

function Updater () {

if(TerrahyptianNetwork.TC1CriminalLevel > 480)
PissedAtTC1 = 60;
if(TerrahyptianNetwork.TC5CriminalLevel > 480)
PissedAtTC5 = 60;
if(TerrahyptianNetwork.TC6CriminalLevel > 480)
PissedAtTC6 = 60;
if(TerrahyptianNetwork.TC7CriminalLevel > 480)
PissedAtTC7 = 60;
if(TerrahyptianNetwork.TC8CriminalLevel > 480)
PissedAtTC8 = 60;
if(TerrahyptianNetwork.TC9CriminalLevel > 480)
PissedAtTC9 = 60;

if(PissedAtTC0a > 1)
PissedAtTC0a -= 1;

if(PissedAtTC1 > 1)
PissedAtTC1 -= 1;

if(PissedAtTC4 > 1)
PissedAtTC4 -= 1;

if(PissedAtTC5 > 1)
PissedAtTC5 -= 1;

if(PissedAtTC6 > 1)
PissedAtTC6 -= 1;

if(PissedAtTC7 > 1)
PissedAtTC7 -= 1;

if(PissedAtTC8 > 1)
PissedAtTC8 -= 1;

if(PissedAtTC9 > 1)
PissedAtTC9 -= 1;

TurnRight = false;
TurnLeft = false;

if(target)
Dist = Vector3.Distance(thisTransform.position, target.position);


if(target){

if(Attacking){

if(TerrahyptianNetwork.TC1CriminalLevel > 480){

if(target.name.Contains ("C1")){
TerrahyptianNetwork.instance.EnemyTarget2 = target;
TerrahyptianNetwork.instance.PriorityWaypoint.position = target.position;
TerrahyptianNetwork.AlertTime = 240;
}

if(target.name.Contains ("C3")){
TerrahyptianNetwork.instance.EnemyTarget2 = target;
TerrahyptianNetwork.instance.PriorityWaypoint.position = target.position;
WorldInformation.PiriExposed = 10;
}
if(target.name.Contains ("C5"))
if(TerrahyptianNetwork.TC5CriminalLevel < 20){
TerrahyptianNetwork.instance.EnemyTarget2 = target;
TerrahyptianNetwork.instance.PriorityWaypoint.position = target.position;
if(TerrahyptianNetwork.UnitsPresent)
TerrahyptianNetwork.TC5CriminalLevel = 15;
}else{
TerrahyptianNetwork.instance.EnemyTarget2 = target;
TerrahyptianNetwork.instance.PriorityWaypoint.position = target.position;
}
if(target.name.Contains ("C6"))
if(TerrahyptianNetwork.TC6CriminalLevel < 20){
TerrahyptianNetwork.instance.EnemyTarget2 = target;
TerrahyptianNetwork.instance.PriorityWaypoint.position = target.position;
if(TerrahyptianNetwork.UnitsPresent)
TerrahyptianNetwork.TC6CriminalLevel = 15;
}else{
TerrahyptianNetwork.instance.EnemyTarget2 = target;
TerrahyptianNetwork.instance.PriorityWaypoint.position = target.position;
}
if(target.name.Contains ("C7"))
if(TerrahyptianNetwork.TC7CriminalLevel < 20){
TerrahyptianNetwork.instance.EnemyTarget2 = target;
TerrahyptianNetwork.instance.PriorityWaypoint.position = target.position;
if(TerrahyptianNetwork.UnitsPresent)
TerrahyptianNetwork.TC7CriminalLevel = 15;
}else{
TerrahyptianNetwork.instance.EnemyTarget2 = target;
TerrahyptianNetwork.instance.PriorityWaypoint.position = target.position;
}
if(target.name.Contains ("C8"))
if(TerrahyptianNetwork.TC8CriminalLevel < 20){
TerrahyptianNetwork.instance.EnemyTarget2 = target;
TerrahyptianNetwork.instance.PriorityWaypoint.position = target.position;
if(TerrahyptianNetwork.UnitsPresent)
TerrahyptianNetwork.TC8CriminalLevel = 15;
}else{
TerrahyptianNetwork.instance.EnemyTarget2 = target;
TerrahyptianNetwork.instance.PriorityWaypoint.position = target.position;
}
if(target.name.Contains ("C9"))
if(TerrahyptianNetwork.TC9CriminalLevel < 20){
TerrahyptianNetwork.instance.EnemyTarget2 = target;
TerrahyptianNetwork.instance.PriorityWaypoint.position = target.position;
if(TerrahyptianNetwork.UnitsPresent)
TerrahyptianNetwork.TC9CriminalLevel = 15;
}else{
TerrahyptianNetwork.instance.EnemyTarget2 = target;
TerrahyptianNetwork.instance.PriorityWaypoint.position = target.position;
}

}

if(TerrahyptianNetwork.TC1CriminalLevel > 480){
if(TerrahyptianNetwork.AnExtraBigTC1){
target = TerrahyptianNetwork.AnExtraBigTC1;
TerrahyptianNetwork.AlertTime = 240;
FoundExtraBig = true;
}
if(target.name.Contains ("C1"))
TerrahyptianNetwork.AlertLVL2 = 1;
}

if(TerrahyptianNetwork.TC4CriminalLevel > 480){
if(TerrahyptianNetwork.AnExtraBigTC4){
target = TerrahyptianNetwork.AnExtraBigTC4;
TerrahyptianNetwork.AlertTime = 240;
FoundExtraBig = true;
}
if(target.name.Contains ("C4"))
TerrahyptianNetwork.AlertLVL2 = 4;
}

if(TerrahyptianNetwork.TC5CriminalLevel > 480){
if(TerrahyptianNetwork.AnExtraBigTC5){
target = TerrahyptianNetwork.AnExtraBigTC5;
TerrahyptianNetwork.AlertTime = 240;
FoundExtraBig = true;
}
if(target.name.Contains ("C5"))
TerrahyptianNetwork.AlertLVL2 = 5;
}

if(TerrahyptianNetwork.TC6CriminalLevel > 480){
if(TerrahyptianNetwork.AnExtraBigTC6){
target = TerrahyptianNetwork.AnExtraBigTC6;
TerrahyptianNetwork.AlertTime = 240;
FoundExtraBig = true;
}
if(target.name.Contains ("C6"))
TerrahyptianNetwork.AlertLVL2 = 6;
}

if(TerrahyptianNetwork.TC7CriminalLevel > 480){
if(TerrahyptianNetwork.AnExtraBigTC7){
target = TerrahyptianNetwork.AnExtraBigTC7;
TerrahyptianNetwork.AlertTime = 240;
FoundExtraBig = true;
}
if(target.name.Contains ("C7"))
TerrahyptianNetwork.AlertLVL2 = 7;
}

if(TerrahyptianNetwork.TC8CriminalLevel > 480){
if(TerrahyptianNetwork.AnExtraBigTC8){
target = TerrahyptianNetwork.AnExtraBigTC8;
TerrahyptianNetwork.AlertTime = 240;
FoundExtraBig = true;
}
if(target.name.Contains ("C8"))
TerrahyptianNetwork.AlertLVL2 = 8;
}

if(TerrahyptianNetwork.TC9CriminalLevel > 480){
if(TerrahyptianNetwork.AnExtraBigTC9){
target = TerrahyptianNetwork.AnExtraBigTC9;
TerrahyptianNetwork.AlertTime = 240;
FoundExtraBig = true;
}
if(target.name.Contains ("C9"))
TerrahyptianNetwork.AlertLVL2 = 9;
}

if(target == ResetView){
Attacking = false;
target = ResetView;
FoundExtraBig = false;
}

if(target.name.Contains ("rok")){
Attacking = false;
target = ResetView;
FoundExtraBig = false;
}

Trig.center = Vector3(0,0,0);
Trig.radius = 128;

}else{

TrigSweep();

}

}else{
Attacking = false;
target = ResetView;
FoundExtraBig = false;
}

}

function TrigSweep(){
Trig.center = Vector3(0,-700,1000);
Trig.radius = 1000;
yield WaitForSeconds (0.12);
Trig.center = Vector3(700,-700,700);
yield WaitForSeconds (0.12);
Trig.center = Vector3(1000,-700,0);
yield WaitForSeconds (0.12);
Trig.center = Vector3(700,-700,-700);
yield WaitForSeconds (0.12);
Trig.center = Vector3(0,-700,-1000);
yield WaitForSeconds (0.12);
Trig.center = Vector3(-700,-700,-700);
yield WaitForSeconds (0.12);
Trig.center = Vector3(-1000,-700,0);
yield WaitForSeconds (0.12);
Trig.center = Vector3(-700,-700,700);
}