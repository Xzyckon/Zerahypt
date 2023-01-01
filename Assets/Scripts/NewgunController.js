 var AimTarget : Transform;
 
 var thisTransform : Transform;
 
 var thisRB : Rigidbody;
 
 var SecondaryGun : boolean;
 
 var SecondaryGunITF : Transform;
 
 var SecondaryGunTF : Transform;
 var SecondaryGunTF2 : Transform;
 var SecondaryGunTF3 : Transform;
 var SecondaryGunTF4 : Transform;
 
 var SecondaryGunTFActive : boolean;
 var SecondaryGunTF2Active : boolean;
 var SecondaryGunTF3Active : boolean;
 var SecondaryGunTF4Active : boolean;
 
 var alsoHasSecondGun : boolean;
 var alsoHasThirdGun : boolean;
 
 var hasMultipleGuns : boolean;
 
 var gunUsed = 0;
 
 var gun0HealthScript : SubDamage;
 var gun1HealthScript : SubDamage;
 var gun2HealthScript : SubDamage;
 
 var IsRetractable : boolean;
 
 var SimpleHinge : boolean;
 var hinge : HingeJoint;
 var hinge2 : HingeJoint;
 
 var IsBeam : boolean;
 
 var BeamEffect : GameObject;
 var BeamLongEffect : GameObject;
 var BeamLongEffect2 : GameObject;
 var BeamStartEffect : GameObject;
 var BeamOffEffect : GameObject;
 var BeamAudio : GameObject;
 var BeamSection : GameObject;
 
 var FireUsingMouse : boolean;
 
 var SpeedyShooter : boolean;
 
 var UsingRecoilSec : boolean;
 
 var UsingSoundSec : boolean;
 var UsingSoundPri : boolean;
 var PrimarySound : AudioClip;
 var SecondarySound : AudioClip;
 
 var CanBeObscured : boolean;
 var UseAngles : boolean;
 var UseLayers : boolean;
 
 var Pivot : Transform;
 
 var PivMax = 40;
 var PivMin = 320;
 
 var ForePauseTime : float = 0;
 var ForePauseTimeSec : float = 0;
 var ForePauseSound : GameObject;
 var ForePauseSoundSec : GameObject;
 var SpinAcceleration : float = 0.2;
 var SpinAccelerationSec : float = 0.2;
 var BarrelSpinSpeed : float = 0;
 var BarrelSpinSpeedSec : float = 0;
 var StaticSpinSpeed : float = 0;
 var StaticSpinSpeedSec : float = 0;
 
 var AmmoBay : GameObject;
 var AmmoBay2 : GameObject;
 var AmmoBaySec : GameObject;
 
 var AmmoBayScript : AmmoBay;
 var AmmoBayScript2 : AmmoBay;
 var AmmoBaySecScript : AmmoBay;
 
 var Ammunition : GameObject;
 var SecondaryAmmunition : GameObject;
 
 var AmmunitionG2 : GameObject;
 var AmmunitionG3 : GameObject;
 
 var FlarePrefab : GameObject;
 var SecondaryFlarePrefab : GameObject;
 
 var FlareLocation : Transform;
 var SecondaryFlareLocation : Transform;
 
 var BulletLocation : Transform;
 var BulletLocationG2 : Transform;
 var BulletLocationG3 : Transform;
 var BulletLocationVolley1 : Transform;
 var BulletLocationCol : SphereCollider;
 var BulletLocationColG2 : SphereCollider;
 var BulletLocationColG3 : SphereCollider;
 var BulletLocationColVolley1 : SphereCollider;
 var SecondaryBulletLocation : Transform;
 var SecondaryBulletLocation2 : Transform;
 var SecondaryBulletLocation3 : Transform;
 var SecondaryBulletLocation4 : Transform;
 var SecondaryLoopSoundLocation : Transform;
 
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
 
 var ShockwaveLocation : Transform;
 var ShockwaveLocationG2 : Transform;
 var ShockwaveLocationG3 : Transform;
 var ShockwaveLocationVolley1 : Transform;
 var RecoilAnimationObject : GameObject;
 var RecoilAnimationName : String = "Name";
 
 var RecoilAnimationObjectG2 : GameObject;
 var RecoilAnimationNameG2 : String = "Name";
 
 var RecoilAnimationObjectG3 : GameObject;
 var RecoilAnimationNameG3 : String = "Name";
 
 var RecoilAnimationObjectVolley1 : GameObject;
 var RecoilAnimationNameVolley1 : String = "Name";
 
 var UseRecoilCurve : boolean;
 var RecoilCurve : AnimationCurve = new AnimationCurve();
 
 var Gun1Model : Transform;
 var Gun2Model : Transform;
 
 var G1RN = 0;
 var G2RN = 0;
 
 var Gun1RecoFire : boolean;
 var Gun2RecoFire : boolean;
 
 var HatchAniObject : GameObject;
 var Closing : String;
 var Opening : String;
 
 var GunForward : String;
 var GunBack : String;
 
 var ActivateSound : GameObject;
 var DeactivateSound : GameObject;
 
 var useAudioPri : boolean;
 var useAudioSec : boolean;
 var canLoop : boolean;
 var canLoopSec : boolean;
 var gSound : AudioSource;
 var gSoundSec : AudioSource;
 
 var useAudioPrefabs : boolean;
 
 var gSoundPref : GameObject;
 var gSoundSecPref : GameObject;
 
 var gSoundPrefInst : GameObject;
 var gSoundSecPrefInst : GameObject;
 
 var Aimer : TurretAim;
 var Aimer2 : TurretAim;
 
 var GunBase : GameObject;
 var NewGunBase : GameObject;
 
 var BarrelTF : Transform;
 var BarrelSecTF : Transform;
 
 var HullShock : boolean;
 var HullShockForce = 1;
 var HullShockForceDelay : float = 0.05;
 var HullShockSecForce = 1;
 
 var Spread : float = 0;
 
 var ShotNum = 1;
 
 var Volley : boolean;
 var VolleyTime : float = 0.2;
 
 var ContinuousBeam : boolean;
 var Beaming : boolean;
 
 var Broken : boolean;
 var SecBroken : boolean;
 var VolleyBroken : boolean;
 var CanFire : boolean = true;
 var CanFireSec : boolean = true;
 var CanFireG2 : boolean = true;
 var CanFireG3 : boolean = true;
 var Obscured : boolean;
 var IsShooting : boolean;
 var IsAnimating : boolean;
 var IsOut : boolean;
 var isInside : boolean;
 var GunCooldown : float = 3;
 var GunCooldownG2 : float = 3;
 var GunCooldownG3 : float = 3;
 var SecondaryGunCooldown : float = 3;
 private var xStartTime: float;
 private var xStartTimeSec: float;
 
 private var xStartTimeG2: float;
 private var xStartTimeG3: float;
 
 private var gunTimer : float;
 private var gunTimerSec : float;
 
 private var gunTimerG2 : float;
 private var gunTimerG3 : float;
 
 var Locked : boolean;
 var LockedSec : boolean;
 
 var maxVolume: float = 0.5;
 var incrementValue: float = 0.05;
 var decrementValue: float = 0.1;
 private var state: String;
 
 var targetLayers : LayerMask;

