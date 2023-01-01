var AxisDrag: Vector3;

var EngageDelay : float = 0.3;
var Activated : boolean;

function Start () {
yield WaitForSeconds (EngageDelay);
Activated = true;
}

function FixedUpdate () {
if(Activated == true){
var localV = transform.InverseTransformDirection(rigidbody.velocity);

var x: float = (localV.x * AxisDrag.x * -1) * Time.deltaTime;
var y: float = (localV.y * AxisDrag.y * -1) * Time.deltaTime;
var z: float = (localV.z * AxisDrag.z * -1) * Time.deltaTime;
rigidbody.AddRelativeForce(x,y,z);
}
}