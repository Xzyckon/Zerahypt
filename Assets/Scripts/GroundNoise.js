#pragma strict

var Vessel: GameObject;
var Stopped : boolean;
var IsPlaying : boolean;
var UsePitch : boolean;
var Contact : boolean;
var ContactRange : float = 1;
var audioClipSpeed = 20.0;
var PitchMod = 60.0;
var MaxVolume : float = 0.2;
var MaxPitch : float = 1;
var Vol : float = 0;
private var incrementValue: float = 0.05;
private var decrementValue: float = 0.05;
private var state: String;

function Start () {
yield WaitForSeconds (0.1);
audio.volume = 0;
}

function Update () {


var v = Vessel.rigidbody.velocity.magnitude / audioClipSpeed;
var p = Vessel.rigidbody.velocity.magnitude / PitchMod;

		if (Physics.Raycast (transform.position, transform.up, ContactRange)) {
		Contact = true;
		} else {
		Contact = false;
		}
		
if(UsePitch)
audio.pitch = Mathf.Clamp( p, 0.0, MaxPitch);

if(Contact == true)
Vol = Mathf.Clamp( v, 0, MaxVolume);


	if(Contact == true)
		state = "increment";
		
	if(Contact == false)
		state = "decrement";
		
	if(state == "increment"){
		increment();
} else if(state == "decrement") {
		decrement();
}

if(Vessel.rigidbody.velocity.magnitude < 0.5) {
audio.Stop();
Stopped = true;
IsPlaying = false;
} else if(Vessel.rigidbody.velocity.magnitude > 0.5 && Stopped == true) {
audio.Play();
Stopped = false;
IsPlaying = true;
}

}

function decrement () {

	if(audio.volume > 0){
		audio.volume -= decrementValue;
	} else {
		audio.volume = 0;
		state = "";
	}
}

function increment () {

	if(audio.volume < Vol){
		audio.volume += incrementValue;
	} else {
	    audio.volume = Vol;
		state = "";
}
}