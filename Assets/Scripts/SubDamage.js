var Health : float = 10;

var StaticHealth : float = 10;

var HealthThreshold : float = 10;

var TargetCode = 0;

var ThisDamage : float = 0;
var SendDamage : float = 0;

var BreakDamageSend = 2048;

private var once: boolean;

private var Honce: boolean;

private var Donce: boolean;

private var HeavyHit: boolean;

var IntegratedPart: boolean;

var isGun: boolean;
var isSecGun: boolean;
var isVolleyGun: boolean;
var isLauncher: boolean;

var gunNumber = 0;

var RegisterHeavyHit: boolean;

var SkipThreatCount: boolean;

var IsCivilian: boolean;

var IsMachine: boolean;

var ResetDrag: boolean;
var ResetGravity: boolean;

var AI : GameObject;

var AIName : String = "PersonMcPersonface";

var Piri: PlayerMotionAnimator;

var ParentDamage: VehicleDamage;

var GunScript : NPCGun;
var otherGunScript : GameObject;
var PlayerGunScript : NewgunController;
var PlayerLauncherScript : LauncherScript;

var missileScript : MissileScript;

var NoArmor: boolean;
var LightArmor: boolean;
var HeavyArmor: boolean;
var ExtraThiccArmor: boolean;
var UtsargalineArmor: boolean;

var BrokenSound : GameObject;

InvokeRepeating("Tick", 1, 0.2);

function Start(){

if(!LightArmor && !HeavyArmor && !ExtraThiccArmor && !UtsargalineArmor)
NoArmor = true;

    StaticHealth = Health;
	HealthThreshold = Health * 0.33;
	
	if(IsCivilian){
	if(TargetCode == 3 && WorldInformation.instance.AreaCode == 1)
	TargetCode = 0;

	}
}

