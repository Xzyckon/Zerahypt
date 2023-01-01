var target : Transform;
var Comrade : Transform;

var Suspect : Transform;

var ResetView : Transform;

var Home : Transform;

var trig : MeshCollider;

var thisTransform : Transform;
var thisVTransform : Transform;

var vRigidbody : Rigidbody;

var WorkAudio : AudioSource;
var BeamAudio : AudioSource;
var BeamStopAudio : AudioSource;

var CruiserAttachment : boolean;
var Complementary : boolean;

var IsDroneLauncher : boolean;
var IsRayGun : boolean;
var IsRadar : boolean;

var PartnerCruiserAI : SlavuicCruiserAI;

var PartnerDroneLauncherAI : SlavuicProteusAI;
var PartnerRayGunAI1 : SlavuicProteusAI;
var PartnerRayGunAI2 : SlavuicProteusAI;

var trigRadius = 2;
var trigPosZ = 0;

var ZapPrefab : GameObject;

var TheZap : GameObject;

var Muzzle : Transform;

var Drone1Prefab : GameObject;

var Drone1Spawn : Transform;

var Drone1Model : GameObject;

var Drone1AI : SlavuicMachineAI;

var PissedAtTC0a = 0;

var PissedAtTC1 = 0;
var PissedAtTC3 = 0;
var PissedAtTC4 = 0;
var PissedAtTC7 = 0;
var PissedAtTC8 = 0;
var PissedAtTC9 = 0;

var AimForceMod : float = 0.01;

var TurnForce : float = 1;

var RPModX : float = 0;
var RPModZ : float = 0;

var RPxClamp : float = 0;
var RPzClamp : float = 0;

var HoriNum : float = 0;
var VertNum : float = 0;

var FuckingRead : float = 0;

var Obscurity = 0;

var Priority : boolean;

var PriorityBreak = 0;

var Obstacle : boolean;

var HasDrone : boolean;

var IsZapping : boolean;

var targetLayers : LayerMask;

InvokeRepeating("Updater", 1, 0.3);

function Start (){

if(Drone1Model)
if(Drone1Model.activeSelf == true)
HasDrone = true;

target = ResetView;

if(!CruiserAttachment)
if(SlavuicNetwork.instance.SlavBaseHomePoint != null)
if(Vector3.Distance(thisTransform.position, SlavuicNetwork.instance.SlavBaseHomePoint.position) < 1000)
Home = SlavuicNetwork.instance.SlavBaseHomePoint;

var randomValue : int = Random.Range(0, 1);

yield WaitForSeconds (randomValue);

if(!CruiserAttachment)
if(IsRadar){
if(SlavuicNetwork.instance.BaseRadar1 == null){
SlavuicNetwork.instance.BaseRadar1 = this;
}else{
if(SlavuicNetwork.instance.BaseRadar2 == null)
SlavuicNetwork.instance.BaseRadar2 = this;
}
}

if(IsDroneLauncher){
AimForceMod = 0.01;

if(SlavuicNetwork.instance.BaseDroneLauncher == null)
SlavuicNetwork.instance.BaseDroneLauncher = this;
}

if(IsRayGun){
AimForceMod = 0.02;

if(!CruiserAttachment){
if(SlavuicNetwork.instance.BaseRayGun1 == null){
SlavuicNetwork.instance.BaseRayGun1 = this;
}else{
if(SlavuicNetwork.instance.BaseRayGun2 == null)
SlavuicNetwork.instance.BaseRayGun2 = this;
}
}

}

yield WaitForSeconds (2);

if(IsRadar){
if(SlavuicNetwork.instance.BaseDroneLauncher != null)
PartnerDroneLauncherAI = SlavuicNetwork.instance.BaseDroneLauncher;
if(SlavuicNetwork.instance.BaseRayGun1 != null)
PartnerRayGunAI1 = SlavuicNetwork.instance.BaseRayGun1;
if(SlavuicNetwork.instance.BaseRayGun2 != null)
PartnerRayGunAI2 = SlavuicNetwork.instance.BaseRayGun2;
}

}

