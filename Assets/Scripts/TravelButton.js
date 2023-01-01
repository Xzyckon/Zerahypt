
var Switching : boolean;

var isPressed : boolean;

var Count = 0;

InvokeRepeating("Counter", 1, 1);

function OnMouseDown () {

if(WorldInformation.PiriWanted > 240){
FurtherActionScript.instance.Wanted = true;
FurtherActionScript.instance.ShowText();
isPressed = false;
return;
}

if(WorldInformation.playerCar == "null"){
FurtherActionScript.instance.NoVessel = true;
FurtherActionScript.instance.ShowText();
isPressed = false;
return;
}

if(IndicatorScript.VehicleIsDamaged){
FurtherActionScript.instance.VesselBroken = true;
FurtherActionScript.instance.ShowText();
isPressed = false;
return;
}

if(TerrahyptianNetwork.instance.NukeMarker)
if(Vector3.Distance(TerrahyptianNetwork.instance.NukeMarker.position, PlayerInformation.instance.PiriTarget.position) < 256){
FurtherActionScript.instance.NoTravelCM = true;
FurtherActionScript.instance.ShowText();
isPressed = false;
return;
}

if(WorldInformation.instance.AreaClosed){
FurtherActionScript.instance.NoTravel = true;
FurtherActionScript.instance.ShowText();
isPressed = false;
return;
}

if(WorldInformation.Hitching){
FurtherActionScript.instance.NoHitchTravel = true;
FurtherActionScript.instance.ShowText();
isPressed = false;
return;
}

if(WorldInformation.playerCar != "null"){
FurtherActionScript.instance.Travel = true;
FurtherActionScript.instance.ShowText();
isPressed = true;
return;
}

}

function SwitchScene () {
ScreenFadeScript.FadeOut = true;
yield WaitForSeconds(3);
if(!WorldInformation.PiriIsHurt)
WorldInformation.instance.Travel();
}

function Counter () {
if(isPressed){
if (Input.GetMouseButton(0))
Count += 1;

if (!Input.GetMouseButton(0)){
Count = 0;
isPressed = false;
}


if(!Switching && Count > 2){
	    Switching = true;
		SwitchScene();
}
}
}