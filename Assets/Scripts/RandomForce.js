var thisTransform : Transform;

var rBody : Rigidbody;

var forceX : float = 0;
var forceY : float = 0;
var forceZ : float = 0;

function Start () {
rBody = GetComponent.<Rigidbody>();
thisTransform = transform;
}

function FixedUpdate () {

if(forceX < 0.5){
forceX += Random.Range(-0.02, 0.02);
if(-forceX > 0.5)
forceX = 0;
}else{
forceX = 0;
}

if(forceY < 0.4){
forceY += Random.Range(-0.02, 0.02);
if(-forceY > 0.1)
forceY = 0;
}else{
forceY = 0;
}

if(forceZ < 0.5){
forceZ += Random.Range(-0.02, 0.02);
if(-forceZ > 0.5)
forceZ = 0;
}else{
forceZ = 0;
}


rBody.AddForce(Vector3(forceX, forceY, forceZ), ForceMode.VelocityChange);
}