#pragma strict
var ForwardSpeed : float = 100;
var ForwardBoostedSpeed : float = 100;
var ReverseSpeed : float = 100;

var TandemSLScript : SpeedLimiter;

var BoostCooldown = 0;
var BoostIndicator : GameObject;

var CanBoost : boolean;
var Boosting : boolean;

InvokeRepeating("CountDowner", 1, 1);

function Update () {
if(WorldInformation.playerCar == transform.parent.name){
if(Input.GetKey("w"))
if(Input.GetKeyUp(KeyCode.B)){
BoostIndicator.gameObject.SetActive (false);
CanBoost = false;
BoostCooldown = 0;
}

if(Input.GetKey(KeyCode.B))
if(Input.GetKeyUp("w")){
BoostIndicator.gameObject.SetActive (false);
CanBoost = false;
BoostCooldown = 0;
}
}
}

function FixedUpdate () {
	if(WorldInformation.playerCar == transform.parent.name){
	
		if(Input.GetKey("w"))
			rigidbody.AddForce(transform.forward * ForwardSpeed);
			
		if(Input.GetKey(KeyCode.B))
		if(Input.GetKey("w") && CanBoost){
			rigidbody.AddForce(transform.forward * ForwardBoostedSpeed);
			Boosting = true;
			}
	
		if(Input.GetKey("s"))
			rigidbody.AddForce(-transform.forward * ReverseSpeed);
	}
}

function CountDowner () {

if(!CanBoost && BoostCooldown < 8)
BoostCooldown += 1;

if(Boosting && BoostCooldown > 0){
BoostCooldown -= 2;
Boosting = false;
}

if(BoostCooldown < 1){
BoostIndicator.gameObject.SetActive (false);
CanBoost = false;
TandemSLScript.CanBoost = false;
}

if(BoostCooldown > 7 && !CanBoost){
BoostIndicator.gameObject.SetActive (true);
BoostIndicator.audio.Play();
CanBoost = true;
TandemSLScript.CanBoost = true;
}
}