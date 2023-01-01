var target : Transform;
var Waypoint : Transform;
var Waypoint2 : Transform;
var Thruster : GameObject;
var Wing : WingScript;
var Wing2 : WingScript;
var Trig : CapsuleCollider;
var Gun1 : NPCGun;
var Gun2 : NPCGun;
var Gun1RB : Rigidbody;
var Gun2RB : Rigidbody;
var Presence : GameObject;

var thisTransform : Transform;
var thisVTransform : Transform;

var vRigidbody : Rigidbody;

var EyeShot : GameObject;
var EyeMuzzle : Transform;

var IsSentinel : boolean;

var IsTurret : boolean;

var HuntingSound : GameObject;
var SpotSound : GameObject;
var AttackSound : GameObject;
var RejectSound : GameObject;

var PissedAtTC0a = 0;

var PissedAtTC1 = 0;
var PissedAtTC3 = 0;
var PissedAtTC5 = 0;
var PissedAtTC6 = 0;
var PissedAtTC7 = 0;
var PissedAtTC8 = 0;
var PissedAtTC9 = 0;

var Stranger : Transform;

var StrangerIsMoving : boolean;
var Attacking : boolean;
var Roofstacle : boolean;
var Floorstacle : boolean;
var Obstacle : boolean = false;
var Stuck : boolean = false;
var TargetTooClose : boolean;

var TurnRight : boolean;
var TurnLeft : boolean;
var LineOfFire : boolean;
var DangerDirection : Vector3;

var targetLayers : LayerMask;
var targetLayers2 : LayerMask;

var MtargetLayers : LayerMask;

var Dodge = 0;

var JustNoticed = 0;
var Looking = 0;
var DangerSense = 0;
var AngerLevel = 0;
var WatchTick = 0;

var GyroForce = 0.0;
var TurnForce = 0.0;

var ShootFrequency : float = 5;
var UniqueShootTime : float = 0.1;

InvokeRepeating("Regenerator", 1, 1);

InvokeRepeating("LeaveMarker", 1, 10);

InvokeRepeating("Warning", 5, Random.Range(19, 21));

InvokeRepeating("Shooty", 1, ShootFrequency);

function Start (){

target = Waypoint;
UniqueShootTime = Random.Range(0, 0.2);

KabrianLaw.KabrianPolicePresent = true;

}

function Update () {

var hit : RaycastHit;

if(AngerLevel > 100)
	LookSpeed = 200;
	else 
	LookSpeed = 100;

if (Physics.Raycast (thisTransform.position + thisTransform.forward * 5, thisTransform.forward, hit, 600, targetLayers2)){
 
 if(hit.collider.name.Contains ("TC0")  || hit.collider.name.Contains ("TC1") 
                                        || hit.collider.name.Contains ("TC3") 
                                        || hit.collider.name.Contains ("TC4")
                                        || hit.collider.name.Contains ("TC5")
                                        || hit.collider.name.Contains ("TC6")
                                        || hit.collider.name.Contains ("TC7")
                                        || hit.collider.name.Contains ("TC8")
                                        || hit.collider.name.Contains ("TC9")){
                                        
     LineOfFire = true;
 }else{
     LineOfFire = false;
 }
}

if(target == null && Attacking){
AngerLevel = 4;
Attacking = false;
Looking = 0;
  
target = Waypoint;
StopAllCoroutines();
}

if(target)
if(Vector3.Distance(thisTransform.position, target.position) < 10 && Attacking){
TargetTooClose = true;
if(AngerLevel < 150)
AngerLevel += 1;
}else{
TargetTooClose = false;
}

if(!IsTurret){
if(TurnLeft){
if(vRigidbody.velocity.magnitude > 40 && Looking == 0)
  TurnForce = -40;
if(vRigidbody.velocity.magnitude < 40 && Looking == 0)
  TurnForce = -20;
}

if(TurnRight){
if(vRigidbody.velocity.magnitude > 40 && Looking == 0)
  TurnForce = 40;
if(vRigidbody.velocity.magnitude < 40 && Looking == 0)
  TurnForce = 20;
}

if(TurnLeft && TurnRight){
  TurnForce = -40;
}

if(!TurnLeft && !TurnRight){
  TurnForce = 0;
}
 
if(vRigidbody.velocity.magnitude > 20){

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
 
} else if(vRigidbody.velocity.magnitude < 20){

if(vRigidbody.velocity.magnitude > 5){

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
 
} else if(vRigidbody.velocity.magnitude < 5){

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

if(vRigidbody.velocity.magnitude > 20){
Debug.DrawRay (thisTransform.position + thisTransform.forward * 1, thisTransform.forward * 100f, Color.white);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 1, thisTransform.forward, 100)) {
     Obstacle = true;
 } else {
     Obstacle = false;
 }
 
 newRot = (thisVTransform.up * 0.6f + thisVTransform.forward * 0.2f).normalized;
Debug.DrawRay (thisTransform.position + thisTransform.forward * 1, newRot * 50f, Color.blue);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 1, newRot, 50)) {
     Roofstacle = true;
 } else {
     Roofstacle = false;
 }
 
if(Attacking){
  newRot = (thisVTransform.up * 0.6f + thisVTransform.forward * -0.2f).normalized;
Debug.DrawRay (thisTransform.position + thisTransform.forward * 1, newRot * 50f, Color.red);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 1, newRot, 50)) {
     Floorstacle = true;
 } else {
     Floorstacle = false;
 }
}

 } else if(vRigidbody.velocity.magnitude < 20){

if(vRigidbody.velocity.magnitude < 7){

Debug.DrawRay (thisTransform.position + thisTransform.forward * 1, thisVTransform.up * 5f, Color.white);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 1, thisVTransform.up, 5)) {
		Obstacle = true;
	} else {
	    Obstacle = false;
	}
	
	newRot = (thisVTransform.up * 0.6f + thisVTransform.forward * 0.2f).normalized;
