var target : Transform;
var ResetView : Transform;
var Waypoint : Transform;
var Rotator : BigVesselRotator;
var Trig : CapsuleCollider;

var thisTransform : Transform;
var thisVTransform : Transform;

var vRigidbody : Rigidbody;

var PissedAtTC0a : boolean;

var PissedAtTC1 : boolean;
var PissedAtTC2 : boolean;
var PissedAtTC3 : boolean;
var PissedAtTC4 : boolean;
var PissedAtTC5 : boolean;
var PissedAtTC7 : boolean;
var PissedAtTC8 : boolean;
var PissedAtTC9 : boolean;

var Hunting : boolean;
var Spot : boolean = true;
var Attacking : boolean;
var Obstacle : boolean = false;

var CloseToBase : boolean;

var Pathfind : boolean;

var FoundSmall : boolean;

var TurnRight : boolean;
var TurnLeft : boolean;

var DangerSense = 0;
var DangerDirection : Vector3;

var targetLayers : LayerMask;

var MtargetLayers : LayerMask;

var Stuck = 0;

var JustNoticed = 0;

var Slope = 0;

var Tick : boolean;

InvokeRepeating("Regenerator", 5, 1);

InvokeRepeating("LeaveMarker", 5, 10);

InvokeRepeating("Targety", 300, 300);

function Update () {

if(target == null && Attacking){
FoundBig = false;
Attacking = false;
Spot = false;
Hunting = true;
target = ResetView;
StopAllCoroutines();
}

if(target != null)
if(target.name.Contains ("Forward") && Attacking){
Attacking = false;
Spot = false;
Hunting = true;
target = ResetView;
StopAllCoroutines();
}
	
var newRot : Vector3 = (-thisVTransform.up * 0.6f ).normalized;
var hit : RaycastHit;
var localV = thisVTransform.InverseTransformDirection(vRigidbody.velocity);

if(-localV.y > 15){

newRot = (-thisVTransform.up * 0.6f + -thisVTransform.right * 0.1f).normalized;

Debug.DrawRay (thisVTransform.position + -thisVTransform.up + -thisVTransform.right * 10, newRot * 100f, Color.black);
if (Physics.Raycast (thisVTransform.position + -thisVTransform.up + -thisVTransform.right * 10, newRot, 100)) {
     TurnLeft = true;
 } else {
     TurnLeft = false;
 }
 
newRot = (-thisVTransform.up * 0.6f + -thisVTransform.right * -0.1f).normalized;

Debug.DrawRay (thisVTransform.position + -thisVTransform.up + thisVTransform.right * 10, newRot * 100f, Color.black);
if (Physics.Raycast (thisVTransform.position + -thisVTransform.up + thisVTransform.right * 10, newRot, 100)) {
		TurnRight = true;
	} else {
        TurnRight = false;
 }
 
Debug.DrawRay (thisVTransform.position + -thisVTransform.up * 20, -thisVTransform.up * 80f, Color.green);
if (Physics.Raycast (thisVTransform.position + -thisVTransform.up * 20, -thisVTransform.up, 80)) {
      if(Slope < 1 && -localV.y > 0)
		Obstacle = true;
	} else {
	    Obstacle = false;
	}
	
}else{

newRot = (-thisVTransform.up * 0.6f + -thisVTransform.right * 0.3f).normalized;

Debug.DrawRay (thisVTransform.position + -thisVTransform.up * 20, newRot * 25f, Color.black);
if (Physics.Raycast (thisVTransform.position + -thisVTransform.up * 20, newRot, 25)) {
     TurnLeft = true;
 } else {
     TurnLeft = false;
 }
 
newRot = (-thisVTransform.up * 0.6f + -thisVTransform.right * -0.3f).normalized;

Debug.DrawRay (thisVTransform.position + -thisVTransform.up * 20, newRot * 25f, Color.black);
if (Physics.Raycast (thisVTransform.position + -thisVTransform.up * 20, newRot, 25)) {
		TurnRight = true;
	} else {
        TurnRight = false;
 }

Debug.DrawRay (thisVTransform.position + -thisVTransform.up * 20, -thisVTransform.up * 22f, Color.green);
if (Physics.Raycast (thisVTransform.position + -thisVTransform.up * 20, -thisVTransform.up, 22)) {
        Obstacle = false;
     if(Slope < 1 && -localV.y > 1)
		Obstacle = true;
	} else {
	    Obstacle = false;
}

if(TurnRight && TurnLeft){

newRot = (-thisVTransform.up * 0.6f + -thisVTransform.right * 0.8f).normalized;

Debug.DrawRay (thisVTransform.position + -thisVTransform.up * 10, newRot * 20f, Color.black);
if (Physics.Raycast (thisVTransform.position + -thisVTransform.up * 10, newRot, 20))
     Pathfind = false;
     
newRot = (-thisVTransform.up * 0.6f + -thisVTransform.right * -0.8f).normalized;

Debug.DrawRay (thisVTransform.position + -thisVTransform.up * 10, newRot * 20f, Color.black);
if (Physics.Raycast (thisVTransform.position + -thisVTransform.up * 10, newRot, 20))
     Pathfind = true;
}

}
}


