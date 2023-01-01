#pragma strict

var WhizzSpeed : float = 100;
var audioClipSpeed = 20.0;
var MaxVolume : float = 0.2;
var MinPitch : float = 0.0;
var incrementValue: float = 0.05;
var decrementValue: float = 0.02;

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

var p = rigidbody.angularVelocity.magnitude / audioClipSpeed;
audio.pitch = Mathf.Clamp( p * 1 , MinPitch, 2.0);

lastspeed = rigidbody.angularVelocity.magnitude;

if(RunningF || RunningR)
			rigidbody.AddTorque(transform.up * WhizzSpeed);

	if(RunningF || RunningR)
		state = "increment";
		
	if(!RunningF && !RunningR)
		state = "decrement";
		
	if(state == "increment"){
		increment();
	} else if(state == "decrement") {
		decrement();
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
	if(audio.volume < MaxVolume)
		audio.volume += incrementValue;
	else
		state = "";
}