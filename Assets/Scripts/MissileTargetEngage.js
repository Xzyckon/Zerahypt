#pragma strict
var EngageDelay : float = 1;
public var targetPoint : Vector3;

private var NewRotation : Quaternion;
function LateUpdate () {
 NewRotation = Quaternion.LookRotation(targetPoint - transform.position);
 transform.rotation = Quaternion.RotateTowards(transform.rotation, NewRotation, Time.deltaTime * 400);
}

function Start () {
var bJoint : ConfigurableJoint = gameObject.GetComponent(ConfigurableJoint);
rigidbody.freezeRotation = true;
yield WaitForSeconds (EngageDelay);
bJoint.angularXDrive.mode = JointDriveMode.Position;
bJoint.angularYZDrive.mode = JointDriveMode.Position;
}