var Stopped : boolean;
var IsPlaying : boolean;

var Vessel: GameObject;

var VesselScript : MainVehicleController;
var UseEngine : boolean;
var ShutOff : boolean;

var ObscureScript : SoundObscure;

var SkipVol : boolean;

var audioClipSpeed = 60.0;
var MaxPitch : float = 5;
var MinPitch : float = 0;

var curve : AnimationCurve = new AnimationCurve();
var VolumeAmount : float = 0;
var VolumeMod : float = 1.0;

function Start () {
yield WaitForSeconds (1);
audio.volume = 0;
audio.Stop();
Stopped = true;
IsPlaying = false;
}

 
function Update() {

if(UseEngine){
if(VesselScript.EngineRunning == true)
ShutOff = false;
if(VesselScript.EngineRunning == false){
ShutOff = true;
Stopped = true;
}
}

if(VesselScript){
if(VesselScript.Broken)
ShutOff = true;
}

if(ObscureScript)
SkipVol = ObscureScript.Obscured;

if(!ShutOff){
if(Vessel.rigidbody.velocity.magnitude > 0.3) {

    var p = Vessel.rigidbody.velocity.magnitude / audioClipSpeed;
    audio.pitch = Mathf.Clamp( p, MinPitch, MaxPitch); // p is clamped to sane values
    
    if(ObscureScript){
    if(!SkipVol){
    if(audio.volume < VolumeAmount)
    audio.volume += 0.05;
    else
    audio.volume -= 0.05;
    }else{
    audio.volume -= 0.05;
    }
    }else{
    audio.volume = VolumeAmount;
    }
    
    VolumeAmount = curve.Evaluate(p) * VolumeMod;
    
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

if(SkipVol)
if(audio.volume > 0)
   audio.volume -= 0.05;

}else{

if(audio.volume > 0){
   audio.volume -= 0.05;
}else{
   audio.Stop();
}
	
}
}