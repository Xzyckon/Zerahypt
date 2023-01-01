#pragma strict

var useReload : boolean;
var useAudio : boolean = true;
var CanLoop : boolean;
var CanFire : boolean;
var GunLoaded : boolean;
var Reloading : boolean;
var CanHeatUp : boolean;
var CanOverheat : boolean;
var Overheated : boolean;
var OverheatFX : ParticleSystem;
var ParentedPrefab : boolean;
var AmmoSelected : int = 1;
var AmmoLoaded : int = 1;
var SettleTime : float = 1;
var UnloadTime : float = 1;
var ReloadTime : float = 3;
var ReadyTime : float = 0.5;
var ForePauseTime : float = 0;
var ForePauseSound : GameObject;
var SpinAcceleration : float = 0.2;
var BarrelSpinSpeed : float = 0;
var StaticSpinSpeed : float = 0;
var BarrelTF : Transform;
var AniPart : GameObject;
var EmptyMag : GameObject;
var FullMag : GameObject;
var ShotsFired = 0;
var ShotsInMag = 1;
var ReloadAni: String;
var FireAni: String;
var cooldown : float = 0.15;
var Heat : float = 0;
var MaxHeat : float = 50;
var HeatGained : float = 2;
var CoolGained : float = 1;
var Spread : float = 0;
var MinSpread : float = 0;
var MaxSpread : float = 5;
var targetLayers : LayerMask;

var firePrefab : GameObject;
var firePrefab2 : GameObject;
var firePrefab3 : GameObject;
var Ammo1Mesh : GameObject;
var Ammo2Mesh : GameObject;

var barrel : Transform;

var barrelLocation : Transform;

var UserTF : Transform;

var GunWeight = 20;

var Recoil : float = 0;
var RecoilRecover : float = 0;

var MaxRecoil : float = 0;

var RecoilBleed : float = 0;
var RecoilBleedRecover : float = 0;

var MaxRecoilBleed : float = 0;

var Recoiling : boolean;

var Proddy1 : float = 0;

var Proddy2 : float = 0;

var Locked : boolean;

private var CurrentRecoil : float;

private var CurrentRecoilBleed : float;

private var startTime: float;
private var piriController : PiriUpperBodyController;

function Start(){
	var torso : GameObject = PlayerInformation.instance.PiriTorso;
	piriController = torso.GetComponent(PiriUpperBodyController);
	
	UserTF = PlayerInformation.instance.PiriTorso.transform;
	
	StaticSpinSpeed = BarrelSpinSpeed;
	
	Spread = MinSpread;
}

