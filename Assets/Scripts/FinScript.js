var AxisDrag: Vector3;

var Broken : boolean;

var Frictiondistance : float = 0.5;
var Friction : boolean;

var targetLayers: LayerMask;

function FixedUpdate () {
if(Broken == false){
var localV = transform.InverseTransformDirection(rigidbody.velocity);

var x: float = (localV.x * AxisDrag.x * -1) * Time.deltaTime;
var y: float = (localV.y * AxisDrag.y * -1) * Time.deltaTime;
var z: float = (localV.z * AxisDrag.z * -1) * Time.deltaTime;

if (Physics.Raycast(transform.position, -transform.up, Frictiondistance, targetLayers)){
rigidbody.AddRelativeForce(x,y,z);
Friction = true;
}else{
Friction = false;
}
}
}

function OnJointBreak(breakForce : float) {
Broken = true;
}