
var Stopped : boolean;
var IsPlaying : boolean;

var Vessel : GameObject;

var VesselScript : MainVehicleController;

var UseVolCurve : boolean;
var UsePitchCurve : boolean;
var UseEngine : boolean;
var EngineOn : boolean;

var Modifier = 60.0;
var PitchCurve : AnimationCurve = new AnimationCurve();
var PitchAmount : float = 0;
var PitchMod : float = 1.0;

var curve : AnimationCurve = new AnimationCurve();
var VolumeAmount : float = 0;
var VolumeMod : float = 1.0;

var UseBoost : boolean;
var maxVolume: float = 0.5;
var incrementValue: float = 0.05;
var decrementValue: float = 0.05;

private var state: String;

function Start () {
yield WaitForSeconds (1);
if(UseVolCurve){
audio.volume = 0;
audio.Stop();
Stopped = true;
IsPlaying = false;
}
}

function Update() {

if(UseBoost){
if(VesselScript.Boosting == true)
		state = "increment";
		else
		state = "decrement";
}
}

function FixedUpdate() {

if(!Vessel)
return;

if(audio == null){
Destroy(this);
}else{


var p = Vessel.rigidbody.velocity.magnitude / Modifier;

if(UseBoost){
       if(state == "increment"){
		  increment();
} else if(state == "decrement") {
		  decrement();
}
}

if(!UseEngine){
if(Vessel.rigidbody.velocity.magnitude > 0.3) {
    
    if(UsePitchCurve){
    audio.pitch = PitchAmount;
    PitchAmount = PitchCurve.Evaluate(p) * PitchMod;
    }
    
    if(UseVolCurve){
    audio.volume = VolumeAmount;
    VolumeAmount = curve.Evaluate(p) * VolumeMod;
    }

if(UseVolCurve){
if(Vessel.rigidbody.velocity.magnitude < 0.3) {
audio.Stop();
Stopped = true;
IsPlaying = false;
} else if(Vessel.rigidbody.velocity.magnitude > 0.3 && Stopped == true) {
audio.Play();
Stopped = false;
IsPlaying = true;
}
}
}
}

if(UseEngine){

if(VesselScript.EngineRunning == true)
EngineOn = true;
if(VesselScript.EngineRunning == false)
EngineOn = false;

if(Vessel.rigidbody.velocity.magnitude > 0.3 && EngineOn) {
    
    if(UsePitchCurve){
    audio.pitch = PitchAmount;
    PitchAmount = PitchCurve.Evaluate(p) * PitchMod;
    }
    
    if(UseVolCurve){
    audio.volume = VolumeAmount;
    VolumeAmount = curve.Evaluate(p) * VolumeMod;
    }

if(UseVolCurve){
if(Vessel.rigidbody.velocity.magnitude < 0.3) {
audio.Stop();
Stopped = true;
IsPlaying = false;
} else if(Vessel.rigidbody.velocity.magnitude > 0.3 && Stopped == true) {
audio.Play();
Stopped = false;
IsPlaying = true;
}
}
}
if(!EngineOn) {

    audio.volume -= 0.05;

}
}
}
}

function decrement () {
	if(audio.volume > 0){
		audio.volume -= decrementValue;
	} else {
		audio.Stop();
		state = "";
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