Debug.DrawRay (thisTransform.position + thisTransform.forward * 1, newRot * 5f, Color.blue);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 1, newRot, 5)) {
     Roofstacle = true;
 } else {
     Roofstacle = false;
 }
 
if(Attacking){
   newRot = (thisVTransform.up * 0.6f + thisVTransform.forward * -0.2f).normalized;
Debug.DrawRay (thisTransform.position + thisTransform.forward * 1, newRot * 5f, Color.red);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 1, newRot, 5)) {
     Floorstacle = true;
 } else {
     Floorstacle = false;
 }
}
	
} else if(vRigidbody.velocity.magnitude > 7){
Debug.DrawRay (thisTransform.position + thisTransform.forward * 1, thisVTransform.up * 20f, Color.white);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 1, thisVTransform.up, 20)) {
		Obstacle = true;
	} else {
	    Obstacle = false;
	}
	
	newRot = (thisVTransform.up * 0.6f + thisVTransform.forward * 0.2f).normalized;
Debug.DrawRay (thisTransform.position + thisTransform.forward * 1, newRot * 20f, Color.blue);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 1, newRot, 20)) {
     Roofstacle = true;
 } else {
     Roofstacle = false;
 }
 
if(Attacking){
   newRot = (thisVTransform.up * 0.6f + thisVTransform.forward * -0.2f).normalized;
Debug.DrawRay (thisTransform.position + thisTransform.forward * 1, newRot * 20f, Color.red);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 1, newRot, 20)) {
     Floorstacle = true;
 } else {
     Floorstacle = false;
 }
}

}
}
}

}


