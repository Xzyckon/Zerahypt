#pragma strict

var TextGO : GameObject;

static var IsActive : boolean;

static var FurtherActionE1 : boolean;
static var FurtherActionE2 : boolean;

static var FurtherActionLMB : boolean;

var NoTravel : boolean;
var NoTravelCM : boolean;
var NoHitchTravel : boolean;
var VesselBroken : boolean;
var NewDocument : boolean;
var NoDocument : boolean;
var LockedOn : boolean;
var Hitching : boolean;
var Wanted : boolean;
var Travel : boolean;
var NoPass : boolean;
var NoVessel : boolean;
var Backpack : boolean;
var HeadStuck : boolean;
var UsingPhone : boolean;
var VesselTooBig : boolean;
var UsingTurret1 : boolean;
var UsingTurret2 : boolean;
var UsingTurret3 : boolean;
var PiriCeptopodOof : boolean;
var PersonalDroneOof : boolean;
var NoTransportService : boolean;
var DocumentationsLimit : boolean;
var ZerzekAlreadyPresent : boolean;

var NoTravelText : GameObject;
var NoTravelCMText : GameObject;
var NoHitchTravelText : GameObject;
var VesselBrokenText : GameObject;
var NewDocumentText : GameObject;
var NoDocumentText : GameObject;
var LockedOnText : GameObject;
var HitchingText : GameObject;
var WantedText : GameObject;
var TravelText : GameObject;
var NoPassText : GameObject;
var BackpackText : GameObject;
var NoVesselText : GameObject;
var HeadStuckText : GameObject;
var UsingPhoneText : GameObject;
var VesselTooBigText : GameObject;
var UsingTurret1Text : GameObject;
var UsingTurret2Text : GameObject;
var UsingTurret3Text : GameObject;
var PiriCeptopodOofText : GameObject;
var PersonalDroneOofText : GameObject;
var NoTransportServiceText : GameObject;
var DocumentationsLimitText : GameObject;
var ZerzekAlreadyPresentText : GameObject;

static var instance : FurtherActionScript;

function Awake()
{
	instance = this;
}

function Update() {
	if (Input.GetKeyDown(KeyCode.F)){
	if (!CameraScript.InInterface){
	if(IsActive){
    TextGO.SetActive (false);
    IsActive = false;
    }else{
    ShowText();
    TextGO.SetActive (true);
    IsActive = true;
    }
    }
	}
	
	if(IsActive){
	
	if (Input.GetKeyDown(KeyCode.E))
	FurtherActionE1 = true;
	
	if (Input.GetKeyUp(KeyCode.E))
	DelayerE();
	
	if (Input.GetMouseButton(0))
	FurtherActionLMB = true;
	
	if (Input.GetMouseButtonUp(0))
	DelayerLMB();
    
	}
}