function Update () {
if(IsDroneLauncher){
Obstacle = false;

Debug.DrawRay (thisTransform.position + thisTransform.forward * 5 + thisTransform.right * 2, thisTransform.forward * 128, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 5 + thisTransform.right * 2, thisTransform.forward, 128))
     Obstacle = true;

Debug.DrawRay (thisTransform.position + thisTransform.forward * 5 + -thisTransform.right * 2, thisTransform.forward * 128, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 5 + -thisTransform.right * 2, thisTransform.forward, 128))
	 Obstacle = true;
}

if(IsRayGun){
Obstacle = false;

var hit : RaycastHit;

Debug.DrawRay (thisTransform.position + thisTransform.forward * 8 + thisTransform.right * 1, thisTransform.forward * 1000, Color.yellow);
Debug.DrawRay (thisTransform.position + thisTransform.forward * 8 + -thisTransform.right * 1, thisTransform.forward * 1000, Color.yellow);
Debug.DrawRay (thisTransform.position + thisTransform.forward * 8 + -thisTransform.up * 1, thisTransform.forward * 1000, Color.yellow);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 8 + thisTransform.right * 1, thisTransform.forward, hit, 1000, targetLayers) ||
    Physics.Raycast (thisTransform.position + thisTransform.forward * 8 + -thisTransform.right * 1, thisTransform.forward, hit, 1000, targetLayers) ||
    Physics.Raycast (thisTransform.position + thisTransform.forward * 8 + -thisTransform.up * 1, thisTransform.forward, hit, 1000, targetLayers))
	 if(hit.collider.tag.Contains ("tru") || hit.collider.name.Contains ("slav") || hit.collider.name.Contains ("T5"))
	 Obstacle = true;

if(Obstacle){
if(IsZapping){
Destroy(TheZap);
IsZapping = false;
BeamStopAudio.Play();
}
}

}
}


private var RP : Vector3;
function FixedUpdate () {

if(!IsRadar){

if(target)
var RelativeTarget = thisVTransform.InverseTransformPoint(target.position);

RP = RelativeTarget;

if(IsDroneLauncher){
RPModX = RP.x * AimForceMod;
RPxClamp = Mathf.Clamp(RPModX,-TurnForce,TurnForce);

vRigidbody.AddTorque(thisVTransform.forward * RPxClamp);

HoriNum = Mathf.Abs(RPxClamp);

}

if(IsRayGun){

RPModX = RP.x * AimForceMod;
RPxClamp = Mathf.Clamp(RPModX,-TurnForce,TurnForce);

RPModZ = -RP.z * AimForceMod;
RPzClamp = Mathf.Clamp(RPModZ,-TurnForce,TurnForce);

vRigidbody.AddTorque(thisVTransform.forward * RPxClamp);
vRigidbody.AddTorque(thisVTransform.right * RPzClamp);

HoriNum = Mathf.Abs(RPxClamp);
VertNum = Mathf.Abs(RPzClamp);

if(!IsZapping){
if(BeamAudio.audio.volume > 0)
BeamAudio.volume -= 0.05;
else
BeamAudio.Stop();
}

}

FuckingRead = HoriNum + VertNum;

}else{
if(!Complementary)
vRigidbody.AddTorque(thisVTransform.forward * -TurnForce);

if(!CruiserAttachment){
if(thisVTransform.localEulerAngles.z < 90){
trig.enabled = true;
}

if(thisVTransform.localEulerAngles.z > 90 && thisVTransform.localEulerAngles.z < 270){
trig.enabled = false;
}
}

}

}

