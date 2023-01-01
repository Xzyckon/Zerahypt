var PushVelocity = 0.0;
var PushForward: boolean = true;
var PushUp: boolean = false;

var unevenTraj: boolean;
var unevenness: float = 0;

var EnableCol: boolean;
var Col : SphereCollider;

var KillOverTime: boolean;
var KOTNum: float = 0.5;

function Start () {

if(unevenTraj){
transform.Rotate(Vector3.right * Random.Range (-unevenness, unevenness));
transform.Rotate(Vector3.up * Random.Range (-unevenness, unevenness));
}

if(PushForward){
rigidbody.velocity = transform.forward * PushVelocity * 0.45;
}

if(PushUp){
rigidbody.velocity = transform.up * PushVelocity * 0.45;
}

if(PushVelocity > 1400)
if(DutvutanianNetwork.instance.AlertTime > 10){
if(Vector3.Distance(DutvutanianNetwork.instance.PriorityWaypoint.position, transform.position) < 1500)
DutvutanianNetwork.instance.PriorityWaypoint.position = transform.position;
}

if(EnableCol){
yield WaitForSeconds(0.1);
Col.enabled = true;
}

if(KillOverTime){
yield WaitForSeconds(KOTNum);
    Destroy(gameObject);
}
}