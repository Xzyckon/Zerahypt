var Health : float = 10;

var StaticHealth : float = 10;

var HealthThreshold : float = 10;
var HighThreshold : boolean;

var HurtThreshold : float = 10;

var TargetCode = 0;

var ThisDamage : float = 0;
var SendDamage : float = 0;

var lastVelocity : float;
var Gs : float;
var Threshold : float;

var scalarForceCurve : AnimationCurve = new AnimationCurve();

private var once : boolean;

private var Honce : boolean;

var forceOnce : boolean;

private var hurtOnce : boolean;

private var DetOnce : boolean;

private var SpaceOnce : boolean;

private var HeavyHit : boolean;

private var ExtraThiccHit : boolean;

var PlayerControlled : boolean;

var OtherDamage : VehicleDamage;

var PlayerGunScript : NewgunController;

var CanRegenerate : boolean;
var RegenAmount : float = 0.005;

var StartFromOne : boolean;
var StartFromRandom : boolean;

var RestartingFromOne : boolean;

var RegisterTouch : boolean;

var RegisterForce : boolean;

var useScalarForce : boolean;

var SkipTargetForce : boolean;

var RegisterHit : boolean;

var RegisterHitExtra : boolean;

var RegisterHeavyHit : boolean;

var RegisterExtraThiccHit : boolean;

var SkipThreatCount : boolean;

var SkipSpaceDamage : boolean;

var IsCivilian : boolean;

var IsMachine : boolean;

var IsPiriCeptopod : boolean;

var IsPersonalDrone : boolean;

var IsInside : boolean;

var PartiallyDamaged : boolean;

var TheThingie : GameObject;

var NoArmor : boolean;
var LightArmor : boolean;
var MediumArmor : boolean;
var HeavyArmor : boolean;
var ThiccArmor : boolean;
var ExtraThiccArmor : boolean;
var UtsargalineArmor : boolean;
var AtsargalineArmor : boolean;

var UsingRammer : boolean;

var CanEmergency : boolean;

var SkipSensitivity : boolean;
var FrontSensitive : boolean;
var SenSplitCenter : float = 0;
var DamageReceival : float = 0.5;

var OpenVessel : boolean;

var ExplosiveVessel : boolean;
var ExplodeParent : boolean;
var Explosion : GameObject;

var LocalOriExp : boolean;

var UseDetonate : boolean;

var DeployOnBreakVessel : boolean;

var DeployDelay : float = 6;

var Gates : GameObject;
var GateJoint : FixedJoint;
var Gates2 : GameObject;
var GateJoint2 : ConfigurableJoint;
var DeployeeFab1 : GameObject;
var Deployee1GO : GameObject;
var Deployee1AIGO : GameObject;
var Deployee1IsOut : boolean;
var DeployeeFab2 : GameObject;
var DeployeeFab3 : GameObject;
var DeployeeFab4 : GameObject;
var DeployeeFab5 : GameObject;
var DeployeeFab6 : GameObject;
var DeployeeFab7 : GameObject;
var DeployeeArea1 : GameObject;
var DeployeeArea2 : GameObject;
var DeployeeArea3 : GameObject;
var DeployeeArea4 : GameObject;
var DeployeeArea5 : GameObject;
var DeployeeArea6 : GameObject;
var DeployeeArea7 : GameObject;

var Helirotor : boolean;
var TorqueScript : TorqueScript1;
var Rotor : GameObject;

var Dislodge : boolean;

var ResetDrag : boolean;
var ResetGravity : boolean;

var PiriIsHurt : boolean;

var AI : GameObject;
var AIName : String = "PersonMcPersonface";
var AIrigidbody : Rigidbody;
var AITrig : CapsuleCollider;

var DestroyAI : boolean;

var AICallDeathFunction : boolean;

var CustomDeath : boolean;

var ColSoundBreakUsage : boolean;
var ColSound : CollisionSound;

var UsesWMC : boolean;
var WMCs : GameObject[];

var Vehicle : GameObject;
var HurtSound : GameObject;
var PartialBrokenSound : GameObject;
var OnboardBrokenSound : GameObject;
var BrokenSound : GameObject;
var SecondBrokenSound : GameObject;

var UnparentBrokenSound : boolean;
var UnparentSecondBrokenSound : boolean;

var UnparentOBBrokenSound : boolean;

var BrokenEffectArea : GameObject;
var BrokenSubPart1 : GameObject;
var BrokenSubPart2 : GameObject;

var BreakDelay : float = 0.05;
var SecondBreakDelay : float = 0.05;

var FinalBreakDelay : float = 0;

var WhatToUnchild : Transform[];

var WhatToUnjoint : ConfigurableJoint[];

var WhatToDestroy : GameObject[];
var SecondWhatToDestroy : GameObject[];
var PartialWhatToDestroy : GameObject[];

var Part1Lock : GameObject;
var Part2Lock : GameObject;
var Part3Lock : GameObject;
var Part4Lock : GameObject;
var Part5Lock : GameObject;
var Part6Lock : GameObject;
var PartFinal : Rigidbody;
var PartFinalMass : float = 1;
var LockDist : float = 6;
var Locking : boolean;

var ParticleFX : ParticleSystem[];

var EngineEffects : GameObject[];
var SpinningParts : GameObject[];
var Props : GameObject[];
var Wings : GameObject[];
var PartsResetDrag : GameObject[];
var PartsResetGrav : GameObject[];
var LimbSections : GameObject[];

var HingeStop : HingeJoint[];

var Sound : AudioSource;

var Rotator : BigVesselRotator;

var RadarController : RadarScript;

var GunController : GameObject;

var ConJoint : ConfigurableJoint;

var SprJoint : SpringJoint;

var MtargetLayers : LayerMask;

InvokeRepeating("Tick", 1, 0.2);

function Start(){

forceOnce = true;

if(Vehicle)
if(Vehicle.GetComponent("MainVehicleController"))
PlayerControlled = true;

    if(!RestartingFromOne)
    StaticHealth = Health;
    
	HurtThreshold = -Health;
	
	if(!HighThreshold)
	HealthThreshold = Health * 0.33;
	else
	HealthThreshold = Health * 0.5;
	
	if(useScalarForce){
	Threshold = 1000;
	var RBDiv = rigidbody.mass * 0.1;
	Threshold = Threshold + RBDiv;
	}
	
	if(ColSoundBreakUsage){
	ColSound.Broken = true;
	ColSound.BrokenC = true;
	}
	
	if(IsCivilian){
	if(TargetCode == 3 && WorldInformation.instance.AreaCode == 1)
	TargetCode = 0;
	}
	
	if(!SkipSpaceDamage)
	if(WorldInformation.instance.AreaSpace == true){
	DamageIn(2048, 0, 0, true);
	SpaceOnce = true;
	}
	
	if(!RestartingFromOne){
	if(StartFromOne)
	Health = 1;
	
	if(StartFromRandom)
	Health = Random.Range(1, StaticHealth);
	}
	
	yield WaitForSeconds (0.3);
	forceOnce = false;
}

function RestartFromOne(){
RestartingFromOne = true;
StaticHealth = Health;
Health = 1;
}

