var StartVelocity : float;
var EngageVelocity = 0;
var Force : float = 0;

var DirY : boolean;

var target : Transform;

var TargetCode = 0;

var TargetTrace : Transform;
var TargetLead : Transform;

var LeadAmount = 0.08;

var LeadSpread : boolean;
var LeadSpreadU = 0.07;
var LeadSpreadL = 0.09;

var Lead1Time = 0;
var Lead2Time = 0;

var thisVTransform : Transform;
var vRigidbody : Rigidbody;

var C : boolean;
var E : boolean;
var Away : boolean;
var Armed : boolean;
var Aiming : boolean;
var Avoiding : boolean;
var LPEnabled : boolean;
var ThrusterOn : boolean;

var IsAttached : boolean;
var CJ : ConfigurableJoint;

var ColEnableTime : float = 0;
var LPEnableTime : float = 0.2;
var EngageDelay : float = 1;
var ArmDelay : float = 1;
var ThrusterDelay : float = 1;

var ThrusterTime : float = 1;
var Timer : float = 10;

var EngageDrag : float = 0;
var AimForce : float = 1;
var SpreadAmount : float = 0;

var SkipLookRot : boolean;

var keepAudio : boolean;

var TypeMine : boolean;
var TypeBomb : boolean;
var TypeBallistic : boolean;
var TypeBallisticSeeking : boolean;
var TypeDirectShot : boolean;
var TypeDirectShotSeeking : boolean;
var TypeSeeking : boolean;

var CanLead : boolean;

var useSpleadCurve : boolean;
var SpleadCurve : AnimationCurve = new AnimationCurve();

var Sticky : boolean;
var ArmLimiter : boolean;
var AvoidGround : boolean;
var JammingResistant : boolean;
var CollisionResistant : boolean;
var DirectedExplosion : boolean;

var Proximity : boolean;
var linProx : boolean;
var ProximityRange = 5;
var ProxTrig : Transform;

var KillOnDrift : boolean;
var KOTDist : float;

var useMevNavNetwork : boolean;

var HoverForce : float = 1;
var HovDist : float = 1;

var targetLayers : LayerMask;

var ThrusterEffect1Rate = 0;
var ThrusterEffect2Rate = 0;
var ThrusterEffect3Rate = 0;
var SmokeEffect1 : Transform;
var SmokeEffect2 : Transform;
var ThrusterEffect1: GameObject;
var ThrusterEffect2: GameObject;
var ThrusterEffect3: GameObject;
var EngageSound : AudioSource;
var MeshEffects: GameObject;
var explosion: GameObject;
var dud: GameObject;

var Remover : KillOverTime;

var WeaponOf : String = "PersonMcPersonface";

var Dist0 : float = 0;

var Dist1 : float = 0;
var Dist2 : float = 0;
var Dist3 : float = 0;
var Dist4 : float = 0;

private var LastPoint : Transform;

InvokeRepeating("Tick", 1, 0.93);

function Start () {

if(vRigidbody.mass > 0.1){
if(!WorldInformation.bigMissile1)
WorldInformation.bigMissile1 = thisVTransform;
else
WorldInformation.bigMissile2 = thisVTransform;
}

KOTDist = 20000;

if(LeadSpread)
LeadAmount = Random.Range(LeadSpreadL, LeadSpreadU);

var gO = new GameObject("LPoint");

if(CanLead){
var gO1 = new GameObject("TT");
var gO2 = new GameObject("TL");

TargetTrace = gO1.transform;
TargetLead = gO2.transform;
TargetTrace.position = transform.position;
TargetTrace.rotation = transform.rotation;
TargetLead.position = transform.position;
TargetLead.rotation = transform.rotation;
}

LastPoint = gO.transform;
LastPoint.transform.position = transform.position;
LastPoint.transform.rotation = transform.rotation;

transform.parent = null;

if(LastPoint){
LastPoint.parent = null;
}

rigidbody.useGravity = false;

if(!DirY)
rigidbody.AddForce(transform.forward * StartVelocity);
else
rigidbody.AddForce(transform.up * StartVelocity);

rigidbody.centerOfMass = Vector3(0, 0, 0);

ColEnable();
LPEnable();

//[Types]=================================================================================================

if(TypeMine){
Arm();
Countdown();
}

if(TypeBomb){
Arm();
Countdown();
}

if(TypeBallistic){
Arm2();
EngageThruster();
Engage();
Countdown();
}

if(TypeBallisticSeeking){
Arm2();
EngageThruster();
Engage();
Countdown();
}

if(TypeDirectShot){
Arm2();
EngageThruster();
Engage();
Countdown();
}

if(TypeDirectShotSeeking){
Arm2();
EngageThruster();
Engage();
Countdown();
}

if(TypeSeeking){
Arm2();
EngageThruster();
Engage();
Countdown();
}

}


