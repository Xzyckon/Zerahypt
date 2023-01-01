
var Stopped : boolean;
var IsPlaying : boolean;

var Vessel : GameObject;

var WhizzSpeed : float = 100;
var audioClipSpeed = 20.0;

var curve : AnimationCurve = new AnimationCurve();
var VolumeAmount : float = 0;
var VolumeMod : float = 1.0;
var MinPitch : float = 0.0;

private var lastspeed : int = 1;
private var state: String;

var RunningF : boolean;
var RunningR : boolean;

function Update () {
if(WorldInformation.playerCar == transform.parent.name){
if(CameraScript.InInterface == false){
if(Input.GetKeyDown("w"))
			RunningF = true;
if(Input.GetKeyUp("w"))
			RunningF = false;
if(Input.GetKeyDown("s"))
			RunningR = true;
if(Input.GetKeyUp("s"))
			RunningR = false;
}
}
}

function FixedUpdate () {

if(rigidbody.angularVelocity.magnitude > 0.5) {

var p = rigidbody.angularVelocity.magnitude / audioClipSpeed;
audio.pitch = Mathf.Clamp( p * 1 , MinPitch, 3.0);
audio.volume = VolumeAmount;
VolumeAmount = curve.Evaluate(p) * VolumeMod;

lastspeed = rigidbody.angularVelocity.magnitude;

if(rigidbody.angularVelocity.magnitude < 0.6) {
audio.Stop();
Stopped = true;
IsPlaying = false;
} else if(rigidbody.angularVelocity.magnitude > 0.6 && Stopped == true) {
audio.Play();
Stopped = false;
IsPlaying = true;
}
}
	
		if(RunningF || RunningR)
			rigidbody.AddTorque(transform.up * WhizzSpeed);

}