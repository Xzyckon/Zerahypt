var AxisDrag: Vector3;

var VesselScript : MainVehicleController;

var thisTransform : Transform;

var rBody : Rigidbody;

var UseEngine : boolean;

var useStrafeCompliment : boolean;

var unevenLift : boolean;

var Broken : boolean;

function Start () {
rBody = GetComponent.<Rigidbody>();
thisTransform = transform;

AxisDrag.x = AxisDrag.x * -0.017;
AxisDrag.y = AxisDrag.y * -0.017;
AxisDrag.z = AxisDrag.z * -0.017;
}

function FixedUpdate () {

if(UseEngine){
if(VesselScript.EngineRunning)
Broken = false;
else
Broken = true;
}

if(useStrafeCompliment)
if(Input.GetKey(KeyCode.Mouse1))
if(Input.GetKey("a") || Input.GetKey("d"))
return;

if(!Broken){
var localV = thisTransform.InverseTransformDirection(rBody.velocity);

var x: float = (localV.x * AxisDrag.x);
var y: float = (localV.y * AxisDrag.y);
var z: float = (localV.z * AxisDrag.z);

if(unevenLift){
rBody.AddTorque(thisTransform.right * Random.Range(-localV.x * rBody.mass, localV.x * rBody.mass));
rBody.AddTorque(thisTransform.up * Random.Range(-localV.y * rBody.mass, localV.y * rBody.mass));
rBody.AddTorque(thisTransform.forward * Random.Range(-localV.z * rBody.mass, localV.z * rBody.mass));
}

rBody.AddRelativeForce(x,y,z);
}
}

function OnJointBreak(breakForce : float) {
Broken = true;
}