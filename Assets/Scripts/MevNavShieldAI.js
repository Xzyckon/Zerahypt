var target : Transform;
var Waypoint : Transform;
var Forward : Transform;
var AIAnchor : Transform;

var Spinner : Transform;

var NpcController : RemoveOverTime;

var Home : Transform;

var Trig : CapsuleCollider;
var Presence : GameObject;

var thisTransform : Transform;
var thisVTransform : Transform;

var vRigidbody : Rigidbody;

var SpotSound : GameObject;
var AttackSound : GameObject;
var RejectSound : GameObject;

var Activated : boolean;

var Engaging : boolean;

var Shot : boolean;

var Far : boolean;

var Obstacle : boolean;

var StrafeRight : boolean;
var StrafeLeft : boolean;

var SpinRot = 0;
var SpinF1 = 0;
var SpinF2 = 0;

var Vel = 0;

var AngVel : float = 0;

var VelClamp1 : float = 0;

var ClampCurve : AnimationCurve = new AnimationCurve();

var localV : Vector3;

var relativePoint : Vector3;

var targetLayers : LayerMask;

var RD : float = 0;

var GyroForce : float = 0.2;

var GyroOff : boolean;

InvokeRepeating("Regenerator", 0.27, 0.27);

function Start (){

GyroForce = 0.05;

yield WaitForSeconds (0.3);

Activated = true;

}

function Update () {

if(!Activated)
return;

if(Home)
if(target){

if(Engaging){
if(Home){
if(Vector3.Distance(thisTransform.position, target.position) * 8 < Vector3.Distance(thisTransform.position, Home.position))
Far = true;
else
Far = false;
}else{
Engaging = false;
}
}else{
if(Vector3.Distance(thisTransform.position, Home.position) > 50)
Far = true;
else
Far = false;
}

}

thisTransform.rotation = AIAnchor.transform.rotation;
thisTransform.position = AIAnchor.transform.position;

if(target == null){
StopAllCoroutines();
target = Waypoint;
Engaging = false;
Spot = 0;
}else{
if(target.name.Contains ("broken")){
StopAllCoroutines();
target = Waypoint;
Engaging = false;
}
}
	
}