private var NewRotation : Quaternion;
function FixedUpdate () {

if(!IsTurret){

var localV = thisTransform.InverseTransformDirection(rigidbody.velocity);

if(Roofstacle && !Stuck){
  
  if(JustNoticed < 1 && !Attacking && Looking == 0)
  vRigidbody.AddTorque(thisVTransform.right * -20);
  
}

if(Floorstacle && !Stuck){
  
  if(JustNoticed < 1 && !Attacking && Looking == 0)
  vRigidbody.AddTorque(thisVTransform.right * 20);
  
}

if(Obstacle && !Stuck){

  if(localV.z > 5)
  vRigidbody.AddTorque(thisVTransform.right * 10);
  
  if(localV.z > 0){
  if(localV.z < 40)
  Thruster.rigidbody.AddForce(Thruster.transform.up * -40);
  if(localV.z > 40)
  Thruster.rigidbody.AddForce(Thruster.transform.up * -80);
  }
  
  if(localV.z < 5 && Looking == 0 && !Attacking)
  vRigidbody.AddTorque(thisVTransform.forward * -20);
  
}

if(Dodge > 0 && !Roofstacle)
Thruster.rigidbody.AddForce(Thruster.transform.forward * 40);

if(TargetTooClose)
  Thruster.rigidbody.AddForce(Thruster.transform.up * -20);

if(Stuck){
  if(-localV.z < 2)
  Thruster.rigidbody.AddForce(Thruster.transform.up * -40);
}

if(Attacking && !Stuck  && !Obstacle && !TargetTooClose){
if(localV.z < 60)
  Thruster.rigidbody.AddForce(Thruster.transform.up * 30);
  GyroForce = -1;
}

if(!IsSentinel){
if(!Obstacle && !Attacking && Looking == 0 && !Stuck) {
  if(localV.z < 40)
  Thruster.rigidbody.AddForce(Thruster.transform.up * 15);
  GyroForce = -2;
}
}else{
if(!Obstacle && !Attacking && Looking == 0 && !Stuck) {
  if(localV.z < 60)
  Thruster.rigidbody.AddForce(Thruster.transform.up * 30);
  GyroForce = -2;
}
}

if(Looking > 0 && !Stuck  && !Obstacle && !Attacking){
  Thruster.rigidbody.AddForce(Thruster.transform.up * 5);
  GyroForce = -2;
}

//----------------------------------------------------------------------------------------------------------------------

vRigidbody.AddForceAtPosition(Vector3.up*GyroForce, -thisVTransform.forward*2);
vRigidbody.AddForceAtPosition(-Vector3.up*GyroForce, thisVTransform.forward*2);

vRigidbody.AddTorque(thisVTransform.forward * TurnForce);

 if (Physics.Raycast (thisTransform.position, Vector3.down, 3, targetLayers)) 
 rigidbody.AddForce(Vector3.up * 50);
 
 if(!Attacking)
 if (Physics.Raycast (thisTransform.position, Vector3.down, 500, targetLayers)) 
 rigidbody.AddForce(Vector3.down * 5);

}

 if (target && DangerSense < 1) {
 
 if(TurnLeft || TurnRight || Roofstacle || Floorstacle)
  rigidbody.freezeRotation = false;
  
 if(!TurnLeft && !TurnRight && !Roofstacle && !Floorstacle)
  rigidbody.freezeRotation = true;
  
 if(JustNoticed > 0)
  rigidbody.freezeRotation = true;
  
  NewRotation = Quaternion.LookRotation(target.position - thisTransform.position);
  thisTransform.rotation = Quaternion.RotateTowards(thisTransform.rotation, NewRotation, Time.deltaTime * 100);
 }
 
 if (DangerSense > 0 && DangerDirection != Vector3.zero) {
  
  NewRotation = Quaternion.LookRotation(DangerDirection);
  thisTransform.rotation = Quaternion.RotateTowards(thisTransform.rotation, NewRotation, Time.deltaTime * 200);
 }
 
}