function ColEnable () {
yield WaitForSeconds (ColEnableTime);

if(TypeBallistic || TypeBallisticSeeking || TypeMine || TypeBomb)
rigidbody.useGravity = true;

LastPoint.transform.position = transform.position;
LastPoint.transform.rotation = transform.rotation;

if(!gameObject.collider){

var sc : SphereCollider;
	sc = gameObject.AddComponent ("SphereCollider");
	gameObject.GetComponent(SphereCollider).radius = 0.5;
	
}

gameObject.layer = 14;

Away = true;
C = false;
}

function LPEnable () {
yield WaitForSeconds (LPEnableTime);
LPEnabled = true;
}







function EngageThruster () {
yield WaitForSeconds (ThrusterDelay);
ThrusterOn = true;

rigidbody.AddForce(transform.forward * EngageVelocity);

if(SpreadAmount > 0){
 rigidbody.AddTorque(transform.up * Random.Range (-SpreadAmount, SpreadAmount));
 rigidbody.AddTorque(transform.right * Random.Range (-SpreadAmount, SpreadAmount));
 rigidbody.AddTorque(transform.forward * Random.Range (-SpreadAmount, SpreadAmount));
 }

if(audio != null)
audio.Play();

if(MeshEffects != null)
MeshEffects.gameObject.SetActive (true);

if(ThrusterEffect1 != null){
ThrusterEffect1.GetComponent(ParticleSystem).Play();
ThrusterEffect1.GetComponent(ParticleSystem).emissionRate = ThrusterEffect1Rate;
}
if(ThrusterEffect2 != null){
ThrusterEffect2.GetComponent(ParticleSystem).Play();
ThrusterEffect2.GetComponent(ParticleSystem).emissionRate = ThrusterEffect2Rate;
}
if(ThrusterEffect3 != null){
ThrusterEffect3.GetComponent(ParticleSystem).Play();
ThrusterEffect3.GetComponent(ParticleSystem).emissionRate = ThrusterEffect3Rate;
}

yield WaitForSeconds (ThrusterTime);
ThrusterOn = false;
}












function Engage () {
yield WaitForSeconds (EngageDelay);

if(EngageDrag > 0)
rigidbody.drag = EngageDrag;

Aiming = true;
if(EngageSound)
EngageSound.Play();

}








function Arm () {
yield WaitForSeconds (ArmDelay);

var gO = new GameObject("Trig");
    gO.transform.parent = gameObject.transform;
	gO.transform.position = transform.position;
    gO.transform.rotation = transform.rotation;
    gO.layer = 22;
    
    gORB = gO.AddComponent ("Rigidbody");
    gORB.isKinematic = true;
	gORB.useGravity = false;
    
	sc = gO.AddComponent ("SphereCollider");
	sc.isTrigger = true;
	sc.radius = ProximityRange;
	
	TR = gO.gameObject.AddComponent ("ThreatReader");
	TR.IgnoreThis = WeaponOf;
	
	ProxTrig = gO.transform;
	
Armed = true;
}

function Arm2 () {
yield WaitForSeconds (ArmDelay);
Armed = true;
}


function Countdown () {
yield WaitForSeconds (Timer);
if(!ArmLimiter)
Explode();
else
Disable();
}










