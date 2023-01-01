var audioC : AudioClip;
var audioC2 : AudioClip;
var UseStartSound : boolean;
var UseFinishSound : boolean;
var Aircraft : boolean;
var Batubris : boolean;

var MainVessel: Transform;
var VesselScript : MainVehicleController;

var UseEngine : boolean;
var ShutOff : boolean;

var Reversable: boolean;

function Update () {

if(UseEngine){
if(VesselScript.EngineRunning == true)
ShutOff = false;
if(VesselScript.EngineRunning == false)
ShutOff = true;
}else{
if(VesselScript)
if(VesselScript.Civmode == true)
ShutOff = true;
else
ShutOff = false;
}

if(VesselScript){
if(VesselScript.Broken)
ShutOff = true;
}

if(!ShutOff){

	if(WorldInformation.playerCar == MainVessel.name){
	
	if(CameraScript.InInterface == false){
	if(Input.GetKeyDown(KeyCode.W) && UseStartSound && !Aircraft && !Batubris)
	audio.PlayOneShot(audioC);
	
	if(Input.GetKeyDown(KeyCode.Q) && !Aircraft && Batubris)
	audio.PlayOneShot(audioC);
	
	if(Input.GetKeyDown(KeyCode.Mouse0) && UseStartSound && Aircraft && !Batubris)
	audio.PlayOneShot(audioC);
	
	if(Input.GetKeyDown(KeyCode.Mouse1) && Aircraft && Reversable && !Batubris)
	audio.PlayOneShot(audioC);
	
	if(Input.GetKeyDown(KeyCode.S) && Reversable && !Aircraft && !Batubris)
	audio.PlayOneShot(audioC);
	
	if(Input.GetKeyUp(KeyCode.W) && UseFinishSound && !Aircraft && !Batubris)
	audio.PlayOneShot(audioC2);
	
	if(Input.GetKeyUp(KeyCode.Mouse0) && Aircraft && !Batubris)
	audio.PlayOneShot(audioC2);
}

}
}
}