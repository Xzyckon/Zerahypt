
var target : Transform;

var waypoint : Transform;

var home : Transform;

var ally : Transform;

var ForceY : float;
var ForceX : float;

var thisTransform : Transform;
var thisVTransform : Transform;

var thisRigidbody : Rigidbody;

var Trig : SphereCollider;

var TC : GameObject;

var isOotSensor : boolean;
var isOotPurger : boolean;
var isGasController : boolean;
var isCommunityRune : boolean;

var foundOot : boolean;
var foundOotkin : boolean;

var Sound1: AudioClip;
var Sound2: AudioClip;

var RuneNoise: AudioSource;

var targetLayers : LayerMask;

var Tick = 0;

function Start () {
if(isGasController){

}
}

function Update () {

thisTransform.rotation = thisVTransform.rotation;
thisTransform.position = thisVTransform.position;
}

function FixedUpdate () {

var hit : RaycastHit;

if(isGasController){
thisRigidbody.AddTorque(thisVTransform.forward * Random.Range (0.00002, 0.00004));
thisRigidbody.AddTorque(thisVTransform.right * Random.Range (-0.00005, 0.00005));
}else{
thisRigidbody.AddTorque(thisVTransform.up * Random.Range (0.00001, 0.00002));
thisRigidbody.AddForceAtPosition(Vector3.up * 0.00002, thisVTransform.up * 1);
thisRigidbody.AddForceAtPosition(-Vector3.up * 0.00002, -thisVTransform.up * 1);
}

if(target){
if(isGasController){
thisRigidbody.AddForce((target.position - thisVTransform.position).normalized * Random.Range (0.00001, 0.0001));
}else{
thisRigidbody.AddForce((target.position - thisVTransform.position).normalized * 0.0001);
}
}else{

ForceY += Random.Range (-0.00001, 0.00001);
ForceX += Random.Range (-0.00001, 0.00001);

if(-ForceY > 0.00005)
ForceY = -0.00005;
if(ForceY > 0.00005)
ForceY = 0.00005;

if(-ForceX > 0.00005)
ForceX = -0.00005;
if(ForceX > 0.00005)
ForceX = 0.00005;

thisRigidbody.AddForce(thisVTransform.up * ForceY);
thisRigidbody.AddForce(thisVTransform.right * ForceX);
}

if (Physics.Raycast (thisVTransform.position, Vector3.down, hit, 2, targetLayers))
		     thisRigidbody.AddForce(Vector3.up * 0.00007);
if (!Physics.Raycast (thisVTransform.position, Vector3.down, hit, 5, targetLayers))
		     thisRigidbody.AddForce(Vector3.up * -0.00007);
		     
Tick += Random.Range (1, 3);

if(Tick > 180){
Tick = 0;
Ticker();
}

}

function OnTriggerStay (other : Collider) {

if(!home){
if(isCommunityRune){
if(other.name.Contains ("CR1"))
home = other.transform;
}else{
if(other.name.Contains ("CR2"))
home = other.transform;
}
}

if(isOotPurger){

if(!ally){
if(other.name.Contains ("RuneNot"))
if(!Physics.Linecast (thisVTransform.position, other.transform.position, targetLayers))
ally = other.transform;
}

if(other.name.Contains ("Ootkin")){
if (!Physics.Linecast (thisVTransform.position, other.transform.position, targetLayers)){
target = other.transform;
Trig.radius = 1;
}
}
}

if(isOotSensor){
if(other.name.Contains ("Oot")){

if(other.name.Contains ("Ootkin")){
if (!Physics.Linecast (thisVTransform.position, other.transform.position, targetLayers)){
foundOotkin = true;
}
}

if(Trig.radius > 16){
if (!Physics.Linecast (thisVTransform.position, other.transform.position, targetLayers)){
foundOot = true;
}
}

}
}

}


function Ticker () {

if(isCommunityRune){
if(home)
if(Vector3.Distance(thisVTransform.position, home.position) > 12)
target = home;
}else{
if(isGasController){

var newPosition : Vector3 = Random.insideUnitSphere * 16;
	waypoint.localPosition.x = newPosition.x;
	waypoint.localPosition.y = newPosition.y;
	waypoint.localPosition.z = newPosition.z;

if(home){
if(Vector3.Distance(thisVTransform.position, home.position) > 64){
target = home;
}else{
target = waypoint;
}
}
}else{
if(home)
if(Vector3.Distance(thisVTransform.position, home.position) > 32)
target = home;
}
}

if(home)
if(Vector3.Distance(thisVTransform.position, home.position) < 8)
if(target == home)
target = null;

if(isOotPurger){
if(target){

TC.name = "Rune";

if(target.name.Contains ("Ootkin")){
foundOotkin = true;
if(Vector3.Distance(thisVTransform.position, target.position) < 4){
//RuneNoise.clip = Sound1;
//RuneNoise.Play();
TC.name = "Oof";
foundOotkin = false;
}
}else{
target = null;
}

}else{
foundOotkin = false;
}

if(ally)
if(!foundOotkin)
if(ally.name.Contains ("OotNot"))
if(Vector3.Distance(thisVTransform.position, ally.position) > 6)
target = ally;

}

if(isOotSensor){

if(foundOot){
foundOot = false;
RuneNoise.clip = Sound1;
RuneNoise.Play();
Trig.radius = 0.1;
TC.name = "Rune";
}

if(foundOotkin){
foundOotkin = false;
RuneNoise.clip = Sound2;
RuneNoise.Play();
Trig.radius = 0.1;
TC.name = "OotNot";
}

if(Trig.radius > 8)
TC.name = "RuneNot";

}

if(isOotSensor){
if(Trig.radius < 48)
Trig.radius += 1;
}else{
if(Trig.radius < 18)
Trig.radius += 1;
}
}