var target : Transform;
var Waypoint : Transform;
var Forward : Transform;
var AIAnchor : Transform;

var NpcController : RemoveOverTime;

var Home : Transform;

var TargetTrace : Transform;
var TargetLead : Transform;
var TargetLead2 : Transform;
var TLCol : SphereCollider;

var Explosion : GameObject;

var MissileAmmo : GameObject;
var Missile1 : Transform;
var Missile2 : Transform;
var Missile3 : Transform;
var Missile4 : Transform;

var Sequence1 : boolean = true;
var Sequence2 : boolean = false;

var Boost : boolean;

var Gun : NPCGun;
var Trig : SphereCollider;
var Presence : GameObject;

var TFX1 : ParticleSystem;
var TFX2 : ParticleSystem;
var TFX3 : ParticleSystem;

var BoostSound : AudioSource;

var thisTransform : Transform;
var thisVTransform : Transform;

var vRigidbody : Rigidbody;

var SpotSound : GameObject;
var AttackSound : GameObject;
var RejectSound : GameObject;
var DispenseSound : GameObject;
var PriorityWaypoint : GameObject;

var Battledrone : boolean;
var Cannondrone : boolean;
var Wardrone : boolean;
var Vult : boolean;

var PissedAtTC0a = 0;

var PissedAtTC1 = 0;
var PissedAtTC2 = 0;
var PissedAtTC3 = 0;
var PissedAtTC4 = 0;
var PissedAtTC5 = 0;
var PissedAtTC6 = 0;
var PissedAtTC8 = 0;
var PissedAtTC9 = 0;

var Dodge : Transform;
var Attacking : boolean;
var Obstacle : boolean = false;
var Stuck : boolean = false;
var TargetTooClose : boolean;
var Steady : boolean;
var Stopping : boolean;
var Damaged : boolean;

var Jammed : boolean;

var Activated : boolean;

var Pause : boolean;

var GotHit : boolean;

var IsBehind : boolean;

var Far : boolean;
var CloseN = 0;

var SlowingDown : boolean;
var TurnRight : boolean;
var TurnLeft : boolean;

var Spot = 0;
var Ignorage = 0;

var FedUp = 0;

var DangerSense = 0;

var Dist : float = 0;

var Clamp  : float = 0;

var Vel : float = 0;

var AngVel : float = 0;

var localV : Vector3;

var relativePoint : Vector3;

var targetLayers : LayerMask;

var MtargetLayers : LayerMask;

var RD : float = 0;

var GyroForce : float = 0.2;
var TurnForce : float = 0;

var ShootFrequency : float = 5;
var LaunchFrequency : float = 10;
var UniqueShootTime : float = 0.1;

var GyroOff : boolean;

InvokeRepeating("Regenerator", 1, 1);

InvokeRepeating("Targety", 15, 15);

InvokeRepeating("Shooty", 1, ShootFrequency);

InvokeRepeating("CalcLead", 1, 0.15);

function Start (){

if(Vult){
if(!WorldInformation.bigMissile1)
WorldInformation.bigMissile1 = thisVTransform;
else
WorldInformation.bigMissile2 = thisVTransform;
}

GyroForce = 0.05;

UniqueShootTime = Random.Range(0, 0.2);

yield WaitForSeconds (0.3);

if(target)
if(target.name.Contains ("TC"))
Attacking = true;

Activated = true;

yield WaitForSeconds (3);

Pause = false;

}

