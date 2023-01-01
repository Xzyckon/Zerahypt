var target : Transform;
var ResetView : Transform;
var Waypoint2 : Transform;
var Waypoint3 : Transform;
var BothunterGyro : GameObject;
var BothunterHoverer : GameObject;
var Trig : CapsuleCollider;
var Turner : BigVesselRotator;
var Turret : TurretAI;
var TurretTF : Transform;

var isFughunter : boolean;

var launcher1 : Transform;
var launcher2 : Transform;

var MissileAmmo : GameObject;

var Missile1GO : GameObject;
var Missile2GO : GameObject;

var Supplies : GameObject;

var Blinker1 : Blinker;
var Blinker2 : Blinker;
var Blinker3 : Blinker;

var BothunterPresence : GameObject;
var SpotSound : GameObject;

var thisTransform : Transform;
var thisVTransform : Transform;

var vRigidbody : Rigidbody;

var PissedAtTC0a = 0;
var PissedAtTC1 = 0;
var PissedAtTC4 = 0;
var PissedAtTC5 = 0;
var PissedAtTC6 = 0;
var PissedAtTC7 = 0;
var PissedAtTC8 = 0;
var PissedAtTC9 = 0;

var Fear : Transform;

var Hunting : boolean;
var Attacking : boolean;
var Obstacle : boolean;
var Stuck : boolean;
var Cruising : boolean;
var TurnRight : boolean;
var TurnLeft : boolean;

var RPClamp : float = 0;
var RPClamp2 : float = 0;
var RPMod : float = 0;

var Dropping : boolean;
var DropCounter = 4;

var StoredMissileBatches = 6;

var Tactical : boolean;

var IsClose : boolean;

var Wall : boolean;

var lastPos : Vector3;

var targetDist : float = 0;

var DangerSense = 0;

var targetLayers : LayerMask;
var MtargetLayers : LayerMask;

var FoundExtraBig : boolean;

var LayingLow = 0;

var JustNoticed = 0;

var Watching = 0;

var DirForce = 6;

var Vel : float = 0;

var newRot2 : Vector3;

var RotateThreshold : float = 0;

var TorqueForce : float = 0;

var RUP : float = 0;

InvokeRepeating("LeaveMarker", 1, 1);

InvokeRepeating("Targety", 10, 30);

InvokeRepeating("Shooty", 1, 0.2);

InvokeRepeating("TacticChange", 1, 10);

function Start (){
Hunting = true;
if(!isFughunter)
Waypoint3 = PlayerInformation.instance.PiriTarget;
}

