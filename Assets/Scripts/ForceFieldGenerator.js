
var ForceField : GameObject;
var ForceCol : SphereCollider;
var IsRunning : boolean;

var maxVolume: float = 0.3;
var entered : boolean = false;
private var state: String;

function Start () {
ForceCol.radius = 0.001;
ForceCol.center = Vector3(0,0,-0.5);
ForceField.GetComponent("PlanetaryGravityWellFixed").enabled = false;
}

function OnTriggerEnter (other : Collider) {
if(other.name.Contains("FPCnose")){
	entered = true;
}
}

function OnTriggerExit (other : Collider) {
if(other.name.Contains("FPCnose")){
	entered = false;
}
}

function Update () {
if(Input.GetKeyDown(KeyCode.E)){
   if(entered == true && IsRunning == false){
   IsRunning = true;
   ForceCol.radius = 0.5;
ForceCol.center = Vector3(0,0,0);
ForceField.GetComponent("PlanetaryGravityWellFixed").enabled = true;
   

   }else if(entered == true && IsRunning == true){
   IsRunning = false;
   ForceCol.radius = 0.001;
ForceCol.center = Vector3(0,0,-0.5);
ForceField.GetComponent("PlanetaryGravityWellFixed").enabled = false;
   
}
}

if(IsRunning == true)
		state = "increment";
	if(IsRunning == false)
		state = "decrement";
	if(state == "increment"){
		increment();
	} else if(state == "decrement") {
		decrement();
	}
}

function decrement () {
	if(audio.volume > 0){
		audio.volume -= 0.05;
	} else {
		audio.Stop();
		state = "";
	}
}

function increment () {
	if(!audio.isPlaying)
		audio.Play();
	if(audio.volume < maxVolume)
		audio.volume += 0.05;
	else
		state = "";
}