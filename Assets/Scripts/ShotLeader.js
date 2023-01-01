var target : Transform;
var TargetTrace : Transform;
var TargetLead : Transform;

var Shot : GameObject;

InvokeRepeating("LeaveMarker", 1, 0.1);

InvokeRepeating("Shoot", 10, 1);

function Update () {
transform.LookAt(TargetLead);
}

function Shoot () {
Instantiate(Shot, transform.position, transform.rotation);
}

function LeaveMarker () {
Marker();
}

function Marker (){
TargetTrace.position = target.position;
yield WaitForSeconds (0.08);

var Dist1 = Vector3.Distance(transform.position, target.position);
var Dist2 = Vector3.Distance(TargetTrace.position, target.position);

TargetTrace.LookAt(target);

TargetLead.position = TargetTrace.position;
TargetLead.rotation = TargetTrace.rotation;
TargetLead.position += TargetLead.forward * Dist1 * Dist2 * 0.02;
}