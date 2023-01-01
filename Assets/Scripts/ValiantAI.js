var target : Transform;
var ResetView : Transform;
var Waypoint2 : Transform;
var Waypoint3 : Transform;
var Gyro : GameObject;
var Hoverer : GameObject;
var Trig : CapsuleCollider;
var Turner : BigVesselRotator;
var Turret : TurretAI;
var Dozer : DozerScript;

var vEntrance : CarDoorController;

var thisTransform : Transform;
var thisVTransform : Transform;

var vRigidbody : Rigidbody;

var Blinker1 : Blinker;
var Blinker2 : Blinker;
var Blinker3 : Blinker;
var Blinker4 : Blinker;
var Blinker5 : Blinker;

var Presence : GameObject;
var SpotSound : GameObject;
var AttackSound : GameObject;
var Buzzer1Sound : GameObject;
var Buzzer2Sound : GameObject;

var PissedAtTC0a = 0;

var PissedAtTC1 = 0;
var PissedAtTC4 = 0;
var PissedAtTC5 = 0;
var PissedAtTC6 = 0;
var PissedAtTC7 = 0;
var PissedAtTC8 = 0;
var PissedAtTC9 = 0;

var Fear : Transform;

var TargetIsMoving : boolean;

var SlowDown : boolean;

var Parked : boolean;

var Hunting : boolean;
var Attacking : boolean;
var Obstacle : boolean;
var Stuck : boolean;
var Cruising : boolean;
var TurnRight : boolean;
var TurnLeft : boolean;

var RightDist : float = 200;
var LeftDist : float = 200;

var IsClose : boolean;

var Wall : boolean;

var lastPos : Vector3;

var DangerSense = 0;

var targetLayers : LayerMask;
var MtargetLayers : LayerMask;

var LayingLow = 0;

var JustNoticed = 0;

var Ogle = 0;

var Shots = 0;

var TForce = 6;

var RUP : float = 0;

InvokeRepeating("Tick", 1, 1);

InvokeRepeating("Buzzer", 1, 2);

InvokeRepeating("Targety", 10, 15);

InvokeRepeating("Shooty", 5, 0.3);

function Start (){
Hunting = true;
Waypoint3 = PlayerInformation.instance.Pirizuka;
}

function Update () {

var localV = thisVTransform.InverseTransformDirection(vRigidbody.velocity);

if(Attacking){

if(target){

if(Vector3.Distance(thisTransform.position, target.transform.position) < 64 && !target.name.Contains ("TC4")){
if (-localV.y > 0)
     IsClose = true;
     Stuck = false;
     }else{
     IsClose = false;
     
}
 
}
}

if(target == ResetView && Attacking){

Attacking = false;
target = ResetView;
}

if(target == Waypoint2 && Attacking){

Attacking = false;
target = ResetView;
}

if(target == Waypoint3 && Attacking){

Attacking = false;
target = ResetView;
}

if(target == null && Attacking){

Attacking = false;
Hunting = true;
BlinkerOff();
target = ResetView;
}

var newRot2 : Vector3 = (vRigidbody.velocity);
var hit : RaycastHit;

var hit1 : RaycastHit;
var hit2 : RaycastHit;

if(RUP < 4)
RUP += 0.5;
else
RUP = 0;

Debug.DrawRay (thisTransform.position + thisTransform.up * 0.5 + thisTransform.up * RUP, thisTransform.forward * 150f, Color.white);
if (Physics.Raycast (thisTransform.position + thisTransform.up * 0.5 + thisTransform.up * RUP, thisTransform.forward, hit1, 150, MtargetLayers))
Point1u = hit1.point;
else
Point1u = Vector3(2,2,2);

Debug.DrawRay (thisTransform.position + -thisTransform.up * 0.5 + thisTransform.up * RUP, thisTransform.forward * 150f, Color.white);
if (Physics.Raycast (thisTransform.position + -thisTransform.up * 0.5 + thisTransform.up * RUP, thisTransform.forward, hit2, 150, MtargetLayers))
Point1d = hit2.point;
else
Point1d = Vector3(8,8,8);

if(Vector3.Distance(Point1u, Point1d) > 2){
TurnRight = false;
TurnLeft = false;
}else{
Wall = true;
}

Obstacle = false;

if(vRigidbody.velocity.magnitude > 10){

Debug.DrawRay (thisTransform.position, newRot2 * 80f, Color.green);
if (Physics.Raycast (thisTransform.position, newRot2, hit, 80, targetLayers))
     if(Wall)
     Obstacle = true;

Debug.DrawRay (thisTransform.position + thisTransform.right * 4, newRot2 * 80f, Color.green);
if (Physics.Raycast (thisTransform.position + thisTransform.right * 4, newRot2, hit, 80, targetLayers))
     if(Wall)
     Obstacle = true;

Debug.DrawRay (thisTransform.position + -thisTransform.right * 4, newRot2 * 80f, Color.green);
if (Physics.Raycast (thisTransform.position + -thisTransform.right * 4, newRot2, hit, 80, targetLayers))
     if(Wall)
     Obstacle = true;
     
}else{

Debug.DrawRay (thisTransform.position, thisTransform.forward * 30f, Color.white);
if (Physics.Raycast (thisTransform.position, thisTransform.forward, 30, targetLayers))
		if(Wall)
		Obstacle = true;
		
Debug.DrawRay (thisTransform.position + thisTransform.right * 4, thisTransform.forward * 30f, Color.white);
if (Physics.Raycast (thisTransform.position + thisTransform.right * 4, thisTransform.forward, 30, targetLayers))
		if(Wall)
		Obstacle = true;

Debug.DrawRay (thisTransform.position + -thisTransform.right * 4, thisTransform.forward * 30f, Color.white);
if (Physics.Raycast (thisTransform.position + -thisTransform.right * 4, thisTransform.forward, 30, targetLayers))
		if(Wall)
		Obstacle = true;
}

if(vRigidbody.velocity.magnitude > 30){

Debug.DrawRay (thisTransform.position + thisTransform.right * 7, thisTransform.forward * 80f, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.right * 7, thisTransform.forward, hit, 80))
     RightDist = hit.distance;
     else
     RightDist = 512;

Debug.DrawRay (thisTransform.position + -thisTransform.right * 7, thisTransform.forward * 80f, Color.black);
if (Physics.Raycast (thisTransform.position + -thisTransform.right * 7, thisTransform.forward, hit, 80))
		LeftDist = hit.distance;
	    else
        LeftDist = 512;
 
 Debug.DrawRay (thisTransform.position + thisTransform.up * 10  + thisTransform.forward * 85, thisTransform.up * -30f, Color.white);
if (!Physics.Raycast (thisTransform.position + thisTransform.up * 10  + thisTransform.forward * 85, -thisTransform.up, 30))
     Obstacle = true;
 
 //---------------------------------------------------------------------------------------------
             Debug.DrawRay (thisTransform.position + thisTransform.up * 10 
                                  + thisTransform.right * 20
                                  + thisTransform.forward * 60, thisTransform.up * -30f, Color.white);
if (!Physics.Raycast (thisTransform.position + thisTransform.up * 10 
                                        + thisTransform.right * 20 
                                        + thisTransform.forward * 60, -thisTransform.up, hit, 30))
     TurnLeft = true;
     
             Debug.DrawRay (thisTransform.position + thisTransform.up * 10 
                                  + -thisTransform.right * 20
                                  + thisTransform.forward * 60, thisTransform.up * -30f, Color.white);
if (!Physics.Raycast (thisTransform.position + thisTransform.up * 10 
                                        + -thisTransform.right * 20 
                                        + thisTransform.forward * 60, -thisTransform.up, hit, 30))
     TurnRight = true;
//---------------------------------------------------------------------------------------------
 
 }else{
 
Debug.DrawRay (thisTransform.position + thisTransform.right * 7, thisTransform.forward * 40f, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.right * 7, thisTransform.forward, hit, 40))
     RightDist = hit.distance;
     else
     RightDist = 512;