InvokeRepeating("Regenerator", 0.17, 0.17);

InvokeRepeating("SectionShot", 0.05, 0.05);

function Start () {

CanFireSec = true;

if(IsRetractable){
Aimer.Activated = false;
if(Aimer2)
Aimer2.Activated = false;

if(!IsOut)
CanFire = false;
}

StaticSpinSpeed = BarrelSpinSpeed;
StaticSpinSpeedSec = BarrelSpinSpeedSec;

BulletLocationCol = BulletLocation.collider;
BulletLocationCol.enabled = false;

if(BulletLocationColVolley1){
BulletLocationColVolley1 = BulletLocation.collider;
BulletLocationColVolley1.enabled = false;
}

AimTarget = GameObject.Find("AimPointTarget").gameObject.transform;

if(AmmoBay)
AmmoBayScript = AmmoBay.GetComponent("AmmoBay");

if(AmmoBaySec)
AmmoBaySecScript = AmmoBaySec.GetComponent("AmmoBay");
}

private var NewRotation : Quaternion;





































function Update () {

if(WorldInformation.playerCar == this.gameObject.name){

if(CanBeObscured){

Obscured = false;

if(UseAngles)
if(Pivot.localEulerAngles.z < PivMax || Pivot.localEulerAngles.z > PivMin)
Obscured = true;

}

if(hasMultipleGuns){

if(Input.GetKeyDown("1")){
gunUsed = 0;
gun0HealthScript.Tick();
FurtherActionScript.instance.UsingTurret1 = true;
FurtherActionScript.instance.ShowText();
}

if(Input.GetKeyDown("2")){
gunUsed = 1;
gun1HealthScript.Tick();
FurtherActionScript.instance.UsingTurret2 = true;
FurtherActionScript.instance.ShowText();
}

if(Input.GetKeyDown("3")){
gunUsed = 2;
gun2HealthScript.Tick();
FurtherActionScript.instance.UsingTurret3 = true;
FurtherActionScript.instance.ShowText();
}

}

if(Broken){
if(canLoop)
gSound.loop = false;
if(canLoopSec){
if(!useAudioPrefabs){
gSoundSec.loop = false;
}else{
if(gSoundSecPrefInst){
gSoundSecPrefInst.audio.loop = false;
gSoundSecPrefInst = null;
}
}
}
}

isInside = true;

if(IsBeam){

if(!Broken){

if(!CameraScript.InInterface){
if(Mathf.Abs(xStartTime - Time.time) >= gunTimer && CanFire){
if(Input.GetKeyDown("4") && FireUsingMouse == false || Input.GetMouseButtonDown(0) && FireUsingMouse == true){
BeamEffect.SetActive (true);
BeamLongEffect.particleSystem.enableEmission = true;
BeamLongEffect2.particleSystem.enableEmission = true;
BeamShoot();
Beaming = true;
}

if(Input.GetKeyUp("4") && FireUsingMouse == false || Input.GetMouseButtonUp(0) && FireUsingMouse == true){

xStartTime = Time.time;
gunTimer = 0.5;

BeamEffect.SetActive (false);
BeamLongEffect.particleSystem.enableEmission = false;
BeamLongEffect2.particleSystem.enableEmission = false;
Beaming = false;
var TheThingie = Instantiate(BeamOffEffect, BeamAudio.transform.position, BeamAudio.transform.rotation);
    TheThingie.transform.parent = transform;
}
}
}

  if(Beaming == true)
		state = "increment";
	if(Beaming == false)
		state = "decrement";
	if(state == "increment"){
		increment();
	} else if(state == "decrement") {
		decrement();
  }
}
}else{

if(!CameraScript.InInterface){

if(FireUsingMouse){

if(useAudioPri)
if(!gSound.isPlaying)
if(Input.GetMouseButtonDown(0))
if(CanFire)
gSound.Stop();

if(Input.GetMouseButton(0)){

if(ForePauseTime > 0.1)
if(Input.GetMouseButtonDown(0)){
BarrelSpinSpeed = 0.2;
CanFire = false;
ForePause();
}

if(BarrelSpinSpeed > 0.1)
BarrelTF.localEulerAngles.y += BarrelSpinSpeed;

if(gunUsed == 0)
Shoot();

if(hasMultipleGuns){
if(gunUsed == 1)
ShootG2();
if(gunUsed == 2)
ShootG3();
}
}else{
if(useAudioPri){

if(canLoop)
if(gSound.isPlaying)
gSound.loop = false;

if(canLoopSec){
gSoundSec.loop = false;
if(gSoundSecPrefInst){
gSoundSecPrefInst.audio.loop = false;
gSoundSecPrefInst = null;
}
}

}
}
}else{

if(useAudioPri)
if(!gSound.isPlaying)
if(Input.GetKeyDown("4"))
if(CanFire)
gSound.Stop();

if(Input.GetKey("4")){

if(ForePauseTime > 0.1)
if(Input.GetKeyDown("4")){
BarrelSpinSpeed = 0.2;
CanFire = false;
ForePause();
}

if(BarrelSpinSpeed > 0.1)
BarrelTF.localEulerAngles.y += BarrelSpinSpeed;

if(gunUsed == 0)
Shoot();

if(hasMultipleGuns){
if(gunUsed == 1)
ShootG2();
if(gunUsed == 2)
ShootG3();
}
}else{
if(useAudioPri){

if(canLoop)
if(gSound.isPlaying)
gSound.loop = false;

if(canLoopSec){
gSoundSec.loop = false;
if(gSoundSecPrefInst){
gSoundSecPrefInst.audio.loop = false;
gSoundSecPrefInst = null;
}
}

}
}
}

if(SecondaryGun == true){

if(useAudioSec)
if(!useAudioPrefabs){
if(!gSoundSec.isPlaying)
if(Input.GetKeyDown("4"))
if(CanFireSec)
gSoundSec.Stop();
}else{
if(Input.GetKeyUp("4"))
if(gSoundSecPrefInst){
gSoundSecPrefInst.audio.loop = false;
gSoundSecPrefInst = null;
}
}

if(Input.GetKey("4")){

if(ForePauseTimeSec > 0.1)
if(Input.GetKeyDown("4")){
BarrelSpinSpeedSec = 0.2;
CanFire = false;
ForePauseSec();
}

if(BarrelSpinSpeedSec > 0.1)
BarrelSecTF.localEulerAngles.y += BarrelSpinSpeedSec;

Shoot2();
}else{
if(useAudioSec){

if(canLoop)
if(gSound.isPlaying)
gSound.loop = false;

if(canLoopSec)
if(!useAudioPrefabs)
if(gSoundSec.isPlaying)
gSoundSec.loop = false;

}
}


}

if(IsRetractable)
if(Input.GetKeyDown("0") && !IsAnimating && !IsShooting)
GunBoolean();

}

}

}else{
isInside = false;
if(canLoop)
gSound.loop = false;
if(canLoopSec){
if(!useAudioPrefabs)
gSoundSec.loop = false;
if(gSoundSecPrefInst){
gSoundSecPrefInst.audio.loop = false;
gSoundSecPrefInst = null;
}
}
}
}














