function FixedUpdate () {

if(!Activated)
return;

Vel = vRigidbody.velocity.magnitude;

AngVel = vRigidbody.angularVelocity.magnitude;
 
var hit : RaycastHit;

localV = thisVTransform.InverseTransformDirection(vRigidbody.velocity);

var VelClamp0 = Mathf.Abs(localV.y);

var VelClamp2 = Mathf.Clamp(VelClamp0 * 0.5,4,16);

VelClamp1 = ClampCurve.Evaluate(VelClamp0);

if(Home){

relativePoint = thisVTransform.InverseTransformPoint(Home.position);

if(localV.z < 0)
RD = Mathf.Abs(localV.z);
else
RD = 0;

Spinner.Rotate(0,0,60);
SpinRot += 1;

if(SpinRot > 6){
SpinRot = 0;
SpinF1 = 0;
SpinF2 = 0;
Obstacle = false;
}

StrafeLeft = false;
StrafeRight = false;

if (Physics.Raycast (thisTransform.position, thisTransform.forward, hit, 16, targetLayers))
if(hit.collider.name.Contains ("C7"))
Far = true;

if (Physics.Raycast (thisTransform.position + thisTransform.right * 1.5, thisTransform.forward, hit, 16, targetLayers))
if(hit.collider.name.Contains ("C7")){
StrafeLeft = true;
Far = true;
}

if (Physics.Raycast (thisTransform.position + -thisTransform.right * 1.5, thisTransform.forward, hit, 16, targetLayers))
if(hit.collider.name.Contains ("C7")){
StrafeRight = true;
Far = true;
}

Debug.DrawRay (thisTransform.position + Spinner.forward * 0.5 + Spinner.up * 2, thisTransform.forward * VelClamp2, Color.red);
if (Physics.Raycast (thisTransform.position + Spinner.forward * 0.5 + Spinner.up * 2, thisTransform.forward, VelClamp2, targetLayers)){
		SpinF1 = -4;
		Obstacle = true;
}
Debug.DrawRay (thisTransform.position + -Spinner.forward * 0.5 + Spinner.up * 2, -thisTransform.forward * VelClamp2, Color.red);
if (Physics.Raycast (thisTransform.position + -Spinner.forward * 0.5 + Spinner.up * 2, -thisTransform.forward, VelClamp2, targetLayers)){
		SpinF2 = 4;
}

if(SpinF1 < 0)
vRigidbody.AddForce(Spinner.forward * SpinF1);
if(SpinF2 > 0)
vRigidbody.AddForce(Spinner.forward * SpinF2);

if(target){
if(Engaging){
if(Vel < 60){
    vRigidbody.AddForce((target.position - thisVTransform.position).normalized * 16);
    vRigidbody.AddForce((Home.position - thisVTransform.position).normalized * 16);
}
}
    vRigidbody.AddForceAtPosition((Home.position - thisVTransform.position).normalized * -0.5, thisTransform.forward * 2);
    vRigidbody.AddForceAtPosition((Home.position - thisVTransform.position).normalized * 0.5, -thisTransform.forward * 2);
}

vRigidbody.AddForceAtPosition(Vector3.up * GyroForce, thisTransform.up * 2);
vRigidbody.AddForceAtPosition(-Vector3.up * GyroForce, -thisTransform.up * 2);

if(!Physics.Raycast (thisTransform.position, Vector3.up, 2 + RD, targetLayers)){
if(Physics.Raycast (thisTransform.position, Vector3.down, 2 + RD, targetLayers)){
vRigidbody.AddForce(Vector3.up * 4);
}
}else{
vRigidbody.AddForce(Vector3.down * 4);
}

if(Vel < 60){

if(relativePoint.x < 0){
if(localV.x > 0)
vRigidbody.AddForce(thisVTransform.right * -localV.x * 0.5);
}else{
if(localV.x < 0)
vRigidbody.AddForce(thisVTransform.right * -localV.x * 0.5);
}

vRigidbody.AddForce(thisVTransform.forward * -localV.z * 0.5);

vRigidbody.AddForce(thisVTransform.up * -localV.y * VelClamp1);

if(!Obstacle){

if(StrafeRight && !StrafeLeft)
  vRigidbody.AddForce(thisVTransform.right * 2);
  
if(StrafeLeft && !StrafeRight)
  vRigidbody.AddForce(thisVTransform.right * -2);

if(Far)
  vRigidbody.AddForce(thisVTransform.up * 2);
else
  vRigidbody.AddForce(-thisVTransform.up * 2);
}
}
}
}

function OnTriggerEnter (other : Collider) {

if(!Activated)
return;

if(other.collider.name.Contains ("HC") && !other.collider.name.Contains ("HC7")){
  target = other.gameObject.transform;
  Engaging = true;
  var TheThing = Instantiate(SpotSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing.transform.parent = thisTransform;
}

if(other.tag == "Projectile" && !other.collider.name.Contains ("TFC7")){
Shot = true;
}
}

function OnTriggerStay (other : Collider) {

if(!Activated)
return;

if(other.collider.name.Contains ("HC") && !other.collider.name.Contains ("HC7")){
  target = other.gameObject.transform;
  Engaging = true;
  }

}

function Regenerator () {

if(!Activated)
return;

if(target)
if(!target.name.Contains ("HC"))
if(MevNavNetwork.instance.Threat1){
target = MevNavNetwork.instance.Threat1;
Engaging = true;
}

GyroForce = 0.1;

Trig.center = Vector3(0,0,150);
Trig.radius = 100;
Trig.height = 500;

}