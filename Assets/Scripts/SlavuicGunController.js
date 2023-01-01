var TurretTarget : Transform;
var ResetView : Transform;
var Muzzle1 : Transform;
var Muzzle2 : Transform;
var Muzzle3 : Transform;
var Muzzle4 : Transform;
var Muzzle5 : Transform;
var Muzzle6 : Transform;
var Muzzle7 : Transform;
var Muzzle8 : Transform;
var Muzzle9 : Transform;
var Muzzle10 : Transform;
var Muzzle11 : Transform;
var Muzzle12 : Transform;

var LauncherTF : Transform;

var TargetTrace : Transform;
var TargetLead : Transform;

var Lead1Time = 0;
var Lead2Time = 0;

var Overview : Transform;

var VentEffect : GameObject;
var Vent1 : Transform;
var Vent2 : Transform;
var Vent3 : Transform;
var Vent4 : Transform;
 
var Pivot : Transform;

var ConJoint : ConfigurableJoint;

var GunWidth : float = 1.5;

var PitchCurve : AnimationCurve = new AnimationCurve();
var PitchAmount : float = 0;
var PitchMod : float = 1.0;
var PitchForce : float = 0;

var LeadMod : float = 0.2;
var LeadMod2 : float = 1.2;
var LeadDiv : float = 1;

var Dist1 : float;
var Dist2 : float;

var LeadLeader : boolean;

var AimForce = 0;
var Cooldown = 0;
var Counter = 0;

var Xrot = 90;

var Calm = 10;

var VelDir : Vector3;

var RelativeTarget : Vector3;

var RPX : float = 0;
var RPY : float = 0;

var FuckingRead1 : float = 0;
var FuckingRead2 : float = 0;

var Firing : boolean;

var Fire1 : GameObject;

var SlavuicAI : SlavuicVesselAI;

var SlavuicCAI : SlavuicCruiserAI;

var CruiserAttachment : boolean;

var Vessel : GameObject;

var targetLayers : LayerMask;

var OtargetLayers : LayerMask;

var Launcher : boolean;

var BigLauncher : boolean;

var ExtraThiccLauncher : boolean;

var ExtraTubes : boolean;

var Obscured : boolean;

var Stable: boolean;

var Idle : boolean;

var BusyFiring : boolean;

InvokeRepeating("Resetter", 1.1, 0.25);

InvokeRepeating("Count", 0.7, 1);

function Start () {
if(!ExtraThiccLauncher){
if(!BigLauncher){
if(CruiserAttachment)
LeadMod2 = 0.013;
else
LeadMod2 = 0.005;
LeadMod = 0.08;
}else{
LeadMod2 = 0.004;
LeadMod = 0.03;
}
}else{
LeadMod2 = 0.004;
LeadMod = 0.03;
}
}

function FixedUpdate () {

if(TurretTarget){
if(TargetLead)
RelativeTarget = LauncherTF.InverseTransformPoint(TargetLead.position);

Dist = RelativeTarget.z;

PitchForce = PitchAmount;
PitchAmount = PitchCurve.Evaluate(Dist) * PitchMod;

if(CruiserAttachment){
DistMod1 = Dist * 0.1;
DistMod2 = Dist * 0.1;

RPModX = RelativeTarget.x / Dist / DistMod1;
RPModY = RelativeTarget.y / Dist / DistMod2;
RPX = RPModX * 500;
RPY = RPModY * 500;
FuckingRead1 = Mathf.Abs(RPX);
FuckingRead2 = Mathf.Abs(RPY);
}

if(Lead1Time < 1){
Lead1Time = 8;
Lead2Time = 4;
if(CruiserAttachment && LeadLeader || !CruiserAttachment)
Lead1();
}else{
Lead1Time -= 1;
}

if(Lead2Time < 1){
Lead2Time = 8;
Lead2Time = 4;
if(CruiserAttachment && LeadLeader || !CruiserAttachment)
Lead2();
}else{
Lead2Time -= 1;
}

}

  if(rigidbody.angularVelocity.magnitude < 1){
  rigidbody.AddTorque(transform.right * -PitchForce);
  if(!ExtraThiccLauncher)
  AimForce = 20;
  else
  AimForce = 40;
  }else{
  AimForce = 0;
  }
if(!Idle){
  rigidbody.AddForceAtPosition((TargetLead.transform.position - transform.position).normalized * AimForce, transform.forward * 2);
  rigidbody.AddForceAtPosition((TargetLead.transform.position - transform.position).normalized * -AimForce, -transform.forward * 2);
}else{
if(TurretTarget){
  rigidbody.AddForceAtPosition((TurretTarget.transform.position - transform.position).normalized * AimForce, transform.forward * 2);
  rigidbody.AddForceAtPosition((TurretTarget.transform.position - transform.position).normalized * -AimForce, -transform.forward * 2);
}
}

if(Firing && !Obscured){
Firing = false;
if(Launcher)
Launch();
else
Fire();
}

}

