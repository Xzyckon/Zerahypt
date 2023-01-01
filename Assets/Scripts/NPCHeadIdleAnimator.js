var target : Transform;
var Trigger : SphereCollider;
var LookTarget : Transform;
var EyeLookTarget : Transform;
var EyeResetTarget : Transform;
var ResetTarget : Transform;

var Looking : boolean;

var IsLooking : boolean;
static var CanTurnHead : boolean;
var DoOnce : boolean;

private var NewRotation : Quaternion;

var IgnoreSelf : String;

var RandAim1 : Transform;
var RandAim2 : Transform;
var RandAim3 : Transform;

var EyeRandAim1 : Transform;
var EyeRandAim2 : Transform;
var EyeRandAim3 : Transform;

var LookForce : float = 0.1;
var EyeLookForce : float = 0.1;

var REye : GameObject;
var LEye : GameObject;

InvokeRepeating("Notice", 3, 3);

InvokeRepeating("EyeNotice", 3, 0.5);

function FixedUpdate () {

if(LookTarget && Looking && !IsLooking){
    rigidbody.AddForceAtPosition((LookTarget.transform.position - transform.position).normalized * LookForce, -transform.forward * 1);
    rigidbody.AddForceAtPosition((LookTarget.transform.position - transform.position).normalized * -LookForce, transform.forward * 1);
}

if(WorldInformation.IsOotkinSick){
REye.rigidbody.AddTorque(transform.up * 0.00001);
REye.rigidbody.AddTorque(transform.right * -0.00001);
LEye.rigidbody.AddTorque(transform.up * -0.00001);
LEye.rigidbody.AddTorque(transform.right * -0.00001);
}

if(EyeLookTarget && Looking && !WorldInformation.IsOotkinSick){
    REye.rigidbody.AddForceAtPosition((EyeLookTarget.transform.position - REye.transform.position).normalized * EyeLookForce, -REye.transform.forward * 0.4);
    REye.rigidbody.AddForceAtPosition((EyeLookTarget.transform.position - REye.transform.position).normalized * -EyeLookForce, REye.transform.forward * 0.4);
    LEye.rigidbody.AddForceAtPosition((EyeLookTarget.transform.position - LEye.transform.position).normalized * EyeLookForce, -LEye.transform.forward * 0.4);
    LEye.rigidbody.AddForceAtPosition((EyeLookTarget.transform.position - LEye.transform.position).normalized * -EyeLookForce, LEye.transform.forward * 0.4);

}

if(CanTurnHead || !CameraScript.InInterface){

if (IsLooking) {
    rigidbody.AddForceAtPosition((target.transform.position - transform.position).normalized * LookForce, -transform.forward * 1);
    rigidbody.AddForceAtPosition((target.transform.position - transform.position).normalized * -LookForce, transform.forward * 1);
 }
}

}

function Notice () {
if(PlayerInformation.instance.Pirizuka.gameObject.activeSelf == true)
Notice2();
}

function Notice2 () {

Looking = false;

Trigger.center = Vector3(0,0,-70);
Trigger.radius = 70;

  var Interval: int = Random.Range(0, 2);
       
  switch (Interval) {
  case 1:
  Trigger.center = Vector3(0,0,0);
  Trigger.radius = 0.1;
  LookTarget = ResetTarget;
  break;
}

if(LookTarget == ResetTarget){
  var Interval2: int = Random.Range(0, 10);
       
  switch (Interval2) {
  case 1:
  LookTarget = RandAim1;
  break;
  case 2:
  LookTarget = RandAim2;
  break;
  case 3:
  LookTarget = RandAim3;
  break;
}
}

yield WaitForSeconds (0.1);
Looking = true;

}

function EyeNotice () {
if(LookTarget == ResetTarget){
  var Interval: int = Random.Range(0, 16);
       
  switch (Interval) {
  case 1:
  EyeLookTarget = EyeResetTarget;
  break;
  case 2:
  EyeLookTarget = EyeRandAim1;
  break;
  case 3:
  EyeLookTarget = EyeRandAim2;
  break;
  case 4:
  EyeLookTarget = EyeRandAim3;
  break;
}
}
}

function OnTriggerExit (other : Collider) {

if(other.gameObject.transform == LookTarget){
Trigger.center = Vector3(0,0,0);
Trigger.radius = 0.1;
LookTarget = ResetTarget;
EyeLookTarget = EyeResetTarget;
}
}

function OnTriggerStay (other : Collider) {

if(other.collider.name.Contains (IgnoreSelf))
return;

if(other.collider.name.Contains ("TC")){
LookTarget = other.gameObject.transform;
EyeLookTarget = other.gameObject.transform;
}
}