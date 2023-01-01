#pragma strict
public var dispenser : MineralDispenser;
var Container : MineralContainer;
var Vehicle : GameObject;
var Miner : GameObject;
var MinerRotor : GameObject;

var audioOn : GameObject;
var audioOff : GameObject;

static var switched : boolean = true;
var CanRun : boolean = true;

var MinerContainerCapacity = 800;
var maxVolume: float = 0.5;
private var incrementValue: float = 0.05;
private var decrementValue: float = 0.1;
private var state: String;

function Update () {

if(WorldInformation.playerCar.Contains(Vehicle.name))
  FullCargo();

if(WorldInformation.playerCar.Contains(Vehicle.name) && Input.GetKeyDown("4") && CanRun == true){
  Running();
  }
  
  if(Miner.activeSelf == true)
		state = "increment";
	if(Miner.activeSelf == false)
		state = "decrement";
	if(state == "increment"){
		increment();
	} else if(state == "decrement") {
		decrement();
  }

if(switched == false && Miner.activeSelf == true){
  var Locsound : GameObject = Instantiate(audioOff, transform.position, Quaternion.Euler(transform.eulerAngles.x, transform.eulerAngles.y, transform.eulerAngles.z));
  Locsound.transform.parent = transform;
  MinerRotor.GetComponent(ObjectSpin).enabled = false;
  Miner.gameObject.SetActive (false);
  decrement();
 switched = true;
}

if(switched == false && Miner.activeSelf == false){
  MinerRotor.GetComponent(ObjectSpin).enabled = false;
  Miner.gameObject.SetActive (false);
  decrement();
 switched = true;
}

}

function Running () {
  if (Miner.activeSelf){
  var Locsound : GameObject = Instantiate(audioOff, transform.position, Quaternion.Euler(transform.eulerAngles.x, transform.eulerAngles.y, transform.eulerAngles.z));
  Locsound.transform.parent = transform;
  MinerRotor.GetComponent(ObjectSpin).enabled = false;
  Miner.gameObject.SetActive (false);
 } else {
  var ILocsound : GameObject = Instantiate(audioOn, transform.position, Quaternion.Euler(transform.eulerAngles.x, transform.eulerAngles.y, transform.eulerAngles.z));
  ILocsound.transform.parent = transform;
  MinerRotor.GetComponent(ObjectSpin).enabled = true;
  Miner.gameObject.SetActive (true);
 }
}

function FullCargo () {
	if(dispenser.HasEnoughToDispense()){
	    IndicatorScript.CargoIsFull = true;
		CanRun = false;
		switched = false;
	} else {
		CanRun = true;
		IndicatorScript.CargoIsFull = false;
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