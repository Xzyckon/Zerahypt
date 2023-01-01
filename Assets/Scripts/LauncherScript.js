
var Target : Transform;
 
var MainBody : GameObject;

var HasSecondLauncher : boolean;
var SecondLauncherPlus : boolean;

var SLPlusFiring : boolean;

var SecondLauncherSL1 : Transform;
var SecondLauncherSL2 : Transform;

var SecondLauncherSL3 : Transform;
var SecondLauncherSL4 : Transform;

var HasThirdLauncher : boolean;
var ThirdLauncherPlus : boolean;

var TLPlusFiring : boolean;

var ThirdLauncherSL1 : Transform;
var ThirdLauncherSL2 : Transform;

var ThirdLauncherSL3 : Transform;
var ThirdLauncherSL4 : Transform;

var ThirdLauncherSL5 : Transform;
var ThirdLauncherSL6 : Transform;

var ThirdLauncherSL7 : Transform;
var ThirdLauncherSL8 : Transform;
 
var AmmoBay : GameObject;
var AmmoBay2 : GameObject;
var AmmoBay3 : GameObject;
var Ammunition : GameObject;
var Ammunition2 : GameObject;
var Ammunition3 : GameObject;
var ShockwaveLocation : Transform;
var SpawnLocation : Transform;
var SecondSpawnLocation : Transform;
var ThirdSpawnLocation : Transform;
var FourthSpawnLocation : Transform;
var FifthSpawnLocation : Transform;
var SixthSpawnLocation : Transform;
var SpawnLocation7 : Transform;
var SpawnLocation8 : Transform;
var SpawnLocation9 : Transform;
var SpawnLocation10 : Transform;
var SpawnLocation11 : Transform;
var SpawnLocation12 : Transform;
 
var RocketModel1 : MeshRenderer;
var RocketModel2 : MeshRenderer;
var RocketModel3 : MeshRenderer;
var RocketModel4 : MeshRenderer;
var RocketModel5 : MeshRenderer;
 
var VentEffect : GameObject;
var Vent : Transform;
 
var Pivot : Transform;
 
var Shockwave : GameObject;
var RecoilAnimationObject : GameObject;
var RecoilAnimationName : String = "Name";
var DispenseAnimationObject : GameObject;
var DispenseAnimationName : String = "Name";

var Catapult1 : Transform;
var Catapult1Go : boolean;
var Catapult1Speed : float = 0.1;
var Catapult1EndPoint : float = 12.5;
var Catapult2 : Transform;
var Catapult2Go : boolean;
var Catapult2Speed : float = 0.1;
var Catapult2EndPoint : float = 12.5;
var Catapult3 : Transform;
var Catapult3Go : boolean;
var Catapult3Speed : float = 0.1;
var Catapult3EndPoint : float = 12.5;

var Catapult4Go : boolean;
var Catapult5Go : boolean;

var DispenseAudio : AudioSource;
var DispenseSoundClip : AudioClip;
 
var Audlo : AmmoBay;
 
var SDSM : boolean;
 
var pushOut : boolean;
var pushOutForce : float = 16;
 
var AnimatedLauncher : boolean;
var AdvancedAnimatedLauncher : boolean;

var UsesRevolverMagazine : boolean;
var RevolvingMagazine : Transform;
var IsPentagonalRevolver : boolean;

var RotToClose : boolean;

var RevolverRotAmount = 1;

var FireUsingMouse : boolean;
var Broken : boolean;
var Obscured : boolean;
var CanFire : boolean = true;
var CanFire2 : boolean = true;
var CanFire3 : boolean = true;
var UseTargetingSystem : boolean;
var TargeterSource : RayEndPoint;
var CanFireNext : boolean;
var Cooldown : float = 20;

var Cooldown2 : float = 20;
var Cooldown3 : float = 20;
 
var UseSequence : boolean;
var SequenceDelay : float = 0.5;
 
var Delayed : boolean;
var DelayTime : float = 0.5;
var DelayTime2 : float = 0.5;
var DelayTime3 : float = 0.3;
 
private var lastShot: float;

private var lastShot2: float;
private var lastShot3: float;
 
InvokeRepeating("Tick", 1, 0.25);
 
function Start (){

RevolverRotAmount = 256;

//if(UsesRevolverMagazine){
//Catapult1Go = false;
//}

Target = GameObject.Find("AimPointTarget").gameObject.transform;
}

