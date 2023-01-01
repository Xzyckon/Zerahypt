
var target : Transform;
var Suspect : Transform;
var ResetView : Transform;
var Gun : NPCGun;
var GunRB : Rigidbody;
var GunTF : Transform;
var Trig : CapsuleCollider;
var TrigRadius = 75;
var TrigLength = 700;
var TrigCenter = 275;

var TurretEnergySupply : GameObject;

var theParent : Transform;

var thisTransform : Transform;

var TargetTrace : Transform;
var TargetLead : Transform;
var TLCol : SphereCollider;

var SoundAction : AudioSource;
var SoundWarning : AudioSource;

var SimpleAimer : boolean;

var LeadedAimer : boolean;

var TandemAimer : boolean;
var Tandem : TurretAI;

var IgnoreTiny : boolean = true;

var CloseToBase : boolean;

var BaseTurret : boolean;

var VehicleTurret : boolean;

var HostileTurret : boolean;

var TargetCode = 0;

var IsA : boolean;
var IsB : boolean;
var IsC : boolean;

var AberrantAICruiser : AberrantCruiserAI;

var AberrantAIDestroyer : AberrantDestroyerAI;

var AkbarCorvetteAI : AkbarCorvetteAI;

var AkbarEzymusAI : AkbarEzymusAI;

var PhobosAI : PhobosAI;

var BothunterAI : BothunterAI;

var ValiantAI : ValiantAI;

var VehicleScript : MainVehicleController;

var activated : boolean;

var PissedAtTC0a = 0;
var PissedAtTC1 = 0;
var PissedAtTC2 = 0;
var PissedAtTC3 = 0;
var PissedAtTC4 = 0;
var PissedAtTC5 = 0;
var PissedAtTC6 = 0;
var PissedAtTC7 = 0;
var PissedAtTC8 = 0;
var PissedAtTC9 = 0;

var TargetIsMoving : boolean;

var NameOfTarget : String = "TC";

var Stranger : Transform;
var Attacking : boolean;

var Spot : boolean;

var Tick : boolean;

var DangerSense = 0;

var Suspicion = 0;

var Ignorage = 0;

var DangerDirection : Vector3;

var MtargetLayers : LayerMask;

var ShootFrequency : float = 0.2;
var UniqueShootTime: float = 0.1;

var RandomizeShootTime : boolean;

var AimSpeed : float = 100;

var LeadCurve : AnimationCurve = new AnimationCurve();

var LeadAmount : float = 0.017;

var Dist : float = 0;

var ThisCode : String;

InvokeRepeating("Counter", 1, 0.5);

InvokeRepeating("Shooty", UniqueShootTime, ShootFrequency);

InvokeRepeating("CalcLead", 1, 0.15);

function Start(){

transform.parent = null;

target = ResetView;

if(!VehicleTurret)
activated = true;

if(TargetTrace){
TargetTrace.parent = null;
TargetLead.parent = null;
}else{
if(LeadedAimer){
var gO1 = new GameObject("TT");
var gO2 = new GameObject("TL" + TargetCode);

TLCol = gO2.AddComponent ("SphereCollider");

TargetTrace = gO1.transform;
TargetLead = gO2.transform;
TargetTrace.position = transform.position;
TargetTrace.rotation = transform.rotation;
TargetLead.position = transform.position;
TargetLead.rotation = transform.rotation;
TargetTrace.parent = theParent;
TargetLead.parent = theParent;
gO2.layer = 29;
}
}

ThisCode = TargetCode.ToString();

if(SimpleAimer || TandemAimer){
if(Trig){
Trig.center = Vector3(0,0,0);
Trig.radius = 2;
Trig.height = 2;
}
}

if(RandomizeShootTime)
UniqueShootTime = Random.Range(1, 2);
}

function Update () {
if(!SimpleAimer && !TandemAimer){

if(HostileTurret)
Notice();

if(target == null || Ignorage > 16){
Ignorage = 0;
Suspicion = 0;
Attacking = false;
Trig.radius = TrigRadius;
target = ResetView;
}

}

if (TurretEnergySupply == null || Gun == null) {
  rigidbody.freezeRotation = false;
  Destroy(gameObject);
}

}