Debug.DrawRay (thisTransform.position + -thisTransform.right * 7, thisTransform.forward * 40f, Color.black);
if (Physics.Raycast (thisTransform.position + -thisTransform.right * 7, thisTransform.forward, hit, 40))
		LeftDist = hit.distance;
	    else
        LeftDist = 512;

Debug.DrawRay (thisTransform.position + thisTransform.up * 10  + thisTransform.forward * 45, thisTransform.up * -30f, Color.white);
if (!Physics.Raycast (thisTransform.position + thisTransform.up * 10  + thisTransform.forward * 45, -thisTransform.up, 30))
     Obstacle = true;

//---------------------------------------------------------------------------------------------
             Debug.DrawRay (thisTransform.position + thisTransform.up * 10 
                                  + thisTransform.right * 20
                                  + thisTransform.forward * 30, thisTransform.up * -30f, Color.white);
if (!Physics.Raycast (thisTransform.position + thisTransform.up * 10 
                                        + thisTransform.right * 20 
                                        + thisTransform.forward * 30, -thisTransform.up, 30))
     TurnLeft = true;

             Debug.DrawRay (thisTransform.position + thisTransform.up * 10 
                                  + -thisTransform.right * 20
                                  + thisTransform.forward * 30, thisTransform.up * -30f, Color.white);
if (!Physics.Raycast (thisTransform.position + thisTransform.up * 10 
                                        + -thisTransform.right * 20 
                                        + thisTransform.forward * 30, -thisTransform.up, 30))
     TurnRight = true;
//---------------------------------------------------------------------------------------------

}

if(RightDist > LeftDist && JustNoticed < 1){
     Turner.TorqueForce = 0;
     TurnRight = true;
     }
     
 if(LeftDist > RightDist && JustNoticed < 1){
     Turner.TorqueForce = 0;
     TurnLeft = true;
     }
     
if(Stuck)
  TurnRight = true;

if(CallAssistance.IsAssisting && !Attacking && Ogle < 1 && PissedAtTC1 == 0){

if(Vector3.Distance(thisTransform.position, Waypoint3.transform.position) > 70){
target = Waypoint3;
if(Vector3.Distance(thisTransform.position, Waypoint3.transform.position) < 100)
Turner.RotateThreshold = 0.8;
if(Vector3.Distance(thisTransform.position, Waypoint3.transform.position) > 100)
Turner.RotateThreshold = 0.1;
}else{
target = ResetView;
Obstacle = true;
}
}

}


