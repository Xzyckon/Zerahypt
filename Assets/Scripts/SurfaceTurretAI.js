var upperParent : Transform;

var absoluteParent : Transform;

var localParent : Transform;

var mainVesselRB : Rigidbody;

var Remover : RemoveOverTime;

var Gun : NPCGun;

var GunGO : GameObject;
var MainGO : GameObject;

var GunRB : Rigidbody;
var MainRB : Rigidbody;

var GunCol : MeshCollider;
var MainCol : MeshCollider;

var TCTF : Transform;

var LineOfFire : boolean;

var ShootFrequency : float = 0.1;
var UniqueShootTime : float = 0.1;

var target : Transform;

var targetDestination : Transform;
var targetFinalDestination : Transform;

var TargetTrace : Transform;
var TargetLead : Transform;

var LeadCurve : AnimationCurve = new AnimationCurve();

var TargetCode = 0;

var LeadAmount : float = 0.017;

var isStationed : boolean;

var isSurvivor : boolean;

var damaged : boolean;

var braking : boolean;

var Obstacle : boolean;
var RObstacle : boolean;
var LObstacle : boolean;

var MissilePrefab : GameObject;

var thisTransform : Transform;

var viewPoint : Transform;

var gunPivot : Transform;

var midSurfacePoint : Transform;
var frontSurfacePoint : Transform;

var rightSurfacePoint : Transform;
var leftSurfacePoint : Transform;

var RelClamp : float;
var RelClampE : float;

var RelClamp2 : float;
var RelClamp2E : float;

var HitDistSplit : float;

var Dist : float;

var Accnum : float;

var targetLayers : LayerMask;

InvokeRepeating("Ticker", 1, 0.15);

InvokeRepeating("Shoot", UniqueShootTime, ShootFrequency);

function Start () {

UniqueShootTime = Random.Range(1, 2);






var gO1 = new GameObject("TT");
var gO2 = new GameObject("TL" + TargetCode);

TargetTrace = gO1.transform;
TargetLead = gO2.transform;
TargetTrace.position = transform.position;
TargetTrace.rotation = transform.rotation;
TargetLead.position = transform.position;
TargetLead.rotation = transform.rotation;
TargetTrace.parent = upperParent;
TargetLead.parent = upperParent;
gO2.layer = 29;
}

