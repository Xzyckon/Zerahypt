
var target : Transform;
var Waypoint1 : Transform;
var Waypoint2 : Transform;
var Vessel : Transform;
var VesselModel : Transform;
var ParentArea : Transform;
var LandArea : Transform;
var Arm11 : GameObject;
var Arm12 : GameObject;
var Arm21 : GameObject;
var Arm22 : GameObject;
var Arm31 : GameObject;
var Arm32 : GameObject;
var Gyro : GameObject;

var AudioDistant : GameObject;
var AudioAppear : GameObject;
var AudioAway : GameObject;

var DropPos : Vector3;

var CanPlayDistant : boolean = false;
var CanPlayAppear : boolean = false;
var CanPlayAway : boolean = false;

var CanManeuver : boolean;
var HasVessel : boolean;
var GoingDownToFetch : boolean;
var GoingDownToDrop : boolean;
var GoingUpFromFetch : boolean;
var GoingUpFromDrop : boolean;
var ReachedWaypoint : boolean;

var StabForce = 10.0;
var ThrustForce = 10.0;
var ThrustForce2 = 10.0;
var Multiplier : float = 1;

var curveDown : AnimationCurve = new AnimationCurve();
var curveUp : AnimationCurve = new AnimationCurve();

var targetLayers : LayerMask;

function Start () {
target = GameObject.Find("CeptobargeTopWaypoint").transform;
Waypoint1 = GameObject.Find("CeptobargeTopWaypoint").transform;
LandArea = GameObject.Find("CeptobargeWaypoint").transform;
Grasp();
}

function FixedUpdate () {

var fwd = transform.TransformDirection (Vector3.back);
var hit : RaycastHit;

if(ThrustForce > 390 && CanPlayDistant){
CanPlayDistant = false;
CanPlayAppear = true;
AudioDistant.audio.Play();
}

if(ThrustForce2 > 390 && CanPlayAway){
CanPlayAway = false;
AudioAway.audio.Play();
}

if(ThrustForce < 100 && CanPlayAppear){
CanPlayAppear = false;
AudioAppear.audio.Play();
}

if(GoingDownToFetch && !ReachedWaypoint){
rigidbody.AddForce(transform.forward * -ThrustForce * Multiplier, ForceMode.Impulse);
rigidbody.angularDrag = 3;
rigidbody.drag = 6;
StabForce = 800;
target = Waypoint2;
}

if(GoingDownToDrop && !ReachedWaypoint){
rigidbody.AddForce(transform.forward * -ThrustForce * Multiplier, ForceMode.Impulse);
rigidbody.angularDrag = 3;
rigidbody.drag = 6;
StabForce = 800;
target = Waypoint1;
}

ThrustForce = curveDown.Evaluate((transform.position - target.position).magnitude);

if(GoingUpFromDrop)
ThrustForce2 = curveUp.Evaluate((transform.position - DropPos).magnitude);

if(GoingUpFromFetch)
ThrustForce2 = curveUp.Evaluate((transform.position - DropPos).magnitude);

if (Physics.Raycast (transform.position, fwd, hit, 1000, targetLayers))
CanManeuver = false;
else
CanManeuver = true;

//------------------------------------------------------------------------------------------

if(GoingDownToFetch && !ReachedWaypoint){
if(Vector3.Distance(ParentArea.transform.position, Waypoint2.transform.position) < 50){
ReachedWaypoint = true;
CanPlayDistant = true;
target = Vessel;
}
}

if(GoingDownToFetch && ReachedWaypoint){
rigidbody.AddForce(transform.forward * -ThrustForce * Multiplier, ForceMode.Impulse);
rigidbody.drag = 4;
StabForce = 600;

if(Vector3.Distance(ParentArea.transform.position, target.transform.position) < 10)
Grasp();

if(Vector3.Distance(ParentArea.transform.position, target.transform.position) < 2){
GoingDownToFetch = false;
Parent();
GoingUpFromFetch = true;
}
}


//------------------------------------------------------------------------------------------

if(GoingDownToDrop && !ReachedWaypoint){
if(Vector3.Distance(ParentArea.transform.position, Waypoint1.transform.position) < 50){
ReachedWaypoint = true;
CanPlayDistant = true;
target = LandArea;
}
}

if(GoingDownToDrop && ReachedWaypoint){
rigidbody.AddForce(transform.forward * -ThrustForce * Multiplier, ForceMode.Impulse);
rigidbody.drag = 4;
StabForce = 600;

if(Vector3.Distance(ParentArea.transform.position, target.transform.position) < 2){
GoingDownToDrop = false;
Unparent();
Release();
GoingUpFromDrop = true;
}
}

//------------------------------------------------------------------------------------------

if(!GoingUpFromFetch || !GoingUpFromDrop)
Gyro.GetComponent("StrongGyroStabilizer").force = 1;

if(GoingUpFromFetch){
Gyro.GetComponent("StrongGyroStabilizer").force = 1000;
rigidbody.AddForce(transform.forward * ThrustForce2 * Multiplier, ForceMode.Impulse);
}

if(GoingUpFromDrop){
Gyro.GetComponent("StrongGyroStabilizer").force = 1000;
rigidbody.AddForce(transform.forward * ThrustForce2 * Multiplier, ForceMode.Impulse);
}

if(target != null){
rigidbody.AddForceAtPosition((target.transform.position - transform.position).normalized * StabForce, -transform.forward*5);
rigidbody.AddForceAtPosition((target.transform.position - transform.position).normalized * -StabForce, transform.forward*5);
}
}

function Grasp () {
Arm11.hingeJoint.spring.targetPosition = 60;
Arm12.hingeJoint.spring.targetPosition = -110;
Arm21.hingeJoint.spring.targetPosition = 60;
Arm22.hingeJoint.spring.targetPosition = -110;
Arm31.hingeJoint.spring.targetPosition = 60;
Arm32.hingeJoint.spring.targetPosition = -110;
}

function Release () {
Arm11.hingeJoint.spring.targetPosition = 0;
Arm12.hingeJoint.spring.targetPosition = 0;
Arm21.hingeJoint.spring.targetPosition = 0;
Arm22.hingeJoint.spring.targetPosition = 0;
Arm31.hingeJoint.spring.targetPosition = 0;
Arm32.hingeJoint.spring.targetPosition = 0;
}

function DoStuff () {
if(HasVessel && CanManeuver){
ReachedWaypoint = false;
GoingDownToDrop = true;
GoingUpFromFetch = false;
GoingUpFromDrop = false;
}
if(!HasVessel && CanManeuver){
ReachedWaypoint = false;
GoingDownToFetch = true;
GoingUpFromFetch = false;
GoingUpFromDrop = false;
}
}

function Parent () {
Vessel.gameObject.SetActive (false);
VesselModel.gameObject.SetActive (true);
Vessel.transform.parent = ParentArea;
HasVessel = true;
CanPlayAway = true;
rigidbody.angularDrag = 10;
DropPos = transform.position;
}

function Unparent () {
VesselModel.gameObject.SetActive (false);
Vessel.gameObject.SetActive (true);
Vessel.transform.parent = null;
HasVessel = false;
CanPlayAway = true;
rigidbody.angularDrag = 10;
DropPos = transform.position;
}