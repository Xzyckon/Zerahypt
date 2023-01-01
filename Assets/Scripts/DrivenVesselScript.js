
static var instance : DrivenVesselScript;

static var WhatToSpawn : String = "null";
static var LastScene : String = "null";

static var WhereToSpawnPos : Vector3;
static var WhereToSpawnRot : Quaternion;

static var VesselTravelSpeed = 40;
static var VesselSpawnDist : float = 1.5;

static var isWarpVessel : boolean;

static var isSpaceVessel : boolean;

static var DriverSpawn : Transform;

function Start () {

if(WorldInformation.isSwitchingScene){

var Prefabionaise2 = Resources.Load("VesselPrefabs/" + WhatToSpawn, GameObject) as GameObject;
if(WorldInformation.FacingNorth){
var TheThing1 = Instantiate(Prefabionaise2, WorldInformation.instance.TravelLocationS.position, WorldInformation.instance.TravelLocationS.rotation);
TheThing1.transform.GetComponent(VehicleSensor).Repositioned = true;
if(WhatToSpawn != "Vessel74")
if(WhatToSpawn != "Vessel118")
TheThing1.transform.GetComponent(VehicleSensor).Vessel.name = "DrivenVessel";
DriverSpawn = TheThing1.transform.GetComponent(VehicleSensor).ExitSphere;
TheThing1.transform.position.y += VesselSpawnDist;
}
if(WorldInformation.FacingEast){
var TheThing2 = Instantiate(Prefabionaise2, WorldInformation.instance.TravelLocationW.position, WorldInformation.instance.TravelLocationW.rotation);
TheThing2.transform.GetComponent(VehicleSensor).Repositioned = true;
if(WhatToSpawn != "Vessel74")
if(WhatToSpawn != "Vessel118")
TheThing2.transform.GetComponent(VehicleSensor).Vessel.name = "DrivenVessel";
DriverSpawn = TheThing2.transform.GetComponent(VehicleSensor).ExitSphere;
TheThing2.transform.position.y += VesselSpawnDist;
}
if(WorldInformation.FacingSouth){
var TheThing3 = Instantiate(Prefabionaise2, WorldInformation.instance.TravelLocationN.position, WorldInformation.instance.TravelLocationN.rotation);
TheThing3.transform.GetComponent(VehicleSensor).Repositioned = true;
if(WhatToSpawn != "Vessel74")
if(WhatToSpawn != "Vessel118")
TheThing3.transform.GetComponent(VehicleSensor).Vessel.name = "DrivenVessel";
DriverSpawn = TheThing3.transform.GetComponent(VehicleSensor).ExitSphere;
TheThing3.transform.position.y += VesselSpawnDist;
}
if(WorldInformation.FacingWest){
var TheThing4 = Instantiate(Prefabionaise2, WorldInformation.instance.TravelLocationE.position, WorldInformation.instance.TravelLocationE.rotation);
TheThing4.transform.GetComponent(VehicleSensor).Repositioned = true;
if(WhatToSpawn != "Vessel74")
if(WhatToSpawn != "Vessel118")
TheThing4.transform.GetComponent(VehicleSensor).Vessel.name = "DrivenVessel";
DriverSpawn = TheThing4.transform.GetComponent(VehicleSensor).ExitSphere;
TheThing4.transform.position.y += VesselSpawnDist;
}

PlayerInformation.instance.Pirizuka.position = DriverSpawn.position;
PlayerInformation.instance.Pirizuka.rotation = DriverSpawn.rotation;
PlayerInformation.instance.PhysCam.rotation = DriverSpawn.rotation;
PlayerInformation.instance.PlayerCam.rotation = DriverSpawn.rotation;

PlayerInformation.instance.Pirizuka.position.y += 1.8;

}else{

if(WhatToSpawn != "null")
if(WhatToSpawn != "Vessel1337")
if(LastScene == (Application.loadedLevelName)){

var Prefabionaise = Resources.Load("VesselPrefabs/" + WhatToSpawn, GameObject) as GameObject;
var TheThing = Instantiate(Prefabionaise, WhereToSpawnPos, WhereToSpawnRot);
TheThing.transform.GetComponent(VehicleSensor).Repositioned = true;
if(WhatToSpawn != "Vessel74")
if(WhatToSpawn != "Vessel118")
TheThing.transform.GetComponent(VehicleSensor).Vessel.name = "DrivenVessel";

}

}

WorldInformation.isSwitchingScene = false;
}

function Awake(){
	instance = this;
}