function FixedUpdate(){

if(CanRegenerate){
if(Health >= 1)
if(Health < StaticHealth)
Health += RegenAmount;
}

if(RegisterForce){

var acceleration = (rigidbody.velocity.magnitude - lastVelocity) / Time.deltaTime;
    Gs = Mathf.Abs(acceleration);

lastVelocity = rigidbody.velocity.magnitude;

if(!forceOnce){
    
    if(!useScalarForce){
    
    if(Gs > 2000){
    
    if(rigidbody.mass > 0.011){
    forceOnce = true;
    if(!SkipTargetForce){
    if(Vector3.Distance(transform.position, PlayerInformation.instance.PiriTarget.position) < 20 && WorldInformation.vehicleSpeed > 90)
    DamageIn(100000, 1, 0, true);
    else
    DamageIn(100000, 0, 0, false);
    }else{
    DamageIn(100000, 0, 0, false);
    }
    }
    
    if(rigidbody.mass < 0.011 && Gs > 4000){
    forceOnce = true;
    if(!SkipTargetForce){
    if(Vector3.Distance(transform.position, PlayerInformation.instance.PiriTarget.position) < 20 && WorldInformation.vehicleSpeed > 90)
    DamageIn(100000, 1, 0, true);
    else
    DamageIn(100000, 0, 0, false);
    }else{
    DamageIn(100000, 0, 0, false);
    }
    }
    
    }
    }else{

    if(Gs > Threshold){
    forceOnce = true;
    if(!SkipTargetForce){
    if(Vector3.Distance(transform.position, PlayerInformation.instance.PiriTarget.position) < 20 && WorldInformation.vehicleSpeed > 90)
    DamageIn(100000, 1, 0, true);
    else
    DamageIn(100000, 0, 0, false);
    }else{
    DamageIn(100000, 0, 0, false);
    }
    }
    }
}
}

	if(PiriIsHurt)
		AudioListener.volume -= 0.005;
}

function OnCollisionStay(collision : Collision){
if(RegisterTouch){
if(AI){
if(collision.gameObject.tag == "Vehicle" || 
   collision.gameObject.tag == "Body" || 
   collision.gameObject.tag == "Metal"){
AI.GetComponent(AIName).OnHull = true;
}
}
}
}