function Explode () {

if(E)
return;

E = true;

transform.position = LastPoint.position;

if(!DirectedExplosion){
Instantiate(explosion, transform.position, explosion.transform.rotation);
}else{
Instantiate(explosion, transform.position, transform.rotation);
}

//var Load = Resources.Load("Prefabs/ThreatCursor", GameObject) as GameObject;
//var TGO = Instantiate(Load, transform.position, transform.rotation);

if(ThrusterEffect1 != null)
    ThrusterEffect1.GetComponent(ParticleSystem).emissionRate = 0;
if(ThrusterEffect2 != null)
    ThrusterEffect2.GetComponent(ParticleSystem).emissionRate = 0;
if(ThrusterEffect3 != null)
    ThrusterEffect3.GetComponent(ParticleSystem).emissionRate = 0;
if(SmokeEffect1 != null)
    SmokeEffect1.parent = null;
if(SmokeEffect2 != null)
    SmokeEffect2.parent = null;
    
    if(audio != null)
    if(!keepAudio)
    audio.Stop();
    
    gameObject.collider.enabled = false;
    
    if(renderer != null)
    renderer.enabled = false;
    
    if(MeshEffects != null)
    MeshEffects.gameObject.SetActive (false);
    
    if(Remover != null)
    Remover.IsRemoving = true;
    
    name = "Broken";
    
    if(LastPoint)
    Destroy(LastPoint.gameObject);
    
    if(TargetLead){
    Destroy(TargetLead.gameObject);
    Destroy(TargetTrace.gameObject);
    }
    
    Destroy(this);
}


function Disable () {

if(C)
return;

TheDud = Instantiate(dud, transform.position, transform.rotation);
TheDud.rigidbody.velocity = vRigidbody.velocity * 1;
TheDud.rigidbody.angularVelocity = vRigidbody.angularVelocity * 1;

if(ThrusterEffect1 != null)
    ThrusterEffect1.GetComponent(ParticleSystem).emissionRate = 0;
if(ThrusterEffect2 != null)
    ThrusterEffect2.GetComponent(ParticleSystem).emissionRate = 0;
if(ThrusterEffect3 != null)
    ThrusterEffect3.GetComponent(ParticleSystem).emissionRate = 0;
if(SmokeEffect1 != null)
    SmokeEffect1.parent = null;
if(SmokeEffect2 != null)
    SmokeEffect2.parent = null;
    
    if(audio != null)
    if(!keepAudio)
    audio.Stop();
    
    gameObject.collider.enabled = false;
    
    if(renderer != null)
    renderer.enabled = false;
    
    if(MeshEffects != null)
    MeshEffects.gameObject.SetActive (false);
    
    if(Remover != null)
    Remover.IsRemoving = true;
    
    name = "Broken";
    
    if(LastPoint)
    Destroy(LastPoint.gameObject);
    
    if(TargetLead){
    Destroy(TargetLead.gameObject);
    Destroy(TargetTrace.gameObject);
    }
    
    Destroy(this);
}