function Launch () {

if(Stable){
if(Counter == 0){
Counter = Cooldown;

BusyFiring = true;

if(!ExtraThiccLauncher){
if(!BigLauncher){

if(!ExtraTubes){
var _SpawnedObject01 = Instantiate(Fire1, Muzzle1.position, Muzzle1.rotation);
    _SpawnedObject01.rigidbody.velocity = Vessel.rigidbody.velocity * 1;
    
yield WaitForSeconds (0.5);

var _SpawnedObject02 = Instantiate(Fire1, Muzzle2.position, Muzzle2.rotation);
    _SpawnedObject02.rigidbody.velocity = Vessel.rigidbody.velocity * 1;
    
yield WaitForSeconds (0.5);

var _SpawnedObject03 = Instantiate(Fire1, Muzzle3.position, Muzzle3.rotation);
    _SpawnedObject03.rigidbody.velocity = Vessel.rigidbody.velocity * 1;
    
yield WaitForSeconds (0.5);

if(Muzzle4){
var _SpawnedObject04 = Instantiate(Fire1, Muzzle4.position, Muzzle4.rotation);
    _SpawnedObject04.rigidbody.velocity = Vessel.rigidbody.velocity * 1;
yield WaitForSeconds (0.5);
}

if(Muzzle5){
var _SpawnedObject05 = Instantiate(Fire1, Muzzle5.position, Muzzle5.rotation);
    _SpawnedObject05.rigidbody.velocity = Vessel.rigidbody.velocity * 1;
yield WaitForSeconds (0.5);
}
    
if(Muzzle6){
var _SpawnedObject06 = Instantiate(Fire1, Muzzle6.position, Muzzle6.rotation);
    _SpawnedObject06.rigidbody.velocity = Vessel.rigidbody.velocity * 1;
yield WaitForSeconds (0.5);
}

BusyFiring = false;
}else{

var _SpawnedObject1 = Instantiate(Fire1, Muzzle1.position, Muzzle1.rotation);
    _SpawnedObject1.rigidbody.velocity = Vessel.rigidbody.velocity * 1;
    
yield WaitForSeconds (0.25);

var _SpawnedObject2 = Instantiate(Fire1, Muzzle2.position, Muzzle2.rotation);
    _SpawnedObject2.rigidbody.velocity = Vessel.rigidbody.velocity * 1;
    
yield WaitForSeconds (0.25);

var _SpawnedObject3 = Instantiate(Fire1, Muzzle3.position, Muzzle3.rotation);
    _SpawnedObject3.rigidbody.velocity = Vessel.rigidbody.velocity * 1;
    
yield WaitForSeconds (0.25);

var _SpawnedObject4 = Instantiate(Fire1, Muzzle4.position, Muzzle4.rotation);
    _SpawnedObject4.rigidbody.velocity = Vessel.rigidbody.velocity * 1;
    
yield WaitForSeconds (0.25);

var _SpawnedObject5 = Instantiate(Fire1, Muzzle5.position, Muzzle5.rotation);
    _SpawnedObject5.rigidbody.velocity = Vessel.rigidbody.velocity * 1;
    
yield WaitForSeconds (0.25);

var _SpawnedObject6 = Instantiate(Fire1, Muzzle6.position, Muzzle6.rotation);
    _SpawnedObject6.rigidbody.velocity = Vessel.rigidbody.velocity * 1;
  
yield WaitForSeconds (0.25);
      
var _SpawnedObject7 = Instantiate(Fire1, Muzzle7.position, Muzzle7.rotation);
    _SpawnedObject7.rigidbody.velocity = Vessel.rigidbody.velocity * 1;
    
yield WaitForSeconds (0.25);

var _SpawnedObject8 = Instantiate(Fire1, Muzzle8.position, Muzzle8.rotation);
    _SpawnedObject8.rigidbody.velocity = Vessel.rigidbody.velocity * 1;
    
yield WaitForSeconds (0.25);

var _SpawnedObject9 = Instantiate(Fire1, Muzzle9.position, Muzzle9.rotation);
    _SpawnedObject9.rigidbody.velocity = Vessel.rigidbody.velocity * 1;
    
yield WaitForSeconds (0.25);

var _SpawnedObject10 = Instantiate(Fire1, Muzzle10.position, Muzzle10.rotation);
    _SpawnedObject10.rigidbody.velocity = Vessel.rigidbody.velocity * 1;
    
yield WaitForSeconds (0.25);

var _SpawnedObject11 = Instantiate(Fire1, Muzzle11.position, Muzzle11.rotation);
    _SpawnedObject11.rigidbody.velocity = Vessel.rigidbody.velocity * 1;
    
yield WaitForSeconds (0.25);

var _SpawnedObject12 = Instantiate(Fire1, Muzzle12.position, Muzzle12.rotation);
    _SpawnedObject12.rigidbody.velocity = Vessel.rigidbody.velocity * 1;

yield WaitForSeconds (1);

BusyFiring = false;
}

}else{

var TheThing = Instantiate(VentEffect, Vent1.position, Vent1.rotation);
            TheThing.transform.parent = Vent1.transform;

yield WaitForSeconds (0.5);

var _SpawnedObject00 = Instantiate(Fire1, Muzzle1.position, Muzzle1.rotation);
    _SpawnedObject00.rigidbody.velocity = Vessel.rigidbody.velocity * 1;

yield WaitForSeconds (1);

BusyFiring = false;

}
}else{
var TheThing000 = Instantiate(VentEffect, Vent1.position, Vent1.rotation);
    TheThing000.transform.parent = Vent1.transform;

yield WaitForSeconds (0.5);

var _SpawnedObject000 = Instantiate(Fire1, Muzzle1.position, Muzzle1.rotation);
    _SpawnedObject000.rigidbody.velocity = Vessel.rigidbody.velocity * 1;

var TheThing001 = Instantiate(VentEffect, Vent2.position, Vent2.rotation);
    TheThing001.transform.parent = Vent2.transform;

yield WaitForSeconds (0.5);

var _SpawnedObject001 = Instantiate(Fire1, Muzzle2.position, Muzzle2.rotation);
    _SpawnedObject001.rigidbody.velocity = Vessel.rigidbody.velocity * 1;

var TheThing002 = Instantiate(VentEffect, Vent3.position, Vent3.rotation);
    TheThing002.transform.parent = Vent3.transform;

yield WaitForSeconds (0.5);

var _SpawnedObject002 = Instantiate(Fire1, Muzzle3.position, Muzzle3.rotation);
    _SpawnedObject002.rigidbody.velocity = Vessel.rigidbody.velocity * 1;

var TheThing003 = Instantiate(VentEffect, Vent4.position, Vent4.rotation);
    TheThing003.transform.parent = Vent4.transform;

yield WaitForSeconds (0.5);

var _SpawnedObject003 = Instantiate(Fire1, Muzzle4.position, Muzzle4.rotation);
    _SpawnedObject003.rigidbody.velocity = Vessel.rigidbody.velocity * 1;

yield WaitForSeconds (1);

BusyFiring = false;
}




}
}
}

