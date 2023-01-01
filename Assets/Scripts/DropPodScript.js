var target : Transform;
var Waypoint : Transform;
var Forward : Transform;
var AIAnchor : Transform;

var thisTransform : Transform;
var thisVTransform : Transform;

var vRigidbody : Rigidbody;

var TurnRight : boolean;
var TurnLeft : boolean;

var ThrusterFX1 : ParticleSystem;
var ThrusterFX2 : ParticleSystem;

var BreakFX1 : ParticleSystem;
var BreakFX2 : ParticleSystem;

var Braking : boolean;
var Done : boolean;

var Fjoint : FixedJoint;

var CoverRB : Rigidbody;

var CoverTF : Transform;

var CoverCol : MeshCollider;

var CoverForceD : float = 200;

var CoverSound : AudioSource;

var BreakSound : AudioSource;

var ThrusterSound : AudioSource;

var Dist : float = 0;

var vel : float = 0;

var dirForce : float = 0;

var localV : Vector3;

var targetLayers : LayerMask;

var RD : float = 0;

var GyroForce : float = 0.2;
var TurnForce : float = 0;

InvokeRepeating("Regenerator", 1, 1);

function Start (){
target = PlayerInformation.instance.PiriTarget;

dirForce = 8;
}

function FixedUpdate () {

if(Done)
return;

TurnForce = 0;

if(target){
Dist = Vector3.Distance(thisTransform.position, target.position);

vel = Mathf.Clamp(vRigidbody.velocity.magnitude * 2.24,0.1,1024);

if(Physics.Linecast (thisTransform.position, target.position, targetLayers)){
TurnForce = 6;
RPClamp = Mathf.Clamp(Dist * 0.2 ,16,256);
}else{
RPClamp = Mathf.Clamp(Dist * 0.2 ,64,256);
}

if(Dist < 60){
if(!Physics.Linecast (thisTransform.position, target.position, targetLayers)){
if(!Braking){
ThrusterFX1.enableEmission = false;
ThrusterFX2.enableEmission = false;
BreakFX1.Play();
BreakFX2.Play();
BreakSound.Play();
dirForce = 16;
Braking = true;
}
}
decrement();
if(vel < 0.2){
Open();
Done = true;
}
}

}

thisTransform.rotation = AIAnchor.transform.rotation;
thisTransform.position = AIAnchor.transform.position;
	
var newRot : Vector3 = (thisTransform.forward * 5 ).normalized;
var hit : RaycastHit;

TurnLeft = false;
TurnRight = false;

newRot = (thisTransform.forward * 8 + thisTransform.right * 1).normalized;

Debug.DrawRay (thisTransform.position + thisTransform.right * 2, newRot * vel * 0.8, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.right * 2, newRot, hit, vel * 0.8, targetLayers)){
TurnLeft = true;
}
 
newRot = (thisTransform.forward * 8 + thisTransform.right * -1).normalized;

Debug.DrawRay (thisTransform.position + -thisTransform.right * 2, newRot * vel * 0.8, Color.black);
if (Physics.Raycast (thisTransform.position + -thisTransform.right * 2, newRot, hit, vel * 0.8, targetLayers)){
TurnRight = true;
}

var localV = thisVTransform.InverseTransformDirection(vRigidbody.velocity);

if(localV.z < 0)
RD = Mathf.Abs(localV.z);
else
RD = 0;

if(TurnLeft)
  TurnForce = -8;

if(TurnRight)
  TurnForce = 8;

if(Braking){

if(dirForce > 0)
dirForce -= 0.1;
if(-localV.y > 0)
vRigidbody.AddForce(thisVTransform.up * dirForce);
}else{

vRigidbody.AddTorque(thisTransform.up * TurnForce);

if(target){

vRigidbody.AddForceAtPosition((target.transform.position - thisVTransform.position).normalized * 2, thisTransform.forward * 2);
vRigidbody.AddForceAtPosition((target.transform.position - thisVTransform.position).normalized * -2, -thisTransform.forward * 2);

}

if(Dist > 1000){
if(vel < 500)
vRigidbody.AddForce(-thisVTransform.up * dirForce);
}else{
if(vel < 250)
vRigidbody.AddForce(-thisVTransform.up * dirForce);
}

newRot = (thisTransform.forward * 6 + thisTransform.up * -2).normalized;
Debug.DrawRay (thisTransform.position + thisTransform.forward * 1 + -thisTransform.up * 1, newRot * RPClamp, Color.white);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 1 + -thisTransform.up * 1, newRot, hit, RPClamp, targetLayers)){
vRigidbody.AddTorque(thisTransform.right * -4);
}else{
vRigidbody.AddForceAtPosition(Vector3.up * GyroForce, thisTransform.up * 1);
vRigidbody.AddForceAtPosition(-Vector3.up * GyroForce, -thisTransform.up * 1);
}
}

}

function Regenerator () {

}


function decrement () {
	if(ThrusterSound.volume > 0.11){
		ThrusterSound.volume -= 0.05;
	}
		if(ThrusterSound.volume < 0.12){
		ThrusterSound.volume -= 0.01;
	}
}


function Open () {

yield WaitForSeconds (2);

CallAssistance.IsKatovariying = false;

CoverCol.enabled = false;

Destroy(Fjoint);

CoverSound.Play();

CoverRB.AddForce(Vector3.up * CoverForceD);
CoverRB.AddForce(Vector3.right * CoverForceD * 0.5);

CoverRB.AddTorque(CoverTF.right * CoverForceD * 0.3);
CoverRB.AddTorque(CoverTF.up * CoverForceD * 0.05);

yield WaitForSeconds (0.1);

CoverCol.enabled = true;

}