function FixedUpdate () {

if(SecondaryGunITF){

SecondaryGunTFActive = false;
SecondaryGunTF2Active = false;
SecondaryGunTF3Active = false;
SecondaryGunTF4Active = false;

CanFireSec = false;

if(Input.GetMouseButton(1)){

if(SecondaryGunTF){
if(SecondaryGunITF.localEulerAngles.z > 270 && SecondaryGunITF.localEulerAngles.z < 320){
NewRotation = Quaternion.LookRotation(AimTarget.position - SecondaryGunTF.position);
SecondaryGunTF.rotation = Quaternion.RotateTowards(SecondaryGunTF.rotation, NewRotation, Time.deltaTime * 100);
SecondaryGunTFActive = true;
if(AmmoBaySecScript.PrimaryAmmunition > 0)
CanFireSec = true;
}
}

if(SecondaryGunTF2){
if(SecondaryGunITF.localEulerAngles.z > 40 && SecondaryGunITF.localEulerAngles.z < 90){
NewRotation = Quaternion.LookRotation(AimTarget.position - SecondaryGunTF2.position);
SecondaryGunTF2.rotation = Quaternion.RotateTowards(SecondaryGunTF2.rotation, NewRotation, Time.deltaTime * 100);
SecondaryGunTF2Active = true;
if(AmmoBaySecScript.PrimaryAmmunition > 0)
CanFireSec = true;
}
}

if(SecondaryGunTF3){
if(SecondaryGunITF.localEulerAngles.z > 220 && SecondaryGunITF.localEulerAngles.z < 270){
NewRotation = Quaternion.LookRotation(AimTarget.position - SecondaryGunTF3.position);
SecondaryGunTF3.rotation = Quaternion.RotateTowards(SecondaryGunTF3.rotation, NewRotation, Time.deltaTime * 100);
SecondaryGunTF3Active = true;
if(AmmoBaySecScript.PrimaryAmmunition > 0)
CanFireSec = true;
}
}

if(SecondaryGunTF4){
if(SecondaryGunITF.localEulerAngles.z > 90 && SecondaryGunITF.localEulerAngles.z < 140){
NewRotation = Quaternion.LookRotation(AimTarget.position - SecondaryGunTF4.position);
SecondaryGunTF4.rotation = Quaternion.RotateTowards(SecondaryGunTF4.rotation, NewRotation, Time.deltaTime * 100);
SecondaryGunTF4Active = true;
if(AmmoBaySecScript.PrimaryAmmunition > 0)
CanFireSec = true;
}
}
}
}

if(isInside){
if(BarrelSpinSpeed > 0.1){

Proddy1 = 180 - BarrelSpinSpeed * 2;

Proddy2 = 360 - BarrelSpinSpeed * 2;

if(CameraScript.InInterface == false && CanFire){

if(FireUsingMouse){
if(Input.GetMouseButton(0)){

Locked = false;

if(BarrelSpinSpeed < StaticSpinSpeed)
BarrelSpinSpeed += SpinAcceleration;
BarrelTF.localEulerAngles.y += BarrelSpinSpeed;

}else{

if(BarrelSpinSpeed > SpinAcceleration * 10)
BarrelSpinSpeed -= SpinAcceleration;
else
BarrelSpinSpeed = SpinAcceleration * 10;

if(BarrelSpinSpeed > SpinAcceleration * 10){
BarrelTF.localEulerAngles.y += BarrelSpinSpeed;
}else{
if(!Locked){

if(BarrelTF.localEulerAngles.y < 180){
if(BarrelTF.localEulerAngles.y > Proddy1){
BarrelTF.localEulerAngles.y = 180;
Locked = true;
}

if(!Locked)
BarrelTF.localEulerAngles.y += BarrelSpinSpeed;
}

if(BarrelTF.localEulerAngles.y > 180){
if(BarrelTF.localEulerAngles.y > Proddy2){
BarrelTF.localEulerAngles.y = 0;
Locked = true;
}

if(!Locked)
BarrelTF.localEulerAngles.y += BarrelSpinSpeed;
}

}

}

}
}else{
if(Input.GetKey("4")){

Locked = false;

if(BarrelSpinSpeed < StaticSpinSpeed)
BarrelSpinSpeed += SpinAcceleration;
BarrelTF.localEulerAngles.y += BarrelSpinSpeed;

}else{

if(BarrelSpinSpeed > SpinAcceleration * 10)
BarrelSpinSpeed -= SpinAcceleration;
else
BarrelSpinSpeed = SpinAcceleration * 10;

if(BarrelSpinSpeed > SpinAcceleration * 10){
BarrelTF.localEulerAngles.y += BarrelSpinSpeed;
}else{
if(!Locked){

if(BarrelTF.localEulerAngles.y < 180){
if(BarrelTF.localEulerAngles.y > Proddy1){
BarrelTF.localEulerAngles.y = 180;
Locked = true;
}

if(!Locked)
BarrelTF.localEulerAngles.y += BarrelSpinSpeed;
}

if(BarrelTF.localEulerAngles.y > 180){
if(BarrelTF.localEulerAngles.y > Proddy2){
BarrelTF.localEulerAngles.y = 0;
Locked = true;
}

if(!Locked)
BarrelTF.localEulerAngles.y += BarrelSpinSpeed;
}

}

}

}
}

}else{

if(BarrelSpinSpeed > SpinAcceleration * 10)
BarrelSpinSpeed -= SpinAcceleration;
else
BarrelSpinSpeed = SpinAcceleration * 10;

if(BarrelSpinSpeed > SpinAcceleration * 10){
BarrelTF.localEulerAngles.y += BarrelSpinSpeed;
}else{
if(!Locked){

if(BarrelTF.localEulerAngles.y < 180){
if(BarrelTF.localEulerAngles.y > Proddy1){
BarrelTF.localEulerAngles.y = 180;
Locked = true;
}

if(!Locked)
BarrelTF.localEulerAngles.y += BarrelSpinSpeed;
}

if(BarrelTF.localEulerAngles.y > 180){
if(BarrelTF.localEulerAngles.y > Proddy2){
BarrelTF.localEulerAngles.y = 0;
Locked = true;
}

if(!Locked)
BarrelTF.localEulerAngles.y += BarrelSpinSpeed;
}

}
}
}
}

if(BarrelSpinSpeedSec > 0.1){

Proddy1 = 180 - BarrelSpinSpeedSec * 2;

Proddy2 = 360 - BarrelSpinSpeedSec * 2;

if(CameraScript.InInterface == false && CanFire){

if(Input.GetKey("4")){

LockedSec = false;

if(BarrelSpinSpeedSec < StaticSpinSpeedSec)
BarrelSpinSpeedSec += SpinAccelerationSec;
BarrelSecTF.localEulerAngles.y += BarrelSpinSpeedSec;

}else{

if(BarrelSpinSpeedSec > SpinAccelerationSec * 10)
BarrelSpinSpeedSec -= SpinAccelerationSec;
else
BarrelSpinSpeedSec = SpinAccelerationSec * 10;

if(BarrelSpinSpeedSec > SpinAccelerationSec * 10){
BarrelSecTF.localEulerAngles.y += BarrelSpinSpeedSec;
}else{
if(!LockedSec){

if(BarrelSecTF.localEulerAngles.y < 180){
if(BarrelSecTF.localEulerAngles.y > Proddy1){
BarrelSecTF.localEulerAngles.y = 180;
LockedSec = true;
}

if(!LockedSec)
BarrelSecTF.localEulerAngles.y += BarrelSpinSpeedSec;
}

if(BarrelSecTF.localEulerAngles.y > 180){
if(BarrelSecTF.localEulerAngles.y > Proddy2){
BarrelSecTF.localEulerAngles.y = 0;
LockedSec = true;
}

if(!LockedSec)
BarrelSecTF.localEulerAngles.y += BarrelSpinSpeedSec;
}

}

}

}


}else{

if(BarrelSpinSpeedSec > SpinAccelerationSec * 10)
BarrelSpinSpeedSec -= SpinAccelerationSec;
else
BarrelSpinSpeedSec = SpinAccelerationSec * 10;

if(BarrelSpinSpeedSec > SpinAccelerationSec * 10){
BarrelSecTF.localEulerAngles.y += BarrelSpinSpeedSec;
}else{
if(!LockedSec){

if(BarrelSecTF.localEulerAngles.y < 180){
if(BarrelSecTF.localEulerAngles.y > Proddy1){
BarrelSecTF.localEulerAngles.y = 180;
LockedSec = true;
}

if(!LockedSec)
BarrelSecTF.localEulerAngles.y += BarrelSpinSpeedSec;
}

if(BarrelSecTF.localEulerAngles.y > 180){
if(BarrelSecTF.localEulerAngles.y > Proddy2){
BarrelSecTF.localEulerAngles.y = 0;
LockedSec = true;
}

if(!LockedSec)
BarrelSecTF.localEulerAngles.y += BarrelSpinSpeedSec;
}

}
}
}
}


}



if(HasMovingBits){

if(Mathf.Abs(xStartTime - Time.time) >= gunTimer){
if(MovingBit1.localPosition.y < 0)
MovingBit1.localPosition.y += MB1Speed;
}else{
if(MovingBit1.localPosition.y > -MB1EndValue)
MovingBit1.localPosition.y -= MB1Speed;
}

}

if(UseRecoilCurve){
if(Gun1RecoFire){
G1RN += 1;
if(G1RN > 40){
G1RN = 0;
Gun1RecoFire = false;
}
Gun1Model.localPosition.y = RecoilCurve.Evaluate(G1RN);
}
if(Gun2RecoFire){
G2RN += 1;
if(G2RN > 40){
G2RN = 0;
Gun2RecoFire = false;
}
Gun2Model.localPosition.y = RecoilCurve.Evaluate(G2RN);
}
}

}





















