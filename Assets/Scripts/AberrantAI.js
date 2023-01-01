var target : Transform;
var Waypoint : Transform;
var Waypoint2 : Transform;
var Trig : CapsuleCollider;
var AberrantGun1 : NPCGun;
var AberrantGun2 : NPCGun;
var AberrantPresence : GameObject;

var thisTransform : Transform;
var thisVTransform : Transform;

var vRigidbody : Rigidbody;

var HuntingSound : GameObject;
var SpotSound : GameObject;
var AttackSound : GameObject;
var RejectSound : GameObject;

var isGunnerAberrant : boolean;

var DecrepitAberrant : boolean;

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
var TargetTooClose : boolean;

var AttackManeuverCurve : AnimationCurve = new AnimationCurve();

var TurnRight : boolean;
var TurnLeft : boolean;

var TurnForce : float = 1;
var GyroForce : float = 1;

var HullMovage : float;

var DangerSense : boolean;
var DangerDirection : Vector3;

var targetLayers : LayerMask;

var MtargetLayers : LayerMask;

var JustNoticed = 0;
var Suspicion = 0;

var TargetStill = 0;

var Dist : float;

var ShootFrequency : float = 5;
var UniqueShootTime : float = 0.1;

var Tick : boolean;

InvokeRepeating("Regenerator", 1, 1);

InvokeRepeating("LeaveMarker", 1, 10);

InvokeRepeating("Warning", 5, Random.Range(19, 21));

InvokeRepeating("Targety", 120, 120);

InvokeRepeating("Shooty", UniqueShootTime, ShootFrequency);

function Start (){
UniqueShootTime = Random.Range(1, 2);
}

function Update () {

if(!DecrepitAberrant){

Notice();

var Vel = vRigidbody.velocity.magnitude;

if(target){

Dist = Vector3.Distance(thisTransform.position, target.position);
  
if(Dist < 20 && Attacking)
TargetTooClose = true;
else
TargetTooClose = false;

}

if(!target && Attacking){
TargetStill = 0;
Attacking = false;
Spot = false;
Hunting = true;
target = Waypoint;
StopAllCoroutines();
}



if(TurnLeft){
if(!Spot)
  TurnForce = -50;
}

if(TurnRight){
if(!Spot)
  TurnForce = 50;
}

if(TurnLeft && TurnRight){
  TurnForce = -50;
}

if(!TurnLeft && !TurnRight){
  TurnForce = 0;
}
	
var newRot : Vector3 = (thisTransform.forward * 0.6f + thisTransform.up * 0.1f).normalized;
 
if(Vel > 20){

newRot = (thisVTransform.up * 0.6f + thisVTransform.right * -0.4f).normalized;
Debug.DrawRay (thisTransform.position + thisTransform.forward * 2, newRot * 100f, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 2, newRot, 100)) {
if(JustNoticed < 1)
     TurnLeft = true;
     
 } else {
     TurnLeft = false;
 }
 
newRot = (thisVTransform.up * 0.6f + thisVTransform.right * 0.4f).normalized;
Debug.DrawRay (thisTransform.position + thisTransform.forward * 2, newRot * 100f, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 2, newRot, 100)) {
if(JustNoticed < 1)
		TurnRight = true;
		
	} else {
        TurnRight = false;
 }
 
} else if(Vel < 20){

if(Vel > 5){

newRot = (thisVTransform.up * 0.6f + thisVTransform.right * -0.4f).normalized;
Debug.DrawRay (thisTransform.position + thisTransform.forward * 2, newRot * 10f, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 2, newRot, 10)) {
if(JustNoticed < 1)
     TurnLeft = true;
     
 } else {
     TurnLeft = false;
 }
 
newRot = (thisVTransform.up * 0.6f + thisVTransform.right * 0.4f).normalized;
Debug.DrawRay (thisTransform.position + thisTransform.forward * 2, newRot * 10f, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 2, newRot, 10)) {
if(JustNoticed < 1)
		TurnRight = true;
		
	} else {
        TurnRight = false;
 }
 
} else if(Vel < 5){

newRot = (thisVTransform.up * 0.6f + thisVTransform.right * -0.4f).normalized;
Debug.DrawRay (thisTransform.position + thisTransform.forward * 1, newRot * 5f, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 1, newRot, 5)) {
if(JustNoticed < 1)
     TurnLeft = true;
     
 } else {
     TurnLeft = false;
 }
 
newRot = (thisVTransform.up * 0.6f + thisVTransform.right * 0.4f).normalized;
Debug.DrawRay (thisTransform.position + thisTransform.forward * 1, newRot * 5f, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 1, newRot, 5)) {
if(JustNoticed < 1)
		TurnRight = true;
		
	} else {
        TurnRight = false;
 }

}
}

