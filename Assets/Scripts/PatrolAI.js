#pragma strict

var target : Transform;

var alignTarget : Transform;

var Waypoint1 : Transform;
var Waypoint2 : Transform;

var Turning : boolean;
var Aligning : boolean;

var TurnTime : float = 10;
var AlignTime : float = 10;

var TrigDist : float = 10;

var AlignForce : float = 1;

var DirForce : float = 1;

var TurnForce : float = 1;

var AimForce : float = 10;
var AimForceOffset : float = 10;

InvokeRepeating("Regenerator", 1, 1.3);

function Start () {

}

function FixedUpdate () {

if(target){
         rigidbody.AddForceAtPosition((target.transform.position - transform.position).normalized * AimForce, -transform.up * AimForceOffset);
         rigidbody.AddForceAtPosition((target.transform.position - transform.position).normalized * -AimForce, transform.up * AimForceOffset);
         }
         
if(Turning)
rigidbody.AddTorque(-transform.forward * TurnForce);

if(Aligning)
rigidbody.AddForce((alignTarget.position - transform.position).normalized * AlignForce);
else
rigidbody.AddForce(-transform.up * DirForce);
}

function Align () {
yield WaitForSeconds (TurnTime);
Turning = false;
yield WaitForSeconds (AlignTime);
Aligning = false;
}

function Regenerator () {
if(Vector3.Distance(transform.position, target.position) < TrigDist){

if(target == Waypoint1){
target = Waypoint2;
alignTarget = Waypoint1;
}else if(target == Waypoint2){
target = Waypoint1;
alignTarget = Waypoint2;
}

Turning = true;
Aligning = true;
Align();
}
}