function FixedUpdate () {

if(Broken)
return;

if(AnimatedLauncher){

if(!UsesRevolverMagazine){

if(Catapult1Go){
if(Catapult1.localPosition.y > -Catapult1EndPoint){
Catapult1.localPosition.y -= Catapult1Speed;
Catapult1Speed += 0.02;
}else{
if(Catapult1Go){
Initiate();
RocketModel1.enabled = false;
}
Catapult1Go = false;
}
}

if(Catapult2Go){
if(Catapult2.localPosition.y > -Catapult2EndPoint){
Catapult2.localPosition.y -= Catapult2Speed;
Catapult2Speed += 0.02;
}else{
if(Catapult2Go){
Initiate2();
RocketModel2.enabled = false;
}
Catapult2Go = false;
}
}

if(Catapult3Go){
if(Catapult3.localPosition.y > -Catapult3EndPoint){
Catapult3.localPosition.y -= Catapult3Speed;
Catapult3Speed += 0.02;
}else{
if(Catapult3Go){
Initiate3();
RocketModel3.enabled = false;
}
Catapult3Go = false;
}
}

if(WorldInformation.playerCar == this.gameObject.name) {
if(Input.GetKey("5")) {
if(!AdvancedAnimatedLauncher)
ShootMissilesD2();
else
ShootMissilesD3();
}
}






}else{

if(!RotToClose){

if(RevolverRotAmount < 256){

if(RevolverRotAmount > 0){
RevolvingMagazine.localEulerAngles.y -= 1;
RevolverRotAmount -= 1;
}else{
if(!Catapult1Go){
RevolverRotAmount = 256;
Initiate();
RocketModel1.enabled = false;
Catapult1Go = true;
return;
}
if(!Catapult2Go){
RevolverRotAmount = 256;
Initiate2();
RocketModel2.enabled = false;
Catapult2Go = true;
return;
}
if(!Catapult3Go){
RevolverRotAmount = 256;
Initiate3();
RocketModel3.enabled = false;
Catapult3Go = true;
return;
}
if(!Catapult4Go){
RevolverRotAmount = 256;
Initiate4();
RocketModel4.enabled = false;
Catapult4Go = true;
return;
}
if(!Catapult5Go){
RevolverRotAmount = 256;
Initiate5();
RocketModel5.enabled = false;
Catapult5Go = true;
return;
}
}

}

}else{
if(RevolverRotAmount > 0){
RevolvingMagazine.localEulerAngles.y -= 1;
RevolverRotAmount -= 1;
}else{
RevolverRotAmount = 256;
RotToClose = false;
}
}

if(WorldInformation.playerCar == this.gameObject.name) 
if(Input.GetKey("5"))
ShootMissilesRevolve();


}
















}else{

if(WorldInformation.playerCar == this.gameObject.name) {
if(!FireUsingMouse){
if(Input.GetKey("5")) {
if(!Delayed)
ShootMissiles();
else
ShootMissilesD();
}
if(HasSecondLauncher) 
if(Input.GetKey("6")) 
ShootMissiles2();
if(HasThirdLauncher) 
if(Input.GetKey("7")) 
ShootMissiles3();
}else{
if(Input.GetMouseButton(0) && !CameraScript.InInterface) {
ShootMissiles();
}
}
}
}






}