if(Vel > 7)
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 1, thisTransform.forward, Vel)) {
		Obstacle = true;
	} else {
	    Obstacle = false;
	}

if(Vel < 7){
Obstacle = false;
if(target != null)
if(Dist < 10 && target.name.Contains ("TC"))
Obstacle = true;
}

}
}


private var NewRotation : Quaternion;
function FixedUpdate () {

if(!DecrepitAberrant){

//----------------------------------------------------------------------------------------------------------------------

var localV = thisTransform.InverseTransformDirection(rigidbody.velocity);

if(Obstacle && !Stuck){
  if(localV.z > 0){
  vRigidbody.AddForce(thisVTransform.up * -20);
  }
}

if(TargetTooClose)
  if(-localV.z < 5)
  vRigidbody.AddForce(thisVTransform.up * -20);

if(Stuck){
  if(-localV.z < 2)
  vRigidbody.AddForce(thisVTransform.up * -20);
}

if(Attacking){
  GyroForce = 0;
}else{
  GyroForce = -20;
}

if(!Obstacle && !Stuck && !TurnLeft && !TurnRight && !TargetTooClose) {
  vRigidbody.AddForce(thisVTransform.up * 5);
}

//----------------------------------------------------------------------------------------------------------------------

TurnForce += HullMovage;

vRigidbody.AddTorque(thisVTransform.forward * TurnForce * 1);

vRigidbody.AddForceAtPosition(Vector3.up * GyroForce, -thisVTransform.forward * 2);
vRigidbody.AddForceAtPosition(-Vector3.up * GyroForce, thisVTransform.forward * 2);

 if (target && !DangerSense) {
 if(TurnLeft || TurnRight){
  rigidbody.freezeRotation = false;
  GyroForce = -100;
  }
 if(!TurnLeft && !TurnRight){
  rigidbody.freezeRotation = true;
  GyroForce = -20;
  }
  NewRotation = Quaternion.LookRotation(target.position - thisTransform.position);
  thisTransform.rotation = Quaternion.RotateTowards(thisTransform.rotation, NewRotation, Time.deltaTime * 100);
 }
 
 if (DangerSense && DangerDirection != Vector3.zero) {
  rigidbody.freezeRotation = true;
  NewRotation = Quaternion.LookRotation(DangerDirection);
  thisTransform.rotation = Quaternion.RotateTowards(thisTransform.rotation, NewRotation, Time.deltaTime * 200);
 }

}else{
if(target != null){
NewRotation = Quaternion.LookRotation(target.position - thisTransform.position);
  thisTransform.rotation = Quaternion.RotateTowards(thisTransform.rotation, NewRotation, Time.deltaTime * 25);
  }
}
}

