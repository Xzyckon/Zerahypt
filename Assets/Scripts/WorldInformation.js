#pragma strict

static var ZerahyptIsRunning : boolean;

var AreaName : String;

var AreaCode : int;

private var currentAmbColor : int = 0;
var changeTime : float;
var ambColors : Color[];
var reflColors : Color;

static var AmbOff : boolean;
static var AmbOn : boolean;

var AreaBeige : boolean;
var AreaGray : boolean;
var AreaDark : boolean;
var AreaDut : boolean;
var AreaSpace : boolean;

var AreaClosed : boolean;
var AreaKabrian : boolean;

var RestrictedArea : Transform;

var TravelLocation : Transform;

var TravelLocationN : Transform;
var TravelLocationE : Transform;
var TravelLocationS : Transform;
var TravelLocationW : Transform;

var SpecialDeliveryArea : Transform;
var didDeliver : boolean;

var FleetWarp : GameObject;
var PiriFleetScript : FleetScript;

var Ceptobarge : GameObject;

var InvertedNoPass : boolean;

var TaxiWhereToGo : String = "Null";

var TaxiExit1 : boolean;
var TaxiExit2 : boolean;
var TaxiExit3 : boolean;

var NPCGunTL : LayerMask;

var Once : boolean;

static var ZerahyptStarted : boolean;

static var cheatsOn : boolean;

static var PopUp : boolean;

static var Godmode : boolean;

static var PiriIsHurt : boolean;

static var PiriExposed : int;

static var PiriWanted : int;

var NaughtyVicinity : Vector3;

static var PiriFree : boolean;
static var PiriTopFree : boolean;
static var PiriBottomFree : boolean;

static var PiriZerzekPresent : boolean;

static var PiriPodPresent : boolean;

static var instance : WorldInformation;
static var VersionID : String = "42.6";

static var angyS : AngyScript;

static var pSpeech : Transform;
static var pSpeechRange : float;

static var bigMissile1 : Transform;
static var bigMissile2 : Transform;

static var GaragedVehicle : String = "Vessel23";
static var GaragedVehicleSpawnDist : float = 1.5;
static var Garage : Transform;
static var NearGarage : boolean;
static var InGarage : boolean;

static var GaragedVehicleF1 : String = "Vessel23";
static var GaragedVehicleSpawnDistF1 : float = 1.5;
static var GarageF1 : Transform;
static var NearGarageF1 : boolean;
static var InGarageF1 : boolean;

static var GaragedVehicleF2 : String = "Vessel23";
static var GaragedVehicleSpawnDistF2 : float = 1.5;
static var GarageF2 : Transform;
static var NearGarageF2 : boolean;
static var InGarageF2 : boolean;

static var FleetMember2 : String;
static var FleetMember3 : String;
static var FleetMember4 : String;

static var ShippedVehicleNum : int;

static var vehicleSpeed : int;
static var playerLevel : int;
static var UsingVessel : boolean;
static var Hitching : boolean;
static var UsingSnyf : boolean;
static var playerCar : String = "null";
static var npcVehicleTF : Transform;
static var vehicleController : MainVehicleController;
static var vehicleDoorController : CarDoorController;
static var CanLeaveVehicle : boolean;
static var UsingClosedVessel : boolean;
static var UsingBrightVessel : boolean;
static var UsingBigVessel : boolean;
static var TargetAttack : Vector3;
static var SaveGame : boolean;
static var stopCamera : boolean;
static var AudioTrackNumber : int;
static var FPMode : boolean;
static var IsOotkinSick : boolean = false;
static var NearEntrance : boolean;
static var IsNopass : boolean;

static var backpackIsPresent : boolean;
static var isWearingBackpack : boolean;
static var whatBackpack : String = "null";

static var isHolding : boolean;

static var isSwitchingScene : boolean;

static var isTraveling : boolean;

static var DrivingZerzek : boolean;

static var FacingNorth : boolean;
static var FacingSouth : boolean;
static var FacingWest : boolean;
static var FacingEast : boolean;

static var Unset : boolean;

static var DamageCounterOff : boolean;
static var MusicOff : boolean;