function Update(){

if(Input.GetMouseButtonUp(0)){
Recoiling = false;
CurrentRecoil = 0;
}

if(Input.GetMouseButtonDown(1))
PiriUpperBodyController.Weight = GunWeight;

if(useAudio)
if(audio.isPlaying)
if(Input.GetMouseButtonDown(0))
if(Time.time - startTime >= cooldown && CanFire && !Overheated)
audio.Stop();

if(Input.GetMouseButton(1) && CameraScript.InInterface == false && PiriUpperBodyController.IsAiming && PiriUpperBodyController.CanShoot){

if(ForePauseTime > 0.1)
if(Input.GetMouseButtonDown(0)){
BarrelSpinSpeed = 0.2;
CanFire = false;
ForePause();
}

if(Input.GetMouseButton(0)){
if(!CanOverheat){
if(BarrelSpinSpeed > 0.1)
BarrelTF.localEulerAngles.y += BarrelSpinSpeed;
		
if(Time.time - startTime >= cooldown && CanFire && !Reloading && !Overheated){
startTime = Time.time;
Shoot();
            
if(useAudio){
if(!CanLoop){
audio.Play();
}else{
audio.loop = true;
if(!audio.isPlaying)
audio.Play();
}
}

if(useReload)
ShotsFired += 1;

if(FireAni)
AniPart.animation.CrossFade(FireAni);
}
}else{
if(BarrelSpinSpeed > 0.1)
BarrelTF.localEulerAngles.y += BarrelSpinSpeed;
		
if(Time.time - startTime >= cooldown && CanFire && !Reloading){
if(!Overheated){

startTime = Time.time;
Shoot();
            
if(useAudio){
if(!CanLoop){
audio.Play();
}else{
audio.loop = true;
if(!audio.isPlaying)
audio.Play();
}
}

if(useReload)
ShotsFired += 1;

if(FireAni)
AniPart.animation.CrossFade(FireAni);
}else{

if(useAudio){
if(CanLoop){
if(audio.isPlaying)
audio.loop = false;
}
}

}

}
}





}else{

if(useAudio){
if(CanLoop){
if(audio.isPlaying)
audio.loop = false;
}
}

}
}else{

if(useAudio){
if(CanLoop){
if(audio.isPlaying)
audio.loop = false;
}
}

}

if (Input.GetMouseButton(1) && CameraScript.InInterface == false) {
if (ItemContainer.PiriContainer.ContainerItems.Count != 0) {
if (Input.GetKey("1")) {
if(AmmoSelected != 1){
AmmoSelected = 1;
if (!Reloading) CanFire = false;
if (GunLoaded && !Reloading) {
ShotsFired = 0;
CanFire = false;
Reloading = true;
Switch();
}
}
} else if (Input.GetKey("2") && InventoryManager.CanUseGunAmmo(ItemContainer.PiriContainer.ContainerItems[0].ID.ToString(), 2)) {
AmmoSelected = 2;
if (!Reloading) CanFire = false;
if (GunLoaded && !Reloading) {
ShotsFired = 0;
CanFire = false;
Reloading = true;
Switch();
}
}
}
}

	if(Input.GetMouseButton(1) && CameraScript.InInterface == false && useReload){

	    if(ShotsInMag == ShotsFired && !Reloading){
	    FullMag.gameObject.SetActive (false);
		EmptyMag.gameObject.SetActive (true);
	    GunLoaded = false;
	    CanFire = false;
	    }

		if(!GunLoaded && !Reloading){
			Reloading = true;
			Reload();
		}
	}
	if(Input.GetMouseButtonUp(1) && CameraScript.InInterface == false && Reloading){
	StopAllCoroutines();
	AniPart.animation.Rewind();
	Reloading = false;
	RewindAni();
	}
    
    if(ForePauseTime < 0.1)
	if(Input.GetMouseButtonDown(1) && GunLoaded)
	CanFire = true;
	
}

function ForePause(){
var TheThing0 = Instantiate(ForePauseSound, transform.position, transform.rotation);
    TheThing0.transform.parent = gameObject.transform;
yield WaitForSeconds (ForePauseTime);
if(Input.GetMouseButton(0)){
if(audio.isPlaying)
audio.Stop();
CanFire = true;
}
}

function RewindAni() {
yield WaitForSeconds (0.01);
AniPart.animation.Stop();
}

function Reload() {
yield WaitForSeconds (SettleTime);
AniPart.animation.Play(ReloadAni);
yield WaitForSeconds (UnloadTime);
FullMag.gameObject.SetActive (true);
EmptyMag.gameObject.SetActive (false);
ShotsFired = 0;
yield WaitForSeconds (ReloadTime);
Reloading = false;
GunLoaded = true;
yield WaitForSeconds (ReadyTime);
CanFire = true;
}

function Switch() {
	yield WaitForSeconds (SettleTime);
	AniPart.animation.Play(ReloadAni);
	yield WaitForSeconds (UnloadTime);

	switch(AmmoSelected) {
		case 1:
		    AmmoLoaded = 1;
			Ammo1Mesh.gameObject.SetActive (true);
			Ammo2Mesh.gameObject.SetActive (false);
			break;
		case 2:
		    AmmoLoaded = 2;
			Ammo2Mesh.gameObject.SetActive (true);
			Ammo1Mesh.gameObject.SetActive (false);
			break;
	}
	yield WaitForSeconds (ReloadTime);
	Reloading = false;
	GunLoaded = true;
	yield WaitForSeconds (ReadyTime);
	CanFire = true;
}