function Fire () {

if(Stable && !Obscured){
if(Counter == 0){
Counter = Cooldown;
Instantiate(Fire1, Muzzle1.position, Muzzle1.rotation);
}
}
}

function Lead1 (){
if(TurretTarget)
TargetTrace.position = TurretTarget.position;
}

function Lead2 (){

if(TurretTarget){

if(LeadLeader){
Dist1 = Vector3.Distance(Overview.position, TurretTarget.position);
Dist2 = Vector3.Distance(TargetTrace.position, TurretTarget.position);
}else{
Dist1 = Vector3.Distance(transform.position, TurretTarget.position);
Dist2 = Vector3.Distance(TargetTrace.position, TurretTarget.position);
}

TargetTrace.LookAt(TurretTarget);

TargetLead.position = TargetTrace.position;
TargetLead.rotation = TargetTrace.rotation;
TargetLead.position += TargetLead.forward * Dist1 * Dist2 * LeadMod;

if (VelDir != Vector3.zero)
TargetLead.rotation = Quaternion.LookRotation(VelDir);
TargetLead.position -= TargetLead.forward * LeadDiv * Dist1 * LeadMod2;

}
}

function Resetter () {

var hit : RaycastHit;
  
if (TurretTarget != null){

var ODist = Vector3.Distance(transform.position, TurretTarget.position);

if (TurretTarget.name.Contains ("TC"))
if(Calm > 0)
Calm -= 1;

if (!TurretTarget.name.Contains ("TC"))
Calm = 20;

Stable = false;

if(!CruiserAttachment){
if(Vector3.Distance(transform.position, TurretTarget.position) < 500){
if(rigidbody.angularVelocity.magnitude < 0.25)
Stable = true;
}else{
if(rigidbody.angularVelocity.magnitude < 0.05 && rigidbody.velocity.magnitude < 0.2)
Stable = true;
}
}else{

if (TurretTarget.name.Contains ("TC"))
if(rigidbody.angularVelocity.magnitude < 0.1 && FuckingRead1 < 0.5 && FuckingRead2 < 0.7)
Stable = true;
}

if(Calm > 0 || transform.localEulerAngles.x > 180)
  transform.localEulerAngles.x = Xrot;

if(!CruiserAttachment){
if(!Launcher){
if (Physics.Raycast (transform.position + transform.forward * 2, transform.forward, hit, 50, targetLayers)) {

     Obscured = true;
 }else{
     Obscured = false;
}

}else{
if (Physics.Raycast (transform.position + transform.forward * 2, transform.forward, hit, 16, targetLayers))
Obscured = true;
else
Obscured = false;
}

if(Pivot.localEulerAngles.z < 40 || Pivot.localEulerAngles.z > 320)
 Obscured = true;

 }else{
 
Obscured = true;

      Debug.DrawRay (LauncherTF.position + transform.right * GunWidth, transform.forward * ODist, Color.yellow);
      Debug.DrawRay (LauncherTF.position + -transform.right * GunWidth, transform.forward * ODist, Color.yellow);
if (Physics.Raycast (LauncherTF.position + transform.right * GunWidth, transform.forward, hit, ODist, OtargetLayers) ||
    Physics.Raycast (LauncherTF.position + -transform.right * GunWidth, transform.forward, hit, ODist, OtargetLayers)){
if(hit.collider.name.Contains ("T5"))
Obscured = true;
else
Obscured = false;
}else{
Obscured = false;
}

if(Pivot.localEulerAngles.z < 240 && Pivot.localEulerAngles.z > 120){
Obscured = true;
}

}

}

if(SlavuicAI){
if(SlavuicAI.Attacking){
TurretTarget = SlavuicAI.target;
}else{
if(!BusyFiring)
TurretTarget = ResetView;
}
}

if(SlavuicCAI){
if(SlavuicCAI.Attacking){
TurretTarget = SlavuicCAI.target;
}else{
if(!BusyFiring)
TurretTarget = ResetView;
}
}

if(TurretTarget == ResetView)
Idle = true;
else
Idle = false;

}

function Count () {
if(Counter > 0)
Counter -= 1;
}