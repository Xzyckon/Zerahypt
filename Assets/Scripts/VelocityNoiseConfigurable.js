
var Vessel: GameObject;
var audioClipSpeed = 60.0;
var MaxPitch : float = 5;
var MinPitch : float = 0;
 
function Update() {
    var p = Vessel.rigidbody.velocity.magnitude / audioClipSpeed;
    audio.pitch = Mathf.Clamp( p, MinPitch, MaxPitch);
}