function OnTriggerEnter (other : Collider) {

ON = other.name;
OT = other.transform;

if(IsRadar){
if(ON.Contains ("TFC")){
if(other.rigidbody){
ThreatAssessment(other.rigidbody, OT);
}else{
if(ON.Contains ("TFC0a"))
PissedAtTC0a += 1;
if(ON.Contains ("TFC1"))
PissedAtTC1 += 1;
if(ON.Contains ("TFC4"))
PissedAtTC4 += 1;
if(ON.Contains ("TFC7"))
PissedAtTC7 += 1;
if(ON.Contains ("TFC8"))
PissedAtTC8 += 1;
if(ON.Contains ("TFC9"))
PissedAtTC9 += 1;
}
}

if(PissedAtTC0a == 1)
if(ON.Contains ("TC0a"))
Suspect = OT;

if(PissedAtTC1 == 1)
if(ON.Contains ("TC1"))
Suspect = OT;

if(PissedAtTC3 == 1)
if(!ON.Contains ("cT"))
if(ON.Contains ("TC3"))
Suspect = OT;

if(PissedAtTC4 == 1)
if(ON.Contains ("TC4"))
Suspect = OT;

if(!ON.Contains ("cT"))
if(ON.Contains ("TC6"))
Suspect = OT;

if(PissedAtTC7 == 1)
if(!ON.Contains ("cT"))
if(ON.Contains ("TC7"))
Suspect = OT;

if(PissedAtTC8 == 1)
if(!ON.Contains ("cT"))
if(ON.Contains ("TC8"))
Suspect = OT;

if(PissedAtTC9 == 1)
if(!ON.Contains ("cT"))
if(ON.Contains ("TC9"))
Suspect = OT;

if(CruiserAttachment){
if(!ON.Contains ("TC5")){
PartnerCruiserAI.TargetIn(OT);

PartnerCruiserAI.bottomTarget = OT;

if(ON.Contains ("bMT")){
PartnerCruiserAI.upperTarget = OT;
Priority = false;
PriorityBreak = 6;
}else{
if(PriorityBreak < 1)
PartnerCruiserAI.upperTarget = OT;
}
}
}

}
}

function ThreatAssessment (threatRB : Rigidbody, threatTF : Transform){

var RTT = threatTF.InverseTransformPoint(thisVTransform.position);

RTPx = Mathf.Abs(RTT.x);
RTPy = Mathf.Abs(RTT.y);

RTP = RTPx + RTPy;

var Load = Resources.Load("Prefabs/ThreatCursor", GameObject) as GameObject;

var TGO = Instantiate(Load, threatTF.position + threatTF.forward * threatRB.velocity.z, threatTF.rotation);

if(threatRB.name.Contains ("TFC0a"))
PissedAtTC0a = 1;

if(threatRB.name.Contains ("TFC1"))
PissedAtTC1 = 1;
if(threatRB.name.Contains ("TFC4"))
PissedAtTC4 = 1;
if(threatRB.name.Contains ("TFC7"))
PissedAtTC7 = 1;
if(threatRB.name.Contains ("TFC8"))
PissedAtTC8 = 1;
if(threatRB.name.Contains ("TFC9"))
PissedAtTC9 = 1;


if(Vector3.Distance(thisTransform.position, TGO.transform.position) < 200){
if(threatRB.name.Contains ("TFC0a"))
if(PissedAtTC0a == 1)
PissedAtTC0a = 2;

if(threatRB.name.Contains ("TFC1"))
if(PissedAtTC1 == 1)
PissedAtTC1 = 2;
if(threatRB.name.Contains ("TFC4"))
if(PissedAtTC4 == 1)
PissedAtTC4 = 2;
if(threatRB.name.Contains ("TFC7"))
if(PissedAtTC7 == 1)
PissedAtTC7 = 2;
if(threatRB.name.Contains ("TFC8"))
if(PissedAtTC8 == 1)
PissedAtTC8 = 2;
if(threatRB.name.Contains ("TFC9"))
if(PissedAtTC9 == 1)
PissedAtTC9 = 2;

Destroy(TGO);

}else{

if(RTP < 150){
if(Suspect){
if(Vector3.Distance(Suspect.position, TGO.transform.position) > 1000){
if(threatRB.name.Contains ("TFC0a"))
if(PissedAtTC0a == 1)
PissedAtTC0a = 2;

if(threatRB.name.Contains ("TFC1"))
if(PissedAtTC1 == 1)
PissedAtTC1 = 2;
if(threatRB.name.Contains ("TFC4"))
if(PissedAtTC4 == 1)
PissedAtTC4 = 2;
if(threatRB.name.Contains ("TFC7"))
if(PissedAtTC7 == 1)
PissedAtTC7 = 2;
if(threatRB.name.Contains ("TFC8"))
if(PissedAtTC8 == 1)
PissedAtTC8 = 2;
if(threatRB.name.Contains ("TFC9"))
if(PissedAtTC9 == 1)
PissedAtTC9 = 2;

}else{

if(RTT.z > 0){
if(threatRB.name.Contains ("TFC0a"))
if(PissedAtTC0a == 1)
PissedAtTC0a = 2;
if(threatRB.name.Contains ("TFC1"))
if(PissedAtTC1 == 1)
PissedAtTC1 = 2;
if(threatRB.name.Contains ("TFC4"))
if(PissedAtTC4 == 1)
PissedAtTC4 = 2;
if(threatRB.name.Contains ("TFC7"))
if(PissedAtTC7 == 1)
PissedAtTC7 = 2;
if(threatRB.name.Contains ("TFC8"))
if(PissedAtTC8 == 1)
PissedAtTC8 = 2;
if(threatRB.name.Contains ("TFC9"))
if(PissedAtTC9 == 1)
PissedAtTC9 = 2;

}
}
}

}

Destroy(TGO);

}

}

