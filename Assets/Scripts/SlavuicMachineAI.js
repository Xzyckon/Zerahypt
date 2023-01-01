var target : Transform;
var ResetView : Transform;
var AssignedTarget : Transform;
var MemorizedTarget : Transform;

var Home : Transform;

var Trig : SphereCollider;
var Hull : VehicleDamage;

var NpcController : RemoveOverTime;

var hullCol : MeshCollider;

var thisTransform : Transform;
var thisVTransform : Transform;

var vRigidbody : Rigidbody;

var vPoint : Transform;

var TargetTrace : Transform;
var TargetLead : Transform;
var TLCol : SphereCollider;

var Satnik : boolean;

var Strelnik : boolean;

var Smertnik : boolean;

var Baseless : boolean;

var Muzzle : Transform;

var Explosion : GameObject;

var Shot : GameObject;

var Gun : NPCGun;

var AttackSound : AudioSource;

var PissedAtTC0a = 0;
var PissedAtTC1 = 0;
var PissedAtTC3 = 0;
var PissedAtTC4 = 0;
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

var ObsDist = 1000;

var Dist : float = 1000;

var StabForce : float = 2;

var Diff : float = 2;

var RD : float = 1;

var Vel : float = 0;

var RelTarg : Vector3;

var TurnRight : boolean;
var TurnLeft : boolean;

var TurnUp : boolean;
var TurnDown : boolean;

var TurnAwayBlyat : boolean;

var Obstacle = 0;

var Hunting : boolean;
var Suspicious = 0;

var Approach : boolean;

var Aim : boolean;

var targetLayers : LayerMask;

var UniqueShootTime : float = 0.1;

InvokeRepeating("Updater", 1, 1);

InvokeRepeating("Shooty", UniqueShootTime, 0.1);

InvokeRepeating("CalcLead", 1, 0.15);

function Start (){

if(Strelnik){
Suspicious = 6;
Approach = true;
}

vRigidbody.useGravity = false;
UniqueShootTime = Random.Range(1, 2);

yield WaitForSeconds (0.3);

if(!Smertnik)
vRigidbody.useGravity = true;

hullCol.enabled = true;
Hunting = true;

yield WaitForSeconds (0.2);

vRigidbody.centerOfMass = Vector3(0, 0, 0);

}

