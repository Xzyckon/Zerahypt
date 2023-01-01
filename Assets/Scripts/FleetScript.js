var fleetPoint1 : Transform;
var PresentFleetMember1 : GameObject;
var fleetPoint2 : Transform;
var PresentFleetMember2 : GameObject;
var fleetPoint3 : Transform;
var PresentFleetMember3 : GameObject;
var fleetPoint4 : Transform;
var PresentFleetMember4 : GameObject;


function Summon () {

if(!WorldInformation.PiriZerzekPresent){
var Prefabionaise1 = Resources.Load("Prefabs/Izmir_P_Warper", GameObject) as GameObject;
PresentFleetMember1 = Instantiate(Prefabionaise1, fleetPoint1.position, fleetPoint1.rotation);
}

yield WaitForSeconds (0.5);
if(WorldInformation.FleetMember2){
var Prefabionaise2 = Resources.Load("Prefabs/" + WorldInformation.FleetMember2, GameObject) as GameObject;
PresentFleetMember2 = Instantiate(Prefabionaise2, fleetPoint2.position, fleetPoint2.rotation);
PresentFleetMember2.transform.GetComponent(Warper).FleetNum = 1;
}
yield WaitForSeconds (0.5);
if(WorldInformation.FleetMember3){
var Prefabionaise3 = Resources.Load("Prefabs/" + WorldInformation.FleetMember3, GameObject) as GameObject;
PresentFleetMember3 = Instantiate(Prefabionaise3, fleetPoint3.position, fleetPoint3.rotation);
PresentFleetMember3.transform.GetComponent(Warper).FleetNum = 2;
}
yield WaitForSeconds (0.5);
if(WorldInformation.FleetMember4){
var Prefabionaise4 = Resources.Load("Prefabs/" + WorldInformation.FleetMember4, GameObject) as GameObject;
PresentFleetMember4 = Instantiate(Prefabionaise4, fleetPoint4.position, fleetPoint4.rotation);
PresentFleetMember4.transform.GetComponent(Warper).FleetNum = 3;
}
}