function ForePause(){
var TheThing0 = Instantiate(ForePauseSound, BulletLocation.position, BulletLocation.rotation);
    TheThing0.transform.parent = BulletLocation;
yield WaitForSeconds (ForePauseTime);
if(FireUsingMouse){
if(Input.GetMouseButton(0)){
if(audio.isPlaying)
audio.Stop();
if(AmmoBayScript.PrimaryAmmunition > 0)
CanFire = true;
}
}else{
if(Input.GetKey("4")){
if(audio.isPlaying)
audio.Stop();
if(AmmoBayScript.PrimaryAmmunition > 0)
CanFire = true;
}
}
}

function ForePauseSec(){
var TheThing01 = Instantiate(ForePauseSoundSec, SecondaryBulletLocation.position, SecondaryBulletLocation.rotation);
    TheThing01.transform.parent = SecondaryBulletLocation;
yield WaitForSeconds (ForePauseTimeSec);

if(Input.GetKey("4")){
if(audio.isPlaying)
audio.Stop();
if(AmmoBaySecScript.PrimaryAmmunition > 0)
CanFireSec = true;
}

}



































function GunBoolean () {

if(!SimpleHinge){

if(!IsAnimating && !IsOut){
Animating();
HatchAniObject.animation.Play(Opening);

yield WaitForSeconds (0.2);

Cjoint = NewGunBase.GetComponent("ConfigurableJoint");
Cjoint.targetPosition = Vector3(0,0,0);

yield WaitForSeconds (0.6);
ActivateSound.audio.Play();
hinge.spring.targetPosition = 0;

yield WaitForSeconds (0.6);

RecoilAnimationObject.animation.Play(GunForward);
hinge.spring.spring = 0;

Aimer.Activated = true;
hinge.limits.max = -15;
yield WaitForSeconds (0.05);
hinge.limits.max = -10;
yield WaitForSeconds (0.05);
hinge.limits.max = -5;
yield WaitForSeconds (0.05);
hinge.limits.max = 0;
yield WaitForSeconds (0.05);

IsOut = true;
CanFire = true;
}

if(!IsAnimating && IsOut){
Animating();

IsOut = false;
CanFire = false;
hinge.limits.max = -90;
Aimer.Activated = false;

RecoilAnimationObject.animation.Play(GunBack);
DeactivateSound.audio.Play();

yield WaitForSeconds (0.4);

hinge.spring.spring = 0.3;
hinge.spring.targetPosition = -90;

yield WaitForSeconds (0.8);

Cjoint = NewGunBase.GetComponent("ConfigurableJoint");
Cjoint.targetPosition = Vector3(0,0,-3);

HatchAniObject.animation.Play(Closing);
}
}else{

if(!IsOut){
IsOut = true;
hinge.spring.targetPosition = -90;
if(hinge2)
hinge2.spring.targetPosition = -90;
yield WaitForSeconds (1);
Aimer.Activated = true;
if(Aimer2)
Aimer2.Activated = true;
CanFire = true;
}else{
IsOut = false;
hinge.spring.targetPosition = 0;
if(hinge2)
hinge2.spring.targetPosition = 0;
Aimer.Activated = false;
if(Aimer2)
Aimer2.Activated = false;
CanFire = false;
}

}
}






























