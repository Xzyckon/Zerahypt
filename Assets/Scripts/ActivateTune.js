#pragma strict
var maxVolume: float = 1;
var CanClick : boolean = true;
var IsOn : boolean;

function FixedUpdate () {
	if(WorldInformation.playerCar != transform.parent.name)
		return;
		
	if(Input.GetKeyDown("r") && !IsOn && CanClick){
	    audio.volume = 0;
		audio.Play();
		CanClick = false;
		IsOn = true;
		gameObject.name = "AkbarLeader";
		Clicky();
		}
	else if(Input.GetKeyDown("r") && IsOn && CanClick){
	    CanClick = false;
		IsOn = false;
		gameObject.name = "AkbarVessel";
		Clicky();
		}
		
		if(audio.volume > 0 && !IsOn)
		audio.volume -= 0.05;
		
		if(audio.volume < maxVolume && IsOn)
		audio.volume += 0.05;
}

function Clicky () {
yield WaitForSeconds (1);
CanClick = true;
}