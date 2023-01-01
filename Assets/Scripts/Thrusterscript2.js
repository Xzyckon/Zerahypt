#pragma strict
var ForwardSpeed : float = 10;
var ReverseSpeed : float = 100;
var LeftSpeed : float = -30;
var RightSpeed : float = 30;
var TorqueForce : float = 40;
var UpSpeed : float = 0;
var DownSpeed : float = 0;
var MainVessel: Transform;
var VesselScript : MainVehicleController;
var UseEngine : boolean;
var ShutOff : boolean;

var useFCurve : boolean;
var forceCurve : AnimationCurve = new AnimationCurve();

var NoAimTorque : boolean;
var UseTorque : boolean;
var UseStrafeKeys : boolean;
var UseDownforce : boolean;
var BreakNoRev : boolean;
var curve : AnimationCurve = new AnimationCurve();
var Distance : float = 10;
var Downforce : float = 10;
var DownforceMultiplier : float = 1;
var targetLayers: LayerMask;

var RunningF : boolean;
var RunningR : boolean;

function Update () {
if(WorldInformation.playerCar == MainVessel.name){
if(CameraScript.InInterface == false){
if(Input.GetKeyDown("w"))
			RunningF = true;
if(Input.GetKeyUp("w"))
			RunningF = false;
			
if(Input.GetKeyDown("s"))
			RunningR = true;
if(Input.GetKeyUp("s"))
			RunningR = false;
}
}
}

function FixedUpdate () {

var localV = transform.InverseTransformDirection(rigidbody.velocity);

if(UseEngine){
if(VesselScript.EngineRunning == true)
ShutOff = false;
if(VesselScript.EngineRunning == false)
ShutOff = true;
}

if(!ShutOff){

if(useFCurve)
ForwardSpeed = forceCurve.Evaluate(localV.z);

		if(RunningF)
			rigidbody.AddForce(transform.forward * ForwardSpeed);
	
		if(RunningR && !BreakNoRev)
			rigidbody.AddForce(-transform.forward * ReverseSpeed);
		
		if(RunningR && BreakNoRev)
	    if(localV.z > 0)
			rigidbody.AddForce(-transform.forward * ReverseSpeed);
			
		if(WorldInformation.playerCar == MainVessel.name){
			
	    if(!NoAimTorque){
	    if(!UseStrafeKeys){
		if(Input.GetKey("a"))
			rigidbody.AddForce(-transform.right * LeftSpeed);
		if(Input.GetKey("d"))
			rigidbody.AddForce(transform.right * RightSpeed);
			}else{
			if(Input.GetKey("z"))
			rigidbody.AddForce(-transform.right * LeftSpeed);
		    if(Input.GetKey("x"))
			rigidbody.AddForce(transform.right * RightSpeed);
			}
			
		if(UseTorque){
		if(Input.GetKey("a"))
			rigidbody.AddTorque(-transform.up * TorqueForce);
		if(Input.GetKey("d"))
			rigidbody.AddTorque(transform.up * TorqueForce);
	    }
	    
	    }else{
	    
	    if(!Input.GetMouseButton(1)){
	    if(Input.GetKey("a"))
			rigidbody.AddTorque(-transform.up * TorqueForce);
		if(Input.GetKey("d"))
			rigidbody.AddTorque(transform.up * TorqueForce);
	    }else{
	    if(Input.GetKey("a"))
			rigidbody.AddForce(-transform.right * LeftSpeed);
		if(Input.GetKey("d"))
			rigidbody.AddForce(transform.right * RightSpeed);
	    }
	    
	    }
	    
		if (Input.GetKey(KeyCode.Space))
			rigidbody.AddForce(transform.up * UpSpeed);
			
		if (Input.GetKey(KeyCode.LeftShift))
			rigidbody.AddForce(-transform.up * DownSpeed);
			
	    }
		
	if(UseDownforce){
	var hit : RaycastHit;
	
	if (Physics.Raycast(transform.position, Vector3.down, hit, Distance, targetLayers))
	Downforce = curve.Evaluate(hit.distance);
	rigidbody.AddForce(Vector3.down * Downforce * DownforceMultiplier);
}
}
}