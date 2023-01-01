var target : Transform;
var Waypoint : Transform;
var ResetPoint : Transform;

var Magnet1 : Transform;

var EmptyContainer : Transform;
var FullContainer : Transform;

var Vessel: GameObject;
var Presence : GameObject;

var Gyro : GameObject;

var StartupAudio : AudioSource;
var SpeedingAudio : AudioSource;
var PassbyAudio : AudioSource;

var HasEmpty : boolean;
var HasFull : boolean;
var SlowingDown : boolean;
var Obstacle : boolean;
var Brake : boolean;
var StartFast : boolean;
var TargetTooClose : boolean;

var TurnRight : boolean;
var TurnLeft : boolean;

var Still = 0;

var PointY : float = 0;
var PointZ : float = 0;

var targetLayers : LayerMask;

private var NewRotation : Quaternion;

InvokeRepeating("Reader", 1, 0.5);

function Start (){

  PointY = ResetPoint.transform.position.y;
  PointZ = ResetPoint.transform.position.z;

Brake = true;
yield WaitForSeconds (5);
Brake = false;
gameObject.GetComponent(SphereCollider).radius = 2000;
yield WaitForSeconds (5);
Still = 0;
if(StartFast)
StartFast = false;
}

function Update () {

if(target != null){
ResetPoint.transform.position.y = PointY;
ResetPoint.transform.position.z = PointZ;
}

if(target == null)
target = ResetPoint;
	
var newRot : Vector3 = (transform.forward * 0.6f ).normalized;
var hit : RaycastHit;

Debug.DrawRay (transform.position + transform.forward * 100, newRot * 1000f, Color.green);

if (Physics.Raycast (transform.position + transform.forward * 100, newRot, hit, 1000) && Vessel.rigidbody.velocity.magnitude > 50) {
     SlowingDown = true;
 } else {
     SlowingDown = false;
 }

newRot = (transform.forward * 0.6f + transform.right * 0.4f).normalized;

Debug.DrawRay (transform.position + transform.forward * 100, newRot * 500f, Color.black);
if (Physics.Raycast (transform.position + transform.forward * 100, newRot, 500)) {
     TurnLeft = true;
 } else {
     TurnLeft = false;
 }
 
newRot = (transform.forward * 0.6f + transform.right * -0.4f).normalized;

Debug.DrawRay (transform.position + transform.forward * 100, newRot * 500f, Color.black);
if (Physics.Raycast (transform.position + transform.forward * 100, newRot, 500)) {
		TurnRight = true;
	} else {
        TurnRight = false;
 }
 
Debug.DrawRay (transform.position + transform.forward * 100, transform.forward * 80f, Color.white);
if (Physics.Raycast (transform.position + transform.forward * 100, transform.forward, 80)) {
		Obstacle = true;
	} else {
	    Obstacle = false;
}

}

function FixedUpdate () {

var localV = transform.InverseTransformDirection(rigidbody.velocity);

if (Brake)
if (PassbyAudio.volume > 0)
PassbyAudio.volume -= 0.005;


if (Vessel.rigidbody.velocity.magnitude < 100)
if (SpeedingAudio.volume > 0)
SpeedingAudio.volume -= 0.01;

if (Vessel.rigidbody.velocity.magnitude > 100)
if (SpeedingAudio.volume < 1)
SpeedingAudio.volume += 0.001;

if(target){
NewRotation = Quaternion.LookRotation(target.position - transform.position);
transform.rotation = Quaternion.RotateTowards(transform.rotation, NewRotation, Time.deltaTime * 20);
}

if(SlowingDown && !Brake){
  if(localV.z > 50)
  Vessel.rigidbody.AddForce(-Vessel.transform.up * -700000);
}

if(Obstacle && !Brake){
if(localV.z > 0)
  Vessel.rigidbody.AddForce(-Vessel.transform.up * -700000);
}

if(Brake){
if(localV.z > 50){
Vessel.rigidbody.drag = 2.5;
  Vessel.rigidbody.AddForce(-Vessel.transform.up * -1800000);
}
}
  
if(!Obstacle && !SlowingDown && !TurnLeft && !TurnRight && !Brake) {
if(Vessel.rigidbody.angularVelocity.magnitude < 0.05)
  Vessel.rigidbody.AddForce(-Vessel.transform.up * 700000);
  Vessel.rigidbody.drag = 0.08;
  
if(StartFast)
Vessel.rigidbody.AddForce(-Vessel.transform.up * 2300000);
}

if(TurnLeft){
  Vessel.rigidbody.AddTorque(transform.forward * -350000);
}

if(TurnRight){
  Vessel.rigidbody.AddTorque(transform.forward * 350000);
}

}

function OnTriggerStay (other : Collider) {

}

function Reader () {
var hit : RaycastHit;

if (Vessel.rigidbody.velocity.magnitude < 1) {
     Still += 1;
     
if(Still == 40){
    StartupAudio.Play();
    Still = 0;
    Brake = false;
    Vessel.rigidbody.drag = 0.08;
    }
 }

rigidbody.freezeRotation = true;

Debug.DrawRay (transform.position, transform.forward * 30f, Color.red);
if (Physics.Raycast (transform.position, transform.forward, hit, 30, targetLayers)){
}
}