function OnTriggerStay (other : Collider) {

ON = other.name;
OT = other.transform;

if(IsRadar){
if(!Priority){

if(PissedAtTC0a > 1)
if(ON.Contains ("TC0a")){
target = OT;
if(CruiserAttachment)
if(Vector3.Distance(thisTransform.position, OT.position) < 256)
PartnerCruiserAI.OnHull = true;
}

if(PissedAtTC1 > 1)
if(ON.Contains ("TC1")){
target = OT;
if(CruiserAttachment)
if(Vector3.Distance(thisTransform.position, OT.position) < 256)
PartnerCruiserAI.OnHull = true;
}

if(PissedAtTC3 > 1)
if(!ON.Contains ("cT"))
if(ON.Contains ("TC3")){
target = OT;
if(CruiserAttachment)
if(Vector3.Distance(thisTransform.position, OT.position) < 256)
PartnerCruiserAI.OnHull = true;
}

if(PissedAtTC4 > 1)
if(ON.Contains ("TC4")){
target = OT;
if(CruiserAttachment)
if(Vector3.Distance(thisTransform.position, OT.position) < 256)
PartnerCruiserAI.OnHull = true;
}

if(!ON.Contains ("cT"))
if(ON.Contains ("TC6")){
target = OT;
if(CruiserAttachment)
if(Vector3.Distance(thisTransform.position, OT.position) < 256)
PartnerCruiserAI.OnHull = true;
}

if(PissedAtTC7 > 1)
if(!ON.Contains ("cT"))
if(ON.Contains ("TC7")){
target = OT;
if(CruiserAttachment)
if(Vector3.Distance(thisTransform.position, OT.position) < 256)
PartnerCruiserAI.OnHull = true;
}

if(PissedAtTC8 > 1)
if(!ON.Contains ("cT"))
if(ON.Contains ("TC8")){
target = OT;
if(CruiserAttachment)
if(Vector3.Distance(thisTransform.position, OT.position) < 256)
PartnerCruiserAI.OnHull = true;
}

if(PissedAtTC9 > 1)
if(!ON.Contains ("cT"))
if(ON.Contains ("TC9")){
target = OT;
if(CruiserAttachment)
if(Vector3.Distance(thisTransform.position, OT.position) < 256)
PartnerCruiserAI.OnHull = true;
}

if(CruiserAttachment)
if(ON.Contains ("xbTC5"))
Comrade = OT;

if(PriorityBreak < 1)
if(ON.Contains ("bMT")){
target = OT;
Priority = true;
}

}

}
}

