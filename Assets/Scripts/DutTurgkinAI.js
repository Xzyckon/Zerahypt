var target : Transform;

var RememberedName : String;

var HIdleTarget : Transform;

var TurgkinAIAnchor : Transform;

var TurgkinRB : Rigidbody;
var TurgkinTF : Transform;
var TurgkinTC : Transform;
var TurgkinTrig : SphereCollider;
var thisTransform : Transform;

var TurgkinPTF : Transform;

var DamageScript : VehicleDamage;

var FX1 : ParticleSystem;
var FX2 : ParticleSystem;

var RHand : Transform;
var RHandAim1 : Transform;
var RHandIdle1 : Transform;
var RHandIdle2 : Transform;

var RHandSwipe1 : Transform;
var RHandReadySwipe1 : boolean;
var RHandSwiping1 = 0;

var RHandReadyJab1 : boolean;
var RHandJabbing1 = 0;

var RX = 0;
var RY = 0;
var RZ = 0;

var RHandSwipe1PosCurve : AnimationCurve = new AnimationCurve();
var RHandSwipe1RotCurve : AnimationCurve = new AnimationCurve();

var RHandJabPosCurve : AnimationCurve = new AnimationCurve();
var RHandJabRotCurve : AnimationCurve = new AnimationCurve();

var FX2Curve : AnimationCurve = new AnimationCurve();

var FX1R : float = 0.9;
var FX1G : float = 0.9;
var FX1B : float = 0.9;

var LifeForce : float = 0;

var Vel : float = 0;

var Dist : float = 0;

var PissedAtTC0 = 0;
var PissedAtTC1 = 0;
var PissedAtTC2 = 0;
var PissedAtTC3 = 0;
var PissedAtTC4 = 0;
var PissedAtTC5 = 0;
var PissedAtTC6 = 0;
var PissedAtTC7 = 0;
var PissedAtTC8 = 0;
var PissedAtTC9 = 0;

var JabFXPrefab : GameObject;
var JabFXOnce : boolean;

var JabMeleePrefab : GameObject;
var JabMeleeOnce : boolean;

var SwingFXPrefab : GameObject;
var SwingFXOnce : boolean;

var SwingMeleePrefab : GameObject;
var SwingMeleeOnce : boolean;

var Weapon : PersonGunScript;

var GradTexUp : Texture2D;
var GradTexDown : Texture2D;

var newColor : Color;

var TurgHandModelR : MeshRenderer;

var TurgModelR : MeshRenderer;
var TurgModelFragR : MeshRenderer;
var TurgModelFragRCurve : AnimationCurve = new AnimationCurve();

var TurgRangedModelR : MeshRenderer;
var TurgRangedModelFragR : MeshRenderer;
var TurgRangedModelFragRCurve : AnimationCurve = new AnimationCurve();
var TurgRangedMorphLevel = 0;

var TurgMeleeModelR : MeshRenderer;
var TurgMeleeModelFragR : MeshRenderer;
var TurgMeleeModelFragRCurve : AnimationCurve = new AnimationCurve();
var TurgMeleeMorphLevel = 0;

var UsingMelee : boolean;
var UsingRanged : boolean;

var IsNewlyCreated : boolean;

var TypeCydaz : boolean;
var TypeCytarg : boolean;
var TypeCytchau : boolean;

var Escaping : boolean;

var KeepDistance : boolean;

var Interest = 0;

var PissedOffLevel = 0;

var RelaxedLevel = 0;

var StressLevel = 0;

var aimForce : float = 0.1;

var dirForce : float = 0.01;
var dirForceCurve : AnimationCurve = new AnimationCurve();
var dirForceCurveKD : AnimationCurve = new AnimationCurve();

var hoverForce : float = 0.0001;
var hoverCurve : AnimationCurve = new AnimationCurve();

var Turning : boolean;

var Obstacle : boolean;

var Stuckage = 0;
var Stuck : boolean;

var targetLayers : LayerMask;
var targetLayersM : LayerMask;

private var NewRotation : Quaternion;

InvokeRepeating("Ticker", Random.Range (0.1, 0.9), 1);

