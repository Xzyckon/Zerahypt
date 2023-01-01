
var target : Transform;
var AIAnchor : Transform;

var thisTransform : Transform;
var thisVTransform : Transform;

var vRigidbody : Rigidbody;

var TurnRight : boolean;
var TurnLeft : boolean;
var TurnUp : boolean;
var TurnDown : boolean;

var Engaging : boolean;

var ThrusterFX1 : ParticleSystem;
var ThrusterFX2 : ParticleSystem;

var ThrusterSound : AudioSource;

var Dist : float = 512;
var vel : float = 0;
var dirForce : float = 0;

var localV : Vector3;
var targetLayers : LayerMask;

var GyroForce : float = 0.2;
var TurnForce : float = 8;
var PitchForce : float = 8;

InvokeRepeating("Regenerator", 1, 0.2);

function Start () {
AgrianNetwork.DoomclawActive = true;
AgrianNetwork.theDoomclaw = thisTransform;
}

function FixedUpdate () {

if(target)
Dist = Vector3.Distance(thisTransform.position, target.position);

vel = Mathf.Clamp(vRigidbody.velocity.magnitude * 2.24,32,1024);

thisTransform.rotation = AIAnchor.transform.rotation;
thisTransform.position = AIAnchor.transform.position;
	
var newRot : Vector3 = (thisTransform.forward * 5 ).normalized;
var hit : RaycastHit;

TurnLeft = false;
TurnRight = false;
TurnUp = false;
TurnDown = false;

newRot = (thisTransform.forward * 8 + thisTransform.right * 1).normalized;

Debug.DrawRay (thisTransform.position + thisTransform.right * 6, newRot * vel * 0.8, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.right * 6, newRot, hit, vel * 0.8, targetLayers)){
TurnLeft = true;
}
 
newRot = (thisTransform.forward * 8 + thisTransform.right * -1).normalized;

Debug.DrawRay (thisTransform.position + -thisTransform.right * 6, newRot * vel * 0.8, Color.black);
if (Physics.Raycast (thisTransform.position + -thisTransform.right * 6, newRot, hit, vel * 0.8, targetLayers)){
TurnRight = true;
}

newRot = (thisTransform.forward * 8 + thisTransform.up * -1).normalized;

Debug.DrawRay (thisTransform.position + -thisTransform.up * 6, newRot * vel * 0.8, Color.red);
if (Physics.Raycast (thisTransform.position + -thisTransform.up * 6, newRot, hit, vel * 0.8, targetLayers)){
TurnUp = true;
}
 
newRot = (thisTransform.forward * 8 + thisTransform.up * 1).normalized;

Debug.DrawRay (thisTransform.position + thisTransform.up * 6, newRot * vel * 0.8, Color.blue);
if (Physics.Raycast (thisTransform.position + thisTransform.up * 6, newRot, hit, vel * 0.8, targetLayers)){
TurnDown = true;
}

if(TurnLeft)
TurnForce = -Mathf.Clamp(vRigidbody.velocity.magnitude * 0.5,32,128);

if(TurnRight)
TurnForce = Mathf.Clamp(vRigidbody.velocity.magnitude * 0.5,32,128);
  
if(TurnUp)
PitchForce = -Mathf.Clamp(vRigidbody.velocity.magnitude * 0.5,32,128);

if(TurnDown)
PitchForce = Mathf.Clamp(vRigidbody.velocity.magnitude * 0.5,32,128);

if(!Engaging){
dirForce = 16;
}else{
dirForce = 64;
}

if(Dist > 256){
if(vel < 1024)
vRigidbody.AddForce(-thisVTransform.up * dirForce);
}else{
if(vel < 830)
vRigidbody.AddForce(-thisVTransform.up * dirForce);
}

vRigidbody.AddTorque(thisTransform.up * TurnForce);
vRigidbody.AddTorque(thisTransform.right * PitchForce);

if(target){
vRigidbody.AddForceAtPosition((target.transform.position - thisVTransform.position).normalized * 32, thisTransform.forward * 4);
vRigidbody.AddForceAtPosition((target.transform.position - thisVTransform.position).normalized * -32, -thisTransform.forward * 4);
}

vRigidbody.AddForceAtPosition(Vector3.up * GyroForce, thisTransform.up * 1);
vRigidbody.AddForceAtPosition(-Vector3.up * GyroForce, -thisTransform.up * 1);

}

function Regenerator () {

TurnForce = 0;
PitchForce = 0;

if(AgrianNetwork.DoomstarActive){
target = AgrianNetwork.theDoomstar;
}
}