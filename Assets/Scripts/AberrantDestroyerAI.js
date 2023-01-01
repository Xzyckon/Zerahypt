var target : Transform;
var Waypoint : Transform;
var Waypoint2 : Transform;
var AberrantGun1 : NPCGun;
var AberrantTurretGun1 : NPCGun;
var Rotator : BigVesselRotator;
var Trig : CapsuleCollider;

var IsMercenary : boolean;

var DroneCounter = 0;

var DronePrefab : GameObject;

var DroneArea : Transform;

var DroneAreaAudio : AudioSource;

var AberrantPresence : GameObject;

var thisTransform : Transform;
var thisVTransform : Transform;

var vRigidbody : Rigidbody;

var HuntingSound : GameObject;
var SpotSound : GameObject;
var AttackSound : GameObject;
var RejectSound : GameObject;

var PissedAtTC0a : boolean;
var PissedAtTC1 : boolean;
var PissedAtTC3 : boolean;
var PissedAtTC5 : boolean;
var PissedAtTC6 : boolean;
var PissedAtTC7 : boolean;
var PissedAtTC8 : boolean;
var PissedAtTC9 : boolean;


var Hunting : boolean;
var Spot : boolean = true;
var TargetIsMoving : boolean;
var Attacking : boolean;
var Obstacle : boolean = false;
var Stuck : boolean = false;

var FoundBig : boolean;
var FoundSmall : boolean;

var SlowingDown : boolean;
var TurnRight : boolean;
var TurnLeft : boolean;

var TurnForce : float = 1;

var DangerSense : boolean;
var DangerDirection : Vector3;

var targetLayers : LayerMask;

var MtargetLayers : LayerMask;

var JustNoticed = 0;
var Suspicion = 0;

var TargetStill = 0;

var ShootFrequency : float = 5;

var Tick : boolean;

InvokeRepeating("Regenerator", 1, 1);

InvokeRepeating("Bothered", 1, 0.3);

InvokeRepeating("LeaveMarker", 1, 3);

InvokeRepeating("Warning", 1, Random.Range(29, 31));

InvokeRepeating("Targety", 300, 300);

InvokeRepeating("Shooty", 1, ShootFrequency);

function Start (){
if(!IsMercenary){
yield WaitForSeconds (5);
IssuedDrone = Instantiate(DronePrefab, DroneArea.position, DroneArea.rotation);
IssuedDrone.rigidbody.velocity = vRigidbody.velocity * 1;
IssuedDrone.rigidbody.velocity = DroneArea.transform.up * -40;
DroneAreaAudio.Play();
}
}

function Update () {

Notice();

if(target)
if(Vector3.Distance(thisTransform.position, target.position) > 210 && Attacking){
  FarFromEnemy();
  }

if(target == null && Attacking == true){
TargetStill = 0;
FoundBig = false;
Attacking = false;
Spot = false;
Hunting = true;
target = Waypoint;
StopAllCoroutines();
}

if(target != null)
if(target.name.Contains ("Forward") && Attacking == true){
Attacking = false;
Spot = false;
Hunting = true;
target = Waypoint;
StopAllCoroutines();
}

if(TurnLeft){
if(target != null)
  TurnForce = -400;
}

if(TurnRight){
if(target != null)
  TurnForce = 400;
}

if(!TurnRight && !TurnLeft){
  TurnForce = 0;
}

if(TurnRight && TurnLeft){
  TurnForce = 0;
}
	
var newRot : Vector3 = (thisTransform.forward * 0.6f ).normalized;
var hit : RaycastHit;

//-------------------------------------------------------------------------------------------------------------

if(vRigidbody.velocity.magnitude > 20){

newRot = (thisVTransform.up * 0.6f + thisVTransform.right * -0.4f).normalized;
Debug.DrawRay (thisTransform.position + thisTransform.forward * 15, newRot * 100f, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 15, newRot, 100)) {
     TurnLeft = true;
 } else {
     TurnLeft = false;
 }
 
newRot = (thisVTransform.up * 0.6f + thisVTransform.right * 0.4f).normalized;
Debug.DrawRay (thisTransform.position + thisTransform.forward * 15, newRot * 100f, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 15, newRot, 100)) {
		TurnRight = true;
	} else {
        TurnRight = false;
 }
 
} else if(vRigidbody.velocity.magnitude < 20){

if(vRigidbody.velocity.magnitude > 5){

newRot = (thisVTransform.up * 0.6f + thisVTransform.right * -0.4f).normalized;
Debug.DrawRay (thisTransform.position + thisTransform.forward * 15, newRot * 30f, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 15, newRot, 30)) {
     
     if(JustNoticed < 1)
     TurnLeft = true;
     
 } else {
     TurnLeft = false;
 }
 
newRot = (thisVTransform.up * 0.6f + thisVTransform.right * 0.4f).normalized;
Debug.DrawRay (thisTransform.position + thisTransform.forward * 15, newRot * 30f, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 15, newRot, 30)) {
		
		if(JustNoticed < 1)
        TurnRight = true;
        
	} else {
        TurnRight = false;
 }

 } else if(vRigidbody.velocity.magnitude < 5){

newRot = (thisVTransform.up * 0.6f + thisVTransform.right * -0.4f).normalized;
Debug.DrawRay (thisTransform.position + thisTransform.forward * 15, newRot * 15f, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 15, newRot, 15)) {
     
     if(JustNoticed < 1)
     TurnLeft = true;
     
 } else {
     TurnLeft = false;
 }
 
