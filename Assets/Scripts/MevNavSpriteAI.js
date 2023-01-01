var target : Transform;
var Waypoint : Transform;
var Forward : Transform;
var AIAnchor : Transform;

var NpcController : RemoveOverTime;

var Home : Transform;

var Trig : SphereCollider;
var Presence : GameObject;

var thisTransform : Transform;
var thisVTransform : Transform;

var vRigidbody : Rigidbody;

var SpotSound : GameObject;
var AttackSound : GameObject;
var RejectSound : GameObject;
var PriorityWaypoint : GameObject;

var Attacking : boolean;
var Obstacle : boolean = false;
var Stuck : boolean = false;
var Damaged : boolean;

var Jammed : boolean;

var Activated : boolean;

var Far : boolean;

var SlowingDown : boolean;
var TurnRight : boolean;
var TurnLeft : boolean;

var Ignore : boolean;

var Spot = 0;

var DangerSense = 0;

var Vel = 0;

var AngVel : float = 0;

var localV : Vector3;

var relativePoint : Vector3;

var targetLayers : LayerMask;

var RD : float = 0;

var GyroForce : float = 0.2;
var TurnForce : float = 0;

var GyroOff : boolean;

InvokeRepeating("Regenerator", 0.43, 1);

function Start (){

Spot = 1;

GyroForce = 0.05;

yield WaitForSeconds (0.3);

if(target.name.Contains ("TC"))
Attacking = true;

Activated = true;

}

function Update () {

if(!Activated)
return;

Vel = vRigidbody.velocity.magnitude;

thisTransform.rotation = AIAnchor.transform.rotation;
thisTransform.position = AIAnchor.transform.position;

if(Attacking){
if(target == null){
StopAllCoroutines();
target = Waypoint;
Attacking = false;
Spot = 1;
}
}

if(TurnLeft)
  TurnForce = -1;

if(TurnRight)
  TurnForce = 1;

if(!TurnRight && !TurnLeft)
  TurnForce = 0;

if(TurnRight && TurnLeft)
  TurnForce = 1;
	
var newRot : Vector3 = (thisTransform.forward * 0.5f ).normalized;
var hit : RaycastHit;
	
Debug.DrawRay (thisTransform.position + thisTransform.forward * 1, newRot * 200f, Color.green);

Obstacle = false;

if (Physics.Raycast (thisTransform.position + thisTransform.forward * 1, thisTransform.forward, hit, 200, targetLayers) && -localV.y > 30){
     SlowingDown = true;
 } else {
     SlowingDown = false;
 }

newRot = (thisTransform.forward * 0.9f + thisTransform.right * 0.1f).normalized;

Debug.DrawRay (thisTransform.position + thisTransform.right * 1.2, newRot * 100, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.right * 1.2, newRot, 100)) {
     TurnLeft = true;
 } else {
     TurnLeft = false;
 }
 
newRot = (thisTransform.forward * 0.9f + thisTransform.right * -0.1f).normalized;

Debug.DrawRay (thisTransform.position + -thisTransform.right * 1.2, newRot * 100, Color.black);
if (Physics.Raycast (thisTransform.position + -thisTransform.right * 1.2, newRot, 100)) {
		TurnRight = true;
	} else {
        TurnRight = false;
 }
	
}


function FixedUpdate () {

if(!Activated || Jammed)
return;

AngVel = vRigidbody.angularVelocity.magnitude;
 
var hit : RaycastHit;
var hit2 : RaycastHit;

localV = thisVTransform.InverseTransformDirection(vRigidbody.velocity);

if(localV.z < 0)
RD = Mathf.Abs(localV.z);
else
RD = 0;

vRigidbody.AddTorque(thisTransform.up * TurnForce);

if(target){

if(!Obstacle){
if(Far){
vRigidbody.AddForceAtPosition((target.transform.position - thisVTransform.position).normalized * 0.2, thisTransform.forward * 2);
vRigidbody.AddForceAtPosition((target.transform.position - thisVTransform.position).normalized * -0.2, -thisTransform.forward * 2);
GyroForce = 0.4;
}else{
vRigidbody.AddForceAtPosition((target.transform.position - thisVTransform.position).normalized * 0.05, thisTransform.forward * 2);
vRigidbody.AddForceAtPosition((target.transform.position - thisVTransform.position).normalized * -0.05, -thisTransform.forward * 2);
GyroForce = 0.2;
}
}

}

if (Physics.Raycast (thisTransform.position + thisTransform.forward * 1 + thisTransform.up * 1, thisTransform.forward, 30, targetLayers))
Obstacle = true;

Debug.DrawRay (thisTransform.position + thisTransform.forward * 1 + -thisTransform.up * 1, thisTransform.forward * 30, Color.white);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 1 + -thisTransform.up * 1, thisTransform.forward, hit2, 30, targetLayers)){
Obstacle = true;
vRigidbody.AddTorque(thisTransform.right * -1);
if(Attacking)
vRigidbody.AddForce(thisVTransform.forward * 6);
else
vRigidbody.AddForce(thisVTransform.forward * 3);
		
}