function OnTriggerEnter (other : Collider) {

ON = other.name;
OT = other.transform;

if(Physics.Linecast (thisTransform.position, OT.position, MtargetLayers))
return;

if(ON.Contains ("TC0") || ON.Contains ("TC1")
                                         || ON.Contains ("TC3")
                                         || ON.Contains ("TC5")
                                         || ON.Contains ("TC6")
                                         || ON.Contains ("TC7")
                                         || ON.Contains ("TC8")
                                         || ON.Contains ("TC9")){
  Stranger = OT;
}

if(ON.Contains ("TFC0a"))
PissedAtTC0a = 5;

if(ON.Contains ("TFC1")){
var relativePoint = OT.InverseTransformPoint(thisVTransform.position);
if(relativePoint.z > 0)
PissedAtTC1 = 5;
}

if(ON.Contains ("TFC3"))
PissedAtTC3 = 5;

if(ON.Contains ("TFC5"))
PissedAtTC5 = 5;

if(ON.Contains ("TFC6"))
PissedAtTC6 = 5;

if(ON.Contains ("TFC7"))
PissedAtTC7 = 5;

if(ON.Contains ("TFC8"))
PissedAtTC8 = 5;

if(ON.Contains ("TFC9"))
PissedAtTC9 = 5;

if(ON.Contains ("TC") && !Attacking && Looking == 0 && AngerLevel < 5){
if(!ON.Contains ("TC2")){
  target = OT;
  
  if(!IsSentinel)
  Looking = 20;
  else
  Looking = 40;
  
  var TheThing = Instantiate(SpotSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing.transform.parent = thisTransform;
}else{
if(AgrianNetwork.instance.Curiosity > 200){
if(AgrianNetwork.TC1CriminalLevel > 500){
if(ON.Contains ("2_P")){
target = OT;

if(!IsSentinel)
Looking = 20;
else
Looking = 40;
  
var TheThing0 = Instantiate(SpotSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
TheThing0.transform.parent = thisTransform;
}
}
}
}
}

if(ON)
if(ON.Contains ("TFC")){

var relativePoint0 = OT.InverseTransformPoint(thisTransform.position);
FAndB = relativePoint0.z;

if(Attacking){
if(Vector3.Distance(thisTransform.position, OT.position) < 25)
if(AngerLevel < 150)
AngerLevel += 15;
}else{
if(AngerLevel < 150 && WatchTick < 1)
AngerLevel += 15;
}

if(!ON.Contains ("TFC2")){
  
Dodge = 1;

if(!Attacking && Looking == 0 && DangerSense == 0 && AngerLevel == 0){
var TheThing1 = Instantiate(AttackSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing1.transform.parent = thisTransform;
  
if(other.rigidbody){
if(FAndB > 0)
DangerDirection = -other.rigidbody.velocity.normalized;
else
DangerDirection = other.rigidbody.velocity.normalized;
}
  
DangerSense = 10;

AngerLevel = 10;
WatchTick = 2;
}
}

}

}

function OnTriggerStay (other : Collider) {

ON = other.name;
OT = other.transform;

if(Physics.Linecast (thisTransform.position, OT.position, MtargetLayers))
return;

if(target){

 if(ON.Contains ("TC0a") && PissedAtTC0a > 0){
  DangerSense = 0;
  target = OT;
  if(!Attacking && AngerLevel > 50){
  Looking = 0;
  DangerSense = 0;
  Attacking = true;
  StopAllCoroutines();
  }
  }

if(ON.Contains ("TC4")){
  DangerSense = 0;
  target = OT;
  if(!Attacking && AngerLevel > 50){
  Looking = 0;
  DangerSense = 0;
  Attacking = true;
  StopAllCoroutines();
  }
  }
  
 if(ON.Contains ("TC1") && PissedAtTC1 > 0){
 DangerSense = 0;
 
 if(AgrianNetwork.TC1CriminalLevel > 240 && AngerLevel < 50)
  AngerLevel = 60;
  
  target = OT;
  if(!Attacking && AngerLevel > 50){
  Looking = 0;
  DangerSense = 0;
  Attacking = true;
  StopAllCoroutines();
  }
  }
  
 if(ON.Contains ("TC3") && PissedAtTC3 > 0){
 DangerSense = 0;
 
 if(AgrianNetwork.TC3CriminalLevel > 240 && AngerLevel < 50)
  AngerLevel = 60;
  
  target = OT;
  if(!Attacking && AngerLevel > 50){
  Looking = 0;
  DangerSense = 0;
  Attacking = true;
  StopAllCoroutines();
  }
  }
  
 if(ON.Contains ("TC4")){
 DangerSense = 0;
 
  target = OT;
  if(!Attacking && AngerLevel > 50){
  Looking = 0;
  DangerSense = 0;
  Attacking = true;
  StopAllCoroutines();
  }
  }
  
 if(ON.Contains ("TC5") && PissedAtTC5 > 0){
 DangerSense = 0;
 
  target = OT;
  if(!Attacking && AngerLevel > 50){
  Looking = 0;
  DangerSense = 0;
  Attacking = true;
  StopAllCoroutines();
  }
  }
  
if(ON.Contains ("TC6") && PissedAtTC6 > 0)
if(!ON.Contains ("csT")){
DangerSense = 0;

if(AgrianNetwork.TC6CriminalLevel > 240 && AngerLevel < 50)
  AngerLevel = 60;

  target = OT;
  if(!Attacking && AngerLevel > 50){
  Looking = 0;
  DangerSense = 0;
  Attacking = true;
  StopAllCoroutines();
  }
  }
  
if(ON.Contains ("TC7") && PissedAtTC7 > 0)
if(!ON.Contains ("cT")){
DangerSense = 0;

if(AgrianNetwork.TC7CriminalLevel > 240 && AngerLevel < 50)
  AngerLevel = 60;

  target = OT;
  if(!Attacking && AngerLevel > 50){
  Looking = 0;
  DangerSense = 0;
  Attacking = true;
  StopAllCoroutines();
  }
  }
  
if(ON.Contains ("TC8") && PissedAtTC8 > 0)
if(!ON.Contains ("cT")){
DangerSense = 0;

if(AgrianNetwork.TC8CriminalLevel > 240 && AngerLevel < 50)
  AngerLevel = 60;

  target = OT;
  if(!Attacking && AngerLevel > 50){
  Looking = 0;
  DangerSense = 0;
  Attacking = true;
  StopAllCoroutines();
  }
  }
  
if(ON.Contains ("TC9") && PissedAtTC9 > 0)
if(!ON.Contains ("cT")){
DangerSense = 0;

if(AgrianNetwork.TC9CriminalLevel > 240 && AngerLevel < 50)
  AngerLevel = 60;

  target = OT;
  if(!Attacking && AngerLevel > 50){
  Looking = 0;
  DangerSense = 0;
  Attacking = true;
  StopAllCoroutines();
  }
  }
 }
}

function Shooty () {

if(Attacking && LineOfFire && AngerLevel > 30){
Shoot();
}
}

function Shoot () {
yield WaitForSeconds (UniqueShootTime);

if(target)
if(Vector3.Distance(thisTransform.position, target.position) < 20){
var TheThing = Instantiate(EyeShot, EyeMuzzle.position, EyeMuzzle.rotation);
    TheThing.transform.parent = thisTransform;
return;
}

if(Gun1 != null)
Gun1.Fire();

yield WaitForSeconds (0.14);

if(Gun2 != null)
Gun2.Fire();
}

function Warning () {
  if(AngerLevel < 5){
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

function Regenerator () {

rigidbody.centerOfMass = Vector3(0, 0, 0);

if(!IsTurret){
if(!Attacking){
if(DangerSense < 2 && Looking < 2){

if(AgrianNetwork.instance.AlertTime > 1){
Waypoint2.position = AgrianNetwork.instance.PriorityWaypoint.transform.position;
target = Waypoint2;
}
if(AgrianNetwork.instance.RedAlertTime > 1){
Waypoint2.position = AgrianNetwork.instance.FullPriorityWaypoint.transform.position;
target = Waypoint2;
}

}
}
}else{

if(target)
if(target.name.Contains ("TC4"))
AngerLevel = 150;

}

if(Attacking || Looking > 0)
if(target)
if (!Physics.Linecast (thisTransform.position, target.position, targetLayers)){
TurnRight = false;
TurnLeft = false;
Roofstacle = false;
Floorstacle = false;
JustNoticed = 2;
if(Vector3.Distance(thisTransform.position, target.position) < 80 && !IsTurret)
vRigidbody.drag = 1;
}

if(Attacking){

Trig.center = Vector3(0,0,0);
Trig.radius = 20;
Trig.height = 20;

}else{

if(!IsTurret){
Trig.center = Vector3(0,0,150);
Trig.radius = 100;
Trig.height = 600;
}else{
Trig.center = Vector3(0,0,0);
Trig.radius = 50;
Trig.height = 50;
}
}

if(!Attacking){

if(!IsTurret)
vRigidbody.drag = 0.2;

if(Looking == 1){
  Looking = 0;
  target = Waypoint;
  
  var TheThing3 = Instantiate(RejectSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing3.transform.parent = thisTransform;
}
}

if(DangerSense == 1){
if(!Attacking){
  Looking = 0;
  target = Waypoint;
  
if(!IsTurret)
  vRigidbody.drag = 0.2;
  
  var TheThing4 = Instantiate(RejectSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing4.transform.parent = thisTransform;
}
}

if(target){
if(AgrianNetwork.instance.RedAlertTime < 1 && AgrianNetwork.instance.AlertTime < 1){
if(!Attacking){
if(target.name.Contains ("Priority"))
target = Waypoint;
}else{
if(AngerLevel < 5){
target = Waypoint;
Attacking = false;
}
}
}else{
if(Looking > 5)
Looking = 5;
}
}

if(JustNoticed < 1 && !IsTurret)
Wing.Broken = false;

if(JustNoticed > 0){
JustNoticed -= 1;
if(Attacking && !IsTurret)
Wing.Broken = true;
}

if(WatchTick > 0)
WatchTick -= 1;

if(Looking > 0)
Looking -= 1;

if(DangerSense > 0)
DangerSense -= 1;

if(AngerLevel > 1)
AngerLevel -= 1;

if(Dodge > 0)
Dodge -= 1;

if(AgrianNetwork.TC1CriminalLevel > 240 && PissedAtTC1 < 1)
PissedAtTC1 = 60;

if(AgrianNetwork.TC3CriminalLevel > 240 && PissedAtTC3 < 1)
PissedAtTC3 = 60;

if(AgrianNetwork.TC5CriminalLevel > 240 && PissedAtTC5 < 1)
PissedAtTC5 = 60;

if(AgrianNetwork.TC6CriminalLevel > 240 && PissedAtTC6 < 1)
PissedAtTC6 = 60;

if(AgrianNetwork.TC7CriminalLevel > 240 && PissedAtTC7 < 1)
PissedAtTC7 = 60;

if(AgrianNetwork.TC8CriminalLevel > 240 && PissedAtTC8 < 1)
PissedAtTC8 = 60;

if(AgrianNetwork.TC9CriminalLevel > 240 && PissedAtTC9 < 1)
PissedAtTC9 = 60;

if(target){
if(AgrianNetwork.TC1CriminalLevel < 500){
if(AgrianNetwork.TC1CriminalLevel > 240 && target.name.Contains ("TC1")){
AgrianNetwork.instance.PriorityWaypoint.position = target.position;
AgrianNetwork.instance.TC1CriminalLevel = 360;
}
}else{
if(target.name.Contains ("TC1")){
if(AgrianNetwork.instance.RedAlertTime > 0){
AgrianNetwork.instance.FullPriorityWaypoint.position = target.position;
}else{
AgrianNetwork.instance.PriorityWaypoint.position = target.position;
}
if(AgrianNetwork.instance.AlertTime < 300)
AgrianNetwork.instance.AlertTime = 300;
AgrianNetwork.instance.TC1CriminalLevel = 620;
}else{
if(target.name.Contains ("2_P")){
AgrianNetwork.instance.FullPriorityWaypoint.position = target.position;
}
}
}

if(AgrianNetwork.TC3CriminalLevel < 500){
if(AgrianNetwork.TC3CriminalLevel > 240 && target.name.Contains ("TC3")){
AgrianNetwork.instance.PriorityWaypoint.position = target.position;
AgrianNetwork.instance.TC3CriminalLevel = 360;
}
}else{
if(target.name.Contains ("TC3")){
if(AgrianNetwork.instance.RedAlertTime > 0){
AgrianNetwork.instance.FullPriorityWaypoint.position = target.position;
}else{
AgrianNetwork.instance.PriorityWaypoint.position = target.position;
}
if(AgrianNetwork.instance.AlertTime < 300)
AgrianNetwork.instance.AlertTime = 300;
AgrianNetwork.instance.TC3CriminalLevel = 620;
}
}

if(AgrianNetwork.TC4CriminalLevel < 500){
if(AgrianNetwork.TC4CriminalLevel > 240 && target.name.Contains ("TC4")){
AgrianNetwork.instance.PriorityWaypoint.position = target.position;
AgrianNetwork.instance.TC4CriminalLevel = 360;
}
}else{
if(target.name.Contains ("TC4")){
if(AgrianNetwork.instance.RedAlertTime > 0){
AgrianNetwork.instance.FullPriorityWaypoint.position = target.position;
}else{
AgrianNetwork.instance.PriorityWaypoint.position = target.position;
}
if(AgrianNetwork.instance.AlertTime < 300)
AgrianNetwork.instance.AlertTime = 300;
AgrianNetwork.instance.TC4CriminalLevel = 620;
}
}

if(AgrianNetwork.TC5CriminalLevel < 500){
if(AgrianNetwork.TC5CriminalLevel > 240 && target.name.Contains ("TC5")){
AgrianNetwork.instance.PriorityWaypoint.position = target.position;
AgrianNetwork.instance.TC5CriminalLevel = 360;
}
}else{
if(target.name.Contains ("TC5")){
if(AgrianNetwork.instance.RedAlertTime > 0){
AgrianNetwork.instance.FullPriorityWaypoint.position = target.position;
}else{
AgrianNetwork.instance.PriorityWaypoint.position = target.position;
}
if(AgrianNetwork.instance.AlertTime < 300)
AgrianNetwork.instance.AlertTime = 300;
AgrianNetwork.instance.TC5CriminalLevel = 620;
}
}

if(AgrianNetwork.TC6CriminalLevel < 500){
if(AgrianNetwork.TC6CriminalLevel > 240 && target.name.Contains ("TC6")){
AgrianNetwork.instance.PriorityWaypoint.position = target.position;
AgrianNetwork.instance.TC6CriminalLevel = 360;
}
}else{
if(target.name.Contains ("TC6")){
if(AgrianNetwork.instance.RedAlertTime > 0){
AgrianNetwork.instance.FullPriorityWaypoint.position = target.position;
}else{
AgrianNetwork.instance.PriorityWaypoint.position = target.position;
}
if(AgrianNetwork.instance.AlertTime < 300)
AgrianNetwork.instance.AlertTime = 300;
AgrianNetwork.instance.TC6CriminalLevel = 620;
}
}

if(AgrianNetwork.TC7CriminalLevel < 500){
if(AgrianNetwork.TC7CriminalLevel > 240 && target.name.Contains ("TC7")){
AgrianNetwork.instance.PriorityWaypoint.position = target.position;
AgrianNetwork.instance.TC7CriminalLevel = 360;
}
}else{
if(target.name.Contains ("TC7")){
if(AgrianNetwork.instance.RedAlertTime > 0){
AgrianNetwork.instance.FullPriorityWaypoint.position = target.position;
}else{
AgrianNetwork.instance.PriorityWaypoint.position = target.position;
}
if(AgrianNetwork.instance.AlertTime < 300)
AgrianNetwork.instance.AlertTime = 300;
AgrianNetwork.instance.TC7CriminalLevel = 620;
}
}

if(AgrianNetwork.TC8CriminalLevel < 500){
if(AgrianNetwork.TC8CriminalLevel > 240 && target.name.Contains ("TC8")){
AgrianNetwork.instance.PriorityWaypoint.position = target.position;
AgrianNetwork.instance.TC8CriminalLevel = 360;
}
}else{
if(target.name.Contains ("TC8")){
if(AgrianNetwork.instance.RedAlertTime > 0){
AgrianNetwork.instance.FullPriorityWaypoint.position = target.position;
}else{
AgrianNetwork.instance.PriorityWaypoint.position = target.position;
}
if(AgrianNetwork.instance.AlertTime < 300)
AgrianNetwork.instance.AlertTime = 300;
AgrianNetwork.instance.TC8CriminalLevel = 620;
}
}

if(AgrianNetwork.TC9CriminalLevel < 500){
if(AgrianNetwork.TC9CriminalLevel > 240 && target.name.Contains ("TC9")){
AgrianNetwork.instance.PriorityWaypoint.position = target.position;
AgrianNetwork.instance.TC9CriminalLevel = 360;
}
}else{
if(target.name.Contains ("TC9")){
if(AgrianNetwork.instance.RedAlertTime > 0){
AgrianNetwork.instance.FullPriorityWaypoint.position = target.position;
}else{
AgrianNetwork.instance.PriorityWaypoint.position = target.position;
}
if(AgrianNetwork.instance.AlertTime < 300)
AgrianNetwork.instance.AlertTime = 300;
AgrianNetwork.instance.TC9CriminalLevel = 620;
}
}
}

if(PissedAtTC0a > 0)
PissedAtTC0a -= 1;

if(PissedAtTC1 > 0)
PissedAtTC1 -= 1;
  
if(PissedAtTC3 > 0)
PissedAtTC3 -= 1;
  
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

if(target)
if(PissedAtTC0a < 1 && Looking < 1 && target.name.Contains ("TC0a"))
target = null;

if(target)
if(PissedAtTC1 < 1 && Looking < 1 && target.name.Contains ("TC1"))
target = null;

if(target)
if(PissedAtTC3 < 1 && Looking < 1 && target.name.Contains ("TC3"))
target = null;

if(target)
if(PissedAtTC5 < 1 && Looking < 1 && target.name.Contains ("TC5"))
target = null;

if(target)
if(PissedAtTC6 < 1 && Looking < 1 && target.name.Contains ("TC6"))
target = null;

if(target)
if(PissedAtTC7 < 1 && Looking < 1 && target.name.Contains ("TC7"))
target = null;

if(target)
if(PissedAtTC8 < 1 && Looking < 1 && target.name.Contains ("TC8"))
target = null;

if(target)
if(PissedAtTC9 < 1 && Looking < 1 && target.name.Contains ("TC9"))
target = null;


Floorstacle = false;

LineOfFire = false;

}