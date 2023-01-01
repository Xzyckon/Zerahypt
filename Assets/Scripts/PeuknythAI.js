var Aimer : GameObject;

var vTransform : Transform;

var vRigidbody : Rigidbody;

var maxVolume: float = 1;
var incrementValue: float = 0.05;
var decrementValue: float = 0.1;

var theSnoud : SoundObscure;

private var state: String;

var ForwardSpeed : float = 1;
var fuel : float = 0.0;

var Eating : boolean;
var Flying : boolean;

InvokeRepeating("Metabolize", 1, 0.2);

function Start () {
StuffSpawner.TheNPC003N += 1;
}

function FixedUpdate() {

if(vTransform == null){
Destroy (gameObject);
}else{
transform.rotation = vTransform.rotation;
transform.position = vTransform.position;
}
			
if(fuel > 5){
vRigidbody.AddForce(vTransform.forward * ForwardSpeed);
Aimer.rigidbody.freezeRotation = true;
Flying = true;
}else{
Flying = false;
}
}

function Metabolize () {
if (Eating)
fuel += 2;

if (Flying)
fuel -= 1;

if (fuel > 0)
fuel -= 0.4;


if (fuel > 100)
fuel = 100;

if (fuel < 1){
Aimer.GetComponent("PeuknythAimer").target = null;
Aimer.rigidbody.freezeRotation = false;
}

Eating = false;

VicinityCheck();
}

function VicinityCheck () {

var gos : GameObject[];
gos = GameObject.FindGameObjectsWithTag("TC");
 
for (var go : GameObject in gos) {

var ON = go.name;
var OT = go.transform;

if(ON.Contains ("vibra")){

if(ON.Contains ("ig")){
if(Vector3.Distance(vTransform.position, OT.position) < 40){
Eating = true;
Aimer.GetComponent("PeuknythAimer").target = OT;
}
}else{
if(ON.Contains ("uge")){
if(Vector3.Distance(vTransform.position, OT.position) < 200){
Eating = true;
Aimer.GetComponent("PeuknythAimer").target = OT;
}
}else{
if(Vector3.Distance(vTransform.position, OT.position) < 4){
Eating = true;
Aimer.GetComponent("PeuknythAimer").target = OT;
}
}
}
}

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

if(theSnoud.Obscured)
return;

	if(!audio.isPlaying)
		audio.Play();
	if(audio.volume < maxVolume)
		audio.volume += incrementValue;
	else
		state = "";
}

function Damage () {
StuffSpawner.TheNPC003N -= 1;
}