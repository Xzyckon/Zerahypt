var target : Transform;
var Waypoint : Transform;

var Forward : Transform;

var TargetTrace : Transform;
var TargetLead : Transform;
var TLCol : SphereCollider;

var thisTransform : Transform;
var thisVTransform : Transform;

var vRigidbody : Rigidbody;

var EyeOrigin : Transform;

var Eye : Transform;

var LArm : ConfigurableJoint;
var RArm : ConfigurableJoint;

var Trig : CapsuleCollider;

var LookTargetLayers : LayerMask;

var MTargetLayers : LayerMask;

var LookSpeed = 5;

var MoveForce = 0;

var TurnForce = 0;

var StrafeForce = 0;

var WarningSoundPatrolling : GameObject;
var WarningSoundNotice : GameObject;
var WarningSoundDismiss : GameObject;
var WarningSoundThreat : GameObject;
var Fire1 : GameObject;
var RayBurst : GameObject;
var RayGlow : GameObject;
var LastPos : GameObject;

var RayCooldown = 0;

var AngerLevel = 0;
var Looking = 0;

var Shots = 0;
var FiringRay : boolean;
var Obstacle : boolean;

var PissedAtTC0a = 0;

var PissedAtTC1 = 0;
var PissedAtTC3 = 0;
var PissedAtTC5 = 0;
var PissedAtTC6 = 0;
var PissedAtTC7 = 0;
var PissedAtTC8 = 0;
var PissedAtTC9 = 0;

var DangerSense = 0;
var DangerDirection : Vector3;

InvokeRepeating("Tick", 3, 100);

InvokeRepeating("Warning", 10, 33);

InvokeRepeating("Shooty", 1, 0.3);

InvokeRepeating("Regenerator", 1, 1);

InvokeRepeating("CalcLead", 1, 0.15);

function Start () {
KabrianLaw.KabrianPolicePresent = true;
}