function DamageIn (Damage : float, DamageCode : int, PShot : boolean) {

if(Donce)
return;

if(!IntegratedPart){

if(!Piri){

if(ParentDamage)
if(ParentDamage.Health < 1)
   return;
}

if(HeavyHit && RegisterHeavyHit){
AI.GetComponent(AIName).Emergency = true;
}

if (NoArmor == true){
if(DamageCode == 1 && Health > 0){

ThisDamage = Damage;
SendDamage = Damage;

if(Health < Damage + 1){
ThisDamage -= Health;
SendDamage -= ThisDamage;
}

DamageCounter.instance.ShowDamage(SendDamage, TargetCode);
}

Health -= Damage;
if(Damage > 24)
HeavyHit = true;
}

if (LightArmor == true) {
if(PShot && Health > 0){

ThisDamage = Damage * 0.5;
SendDamage = Damage * 0.5;

if(Health < Damage * 0.5){
ThisDamage -= Health;
SendDamage -= ThisDamage;
}

DamageCounter.instance.ShowDamage(SendDamage, TargetCode);
}

Health -= Damage * 0.5;
if(Damage > 24)
HeavyHit = true;
}

if(HeavyArmor == true){
if(PShot && Health > 0){

ThisDamage = Damage * 0.25;
SendDamage = Damage * 0.25;

if(Health < Damage * 0.25){
ThisDamage -= Health;
SendDamage -= ThisDamage;
}

DamageCounter.instance.ShowDamage(SendDamage, TargetCode);
}

Health -= Damage * 0.25;
if(Damage > 24)
HeavyHit = true;
}
	
if(ExtraThiccArmor == true){
if(PShot && Health > 0){

ThisDamage = Damage * 0.125;
SendDamage = Damage * 0.125;

if(Health < Damage * 0.125){
ThisDamage -= Health;
SendDamage -= ThisDamage;
}

DamageCounter.instance.ShowDamage(SendDamage, TargetCode);
}

Health -= Damage * 0.125;
if(Damage > 24)
HeavyHit = true;
}

if(UtsargalineArmor == true){
if(PShot && Health > 0){

ThisDamage = Damage * 0.01;
SendDamage = Damage * 0.01;

if(Health < Damage * 0.01){
ThisDamage -= Health;
SendDamage -= ThisDamage;
}

DamageCounter.instance.ShowDamage(SendDamage, TargetCode);
}


Health -= Damage * 0.01;
if(Damage > 24)
HeavyHit = true;
}

if(!SkipThreatCount){
//---------------------------------------------------------
if(TargetCode == 2){
if(DamageCode == 1 && PShot){
if(Damage < StaticHealth)
AgrianNetwork.instance.TC1CriminalLevel += Damage * 5;
else
AgrianNetwork.instance.TC1CriminalLevel += StaticHealth;
}

if(DamageCode == 3){
if(Damage < StaticHealth)
AgrianNetwork.instance.TC3CriminalLevel += Damage * 5;
else
AgrianNetwork.instance.TC3CriminalLevel += StaticHealth;
}

if(DamageCode == 4){
if(Damage < StaticHealth)
AgrianNetwork.instance.TC4CriminalLevel += Damage * 5;
else
AgrianNetwork.instance.TC4CriminalLevel += StaticHealth;
}

if(DamageCode == 5){
if(Damage < StaticHealth)
AgrianNetwork.instance.TC5CriminalLevel += Damage * 5;
else
AgrianNetwork.instance.TC5CriminalLevel += StaticHealth;
}

if(DamageCode == 6){
if(Damage < StaticHealth)
AgrianNetwork.instance.TC6CriminalLevel += Damage * 5;
else
AgrianNetwork.instance.TC6CriminalLevel += StaticHealth;
}

if(DamageCode == 7){
if(Damage < StaticHealth)
AgrianNetwork.instance.TC7CriminalLevel += Damage * 5;
else
AgrianNetwork.instance.TC7CriminalLevel += StaticHealth;
}

if(DamageCode == 8){
if(Damage < StaticHealth)
AgrianNetwork.instance.TC8CriminalLevel += Damage * 5;
else
AgrianNetwork.instance.TC8CriminalLevel += StaticHealth;
}

if(DamageCode == 9){
if(Damage < StaticHealth)
AgrianNetwork.instance.TC9CriminalLevel += Damage * 5;
else
AgrianNetwork.instance.TC9CriminalLevel += StaticHealth;
}

}
//---------------------------------------------------------
if(TargetCode == 3){

if(DamageCode == 0){
if(TerrahyptianNetwork.TC0aCriminalLevel < 11)
TerrahyptianNetwork.TC0aCriminalLevel = 90;
}
if(DamageCode == 1 && PShot){
if(TerrahyptianNetwork.TC1CriminalLevel < 11)
TerrahyptianNetwork.TC1CriminalLevel = 90;
}
if(DamageCode == 4){
if(TerrahyptianNetwork.TC4CriminalLevel < 11)
TerrahyptianNetwork.TC4CriminalLevel = 90;
}
if(DamageCode == 5){
if(TerrahyptianNetwork.TC5CriminalLevel < 11)
TerrahyptianNetwork.TC5CriminalLevel = 90;
}
if(DamageCode == 6){
if(TerrahyptianNetwork.TC6CriminalLevel < 11)
TerrahyptianNetwork.TC6CriminalLevel = 90;
}
if(DamageCode == 7){
if(TerrahyptianNetwork.TC7CriminalLevel < 11)
TerrahyptianNetwork.TC7CriminalLevel = 90;
}


}
//---------------------------------------------------------
if(TargetCode == 5){
if(AI){

SlavuicNetwork.instance.PriorityWaypoint.position = transform.position;

if(DamageCode == 0)
AI.GetComponent(AIName).PissedAtTC0a += 3;
if(DamageCode == 1 && PShot){
SlavuicNetwork.target = PlayerInformation.instance.PiriTarget;
AI.GetComponent(AIName).PissedAtTC1 += 3;
}
if(DamageCode == 3 && IsMachine)
AI.GetComponent(AIName).PissedAtTC3 += 3;
if(DamageCode == 4)
AI.GetComponent(AIName).PissedAtTC4 += 3;
if(DamageCode == 7)
AI.GetComponent(AIName).PissedAtTC7 += 3;
}
if(Health < 1 && !Honce){
Honce = true;
if(DamageCode == 0)
SlavuicNetwork.TC0aDeathRow = 240;
if(DamageCode == 1 && PShot){
SlavuicNetwork.TC1DeathRow += 240;
if(StaticHealth < 200){
SlavuicNetwork.CasualtiesFromTC1 += 1;
}else{
SlavuicNetwork.CasualtiesFromTC1 = 1;
SlavuicNetwork.TC1DeathRow = 700;
}
}
if(DamageCode == 3)
SlavuicNetwork.TC3DeathRow = 240;
if(DamageCode == 4)
SlavuicNetwork.TC4DeathRow = 240;
if(DamageCode == 6)
SlavuicNetwork.TC6DeathRow = 240;
if(DamageCode == 7)
SlavuicNetwork.TC7DeathRow = 240;
}
}
//---------------------------------------------------------
if(TargetCode == 6){
if(DamageCode == 0)
AbiaSyndicateNetwork.instance.TC0aCriminalLevel += 10;

if(DamageCode == 1)
AbiaSyndicateNetwork.instance.TC1CriminalLevel += 10;

if(DamageCode == 2)
AbiaSyndicateNetwork.instance.TC2CriminalLevel += 10;

if(DamageCode == 3)
AbiaSyndicateNetwork.instance.TC3CriminalLevel += 10;

if(DamageCode == 4)
AbiaSyndicateNetwork.instance.TC4CriminalLevel += 10;

if(DamageCode == 5)
AbiaSyndicateNetwork.instance.TC5CriminalLevel += 10;

if(PShot){
if(DamageCode == 6){
WorldInformation.PiriExposed = 60;
AbiaSyndicateNetwork.instance.TC1CriminalLevel += 10;
}
}

if(DamageCode == 7)
AbiaSyndicateNetwork.instance.TC7CriminalLevel += 10;

if(Health < 1 && !Honce)
AbiaSyndicateNetwork.instance.Alert = true;

}
//---------------------------------------------------------
if(TargetCode == 7){
if(DamageCode == 0)
MevNavNetwork.TC0aDeathRow = 60;
if(DamageCode == 2)
MevNavNetwork.TC2DeathRow = 60;
if(DamageCode == 3)
MevNavNetwork.TC3DeathRow = 600;
if(DamageCode == 4)
MevNavNetwork.TC4DeathRow = 60;
if(DamageCode == 5)
MevNavNetwork.TC5DeathRow = 600;

if(AI){
if(StaticHealth == 128 && Health < 42)
AI.GetComponent(AIName).Emergency = true;

if(StaticHealth == 64 && Health < 21)
AI.GetComponent(AIName).Emergency = true;

if(StaticHealth == 32 && Health < 12)
AI.GetComponent(AIName).Emergency = true;
}

if(Health < 1){
if(DamageCode == 1 && PShot){
if(MevNavNetwork.TC1DeathRow < 240)
MevNavNetwork.TC1DeathRow = 240;
}
}

}
//---------------------------------------------------------

if(TargetCode == 9){

if(DamageCode == 0){
if(DutvutanianNetwork.TC0aCriminalLevel < 240)
DutvutanianNetwork.TC0aCriminalLevel += 60;
}
if(DamageCode == 1 && PShot){
if(DutvutanianNetwork.TC1CriminalLevel < 240)
DutvutanianNetwork.TC1CriminalLevel += 60;
}
if(DamageCode == 2){
if(DutvutanianNetwork.TC2CriminalLevel < 240)
DutvutanianNetwork.TC2CriminalLevel += 60;
}
if(DamageCode == 3){
if(DutvutanianNetwork.TC3CriminalLevel < 240)
DutvutanianNetwork.TC3CriminalLevel += 60;
}
if(DamageCode == 4){
if(DutvutanianNetwork.TC4CriminalLevel < 240)
DutvutanianNetwork.TC4CriminalLevel += 60;
}
if(DamageCode == 5){
if(DutvutanianNetwork.TC5CriminalLevel < 240)
DutvutanianNetwork.TC5CriminalLevel += 60;
}
if(DamageCode == 6){
if(DutvutanianNetwork.TC6CriminalLevel < 240)
DutvutanianNetwork.TC6CriminalLevel += 60;
}
if(DamageCode == 7){
if(DutvutanianNetwork.TC7CriminalLevel < 240)
DutvutanianNetwork.TC7CriminalLevel += 60;
}
if(DamageCode == 8){
if(DutvutanianNetwork.TC8CriminalLevel < 240)
DutvutanianNetwork.TC8CriminalLevel += 60;
}


}

//---------------------------------------------------------
}

if(Health < 1 && once == false) {

once = true;

if(Piri)
Piri.Hurt();

if(ParentDamage)
ParentDamage.DamageIn(BreakDamageSend, DamageCode, 0, PShot);

if(GunScript)
Destroy(GunScript);

if(otherGunScript)
Destroy(otherGunScript);

if(missileScript)
missileScript.Disable();

if(BrokenSound){
		var TheThing1 = Instantiate(BrokenSound, transform.position, transform.rotation);
		TheThing1.transform.parent = gameObject.transform;
		}

if(ResetDrag){
	    rigidbody.drag = 0.05;
	    rigidbody.angularDrag = 0.05;
	    }
	    
	    if(ResetGravity){
	    rigidbody.useGravity = true;
	    }
	    
transform.name = "broken";
	
}

yield WaitForSeconds (1.6);
HeavyHit = false;
	
}else{

if(isGun || isLauncher){













if (NoArmor == true){
if(PShot && Health > 0){

ThisDamage = Damage;
SendDamage = Damage;

if(Health < Damage + 1){
ThisDamage -= Health;
SendDamage -= ThisDamage;
}

DamageCounter.instance.ShowDamage(SendDamage, TargetCode);
}

Health -= Damage;
}

if (LightArmor == true) {
if(PShot && Health > 0){

ThisDamage = Damage * 0.5;
SendDamage = Damage * 0.5;

if(Health < Damage * 0.5){
ThisDamage -= Health;
SendDamage -= ThisDamage;
}

DamageCounter.instance.ShowDamage(SendDamage, TargetCode);
}

Health -= Damage * 0.5;
}

if(HeavyArmor == true){
if(PShot && Health > 0){

ThisDamage = Damage * 0.25;
SendDamage = Damage * 0.25;

if(Health < Damage * 0.25){
ThisDamage -= Health;
SendDamage -= ThisDamage;
}

DamageCounter.instance.ShowDamage(SendDamage, TargetCode);
}

Health -= Damage * 0.25;
}

if(ExtraThiccArmor == true){
if(PShot && Health > 0){

ThisDamage = Damage * 0.125;
SendDamage = Damage * 0.125;

if(Health < Damage * 0.125){
ThisDamage -= Health;
SendDamage -= ThisDamage;
}

DamageCounter.instance.ShowDamage(SendDamage, TargetCode);
}

Health -= Damage * 0.125;
}

if(UtsargalineArmor == true){
if(PShot && Health > 0){

ThisDamage = Damage * 0.01;
SendDamage = Damage * 0.01;

if(Health < Damage * 0.01){
ThisDamage -= Health;
SendDamage -= ThisDamage;
}

DamageCounter.instance.ShowDamage(SendDamage, TargetCode);
}


Health -= Damage * 0.01;
}











if(Health < 1 && Donce == false){
if(isGun){
if(PlayerGunScript.gunUsed == gunNumber){
if(isVolleyGun){
PlayerGunScript.VolleyBroken = true;
}else{
PlayerGunScript.Broken = true;

if(isSecGun)
PlayerGunScript.SecBroken = true;
}
}
}
if(isLauncher)
PlayerLauncherScript.Broken = true;
Donce = true;
}

}else{
ParentDamage.DamageIn(Damage, DamageCode, 0, PShot);
}

}
}





