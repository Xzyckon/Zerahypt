var maxVolume: float = 1;
var incrementValue: float = 0.1;
var decrementValue: float = 0.05;

var MainVessel: Transform;
var VesselScript : MainVehicleController;

var UseEngine : boolean;
var IsOn : boolean;

var MBControl : boolean;

var OnlyReverse : boolean;
var OnlyForward : boolean;

var IncludeSideMovement : boolean;

var RunningF : boolean;
var RunningR : boolean;

var RunningA : boolean;
var RunningD : boolean;

private var state: String;

InvokeRepeating("StopAudio", 1, 0.3);

function Start () {
if(!UseEngine)
IsOn = true;
}

function Update () {
if(WorldInformation.playerCar == MainVessel.name){
if(MBControl){
if(CameraScript.InInterface == false && IsOn){
if(Input.GetKeyDown(KeyCode.Mouse0) && !OnlyReverse)
			RunningF = true;
if(Input.GetKeyUp(KeyCode.Mouse0) && !OnlyReverse)
			RunningF = false;
if(Input.GetKeyDown(KeyCode.Mouse1) && !OnlyForward)
			RunningR = true;
if(Input.GetKeyUp(KeyCode.Mouse1) && !OnlyForward)
			RunningR = false;
}
}else{
if(CameraScript.InInterface == false && IsOn){
if(Input.GetKeyDown("w") && !OnlyReverse)
			RunningF = true;
if(Input.GetKeyUp("w") && !OnlyReverse)
			RunningF = false;
if(Input.GetKeyDown("s") && !OnlyForward)
			RunningR = true;
if(Input.GetKeyUp("s") && !OnlyForward)
			RunningR = false;
			
if(Input.GetKeyDown("a") && IncludeSideMovement)
			RunningA = true;
if(Input.GetKeyUp("a") && IncludeSideMovement)
			RunningA = false;
if(Input.GetKeyDown("d") && IncludeSideMovement)
			RunningD = true;
if(Input.GetKeyUp("d") && IncludeSideMovement)
			RunningD = false;
			
if(VesselScript)
if(VesselScript.Civmode == true)
RunningF = false;

}
}
}

if(UseEngine){
if(VesselScript.EngineRunning == false)
if(IsOn){
RunningW = false;
RunningF = false;
IsOn = false;
}
if(VesselScript.EngineRunning == true)
IsOn = true;
}

if(VesselScript){
if(VesselScript.Broken)
IsOn = false;
}

}

function FixedUpdate () {
		
	if(RunningF || RunningR || RunningA || RunningD)
		state = "increment";
		
	if(!RunningF && !RunningR && !RunningA && !RunningD)
		state = "decrement";
	
	if(state == "increment"){
		increment();
	} else if(state == "decrement") {
		decrement();
		stopcrement();
	}
}

function decrement () {
	if(audio.volume > 0.11){
		audio.volume -= decrementValue;
	}
}

function stopcrement () {
	if(audio.volume < 0.12){
		audio.volume -= 0.01;
	}
}

function increment () {
	if(!audio.isPlaying)
		audio.Play();
	if(audio.volume < maxVolume)
		audio.volume += incrementValue;
	else
		state = "";
}

function StopAudio () {
	if(audio.volume == 0){
		audio.Stop();
		state = "";
	}
}