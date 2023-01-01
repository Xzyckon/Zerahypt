var target : Transform;
var Waypoint : Transform;
var Forward : Transform;
var AIAnchor : Transform;

var NpcController : RemoveOverTime;

var TargetTrace : Transform;
var TargetLead : Transform;
var TargetLead2 : Transform;
var TLCol : SphereCollider;

var Gun : NPCGun;
var Trig : SphereCollider;
var Presence : GameObject;

var thisTransform : Transform;
var thisVTransform : Transform;

var vRigidbody : Rigidbody;

var AttackSound : GameObject;
var PriorityWaypoint : GameObject;

var PissedAtTC0a = 0;

var PissedAtTC1 = 0;
var PissedAtTC2 = 0;
var PissedAtTC3 = 0;
var PissedAtTC4 = 0;
var PissedAtTC5 = 0;
var PissedAtTC6 = 0;
var PissedAtTC7 = 0;
var PissedAtTC8 = 0;

var Attacking : boolean;
var Monitoring : boolean;
var Obstacle : boolean = false;
var Stuck : boolean = false;
var TargetClose : boolean;
var Stopping : boolean;
var Damaged : boolean;

var TurnRight : boolean;
var TurnLeft : boolean;

var Spot = 0;
var Ignorage = 0;

var DangerSense = 0;

var FoundBig : boolean;
var FoundExtraBig : boolean;

var Dist : float = 0;

var Clamp  : float = 0;

var Vel : float = 0;
var Vel2 : float = 0;

var AngVel : float = 0;

var localV : Vector3;

var relativePoint : Vector3;

var targetLayers : LayerMask;

var MtargetLayers : LayerMask;

var RD : float = 0;

var GyroForce : float = 0.2;
var TurnForce : float = 0;

var ShootFrequency : float = 5;
var UniqueShootTime : float = 0.1;

var GyroOff : boolean;

InvokeRepeating("Regenerator", 1, 1);

InvokeRepeating("Targety", 30, 30);

InvokeRepeating("Shooty", 1, ShootFrequency);

InvokeRepeating("CalcLead", 1, 0.15);

function Start (){

GyroForce = 0.05;

Vel = 2;
Vel2 = 2;

UniqueShootTime = Random.Range(0, 0.2);

yield WaitForSeconds (0.3);

if(target)
if(target.name.Contains ("TC"))
Attacking = true;

}

function Update () {

if(target)
Dist = Vector3.Distance(thisTransform.position, target.position);

Clamp = Mathf.Clamp(Dist,30,90);

Vel = Mathf.Clamp(vRigidbody.velocity.magnitude,16,128);

Vel2 = Mathf.Clamp(Vel * 2,16,128);

if(Attacking){
if(!target){
StopAllCoroutines();
target = Waypoint;
Attacking = false;
Monitoring = false;
Spot = 0;
}else{

if(target == Forward){
target = Waypoint;
Attacking = false;
Monitoring = false;
Spot = 0;
}

if(target.name.Contains ("bro")){
StopAllCoroutines();
target = Waypoint;
Attacking = false;
Monitoring = false;
Spot = 0;
}

}
}else{
if(!target){
target = Forward;
Monitoring = false;
}
}

if(TurnLeft)
  TurnForce = -6;

if(TurnRight)
  TurnForce = 6;

if(!TurnRight && !TurnLeft)
  TurnForce = 0;

if(TurnRight && TurnLeft)
  TurnForce = 0;
	
var newRot : Vector3 = (thisTransform.forward * 0.5f ).normalized;
var hit : RaycastHit;
	
Debug.DrawRay (thisTransform.position + thisTransform.forward * 1, newRot * 50f, Color.green);

if(target){

relativePoint = thisVTransform.InverseTransformPoint(target.position);

if(!FoundBig){
if(Dist < 16)
TargetClose = true;
else
TargetClose = false;
}else{
if(!FoundExtraBig){
if(Dist < 64)
TargetClose = true;
else
TargetClose = false;
}else{
if(Dist < 128)
TargetClose = true;
else
TargetClose = false;
}

}

}
 
TurnRight = false;
TurnLeft = false;

newRot = (thisTransform.forward * 0.8f + thisTransform.right * 0.1f).normalized;

Debug.DrawRay (thisTransform.position + thisTransform.right * 1.2, newRot * Vel, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.right * 1.2, newRot, hit, Vel, targetLayers)) {
if(Vector3.Distance(hit.point, target.position) > 16){
     TurnLeft = true;
     //Debug.Log(hit.transform.name);
     }

}
 
