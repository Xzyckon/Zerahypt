var Point : Transform;

var target : Transform;

var MainVessel : Transform;

var CanLockOn : boolean;

var Locked : boolean;

var targetLayers : LayerMask;

var targetLayers2 : LayerMask;

function Start (){
Point = GameObject.Find("AimPointTarget").gameObject.transform;
}

function Update () {
if(WorldInformation.playerCar == MainVessel.name) {

if(Input.GetMouseButtonDown(1)){
if(Locked){
Locked = false;
target = null;
CallButton.CallingLock0 = true;
}
}

if(Input.GetMouseButton(1)){
var hit : RaycastHit;
var hit2 : RaycastHit;

if(CanLockOn){
if(!Locked){
if(Physics.Raycast(transform.position, -transform.up, hit2, Mathf.Infinity, targetLayers2)) {
if(hit2.collider.name.Contains ("TC")){
if(!hit2.collider.name.Contains ("TC1")){
if(!hit2.collider.name.Contains ("_P")){
Locked = true;
target = hit2.transform;
CallButton.LockedName = hit2.collider.name;
CallButton.CallingLock1 = true;
}
}
}
}
}
}

if(Physics.Raycast(transform.position, -transform.up, hit, Mathf.Infinity, targetLayers)) {
Point.position = hit.point;
}else{
Point.position = transform.position + -transform.up * 1000;
}
}
}
}