private var NewRotation : Quaternion;
function FixedUpdate () {

var newRot2 : Vector3 = (vRigidbody.velocity);

var localV = thisVTransform.InverseTransformDirection(vRigidbody.velocity);

if(IsClose){
  vRigidbody.AddForce(thisVTransform.up * 100);
}

if(Obstacle || Parked){

  if(Ogle < 1)
  if(-localV.y > 5){
  vRigidbody.AddForce(thisVTransform.up * 100);
  if(SlowDown)
  vRigidbody.AddForce(newRot2 * -5);
  else
  vRigidbody.AddForce(newRot2 * -10);
  }
  
  if(Ogle > 1)
  if(-localV.y > 0){
  vRigidbody.AddForce(thisVTransform.up * 100);
  if(SlowDown)
  vRigidbody.AddForce(newRot2 * -5);
  else
  vRigidbody.AddForce(newRot2 * -10);
  }
}

if(SlowDown){
if(-localV.y > 10)
vRigidbody.AddForce(newRot2 * -5);
}else{

if(Stuck){
  if(localV.y < 20)
  vRigidbody.AddForce(thisVTransform.up * 100);
}else{
if(Attacking && !Obstacle){
  if(-localV.y < 100)
  vRigidbody.AddForce(thisVTransform.up * -100);
}
}
  
if(!Attacking && !Stuck && !Obstacle && !IsClose){
  if(!Obstacle)
  if(-localV.y < 50)
  vRigidbody.AddForce(thisVTransform.up * -100);
  if(Obstacle)
  if(-localV.y < 10)
  vRigidbody.AddForce(thisVTransform.up * -100);
}
}
 
if(TurnLeft && !TurnRight){
  Gyro.rigidbody.AddTorque(thisTransform.up * -500);
}

if(TurnRight && !TurnLeft){
  Gyro.rigidbody.AddTorque(thisTransform.up * 500);
}

if(TurnRight && TurnLeft && Obstacle){
  Gyro.rigidbody.AddTorque(thisTransform.up * -500);
}
 
}

function OnTriggerEnter (other : Collider) {

ON = other.name;
OT = other.transform;

if(ON.Contains ("TFC"))
if(!ON.Contains ("TFC3")){

if(ON.Contains ("TFC0a")){
if(target)
if(target.name.Contains ("TC0a"))
Shots = 4;
PissedAtTC0a = 1;
}
if(ON.Contains ("TFC1")){
if(target)
if(target.name.Contains ("TC1")){
Shots = 4;
Ogle = 0;
}
if(PissedAtTC1 < 3)
PissedAtTC1 = 1;
if(TerrahyptianNetwork.TC1CriminalLevel == 10)
PissedAtTC1 = 2;
}
if(ON.Contains ("TFC4")){
if(target)
if(target.name.Contains ("TC4"))
Shots = 4;
if(PissedAtTC4 < 3)
PissedAtTC4 = 1;
if(TerrahyptianNetwork.TC4CriminalLevel == 10)
PissedAtTC4 = 2;
}
if(ON.Contains ("TFC5")){
if(target)
if(target.name.Contains ("TC5"))
Shots = 4;
if(PissedAtTC5 < 3)
PissedAtTC5 = 1;
if(TerrahyptianNetwork.TC5CriminalLevel == 10)
PissedAtTC5 = 2;
}
if(ON.Contains ("TFC6")){
if(target)
if(target.name.Contains ("TC6"))
Shots = 4;
if(PissedAtTC6 < 3)
PissedAtTC6 = 1;
if(TerrahyptianNetwork.TC6CriminalLevel == 10)
PissedAtTC6 = 2;
}
if(ON.Contains ("TFC7")){
if(target)
if(target.name.Contains ("TC7"))
Shots = 4;
if(PissedAtTC7 < 3)
PissedAtTC7 = 1;
if(TerrahyptianNetwork.TC7CriminalLevel == 10)
PissedAtTC7 = 2;
}
if(ON.Contains ("TFC8")){
if(target)
if(target.name.Contains ("TC8"))
Shots = 4;
if(PissedAtTC8 < 3)
PissedAtTC8 = 1;
if(TerrahyptianNetwork.TC8CriminalLevel == 10)
PissedAtTC8 = 2;
}
if(ON.Contains ("TFC9")){
if(target)
if(target.name.Contains ("TC9"))
Shots = 4;
if(PissedAtTC9 < 3)
PissedAtTC9 = 1;
if(TerrahyptianNetwork.TC9CriminalLevel == 10)
PissedAtTC9 = 2;
}

if(!Attacking){
DangerSense = 8;
target = Waypoint2;
if(other.rigidbody)
Waypoint2.transform.position = OT.position;
if(Ogle > 3){
Ogle = 3;
Excuse();
}
}

}
}