function Start () {

TurgkinTF.parent.transform.parent = null;

SwingMeleeOnce = false;

RelaxedLevel = 8;

if(IsNewlyCreated)
DamageScript.RestartFromOne();

if(!TypeCydaz && !TypeCytarg && !TypeCytchau){

var randomValueC : int = Random.Range(0, 3);

switch (randomValueC) {
case 0:
FX1.startColor.r = 0.5;
FX1.startColor.g = 0.65;
FX1.startColor.b = 0.2;
TurgRangedModelR.material.color = new Color(0.5, 0.65, 0.2);
TurgMeleeModelR.material.color = new Color(0.5, 0.65, 0.2);
TypeCydaz = true;
break;
case 1:
FX1.startColor.r = 0.2;
FX1.startColor.g = 0.6;
FX1.startColor.b = 0.2;
TurgRangedModelR.material.color = new Color(0.2, 0.6, 0.2);
TurgMeleeModelR.material.color = new Color(0.2, 0.6, 0.2);
TypeCytarg = true;
break;
case 2:
FX1.startColor.r = 0.2;
FX1.startColor.g = 0.65;
FX1.startColor.b = 0.4;
TurgRangedModelR.material.color = new Color(0.2, 0.65, 0.4);
TurgMeleeModelR.material.color = new Color(0.2, 0.65, 0.4);
TypeCytchau = true;
break;
}

}else{
if(TypeCydaz){
FX1.startColor.r = 0.5;
FX1.startColor.g = 0.65;
FX1.startColor.b = 0.2;
TurgRangedModelR.material.color = new Color(0.5, 0.65, 0.2);
TurgMeleeModelR.material.color = new Color(0.5, 0.65, 0.2);
}

if(TypeCytarg){
FX1.startColor.r = 0.2;
FX1.startColor.g = 0.6;
FX1.startColor.b = 0.2;
TurgRangedModelR.material.color = new Color(0.2, 0.6, 0.2);
TurgMeleeModelR.material.color = new Color(0.2, 0.6, 0.2);
}

if(TypeCytchau){
FX1.startColor.r = 0.2;
FX1.startColor.g = 0.65;
FX1.startColor.b = 0.4;
TurgRangedModelR.material.color = new Color(0.2, 0.65, 0.4);
TurgMeleeModelR.material.color = new Color(0.2, 0.65, 0.4);
}
}

TurgModelFragR.material.SetTextureOffset("_SliceGuide", Vector2(Random.Range (0f, 1f),Random.Range (0f, 1f)));
StuffSpawner.TheNPC0091N += 1;

}

