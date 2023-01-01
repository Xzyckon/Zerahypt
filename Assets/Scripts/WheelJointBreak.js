var WheelObjectIntact: GameObject;
var WheelObjectBroken: GameObject;

function OnJointBreak(breakForce : float) {
transform.parent = null;
WheelObjectBroken.gameObject.SetActive (true);
Destroy(WheelObjectIntact);
}