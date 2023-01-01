#pragma strict

var target : Transform;
var Waypoint : Transform;
var Presence : GameObject;
var Trig : SphereCollider;
var Gyro : StrongGyroStabilizerVehicle;
var Gun : NewgunController;
var Door : CarDoorController;

var VesselScript : MainVehicleController;

var RWingScript : PivotingHingeThrusterScript;
var LWingScript : PivotingHingeThrusterScript;

var thisTransform : Transform;
var thisRigidbody : Rigidbody;

var thisVTransform : Transform;
var thisVRigidbody : Rigidbody;

var readerTF : Transform;

var PissedAtTC2 = 0;
var PissedAtTC3 = 0;
var PissedAtTC4 = 0;
var PissedAtTC5 = 0;
var PissedAtTC6 = 0;
var PissedAtTC7 = 0;

static var IsActive : boolean;

var IsRunning : boolean;

var Following : boolean;
var Obstacle : boolean;
var Stuck : boolean;
var TargetTooClose : boolean;

var TurnRight : boolean;
var TurnLeft : boolean;

var targetLayers : LayerMask;
var TtargetLayers : LayerMask;

var ShotTimer : float = 0.25;

var Point1u : Vector3;
var Point1d : Vector3;

var JustNoticed = 0;
var OverPit = 0;

InvokeRepeating("Reader", 1, 0.15);

InvokeRepeating("Regenerator", 1, 0.5);

InvokeRepeating("LeaveMarker", 1, 10);

InvokeRepeating("Targety", 120, 120);

function Start (){

transform.parent = null;
IsActive = false;
IsRunning = false;
Following = true;
Waypoint = PlayerInformation.instance.Pirizuka;
target = Waypoint;

WorldInformation.PiriPodPresent = true;
}

function Update () {

if(IsActive){

if(target){

Debug.DrawRay (readerTF.position, Vector3.down * 48, Color.white);
if (!Physics.Raycast (readerTF.position, Vector3.down, 48, TtargetLayers))
OverPit = 1;

if(OverPit > 0){
OverPit -= 1;
thisVRigidbody.useGravity = false;
}else{
thisVRigidbody.useGravity = true;
}

var relativePoint = target.InverseTransformPoint(thisTransform.position);
if(-relativePoint.y > 0.5)
OverPit = 1;
}

if(!VesselScript.EngineOn){
VesselScript.Starting = true;
}else{
IsRunning = true;
VesselScript.Starting = false;
}

if(IsRunning){

var newRot2 : Vector3 = (thisRigidbody.velocity);
 
if(thisVRigidbody.velocity.magnitude > 20){

var newRot : Vector3 = (-thisVTransform.up * 0.6f + -thisVTransform.right * -0.4f).normalized;
Debug.DrawRay (thisVTransform.position + -thisVTransform.up * 2.5, newRot * 50f, Color.black);
if (Physics.Raycast (thisVTransform.position + -thisVTransform.up * 2.5, newRot, 50, targetLayers)) {
if(target != null)
if(Vector3.Distance(transform.position, target.position) > 5 && JustNoticed < 1)
     TurnLeft = true;
     
 } else {
     TurnLeft = false;
 }
 
newRot = (-thisVTransform.up * 0.6f + -thisVTransform.right * 0.4f).normalized;
Debug.DrawRay (thisVTransform.position + -thisVTransform.up * 2.5, newRot * 50f, Color.black);
if (Physics.Raycast (thisVTransform.position + -thisVTransform.up * 2.5, newRot, 50, targetLayers)) {
if(target != null)
if(Vector3.Distance(thisTransform.position, target.position) > 5 && JustNoticed < 1)
		TurnRight = true;
		
	} else {
        TurnRight = false;
 }
 
if(target){
if(Vector3.Distance(thisTransform.position, target.position) < 32)
TargetTooClose = true;
else
TargetTooClose = false;
}

if (Physics.Raycast (thisVTransform.position + -thisVTransform.up * 2.5, newRot2, 30, targetLayers)) {
Obstacle = true;
}else{
Obstacle = false;
}
 
}else{

newRot = (-thisVTransform.up * 0.6f + -thisVTransform.right * -0.4f).normalized;
Debug.DrawRay (thisVTransform.position + -thisVTransform.up * 2.5, newRot * 10f, Color.black);
if (Physics.Raycast (thisVTransform.position + -thisVTransform.up * 2.5, newRot, 10, targetLayers)) {
if(target != null)
if(Vector3.Distance(thisTransform.position, target.position) > 5 && JustNoticed < 1)
     TurnLeft = true;
     
 } else {
     TurnLeft = false;
 }
 
newRot = (-thisVTransform.up * 0.6f + -thisVTransform.right * 0.4f).normalized;
Debug.DrawRay (thisVTransform.position + -thisVTransform.up * 2.5, newRot * 10f, Color.black);
if (Physics.Raycast (thisVTransform.position + -thisVTransform.up * 2.5, newRot, 10, targetLayers)) {
if(target != null)
if(Vector3.Distance(thisTransform.position, target.position) > 5 && JustNoticed < 1)
		TurnRight = true;
		
	} else {
        TurnRight = false;
 }

if(target){
if(Vector3.Distance(thisTransform.position, target.position) < 8)
TargetTooClose = true;
else
TargetTooClose = false;
}


if (Physics.Raycast (thisVTransform.position + -thisVTransform.up * 2.5, newRot2, 15, targetLayers)) {
if(JustNoticed < 1)
Obstacle = true;
if(JustNoticed > 0)
Obstacle = false;
}else{
Obstacle = false;
}


}


RWingScript.RunningW = !Obstacle;
LWingScript.RunningW = !Obstacle;

RWingScript.RunningA = TurnLeft;
LWingScript.RunningA = TurnLeft;

RWingScript.RunningD = TurnRight;
LWingScript.RunningD = TurnRight;

RWingScript.RunningS = Obstacle;
LWingScript.RunningS = Obstacle;

}
}else{
IsRunning = false;
}
}