private var NewRotation : Quaternion;
function FixedUpdate () {

if(activated){

if (target){
   rigidbody.freezeRotation = true;
	if (DangerSense < 1) {
	if(LeadedAimer){
	        if (TargetLead){
	        if(Attacking){
	        
	        if(GunRB)
	        GunRB.AddTorque(-GunTF.right * Dist * 0.03);
	        
            NewRotation = Quaternion.LookRotation(TargetLead.position - thisTransform.position);
            thisTransform.rotation = Quaternion.RotateTowards(thisTransform.rotation, NewRotation, AimSpeed);
            }else{
            NewRotation = Quaternion.LookRotation(target.position - thisTransform.position);
            thisTransform.rotation = Quaternion.RotateTowards(thisTransform.rotation, NewRotation, AimSpeed);
            }
            }
            }else{
            NewRotation = Quaternion.LookRotation(target.position - thisTransform.position);
            thisTransform.rotation = Quaternion.RotateTowards(thisTransform.rotation, NewRotation, AimSpeed);
            }
	}
	if(!SimpleAimer && !TandemAimer){
	if (DangerSense > 0 && DangerDirection != Vector3.zero) {
            NewRotation = Quaternion.LookRotation(DangerDirection);
            thisTransform.rotation = Quaternion.RotateTowards(thisTransform.rotation, NewRotation, AimSpeed);
	}
	}
}else{
rigidbody.freezeRotation = false;
}
}else{
if (target){
rigidbody.freezeRotation = true;
NewRotation = Quaternion.LookRotation(target.position - thisTransform.position);
thisTransform.rotation = Quaternion.RotateTowards(thisTransform.rotation, NewRotation, AimSpeed);
}
}
}

function OnTriggerEnter (other : Collider) {

if(!activated)
return;

ON = other.name;
OT = other.transform;

if(Physics.Linecast (thisTransform.position, OT.position, MtargetLayers))
return;

if(!SimpleAimer && !TandemAimer){

if(other.rigidbody)
DangerDirection = -other.rigidbody.velocity.normalized;

if(ON.Contains ("TFC")){

if(target)
if(!ON.Contains ("TFC" + TargetCode))
if(!target.name.Contains ("TC"))
if(Vector3.Distance(thisTransform.position, OT.position) > TrigRadius * 0.5)
DangerSense = 10;

var relativePoint = OT.InverseTransformPoint(thisTransform.position);

if(relativePoint.z > 0){
Trig.center = Vector3(0,0,TrigCenter);
Trig.radius = TrigRadius * 0.5;
Trig.height = TrigLength;
}

if(TargetCode != 0){
if(ON.Contains ("TFC0a")){
if(PissedAtTC0a < 32)
PissedAtTC0a += 8;
if(Suspicion < 64)
Suspicion += 18;
Spot = false;
}
}

if(TargetCode != 1)
if(ON.Contains ("TFC1")){
if(PissedAtTC1 < 32)
PissedAtTC1 += 8;
if(Suspicion < 64)
Suspicion += 18;
Spot = false;
}

if(TargetCode != 2 && TargetCode != 3)
if(ON.Contains ("TFC2")){
if(PissedAtTC2 < 32)
PissedAtTC2 += 8;
if(Suspicion < 64)
Suspicion += 18;
Spot = false;
}

if(TargetCode != 3)
if(ON.Contains ("TFC3")){
if(PissedAtTC3 < 32)
PissedAtTC3 += 8;
if(Suspicion < 64)
Suspicion += 18;
Spot = false;
}

if(TargetCode != 4)
if(ON.Contains ("TFC4")){
if(PissedAtTC4 < 32)
PissedAtTC4 += 8;
if(Suspicion < 64)
Suspicion += 18;
Spot = false;
}

if(TargetCode != 5)
if(ON.Contains ("TFC5")){
if(PissedAtTC5 < 32)
PissedAtTC5 += 8;
if(Suspicion < 64)
Suspicion += 18;
Spot = false;
}

if(TargetCode != 6)
if(ON.Contains ("TFC6")){
if(PissedAtTC6 < 32)
PissedAtTC6 += 8;
if(Suspicion < 64)
Suspicion += 18;
Spot = false;
}

if(TargetCode != 7)
if(ON.Contains ("TFC7")){
if(PissedAtTC7 < 32)
PissedAtTC7 += 8;
if(Suspicion < 64)
Suspicion += 18;
Spot = false;
}

if(TargetCode != 8)
if(ON.Contains ("TFC8")){
if(PissedAtTC8 < 32)
PissedAtTC8 += 8;
if(Suspicion < 64)
Suspicion += 18;
Spot = false;
}

if(TargetCode != 9)
if(ON.Contains ("TFC9")){
if(PissedAtTC9 < 32)
PissedAtTC9 += 8;
if(Suspicion < 64)
Suspicion += 18;
Spot = false;
}

}
}
}