function Update () {

if(!Activated)
return;

if(target)
Dist = Vector3.Distance(thisTransform.position, target.position);

Clamp = Mathf.Clamp(Dist,30,90);

Vel = vRigidbody.velocity.magnitude;

thisTransform.rotation = AIAnchor.transform.rotation;
thisTransform.position = AIAnchor.transform.position;

if(Battledrone){
if(AngVel < 0.3 && GotHit && !IsBehind){
Steady = true;
}else{
Steady = false;
}
}

if(Attacking){
if(target == null){
StopAllCoroutines();
target = Waypoint;
Dodge = null;
Attacking = false;
Spot = 0;
}else{

if(target == Forward){
target = Waypoint;
Dodge = null;
Attacking = false;
Spot = 0;
}

if(target.name.Contains ("bro")){
StopAllCoroutines();
target = Waypoint;
Dodge = null;
Attacking = false;
Spot = 0;
}

}
}

if(TurnLeft)
  TurnForce = -2;

if(TurnRight)
  TurnForce = 2;

if(!TurnRight && !TurnLeft)
  TurnForce = 0;

if(TurnRight && TurnLeft)
  TurnForce = 0;
	
var newRot : Vector3 = (thisTransform.forward * 0.5f ).normalized;
var hit : RaycastHit;
	
Debug.DrawRay (thisTransform.position + thisTransform.forward * 1, newRot * 50f, Color.green);

if(Vult){
if(target){

relativePoint = thisVTransform.InverseTransformPoint(target.position);

if(Dist < 40 && Attacking && !GotHit){
TargetTooClose = true;
}else{
TargetTooClose = false;
}

}
if(Dist < 50)
return;
}else{

if(target){

relativePoint = thisVTransform.InverseTransformPoint(target.position);

if(Dist < 20 && Attacking && !GotHit){
TargetTooClose = true;
}else{
TargetTooClose = false;
}

}
}

if (Physics.Raycast (thisTransform.position + thisTransform.forward * 1, thisTransform.forward, hit, 50, targetLayers) && -localV.y > 30){
     SlowingDown = true;
 } else {
     SlowingDown = false;
 }

newRot = (thisTransform.forward * 0.8f + thisTransform.right * 0.1f).normalized;

Debug.DrawRay (thisTransform.position + thisTransform.right * 1.2, newRot * 30, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.right * 1.2, newRot, 30)) {
     TurnLeft = true;
 } else {
     TurnLeft = false;
 }
 
newRot = (thisTransform.forward * 0.8f + thisTransform.right * -0.1f).normalized;

Debug.DrawRay (thisTransform.position + -thisTransform.right * 1.2, newRot * 30, Color.black);
if (Physics.Raycast (thisTransform.position + -thisTransform.right * 1.2, newRot, 30)) {
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

if(target && !Pause){
if(!Wardrone){
if(AngVel < 1){
    if(Attacking){
    vRigidbody.AddForceAtPosition((target.transform.position - thisVTransform.position).normalized * 2, thisTransform.forward * 2);
    vRigidbody.AddForceAtPosition((target.transform.position - thisVTransform.position).normalized * -2, -thisTransform.forward * 2);
    GyroForce = 0;
    }else{
    vRigidbody.AddForceAtPosition((target.transform.position - thisVTransform.position).normalized * 1, thisTransform.forward * 2);
    vRigidbody.AddForceAtPosition((target.transform.position - thisVTransform.position).normalized * -1, -thisTransform.forward * 2);
    }
    }else{
    vRigidbody.AddForceAtPosition((target.transform.position - thisVTransform.position).normalized * 0.5, thisTransform.forward * 2);
    vRigidbody.AddForceAtPosition((target.transform.position - thisVTransform.position).normalized * -0.5, -thisTransform.forward * 2);
    GyroForce = 0.5;
    }
}else{
if(Attacking){
if(FedUp < 5){
if(!Obstacle){
if(Steady){
if(Far){
GyroForce = 1;
vRigidbody.AddForce(thisVTransform.forward * 4);
vRigidbody.AddForceAtPosition((TargetLead.transform.position - thisVTransform.position).normalized * 0.5, thisTransform.forward * 2);
vRigidbody.AddForceAtPosition((TargetLead.transform.position - thisVTransform.position).normalized * -0.5, -thisTransform.forward * 2);
}else{
vRigidbody.AddForceAtPosition((TargetLead.transform.position - thisVTransform.position).normalized * 0.2, thisTransform.forward * 2);
vRigidbody.AddForceAtPosition((TargetLead.transform.position - thisVTransform.position).normalized * -0.2, -thisTransform.forward * 2);
}
}else{
if(Far){
    vRigidbody.AddForceAtPosition((TargetLead.transform.position - thisVTransform.position).normalized * 1, thisTransform.forward * 2);
    vRigidbody.AddForceAtPosition((TargetLead.transform.position - thisVTransform.position).normalized * -1, -thisTransform.forward * 2);
    if(AngVel > 1)
    GyroForce = 0.5;
    else
    GyroForce = 0;
    }else{
    if(AngVel > 1){
    vRigidbody.AddForceAtPosition((TargetLead.transform.position - thisVTransform.position).normalized * 0.2, thisTransform.forward * 2);
    vRigidbody.AddForceAtPosition((TargetLead.transform.position - thisVTransform.position).normalized * -0.2, -thisTransform.forward * 2);
    }else{
    GyroForce = 0;
    if(!IsBehind){
    vRigidbody.AddForceAtPosition((TargetLead.transform.position - thisVTransform.position).normalized * 4, thisTransform.forward * 2);
    vRigidbody.AddForceAtPosition((TargetLead.transform.position - thisVTransform.position).normalized * -4, -thisTransform.forward * 2);
    }else{
    vRigidbody.AddForceAtPosition((TargetLead.transform.position - thisVTransform.position).normalized * 0.1, thisTransform.forward * 2);
    vRigidbody.AddForceAtPosition((TargetLead.transform.position - thisVTransform.position).normalized * -0.1, -thisTransform.forward * 2);
    }
    }
    }
    }
}
}else{
    vRigidbody.AddForceAtPosition((target.transform.position - thisVTransform.position).normalized * 2, thisTransform.forward * 2);
    vRigidbody.AddForceAtPosition((target.transform.position - thisVTransform.position).normalized * -2, -thisTransform.forward * 2);
GyroForce = 0;
Steady = false;
GotHit = false;
}
}else{
    vRigidbody.AddForceAtPosition((target.transform.position - thisVTransform.position).normalized * 1, thisTransform.forward * 2);
    vRigidbody.AddForceAtPosition((target.transform.position - thisVTransform.position).normalized * -1, -thisTransform.forward * 2);
}
}
}

if(!Vult)
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 1 + thisTransform.up * 1, thisTransform.forward, 30, targetLayers))
		Obstacle = true;