vRigidbody.AddForceAtPosition(Vector3.up * GyroForce, thisTransform.up * 2);
vRigidbody.AddForceAtPosition(-Vector3.up * GyroForce, -thisTransform.up * 2);

if(!Physics.Raycast (thisTransform.position, thisTransform.up, 2, targetLayers)){
if(Physics.Raycast (thisTransform.position, Vector3.down, 100 + RD, targetLayers)){
vRigidbody.AddForce(Vector3.up * 3);
GyroForce = 1;
}
}else{
vRigidbody.AddForce(thisVTransform.forward * -4);
}

if(!Physics.Raycast (thisTransform.position, Vector3.down, 150, targetLayers))
vRigidbody.AddForce(Vector3.up * -1.5);

if(Obstacle){

if(-localV.y > 0){
if(-localV.y > 15)
vRigidbody.AddForce(-thisVTransform.up * -3);
else
vRigidbody.AddForce(-thisVTransform.up * -1);
}

}

if(Stuck)
  vRigidbody.AddForce(-thisVTransform.up * -1.5);

if(Vel < 80){
if(Attacking){
if(!Obstacle && !Stuck && !SlowingDown && !TurnLeft && !TurnRight)
  vRigidbody.AddForce(-thisVTransform.up * 2);
  }else{
if(!Obstacle && !Stuck && !SlowingDown && !TurnLeft && !TurnRight)
  vRigidbody.AddForce(-thisVTransform.up * 1);
  }
}

}

function OnTriggerEnter (other : Collider) {

if(!Activated)
return;

ON = other.name;
OT = other.transform;

if(other.tag == "Projectile" && !ON.Contains ("TFC7")){

if(!Attacking){
DangerSense = 4;
target = Waypoint;
if(other.rigidbody)
if(Waypoint)
Waypoint.transform.position = OT.position;
}

}

if(!Attacking){
if(ON.Contains ("TC") && !ON.Contains ("TC7")){

if(ON.Contains ("TC0"))
Ignore = true;

if(ON.Contains ("TC1")){

if(!Attacking){
if(MevNavNetwork.TC1DeathRow > 300){
  target = OT;
  MevNavNetwork.instance.PriorityWaypoint.position = target.position;
  if(MevNavNetwork.TC1DeathRow < 600)
  MevNavNetwork.TC1DeathRow = 600;
  Attacking = true;
  }else{
  Ignore = true;
  }
  }
}

if(ON.Contains ("TC2"))
Ignore = true;

if(ON.Contains ("TC3")){

if(!Attacking){
if(MevNavNetwork.TC3DeathRow > 300 && MevNavNetwork.TC1DeathRow < 300){
  target = OT;
  MevNavNetwork.instance.PriorityWaypoint.position = target.position;
  if(MevNavNetwork.TC3DeathRow < 600)
  MevNavNetwork.TC3DeathRow = 600;
  Attacking = true;
  }else{
  Ignore = true;
  }
  }

}

if(ON.Contains ("TC4")){

if(!Attacking){
if(MevNavNetwork.TC4DeathRow > 300 && MevNavNetwork.TC1DeathRow < 300){
  target = OT;
  MevNavNetwork.instance.PriorityWaypoint.position = target.position;
  if(MevNavNetwork.TC4DeathRow < 600)
  MevNavNetwork.TC4DeathRow = 600;
  Attacking = true;
  }else{
  Ignore = true;
  }
  }

}

if(ON.Contains ("TC5")){

if(!Attacking){
if(MevNavNetwork.TC5DeathRow > 300 && MevNavNetwork.TC1DeathRow < 300){
  target = OT;
  MevNavNetwork.instance.PriorityWaypoint.position = target.position;
  if(MevNavNetwork.TC5DeathRow < 600)
  MevNavNetwork.TC5DeathRow = 600;
  Attacking = true;
  }else{
  Ignore = true;
  }
  }

}

if(ON.Contains ("TC6")){

if(!Attacking){
if(MevNavNetwork.TC6DeathRow > 300 && MevNavNetwork.TC1DeathRow < 300){
  target = OT;
  MevNavNetwork.instance.PriorityWaypoint.position = target.position;
  if(MevNavNetwork.TC6DeathRow < 600)
  MevNavNetwork.TC6DeathRow = 600;
  Attacking = true;
  }else{
  Ignore = true;
  }
  }

}

if(ON.Contains ("TC8")){

if(!Attacking){
if(MevNavNetwork.TC8DeathRow > 300 && MevNavNetwork.TC1DeathRow < 300){
  target = OT;
  MevNavNetwork.instance.PriorityWaypoint.position = target.position;
  if(MevNavNetwork.TC8DeathRow < 600)
  MevNavNetwork.TC8DeathRow = 600;
  Attacking = true;
  }else{
  Ignore = true;
  }
  }

}

if(ON.Contains ("TC9")){

if(!Attacking){
if(MevNavNetwork.TC9DeathRow > 300 && MevNavNetwork.TC1DeathRow < 300){
  target = OT;
  MevNavNetwork.instance.PriorityWaypoint.position = target.position;
  if(MevNavNetwork.TC9DeathRow < 600)
  MevNavNetwork.TC9DeathRow = 600;
  Attacking = true;
  }else{
  Ignore = true;
  }
  }

}

}
}
}

