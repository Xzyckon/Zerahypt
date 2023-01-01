
var VesselScript : MainVehicleController;

var HJoint : HingeJoint;

var rBody : Rigidbody;

var UseEngine : boolean;

var CCWSpeed : float = -100;
var CWSpeed : float = 100;
var UseForce : boolean;
var ForceModifier = 60.0;
var UseFeedbackForce : boolean;
var FeedbackModifier : float = 1;

var AngDrag : float = 0;

var PropFastSpinMesh: GameObject;
var PropSpinMesh: GameObject;
var PropIdleMesh: GameObject;
var UsePropMeshes : boolean;
var UseWS : boolean;
var UseToggle : boolean;

var RunningCW : boolean;
var RunningCCW : boolean;

var KeyLShift : boolean;
var KeyLCtrl : boolean;

var Boost : boolean;

var CanReset : boolean;

var AxisUp : boolean;
var AxisForward : boolean;

var Broken: boolean;

function Start () {
rBody = GetComponent.<Rigidbody>();
}

function Update () {

if(RunningCCW || RunningCW)
        if(AngDrag > 0)
		   rBody.angularDrag = AngDrag;

if(UseEngine){
if(!VesselScript.EngineRunning){
RunningCW = false;
RunningCCW = false;
Broken = true;
}else{
Broken = false;
}
}

if(VesselScript){
if(VesselScript.Broken)
Broken = true;
else
Broken = false;
}

if(!Broken){
        if(CanReset){
		if(!RunningCCW && !RunningCW)
		HJoint.useSpring = true;
	    if(RunningCCW || RunningCW)
	    HJoint.useSpring = false;
        }
}

if(WorldInformation.playerCar == transform.parent.name){
if(CameraScript.InInterface == false){
if(!UseToggle){
if(UseWS){
if(Input.GetKeyDown("w"))
			RunningCCW = true;
if(Input.GetKeyUp("w"))
			RunningCCW = false;
			
if(Input.GetKeyDown("s"))
			RunningCW = true;
if(Input.GetKeyUp("s"))
			RunningCW = false;
}else{
if(Input.GetKeyDown(KeyCode.Mouse0))
			RunningCCW = true;
if(Input.GetKeyUp(KeyCode.Mouse0))
			RunningCCW = false;
			
if(Input.GetKeyDown(KeyCode.Mouse1))
			RunningCW = true;
if(Input.GetKeyUp(KeyCode.Mouse1))
			RunningCW = false;
}
}else{

if(Input.GetKeyDown("q")){
        if(!RunningCCW)
			RunningCCW = true;
    else if(RunningCCW)
			RunningCCW = false;
			}
}

if (Input.GetKeyDown(KeyCode.LeftShift))
KeyLShift = true;
if (Input.GetKeyUp(KeyCode.LeftShift))
KeyLShift = false;

if (Input.GetKeyDown(KeyCode.LeftControl))
KeyLCtrl = true;
if (Input.GetKeyUp(KeyCode.LeftControl))
KeyLCtrl = false;

}
}
}

function FixedUpdate () {

if(!Broken){
        if(AxisUp){
		if(RunningCCW)
			rBody.AddTorque(transform.up * CCWSpeed);
	    if(RunningCW)
			rBody.AddTorque(transform.up * CWSpeed);
        }
        if(AxisForward){
		if(RunningCCW)
			rBody.AddTorque(transform.forward * CCWSpeed);
	    if(RunningCW)
			rBody.AddTorque(transform.forward * CWSpeed);
        }
}

if(UseForce){
if(AxisUp){
var p = (Vector3.Dot(transform.up, rBody.angularVelocity)) * ForceModifier;
rBody.AddForce(transform.up * p );
}

if(AxisForward){
var n = (Vector3.Dot(transform.forward, rBody.angularVelocity)) * ForceModifier;
rBody.AddForce(transform.forward * n );

if (KeyLShift && Boost)
rBody.AddForce(transform.forward * n * 0.5);

if (KeyLCtrl && Boost)
rBody.AddForce(transform.forward * n * -0.5);
}
}

if(UseFeedbackForce){
var localV = transform.InverseTransformDirection(rBody.velocity);
var Fp = localV.y * FeedbackModifier;
rBody.AddTorque(transform.up * Fp);
}

if(!UsePropMeshes) return;

if(rBody.angularVelocity.magnitude > 30){
    PropFastSpinMesh.gameObject.SetActive (true);
    PropIdleMesh.gameObject.SetActive (false);
    PropSpinMesh.gameObject.SetActive (false);
    return;
   }
if(rBody.angularVelocity.magnitude > 15){
    PropSpinMesh.gameObject.SetActive (true);
    PropFastSpinMesh.gameObject.SetActive (false);
    PropIdleMesh.gameObject.SetActive (false);
    return;
   }
if(rBody.angularVelocity.magnitude < 15){
    PropFastSpinMesh.gameObject.SetActive (false);
    PropSpinMesh.gameObject.SetActive (false);
    PropIdleMesh.gameObject.SetActive (true);
   }
}

function OnJointBreak(breakForce : float) {
transform.parent = null;
PropFastSpinMesh.gameObject.SetActive (false);
PropSpinMesh.gameObject.SetActive (false);
PropIdleMesh.gameObject.SetActive (true);
Destroy(this);
}