function Animating () {
IsAnimating = true;
yield WaitForSeconds (3);
IsAnimating = false;
}
























function Shooting () {
IsShooting = true;
yield WaitForSeconds (3);
IsShooting = false;
}
























function decrement () {
	if(BeamAudio.audio.volume > 0){
		BeamAudio.audio.volume -= decrementValue;
	} else {
		BeamAudio.audio.Stop();
		state = "";
	}
}

function increment () {
	if(!BeamAudio.audio.isPlaying)
		BeamAudio.audio.Play();
	if(BeamAudio.audio.volume < maxVolume)
		BeamAudio.audio.volume += incrementValue;
	else
		state = "";
}





























function BeamShoot () {
var TheThing = Instantiate(BeamStartEffect, BeamAudio.transform.position, BeamAudio.transform.rotation);
    TheThing.transform.parent = transform;
    
if(HullShock)
ShockwaveLocation.rigidbody.AddForce(ShockwaveLocation.transform.up * HullShockForce);
    
if(RecoilAnimationObject != null)
RecoilAnimationObject.animation.Play(RecoilAnimationName);
}
































function Shoot () {

var hit : RaycastHit;

if(Mathf.Abs(xStartTime - Time.time) >= gunTimer && CanFire){

if(!Broken){

if(CanBeObscured && !UseAngles){
Obscured = false;
if(Physics.Raycast(BulletLocation.position, BulletLocation.forward, hit, Mathf.Infinity, targetLayers)) {
if(hit.collider.name.Contains ("DV"))
Obscured = true;
//Debug.Log(hit.collider.name);
}
}

if(!Obscured){
Shooting();
gunShot();

if(useAudioPri){
if(!canLoop){
gSound.Play();
}else{
gSound.loop = true;
if(!gSound.isPlaying)
gSound.Play();
}
}
}

}

xStartTime = Time.time;
gunTimer = GunCooldown;

if(Volley){
if(!VolleyBroken){
Obscured = false;
if(Physics.Raycast(BulletLocationVolley1.position, BulletLocationVolley1.forward, hit, Mathf.Infinity, targetLayers)) {
if(hit.collider.name.Contains ("DV")){
Obscured = true;
return;
}
}
yield WaitForSeconds (VolleyTime);
if(CanBeObscured && !UseAngles){
}
if(!Obscured)
gunShotVolley1();
}
}
}







if(!CanFire){
if(useAudioPri){
if(canLoop){
if(gSound.isPlaying)
gSound.loop = false;
}
}
}
}