function FixedUpdate () {

var hit : RaycastHit;
var hit2 : RaycastHit;

thisTransform.position = TurgkinAIAnchor.position;
thisTransform.rotation = TurgkinAIAnchor.rotation;

if(target)
Dist = Vector3.Distance(thisTransform.position, target.position);

localV = thisTransform.InverseTransformDirection(TurgkinRB.velocity);

Vel = TurgkinRB.velocity.magnitude;

var VelC = Mathf.Clamp(Vel,0.5,5);

var VelC2 = Mathf.Clamp(localV.z,1,16);

VelC2Div = VelC2 / 4;

LifeForce = DamageScript.Health;

if(LifeForce < 1){
if(FX1.startColor.a < LifeForce * 0.3)
FX1.startColor.a += 0.002;
else
FX1.startColor.a -= 0.002;
}else{
if(FX1.startColor.a < 0.3)
FX1.startColor.a += 0.002;
}

FX2.emissionRate = FX2Curve.Evaluate(LifeForce);

TurgModelFragR.material.SetFloat("_SliceAmount", TurgModelFragRCurve.Evaluate(LifeForce));
TurgRangedModelFragR.material.SetFloat("_SliceAmount", TurgRangedModelFragRCurve.Evaluate(TurgRangedMorphLevel));
TurgMeleeModelFragR.material.SetFloat("_SliceAmount", TurgMeleeModelFragRCurve.Evaluate(TurgMeleeMorphLevel));

if(LifeForce > 8)
TurgModelR.enabled = true;
else
TurgModelR.enabled = false;

if(TurgkinTrig.radius < 32)
TurgkinTrig.radius += Random.Range (0.05, 0.5);





Debug.DrawRay (thisTransform.position + TurgkinTF.up * -1, -TurgkinTF.up * VelC2, Color.black);
if (Physics.Raycast (thisTransform.position + TurgkinTF.up * -1, -TurgkinTF.up, hit, VelC2, targetLayers)){
Obstacle = true;
}




Debug.DrawRay (thisTransform.position + TurgkinTF.up * -0.5, -TurgkinTF.up * VelC2, Color.black);
if (Physics.Raycast (thisTransform.position + TurgkinTF.up * -0.5, -TurgkinTF.up, hit, VelC2, targetLayers)){
if(!Stuck){
TurgkinRB.AddForce(transform.forward * -0.1);
}else{
TurgkinRB.AddTorque(TurgkinTF.forward * 0.01);
Turning = true;
}

}else{

if(Stuck){
TurgkinRB.AddTorque(TurgkinTF.forward * 0.01);
Turning = true;
}

}




LeftDist = 64;
RightDist = 64;
UpDist = 64;
DownDist = 64;





newRot = (TurgkinTF.up * -VelC2 * 0.5 + TurgkinTF.right * -0.5).normalized;
Debug.DrawRay (thisTransform.position + TurgkinTF.up * -0.3, newRot * VelC2, Color.black);
if (Physics.Raycast (thisTransform.position + TurgkinTF.up * -0.3, newRot, hit, VelC2, targetLayers)){
LeftDist = hit.distance;
Turning = true;
}

newRot = (TurgkinTF.up * -VelC2 * 0.5 + TurgkinTF.right * 0.5).normalized;
Debug.DrawRay (thisTransform.position + TurgkinTF.up * -0.3, newRot * VelC2, Color.black);
if (Physics.Raycast (thisTransform.position + TurgkinTF.up * -0.3, newRot, hit, VelC2, targetLayers)){
RightDist = hit.distance;
Turning = true;
}

newRot = (TurgkinTF.up * -VelC2 * 0.5 + TurgkinTF.forward * 0.5).normalized;
Debug.DrawRay (thisTransform.position + TurgkinTF.up * -0.3, newRot * VelC2, Color.blue);
if (Physics.Raycast (thisTransform.position + TurgkinTF.up * -0.3, newRot, hit2, VelC2, targetLayers)){
UpDist = hit2.distance;
Turning = true;
}

newRot = (TurgkinTF.up * -VelC2 * 0.5 + TurgkinTF.forward * -0.5).normalized;
Debug.DrawRay (thisTransform.position + TurgkinTF.up * -0.3, newRot * VelC2, Color.red);
if (Physics.Raycast (thisTransform.position + TurgkinTF.up * -0.3, newRot, hit2, VelC2, targetLayers)){
DownDist = hit2.distance;
Turning = true;
}





if(RightDist > LeftDist)
TurgkinRB.AddTorque(TurgkinTF.forward * 0.01);

if(RightDist < LeftDist)
TurgkinRB.AddTorque(TurgkinTF.forward * -0.01);

if(DownDist > UpDist)
TurgkinRB.AddTorque(TurgkinTF.right * 0.01);

if(DownDist < UpDist)
TurgkinRB.AddTorque(TurgkinTF.right * -0.01);







if(target){

if(PissedOffLevel > 4){










if(!RHandReadySwipe1 && !RHandReadyJab1){
NewRotation = Quaternion.LookRotation(target.position - RHand.position);
RHand.rotation = Quaternion.RotateTowards(RHand.rotation, NewRotation, 4);

RHand.position.x = Mathf.Lerp(RHand.position.x, RHandAim1.position.x, 0.05);
RHand.position.y = Mathf.Lerp(RHand.position.y, RHandAim1.position.y, 0.05);
RHand.position.z = Mathf.Lerp(RHand.position.z, RHandAim1.position.z, 0.05);
}










if(RHandSwiping1 == 0){
if(RHandReadySwipe1){
RHand.position.x = Mathf.Lerp(RHand.position.x, RHandSwipe1.position.x, 0.1);
RHand.position.y = Mathf.Lerp(RHand.position.y, RHandSwipe1.position.y, 0.1);
RHand.position.z = Mathf.Lerp(RHand.position.z, RHandSwipe1.position.z, 0.1);

RHand.localRotation = Quaternion.Slerp(RHand.localRotation, RHandSwipe1.localRotation, 0.1);

RHandSwipe1.LookAt(target);
RHandSwipe1.Rotate(RX,RY,RZ);

if(Vector3.Distance(RHandSwipe1.position, RHand.position) < 0.1){
RHand.Rotate(0,Random.Range (-20, 20),0);
RHandReadySwipe1 = false;
RHandSwiping1 = 1;
}
}
}else{
RHandSwiping1 += 1;
RHand.position += RHand.forward * RHandSwipe1PosCurve.Evaluate(RHandSwiping1);
RHand.position -= RHand.up * RHandSwipe1PosCurve.Evaluate(RHandSwiping1) * 0.5;
RHand.Rotate(RHandSwipe1RotCurve.Evaluate(RHandSwiping1),0,0);
TurgkinRB.AddForce(transform.forward * RHandSwipe1RotCurve.Evaluate(RHandSwiping1) * 0.01);
TurgkinRB.AddTorque(TurgkinTF.forward * RHandSwipe1PosCurve.Evaluate(RHandSwiping1) * -0.05);

if(!SwingFXOnce){
Instantiate(SwingFXPrefab, RHand.position, Quaternion.identity);
SwingFXOnce = true;
}

if(RHandSwiping1 > 1){

if(RHandSwiping1 < 9){
if(!SwingMeleeOnce){
Debug.DrawRay (RHand.position, RHand.up * 1.1, Color.green);
Debug.DrawRay (RHand.position + RHand.forward * -0.3, RHand.up * 1.1, Color.green);
Debug.DrawRay (RHand.position + RHand.forward * 0.3, RHand.up * 1.1, Color.green);
if(Physics.Raycast(RHand.position, RHand.up, hit, 1.1) || 
   Physics.Raycast(RHand.position + RHand.forward * -0.3, RHand.up, hit, 1.1) || 
   Physics.Raycast(RHand.position + RHand.forward * 0.3, RHand.up, hit, 1.1, targetLayers)){
Instantiate(SwingMeleePrefab, hit.point, Quaternion.identity);
SwingMeleeOnce = true;
}
}
}
			
if(RHandSwiping1 > 16){
RHandSwiping1 = 0;
SwingMeleeOnce = false;
SwingFXOnce = false;
}
}
}
























if(RHandJabbing1 == 0){
if(RHandReadyJab1){
RHand.position.x = Mathf.Lerp(RHand.position.x, RHandSwipe1.position.x, 0.1);
RHand.position.y = Mathf.Lerp(RHand.position.y, RHandSwipe1.position.y, 0.1);
RHand.position.z = Mathf.Lerp(RHand.position.z, RHandSwipe1.position.z, 0.1);

RHand.localRotation = Quaternion.Slerp(RHand.localRotation, RHandSwipe1.localRotation, 0.1);

RHandSwipe1.LookAt(target);

if(Vector3.Distance(RHandSwipe1.position, RHand.position) < 0.05){
RHandReadyJab1 = false;
RHandJabbing1 = 1;
}
}
}else{
RHandJabbing1 += 1;
RHand.position += RHand.forward * RHandJabPosCurve.Evaluate(RHandJabbing1);
RHand.Rotate(0,-RHandJabRotCurve.Evaluate(RHandJabbing1) / 2,0);
TurgkinRB.AddForce(transform.forward * RHandSwipe1RotCurve.Evaluate(RHandJabbing1) * 0.01);
TurgkinRB.AddTorque(TurgkinTF.forward * RHandJabPosCurve.Evaluate(RHandJabbing1) * -0.05);

if(!JabFXOnce){
Instantiate(JabFXPrefab, RHand.position, Quaternion.identity);
JabFXOnce = true;
}

if(RHandJabbing1 > 1){

if(RHandJabbing1 < 9){
if(!JabMeleeOnce){
Debug.DrawRay (RHand.position, RHand.forward * 0.5, Color.green);
if(Physics.Raycast(RHand.position, RHand.forward, hit, 0.5, targetLayers)){
Instantiate(JabMeleePrefab, hit.point, Quaternion.identity);
JabMeleeOnce = true;
}
}
}
			
if(RHandJabbing1 > 12){
RHandJabbing1 = 0;
JabMeleeOnce = false;
JabFXOnce = false;
}
}
}





























}else{

if(RelaxedLevel < 8){
RHand.position.x = Mathf.Lerp(RHand.position.x, RHandIdle2.position.x, 0.05);
RHand.position.y = Mathf.Lerp(RHand.position.y, RHandIdle2.position.y, 0.05);
RHand.position.z = Mathf.Lerp(RHand.position.z, RHandIdle2.position.z, 0.05);

RHand.localRotation.x = Mathf.Lerp(RHand.localRotation.x, RHandIdle2.localRotation.x, 0.1);
RHand.localRotation.y = Mathf.Lerp(RHand.localRotation.y, RHandIdle2.localRotation.y, 0.1);
RHand.localRotation.z = Mathf.Lerp(RHand.localRotation.z, RHandIdle2.localRotation.z, 0.1);
}else{
RHand.position.x = Mathf.Lerp(RHand.position.x, RHandIdle1.position.x, 0.05);
RHand.position.y = Mathf.Lerp(RHand.position.y, RHandIdle1.position.y, 0.05);
RHand.position.z = Mathf.Lerp(RHand.position.z, RHandIdle1.position.z, 0.05);

RHand.localRotation.x = Mathf.Lerp(RHand.localRotation.x, RHandIdle1.localRotation.x, 0.1);
RHand.localRotation.y = Mathf.Lerp(RHand.localRotation.y, RHandIdle1.localRotation.y, 0.1);
RHand.localRotation.z = Mathf.Lerp(RHand.localRotation.z, RHandIdle1.localRotation.z, 0.1);
}
}

if(KeepDistance)
TurgkinRB.AddForce(transform.forward * dirForceCurveKD.Evaluate(Dist / VelC2Div));
else
TurgkinRB.AddForce(transform.forward * dirForceCurve.Evaluate(Dist / VelC2Div));

TurgkinRB.AddForceAtPosition((target.position - thisTransform.position).normalized * aimForce, thisTransform.forward * 3);
TurgkinRB.AddForceAtPosition((target.position - thisTransform.position).normalized * -aimForce, -thisTransform.forward * 3);

}else{

if(RelaxedLevel < 8){
RHand.position.x = Mathf.Lerp(RHand.position.x, RHandIdle2.position.x, 0.05);
RHand.position.y = Mathf.Lerp(RHand.position.y, RHandIdle2.position.y, 0.05);
RHand.position.z = Mathf.Lerp(RHand.position.z, RHandIdle2.position.z, 0.05);

RHand.localRotation.x = Mathf.Lerp(RHand.localRotation.x, RHandIdle2.localRotation.x, 0.1);
RHand.localRotation.y = Mathf.Lerp(RHand.localRotation.y, RHandIdle2.localRotation.y, 0.1);
RHand.localRotation.z = Mathf.Lerp(RHand.localRotation.z, RHandIdle2.localRotation.z, 0.1);
}else{
RHand.position.x = Mathf.Lerp(RHand.position.x, RHandIdle1.position.x, 0.05);
RHand.position.y = Mathf.Lerp(RHand.position.y, RHandIdle1.position.y, 0.05);
RHand.position.z = Mathf.Lerp(RHand.position.z, RHandIdle1.position.z, 0.05);

RHand.localRotation.x = Mathf.Lerp(RHand.localRotation.x, RHandIdle1.localRotation.x, 0.1);
RHand.localRotation.y = Mathf.Lerp(RHand.localRotation.y, RHandIdle1.localRotation.y, 0.1);
RHand.localRotation.z = Mathf.Lerp(RHand.localRotation.z, RHandIdle1.localRotation.z, 0.1);
}

TurgkinRB.AddForce(transform.forward * Random.Range (0.015, 0.03));

}

if(!Turning){
TurgkinRB.AddForceAtPosition(Vector3.up * aimForce, TurgkinTF.forward * 1.5);
TurgkinRB.AddForceAtPosition(-Vector3.up * aimForce, -TurgkinTF.forward * 1.5);
}

if (Physics.Raycast (thisTransform.position, Vector3.down, hit, 2000, targetLayers)) {
hoverForce = hoverCurve.Evaluate(hit.distance); 
TurgkinRB.AddForce(Vector3.up * hoverForce * 0.005);
}








if(RelaxedLevel < 8){

if(UsingMelee){
if(TurgRangedMorphLevel < 1){
if(TurgMeleeMorphLevel < 48)
TurgMeleeMorphLevel += 1;
if(TurgMeleeMorphLevel > 24){
TurgMeleeModelR.enabled = true;
TurgMeleeModelFragR.material.SetTexture("_SliceGuide", GradTexUp);
}else{
TurgMeleeModelR.enabled = false;
TurgMeleeModelFragR.material.SetTexture("_SliceGuide", GradTexDown);
}
}
}else{
if(TurgMeleeMorphLevel > 0)
TurgMeleeMorphLevel -= 1;
if(TurgMeleeMorphLevel > 24){
TurgMeleeModelR.enabled = true;
TurgMeleeModelFragR.material.SetTexture("_SliceGuide", GradTexUp);
}else{
TurgMeleeModelR.enabled = false;
TurgMeleeModelFragR.material.SetTexture("_SliceGuide", GradTexDown);
}
}

if(UsingRanged){
if(TurgMeleeMorphLevel < 1){
if(TurgRangedMorphLevel < 48)
TurgRangedMorphLevel += 1;
if(TurgRangedMorphLevel > 24){
TurgRangedModelR.enabled = true;
TurgRangedModelFragR.material.SetTexture("_SliceGuide", GradTexUp);
}else{
TurgRangedModelR.enabled = false;
TurgRangedModelFragR.material.SetTexture("_SliceGuide", GradTexDown);
}
}
}else{
if(TurgRangedMorphLevel > 0)
TurgRangedMorphLevel -= 1;
if(TurgRangedMorphLevel > 24){
TurgRangedModelR.enabled = true;
TurgRangedModelFragR.material.SetTexture("_SliceGuide", GradTexUp);
}else{
TurgRangedModelR.enabled = false;
TurgRangedModelFragR.material.SetTexture("_SliceGuide", GradTexDown);
}
}

}else{

if(TurgMeleeMorphLevel > 0)
TurgMeleeMorphLevel -= 1;
if(TurgRangedMorphLevel > 0)
TurgRangedMorphLevel -= 1;

if(TurgRangedMorphLevel > 24){
TurgRangedModelR.enabled = true;
TurgRangedModelFragR.material.SetTexture("_SliceGuide", GradTexUp);
}else{
TurgRangedModelR.enabled = false;
TurgRangedModelFragR.material.SetTexture("_SliceGuide", GradTexDown);
}

if(TurgMeleeMorphLevel > 24){
TurgMeleeModelR.enabled = true;
TurgMeleeModelFragR.material.SetTexture("_SliceGuide", GradTexUp);
}else{
TurgMeleeModelR.enabled = false;
TurgMeleeModelFragR.material.SetTexture("_SliceGuide", GradTexDown);
}

}




if(Vector3.Distance(thisTransform.position, RHand.position) < 0.25){
TurgHandModelR.enabled = false;
}else{
TurgHandModelR.enabled = true;
}




}