function Update () {

if(target == null)
target = Forward;

Debug.DrawRay (thisTransform.position + -thisVTransform.forward * 10 + 
                                    -thisVTransform.up * 7 +
                                     thisVTransform.right * 8, 
                                    -thisVTransform.up * 13f, Color.white);
if (Physics.Raycast (thisTransform.position + -thisVTransform.forward * 10 + 
                                          -thisVTransform.up * 7 +
                                           thisVTransform.right * 8, 
                                          -thisVTransform.up, 13, MTargetLayers)){
StrafeForce = -50;
Obstacle = true;
}

Debug.DrawRay (thisTransform.position + -thisVTransform.forward * 10 + 
                                    -thisVTransform.up * 7 +
                                    -thisVTransform.right * 8, 
                                    -thisVTransform.up * 13f, Color.white);
if (Physics.Raycast (thisTransform.position + -thisVTransform.forward * 10 + 
                                          -thisVTransform.up * 7 +
                                          -thisVTransform.right * 8, 
                                          -thisVTransform.up, 13, MTargetLayers)){
StrafeForce = 50;
Obstacle = true;
}
//-----------------------------------------------------------------------------------
Debug.DrawRay (thisTransform.position + thisVTransform.forward * 5 + 
                                    -thisVTransform.up * 5 + 
                                     thisVTransform.right * 5, 
                                    -thisVTransform.forward * 15f, Color.white);
if (Physics.Raycast (thisTransform.position + thisVTransform.forward * 5 + 
                                          -thisVTransform.up * 5 + 
                                           thisVTransform.right * 5, 
                                          -thisVTransform.forward, 15, MTargetLayers)){
StrafeForce = -100;
Obstacle = true;
}

Debug.DrawRay (thisTransform.position + thisVTransform.forward * 5 + 
                                    -thisVTransform.up * 5 + 
                                    -thisVTransform.right * 5, 
                                    -thisVTransform.forward * 15f, Color.white);
if (Physics.Raycast (thisTransform.position + thisVTransform.forward * 5 + 
                                          -thisVTransform.up * 5 + 
                                          -thisVTransform.right * 5, 
                                          -thisVTransform.forward, 15, MTargetLayers)){
StrafeForce = 100;
Obstacle = true;
}
//-----------------------------------------------------------------------------------
Debug.DrawRay (thisTransform.position + thisVTransform.forward * 5 + 
                                    -thisVTransform.up * 20 + 
                                     thisVTransform.right * 10, 
                                    -thisVTransform.forward * 30f, Color.green);
if (!Physics.Raycast (thisTransform.position + thisVTransform.forward * 5 + 
                                          -thisVTransform.up * 20 + 
                                           thisVTransform.right * 10, 
                                          -thisVTransform.forward, 30, MTargetLayers)){

if(AngerLevel < 1){
TurnForce = -200;
target = Forward;
}else{
TurnForce = -200;
}
}

Debug.DrawRay (thisTransform.position + thisVTransform.forward * 5 + 
                                    -thisVTransform.up * 20 + 
                                    -thisVTransform.right * 10, 
                                    -thisVTransform.forward * 30f, Color.green);
if (!Physics.Raycast (thisTransform.position + thisVTransform.forward * 5 + 
                                          -thisVTransform.up * 20 + 
                                          -thisVTransform.right * 10, 
                                          -thisVTransform.forward, 30, MTargetLayers)){
if(AngerLevel < 1){
TurnForce = 200;
target = Forward;
}else{
TurnForce = 200;
}
}
//-----------------------------------------------------------------------------------
if (!Physics.Raycast (thisTransform.position + thisTransform.forward * 0.5, thisTransform.forward, 300)){

Debug.DrawRay (thisTransform.position + -thisVTransform.forward * 10, 
                                          thisVTransform.right * 15f, Color.white);
if (Physics.Raycast (thisTransform.position + -thisVTransform.forward * 10, 
                                          thisVTransform.right, 15, MTargetLayers)){
StrafeForce = -100;
}

Debug.DrawRay (thisTransform.position + -thisVTransform.forward * 10, 
                                          -thisVTransform.right * 15f, Color.white);
if (Physics.Raycast (thisTransform.position + -thisVTransform.forward * 10, 
                                          -thisVTransform.right, 15, MTargetLayers)){
StrafeForce = 100;
}
}else{
newRot = (EyeOrigin.up * -0.6f + EyeOrigin.right * 0.4f).normalized;
Debug.DrawRay (thisTransform.position + -EyeOrigin.forward * 10, newRot * 30f, Color.white);
if (Physics.Raycast (thisTransform.position + -EyeOrigin.forward * 10, newRot, 30, MTargetLayers)){
StrafeForce = -100;
}
newRot = (EyeOrigin.up * -0.6f + EyeOrigin.right * -0.4f).normalized;
Debug.DrawRay (thisTransform.position + -EyeOrigin.forward * 10, newRot * 30f, Color.white);
if (Physics.Raycast (thisTransform.position + -EyeOrigin.forward * 10, newRot, 30, MTargetLayers)){
StrafeForce = 100;
}
}

if(target)
if(AngerLevel > 1)
if(Vector3.Distance(thisTransform.position, target.position) < 20)
Obstacle = true;

if(Looking > 0 && !Obstacle)
MoveForce = 0;

if(DangerSense > 0 && !Obstacle)
MoveForce = 100;

if(Looking < 1 && !Obstacle)
MoveForce = 80;

if(!Obstacle && AngerLevel > 1)
MoveForce = 100;

if(Obstacle && AngerLevel < 1)
MoveForce = -100;

if(Obstacle && AngerLevel > 1){
MoveForce = -120;
StrafeForce = 50;
}

}

