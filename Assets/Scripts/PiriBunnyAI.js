var AIAnchor : Transform;

var topAnchor : Transform;
var topRB : Rigidbody;

var isBeingHeld : boolean;

var target : Transform;

var vTransform : Transform;

var thisTransform : Transform;
var thisRigidbody : Rigidbody;

var neckTransform : Transform;
var neckRigidbody : Rigidbody;

var trig : SphereCollider;

var thisTrigTF : Transform;

var SFX : AudioSource;

var BepSFX1 : AudioClip;
var BepSFX2 : AudioClip;
var BepSFX3 : AudioClip;
var BepSFX4 : AudioClip;

var BaapSFX1 : AudioClip;
var BaapSFX2 : AudioClip;
var BaapSFX3 : AudioClip;
var BaapSFX4 : AudioClip;

var skullHJoint : HingeJoint;
var jawHJoint : HingeJoint;

var RArmHJoint : HingeJoint;
var LArmHJoint : HingeJoint;
var RLegHJoint : HingeJoint;
var LLegHJoint : HingeJoint;

var RLegCol : CapsuleCollider;
var LLegCol : CapsuleCollider;

var physMat1 : PhysicMaterial;
var physMat2 : PhysicMaterial;

var Moving : boolean;
var Running : boolean;

var Interacting : boolean;

var mouthMood : int;

var moveClock : float;
var moveSpeed : float;

var stabForce : float;

var lookForce : float;

var FLCurve : AnimationCurve = new AnimationCurve();
var RLCurve : AnimationCurve = new AnimationCurve();

var Normrot : Vector3;

var targetLayers : LayerMask;

var notiClock : float;

function Start () {

if(isBeingHeld){
topAnchor = vTransform.parent.transform;
topRB = PlayerInformation.instance.PirizukaRB;

vTransform.parent = null;

}

thisTransform.parent = null;

}

function FixedUpdate () {

var hit : RaycastHit;

if(!AIAnchor){

Destroy(thisTransform.gameObject);

return;
}

if(isBeingHeld){

vTransform.rotation = topAnchor.rotation;
vTransform.position = topAnchor.position;

thisRigidbody.angularVelocity = topRB.angularVelocity;
thisRigidbody.velocity = topRB.velocity;

if(WorldInformation.UsingClosedVessel){
vTransform.parent = PlayerInformation.instance.Pirizuka;
Interacting = false;
}else{
vTransform.parent = null;
}

}

thisTransform.rotation = AIAnchor.rotation;
thisTransform.position = AIAnchor.position;

if (Physics.Raycast (thisTransform.position, Vector3.down, hit, 1, targetLayers)){

Normrot = hit.normal;

thisRigidbody.AddForceAtPosition(Normrot * stabForce, thisTransform.up * 1);
thisRigidbody.AddForceAtPosition(-Normrot * stabForce, -thisTransform.up * 1);

}else{

thisRigidbody.AddForceAtPosition(Normrot * stabForce, thisTransform.up * 1);
thisRigidbody.AddForceAtPosition(-Normrot * stabForce, -thisTransform.up * 1);

}

if(target){
neckRigidbody.AddForceAtPosition((target.position - neckTransform.position).normalized * lookForce, neckTransform.up * 1);
neckRigidbody.AddForceAtPosition((target.position - neckTransform.position).normalized * -lookForce, -neckTransform.up * 1);
}

if(notiClock > 60){
Ticker();
notiClock = 0;
}else{
notiClock += Random.Range(0.01f, 5.33f);
}

if(moveClock > 59)
moveClock = 0;

if(moveClock < 15){
RLegCol.material = physMat1;
LLegCol.material = physMat1;
}else{
RLegCol.material = physMat2;
LLegCol.material = physMat2;
}

if(Moving){
moveClock += moveSpeed * Random.Range(0.7f, 1.3f);

RArmHJoint.spring.targetPosition = FLCurve.Evaluate(moveClock);
LArmHJoint.spring.targetPosition = FLCurve.Evaluate(moveClock);

RLegHJoint.spring.targetPosition = RLCurve.Evaluate(moveClock);
LLegHJoint.spring.targetPosition = RLCurve.Evaluate(moveClock);

}else{
moveClock = 0;

RArmHJoint.spring.targetPosition = 0;
LArmHJoint.spring.targetPosition = 0;

RLegHJoint.spring.targetPosition = 0;
LLegHJoint.spring.targetPosition = 0;

}

switch (mouthMood) {
case 0:
skullHJoint.spring.targetPosition = 0;
jawHJoint.spring.targetPosition = 0;
break;

case 1:
skullHJoint.spring.targetPosition = 0;
jawHJoint.spring.targetPosition = -30;
break;

case 2:
skullHJoint.spring.targetPosition = 40;
jawHJoint.spring.targetPosition = -35;
break;
}

}

function OnTriggerStay (other : Collider){

ON = other.name;
OT = other.transform;

if(Physics.Linecast (thisTransform.position, OT.position, targetLayers) || !Interacting)
return;

if(OT != thisTrigTF)
if(ON.Contains ("TC")){
target = OT;

trig.enabled = false;
trig.radius = 0.1;

var randomValue : int = Random.Range(1, 16);

switch (randomValue) {
case 1:
Bep();
break;
case 2:
Bep();
break;
case 3:
Bep();
break;
case 4:
Bep();
break;
case 5:
Baap();
break;
}

}

}

function Ticker (){

var randomValue1 : int = Random.Range(1, 4);
var randomValue2 : int = Random.Range(1, 16);

switch (randomValue1) {
case 1:
Moving = true;
break;
case 2:
Moving = false;
break;
}

switch (randomValue2) {
case 1:
if(Interacting){
Interacting = false;
target = null;
}else{
Interacting = true;
}
break;
case 3:
target = null;
break;
}

trig.enabled = true;
trig.radius = 16;

}

function Bep (){

Interacting = false;

if(mouthMood > 0)
return;

var randomValueBep : int = Random.Range(1, 5);

yield WaitForSeconds (0.3);
mouthMood = 1;

switch (randomValueBep) {
case 1:
SFX.PlayOneShot(BepSFX1);
break;
case 2:
SFX.PlayOneShot(BepSFX2);
break;
case 3:
SFX.PlayOneShot(BepSFX3);
break;
case 4:
SFX.PlayOneShot(BepSFX4);
break;
}

yield WaitForSeconds (0.15);
mouthMood = 0;
}

function Baap (){

Interacting = false;

if(mouthMood > 0)
return;

var randomValueBaap : int = Random.Range(1, 5);

yield WaitForSeconds (0.2);
mouthMood = 2;

switch (randomValueBaap) {
case 1:
SFX.PlayOneShot(BaapSFX1);
break;
case 2:
SFX.PlayOneShot(BaapSFX2);
break;
case 3:
SFX.PlayOneShot(BaapSFX3);
break;
case 4:
SFX.PlayOneShot(BaapSFX4);
break;
}

yield WaitForSeconds (0.5);
mouthMood = 0;
}


