if(!Wardrone){
Debug.DrawRay (thisTransform.position + thisTransform.forward * 1 + -thisTransform.up * 1, thisTransform.forward * 30, Color.white);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 1 + -thisTransform.up * 1, thisTransform.forward, hit, 30, targetLayers)){
Obstacle = true;
     if(hit.collider.tag.Contains ("Te")){
        vRigidbody.AddTorque(thisTransform.right * -1);
        if(Attacking)
        vRigidbody.AddForce(thisVTransform.forward * 6);
        else
        vRigidbody.AddForce(thisVTransform.forward * 3);
        }
     if(hit.collider.tag.Contains ("Str")){
        vRigidbody.AddTorque(thisTransform.right * -1);
        if(Attacking)
		vRigidbody.AddForce(thisVTransform.forward * 6);
		else
		vRigidbody.AddForce(thisVTransform.forward * 3);
		}
}
}else{
Debug.DrawRay (thisTransform.position + thisTransform.forward * 1 + -thisTransform.up * 1, thisTransform.forward * 30, Color.white);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 1 + -thisTransform.up * 1, thisTransform.forward, hit2, 30, targetLayers)){
Obstacle = true;
        vRigidbody.AddTorque(thisTransform.right * -1);
        if(Attacking)
        vRigidbody.AddForce(thisVTransform.forward * 6);
        else
        vRigidbody.AddForce(thisVTransform.forward * 3);

        IsBehind = true;
		
}
}

    vRigidbody.AddForceAtPosition(Vector3.up * GyroForce, thisTransform.up * 2);
    vRigidbody.AddForceAtPosition(-Vector3.up * GyroForce, -thisTransform.up * 2);

if(!Physics.Raycast (thisTransform.position, thisTransform.up, 2, targetLayers)){
if(Physics.Raycast (thisTransform.position, Vector3.down, 5 + RD, targetLayers)){
vRigidbody.AddForce(Vector3.up * 4);
GyroForce = 1;
}
}else{
vRigidbody.AddForce(thisVTransform.forward * -4);
}

if(!Physics.Raycast (thisTransform.position, Vector3.down, 50, targetLayers))
if(!Steady)
vRigidbody.AddForce(Vector3.up * -1.5);