newRot = (thisTransform.forward * 0.8f + thisTransform.right * -0.1f).normalized;

Debug.DrawRay (thisTransform.position + -thisTransform.right * 1.2, newRot * Vel, Color.black);
if (Physics.Raycast (thisTransform.position + -thisTransform.right * 1.2, newRot, hit, Vel, targetLayers)) {
if(Vector3.Distance(hit.point, target.position) > 16){
		TurnRight = true;
		//Debug.Log(hit.transform.name);
		}

}
	
}


function FixedUpdate () {

AngVel = vRigidbody.angularVelocity.magnitude;
 
var hit : RaycastHit;
var hit2 : RaycastHit;

thisTransform.rotation = AIAnchor.transform.rotation;
thisTransform.position = AIAnchor.transform.position;

thisTransform.Translate(Vector3.down * 0.1, Space.World);

localV = thisVTransform.InverseTransformDirection(vRigidbody.velocity);

RelativeTarget = thisVTransform.InverseTransformPoint(thisTransform.position);

if(RelativeTarget.z > 0){
if(RelativeTarget.x > 0)
vRigidbody.AddTorque(thisVTransform.up * -8);
else
vRigidbody.AddTorque(thisVTransform.up * 8);
}else{
GyroForce = 0.5;
}

if(!Stopping){
Obstacle = false;
}else{
Obstacle = true;
}

if(localV.z < 0)
RD = Mathf.Abs(localV.z);
else
RD = 0;

vRigidbody.AddTorque(thisTransform.up * TurnForce);

if(target){

if(Attacking){
if(!Obstacle){

    if(AngVel > 1){
    vRigidbody.AddForceAtPosition((TargetLead.transform.position - thisVTransform.position).normalized * 0.2, thisTransform.forward * 2);
    vRigidbody.AddForceAtPosition((TargetLead.transform.position - thisVTransform.position).normalized * -0.2, -thisTransform.forward * 2);
    }else{
    if(RelativeTarget.z < 0)
    GyroForce = 0;
    vRigidbody.AddForceAtPosition((TargetLead.transform.position - thisVTransform.position).normalized * 4, thisTransform.forward * 2);
    vRigidbody.AddForceAtPosition((TargetLead.transform.position - thisVTransform.position).normalized * -4, -thisTransform.forward * 2);
    }

}
}else{
    vRigidbody.AddForceAtPosition((target.transform.position - thisVTransform.position).normalized * 1, thisTransform.forward * 2);
    vRigidbody.AddForceAtPosition((target.transform.position - thisVTransform.position).normalized * -1, -thisTransform.forward * 2);
}
}

Debug.DrawRay (thisTransform.position + thisTransform.forward * 1, thisTransform.forward * Vel, Color.white);
Debug.DrawRay (thisTransform.position + thisTransform.forward * 1 + -thisTransform.up * 1, thisTransform.forward * Vel, Color.white);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 1, thisTransform.forward, hit2, Vel, targetLayers) ||
    Physics.Raycast (thisTransform.position + thisTransform.forward * 1 + -thisTransform.up * 1, thisTransform.forward, hit2, Vel, targetLayers)){
Obstacle = true;
        if(hit2.distance + 24 < Dist)
        vRigidbody.AddTorque(thisTransform.right * -2);
        if(Attacking)
        vRigidbody.AddForce(thisVTransform.forward * 6);
        else
        vRigidbody.AddForce(thisVTransform.forward * 3);
		
}


    vRigidbody.AddForceAtPosition(Vector3.up * GyroForce, thisTransform.up * 2);
    vRigidbody.AddForceAtPosition(-Vector3.up * GyroForce, -thisTransform.up * 2);