function Update () {

var localV = thisTransform.InverseTransformDirection(vRigidbody.velocity);

if(Watching > 1){

if (-localV.y > 0) {

if(Vector3.Distance(thisTransform.position, Waypoint3.transform.position) < 15)
     IsClose = true;
     
 } else {
     IsClose = false;
 }
 
RotateThreshold = 0.1;
}

if(!isFughunter){
if(CallAssistance.IsAssisting && !Attacking && Watching < 1 && PissedAtTC1 == 0 && !Dropping){

if (localV.z > 10) {

if(Vector3.Distance(thisTransform.position, Waypoint3.transform.position) < 50)
     IsClose = true;
     
 } else {
     IsClose = false;
     
     if(!TerrahyptianNetwork.HasDropped)
     if(Waypoint3.name.Contains ("sTC"))
     if(Vector3.Distance(thisTransform.position, Waypoint3.transform.position) < 30)
     if(DropCounter > 1)
     Dropping = true;
 }

if(Vector3.Distance(thisTransform.position, Waypoint3.transform.position) < 30)
target = ResetView;

if(Vector3.Distance(thisTransform.position, Waypoint3.transform.position) > 30){
target = Waypoint3;
if(Vector3.Distance(thisTransform.position, Waypoint3.transform.position) < 50)
RotateThreshold = 0.8;
if(Vector3.Distance(thisTransform.position, Waypoint3.transform.position) > 50)
RotateThreshold = 0.1;
}

}

}

Vel0 = vRigidbody.velocity.magnitude * 2.24;

Vel = Mathf.Clamp(Vel0,0.1,512);

var hit : RaycastHit;

var hit1 : RaycastHit;
var hit2 : RaycastHit;

if(RUP < 4)
RUP += 0.5;
else
RUP = 0;

Debug.DrawRay (thisTransform.position + thisTransform.up * 0.2 + thisTransform.up * RUP, newRot2 * 150f, Color.white);
if (Physics.Raycast (thisTransform.position + thisTransform.up * 0.2 + thisTransform.up * RUP, newRot2, hit1, 150, MtargetLayers))
Point1u = hit1.point;
else
Point1u = Vector3(2,2,2);

Debug.DrawRay (thisTransform.position + thisTransform.up * RUP, newRot2 * 150f, Color.white);
if (Physics.Raycast (thisTransform.position + thisTransform.up * RUP, newRot2, hit2, 150, MtargetLayers))
Point1d = hit2.point;
else
Point1d = Vector3(8,8,8);

if(Vector3.Distance(Point1u, Point1d) > 0.6){
TurnRight = false;
TurnLeft = false;
}else{
Wall = true;
}

Debug.DrawRay (thisTransform.position, newRot2 * Vel, Color.green);
if (Physics.Raycast (thisTransform.position, newRot2, hit, Vel, targetLayers)) {
     if(Wall)
     Obstacle = true;
 } else {
     Obstacle = false;
 }
	
if(target != Waypoint3){
	
var newRot : Vector3 = (thisTransform.forward * 0.6f ).normalized;

if(Vel > 30){

newRot = (thisTransform.forward * 0.6f + thisTransform.right * 0.1f).normalized;

Debug.DrawRay (thisTransform.position + thisTransform.right * 5, newRot * 100f, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.right * 5, newRot, 100)) {
     TurnLeft = true;
     TorqueForce = 0;
 } else {
     TurnLeft = false;
 }
 
newRot = (thisTransform.forward * 0.6f + thisTransform.right * -0.1f).normalized;

Debug.DrawRay (thisTransform.position + -thisTransform.right * 5, newRot * 100f, Color.black);
if (Physics.Raycast (thisTransform.position + -thisTransform.right * 5, newRot, 100)) {
		TurnRight = true;
		TorqueForce = 0;
	} else {
        TurnRight = false;
 }
 
 }else{
 
 newRot = (thisTransform.forward * 0.6f + thisTransform.right * 0.1f).normalized;

Debug.DrawRay (thisTransform.position + thisTransform.right * 5, newRot * 50f, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.right * 5, newRot, 50)) {
     if(JustNoticed < 1)
     TurnLeft = true;
     TorqueForce = 0;
 } else {
     TurnLeft = false;
 }
 
newRot = (thisTransform.forward * 0.6f + thisTransform.right * -0.1f).normalized;

Debug.DrawRay (thisTransform.position + -thisTransform.right * 5, newRot * 50f, Color.black);
if (Physics.Raycast (thisTransform.position + -thisTransform.right * 5, newRot, 50)) {
		if(JustNoticed < 1)
		TurnRight = true;
		TorqueForce = 0;
	} else {
        TurnRight = false;
 }
}
}

}