static var TutorialOff : boolean;

static var AudioVolume : float = 1;

static var Sensitivity = 60;

static var DocumentationsStat : String;

static var DocumentationsPurgeNum : int;

static var workSessionNum = 0;
static var workInstanceNum = 0;

var objectsScanned : boolean;

var minClock = 0;

var terrahyptTimeSet = 28512;

static var terrahyptTime = 0;

var terrahyptSecond = 0;
var terrahyptMinute = 0;
var terrahyptHour = 0;

static var minuteBell : boolean;
static var halfhourBell : boolean;
static var hourBell : boolean;
static var halfraonBell : boolean;

InvokeRepeating("Ticker", 0.77, 1);

InvokeRepeating("Ticky", 3, 1.43);

function Start(){

WorldInformation.isTraveling = false;
WorldInformation.isHolding = false;

WorldInformation.backpackIsPresent = false;

DocumentationsStat = PlayerPrefs.GetString("Documentations");

var Prefabionaise = Resources.Load("Prefabs/SavedLayerMasks", GameObject) as GameObject;
NPCGunTL = Prefabionaise.GetComponent(LayerMaskionaises).SavedLayerMask1;

if(PlayerPrefs.HasKey("FleetMember2"))
FleetMember2 = PlayerPrefs.GetString("FleetMember2");

if(PlayerPrefs.HasKey("FleetMember3"))
FleetMember3 = PlayerPrefs.GetString("FleetMember3");

if(PlayerPrefs.HasKey("FleetMember4"))
FleetMember4 = PlayerPrefs.GetString("FleetMember4");


if(!PlayerPrefs.HasKey("Sensitivity"))
PlayerPrefs.SetInt("Sensitivity", 60);

if(!PlayerPrefs.HasKey("Volume"))
PlayerPrefs.SetFloat("Volume", 1);

if(!PlayerPrefs.HasKey("Music"))
PlayerPrefs.SetInt("Music", 1);

if(!PlayerPrefs.HasKey("Damage"))
PlayerPrefs.SetInt("Damage", 1);

if(!PlayerPrefs.HasKey("Tutorial"))
PlayerPrefs.SetInt("Tutorial", 1);

Sensitivity = PlayerPrefs.GetInt("Sensitivity");

AudioVolume = PlayerPrefs.GetFloat("Volume");

if(PlayerPrefs.GetInt("Music") == 1)
MusicOff = false;
else
MusicOff = true;

if(PlayerPrefs.GetInt("Damage") == 1)
DamageCounterOff = false;
else
DamageCounterOff = true;

if(PlayerPrefs.GetInt("Tutorial") == 1)
TutorialOff = false;
else
TutorialOff = true;

AudioListener.volume = AudioVolume;

terrahyptTime = Random.Range(0, 32768);

//terrahyptTime = terrahyptTimeSet;

setTime();

PiriIsHurt = false;

Hitching = false;

PiriPodPresent = false;

NaughtyVicinity.y = 400000;

if(AreaCode == 63)
return;

Unset = false;
PiriFree = false;
PiriZerzekPresent = false;
IsNopass = false;
CanLeaveVehicle = true;
UsingClosedVessel = false;
playerCar = "null";
	
if(AreaSpace)
Physics.gravity = Vector3(0, 0, 0);
else
Physics.gravity = Vector3(0, -13, 0);

yield WaitForSeconds (0.5);

if(DocumentationsStat.Length < 16){

PlayerPrefs.DeleteKey("WorkSession");

}

if(!ZerahyptIsRunning){

ZerahyptIsRunning = true;

if(!PlayerPrefs.HasKey("WorkSession")){
workSessionNum = 1;
workInstanceNum = 1;
PlayerPrefs.SetInt("WorkSession", workSessionNum);
Debug.Log("itDid1");
DocumentationsStat += "Work Session " + workSessionNum + "\nEntry " + workInstanceNum + " : Instance (" + AreaName + ")\n===============================";
}else{
workSessionNum = PlayerPrefs.GetInt("WorkSession");
workSessionNum += 1;
workInstanceNum = 1;
PlayerPrefs.SetInt("WorkSession", workSessionNum);
//Debug.Log("itDid2");
DocumentationsStat += "\n \n \n \n \nWork Session " + workSessionNum + "\nEntry " + workInstanceNum + " : Instance (" + AreaName + ")\n===============================";
}

}else{

if(!isTraveling){

workInstanceNum += 1;

if(workInstanceNum > 1){
DocumentationsStat += "\n \n \n \n \nEntry " + workInstanceNum + " : Instance (" + AreaName + ")\n===============================";
}else{
DocumentationsStat += "Entry " + workInstanceNum + " : Instance (" + AreaName + ")\n===============================";
}
}

}

if(!isTraveling)
if(DocumentationsStat.Length > 8000){

if(DocumentationsPurgeNum > 3){
DocumentationsPurgeNum = 0;
workInstanceNum = 1;
DocumentationsStat = null;
DocumentationsStat += "Work Session " + workSessionNum + "\nEntry " + workInstanceNum + " : Instance (" + AreaName + ")\n===============================";
PlayerPrefs.SetString("Documentations", DocumentationsStat);
}else{
//Debug.Log("IsDoingit1 " + DocumentationsStat.Length);
DocumentationsPurgeNum += 1;
FurtherActionScript.instance.DocumentationsLimit = true;
FurtherActionScript.instance.ShowText();
}

}

PlayerPrefs.Save();

yield WaitForSeconds (1.5);
if(PiriZerzekPresent)
SummonFleet();

}