function OnTriggerStay (other : Collider) {

ON = other.name;
OT = other.transform;

if(other != null){

if(!ON.Contains ("x"))
if(Physics.Linecast (thisTransform.position, OT.position, MtargetLayers))
return;
  
if(target)
if(ON.Contains ("TC2") && Attacking)
if(!ON.Contains ("tTC"))
if(Vector3.Distance(OT.position, target.position) < 256)
Fear = OT;

  if(ON.Contains ("TC0a") && PissedAtTC0a > 0){
  
  if(Attacking && PissedAtTC0a > 1)
  target = OT;
  
  if(!Attacking){
  
  if(PissedAtTC0a > 1){
  if(PissedAtTC0a == 2){
  var TheThing1 = Instantiate(AttackSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing1.transform.parent = thisTransform;
  }
  target = OT;
  Attacking = true;
  Hunting = false;
  BlinkerOn();
  Ogle = 0;
  Shots = 0;
  PissedAtTC0a = 1;
  }
  
  if(PissedAtTC0a == 1 && Ogle < 1){
  Hunting = false;
  var TheThing2 = Instantiate(SpotSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing2.transform.parent = thisTransform;
  target = OT;
  BlinkerOn();
  Excuse();
  Ogle = 3;
  }
  }
}
  
  if(ON.Contains ("TC1") && PissedAtTC1 > 0){
  
  if(Attacking && PissedAtTC1 > 1)
  target = OT;
  
  if(!Attacking){
  
  if(PissedAtTC1 > 1){
  if(PissedAtTC1 == 2){
  var TheThing3 = Instantiate(AttackSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing3.transform.parent = thisTransform;
  }
  target = OT;
  Attacking = true;
  Hunting = false;
  BlinkerOn();
  Ogle = 0;
  Shots = 0;
  PissedAtTC1 = 1;
  }
  
  if(PissedAtTC1 == 1 && Ogle < 1){
  Hunting = false;
  var TheThing4 = Instantiate(SpotSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing4.transform.parent = thisTransform;
  target = OT;
  BlinkerOn();
  Excuse();
  Ogle = 3;
  }
  }
}

  if(ON.Contains ("TC4") && PissedAtTC4 > 0){
  
  if(Attacking && PissedAtTC4 > 1)
  target = OT;
  
  if(!Attacking){
  
  if(PissedAtTC4 > 1){
  if(PissedAtTC4 == 2){
  var TheThing5 = Instantiate(AttackSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing5.transform.parent = thisTransform;
  }
  target = OT;
  Attacking = true;
  Hunting = false;
  BlinkerOn();
  Ogle = 0;
  Shots = 0;
  PissedAtTC4 = 1;
  }
  
  if(PissedAtTC4 == 1 && Ogle < 1){
  Hunting = false;
  var TheThing6 = Instantiate(SpotSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing6.transform.parent = thisTransform;
  target = OT;
  BlinkerOn();
  Excuse();
  Ogle = 3;
  }
  }
}

  if(ON.Contains ("TC5") && PissedAtTC5 > 0){
  
  if(Attacking && PissedAtTC5 > 1)
  target = OT;
  
  if(!Attacking){
  
  if(PissedAtTC5 > 1){
  if(PissedAtTC5 == 2){
  var TheThing7 = Instantiate(AttackSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing7.transform.parent = thisTransform;
  }
  target = OT;
  Attacking = true;
  Hunting = false;
  BlinkerOn();
  Ogle = 0;
  Shots = 0;
  PissedAtTC5 = 1;
  }
  
  if(PissedAtTC5 == 1 && Ogle < 1){
  Hunting = false;
  var TheThing8 = Instantiate(SpotSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing8.transform.parent = thisTransform;
  target = OT;
  BlinkerOn();
  Excuse();
  Ogle = 3;
  }
  }
}
  
  if(ON.Contains ("TC6") && PissedAtTC6 > 0){
  
  if(Attacking && PissedAtTC6 > 1)
  target = OT;
  
  if(!Attacking){
  
  if(PissedAtTC6 > 1){
  if(PissedAtTC6 == 2){
  var TheThing9 = Instantiate(AttackSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing9.transform.parent = thisTransform;
  }
  target = OT;
  Attacking = true;
  Hunting = false;
  BlinkerOn();
  Ogle = 0;
  Shots = 0;
  PissedAtTC6 = 1;
  }
  
  if(PissedAtTC6 == 1 && Ogle < 1){
  Hunting = false;
  var TheThing10 = Instantiate(SpotSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing10.transform.parent = thisTransform;
  target = OT;
  BlinkerOn();
  Excuse();
  Ogle = 3;
  }
  }
}
  
  if(ON.Contains ("TC7") && PissedAtTC7 > 0){
  
  if(Attacking && PissedAtTC7 > 1)
  target = OT;
  
  if(!Attacking){
  
  if(PissedAtTC7 > 1){
  if(PissedAtTC7 == 2){
  var TheThing11 = Instantiate(AttackSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing11.transform.parent = thisTransform;
  }
  target = OT;
  Attacking = true;
  Hunting = false;
  BlinkerOn();
  Ogle = 0;
  Shots = 0;
  PissedAtTC7 = 1;
  }
  
  if(PissedAtTC7 == 1 && Ogle < 1){
  Hunting = false;
  var TheThing12 = Instantiate(SpotSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing12.transform.parent = thisTransform;
  target = OT;
  BlinkerOn();
  Excuse();
  Ogle = 3;
  }
  }
}

  if(ON.Contains ("TC8") && PissedAtTC8 > 0){
  
  if(Attacking && PissedAtTC8 > 1)
  target = OT;
  
  if(!Attacking){
  
  if(PissedAtTC8 > 1){
  if(PissedAtTC8 == 2){
  var TheThing13 = Instantiate(AttackSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing13.transform.parent = thisTransform;
  }
  target = OT;
  Attacking = true;
  Hunting = false;
  BlinkerOn();
  Ogle = 0;
  Shots = 0;
  PissedAtTC8 = 1;
  }
  
  if(PissedAtTC8 == 1 && Ogle < 1){
  Hunting = false;
  var TheThing14 = Instantiate(SpotSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing14.transform.parent = thisTransform;
  target = OT;
  BlinkerOn();
  Excuse();
  Ogle = 3;
  }
  }
}

  if(ON.Contains ("TC9") && PissedAtTC9 > 0){
  
  if(Attacking && PissedAtTC9 > 1)
  target = OT;
  
  if(!Attacking){
  
  if(PissedAtTC9 > 1){
  if(PissedAtTC9 == 2){
  var TheThing15 = Instantiate(AttackSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing15.transform.parent = thisTransform;
  }
  target = OT;
  Attacking = true;
  Hunting = false;
  BlinkerOn();
  Ogle = 0;
  Shots = 0;
  PissedAtTC9 = 1;
  }
  
  if(PissedAtTC9 == 1 && Ogle < 1){
  Hunting = false;
  var TheThing16 = Instantiate(SpotSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing16.transform.parent = thisTransform;
  target = OT;
  BlinkerOn();
  Excuse();
  Ogle = 3;
  }
  }
}

}
}

function BlinkerOn () {
Blinker1.DeActivated = false;
Blinker2.DeActivated = false;
Blinker3.DeActivated = false;
Blinker4.DeActivated = false;
Blinker5.DeActivated = false;
}

function BlinkerOff () {
Blinker1.DeActivated = true;
Blinker2.DeActivated = true;
Blinker3.DeActivated = true;
Blinker4.DeActivated = true;
Blinker5.DeActivated = true;
}

function Buzzer () {
if(Attacking && TargetIsMoving && LayingLow < 1 && Shots < 1){
var randomValue : int = Random.Range(1, 4);

            switch (randomValue) {
    		case 1:
    		var TheThingB1 = Instantiate(Buzzer1Sound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
                TheThingB1.transform.parent = thisTransform;
    		break;
    		case 2:
    		var TheThingB2 = Instantiate(Buzzer2Sound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
                TheThingB2.transform.parent = thisTransform;
    		break;
    		}
}
}

function Shooty () {
if(Attacking && Shots > 0 && LayingLow < 1){
Shots -= 1;
if(target)
Turret.NameOfTarget = target.name;
Turret.Attacking = true;
}else{
Turret.NameOfTarget = "null";
Turret.Attacking = false;
}
}

function Targety () {
if(!Attacking && Ogle < 1){
TargetArea();
}
}

function TargetArea () {
Waypoint2.transform.position = TerrahyptianNetwork.instance.PriorityWaypoint.position;
target = Waypoint2;
yield WaitForSeconds (5);
if(!Attacking && Ogle < 1)
target = ResetView;
}

function Tick () {

if(Attacking){

if(target != null){
if(!Physics.Linecast (thisTransform.position, target.position, MtargetLayers)){
TurnRight = false;
TurnLeft = false;
JustNoticed = 2;
}

if(Vector3.Distance(thisTransform.position, target.position) > 100)
Turner.RotateThreshold = 0.1;
else
Turner.RotateThreshold = 0.8;

}

}else{

if(DangerSense > 0)
Turner.RotateThreshold = 0.1;
else
Turner.RotateThreshold = 0.8;

}

if(target){
if(target.name.Contains ("TC0a") && TerrahyptianNetwork.TC0aCriminalLevel > 10)
Shots = 4;
if(target.name.Contains ("TC1") && TerrahyptianNetwork.TC1CriminalLevel > 10)
Shots = 4;
if(target.name.Contains ("TC4") && TerrahyptianNetwork.TC4CriminalLevel > 10)
Shots = 4;
if(target.name.Contains ("TC5") && TerrahyptianNetwork.TC5CriminalLevel > 10)
Shots = 4;
if(target.name.Contains ("TC6") && TerrahyptianNetwork.TC6CriminalLevel > 10)
Shots = 4;
if(target.name.Contains ("TC7") && TerrahyptianNetwork.TC7CriminalLevel > 10)
Shots = 4;
if(target.name.Contains ("TC8") && TerrahyptianNetwork.TC8CriminalLevel > 10)
Shots = 4;
if(target.name.Contains ("TC9") && TerrahyptianNetwork.TC9CriminalLevel > 10)
Shots = 4;

if(target.name.Contains ("sTC")){
if(Vector3.Distance(thisTransform.position, target.position) < 100)
SlowDown = true;
if(Vector3.Distance(thisTransform.position, target.position) > 100)
SlowDown = false;
}else{
SlowDown = false;
}

if(target.name.Contains ("sTC4")){
if(Vector3.Distance(thisTransform.position, target.position) < 100)
Dozer.IsOn = true;
if(Vector3.Distance(thisTransform.position, target.position) > 100)
Dozer.IsOn = false;
}

if(!target.name.Contains ("sTC4")){
Dozer.IsOn = false;
}

if(Ogle > 0){
if(Vector3.Distance(thisTransform.position, target.position) < 64){
Parked = true;
Ogle -= 1;
}else{
Parked = false;
}
}else{
Parked = false;
}

if(TerrahyptianNetwork.TC1CriminalLevel > 480)
if(target.name.Contains ("C1"))
TerrahyptianNetwork.AlertLVL2 = 1;

if(TerrahyptianNetwork.TC4CriminalLevel > 480)
if(target.name.Contains ("C4"))
TerrahyptianNetwork.AlertLVL2 = 4;

if(TerrahyptianNetwork.TC5CriminalLevel > 480)
if(target.name.Contains ("C5"))
TerrahyptianNetwork.AlertLVL2 = 5;

if(TerrahyptianNetwork.TC6CriminalLevel > 480)
if(target.name.Contains ("C6"))
TerrahyptianNetwork.AlertLVL2 = 6;

if(TerrahyptianNetwork.TC7CriminalLevel > 480)
if(target.name.Contains ("C7"))
TerrahyptianNetwork.AlertLVL2 = 7;

if(TerrahyptianNetwork.TC8CriminalLevel > 480)
if(target.name.Contains ("C8"))
TerrahyptianNetwork.AlertLVL2 = 8;

if(TerrahyptianNetwork.TC9CriminalLevel > 480)
if(target.name.Contains ("C9"))
TerrahyptianNetwork.AlertLVL2 = 9;

}

if(TerrahyptianNetwork.instance.EnemyTarget2)
if(Vector3.Distance(TerrahyptianNetwork.instance.EnemyTarget2.position, thisTransform.position) < 350)
TerrahyptianNetwork.UnitsPresent = true;

if(PissedAtTC0a == 1)
if(TerrahyptianNetwork.TC0aCriminalLevel < 10)
TerrahyptianNetwork.TC0aCriminalLevel = 10;

if(PissedAtTC1 == 1)
if(TerrahyptianNetwork.TC1CriminalLevel < 10)
TerrahyptianNetwork.TC1CriminalLevel = 10;
if(PissedAtTC4 == 1)
if(TerrahyptianNetwork.TC4CriminalLevel < 10)
TerrahyptianNetwork.TC4CriminalLevel = 10;
if(PissedAtTC5 == 1)
if(TerrahyptianNetwork.TC5CriminalLevel < 10)
TerrahyptianNetwork.TC5CriminalLevel = 10;
if(PissedAtTC6 == 1)
if(TerrahyptianNetwork.TC6CriminalLevel < 10)
TerrahyptianNetwork.TC6CriminalLevel = 10;
if(PissedAtTC7 == 1)
if(TerrahyptianNetwork.TC7CriminalLevel < 10)
TerrahyptianNetwork.TC7CriminalLevel = 10;
if(PissedAtTC8 == 1)
if(TerrahyptianNetwork.TC8CriminalLevel < 10)
TerrahyptianNetwork.TC8CriminalLevel = 10;
if(PissedAtTC9 == 1)
if(TerrahyptianNetwork.TC9CriminalLevel < 10)
TerrahyptianNetwork.TC9CriminalLevel = 10;

if(TerrahyptianNetwork.TC0aCriminalLevel > 10)
PissedAtTC0a = 60;

if(TerrahyptianNetwork.TC1CriminalLevel > 10)
PissedAtTC1 = 60;
if(TerrahyptianNetwork.TC4CriminalLevel > 10)
PissedAtTC4 = 60;
if(TerrahyptianNetwork.TC5CriminalLevel > 10)
PissedAtTC5 = 60;
if(TerrahyptianNetwork.TC6CriminalLevel > 10)
PissedAtTC6 = 60;
if(TerrahyptianNetwork.TC7CriminalLevel > 10)
PissedAtTC7 = 60;
if(TerrahyptianNetwork.TC8CriminalLevel > 10)
PissedAtTC8 = 60;
if(TerrahyptianNetwork.TC9CriminalLevel > 10)
PissedAtTC9 = 60;

if(LayingLow > 0)
LayingLow -= 1;

if(Fear && LayingLow < 3){

if(Vector3.Distance(Fear.position, thisTransform.position) < 300)
LayingLow += 1;

if(target)
if(Vector3.Distance(Fear.position, target.position) < 300)
LayingLow += 1;
}

if (Ogle == 0 && !Attacking)
BlinkerOff();

if (Ogle == 1 && !Attacking){

PissedAtTC0a = 0;
PissedAtTC1 = 0;
PissedAtTC4 = 0;
PissedAtTC5 = 0;
PissedAtTC6 = 0;
PissedAtTC7 = 0;
PissedAtTC8 = 0;
PissedAtTC9 = 0;
target = ResetView;
Parked = false;
Hunting = true;
BlinkerOff();
}

if(LayingLow < 1)
Turner.TorqueForce = -200;
else
Turner.TorqueForce = 0;

TurnRight = false;
TurnLeft = false;

IsClose = false;

Wall = false;

if(Attacking){

Trig.center = Vector3(0,0,0);
Trig.radius = 50;
Trig.height = 50;

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

if(DangerSense > 0){

if(DangerSense < 2){
target = ResetView;
}

DangerSense -= 1;
}
}

if(JustNoticed > 0)
JustNoticed -= 1;

if(!Stuck && !Parked && !IsClose){
lastPos = thisTransform.position;
IsEscaping();
}

if(Vector3.Distance(thisTransform.position, lastPos) > 5 && Stuck){
Stuck = false;
TurnRight = false;
}

if(target != null)
var lastTPos : Vector3 = target.transform.position;
IsNoticing(lastTPos);

//========================================================================================================================//
//////////////////////////////////////////////////////[INTERACTION]/////////////////////////////////////////////////////////
//========================================================================================================================//

if(NotiScript.PiriNotis)
if(Vector3.Distance(thisTransform.position, PlayerInformation.instance.Pirizuka.position) < 128){
if(convNum < 99){
if(!Attacking){
target = PlayerInformation.instance.PiriTarget;
Ogle = 20;
}else{
if(target)
if(target.name.Contains ("TC1")){
target = PlayerInformation.instance.PiriTarget;
Ogle = 20;
}
}
}
NotiScript.PiriNotis = false;
}

if(Ogle > 0)
if(WorldInformation.pSpeech){
if(WorldInformation.pSpeech.name.Contains ("a1"))
if(Vector3.Distance(thisTransform.position, WorldInformation.pSpeech.position) < 64){
ProcessSpeech(WorldInformation.pSpeech.gameObject.GetComponent(TalkBubbleScript).myText, 0, 0);
}

if(WorldInformation.pSpeech.name.Contains ("b1"))
if(Vector3.Distance(thisTransform.position, WorldInformation.pSpeech.position) < 128){
ProcessSpeech(WorldInformation.pSpeech.gameObject.GetComponent(TalkBubbleScript).myText, 1, 0);
}

if(WorldInformation.pSpeech.name.Contains ("c1"))
if(Vector3.Distance(thisTransform.position, WorldInformation.pSpeech.position) < 256){
ProcessSpeech(WorldInformation.pSpeech.gameObject.GetComponent(TalkBubbleScript).myText, 2, 0);
}

WorldInformation.pSpeech = null;
}

}

function IsNoticing(lastTPos : Vector3){
yield WaitForSeconds (0.5);

if(target != null){
if(Vector3.Distance(target.transform.position, lastTPos) > 1)
TargetIsMoving = true;
else
TargetIsMoving = false;
}
}

function IsEscaping(){
yield WaitForSeconds (0.5);

  if(Vector3.Distance(thisTransform.position, lastPos) < 0.1)
  Stuck = true;
  
}

function Dismiss(){
yield WaitForSeconds (2);
CallAssistance.DismissAssistance = true;
}

function Excuse(){
yield WaitForSeconds (0.2);
if(PissedAtTC1 > 0){
if(convNum < 4)
if(target)
if(target.name.Contains ("TC1")){
ReturnSpeech("Cease your weapon, now!"); 
convNum = 4;
Ogle = 20;
}
}else{
if(target.name.Contains ("TC1")){
ReturnSpeech("Excuse me, there is something \n that I need to attend to."); 
convNum = 0;
}
}
}

//========================================================================================================================//
//////////////////////////////////////////////////////[INTERACTION]/////////////////////////////////////////////////////////
//========================================================================================================================//


var convNum = 0;
var boredom = 0;

function ProcessSpeech (speech : String, mode : int, code : int){

yield WaitForSeconds (0.1);

if(!speech)
return;

if(mode < 2){
if(convNum == 0){
//===============================================================================
if(speech.Contains ("hi") || speech.Contains ("hey") || speech.Contains ("yo")){ convNum = 1; yield WaitForSeconds (2);
ReturnSpeech("Hello, citizen. \n Is there anything you desire?"); return;}

if(speech.Contains ("hello") || speech.Contains ("greet")){ convNum = 1; yield WaitForSeconds (2);
ReturnSpeech("Greetings traveler. \n Do you need help with something?"); return; }

if(speech.Contains ("stop")){ convNum = 1; yield WaitForSeconds (2);
ReturnSpeech("What is it?"); return; }
//===============================================================================
}

if(convNum == 1){
//===============================================================================
if(speech.Contains ("yes")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("I don't have much time to talk."); return;}

if(speech.Contains ("no")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Well then."); return; }

if(speech.Contains ("in") || speech.Contains ("on")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Sure."); vEntrance.DenyEntrance = false; return; }

if(speech.Contains ("ride") || speech.Contains ("lift")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Yes, I can offer you escort."); vEntrance.DenyEntrance = false; return; }

if(speech.Contains ("go")){ convNum = 2; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech("You be careful now."); Dismiss(); return; }

if(speech.Contains ("leave") && !speech.Contains ("i") || speech.Contains ("u") && speech.Contains ("leave")){ convNum = 2; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech("You be careful now."); Dismiss(); return; }

if(speech.Contains ("i") && speech.Contains ("leave")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("I can offer you an escort."); vEntrance.DenyEntrance = false; return; }

if(speech.Contains ("stop")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("You need to start talking."); return; }
//===============================================================================
}

if(convNum == 2){
//===============================================================================
if(speech.Contains ("yes")){ convNum = 3; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech("Bye!"); Dismiss(); return;}

if(speech.Contains ("no")){ convNum = 3; Ogle = 1; yield WaitForSeconds (2);
Dismiss(); return; }

if(speech.Contains ("in") || speech.Contains ("on")){ convNum = 3; yield WaitForSeconds (2);
ReturnSpeech("Fine."); vEntrance.DenyEntrance = false; return; }

if(speech.Contains ("ride") || speech.Contains ("lift")){ convNum = 3; yield WaitForSeconds (2);
ReturnSpeech("Yes, just jump on in"); vEntrance.DenyEntrance = false; return; }

if(speech.Contains ("go")){ convNum = 3; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech("Alright then."); Dismiss(); return; }

if(speech.Contains ("drive")){ convNum = 3; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech("Will do."); Dismiss(); return; }

if(speech.Contains ("leave") && !speech.Contains ("i") || speech.Contains ("u") && speech.Contains ("leave")){ convNum = 2; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech("Yes, yes."); Dismiss(); return; }

if(speech.Contains ("i") && speech.Contains ("leave")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Alright."); vEntrance.DenyEntrance = false; return; }

if(speech.Contains ("stop")){ convNum = 3; yield WaitForSeconds (2);
ReturnSpeech("Alright. We're done here."); return; }
//===============================================================================
}
}
//======================================================================================================================================
//======================================================================================================================================

if(mode == 2){
if(convNum == 0){
//===============================================================================
if(speech.Contains ("hi") || speech.Contains ("hey") || speech.Contains ("yo")){ convNum = 1; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech("Hello. \n You sure look well-armed!"); return;}

if(speech.Contains ("hello") || speech.Contains ("greet")){ convNum = 1; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech("Greetings. \n Are you a mercenary?"); return; }

if(speech.Contains ("stop")){ convNum = 1; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech("What is it that you want?"); return; }
//===============================================================================
}
if(convNum == 1){
//===============================================================================
if(speech.Contains ("yes") || speech.Contains ("yep") || speech.Contains ("sure")){ convNum = 2; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech("Well, I don't think you need my help."); Dismiss(); return;}

if(speech.Contains ("hello") || speech.Contains ("greet")){ convNum = 2; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech("I am not really tasked to help militants. \n Farewell for now."); Dismiss(); return; }

if(speech.Contains ("stop")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("What is it?"); return; }
//===============================================================================
}
}

//=================================================================================================================================
//============================================////[Conflict Reactions]////=========================================================
//=================================================================================================================================

if(convNum == 4){
if(TerrahyptianNetwork.TC1CriminalLevel < 16){
//===============================================================================
if(speech.Contains ("sorry")){ convNum = 99; yield WaitForSeconds (8);
ReturnSpeech("Apology accepted, \n now leave!"); Ogle = 1; Attacking = false; PissedAtTC1 = 0; Dismiss(); return; }

if(speech.Contains ("please")){ convNum = 99; yield WaitForSeconds (8);
ReturnSpeech("Stop breaking the law!"); Ogle = 1; Attacking = false; PissedAtTC1 = 0; return; }

if(speech.Contains ("stop")){ convNum = 99; yield WaitForSeconds (8);
ReturnSpeech("Try again and you'll \n be paying a hefty fine."); Ogle = 1; Attacking = false; PissedAtTC1 = 0; return; }

if(speech.Contains ("excuse")){ convNum = 99; yield WaitForSeconds (8);
ReturnSpeech("I'll excuse you once you \n stop breaking our laws."); Ogle = 1; Attacking = false; PissedAtTC1 = 0; return;}
//===============================================================================
}
}

if(convNum > 0){

if(boredom < 3){
if(speech.Contains ("bye") || speech.Contains ("see") || speech.Contains ("fare") || speech.Contains ("later")){ yield WaitForSeconds (2);
ReturnSpeech("Goodbye."); Ogle = 2; Dismiss(); return;}
if(speech.Contains ("thank") || speech.Contains ("good") || speech.Contains ("like")){ yield WaitForSeconds (2);
ReturnSpeech("Don't fret it."); Ogle = 2; return;}
}

//===============================================================================
if(speech.Contains ("fuck you")){ boredom = 3; convNum = 5; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech("Watch your mouth."); return; }
if(speech.Contains ("fuck off")){ boredom = 3; convNum = 4; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech("It is my job to keep watch \n if there is any problems."); return; }
if(speech.Contains ("go away")){ boredom = 3; convNum = 5; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech("I can't do that."); return; }
if(speech.Contains ("get out")){ boredom = 3; convNum = 5; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech("Thanks for your concern, \n but I am going to stay."); return; }
//===============================================================================
}

yield WaitForSeconds (2);
if(boredom == 0){ReturnSpeech("What exactly do you need help with?");}
if(boredom == 1){ReturnSpeech("I'm not sure, buddy."); convNum = 1;}
if(boredom == 2){ReturnSpeech("Ok, we're done here."); Dismiss(); convNum = 1;}
if(boredom == 3){ReturnSpeech("Calm down."); convNum = 99; Dismiss(); Ogle = 1;}
boredom += 1;
}

function ReturnSpeech (yourText : String){
var Load = Resources.Load("Prefabs/TalkBubble", GameObject) as GameObject;
var TGO = Instantiate(Load, thisTransform.position, Load.transform.rotation);
TGO.name = "CFC3";
TGO.GetComponent(TalkBubbleScript).myText = yourText;
TGO.GetComponent(TalkBubbleScript).source = thisVTransform;
}