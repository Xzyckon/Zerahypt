var targetXB : Transform;

var target : Transform;

var targetAI : DutOotController;

var targetPiri : Transform;
var ootRB : Rigidbody;
var ootTF : Transform;
var ootTC : Transform;
var ootTrig : SphereCollider;
var thisTransform : Transform;
var Model : Transform;
var Model2 : Transform;
var Model3 : Transform;
var topTF : Transform;
var Blur : ParticleSystem;

var FX1 : ParticleSystem;
var FX2 : ParticleSystem;

var newColor : Color;

var aimForce : float = 0.1;

var hoverForce : float = 0.0001;
var hoverCurve : AnimationCurve = new AnimationCurve();

var ootSizeCurve : AnimationCurve = new AnimationCurve();

var lifetime = 8;

var ootGrowth = 1;

var protoCykinGrowth = 0;

var IsFading : boolean;
var IsMerging : boolean;
var IsSacrificing : boolean;

var IsColonist : boolean;

var SpawningCykin : boolean;

var SpawningCydaz : boolean;
var SpawningCytarg : boolean;
var SpawningCytchau : boolean;

var targetLayers : LayerMask;

InvokeRepeating("Ticker", Random.Range (0.1, 0.9), 1);

function Start () {

ootTF.parent.transform.parent = null;

lifetime = Random.Range (8, 64);

newColor = Model.renderer.material.GetColor("_Color");

targetPiri = PlayerInformation.instance.Pirizuka;

ootRB.mass = ootGrowth * 0.001;

StuffSpawner.TheNPC0805N += 1;

}