function OnTriggerEnter (other : Collider) {

ON = other.name;
OT = other.transform;

if(Physics.Linecast (thisTransform.position, OT.position, MtargetLayers))
return;

if(!DecrepitAberrant){

if(ON.Contains ("TFC"))
if(!ON.Contains ("TFC4")){

if(!Attacking){
DangerSense = true;
if(other.rigidbody)
DangerDirection = -other.rigidbody.velocity.normalized;
Suspicious();
}
}

if(ON.Contains ("TC") && !ON.Contains ("TC4") && !Attacking && Hunting){
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
}else{
if(ON.Contains ("TC") && !ON.Contains ("TC4")){
  target = OT;
  yield WaitForSeconds (0.1);
  if(!Spot){
  Spot = true;
  Looking();
  var TheThing1 = Instantiate(SpotSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing1.transform.parent = thisTransform;
}
}
}
}

function OnTriggerStay (other : Collider) {

ON = other.name;
OT = other.transform;

if(Physics.Linecast (thisTransform.position, OT.position, MtargetLayers))
return;

if(!DecrepitAberrant){

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


if(ON.Contains ("TC2")){
  Spot = false;
  Hunting = false;
  target = OT;
  DangerSense = false;
  if(!Attacking){
  var TheThing2 = Instantiate(AttackSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing2.transform.parent = thisTransform;
  Attacking = true;
  StopAllCoroutines();
  }
  }
 if(ON.Contains ("TC0a") && PissedAtTC0a){
  Spot = false;
  Hunting = false;
  target = OT;
  DangerSense = false;
  if(!Attacking){
  Attacking = true;
  StopAllCoroutines();
  }
  }
 if(ON.Contains ("TC1") && PissedAtTC1){
  Spot = false;
  Hunting = false;
  target = OT;
  DangerSense = false;
  if(!Attacking){
  Attacking = true;
  StopAllCoroutines();
  }
  }
 if(ON.Contains ("TC3") && PissedAtTC3){
  Spot = false;
  Hunting = false;
  target = OT;
  DangerSense = false;
  if(!Attacking){
  Attacking = true;
  StopAllCoroutines();
  }
  }
 if(ON.Contains ("TC5") && PissedAtTC5){
  Spot = false;
  Hunting = false;
  target = OT;
  DangerSense = false;
  if(!Attacking){
  Attacking = true;
  StopAllCoroutines();
  }
  }
if(ON.Contains ("TC6") && PissedAtTC6){
  Spot = false;
  Hunting = false;
  target = OT;
  DangerSense = false;
  if(!Attacking){
  Attacking = true;
  StopAllCoroutines();
  }
  }
if(ON.Contains ("TC7") && PissedAtTC7){
  Spot = false;
  Hunting = false;
  target = OT;
  DangerSense = false;
  if(!Attacking){
  Attacking = true;
  StopAllCoroutines();
  }
  }
if(ON.Contains ("TC8") && PissedAtTC8){
  Spot = false;
  Hunting = false;
  target = OT;
  DangerSense = false;
  if(!Attacking){
  Attacking = true;
  StopAllCoroutines();
  }
  }
if(ON.Contains ("TC9") && PissedAtTC9){
  Spot = false;
  Hunting = false;
  target = OT;
  DangerSense = false;
  if(!Attacking){
  Attacking = true;
  StopAllCoroutines();
  }
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

function Shooty () {
if(!DecrepitAberrant)
if(Attacking && JustNoticed > 0)
Shoot();
}

function Shoot () {

if(AberrantGun1 != null)
AberrantGun1.Fire();

yield WaitForSeconds (0.1);

if(AberrantGun2 != null)
AberrantGun2.Fire();

}

function Targety () {
if(!DecrepitAberrant)
if(Spot == false && Attacking == false){
TargetArea();
}
}

function TargetArea () {
Hunting = false;
target = Waypoint2;
yield WaitForSeconds (5);
target = Waypoint;
Hunting = true;
}

function Suspicious () {
yield WaitForSeconds (60);
target = Waypoint;
DangerSense = false;
}

function ManeuverHull(){

HullMovage = -AttackManeuverCurve.Evaluate(Dist);

if(isGunnerAberrant){
yield WaitForSeconds (0.5);

HullMovage = AttackManeuverCurve.Evaluate(Dist);
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

if(target.name.Contains ("TC5"))
PissedAtTC5 = false;

if(target.name.Contains ("TC6"))
PissedAtTC6 = false;

if(target.name.Contains ("TC7"))
PissedAtTC7 = false;

if(target.name.Contains ("TC8"))
PissedAtTC8 = false;

if(target.name.Contains ("TC9"))
PissedAtTC9 = false;

TargetStill = 0;
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
yield WaitForSeconds (2);

  if(Vector3.Distance(thisTransform.position, lastPos) < 1){
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

if(!TargetIsMoving && Dist < 30){
TargetStill += 1;
if(TargetStill > 20)
Reset();
}

var lastPos : Vector3 = target.transform.position;
yield WaitForSeconds (0.2);

if(target != null)
if(Vector3.Distance(target.position, lastPos) > 0.2){
TargetIsMoving = true;
TargetStill = 0;
}


yield WaitForSeconds (0.2);
TargetIsMoving = false;
}

Tick = false;
}

function Regenerator () {

if(!DecrepitAberrant){

if(Attacking){

if(Trig.isTrigger){
Trig.center = Vector3(0,0,0);
Trig.radius = 20;
Trig.height = 20;
}

if(target != null)
if (!Physics.Linecast (thisTransform.position, target.position, targetLayers)){
TurnRight = false;
TurnLeft = false;
JustNoticed = 3;
}

if(Dist > 320){
Attacking = false;
Spot = false;
}

ManeuverHull();

}else{
if(Trig.isTrigger){
Trig.center = Vector3(0,0,100);
Trig.radius = 50;
Trig.height = 300;
}

if(target){
var TargetPos : Vector3 = target.position;
  if(Vector3.Distance(thisTransform.position, TargetPos) < 30){
  if(!Attacking && Spot){
  if(TargetIsMoving){
  Attacking = true;
  Spot = false;
  Hunting = false;
  var TheThing3 = Instantiate(AttackSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing3.transform.parent = thisTransform;
  StopAllCoroutines();
  }
 }

}

}

HullMovage = 0;

}

if(JustNoticed > 0)
JustNoticed -= 1;

Tick = false;
}
}