function Shoot(){

if(Heat < 10 && !CanOverheat)
Heat += HeatGained;

if(CanOverheat)
Heat += HeatGained;

if(Recoil > 0){
Recoiling = true;
if(CurrentRecoil < MaxRecoil)
CurrentRecoil += Recoil;
}

if(RecoilBleed > 0){
if(CurrentRecoilBleed < MaxRecoilBleed)
CurrentRecoilBleed += RecoilBleed;
}
		
if(!ParentedPrefab){
switch(AmmoLoaded) {
			case 1:
				Instantiate(firePrefab, barrelLocation.position, barrelLocation.rotation);
				break;
			case 2:
				Instantiate(firePrefab2, barrelLocation.position, barrelLocation.rotation);
				break;
		}
}else{
var TheThing = Instantiate(firePrefab, barrelLocation.position, barrelLocation.rotation);
    TheThing.transform.parent = gameObject.transform;
}
		
	piriController.Recoil();
	if(CanHeatUp)
	barrel.transform.localRotation = Quaternion.Euler(0, 0, 0);
	
if(Recoiling)
UserTF.Rotate(CurrentRecoil,0,0);
}

function FixedUpdate () {

if(BarrelSpinSpeed > 0.1){

Proddy1 = 180 - BarrelSpinSpeed * 2;

Proddy2 = 360 - BarrelSpinSpeed * 2;

if(Input.GetMouseButton(1) && CameraScript.InInterface == false && PiriUpperBodyController.IsAiming && PiriUpperBodyController.CanShoot){

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

if(CanHeatUp){

if(CanOverheat){

if(OverheatFX){
if(!Overheated){
if(Heat > 16)
OverheatFX.emissionRate = Heat;
else
OverheatFX.emissionRate = 0;
}else{
OverheatFX.emissionRate = Heat;
}
}

if(Heat > MaxHeat && !Overheated){
Overheated = true;
Recoiling = false;
}
if(Heat < 1 && Overheated)
Overheated = false;

}

if(CurrentRecoil > 0)
CurrentRecoil -= RecoilRecover;

if(CurrentRecoilBleed > 0)
CurrentRecoilBleed -= RecoilBleedRecover;

PiriUpperBodyController.Weight = GunWeight - CurrentRecoilBleed;

if(Heat > 0)
Heat -= CoolGained;

if(Heat < 1){
barrel.transform.localRotation = Quaternion.Euler(0, 0, 0);
Heat = 0;
}

if(Heat > 5 && Spread < MaxSpread)
Spread += 0.1;

if(Heat < 10 && Spread > MinSpread)
Spread -= 0.1;

if(barrel.transform.localRotation.x < 0.02)
barrel.transform.Rotate(Vector3.right * Random.Range (0, Spread));

if(barrel.transform.localRotation.x > -0.02)
barrel.transform.Rotate(Vector3.left * Random.Range (0, Spread));

if(barrel.transform.localRotation.z < 0.02)
barrel.transform.Rotate(Vector3.forward * Random.Range (0, Spread));

if(barrel.transform.localRotation.z > -0.02)
barrel.transform.Rotate(Vector3.back * Random.Range (0, Spread));

}else{

Spread = MaxSpread;

if(barrel.transform.localRotation.x < 0.02)
barrel.transform.Rotate(Vector3.right * Random.Range (0, Spread));

if(barrel.transform.localRotation.x > -0.02)
barrel.transform.Rotate(Vector3.left * Random.Range (0, Spread));

if(barrel.transform.localRotation.z < 0.02)
barrel.transform.Rotate(Vector3.forward * Random.Range (0, Spread));

if(barrel.transform.localRotation.z > -0.02)
barrel.transform.Rotate(Vector3.back * Random.Range (0, Spread));

Spread = MinSpread;

}
}