function ShootMissiles () {
if(Time.time - lastShot > Cooldown && CanFire && !Obscured) {
lastShot = Time.time;

if(AnimatedLauncher)
DispenseAnimationObject.animation.Play(DispenseAnimationName + "");

if(!AnimatedLauncher){
SequencedGunShot(Ammunition, SpawnLocation, Shockwave, ShockwaveLocation);
yield WaitForSeconds (SequenceDelay);

if(SecondSpawnLocation != null)
SequencedGunShot(Ammunition, SecondSpawnLocation, Shockwave, ShockwaveLocation);
yield WaitForSeconds (SequenceDelay);

if(ThirdSpawnLocation != null)
SequencedGunShot(Ammunition, ThirdSpawnLocation, Shockwave, ShockwaveLocation);
yield WaitForSeconds (SequenceDelay);

if(FourthSpawnLocation != null)
SequencedGunShot(Ammunition, FourthSpawnLocation, Shockwave, ShockwaveLocation);
yield WaitForSeconds (SequenceDelay);

if(FifthSpawnLocation != null)
SequencedGunShot(Ammunition, FifthSpawnLocation, Shockwave, ShockwaveLocation);
yield WaitForSeconds (SequenceDelay);

if(SixthSpawnLocation != null)
SequencedGunShot(Ammunition, SixthSpawnLocation, Shockwave, ShockwaveLocation);
yield WaitForSeconds (SequenceDelay);

if(SpawnLocation7 != null)
SequencedGunShot(Ammunition, SpawnLocation7, Shockwave, ShockwaveLocation);
yield WaitForSeconds (SequenceDelay);

if(SpawnLocation8 != null)
SequencedGunShot(Ammunition, SpawnLocation8, Shockwave, ShockwaveLocation);
yield WaitForSeconds (SequenceDelay);

if(SpawnLocation9 != null)
SequencedGunShot(Ammunition, SpawnLocation9, Shockwave, ShockwaveLocation);
yield WaitForSeconds (SequenceDelay);

if(SpawnLocation10 != null)
SequencedGunShot(Ammunition, SpawnLocation10, Shockwave, ShockwaveLocation);
yield WaitForSeconds (SequenceDelay);

if(SpawnLocation11 != null)
SequencedGunShot(Ammunition, SpawnLocation11, Shockwave, ShockwaveLocation);
yield WaitForSeconds (SequenceDelay);

if(SpawnLocation12 != null)
SequencedGunShot(Ammunition, SpawnLocation12, Shockwave, ShockwaveLocation);
}
}
}

function ShootMissiles2 () {
if(Time.time - lastShot2 > Cooldown2 && CanFire2 && !Obscured) {
lastShot2 = Time.time;

if(!SLPlusFiring){

SequencedGunShot2(Ammunition2, SecondLauncherSL1, Shockwave, ShockwaveLocation);
yield WaitForSeconds (SequenceDelay);

SequencedGunShot2(Ammunition2, SecondLauncherSL2, Shockwave, ShockwaveLocation);

if(SecondLauncherPlus)
SLPlusFiring = true;

}else{

if(SecondLauncherSL3 != null)
SequencedGunShot2(Ammunition2, SecondLauncherSL3, Shockwave, ShockwaveLocation);
yield WaitForSeconds (SequenceDelay);

if(SecondLauncherSL4 != null)
SequencedGunShot2(Ammunition2, SecondLauncherSL4, Shockwave, ShockwaveLocation);

if(SecondLauncherPlus)
SLPlusFiring = false;
}

}
}

function ShootMissiles3 () {
if(Time.time - lastShot3 > Cooldown3 && CanFire3 && !Obscured) {
lastShot3 = Time.time;

if(!TLPlusFiring){

SequencedGunShot3(Ammunition3, ThirdLauncherSL1, Shockwave, ShockwaveLocation);
yield WaitForSeconds (DelayTime3);

SequencedGunShot3(Ammunition3, ThirdLauncherSL2, Shockwave, ShockwaveLocation);
yield WaitForSeconds (DelayTime3);

if(SecondLauncherSL3 != null)
SequencedGunShot3(Ammunition3, ThirdLauncherSL3, Shockwave, ShockwaveLocation);
yield WaitForSeconds (DelayTime3);

if(SecondLauncherSL4 != null)
SequencedGunShot3(Ammunition3, ThirdLauncherSL4, Shockwave, ShockwaveLocation);

if(ThirdLauncherPlus)
TLPlusFiring = true;

}else{

if(ThirdLauncherSL5 != null)
SequencedGunShot3(Ammunition3, ThirdLauncherSL5, Shockwave, ShockwaveLocation);
yield WaitForSeconds (DelayTime3);

if(ThirdLauncherSL6 != null)
SequencedGunShot3(Ammunition3, ThirdLauncherSL6, Shockwave, ShockwaveLocation);
yield WaitForSeconds (DelayTime3);

if(ThirdLauncherSL7 != null)
SequencedGunShot3(Ammunition3, ThirdLauncherSL7, Shockwave, ShockwaveLocation);
yield WaitForSeconds (DelayTime3);

if(ThirdLauncherSL8 != null)
SequencedGunShot3(Ammunition3, ThirdLauncherSL8, Shockwave, ShockwaveLocation);

if(ThirdLauncherPlus)
TLPlusFiring = false;

}
}
}

function ShootMissilesD () {
if(Time.time - lastShot > Cooldown && CanFire && !Obscured) {
lastShot = Time.time;

var TheThing = Instantiate(VentEffect, Vent.position, Vent.rotation);
TheThing.transform.parent = Vent.transform;
yield WaitForSeconds (DelayTime);
SequencedGunShot(Ammunition, SpawnLocation, Shockwave, ShockwaveLocation);

}
}