private var NewRotation : Quaternion;
function FixedUpdate () {

if(Looking < 1){
vRigidbody.AddForce(EyeOrigin.right * StrafeForce);
vRigidbody.AddTorque(thisVTransform.forward * TurnForce);
}

vRigidbody.AddForce(-thisVTransform.up * MoveForce);

rigidbody.freezeRotation = true;

if (target){

	if (DangerSense < 1){
	        if(AngerLevel > 10){
	        if(!FiringRay)
	        NewRotation = Quaternion.LookRotation(TargetLead.position - thisTransform.position);
	        else
	        NewRotation = Quaternion.LookRotation(target.position - thisTransform.position);
	        }else{
            NewRotation = Quaternion.LookRotation(target.position - thisTransform.position);
            }
            }
            
	if (DangerSense > 0 && DangerDirection != Vector3.zero)
            NewRotation = Quaternion.LookRotation(DangerDirection);
            
thisTransform.rotation = Quaternion.RotateTowards(thisTransform.rotation, NewRotation, Time.deltaTime * LookSpeed);
}
	
	if(AngerLevel > 30)
	LookSpeed = 300;
	else
	LookSpeed = 150;
	
}

function OnTriggerEnter (other : Collider) {

if(!FiringRay){

if(other.collider.name.Contains ("TFC"))
if(!other.collider.name.Contains ("TFC2")){

if(target){

if(other.rigidbody){
var relativePoint0 = other.transform.InverseTransformPoint(thisTransform.position);
FAndB = relativePoint0.z;

if(FAndB > 0)
DangerDirection = -other.rigidbody.velocity.normalized;
else
DangerDirection = other.rigidbody.velocity.normalized;
  
target = null;
}

if(DangerSense < 1 && AngerLevel < 1){
var TheThing0 = Instantiate(WarningSoundThreat, thisTransform.position + Vector3(0,-2,0), Quaternion.identity);
  TheThing0.transform.parent = thisTransform;  
}

DangerSense = 30;
Looking = 0;

}

if(other.collider.name.Contains ("TFC0a")){
if(AngerLevel < 5)
PissedAtTC0a = 5;
else
PissedAtTC0a = 10;

if(target)
if(!target.name.Contains ("C0a") && AngerLevel < 5)
target = null;
}

if(other.collider.name.Contains ("TFC1")){
var relativePoint = other.transform.InverseTransformPoint(thisTransform.position);
FAndB = relativePoint.z;

if(FAndB > 0){
if(AngerLevel < 5)
PissedAtTC1 = 5;
else
PissedAtTC1 = 10;
}

if(target)
if(!target.name.Contains ("C1") && AngerLevel < 50)
target = null;
}

if(other.collider.name.Contains ("TFC3")){
if(AngerLevel < 5)
PissedAtTC3 = 5;
else
PissedAtTC3 = 10;

if(target)
if(!target.name.Contains ("C3") && AngerLevel < 50)
target = null;
}

if(other.collider.name.Contains ("TFC5")){
if(AngerLevel < 5)
PissedAtTC5 = 5;
else
PissedAtTC5 = 10;

if(target)
if(!target.name.Contains ("C5") && AngerLevel < 50)
target = null;
}

if(other.collider.name.Contains ("TFC6")){
if(AngerLevel < 5)
PissedAtTC6 = 5;
else
PissedAtTC6 = 10;

if(target)
if(!target.name.Contains ("C6") && AngerLevel < 50)
target = null;
}

if(other.collider.name.Contains ("TFC7")){
if(AngerLevel < 5)
PissedAtTC7 = 5;
else
PissedAtTC7 = 10;

if(target)
if(!target.name.Contains ("C7") && AngerLevel < 50)
target = null;
}

if(other.collider.name.Contains ("TFC8")){
if(AngerLevel < 5)
PissedAtTC8 = 5;
else
PissedAtTC8 = 10;

if(target)
if(!target.name.Contains ("C8") && AngerLevel < 50)
target = null;
}

if(other.collider.name.Contains ("TFC9")){
if(AngerLevel < 5)
PissedAtTC9 = 5;
else
PissedAtTC9 = 10;

if(target)
if(!target.name.Contains ("C9") && AngerLevel < 50)
target = null;
}

//---------------------------------------------------------------

if(AngerLevel < 200){

if(other.collider.name.Contains("#1"))
AngerLevel += 1;

if(other.collider.name.Contains("#2"))
AngerLevel += 10;

if(other.collider.name.Contains("#3"))
AngerLevel += 60;
}

}

if(AngerLevel < 1 && Looking < 1)
if(other.collider.name.Contains ("TC")){
  target = other.gameObject.transform;
  
  Looking = 20;
  var TheThing2 = Instantiate(WarningSoundNotice, thisTransform.position + Vector3(0,-2,0), Quaternion.identity);
  TheThing2.transform.parent = thisTransform;
  }
}
}

