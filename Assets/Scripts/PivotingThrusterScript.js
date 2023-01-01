#pragma strict
var ForwardForce : float = 30;
var TurnForce : float = 30;
var ReverseForce : float = 30;

var LeftPivotAngle : Vector3;
var RightPivotAngle : Vector3;
var ReversePivotAngle : Vector3;

function FixedUpdate () {
	if(WorldInformation.playerCar == transform.parent.name){
	
		if(Input.GetKey("a"))
			rigidbody.AddForce(transform.right * TurnForce);
			
		if(Input.GetKey("d"))
			rigidbody.AddForce(transform.right * TurnForce);
			
		if(Input.GetKey("s"))
			rigidbody.AddForce(transform.right * ReverseForce);
	
		if(Input.GetKey("w") && !Input.GetKey("a") && !Input.GetKey("d"))
			rigidbody.AddForce(transform.right * ForwardForce);
  }
}

function Update () {

if(WorldInformation.playerCar.Contains ("broken"))
Destroy(this);

	if(WorldInformation.playerCar == transform.parent.name){
	
        if(Input.GetKey("a"))
			GetComponent(ConfigurableJoint).targetRotation = Quaternion.Euler(LeftPivotAngle);
		if(Input.GetKeyUp("a")){
			GetComponent(ConfigurableJoint).targetRotation = Quaternion.Euler(0,0,0);
			ForceDelay();
			}
		if(Input.GetKey("d"))
			GetComponent(ConfigurableJoint).targetRotation = Quaternion.Euler(RightPivotAngle);
		if(Input.GetKeyUp("d")){
			GetComponent(ConfigurableJoint).targetRotation = Quaternion.Euler(0,0,0);
			ForceDelay();
			}
		if(Input.GetKey("s"))
			GetComponent(ConfigurableJoint).targetRotation = Quaternion.Euler(ReversePivotAngle);
		if(Input.GetKeyUp("s"))
			GetComponent(ConfigurableJoint).targetRotation = Quaternion.Euler(0,0,0);
    }
}

function ForceDelay () {
ForwardForce = -20;
yield WaitForSeconds (0.5);
ForwardForce = -70;
}