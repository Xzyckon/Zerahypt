var target : Transform;
var ForwardAim : Transform;
var Waypoint : Transform;
var Waypoint2 : Transform;
var Homepoint : Transform;
var Settlepoint : Transform;
var otherObject : Transform;

var thisTransform : Transform;
var thisGameObject : GameObject;
var thisRigidbody : Rigidbody;

var thisVTransform : Transform;
var Vessel : GameObject;
var Trig : CapsuleCollider;
var Muzzle0 : Transform;
var Muzzle1 : Transform;
var Muzzle2 : Transform;

var EngineAudio : AudioSource;
var EngineObscurer : SoundObscure;

var Wing1 : WingScript;
var Wing2 : WingScript;

var Presence : TCInfo;

var TargetTrace : Transform;
var TargetLead : Transform;
var TLCol : SphereCollider;

var ConfJ : ConfigurableJoint;

var Shot : GameObject;
var Diverter : GameObject;

var SpotSound : GameObject;
var AttackSound : GameObject;

var PissedAtTC0a = 0;

var PissedAtTC2 = 0;
var PissedAtTC3 = 0;
var PissedAtTC4 = 0;
var PissedAtTC5 = 0;
var PissedAtTC6 = 0;
var PissedAtTC7 = 0;
var PissedAtTC8 = 0;
var PissedAtTC9 = 0;

var Runtime = 0;

var Settling : boolean;

var Activated : boolean;
var OnStartup : boolean;

var EngineOn : boolean;

var Spot : boolean;
var Patrolling : boolean;
var Attacking : boolean;
var Farstacle : boolean;
var Roofstacle : boolean;
var Floorstacle : boolean;
var Obstacle : boolean = false;
var Stuck : boolean = false;
var TargetTooClose : boolean;
var Circle : boolean;
var Far : boolean;

var Stuckage = 0;

var HomeIsMoving : boolean;

static var Assisting : boolean;

var IncomingMissile : Transform;
var EnteredMissile : Transform;
var CanDivert : boolean;

var RightDist : float = 200;
var LeftDist : float = 200;

var Proceed : boolean;

var TurnRight : boolean;
var TurnLeft : boolean;
var LineOfFire : boolean;

var DangerSense : boolean;
var DangerDirection : Vector3;

var targetLayers : LayerMask;
var targetLayers2 : LayerMask;
var targetLayers3 : LayerMask;

var Dodge = 0;

var JustNoticed = 0;
var AngerLevel = 0;

var GyroForce = 0.0;
var TurnForce = 0.0;

var TurnMod = 1.0;

private var VelC: float = 1;

private var TFSideNum : float = 0.3;

var UniqueShootTime : float = 0.1;

InvokeRepeating("Counter", 1.9, 1);

InvokeRepeating("Regenerator", 1, 0.43);

InvokeRepeating("LeaveMarker", 1, 3);

InvokeRepeating("Shooty", UniqueShootTime, 0.32);

InvokeRepeating("CalcLead", 1, 0.15);

function Start (){

thisTransform = transform;
thisGameobject = gameObject;
thisRigidbody = rigidbody;

thisVTransform = Vessel.transform;

if(OnStartup)
Runtime = 60;

target = Waypoint;
UniqueShootTime = Random.Range(0, 0.2);

rigidbody.centerOfMass = Vector3(0, 0, 0);

}

