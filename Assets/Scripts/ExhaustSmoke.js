var EmissionRate : float = 100;
var EmissionAcceleration : float = 5;
var Vessel : GameObject;
var Running: boolean;
var Broken: boolean;

function Update () {

if(Broken){
particleSystem.emissionRate -= EmissionAcceleration;
return;
}

if(WorldInformation.playerCar == transform.parent.name)
if(CameraScript.InInterface == false){
if(Input.GetKeyDown("w") || Input.GetKeyDown("s"))
Running = true;
if(Input.GetKeyUp("w") || Input.GetKeyUp("s"))
Running = false;
}

if(Running){
if(particleSystem.emissionRate < EmissionRate)
   particleSystem.emissionRate += EmissionAcceleration;
}else{
if(particleSystem.emissionRate > 0)
   particleSystem.emissionRate -= EmissionAcceleration;
}

}