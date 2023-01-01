var target : Transform;

var tDist : float;

var Waypoint : Transform;
var Home : Transform;

var thisTransform : Transform;
var thisVTransform : Transform;

var vRigidbody : Rigidbody;

var AIAnchor : Transform;

var TargetTrace : Transform;
var TargetLead : Transform;
var leadAmount : float = 0.02;

var Dist1 : float;
var Dist2 : float;

var Vessel: GameObject;
var Trig : SphereCollider;
var Presence : GameObject;
var thisTC : Transform;

var PlayerSpawn : boolean;

var isTC1 : boolean;
var isTC5 : boolean;

var isSingleShot : boolean;

var ShotTC1 : GameObject;
var ShotTC5 : GameObject;
var Muzzle1 : Transform;

var Wing : GameObject;

var Sounds: AudioSource;

var AlarmSound : GameObject;

var Obscurity : boolean = false;
var Damaged : boolean;

var vDamage : VehicleDamage;

var IsActive : boolean;

var Obstacle : boolean;
var TurnRight : boolean;
var TurnLeft : boolean;

var TurnUp : boolean;

var PissedAtTC0a = 0;

var PissedAtTC1 = 0;
var PissedAtTC2 = 0;
var PissedAtTC3 = 0;
var PissedAtTC4 = 0;
var PissedAtTC5 = 0;
var PissedAtTC6 = 0;
var PissedAtTC7 = 0;
var PissedAtTC8 = 0;
var PissedAtTC9 = 0;

var NeutralizeAll : boolean;

var Attacking: boolean;

var Armed : boolean;

var LineOfFire : boolean;

var HomeIsMoving : boolean;

var targetLayers : LayerMask;

var GyroForce = 10.0;
var TurnForce : float = 0;
var Force : float = 0.2;

var ManeuvForce : float = 0;

var Vel : float;

var DAngle : float;

var relativePoint : Vector3;
var uTurn : boolean;

var strafeLeft : boolean;
var strafeRight : boolean;

var Dist1D : float;
var HTDist : float;

var RHitD : float;
var LHitD : float;

var LeadNum = 0;

InvokeRepeating("Regenerator", 0.5, 0.5);

function Start (){

if(isTC1){
var gO1 = new GameObject("TL1");
TargetLead = gO1.transform;
gO1.layer = 29;
}

if(isTC5){
var gO5 = new GameObject("TL5");
TargetLead = gO5.transform;
gO5.layer = 29;
}

var gO = new GameObject("TT");
TargetTrace = gO.transform;

TargetTrace.position = transform.position;
TargetTrace.rotation = transform.rotation;
TargetLead.position = transform.position;
TargetLead.rotation = transform.rotation;

Force = 0.1;

yield WaitForSeconds (0.2);

vRigidbody.centerOfMass = Vector3(0, 0, 0);

Trig.radius = 400;

//PersonalDroneSet==============================

yield WaitForSeconds (0.8);

if(!PlayerSpawn)
return;

if(Home.name.Contains ("TC1")){

}



}

function Update () {

 if (Vessel == null){
  Destroy(Waypoint.gameObject);
  Destroy(gameObject);
 }

 if (Damaged) {
  Sounds.volume = 0;
  vRigidbody.drag = 0.1;
  vRigidbody.angularDrag = 0.1;
  Destroy(Presence);
  Destroy(Waypoint.gameObject);
  Destroy(gameObject);
 }

if(Damaged)
return;

if(!IsActive || Vessel == null)
return;

thisTransform.rotation = AIAnchor.transform.rotation;
thisTransform.position = AIAnchor.transform.position;

var hit : RaycastHit;

TurnForce = 0;

if(TurnLeft)
  TurnForce = -0.005;

if(TurnRight)
  TurnForce = 0.005;

if(TurnRight && TurnLeft)
  TurnForce = 0;

var newRot : Vector3 = (thisTransform.forward * 0.6f ).normalized;

newRot = (thisTransform.forward * 0.6f + thisTransform.right * 0.4f).normalized;

Debug.DrawRay (thisTransform.position + thisTransform.forward * 1, newRot * 10f, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 1, newRot, 10, targetLayers)) {
     TurnLeft = true;
 } else {
     TurnLeft = false;
 }
 