function ShootG2 () {
if(Mathf.Abs(xStartTimeG2 - Time.time) >= gunTimerG2 && CanFireG2 && !Obscured){
if(!Broken){
xStartTimeG2 = Time.time;
Shooting();
gunTimerG2 = GunCooldownG2;
gunShotG2();

if(useAudioPri){
if(!canLoop){
gSound.Play();
}else{
gSound.loop = true;
if(!gSound.isPlaying)
gSound.Play();
}
}

}

}
if(!CanFire){
if(useAudioPri){
if(canLoop){
if(gSound.isPlaying)
gSound.loop = false;
}
}
}
}

function ShootG3 () {
if(Mathf.Abs(xStartTimeG3 - Time.time) >= gunTimerG3 && CanFireG3 && !Obscured){
if(!Broken){
xStartTimeG3 = Time.time;
Shooting();
gunTimerG3 = GunCooldownG3;
gunShotG3();

if(useAudioPri){
if(!canLoop){
gSound.Play();
}else{
gSound.loop = true;
if(!gSound.isPlaying)
gSound.Play();
}
}
}

}
if(!CanFire){
if(useAudioPri){
if(canLoop){
if(gSound.isPlaying)
gSound.loop = false;
}
}
}
}

function Shoot2 () {
if(CanFireSec){
if(Mathf.Abs(xStartTimeSec - Time.time) >= gunTimerSec && !Obscured){

if(!SecBroken){

xStartTimeSec = Time.time;
gunTimerSec = SecondaryGunCooldown;

if(useAudioSec){
if(!canLoopSec){
gSoundSec.Play();
}else{
if(!useAudioPrefabs){
gSoundSec.loop = true;
if(!gSoundSec.isPlaying)
gSoundSec.Play();
}else{
if(!gSoundSecPrefInst){
gSoundSecPrefInst = Instantiate(gSoundSecPref, SecondaryLoopSoundLocation.position, SecondaryLoopSoundLocation.rotation);
gSoundSecPrefInst.transform.parent = SecondaryLoopSoundLocation;
gSoundSecPrefInst.audio.loop = true;
if(!gSoundSecPrefInst.audio.isPlaying)
gSoundSecPrefInst.audio.Play();
}
}
}
}

gunShot2();
}
}

}else{
if(useAudioSec){
if(canLoopSec){
if(!useAudioPrefabs){
if(gSoundSec.isPlaying)
gSoundSec.loop = false;
}else{
if(gSoundSecPrefInst){
gSoundSecPrefInst.audio.loop = false;
gSoundSecPrefInst = null;
}
}
}
}

}
}





function gunShot () {
if(Spread > 0){
BulletLocation.transform.localRotation = Quaternion.Euler(90, 0, Random.Range (-360, 360));
BulletLocation.transform.Rotate(Vector3.right * Random.Range (0, Spread));
BulletLocation.transform.Rotate(Vector3.left * Random.Range (0, Spread));
}
    
    var TheThang = Instantiate(Ammunition, BulletLocation.position, BulletLocation.rotation);
    TheThang.transform.parent = BulletLocation;
    
    if(FlarePrefab){
    var TheThang2 = Instantiate(FlarePrefab, FlareLocation.position, FlareLocation.rotation);
    TheThang2.transform.parent = BulletLocation;
    }
    
    if(UsingSoundPri)
    FlareLocation.gameObject.audio.PlayOneShot(PrimarySound);
    
    if(RecoilAnimationObject != null){
    RecoilAnimationObject.animation.Stop();
    RecoilAnimationObject.animation.Play(RecoilAnimationName + "");
    }
    
    if(DischargedBit1)
    DischargeBits();
   
    if(AmmoBayScript)
    AmmoBayScript.ExpendedRound(ShotNum);
    
    Gun1RecoFire = true;
    
    yield WaitForSeconds (HullShockForceDelay);
    
    if(HullShock)
    ShockwaveLocation.rigidbody.AddForce(ShockwaveLocation.transform.up * HullShockForce);
}