function Update () {

if(Activated){

var hit : RaycastHit;

var hit2 : RaycastHit;

var hit3 : RaycastHit;

var localV = thisVTransform.InverseTransformDirection(Vessel.rigidbody.velocity);

var totalV = Vessel.rigidbody.velocity.magnitude;

var mainRot : Vector3 = (-thisVTransform.up).normalized;

VelC = Mathf.Clamp(totalV,6,400);

LineOfFire = false;

if (Physics.Raycast (thisVTransform.position + -thisVTransform.up * 1, -thisVTransform.up, hit, 600, targetLayers3)){
 
if(hit.collider.name.Contains ("TC") || hit.collider.name.Contains ("TLead")){
if(!hit.collider.name.Contains ("TC1")){
LineOfFire = true;
}
}
}

if(IncomingMissile){
target = IncomingMissile;
ConfJ.angularYZDrive.maximumForce = 0.4;
ConfJ.angularXDrive.maximumForce = 0.4;
GyroForce = 2;
}

if(target){

if(target == EnteredMissile && target.name.Contains ("MT") && CanDivert){
var TheThing0 = Instantiate(Diverter, Muzzle0.position, Muzzle0.rotation);
  TheThing0.transform.parent = Muzzle0;
  if(target.gameObject.GetComponent("MissileScript") != null)
  target.gameObject.GetComponent("MissileScript").AimForce = 0;
  CanDivert = false;
}

if(Attacking){
if(Vector3.Distance(thisTransform.position, target.position) < 30)
TargetTooClose = true;
Patrolling = false;
}

}

if(target == null || !target.name.Contains ("TC"))
if(Spot || Attacking){
AngerLevel = 2;
Spot = false;
Attacking = false;
target = ForwardAim;
}

if(TurnLeft){
if(!Spot)
  TurnForce = -14;
}

if(TurnRight){
if(!Spot)
  TurnForce = 14;
}

if(TurnLeft && TurnRight){
  TurnForce = -14;
}

if(!TurnLeft && !TurnRight){
  TurnForce = 0;
}

if(!Settling){
if(Patrolling){

if(TFSideNum < 1.7)
TFSideNum += 0.3;
else
TFSideNum = 0.5;

Debug.DrawRay (thisVTransform.position + -thisVTransform.up * 1 + thisVTransform.forward * -0.4 + thisVTransform.right * TFSideNum, mainRot * VelC, Color.black);
if (Physics.Raycast (thisVTransform.position + -thisVTransform.up * 1 + thisVTransform.forward * -0.4 + thisVTransform.right * TFSideNum, mainRot, hit, VelC, targetLayers))
     RightDist = hit.distance;
     else
     RightDist = 200;

Debug.DrawRay (thisVTransform.position + -thisVTransform.up * 1 + thisVTransform.forward * -0.4 + -thisVTransform.right * TFSideNum, mainRot * VelC, Color.black);
if (Physics.Raycast (thisVTransform.position + -thisVTransform.up * 1 + thisVTransform.forward * -0.4 + -thisVTransform.right * TFSideNum, mainRot, hit, VelC, targetLayers))
	 LeftDist = hit.distance;
	 else
	 LeftDist = 200;

 if(RightDist > LeftDist){
     Turnleft = false;
     TurnRight = true;
     }
     
 if(LeftDist > RightDist){
     TurnRight = false;
     TurnLeft = true;
     }
     
 if(RightDist == LeftDist){
    TurnRight = false;
    TurnLeft = false;
    }
    
       Debug.DrawRay (thisTransform.position + thisVTransform.forward * 3 
                                         + thisVTransform.right * 4
                                         + -thisVTransform.up * VelC, -thisVTransform.forward * 10, Color.white);
if (!Physics.Raycast (thisTransform.position + thisVTransform.forward * 3 
                                         + thisVTransform.right * 4
                                         + -thisVTransform.up * VelC, -thisVTransform.forward, 10, targetLayers)) {
TurnLeft = true;
}
     
       Debug.DrawRay (thisTransform.position + thisVTransform.forward * 3 
                                         + -thisVTransform.right * 4 
                                         + -thisVTransform.up * VelC, -thisVTransform.forward * 10, Color.white);
if (!Physics.Raycast (thisTransform.position + thisVTransform.forward * 3 
                                         + -thisVTransform.right * 4
                                         + -thisVTransform.up * VelC, -thisVTransform.forward, 10, targetLayers)) {
TurnRight = true;
}

       Debug.DrawRay (thisTransform.position + thisVTransform.forward * 3 
                                         + -thisVTransform.up * VelC, -thisVTransform.forward * 10, Color.white);
if (!Physics.Raycast (thisTransform.position + thisVTransform.forward * 3 
                                         + -thisVTransform.up * VelC, -thisVTransform.forward, 10, targetLayers)) {
                                         
      Debug.DrawRay (thisTransform.position + -thisVTransform.forward * 0.5, -thisVTransform.forward * 10, Color.white);
if (Physics.Raycast (thisTransform.position + -thisVTransform.forward * 0.5, -thisVTransform.forward, 10, targetLayers)) {
Obstacle = true;
TurnLeft = true;
}
}
     
Debug.DrawRay (transform.position + -thisVTransform.up * 1 + thisVTransform.forward * -0.4, -thisVTransform.up * VelC, Color.white);
if (Physics.Raycast (transform.position + -thisVTransform.up * 1 + thisVTransform.forward * -0.4, -thisVTransform.up, hit2, VelC, targetLayers)){
     Obstacle = true;
     if(!TurnLeft && !TurnRight)
     TurnLeft = true;
     
Debug.DrawRay (transform.position + -thisVTransform.up * 1 + -thisVTransform.forward * 0.3, -thisVTransform.up * 8, Color.green);
if (Physics.Raycast (transform.position + -thisVTransform.up * 1 + -thisVTransform.forward * 0.3, -thisVTransform.up, hit3, 8, targetLayers)){

var Spacing = Mathf.Abs(hit2.distance - hit3.distance);
if(Spacing > 0.2 && totalV < 5) { Obstacle = false;  TurnForce = 0;}

}
}

if(otherObject){
var relativePoint1 = thisVTransform.InverseTransformPoint(otherObject.position);
    
    if (-relativePoint1.y > 0)
    if (Vector3.Distance(otherObject.position, thisTransform.position) < 7)
    if (relativePoint1.x > 0 && !Proceed)
        Obstacle = true;
}


     }else{
     
newRot = (-thisVTransform.up * 0.6f + thisVTransform.right * 0.2f).normalized;
Debug.DrawRay (transform.position + -thisVTransform.up * 1.5 + thisVTransform.forward * -0.4, newRot * 6, Color.black);
if (Physics.Raycast (transform.position + -thisVTransform.up * 1.5 + thisVTransform.forward * -0.4, newRot, 6, targetLayers)) {
if(JustNoticed < 1)
     TurnLeft = true;
     
 } else {
 if(!Obstacle && !TurnRight)
     TurnLeft = false;
 }
 
newRot = (-thisVTransform.up * 0.6f + thisVTransform.right * -0.2f).normalized;
Debug.DrawRay (transform.position + -thisVTransform.up * 1.5 + thisVTransform.forward * -0.4, newRot * 6, Color.black);
if (Physics.Raycast (transform.position + -thisVTransform.up * 1.5 + thisVTransform.forward * -0.4, newRot, 6, targetLayers)) {
if(JustNoticed < 1)
		TurnRight = true;
		
	} else {
	 if(!Obstacle && !TurnLeft)
        TurnRight = false;
 }
 
Debug.DrawRay (transform.position + -thisVTransform.up * 1.5 + thisVTransform.forward * -0.4, -thisVTransform.up * VelC, Color.white);
if (Physics.Raycast (transform.position + -thisVTransform.up * 1.5 + thisVTransform.forward * -0.4, -thisVTransform.up, VelC, targetLayers)){
     Obstacle = true;
     if(!TurnLeft && !TurnRight)
     TurnLeft = true;
     }
     
  newRot = (-thisVTransform.up * 0.6f + thisVTransform.forward * -0.2f).normalized;
Debug.DrawRay (transform.position + -thisVTransform.up * 1.5, newRot * VelC, Color.blue);
if (Physics.Raycast (transform.position + -thisVTransform.up * 1.5, newRot, VelC, targetLayers)) {
     Floorstacle = true;
     }
 
}
 
Debug.DrawRay (transform.position + -thisVTransform.up * 1.5, thisVTransform.forward * 20, Color.red);
if (Physics.Raycast (transform.position + -thisVTransform.up * 1.5, thisVTransform.forward, 20, targetLayers))
     if(!Patrolling)
     Roofstacle = true;

if(Stuckage > 3)
Patrolling = false;

}

}
}