function FixedUpdate () {

if(damaged)
return;

if(target){
Dist = Vector3.Distance(thisTransform.position, target.position);
}

if(TCTF){
TCTF.rotation = thisTransform.rotation;
TCTF.position = thisTransform.position;
}

if(!targetDestination){
Damage();
damaged = true;
return;
}

if(midSurfacePoint)
var relativePointM = thisTransform.InverseTransformPoint(midSurfacePoint.position);

if(frontSurfacePoint)
var relativePointF = thisTransform.InverseTransformPoint(frontSurfacePoint.position);

if(rightSurfacePoint)
var relativePointR = thisTransform.InverseTransformPoint(rightSurfacePoint.position);

if(leftSurfacePoint)
var relativePointL = thisTransform.InverseTransformPoint(leftSurfacePoint.position);

var hit : RaycastHit;
var VPhit : RaycastHit;

Debug.DrawRay (thisTransform.position + thisTransform.up * 1, -thisTransform.up * 8, Color.red);
if (Physics.Raycast (thisTransform.position + thisTransform.up * 1, -thisTransform.up, hit, 8, targetLayers)) {
midSurfacePoint.position = hit.point;
}

Debug.DrawRay (thisTransform.position + thisTransform.up * 1 + thisTransform.forward * 2, -thisTransform.up * 8, Color.red);
if (Physics.Raycast (thisTransform.position + thisTransform.up * 1 + thisTransform.forward * 2, -thisTransform.up, hit, 8, targetLayers)) {
frontSurfacePoint.position = hit.point;
braking = false;
}else{
braking = true;
}

Debug.DrawRay (thisTransform.position + thisTransform.up * 1 + thisTransform.right * 1, -thisTransform.up * 8, Color.red);
if (Physics.Raycast (thisTransform.position + thisTransform.up * 1 + thisTransform.right * 1, -thisTransform.up, hit, 8, targetLayers)) {
rightSurfacePoint.position = hit.point;
}

Debug.DrawRay (thisTransform.position + thisTransform.up * 1 + -thisTransform.right * 1, -thisTransform.up * 8, Color.red);
if (Physics.Raycast (thisTransform.position + thisTransform.up * 1 + -thisTransform.right * 1, -thisTransform.up, hit, 8, targetLayers)) {
leftSurfacePoint.position = hit.point;
}

Debug.DrawRay (thisTransform.position + thisTransform.up * 1 + -thisTransform.forward * 2, -thisTransform.up * 8, Color.red);
if (!Physics.Raycast (thisTransform.position + thisTransform.up * 1 + -thisTransform.forward * 2, -thisTransform.up, hit, 8, targetLayers)) {
braking = false;
}

if(!isStationed){

if(targetDestination){
Dist = Vector3.Distance(thisTransform.position, targetDestination.position);
}

if(targetDestination){
var relativePoint = thisTransform.InverseTransformPoint(targetDestination.position);
var relativePointE = gunPivot.InverseTransformPoint(targetDestination.position);

LAndR = relativePoint.x;
UAndD = relativePointE.y;

RelClampE = Mathf.Clamp(UAndD / Dist,-2,2);
RelClamp = Mathf.Clamp(LAndR / Dist,-2,2);

LineOfFire = false;

gunPivot.localEulerAngles.x -= RelClampE;

if(!Obstacle)
thisTransform.localEulerAngles.y += RelClamp;

if(targetFinalDestination){
if(Vector3.Distance(thisTransform.position, targetDestination.position) < 5){

targetDestination = targetFinalDestination;
targetFinalDestination = null;

}
}else{
if(Vector3.Distance(thisTransform.position, targetDestination.position) < 2)
isStationed = true;
}





}





if(-gunPivot.localEulerAngles.x < 180)
if(-gunPivot.localEulerAngles.x > 60)
gunPivot.localEulerAngles.x = -60;

if(gunPivot.localEulerAngles.x > 180){
if(gunPivot.localEulerAngles.x < 300)
gunPivot.localEulerAngles.x = 300;
}else{
if(gunPivot.localEulerAngles.x > 7)
gunPivot.localEulerAngles.x = 7;
}

//viewPoint.LookAt(targetDestination);

//Debug.DrawRay (viewPoint.position, viewPoint.forward * 8000, Color.yellow);
//if (Physics.Raycast (viewPoint.position, viewPoint.forward, VPhit, 8000, targetLayers)){
//Debug.Log(VPhit.transform.name);
//braking = true;
//}

thisTransform.position += thisTransform.forward * Accnum;

if(!braking){
if(Accnum < 0.1)
Accnum += 0.002;
else
Accnum = 0.1;

thisTransform.localEulerAngles.x -= relativePointF.y * 4;
thisTransform.localEulerAngles.z += relativePointR.y * 4;
thisTransform.localEulerAngles.z -= relativePointL.y * 4;

}else{
if(-Accnum < 0.002)
Accnum -= 0.005;
else
Accnum = 0.002;
}

thisTransform.position += thisTransform.up * relativePointM.y * 0.5;
}else{

if(targetDestination)
var relativePointTD = thisTransform.InverseTransformPoint(targetDestination.position);

if(target){
var relativePoint2 = thisTransform.InverseTransformPoint(TargetLead.position);
var relativePoint2E = gunPivot.InverseTransformPoint(TargetLead.position);
}

LAndR = relativePoint2.x;
UAndD = relativePoint2E.y;

RelClamp2E = Mathf.Clamp(UAndD / Dist,-2,2);
RelClamp2 = Mathf.Clamp(LAndR / Dist,-2,2);

gunPivot.localEulerAngles.x -= RelClamp2E * 4;
thisTransform.localEulerAngles.y += RelClamp2 * 4;

if(-gunPivot.localEulerAngles.x < 180)
if(-gunPivot.localEulerAngles.x > 60)
gunPivot.localEulerAngles.x = -60;

if(gunPivot.localEulerAngles.x > 180){
if(gunPivot.localEulerAngles.x < 300)
gunPivot.localEulerAngles.x = 300;
}else{
if(gunPivot.localEulerAngles.x > 7)
gunPivot.localEulerAngles.x = 7;
}

thisTransform.localEulerAngles.x -= relativePointF.y * 4;
thisTransform.localEulerAngles.z += relativePointR.y * 4;
thisTransform.localEulerAngles.z -= relativePointL.y * 4;

thisTransform.position += thisTransform.up * relativePointM.y * 0.5;

thisTransform.position += thisTransform.right * relativePointTD.x * 0.01;
thisTransform.position += thisTransform.forward * relativePointTD.z * 0.01;

}

Obstacle = false;
RObstacle = false;
LObstacle = false;

Debug.DrawRay (thisTransform.position + thisTransform.up * 1 + thisTransform.right * 1 + thisTransform.forward * 2, -thisTransform.up * 8, Color.green);
if (!Physics.Raycast (thisTransform.position + thisTransform.up * 1 + thisTransform.right * 1 + thisTransform.forward * 2, -thisTransform.up, hit, 8, targetLayers)) {
Obstacle = true;
RObstacle = true;
}

Debug.DrawRay (thisTransform.position + thisTransform.up * 1 + -thisTransform.right * 1 + thisTransform.forward * 2, -thisTransform.up * 8, Color.green);
if (!Physics.Raycast (thisTransform.position + thisTransform.up * 1 + -thisTransform.right * 1 + thisTransform.forward * 2, -thisTransform.up, hit, 8, targetLayers)) {
Obstacle = true;
LObstacle = true;
}

if(RObstacle && LObstacle){
thisTransform.localEulerAngles.y += 1;
}else{
if(RObstacle)
thisTransform.localEulerAngles.y -= 1;
if(LObstacle)
thisTransform.localEulerAngles.y += 1;
}

}