function DamageIn (Damage : float, DamageCode : int, Frontal : float, PShot : boolean) {

if(!SkipSensitivity){
if(!FrontSensitive && Frontal < SenSplitCenter)
Damage = Damage * DamageReceival;
if(FrontSensitive && Frontal > SenSplitCenter)
Damage = Damage * DamageReceival;
}

if (NoArmor == true){
if(PShot && Health > 0){

ThisDamage = Damage;
SendDamage = Damage;

if(Health < Damage){
ThisDamage -= Health;
SendDamage -= ThisDamage;
}

if(SendDamage > 0)
DamageCounter.instance.ShowDamage(SendDamage, TargetCode);
}

Health -= Damage;
if(Damage > 24){
HeavyHit = true;
if(Damage > 96)
ExtraThiccHit = true;
}
}

if (LightArmor == true) {
if(PShot && Health > 0){

ThisDamage = Damage * 0.5;
SendDamage = Damage * 0.5;

if(Health < Damage * 0.5){
ThisDamage -= Health;
SendDamage -= ThisDamage;
}

if(SendDamage > 0)
DamageCounter.instance.ShowDamage(SendDamage, TargetCode);
}

Health -= Damage * 0.5;
if(Damage > 24){
HeavyHit = true;
if(Damage > 96)
ExtraThiccHit = true;
}
}

if(MediumArmor == true){
if(PShot && Health > 0){

ThisDamage = Damage * 0.25;
SendDamage = Damage * 0.25;

if(Health < Damage * 0.25){
ThisDamage -= Health;
SendDamage -= ThisDamage;
}

if(SendDamage > 0)
DamageCounter.instance.ShowDamage(SendDamage, TargetCode);
}

Health -= Damage * 0.25;
if(Damage > 24){
HeavyHit = true;
if(Damage > 96)
ExtraThiccHit = true;
}
}

if(HeavyArmor == true){
if(PShot && Health > 0){

ThisDamage = Damage * 0.125;
SendDamage = Damage * 0.125;

if(Health < Damage * 0.125){
ThisDamage -= Health;
SendDamage -= ThisDamage;
}

if(SendDamage > 0)
DamageCounter.instance.ShowDamage(SendDamage, TargetCode);
}

Health -= Damage * 0.125;
if(Damage > 24){
HeavyHit = true;
if(Damage > 96)
ExtraThiccHit = true;
}
}

if(ThiccArmor == true){
if(PShot && Health > 0){

ThisDamage = Damage * 0.085;
SendDamage = Damage * 0.085;

if(Health < Damage * 0.085){
ThisDamage -= Health;
SendDamage -= ThisDamage;
}

if(SendDamage > 0)
DamageCounter.instance.ShowDamage(SendDamage, TargetCode);
}

Health -= Damage * 0.085;
if(Damage > 24){
HeavyHit = true;
if(Damage > 96)
ExtraThiccHit = true;
}
}
	
if(ExtraThiccArmor == true){
if(PShot && Health > 0){

ThisDamage = Damage * 0.0625;
SendDamage = Damage * 0.0625;

if(Health < Damage * 0.0625){
ThisDamage -= Health;
SendDamage -= ThisDamage;
}

if(SendDamage > 0)
DamageCounter.instance.ShowDamage(SendDamage, TargetCode);
}

Health -= Damage * 0.0625;
if(Damage > 24){
HeavyHit = true;
if(Damage > 96)
ExtraThiccHit = true;
}
}

if(UtsargalineArmor == true){
if(PShot && Health > 0){

ThisDamage = Damage * 0.01;
SendDamage = Damage * 0.01;

if(Health < Damage * 0.01){
ThisDamage -= Health;
SendDamage -= ThisDamage;
}

if(SendDamage > 0)
DamageCounter.instance.ShowDamage(SendDamage, TargetCode);
}

Health -= Damage * 0.01;
if(Damage > 24){
HeavyHit = true;
if(Damage > 96)
ExtraThiccHit = true;
}
}

if(AtsargalineArmor == true){
if(PShot && Health > 0){

ThisDamage = Damage * 0.003;
SendDamage = Damage * 0.003;

if(Health < Damage * 0.003){
ThisDamage -= Health;
SendDamage -= ThisDamage;
}

if(SendDamage > 0)
DamageCounter.instance.ShowDamage(SendDamage, TargetCode);
}

Health -= Damage * 0.003;
if(Damage > 24){
HeavyHit = true;
if(Damage > 96)
ExtraThiccHit = true;
}
}

if(HeavyHit && RegisterHeavyHit){
if(AI)
AI.GetComponent(AIName).Emergency = true;
HeavyHit = false;
}

if(ExtraThiccHit && RegisterExtraThiccHit){
if(AI)
AI.GetComponent(AIName).Emergency = true;
ExtraThiccHit = false;
}

if(!once)
if(!SkipThreatCount){
//---------------------------------------------------------
if(TargetCode == 2){

if(PShot){
if(DamageCode == 1){

if(RegisterHit)
if(AI)
AI.GetComponent(AIName).PissedAtTC1 += Damage;

if(Damage < StaticHealth)
AgrianNetwork.instance.TC1CriminalLevel += Damage * 2;
else
AgrianNetwork.instance.TC1CriminalLevel += StaticHealth * 2;
}else{
WorldInformation.PiriWanted += Damage;
WorldInformation.instance.NaughtyVicinity = transform.position;
}
if(DamageCode == 2){
WorldInformation.PiriExposed = 60;
AgrianNetwork.instance.TC1CriminalLevel += Damage * 2;
}
}

if(DamageCode == 3){

if(RegisterHit)
if(AI)
AI.GetComponent(AIName).PissedAtTC3 += Damage;

if(Damage < StaticHealth)
AgrianNetwork.instance.TC3CriminalLevel += Damage * 2;
else
AgrianNetwork.instance.TC3CriminalLevel += StaticHealth;
}

if(DamageCode == 4){

if(RegisterHit)
if(AI)
AI.GetComponent(AIName).PissedAtTC4 += Damage;

if(Damage < StaticHealth)
AgrianNetwork.instance.TC4CriminalLevel += Damage * 2;
else
AgrianNetwork.instance.TC4CriminalLevel += StaticHealth * 2;
}

if(DamageCode == 5){

if(RegisterHit)
if(AI)
AI.GetComponent(AIName).PissedAtTC5 += Damage;

if(Damage < StaticHealth)
AgrianNetwork.instance.TC5CriminalLevel += Damage * 2;
else
AgrianNetwork.instance.TC5CriminalLevel += StaticHealth * 2;
}

if(DamageCode == 6){

if(RegisterHit)
if(AI)
AI.GetComponent(AIName).PissedAtTC6 += Damage;

if(Damage < StaticHealth)
AgrianNetwork.instance.TC6CriminalLevel += Damage * 2;
else
AgrianNetwork.instance.TC6CriminalLevel += StaticHealth * 2;
}

if(DamageCode == 7){

if(RegisterHit)
if(AI)
AI.GetComponent(AIName).PissedAtTC7 += Damage;

if(Damage < StaticHealth)
AgrianNetwork.instance.TC7CriminalLevel += Damage * 2;
else
AgrianNetwork.instance.TC7CriminalLevel += StaticHealth * 2;
}

if(DamageCode == 8){

if(RegisterHit)
if(AI)
AI.GetComponent(AIName).PissedAtTC8 += Damage;

if(Damage < StaticHealth)
AgrianNetwork.instance.TC8CriminalLevel += Damage * 2;
else
AgrianNetwork.instance.TC8CriminalLevel += StaticHealth * 2;
}

if(DamageCode == 9){

if(RegisterHit)
if(AI)
AI.GetComponent(AIName).PissedAtTC9 += Damage;

if(Damage < StaticHealth)
AgrianNetwork.instance.TC9CriminalLevel += Damage * 2;
else
AgrianNetwork.instance.TC9CriminalLevel += StaticHealth * 2;
}

if(Health < 1 && !Honce){
Honce = true;
AgrianNetwork.instance.PriorityWaypoint.transform.position = transform.position;
if(StaticHealth < 48){
if(AgrianNetwork.instance.AlertTime < 240)
AgrianNetwork.instance.AlertTime = 240;
}else{
if(StaticHealth < 1000){
AgrianNetwork.instance.FullPriorityWaypoint.transform.position = transform.position;
if(AgrianNetwork.instance.AlertTime < 300)
AgrianNetwork.instance.AlertTime = 300;
AgrianNetwork.instance.RedAlertTime = 300;
}else{
AgrianNetwork.instance.FullPriorityWaypoint.transform.position = transform.position;
AgrianNetwork.instance.AlertTime = 600;
AgrianNetwork.instance.RedAlertTime = 600;
}
}
}

}
//---------------------------------------------------------
if(TargetCode == 3){
if(DamageCode == 0){

if(Damage < StaticHealth)
TerrahyptianNetwork.TC0aCriminalLevel += Damage * 3;
else
TerrahyptianNetwork.TC0aCriminalLevel += StaticHealth * 3;

if(Health < 1 && !Honce)
if(!IsCivilian){
Honce = true;
if(AI)
TerrahyptianNetwork.instance.EnemyTarget2 = AI.GetComponent(AIName).target;
TerrahyptianNetwork.instance.PriorityWaypoint.position = transform.position;
}
}


if(PShot){
if(DamageCode == 1){

if(Damage < StaticHealth)
TerrahyptianNetwork.TC1CriminalLevel += Damage * 3;
else
TerrahyptianNetwork.TC1CriminalLevel += StaticHealth * 3;

if(Health < 1 && !Honce){
TerrahyptianNetwork.TC1Nuisance += 1;
WorldInformation.instance.NaughtyVicinity = transform.position;
if(!IsCivilian){
TerrahyptianNetwork.AlertLVL1 = 1;
Honce = true;
if(AI)
TerrahyptianNetwork.instance.EnemyTarget2 = AI.GetComponent(AIName).target;
TerrahyptianNetwork.instance.PriorityWaypoint.position = transform.position;
}
}
}
if(DamageCode == 3){
WorldInformation.PiriExposed = 60;
if(Damage < StaticHealth)
TerrahyptianNetwork.TC1CriminalLevel += Damage * 3;
else
TerrahyptianNetwork.TC1CriminalLevel += StaticHealth * 3;
}
}



if(DamageCode == 4){

if(Damage < StaticHealth)
TerrahyptianNetwork.TC4CriminalLevel += Damage * 3;
else
TerrahyptianNetwork.TC4CriminalLevel += StaticHealth * 3;

if(Health < 1 && !Honce)
if(!IsCivilian){
TerrahyptianNetwork.AlertLVL1 = 4;
Honce = true;
if(AI)
TerrahyptianNetwork.instance.EnemyTarget2 = AI.GetComponent(AIName).target;
TerrahyptianNetwork.instance.PriorityWaypoint.position = transform.position;
}
}
if(DamageCode == 5){

if(Damage < StaticHealth)
TerrahyptianNetwork.TC5CriminalLevel += Damage * 3;
else
TerrahyptianNetwork.TC5CriminalLevel += StaticHealth * 3;

if(Health < 1 && !Honce)
if(!IsCivilian){
TerrahyptianNetwork.AlertLVL1 = 5;
Honce = true;
if(AI)
TerrahyptianNetwork.instance.EnemyTarget2 = AI.GetComponent(AIName).target;
TerrahyptianNetwork.instance.PriorityWaypoint.position = transform.position;
}
}
if(DamageCode == 6){

if(Damage < StaticHealth)
TerrahyptianNetwork.TC6CriminalLevel += Damage * 3;
else
TerrahyptianNetwork.TC6CriminalLevel += StaticHealth * 3;

if(Health < 1 && !Honce)
if(!IsCivilian){
TerrahyptianNetwork.AlertLVL1 = 6;
Honce = true;
if(AI)
TerrahyptianNetwork.instance.EnemyTarget2 = AI.GetComponent(AIName).target;
TerrahyptianNetwork.instance.PriorityWaypoint.position = transform.position;
}
}
if(DamageCode == 7){

if(Damage < StaticHealth)
TerrahyptianNetwork.TC7CriminalLevel += Damage * 3;
else
TerrahyptianNetwork.TC7CriminalLevel += StaticHealth * 3;

if(Health < 1 && !Honce)
if(!IsCivilian){
TerrahyptianNetwork.AlertLVL1 = 7;
Honce = true;
if(AI)
TerrahyptianNetwork.instance.EnemyTarget2 = AI.GetComponent(AIName).target;
TerrahyptianNetwork.instance.PriorityWaypoint.position = transform.position;
}
}
if(DamageCode == 8){

if(Damage < StaticHealth)
TerrahyptianNetwork.TC8CriminalLevel += Damage * 3;
else
TerrahyptianNetwork.TC8CriminalLevel += StaticHealth * 3;

if(Health < 1 && !Honce)
if(!IsCivilian){
TerrahyptianNetwork.AlertLVL1 = 8;
Honce = true;
if(AI)
TerrahyptianNetwork.instance.EnemyTarget2 = AI.GetComponent(AIName).target;
TerrahyptianNetwork.instance.PriorityWaypoint.position = transform.position;
}
}
if(DamageCode == 9){

if(Damage < StaticHealth)
TerrahyptianNetwork.TC9CriminalLevel += Damage * 3;
else
TerrahyptianNetwork.TC9CriminalLevel += StaticHealth * 3;

if(Health < 1 && !Honce)
if(!IsCivilian){
TerrahyptianNetwork.AlertLVL1 = 9;
Honce = true;
if(AI)
TerrahyptianNetwork.instance.EnemyTarget2 = AI.GetComponent(AIName).target;
TerrahyptianNetwork.instance.PriorityWaypoint.position = transform.position;
}
}

}
//---------------------------------------------------------
if(TargetCode == 5){
if(AI){

SlavuicNetwork.instance.PriorityWaypoint.position = transform.position;

if(DamageCode == 0){
AI.GetComponent(AIName).PissedAtTC0a += 3;
if(Damage > 64)
if(SlavuicNetwork.TC0aDeathRow < 300)
SlavuicNetwork.TC0aDeathRow += 100;
}

if(DamageCode == 1 && PShot){
SlavuicNetwork.target = PlayerInformation.instance.PiriTarget;
WorldInformation.instance.NaughtyVicinity = transform.position;
AI.GetComponent(AIName).PissedAtTC1 += 3;
}

if(DamageCode == 3){
AI.GetComponent(AIName).PissedAtTC3 += 3;
if(Damage > 64)
if(SlavuicNetwork.TC3DeathRow < 300)
SlavuicNetwork.TC3DeathRow += 100;
}

if(DamageCode == 4){
AI.GetComponent(AIName).PissedAtTC4 += 3;
if(Damage > 64)
if(SlavuicNetwork.TC4DeathRow < 300)
SlavuicNetwork.TC4DeathRow += 100;
}

if(DamageCode == 6){
AI.GetComponent(AIName).PissedAtTC6 += 3;
if(Damage > 64)
if(SlavuicNetwork.TC6DeathRow < 300)
SlavuicNetwork.TC6DeathRow += 100;
}

if(DamageCode == 7){
AI.GetComponent(AIName).PissedAtTC7 += 3;
if(Damage > 64)
if(SlavuicNetwork.TC7DeathRow < 300)
SlavuicNetwork.TC7DeathRow += 100;
}

if(DamageCode == 8){
AI.GetComponent(AIName).PissedAtTC8 += 3;
if(Damage > 64)
if(SlavuicNetwork.TC8DeathRow < 300)
SlavuicNetwork.TC8DeathRow += 100;
}

if(DamageCode == 9){
AI.GetComponent(AIName).PissedAtTC9 += 3;
if(Damage > 64)
if(SlavuicNetwork.TC9DeathRow < 300)
SlavuicNetwork.TC9DeathRow += 100;
}

if(PartiallyDamaged && RegisterHitExtra){
RegisterHeavyHit = true;
}

}

if(PShot){
if(DamageCode == 5){
WorldInformation.PiriExposed = 60;
SlavuicNetwork.TC3DeathRow += 100;
}
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
if(DamageCode == 8)
SlavuicNetwork.TC8DeathRow = 240;
if(DamageCode == 9)
SlavuicNetwork.TC9DeathRow = 240;
}

}
//---------------------------------------------------------
if(TargetCode == 6){
if(DamageCode == 0)
AbiaSyndicateNetwork.instance.TC0aCriminalLevel += 10;

if(DamageCode == 1){
AbiaSyndicateNetwork.instance.TC1CriminalLevel += 10;
WorldInformation.instance.NaughtyVicinity = transform.position;
}

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

if(DamageCode == 8)
AbiaSyndicateNetwork.instance.TC8CriminalLevel += 10;

if(DamageCode == 9)
AbiaSyndicateNetwork.instance.TC9CriminalLevel += 10;

if(Health < 1 && !Honce)
AbiaSyndicateNetwork.instance.Alert = true;

}
//---------------------------------------------------------
if(TargetCode == 7){

if(RegisterHit)
if(AI)
AI.GetComponent(AIName).GotHit = true;

if(DamageCode == 0)
if(MevNavNetwork.TC0aDeathRow < 60)
MevNavNetwork.TC0aDeathRow = 60;

if(DamageCode == 1 && PShot){
if(MevNavNetwork.TC1DeathRow < 300)
MevNavNetwork.TC1DeathRow = 120;
WorldInformation.instance.NaughtyVicinity = transform.position;
}

if(DamageCode == 3)
if(MevNavNetwork.TC3DeathRow < 300)
MevNavNetwork.TC3DeathRow = 120;

if(DamageCode == 4)
if(MevNavNetwork.TC4DeathRow < 60)
MevNavNetwork.TC4DeathRow = 60;

if(DamageCode == 6)
if(MevNavNetwork.TC6DeathRow < 300)
MevNavNetwork.TC6DeathRow = 120;

if(DamageCode == 5)
if(MevNavNetwork.TC5DeathRow < 300)
MevNavNetwork.TC5DeathRow = 120;

if(PShot){
if(DamageCode == 7){
WorldInformation.PiriExposed = 60;
if(MevNavNetwork.TC1DeathRow < 300)
MevNavNetwork.TC1DeathRow = 120;
}
}

if(DamageCode == 8)
if(MevNavNetwork.TC8DeathRow < 300)
MevNavNetwork.TC8DeathRow = 120;

if(DamageCode == 9)
if(MevNavNetwork.TC9DeathRow < 300)
MevNavNetwork.TC9DeathRow = 120;

if(AI){

if(StaticHealth > 1000 && Health < 320)
AI.GetComponent(AIName).Emergency = true;

if(StaticHealth == 160 && Health < 40)
AI.GetComponent(AIName).Emergency = true;

if(StaticHealth == 80 && Health < 20)
AI.GetComponent(AIName).Emergency = true;

if(StaticHealth == 32 && Health < 12)
AI.GetComponent(AIName).Emergency = true;
}

if(Health < 1 && !Honce){

MevNavNetwork.AlertLVL1 = DamageCode;

Honce = true;
MevNavNetwork.AlertTime = 240;

if(StaticHealth > 100){
if(DamageCode == 1 && PShot){
if(MevNavNetwork.TC1DeathRow < 1200){
MevNavNetwork.TC1DeathRow = 1200;
}
}
if(DamageCode == 3)
if(MevNavNetwork.TC3DeathRow < 1200){
MevNavNetwork.TC3DeathRow = 1200;
}
if(DamageCode == 5)
if(MevNavNetwork.TC5DeathRow < 1200){
MevNavNetwork.TC5DeathRow = 1200;
}
if(DamageCode == 6)
if(MevNavNetwork.TC6DeathRow < 1200){
MevNavNetwork.TC6DeathRow = 1200;
}
if(DamageCode == 8)
if(MevNavNetwork.TC8DeathRow < 1200){
MevNavNetwork.TC8DeathRow = 1200;
}
if(DamageCode == 9)
if(MevNavNetwork.TC9DeathRow < 1200){
MevNavNetwork.TC9DeathRow = 1200;
}

MevNavNetwork.instance.PriorityWaypoint.position = transform.position;

if(StaticHealth > 1000)
MevNavNetwork.AlertLVL3 += 1;

}

if(StaticHealth == 80){
if(DamageCode == 1 && PShot){
if(MevNavNetwork.TC1DeathRow < 600){
MevNavNetwork.TC1DeathRow = 600;
}
}
if(DamageCode == 3)
if(MevNavNetwork.TC3DeathRow < 600){
MevNavNetwork.TC3DeathRow = 600;
}
if(DamageCode == 5)
if(MevNavNetwork.TC5DeathRow < 600){
MevNavNetwork.TC5DeathRow = 600;
}
if(DamageCode == 6)
if(MevNavNetwork.TC6DeathRow < 600){
MevNavNetwork.TC6DeathRow = 600;
}
if(DamageCode == 8)
if(MevNavNetwork.TC8DeathRow < 600){
MevNavNetwork.TC8DeathRow = 600;
}
if(DamageCode == 9)
if(MevNavNetwork.TC9DeathRow < 600){
MevNavNetwork.TC9DeathRow = 600;
}
MevNavNetwork.instance.PriorityWaypoint.position = transform.position;
}
    
if(StaticHealth == 24){
if(DamageCode == 1 && PShot){
if(MevNavNetwork.TC1DeathRow < 300){
MevNavNetwork.TC1Nuisance += 1;
MevNavNetwork.instance.PriorityWaypoint.position = transform.position;
}
}
if(DamageCode == 3)
if(MevNavNetwork.TC3DeathRow < 300){
MevNavNetwork.TC3Nuisance += 1;
MevNavNetwork.instance.PriorityWaypoint.position = transform.position;
}
if(DamageCode == 5)
if(MevNavNetwork.TC5DeathRow < 300){
MevNavNetwork.TC5Nuisance += 1;
MevNavNetwork.instance.PriorityWaypoint.position = transform.position;
}
if(DamageCode == 6)
if(MevNavNetwork.TC6DeathRow < 300){
MevNavNetwork.TC6Nuisance += 1;
MevNavNetwork.instance.PriorityWaypoint.position = transform.position;
}
if(DamageCode == 8)
if(MevNavNetwork.TC8DeathRow < 300){
MevNavNetwork.TC8Nuisance += 1;
MevNavNetwork.instance.PriorityWaypoint.position = transform.position;
}
if(DamageCode == 9)
if(MevNavNetwork.TC9DeathRow < 300){
MevNavNetwork.TC9Nuisance += 1;
MevNavNetwork.instance.PriorityWaypoint.position = transform.position;
}
}

}

}
//---------------------------------------------------------

if(TargetCode == 9){
if(DamageCode == 0){

if(Damage < StaticHealth){
if(DutvutanianNetwork.TC0aCriminalLevel < 240){
DutvutanianNetwork.TC0aCriminalLevel += 60;
}else{
if(Damage < 600)
DutvutanianNetwork.TC0aCriminalLevel += Damage * 0.2;
else
DutvutanianNetwork.TC0aCriminalLevel = 600;
}

if(DutvutanianNetwork.instance.AlertTime < 30)
DutvutanianNetwork.instance.AlertTime = Damage;
}else{
if(Damage < 600)
DutvutanianNetwork.TC0aCriminalLevel += Damage * 0.2;
else
DutvutanianNetwork.TC0aCriminalLevel += 600;

DutvutanianNetwork.instance.AlertTime = 120;
}

if(Health < 1 && !Honce)
if(!IsCivilian){
Honce = true;
if(AI)
DutvutanianNetwork.instance.EnemyTargetMin = AI.GetComponent(AIName).target;
}
}


if(PShot){
if(DamageCode == 1){

if(Damage < StaticHealth){
if(DutvutanianNetwork.TC1CriminalLevel < 240){
DutvutanianNetwork.TC1CriminalLevel += 60;
}else{
if(Damage < 600)
DutvutanianNetwork.TC1CriminalLevel += Damage * 0.2;
else
DutvutanianNetwork.TC1CriminalLevel = 600;
}

if(DutvutanianNetwork.instance.AlertTime < 30)
DutvutanianNetwork.instance.AlertTime = Damage;
}else{
if(Damage < 600)
DutvutanianNetwork.TC1CriminalLevel += Damage * 0.2;
else
DutvutanianNetwork.TC1CriminalLevel += 600;

DutvutanianNetwork.instance.AlertTime = 120;
}

if(Health < 1 && !Honce){
TerrahyptianNetwork.TC1Nuisance += 1;
WorldInformation.instance.NaughtyVicinity = transform.position;
if(!IsCivilian){
DutvutanianNetwork.TC1CriminalPoints += 1;
Honce = true;
if(AI)
if(AI.GetComponent(AIName))
if(AI.GetComponent(AIName).target)
DutvutanianNetwork.instance.EnemyTargetMin = AI.GetComponent(AIName).target;
}
}
}
if(DamageCode == 9){
WorldInformation.PiriExposed = 60;
if(Damage < StaticHealth){
if(DutvutanianNetwork.TC1CriminalLevel < 240){
DutvutanianNetwork.TC1CriminalLevel += 60;
}else{
if(Damage < 600)
DutvutanianNetwork.TC1CriminalLevel += Damage * 0.2;
else
DutvutanianNetwork.TC1CriminalLevel = 600;

}

if(DutvutanianNetwork.instance.AlertTime < 30){
DutvutanianNetwork.instance.AlertTime = Damage;
}
}else{
if(Damage < 600)
DutvutanianNetwork.TC1CriminalLevel += Damage * 0.2;
else
DutvutanianNetwork.TC1CriminalLevel += 600;

DutvutanianNetwork.instance.AlertTime = 120;
}
}
}

if(DamageCode == 2){

if(Damage < StaticHealth){
if(DutvutanianNetwork.TC2CriminalLevel < 240){
DutvutanianNetwork.TC2CriminalLevel += 60;
}else{
if(Damage < 600)
DutvutanianNetwork.TC2CriminalLevel += Damage * 0.2;
else
DutvutanianNetwork.TC2CriminalLevel = 600;
}

if(DutvutanianNetwork.instance.AlertTime < 30)
DutvutanianNetwork.instance.AlertTime = Damage;
}else{
if(Damage < 600)
DutvutanianNetwork.TC2CriminalLevel += Damage * 0.2;
else
DutvutanianNetwork.TC2CriminalLevel += 600;

DutvutanianNetwork.instance.AlertTime = 120;
}

if(Health < 1 && !Honce)
if(!IsCivilian){
DutvutanianNetwork.TC2CriminalPoints += 1;
Honce = true;
if(AI)
if(AI.GetComponent(AIName))
if(AI.GetComponent(AIName).target)
DutvutanianNetwork.instance.EnemyTargetMin = AI.GetComponent(AIName).target;
}
}

if(DamageCode == 3){

if(Damage < StaticHealth){
if(DutvutanianNetwork.TC3CriminalLevel < 240){
DutvutanianNetwork.TC3CriminalLevel += 60;
}else{
if(Damage < 600)
DutvutanianNetwork.TC3CriminalLevel += Damage * 0.2;
else
DutvutanianNetwork.TC3CriminalLevel = 600;
}

if(DutvutanianNetwork.instance.AlertTime < 30)
DutvutanianNetwork.instance.AlertTime = Damage;
}else{
if(Damage < 600)
DutvutanianNetwork.TC3CriminalLevel += Damage * 0.2;
else
DutvutanianNetwork.TC3CriminalLevel += 600;

DutvutanianNetwork.instance.AlertTime = 120;
}

if(Health < 1 && !Honce)
if(!IsCivilian){
DutvutanianNetwork.TC3CriminalPoints += 1;
Honce = true;
if(AI)
if(AI.GetComponent(AIName))
if(AI.GetComponent(AIName).target)
DutvutanianNetwork.instance.EnemyTargetMin = AI.GetComponent(AIName).target;
}
}

if(DamageCode == 4){

if(Damage < StaticHealth){
if(DutvutanianNetwork.TC4CriminalLevel < 240){
DutvutanianNetwork.TC4CriminalLevel += 60;
}else{
if(Damage < 600)
DutvutanianNetwork.TC4CriminalLevel += Damage * 0.2;
else
DutvutanianNetwork.TC4CriminalLevel = 600;
}

if(DutvutanianNetwork.instance.AlertTime < 30)
DutvutanianNetwork.instance.AlertTime = Damage;
}else{
if(Damage < 600)
DutvutanianNetwork.TC4CriminalLevel += Damage * 0.2;
else
DutvutanianNetwork.TC4riminalLevel += 600;

DutvutanianNetwork.instance.AlertTime = 120;
}

if(Health < 1 && !Honce)
if(!IsCivilian){
DutvutanianNetwork.TC4CriminalPoints += 1;
Honce = true;
if(AI)
if(AI.GetComponent(AIName))
if(AI.GetComponent(AIName).target)
DutvutanianNetwork.instance.EnemyTargetMin = AI.GetComponent(AIName).target;
}
}
if(DamageCode == 5){

if(Damage < StaticHealth){
if(DutvutanianNetwork.TC5CriminalLevel < 240){
DutvutanianNetwork.TC5CriminalLevel += 60;
}else{
if(Damage < 600)
DutvutanianNetwork.TC5CriminalLevel += Damage * 0.2;
else
DutvutanianNetwork.TC5CriminalLevel = 600;
}

if(DutvutanianNetwork.instance.AlertTime < 30)
DutvutanianNetwork.instance.AlertTime = Damage;
}else{
if(Damage < 600)
DutvutanianNetwork.TC5CriminalLevel += Damage * 0.2;
else
DutvutanianNetwork.TC5CriminalLevel += 600;

DutvutanianNetwork.instance.AlertTime = 120;
}

if(Health < 1 && !Honce)
if(!IsCivilian){
DutvutanianNetwork.TC5CriminalPoints += 1;
Honce = true;
if(AI)
if(AI.GetComponent(AIName))
if(AI.GetComponent(AIName).target)
DutvutanianNetwork.instance.EnemyTargetMin = AI.GetComponent(AIName).target;
}
}
if(DamageCode == 6){

if(Damage < StaticHealth){
if(DutvutanianNetwork.TC6CriminalLevel < 240){
DutvutanianNetwork.TC6CriminalLevel += 60;
}else{
if(Damage < 600)
DutvutanianNetwork.TC6CriminalLevel += Damage * 0.2;
else
DutvutanianNetwork.TC6CriminalLevel = 600;
}

if(DutvutanianNetwork.instance.AlertTime < 30)
DutvutanianNetwork.instance.AlertTime = Damage;
}else{
if(Damage < 600)
DutvutanianNetwork.TC6CriminalLevel += Damage * 0.2;
else
DutvutanianNetwork.TC6CriminalLevel += 600;

DutvutanianNetwork.instance.AlertTime = 120;
}

if(Health < 1 && !Honce)
if(!IsCivilian){
DutvutanianNetwork.TC6CriminalPoints += 1;
Honce = true;
if(AI)
if(AI.GetComponent(AIName))
if(AI.GetComponent(AIName).target)
DutvutanianNetwork.instance.EnemyTargetMin = AI.GetComponent(AIName).target;
}
}
if(DamageCode == 7){

if(Damage < StaticHealth){
if(DutvutanianNetwork.TC7CriminalLevel < 240){
DutvutanianNetwork.TC7CriminalLevel += 60;
}else{
if(Damage < 600)
DutvutanianNetwork.TC7CriminalLevel += Damage * 0.2;
else
DutvutanianNetwork.TC7CriminalLevel = 600;
}

if(DutvutanianNetwork.instance.AlertTime < 30)
DutvutanianNetwork.instance.AlertTime = Damage;
}else{
if(Damage < 600)
DutvutanianNetwork.TC7CriminalLevel += Damage * 0.2;
else
DutvutanianNetwork.TC7CriminalLevel += 600;

DutvutanianNetwork.instance.AlertTime = 120;
}

if(Health < 1 && !Honce)
if(!IsCivilian){
DutvutanianNetwork.TC7CriminalPoints += 1;
Honce = true;
if(AI)
if(AI.GetComponent(AIName))
if(AI.GetComponent(AIName).target)
DutvutanianNetwork.instance.EnemyTargetMin = AI.GetComponent(AIName).target;
}
}
if(DamageCode == 8){

if(Damage < StaticHealth){
if(DutvutanianNetwork.TC8CriminalLevel < 240){
DutvutanianNetwork.TC8CriminalLevel += 60;
}else{
if(Damage < 600)
DutvutanianNetwork.TC8CriminalLevel += Damage * 0.2;
else
DutvutanianNetwork.TC8CriminalLevel = 600;
}

if(DutvutanianNetwork.instance.AlertTime < 30)
DutvutanianNetwork.instance.AlertTime = Damage;
}else{
if(Damage < 600)
DutvutanianNetwork.TC8CriminalLevel += Damage * 0.2;
else
DutvutanianNetwork.TC8CriminalLevel += 600;

DutvutanianNetwork.instance.AlertTime = 120;
}

if(Health < 1 && !Honce)
if(!IsCivilian){
DutvutanianNetwork.TC8CriminalPoints += 1;
Honce = true;
if(AI)
if(AI.GetComponent(AIName))
if(AI.GetComponent(AIName).target)
DutvutanianNetwork.instance.EnemyTargetMin = AI.GetComponent(AIName).target;
}
}

}

//----------------------------------------------------------
}

if(-Health > -HurtThreshold && !hurtOnce)
if(DamageCode != 6 && IsInside && !OpenVessel){
if(!WorldInformation.Godmode){
            hurtOnce = true;
			WorldInformation.CanLeaveVehicle = false;
			PiriIsHurt = true;
			WorldInformation.PiriIsHurt = true;
			PiriHurt();
			}
}

if(Health < HealthThreshold){
if(!PartiallyDamaged){
PartiallyDamaged = true;

if(CanEmergency)
AI.GetComponent(AIName).Emergency = true;

if(PartialBrokenSound){
TheThingie = Instantiate(PartialBrokenSound, BrokenEffectArea.transform.position, BrokenEffectArea.transform.rotation);
TheThingie.transform.parent = gameObject.transform;

if (PartialWhatToDestroy != null) {
var i0 : int;
for (i0 = 0; i0 < PartialWhatToDestroy.Length; i0++) {
		  Destroy(PartialWhatToDestroy[i0].gameObject); 
}
}
}

}
}

if(Health < 1 && !once){
once = true;

if(PlayerGunScript){
PlayerGunScript.SecBroken = true;
PlayerGunScript.VolleyBroken = true;
}

if(!CustomDeath){

DestroySequence();
if(AICallDeathFunction)
if(AI.GetComponent(AIName))
AI.GetComponent(AIName).Damage();
}else{
AI.GetComponent(AIName).Kill();
}

if(ColSoundBreakUsage){
   ColSound.Broken = false;
   ColSound.BrokenC = false;
   }

}

}