function gunShotG2 () {
if(Spread > 0){
BulletLocationG2.transform.localRotation = Quaternion.Euler(90, 0, Random.Range (-360, 360));
BulletLocationG2.transform.Rotate(Vector3.right * Random.Range (0, Spread));
BulletLocationG2.transform.Rotate(Vector3.left * Random.Range (0, Spread));
}

    if(HullShock)
    ShockwaveLocationG2.rigidbody.AddForce(ShockwaveLocationG2.transform.up * HullShockForce);
    
    var TheThangG2 = Instantiate(AmmunitionG2, BulletLocationG2.position, BulletLocationG2.rotation);
    TheThangG2.transform.parent = BulletLocationG2;
    
    if(FlarePrefab){
    var TheThang2G2 = Instantiate(FlarePrefab, FlareLocation.position, FlareLocation.rotation);
    TheThang2G2.transform.parent = BulletLocation;
    }
    
    if(UsingSoundPri)
    FlareLocation.gameObject.audio.PlayOneShot(PrimarySound);
    
    if(RecoilAnimationObject != null){
    RecoilAnimationObjectG2.animation.Stop();
    RecoilAnimationObjectG2.animation.Play(RecoilAnimationNameG2 + "");
    }
    
    if(AmmoBayScript2)
    AmmoBayScript2.ExpendedRound(ShotNum);
}

function gunShotG3 () {
if(Spread > 0){
BulletLocationG3.transform.localRotation = Quaternion.Euler(90, 0, Random.Range (-360, 360));
BulletLocationG3.transform.Rotate(Vector3.right * Random.Range (0, Spread));
BulletLocationG3.transform.Rotate(Vector3.left * Random.Range (0, Spread));
}

    if(HullShock)
    ShockwaveLocationG3.rigidbody.AddForce(ShockwaveLocationG3.transform.up * HullShockForce);
    
    var TheThangG3 = Instantiate(AmmunitionG3, BulletLocationG3.position, BulletLocationG3.rotation);
    TheThangG3.transform.parent = BulletLocationG3;
    
    if(FlarePrefab){
    var TheThang2G2 = Instantiate(FlarePrefab, FlareLocation.position, FlareLocation.rotation);
    TheThang2G2.transform.parent = BulletLocation;
    }
    
    if(UsingSoundPri)
    FlareLocation.gameObject.audio.PlayOneShot(PrimarySound);
    
    if(RecoilAnimationObject != null){
    RecoilAnimationObjectG3.animation.Stop();
    RecoilAnimationObjectG3.animation.Play(RecoilAnimationNameG3 + "");
    }
    
    if(AmmoBayScript2)
    AmmoBayScript2.ExpendedRound(ShotNum);
}

function gunShotVolley1 () {
if(Spread > 0){
BulletLocationVolley1.transform.localRotation = Quaternion.Euler(90, 0, Random.Range (-360, 360));
BulletLocationVolley1.transform.Rotate(Vector3.right * Random.Range (0, Spread));
BulletLocationVolley1.transform.Rotate(Vector3.left * Random.Range (0, Spread));
}

    if(HullShock)
    ShockwaveLocationVolley1.rigidbody.AddForce(ShockwaveLocationVolley1.transform.up * HullShockForce);
    
    var TheThangV1 = Instantiate(Ammunition, BulletLocationVolley1.position, BulletLocationVolley1.rotation);
    TheThangV1.transform.parent = BulletLocationVolley1;
    
    if(FlarePrefab){
    
    }
    
    if(UsingSoundPri)
    BulletLocationVolley1.gameObject.audio.PlayOneShot(PrimarySound);
    
    if(RecoilAnimationObjectVolley1 != null){
    RecoilAnimationObjectVolley1.animation.Stop();
    RecoilAnimationObjectVolley1.animation.Play(RecoilAnimationNameVolley1 + "");
    }
    
    if(AmmoBayScript)
    AmmoBayScript.ExpendedRound(ShotNum);
    
    Gun2RecoFire = true;
}