newRot = (thisTransform.forward * 0.6f + thisTransform.right * -0.4f).normalized;

Debug.DrawRay (thisTransform.position + thisTransform.forward * 1, newRot * 10f, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 1, newRot, 10, targetLayers)) {
		TurnRight = true;
	} else {
        TurnRight = false;
}
	
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 1, thisTransform.forward, hit, 12) && hit.collider.tag.Contains ("Te")){
		Obscurity = true;
		if(!Attacking)
		target = null;
	  } else {
	    Obscurity = false;
}

}


function FixedUpdate () {

 if(Vessel){
 if(!IsActive)
 if(Sounds.volume > 0)
 Sounds.volume -= 0.05;
 
 if(IsActive)
 if(Sounds.volume < 0.5)
 Sounds.volume += 0.05;
 }
 
 if(!IsActive || Vessel == null)
return;

Vel = Mathf.Clamp(vRigidbody.velocity.magnitude,8,1024);

var localV = thisVTransform.InverseTransformDirection(vRigidbody.velocity); 

var hit : RaycastHit;

Obstacle = false;
TurnUp = false;

      Debug.DrawRay (thisVTransform.position + -thisVTransform.up * 1.5, -thisVTransform.up * Vel, Color.black);
if (Physics.Raycast (thisVTransform.position + -thisVTransform.up * 1.5, -thisVTransform.up, hit, Vel, targetLayers))
UDist = hit.distance;
else
UDist = 2048;

      Debug.DrawRay (thisVTransform.position + -thisVTransform.forward * 0.5 + -thisVTransform.up * 1.5, -thisVTransform.up * Vel, Color.black);
if (Physics.Raycast (thisVTransform.position + -thisVTransform.forward * 0.5 + -thisVTransform.up * 1.5, -thisVTransform.up, hit, Vel, targetLayers)){
DDist = hit.distance;
TurnUp = true;
}else{
DDist = 1024;
}

DAngle = Mathf.Abs(UDist - DDist);

if(DAngle < 1){
Obstacle = true;
TurnUp = false;
}
 
if(-localV.y > 2){
vRigidbody.AddTorque(thisTransform.up * TurnForce);

if(TurnUp)
vRigidbody.AddTorque(thisTransform.right * -0.005);

if (Physics.Raycast (thisTransform.position, Vector3.down, 2, targetLayers))
vRigidbody.AddForce(Vector3.up * 0.1);

}else{

if(!Attacking){
if(tDist > 32){
vRigidbody.AddTorque(thisTransform.up * TurnForce);
if(TurnUp)
vRigidbody.AddTorque(thisTransform.right * -0.005);
}
}

if (Physics.Raycast (thisTransform.position, Vector3.down, 2, targetLayers))
vRigidbody.AddForce(Vector3.up * 0.07);
}

if (ManeuvForce != 0)
vRigidbody.AddForce(thisTransform.up * ManeuvForce);

if(target){
if(!Attacking){
if(!TurnUp){
    vRigidbody.AddForceAtPosition((target.transform.position - thisVTransform.position).normalized * 0.04, thisTransform.forward * 0.8);
    vRigidbody.AddForceAtPosition((target.transform.position - thisVTransform.position).normalized * -0.04, -thisTransform.forward * 0.8);
}
}else{
if(!uTurn){
if(Dist1 > 256){
if(vRigidbody.angularVelocity.magnitude > 1){
    vRigidbody.AddForceAtPosition((TargetLead.transform.position - thisVTransform.position).normalized * 0.06, thisTransform.forward * 1);
    vRigidbody.AddForceAtPosition((TargetLead.transform.position - thisVTransform.position).normalized * -0.06, -thisTransform.forward * 1);
  }else{
    vRigidbody.AddForceAtPosition((TargetLead.transform.position - thisVTransform.position).normalized * 0.1, thisTransform.forward * 1);
    vRigidbody.AddForceAtPosition((TargetLead.transform.position - thisVTransform.position).normalized * -0.1, -thisTransform.forward * 1);
}
}else{
    vRigidbody.AddForceAtPosition((TargetLead.transform.position - thisVTransform.position).normalized * 0.4, thisTransform.forward * 1);
    vRigidbody.AddForceAtPosition((TargetLead.transform.position - thisVTransform.position).normalized * -0.4, -thisTransform.forward * 1);

}
}else{
vRigidbody.AddTorque(thisTransform.up * 0.15);
}

if(strafeLeft)
vRigidbody.AddForce(thisVTransform.right * -0.4);
if(strafeRight)
vRigidbody.AddForce(thisVTransform.right * 0.4);

}
}

if(Attacking){
    vRigidbody.AddForceAtPosition(Vector3.up*GyroForce, thisTransform.up * 0.1);
    vRigidbody.AddForceAtPosition(-Vector3.up*GyroForce, -thisTransform.up * 0.1);
    }else{
    vRigidbody.AddForceAtPosition(Vector3.up*GyroForce, thisTransform.up * 0.2);
    vRigidbody.AddForceAtPosition(-Vector3.up*GyroForce, -thisTransform.up * 0.2);
    }
 
 if(!Attacking){
      Debug.DrawRay (thisVTransform.position + -thisVTransform.up * 1.5, -thisVTransform.up * 5, Color.blue);
if (Physics.Raycast (thisVTransform.position + -thisVTransform.up * 1.5, -thisVTransform.up, hit, 5)){
     if(hit.collider.tag.Contains ("err"))
        Obstacle = true;
     if(hit.collider.tag.Contains ("tru"))
		Obstacle = true;
}
      Debug.DrawRay (thisVTransform.position + thisVTransform.forward * 0.2 + -thisVTransform.up * 0.4, -thisVTransform.up * 1.1, Color.cyan);
      Debug.DrawRay (thisVTransform.position + -thisVTransform.forward * 0.2 + -thisVTransform.up * 0.4, -thisVTransform.up * 1.1, Color.cyan);
if (Physics.Raycast (thisVTransform.position + thisVTransform.forward * 0.2 + -thisVTransform.up * 0.4, -thisVTransform.up, 1.1) ||
    Physics.Raycast (thisVTransform.position + -thisVTransform.forward * 0.2 + -thisVTransform.up * 0.4, -thisVTransform.up, 1.1)){
		vRigidbody.AddForce(Vector3.up * 0.2);
}
}else{

if (Physics.Raycast (thisTransform.position, Vector3.down, 32, targetLayers))
		vRigidbody.AddForce(Vector3.up * 0.2);

}

if(Obstacle){
if(-localV.y > 1){
if(-localV.y > 10)
  vRigidbody.AddForce(-thisVTransform.up * -0.8);
  else
  vRigidbody.AddForce(-thisVTransform.up * -0.2);
  
  vRigidbody.AddForce(Vector3.up * 0.1);
  }
  
}else{
  vRigidbody.AddForce(-thisVTransform.up * Force);
}
 
if(Obscurity)
  vRigidbody.AddForce(thisTransform.up *  0.1);
  
if(Attacking){
  
if(LeadNum == 1)
if(target)
TargetTrace.position = target.position;

if(LeadNum == 2){
CalcLead();
LeadNum = 0;
}

LeadNum += 1;

var RelativeG = thisTransform.InverseTransformPoint(TargetLead.position);

Vert = RelativeG.y;
Hori = RelativeG.x;

VertAbs = Mathf.Abs(Vert);
HoriAbs = Mathf.Abs(Hori);

FuckingRead = HoriAbs + VertAbs;

if(FuckingRead < 0.5){

var hitT : RaycastHit;

LineOfFire = true;
      Debug.DrawRay (thisTransform.position + thisTransform.forward * 1, thisTransform.forward * Dist1, Color.yellow);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 1, thisTransform.forward, hitT, Dist1)){
Dist1D = Dist1 - 16;
HTDist = hitT.distance;
if(HTDist < Dist1D)
LineOfFire = false;
}
}else{
LineOfFire = false;
}

