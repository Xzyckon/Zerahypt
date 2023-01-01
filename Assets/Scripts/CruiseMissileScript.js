var target : Transform;
var Waypoint : Transform;
var Forward : Transform;
var AIAnchor : Transform;

var tPoint : Transform;

var TargetTrace : Transform;
var TargetLead : Transform;

var Explosion : GameObject;

var thisParent : GameObject;

var thisTransform : Transform;
var thisVTransform : Transform;

var vRigidbody : Rigidbody;

var Siren : AudioSource;
var targetImminent : boolean;

var targetEngaged : boolean;

var targetCode = 0;

var TurnRight : boolean;
var TurnLeft : boolean;

var Dist : float = 0;

var vel : float = 0;

var RPMod : float = 0;
var RPClamp : float = 0;
var RPClamp2 : float = 0;

var localV : Vector3;

var targetLayers : LayerMask;

var RD : float = 0;

var GyroForce : float = 0.2;
var TurnForce : float = 0;

InvokeRepeating("Regenerator", 1, 1);

InvokeRepeating("CalcLead", 1, 0.15);

function Start (){
if(!WorldInformation.bigMissile1)
WorldInformation.bigMissile1 = thisVTransform;
else
WorldInformation.bigMissile2 = thisVTransform;
}

function FixedUpdate () {

if(target){
Dist = Vector3.Distance(thisTransform.position, target.position);
var RelativeTarget = thisTransform.InverseTransformPoint(target.position);
}

vel = Mathf.Clamp(vRigidbody.velocity.magnitude * 2.24,8,1024);

thisTransform.rotation = AIAnchor.transform.rotation;
thisTransform.position = AIAnchor.transform.position;
	
var newRot : Vector3 = (thisTransform.forward * 5 ).normalized;
var hit : RaycastHit;

TurnLeft = false;
TurnRight = false;

newRot0 = (tPoint.forward * 10 + tPoint.right * 1).normalized;

tPoint.Rotate(0,0,60);

Debug.DrawRay (thisTransform.position + thisTransform.forward * 4, newRot0 * vel, Color.yellow);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 4, newRot0, hit, vel, targetLayers)){

CN = hit.collider.name;

if(CN.Contains ("TC" + targetCode) || CN.Contains ("DV") || CN.Contains ("UV") || CN.Contains ("rok"))
targetImminent = true;

}

newRot = (thisTransform.forward * 8 + thisTransform.right * 1).normalized;

Debug.DrawRay (thisTransform.position + thisTransform.right * 2, newRot * vel * 0.8, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.right * 2, newRot, hit, vel * 0.8, targetLayers)){
TurnLeft = true;
if(targetImminent)
TurnLeft = false;
}
 
newRot = (thisTransform.forward * 8 + thisTransform.right * -1).normalized;

Debug.DrawRay (thisTransform.position + -thisTransform.right * 2, newRot * vel * 0.8, Color.black);
if (Physics.Raycast (thisTransform.position + -thisTransform.right * 2, newRot, hit, vel * 0.8, targetLayers)){
TurnRight = true;
if(targetImminent)
TurnRight = false;
}

localV = thisVTransform.InverseTransformDirection(vRigidbody.velocity);

if(localV.z < 0)
RD = Mathf.Abs(localV.z);
else
RD = 0;

RPMod = RelativeTarget.x;
RPClamp = Mathf.Abs(RPMod);
if(targetEngaged)
RPClamp2 = Mathf.Clamp(RPClamp,32,256);
else
RPClamp2 = Mathf.Clamp(vel,32,256);

TurnForce = 0;

if(TurnLeft)
  TurnForce = -64;

if(TurnRight)
  TurnForce = 64;

vRigidbody.AddTorque(thisTransform.up * TurnForce);

if(target){
if(targetEngaged){
if(targetImminent){
vRigidbody.AddForceAtPosition((TargetLead.transform.position - thisVTransform.position).normalized * 24, thisTransform.forward * 2);
vRigidbody.AddForceAtPosition((TargetLead.transform.position - thisVTransform.position).normalized * -24, -thisTransform.forward * 2);
}else{
vRigidbody.AddForceAtPosition((TargetLead.transform.position - thisVTransform.position).normalized * 16, thisTransform.forward * 2);
vRigidbody.AddForceAtPosition((TargetLead.transform.position - thisVTransform.position).normalized * -16, -thisTransform.forward * 2);
}
}else{
vRigidbody.AddForceAtPosition((target.transform.position - thisVTransform.position).normalized * 16, thisTransform.forward * 2);
vRigidbody.AddForceAtPosition((target.transform.position - thisVTransform.position).normalized * -16, -thisTransform.forward * 2);
}
}

vRigidbody.AddForceAtPosition(Vector3.up * GyroForce, thisTransform.up * 2);
vRigidbody.AddForceAtPosition(-Vector3.up * GyroForce, -thisTransform.up * 2);

if(vel < 500)
vRigidbody.AddForce(-thisVTransform.up * 18);

Debug.DrawRay (thisTransform.position + thisTransform.forward * 3, thisTransform.forward * vel * 0.15, Color.red);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 3, thisTransform.forward, hit, vel * 0.15, targetLayers))
if(targetImminent){
TerrahyptianNetwork.instance.NukeMarker = null;
Instantiate(Explosion, transform.position, transform.rotation);
Destroy(thisParent);
Destroy(gameObject);
}

newRot = (thisTransform.forward * 6 + thisTransform.up * -2).normalized;

Debug.DrawRay (thisTransform.position + thisTransform.forward * 1 + -thisTransform.up * 1, newRot * RPClamp2, Color.white);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 1 + -thisTransform.up * 1, newRot, hit, RPClamp2, targetLayers)){
if(targetImminent)
return;

vRigidbody.AddTorque(thisTransform.right * -64);
}

}

function CalcLead () {
targetImminent = false;
Lead();
}

function Lead (){

if(target)
TargetTrace.position = target.position;

yield WaitForSeconds (0.1);

if(target){

var Dist2 = Vector3.Distance(TargetTrace.position, target.position);

var Dist0 = Mathf.Clamp(Dist * 0.3,1,200);

TargetTrace.LookAt(target);

TargetLead.position = TargetTrace.position;
TargetLead.rotation = TargetTrace.rotation;

TargetLead.position += TargetLead.forward * Dist2 * 2;

TargetLead.position += TargetLead.forward * Dist0;

}
}

function Regenerator () {

if(TerrahyptianNetwork.instance.NukeMarker){
target = TerrahyptianNetwork.instance.NukeMarker;
targetEngaged = true;

if(!Siren.isPlaying)
Siren.Play();

if(target.name.Contains ("C1"))
targetCode = 1;
if(target.name.Contains ("C2"))
targetCode = 2;
if(target.name.Contains ("C3"))
targetCode = 3;
if(target.name.Contains ("C4"))
targetCode = 4;
if(target.name.Contains ("C5"))
targetCode = 5;
if(target.name.Contains ("C6"))
targetCode = 6;
if(target.name.Contains ("C7"))
targetCode = 7;
if(target.name.Contains ("C8"))
targetCode = 8;
if(target.name.Contains ("C9"))
targetCode = 9;

}else{
if(target){
if(!target.name.Contains ("TC")){
target = Forward;
targetEngaged = false;
}else{
targetEngaged = true;

if(!Siren.isPlaying)
Siren.Play();
}
}

}

}