if(Obstacle){

if(-localV.y > 0){
if(-localV.y > 10)
vRigidbody.AddForce(-thisVTransform.up * -2);
else
vRigidbody.AddForce(-thisVTransform.up * -1);
}

}

if(TargetTooClose)
  vRigidbody.AddForce(thisVTransform.up * 1);

if(!Wardrone){
if(!Vult){
if(Dodge)
  vRigidbody.AddForce(thisVTransform.right * 1.5);

if(Stuck)
  vRigidbody.AddForce(-thisVTransform.up * -1.5);

if(Vel < 60){
if(Attacking){
if(!Obstacle && !Stuck && !SlowingDown && !TurnLeft && !TurnRight)
  vRigidbody.AddForce(-thisVTransform.up * 2);
  }else{
if(!Obstacle && !Stuck && !SlowingDown && !TurnLeft && !TurnRight)
  vRigidbody.AddForce(-thisVTransform.up * 1);
  }
}

}else{
if(Dodge)
  vRigidbody.AddForce(Vector3.up * 4);

if(Stuck)
  vRigidbody.AddForce(-thisVTransform.up * -0.5);

if(Boost){

if(Vel < 160)
if(!Obstacle && !Stuck && !SlowingDown && !TurnLeft && !TurnRight)
  vRigidbody.AddForce(-thisVTransform.up * Clamp * 0.1);
}else{

if(BoostSound.audio.isPlaying){
if(BoostSound.audio.volume > 0.05)
BoostSound.audio.volume -= 0.05;
else
BoostSound.audio.Stop();
}
if(Vel < 30)
if(!Obstacle && !Stuck && !SlowingDown && !TurnLeft && !TurnRight)
  vRigidbody.AddForce(-thisVTransform.up * 0.2);
}

if(Obstacle && TargetTooClose && Boost){
Instantiate(Explosion, transform.position, transform.rotation);
NpcController.Removal();
}

}
}else{

if(Dodge)
  vRigidbody.AddForce(Vector3.up * 4);

if(Stuck)
  vRigidbody.AddForce(-thisVTransform.up * -1.5);

if(Vel < 60){
if(Attacking){
if(!Obstacle && !Stuck && !SlowingDown && !TurnLeft && !TurnRight)
  vRigidbody.AddForce(-thisVTransform.up * 3);
  }else{
if(!Obstacle && !Stuck && !SlowingDown && !TurnLeft && !TurnRight)
  vRigidbody.AddForce(-thisVTransform.up * 2);
  }
}

}

}