function Updater () {

if(SlavuicNetwork.TC1DeathRow > 8)
PissedAtTC1 = 2;
if(SlavuicNetwork.TC3DeathRow > 8)
PissedAtTC3 = 2;
if(SlavuicNetwork.TC4DeathRow > 8)
PissedAtTC4 = 2;
if(SlavuicNetwork.TC6DeathRow > 8)
PissedAtTC6 = 2;
if(SlavuicNetwork.TC7DeathRow > 8)
PissedAtTC7 = 2;
if(SlavuicNetwork.TC8DeathRow > 8)
PissedAtTC8 = 2;
if(SlavuicNetwork.TC9DeathRow > 8)
PissedAtTC9 = 2;

if(target){

if(IsRadar){
if(!CruiserAttachment){
if(PartnerDroneLauncherAI)
if(PartnerDroneLauncherAI.target)
PartnerDroneLauncherAI.target = target;
if(PartnerRayGunAI1){
if(PartnerRayGunAI1.target)
if(!PartnerRayGunAI1.target.name.Contains ("TC"))
PartnerRayGunAI1.target = target;
if(target.name.Contains ("bMT"))
PartnerRayGunAI1.target = target;
}
if(PartnerRayGunAI2){
if(PartnerRayGunAI2.target)
if(!PartnerRayGunAI2.target.name.Contains ("TC"))
PartnerRayGunAI2.target = target;
if(target.name.Contains ("bMT"))
PartnerRayGunAI2.target = target;
}
}else{
if(PriorityBreak > 0)
PriorityBreak -= 1;
}

}

if(IsDroneLauncher){

if(HasDrone && !Obstacle)
if(target.name.Contains ("TC"))
Launch();

if(Drone1AI)
Drone1AI.AssignedTarget = target;

}

if(IsRayGun){

if(Vector3.Distance(thisTransform.position, target.position) > 1000 || Obscurity > 4)
target = ResetView;

if(!Obstacle){
if(target.name.Contains ("TC")){
Zap();
}else{
if(IsZapping){
Destroy(TheZap);
IsZapping = false;
BeamStopAudio.Play();
}
}

Obscurity = 0;
}else{
if(FuckingRead < 0.5 && target.name.Contains ("TC"))
Obscurity += 1;
else
Obscurity = 0;
}

}

}else{
target = ResetView;
}

if(CruiserAttachment)
if(Comrade)
PartnerCruiserAI.Comrade = Comrade;

}

function Zap () {

yield WaitForSeconds (0.1);

if(target){

if(!Obstacle && FuckingRead < 0.02 && target.name.Contains ("TC")){
if(!IsZapping){
IsZapping = true;
TheZap = Instantiate(ZapPrefab, Muzzle.position, Muzzle.rotation);
TheZap.transform.parent = thisTransform.parent;
BeamAudio.audio.volume = 1;
BeamAudio.audio.Play();
}
}else{
if(IsZapping){
Destroy(TheZap);
IsZapping = false;
BeamStopAudio.Play();
}
}

}else{
if(IsZapping){
Destroy(TheZap);
IsZapping = false;
BeamStopAudio.Play();
}
}
}

function Launch () {

yield WaitForSeconds (0.1);

if(target){

if(IsDroneLauncher){
if(HasDrone && !Obstacle && FuckingRead < 0.01){
if(target.name.Contains ("TC")){

HasDrone = false;
Drone1Model.gameObject.SetActive (false);

WorkAudio.Play();

var Spawn1 = Instantiate(Drone1Prefab, Drone1Spawn.position, Drone1Spawn.rotation);
    Spawn1.transform.GetChild(0).rigidbody.velocity = vRigidbody.velocity * 1;
    Spawn1.transform.GetChild(0).rigidbody.AddForce(Drone1Spawn.transform.right * 200);
    Drone1AI = Spawn1.transform.GetChild(0).GetComponent(SlavuicMachineAI);
    Drone1AI.target = target;
    Drone1AI.Home = Home;
}
}

}
}
}