function FixedUpdate () {

var hit : RaycastHit;

thisTransform.position = ootTF.transform.position;

if(Blur.startColor.a < 0.5 && !IsFading && !IsMerging)
Blur.startColor.a += 0.002;

if(!IsFading && !IsMerging){
if(ootGrowth < 4){
if(newColor.a < 0.5)
newColor.a += 0.002;
else
newColor.a -= 0.002;
}else{
if(newColor.a < 0.25)
newColor.a += 0.001;
else
newColor.a -= 0.001;

if(topTF.localPosition.z < ootGrowth * 0.15)
topTF.localPosition.z += 0.003;
else
topTF.localPosition.z -= 0.003;
}
}

if(ootGrowth < 1)
if(Vector3.Distance(thisTransform.position, targetPiri.position) < 1.5){
IsFading = true;
Blur.startColor.a -= 0.002;
newColor.a -= 0.002;
}

if(IsFading){

ootRB.AddForce(transform.forward * Random.Range (0.0001 * ootGrowth, 0.0003 * ootGrowth));

if(target){
ootRB.AddForceAtPosition((target.position - thisTransform.position).normalized * aimForce, thisTransform.forward * 1);
ootRB.AddForceAtPosition((target.position - thisTransform.position).normalized * -aimForce, -thisTransform.forward * 1);

if(IsMerging)
ootRB.AddForce((target.position - thisTransform.position).normalized * 0.002);
}

IsFading = true;
Blur.startColor.a -= 0.002;
newColor.a -= 0.002;
}else{

if(!IsColonist){
if(ootTrig.radius < 64)
ootTrig.radius += 0.1;
}else{
if(ootTrig.radius < 5.5)
ootTrig.radius += 0.1;
}

if(target){
if(ootGrowth < 4){

ootRB.AddForce(transform.forward * Random.Range (0.0001 * ootGrowth, 0.0003 * ootGrowth));

ootRB.AddForceAtPosition((target.position - thisTransform.position).normalized * aimForce, thisTransform.forward * 0.3);
ootRB.AddForceAtPosition((target.position - thisTransform.position).normalized * -aimForce, -thisTransform.forward * 0.3);

ootRB.AddTorque(ootTF.up * Random.Range (-0.0001, 0.0001));
ootRB.AddTorque(ootTF.right * Random.Range (-0.0001, 0.0001));
ootRB.AddTorque(ootTF.forward * Random.Range (-0.0001, 0.0001));

}else{

if (Physics.Raycast (thisTransform.position, Vector3.down, hit, 2000, targetLayers)) {
hoverForce = hoverCurve.Evaluate(hit.distance); 
ootRB.AddForce(Vector3.up * hoverForce * 0.005);
}

ootRB.AddForceAtPosition(Vector3.up * aimForce, thisTransform.forward * 1);
ootRB.AddForceAtPosition(-Vector3.up * aimForce, -thisTransform.forward * 1);

if(!IsColonist){
if(!IsSacrificing){
if(Vector3.Distance(thisTransform.position, target.position) > 1.5)
ootRB.AddForce((target.position - thisTransform.position).normalized * 0.0003 * ootGrowth);
else
ootRB.AddForce((target.position - thisTransform.position).normalized * -0.0003 * ootGrowth);
}else{
ootRB.AddForce((target.position - thisTransform.position).normalized * 0.0003 * ootGrowth);
}
}else{
if(Vector3.Distance(thisTransform.position, target.position) > 1.5)
ootRB.AddForce((target.position - thisTransform.position).normalized * 0.0003 * ootGrowth);
else
ootRB.AddForce((target.position - thisTransform.position).normalized * -0.0003 * ootGrowth);
if(targetXB)
if(Vector3.Distance(thisTransform.position, targetXB.position) > 1.5)
ootRB.AddForce((targetXB.position - thisTransform.position).normalized * 0.00015 * ootGrowth);
}

if(ootGrowth < 16){
ootRB.AddTorque(ootTF.up * Random.Range (-0.00003, 0.00003));
ootRB.AddTorque(ootTF.right * Random.Range (-0.00003, 0.00003));
ootRB.AddTorque(ootTF.forward * Random.Range (-0.00003, 0.00003));
}

}
}else{
if(ootGrowth < 4){

ootRB.AddForce(transform.forward * Random.Range (0.0001 * ootGrowth, 0.0003 * ootGrowth));

ootRB.AddTorque(ootTF.up * Random.Range (-0.0001, 0.0001));
ootRB.AddTorque(ootTF.right * Random.Range (-0.0001, 0.0001));
ootRB.AddTorque(ootTF.forward * Random.Range (-0.0001, 0.0001));

}else{

if (Physics.Raycast (thisTransform.position, Vector3.down, hit, 2000, targetLayers)) {
hoverForce = hoverCurve.Evaluate(hit.distance); 
ootRB.AddForce(Vector3.up * hoverForce * 0.005);
}

ootRB.AddForceAtPosition(Vector3.up * aimForce, thisTransform.forward * 1);
ootRB.AddForceAtPosition(-Vector3.up * aimForce, -thisTransform.forward * 1);

if(IsColonist){

if(targetXB){
if(Vector3.Distance(thisTransform.position, targetXB.position) > 1.5)
ootRB.AddForce((targetXB.position - thisTransform.position).normalized * 0.00015 * ootGrowth);
else
ootRB.AddForce((targetXB.position - thisTransform.position).normalized * -0.0007 * ootGrowth);
}else{
IsColonist = false;
}
}

if(ootGrowth < 16){
ootRB.AddTorque(ootTF.up * Random.Range (-0.00003, 0.00003));
ootRB.AddTorque(ootTF.right * Random.Range (-0.00003, 0.00003));
ootRB.AddTorque(ootTF.forward * Random.Range (-0.00003, 0.00003));
}

}
}
}

Model.renderer.material.SetColor("_Color", newColor);
Model2.renderer.material.SetColor("_Color", newColor);
Model3.renderer.material.SetColor("_Color", newColor);

if(ootGrowth < 7){
if(ootGrowth > 3){
if(Model3.localScale.y > 0)
Model3.localScale -= Vector3(0.003,0.003,0.003);
if(Model2.localScale.y < 1)
Model2.localScale += Vector3(0.005,0.005,0.005);
if(Model.localScale.y > 0)
Model.localScale -= Vector3(0.002,0.002,0.002);
}else{
if(Model3.localScale.y > 0)
Model3.localScale -= Vector3(0.003,0.003,0.003);
if(Model2.localScale.y > 0)
Model2.localScale -= Vector3(0.003,0.003,0.003);
if(Model.localScale.y < 1)
Model.localScale += Vector3(0.005,0.005,0.005);
}
}else{
if(Model3.localScale.y < ootGrowth * 0.1)
Model3.localScale += Vector3(0.003,0.003,0.003);
else
Model3.localScale -= Vector3(0.003,0.003,0.003);
if(Model2.localScale.y > 0)
Model2.localScale -= Vector3(0.001,0.001,0.001);
}








}

function OnTriggerStay (other : Collider) {

if(IsFading || ootGrowth > 15)
return;

ON = other.name;
OT = other.transform;

if(!IsColonist){

if(ON.Contains ("OotT"))
if(OT != ootTC){

if(ootGrowth > 3){
if(ON.Contains ("mO") || ON.Contains ("bO")){

if(OT.parent.transform.GetChild(0).GetComponent(DutOotController).ootGrowth > ootGrowth){
target = OT;
}

if(OT.parent.transform.GetChild(0).GetComponent(DutOotController).IsColonist == false){
ootTrig.radius = 0.1;
}

if(ON.Contains ("xbO")){
if(Vector3.Distance(thisTransform.position, OT.position) < 3.5){
targetXB = OT;
target = OT;
IsColonist = true;
}
ootTrig.radius = 0.1;
}
}

}else{

ootTrig.radius = 0.1;

if(target){
if(Vector3.Distance(thisTransform.position, OT.position) < Vector3.Distance(thisTransform.position, target.position))
target = OT;
}else{
target = OT;
}
}

}

}else{
if(ON.Contains ("OotT"))
if(OT != ootTC){
if(ON.Contains ("mO") || ON.Contains ("bO")){
ootTrig.radius = 0.1;
target = OT;
}
}
}

}

