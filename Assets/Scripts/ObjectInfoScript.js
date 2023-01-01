var Showing : boolean;
var MovingOut : boolean;
var MovingIn : boolean;

var metrics1 : float = 0;
var metrics2 : float = 0;
var metrics1TXT : TextMesh;
var metrics2TXT : TextMesh;
var weights1TXT : TextMesh;
var healths1TXT : TextMesh;

var mP1TF : Transform;

var SPTF : Transform;
var MPTF : Transform;
var EPTF : Transform;

var metricP1 : Vector3;
var metricP2 : Vector3;

var CallSource : AudioSource;

var docStringMem : String;

var WindowUp : AudioClip;
var ShowWindow : AudioClip;

var targetLayers : LayerMask;

function Start () {
mP1TF = PlayerInformation.instance.PiriAim;

metrics1 = 0.001;
metrics2 = 0.001;

}

function Update () {

if(Showing){

if(Input.GetMouseButton(1)){

CalcPoint();

if(Input.GetKeyDown("q")){
SetPoint();
PlayBoop();
}

}

if(Input.GetMouseButtonUp(1)){
MovingIn = true;
UnsetPoint();
}

}else{

if(Input.GetMouseButton(1)){

CalcPoint();

if(Input.GetKeyDown("q")){
SetPoint();
CallSource.clip = ShowWindow;
CallSource.Play();
MovingOut = true;
}

if(Input.GetMouseButtonUp(1)){
MovingIn = true;
MovingOut = false;
UnsetPoint();
}

}

}

}

function FixedUpdate () {
if(MovingOut){
transform.Translate(Vector3.right * -0.2);
if(transform.localPosition.x < 1){
MovingOut = false;
Showing = true;
transform.localPosition.x = 0;
}
}
if(MovingIn){
transform.Translate(Vector3.right * 0.2);
if(transform.localPosition.x > 20){
MovingIn = false;
Showing = false;
transform.localPosition.x = 20;
}
}
}

function SetPoint () {
var shit : RaycastHit;

var docString1 : String;
var docString2 : String;
var docString3 : String;

var docStringFinal : String;

docString1 = "n/a";
docString2 = "n/a";
docString3 = "n/a";

if (Physics.Raycast (mP1TF.position, mP1TF.forward, shit, 32768, targetLayers)){

















var hit_obj = shit.collider.gameObject;
var vehicle_name : String = "";

if (ObjectNameDisplayer.instance != null) 
if (hit_obj.GetComponent(ObjectInfo) != null) {
docString1 = hit_obj.GetComponent(ObjectInfo).ObjectNameTXT;
ObjectNameDisplayer.instance.UpdateName(docString1);
vehicle_name = hit_obj.GetComponent(ObjectInfo).ObjectStringName;
}

if (ObjectTypeDisplayer.instance != null)
if (hit_obj.GetComponent(ObjectInfo) != null){
//ObjectTypeDisplayer.instance.UpdateType(hit_obj.GetComponent(ObjectInfo).ObjectTypeTXT);

docString2 = hit_obj.GetComponent(ObjectInfo).ObjectTypeTXT;
ObjectTypeDisplayer.instance.UpdateType(docString2);
}

if (ObjectInfoDisplayer.instance != null)
if (hit_obj.GetComponent(ObjectInfo) != null){
//ObjectInfoDisplayer.instance.UpdateInfo(hit_obj.GetComponent(ObjectInfo).ObjectInfoTXT);

docString3 = hit_obj.GetComponent(ObjectInfo).ObjectInfoTXT;
ObjectInfoDisplayer.instance.UpdateInfo(docString3);
}

if (ObjectInfoDisplayer.instance != null)
if (hit_obj.GetComponent(ObjectInfo) != null) {
var stringcode : String = hit_obj.GetComponent(ObjectInfo).ObjectStringCode;
var vlist = VesselList.instance;
if (vlist.IsVehicleInspect(stringcode)) {
vlist.StringIn(new VehicleLinker(stringcode, vehicle_name));
}
}

if (ObjectInfoDisplayer.instance != null) {
if (hit_obj.GetComponent(ObjectInfo) != null) {
var PageGO : String = hit_obj.GetComponent(ObjectInfo).Page;
if (PageGO.length > 0)
FolderInfoDisplayer.ListContains(PageGO);

}
}

if(docString1.Contains ("n/a")){

}else{

docStringFinal = "Name :  " + docString1 + "\n" +
                 "Type :  " + docString2 + "\n" +
                 "Info :  " + docString3;

if(docStringMem != docStringFinal){
docStringMem = docStringFinal;
WriteDocumentation(docStringFinal);

}
 
}








if (hit_obj.rigidbody != null){
//var MassConv = Mathf.Ceil(hit_obj.rigidbody.mass * 1000);
//weights1TXT.text = MassConv.ToString() + " Kg";

if (hit_obj.GetComponent(VehicleDamage) != null){
healths1TXT.text = hit_obj.GetComponent(VehicleDamage).Health.ToString("F1");
if(hit_obj.GetComponent(VehicleDamage).Health < 0)
healths1TXT.text = ("Non-serviceable");
}else{
healths1TXT.text = ("Not Available");
}

CalculateWeight(hit_obj.gameObject);

}else{
weights1TXT.text = ("Not Available");
healths1TXT.text = ("Not Available");

if(hit_obj.transform.parent.rigidbody){
CalculateWeight(hit_obj.transform.parent.gameObject);


if (hit_obj.transform.parent.gameObject.GetComponent(VehicleDamage) != null){
healths1TXT.text = hit_obj.transform.parent.gameObject.GetComponent(VehicleDamage).Health.ToString("F1");
if(hit_obj.transform.parent.gameObject.GetComponent(VehicleDamage).Health < 0)
healths1TXT.text = ("Non-serviceable");
}


//Debug.Log(hit_obj.transform.parent.gameObject.name);
}

}








metricP1 = shit.point;
SPTF.position = shit.point;
MPTF.position = shit.point;
MPTF.LookAt(EPTF);
MPTF.localScale.z = 0.001;

SPTF.renderer.enabled = true;
MPTF.renderer.enabled = true;
EPTF.renderer.enabled = true;
}

}