private var NewRotation : Quaternion;
function FixedUpdate () {

var localV = thisTransform.InverseTransformDirection(vRigidbody.velocity);

newRot2 = (vRigidbody.velocity);
if(Vel < 30)
newRot2 = -thisVTransform.up;

if(target){
targetDist = Vector3.Distance(transform.position, target.position);
var RelativeTarget = thisTransform.InverseTransformPoint(target.position);
}

if(JustNoticed > 0){
RPMod = RelativeTarget.z;
RPClamp = Mathf.Clamp(RPMod,-40,40);
}else{
RPMod = RelativeTarget.x;
RPClamp = Mathf.Clamp(RPMod,-40,40);
}

if(!isFughunter){
 var difference = ((TurretTF.position + TurretTF.forward * 20) - thisVTransform.position).normalized;
 
 
 var product : float = Vector3.Dot(thisVTransform.right, difference);
 if (product < -RotateThreshold) {
  vRigidbody.AddTorque(thisVTransform.forward * TorqueForce);
 } else if (product > RotateThreshold) {
  vRigidbody.AddTorque(thisVTransform.forward * -TorqueForce);
 }
 }else{

if(Stuck || TurnLeft || TurnRight){
vRigidbody.AddTorque(thisVTransform.forward * TorqueForce);
}else{
vRigidbody.AddTorque(thisVTransform.forward * RPClamp);
}

}


if(IsClose){
  vRigidbody.AddForce(thisVTransform.up * 20);
}

if(Obstacle || Dropping){

  if(Vel > 30)
  vRigidbody.AddForce(newRot2 * -2);

  if(Watching < 1 && !Dropping)
  if(localV.z > 5)
  vRigidbody.AddForce(thisVTransform.up * 10);
  
  if(Watching > 1 || Dropping)
  if(localV.z > 0)
  vRigidbody.AddForce(thisVTransform.up * 10);
}

if(Stuck && !Dropping){
  if(Watching < 1){
  
  TurnRight = true;
  
  if(-localV.z < 20)
  vRigidbody.AddForce(thisVTransform.up * 20);
}
}

if(Attacking && !Obstacle){
if(!isFughunter){
  if(Tactical)
  if(localV.z < 70)
  vRigidbody.AddForce(thisVTransform.up * DirForce);
  if(!Tactical)
  if(localV.z < 70)
  vRigidbody.AddForce(thisVTransform.up * -20);
  }else{
  if(localV.z < 100)
  vRigidbody.AddForce(thisVTransform.up * -20);
  }
}

if(!Attacking && !Stuck && !Obstacle && !IsClose && !Dropping){
  if(!Obstacle)
  if(localV.z < 50)
  vRigidbody.AddForce(thisVTransform.up * -20);
  if(Obstacle)
  if(localV.z < 15)
  vRigidbody.AddForce(thisVTransform.up * -20);
}
 
if(TurnLeft && !TurnRight && !Dropping){
  BothunterGyro.rigidbody.AddTorque(thisTransform.up * -50);
}

if(TurnRight && !TurnLeft && !Dropping){
  BothunterGyro.rigidbody.AddTorque(thisTransform.up * 50);
}

if(TurnRight && TurnLeft && Obstacle && !Dropping){
  BothunterGyro.rigidbody.AddTorque(thisTransform.up * -50);
}
 
}

function OnTriggerEnter (other : Collider) {

ON = other.name;
OT = other.transform;

if(ON.Contains ("TFC"))
if(!ON.Contains ("TFC3")){

if(target)
if(target.name.Contains ("TC")){
if(ON.Contains ("TFC0a")){
if(target.name.Contains ("TC0a"))
if(PissedAtTC0a < 4)
PissedAtTC0a += 1;
}
if(ON.Contains ("TFC1")){
if(target.name.Contains ("TC1"))
if(PissedAtTC1 < 4)
PissedAtTC1 += 1;
}
if(ON.Contains ("TFC5")){
if(target.name.Contains ("TC5"))
if(PissedAtTC5 < 4)
PissedAtTC5 += 1;
}
if(ON.Contains ("TFC6")){
if(target.name.Contains ("TC6"))
if(PissedAtTC6 < 4)
PissedAtTC6 += 1;
}
if(ON.Contains ("TFC7")){
if(target.name.Contains ("TC7"))
if(PissedAtTC7 < 4)
PissedAtTC7 += 1;
}
if(ON.Contains ("TFC8")){
if(target.name.Contains ("TC8"))
if(PissedAtTC8 < 4)
PissedAtTC8 += 1;
}
if(ON.Contains ("TFC9")){
if(target.name.Contains ("TC9"))
if(PissedAtTC9 < 4)
PissedAtTC9 += 1;
}
}

if(!Attacking){
DangerSense = 8;
target = Waypoint2;
if(other.rigidbody)
Waypoint2.transform.position = OT.position;
}

}
}