function OnTriggerEnter (other : Collider) {

ON = other.name;
OT = other.transform;

if(Physics.Linecast (thisTransform.position, OT.position, targetLayersM))
return;

if(ON.Contains ("TFC")){
if(PissedOffLevel < 12)
PissedOffLevel += 6;
RelaxedLevel = 0;
}

if(ON.Contains ("TFC0"))
PissedAtTC0 += 6;

if(ON.Contains ("TFC1"))
PissedAtTC1 += 6;

if(ON.Contains ("TFC2"))
PissedAtTC2 += 6;;

if(ON.Contains ("TFC3"))
PissedAtTC3 += 6;

if(ON.Contains ("TFC4"))
PissedAtTC4 += 6;

if(ON.Contains ("TFC5"))
PissedAtTC5 += 6;;

if(ON.Contains ("TFC6"))
PissedAtTC6 += 6;;

if(ON.Contains ("TFC7"))
PissedAtTC7 += 6;;

if(ON.Contains ("TFC8"))
PissedAtTC8 += 6;
}

function OnTriggerStay (other : Collider) {

if(TurgkinTrig.radius < 6)
return;

ON = other.name;
OT = other.transform;

if(Physics.Linecast (thisTransform.position, OT.position, targetLayersM))
return;

if(ON.Contains ("TC")){
if(OT != TurgkinTC){

if(ON.Contains ("C0"))
if(PissedAtTC0 > 0){
target = OT;
TurgkinTrig.radius = 0.1;
PissedOffLevel = 10;
RelaxedLevel = 0;
if(TurgRangedMorphLevel > 32)
Weapon.Firing = UsingRanged;
}

if(ON.Contains ("C1"))
if(PissedAtTC1 > 0){
target = OT;
TurgkinTrig.radius = 0.1;
PissedOffLevel = 10;
RelaxedLevel = 0;
if(TurgRangedMorphLevel > 32)
Weapon.Firing = UsingRanged;
}

if(ON.Contains ("C2"))
if(PissedAtTC2 > 0){
target = OT;
TurgkinTrig.radius = 0.1;
PissedOffLevel = 10;
RelaxedLevel = 0;
if(TurgRangedMorphLevel > 32)
Weapon.Firing = UsingRanged;
}

if(ON.Contains ("C3"))
if(PissedAtTC3 > 0){
target = OT;
TurgkinTrig.radius = 0.1;
PissedOffLevel = 10;
RelaxedLevel = 0;
if(TurgRangedMorphLevel > 32)
Weapon.Firing = UsingRanged;
}

if(ON.Contains ("C4"))
if(PissedAtTC4 > 0){
target = OT;
TurgkinTrig.radius = 0.1;
PissedOffLevel = 10;
RelaxedLevel = 0;
if(TurgRangedMorphLevel > 32)
Weapon.Firing = UsingRanged;
}

if(ON.Contains ("C5"))
if(PissedAtTC5 > 0){
target = OT;
TurgkinTrig.radius = 0.1;
PissedOffLevel = 10;
RelaxedLevel = 0;
if(TurgRangedMorphLevel > 32)
Weapon.Firing = UsingRanged;
}

if(ON.Contains ("C6"))
if(PissedAtTC6 > 0){
target = OT;
TurgkinTrig.radius = 0.1;
PissedOffLevel = 10;
RelaxedLevel = 0;
if(TurgRangedMorphLevel > 32)
Weapon.Firing = UsingRanged;
}

if(ON.Contains ("C7"))
if(PissedAtTC7 > 0){
target = OT;
TurgkinTrig.radius = 0.1;
PissedOffLevel = 10;
RelaxedLevel = 0;
if(TurgRangedMorphLevel > 32)
Weapon.Firing = UsingRanged;
}

if(ON.Contains ("C8"))
if(PissedAtTC8 > 0){
target = OT;
TurgkinTrig.radius = 0.1;
PissedOffLevel = 10;
RelaxedLevel = 0;
if(TurgRangedMorphLevel > 32)
Weapon.Firing = UsingRanged;
}

if(target){
if(PissedOffLevel < 20){

if(target.name.Contains ("rok"))
Weapon.Firing = false;

if(PissedAtTC0 < 1)
if(target.name.Contains ("C0"))
Weapon.Firing = false;

if(PissedAtTC1 < 1)
if(target.name.Contains ("C1"))
Weapon.Firing = false;

if(PissedAtTC2 < 1)
if(target.name.Contains ("C2"))
Weapon.Firing = false;

if(PissedAtTC3 < 1)
if(target.name.Contains ("C3"))
Weapon.Firing = false;

if(PissedAtTC4 < 1)
if(target.name.Contains ("C4"))
Weapon.Firing = false;

if(PissedAtTC5 < 1)
if(target.name.Contains ("C5"))
Weapon.Firing = false;

if(PissedAtTC6 < 1)
if(target.name.Contains ("C6"))
Weapon.Firing = false;

if(PissedAtTC7 < 1)
if(target.name.Contains ("C7"))
Weapon.Firing = false;

if(PissedAtTC8 < 1)
if(target.name.Contains ("C8"))
Weapon.Firing = false;

if(PissedAtTC9 < 1)
if(target.name.Contains ("C9"))
Weapon.Firing = false;

}
}

if(TurgMeleeMorphLevel > 32){
if(Dist < 2 || Obstacle)
RHandReadySwipe1 = true;
}else{
if(Dist < 2 || Obstacle)
RHandReadyJab1 = true;
}



if(ON != RememberedName){
if(PissedOffLevel < 8){
StressLevel += 2;
Interest = 8;
target = OT;
TurgkinTrig.radius = 0.1;

if(StressLevel > 24){
PissedOffLevel += 2;
RelaxedLevel = 0;
if(PissedOffLevel > 8){
target = OT;
PissedOffLevel = 4;
StressLevel = 0;
Weapon.Firing = UsingRanged;
}
}
}
}else{
if(Dist < 32){
StressLevel += 1;
TurgkinTrig.radius = 0.1;
if(StressLevel > 32){
PissedOffLevel += 2;
RelaxedLevel = 0;
if(PissedOffLevel > 8){
target = OT;
if(TypeCytchau)
PissedOffLevel = 20;
else
PissedOffLevel = 30;
StressLevel = 0;
Weapon.Firing = UsingRanged;
}
}
}
}

}
}else{
if(PissedOffLevel < 20)
Weapon.Firing = false;
}
}