function DestroySequence(){

if(IsPiriCeptopod){
FurtherActionScript.instance.PiriCeptopodOof = true;
FurtherActionScript.instance.ShowText();
}

if(IsPersonalDrone){
FurtherActionScript.instance.PersonalDroneOof = true;
FurtherActionScript.instance.ShowText();
}
	
	    if(ResetDrag){
	    Vehicle.rigidbody.drag = 0.1;
	    Vehicle.rigidbody.angularDrag = 0.1;
	    }
	    
	    if(ResetGravity)
	    Vehicle.rigidbody.useGravity = true;
	    
	    if(!SpaceOnce)
	    if(BrokenSound){
		var TheThing = Instantiate(BrokenSound, BrokenEffectArea.transform.position, BrokenEffectArea.transform.rotation);
		if(!UnparentBrokenSound)
		TheThing.transform.parent = gameObject.transform;
		else
        TheThing.transform.parent = null;
		}
		
		if(OnboardBrokenSound && !DeployOnBreakVessel)
		OnboardBrokenSound.gameObject.SetActive (true);
		
		if(TheThingie)
		Destroy(TheThingie);
		
		if(Rotator)
		Destroy(Rotator);
		
		if(Sound){
		Destroy(Sound);
		}
		
		if(RadarController)
		Destroy(RadarController);
		
		if(DestroyAI)
        Destroy(AI.GetComponent(AIName));
        
        if(AIrigidbody)
		AIrigidbody.freezeRotation = false;
		
		if(AITrig){
		AITrig.center = Vector3(0,0,0);
        AITrig.radius = 0.1;
        AITrig.height = 0.1;
        AITrig.gameObject.layer = 23;
        AITrig.isTrigger = false;
		}

		if(PlayerControlled){
		Vehicle.GetComponent("MainVehicleController").SetState(true);
		
				if(Vehicle.GetComponent("NewgunController") != null)
				Vehicle.GetComponent("NewgunController").Broken = true;
				if(Vehicle.GetComponent("NewgunControllerStatic") != null)
				Vehicle.GetComponent("NewgunControllerStatic").Broken = true;
				if(Vehicle.GetComponent("NewgunControllerTurret") != null)
				Vehicle.GetComponent("NewgunControllerTurret").Broken = true;
				if(Vehicle.GetComponent("LauncherScript") != null)
				Vehicle.GetComponent("LauncherScript").Broken = true;
				}
				
		if (WhatToUnchild != null) {
		var ie : int;
		for (ie = 0; ie < WhatToUnchild.Length; ie++) {
		    if(WhatToUnchild[ie] != null){
		    if(WhatToUnchild[ie].GetComponent("TrailScript") != null)
		    WhatToUnchild[ie].GetComponent("TrailScript").Stop = true;
		    
		    WhatToUnchild[ie].gameObject.AddComponent ("KillOverTime");
			WhatToUnchild[ie].parent = null;
			}
		}
		}
		
		if (WhatToUnjoint != null) {
		var ij : int;
		for (ij = 0; ij < WhatToUnjoint.Length; ij++) {
			Destroy(WhatToUnjoint[ij]); 
		}
		}
				
		if (WhatToDestroy != null) {
		var ii : int;
		for (ii = 0; ii < WhatToDestroy.Length; ii++) {
			Destroy(WhatToDestroy[ii].gameObject); 
		}
		}
		
		if(ParticleFX != null) {
			var ip : int;
			for (ip = 0; ip < ParticleFX.Length; ip++) {
				ParticleFX[ip].enableEmission = false;
				ParticleFX[ip].emissionRate = 0;
			}
		}

		if(EngineEffects != null) {
			var i3 : int;
			for (i3 = 0; i3 < EngineEffects.Length; i3++) {
			
				if(EngineEffects[i3].GetComponent("ThrusterLights") != null)
				EngineEffects[i3].GetComponent("ThrusterLights").Broken = true;

				if(EngineEffects[i3].GetComponent("AircraftThrusterLights") != null)
				EngineEffects[i3].GetComponent("AircraftThrusterLights").Broken = true;
				
				if(EngineEffects[i3].GetComponent("ExhaustSmoke") != null)
				EngineEffects[i3].GetComponent("ExhaustSmoke").Broken = true;
			}
		}

		if (Props != null) {
			var i5 : int;
			for (i5 = 0; i5 < Props.Length; i5++) {
				if (Props[i5].GetComponent("PropSpin") != null)
					Props[i5].GetComponent("PropSpin").Broken = true;
			}
		}
		
		if (Wings != null) {
			var i6 : int;
			for (i6 = 0; i6 < Wings.Length; i6++) {
				if (Wings[i6].GetComponent("WingScript") != null)
					Wings[i6].GetComponent("WingScript").Broken = true;
			}
		}
		
		if (PartsResetDrag != null) {
			var i7 : int;
			for (i7 = 0; i7 < PartsResetDrag.Length; i7++) {
			if (PartsResetDrag[i7].gameObject != null)
					PartsResetDrag[i7].rigidbody.drag = 0.05;
			}
		}
		
		if (PartsResetGrav != null) {
			var i8 : int;
			for (i8 = 0; i8 < PartsResetGrav.Length; i8++) {
			if (PartsResetGrav[i8].gameObject != null)
					PartsResetGrav[i8].rigidbody.useGravity = true;
			}
		}
		
		if (HingeStop != null) {
		var i4 : int;
		for (i4 = 0; i4 < HingeStop.Length; i4++) {
		if (HingeStop[i4] != null){
		HingeStop[i4].useMotor = false;
		HingeStop[i4].spring.damper = 0.02;
		HingeStop[i4].motor.targetVelocity = 0;
		HingeStop[i4].motor.force = 0;
		}
		}
		}

		if (UsesWMC == true){
			var i2 : int;
			for (i2 = 0; i2 < WMCs.Length; i2++) { 
				WMCs[i2].GetComponent("WheelMotorController").Broken = true; 
			}
		}
		
		transform.name = "broken";


Break1();
}