function SummonFleet(){
yield WaitForSeconds (20);
if(PiriFleetScript)
PiriFleetScript.Summon();
}

function Home(){
if(FleetWarp){
SummonFleet();
}else{
FurtherActionScript.instance.NoTransportService = true;
FurtherActionScript.instance.ShowText();
CallButton.CallingOther0 = true;
}
}

function HomeNow(){
if(FleetWarp)
SummonFleet();
}

function Hurt(){
if(!Once){
Once = true;
yield WaitForSeconds (1);
ScreenFadeScript.FadeOut = true;
DrivenVesselScript.WhatToSpawn = "null";
PlayerPrefs.SetFloat("Injured", 1);
PlayerPrefs.Save();
yield WaitForSeconds (3);
AgrianNetwork.instance.TC1CriminalLevel = 0;
AbiaSyndicateNetwork.TC1CriminalLevel = 0;
TerrahyptianNetwork.TC1CriminalLevel = 0;
SlavuicNetwork.TC1DeathRow = 0;
MevNavNetwork.TC1DeathRow = 0;
DutvutanianNetwork.TC1CriminalLevel = 0;
DutvutanianNetwork.TC1CriminalPoints = 2;
PiriWanted = 0;
WorldInformation.FPMode = false;

if(!objectsScanned)
DocumentationsStat += "\n \nNothing to report.";

PlayerPrefs.SetString("Documentations", DocumentationsStat);
 
Application.LoadLevel("PiriZerzek");
}
}

function EscortHome () {
ScreenFadeScript.FadeOut = true;
PlayerPrefs.DeleteKey("Injured");
yield WaitForSeconds (1);
PlayerPrefs.SetFloat("Injured", 1);
PlayerPrefs.Save();
yield WaitForSeconds (1);
WorldInformation.FPMode = false;
PlayerCamFollow.HoldCam = false;

if(!objectsScanned)
DocumentationsStat += "\n \nNothing to report.";

PlayerPrefs.SetString("Documentations", DocumentationsStat);

Application.LoadLevel("PiriZerzek");
}

function Travel(){

if(!objectsScanned)
DocumentationsStat += "\n \nNothing to report.";

PlayerPrefs.SetString("Documentations", DocumentationsStat);

Application.LoadLevel("TravelScene");
}

function setTime() {
  terrahyptSecond = Mathf.Repeat(terrahyptTime, 64);
  terrahyptMinute = Mathf.Repeat(Mathf.Floor(terrahyptTime / 64), 64);
  terrahyptHour = Mathf.Repeat(Mathf.Floor(terrahyptTime / 64 / 64), 16);
}

