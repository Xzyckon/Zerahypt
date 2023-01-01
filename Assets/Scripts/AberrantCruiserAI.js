var target : Transform;
var Waypoint : Transform;
var Waypoint2 : Transform;
var AberrantThruster : GameObject;
var AberrantThruster2 : GameObject;
var AberrantGyro : GameObject;
var AberrantRotator : BigVesselRotator;
var Trig : SphereCollider;
var Hoverer1 : GameObject;
var Hoverer2 : GameObject;
var Turret1 : NPCGun;
var Turret2 : NPCGun;
var Turret3 : NPCGun;

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

var T1Force = 0;
var T2Force = 0;

var FoundBig : boolean;
var FoundSmall : boolean;

var TurnRight : boolean;
var TurnLeft : boolean;

var DangerSense : boolean;
var DangerDirection : Vector3;

var MtargetLayers : LayerMask;

var Tick : boolean;

var ShootFrequency : float = 2;

var Damaged : boolean;

InvokeRepeating("Regenerator", 1, 1);

InvokeRepeating("LeaveMarker", 1, 10);

InvokeRepeating("Warning", 1, Random.Range(50, 60));

InvokeRepeating("Targety", 300, 300);

InvokeRepeating("Shooty", 1, ShootFrequency);

function Start (){
yield WaitForSeconds (5);
IssuedDrone = Instantiate(DronePrefab, DroneArea.position, DroneArea.rotation);
IssuedDrone.rigidbody.velocity = vRigidbody.velocity * 1;
IssuedDrone.rigidbody.velocity = DroneArea.transform.up * -20;
DroneAreaAudio.Play();
}

function Update () {

if(target == null && Attacking){
FoundBig = false;
Attacking = false;
Spot = false;
Hunting = true;
target = Waypoint;
StopAllCoroutines();
}

if(Damaged)
return;

Notice();

if(target != null)
if(target.name.Contains ("Forward") && Attacking){
Attacking = false;
Spot = false;
Hunting = true;
target = Waypoint;
StopAllCoroutines();
}
	
var newRot : Vector3 = (thisVTransform.up * 0.6f ).normalized;
var hit : RaycastHit;
var localV = thisVTransform.InverseTransformDirection(vRigidbody.velocity);

if(localV.y > 20){

newRot = (thisVTransform.up * 0.6f + -thisVTransform.right * 0.1f).normalized;

Debug.DrawRay (thisVTransform.position + thisVTransform.up + -thisVTransform.right * 12, newRot * 150f, Color.black);
if (Physics.Raycast (thisVTransform.position + thisVTransform.up+ -thisVTransform.right * 12, newRot, 150)) {
     TurnLeft = true;
 } else {
     TurnLeft = false;
 }
 
newRot = (thisVTransform.up * 0.6f + -thisVTransform.right * -0.1f).normalized;

Debug.DrawRay (thisVTransform.position + thisVTransform.up + thisVTransform.right * 12, newRot * 150f, Color.black);
if (Physics.Raycast (thisVTransform.position + thisVTransform.up + thisVTransform.right * 12, newRot, 150)) {
		TurnRight = true;
	} else {
        TurnRight = false;
 }
 
Debug.DrawRay (thisVTransform.position + thisVTransform.up * 45, thisVTransform.up * 100f, Color.green);
if (Physics.Raycast (thisVTransform.position + thisVTransform.up * 45, thisVTransform.up, 100)) {
		Obstacle = true;
	} else {
	    Obstacle = false;
	}
	
}else{

newRot = (thisVTransform.up * 0.6f + -thisVTransform.right * 0.2f).normalized;

Debug.DrawRay (thisVTransform.position + thisVTransform.up + -thisVTransform.right * 12, newRot * 80f, Color.black);
if (Physics.Raycast (thisVTransform.position + thisVTransform.up+ -thisVTransform.right * 12, newRot, 80)) {
     TurnLeft = true;
 } else {
     TurnLeft = false;
 }
 
newRot = (thisVTransform.up * 0.6f + -thisVTransform.right * -0.2f).normalized;

Debug.DrawRay (thisVTransform.position + thisVTransform.up + thisVTransform.right * 12, newRot * 80f, Color.black);
if (Physics.Raycast (thisVTransform.position + thisVTransform.up + thisVTransform.right * 12, newRot, 80)) {
		TurnRight = true;
	} else {
        TurnRight = false;
 }

if(localV.y > 5){
Debug.DrawRay (thisVTransform.position + thisVTransform.up * 45, thisVTransform.up * 50f, Color.green);
if (Physics.Raycast (thisVTransform.position + thisVTransform.up * 45, thisVTransform.up, 50)) {
		Obstacle = true;
	} else {
	    Obstacle = false;
	}
}else{
Obstacle = false;
}

}

if(-localV.y > 5)
Stuck = false;

if(Obstacle){
  T1Force = -200;
  T2Force = -200;
}

if(TurnLeft && !TurnRight){
  T1Force = -200;
  T2Force = 200;
}

if(TurnRight && !TurnLeft){
  T1Force = 200;
  T2Force = -200;
}

if(TurnRight && TurnLeft){
  T1Force = -200;
  T1Force = 200;
}

if(Stuck){
  T1Force = -200;
  T2Force = -200;
}

if(!TurnLeft && !TurnRight && !Obstacle && !Stuck){
  T1Force = 150;
  T2Force = 150;
}

}