function Break1(){

if(DeployOnBreakVessel)
Deploy();

if(!UseDetonate){
yield WaitForSeconds (SecondBreakDelay);

if(SecondBrokenSound){
		var TheThing2 = Instantiate(SecondBrokenSound, BrokenEffectArea.transform.position, BrokenEffectArea.transform.rotation);
		if(!UnparentSecondBrokenSound)
		TheThing2.transform.parent = gameObject.transform;
		else
        TheThing2.transform.parent = null;
		}

if(OnboardBrokenSound)
if(DeployOnBreakVessel)
OnboardBrokenSound.gameObject.SetActive (true);

if(Dislodge){
if(ConJoint)
Destroy(ConJoint);
else
Destroy(SprJoint);
}

if(GunController)
Destroy(GunController);

if (SecondWhatToDestroy != null) {
var i1 : int;
for (i1 = 0; i1 < SecondWhatToDestroy.Length; i1++) {
		  Destroy(SecondWhatToDestroy[i1].gameObject); 
}
}

if(Part1Lock)
Locking = true;

if(ExplosiveVessel)
Explode();

yield WaitForSeconds (FinalBreakDelay);

if(OnboardBrokenSound)
if(UnparentOBBrokenSound)
OnboardBrokenSound.transform.parent = null;

if(BrokenSubPart1 || BrokenSubPart2){
    BrokenSubPart1.SetActive (true);
    BrokenSubPart2.SetActive (true);
    BrokenSubPart1.transform.parent = null;
    BrokenSubPart2.transform.parent = null;
    BrokenSubPart1.rigidbody.velocity = rigidbody.velocity * 1;
    BrokenSubPart2.rigidbody.velocity = rigidbody.velocity * 1;
    Destroy(gameObject);
    }
    
if(Helirotor){

yield WaitForSeconds (1);
TorqueScript.Power = 900;
yield WaitForSeconds (0.5);
TorqueScript.Power = 800;
yield WaitForSeconds (0.5);
TorqueScript.Power = 700;
yield WaitForSeconds (0.4);
TorqueScript.Power = 600;
yield WaitForSeconds (0.4);
TorqueScript.Power = 500;
yield WaitForSeconds (0.3);
TorqueScript.Power = 400;
yield WaitForSeconds (0.3);
TorqueScript.Power = 300;
yield WaitForSeconds (0.2);

Destroy(Rotor);
    
hingeJoint.spring.damper = 2;
rigidbody.angularDrag = 0.05;

var i9 : int;
		for(i9 = 0; i9 < LimbSections.Length; i9++) {
			LimbSections[i9].GetComponent(ConfigurableJoint).angularXDrive.positionSpring = 5;
			LimbSections[i9].GetComponent(ConfigurableJoint).angularYZDrive.positionSpring = 5;
			LimbSections[i9].rigidbody.drag = 0.1;
			LimbSections[i9].rigidbody.useGravity = true;
		}
}
}
}