function OnTriggerStay (other : Collider) {

if(!FiringRay){

if(other.collider.name.Contains ("TC0a") && PissedAtTC0a > 0){
DangerSense = 0;
Looking = 0;
  
  target = other.gameObject.transform;
  LArm.targetRotation = Quaternion.Euler(180, 45, 0);
  RArm.targetRotation = Quaternion.Euler(180, 45, 0);
  
if(Vector3.Distance(other.transform.position, thisTransform.position) < Vector3.Distance(thisTransform.position, target.position))
target = other.gameObject.transform;
  
  }

if(other.collider.name.Contains ("TC1") && PissedAtTC1 > 0){
DangerSense = 0;
Looking = 0;
  if(AgrianNetwork.TC1CriminalLevel > 240 && AngerLevel < 10)
  AngerLevel = 20;
  
  target = other.gameObject.transform;
  LArm.targetRotation = Quaternion.Euler(180, 45, 0);
  RArm.targetRotation = Quaternion.Euler(180, 45, 0);
  
if(Vector3.Distance(other.transform.position, thisTransform.position) < Vector3.Distance(thisTransform.position, target.position))
target = other.gameObject.transform;
  
  }
  
if(other.collider.name.Contains ("TC3") && PissedAtTC3 > 0){
DangerSense = 0;
Looking = 0;

  target = other.gameObject.transform;
  LArm.targetRotation = Quaternion.Euler(180, 45, 0);
  RArm.targetRotation = Quaternion.Euler(180, 45, 0);
  }
  
if(other.collider.name.Contains ("TC4")){
DangerSense = 0;
Looking = 0;

  AngerLevel = 20;

  target = other.gameObject.transform;
  LArm.targetRotation = Quaternion.Euler(180, 45, 0);
  RArm.targetRotation = Quaternion.Euler(180, 45, 0);
  
if(Vector3.Distance(other.transform.position, thisTransform.position) < Vector3.Distance(thisTransform.position, target.position))
target = other.gameObject.transform;
  
  }
  
if(other.collider.name.Contains ("TC5") && PissedAtTC5 > 0){
DangerSense = 0;
Looking = 0;

  if(AgrianNetwork.TC5CriminalLevel > 240 && AngerLevel < 10)
  AngerLevel = 20;

  target = other.gameObject.transform;
  LArm.targetRotation = Quaternion.Euler(180, 45, 0);
  RArm.targetRotation = Quaternion.Euler(180, 45, 0);
  
if(Vector3.Distance(other.transform.position, thisTransform.position) < Vector3.Distance(thisTransform.position, target.position))
target = other.gameObject.transform;
  
  }
  
if(other.collider.name.Contains ("TC6") && PissedAtTC6 > 0){
DangerSense = 0;
Looking = 0;
  if(AgrianNetwork.TC6CriminalLevel > 240 && AngerLevel < 10)
  AngerLevel = 20;

  target = other.gameObject.transform;
  LArm.targetRotation = Quaternion.Euler(180, 45, 0);
  RArm.targetRotation = Quaternion.Euler(180, 45, 0);
  
if(Vector3.Distance(other.transform.position, thisTransform.position) < Vector3.Distance(thisTransform.position, target.position))
target = other.gameObject.transform;
  
  }
  
if(other.collider.name.Contains ("TC7") && PissedAtTC7 > 0){
DangerSense = 0;
Looking = 0;
  if(AgrianNetwork.TC7CriminalLevel > 240 && AngerLevel < 10)
  AngerLevel = 20;

  target = other.gameObject.transform;
  LArm.targetRotation = Quaternion.Euler(180, 45, 0);
  RArm.targetRotation = Quaternion.Euler(180, 45, 0);
  
if(Vector3.Distance(other.transform.position, thisTransform.position) < Vector3.Distance(thisTransform.position, target.position))
target = other.gameObject.transform;
  
  }
  
  if(other.collider.name.Contains ("TC8") && PissedAtTC8 > 0){
DangerSense = 0;
Looking = 0;
  if(AgrianNetwork.TC8CriminalLevel > 240 && AngerLevel < 10)
  AngerLevel = 20;

  target = other.gameObject.transform;
  LArm.targetRotation = Quaternion.Euler(180, 45, 0);
  RArm.targetRotation = Quaternion.Euler(180, 45, 0);
  
if(Vector3.Distance(other.transform.position, thisTransform.position) < Vector3.Distance(thisTransform.position, target.position))
target = other.gameObject.transform;
  
  }
  
  if(other.collider.name.Contains ("TC9") && PissedAtTC9 > 0){
DangerSense = 0;
Looking = 0;
  if(AgrianNetwork.TC9CriminalLevel > 240 && AngerLevel < 10)
  AngerLevel = 20;

  target = other.gameObject.transform;
  LArm.targetRotation = Quaternion.Euler(180, 45, 0);
  RArm.targetRotation = Quaternion.Euler(180, 45, 0);
  
if(Vector3.Distance(other.transform.position, thisTransform.position) < Vector3.Distance(thisTransform.position, target.position))
target = other.gameObject.transform;
  
  }
  
if(other.collider.name.Contains ("TFC") && AngerLevel > 60){
  LArm.targetRotation = Quaternion.Euler(180, 45, 0);
  RArm.targetRotation = Quaternion.Euler(180, 45, 0);
  ReadyRay();
  }
  
if(other.collider.name.Contains ("TC0a") && PissedAtTC0a > 9 && AngerLevel > 60){
  target = other.gameObject.transform;
  if(Eye)
  RayControl();
  }
  
if(other.collider.name.Contains ("TC1") && PissedAtTC1 > 9 && AngerLevel > 60){
  target = other.gameObject.transform;
  if(Eye)
  RayControl();
  }
  
if(other.collider.name.Contains ("TC3") && PissedAtTC3 > 0 && AngerLevel > 60){
  target = other.gameObject.transform;
  if(Eye)
  RayControl();
  }
  
if(other.collider.name.Contains ("TC4") && AngerLevel > 60){
  target = other.gameObject.transform;
  if(Eye)
  RayControl();
  }
  
if(other.collider.name.Contains ("TC5") && PissedAtTC5 > 0 && AngerLevel > 60){
  target = other.gameObject.transform;
  if(Eye)
  RayControl();
  }
  
if(other.collider.name.Contains ("TC6") && PissedAtTC6 > 0 && AngerLevel > 60){
  target = other.gameObject.transform;
  if(Eye)
  RayControl();
  }
if(other.collider.name.Contains ("TC7") && PissedAtTC7 > 0 && AngerLevel > 60){
  target = other.gameObject.transform;
  if(Eye)
  RayControl();
  }
if(other.collider.name.Contains ("TC8") && PissedAtTC8 > 0 && AngerLevel > 60){
  target = other.gameObject.transform;
  if(Eye)
  RayControl();
  }
if(other.collider.name.Contains ("TC9") && PissedAtTC9 > 0 && AngerLevel > 60){
  target = other.gameObject.transform;
  if(Eye)
  RayControl();
  }
  
}
}

