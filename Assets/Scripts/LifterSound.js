#pragma strict
var maxVolume: float = 1;
var HoverMaxVolume: float = 1;
var incrementValue: float = 0.05;
var decrementValue: float = 0.1;
var Hover : boolean = false;
var state: String;

function FixedUpdate () {
    if(WorldInformation.playerCar != transform.parent.name)
		return;
	if(Input.GetKeyDown(KeyCode.PageUp))
		state = "increment";
	if(Input.GetKeyUp(KeyCode.PageUp))
		state = "decrement";
		
	if(Input.GetKeyDown(KeyCode.PageDown)){
	if(Hover == false){
		Hover = true;
		state = "Hovincrement";
		} else {
		Hover = false;
		state = "decrement";
	}
}
		
	if(state == "Hovincrement")
		Hovincrement();
		
	if(state == "increment"){
		increment();
	} else if(state == "decrement") {
	    decrement();
	}
}

function decrement () {

    if(Hover == true)
		audio.volume = HoverMaxVolume;
		
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

function Hovincrement () {
	if(!audio.isPlaying)
		audio.Play();
	if(audio.volume < HoverMaxVolume)
		audio.volume += incrementValue;
	else
		state = "";
}