function WriteDocumentation(dSF : String){

var tempParser : String;

tempParser = WorldInformation.DocumentationsStat + "\n_______________________________\n \n" + dSF;

yield WaitForSeconds (0.1);

WorldInformation.DocumentationsStat = tempParser;
WorldInformation.instance.objectsScanned = true;
}



function CalculateWeight(obj : GameObject){
// Find the highest rigidbody above (sort of)
var top : GameObject;

top = obj;

if(top.transform.parent)
if(top.transform.parent.gameObject.rigidbody)
top = top.transform.parent.gameObject;

if(top.transform.parent)
if(top.transform.parent.gameObject.rigidbody)
top = top.transform.parent.gameObject;

if(top.transform.parent)
if(top.transform.parent.gameObject.rigidbody)
top = top.transform.parent.gameObject;

//sum the masses of all the children of the top object we found
var totalWeight : float =  0;
var allRigidbodies = top.GetComponentsInChildren(Rigidbody);
for (var rb: Rigidbody in allRigidbodies) {
totalWeight += rb.mass;
}

var MassConv = totalWeight * 1000;

if(MassConv >= 1)
weights1TXT.text = MassConv.ToString("F0") + " Kg";
else
weights1TXT.text = "Less than 1 Kg";
}



function CalcPoint () {
var chit : RaycastHit;

metrics1 = Vector3.Distance(metricP1, metricP2);
metrics2 = metrics1 * 0.666;
metrics1TXT.text = metrics1.ToString("F0") + " Zets";
metrics2TXT.text = metrics2.ToString("F2") + " Metres";

if (Physics.Raycast (mP1TF.position, mP1TF.forward, chit, 32768, targetLayers)){
metricP2 = chit.point;
EPTF.position = chit.point;
MPTF.LookAt(EPTF);
MPTF.localScale.z = metrics2;
}
}

function UnsetPoint () {
SPTF.renderer.enabled = false;
MPTF.renderer.enabled = false;
EPTF.renderer.enabled = false;

ObjectNameDisplayer.instance.UpdateName("Not Available");
ObjectTypeDisplayer.instance.UpdateType("Not Available");
ObjectInfoDisplayer.instance.UpdateInfo("Not Available");
}

function PlayBoop () {

CallSource.volume = 0.25;
yield WaitForSeconds (0.002);
CallSource.volume = 0.2;
yield WaitForSeconds (0.002);
CallSource.volume = 0.15;
yield WaitForSeconds (0.002);
CallSource.volume = 0.1;
yield WaitForSeconds (0.002);
CallSource.volume = 0.05;
yield WaitForSeconds (0.002);
CallSource.volume = 0;
CallSource.clip = WindowUp;
CallSource.Play();
CallSource.volume = 0.3;
}