function OnTriggerStay (other : Collider) {

ON = other.name;
OT = other.transform;

if(other != null){

if(ON.Contains ("C3"))
return;

if(isFughunter){

if(ON.Contains ("xb")){
if(ON.Contains ("C1")){TerrahyptianNetwork.AnExtraBigTC1 = OT;}
if(ON.Contains ("C4")){TerrahyptianNetwork.AnExtraBigTC4 = OT;}
if(ON.Contains ("C5")){TerrahyptianNetwork.AnExtraBigTC5 = OT;}
if(ON.Contains ("C6")){TerrahyptianNetwork.AnExtraBigTC6 = OT;}
if(ON.Contains ("C7")){TerrahyptianNetwork.AnExtraBigTC7 = OT;}
if(ON.Contains ("C8")){TerrahyptianNetwork.AnExtraBigTC8 = OT;}
if(ON.Contains ("C9")){TerrahyptianNetwork.AnExtraBigTC9 = OT;}
}

if(FoundExtraBig)
return;

}else{

if(!ON.Contains ("x"))
if(Physics.Linecast (thisTransform.position, OT.position, MtargetLayers))
return;

}

if(target)
  if(ON.Contains ("TC2") && Attacking)
  if(Vector3.Distance(OT.position, target.position) < 300)
  Fear = OT;

  if(ON.Contains ("TC0a") && PissedAtTC0a > 0){
  
  if(Attacking && PissedAtTC0a > 1)
  target = OT;
  
  FoundSomething = true;
  
  if(!Attacking){
  
  if(PissedAtTC0a > 1){
  target = OT;
  Attacking = true;
  Hunting = false;
  if(!isFughunter)
  BlinkerOn();
  Watching = 1;
  }
  
  if(PissedAtTC0a < 2 && Watching < 1){
  Hunting = false;
  var TheThing0 = Instantiate(SpotSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing0.transform.parent = thisTransform;
  target = OT;
  if(!isFughunter)
  BlinkerOn();
  Watching = 30;
  }
  }
  
if(ON.Contains ("xb"))
  return;
  
}
  
  if(ON.Contains ("TC1") && PissedAtTC1 > 0){
  
  if(Attacking && PissedAtTC1 > 1)
  target = OT;
  
  FoundSomething = true;
  
  if(!Attacking){
  
  if(PissedAtTC1 > 1){
  target = OT;
  Attacking = true;
  Hunting = false;
  if(!isFughunter)
  BlinkerOn();
  Watching = 1;
  }
  
  if(PissedAtTC1 < 2 && Watching < 1){
  Hunting = false;
  var TheThing1 = Instantiate(SpotSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing1.transform.parent = thisTransform;
  target = OT;
  if(!isFughunter)
  BlinkerOn();
  Watching = 30;
  }
  }
  
if(ON.Contains ("xb")){
FoundExtraBig = true;
return;
}
  
}

  if(ON.Contains ("TC4") && PissedAtTC4 > 0){
  
  if(Attacking && PissedAtTC4 > 1)
  target = OT;
  
  FoundSomething = true;
  
  if(!Attacking){
  
  if(PissedAtTC4 > 1){
  target = OT;
  Attacking = true;
  Hunting = false;
  if(!isFughunter)
  BlinkerOn();
  Watching = 1;
  }
  
  if(PissedAtTC4 < 2 && Watching < 1){
  Hunting = false;
  var TheThing2 = Instantiate(SpotSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing2.transform.parent = thisTransform;
  target = OT;
  if(!isFughunter)
  BlinkerOn();
  Watching = 30;
  }
  }
  
if(ON.Contains ("xb")){
FoundExtraBig = true;
return;
}
  
}

  if(ON.Contains ("TC5") && PissedAtTC5 > 0){
  
  if(Attacking && PissedAtTC5 > 1)
  target = OT;
  
  FoundSomething = true;
  
  if(!Attacking){
  
  if(PissedAtTC5 > 1){
  target = OT;
  Attacking = true;
  Hunting = false;
  if(!isFughunter)
  BlinkerOn();
  Watching = 1;
  }
  
  if(PissedAtTC5 < 2 && Watching < 1){
  Hunting = false;
  var TheThing3 = Instantiate(SpotSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing3.transform.parent = thisTransform;
  target = OT;
  if(!isFughunter)
  BlinkerOn();
  Watching = 30;
  }
  }
  
if(ON.Contains ("xb")){
FoundExtraBig = true;
return;
}
  
}
  
  if(ON.Contains ("TC6") && PissedAtTC6 > 0){
  
  if(Attacking && PissedAtTC6 > 1)
  target = OT;
  
  FoundSomething = true;
  
  if(!Attacking){
  
  if(PissedAtTC6 > 1){
  target = OT;
  Attacking = true;
  Hunting = false;
  if(!isFughunter)
  BlinkerOn();
  Watching = 1;
  }
  
  if(PissedAtTC6 < 2 && Watching < 1){
  Hunting = false;
  var TheThing4 = Instantiate(SpotSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing4.transform.parent = thisTransform;
  target = OT;
  if(!isFughunter)
  BlinkerOn();
  Watching = 30;
  }
  }
  
if(ON.Contains ("xb")){
FoundExtraBig = true;
return;
}
  
}
  
  if(ON.Contains ("TC7") && PissedAtTC7 > 0){
  
  if(Attacking && PissedAtTC7 > 1)
  target = OT;
  
  FoundSomething = true;
  
  if(!Attacking){
  
  if(PissedAtTC7 > 1){
  target = OT;
  Attacking = true;
  Hunting = false;
  if(!isFughunter)
  BlinkerOn();
  Watching = 1;
  }
  
  if(PissedAtTC7 < 2 && Watching < 1){
  Hunting = false;
  var TheThing5 = Instantiate(SpotSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing5.transform.parent = thisTransform;
  target = OT;
  if(!isFughunter)
  BlinkerOn();
  Watching = 30;
  }
  }
  
if(ON.Contains ("xb")){
FoundExtraBig = true;
return;
}
  
}

  if(ON.Contains ("TC8") && PissedAtTC8 > 0){
  
  if(Attacking && PissedAtTC8 > 1)
  target = OT;
  
  FoundSomething = true;
  
  if(!Attacking){
  
  if(PissedAtTC8 > 1){
  target = OT;
  Attacking = true;
  Hunting = false;
  if(!isFughunter)
  BlinkerOn();
  Watching = 1;
  }
  
  if(PissedAtTC8 < 2 && Watching < 1){
  Hunting = false;
  var TheThing6 = Instantiate(SpotSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing6.transform.parent = thisTransform;
  target = OT;
  if(!isFughunter)
  BlinkerOn();
  Watching = 30;
  }
  }
  
if(ON.Contains ("xb")){
FoundExtraBig = true;
return;
}
  
}

  if(ON.Contains ("TC9") && PissedAtTC9 > 0){
  
  if(Attacking && PissedAtTC9 > 1)
  target = OT;
  
  FoundSomething = true;
  
  if(!Attacking){
  
  if(PissedAtTC9 > 1){
  target = OT;
  Attacking = true;
  Hunting = false;
  if(!isFughunter)
  BlinkerOn();
  Watching = 1;
  }
  
  if(PissedAtTC9 < 2 && Watching < 1){
  Hunting = false;
  var TheThing7 = Instantiate(SpotSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing7.transform.parent = thisTransform;
  target = OT;
  if(!isFughunter)
  BlinkerOn();
  Watching = 30;
  }
  }
  
if(ON.Contains ("xb")){
FoundExtraBig = true;
return;
}
  
}

if(FoundSomething){
Trig.radius = 8;
Trig.height = 8;
}

}
}

function BlinkerOn () {
Blinker1.DeActivated = false;
Blinker2.DeActivated = false;
Blinker3.DeActivated = false;
}

function BlinkerOff () {
Blinker1.DeActivated = true;
Blinker2.DeActivated = true;
Blinker3.DeActivated = true;
}

function TacticChange () {
if(!isFughunter)
if(Attacking && target){
if(target.name.Contains ("tTC") || target.name.Contains ("sTC"))
TacticChange1();
else
TacticChange2();
}
}

function TacticChange1 () {
Tactical = true;
DirForce = 0;
yield WaitForSeconds (7);
DirForce = -20;
yield WaitForSeconds (1);
Tactical = false;
}

function TacticChange2 () {
Tactical = true;
DirForce = 10;
yield WaitForSeconds (1);
DirForce = -20;
yield WaitForSeconds (1);
Tactical = false;
}

function Shooty () {
if(!isFughunter){
if(Attacking && LayingLow < 1){
if(target)
Turret.NameOfTarget = target.name;
Turret.Attacking = true;
}else{
Turret.NameOfTarget = "null";
Turret.Attacking = false;
}
}else{

Launchy();

}
}

function Launchy () {
if(target)
if(Attacking && StoredMissileBatches > 0 && JustNoticed > 0)
if(target.name.Contains ("xbT") && !TerrahyptianNetwork.instance.NukeMarker)
if(targetDist < 512){

if(Missile1GO)
if(!Missile1GO.name.Contains ("rok"))
return;

if(Missile2GO)
if(!Missile2GO.name.Contains ("rok"))
return;

StoredMissileBatches -= 1;

Missile1GO = Instantiate(MissileAmmo, launcher1.position, launcher1.rotation);
Missile1GO.rigidbody.velocity = vRigidbody.velocity * 1;
Missile1GO.transform.GetComponent(MissileScript).target = target;

yield WaitForSeconds (0.7);

Missile2GO = Instantiate(MissileAmmo, launcher2.position, launcher2.rotation);
Missile2GO.rigidbody.velocity = vRigidbody.velocity * 1;
Missile2GO.transform.GetComponent(MissileScript).target = target;

}
}

function Targety () {
TargetArea();
}

function TargetArea () {
Waypoint2.transform.position = TerrahyptianNetwork.instance.PriorityWaypoint.position;
if(!Attacking && Watching < 1){
target = Waypoint2;
DangerSense = 13;
}
yield WaitForSeconds (15);
if(!Attacking && Watching < 1)
target = ResetView;
}

function LeaveMarker () {

var Y : float = BothunterGyro.transform.eulerAngles.y;

if(Attacking){

if(target != null){
if(!Physics.Linecast (thisTransform.position, target.position, MtargetLayers)){
TurnRight = false;
TurnLeft = false;
JustNoticed = 2;
}

if(targetDist > 100)
RotateThreshold = 0.1;
else
RotateThreshold = 0.8;

}

}else{

if(DangerSense > 0)
RotateThreshold = 0.1;
else
RotateThreshold = 0.8;

}

if(TerrahyptianNetwork.TC1CriminalLevel > 480)
PissedAtTC1 = 60;
if(!isFughunter)
PissedAtTC4 = 60;
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

if(LayingLow > 0)
LayingLow -= 1;

if(Fear && LayingLow < 3 && !isFughunter){

if(Vector3.Distance(Fear.position, thisTransform.position) < 300)
LayingLow += 1;

if(target)
if(Vector3.Distance(Fear.position, target.position) < 300)
LayingLow += 1;
}

if (Watching == 0 && !Attacking)
if(!isFughunter)
BlinkerOff();

if (Watching == 1 && !Attacking){

PissedAtTC0a = 0;
PissedAtTC1 = 0;
PissedAtTC4 = 0;
PissedAtTC5 = 0;
PissedAtTC6 = 0;
PissedAtTC7 = 0;
PissedAtTC8 = 0;
PissedAtTC9 = 0;
target = ResetView;
Hunting = true;
if(!isFughunter)
BlinkerOff();
}

if(LayingLow < 1)
TorqueForce = -40;
else
TorqueForce = 0;

TurnRight = false;
TurnLeft = false;

IsClose = false;

Wall = false;

if(Attacking){

if(!isFughunter){
Trig.center = Vector3(0,0,0);
Trig.radius = 50;
Trig.height = 50;
}

if(target){

if(isFughunter){
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
Attacking = true;
}
if(target.name.Contains ("C1"))
TerrahyptianNetwork.AlertLVL2 = 1;
}

if(TerrahyptianNetwork.TC4CriminalLevel > 480){
if(TerrahyptianNetwork.AnExtraBigTC4){
target = TerrahyptianNetwork.AnExtraBigTC4;
TerrahyptianNetwork.AlertTime = 240;
FoundExtraBig = true;
Attacking = true;
}
if(target.name.Contains ("C4"))
TerrahyptianNetwork.AlertLVL2 = 4;
}

if(TerrahyptianNetwork.TC5CriminalLevel > 480){
if(TerrahyptianNetwork.AnExtraBigTC5){
target = TerrahyptianNetwork.AnExtraBigTC5;
TerrahyptianNetwork.AlertTime = 240;
FoundExtraBig = true;
Attacking = true;
}
if(target.name.Contains ("C5"))
TerrahyptianNetwork.AlertLVL2 = 5;
}

if(TerrahyptianNetwork.TC6CriminalLevel > 480){
if(TerrahyptianNetwork.AnExtraBigTC6){
target = TerrahyptianNetwork.AnExtraBigTC6;
TerrahyptianNetwork.AlertTime = 240;
FoundExtraBig = true;
Attacking = true;
}
if(target.name.Contains ("C6"))
TerrahyptianNetwork.AlertLVL2 = 6;
}

if(TerrahyptianNetwork.TC7CriminalLevel > 480){
if(TerrahyptianNetwork.AnExtraBigTC7){
target = TerrahyptianNetwork.AnExtraBigTC7;
TerrahyptianNetwork.AlertTime = 240;
FoundExtraBig = true;
Attacking = true;
}
if(target.name.Contains ("C7"))
TerrahyptianNetwork.AlertLVL2 = 7;
}

if(TerrahyptianNetwork.TC8CriminalLevel > 480){
if(TerrahyptianNetwork.AnExtraBigTC8){
target = TerrahyptianNetwork.AnExtraBigTC8;
TerrahyptianNetwork.AlertTime = 240;
FoundExtraBig = true;
Attacking = true;
}
if(target.name.Contains ("C8"))
TerrahyptianNetwork.AlertLVL2 = 8;
}

if(TerrahyptianNetwork.TC9CriminalLevel > 480){
if(TerrahyptianNetwork.AnExtraBigTC9){
target = TerrahyptianNetwork.AnExtraBigTC9;
TerrahyptianNetwork.AlertTime = 240;
FoundExtraBig = true;
Attacking = true;
}
if(target.name.Contains ("C9"))
TerrahyptianNetwork.AlertLVL2 = 9;
}

}

if (!Physics.Linecast (thisTransform.position, target.position, targetLayers)){
TurnRight = false;
TurnLeft = false;
JustNoticed = 2;
}
}else{
Attacking = false;
target = ResetView;
FoundExtraBig = false;
}

if(target == ResetView){
Attacking = false;
target = ResetView;
FoundExtraBig = false;
}

if(target == Waypoint2){
Attacking = false;
target = ResetView;
FoundExtraBig = false;
}

if(target == Waypoint3){

if(target.name.Contains ("rok")){
Attacking = false;
target = ResetView;
}

if(PissedAtTC1 < 1){
Attacking = false;
target = ResetView;
}
}

}else{
if(!isFughunter){
BlinkerOff();
Trig.center = Vector3(0,0,200);
Trig.radius = 200;
Trig.height = 800;
}else{
TrigSweep();
}

if(DangerSense > 0){
if(DangerSense < 2)
target = ResetView;
DangerSense -= 1;
}

}

if(Dropping){
if(DropCounter > 0)
DropCounter -= 1;

if(DropCounter == 1){
TerrahyptianNetwork.HasDropped = true;
Supplies.rigidbody.isKinematic = false;
Supplies.transform.parent = null;
Supplies.audio.Play();
}

if(DropCounter < 1){
Dropping = false;
CallAssistance.DismissAssistance = true;
}
}

if(JustNoticed > 0){
JustNoticed -= 1;
if(targetDist > 512)
JustNoticed = 0;
}

if(Watching > 0)
Watching -= 1;

if(!Stuck){
lastPos = thisTransform.position;
IsEscaping();
}

if(Vector3.Distance(thisTransform.position, lastPos) > 5 && Stuck){
Stuck = false;
TurnRight = false;
}

}

function TrigSweep(){
Trig.center = Vector3(0,0,1000);
Trig.radius = 1000;
Trig.height = 1000;
yield WaitForSeconds (0.12);
Trig.center = Vector3(700,0,700);
yield WaitForSeconds (0.12);
Trig.center = Vector3(1000,0,0);
yield WaitForSeconds (0.12);
Trig.center = Vector3(700,0,-700);
yield WaitForSeconds (0.12);
Trig.center = Vector3(0,0,-1000);
yield WaitForSeconds (0.12);
Trig.center = Vector3(-700,0,-700);
yield WaitForSeconds (0.12);
Trig.center = Vector3(-1000,0,0);
yield WaitForSeconds (0.12);
Trig.center = Vector3(-700,0,700);
}

function IsEscaping(){
yield WaitForSeconds (0.5);

  if(Vector3.Distance(thisTransform.position, lastPos) < 0.1)
  Stuck = true;
  
}