function Shoot () {
if(target){
if(isStationed){
if(RelClamp2E < 0.1 && RelClamp2 < 0.1 && -RelClamp2E < 0.1 && -RelClamp2 < 0.1){
if(Vector3.Distance(thisTransform.position, target.position) < 1300)
LineOfFire = true;
else
LineOfFire = false;
}else{
LineOfFire = false;
}
}else{
LineOfFire = false;
}

if(LineOfFire)
if(target.name.Contains ("TC"))
Gun.Fire();
}
}

function Ticker () {

if(localParent){
thisTransform.parent = absoluteParent;
Destroy(localParent.gameObject);
}else{
thisTransform.parent = absoluteParent;
}

var gO = new GameObject("TurretParent");

localParent = gO.transform;

localParent.position = thisTransform.position;
localParent.rotation = thisTransform.rotation;

localParent.parent = absoluteParent;
thisTransform.parent = localParent;

if(!isSurvivor)
if(absoluteParent.name.Contains ("rok")){
isSurvivor = true;
var TCTFgo = new GameObject("mTC" + TargetCode);
TCTF = TCTFgo.transform;
var SCol = TCTF.gameObject.AddComponent ("SphereCollider");
SCol.radius = 4;
TCTF.gameObject.layer = 29;
TCTF.gameObject.tag = "TC";
}

Lead();

}

function Lead (){

if(target && TargetTrace)
TargetTrace.position = target.position;

yield WaitForSeconds (0.1);

if(target && TargetTrace){

var Dist1 = Vector3.Distance(TargetTrace.position, target.position);

var Dist2 = LeadCurve.Evaluate(Dist) * Dist1;

TargetTrace.LookAt(target);

TargetLead.position = TargetTrace.position;
TargetLead.rotation = TargetTrace.rotation;
TargetLead.position += TargetLead.forward * Dist2 * LeadAmount;

}
}

function Damage(){

if(!this)
return;

if(damaged)
return;

MainCol.enabled = false;
GunCol.enabled = false;

damaged = true;

yield WaitForSeconds (0.1);

if(thisTransform)
if(thisTransform.parent)
var TheParent = thisTransform.parent.gameObject;

thisTransform.parent = null;

Remover.Active = true;

Destroy(GunRB);
Destroy(MainRB);

if(TargetTrace)
Destroy(TargetTrace.gameObject);
if(TargetLead)
Destroy(TargetLead.gameObject);

GunGO.layer = 0;
MainGO.layer = 0;

if(!rigidbody){
var theRB = gameObject.AddComponent ("Rigidbody");
theRB.drag = 0.1;
theRB.angularDrag = 0.1;
theRB.velocity = mainVesselRB.velocity;
}

if(TCTF)
Destroy(TCTF.gameObject);

Destroy(TheParent);

MainCol.enabled = true;
GunCol.enabled = true;

Destroy(this);

}