function Tick () {

if (ParentDamage)
if (ParentDamage.IsInside){

if(ParentDamage.Health < 1){
if(PlayerGunScript)
   PlayerGunScript.Broken = true;
   return;
   }

if(isGun || isLauncher){
if(Health < 1) {
if(PlayerGunScript.gunUsed == gunNumber){
IndicatorScript.GunIsDamaged = true;
//Debug.Log("IsBroken1");
}
if(isGun){
if(PlayerGunScript.gunUsed == gunNumber){
if(isVolleyGun){
PlayerGunScript.VolleyBroken = true;
}else{
if(isSecGun)
PlayerGunScript.SecBroken = true;
else
PlayerGunScript.Broken = true;
}
}
}
if(isLauncher)
PlayerLauncherScript.Broken = true;
}else{
if(isGun)
if(PlayerGunScript.gunUsed == gunNumber){
if(!PlayerGunScript.VolleyBroken && !PlayerGunScript.SecBroken)
IndicatorScript.GunIsDamaged = false;
PlayerGunScript.Broken = false;
}
}
}

}
}

function OnJointBreak(breakForce : float) {
if(ParentDamage)
ParentDamage.DamageIn(BreakDamageSend, 0, 0, false);

if(BrokenSound){
		var TheThing0 = Instantiate(BrokenSound, transform.position, transform.rotation);
		TheThing0.transform.parent = gameObject.transform;
		}

if(ResetDrag){
	    rigidbody.drag = 0.05;
	    rigidbody.angularDrag = 0.05;
	    }
	    
	    if(ResetGravity){
	    rigidbody.useGravity = true;
	    }

}