function FixedUpdate () {

var hit0 : RaycastHit;

if(ThrusterOn)
rigidbody.AddForce(transform.forward * Force);

if(TypeBallistic)
if(Away)
if(!SkipLookRot)
thisVTransform.rotation = Quaternion.LookRotation(vRigidbody.velocity);
         
if(Aiming)
if(target){

Dist0 = Vector3.Distance(transform.position, target.position);

if(TypeDirectShot)
if(SpreadAmount > 0){
 rigidbody.AddTorque(transform.up * Random.Range (-SpreadAmount, SpreadAmount));
 rigidbody.AddTorque(transform.right * Random.Range (-SpreadAmount, SpreadAmount));
 rigidbody.AddTorque(transform.forward * Random.Range (-SpreadAmount, SpreadAmount));
 }

if(CanLead){

rigidbody.AddForceAtPosition((TargetLead.position - transform.position).normalized * AimForce, transform.forward * 1);
rigidbody.AddForceAtPosition((TargetLead.position - transform.position).normalized * -AimForce, -transform.forward * 1);

}else{
rigidbody.AddForceAtPosition((target.position - transform.position).normalized * AimForce, transform.forward * 1);
rigidbody.AddForceAtPosition((target.position - transform.position).normalized * -AimForce, -transform.forward * 1);
}

}

if(KillOnDrift){
if(Armed){
if(Dist0 < 250){

if(Dist0 > KOTDist)
Explode();

KOTDist = Dist0;
}
}
}

if(CanLead){
if(Lead1Time < 1){
Lead1Time = 8;
Lead2Time = 4;
Lead1();
}else{
Lead1Time -= 1;
}

if(Lead2Time < 1){
Lead2Time = 8;
Lead2Time = 4;
Lead2();
}else{
Lead2Time -= 1;
}
}

if(!JammingResistant)
if(AimForce == 0){
rigidbody.useGravity = true;
rigidbody.AddTorque(transform.right * 10 * rigidbody.mass);
rigidbody.AddForce(transform.right * Force);
name = "Broken";
}

if(Sticky){
if(Away){
if(!IsAttached){
localV = thisVTransform.InverseTransformDirection(vRigidbody.velocity);

VM = localV.z * 0.02;
VA = Mathf.Abs(VM);

     Debug.DrawRay (transform.position, transform.forward * VA, Color.yellow);
if(Physics.Raycast (transform.position, transform.forward, hit0, VA, targetLayers)){
if(hit0.collider.rigidbody){
     
CJ = gameObject.AddComponent ("ConfigurableJoint");
CJ.connectedBody = hit0.rigidbody;
CJ.xDrive.mode = JointDriveMode.Position;
CJ.yDrive.mode = JointDriveMode.Position;
CJ.zDrive.mode = JointDriveMode.Position;
CJ.angularXDrive.mode = JointDriveMode.Position;
CJ.angularYZDrive.mode = JointDriveMode.Position;
   
CJ.xDrive.positionSpring = 2;
CJ.yDrive.positionSpring = 2;
CJ.zDrive.positionSpring = 2;
    
CJ.angularXDrive.positionSpring = 1000;
CJ.angularYZDrive.positionSpring = 1000;
   
CJ.xDrive.positionDamper = 0.1;
CJ.yDrive.positionDamper = 0.1;
CJ.zDrive.positionDamper = 0.1;
    
CJ.angularXDrive.positionDamper = 0.1;
CJ.angularYZDrive.positionDamper = 0.1;
CJ.targetPosition = Vector3(0,0,-1);
IsAttached = true;
}else{
CJ = gameObject.AddComponent ("ConfigurableJoint");
CJ.xDrive.mode = JointDriveMode.Position;
CJ.yDrive.mode = JointDriveMode.Position;
CJ.zDrive.mode = JointDriveMode.Position;
CJ.angularXDrive.mode = JointDriveMode.Position;
CJ.angularYZDrive.mode = JointDriveMode.Position;
   
CJ.xDrive.positionSpring = 2;
CJ.yDrive.positionSpring = 2;
CJ.zDrive.positionSpring = 2;
    
CJ.angularXDrive.positionSpring = 1000;
CJ.angularYZDrive.positionSpring = 1000;
   
CJ.xDrive.positionDamper = 0.1;
CJ.yDrive.positionDamper = 0.1;
CJ.zDrive.positionDamper = 0.1;
    
CJ.angularXDrive.positionDamper = 0.1;
CJ.angularYZDrive.positionDamper = 0.1;
CJ.targetPosition = Vector3(0,0,-1);
IsAttached = true;
}
}
}
}
}

if(C)
return;

if(!TypeMine && !TypeBomb){

if(target && Proximity && !ProxTrig){
if(!linProx){
if(Vector3.Distance(transform.position, target.position) < ProximityRange)
Explode();
}else{
     Debug.DrawRay (transform.position, transform.forward * ProximityRange, Color.yellow);
if(Physics.Raycast (transform.position, transform.forward, hit0, ProximityRange, targetLayers))
Explode();
}
}

if(LastPoint){

if(Physics.Linecast (LastPoint.position, transform.position, targetLayers) && LPEnabled){

var hitE : RaycastHit;

LastPoint.LookAt(transform);

if(Physics.Raycast (LastPoint.position, LastPoint.forward, hitE, 8, targetLayers)){
LastPoint.position = hitE.point;
transform.position = LastPoint.position;
//rigidbody.velocity = Vector3.zero;
}

//Debug.Log("DidBoom");
//Time.timeScale = 0;
//Debug.Break();

Explode();
}else{

LastPoint.position = transform.position;
}
}

}

if(TypeMine || TypeBomb)
if(Armed)
if(!ProxTrig)
Explode();

if(target)
if(Vector3.Distance(transform.position, target.position) > 32){

if (Physics.Linecast (transform.position, target.position, targetLayers))
Avoiding = true;
else
Avoiding = false;

}else{
Avoiding = false;
}

if(AvoidGround){
if(Avoiding){

var newRot : Vector3 = (rigidbody.velocity);

var hit1 : RaycastHit;
var hit2 : RaycastHit;
var hit3 : RaycastHit;
var hit4 : RaycastHit;

if (Physics.Raycast (transform.position, newRot, hit1, rigidbody.velocity.magnitude, targetLayers))
if(!hit1.collider.name.Contains ("TC" + TargetCode))
rigidbody.AddForce(newRot * -rigidbody.velocity.magnitude * 0.004);

if (Physics.Raycast (transform.position, Vector3.down, HovDist, targetLayers))
rigidbody.AddForce(Vector3.up * AimForce);

newRot = (transform.forward * 0.6f + transform.right * -0.4f).normalized;
Debug.DrawRay (transform.position, newRot * 8, Color.red);
if (Physics.Raycast (transform.position, newRot, hit1, 8, targetLayers))
Dist1 = hit1.distance;
else
Dist1 = 8;

newRot = (transform.forward * 0.6f + transform.right * 0.4f).normalized;
Debug.DrawRay (transform.position, newRot * 8, Color.yellow);
if (Physics.Raycast (transform.position, newRot, hit2, 8, targetLayers))
Dist2 = hit2.distance;
else
Dist2 = 8;

if(Dist1 < 8 || Dist2 < 8){
if(Dist1 > Dist2)
rigidbody.AddTorque(transform.up * -AimForce * 2);
else
rigidbody.AddTorque(transform.up * AimForce * 2);
}

newRot = (transform.forward * 0.6f + transform.up * -0.4f).normalized;
Debug.DrawRay (transform.position, newRot * 8, Color.green);
if (Physics.Raycast (transform.position, newRot, hit3, 8, targetLayers))
Dist3 = hit3.distance;
else
Dist3 = 8;

newRot = (transform.forward * 0.6f + transform.up * 0.4f).normalized;
Debug.DrawRay (transform.position, newRot * 8, Color.cyan);
if (Physics.Raycast (transform.position, newRot, hit4, 8, targetLayers))
Dist4 = hit4.distance;
else
Dist4 = 8;

if(Dist3 < 8 || Dist4 < 8){
if(Dist3 > Dist4)
rigidbody.AddTorque(transform.right * AimForce * 2);
else
rigidbody.AddTorque(transform.right * -AimForce * 2);
}

}
}

}