function ShootMissilesD2 () {
if(Time.time - lastShot > Cooldown && CanFire && !Obscured) {
lastShot = Time.time;
DispenseAnimationObject.animation.Play(DispenseAnimationName + "");
audio.PlayOneShot(DispenseSoundClip);
yield WaitForSeconds (DelayTime);
SequencedGunShot(Ammunition, SpawnLocation, Shockwave, ShockwaveLocation);
RocketModel1.enabled = false;
yield WaitForSeconds (4);
RocketModel1.enabled = true;
}
}

function ShootMissilesD3 () {
if(Time.time - lastShot > Cooldown && CanFire && !Obscured) {
lastShot = Time.time;
DispenseAnimationObject.animation.Play(DispenseAnimationName + "");
yield WaitForSeconds (DelayTime);

Catapult1Go = true;
audio.PlayOneShot(DispenseSoundClip);

yield WaitForSeconds (DelayTime2);

Catapult2Go = true;
audio.PlayOneShot(DispenseSoundClip);

yield WaitForSeconds (DelayTime2);

Catapult3Go = true;
audio.PlayOneShot(DispenseSoundClip);
}
}















function ShootMissilesRevolve () {
if(Time.time - lastShot > Cooldown && CanFire && !Obscured) {
lastShot = Time.time;

if(IsPentagonalRevolver)
RevolverRotAmount = 36;

}
}
















function SequencedGunShot(_prefab : GameObject, _SpawnP : Transform, _prefabS : GameObject, SpawnS : Transform) {

var _SpawnedObject = Instantiate(_prefab, _SpawnP.position, _SpawnP.rotation);
if(_SpawnedObject != null){
_SpawnedObject.transform.parent = gameObject.transform;
if(!SDSM)
_SpawnedObject.rigidbody.velocity = MainBody.rigidbody.velocity * 1;
if(pushOut)
_SpawnedObject.rigidbody.AddForce(_SpawnP.up * pushOutForce);
}
if(AmmoBay)
AmmoBay.GetComponent("AmmoBay").ExpendedRound(1);

if(UseTargetingSystem){
if(TargeterSource.target)
_SpawnedObject.transform.GetComponent(MissileScript).target = TargeterSource.target;
else
_SpawnedObject.transform.GetComponent(MissileScript).target = Target;
}

if(_prefabS != null){
Instantiate(_prefabS, SpawnS.position, SpawnS.rotation);
}

if(RecoilAnimationObject != null){
RecoilAnimationObject.animation.Play(RecoilAnimationName + "");
}
}

function SequencedGunShot2(_prefab : GameObject, _SpawnP : Transform, _prefabS : GameObject, SpawnS : Transform) {

var _SpawnedObject = Instantiate(_prefab, _SpawnP.position, _SpawnP.rotation);
if(_SpawnedObject != null){
_SpawnedObject.transform.parent = gameObject.transform;
if(!SDSM)
_SpawnedObject.rigidbody.velocity = MainBody.rigidbody.velocity * 1;
if(pushOut)
_SpawnedObject.rigidbody.AddForce(_SpawnP.up * pushOutForce);
}
if(AmmoBay2)
AmmoBay2.GetComponent("AmmoBay").ExpendedRound(1);

if(UseTargetingSystem){
if(TargeterSource.target)
_SpawnedObject.transform.GetComponent(MissileScript).target = TargeterSource.target;
else
_SpawnedObject.transform.GetComponent(MissileScript).target = Target;
}

if(_prefabS != null){
Instantiate(_prefabS, SpawnS.position, SpawnS.rotation);
}

if(RecoilAnimationObject != null){
RecoilAnimationObject.animation.Play(RecoilAnimationName + "");
}
}

function SequencedGunShot3(_prefab : GameObject, _SpawnP : Transform, _prefabS : GameObject, SpawnS : Transform) {

var _SpawnedObject = Instantiate(_prefab, _SpawnP.position, _SpawnP.rotation);
if(_SpawnedObject != null){
_SpawnedObject.transform.parent = gameObject.transform;
if(!SDSM)
_SpawnedObject.rigidbody.velocity = MainBody.rigidbody.velocity * 1;
if(pushOut)
_SpawnedObject.rigidbody.AddForce(_SpawnP.up * pushOutForce);
}
if(AmmoBay3)
AmmoBay3.GetComponent("AmmoBay").ExpendedRound(1);

if(UseTargetingSystem){
if(TargeterSource.target)
_SpawnedObject.transform.GetComponent(MissileScript).target = TargeterSource.target;
else
_SpawnedObject.transform.GetComponent(MissileScript).target = Target;
}

if(_prefabS != null){
Instantiate(_prefabS, SpawnS.position, SpawnS.rotation);
}

if(RecoilAnimationObject != null){
RecoilAnimationObject.animation.Play(RecoilAnimationName + "");
}
}

