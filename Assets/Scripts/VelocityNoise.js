var Vessel: GameObject;
var audioClipSpeed = 60.0;
 
function Update() {
    var p = Vessel.rigidbody.velocity.magnitude / audioClipSpeed;
    audio.pitch = Mathf.Clamp( p, 0.0, 5.0);
}