function Ticker () {

if(LifeForce > 8){
if(Dist < 2.5){
UsingMelee = true;
UsingRanged = false;
Weapon.Firing = false;
}else{
if(!Obstacle){
UsingRanged = true;
UsingMelee = false;
}else{
UsingMelee = true;
UsingRanged = false;
Weapon.Firing = false;
}
}
}else{
UsingRanged = false;
UsingMelee = false;
}

if(PissedOffLevel < 1){
if(RelaxedLevel < 8)
RelaxedLevel += 1;
}else{
RelaxedLevel = 0;
}

if(LifeForce > 8){
DamageScript.NoArmor = false;
DamageScript.LightArmor = true;
}else{
DamageScript.NoArmor = true;
DamageScript.LightArmor = false;
}

if(Weapon.Firing)
TurgkinTC.name = "sTC0a";
else
TurgkinTC.name = "sTC0";

if(!target){
Weapon.Firing = false;
}else{
RememberedName = target.name;
}

if(StressLevel > 0)
StressLevel -= 1;

if(PissedOffLevel > 0)
PissedOffLevel -= 1;

if(PissedAtTC0 > 0)
PissedAtTC0 -= 1;

if(PissedAtTC1 > 0)
PissedAtTC1 -= 1;

if(PissedAtTC2 > 0)
PissedAtTC2 -= 1;

if(PissedAtTC3 > 0)
PissedAtTC3 -= 1;

if(PissedAtTC4 > 0)
PissedAtTC4 -= 1;

if(PissedAtTC5 > 0)
PissedAtTC5 -= 1;

if(PissedAtTC6 > 0)
PissedAtTC6 -= 1;

if(PissedAtTC7 > 0)
PissedAtTC7 -= 1;

if(PissedAtTC8 > 0)
PissedAtTC8 -= 1;

if(PissedAtTC9 > 0)
PissedAtTC9 -= 1;

if(Stuckage > 3){
Stuck = true;
Stuckage = 0;
}else{
var lastPos : Vector3 = thisTransform.position;
Stuckneurysms(lastPos);
Stuck = false;
}

if(Interest < 1){
if(PissedOffLevel < 1){

if(!TypeCydaz)
StressLevel -= 1;

target = null;
}
}else{
Interest -= 1;
}

var randomValueKD : int = 1;

if(TypeCytarg)
randomValueKD = Random.Range(0, 8);
else
randomValueKD = Random.Range(0, 3);

switch (randomValueKD) {
case 0:
KeepDistance = false;
break;
case 1:
KeepDistance = false;
break;
case 2:
KeepDistance = true;
break;
case 3:
KeepDistance = true;
break;
case 4:
KeepDistance = true;
break;
case 5:
KeepDistance = true;
break;
case 6:
KeepDistance = true;
break;
case 7:
KeepDistance = true;
break;
}

Turning = false;

Obstacle = false;

}

