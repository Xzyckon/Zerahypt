var turretGO : GameObject;
var turretRB : Rigidbody;
var turretAI : TurretAI;

var gunTarget : Transform;

var Fire1 : GameObject;
var stageFire : GameObject;

var Muzzle : Transform;
var Muzzle1 : Transform;
var Muzzle2 : Transform;
var Muzzle3 : Transform;
var Muzzle4 : Transform;

var isLauncher : boolean;

var launchesSeeking : boolean;

var use2StageFiring : boolean;
var stageInterval : float = 0.6;

var pauseGiveAI : boolean;
var pGAIC7 : MevNavWarCruiserAI;

var DischargedBit1 : Transform;
var DischargedBit1P : GameObject;
var DischargedBit1Model : GameObject;
var DischargedBitDelay : float = 0.3;
var DischargedBitVelocity = 70;
var DischargedBitTorque : float = 3;
 
var HasMovingBits : boolean;
 
var MovingBit1 : Transform;
var MB1Speed : float = 0.01;
var MB1EndValue : float = 0.5;
 
var ThisTurretDebug : boolean;

var ParentTheShot : boolean;

var gunFireSound : AudioSource;
var fireSound : boolean;
var GFSN = 0;

var RecoilAni : Animation;

var LineOfFire : boolean;

var SkipLOF : boolean;

var UseLOFNum : boolean;
var LOFNum = 0;

var SkipTLOF : boolean;

var reAssess : boolean;

var MuzzleP : Transform;

var ConfirmedName : String = "TC";

var targetLayers : LayerMask;

var MtargetLayers : LayerMask;

var RayStart : float = 0.5;
var TargetRange = 400;
var TargetMinRange = 0.5;

var TargetCode = 0;

var UseShotRegenSpeed : boolean;

var UseSequence : boolean;
var SequenceDelay : float = 0.5;

var PauseTime = 2;
var StatPauseTime = 0;

var RegenTimer = 60;
var StatRegenTimer = 60;

var Shots = 0;
var MaxShots = 3;

var Spread : float = 0;

var DegAlt : boolean;

function Start (){

targetLayers = WorldInformation.instance.NPCGunTL;

StatRegenTimer = RegenTimer;

StatPauseTime = PauseTime;

if(UseLOFNum){
var gO1 = new GameObject("MuzzlePoint");
MuzzleP = gO1.transform;
MuzzleP.position = Muzzle.position;
MuzzleP.rotation = Muzzle.rotation;
MuzzleP.parent = Muzzle;
}

}
 
function OnJointBreak(breakForce : float) {
transform.parent = null;
StopAllCoroutines();

if(turretGO)
Destroy(turretGO);

Destroy(this);
}