function OnTriggerStay (other : Collider) {

if(!activated)
return;

ON = other.name;
OT = other.transform;

if(Physics.Linecast (thisTransform.position, OT.position, MtargetLayers))
return;

if(!SimpleAimer && !TandemAimer){

if(ON.Contains ("TC")){

if(CloseToBase)
return;

if(IgnoreTiny){
if(ON.Contains ("tTC"))
return;
}

if(HostileTurret)
if(!ON.Contains ("TC" + TargetCode))
target = OT;
 
 if(TargetCode != 0){
 if(PissedAtTC0a > 4){
 if(ON.Contains ("TC0a"))
 if(!ON.Contains ("cT")){
  target = OT;
  Trig.center = Vector3(0,0,0);
  Trig.radius = TrigRadius;
  Trig.height = TrigRadius;
  if(!Attacking && !Spot)
  Engage();
  }
  }
  }
 
 if(TargetCode != 1){
 if(PissedAtTC1 > 4)
 if(ON.Contains ("TC1")){
 if(!ON.Contains ("cT")){
  target = OT;
  Trig.center = Vector3(0,0,0);
  Trig.radius = TrigRadius;
  Trig.height = TrigRadius;
  if(!Attacking && !Spot)
  Engage();
  }
  }
  }
 
 if(TargetCode != 2){
 if(TargetCode != 7){
 if(PissedAtTC2 > 4){
 if(ON.Contains ("TC2")){
  target = OT;
  Trig.center = Vector3(0,0,0);
  Trig.radius = TrigRadius;
  Trig.height = TrigRadius;
  if(!Attacking && !Spot)
  Engage();
  }
  }
  }else{
  if(PissedAtTC2 > 4){
  if(ON.Contains ("sTC2")){
  target = OT;
  Trig.center = Vector3(0,0,0);
  Trig.radius = TrigRadius;
  Trig.height = TrigRadius;
  if(!Attacking && !Spot)
  Engage();
  }
  if(ON.Contains ("mTC2")){
  target = OT;
  Trig.center = Vector3(0,0,0);
  Trig.radius = TrigRadius;
  Trig.height = TrigRadius;
  if(!Attacking && !Spot)
  Engage();
  }
  }
}
}
 
 if(TargetCode != 3){
 if(PissedAtTC3 > 4){
 if(ON.Contains ("TC3"))
if(!ON.Contains ("cT")){
  target = OT;
  Trig.center = Vector3(0,0,0);
  Trig.radius = TrigRadius;
  Trig.height = TrigRadius;
  if(!Attacking && !Spot)
  Engage();
  }
  }
  }
 
 if(TargetCode != 4){
 if(PissedAtTC4 > 4){
 if(ON.Contains ("TC4")){
  target = OT;
  Trig.center = Vector3(0,0,0);
  Trig.radius = TrigRadius;
  Trig.height = TrigRadius;
  if(!Attacking && !Spot)
  Engage();
  }
  }
  }
 
 if(TargetCode != 5){
 if(PissedAtTC5 > 4){
 if(ON.Contains ("TC5"))
 if(!ON.Contains ("cT")){
  target = OT;
  Trig.center = Vector3(0,0,0);
  Trig.radius = TrigRadius;
  Trig.height = TrigRadius;
  if(!Attacking && !Spot)
  Engage();
  }
  }
  }
 
 if(TargetCode != 6){
 if(PissedAtTC6 > 4){
 if(ON.Contains ("TC6"))
 if(!ON.Contains ("cT")){
  target = OT;
  Trig.center = Vector3(0,0,0);
  Trig.radius = TrigRadius;
  Trig.height = TrigRadius;
  if(!Attacking && !Spot)
  Engage();
  }
  }
  }

if(TargetCode != 7){
if(PissedAtTC7 > 4){
if(ON.Contains ("TC7"))
if(!ON.Contains ("cT")){
  target = OT;
  Trig.center = Vector3(0,0,0);
  Trig.radius = TrigRadius;
  Trig.height = TrigRadius;
  if(!Attacking && !Spot)
  Engage();
  }
  }
  }

if(TargetCode != 8){
if(PissedAtTC8 > 4){
if(ON.Contains ("TC8"))
 if(!ON.Contains ("cT")){
  target = OT;
  Trig.center = Vector3(0,0,0);
  Trig.radius = TrigRadius;
  Trig.height = TrigRadius;
  if(!Attacking && !Spot)
  Engage();
  }
  }
  }

if(TargetCode != 9){
if(PissedAtTC9 > 4){
if(ON.Contains ("TC9"))
 if(!ON.Contains ("cT")){
  target = OT;
  Trig.center = Vector3(0,0,0);
  Trig.radius = TrigRadius;
  Trig.height = TrigRadius;
  if(!Attacking && !Spot)
  Engage();
  }
  }
  }
  
}
}
}

