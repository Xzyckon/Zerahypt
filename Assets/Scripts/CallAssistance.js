
static var CallingAssistance : boolean;
static var DismissAssistance : boolean;

static var CallingAmmo : boolean;
static var DismissAmmo : boolean;

static var CallingKatovari : boolean;

static var CallingCargo : boolean;
static var CallingCargoAgrian : boolean;

static var CallingCepto : boolean;
static var DismissCepto : boolean;

static var CallingPiriDrone : boolean;
static var DismissPiriDrone : boolean;

static var IsAssisting : boolean;

static var IsSnynsing : boolean;

static var IsAmmoing : boolean;

static var IsKatovariying : boolean;

static var IsCargoing : boolean;

var CargoAgrianDisabled : boolean;
var CargoDisabled : boolean;

var CargoTimer = 0;

InvokeRepeating("Counter", 0.73, 1);

function Start (){

if(WorldInformation.instance.AreaCode == 0 ||
   WorldInformation.instance.AreaCode == 5 ||
   WorldInformation.instance.AreaCode == 6 ||
   WorldInformation.instance.AreaCode == 7 ||
   WorldInformation.instance.AreaCode == 8 ||
   WorldInformation.instance.AreaCode == 9 ||
   WorldInformation.instance.AreaCode == 10)
CargoAgrianDisabled = true;

if(WorldInformation.instance.AreaCode == 0 ||
   WorldInformation.instance.AreaCode == 6 ||
   WorldInformation.instance.AreaCode == 7 ||
   WorldInformation.instance.AreaCode == 8 ||
   WorldInformation.instance.AreaCode == 9 ||
   WorldInformation.instance.AreaCode == 10)
CargoDisabled = true;

CallingAssistance = false;
DismissAssistance = false;

CallingAmmo = false;
DismissAmmo = false;


CallingCepto = false;
DismissCepto = false;

CallingKatovari = false;

PiripodAI.IsActive = false;
IsAssisting = false;
}

function Update () {
if(CallingAssistance || DismissAssistance)
Assisting ();

if(CallingAmmo || DismissAmmo)
Ammoing ();

if(CallingKatovari)
Katovariying ();

if(CallingCargo)
Cargoing ();

if(CallingCargoAgrian)
CargoingAgrian ();

if(CallingCepto || DismissCepto)
AssistingCepto ();

if(CallingPiriDrone || DismissPiriDrone)
AssistingPiriDrone ();

}

function Assisting () {

if(CallingAssistance){
CallingAssistance = false;
CallButton.CallingOther = true;
IsAssisting = true;
}

if(DismissAssistance){
DismissAssistance = false;
CallButton.CallingOther2 = true;
IsAssisting = false;
}

}

function Ammoing () {

if(CallingAmmo){
CallingAmmo = false;
CallButton.CallingOther = true;
IsAmmoing = true;
}

if(DismissAmmo){
DismissAmmo = false;
CallButton.CallingOther2 = true;
IsAmmoing = false;
}

}

function Katovariying () {

if(CallingKatovari){
CallButton.CallingOther = true;
CallingKatovari = false;
IsKatovariying = true;
}

}

function Cargoing () {

if(!CargoDisabled){
if(CallingCargo){
var Prefabionaise1 = Resources.Load("VesselPrefabs/" + VesselList.instance.StringOut(), GameObject) as GameObject;
if(Prefabionaise1.GetComponent("VehicleSensor").LargeVessel == false){

CallingCargo = false;
CallButton.CallingOther = true;

if(VesselList.instance.StaticStringOut == null){
VesselList.instance.StaticStringOut = VesselList.instance.StringOut();
if(CargoTimer < 1)
CargoTimer = 60;
}

VesselList.instance.VLTF.Translate(Vector3.right * 3, Space.World);

}else{
CallingCargo = false;
CallButton.CallingOther0 = true;
FurtherActionScript.instance.VesselTooBig = true;
FurtherActionScript.instance.ShowText();
}
}
}else{
FurtherActionScript.instance.NoTransportService = true;
FurtherActionScript.instance.ShowText();
CallingCargo = false;
CallButton.CallingOther0 = true;
}

}

function CargoingAgrian () {

if(!CargoAgrianDisabled){
CallingCargoAgrian = false;
CallButton.CallingOther = true;
VesselList.instance.VLTF.Translate(Vector3.right * 3, Space.World);
entered = false;
yield WaitForSeconds (8);
WorldInformation.instance.Ceptobarge.SetActive (true);
CargoAgrianDisabled = true;
}else{
FurtherActionScript.instance.NoTransportService = true;
FurtherActionScript.instance.ShowText();
CallingCargoAgrian = false;
CallButton.CallingOther0 = true;
entered = false;
}

}

function AssistingCepto () {

if(PiripodAI.IsActive){
CallingCepto = false;
DismissCepto = true;
}else{
CallingCepto = true;
DismissCepto = false;
}

if(CallingCepto){
CallingCepto = false;
CallButton.CallingOther = true;
PiripodAI.IsActive = true;
IsSnynsing = true;
}

if(DismissCepto){
DismissCepto = false;
CallButton.CallingOther2 = true;
PiripodAI.IsActive = false;
IsSnynsing = false;
}

}

function AssistingPiriDrone () {

if(CallingPiriDrone){
CallingPiriDrone = false;
CallButton.CallingOther = true;
PiriDefenseDroneAI.Assisting = true;
}

if(DismissPiriDrone){
DismissPiriDrone = false;
CallButton.CallingOther2 = true;
PiriDefenseDroneAI.Assisting = false;
}

}

function Counter () {

if(CargoTimer > 1)
CargoTimer -= 1;

if(CargoTimer == 1){
CargoTimer = 0;
IsCargoing = true;
}

}