newRot = (thisVTransform.up * 0.6f + thisVTransform.right * 0.4f).normalized;
Debug.DrawRay (thisTransform.position + thisTransform.forward * 15, newRot * 15f, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 15, newRot, 15)) {
		
		if(JustNoticed < 1)
        TurnRight = true;
        
	} else {
        TurnRight = false;
 }

} 

}


//-------------------------------------------------------------------------------------------------------------

if(vRigidbody.velocity.magnitude > 10){
if(vRigidbody.velocity.magnitude < 50){
Debug.DrawRay (thisTransform.position + thisTransform.forward * 15, thisTransform.forward * 50f, Color.green);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 15, thisTransform.forward, 50)) {
		Obstacle = true;
	} else {
	    Obstacle = false;
	}
}

if(vRigidbody.velocity.magnitude > 50){
Debug.DrawRay (thisTransform.position + thisTransform.forward * 15, thisTransform.forward * 80f, Color.green);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 15, thisTransform.forward, 80)) {
		Obstacle = true;
	} else {
	    Obstacle = false;
	}
}
}
	
}


private var NewRotation : Quaternion;
function FixedUpdate () {

//----------------------------------------------------------------------------------------------------------------------

var localV = thisTransform.InverseTransformDirection(rigidbody.velocity);

if(SlowingDown && !Attacking){
  vRigidbody.AddForce(thisVTransform.up * 0);
}

if(Obstacle){
  if(localV.z > 10)
  vRigidbody.AddForce(thisVTransform.up * -60);
}

if(Stuck){
if(-localV.z < 4)
  vRigidbody.AddForce(thisVTransform.up * -60);
}
  
if(!Obstacle && !Stuck && !SlowingDown && !TurnLeft && !TurnRight) {
  vRigidbody.AddForce(thisVTransform.up * 20);
}

//----------------------------------------------------------------------------------------------------------------------

vRigidbody.AddTorque(thisVTransform.forward * TurnForce * 5);

vRigidbody.AddForceAtPosition(Vector3.up * -32, -thisVTransform.forward * 16);
vRigidbody.AddForceAtPosition(-Vector3.up * -32, thisVTransform.forward * 16);

 if (target && !DangerSense) {
  NewRotation = Quaternion.LookRotation(target.position - thisTransform.position);
  thisTransform.rotation = Quaternion.RotateTowards(thisTransform.rotation, NewRotation, Time.deltaTime * 60);
 }
 
  if (DangerSense && DangerDirection != Vector3.zero) {
  NewRotation = Quaternion.LookRotation(DangerDirection);
  thisTransform.rotation = Quaternion.RotateTowards(thisTransform.rotation, NewRotation, Time.deltaTime * 60);
 }
 
}

