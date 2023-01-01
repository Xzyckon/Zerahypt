
var Disk : Transform;

function Start () {

}

function Update () {
if (Input.GetAxis("Mouse ScrollWheel") > 0f )
rigidbody.AddTorque(transform.up * 0.001);

if (Input.GetAxis("Mouse ScrollWheel") < 0f )
rigidbody.AddTorque(transform.up * -0.001);
}

function LateUpdate () {
transform.position = Disk.position;
}