function Initiate () {

var projectile = Instantiate(Ammunition, SpawnLocation.position, SpawnLocation.rotation);
if(projectile != null){
projectile.rigidbody.velocity = MainBody.rigidbody.velocity * 1;
}
if(UseTargetingSystem){
if(TargeterSource.target)
projectile.transform.GetComponent(MissileScript).target = TargeterSource.target;
else
projectile.transform.GetComponent(MissileScript).target = Target;
}
AmmoBay.GetComponent("AmmoBay").ExpendedRound(1);

yield WaitForSeconds (0.2);

if(IsPentagonalRevolver){
RotToClose = true;
RevolverRotAmount = 36;
}

}

function Initiate2 () {

var projectile = Instantiate(Ammunition, SecondSpawnLocation.position, SecondSpawnLocation.rotation);
if(projectile != null){
projectile.rigidbody.velocity = MainBody.rigidbody.velocity * 1;
}
if(UseTargetingSystem){
if(TargeterSource.target)
projectile.transform.GetComponent(MissileScript).target = TargeterSource.target;
else
projectile.transform.GetComponent(MissileScript).target = Target;
}
AmmoBay.GetComponent("AmmoBay").ExpendedRound(1);

yield WaitForSeconds (0.2);

if(IsPentagonalRevolver){
RotToClose = true;
RevolverRotAmount = 36;
}

}

function Initiate3 () {

var projectile = Instantiate(Ammunition, ThirdSpawnLocation.position, ThirdSpawnLocation.rotation);
if(projectile != null){
projectile.rigidbody.velocity = MainBody.rigidbody.velocity * 1;
}
if(UseTargetingSystem){
if(TargeterSource.target)
projectile.transform.GetComponent(MissileScript).target = TargeterSource.target;
else
projectile.transform.GetComponent(MissileScript).target = Target;
}
AmmoBay.GetComponent("AmmoBay").ExpendedRound(1);

yield WaitForSeconds (0.2);

if(IsPentagonalRevolver){
RotToClose = true;
RevolverRotAmount = 36;
}

}

function Initiate4 () {

var projectile = Instantiate(Ammunition, FourthSpawnLocation.position, FourthSpawnLocation.rotation);
if(projectile != null){
projectile.rigidbody.velocity = MainBody.rigidbody.velocity * 1;
}
if(UseTargetingSystem){
if(TargeterSource.target)
projectile.transform.GetComponent(MissileScript).target = TargeterSource.target;
else
projectile.transform.GetComponent(MissileScript).target = Target;
}
AmmoBay.GetComponent("AmmoBay").ExpendedRound(1);

yield WaitForSeconds (0.2);

if(IsPentagonalRevolver){
RotToClose = true;
RevolverRotAmount = 36;
}

}

function Initiate5 () {

var projectile = Instantiate(Ammunition, FifthSpawnLocation.position, FifthSpawnLocation.rotation);
if(projectile != null){
projectile.rigidbody.velocity = MainBody.rigidbody.velocity * 1;
}
if(UseTargetingSystem){
if(TargeterSource.target)
projectile.transform.GetComponent(MissileScript).target = TargeterSource.target;
else
projectile.transform.GetComponent(MissileScript).target = Target;
}
AmmoBay.GetComponent("AmmoBay").ExpendedRound(1);

yield WaitForSeconds (0.2);

if(IsPentagonalRevolver){
RotToClose = true;
RevolverRotAmount = 36;
}

}

function HideModel1 () {
RocketModel1.enabled = false;
}

function HideModel2 () {
RocketModel2.enabled = false;
}

function HideModel3 () {
RocketModel3.enabled = false;
}

function DispenseSound () {
DispenseAudio.PlayOneShot(DispenseSoundClip);
}

function Tick (){
if(Pivot){
Obscured = false;
if(Pivot.localEulerAngles.z < 40 || Pivot.localEulerAngles.z > 320)
Obscured = true;
}

}