function OnTriggerEnter (other : Collider) {

ON = other.name;
OT = other.transform;

if(Physics.Linecast (thisTransform.position, OT.position, MtargetLayers))
return;

if(ON.Contains ("TFC"))
if(!ON.Contains ("TFC4")){

if(!Attacking){
DangerSense = true;
if(other.rigidbody)
DangerDirection = -other.rigidbody.velocity.normalized;
Suspicious();
}
}

if(!Attacking && Hunting)
if(ON.Contains ("TC") && !ON.Contains ("TC4")){
  Hunting = false;
  target = OT;
  Waypoint2.transform.position = OT.position;
  yield WaitForSeconds (0.1);
  if(!Spot){
  Spot = true;
  Looking();
  var TheThing = Instantiate(SpotSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing.transform.parent = thisTransform;
}
}
}

function OnTriggerStay (other : Collider) {

ON = other.name;
OT = other.transform;

if(Physics.Linecast (thisTransform.position, OT.position, MtargetLayers))
return;

if(ON.Contains ("TFC0a")){
PissedAtTC0a = true;
}
if(ON.Contains ("TFC1")){
PissedAtTC1 = true;
}
if(ON.Contains ("TFC3")){
PissedAtTC3 = true;
}
if(ON.Contains ("TFC5")){
PissedAtTC5 = true;
}
if(ON.Contains ("TFC6")){
PissedAtTC6 = true;
}
if(ON.Contains ("TFC7")){
PissedAtTC7 = true;
}
if(ON.Contains ("TFC8")){
PissedAtTC8 = true;
}
if(ON.Contains ("TFC9")){
PissedAtTC9 = true;
}

if(ON.Contains ("TC0a") && PissedAtTC0a && !FoundBig){
  Spot = false;
  Hunting = false;
  target = OT;
  if(!Attacking){
  DangerSense = false;
  Attacking = true;
  StopAllCoroutines();
  }
 }

 if(ON.Contains ("TC2")){
  Spot = false;
  Hunting = false;
  target = OT;
  if(!Attacking){
  DangerSense = false;
  var TheThing2 = Instantiate(AttackSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing2.transform.parent = thisTransform;
  Attacking = true;
  StopAllCoroutines();
  }
 }
 if(ON.Contains ("mTC1") && PissedAtTC1 && !FoundBig){
  Spot = false;
  Hunting = false;
  target = OT;
  if(!Attacking){
  DangerSense = false;
  Attacking = true;
  StopAllCoroutines();
  }
 }
 if(ON.Contains ("sTC1") && PissedAtTC1 && !FoundBig && !FoundSmall){
  FoundSmall = true;
  Spot = false;
  Hunting = false;
  target = OT;
  if(!Attacking){
  DangerSense = false;
  Attacking = true;
  StopAllCoroutines();
  }
  }
 if(ON.Contains ("TC3") && PissedAtTC3 && !FoundBig){
  Spot = false;
  Hunting = false;
  target = OT;
  if(!Attacking){
  DangerSense = false;
  Attacking = true;
  StopAllCoroutines();
  }
  }
if(ON.Contains ("mTC5") && PissedAtTC5 && !FoundBig){
  Spot = false;
  Hunting = false;
  target = OT;
  if(!Attacking){
  DangerSense = false;
  Attacking = true;
  StopAllCoroutines();
  }
  }
if(ON.Contains ("sTC5") && PissedAtTC5 && !FoundBig && !FoundSmall){
  FoundSmall = true;
  Spot = false;
  Hunting = false;
  target = OT;
  if(!Attacking){
  DangerSense = false;
  Attacking = true;
  StopAllCoroutines();
  }
  }
 if(ON.Contains ("mTC6") && PissedAtTC6 && !FoundBig){
  Spot = false;
  Hunting = false;
  target = OT;
  if(!Attacking){
  DangerSense = false;
  Attacking = true;
  StopAllCoroutines();
  }
  }
if(ON.Contains ("sTC6") && PissedAtTC6 && !FoundBig && !FoundSmall){
  FoundSmall = true;
  Spot = false;
  Hunting = false;
  target = OT;
  if(!Attacking){
  DangerSense = false;
  Attacking = true;
  StopAllCoroutines();
  }
  }
if(ON.Contains ("sTC7") && PissedAtTC7 && !FoundBig && !FoundSmall){
  FoundSmall = true;
  Spot = false;
  Hunting = false;
  target = OT;
  if(!Attacking){
  DangerSense = false;
  Attacking = true;
  StopAllCoroutines();
  }
  }
if(ON.Contains ("mTC7") && PissedAtTC7 && !FoundBig){
  Spot = false;
  Hunting = false;
  target = OT;
  if(!Attacking){
  DangerSense = false;
  Attacking = true;
  StopAllCoroutines();
  }
  }
if(ON.Contains ("bTC7") && PissedAtTC7){
  FoundBig = true;
  Spot = false;
  Hunting = false;
  target = OT;
  if(!Attacking){
  DangerSense = false;
  Attacking = true;
  StopAllCoroutines();
  }
  }
if(ON.Contains ("sTC8") && PissedAtTC8 && !FoundBig && !FoundSmall){
  FoundSmall = true;
  Spot = false;
  Hunting = false;
  target = OT;
  if(!Attacking){
  DangerSense = false;
  Attacking = true;
  StopAllCoroutines();
  }
  }
if(ON.Contains ("mTC8") && PissedAtTC8 && !FoundBig){
  Spot = false;
  Hunting = false;
  target = OT;
  if(!Attacking){
  DangerSense = false;
  Attacking = true;
  StopAllCoroutines();
  }
  }
if(ON.Contains ("bTC8") && PissedAtTC8){
  FoundBig = true;
  Spot = false;
  Hunting = false;
  target = OT;
  if(!Attacking){
  DangerSense = false;
  Attacking = true;
  StopAllCoroutines();
  }
  }
if(ON.Contains ("sTC9") && PissedAtTC9 && !FoundBig && !FoundSmall){
  FoundSmall = true;
  Spot = false;
  Hunting = false;
  target = OT;
  if(!Attacking){
  DangerSense = false;
  Attacking = true;
  StopAllCoroutines();
  }
  }
if(ON.Contains ("mTC9") && PissedAtTC9 && !FoundBig){
  Spot = false;
  Hunting = false;
  target = OT;
  if(!Attacking){
  DangerSense = false;
  Attacking = true;
  StopAllCoroutines();
  }
  }
if(ON.Contains ("bTC9") && PissedAtTC9){
  FoundBig = true;
  Spot = false;
  Hunting = false;
  target = OT;
  if(!Attacking){
  DangerSense = false;
  Attacking = true;
  StopAllCoroutines();
  }
  }
}

function Looking () {
yield WaitForSeconds (30);

  if(Attacking == false){
  Spot = false;
  var TheThing = Instantiate(RejectSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing.transform.parent = thisTransform;
  Targety();
  }
}

function FarFromEnemy () {
yield WaitForSeconds (60);
Attacking = false;
Spot = false;
target = Waypoint;
yield WaitForSeconds (2);
Hunting = true;
}

function Shoot () {

var Interval: float = Random.Range(0.1, 0.3);
yield WaitForSeconds (Interval);

if(AberrantGun1 != null)
AberrantGun1.Fire();

if(AberrantTurretGun1 != null)
AberrantTurretGun1.Fire();

}

function Shooty () {
if(Attacking)
Shoot();
}

function Targety () {
if(Spot == false && Attacking == false){
TargetArea();
}
}

function TargetArea () {
Hunting = false;
target = Waypoint2;
yield WaitForSeconds (10);
target = Waypoint;
Hunting = true;
}

function Suspicious () {
yield WaitForSeconds (60);
target = Waypoint;
DangerSense = false;
}

function Bothered(){
if(target)
var TargetPos : Vector3 = target.position;

  if(Vector3.Distance(thisTransform.position, TargetPos) < 50){
  if(!Attacking){
  if(TargetIsMoving){
  Attacking = true;
  Spot = false;
  Hunting = false;

if(target.name.Contains ("TC0a")){
PissedAtTC0a = true;
}
if(target.name.Contains ("TC1")){
PissedAtTC1 = true;
}
if(target.name.Contains ("TC3")){
PissedAtTC3 = true;
}
if(target.name.Contains ("TC5")){
PissedAtTC5 = true;
}
if(target.name.Contains ("TC6")){
PissedAtTC6 = true;
}
if(target.name.Contains ("TC7")){
PissedAtTC7 = true;
}
if(target.name.Contains ("TC8")){
PissedAtTC8 = true;
}
if(target.name.Contains ("TC9")){
PissedAtTC9 = true;
}
  
  StopAllCoroutines();
  }
 }

 }
}

function Reset () {

TargetIsMoving = false;

if(target.name.Contains ("TC0a"))
PissedAtTC0a = false;

if(target.name.Contains ("TC1"))
PissedAtTC1 = false;

if(target.name.Contains ("TC3"))
PissedAtTC3 = false;

if(target.name.Contains ("TC6"))
PissedAtTC6 = false;

if(target.name.Contains ("TC7"))
PissedAtTC7 = false;

if(target.name.Contains ("TC8"))
PissedAtTC8 = false;

if(target.name.Contains ("TC9"))
PissedAtTC9 = false;

TargetStill = 0;
FoundBig = false;
Attacking = false;
yield WaitForSeconds (10);
Spot = false;
Hunting = true;
target = Waypoint;
StopAllCoroutines();
}

function Warning () {
  if(Hunting == true){
  var TheThing = Instantiate(HuntingSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing.transform.parent = thisTransform;
  }
}

function LeaveMarker () {
var lastPos : Vector3 = thisTransform.position;
IsEscaping(lastPos);
}

function IsEscaping(lastPos : Vector3){
Stuck = false;
yield WaitForSeconds (1);

  if(Vector3.Distance(thisTransform.position, lastPos) < 0.5){
  Stuck = true;
  yield WaitForSeconds (2);
  Stuck = false;
  }
}

function Notice () {
if(Tick)
return;

Tick = true;

if(target != null){

if(!TargetIsMoving && Vector3.Distance(thisTransform.position, target.position) < 50){
TargetStill += 1;
if(TargetStill > 20)
Reset();
}

var lastPos : Vector3 = target.transform.position;
yield WaitForSeconds (0.2);

if(target != null)
if(Vector3.Distance(target.transform.position, lastPos) > 0.2){
TargetIsMoving = true;
TargetStill = 0;
}

yield WaitForSeconds (0.2);
TargetIsMoving = false;
}

Tick = false;
}

function Regenerator () {

Obstacle = false;

if(Attacking){

Trig.center = Vector3(0,0,0);
Trig.radius = 40;
Trig.height = 40;

if(target != null)
if (!Physics.Linecast (thisTransform.position, target.position, targetLayers)){
TurnRight = false;
TurnLeft = false;
JustNoticed = 2;
}
}else{
Trig.center = Vector3(0,0,100);
Trig.radius = 100;
Trig.height = 300;
}

if(JustNoticed > 0)
JustNoticed -= 1;

Tick = false;

if(!Attacking){
FoundSmall = false;
}

if(DroneCounter > 0)
DroneCounter -= 1;

if(DroneCounter < 1 && Attacking && !IsMercenary){
DroneCounter = 10;
IssuedDrone = Instantiate(DronePrefab, DroneArea.position, DroneArea.rotation);
IssuedDrone.rigidbody.velocity = vRigidbody.velocity * 1;
IssuedDrone.rigidbody.velocity = DroneArea.transform.up * -20;
IssuedDrone.transform.GetChild(0).GetComponent(AgrianMiniBotAI).target = target;

IssuedDrone.transform.GetChild(0).GetComponent(AgrianMiniBotAI).Attacking = true;

if(PissedAtTC0a)
IssuedDrone.transform.GetChild(0).GetComponent(AgrianMiniBotAI).PissedAtTC0a = 8;
if(PissedAtTC1)
IssuedDrone.transform.GetChild(0).GetComponent(AgrianMiniBotAI).PissedAtTC1 = 8;
if(PissedAtTC3)
IssuedDrone.transform.GetChild(0).GetComponent(AgrianMiniBotAI).PissedAtTC3 = 8;
if(PissedAtTC5)
IssuedDrone.transform.GetChild(0).GetComponent(AgrianMiniBotAI).PissedAtTC5 = 8;
if(PissedAtTC6)
IssuedDrone.transform.GetChild(0).GetComponent(AgrianMiniBotAI).PissedAtTC6 = 8;
if(PissedAtTC7)
IssuedDrone.transform.GetChild(0).GetComponent(AgrianMiniBotAI).PissedAtTC7 = 8;
if(PissedAtTC8)
IssuedDrone.transform.GetChild(0).GetComponent(AgrianMiniBotAI).PissedAtTC8 = 8;
if(PissedAtTC9)
IssuedDrone.transform.GetChild(0).GetComponent(AgrianMiniBotAI).PissedAtTC9 = 8;

DroneAreaAudio.Play();
}

}