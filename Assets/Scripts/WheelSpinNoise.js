var Vessel: GameObject;

var audioClipSpeed = 20.0;
var MaxVol : float = 1.0;
var MaxPitch : float = 1.0;
var MinPitch : float = 0.0;

function Start () {

}

function FixedUpdate () {
var p = Vessel.rigidbody.angularVelocity.magnitude / audioClipSpeed;
audio.pitch = Mathf.Clamp(p * 1 , MinPitch, MaxPitch);

if(Vessel.rigidbody.angularVelocity.magnitude < 1) {
audio.volume -= 0.02;
} else if(Vessel.rigidbody.angularVelocity.magnitude > 1) {
if(audio.volume < MaxVol)
audio.volume += 0.02;
}
}