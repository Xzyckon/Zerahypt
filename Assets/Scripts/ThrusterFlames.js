var Broken: boolean;

var MainVessel: Transform;
var VesselScript : MainVehicleController;

var UseEngine : boolean;

var Reversable: boolean;
var Strafable: boolean;
var Aircraft: boolean;

var ShutOff : boolean;

var Poof: GameObject;

function Update () {

if(MainVessel.name == "broken")
if(!Broken){
Broken = true;
particleSystem.enableEmission = false;
}

if(Broken)
return;

if(WorldInformation.playerCar == MainVessel.name){

if(UseEngine){
if(VesselScript.EngineRunning == true)
ShutOff = false;
if(VesselScript.EngineRunning == false)
if(!ShutOff){
particleSystem.enableEmission = false;
ShutOff = true;
}
}else{
if(VesselScript){
if(VesselScript.Civmode)
ShutOff = true;
else
ShutOff = false;
}
}

if(CameraScript.InInterface == false && !ShutOff){
if(!Aircraft){
		if(Input.GetKeyDown("w")){
			particleSystem.enableEmission = true;
	    if(Poof)
        Instantiate(Poof, transform.position, transform.rotation);
			}
		if(Input.GetKeyUp("w"))
			particleSystem.enableEmission = false;
			
		if(Strafable){
		if(Input.GetKey("a"))
			particleSystem.enableEmission = true;
		if(Input.GetKeyUp("a"))
		if(!Input.GetKey("w"))
			particleSystem.enableEmission = false;
		if(Input.GetKey("d"))
			particleSystem.enableEmission = true;
		if(Input.GetKeyUp("d"))
		if(!Input.GetKey("w"))
			particleSystem.enableEmission = false;
		}
			}else{
		if(Input.GetKeyDown(KeyCode.Mouse0)){
			particleSystem.enableEmission = true;
		if(Poof)
        Instantiate(Poof, transform.position, transform.rotation);
        }
		if(Input.GetKeyUp(KeyCode.Mouse0))
			particleSystem.enableEmission = false;
			}

if(Reversable){
if(Input.GetKey("w"))
			particleSystem.enableEmission = true;
if(Input.GetKeyUp("a"))
if(!Input.GetKey("w"))
			particleSystem.enableEmission = false;
if(Input.GetKey("s"))
			particleSystem.enableEmission = true;
if(Input.GetKeyUp("s"))
if(!Input.GetKey("w"))
			particleSystem.enableEmission = false;
}

}

}
}