if(isTC1){
if(LineOfFire){
if(Armed){
var TheThing1 = Instantiate(ShotTC1, Muzzle1.position, Muzzle1.rotation);
  thisTC.name = "TC0a";
  if(isSingleShot){
  vDamage.DamageIn(2048, 0, 0, false);
  }
}
}
}

if(isTC5){
if(LineOfFire){
if(Armed){
var TheThing5 = Instantiate(ShotTC5, Muzzle1.position, Muzzle1.rotation);
  thisTC.name = "sTC5";
  if(isSingleShot){
  vDamage.DamageIn(2048, 0, 0, false);
  }
}
}
}
}

}

function OnTriggerEnter (other : Collider) {

if(other.collider.name.Contains ("TFC5"))
PissedAtTC5 = 1;

if(other.collider.name.Contains ("TC1"))
if(!other.collider.name.Contains ("TC1d")){
rigidbody.isKinematic = true;
Home = other.gameObject.transform;
}
}

function OnTriggerStay (other : Collider) {

if(!IsActive)
return;

ON = other.name;
OT = other.transform;

if(NeutralizeAll){

if(ON.Contains ("TC0a") && PissedAtTC0a > 0){
  
if(!Attacking)
  Warning();
  
  Attacking = true;
  target = OT;
  Trig.radius = 30;
  
  relativePoint = thisVTransform.InverseTransformPoint(OT.position);
  if(relativePoint.y > 0)
  uTurn = true;
  
}

if(ON.Contains ("TC4")){
  
if(!Attacking)
  Warning();
  
  Attacking = true;
  target = OT;
  Trig.radius = 30;
  
  relativePoint = thisVTransform.InverseTransformPoint(OT.position);
  if(relativePoint.y > 0)
  uTurn = true;
  
}
if(ON.Contains ("TC5") && PissedAtTC5 > 0){
  
if(!Attacking)
  Warning();
  
  Attacking = true;
  target = OT;
  Trig.radius = 30;
  
  relativePoint = thisVTransform.InverseTransformPoint(OT.position);
  if(relativePoint.y > 0)
  uTurn = true;
  
}
if(ON.Contains ("TC6")){
  
if(!Attacking)
  Warning();
  
  Attacking = true;
  target = OT;
  Trig.radius = 30;
  
  relativePoint = thisVTransform.InverseTransformPoint(OT.position);
  if(relativePoint.y > 0)
  uTurn = true;
  
}
if(ON.Contains ("TC7")){
 
if(!Attacking)
  Warning();
  
  Attacking = true;
  target = OT;
  Trig.radius = 30;
  
  relativePoint = thisVTransform.InverseTransformPoint(OT.position);
  if(relativePoint.y > 0)
  uTurn = true;
  
}

if(ON.Contains ("TC8")){
 
if(!Attacking)
  Warning();
  
  Attacking = true;
  target = OT;
  Trig.radius = 30;
  
  relativePoint = thisVTransform.InverseTransformPoint(OT.position);
  if(relativePoint.y > 0)
  uTurn = true;
  
}

if(ON.Contains ("TC9")){
 
if(!Attacking)
  Warning();
  
  Attacking = true;
  target = OT;
  Trig.radius = 30;
  
  relativePoint = thisVTransform.InverseTransformPoint(OT.position);
  if(relativePoint.y > 0)
  uTurn = true;
  
}

}else{

if(ON.Contains ("bMTFC")){
 
if(!Attacking)
  Warning();
  
  Attacking = true;
  target = OT;
  Trig.radius = 30;
  
  relativePoint = thisVTransform.InverseTransformPoint(OT.position);
  if(relativePoint.y > 0)
  uTurn = true;
  
}

}

}

