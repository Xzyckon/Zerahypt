var Increased : boolean;

var Vessel: GameObject;

var audioClipSpeed = 60.0;
var MaxVol : float = 1;
var MaxPitch : float = 5;
var MinPitch : float = 0;

var curve : AnimationCurve = new AnimationCurve();
var VolumeAmount : float = 0;
var VolumeMod : float = 1.0;
 
function Update() {

if(WorldInformation.playerCar != transform.parent.name)
return;

if(Input.GetKey(KeyCode.W))
if(!Increased)
if(audio.volume < MaxVol){
audio.volume += 0.075;
VolumeAmount += 0.075;
}

if(!Input.GetKey(KeyCode.W)){
audio.volume -= 0.02;
if(audio.volume == 0)
Increased = false;
}

if(audio.volume > MaxVol)
Increased = true;

if(Vessel.rigidbody.velocity.magnitude > 0.3 && Increased && Input.GetKey(KeyCode.W)) {

    var p = Vessel.rigidbody.velocity.magnitude / audioClipSpeed;
    audio.pitch = Mathf.Clamp( p, MinPitch, MaxPitch); // p is clamped to sane values
    audio.volume = VolumeAmount;
    VolumeAmount = curve.Evaluate(p) * VolumeMod;
}
}