// FIRINGS -------------------------------------------------------------------------------------------------------------

function Shooty (){
if(Eye)
if(!FiringRay && Shots > 1 && AngerLevel > 15)
Shoot();
}

function Shoot () {

var hit : RaycastHit;
	
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 0.5, thisTransform.forward, hit, 500, LookTargetLayers)) {

if (!hit.collider.name.Contains("T2Obscure")){

if(hit.collider.name.Contains ("TC"))
AngerLevel -= 5;

if(target){
if(target.name.Contains ("TC0a") && PissedAtTC0a > 5)
if(hit.collider.name.Contains ("TL2") || hit.collider.name.Contains ("TC0a"))
Instantiate(Fire1, thisTransform.position + thisTransform.forward * 0.8, thisTransform.rotation);

if(target.name.Contains ("TC1") && PissedAtTC1 > 5)
if(hit.collider.name.Contains ("TL2") || hit.collider.name.Contains ("TC1"))
Instantiate(Fire1, thisTransform.position + thisTransform.forward * 0.8, thisTransform.rotation);

if(target.name.Contains ("TC3") && PissedAtTC3 > 5)
if(hit.collider.name.Contains ("TL2") || hit.collider.name.Contains ("TC3"))
Instantiate(Fire1, thisTransform.position + thisTransform.forward * 0.8, thisTransform.rotation);

if(target.name.Contains ("TC4"))
if(hit.collider.name.Contains ("TL2") || hit.collider.name.Contains ("TC4"))
Instantiate(Fire1, thisTransform.position + thisTransform.forward * 0.8, thisTransform.rotation);

if(target.name.Contains ("TC5") && PissedAtTC5 > 5)
if(hit.collider.name.Contains ("TL2") || hit.collider.name.Contains ("TC5"))
Instantiate(Fire1, thisTransform.position + thisTransform.forward * 0.8, thisTransform.rotation);

if(target.name.Contains ("TC6") && PissedAtTC6 > 5)
if(hit.collider.name.Contains ("TL2") || hit.collider.name.Contains ("TC6"))
Instantiate(Fire1, thisTransform.position + thisTransform.forward * 0.8, thisTransform.rotation);

if(target.name.Contains ("TC7") && PissedAtTC7 > 5)
if(hit.collider.name.Contains ("TL2") || hit.collider.name.Contains ("TC7"))
Instantiate(Fire1, thisTransform.position + thisTransform.forward * 0.8, thisTransform.rotation);

if(target.name.Contains ("TC8") && PissedAtTC8 > 5)
if(hit.collider.name.Contains ("TL2") || hit.collider.name.Contains ("TC8"))
Instantiate(Fire1, thisTransform.position + thisTransform.forward * 0.8, thisTransform.rotation);

if(target.name.Contains ("TC9") && PissedAtTC9 > 5)
if(hit.collider.name.Contains ("TL2") || hit.collider.name.Contains ("TC9"))
Instantiate(Fire1, thisTransform.position + thisTransform.forward * 0.8, thisTransform.rotation);

Shots -= 2;
}
}
}
}

