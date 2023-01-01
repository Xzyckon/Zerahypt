#pragma strict

var AimTarget : GameObject;
var AimForward : GameObject;
var MainVessel: Transform;

var UseAimPoint : boolean;
var AimPoint : Transform;

var AimPos : Vector3;
var RelPoint : Vector3;

var VesselScript : MainVehicleController;

var AimForce = 10.0;
var VarAimForce : float;
var AimSpeed = 2.0;
var AimForceDamp = 0.0;
var AimForceOriginalDamp = 0.05;
var offset = 1.0;

var Dist : float = 2;

var UseEngine : boolean;

var Activated : boolean = true;
var Aiming : boolean;
var CanResetAim : boolean;
var CanLockAim : boolean;
var Reset : boolean;
var AimLocked : boolean;

var StabilizePivot : boolean;
var Pivot : GameObject;
var StabForce = 1.0;

var HingeAim : boolean;
var TraverseJoint : HingeJoint;
var ElevationJoint : HingeJoint;

var YAxis : boolean;
var ZAxis : boolean;

var Vert : float;
var Hori : float;

var targetLayers : LayerMask;

InvokeRepeating("Tick", 1, 0.3);

function Start () {
Reset = true;
AimTarget = PlayerInformation.instance.PiriTurretAim.gameObject;

AimPoint = GameObject.Find("AimPointTarget").gameObject.transform;
}

function Update () {
if(WorldInformation.playerCar.Contains(MainVessel.name)){

if(CanLockAim){

if(Input.GetMouseButton(1)){
var hit : RaycastHit;
	if(Physics.Raycast(transform.position + -transform.up * 2, -transform.up, hit, Mathf.Infinity, targetLayers)) {
		AimPos = hit.point;
	}
}

if(Input.GetKeyDown("2")){
AimLocked = false;
Aiming = false;
}
if(Input.GetKeyDown("3")){
AimLocked = true;
Aiming = true;
}
}

if(Input.GetMouseButtonDown(1) && CameraScript.InInterface == false){
if(!HingeAim)
rigidbody.angularDrag = AimForceDamp;
Aiming = true;
Reset = false;
}
if(Input.GetMouseButtonUp(1) && CameraScript.InInterface == false){
Aiming = false;
if(!HingeAim)
rigidbody.angularDrag = AimForceOriginalDamp;
}
}
}