function Engage (){

if(!activated)
return;

if(!Spot){
Spot = true;

yield WaitForSeconds (0.5);

if(!target)
return;

if(!HostileTurret)
if(target.name.Contains ("cT"))
return;

if(target == Suspect){

if(target.name.Contains ("C0a"))
PissedAtTC0a = 32;

if(target.name.Contains ("C1"))
PissedAtTC1 = 32;

if(target.name.Contains ("C2"))
PissedAtTC2 = 32;

if(target.name.Contains ("C3"))
PissedAtTC3 = 32;

if(target.name.Contains ("C4"))
PissedAtTC4 = 32;

if(target.name.Contains ("C5"))
PissedAtTC5 = 32;

if(target.name.Contains ("C6"))
PissedAtTC6 = 32;

if(target.name.Contains ("C7"))
PissedAtTC7 = 32;

if(target.name.Contains ("C8"))
PissedAtTC8 = 32;

if(target.name.Contains ("C9"))
PissedAtTC9 = 32;

Spot = false;
Attacking = true;
Suspicion = 31;
if(SoundAction)
if(!SoundAction.isPlaying)
SoundAction.Play();
}else{
if(Suspicion > 31 || HostileTurret){
Attacking = true;
Suspicion = 31;
if(SoundAction)
if(!SoundAction.isPlaying)
SoundAction.Play();
}else{
if(Suspicion > 15){
Suspicion = 15;
if(SoundAction)
SoundAction.Play();
yield WaitForSeconds (0.2);
if(SoundWarning)
if(!SoundWarning.isPlaying)
SoundWarning.Play();

if(target)
if(target.name.Contains ("TC"))
Suspect = target;

yield WaitForSeconds (2);
Spot = false;
}
}
}
}else{
if(Suspicion > 31)
Spot = false;
}
}

function Shooty () {
if(Attacking && activated)
if(Gun)
Gun.Fire();
}

function CalcLead () {
if(LeadedAimer && activated)
Lead();
}

function Lead (){

if(target && TargetTrace)
TargetTrace.position = target.position;

yield WaitForSeconds (0.1);

if(target && TargetTrace){

var Dist0 = Vector3.Distance(thisTransform.position, target.position);
var Dist1 = Vector3.Distance(TargetTrace.position, target.position);

var Dist2 = LeadCurve.Evaluate(Dist0) * Dist1;

TargetTrace.LookAt(target);

TargetLead.position = TargetTrace.position;
TargetLead.rotation = TargetTrace.rotation;
TargetLead.position += TargetLead.forward * Dist2 * LeadAmount;

if(Attacking)
TLCol.radius = Dist0 * 0.05;
else
TLCol.radius = 0.1;

}
}