function ReadyRay () {
yield WaitForSeconds (0.5);
Trig.center = Vector3(0,0,1000);
Trig.radius = 70;
Trig.height = 2000;
}

function RayControl () {

var hit : RaycastHit;

if(target != null)
if(RayCooldown == 0)
if(Physics.Raycast (thisTransform.position + thisTransform.forward * 0.5, thisTransform.forward, hit, 5000, LookTargetLayers))
if(Vector3.Distance(thisTransform.position, target.position) > 50)
if(hit.collider.name.Contains (target.name)){

FiringRay = true;

var TheThing3 = Instantiate(RayGlow, thisTransform.position, Quaternion.Euler(thisTransform.eulerAngles.x, thisTransform.eulerAngles.y, thisTransform.eulerAngles.z));
  TheThing3.transform.parent = thisTransform;

yield WaitForSeconds (1);
  
  Instantiate(RayBurst, thisTransform.position, Quaternion.Euler(thisTransform.eulerAngles.x, thisTransform.eulerAngles.y, thisTransform.eulerAngles.z));

Trig.center = Vector3(0,0,0);
Trig.radius = 50;
Trig.height = 50;

AngerLevel = 10;
RayCooldown = 10;
FiringRay = false;
}
}

function CalcLead () {
Lead();
}

function Lead (){

if(target)
TargetTrace.position = target.position;

yield WaitForSeconds (0.1);

if(target){

var Dist1 = Vector3.Distance(thisTransform.position, target.position);
var Dist2 = Vector3.Distance(TargetTrace.position, target.position);

TargetTrace.LookAt(target);

TargetLead.position = TargetTrace.position;
TargetLead.rotation = TargetTrace.rotation;
TargetLead.position += TargetLead.forward * Dist1 * Dist2 * 0.02;

if(AngerLevel > 10)
TLCol.radius = 20;
else
TLCol.radius = 0.1;

}
}

