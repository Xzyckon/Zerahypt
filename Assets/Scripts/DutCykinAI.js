var target : Transform;

var CykinRB : Rigidbody;
var CykinTF : Transform;
var CykinPTF : Transform;
var CykinTC : Transform;
var CykinTrig : SphereCollider;
var thisTransform : Transform;

var DamageScript : VehicleDamage;

var CykinWS : WingScript;

var CykinFXGO : GameObject;

var FX1 : ParticleSystem;
var FX2 : ParticleSystem;
var FX3 : ParticleSystem;
var FX4 : ParticleSystem;

var FX2R : float = 0.9;
var FX2G : float = 0.9;
var FX2B : float = 0.9;

var BsC : float = 0;

var OffensePrefab : GameObject;

var IsNewlyCreated : boolean;

var TypeCydaz : boolean;
var TypeCytarg : boolean;
var TypeCytchau : boolean;

var Escaping : boolean;

var Transforming : boolean;

var aimForce : float = 0.1;

var hoverForce : float = 0.0001;
var hoverCurve : AnimationCurve = new AnimationCurve();

var CykinGrowth : float = 1;

var StrikeNum = 1;

var targetLayers : LayerMask;

InvokeRepeating("Ticker", Random.Range (0.1, 0.9), 1);

function Start () {

CykinTF.parent.transform.parent = null;

if(IsNewlyCreated)
DamageScript.RestartFromOne();

if(!TypeCydaz && !TypeCytarg && !TypeCytchau){

var randomValueC : int = Random.Range(0, 3);

switch (randomValueC) {
case 0:
FX2.startColor.r = 0.5;
FX2.startColor.g = 0.65;
FX2.startColor.b = 0.2;
TypeCydaz = true;
CykinRB.drag = 0.2;
CykinRB.angularDrag = 6;
break;
case 1:
FX2.startColor.r = 0.2;
FX2.startColor.g = 0.6;
FX2.startColor.b = 0.2;
TypeCytarg = true;
CykinRB.drag = 0.5;
CykinRB.angularDrag = 4;
break;
case 2:
FX2.startColor.r = 0.2;
FX2.startColor.g = 0.65;
FX2.startColor.b = 0.4;
TypeCytchau = true;
CykinRB.drag = 0.3;
CykinRB.angularDrag = 4;
break;
}

}else{

if(TypeCydaz){
FX2.startColor.r = 0.5;
FX2.startColor.g = 0.65;
FX2.startColor.b = 0.2;
CykinRB.drag = 0.2;
CykinRB.angularDrag = 6;
}

if(TypeCytarg){
FX2.startColor.r = 0.2;
FX2.startColor.g = 0.6;
FX2.startColor.b = 0.2;
CykinRB.drag = 0.5;
CykinRB.angularDrag = 4;
}

if(TypeCytchau){
FX2.startColor.r = 0.2;
FX2.startColor.g = 0.65;
FX2.startColor.b = 0.4;
CykinRB.drag = 0.3;
CykinRB.angularDrag = 4;
}

}

StuffSpawner.TheNPC009N += 1;

yield WaitForSeconds (1);

IsNewlyCreated = false;

}

function FixedUpdate () {

var hit : RaycastHit;

thisTransform.position = CykinTF.position;

if(IsNewlyCreated)
return;

if(Transforming){

FX1.startColor.a -= 0.005;
FX2.startColor.a -= 0.005;
FX3.startColor.a -= 0.005;
FX4.startColor.a -= 0.005;

if(FX4.startColor.a == 0)
Despawn();

}else{

FX1.startSize = 0.03 + CykinGrowth * 0.028;
FX2.startSize = 1 + CykinGrowth * 0.28;
FX3.startSize = 1 + CykinGrowth * 0.28;
FX4.startSize = 0.6 + CykinGrowth * 0.09;

BsC = CykinGrowth * 0.08;

if(FX3.startColor.a < BsC){
if(FX3.startColor.a < 0.25)
FX3.startColor.a += 0.002;
}else{
FX3.startColor.a -= 0.002;
}

if(CykinGrowth > 2)
FX4.startColor.a += 0.01;
else
FX4.startColor.a -= 0.01;

FX4.emissionRate = CykinGrowth * 8;

if(CykinTrig.radius < 32)
CykinTrig.radius += 0.1;

if(target){

CykinRB.AddForce(transform.forward * Random.Range (0.0005, 0.0015));

if(!Escaping){
CykinRB.AddForceAtPosition((target.position - thisTransform.position).normalized * aimForce, thisTransform.forward * 0.3);
CykinRB.AddForceAtPosition((target.position - thisTransform.position).normalized * -aimForce, -thisTransform.forward * 0.3);
}else{
CykinRB.AddForceAtPosition((target.position - thisTransform.position).normalized * aimForce, -thisTransform.forward * 0.3);
CykinRB.AddForceAtPosition((target.position - thisTransform.position).normalized * -aimForce, thisTransform.forward * 0.3);
}

CykinRB.AddTorque(CykinTF.up * Random.Range (-0.0001, 0.0001));
CykinRB.AddTorque(CykinTF.right * Random.Range (-0.0001, 0.0001));
CykinRB.AddTorque(CykinTF.forward * Random.Range (-0.0001, 0.0001));

}else{

CykinRB.AddForce(transform.forward * Random.Range (0.0005, 0.0015));

CykinRB.AddTorque(CykinTF.up * Random.Range (-0.0001, 0.0001));
CykinRB.AddTorque(CykinTF.right * Random.Range (-0.0001, 0.0001));
CykinRB.AddTorque(CykinTF.forward * Random.Range (-0.0001, 0.0001));

}

if (Physics.Raycast (thisTransform.position, Vector3.down, hit, 2000, targetLayers)) {
hoverForce = hoverCurve.Evaluate(hit.distance); 
CykinRB.AddForce(Vector3.up * hoverForce * 0.005);
}

}





}