if(!Physics.Raycast (thisTransform.position, thisTransform.up, 2, targetLayers)){
if(Physics.Raycast (thisTransform.position, Vector3.down, 5 + RD, targetLayers)){
vRigidbody.AddForce(Vector3.up * 6);
GyroForce = 2;
}
}else{
vRigidbody.AddForce(thisVTransform.forward * -4);
}

if(!Physics.Raycast (thisTransform.position, Vector3.down, 50, targetLayers))
vRigidbody.AddForce(Vector3.up * -1.5);

if(Obstacle || TargetClose){

if(-localV.y > 0){
if(-localV.y > 10)
vRigidbody.AddForce(-thisVTransform.up * -6);
else
vRigidbody.AddForce(-thisVTransform.up * -3);
}

}

if(Stuck)
  vRigidbody.AddForce(-thisVTransform.up * -1.5);

if(Vel < 120 && !TargetClose){
if(Attacking){
if(!Obstacle && !Stuck && !TurnLeft && !TurnRight)
  vRigidbody.AddForce(-thisVTransform.up * 3);
  }else{
if(!Obstacle && !Stuck && !TurnLeft && !TurnRight)
  vRigidbody.AddForce(-thisVTransform.up * 2);
  }
}



}

function OnTriggerEnter (other : Collider) {

ON = other.name;
OT = other.transform;

if(Physics.Linecast (thisTransform.position, OT.position, MtargetLayers))
return;

if(!Attacking && Spot < 2){
if(ON.Contains ("TC") && !ON.Contains ("TC9")){
                       
target = OT;
Spot = 4;
StopAllCoroutines();
}
}

if(ON.Contains ("TFC") && !ON.Contains ("TFC9")){

if(ON.Contains ("TFC0a"))
PissedAtTC0a += 1;

if(ON.Contains ("TFC1"))
PissedAtTC1 += 1;

if(ON.Contains ("TFC2"))
PissedAtTC2 += 1;

if(ON.Contains ("TFC3"))
PissedAtTC3 += 1;

if(ON.Contains ("TFC4"))
PissedAtTC4 += 1;

if(ON.Contains ("TFC5"))
PissedAtTC5 += 1;

if(ON.Contains ("TFC6"))
PissedAtTC6 += 1;

if(ON.Contains ("TFC7"))
PissedAtTC7 += 1;

if(ON.Contains ("TFC8"))
PissedAtTC8 += 1;

if(!Attacking)
if(DangerSense == 0){
Trig.radius = 64;
DangerSense = 4;
target = Waypoint;
if(other.rigidbody)
if(Waypoint)
Waypoint.transform.position = OT.position;
}

}
}

function OnTriggerStay (other : Collider) {

ON = other.name;
OT = other.transform;

if(Physics.Linecast (thisTransform.position, OT.position, MtargetLayers))
return;

if(Waypoint){
if(DangerSense > 0){
if(ON.Contains ("TC") && !ON.Contains ("TC9")){
  if(Vector3.Distance(OT.position, Waypoint.transform.position) < 64){
  target = OT;
  DangerSense = 0;
  Spot = 0;
  }
}
}
}

}

function Shoot () {
if(Attacking){
yield WaitForSeconds (UniqueShootTime);
Gun.Fire();
}
}

function Shooty () {

if(Attacking)
Shoot();

}