function RemoteDet(){
if(!DetOnce){
DetOnce = true;
Detonate();
}
}

function DetTimer(){
if(!DetOnce){
DetOnce = true;
yield WaitForSeconds (5);
Detonate();
}
}

function Timer(){
if(!CanRegenerate)
if(Health > StaticHealth)
FollowHorizon.LevelRot = 180;
}

function Detonate(){

if(SecondBrokenSound){
		var TheThing2 = Instantiate(SecondBrokenSound, BrokenEffectArea.transform.position, BrokenEffectArea.transform.rotation);
		if(!UnparentSecondBrokenSound)
		TheThing2.transform.parent = gameObject.transform;
		else
        TheThing2.transform.parent = null;
		}

if(OnboardBrokenSound)
if(DeployOnBreakVessel)
OnboardBrokenSound.gameObject.SetActive (true);

if(GunController)
Destroy(GunController);

if (SecondWhatToDestroy != null) {
var i1 : int;
for (i1 = 0; i1 < SecondWhatToDestroy.Length; i1++) { 
		  Destroy(SecondWhatToDestroy[i1].gameObject); 
}
}

yield WaitForSeconds (FinalBreakDelay);

if(ExplosiveVessel)
Explode();

}

function Deploy(){
yield WaitForSeconds (DeployDelay);

Gates.audio.Play();

if(!GateJoint){
Gates.animation.Play();
}else{
Destroy(GateJoint);
if(GateJoint2){
Destroy(GateJoint2);
Gates2.rigidbody.velocity = Gates2.transform.forward * -24;
Gates2.transform.parent = null;
}
Gates.rigidbody.velocity = Gates.transform.forward * -24;
Gates.transform.parent = null;
}

if(DeployeeArea1){
Deployee1GO = Instantiate(DeployeeFab1, DeployeeArea1.transform.position, DeployeeArea1.transform.rotation);

if(TargetCode == 7){
Deployee1GO.transform.GetChild(0).GetComponent(MevNavClouterAI).DeusDamage = this;
Deployee1AIGO = Deployee1GO.transform.GetChild(0).gameObject;
Deployee1IsOut = true;
}

}
if(DeployeeArea2){
var _SpawnedObject2 = Instantiate(DeployeeFab2, DeployeeArea2.transform.position, DeployeeArea2.transform.rotation);
if(TargetCode == 7)
_SpawnedObject2.transform.GetChild(0).GetComponent(MevNavShieldAI).Home = Deployee1GO.transform.GetChild(1).transform;
}
if(DeployeeArea3){
var _SpawnedObject3 = Instantiate(DeployeeFab3, DeployeeArea3.transform.position, DeployeeArea3.transform.rotation);
if(TargetCode == 7)
_SpawnedObject3.transform.GetChild(0).GetComponent(MevNavShieldAI).Home = Deployee1GO.transform.GetChild(1).transform;
}
if(DeployeeArea4){
var _SpawnedObject4 = Instantiate(DeployeeFab4, DeployeeArea4.transform.position, DeployeeArea4.transform.rotation);
if(TargetCode == 7)
_SpawnedObject4.transform.GetChild(0).GetComponent(MevNavShieldAI).Home = Deployee1GO.transform.GetChild(1).transform;
}
if(DeployeeArea5){
var _SpawnedObject5 = Instantiate(DeployeeFab5, DeployeeArea5.transform.position, DeployeeArea5.transform.rotation);
if(TargetCode == 7)
_SpawnedObject5.transform.GetChild(0).GetComponent(MevNavShieldAI).Home = Deployee1GO.transform.GetChild(1).transform;
}
if(DeployeeArea6){
var _SpawnedObject6 = Instantiate(DeployeeFab6, DeployeeArea6.transform.position, DeployeeArea6.transform.rotation);
if(TargetCode == 7)
_SpawnedObject6.transform.GetChild(0).GetComponent(MevNavShieldAI).Home = Deployee1GO.transform.GetChild(1).transform;
}
if(DeployeeArea7){
var _SpawnedObject7 = Instantiate(DeployeeFab7, DeployeeArea7.transform.position, DeployeeArea7.transform.rotation);
if(TargetCode == 7)
_SpawnedObject7.transform.GetChild(0).GetComponent(MevNavShieldAI).Home = Deployee1GO.transform.GetChild(1).transform;
}

}

