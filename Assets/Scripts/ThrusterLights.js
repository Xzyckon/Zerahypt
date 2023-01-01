var Vehicle : GameObject;
var Broken: boolean;

function Update () {

if(Broken){
particleSystem.enableEmission = false;
}

if(Broken)
return;

	if(WorldInformation.playerCar.Contains(Vehicle.name)){
		if(Input.GetKeyDown("w")){
			light.intensity = 0.3;
		} else if(Input.GetKeyUp("w")){
			light.intensity = 0;
		}
} else if(WorldInformation.playerCar == null){
	light.intensity = 0;
}
}