function Ticker () {

if(target){

if(!IsFading){

if(IsColonist){
if(ootGrowth > 3){
if(targetXB)
ootGrowth = ootSizeCurve.Evaluate(Vector3.Distance(thisTransform.position, targetXB.position));
if(ootGrowth < 4){
IsColonist = false;
target = null;
}
}
}else{
if(ootGrowth > 3)
if(Vector3.Distance(thisTransform.position, target.position) < 1.5)
if(target.parent.transform.GetChild(0).GetComponent(DutOotController).IsSacrificing){
target = null;
}
}

if(target)
if(Vector3.Distance(thisTransform.position, target.position) < 0.5){
if(target.name.Contains ("OotT")){

targetAI = target.parent.transform.GetChild(0).GetComponent(DutOotController);

if(ootGrowth >= targetAI.ootGrowth){

if(targetAI.ootGrowth < 4){
targetAI.IsFading = true;
targetAI.IsMerging = true;
targetAI.target = ootTC;
ootGrowth += targetAI.ootGrowth;
ootRB.mass += targetAI.ootGrowth * 0.001;
lifetime += 64;
Destroy(target.gameObject);
//targetAI = null;
}






}else{
if(targetAI.ootGrowth < 16)
if(targetAI.ootGrowth > 3){
IsFading = true;
IsMerging = true;
targetAI.ootGrowth += ootGrowth;
target.parent.rigidbody.mass += ootGrowth * 0.001;
targetAI.lifetime += 64;
Destroy(ootTC.gameObject);
//targetAI = null;
}
}


}
}
}
}

if(IsColonist)
if(ootGrowth > 15)
ootGrowth = 12;

Blur.startSize = 1 + ootGrowth * 0.15;

if(!IsFading){
if(ootGrowth < 7){
if(ootGrowth > 3){
ootTC.name = "mOotT";

if(lifetime < 16){
IsSacrificing = true;
ootTC.name = "Soot";
}else{
IsSacrificing = false;
}

}else{
ootTC.name = "sOotT";
}
}else{
ootTC.name = "bOotT";
}

if(ootGrowth < 16){
if(!IsColonist){
if(lifetime < 1){
IsFading = true;
}else{
lifetime -= 1;
}
}
}else{
ootTC.name = "xbOotT";

if(SpawningCykin){

if(FX1.startColor.a < 0.1)
FX1.startColor.a += 0.002;

if(FX2.startSize < 1)
FX2.startSize += 0.02;
else
protoCykinGrowth += 1;

if(protoCykinGrowth > 15){
var Spawnionaise = Resources.Load("NPCs/CykinDut", GameObject) as GameObject;
var _SpawnedObject0 = Instantiate(Spawnionaise, topTF.position, topTF.rotation);
    _SpawnedObject0.transform.GetChild(0).transform.GetChild(0).transform.GetComponent(DutCykinAI).IsNewlyCreated = true;
    if(SpawningCydaz)
    _SpawnedObject0.transform.GetChild(0).transform.GetChild(0).transform.GetComponent(DutCykinAI).TypeCydaz = true;
     if(SpawningCytarg)
    _SpawnedObject0.transform.GetChild(0).transform.GetChild(0).transform.GetComponent(DutCykinAI).TypeCytarg = true;
     if(SpawningCytchau)
    _SpawnedObject0.transform.GetChild(0).transform.GetChild(0).transform.GetComponent(DutCykinAI).TypeCytchau = true;

SpawningCydaz = false;
SpawningCytarg = false;
SpawningCytchau = false;

SpawningCykin = false;
protoCykinGrowth = 0;

FX1.startColor.a = 0;
FX2.startSize = 0;

}
}else{

FX1.startColor.a = 0;
FX2.startSize = 0;

}


}












if(!SpawningCykin){

var randomValueC : int = Random.Range(0, 32);

switch (randomValueC) {
case 0:
FX2.startColor.r = 0.5;
FX2.startColor.g = 0.65;
FX2.startColor.b = 0.2;
SpawningCydaz = true;
SpawningCykin = true;
break;
case 1:
FX2.startColor.r = 0.2;
FX2.startColor.g = 0.6;
FX2.startColor.b = 0.2;
SpawningCytarg = true;
SpawningCykin = true;
break;
case 2:
FX2.startColor.r = 0.2;
FX2.startColor.g = 0.65;
FX2.startColor.b = 0.4;
SpawningCytchau = true;
SpawningCykin = true;
break;
}

}













ootRB.drag = ootGrowth * 0.1;

}else{
if(Blur.startColor.a < 0.01)
if(newColor.a < 0.01)
Despawn();
}
}


function Despawn (){
Destroy(ootTF.parent.gameObject);
StuffSpawner.TheNPC0805N -= 1;
}