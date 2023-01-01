#pragma strict
var GunController : GameObject;
var Ammometer : GameObject;
var AmmoPoint : GameObject;

var AmmoBaySec : boolean;

var AmmoBay2 : boolean;
var AmmoBay3 : boolean;

var AmmoLP : boolean;
var AmmoHP : boolean;
var AmmoM : boolean;

function Start () {
if(AmmoLP)
Ammometer = AmmoIndicators.instance.LP;
if(AmmoHP)
Ammometer = AmmoIndicators.instance.HP;
if(AmmoM)
Ammometer = AmmoIndicators.instance.M;
}

var IsUsingLauncher : boolean;
var IsUsingGun : boolean;

var CanRegenerate : boolean;
var IsRegenerating : boolean;
var RegeneratedAmount : int = 10;
var RegenerateTime : int = 10;

var PrimaryAmmunition : int = 10;
var MaxPrimaryAmmunition : int = 10;
var AmmoType : ItemEnum;

var broken : boolean;

private var AmmoNum : int;
private var AN : TextMesh;

InvokeRepeating("Count", 1, 0.1);

function Count(){

if(broken)
return;

if(AmmoPoint){
if(PrimaryAmmunition == MaxPrimaryAmmunition){
AmmoPoint.name = "AmmoPointF" + AmmoType;
}else{
AmmoPoint.name = "AmmoPointE" + AmmoType;
}
}

if(WorldInformation.playerCar == "null"){
 AmmoNum = 0;
 AN = Ammometer.gameObject.GetComponent(TextMesh);
 AN.text = AmmoNum.ToString();
}else{
if(WorldInformation.playerCar == transform.parent.name){
 AmmoNum = PrimaryAmmunition;
 AN = Ammometer.gameObject.GetComponent(TextMesh);
 AN.text = AmmoNum.ToString();
}

}

if(GunController.name == "broken"){
if(!broken){
AmmoNum = 0;
AN = Ammometer.gameObject.GetComponent(TextMesh);
AN.text = AmmoNum.ToString();
broken = true;
}
}

}

function Update () {
	if(CanRegenerate){

	if(!IsRegenerating){

	if(PrimaryAmmunition == 0){
		Regenerate();
	}
	}
	}
}

function OnTriggerEnter (other : Collider) {
if(other.name.Contains("drop")) {
var _item : Item = other.gameObject.GetComponent(DataContainer).item;

if(AmmoType == _item.ID && PrimaryAmmunition < MaxPrimaryAmmunition){
PrimaryAmmunition += 1;

if(IsUsingGun == true)
GunController.GetComponent(NewgunController).CanFire = true;
if(IsUsingLauncher == true){
if(!AmmoBay2 && !AmmoBay3)
GunController.GetComponent(LauncherScript).CanFire = true;
if(AmmoBay2)
GunController.GetComponent(LauncherScript).CanFire2 = true;
if(AmmoBay3)
GunController.GetComponent(LauncherScript).CanFire3 = true;
}

Destroy(other.gameObject);
}
}
}

function ExpendedRound (Num : int){

if(PrimaryAmmunition >= Num)
PrimaryAmmunition -= Num;

if(PrimaryAmmunition < Num){

if(IsUsingGun == true){
if(!AmmoBaySec)
GunController.GetComponent(NewgunController).CanFire = false;
else
GunController.GetComponent(NewgunController).CanFireSec = false;
}
if(IsUsingLauncher == true){
if(!AmmoBay2 && !AmmoBay3)
GunController.GetComponent(LauncherScript).CanFire = false;
if(AmmoBay2)
GunController.GetComponent(LauncherScript).CanFire2 = false;
if(AmmoBay3)
GunController.GetComponent(LauncherScript).CanFire3 = false;
}
}
}

function Regenerate (){
IsRegenerating = true;
yield WaitForSeconds (RegenerateTime);
PrimaryAmmunition = RegeneratedAmount;

IsRegenerating = false;

if(IsUsingGun == true){
if(!AmmoBaySec)
GunController.GetComponent(NewgunController).CanFire = true;
else
GunController.GetComponent(NewgunController).CanFireSec = true;
}
if(IsUsingLauncher == true){
if(!AmmoBay2 && !AmmoBay3)
GunController.GetComponent(LauncherScript).CanFire = true;
if(AmmoBay2)
GunController.GetComponent(LauncherScript).CanFire2 = true;
if(AmmoBay3)
GunController.GetComponent(LauncherScript).CanFire3 = true;
}
}