function Ticker (){

minClock += 1;

//Debug.Log(PiriExposed);
//Debug.Log(pSpeech);
//Debug.Log(PiriWanted);

if(minClock > 120){
Resources.UnloadUnusedAssets();
minClock = 1;
}

if(bigMissile1)
if(bigMissile1.name.Contains ("rok"))
bigMissile1 = null;
if(bigMissile2)
if(bigMissile2.name.Contains ("rok"))
bigMissile2 = null;

if(!isTraveling){
if(PiriExposed > 0){

if(Vector3.Distance(PlayerInformation.instance.Pirizuka.position, NaughtyVicinity) > 2000)
PiriExposed -= 1;

if(NaughtyVicinity.y == 88888888){
NaughtyVicinity = transform.position;
}

}else{
NaughtyVicinity.y = 88888888;
}
}

}

function Ticky (){
terrahyptTime += 1;
terrahyptSecond += 1;

if(terrahyptSecond > 63){
minuteBell = true;
terrahyptSecond = 0;
terrahyptMinute += 1;
BellCease();
}

if(terrahyptMinute == 32 && terrahyptSecond < 2){
halfhourBell = true;
BellCease();
}

if(terrahyptMinute > 63){
hourBell = true;
terrahyptMinute = 0;
terrahyptHour += 1;
BellCease();
}

if(terrahyptHour > 15 && terrahyptHour < 16){
if(minuteBell && hourBell)
halfraonBell = true;
terrahyptHour = 0;
terrahyptTime = 0;
BellCease();
}

if(terrahyptHour > 12 && terrahyptHour < 14){
if(minuteBell && hourBell)
halfraonBell = true;
BellCease();
}

if(terrahyptHour > 7 && terrahyptHour < 9){
if(minuteBell && hourBell)
halfraonBell = true;
BellCease();
}

if(terrahyptHour > 3 && terrahyptHour < 5){
if(minuteBell && hourBell)
halfraonBell = true;
BellCease();
}

}

function BellCease (){
yield WaitForSeconds (4);
minuteBell = false;
halfhourBell = false;
hourBell = false;
halfraonBell = false;
}

function Awake()
{
	instance = this;
}

function Update () {

if(ambColors)
if(ambColors.Length > 0)
RenderSettings.ambientLight = Color.Lerp (RenderSettings.ambientLight, ambColors[currentAmbColor], changeTime * Time.deltaTime);

if(AmbOn){
AmbOn = false;
NextAmbColor();
}

if(AmbOff){
AmbOff = false;
PrevAmbColor();
}

if(pSpeech){

pSpeechRange += 0.1 * pSpeechRange;

if(pSpeechRange > 5000)
pSpeechRange = 1;

//Debug.Log(pSpeechRange);
}else{

pSpeechRange = 1;

}

//BubbleModel.localScale.x = pSpeechRange;
//BubbleModel.localScale.y = pSpeechRange;
//BubbleModel.localScale.z = pSpeechRange;

//BubbleModel.position = PlayerInformation.instance.Pirizuka.position;

if(cheatsOn){

if (Input.GetKey("c"))
if (Input.GetKey("g")){
Godmode = true;
cheatsOn = false;
PiriWanted = 0;
Debug.Log("Godmode");
}

}

}

function NextAmbColor(){
if(currentAmbColor >= ambColors.length -1){
currentAmbColor = 0;
}else{
if(currentAmbColor < 1)
currentAmbColor += 1;
}
}

function PrevAmbColor(){
if(currentAmbColor >= ambColors.length -1){
currentAmbColor = 0;
}else{
if(currentAmbColor > 0)
currentAmbColor -= 1;
}
}

function SetChangeTime(ct : float){
    changeTime = ct;
}

function QuitZerahypt(){

if(!objectsScanned)
DocumentationsStat += "\n \nNothing to report.";

if(DocumentationsStat.Length > 8000){
DocumentationsPurgeNum = 0;
workInstanceNum = 1;
DocumentationsStat = null;
}

PlayerPrefs.SetString("Documentations", DocumentationsStat);

Application.Quit();
}