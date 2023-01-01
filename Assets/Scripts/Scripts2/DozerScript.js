#pragma strict
var maxVolume: float = 0.5;
private var incrementValue: float = 0.1;
private var decrementValue: float = 0.1;
private var state: String;

var DozerGameobject : GameObject;

var UseAI : boolean;
var IsOn : boolean;

function Update () {
if(!UseAI){
	if(DozerActivate.Dozervub == true)
		state = "increment";
	if(DozerActivate.Dozervub == false)
		state = "decrement";
	if(state == "increment"){
		increment();
	} else if(state == "decrement") {
		decrement();
	}
}else{
	if(IsOn){
		state = "increment";
		DozerGameobject.gameObject.SetActive (true);
		}
	if(!IsOn){
		state = "decrement";
		DozerGameobject.gameObject.SetActive (false);
		}
	if(state == "increment"){
		increment();
	} else if(state == "decrement") {
		decrement();
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