function OnCollisionEnter(collision : Collision){

if(collision.collider.name.Contains ("mTF"))
return;

if(!Away || CollisionResistant)
return;

Explode();
}

function Tick () {

if(target){

if(AvoidGround){
if(target.name.Contains ("TC0"))
TargetCode = 0;

if(target.name.Contains ("TC1"))
TargetCode = 1;

if(target.name.Contains ("TC2"))
TargetCode = 2;

if(target.name.Contains ("TC3"))
TargetCode = 3;

if(target.name.Contains ("TC4"))
TargetCode = 4;

if(target.name.Contains ("TC5"))
TargetCode = 5;

if(target.name.Contains ("TC6"))
TargetCode = 6;

if(target.name.Contains ("TC7"))
TargetCode = 7;

if(target.name.Contains ("TC8"))
TargetCode = 8;

if(target.name.Contains ("TC9"))
TargetCode = 9;
}

if(target.name == "broken")
target = null;
}

if(useMevNavNetwork){
if(target == null){

if(MevNavNetwork.instance.EnemyTarget1 != null)
target = MevNavNetwork.instance.EnemyTarget1;
else
target = MevNavNetwork.instance.EnemyTarget2;

}
}

}

function Lead1 (){
if(target)
TargetTrace.position = target.position;
}

function Lead2 (){

if(target){

if(useSpleadCurve){
LeadAmount = SpleadCurve.Evaluate(rigidbody.velocity.magnitude);

Dist2 = Vector3.Distance(TargetTrace.position, target.position);

TargetTrace.LookAt(target);

TargetLead.position = TargetTrace.position;
TargetLead.rotation = TargetTrace.rotation;
TargetLead.position += TargetLead.forward * Dist0 * Dist2 * LeadAmount;

}else{

Dist0 = Vector3.Distance(transform.position, target.position);
Dist2 = Vector3.Distance(TargetTrace.position, target.position);

TargetTrace.LookAt(target);

TargetLead.position = TargetTrace.position;
TargetLead.rotation = TargetTrace.rotation;
TargetLead.position += TargetLead.forward * Dist0 * Dist2 * LeadAmount;

}

}
}