function Fire () {

var hit1 : RaycastHit;

if(!Muzzle)
return;

if(UseLOFNum)
if(gunTarget)
MuzzleP.LookAt(gunTarget);

if(Spread > 0){
if(!DegAlt)
Muzzle.transform.localRotation = Quaternion.Euler(0, 0, 0);
else
Muzzle.transform.localRotation = Quaternion.Euler(90, 0, 0);
Muzzle.transform.Rotate(Vector3.right * Random.Range (0, Spread));
Muzzle.transform.Rotate(Vector3.left * Random.Range (0, Spread));
Muzzle.transform.Rotate(Vector3.up * Random.Range (0, Spread));
Muzzle.transform.Rotate(Vector3.down * Random.Range (0, Spread));
}

if(SkipTLOF)
LineOfFire = true;
else
LineOfFire = false;

if(SkipLOF){

if(!use2StageFiring)
Firing1();
else
Firing2();

}else{

if (Physics.Raycast (Muzzle.position + Muzzle.forward * RayStart + Muzzle.up * 0.25, Muzzle.forward, hit1, TargetRange, targetLayers)) {

if(!SkipTLOF){

if(!hit1.collider.name.Contains ("TC" + TargetCode))
if(hit1.collider.name.Contains (ConfirmedName) || hit1.collider.name.Contains ("TL" + TargetCode)){
LineOfFire = true;

}else{

if(hit1.collider.name.Contains ("TL")){
if(!hit1.collider.name.Contains ("TL" + TargetCode)){
if(hit1.collider.gameObject.GetComponent(SphereCollider))
hit1.collider.gameObject.GetComponent(SphereCollider).radius = 0.1;
reAssess = true;
}
}else{
if(hit1.collider.name.Contains (ConfirmedName))
LineOfFire = true;
}

if(gunTarget)
if (Physics.Raycast (MuzzleP.position + MuzzleP.forward * RayStart + Muzzle.up * 0.25, MuzzleP.forward, hit1, TargetRange, targetLayers)){
if(!hit1.collider.name.Contains ("DV"))
LineOfFire = false;
//Debug.Log(hit1.collider.name);
}
}

if(hit1.distance < TargetMinRange)
LineOfFire = false;

}else{

if (Physics.Raycast (Muzzle.position + Muzzle.forward * RayStart + Muzzle.up * 0.25, Muzzle.forward, hit1, TargetRange, targetLayers)){

if(hit1.collider.name.Contains ("TC" + TargetCode)){
LineOfFire = false;
}else{
if(hit1.collider.name.Contains ("rok"))
LineOfFire = false;
else
LineOfFire = true;
if(ThisTurretDebug)
Debug.Log("IsLOF " + hit1.collider.name);
}

}

}

}

}

//[TryAgain]=============================================================================================================================
if(reAssess){
if (Physics.Raycast (Muzzle.position + Muzzle.forward * RayStart + Muzzle.up * 0.25, Muzzle.forward, hit1, TargetRange, targetLayers)) {

if(!hit1.collider.name.Contains ("TC" + TargetCode))
if(hit1.collider.name.Contains (ConfirmedName) || hit1.collider.name.Contains ("TL" + TargetCode)){
LineOfFire = true;

}else{

if(hit1.collider.name.Contains ("TL")){
if(!hit1.collider.name.Contains ("TL" + TargetCode)){
if(hit1.collider.gameObject.GetComponent(SphereCollider))
hit1.collider.gameObject.GetComponent(SphereCollider).radius = 0.1;
reAssess = true;
}
}else{
if(hit1.collider.name.Contains (ConfirmedName))
LineOfFire = true;
}

if(gunTarget)
if (Physics.Raycast (MuzzleP.position + MuzzleP.forward * RayStart + Muzzle.up * 0.25, MuzzleP.forward, hit1, TargetRange, targetLayers)){
if(!hit1.collider.name.Contains ("DV"))
LineOfFire = false;
//Debug.Log(hit1.collider.name);
}
}

if(hit1.distance < TargetMinRange)
LineOfFire = false;

}
}

if(LineOfFire)
reAssess = false;

if(UseLOFNum){
if(LineOfFire){
if(LOFNum < 10)
LOFNum += 1;
}else{
if(LOFNum > 0)
LOFNum -= 1;
}

if(LOFNum > 9)
LineOfFire = true;
else
LineOfFire = false;

}

if(LineOfFire && Shots > 0){

if(pauseGiveAI){
pGAIC7.MainGunsCooldown = 10;
pGAIC7.FiringMainGuns = true;
}

if(!use2StageFiring)
Firing1();
else
Firing2();

}

if(!UseShotRegenSpeed)
if(Shots == 0){
Shots = -1;
PauseTime = 0;
}

}

function Firing1 (){

if(gunFireSound){
if(GFSN < 1){
GFSN = 12;
gunFireSound.Play();
gunFireSound.loop = true;
}
}

Shots -= 1;

if(UseShotRegenSpeed)
if(Shots == 0)
RegenTimer = StatRegenTimer;

if(!isLauncher){
if(!ParentTheShot){
Instantiate(Fire1, Muzzle.position, Muzzle.rotation);
}else{
var TheThing = Instantiate(Fire1, Muzzle.position, Muzzle.rotation);
    TheThing.transform.parent = Muzzle.transform;
}
}else{
if(!launchesSeeking){
Instantiate(Fire1, Muzzle1.position, Muzzle1.rotation);
if(UseSequence){
yield WaitForSeconds (SequenceDelay);
Instantiate(Fire1, Muzzle2.position, Muzzle2.rotation);
yield WaitForSeconds (SequenceDelay);
Instantiate(Fire1, Muzzle3.position, Muzzle3.rotation);
yield WaitForSeconds (SequenceDelay);
Instantiate(Fire1, Muzzle4.position, Muzzle4.rotation);
}
}else{
var _theProjectile1 = Instantiate(Fire1, Muzzle1.position, Muzzle1.rotation);
_theProjectile1.transform.GetComponent(MissileScript).target = turretAI.target;
if(UseSequence){
yield WaitForSeconds (SequenceDelay);
var _theProjectile2 = Instantiate(Fire1, Muzzle2.position, Muzzle2.rotation);
_theProjectile2.transform.GetComponent(MissileScript).target = turretAI.target;
yield WaitForSeconds (SequenceDelay);
var _theProjectile3 = Instantiate(Fire1, Muzzle3.position, Muzzle3.rotation);
_theProjectile3.transform.GetComponent(MissileScript).target = turretAI.target;
yield WaitForSeconds (SequenceDelay);
var _theProjectile4 = Instantiate(Fire1, Muzzle4.position, Muzzle4.rotation);
_theProjectile4.transform.GetComponent(MissileScript).target = turretAI.target;
}
}
}

if(DischargedBit1)
    DischargeBits();

if(RecoilAni != null){
    RecoilAni.Stop();
    RecoilAni.Play();
}

}