private var NewRotation : Quaternion;
function FixedUpdate () {

//----------------------------------------------------------------------------------------------------------------------

if(TurnLeft && !TurnRight)
  vRigidbody.AddTorque(thisVTransform.forward * 10000);

if(TurnRight && !TurnLeft)
  vRigidbody.AddTorque(thisVTransform.forward * -10000);

if(TurnRight && TurnLeft){
if(Pathfind)
  vRigidbody.AddTorque(thisVTransform.forward * -10000);
  else
  vRigidbody.AddTorque(thisVTransform.forward * 10000);
  
  }

if(Obstacle)
  vRigidbody.AddForce(thisVTransform.up * 1600);

if(Stuck > 0)
  vRigidbody.AddForce(thisVTransform.up * 800);

if(!Spot && Stuck < 1 && !Obstacle)
  vRigidbody.AddForce(thisVTransform.up * -400);

//----------------------------------------------------------------------------------------------------------------------

 if (target && DangerSense < 1) {
  NewRotation = Quaternion.LookRotation(target.position - thisTransform.position);
  thisTransform.rotation = Quaternion.RotateTowards(thisTransform.rotation, NewRotation, Time.deltaTime * 100);
 }
 
 if (DangerSense > 0 && DangerDirection != Vector3.zero) {
  NewRotation = Quaternion.LookRotation(DangerDirection);
  thisTransform.rotation = Quaternion.RotateTowards(thisTransform.rotation, NewRotation, Time.deltaTime * 100);
 }

}