function TargetArea () {

if(Waypoint)
if(!Attacking)
if(MevNavNetwork.AlertTime > 0){
Waypoint.transform.position = MevNavNetwork.instance.PriorityWaypoint.position;
target = Waypoint;
}

yield WaitForSeconds (8);
if(!Attacking)
target = Forward;
}

function Regenerator () {

if(!Activated)
return;

if(!Attacking){

if(Ignore){
Ignore = false;
var TheThing0 = Instantiate(RejectSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
TheThing0.transform.parent = thisTransform;
}else{
var TheThing1 = Instantiate(SpotSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
TheThing1.transform.parent = thisTransform;
}

if(Spot > 1)
Spot -= 1;

if(Spot == 1){
Spot = 16;
TargetArea();
}
}else{
if(Spot == 1){
Spot = 0;
var TheThing2 = Instantiate(AttackSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
TheThing2.transform.parent = thisTransform;
}
}

if(target){

if(Attacking){

if(Vector3.Distance(thisTransform.position, target.position) > 600){
Far = true;
}else{
if(Vector3.Distance(thisTransform.position, target.position) < 500)
Far = false;
}

if(target.name.Contains ("C1")){
if(MevNavNetwork.TC1DeathRow > 300){
MevNavNetwork.instance.PriorityWaypoint.position = target.position;
MevNavNetwork.AlertTime = 60;
if(MevNavNetwork.TC1DeathRow < 600)
MevNavNetwork.TC1DeathRow = 600;
else
MevNavNetwork.AlertLVL2 = 1;
if(target.name.Contains ("xbT"))
MevNavNetwork.instance.xbTarget = target;
}
}
if(target.name.Contains ("C3")){
if(MevNavNetwork.TC3DeathRow > 300){
MevNavNetwork.instance.PriorityWaypoint.position = target.position;
MevNavNetwork.AlertTime = 60;
if(MevNavNetwork.TC3DeathRow < 600)
MevNavNetwork.TC3DeathRow = 600;
else
MevNavNetwork.AlertLVL2 = 3;
}
}
if(target.name.Contains ("C4")){
if(MevNavNetwork.TC4DeathRow > 300){
MevNavNetwork.instance.PriorityWaypoint.position = target.position;
MevNavNetwork.AlertTime = 60;
if(MevNavNetwork.TC4DeathRow < 600)
MevNavNetwork.TC4DeathRow = 600;
else
MevNavNetwork.AlertLVL2 = 4;
}
}
if(target.name.Contains ("C5")){
if(MevNavNetwork.TC5DeathRow > 300){
MevNavNetwork.instance.PriorityWaypoint.position = target.position;
MevNavNetwork.AlertTime = 60;
if(MevNavNetwork.TC5DeathRow < 600)
MevNavNetwork.TC5DeathRow = 600;
else
MevNavNetwork.AlertLVL2 = 5;
}
}
if(target.name.Contains ("C6")){
if(MevNavNetwork.TC6DeathRow > 300){
MevNavNetwork.instance.PriorityWaypoint.position = target.position;
MevNavNetwork.AlertTime = 60;
if(MevNavNetwork.TC6DeathRow < 600)
MevNavNetwork.TC6DeathRow = 600;
else
MevNavNetwork.AlertLVL2 = 6;
}
}

if(target.name.Contains ("C8")){
if(MevNavNetwork.TC8DeathRow > 300){
MevNavNetwork.instance.PriorityWaypoint.position = target.position;
MevNavNetwork.AlertTime = 60;
if(MevNavNetwork.TC8DeathRow < 600)
MevNavNetwork.TC8DeathRow = 600;
else
MevNavNetwork.AlertLVL2 = 8;
}
}

if(target.name.Contains ("C9")){
if(MevNavNetwork.TC9DeathRow > 300){
MevNavNetwork.instance.PriorityWaypoint.position = target.position;
MevNavNetwork.AlertTime = 60;
if(MevNavNetwork.TC9DeathRow < 600)
MevNavNetwork.TC9DeathRow = 600;
else
MevNavNetwork.AlertLVL2 = 9;
}
}

}
}

GyroForce = 0.2;

if(Attacking){
Trig.center = Vector3(0,0,0);
Trig.radius = 50;
}else{
Trig.center = Vector3(0,0,350);
Trig.radius = 400;

if(DangerSense > 0)
DangerSense -= 1;

if(Home){
if(Vector3.Distance(thisTransform.position, Home.position) > 500)
target = Home;
else
target = Forward;
}
}

var lastPos : Vector3 = thisTransform.position;
IsEscaping(lastPos);

}

function IsEscaping(lastPos : Vector3){
Stuck = false;
yield WaitForSeconds (0.5);

if(Vector3.Distance(thisTransform.position, lastPos) < 1){
  Stuck = true;
  yield WaitForSeconds (1);
  Stuck = false;
}
  
}