function FixedUpdate (){

if(AimPoint)
Dist = Vector3.Distance(transform.position, AimPoint.position);
else
Dist = 16;

if(UseEngine){
if(VesselScript.EngineRunning == true)
Activated = true;
if(VesselScript.EngineRunning == false)
Activated = false;
}

if(Activated){

if(StabilizePivot){
    Pivot.rigidbody.AddForceAtPosition(Vector3.up * StabForce, Pivot.transform.up * 2);
    Pivot.rigidbody.AddForceAtPosition(-Vector3.up * StabForce, -Pivot.transform.up * 2);
}

if(rigidbody.angularVelocity.magnitude < AimSpeed){
  VarAimForce = AimForce;
  }else{
  VarAimForce = 0;
  if(HingeAim){
  ElevationJoint.motor.targetVelocity = 0;
  TraverseJoint.motor.targetVelocity = 0;
  }
  }

if(!Aiming && YAxis && CanResetAim && Reset){
if(!HingeAim){
    rigidbody.AddForceAtPosition((AimForward.transform.position - transform.position).normalized * VarAimForce, transform.up*offset);
    rigidbody.AddForceAtPosition((AimForward.transform.position - transform.position).normalized * -VarAimForce, -transform.up*offset);
}else{
if(UseAimPoint){
Dist = Vector3.Distance(transform.position, AimForward.transform.position);
RelPoint = transform.InverseTransformPoint(AimForward.transform.position);
Vert = Mathf.Clamp(-RelPoint.z * VarAimForce / Dist,-128,128);
Hori = Mathf.Clamp(RelPoint.x * VarAimForce / Dist,-128,128);
}else{
RelPoint = transform.InverseTransformPoint(AimForward.transform.position);
Vert = -RelPoint.z * VarAimForce;
Hori = RelPoint.x * VarAimForce;
}
ElevationJoint.motor.targetVelocity = Vert;
TraverseJoint.motor.targetVelocity = Hori;
}
}
if(Aiming && YAxis){
if(!AimLocked){
if(!HingeAim){
if(!UseAimPoint){
    rigidbody.AddForceAtPosition((AimTarget.transform.position - transform.position).normalized * VarAimForce, transform.up*offset);
    rigidbody.AddForceAtPosition((AimTarget.transform.position - transform.position).normalized * -VarAimForce, -transform.up*offset);
    }else{
    rigidbody.AddForceAtPosition((AimPoint.transform.position - transform.position).normalized * VarAimForce, transform.up*offset);
    rigidbody.AddForceAtPosition((AimPoint.transform.position - transform.position).normalized * -VarAimForce, -transform.up*offset);
    }
    }else{
if(UseAimPoint){
RelPoint = transform.InverseTransformPoint(AimPoint.transform.position);
Vert = Mathf.Clamp(-RelPoint.z * VarAimForce / Dist,-128,128);
Hori = Mathf.Clamp(RelPoint.x * VarAimForce / Dist,-128,128);
}else{
RelPoint = transform.InverseTransformPoint(AimTarget.transform.position);
Vert = -RelPoint.z * VarAimForce;
Hori = RelPoint.x * VarAimForce;
}
ElevationJoint.motor.targetVelocity = Vert;
TraverseJoint.motor.targetVelocity = Hori;
    }
    }else{
    if(!HingeAim){
    rigidbody.AddForceAtPosition((AimPos - transform.position).normalized * VarAimForce, transform.up*offset);
    rigidbody.AddForceAtPosition((AimPos - transform.position).normalized * -VarAimForce, -transform.up*offset);
    }else{
    RelPoint = transform.InverseTransformPoint(AimPos);
Vert = -RelPoint.z * VarAimForce;
Hori = RelPoint.x * VarAimForce;
ElevationJoint.motor.targetVelocity = Vert;
TraverseJoint.motor.targetVelocity = Hori;
}
}
}
if(Aiming && ZAxis){
if(!HingeAim){
if(!UseAimPoint){
    rigidbody.AddForceAtPosition((AimTarget.transform.position - transform.position).normalized * VarAimForce, transform.up*offset);
    rigidbody.AddForceAtPosition((AimTarget.transform.position - transform.position).normalized * -VarAimForce, -transform.up*offset);
    }else{
    rigidbody.AddForceAtPosition((AimPoint.transform.position - transform.position).normalized * VarAimForce, transform.up*offset);
    rigidbody.AddForceAtPosition((AimPoint.transform.position - transform.position).normalized * -VarAimForce, -transform.up*offset);
    }
}else{
if(UseAimPoint){
RelPoint = transform.InverseTransformPoint(AimPoint.transform.position);
Vert = Mathf.Clamp(-RelPoint.z * VarAimForce / Dist,-128,128);
Hori = Mathf.Clamp(RelPoint.x * VarAimForce / Dist,-128,128);
}else{
RelPoint = transform.InverseTransformPoint(AimTarget.transform.position);
Vert = -RelPoint.z * VarAimForce;
Hori = RelPoint.x * VarAimForce;
}
ElevationJoint.motor.targetVelocity = Vert;
TraverseJoint.motor.targetVelocity = Hori;
}
}



}else{

if(UseAimPoint){
Dist = Vector3.Distance(transform.position, AimForward.transform.position);
RelPoint = transform.InverseTransformPoint(AimForward.transform.position);
Vert = Mathf.Clamp(-RelPoint.z * VarAimForce / Dist,-128,128);
Hori = Mathf.Clamp(RelPoint.x * VarAimForce / Dist,-128,128);
}else{
RelPoint = transform.InverseTransformPoint(AimForward.transform.position);
Vert = -RelPoint.z * VarAimForce;
Hori = RelPoint.x * VarAimForce;
}

if(rigidbody.angularVelocity.magnitude < AimSpeed){
  VarAimForce = AimForce;
  }else{
  VarAimForce = 0;
  if(HingeAim){
  ElevationJoint.motor.targetVelocity = 0;
  TraverseJoint.motor.targetVelocity = 0;
  }
  }

if(!HingeAim){
    rigidbody.AddForceAtPosition((AimForward.transform.position - transform.position).normalized * VarAimForce, transform.up*offset);
    rigidbody.AddForceAtPosition((AimForward.transform.position - transform.position).normalized * -VarAimForce, -transform.up*offset);
}else{
RelPoint = transform.InverseTransformPoint(AimForward.transform.position);
Vert = Mathf.Clamp(-RelPoint.z * VarAimForce / Dist,-128,128);
Hori = Mathf.Clamp(RelPoint.x * VarAimForce / Dist,-128,128);
ElevationJoint.motor.targetVelocity = Vert;
TraverseJoint.motor.targetVelocity = Hori;
}

}



}

function Tick () {
if(Activated){
if(WorldInformation.playerCar.Contains(MainVessel.name)){
rigidbody.centerOfMass = Vector3(0, 0, 0);

if(rigidbody.velocity.magnitude > 3 && !AimLocked)
Reset = true;
}
}else{
Reset = true;
}
}