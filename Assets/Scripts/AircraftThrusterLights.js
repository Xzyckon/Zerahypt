var VesselScript : MainVehicleController;

var UseEngine : boolean;

var Broken: boolean;

var WorkInDark: boolean;

var LightIntensity : float = 1.0;

function Start (){
if(WorldInformation.instance.AreaDark == false && WorkInDark)
Broken = true;
}

function Update () {

if(UseEngine){
if(VesselScript.EngineRunning == true)
ShutOff = false;
if(VesselScript.EngineRunning == false)
ShutOff = true;
}

if(Broken){
light.intensity = 0;
return;
}

if(!ShutOff){

	if(WorldInformation.playerCar.Contains(transform.parent.name)){
	
	if(CameraScript.InInterface == false){
	
		if(Input.GetKeyDown(KeyCode.Mouse0)){
			light.intensity = LightIntensity;
		} else if(Input.GetKeyUp(KeyCode.Mouse0)){
			light.intensity = 0;
		}
	}
} else if(PlayerInformation.playerCar == null){
	light.intensity = 0;
}
}
}