function Firing2 (){

var TheThing2 = Instantiate(stageFire, Muzzle.position, Muzzle.rotation);
    TheThing2.transform.parent = Muzzle.transform;
    
Shots -= 1;

if(UseShotRegenSpeed)
if(Shots == 0)
RegenTimer = StatRegenTimer;

yield WaitForSeconds (stageInterval);

if(gunFireSound){
if(GFSN < 1){
GFSN = 12;
gunFireSound.Play();
gunFireSound.loop = true;
}
}

if(!isLauncher){
if(!ParentTheShot){
Instantiate(Fire1, Muzzle.position, Muzzle.rotation);
}else{
var TheThing = Instantiate(Fire1, Muzzle.position, Muzzle.rotation);
    TheThing.transform.parent = Muzzle.transform;
}
}else{
if(!launchesSeeking){
Instantiate(Fire1, Muzzle1.position, Muzzle1.rotation);
if(UseSequence){
yield WaitForSeconds (SequenceDelay);
Instantiate(Fire1, Muzzle2.position, Muzzle2.rotation);
yield WaitForSeconds (SequenceDelay);
Instantiate(Fire1, Muzzle3.position, Muzzle3.rotation);
yield WaitForSeconds (SequenceDelay);
Instantiate(Fire1, Muzzle4.position, Muzzle4.rotation);
}
}else{
var _theProjectile1 = Instantiate(Fire1, Muzzle1.position, Muzzle1.rotation);
_theProjectile1.transform.GetComponent(MissileScript).target = turretAI.target;
if(UseSequence){
yield WaitForSeconds (SequenceDelay);
var _theProjectile2 = Instantiate(Fire1, Muzzle2.position, Muzzle2.rotation);
_theProjectile2.transform.GetComponent(MissileScript).target = turretAI.target;
yield WaitForSeconds (SequenceDelay);
var _theProjectile3 = Instantiate(Fire1, Muzzle3.position, Muzzle3.rotation);
_theProjectile3.transform.GetComponent(MissileScript).target = turretAI.target;
yield WaitForSeconds (SequenceDelay);
var _theProjectile4 = Instantiate(Fire1, Muzzle4.position, Muzzle4.rotation);
_theProjectile4.transform.GetComponent(MissileScript).target = turretAI.target;
}
}
}

if(DischargedBit1)
    DischargeBits();

if(RecoilAni != null){
    RecoilAni.Stop();
    RecoilAni.Play();
}

}

function FixedUpdate (){

if(gunFireSound){
if(GFSN > 0){
GFSN -= 1;
}else{
gunFireSound.loop = false;
}
}

if(!UseShotRegenSpeed){
if(Shots == -1){
if(PauseTime < StatPauseTime)
PauseTime += 1;

if(PauseTime == StatPauseTime)
Shots = MaxShots;
}
}else{

if(Shots < MaxShots){
if(RegenTimer > 0)
RegenTimer -= 1;

if(RegenTimer == 0){
RegenTimer = StatRegenTimer;
Shots += 1;
}
}

}

if(HasMovingBits){

if(Shots > 0){
if(MovingBit1.localPosition.y < 0)
MovingBit1.localPosition.y += MB1Speed;
}else{
if(MovingBit1.localPosition.y > -MB1EndValue)
MovingBit1.localPosition.y -= MB1Speed;
}

}

}

function DischargeBits(){

DischargedBit1Model.SetActive (true);
    
yield WaitForSeconds (DischargedBitDelay);

DischargedBit1Model.SetActive (false);

var _SpawnedObject0 = Instantiate(DischargedBit1P, DischargedBit1.position, DischargedBit1.rotation);
    _SpawnedObject0.rigidbody.velocity = DischargedBit1.forward * DischargedBitVelocity * 0.45 + turretRB.velocity * 1;
    _SpawnedObject0.rigidbody.AddTorque(DischargedBit1.right * DischargedBitTorque);

}