function CalcLead (){

if(target){

Dist1 = Vector3.Distance(thisTransform.position, target.position);
Dist2 = Vector3.Distance(TargetTrace.position, target.position);

TargetTrace.LookAt(target);

TargetLead.position = TargetTrace.position;
TargetLead.rotation = TargetTrace.rotation;
TargetLead.position += TargetLead.forward * Dist1 * Dist2 * leadAmount;

}
}

function Unstick () {
ManeuvForce = -0.2;
yield WaitForSeconds (0.5);
ManeuvForce = 0.2;
yield WaitForSeconds (0.5);
ManeuvForce = 0;
}

function Warning () {

var hitS : RaycastHit;

var TheThing3 = Instantiate(AlarmSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing3.transform.parent = gameObject.transform;
  
vRigidbody.angularDrag = 22;

yield WaitForSeconds (0.2);
uTurn = false;

yield WaitForSeconds (0.2);

Debug.DrawRay (thisTransform.position + thisTransform.up * 3 + thisTransform.right * 1.5, thisTransform.forward * Dist1, Color.blue);
if (Physics.Raycast (thisTransform.position + thisTransform.up * 3 + thisTransform.right * 1.5, thisTransform.forward, hitS, Dist1))
RHitD = hitS.distance;
else
RHitD = Dist1;

Debug.DrawRay (thisTransform.position + thisTransform.up * 3 + -thisTransform.right * 1.5, thisTransform.forward * Dist1, Color.blue);
if (Physics.Raycast (thisTransform.position + thisTransform.up * 3 + -thisTransform.right * 1.5, thisTransform.forward, hitS, Dist1))
LHitD = hitS.distance;
else
LHitD = Dist1;

if(RHitD < LHitD){
     if(hitS.collider.tag.Contains ("Te"))
        strafeLeft = true;
     if(hitS.collider.tag.Contains ("Str"))
		strafeLeft = true;
		}
if(LHitD < RHitD){
     if(hitS.collider.tag.Contains ("Te"))
        strafeRight = true;
     if(hitS.collider.tag.Contains ("Str"))
		strafeRight = true;
		}

yield WaitForSeconds (0.4);
strafeLeft = false;
strafeRight = false;
Armed = true;

}

function Regenerator () {

if(Damaged)
return;

vRigidbody.centerOfMass = Vector3(0, 0, 0);

if(Home){
IsActive = true;
Wing.gameObject.SetActive (true);

vRigidbody.drag = 0.4;

if(!Attacking){

if(target)
tDist = Vector3.Distance(thisTransform.position, target.position);

if(WorldInformation.bigMissile1 || WorldInformation.bigMissile2){
TargetTrace.position = Home.position;
MoveWaypoint();
}else{
if(Vector3.Distance(thisTransform.position, Home.position) > 15){
target = Home;
}else{
target = null;
}
}

if(Vector3.Distance(thisTransform.position, Home.position) > 15)
Force = 0.1;
else
Force = 0;

vRigidbody.angularDrag = 16;

}else{
Force = 0.1;

if(Dist1 < 128)
vRigidbody.angularDrag = 32;
else
vRigidbody.angularDrag = 22;

}

}

if(target == null)
Trig.radius = 400;

var lastPos : Vector3 = thisTransform.position;
HomeMoving(lastPos);

if(target == null){
Attacking = false;
Armed = false;
}

}

function MoveWaypoint(){

yield WaitForSeconds (0.25);

if(!Attacking){

var hDist = Vector3.Distance(TargetTrace.position, Home.position);

TargetTrace.LookAt(Home);

if(WorldInformation.bigMissile1){
if(WorldInformation.bigMissile1.name.Contains ("TC3"))
TargetTrace.position += TargetTrace.forward * hDist * 15;
else
TargetTrace.position += TargetTrace.forward * hDist * 5;

TargetTrace.LookAt(WorldInformation.bigMissile1);
}

if(WorldInformation.bigMissile2){
if(WorldInformation.bigMissile2.name.Contains ("TC3"))
TargetTrace.position += TargetTrace.forward * hDist * 15;
else
TargetTrace.position += TargetTrace.forward * hDist * 5;

TargetTrace.LookAt(WorldInformation.bigMissile2);
}

TargetTrace.position += TargetTrace.forward * 16 * hDist;
Waypoint.position = TargetTrace.position;
target = Waypoint;
}
}

function HomeMoving(lastPos : Vector3){

yield WaitForSeconds (0.25);

  if(Vector3.Distance(thisTransform.position, lastPos) > 0.5){
  HomeIsMoving = true;
  }else{
  HomeIsMoving = false;
  }
}