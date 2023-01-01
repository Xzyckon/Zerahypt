var WheelObjectIntact: GameObject;
var WheelObjectBroken: GameObject;

var target : Transform;

var Broken : boolean;

InvokeRepeating("Counter", 0, 0.8);

function Start () {
target = PlayerInformation.instance.Pirizuka;
}

function OnJointBreak(breakForce : float) {
Broken = true;
transform.parent = null;
WheelObjectBroken.gameObject.SetActive (true);
Destroy(WheelObjectIntact);
}

function Counter () {

if(Vector3.Distance(transform.position, target.position) > 2000 && Broken)
Destroy(gameObject);
}