function Update () {

var VelClamp = Mathf.Clamp(Vel,20,80);

if(!Smertnik){

var newRot2 : Vector3;

//var newRot2 : Vector3 = (vRigidbody.velocity);

//if(Vel < 25)
newRot2 = -thisVTransform.up;

vPoint.rotation = Quaternion.LookRotation(newRot2);

var newRot : Vector3 = (-thisVTransform.up).normalized;
var hit0 : RaycastHit;
var hit1 : RaycastHit;
var hit2 : RaycastHit;

if(target)
Dist = Vector3.Distance(thisTransform.position, target.position);
	
newRot = (-thisVTransform.up * 1f + -thisVTransform.forward * 1f).normalized;

if(Vel > 64){
Debug.DrawRay (thisVTransform.position, newRot * ObsDist, Color.white);
if (Physics.Raycast (thisVTransform.position, newRot, hit0, ObsDist, targetLayers)) {
if(ObsDist > 500){
if(hit0.distance < 800)
Obstacle = 4;
else
Obstacle = 2;
}else{
if(hit0.distance < 100){

if(hit0.distance < 20)
Obstacle = 8;
else
Obstacle = 4;

}else{
Obstacle = 2;
}
}
}else{
Obstacle = 0;
}
}else{
if(hit0.distance < 4)
Obstacle = 16;
else
Obstacle = 0;
}

Debug.DrawRay (thisTransform.position, vPoint.forward * VelClamp * 0.5, Color.green);

if (Physics.Raycast (thisTransform.position, vPoint.forward, hit0, VelClamp * 0.5, targetLayers)) {
     TurnAwayBlyat = true;
 } else {
     TurnAwayBlyat = false;
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
 
 }else{
 
 //RelTarg = thisTransform.InverseTransformPoint(target.position);
 
 VelClamp = Mathf.Clamp(Vel,6,200);
 
newRot = (thisTransform.forward * 0.4f + thisTransform.up * 0.1f).normalized;
  Debug.DrawRay (thisVTransform.position + thisVTransform.up * 1 + thisVTransform.forward * 0.5, newRot * 6, Color.blue);
if (Physics.Raycast (thisVTransform.position + thisVTransform.up * 1 + thisVTransform.forward * 0.5, newRot, hit2, 6, targetLayers))
     UpDist = hit2.distance;
     else
     UpDist = 60;

newRot = (thisTransform.forward * 0.4f + thisTransform.up * -0.1f).normalized;
Debug.DrawRay (thisVTransform.position + thisVTransform.up * 1 + -thisVTransform.forward * 0.5, newRot * 6, Color.red);
if (Physics.Raycast (thisVTransform.position + thisVTransform.up * 1 + -thisVTransform.forward * 0.5, newRot, hit2, 6, targetLayers))
	 DownDist = hit2.distance;
	 else
	 DownDist = 60;
	 
newRot = (thisTransform.forward * 0.4f + thisTransform.right * 0.1f).normalized;
Debug.DrawRay (thisVTransform.position + thisVTransform.up * 1 + thisTransform.right * 0.5, newRot * 6, Color.black);
if (Physics.Raycast (thisVTransform.position + thisVTransform.up * 1 + thisTransform.right * 0.5, newRot, hit1, 6, targetLayers))
     RightDist = hit1.distance;
     else
     RightDist = 60;

newRot = (thisTransform.forward * 0.4f + thisTransform.right * -0.1f).normalized;
Debug.DrawRay (thisVTransform.position + thisVTransform.up * 1 + -thisTransform.right * 0.5, newRot * 6, Color.black);
if (Physics.Raycast (thisVTransform.position + thisVTransform.up * 1 + -thisTransform.right * 0.5, newRot, hit1, 6, targetLayers))
	 LeftDist = hit1.distance;
	 else
	 LeftDist = 60;
 
 }
	 
	 if(RightDist != LeftDist)
	 if(TurnAwayBlyat)
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
     
if(Diff > 20 && !Smertnik){
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

Vel = -localV.y * 2.24;

vRigidbody.AddTorque(vPoint.right * -AVClampX);
vRigidbody.AddTorque(vPoint.up * -AVClampY);

if(!Smertnik){

var AVModZ = localAV.z;
var AVClampZ = Mathf.Clamp(AVModZ,-1,1);

vRigidbody.AddTorque(vPoint.forward * -AVClampZ);

if(!Strelnik){

ObsDist = 1000;
if(Vel < 200)
vRigidbody.AddForce(thisVTransform.up * -1);

}else{

ObsDist = 300;
if(!Approach){
if(Vel < 200)
vRigidbody.AddForce(thisVTransform.up * -2);
}else{
if(Vel < 150)
vRigidbody.AddForce(thisVTransform.up * -1);
}

}






if(TurnUp)
vRigidbody.AddTorque(-thisVTransform.right * 4);

if(TurnDown)
vRigidbody.AddTorque(thisVTransform.right * 4);

if(!TurnUp && !TurnDown){

if(!Satnik){

if(vRigidbody.angularVelocity.magnitude < 1){
if(!Aim){

if(Obstacle > 1){
if(Obstacle > 3)
vRigidbody.AddTorque(-thisVTransform.right * 2);
else
vRigidbody.AddTorque(-thisVTransform.right * 1);
}

}else{

if(Obstacle > 4){
if(Vel > 40)
vRigidbody.AddTorque(-thisVTransform.right * 4);
else
vRigidbody.AddTorque(-thisVTransform.right * 2);
}

if(Vel > 130)
vRigidbody.AddTorque(-thisVTransform.right * Dist * 0.0007);

}
}else{
if(Obstacle > 1)
vRigidbody.AddTorque(-thisVTransform.right * 1);
}

}else{

if(Obstacle > 1)
if(vRigidbody.angularVelocity.magnitude < 1)
vRigidbody.AddTorque(-thisVTransform.right * 1);

}
}












if(TurnLeft && !TurnRight){
  vRigidbody.AddTorque(thisVTransform.forward * -2);
}

if(TurnRight && !TurnLeft){
  vRigidbody.AddTorque(thisVTransform.forward * 2);
}

if(!Strelnik){
vRigidbody.AddForceAtPosition(Vector3.up * StabForce, thisTransform.up * 2);
vRigidbody.AddForceAtPosition(-Vector3.up * StabForce, -thisTransform.up * 2);

}else{

if(Approach){
if(Dist < 100 || Dist > 500){
vRigidbody.AddForceAtPosition(Vector3.up * StabForce, thisTransform.up * 2);
vRigidbody.AddForceAtPosition(-Vector3.up * StabForce, -thisTransform.up * 2);

if(Dist < 100)
Approach = false;

}else{
Aim = true;
}

if(Obstacle < 5){
vRigidbody.angularDrag = 16;
}else{
vRigidbody.angularDrag = 2;
Approach = false;
}

}else{

vRigidbody.AddForceAtPosition(Vector3.up * StabForce, thisTransform.up * 2);
vRigidbody.AddForceAtPosition(-Vector3.up * StabForce, -thisTransform.up * 2);

if(Dist > 600)
Approach = true;

Aim = false;
vRigidbody.angularDrag = 2;
}
}

if(target){

if(!TurnLeft && !TurnRight && !TurnUp && !TurnDown){

if(!Strelnik){
vRigidbody.AddForceAtPosition((target.position - thisTransform.position).normalized * -0.2, thisVTransform.up * 2);
vRigidbody.AddForceAtPosition((target.position - thisTransform.position).normalized * 0.2, -thisVTransform.up * 2);
}else{
if(vRigidbody.angularVelocity.magnitude < 1){
if(Obstacle > 6){
if(Vel > 40){
vRigidbody.AddForceAtPosition((target.position - thisTransform.position).normalized * -0.2, thisVTransform.up * 2);
vRigidbody.AddForceAtPosition((target.position - thisTransform.position).normalized * 0.2, -thisVTransform.up * 2);
}else{
vRigidbody.AddForceAtPosition((TargetLead.position - thisTransform.position).normalized * -2, thisVTransform.up * 2);
vRigidbody.AddForceAtPosition((TargetLead.position - thisTransform.position).normalized * 2, -thisVTransform.up * 2);
}
}else{
if(Approach){
if(!Aim){
vRigidbody.AddForceAtPosition((TargetLead.position - thisTransform.position).normalized * -2, thisVTransform.up * 2);
vRigidbody.AddForceAtPosition((TargetLead.position - thisTransform.position).normalized * 2, -thisVTransform.up * 2);
}else{
vRigidbody.AddForceAtPosition((TargetLead.position - thisTransform.position).normalized * -4, thisVTransform.up * 2);
vRigidbody.AddForceAtPosition((TargetLead.position - thisTransform.position).normalized * 4, -thisVTransform.up * 2);
}
}else{
if(Suspicious < 4){
vRigidbody.AddForceAtPosition((target.position - thisTransform.position).normalized * -0.2, thisVTransform.up * 2);
vRigidbody.AddForceAtPosition((target.position - thisTransform.position).normalized * 0.2, -thisVTransform.up * 2);
}
}
}
}else{
vRigidbody.AddForceAtPosition((target.position - thisTransform.position).normalized * -0.2, thisVTransform.up * 2);
vRigidbody.AddForceAtPosition((target.position - thisTransform.position).normalized * 0.2, -thisVTransform.up * 2);
}
}

}

}
}else{

var VClamp = Mathf.Clamp(Vel,2,8);

Debug.DrawRay (vPoint.position + vPoint.right * 0.4, vPoint.forward * VClamp, Color.red);
Debug.DrawRay (vPoint.position + -vPoint.right * 0.4, vPoint.forward * VClamp, Color.red);
if (Physics.Raycast (vPoint.position + vPoint.right * 0.4, vPoint.forward, VClamp, targetLayers)
|| Physics.Raycast (vPoint.position + -vPoint.right * 0.4, vPoint.forward, VClamp, targetLayers)){
Obstacle = 1;
}else{
Obstacle = 0;
vPoint.Rotate(0,0,10);
}

if(localV.z < 0)
RD = Mathf.Abs(localV.z);
else
RD = 0;

if(Physics.Raycast (thisTransform.position, Vector3.down, 2 + RD, targetLayers)){
vRigidbody.AddForce(Vector3.up * 0.2);
}else{
if(!Physics.Raycast (thisTransform.position, Vector3.down, 10 + RD, targetLayers))
vRigidbody.AddForce(Vector3.up * -0.05);
}

vRigidbody.AddForceAtPosition(Vector3.up * StabForce, thisTransform.up * 1);
vRigidbody.AddForceAtPosition(-Vector3.up * StabForce, -thisTransform.up * 1);

if(target){
if(Obstacle == 0){
if(!TurnLeft && !TurnRight && !TurnUp && !TurnDown){

vRigidbody.AddForceAtPosition((target.position - thisTransform.position).normalized * -4, thisVTransform.up * 0.5);
vRigidbody.AddForceAtPosition((target.position - thisTransform.position).normalized * 4, -thisVTransform.up * 0.5);

if(Vel < 20){
if(Vector3.Distance(thisTransform.position, target.position) < 32)
vRigidbody.AddForce(thisVTransform.up * -0.15);
else
vRigidbody.AddForce(thisVTransform.up * -0.1);
}
}else{
if(Vel < 8)
vRigidbody.AddForce(thisVTransform.up * -0.15);
else
vRigidbody.AddForce(thisVTransform.up * 0.3);
}
}else{
vRigidbody.AddForce(thisVTransform.up * 0.2);
}
}

if(TurnLeft && !TurnRight)
  vRigidbody.AddTorque(thisVTransform.forward * -6);

if(TurnRight && !TurnLeft)
  vRigidbody.AddTorque(thisVTransform.forward * 6);

if(TurnUp && !TurnDown)
vRigidbody.AddTorque(thisVTransform.right * -6);

if(TurnDown && !TurnUp)
vRigidbody.AddTorque(thisVTransform.right * 6);


}
}

function OnTriggerEnter (other : Collider) {
if(other != null){

ON = other.name;

if(!Smertnik){

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

}else{
if(ON.Contains ("TFC"))
if(Vector3.Distance(thisTransform.position, target.position) < 16){
Instantiate(Explosion, thisTransform.position, thisTransform.rotation);
NpcController.Removal();
}
}

}
}

function OnTriggerStay (other : Collider) {

ON = other.name;
OT = other.transform;

if(other != null && !Strelnik  && !Smertnik){
  
  if(PissedAtTC0a > 1)
  if(ON.Contains ("TC0a")){
  Hunting = false;
  Suspicious = 6;
  target = OT;
 }
  
  if(PissedAtTC1 > 1)
  if(ON.Contains ("TC1")){
  Hunting = false;
  Suspicious = 6;
  target = OT;
 }
 
 if(PissedAtTC3 > 1)
  if(!ON.Contains ("cT"))
  if(ON.Contains ("TC3")){
  Hunting = false;
  Suspicious = 6;
  target = OT;
 }
  
  if(PissedAtTC4 > 1)
  if(ON.Contains ("TC4")){
  Hunting = false;
  Suspicious = 6;
  target = OT;
 }
  
  if(PissedAtTC6 > 1)
  if(!ON.Contains ("cT"))
  if(ON.Contains ("TC6")){
  Hunting = false;
  Suspicious = 6;
  target = OT;
 }
  
  if(PissedAtTC7 > 1)
  if(!ON.Contains ("cT"))
  if(ON.Contains ("TC7")){
  Hunting = false;
  Suspicious = 6;
  target = OT;
 }
 
  if(PissedAtTC8 > 1)
  if(!ON.Contains ("cT"))
  if(ON.Contains ("TC8")){
  Hunting = false;
  Suspicious = 6;
  target = OT;
 }
 
   if(PissedAtTC9 > 1)
  if(!ON.Contains ("cT"))
  if(ON.Contains ("TC9")){
  Hunting = false;
  Suspicious = 6;
  target = OT;
 }
 
}
}

function Shooty () {
if(Strelnik)
Shoot();
if(Smertnik){
if(Vector3.Distance(thisTransform.position, target.position) < 6){
Instantiate(Explosion, thisTransform.position, thisTransform.rotation);
NpcController.Removal();
}
}
}

function Shoot () {
if(Suspicious > 1){
yield WaitForSeconds (UniqueShootTime);
Gun.Fire();
}
}

function CalcLead () {
if(Strelnik)
Lead();
}

function Lead (){

if(target)
TargetTrace.position = target.position;

yield WaitForSeconds (0.1);

if(target){

var Dist2 = Vector3.Distance(TargetTrace.position, target.position);

var TargetRelCalc = thisTransform.InverseTransformPoint(TargetLead.position);
var RorL = Mathf.Abs(TargetRelCalc.x);

if(RorL < 4){
//Debug.Log("Heading Straight");
LeadAmount = 0.04;
}else{
//Debug.Log("Heading Sideways");
LeadAmount = 0.04;
}

TargetTrace.LookAt(target);

TargetLead.position = TargetTrace.position;
TargetLead.rotation = TargetTrace.rotation;

TargetLead.position += TargetLead.forward * Dist * Dist2 * LeadAmount;

if(Suspicious > 1)
TLCol.radius = Vector3.Distance(thisTransform.position, target.position) * 0.03;
else
TLCol.radius = 0.1;

}
}

function Updater () {

if(!Smertnik){

if(PissedAtTC0a > 0)
PissedAtTC0a -= 1;

if(PissedAtTC1 > 0)
PissedAtTC1 -= 1;
if(PissedAtTC4 > 0)
PissedAtTC4 -= 1;
if(PissedAtTC7 > 0)
PissedAtTC7 -= 1;
if(PissedAtTC8 > 0)
PissedAtTC8 -= 1;
if(PissedAtTC9 > 0)
PissedAtTC9 -= 1;

if(PissedAtTC1 > 2){
if(SlavuicNetwork.TC1DeathRow < 240)
SlavuicNetwork.TC1DeathRow = 240;
PissedAtTC1 = 8;
}
if(PissedAtTC4 > 2){
SlavuicNetwork.TC4DeathRow = 240;
PissedAtTC4 = 8;
}
if(PissedAtTC7 > 2){
SlavuicNetwork.TC7DeathRow = 240;
PissedAtTC7 = 8;
}
if(PissedAtTC8 > 2){
SlavuicNetwork.TC8DeathRow = 240;
PissedAtTC8 = 8;
}
if(PissedAtTC9 > 2){
SlavuicNetwork.TC9DeathRow = 240;
PissedAtTC9 = 8;
}

if(!Strelnik){

if(SlavuicNetwork.TC0aDeathRow > 0){

if(SlavuicNetwork.target){
if(AssignedTarget)
if(!AssignedTarget.name.Contains ("TC0a"))
MemorizedTarget = AssignedTarget;
AssignedTarget = SlavuicNetwork.target;
}

if(AssignedTarget)
if(Vector3.Distance(thisTransform.position, AssignedTarget.position) < 3000)
if(AssignedTarget.name.Contains ("TC0a")){
SlavuicNetwork.Confirmed = true;
MemorizedTarget = AssignedTarget;
target = AssignedTarget;
}

if(MemorizedTarget)
if(Vector3.Distance(thisTransform.position, MemorizedTarget.position) < 3000)
if(MemorizedTarget.name.Contains ("TC0a")){
SlavuicNetwork.Confirmed = true;
target = MemorizedTarget;
}

if(target){
if(target.name.Contains ("TC0a"))
SlavuicNetwork.instance.PriorityWaypoint.position = target.position;
else
target = SlavuicNetwork.instance.PriorityWaypoint;
}else{
target = SlavuicNetwork.instance.PriorityWaypoint;
}

Suspicious = 6;
PissedAtTC0a = 6;
Hunting = false;
}

if(SlavuicNetwork.TC1DeathRow > 0){

if(SlavuicNetwork.target){
if(AssignedTarget)
if(!AssignedTarget.name.Contains ("TC1"))
MemorizedTarget = AssignedTarget;
AssignedTarget = SlavuicNetwork.target;
}

if(AssignedTarget)
if(Vector3.Distance(thisTransform.position, AssignedTarget.position) < 3000)
if(AssignedTarget.name.Contains ("TC1")){
SlavuicNetwork.Confirmed = true;
MemorizedTarget = AssignedTarget;
target = AssignedTarget;
}

if(MemorizedTarget)
if(Vector3.Distance(thisTransform.position, MemorizedTarget.position) < 3000)
if(MemorizedTarget.name.Contains ("TC1")){
SlavuicNetwork.Confirmed = true;
target = MemorizedTarget;
}

if(target){
if(target.name.Contains ("TC1"))
SlavuicNetwork.instance.PriorityWaypoint.position = target.position;
else
target = SlavuicNetwork.instance.PriorityWaypoint;

if(target.name.Contains ("xb")){
SlavuicNetwork.FoundExtraBig = target;
SlavuicNetwork.instance.PriorityWaypoint.position = target.position;
}

}else{
target = SlavuicNetwork.instance.PriorityWaypoint;
}

Suspicious = 6;
PissedAtTC1 = 6;
Hunting = false;
}

if(SlavuicNetwork.TC7DeathRow > 0){

if(SlavuicNetwork.target){
if(AssignedTarget)
if(!AssignedTarget.name.Contains ("TC7"))
MemorizedTarget = AssignedTarget;
AssignedTarget = SlavuicNetwork.target;
}

if(AssignedTarget)
if(Vector3.Distance(thisTransform.position, AssignedTarget.position) < 3000)
if(AssignedTarget.name.Contains ("TC7")){
SlavuicNetwork.Confirmed = true;
MemorizedTarget = AssignedTarget;
target = AssignedTarget;
}

if(MemorizedTarget)
if(Vector3.Distance(thisTransform.position, MemorizedTarget.position) < 3000)
if(MemorizedTarget.name.Contains ("TC7")){
SlavuicNetwork.Confirmed = true;
target = MemorizedTarget;
}

if(target){
if(target.name.Contains ("TC7"))
SlavuicNetwork.instance.PriorityWaypoint.position = target.position;
else
target = SlavuicNetwork.instance.PriorityWaypoint;
}else{
target = SlavuicNetwork.instance.PriorityWaypoint;
}

Suspicious = 6;
PissedAtTC7 = 6;
Hunting = false;
}

if(SlavuicNetwork.TC8DeathRow > 0){

if(SlavuicNetwork.target){
if(AssignedTarget)
if(!AssignedTarget.name.Contains ("TC8"))
MemorizedTarget = AssignedTarget;
AssignedTarget = SlavuicNetwork.target;
}

if(AssignedTarget)
if(Vector3.Distance(thisTransform.position, AssignedTarget.position) < 3000)
if(AssignedTarget.name.Contains ("TC8")){
SlavuicNetwork.Confirmed = true;
MemorizedTarget = AssignedTarget;
target = AssignedTarget;
}

if(MemorizedTarget)
if(Vector3.Distance(thisTransform.position, MemorizedTarget.position) < 3000)
if(MemorizedTarget.name.Contains ("TC8")){
SlavuicNetwork.Confirmed = true;
target = MemorizedTarget;
}

if(target){
if(target.name.Contains ("TC8"))
SlavuicNetwork.instance.PriorityWaypoint.position = target.position;
else
target = SlavuicNetwork.instance.PriorityWaypoint;
}else{
target = SlavuicNetwork.instance.PriorityWaypoint;
}

Suspicious = 6;
PissedAtTC8 = 6;
Hunting = false;
}

if(SlavuicNetwork.TC9DeathRow > 0){

if(SlavuicNetwork.target){
if(AssignedTarget)
if(!AssignedTarget.name.Contains ("TC9"))
MemorizedTarget = AssignedTarget;
AssignedTarget = SlavuicNetwork.target;
}

if(AssignedTarget)
if(Vector3.Distance(thisTransform.position, AssignedTarget.position) < 3000)
if(AssignedTarget.name.Contains ("TC9")){
SlavuicNetwork.Confirmed = true;
MemorizedTarget = AssignedTarget;
target = AssignedTarget;
}

if(MemorizedTarget)
if(Vector3.Distance(thisTransform.position, MemorizedTarget.position) < 3000)
if(MemorizedTarget.name.Contains ("TC9")){
SlavuicNetwork.Confirmed = true;
target = MemorizedTarget;
}

if(target){
if(target.name.Contains ("TC9"))
SlavuicNetwork.instance.PriorityWaypoint.position = target.position;
else
target = SlavuicNetwork.instance.PriorityWaypoint;
}else{
target = SlavuicNetwork.instance.PriorityWaypoint;
}

Suspicious = 6;
PissedAtTC9 = 6;
Hunting = false;
}

if(Vector3.Distance(thisTransform.position, SlavuicNetwork.instance.transform.position) > 6000){
target = SlavuicNetwork.instance.transform;
}else{

if(Suspicious > 0){
if(MemorizedTarget)
target = MemorizedTarget;

if(target)
Suspicious -= 1;

}else{
target = ResetView;
Hunting = true;
}

if(MemorizedTarget)
if(Vector3.Distance(thisTransform.position, MemorizedTarget.position) > 1000)
target = MemorizedTarget;
}

}else{

if(Suspicious > 0){

if(target){
if(!target.name.Contains ("TC"))
Suspicious -= 1;
}else{
Suspicious -= 1;
}

}else{

target = ResetView;
Hunting = true;
}

if(!Home){
Home = SlavuicNetwork.instance.transform;
Baseless = true;
}

if(target){
if(Suspicious < 1 || !target.name.Contains ("TC")){

if(Baseless)
AssignedTarget = SlavuicNetwork.target;

if(AssignedTarget){

if(AssignedTarget.name.Contains ("TC")){
if(Vector3.Distance(thisTransform.position, AssignedTarget.position) < 2000){
Suspicious = 6;
if(AssignedTarget)
target = AssignedTarget;
}else{
target = Home;
}
}else{
if(Vector3.Distance(thisTransform.position, Home.position) > 1000)
target = Home;
}

}else{
if(Vector3.Distance(thisTransform.position, Home.position) > 1000)
target = Home;
}

}

if(AssignedTarget)
if(!AssignedTarget.name.Contains ("sTC") && target.name.Contains ("sTC")){
Suspicious = 6;
target = AssignedTarget;
}

}else{
if(Vector3.Distance(thisTransform.position, Home.position) > 1000)
target = Home;
}

}

TurnAwayBlyat = false;

}else{

if(SlavuicNetwork.TC1DeathRow > 0)
target = PlayerInformation.instance.PiriTarget;

}

if(Satnik || Smertnik)
if(AttackSound)
if(AttackSound.enabled)
if(!AttackSound.isPlaying)
AttackSound.Play();

Obstacle = 0;

}