function OnTriggerEnter (other : Collider) {

if(Vult || !Activated)
return;

ON = other.name;
OT = other.transform;

if(Physics.Linecast (thisTransform.position, OT.position, MtargetLayers))
return;

if(!Attacking && Spot < 2){
if(ON.Contains ("TC") && !ON.Contains ("TC7")){
                       
  target = OT;
  Spot = 4;
  var TheThing0 = Instantiate(SpotSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing0.transform.parent = thisTransform;
  StopAllCoroutines();
}
}

if(ON.Contains ("TFC") && !ON.Contains ("TFC7")){

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

if(ON.Contains ("TFC8"))
PissedAtTC8 += 1;

if(ON.Contains ("TFC9"))
PissedAtTC9 += 1;

if(!Attacking){
Trig.radius = 20;
DangerSense = 4;
target = Waypoint;
if(other.rigidbody)
if(Waypoint)
Waypoint.transform.position = OT.position;
}

Dodge = OT;
}
}

function OnTriggerStay (other : Collider) {

if(!Activated)
return;

ON = other.name;
OT = other.transform;

if(!ON.Contains ("x"))
if(Physics.Linecast (thisTransform.position, OT.position, MtargetLayers))
return;

if(!Vult){

if(Waypoint){
if(DangerSense > 0){
if(ON.Contains ("TC") && !ON.Contains ("TC7")){
  if(Vector3.Distance(OT.position, Waypoint.transform.position) < 40){
  target = OT;
  DangerSense = 0;
  Spot = 0;
  }
}
}
}
}else{
if(other.collider.name.Contains ("TC7"))
Spot = 2;
}
}

function Shoot () {
if(Attacking){
yield WaitForSeconds (UniqueShootTime);
Gun.Fire();
}
}

function Launch () {

if(Attacking){

if(!Wardrone){

if(Steady){
if(Sequence1){ Sequence1 = false;

if(Missile1 != null){
var _SpawnedObject1 = Instantiate(MissileAmmo, Missile1.position, Missile1.rotation);
    _SpawnedObject1.rigidbody.velocity = vRigidbody.velocity * 1.35;
}
yield WaitForSeconds (0.5);      
if(Missile2 != null){
var _SpawnedObject2 = Instantiate(MissileAmmo, Missile2.position, Missile2.rotation);
    _SpawnedObject2.rigidbody.velocity = vRigidbody.velocity * 1.35;
}
GotHit = false;
yield WaitForSeconds (5);
Sequence2 = true;
return;
}

if(Sequence2){ Sequence2 = false;

if(Missile3 != null){
var _SpawnedObject3 = Instantiate(MissileAmmo, Missile3.position, Missile3.rotation);
    _SpawnedObject3.rigidbody.velocity = vRigidbody.velocity * 1.35;
}
yield WaitForSeconds (0.5);      
if(Missile4 != null){
var _SpawnedObject4 = Instantiate(MissileAmmo, Missile4.position, Missile4.rotation);
    _SpawnedObject4.rigidbody.velocity = vRigidbody.velocity * 1.35;
}
GotHit = false;
}
}

}else{
if(GotHit){
var TheThing1 = Instantiate(DispenseSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
    TheThing1.transform.parent = thisTransform;
var _SpawnedObject5 = Instantiate(MissileAmmo, Missile1.position, Missile1.rotation);
    _SpawnedObject5.rigidbody.velocity = vRigidbody.velocity;
    _SpawnedObject5.rigidbody.AddForce(Missile1.transform.up * -1);
    _SpawnedObject5.transform.GetComponent(MissileScript).target = TargetLead2;
CloseN = 0;
Far = false;
GotHit = false;
Steady = true;
yield WaitForSeconds (1);
Steady = false;
}
}

}
}

function Shooty () {
if(!Vult){
if(Attacking){
Shoot();
if(!Cannondrone && !Wardrone)
Launch();
}
}
}

function Engagey () {

Attacking = true;
var TheThing3 = Instantiate(AttackSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
TheThing3.transform.parent = thisTransform;
Dodge = null;
StopAllCoroutines();
}

function Targety () {

if(Ignorage > 5){
Ignorage = 0;
Attacking = false;
target = Forward;
var TheThing2 = Instantiate(RejectSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
TheThing2.transform.parent = thisTransform;
}

if(Spot < 1 && !Attacking && !Vult)
TargetArea();
}

function IsMoving(){
  Stuck = true;
  yield WaitForSeconds (1);
  Stuck = false;
}

function TargetArea () {

if(Vult)
return;

if(Waypoint)
if(MevNavNetwork.AlertTime > 0){
Waypoint.transform.position = MevNavNetwork.instance.PriorityWaypoint.position;
target = Waypoint;
}

yield WaitForSeconds (8);
target = Forward;
}

function CalcLead () {
if(Wardrone)
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

if(!Activated)
return;

if(!Vult){

Stopping = false;

if(target){

if(Attacking){
if(Dist > 500){
  Attacking = false;
  Spot = 0;
  Waypoint.transform.position = target.transform.position;
  target = Waypoint;
  }
}

if(Spot < 4){
if(target.name.Contains ("TC0")){

Gun.ConfirmedName = target.name;

if(Dodge){
if(!Dodge.name.Contains ("C0"))
Ignorage += 1;
else
Ignorage = 0;
}else{
Ignorage += 1;
}

if(!Attacking)
if(DangerSense > 0)
Engagey();

}

if(target.name.Contains ("C1")){

Gun.ConfirmedName = target.name;

if(Dodge){
if(!Dodge.name.Contains ("C1"))
Ignorage += 1;
else
Ignorage = 0;
}else{
Ignorage += 1;
}

  if(!Attacking){
  if(MevNavNetwork.TC1DeathRow > 300){
  MevNavNetwork.instance.PriorityWaypoint.position = target.position;
  if(MevNavNetwork.TC1DeathRow < 600)
  MevNavNetwork.TC1DeathRow = 600;
  else
  MevNavNetwork.AlertLVL2 = 1;
  }
  if(PissedAtTC1 > 1 || MevNavNetwork.TC1DeathRow > 0)
  Engagey();
  }
}

if(target.name.Contains ("C2")){

Gun.ConfirmedName = target.name;

if(Dodge){
if(!Dodge.name.Contains ("C2"))
Ignorage += 1;
else
Ignorage = 0;
}else{
Ignorage += 1;
}

if(!Attacking)
if(PissedAtTC2 > 1)
Engagey();

}

if(target.name.Contains ("C3")){

Gun.ConfirmedName = target.name;

if(Dodge){
if(!Dodge.name.Contains ("C3"))
Ignorage += 1;
else
Ignorage = 0;
}else{
Ignorage += 1;
}

  if(!Attacking){
  if(MevNavNetwork.TC3DeathRow > 300 && MevNavNetwork.TC1DeathRow < 300){
  MevNavNetwork.instance.PriorityWaypoint.position = target.position;
  if(MevNavNetwork.TC3DeathRow < 600)
  MevNavNetwork.TC3DeathRow = 600;
  else
  MevNavNetwork.AlertLVL2 = 3;
  }
  if(PissedAtTC3 > 1 || MevNavNetwork.TC3DeathRow > 0)
  Engagey();
  }

}

if(target.name.Contains ("C4")){

Gun.ConfirmedName = target.name;

if(Dodge){
if(!Dodge.name.Contains ("C4"))
Ignorage += 1;
else
Ignorage = 0;
}else{
Ignorage += 1;
}

  if(!Attacking){
  if(MevNavNetwork.TC4DeathRow > 300 && MevNavNetwork.TC1DeathRow < 300){
  MevNavNetwork.instance.PriorityWaypoint.position = target.position;
  if(MevNavNetwork.TC4DeathRow < 600)
  MevNavNetwork.TC4DeathRow = 600;
  else
  MevNavNetwork.AlertLVL2 = 4;
  }
  if(PissedAtTC4 > 1 || MevNavNetwork.TC4DeathRow > 0)
  Engagey();
  }

}

if(target.name.Contains ("C5")){

Gun.ConfirmedName = target.name;

if(Dodge){
if(!Dodge.name.Contains ("C5"))
Ignorage += 1;
else
Ignorage = 0;
}else{
Ignorage += 1;
}

  if(!Attacking){
  if(MevNavNetwork.TC5DeathRow > 300 && MevNavNetwork.TC1DeathRow < 300){
  MevNavNetwork.instance.PriorityWaypoint.position = target.position;
  if(MevNavNetwork.TC5DeathRow < 600)
  MevNavNetwork.TC5DeathRow = 600;
  else
  MevNavNetwork.AlertLVL2 = 5;
  }
  if(PissedAtTC5 > 1 || MevNavNetwork.TC5DeathRow > 0)
  Engagey();
  }

}

if(target.name.Contains ("C6")){

Gun.ConfirmedName = target.name;

if(Dodge){
if(!Dodge.name.Contains ("C6"))
Ignorage += 1;
else
Ignorage = 0;
}else{
Ignorage += 1;
}

  if(!Attacking){
  if(MevNavNetwork.TC6DeathRow > 300 && MevNavNetwork.TC1DeathRow < 300){
  MevNavNetwork.instance.PriorityWaypoint.position = target.position;
  if(MevNavNetwork.TC6DeathRow < 600)
  MevNavNetwork.TC6DeathRow = 600;
  else
  MevNavNetwork.AlertLVL2 = 6;
  }
  if(PissedAtTC6 > 1 || MevNavNetwork.TC6DeathRow > 0)
  Engagey();
  }

}

if(target.name.Contains ("C8")){

Gun.ConfirmedName = target.name;

if(Dodge){
if(!Dodge.name.Contains ("C8"))
Ignorage += 1;
else
Ignorage = 0;
}else{
Ignorage += 1;
}

  if(!Attacking){
  if(MevNavNetwork.TC8DeathRow > 300 && MevNavNetwork.TC1DeathRow < 300){
  MevNavNetwork.instance.PriorityWaypoint.position = target.position;
  if(MevNavNetwork.TC8DeathRow < 600)
  MevNavNetwork.TC8DeathRow = 600;
  else
  MevNavNetwork.AlertLVL2 = 8;
  }
  if(PissedAtTC8 > 1 || MevNavNetwork.TC8DeathRow > 0)
  Engagey();
  }

}

if(target.name.Contains ("C9")){

Gun.ConfirmedName = target.name;

if(Dodge){
if(!Dodge.name.Contains ("C9"))
Ignorage += 1;
else
Ignorage = 0;
}else{
Ignorage += 1;
}

  if(!Attacking){
  if(MevNavNetwork.TC9DeathRow > 300 && MevNavNetwork.TC1DeathRow < 300){
  MevNavNetwork.instance.PriorityWaypoint.position = target.position;
  if(MevNavNetwork.TC9DeathRow < 600)
  MevNavNetwork.TC9DeathRow = 600;
  else
  MevNavNetwork.AlertLVL2 = 9;
  }
  if(PissedAtTC9 > 1 || MevNavNetwork.TC9DeathRow > 0)
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

Dodge = null;
TargetTooClose = false;

if(relativePoint.y > 0)
IsBehind = true;
else
IsBehind = false;

if(Wardrone){

if(Ignorage > 24)
  Targety();

if(GotHit){
Far = false;
CloseN = 0;
}

if(Dist > 130)
Far = true;
else
Far = false;

if(!Far){
if(CloseN < 13)
CloseN += 1;
if(CloseN > 12)
Far = true;
}else{
if(CloseN > 0)
CloseN -= 3;
}

GyroForce = 0.2;

if(Vel < 20){
if(-relativePoint.y > 15)
Launch();
}else{
if(-relativePoint.y > 30)
Launch();
}

if(!IsBehind){
CloseN = 0;
Far = false;
}

}else{

if(Ignorage > 6)
  Targety();

GyroForce = 0.2;
if(Presence.name.Contains ("j"))
Jammed = true;
}

var lastPos : Vector3 = thisTransform.position;
var lastTPos : Vector3 = target.position;
IsEscaping(lastPos, lastTPos, relativePoint.y);

}

if(Attacking){
Trig.radius = 50;
}else{

Trig.radius = 100;

if(Home){
if(Vector3.Distance(thisTransform.position, Home.position) > 200)
target = Home;
else
target = Forward;
}
}

if(Spot > 0)
Spot -= 1;

}else{

if(target){
if(target.name.Contains ("TC") || target.name.Contains ("bro")){

if(target.name.Contains ("bTC")){
if(!Boost){
Boost = true;
Attacking = true;
BoostSound.audio.volume = 1;
BoostSound.Play();
TFX1.emissionRate = 200;
TFX2.emissionRate = 200;
TFX3.emissionRate = 100;
}
Stopping = false;
}else{
if(Boost){
Boost = false;
Attacking = false;
TFX1.emissionRate = 0;
TFX2.emissionRate = 0;
TFX3.emissionRate = 0;
}

if(Dist < 600)
Stopping = true;
else
Stopping = false;
}

}else{

if(Boost){
Boost = false;
Attacking = false;
TFX1.emissionRate = 0;
TFX2.emissionRate = 0;
TFX3.emissionRate = 0;
}

if(Dist < 600)
Stopping = true;
else
Stopping = false;

target = MevNavNetwork.instance.EnemyTarget1;
}
}else{
target = MevNavNetwork.instance.EnemyTarget1;
}
}
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

if(Mathf.Abs(AngMeasure - AngVel) < 1)
FedUp += 1;

if(Mathf.Abs(Measure1 - Measure2.y) < 2){
FedUp += 1;
}else{
if(FedUp > 0)
FedUp -= 1;
}

if(FedUp > 8)
FedUp = 0;

if(Vector3.Distance(thisTransform.position, lastPos) < 1 && !Stopping){
  Stuck = true;
  yield WaitForSeconds (1);
  Stuck = false;
}
  
}