function OnTriggerEnter (other : Collider) {

ON = other.name;
OT = other.transform;

if(Physics.Linecast (thisTransform.position, OT.position, MtargetLayers))
return;

if(ON.Contains ("TFC"))
if(!ON.Contains ("TFC6")){

if(!Attacking){
DangerSense = 8;
if(other.rigidbody)
DangerDirection = -other.rigidbody.velocity.normalized;
}

if(ON.Contains ("TFC0a") && !PissedAtTC0a){
PissedAtTC0a = true;
}
if(ON.Contains ("TFC1") && !PissedAtTC1){
PissedAtTC1 = true;
}
if(ON.Contains ("TFC2") && !PissedAtTC2){
PissedAtTC2 = true;
}
if(ON.Contains ("TFC4") && !PissedAtTC4){
PissedAtTC4 = true;
}
if(ON.Contains ("TFC5") && !PissedAtTC5){
PissedAtTC5 = true;
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

}
}

function OnTriggerStay (other : Collider) {

ON = other.name;
OT = other.transform;

if(Physics.Linecast (thisTransform.position, OT.position, MtargetLayers))
return;

if(CloseToBase)
return;

 if(PissedAtTC0a)
 if(ON.Contains ("TC0a")){
  Spot = false;
  Hunting = false;
  target = OT;
  if(!Attacking){
  Attacking = true;
  StopAllCoroutines();
  }
  }
  
 if(PissedAtTC1){
 if(ON.Contains ("sTC1") && !FoundSmall){
  FoundSmall = true;
  Spot = false;
  Hunting = false;
  target = OT;
  if(!Attacking){
  Attacking = true;
  StopAllCoroutines();
  }
  }
 if(ON.Contains ("mTC1")){
  Spot = false;
  Hunting = false;
  target = OT;
  if(!Attacking){
  Attacking = true;
  StopAllCoroutines();
  }
  }
  }
 
 if(PissedAtTC2)
 if(ON.Contains ("TC2")){
  Spot = false;
  Hunting = false;
  target = OT;
  if(!Attacking){
  Attacking = true;
  StopAllCoroutines();
  }
  }
 
 if(PissedAtTC3)
 if(ON.Contains ("TC3")){
  Spot = false;
  Hunting = false;
  target = OT;
  if(!Attacking){
  Attacking = true;
  StopAllCoroutines();
  }
  }
 
 if(PissedAtTC4)
 if(ON.Contains ("TC4")){
  Spot = false;
  Hunting = false;
  target = OT;
  if(!Attacking){
  Attacking = true;
  StopAllCoroutines();
  }
  } 
 
 if(ON.Contains ("TC5")){
  Spot = false;
  Hunting = false;
  target = OT;
  if(!Attacking){
  Attacking = true;
  StopAllCoroutines();
  }
  }

if(PissedAtTC7)
if(ON.Contains ("TC7")){
  Spot = false;
  Hunting = false;
  target = OT;
  if(!Attacking){
  Attacking = true;
  StopAllCoroutines();
  }
  }
  
if(PissedAtTC8)
if(ON.Contains ("TC8")){
  Spot = false;
  Hunting = false;
  target = OT;
  if(!Attacking){
  Attacking = true;
  StopAllCoroutines();
  }
  }
  
if(PissedAtTC9)
if(ON.Contains ("TC9")){
  Spot = false;
  Hunting = false;
  target = OT;
  if(!Attacking){
  Attacking = true;
  StopAllCoroutines();
  }
  }

}

function Targety () {
if(!Spot && !Attacking){
TargetArea();
}
}

function TargetArea () {
Hunting = false;
Spot = false;
target = Waypoint;
yield WaitForSeconds (20);
target = ResetView;
Spot = false;
Hunting = true;
}

function Regenerator () {

Tick = false;

var hit1 : RaycastHit;
var hit2 : RaycastHit;

Debug.DrawRay (thisTransform.position + thisTransform.up * 0.5, -thisVTransform.up * 200f, Color.white);
if (Physics.Raycast (thisTransform.position + thisTransform.up * 0.5, -thisVTransform.up, hit1, 200, targetLayers))
Point1u = hit1.point;

Debug.DrawRay (thisTransform.position + -thisTransform.up * 0.5, -thisVTransform.up * 200f, Color.white);
if (Physics.Raycast (thisTransform.position + -thisTransform.up * 0.5, -thisVTransform.up, hit2, 200, targetLayers))
Point1d = hit2.point;

if(Vector3.Distance(Point1u, Point1d) > 3){
Slope = 2;
Obstacle = false;
TurnRight = false;
TurnLeft = false;
Point1d = Vector3(0.1,0.1,0.1);
Point1u = Vector3(0.1,0.1,0.1);
}

if(TurnRight || TurnLeft)
Rotator.TurnedOff = true;

if(!TurnRight && !TurnLeft)
Rotator.TurnedOff = false;

if(JustNoticed > 0)
Rotator.TurnedOff = false;

if(AbiaSyndicateNetwork.instance.AbiaBaseHomePoint){
if(Vector3.Distance(thisTransform.position, AbiaSyndicateNetwork.instance.AbiaBaseHomePoint.position) < 1500)
CloseToBase = true;
else
CloseToBase = false;
}

if(AbiaSyndicateNetwork.TC1CriminalLevel > 0)
PissedAtTC1 = true;

if(AbiaSyndicateNetwork.TC2CriminalLevel > 0)
PissedAtTC2 = true;

if(AbiaSyndicateNetwork.TC4CriminalLevel > 0)
PissedAtTC4 = true;

if(AbiaSyndicateNetwork.TC5CriminalLevel > 0)
PissedAtTC5 = true;

if(AbiaSyndicateNetwork.TC7CriminalLevel > 0)
PissedAtTC7 = true;

if(AbiaSyndicateNetwork.TC8CriminalLevel > 0)
PissedAtTC8 = true;

if(AbiaSyndicateNetwork.TC9CriminalLevel > 0)
PissedAtTC9 = true;

if(target){
if(Vector3.Distance(thisTransform.position, target.transform.position) > 100)
Rotator.RotateThreshold = 0.1;
else
Rotator.RotateThreshold = 0.5;
}

if(Attacking){

Trig.center = Vector3(0,0,0);
Trig.radius = 100;
Trig.height = 100;

if(target != null)
if (!Physics.Linecast (thisTransform.position, target.position, targetLayers)){
TurnRight = false;
TurnLeft = false;
JustNoticed = 2;
}

}else{
Trig.center = Vector3(0,0,200);
Trig.radius = 200;
Trig.height = 800;
}

if(DangerSense > 0){

if(DangerSense < 2){
target = ResetView;
}

DangerSense -= 1;
}

if(Stuck > 0)
Stuck -= 1;

if(JustNoticed > 0)
JustNoticed -= 1;

if(Slope > 0)
Slope -= 1;

if(!Attacking)
FoundSmall = false;

if (target)
if(Vector3.Distance(thisTransform.position, target.transform.position) > 1000){
Attacking = false;
Hunting = true;
target = ResetView;
}

Obstacle = false;
}

function LeaveMarker () {

var lastPos : Vector3 = thisTransform.position;
IsEscaping(lastPos);
}

function IsEscaping(lastPos : Vector3){
yield WaitForSeconds (2);

  if(Vector3.Distance(thisTransform.position, lastPos) < 1)
  Stuck = 2;
}