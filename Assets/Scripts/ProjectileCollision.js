var FX: GameObject;

var GroundHit: GameObject;
var MetalHit: GameObject;
var StructureHit: GameObject;
var LiquidHit: GameObject;
var BodyHit: GameObject;
var BodyHitPeuk: GameObject;
var targetLayers : LayerMask;

var Damage = 0;
var DamageCode = 0;

var PlayerShot : boolean;

var kineticCollision : boolean;

var instantaneous : boolean;

var startPoint : float = 0;
var range : float = 0;

var Lifetime = 4;

var ProjectileMass : float = 0;

var Point : Vector3;

var Solid : boolean;

var C1 : boolean;
var C2 : boolean;

var Away : boolean;

static var StatDamage = 0;

function Start () {

if(!instantaneous){
transform.parent = null;
ProjectileMass = rigidbody.mass * 20000;
}

if(DamageCode != 2){
if(WorldInformation.instance.AreaKabrian == true){
if(AgrianNetwork.instance.AlertTime < 60){
AgrianNetwork.instance.PriorityWaypoint.position = transform.position;
AgrianNetwork.instance.AlertTime = 60;
}
}
}else{

if(PlayerShot){

AgrianNetwork.instance.Curiosity += 20;

if(AgrianNetwork.instance.Curiosity > 200){
AgrianNetwork.instance.PriorityWaypoint.position = transform.position;
if(AgrianNetwork.TC1CriminalLevel > 500 && AgrianNetwork.instance.Curiosity > 500){
AgrianNetwork.instance.FullPriorityWaypoint.position = transform.position;
WorldInformation.PiriExposed = 120;
}
}

}

}

if(PlayerShot){

KabrianLaw.Amount1 += Damage - 32;

if(DamageCode == 1){
WorldInformation.PiriExposed = 60;
}else{
if(WorldInformation.PiriExposed > 1){
DamageCode = 1;
transform.name = "TFC1";
}
if(DamageCode == 7)
TCChanger.DidShootNum = 60;
}

}

yield WaitForSeconds (0.02);
if(FX && !C2){
FX.SetActive (true);
}

yield WaitForSeconds(Lifetime);
Destroy(gameObject);
}

function FixedUpdate () {

if(!instantaneous){
var VelClamp = Mathf.Clamp(rigidbody.velocity.magnitude,2,1024);

if (rigidbody.velocity != Vector3.zero)
if (!C1 && Away && !kineticCollision)
transform.rotation = Quaternion.LookRotation(rigidbody.velocity);
}

var hit : RaycastHit;
var num : float;

if (!kineticCollision)
num = 0.05;
else
num = 1;

if(instantaneous){

if(!C1){
if (Physics.Raycast (transform.position + transform.forward * startPoint, transform.forward, hit, range, targetLayers)){

Point = hit.point;

C1 = true;

var NormalAngleI = Quaternion.LookRotation(hit.normal);

var TheHitI = Instantiate(GroundHit, Point, NormalAngleI);
TheHitI.transform.parent = hit.collider.transform;

}else{

C1 = true;

}
}

}else{

if (Physics.Raycast (transform.position, transform.forward, hit, VelClamp * num, targetLayers) && !C1){
var relativePoint = hit.transform.InverseTransformPoint(transform.position);

FAndB = relativePoint.y;

Point = hit.point;

C1 = true;

if (hit.collider.gameObject.GetComponent(VehicleDamage) != null) {
hit.collider.gameObject.GetComponent(VehicleDamage).DamageIn(Damage, DamageCode, FAndB, PlayerShot);
}

if (hit.collider.gameObject.GetComponent(SubDamage) != null) {
hit.collider.gameObject.GetComponent(SubDamage).DamageIn(Damage, DamageCode, PlayerShot);
}

if (hit.collider.gameObject.GetComponent(ReactiveObject) != null) {
hit.collider.gameObject.GetComponent(ReactiveObject).DamageIn(Damage, DamageCode);
}

if(hit.rigidbody){
hit.rigidbody.AddForceAtPosition (transform.forward * ProjectileMass, hit.point);
}else{
if(hit.transform.parent)
if(hit.transform.parent.gameObject.rigidbody)
hit.transform.parent.gameObject.rigidbody.AddForceAtPosition (transform.forward * ProjectileMass, hit.point);
}

var NormalAngle = Quaternion.LookRotation(hit.normal);

if(!Solid){

if (!C2)
if (hit.collider.tag == "BodyPeuk"){
var TheHit0 = Instantiate(BodyHitPeuk, Point, NormalAngle);
TheHit0.transform.parent = hit.collider.transform;
Next();
}

if (!C2)
if (hit.collider.tag == "Body"){
var TheHit1 = Instantiate(BodyHitPeuk, Point, NormalAngle);
TheHit1.transform.parent = hit.collider.transform;
Next();
}

if (!C2)
if (hit.collider.tag == "TransparentCol"){
C2 = true;
Instantiate(LiquidHit, Point, LiquidHit.transform.rotation);
Next();
}

if (!C2){
C2 = true;
Instantiate(GroundHit, Point, NormalAngle);
Next();
}

}else{

if (!C2)
if (hit.collider.tag == "TransparentCol"){
C2 = true;
Instantiate(LiquidHit, Point, LiquidHit.transform.rotation);
Next();
}

if (!C2)
if (hit.collider.tag == "Metal" || hit.collider.tag == "MetalStructure" || hit.collider.tag == "Vehicle"){
C2 = true;
Instantiate(MetalHit, Point, transform.rotation);
Next();
}

if (!C2)
if (hit.collider.tag == "SoftTerrain"){
C2 = true;
		
Instantiate(GroundHit, Point, NormalAngle);
Next();
}

if (!C2)
if (hit.collider.tag == "Terrain" || hit.collider.tag == "Structure"){
C2 = true;
Instantiate(StructureHit, Point, StructureHit.transform.rotation);
Next();
}

if (!C2)
if (hit.collider.tag == "BodyPeuk"){
C2 = true;
var TheHit2 = Instantiate(BodyHitPeuk, Point, NormalAngle);
TheHit2.transform.parent = hit.collider.transform;
Next();
}

if (!C2)
if (hit.collider.tag == "Body"){
C2 = true;
var TheHit3 = Instantiate(BodyHitPeuk, Point, NormalAngle);
TheHit3.transform.parent = hit.collider.transform;
Next();
}

}
}

}

Away = true;

}

function Next (){
if(FX)
FX.SetActive (false);
rigidbody.velocity = Vector3.zero;
yield WaitForSeconds(0.3);
Destroy(gameObject);
}