function gunShot2 () {

if(!SecondaryGunITF){
    
    if(HullShock)
    ShockwaveLocation.rigidbody.AddForce(ShockwaveLocation.transform.up * HullShockSecForce);
    
    var TheThang0 = Instantiate(SecondaryAmmunition, SecondaryBulletLocation.position, SecondaryBulletLocation.rotation);
    TheThang0.transform.parent = SecondaryBulletLocation;
    
    if(SecondaryFlarePrefab){
    var TheThang1 = Instantiate(SecondaryFlarePrefab, SecondaryFlareLocation.position, SecondaryFlareLocation.rotation);
    TheThang1.transform.parent = SecondaryBulletLocation;
    }
    
    if(UsingSoundSec)
    SecondaryFlareLocation.gameObject.audio.PlayOneShot(SecondarySound);
    
    if(UsingRecoilSec)
    if(RecoilAnimationObject != null){
    RecoilAnimationObject.animation.Stop();
    RecoilAnimationObject.animation.Play(RecoilAnimationName + "");
    }
    
    AmmoBaySecScript.ExpendedRound(ShotNum);
    
    }else{
    
if(SecondaryGunTF)
if(SecondaryGunTFActive){
if(HullShock)
    ShockwaveLocation.rigidbody.AddForce(ShockwaveLocation.transform.up * HullShockSecForce);
    
    var TheThang2 = Instantiate(SecondaryAmmunition, SecondaryBulletLocation.position, SecondaryBulletLocation.rotation);
    TheThang2.transform.parent = SecondaryBulletLocation;
    
    if(SecondaryFlarePrefab){
    var TheThang3 = Instantiate(SecondaryFlarePrefab, SecondaryFlareLocation.position, SecondaryFlareLocation.rotation);
    TheThang3.transform.parent = SecondaryBulletLocation;
    }
    
    if(UsingSoundSec)
    SecondaryFlareLocation.gameObject.audio.PlayOneShot(SecondarySound);
    
    if(UsingRecoilSec)
    if(RecoilAnimationObject != null){
    RecoilAnimationObject.animation.Stop();
    RecoilAnimationObject.animation.Play(RecoilAnimationName + "");
    }
    
    AmmoBaySecScript.ExpendedRound(ShotNum);
}

if(SecondaryGunTF2)
if(SecondaryGunTF2Active){
if(HullShock)
    ShockwaveLocation.rigidbody.AddForce(ShockwaveLocation.transform.up * HullShockSecForce);
    
    var TheThang4 = Instantiate(SecondaryAmmunition, SecondaryBulletLocation2.position, SecondaryBulletLocation2.rotation);
    TheThang4.transform.parent = SecondaryBulletLocation2;
    
    if(SecondaryFlarePrefab){
    var TheThang5 = Instantiate(SecondaryFlarePrefab, SecondaryFlareLocation.position, SecondaryFlareLocation.rotation);
    TheThang5.transform.parent = SecondaryBulletLocation2;
    }
    
    if(UsingSoundSec)
    SecondaryFlareLocation.gameObject.audio.PlayOneShot(SecondarySound);
    
    if(UsingRecoilSec)
    if(RecoilAnimationObject != null){
    RecoilAnimationObject.animation.Stop();
    RecoilAnimationObject.animation.Play(RecoilAnimationName + "");
    }
    
    AmmoBaySecScript.ExpendedRound(ShotNum);
}

if(SecondaryGunTF3)
if(SecondaryGunTF3Active){
if(HullShock)
    ShockwaveLocation.rigidbody.AddForce(ShockwaveLocation.transform.up * HullShockSecForce);
    
    var TheThang6 = Instantiate(SecondaryAmmunition, SecondaryBulletLocation3.position, SecondaryBulletLocation3.rotation);
    TheThang6.transform.parent = SecondaryBulletLocation3;
    
    if(SecondaryFlarePrefab){
    var TheThang7 = Instantiate(SecondaryFlarePrefab, SecondaryFlareLocation.position, SecondaryFlareLocation.rotation);
    TheThang7.transform.parent = SecondaryBulletLocation3;
    }
    
    if(UsingSoundSec)
    SecondaryFlareLocation.gameObject.audio.PlayOneShot(SecondarySound);
    
    if(UsingRecoilSec)
    if(RecoilAnimationObject != null){
    RecoilAnimationObject.animation.Stop();
    RecoilAnimationObject.animation.Play(RecoilAnimationName + "");
    }
    
    AmmoBaySecScript.ExpendedRound(ShotNum);
}

if(SecondaryGunTF4)
if(SecondaryGunTF4Active){
if(HullShock)
    ShockwaveLocation.rigidbody.AddForce(ShockwaveLocation.transform.up * HullShockSecForce);
    
    var TheThang8 = Instantiate(SecondaryAmmunition, SecondaryBulletLocation4.position, SecondaryBulletLocation4.rotation);
    TheThang8.transform.parent = SecondaryBulletLocation4;
    
    if(SecondaryFlarePrefab){
    var TheThang9 = Instantiate(SecondaryFlarePrefab, SecondaryFlareLocation.position, SecondaryFlareLocation.rotation);
    TheThang9.transform.parent = SecondaryBulletLocation;
    }
    
    if(UsingSoundSec)
    SecondaryFlareLocation.gameObject.audio.PlayOneShot(SecondarySound);
    
    if(UsingRecoilSec)
    if(RecoilAnimationObject != null){
    RecoilAnimationObject.animation.Stop();
    RecoilAnimationObject.animation.Play(RecoilAnimationName + "");
    }
    
    AmmoBaySecScript.ExpendedRound(ShotNum);
}
    
    
    }
}

function SectionShot () {

if(Broken)
return;

if(Beaming && !CanFire){
BeamEffect.SetActive (false);
BeamLongEffect.particleSystem.enableEmission = false;
BeamLongEffect2.particleSystem.enableEmission = false;
Beaming = false;
var TheThingie = Instantiate(BeamOffEffect, BeamAudio.transform.position, BeamAudio.transform.rotation);
    TheThingie.transform.parent = transform;
}

if(Beaming && CanFire){
var Bullet = Instantiate(BeamSection, BulletLocation.position, BulletLocation.rotation);
AmmoBayScript.ExpendedRound(1);
}
}

function DischargeBits(){

DischargedBit1Model.SetActive (true);
    
yield WaitForSeconds (DischargedBitDelay);

DischargedBit1Model.SetActive (false);

var _SpawnedObject0 = Instantiate(DischargedBit1P, DischargedBit1.position, DischargedBit1.rotation);
    _SpawnedObject0.rigidbody.velocity = DischargedBit1.forward * DischargedBitVelocity * 0.45 + thisRB.velocity * 1;
    _SpawnedObject0.rigidbody.AddTorque(DischargedBit1.right * DischargedBitTorque);

}

function Regenerator () {
if(WorldInformation.playerCar == this.gameObject.name){
BulletLocationCol.enabled = true;
if(BulletLocationColG2)
BulletLocationColG2.enabled = true;
if(BulletLocationColG3)
BulletLocationColG3.enabled = true;
}else{
BulletLocationCol.enabled = false;
if(BulletLocationColG2)
BulletLocationColG2.enabled = false;
if(BulletLocationColG3)
BulletLocationColG3.enabled = false;
}

}