function ShowText() {

if(NoTravel){
TextGO.SetActive (false);
NoTravelText.SetActive (true);
NoTravelText.animation.Play();
}else{
NoTravelText.SetActive (false);
}

if(NoTravelCM){
TextGO.SetActive (false);
NoTravelCMText.SetActive (true);
NoTravelCMText.animation.Play();
}else{
NoTravelCMText.SetActive (false);
}

if(NoHitchTravel){
TextGO.SetActive (false);
NoHitchTravelText.SetActive (true);
NoHitchTravelText.animation.Play();
}else{
NoHitchTravelText.SetActive (false);
}

if(VesselBroken){
TextGO.SetActive (false);
VesselBrokenText.SetActive (true);
VesselBrokenText.animation.Play();
}else{
VesselBrokenText.SetActive (false);
}

if(NewDocument){
TextGO.SetActive (false);
NewDocumentText.SetActive (true);
NewDocumentText.animation.Play();
}else{
NewDocumentText.SetActive (false);
}

if(NoDocument){
TextGO.SetActive (false);
NoDocumentText.SetActive (true);
NoDocumentText.animation.Play();
}else{
NoDocumentText.SetActive (false);
}

if(Wanted){
TextGO.SetActive (false);
WantedText.SetActive (true);
WantedText.animation.Play();
}else{
WantedText.SetActive (false);
}

if(LockedOn){
TextGO.SetActive (false);
LockedOnText.SetActive (true);
LockedOnText.animation.Play();
}else{
LockedOnText.SetActive (false);
}

if(Hitching){
TextGO.SetActive (false);
HitchingText.SetActive (true);
HitchingText.animation.Play();
}else{
HitchingText.SetActive (false);
}

if(Travel){
TextGO.SetActive (false);
TravelText.SetActive (true);
TravelText.animation.Play();
}else{
TravelText.SetActive (false);
}

if(NoVessel){
TextGO.SetActive (false);
NoVesselText.SetActive (true);
NoVesselText.animation.Play();
}else{
NoVesselText.SetActive (false);
}

if(Backpack){
TextGO.SetActive (false);
BackpackText.SetActive (true);
BackpackText.animation.Play();
}else{
BackpackText.SetActive (false);
}

if(NoPass){
TextGO.SetActive (false);
NoPassText.SetActive (true);
NoPassText.animation.Play();
}else{
NoPassText.SetActive (false);
}

if(HeadStuck){
TextGO.SetActive (false);
HeadStuckText.SetActive (true);
HeadStuckText.animation.Play();
}else{
HeadStuckText.SetActive (false);
}

if(UsingPhone){
TextGO.SetActive (false);
UsingPhoneText.SetActive (true);
UsingPhoneText.animation.Play();
}else{
UsingPhoneText.SetActive (false);
}

if(VesselTooBig){
TextGO.SetActive (false);
VesselTooBigText.SetActive (true);
VesselTooBigText.animation.Play();
}else{
VesselTooBigText.SetActive (false);
}

if(UsingTurret1){
TextGO.SetActive (false);
UsingTurret1Text.SetActive (true);
UsingTurret1Text.animation.Play();
}else{
UsingTurret1Text.SetActive (false);
}

if(UsingTurret2){
TextGO.SetActive (false);
UsingTurret2Text.SetActive (true);
UsingTurret2Text.animation.Play();
}else{
UsingTurret2Text.SetActive (false);
}

if(UsingTurret3){
TextGO.SetActive (false);
UsingTurret3Text.SetActive (true);
UsingTurret3Text.animation.Play();
}else{
UsingTurret3Text.SetActive (false);
}

if(PiriCeptopodOof){
TextGO.SetActive (false);
PiriCeptopodOofText.SetActive (true);
PiriCeptopodOofText.animation.Play();
}else{
PiriCeptopodOofText.SetActive (false);
}

if(PersonalDroneOof){
TextGO.SetActive (false);
PersonalDroneOofText.SetActive (true);
PersonalDroneOofText.animation.Play();
}else{
PersonalDroneOofText.SetActive (false);
}

if(NoTransportService){
TextGO.SetActive (false);
NoTransportServiceText.SetActive (true);
NoTransportServiceText.animation.Play();
}else{
NoTransportServiceText.SetActive (false);
}

if(DocumentationsLimit){
TextGO.SetActive (false);
DocumentationsLimitText.SetActive (true);
DocumentationsLimitText.animation.Play();
}else{
DocumentationsLimitText.SetActive (false);
}

if(ZerzekAlreadyPresent){
TextGO.SetActive (false);
ZerzekAlreadyPresentText.SetActive (true);
ZerzekAlreadyPresentText.animation.Play();
}else{
ZerzekAlreadyPresentText.SetActive (false);
}

NoTravel = false;
NoTravelCM = false;
NoHitchTravel = false;
VesselBroken = false;
NewDocument = false;
NoDocument = false;
LockedOn = false;
Hitching = false;
Wanted = false;
Travel = false;
NoPass = false;
NoVessel = false;
Backpack = false;
HeadStuck = false;
UsingPhone = false;
VesselTooBig = false;
UsingTurret1 = false;
UsingTurret2 = false;
UsingTurret3 = false;
PiriCeptopodOof = false;
PersonalDroneOof = false;
NoTransportService = false;
DocumentationsLimit = false;
ZerzekAlreadyPresent = false;
}

function DelayerE() {
yield WaitForSeconds (0.1);
FurtherActionE1 = false;
TextGO.SetActive (false);
IsActive = false;
}

function DelayerLMB() {
yield WaitForSeconds (0.1);
FurtherActionLMB = false;
TextGO.SetActive (false);
IsActive = false;
}