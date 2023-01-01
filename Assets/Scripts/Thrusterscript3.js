#pragma strict
var ForwardSpeed : float = 100;
var ReverseSpeed : float = -100;

var RunningF : boolean;
var RunningR : boolean;

function Update () {
if(WorldInformation.playerCar == transform.parent.name){
if(CameraScript.InInterface == false){
if(Input.GetKeyDown(KeyCode.Mouse0))
			RunningF = true;
if(Input.GetKeyUp(KeyCode.Mouse0))
			RunningF = false;
			
if(Input.GetKeyDown(KeyCode.Mouse1))
			RunningR = true;
if(Input.GetKeyUp(KeyCode.Mouse1))
			RunningR = false;
}
}
}

function FixedUpdate () {

		if(RunningF)
			rigidbody.AddForce(transform.up * ForwardSpeed);
	
		if(RunningR)
			rigidbody.AddForce(transform.up * ReverseSpeed);
}