private var NewRotation : Quaternion;
function FixedUpdate () {

if(IsRunning){

var newRot2 : Vector3 = (thisRigidbody.velocity);

var localV = thisTransform.InverseTransformDirection(thisRigidbody.velocity);

if(OverPit > 0)
  thisVRigidbody.AddForce(thisVTransform.forward * 14);


if(Obstacle && !Stuck){

  if(localV.z > 0){
  if(localV.z > 20)
  thisVRigidbody.AddForce(newRot2 * -8);
  if(localV.z < 20)
  thisVRigidbody.AddForce(newRot2 * -4);
  }

}

if(TargetTooClose)
if(localV.z > 0)
  thisVRigidbody.AddForce(thisVTransform.up * 40);

if(Stuck){
  if(-localV.z < 5)
  thisVRigidbody.AddForce(thisVTransform.up * 40);
}

if(!Obstacle && !Stuck && !TurnLeft && !TurnRight && !TargetTooClose) {
if(Vector3.Distance(thisTransform.position, target.position) > 50)
  thisVRigidbody.AddForce(thisVTransform.up * -60);
  else
  thisVRigidbody.AddForce(thisVTransform.up * -20);
  
  Gyro.force = 10;
}

if(TurnLeft){
thisVRigidbody.AddTorque(thisVTransform.forward * -50);
if(localV.z > 8)
thisVRigidbody.AddForce(thisVTransform.up * 20);
}

if(TurnRight){
thisVRigidbody.AddTorque(thisVTransform.forward * 50);
if(localV.z > 8)
thisVRigidbody.AddForce(thisVTransform.up * 20);
}

if(TurnLeft && TurnRight){
thisVRigidbody.AddTorque(thisVTransform.forward * -50);
}

//----------------------------------------------------------------------------------------------------------------------

 if (target) {
 if(TurnLeft || TurnRight){
  thisRigidbody.freezeRotation = false;
  }
 if(!TurnLeft && !TurnRight){
  thisRigidbody.freezeRotation = true;
  }
  NewRotation = Quaternion.LookRotation(target.position - thisTransform.position);
  if(!TargetTooClose)
  thisTransform.rotation = Quaternion.RotateTowards(thisTransform.rotation, NewRotation, Time.deltaTime * 200);
 }
}
}

function Targety () {
TargetArea();
}

function TargetArea () {
if(IsRunning){
target = Waypoint;
Following = true;
}
}

function LeaveMarker () {
if(IsRunning){

Trig.radius = 200;

var lastPos : Vector3 = thisTransform.position;
IsEscaping(lastPos);
}
}

function IsEscaping(lastPos : Vector3){
if(IsRunning && !TargetTooClose){
Stuck = false;
yield WaitForSeconds (2);

  if(Vector3.Distance(thisTransform.position, lastPos) < 1){
  Stuck = true;
  yield WaitForSeconds (2);
  Stuck = false;
  }
}
}

function Regenerator () {

if(CallAssistance.IsSnynsing)
IsActive = true;

if(!Presence)
Destroy(gameObject);

if(!IsRunning){
thisRigidbody.freezeRotation = false;
if(Presence)
Presence.SetActive (false);
}

if(IsRunning){
if(target)
if (!Physics.Linecast (thisTransform.position, target.position, TtargetLayers)){
TurnRight = false;
TurnLeft = false;
JustNoticed = 1;
}

if(JustNoticed > 0)
JustNoticed -= 1;

Presence.SetActive (true);

}
}

function Reader () {

if(target)
readerTF.LookAt(target);

var hit1 : RaycastHit;
var hit2 : RaycastHit;

Debug.DrawRay (readerTF.position + readerTF.up * 0.5, readerTF.forward * 50f, Color.white);
if (Physics.Raycast (readerTF.position + readerTF.up * 0.5, readerTF.forward, hit1, 50, TtargetLayers))
Point1u = hit1.point;

Debug.DrawRay (readerTF.position + -readerTF.up * 0.5, readerTF.forward * 50f, Color.white);
if (Physics.Raycast (readerTF.position + -readerTF.up * 0.5, readerTF.forward, hit2, 50, TtargetLayers))
Point1d = hit2.point;

if(Vector3.Distance(Point1u, Point1d) > 2)
JustNoticed = 1;
}