// FIRINGS -------------------------------------------------------------------------------------------------------------

function Regenerator () {

if(target){
if(target.name.Contains ("TC") && DangerSense > 0)
  DangerSense = 0;

if(AgrianNetwork.TC1CriminalLevel < 500){
if(AgrianNetwork.TC1CriminalLevel > 240 && target.name.Contains ("TC1")){
AgrianNetwork.instance.TC1CriminalLevel = 360;
}
}else{
if(target.name.Contains ("TC1")){
if(AgrianNetwork.instance.RedAlertTime > 0)
AgrianNetwork.instance.FullPriorityWaypoint.transform.position = target.position;
if(AgrianNetwork.instance.AlertTime < 300)
AgrianNetwork.instance.AlertTime = 300;
AgrianNetwork.instance.TC1CriminalLevel = 620;
}
}

if(AgrianNetwork.TC4CriminalLevel < 500){
if(AgrianNetwork.TC4CriminalLevel > 240 && target.name.Contains ("TC4")){
AgrianNetwork.instance.TC4CriminalLevel = 360;
}
}else{
if(target.name.Contains ("TC4")){
if(AgrianNetwork.instance.RedAlertTime > 0)
AgrianNetwork.instance.FullPriorityWaypoint.transform.position = target.position;
if(AgrianNetwork.instance.AlertTime < 300)
AgrianNetwork.instance.AlertTime = 300;
AgrianNetwork.instance.TC4CriminalLevel = 620;
}
}

if(AgrianNetwork.TC5CriminalLevel < 500){
if(AgrianNetwork.TC5CriminalLevel > 240 && target.name.Contains ("TC5")){
AgrianNetwork.instance.TC5CriminalLevel = 360;
}
}else{
if(target.name.Contains ("TC5")){
if(AgrianNetwork.instance.RedAlertTime > 0)
AgrianNetwork.instance.FullPriorityWaypoint.transform.position = target.position;
if(AgrianNetwork.instance.AlertTime < 300)
AgrianNetwork.instance.AlertTime = 300;
AgrianNetwork.instance.TC5CriminalLevel = 620;
}
}

if(AgrianNetwork.TC6CriminalLevel < 500){
if(AgrianNetwork.TC6CriminalLevel > 240 && target.name.Contains ("TC6")){
AgrianNetwork.instance.TC6CriminalLevel = 360;
}
}else{
if(target.name.Contains ("TC6")){
if(AgrianNetwork.instance.RedAlertTime > 0)
AgrianNetwork.instance.FullPriorityWaypoint.transform.position = target.position;
if(AgrianNetwork.instance.AlertTime < 300)
AgrianNetwork.instance.AlertTime = 300;
AgrianNetwork.instance.TC6CriminalLevel = 620;
}
}

if(AgrianNetwork.TC7CriminalLevel < 500){
if(AgrianNetwork.TC7CriminalLevel > 240 && target.name.Contains ("TC7")){
AgrianNetwork.instance.TC7CriminalLevel = 360;
}
}else{
if(target.name.Contains ("TC7")){
if(AgrianNetwork.instance.RedAlertTime > 0)
AgrianNetwork.instance.FullPriorityWaypoint.transform.position = target.position;
if(AgrianNetwork.instance.AlertTime < 300)
AgrianNetwork.instance.AlertTime = 300;
AgrianNetwork.instance.TC7CriminalLevel = 620;
}
}

if(AgrianNetwork.TC8CriminalLevel < 500){
if(AgrianNetwork.TC8CriminalLevel > 240 && target.name.Contains ("TC8")){
AgrianNetwork.instance.TC8CriminalLevel = 360;
}
}else{
if(target.name.Contains ("TC8")){
if(AgrianNetwork.instance.RedAlertTime > 0)
AgrianNetwork.instance.FullPriorityWaypoint.transform.position = target.position;
if(AgrianNetwork.instance.AlertTime < 300)
AgrianNetwork.instance.AlertTime = 300;
AgrianNetwork.instance.TC8CriminalLevel = 620;
}
}

if(AgrianNetwork.TC9CriminalLevel < 500){
if(AgrianNetwork.TC9CriminalLevel > 240 && target.name.Contains ("TC9")){
AgrianNetwork.instance.TC9CriminalLevel = 360;
}
}else{
if(target.name.Contains ("TC9")){
if(AgrianNetwork.instance.RedAlertTime > 0)
AgrianNetwork.instance.FullPriorityWaypoint.transform.position = target.position;
if(AgrianNetwork.instance.AlertTime < 300)
AgrianNetwork.instance.AlertTime = 300;
AgrianNetwork.instance.TC9CriminalLevel = 620;
}
}

}

if(AgrianNetwork.TC1CriminalLevel > 240 && PissedAtTC1 < 1)
PissedAtTC1 = 10;

if(AgrianNetwork.TC5CriminalLevel > 240 && PissedAtTC5 < 1)
PissedAtTC5 = 10;

if(AgrianNetwork.TC6CriminalLevel > 240 && PissedAtTC6 < 1)
PissedAtTC6 = 10;

if(AgrianNetwork.TC7CriminalLevel > 240 && PissedAtTC7 < 1)
PissedAtTC7 = 10;

if(AgrianNetwork.TC8CriminalLevel > 240 && PissedAtTC8 < 1)
PissedAtTC8 = 10;

if(AgrianNetwork.TC9CriminalLevel > 240 && PissedAtTC9 < 1)
PissedAtTC9 = 10;

if(target)
if(AngerLevel < 60){
if(target.name.Contains ("TC")){

Trig.center = Vector3(0,0,0);
Trig.radius = 50;
Trig.height = 50;

}else{

Trig.center = Vector3(0,0,100);
Trig.radius = 100;
Trig.height = 400;

}

}

if(DangerSense < 1){
if(AgrianNetwork.instance.AlertTime > 1){
if(AngerLevel < 10){
Waypoint.position = AgrianNetwork.instance.PriorityWaypoint.position;
target = Waypoint;
}
}
}

if(AgrianNetwork.instance.RedAlertTime > 1){
if(AngerLevel < 10){
Waypoint.position = AgrianNetwork.instance.FullPriorityWaypoint.position;
target = Waypoint;
}
}

if(DangerSense > 0)
DangerSense -= 1;

TurnForce = 0;

StrafeForce = 0;

if(Shots < 6)
Shots += 1;

if(RayCooldown > 0){
RayCooldown -= 1;
if(AngerLevel > 60)
AngerLevel = 60;
}

if(AngerLevel > 0)
AngerLevel -= 1;

if(Looking > 0)
Looking -= 1;

if(PissedAtTC1 > 0)
PissedAtTC1 -= 1;
  
if(PissedAtTC3 > 0)
PissedAtTC3 -= 1;
  
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


if(AngerLevel < 5){
LArm.targetRotation = Quaternion.Euler(0, 0, 0);
RArm.targetRotation = Quaternion.Euler(0, 0, 0);
}

if(target)
if(DangerSense == 1){
if(AngerLevel > 5 && !target.name.Contains ("TC")){
  AngerLevel = 0;
  target = Waypoint;
}
}

if(Looking == 1){
if(AngerLevel < 5){

  target = Waypoint;
  var TheThing5 = Instantiate(WarningSoundDismiss, thisTransform.position + Vector3(0,-2,0), Quaternion.identity);
  TheThing5.transform.parent = thisTransform;
  
  Trig.center = Vector3(0,0,100);
  Trig.radius = 100;
  Trig.height = 400;
  
}
}

Obstacle = false;

}

function Tick () {

target = Waypoint;
  
  yield WaitForSeconds (2);
  
  target = Forward;

}

function Warning () {
  if(AngerLevel < 1){
  var TheThing6 = Instantiate(WarningSoundPatrolling, thisTransform.position + Vector3(0,-2,0), Quaternion.identity);
  TheThing6.transform.parent = thisTransform;
  
  Waypoint.position = transform.parent.parent.transform.position;
  }
}