private var NewRotation : Quaternion;
function FixedUpdate () {

if(Activated){

var localV = thisVTransform.InverseTransformDirection(Vessel.rigidbody.velocity);

if(Roofstacle){
  
  if(JustNoticed < 1 && !Attacking && !Spot)
  Vessel.rigidbody.AddTorque(thisVTransform.right * 14);
  
}

if(Floorstacle){
  
  if(JustNoticed < 1 && !Attacking && !Spot)
  Vessel.rigidbody.AddTorque(thisVTransform.right * -14);
  
}

if(Farstacle){
  if(-localV.y > 0)
  Vessel.rigidbody.AddForce(thisVTransform.up * 6);
}

if(TargetTooClose){
  
  if(localV.y < 20)
  Vessel.rigidbody.AddForce(thisVTransform.up * 6);
  
  if(!IncomingMissile)
  Vessel.rigidbody.AddForce(thisVTransform.right * 10);
  else
  Vessel.rigidbody.AddForce(thisVTransform.right * 20);
  
  }else{
  
  if(IncomingMissile)
  Vessel.rigidbody.AddForce(thisVTransform.right * 20);
  
  if(Obstacle){
  if(Attacking){
  if(-localV.y > 5)
  Vessel.rigidbody.AddForce(thisVTransform.up * 6);
  else
  Vessel.rigidbody.AddForce(thisVTransform.up * -2);
  }else{
  if(!Patrolling){
  if(-localV.y > 0)
  Vessel.rigidbody.AddForce(thisVTransform.up * 6);
  }else{
  if(-localV.y > 0)
  Vessel.rigidbody.AddForce(thisVTransform.up * 2);
  if(-localV.y > 5)
  Vessel.rigidbody.AddForce(thisVTransform.up * 6);
  }
  }
  
  }else{
  
  if(!Obstacle && !Stuck){
  if(!Patrolling){
  if(!Far){
  if(-localV.y < 30)
  Vessel.rigidbody.AddForce(thisVTransform.up * -1);
  }else{
  if(-localV.y < 60)
  Vessel.rigidbody.AddForce(thisVTransform.up * -2);
  }
  }else{
  if(!HomeIsMoving){
  if(-localV.y < 5)
  Vessel.rigidbody.AddForce(thisVTransform.up * -1);
  }else{
  if(-localV.y < 50)
  Vessel.rigidbody.AddForce(thisVTransform.up * -1);
  }
  }
  }
  
  }
  }

if(Stuck){
  if(localV.y < 2)
  Vessel.rigidbody.AddForce(thisVTransform.up * 7);
}

//----------------------------------------------------------------------------------------------------------------------

Vessel.rigidbody.AddForceAtPosition(Vector3.up * -GyroForce, -thisVTransform.forward * 2);
Vessel.rigidbody.AddForceAtPosition(-Vector3.up * -GyroForce, thisVTransform.forward * 2);

Vessel.rigidbody.AddTorque(thisVTransform.forward * TurnForce * TurnMod);

var hit : RaycastHit;

 if (Physics.Raycast (thisTransform.position, Vector3.down, hit, VelC * 0.5, targetLayers)){
 
 if(VelC < 7){
 var Minus = 4 - hit.distance;
 }else{
 Minus = 7;
 }
 
 if(!TargetTooClose)
 thisRigidbody.AddForce(Vector3.up * Minus);
 else
 thisRigidbody.AddForce(Vector3.up * 14);
 }

 if (target) {
  
  if(!IncomingMissile){
  if(!Attacking){
  
  if(!Circle)
  NewRotation = Quaternion.LookRotation(target.position - thisTransform.position);
  else
  NewRotation = Quaternion.LookRotation(thisTransform.position - target.position);
  
  if(DangerSense && DangerDirection != Vector3.zero) 
  NewRotation = Quaternion.LookRotation(DangerDirection);
  }else{
  NewRotation = Quaternion.LookRotation(TargetLead.position - thisTransform.position);
  }
  
  }else{
  NewRotation = Quaternion.LookRotation(target.position - thisTransform.position);
  }
  
  if(!Settling){
  thisTransform.rotation = Quaternion.RotateTowards(thisTransform.rotation, NewRotation, Time.deltaTime * 400);
  }else{
  thisTransform.rotation = Quaternion.RotateTowards(thisTransform.rotation, Settlepoint.rotation, Time.deltaTime * 400);
  Vessel.rigidbody.AddForce((Settlepoint.position - thisTransform.position).normalized * 2);
  }
  
 }

if(!EngineOn){
if(!EngineObscurer.Obscured){
if (EngineAudio.volume < 0.5)
EngineAudio.volume += 0.03;
else
EngineOn = true;
}else{
EngineOn = true;
}
}

}else{

if (EngineAudio.volume > 0)
EngineAudio.volume -= 0.03;

EngineOn = false;

}

}