function Engagey () {

Attacking = true;
Monitoring = false;
var TheThing3 = Instantiate(AttackSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
TheThing3.transform.parent = thisTransform;

if(target){
if(PissedAtTC1 > 3)
if(target.name.Contains ("C1"))
DutvutanianNetwork.instance.EnemyTargetMin = target;
if(PissedAtTC2 > 3)
if(target.name.Contains ("C2"))
DutvutanianNetwork.instance.EnemyTargetMin = target;
if(PissedAtTC3 > 3)
if(target.name.Contains ("C3"))
DutvutanianNetwork.instance.EnemyTargetMin = target;
if(PissedAtTC4 > 3)
if(target.name.Contains ("C4"))
DutvutanianNetwork.instance.EnemyTargetMin = target;
if(PissedAtTC5 > 3)
if(target.name.Contains ("C5"))
DutvutanianNetwork.instance.EnemyTargetMin = target;
if(PissedAtTC6 > 3)
if(target.name.Contains ("C6"))
DutvutanianNetwork.instance.EnemyTargetMin = target;
if(PissedAtTC7 > 3)
if(target.name.Contains ("C7"))
DutvutanianNetwork.instance.EnemyTargetMin = target;
if(PissedAtTC8 > 3)
if(target.name.Contains ("C8"))
DutvutanianNetwork.instance.EnemyTargetMin = target;
}

StopAllCoroutines();
}

function Targety () {

if(Spot < 1 && !Attacking && !Monitoring)
TargetArea();
}

function IsMoving(){
  Stuck = true;
  yield WaitForSeconds (1);
  Stuck = false;
}

function TargetArea () {

if(Waypoint){
Waypoint.transform.position = DutvutanianNetwork.instance.PriorityWaypoint.position;
target = Waypoint;
}

yield WaitForSeconds (4);
target = Forward;
}

function CalcLead () {
Lead();
}

function Lead (){

if(target)
TargetTrace.position = target.position;

yield WaitForSeconds (0.1);

if(target){

var Dist2 = Vector3.Distance(TargetTrace.position, target.position);

TargetTrace.LookAt(target);

TargetLead.position = TargetTrace.position;
TargetLead.rotation = TargetTrace.rotation;
TargetLead2.position = TargetTrace.position;
TargetLead2.rotation = TargetTrace.rotation;

TargetLead.position += TargetLead.forward * Dist * Dist2 * 0.03;
TargetLead2.position += TargetLead.forward * Dist2 * 2;

if(Attacking)
TLCol.radius = Vector3.Distance(thisTransform.position, target.position) * 0.05;
else
TLCol.radius = 0.1;

}
}

function Regenerator () {

Stopping = false;

if(target){

if(Ignorage > 5){
Ignorage = 0;
Attacking = false;
target = Forward;
}

if(Attacking){
if(Dist > 1000){
Attacking = false;
Spot = 0;
Waypoint.transform.position = target.transform.position;
target = Waypoint;
}
}else{
if(DutvutanianNetwork.instance.AlertTime > 1)
if(!target.name.Contains ("TC"))
if(Waypoint){
Waypoint.transform.position = DutvutanianNetwork.instance.PriorityWaypoint.position;
if(Vector3.Distance(thisTransform.position, Waypoint.position) > 128)
target = Waypoint;
else
target = Forward;
}
}

if(Spot < 4){
if(target.name.Contains ("TC0")){

Gun.ConfirmedName = target.name;

if(!Attacking)
if(DangerSense > 0)
Engagey();

}

if(target.name.Contains ("TC1")){

Gun.ConfirmedName = target.name;

if(DutvutanianNetwork.TC1CriminalLevel > 150){
  DutvutanianNetwork.instance.PriorityWaypoint.position = target.position;
  DutvutanianNetwork.instance.AlertTime = 120;
  Monitoring = true;
  if(DutvutanianNetwork.TC1CriminalLevel < 240)
  DutvutanianNetwork.TC1CriminalLevel = 240;
  }

  if(!Attacking){
  if(PissedAtTC1 > 1)
  Engagey();
  }
}

if(target.name.Contains ("TC2")){

Gun.ConfirmedName = target.name;

  if(DutvutanianNetwork.TC2CriminalLevel > 150){
  DutvutanianNetwork.instance.PriorityWaypoint.position = target.position;
  DutvutanianNetwork.instance.AlertTime = 120;
  Monitoring = true;
  if(DutvutanianNetwork.TC2CriminalLevel < 240)
  DutvutanianNetwork.TC2CriminalLevel = 240;
  //Debug.Log("ItDidIt");
  }

  if(!Attacking){
  if(PissedAtTC2 > 1)
  Engagey();
  }

}

if(target.name.Contains ("TC3")){

Gun.ConfirmedName = target.name;

  if(DutvutanianNetwork.TC3CriminalLevel > 150){
  DutvutanianNetwork.instance.PriorityWaypoint.position = target.position;
  DutvutanianNetwork.instance.AlertTime = 120;
  Monitoring = true;
  if(DutvutanianNetwork.TC3CriminalLevel < 240)
  DutvutanianNetwork.TC3CriminalLevel = 240;
  }

  if(!Attacking){
  if(PissedAtTC3 > 1)
  Engagey();
  }

}

if(target.name.Contains ("TC4")){

Gun.ConfirmedName = target.name;

  if(DutvutanianNetwork.TC4CriminalLevel > 150){
  DutvutanianNetwork.instance.PriorityWaypoint.position = target.position;
  DutvutanianNetwork.instance.AlertTime = 120;
  Monitoring = true;
  if(DutvutanianNetwork.TC4CriminalLevel < 240)
  DutvutanianNetwork.TC4CriminalLevel = 240;
  }

  if(!Attacking){
  if(PissedAtTC4 > 1)
  Engagey();
  }

}

if(target.name.Contains ("TC5")){

Gun.ConfirmedName = target.name;

  if(DutvutanianNetwork.TC5CriminalLevel > 150){
  DutvutanianNetwork.instance.PriorityWaypoint.position = target.position;
  DutvutanianNetwork.instance.AlertTime = 120;
  Monitoring = true;
  if(DutvutanianNetwork.TC5CriminalLevel < 240)
  DutvutanianNetwork.TC5CriminalLevel = 240;
  }

  if(!Attacking){
  if(PissedAtTC5 > 1)
  Engagey();
  }

}

if(target.name.Contains ("TC6")){

Gun.ConfirmedName = target.name;

  if(DutvutanianNetwork.TC6CriminalLevel > 150){
  DutvutanianNetwork.instance.PriorityWaypoint.position = target.position;
  DutvutanianNetwork.instance.AlertTime = 120;
  Monitoring = true;
  if(DutvutanianNetwork.TC6CriminalLevel < 240)
  DutvutanianNetwork.TC6CriminalLevel = 240;
  }

  if(!Attacking){
  if(PissedAtTC6 > 1)
  Engagey();
  }

}

if(target.name.Contains ("TC7")){

Gun.ConfirmedName = target.name;

  if(DutvutanianNetwork.TC7CriminalLevel > 150){
  DutvutanianNetwork.instance.PriorityWaypoint.position = target.position;
  DutvutanianNetwork.instance.AlertTime = 120;
  Monitoring = true;
  if(DutvutanianNetwork.TC7CriminalLevel < 240)
  DutvutanianNetwork.TC7CriminalLevel = 240;
  }

  if(!Attacking){
  if(PissedAtTC7 > 1)
  Engagey();
  }

}

if(DangerSense > 0){

if(DangerSense < 2){
target = Forward;
Attacking = false;
}

DangerSense -= 1;
}

}else{

if(Spot > 2){
Spot -= 1;
}else{
if(Dist < 70)
Spot -= 1;
}

}

if(target.name.Contains ("bT")){
if(target.name.Contains ("xbT")){
FoundExtraBig = true;
FoundBig = false;
}else{
FoundExtraBig = false;
FoundBig = true;
}
}else{
FoundBig = false;
FoundExtraBig = false;
}

TargetClose = false;

if(Ignorage > 24)
  Targety();

var lastPos : Vector3 = thisTransform.position;
var lastTPos : Vector3 = target.position;
IsEscaping(lastPos, lastTPos, relativePoint.y);

}

if(Attacking){
Trig.radius = 64;
}else{

Trig.radius += 100;

if(Trig.radius > 550)
Trig.radius = 200;

}

if(Spot > 0)
Spot -= 1;

}

function IsEscaping(lastPos : Vector3, lastTPos : Vector3, Measure1 : float){
Stuck = false;
var AngMeasure = AngVel;
yield WaitForSeconds (0.5);

if(target){
var Measure2 = relativePoint;

if(target){
if(Spot < 1 && target != Waypoint)
if(Vector3.Distance(target.position, lastTPos) < 0.5)
  Ignorage += 1;
}
}

if(Vector3.Distance(thisTransform.position, lastPos) < 1 && !Stopping){
  Stuck = true;
  yield WaitForSeconds (1);
  Stuck = false;
}
  
}