function Counter(){

if(activated){

if(!SimpleAimer && !TandemAimer){

if(DangerSense > 0)
DangerSense -= 1;

if(Suspicion > 0)
Suspicion -= 1;

if(!BaseTurret){

if(TargetCode == 6){
if(AbiaSyndicateNetwork.instance.AbiaBaseHomePoint){
if(Vector3.Distance(thisTransform.position, AbiaSyndicateNetwork.instance.AbiaBaseHomePoint.position) < 1500)
CloseToBase = true;
else
CloseToBase = false;
}
}

}

if(target){
var TargetPos : Vector3 = target.position;

Dist = Vector3.Distance(thisTransform.position, target.position);

if(target.name.Contains ("MTF")){
Spot = false;
Attacking = true;
DangerSense = 0;
Trig.center = Vector3(0,0,0);
Trig.radius = TrigRadius;
Trig.height = TrigRadius;
Suspicion = 31;
}

if(target.name.Contains ("rok")){
Ignorage = 0;
Suspicion = 0;
Attacking = false;
Trig.radius = TrigRadius;
target = ResetView;
}

if(target.name.Contains ("TC")){

if(TargetCode != 0){
if(target.name.Contains ("0a") && PissedAtTC0a > 4){

if(PissedAtTC0a > 16){
Suspicion = 32;
Gun.ConfirmedName = target.name;
if(TargetCode == 3)
TerrahyptianNetwork.instance.EnemyTarget1 = target;
}

  Trig.center = Vector3(0,0,0);
  Trig.radius = TrigRadius;
  Trig.height = TrigRadius;
  if(!Attacking)
  Engage();
  }

  }

if(TargetCode != 1)
if(target.name.Contains ("1") && PissedAtTC1 > 4){

if(PissedAtTC1 > 16){
Suspicion = 32;
Gun.ConfirmedName = target.name;
if(TargetCode == 3)
if(TerrahyptianNetwork.TC1CriminalLevel > 10)
TerrahyptianNetwork.instance.EnemyTarget2 = target;
}

  Trig.center = Vector3(0,0,0);
  Trig.radius = TrigRadius;
  Trig.height = TrigRadius;
  if(!Attacking)
  Engage();
  }

if(TargetCode != 2 && TargetCode != 7)
if(target.name.Contains ("2") && PissedAtTC2 > 4){

if(PissedAtTC2 > 16){
Suspicion = 32;
Gun.ConfirmedName = target.name;
}

  Trig.center = Vector3(0,0,0);
  Trig.radius = TrigRadius;
  Trig.height = TrigRadius;
  if(!Attacking)
  Engage();
  }

if(TargetCode != 3)
if(target.name.Contains ("3") && PissedAtTC3 > 4){

if(PissedAtTC3 > 16){
Suspicion = 32;
Gun.ConfirmedName = target.name;
}

  Trig.center = Vector3(0,0,0);
  Trig.radius = TrigRadius;
  Trig.height = TrigRadius;
  if(!Attacking)
  Engage();
  }

if(TargetCode != 4)
if(target.name.Contains ("4") && PissedAtTC4 > 4){

if(PissedAtTC4 > 16){
Suspicion = 32;
Gun.ConfirmedName = target.name;
if(TargetCode == 3)
if(TerrahyptianNetwork.TC4CriminalLevel > 10)
TerrahyptianNetwork.instance.EnemyTarget2 = target;
}

  Trig.center = Vector3(0,0,0);
  Trig.radius = TrigRadius;
  Trig.height = TrigRadius;
  if(!Attacking)
  Engage();
  }

if(TargetCode != 5)
if(target.name.Contains ("5") && PissedAtTC5 > 4){

if(PissedAtTC5 > 16){
Suspicion = 32;
Gun.ConfirmedName = target.name;
if(TargetCode == 3)
if(TerrahyptianNetwork.TC5CriminalLevel > 10)
TerrahyptianNetwork.instance.EnemyTarget2 = target;
}

  Trig.center = Vector3(0,0,0);
  Trig.radius = TrigRadius;
  Trig.height = TrigRadius;
  if(!Attacking)
  Engage();
  }
  
if(TargetCode != 6)
if(target.name.Contains ("6") && PissedAtTC6 > 4){

if(PissedAtTC6 > 16){
Suspicion = 32;
Gun.ConfirmedName = target.name;
if(TargetCode == 3)
if(TerrahyptianNetwork.TC6CriminalLevel > 10)
TerrahyptianNetwork.instance.EnemyTarget2 = target;
}

  Trig.center = Vector3(0,0,0);
  Trig.radius = TrigRadius;
  Trig.height = TrigRadius;
  if(!Attacking)
  Engage();
  }

if(TargetCode != 7)
if(target.name.Contains ("7") && PissedAtTC7 > 4){

if(PissedAtTC7 > 16){
Suspicion = 32;
Gun.ConfirmedName = target.name;
if(TargetCode == 3)
if(TerrahyptianNetwork.TC7CriminalLevel > 10)
TerrahyptianNetwork.instance.EnemyTarget2 = target;
}

  Trig.center = Vector3(0,0,0);
  Trig.radius = TrigRadius;
  Trig.height = TrigRadius;
  if(!Attacking)
  Engage();
  }

if(TargetCode != 8)
if(target.name.Contains ("8") && PissedAtTC8 > 4){

if(PissedAtTC8 > 16){
Suspicion = 32;
Gun.ConfirmedName = target.name;
if(TargetCode == 3)
if(TerrahyptianNetwork.TC8CriminalLevel > 10)
TerrahyptianNetwork.instance.EnemyTarget2 = target;
}

  Trig.center = Vector3(0,0,0);
  Trig.radius = TrigRadius;
  Trig.height = TrigRadius;
  if(!Attacking)
  Engage();
  }

if(TargetCode != 9)
if(target.name.Contains ("9") && PissedAtTC9 > 4){

if(PissedAtTC9 > 16){
Suspicion = 32;
Gun.ConfirmedName = target.name;
if(TargetCode == 3)
if(TerrahyptianNetwork.TC9CriminalLevel > 10)
TerrahyptianNetwork.instance.EnemyTarget2 = target;
}

  Trig.center = Vector3(0,0,0);
  Trig.radius = TrigRadius;
  Trig.height = TrigRadius;
  if(!Attacking)
  Engage();
  }

}

if(PissedAtTC0a > 0)
PissedAtTC0a -= 1;
if(PissedAtTC1 > 0)
PissedAtTC1 -= 1;
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
if(PissedAtTC8 > 0)
PissedAtTC8 -= 1;
if(PissedAtTC9 > 0)
PissedAtTC9 -= 1;

}

if(TargetCode == 0){
if(IsB){
PissedAtTC4 = 32;
PissedAtTC6 = 32;
PissedAtTC7 = 32;
}
}

if(TargetCode == 1){
PissedAtTC4 = 32;
PissedAtTC6 = 32;
PissedAtTC7 = 32;
}

if(TargetCode == 2)
PissedAtTC4 = 32;

if(TargetCode == 3){
if(TerrahyptianNetwork.TC1CriminalLevel > 10)
PissedAtTC1 = TerrahyptianNetwork.TC1CriminalLevel;

PissedAtTC4 = 20;

if(TerrahyptianNetwork.TC5CriminalLevel > 10)
PissedAtTC5 = TerrahyptianNetwork.TC5CriminalLevel;

PissedAtTC6 = 20;
PissedAtTC7 = 20;
}

if(TargetCode == 4)
PissedAtTC2 = 32;

//if(TargetCode == 5)

if(TargetCode == 6){
if(AbiaSyndicateNetwork.TC0aCriminalLevel > 0)
PissedAtTC0a = 32;
if(AbiaSyndicateNetwork.TC1CriminalLevel > 0)
PissedAtTC1 = 32;

if(AbiaSyndicateNetwork.TC2CriminalLevel > 0)
PissedAtTC2 = 32;

if(AbiaSyndicateNetwork.TC3CriminalLevel > 0)
PissedAtTC3 = 32;

if(AbiaSyndicateNetwork.TC4CriminalLevel > 0)
PissedAtTC4 = 32;

if(AbiaSyndicateNetwork.TC5CriminalLevel > 0)
PissedAtTC5 = 32;

if(AbiaSyndicateNetwork.TC7CriminalLevel > 0)
PissedAtTC7 = 32;
}

if(TargetCode == 7)
PissedAtTC6 = 32;

//if(TargetCode == 8)

//if(TargetCode == 9)

if(Suspicion == 0){

Attacking = false;
Trig.center = Vector3(0,0,0);
Trig.radius = TrigRadius;
Trig.height = TrigRadius;
target = ResetView;
}

if(HostileTurret)
if(TargetIsMoving)
Engage();

TargetIsMoving = false;

Tick = true;

}else{

if(Tandem){
target = Tandem.target;

if(!LeadedAimer)
NameOfTarget = Tandem.NameOfTarget;

if(Tandem.Attacking)
Attacking = true;
else
Attacking = false;

if(Tandem.TargetIsMoving)
TargetIsMoving = true;
else
TargetIsMoving = false;
}

if(AberrantAICruiser)
target = AberrantAICruiser.target;

if(AberrantAIDestroyer)
target = AberrantAIDestroyer.target;

if(AkbarCorvetteAI)
target = AkbarCorvetteAI.target;

if(AkbarEzymusAI)
target = AkbarEzymusAI.target;

if(PhobosAI)
target = PhobosAI.target;

if(BothunterAI){
target = BothunterAI.target;
Gun.ConfirmedName = NameOfTarget;
}

if(ValiantAI){
target = ValiantAI.target;
Gun.ConfirmedName = NameOfTarget;
}

}
if(VehicleTurret){
if(!VehicleScript.Inside)
activated = false;
}
}else{
target = ResetView;
if(VehicleTurret){
if(VehicleScript.Inside)
activated = true;
}
}
}

function Notice () {
if(Tick){

Tick = false;

if(target){

var lastPos : Vector3 = target.position;
yield WaitForSeconds (0.2);

if(target)
if(target.name.Contains ("TC"))
if(Vector3.Distance(target.position, lastPos) > 0.2){
TargetIsMoving = true;
Ignorage = 0;
}else{
Ignorage += 1;
}
}

}
}