private var NewRotation : Quaternion;
function FixedUpdate () {

//----------------------------------------------------------------------------------------------------------------------

AberrantThruster.rigidbody.AddForce(AberrantThruster.transform.up * T1Force);
AberrantThruster2.rigidbody.AddForce(AberrantThruster2.transform.up * T2Force);

//----------------------------------------------------------------------------------------------------------------------

 if (target && !DangerSense) {
  NewRotation = Quaternion.LookRotation(target.position - thisTransform.position);
  thisTransform.rotation = Quaternion.RotateTowards(thisTransform.rotation, NewRotation, Time.deltaTime * 50);
 }
 
 if (DangerSense && DangerDirection != Vector3.zero) {
  NewRotation = Quaternion.LookRotation(DangerDirection);
  thisTransform.rotation = Quaternion.RotateTowards(thisTransform.rotation, NewRotation, Time.deltaTime * 50);
 }
 
 if (Damaged) {
  
  Destroy(AberrantRotator);
  Destroy(AberrantPresence);
  Destroy(AberrantGyro);
  Destroy(Hoverer1);
  Destroy(Hoverer2);
  Destroy(this);
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

if(ON.Contains ("TC") && !ON.Contains ("TC4") && !Attacking && !Damaged && Hunting){
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

if(!Damaged){
if(ON.Contains ("TFC0a") && !PissedAtTC0a){
PissedAtTC0a = true;
}
if(ON.Contains ("TFC1") && !PissedAtTC1){
PissedAtTC1 = true;
}
if(ON.Contains ("TFC3") && !PissedAtTC3){
PissedAtTC3 = true;
}
if(ON.Contains ("TFC5") && !PissedAtTC5){
PissedAtTC5 = true;
}
if(ON.Contains ("TFC6") && !PissedAtTC6){
PissedAtTC6 = true;
}
if(ON.Contains ("TFC7") && !PissedAtTC7){
PissedAtTC7 = true;
}
if(ON.Contains ("TFC8") && !PissedAtTC8){
PissedAtTC8 = true;
}
if(ON.Contains ("TFC9") && !PissedAtTC9){
PissedAtTC9 = true;
}

 if(PissedAtTC0a && !FoundBig)
 if(ON.Contains ("TC0a")){
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
 if(PissedAtTC1 && !FoundBig)
 if(ON.Contains ("mTC1") || ON.Contains ("bTC1")){
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
if(ON.Contains ("bTC6") && PissedAtTC6){
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
}

function Looking () {
yield WaitForSeconds (30);

  if(Hunting == false && Attacking == false){
  Spot = false;
  var TheThing = Instantiate(RejectSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing.transform.parent = thisTransform;
  Targety();
  }
}

function Shoot () {
if(Attacking == true){
if(Turret1 != null)
Turret1.Fire();
yield WaitForSeconds (0.4);
if(Turret2 != null)
Turret2.Fire();
yield WaitForSeconds (0.4);
if(Turret3 != null)
Turret3.Fire();
}
}

function Shooty () {
if(Attacking == true){
Shoot();
}
}

function Targety () {
if(Spot == false && Attacking == false){
TargetArea();
}
}

function TargetArea () {
Hunting = false;
Spot = false;
target = Waypoint2;
yield WaitForSeconds (20);
target = Waypoint;
Spot = false;
Hunting = true;
}


function Suspicious () {
yield WaitForSeconds (60);
target = Waypoint;
DangerSense = false;
}

function Notice () {
if(Tick)
return;

Tick = true;

if(target != null){

var lastPos : Vector3 = target.transform.position;
yield WaitForSeconds (0.2);

if(target != null)
if(Vector3.Distance(target.transform.position, lastPos) > 0.2)
TargetIsMoving = true;

yield WaitForSeconds (0.2);
TargetIsMoving = false;
}

Tick = false;
}

function Regenerator () {

Tick = false;

if(Attacking){

Trig.center = Vector3(0,0,10);
Trig.radius = 75;

}else{

Trig.center = Vector3(0,0,100);
Trig.radius = 150;

FoundSmall = false;
}

if(DroneCounter > 0)
DroneCounter -= 1;

if(DroneCounter < 1 && Attacking){
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

if(target){
var TargetPos : Vector3 = target.position;
  if(Vector3.Distance(thisTransform.position, TargetPos) < 200){
  if(!Attacking){
  if(TargetIsMoving){
  DangerSense = false;
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

if(Vector3.Distance(thisTransform.position, target.position) > 1000){
Attacking = false;
Hunting = true;
target = Waypoint;
}
}

}

function Warning () {
  if(Hunting == true && !Damaged){
  var TheThing = Instantiate(HuntingSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing.transform.parent = thisTransform;
  Spot = false;
  }
}

function LeaveMarker () {

if (Damaged)
return;
var lastPos : Vector3 = thisTransform.position;
IsEscaping(lastPos);
}

function IsEscaping(lastPos : Vector3){
yield WaitForSeconds (2);

  if(Vector3.Distance(thisTransform.position, lastPos) < 2)
  Stuck = true;
}

function Broken () {
vRigidbody.angularDrag = 0.05;
}