function OnTriggerStay (other : Collider) {

if(Transforming)
return;

ON = other.name;
OT = other.transform;

if(ON.Contains ("TC"))
if(OT != CykinTC){

CykinTrig.radius = 0.1;

if(target){
if(Vector3.Distance(thisTransform.position, OT.position) < Vector3.Distance(thisTransform.position, target.position))
target = OT;
}else{
target = OT;
}

}

}

function Ticker () {

if(Transforming)
return;

if(target){

if(TypeCydaz)
if(StrikeNum < 1)
StrikeNum = CykinGrowth * 1.5;

if(TypeCytarg)
if(StrikeNum < 1)
StrikeNum = CykinGrowth * 2;

if(TypeCytchau){
if(StrikeNum < 1)
StrikeNum = CykinGrowth * 3;
if(Vector3.Distance(thisTransform.position, target.position) < 2 + CykinGrowth * 0.4)
Escape();
}

StrikeNum -= 1;

if(StrikeNum < 1)
if(Vector3.Distance(thisTransform.position, target.position) < 1.5 + CykinGrowth * 0.4)
if(target.name.Contains ("TC")){
var _SpawnedObject1 = Instantiate(OffensePrefab, thisTransform.position, thisTransform.rotation);
    _SpawnedObject1.rigidbody.velocity = CykinRB.velocity;
    _SpawnedObject1.transform.GetComponent(MissileScript).target = target;
    TCResetter();
}

}

if(FX1.startColor.a < 0.1)
FX1.startColor.a += 0.002;

if(FX2.startSize < 1)
FX2.startSize += 0.02;

CykinGrowth = DamageScript.Health;

if(CykinGrowth < 3){
CykinTC.name = "tTC0";
}else{
CykinTC.name = "sTC0";

if(CykinGrowth > 4){
Transforming = true;
var Spawnionaise = Resources.Load("NPCs/TurgkinDut", GameObject) as GameObject;
var _SpawnedObject3 = Instantiate(Spawnionaise, thisTransform.position, thisTransform.rotation);
    _SpawnedObject3.transform.GetChild(0).rigidbody.velocity = CykinRB.velocity * 1;
    _SpawnedObject3.transform.GetChild(0).transform.GetChild(0).transform.GetComponent(DutTurgkinAI).IsNewlyCreated = true;
    if(TypeCydaz)
    _SpawnedObject3.transform.GetChild(0).transform.GetChild(0).transform.GetComponent(DutTurgkinAI).TypeCydaz = true;
     if(TypeCytarg)
    _SpawnedObject3.transform.GetChild(0).transform.GetChild(0).transform.GetComponent(DutTurgkinAI).TypeCytarg = true;
     if(TypeCytchau)
    _SpawnedObject3.transform.GetChild(0).transform.GetChild(0).transform.GetComponent(DutTurgkinAI).TypeCytchau = true;

StuffSpawner.TheNPC009N -= 1;
    
CykinPTF.parent = _SpawnedObject3.transform.GetChild(0).transform;
Destroy(CykinRB);
Destroy(CykinWS);
Destroy(CykinTrig);
Destroy(DamageScript);
Destroy(CykinTC.gameObject);

}
}

}

function TCResetter () {
CykinTC.name = "TC0a";
yield WaitForSeconds (6);
if(CykinTC)
CykinTC.name = "TC0";
}

function Escape (){
Escaping = true;
yield WaitForSeconds (4);
Escaping = false;
}

function Despawn (){
StuffSpawner.TheNPC009N -= 1;
Destroy(CykinPTF.gameObject);
}

function Kill (){
StuffSpawner.TheNPC009N -= 1;
DamageScript.DestroySequence();
}