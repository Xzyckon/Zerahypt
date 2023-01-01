var Target : Transform;
var PeukRB : Rigidbody;
var PeukTF : Transform;
var thisTC : Transform;

var thisTrig : SphereCollider;

var BigPeuk : boolean;

var prongBase : Transform;
var startProng : Transform;
var prong : Transform;
var prongNum = 0;
var prongCurve : AnimationCurve = new AnimationCurve();

var Pronged : boolean;
var ProngedTime = 0;
var ProngEndScript : tendrilSectionScript;

var RetractTime = 0;

var ProngOut: AudioClip;
var ProngIn: AudioClip;

var ProngAudio: AudioSource;

var ProngSoundBool : boolean;

var LegRightSensor : PeukopedeLegSensor;
var LegLeftSensor : PeukopedeLegSensor;
var LegRightRB : Rigidbody;
var LegLeftRB : Rigidbody;

var LegRightCJ : ConfigurableJoint;
var LegLeftCJ : ConfigurableJoint;

var StandingStrength = 10.0;
var Power : float = 0.01;
var LegLiftPower : float = 1;
var LegStandPower : float = 1;
var Standing : boolean;
var StrideTime : float = 0.5;
var RestTime : float = 0.5;

var LegRightMove : boolean;
var LegLeftMove : boolean;

var Grab : boolean;

var Tick : boolean;
var PTick : boolean;

var MtargetLayers : LayerMask;

InvokeRepeating("Ticker", 1, 0.2);

function Start () {

if(BigPeuk)
StuffSpawner.TheNPC006N += 1;
else
StuffSpawner.TheNPC005N += 1;

}
 
function FixedUpdate (){

if(Target){

var relativePoint = PeukTF.InverseTransformPoint(Target.position);
FAndB = relativePoint.x;

if(LegRightMove && Standing)
LegRightRB.AddForce((Target.position - PeukTF.position).normalized * Power);
if(LegLeftMove && Standing)
LegLeftRB.AddForce((Target.position - PeukTF.position).normalized * Power);


if(Pronged){

if(ProngedTime > 0){
ProngedTime -= 1;
}else{

if(RetractTime < 1){
ProngEndScript.Retracting = true;
RetractTime = 240;
Grab = false;
if(ProngSoundBool){
ProngSoundBool = false;
ProngSoundIn();
}
}else{
RetractTime -= 1;
if(RetractTime < 8){
Pronged = false;
RetractTime = 0;
prongNum = 0;
prong = startProng;
}
}
}

}

if(Grab){

if(!Pronged){
Pronging();
if(FAndB < 0){
LegRightSensor.LiftPower = -LegStandPower;
LegLeftSensor.LiftPower = -LegStandPower;
}
}else{
if(FAndB > 0)
Grab = false;
}

}else{
Walking();
}

}

if(Standing == true){
    PeukRB.AddForceAtPosition(Vector3.up * StandingStrength, PeukTF.up * 1);
    PeukRB.AddForceAtPosition(-Vector3.up * StandingStrength, -PeukTF.up * 1);
    
PeukRB.useGravity = false;
PeukRB.drag = 3;

}else{

PeukRB.useGravity = true;
PeukRB.drag = 0;

}
}

function OnTriggerStay (other : Collider) {

ON = other.name;
OT = other.transform;
OG = other.gameObject;

if(Physics.Linecast (PeukTF.position, OT.position, MtargetLayers))
return;

if(ON.Contains ("TC")){

if(OG.GetComponent("TCInfo"))
if(OG.GetComponent("TCInfo").IAmName == "Peukopede")
return;

thisTrig.radius = 0.01;

Target = OT;

}
}

function Ticker () {

if(thisTrig.radius < 24)
thisTrig.radius += 1;
else
thisTrig.radius = 24;

if(Target){

if(Vector3.Distance(prongBase.position, Target.position) < 4){
if(!Physics.Linecast (prongBase.position, Target.position, MtargetLayers))
Grab = true;
if(thisTC.name == "TC0")
TCResetter();
}

}
}

function TCResetter () {
thisTC.name = "TC0a";
yield WaitForSeconds (15);
thisTC.name = "TC0";
}

function Walking () {
if(Tick)
return;

Tick = true;

if(Standing == true){

LegRightMove = true;
LegLeftMove = false;
LegRightSensor.LiftPower = LegLiftPower;
LegLeftSensor.LiftPower = -LegStandPower;
yield WaitForSeconds (RestTime);
LegLeftMove = false;
LegRightMove = false;
LegRightSensor.LiftPower = 0;
LegLeftSensor.LiftPower = 0;
yield WaitForSeconds (StrideTime);
LegLeftMove = true;
LegRightMove = false;
LegRightSensor.LiftPower = -LegStandPower;
LegLeftSensor.LiftPower = LegLiftPower;
yield WaitForSeconds (RestTime);
LegLeftMove = false;
LegRightMove = false;
LegRightSensor.LiftPower = 0;
LegLeftSensor.LiftPower = 0;
yield WaitForSeconds (StrideTime);
}

Tick = false;
}

function LegMover (){
LegRightMove = true;
LegLeftMove = false;
yield WaitForSeconds (0.5);
LegLeftMove = true;
LegRightMove = false;
}

function Pronging () {
if(PTick)
return;

PTick = true;

if(!ProngSoundBool){
ProngSoundBool = true;
ProngSoundOut();
}

axisSize = prongCurve.Evaluate(prongNum);

var Load = Resources.Load("Prefabs/prongSection", GameObject) as GameObject;

var TGO = Instantiate(Load, prong.position + prong.forward * 0.12, prong.rotation);

TGO.transform.parent = prongBase;

ProngEndScript = TGO.GetComponent(tendrilSectionScript);
ProngEndScript.Root = prong;
ProngEndScript.PeukAI = this;
ProngEndScript.mainBody = PeukTF;

prong = TGO.transform;

prong.localScale.x = axisSize;
prong.localScale.y = axisSize;

if(Target){
NewRotation = Quaternion.LookRotation(Target.position - prong.position);
prong.rotation = Quaternion.RotateTowards(prong.rotation, NewRotation, Time.deltaTime * 1500);
}
 
prongNum += 1;

if(prongNum > 31){
ProngEndScript.isEnd = true;
ProngedTime = 120;
Pronged = true;
Grab = false;
}

PTick = false;
}

function ProngSoundOut(){
ProngAudio.clip = ProngOut;
ProngAudio.Play();
}

function ProngSoundIn(){
ProngAudio.clip = ProngIn;
ProngAudio.Play();
}



function Damage (){
if(BigPeuk)
StuffSpawner.TheNPC006N -= 1;
else
StuffSpawner.TheNPC005N -= 1;
}



