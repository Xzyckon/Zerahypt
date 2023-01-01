var Aimer : GameObject;
var Hoverer : GameObject;
var Thruster : GameObject;
var Nudger : GameObject;

var Blasteffect1 : GameObject;
var Blasteffect2 : GameObject;
var Blasteffect3 : GameObject;
var Blasteffect4 : GameObject;
var Blasteffect5 : GameObject;
var Blasteffect6 : GameObject;

var HowlSound : GameObject;
var HowlSoundFar : GameObject;
var AirSound : GameObject;
var BlasterSound : GameObject;

var Presence : GameObject;

var maxVolume: float = 1;
private var AirincrementValue: float = 0.005;
private var HowlfarincrementValue: float = 0.005;
private var incrementValue: float = 0.05;
private var AirdecrementValue: float = 0.008;
private var HowlfardecrementValue: float = 0.005;
private var decrementValue: float = 0.05;
var state: String;
var state2: String;

var ForwardSpeed : float = 1;
var fuel : float = 0.0;

var Eating : boolean;
var Flying : boolean;

InvokeRepeating("Metabolize", 1, 0.2);

function Start () {
StuffSpawner.TheNPC004N += 1;
}

function Metabolize () {
if (Eating)
fuel += 2;

if (Flying)
fuel -= 1;

if (fuel > 0)
fuel -= 0.4;


if (fuel > 200)
fuel = 200;

if (fuel < 1){
Presence.SetActive (false);
Aimer.GetComponent("PeuknythAimer").target = null;
Aimer.rigidbody.freezeRotation = false;
}
}

function OnTriggerEnter (other : Collider) {

if(other.name.Contains("svibra")){
  Eating = true;
  Aimer.GetComponent("PeuknythAimer").target = other.gameObject.transform;
  }
}

function OnTriggerExit (other : Collider) {

if(other.name.Contains("svibra")){
  Eating = false;
  }
}

function Update () {
	if(Flying == true)
		state = "increment";
	if(Flying == false)
		state = "decrement";
	if(state == "increment"){
		increment();
	} else if(state == "decrement") {
		decrement();
	}
	
	if(Eating == true)
		state2 = "increment2";
	if(Eating == false)
		state2 = "decrement2";
	if(state2 == "increment2"){
		increment2();
	} else if(state2 == "decrement2") {
		decrement2();
	}
}

function FixedUpdate () {
		if(fuel > 30){
			Hoverer.SetActive (true);
			Nudger.SetActive (true);
			Thruster.SetActive (true);
			Blasteffect1.particleSystem.enableEmission = true;
			Blasteffect2.particleSystem.enableEmission = true;
			Blasteffect3.particleSystem.enableEmission = true;
			Blasteffect4.particleSystem.enableEmission = true;
			Blasteffect5.particleSystem.enableEmission = true;
			Blasteffect6.particleSystem.enableEmission = true;
			Aimer.rigidbody.freezeRotation = true;
		    Flying = true;
		    } else {
            Flying = false;
            Hoverer.SetActive (false);
            Nudger.SetActive (false);
            Thruster.SetActive (false);
            Blasteffect1.particleSystem.enableEmission = false;
			Blasteffect2.particleSystem.enableEmission = false;
			Blasteffect3.particleSystem.enableEmission = false;
			Blasteffect4.particleSystem.enableEmission = false;
			Blasteffect5.particleSystem.enableEmission = false;
			Blasteffect6.particleSystem.enableEmission = false;
		}
}

function decrement () {
	if(HowlSoundFar.audio.volume > 0){
		HowlSound.audio.volume -= decrementValue;
		HowlSoundFar.audio.volume -= HowlfardecrementValue;
		BlasterSound.audio.volume -= decrementValue;
	} else {
		state = "";
	}
}

function increment () {
	if(HowlSoundFar.audio.volume < maxVolume) {
		HowlSound.audio.volume += incrementValue;
		HowlSoundFar.audio.volume += HowlfarincrementValue;
		BlasterSound.audio.volume += incrementValue;
	} else {
		state = "";
}
}

function decrement2 () {
	if(AirSound.audio.volume > 0){
		AirSound.audio.volume -= AirdecrementValue;
	} else {
		state2 = "";
	}
}

function increment2 () {
	if(AirSound.audio.volume < maxVolume) {
		AirSound.audio.volume += AirincrementValue;
	} else {
		state2 = "";
}
}

function Damage () {
StuffSpawner.TheNPC004N += 1;
}