function Hit () {
yield WaitForSeconds (1.6);
HeavyHit = false;
}

function Tick () {

if(Locking){
Debug.DrawRay (transform.position, Vector3.down * LockDist, Color.red);
if(Physics.Raycast (transform.position, Vector3.down, LockDist, MtargetLayers)){
if(Part1Lock){
if(Part1Lock.GetComponent(HingeJoint) != null)
Destroy(Part1Lock.GetComponent(HingeJoint));
if(Part1Lock.GetComponent(CharacterJoint) != null)
Destroy(Part1Lock.GetComponent(CharacterJoint));
Destroy(Part1Lock.rigidbody);
}
if(Part2Lock){
if(Part2Lock.GetComponent(HingeJoint) != null)
Destroy(Part2Lock.GetComponent(HingeJoint));
if(Part2Lock.GetComponent(CharacterJoint) != null)
Destroy(Part2Lock.GetComponent(CharacterJoint));
Destroy(Part2Lock.rigidbody);
}
if(Part3Lock){
if(Part3Lock.GetComponent(HingeJoint) != null)
Destroy(Part3Lock.GetComponent(HingeJoint));
if(Part3Lock.GetComponent(CharacterJoint) != null)
Destroy(Part3Lock.GetComponent(CharacterJoint));
Destroy(Part3Lock.rigidbody);
}
if(Part4Lock){
if(Part4Lock.GetComponent(HingeJoint) != null)
Destroy(Part4Lock.GetComponent(HingeJoint));
if(Part4Lock.GetComponent(CharacterJoint) != null)
Destroy(Part4Lock.GetComponent(CharacterJoint));
Destroy(Part4Lock.rigidbody);
}
if(Part5Lock){
if(Part5Lock.GetComponent(HingeJoint) != null)
Destroy(Part5Lock.GetComponent(HingeJoint));
if(Part5Lock.GetComponent(CharacterJoint) != null)
Destroy(Part5Lock.GetComponent(CharacterJoint));
Destroy(Part5Lock.rigidbody);
}
if(Part6Lock){
if(Part6Lock.GetComponent(HingeJoint) != null)
Destroy(Part6Lock.GetComponent(HingeJoint));
if(Part6Lock.GetComponent(CharacterJoint) != null)
Destroy(Part6Lock.GetComponent(CharacterJoint));
Destroy(Part6Lock.rigidbody);
}
if(PartFinal){
PartFinal.mass = PartFinalMass;
}
Locking = false;
}
}

if(OtherDamage)
if(OtherDamage.Health < 1)
DamageIn(2048, 0, 0, false);

if(Deployee1IsOut)
if(!Deployee1AIGO)
if(!DetOnce)
DetTimer();

Timer();

if(!PlayerControlled)
return;

if (WorldInformation.playerCar == Vehicle.name){

if(Health < HealthThreshold)
IndicatorScript.VehicleIsDamaged = true;

IsInside = true;
}else{
IsInside = false;
}
}

function Explode () {
if(ExplodeParent){
transform.parent.gameObject.AddComponent ("KillOverTime");
gameObject.SetActive (false);
}else{
UnityEngine.Object.Destroy(gameObject);
}
if(!LocalOriExp)
Instantiate(Explosion, BrokenEffectArea.transform.position, Explosion.transform.rotation);
else
Instantiate(Explosion, BrokenEffectArea.transform.position, BrokenEffectArea.transform.rotation);
}

function PiriHurt () {
if(PlayerControlled)
WorldInformation.instance.Hurt();
}