function Stuckneurysms(lastPos : Vector3){

yield WaitForSeconds (0.8);

if(Vector3.Distance(thisTransform.position, lastPos) < 1)
if(!target)
Stuckage += 1;

}

function Escape (){

PissedOffLevel = 0;

Escaping = true;
yield WaitForSeconds (2);
Escaping = false;
}

function Despawn (){
StuffSpawner.TheNPC0091N -= 1;
Destroy(TurgkinPTF.gameObject);
}

function Kill (){

var Spawnionaise = Resources.Load("NPCs/CykinDut", GameObject) as GameObject;
var _SpawnedObject3 = Instantiate(Spawnionaise, thisTransform.position, thisTransform.rotation);
    _SpawnedObject3.transform.GetChild(0).rigidbody.velocity = TurgkinRB.velocity * 1;
    _SpawnedObject3.transform.GetChild(0).transform.GetChild(0).transform.GetComponent(DutCykinAI).IsNewlyCreated = true;
     if(TypeCydaz)
    _SpawnedObject3.transform.GetChild(0).transform.GetChild(0).transform.GetComponent(DutCykinAI).TypeCydaz = true;
     if(TypeCytarg)
    _SpawnedObject3.transform.GetChild(0).transform.GetChild(0).transform.GetComponent(DutCykinAI).TypeCytarg = true;
     if(TypeCytchau)
    _SpawnedObject3.transform.GetChild(0).transform.GetChild(0).transform.GetComponent(DutCykinAI).TypeCytchau = true;
    
    StuffSpawner.TheNPC0091N -= 1;
    DamageScript.DestroySequence();
}