function OnTriggerEnter (other : Collider) {

ON = other.name;
OT = other.transform;

if(ON.Contains ("TC1p"))
Waypoint = OT;

if(ON.Contains ("TC1z")){
Homepoint = OT;
if(!Attacking && AngerLevel < 8 && !Assisting){
Waypoint2 = OT;
Patrolling = true;
}
}

if(Activated){

if(ON.Contains ("TC") && !ON.Contains ("TC1") && !Attacking && AngerLevel < 1){

if(target == ForwardAim)
  target = OT;
  yield WaitForSeconds (0.1);
  if(!Spot){
  Spot = true;
  
  AngerLevel = 7;

if(EngineOn){
var TheThing = Instantiate(SpotSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
TheThing.transform.parent = thisTransform;
}
}
}
}
}

function OnTriggerStay (other : Collider) {

ON = other.name;
OT = other.transform;

if(ON.Contains ("TC0"))
if(Vector3.Distance(OT.position, thisTransform.position) > 1)
if(Vector3.Distance(OT.position, thisTransform.position) < 10)
otherObject = OT;

if(!IncomingMissile)
if(ON.Contains ("MT")){
if(!ON.Contains ("C1")){
IncomingMissile = OT;
Activated = true;
Runtime = 60;

Trig.center = Vector3(0,0,0);
Trig.radius = 100;
Trig.height = 100;
}
}

if(ON.Contains ("TFC")){

if(AngerLevel < 20)
AngerLevel += 1;

if(!ON.Contains ("TFC1")){

if(!DangerSense){
Trig.center = Vector3(0,0,200);
Trig.radius = 100;
Trig.height = 400;

if(other.rigidbody)
DangerDirection = -other.rigidbody.velocity.normalized;

DangerSense = true;
}

if(EngineOn)
if(!Attacking && AngerLevel < 3){
var TheThing1 = Instantiate(AttackSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing1.transform.parent = thisTransform;

AngerLevel = 20;
}
}

Activated = true;
Runtime = 60;
}

if(Activated)
if(!Settling && Runtime > 0){

if(ON.Contains ("TFC0a"))
if(PissedAtTC0a < 201){

if(Vector3.Distance(OT.position, thisTransform.position) < 128){
var rPoint0 = thisVTransform.InverseTransformPoint(Waypoint.transform.position);
if (rPoint0.z > 0){
if(Vector3.Distance(OT.position, Waypoint.position) > 25)
PissedAtTC0a += 50;
else
PissedAtTC0a = 200;
}
}
}

if(ON.Contains ("TFC2"))
if(PissedAtTC2 < 201){

if(Vector3.Distance(OT.position, thisTransform.position) < 50){
var rPoint2 = thisVTransform.InverseTransformPoint(Waypoint.transform.position);
if (rPoint2.z > 0){
if(Vector3.Distance(OT.position, Waypoint.position) > 25)
PissedAtTC2 += 50;
else
PissedAtTC2 = 200;
}
}
}

if(ON.Contains ("TFC3"))
if(PissedAtTC3 < 201){

if(Vector3.Distance(OT.position, thisTransform.position) < 128){
var rPoint3 = thisVTransform.InverseTransformPoint(Waypoint.transform.position);
if (rPoint3.z > 0){
if(Vector3.Distance(OT.position, Waypoint.position) > 25)
PissedAtTC3 += 50;
else
PissedAtTC3 = 200;
}
}
}

if(ON.Contains ("TFC4"))
PissedAtTC4 = 200;

if(ON.Contains ("TFC5"))
if(PissedAtTC5 < 201){

if(Vector3.Distance(OT.position, thisTransform.position) < 128){
var rPoint5 = thisVTransform.InverseTransformPoint(Waypoint.transform.position);
if (rPoint5.z > 0){
if(Vector3.Distance(OT.position, Waypoint.position) > 25)
PissedAtTC5 += 50;
else
PissedAtTC5 = 200;
}
}
}

if(ON.Contains ("TFC6"))
PissedAtTC6 = 200;

if(ON.Contains ("TFC7"))
PissedAtTC7 = 200;

if(ON.Contains ("TFC8"))
PissedAtTC8 = 200;

if(ON.Contains ("TFC9"))
PissedAtTC9 = 200;

if(!IncomingMissile){


if(ON.Contains ("TC0a") && PissedAtTC0a > 0){
 
 if(target){
 if(target != Waypoint)
  var Dist0 = Vector3.Distance(target.position, Waypoint.position);
  else
  Dist0 = 200;
 }else{
 Dist0 = 200;
 }
 
  if(Vector3.Distance(OT.position, Waypoint.position) < Dist0){
  target = OT;
  Spot = false;
  Attacking = true;
  }
  
  Trig.center = Vector3(0,0,0);
  Trig.radius = 100;
  Trig.height = 100;
  
  }

if(ON.Contains ("TC2") && PissedAtTC2 > 180){
if(ON.Contains ("2_P")){
 
  if(target){
  if(target != Waypoint)
  var Dist1 = Vector3.Distance(target.position, Waypoint.position);
  else
  Dist1 = 200;
  }else{
  Dist1 = 200;
  }
 
  if(Vector3.Distance(OT.position, Waypoint.position) < Dist1){
  target = OT;
  Spot = false;
  Attacking = true;
  }
  
  Trig.center = Vector3(0,0,0);
  Trig.radius = 100;
  Trig.height = 100;
  
}
}
  
 if(ON.Contains ("TC3") && PissedAtTC3 > 180){
 
 if(target){
 if(target != Waypoint)
 var Dist2 = Vector3.Distance(target.position, Waypoint.position);
 else
 Dist2 = 200;
 }else{
 Dist2 = 200;
 }
 
  if(Vector3.Distance(OT.position, Waypoint.position) < Dist2){
  target = OT;
  Spot = false;
  Attacking = true;
  }
  
  Trig.center = Vector3(0,0,0);
  Trig.radius = 100;
  Trig.height = 100;
  
  }
 if(ON.Contains ("TC4") && PissedAtTC4 > 0){
 
 if(target){
 if(target != Waypoint)
  var Dist3 = Vector3.Distance(target.position, Waypoint.position);
  else
  Dist3 = 200;
 }else{
 Dist3 = 200;
 }
 
  if(Vector3.Distance(OT.position, Waypoint.position) < Dist3){
  target = OT;
  Spot = false;
  Attacking = true;
  }
  
  Trig.center = Vector3(0,0,0);
  Trig.radius = 100;
  Trig.height = 100;
  
  }
 if(ON.Contains ("TC5") && PissedAtTC5 > 180){
 
 if(target){
 if(target != Waypoint)
  var Dist4 = Vector3.Distance(target.position, Waypoint.position);
  else
  Dist4 = 200;
 }else{
 Dist4 = 200;
 }
 
  if(Vector3.Distance(OT.position, Waypoint.position) < Dist4){
  target = OT;
  Spot = false;
  Attacking = true;
  }
  
  Trig.center = Vector3(0,0,0);
  Trig.radius = 100;
  Trig.height = 100;
  
  }
if(ON.Contains ("TC6"))
if(!ON.Contains ("cT")){

 if(target){
 if(target != Waypoint)
  var Dist5 = Vector3.Distance(target.position, Waypoint.position);
  else
  Dist5 = 200;
 }else{
 Dist5 = 200;
 }
 
  if(Vector3.Distance(OT.position, Waypoint.position) < Dist5){
  target = OT;
  Spot = false;
  Attacking = true;
  }
  
  Trig.center = Vector3(0,0,0);
  Trig.radius = 100;
  Trig.height = 100;
  
  }
if(ON.Contains ("TC7")){

if(ON.Contains ("sTC7"))
PissedAtTC7 = 20;

if(PissedAtTC7 > 0){

 if(target){
 if(target != Waypoint)
  var Dist6 = Vector3.Distance(target.position, Waypoint.position);
  else
  Dist6 = 200;
 }else{
 Dist6 = 200;
 }
 
  if(Vector3.Distance(OT.position, Waypoint.position) < Dist6){
  target = OT;
  Spot = false;
  Attacking = true;
  }
  
  }

  Trig.center = Vector3(0,0,0);
  Trig.radius = 100;
  Trig.height = 100;

}

if(ON.Contains ("TC8")){

if(ON.Contains ("sTC8"))
PissedAtTC8 = 20;

if(PissedAtTC8 > 0){

 if(target){
 if(target != Waypoint)
  var Dist7 = Vector3.Distance(target.position, Waypoint.position);
  else
  Dist7 = 200;
 }else{
 Dist7 = 200;
 }
 
  if(Vector3.Distance(OT.position, Waypoint.position) < Dist7){
  target = OT;
  Spot = false;
  Attacking = true;
  }
  
  }

  Trig.center = Vector3(0,0,0);
  Trig.radius = 100;
  Trig.height = 100;

}

if(ON.Contains ("TC9")){

if(ON.Contains ("sTC9"))
PissedAtTC9 = 20;

if(PissedAtTC9 > 0){

 if(target){
 if(target != Waypoint)
  var Dist8 = Vector3.Distance(target.position, Waypoint.position);
  else
  Dist8 = 200;
 }else{
 Dist8 = 200;
 }
 
  if(Vector3.Distance(OT.position, Waypoint.position) < Dist8){
  target = OT;
  Spot = false;
  Attacking = true;
  }
  
  }

  Trig.center = Vector3(0,0,0);
  Trig.radius = 100;
  Trig.height = 100;

}

}
}
}

function Shoot () {
if(Attacking){

if(LineOfFire){
var TheThing1 = Instantiate(Shot, Muzzle1.position, Muzzle1.rotation);
  TheThing1.transform.parent = Muzzle1;
}
  
yield WaitForSeconds (0.16);

  if(LineOfFire){
var TheThing2 = Instantiate(Shot, Muzzle2.position, Muzzle2.rotation);
  TheThing2.transform.parent = Muzzle2;
}
  
}
}

function Shooty () {
if(Activated)
Shoot();
}

function CalcLead () {
if(Activated){
Lead();

if(IncomingMissile)
if(IncomingMissile.name.Contains ("Br"))
IncomingMissile = null;

if(IncomingMissile)
if(Vector3.Distance(IncomingMissile.position, Waypoint.position) > 100)
IncomingMissile = null;

CanDivert = true;

}
}

function Lead (){

if(target)
TargetTrace.position = target.position;

yield WaitForSeconds (0.1);

if(target){

var Dist1 = Vector3.Distance(thisTransform.position, target.position);
var Dist11 = Mathf.Clamp(Dist1,110,2000);

var Dist2 = Vector3.Distance(TargetTrace.position, target.position);

TargetTrace.LookAt(target);

TargetLead.position = TargetTrace.position;
TargetLead.rotation = TargetTrace.rotation;
TargetLead.position += TargetLead.forward * Dist11 * Dist2 * 0.025;

if(Attacking){
TLCol.radius = Dist1 * 0.05;
}else{
TLCol.radius = 0.1;
}
}
}

function LeaveMarker () {
if(Activated){
var lastPos : Vector3 = thisTransform.position;
if(Waypoint2)
var lastHPos : Vector3 = Waypoint2.position;

if(!Settling)
IsEscaping(lastPos, lastHPos);

Proceed = false;

if(Obstacle){
if(!TurnLeft && !TurnRight)
if(otherObject)
if (Vector3.Distance(otherObject.position, thisTransform.position) < 8){
Presence.IAmNumber = Random.Range(0, 9);
if(otherObject.gameObject.GetComponent("TCInfo") != null)
if(otherObject.gameObject.GetComponent("TCInfo").IAmNumber < Presence.IAmNumber &&
   otherObject.gameObject.GetComponent("TCInfo").IAmStopping){
OtherObject = null;
Proceed = true;
}
}
}
}
}

function IsEscaping(lastPos : Vector3, lastHPos : Vector3){
Stuck = false;
yield WaitForSeconds (1);

  if(Vector3.Distance(thisTransform.position, lastPos) < 0.5){
  if(Stuckage < 4)
  Stuckage += 1;
  Stuck = true;
  yield WaitForSeconds (2);
  Stuck = false;
  }else{
  if(Stuckage > 0)
  Stuckage -= 1;
  }
  
  if(Waypoint2){
  if(Vector3.Distance(Waypoint2.position, lastHPos) > 3)
  HomeIsMoving = true;
  else
  HomeIsMoving = false;
  }else{
  HomeIsMoving = false;
  }
  
}

function Counter () {
if(Activated){
if(Runtime > 0)
Runtime -= 1;

if(Settling){
Runtime -= 1;
if(Runtime < -5){
Activated = false;
Settling = false;
}
}

}else{
if(Runtime < 60)
Runtime += 1;
if(Runtime == 60)
Activated = true;
}

DangerSense = false;
Trig.center = Vector3(0,0,0);
Trig.radius = 100;
Trig.height = 100;
}

function Regenerator () {

if(Activated){

rigidbody.freezeRotation = true;

Wing1.Broken = false;
Wing2.Broken = false;

if(!IncomingMissile){
if(!Floorstacle && !Roofstacle && !TurnRight && !TurnLeft){

if(Attacking){

Runtime = 120;
Settling = false;

GyroForce = 4;
TurnMod = 1;
Vessel.rigidbody.angularDrag = 24;
ConfJ.angularYZDrive.maximumForce = 0.2;
ConfJ.angularXDrive.maximumForce = 0.1;

}else{
if(!Patrolling){

GyroForce = 4;
TurnMod = 1;
Vessel.rigidbody.angularDrag = 24;

ConfJ.angularYZDrive.maximumForce = 0.1;
ConfJ.angularXDrive.maximumForce = 0.05;
if(Circle)
GyroForce = 8;

}else{
GyroForce = 4;
TurnMod = 0.3;
Vessel.rigidbody.angularDrag = 8;

ConfJ.angularYZDrive.maximumForce = 0.03;
ConfJ.angularXDrive.maximumForce = 0.001;
}
}

}else{
ConfJ.angularYZDrive.maximumForce = 0.01;
ConfJ.angularXDrive.maximumForce = 0.05;
}
}

if(Obstacle){
Presence.IAmStopping = true;
}else{
Presence.IAmStopping = false;
}
  
Obstacle = false;
Farstacle = false;

Roofstacle = false;
Floorstacle = false;

Circle = false;

if(Assisting){
Waypoint2 = null;
Waypoint = PlayerInformation.instance.Pirizuka;
Runtime = 120;
Settling = false;
Patrolling = false;
}else{
if(Homepoint)
if(Vector3.Distance(thisTransform.position, Homepoint.position) > 128){
Waypoint = Homepoint;
Waypoint2 = Homepoint;
}
}

if(Attacking || Spot){

var relativePoint = thisVTransform.InverseTransformPoint(Waypoint.transform.position);
    if (relativePoint.y > 50)
        Farstacle = true;

if(target != null)
if (!Physics.Linecast (thisTransform.position, target.position, targetLayers2)){
TurnRight = false;
TurnLeft = false;
Roofstacle = false;
Floorstacle = false;
JustNoticed = 2;
}
}

if(!Attacking){

if(Runtime == 0)
if(Settlepoint){
if(Vector3.Distance(thisTransform.position, Settlepoint.position) > 2){
target = Settlepoint;
Settling = false;
}else{
if(Settlepoint != null)
Settling = true;
}
}

if(!Settling){
if(Runtime > 0){
if(Vector3.Distance(thisTransform.position, Waypoint.position) > 50)
target = Waypoint;
else
target = ForwardAim;

if(Vector3.Distance(thisTransform.position, Waypoint.position) > 100)
Far = true;
else
Far = false;
}

if(Waypoint2){

var relativePoint2 = Waypoint2.InverseTransformPoint(thisVTransform.position);

if(Vector3.Distance(thisTransform.position, Waypoint2.position) > 50){
Patrolling = false;

if(HomeIsMoving){
if (relativePoint2.z < 0)
   Floorstacle = true;
}

}else{
if(HomeIsMoving)
Floorstacle = true;
Patrolling = true;
}

if(Vector3.Distance(thisTransform.position, Waypoint2.position) > 100){
target = Waypoint2;
Circle = false;
if (-relativePoint2.z > 5)
Floorstacle = true;
else
Floorstacle = false;
}else{
if (-relativePoint2.z > 5){
   Floorstacle = true;
   Patrolling = false;
   Circle = true;
   }else{
   Circle = false;
   }
}
}

Vessel.rigidbody.drag = 0.05;
}else{
Vessel.rigidbody.drag = 8;
}

if(AngerLevel == 1){
  Spot = false;
  target = ForwardAim;
  AngerLevel = 0;
}
}

if(JustNoticed > 0)
JustNoticed -= 1;

if(AngerLevel > 1)
AngerLevel -= 1;

if(Dodge > 0)
Dodge -= 1;

if(PissedAtTC0a > 0)
PissedAtTC0a -= 1;

if(PissedAtTC2 > 0)
PissedAtTC2 -= 1;
  
if(PissedAtTC3 > 0)
PissedAtTC3 -= 1;

if(PissedAtTC4 > 0)
PissedAtTC4 -= 1;
  
if(PissedAtTC5 > 0)
PissedAtTC5 -= 1;
  
if(PissedAtTC6 > 0)
PissedAtTC6 -= 1;
  
if(PissedAtTC7 > 0)
PissedAtTC7 -= 1;

TurnRight = false;
TurnLeft = false;

TargetTooClose = false;

}else{
ConfJ.angularYZDrive.maximumForce = 0;
ConfJ.angularXDrive.maximumForce = 0;
Wing1.Broken = true;
Wing2.Broken = true;
Vessel.rigidbody.drag = 0.05;
Vessel.rigidbody.angularDrag = 0.2;
rigidbody.freezeRotation = false;
Presence.IAmNumber = 0.0001;
Presence.IAmStopping = true;
}

}