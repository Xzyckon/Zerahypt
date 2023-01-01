var target : Transform;
var AimTarget : Transform;
var Comrade : Transform;

var bottomTarget : Transform;
var upperTarget : Transform;

var Waypoint : Transform;
var MapCenter : Transform;

var Base1 : Transform;

var DockEnter : Transform;
var DockPoint : Transform;
var DockAim : Transform;

var FineTarget : Transform;

var thisTransform : Transform;
var thisVTransform : Transform;

var vRigidbody : Rigidbody;

var ResetAimpoint : Transform;

var AIAnchor : Transform;

var OverviewB : Transform;
var OverviewMR : Transform;
var OverviewML : Transform;

var RRP : Transform;
var LRP : Transform;

var Turret1 : SlavuicGunController;
var Turret2 : SlavuicGunController;
var Turret3 : SlavuicGunController;
var Turret4 : SlavuicGunController;
var Turret5 : SlavuicGunController;
var Turret6 : SlavuicGunController;

var RayGun1 : SlavuicProteusAI;
var RayGun2 : SlavuicProteusAI;

var BM100Launcher : HingeJoint;
var RocketModel : Transform;
var RocketModelR : MeshRenderer;

var Rocket : GameObject;

var LaunchTimerR = 0;
var LaunchTimerL = 0;
var LaunchTimerC = 0;

var DecidingToLaunch = 0;
var LaunchingBM100 : boolean;

var BombLauncherR : Transform;
var RBLModel1 : Transform;
var RBLModel2 : Transform;
var RBLModel3 : Transform;
var RBLModel1R : MeshRenderer;
var RBLModel2R : MeshRenderer;
var RBLModel3R : MeshRenderer;

var BombLauncherL : Transform;
var LBLModel1 : Transform;
var LBLModel2 : Transform;
var LBLModel3 : Transform;
var LBLModel1R : MeshRenderer;
var LBLModel2R : MeshRenderer;
var LBLModel3R : MeshRenderer;

var Bomb : GameObject;

var BomberTarget : Transform;

var RBombLaunch : boolean;
var RBReloading : boolean;

var LBombLaunch : boolean;
var LBReloading : boolean;

var Gun1 : NPCGun;
var Gun2 : NPCGun;
var ThrusterEffect1 : GameObject;
var ThrusterEffect2 : GameObject;
var ThrusterEffect3 : GameObject;
var ThrusterEffect4 : GameObject;
var Presence : GameObject;
var AttackSound : GameObject;

var Crewman1 : GameObject;
var Crewman2 : GameObject;

var CrewSpawn1 : Transform;
var CrewSpawn2 : Transform;

var LiveCrewman1 : GameObject;
var LiveCrewman2 : GameObject;
var LiveCrewman3 : GameObject;
var LiveCrewman4 : GameObject;

var PissedAtTC0a = 0;

var PissedAtTC1 = 0;
var PissedAtTC3 = 0;
var PissedAtTC4 = 0;
var PissedAtTC6 = 0;
var PissedAtTC7 = 0;
var PissedAtTC8 = 0;
var PissedAtTC9 = 0;

var FoundMedium : boolean;
var FoundBig : boolean;

var DockTimer = 0;

var DutyTimer = 0;

var OnDuty : boolean;
var ReturningToDock : boolean;
var Attacking : boolean;
var Obstacle : boolean = false;
var Stuck : boolean = false;
var StuckTimer = 0;
var StuckCounter = 0;

var Docking : boolean;
var DockingPart = 0;

var Reversing : boolean;

var OnHull : boolean;

var Emergency : boolean;

var RVO : boolean;
var LVO : boolean;

var RVODist : float = 0;
var LVODist : float = 0;

var TurnRight : boolean;
var TurnLeft : boolean;

var RightDist : float = 200;
var LeftDist : float = 200;

var RUP : float = 0;

var RRUP : float = 0;
var LRUP : float = 0;

var AngClamp = 2;

var Wall : boolean;
var RWall : boolean;
var LWall : boolean;

var Pointu : Vector3;
var Pointd : Vector3;

var RPointu : Vector3;
var RPointur : Vector3;
var RPointd : Vector3;

var LPointu : Vector3;
var LPointul : Vector3;
var LPointd : Vector3;

var localV : Vector3;

var VelDir : Vector3;

var AimForce : float = 0;
var TurnForce : float = 0;

var Vel : float = 0;
var VelDiv : float = 0;

var targetLayers : LayerMask;

var MtargetLayers : LayerMask;

var EnemyApproaching : boolean;

var Distancing = 0;

var TurnIn = 0;

var GOpen : boolean;
var GClose : boolean;

var SpawnCounter = 0;

var Spot = 0;

var Ignorage = 0;

var CanLaunch = 0;

InvokeRepeating("Regenerator", 1, 1);

function Start () {

MapCenter = SlavuicNetwork.instance.gameObject.transform;

if(SlavuicNetwork.instance.SlavBaseHomePoint)
Base1 = SlavuicNetwork.instance.SlavBaseHomePoint;

if(Base1){
DockTimer = Random.Range(30, 480);
DockEnter = SlavuicNetwork.instance.SlavBaseDock1E;
DockPoint = SlavuicNetwork.instance.SlavBaseDock1P;
DockAim = SlavuicNetwork.instance.SlavBaseDock1A;
}else{
DockTimer = 460;
DutyTimer = 600;
OnDuty = true;
}
}

function Update () {

thisTransform.rotation = AIAnchor.transform.rotation;
thisTransform.position = AIAnchor.transform.position;

if(Attacking){
if(target == Waypoint){
target = ResetAimpoint;
Attacking = false;
Spot = 0;
}
if(target == null){
target = ResetAimpoint;
Attacking = false;
Spot = 0;
FoundMedium = false;
FoundBig = false;
}else{
if(target.name.Contains ("broken")){
target = ResetAimpoint;
Attacking = false;
Spot = 0;
FoundMedium = false;
FoundBig = false;
}
}
}

VelDir = vRigidbody.velocity;
	
localV = thisVTransform.InverseTransformDirection(VelDir);

Vel = vRigidbody.velocity.magnitude;

var hit : RaycastHit;

var hit1 : RaycastHit;
var hit2 : RaycastHit;
var hit3 : RaycastHit;

if(RUP < 16)
RUP += 1;
else
RUP = 0;

if(RRUP < 24)
RRUP += 2;
else
RRUP = 2;

var VelClamp = Mathf.Clamp(Vel * 4,80,400);
AngClamp = Mathf.Clamp(Vel * 0.15,2,8);

var DMod1 = 160 - Vel;
var DMod = Mathf.Clamp(DMod1,1,160);

//===========================================================================================================================

if(OnDuty && !Docking){

Debug.DrawRay (thisTransform.position + thisTransform.forward * 70 + -thisTransform.up * 10 + thisTransform.up * RUP, thisTransform.forward * VelClamp, Color.white);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 70 + -thisTransform.up * 10 + thisTransform.up * RUP, thisTransform.forward, hit1, VelClamp, targetLayers))
Pointu = hit1.point;
else
Pointu = Vector3(2,2,2);

Debug.DrawRay (thisTransform.position + thisTransform.forward * 70 + -thisTransform.up * 12 + thisTransform.up * RUP, thisTransform.forward * VelClamp, Color.white);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 70 + -thisTransform.up * 12 + thisTransform.up * RUP, thisTransform.forward, hit2, VelClamp, targetLayers))
Pointd = hit2.point;
else
Pointd = Vector3(8,8,8);

if(Vector3.Distance(Pointu, Pointd) < AngClamp){
Wall = true;
}

if(!OnHull)
Obstacle = false;

Debug.DrawRay (thisTransform.position + thisTransform.forward * 70 + thisTransform.right * 16, thisTransform.forward * VelClamp, Color.green);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 70 + thisTransform.right * 16, thisTransform.forward, hit, VelClamp, targetLayers))
     if(Wall)
     Obstacle = true;

Debug.DrawRay (thisTransform.position + thisTransform.forward * 70 + -thisTransform.right * 16, thisTransform.forward * VelClamp, Color.green);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 70 + -thisTransform.right * 16, thisTransform.forward, hit, VelClamp, targetLayers))
     if(Wall)
     Obstacle = true;


Debug.DrawRay (thisTransform.position + thisTransform.forward * 70 + thisTransform.right * RRUP + -thisTransform.up * 6 + thisTransform.up * RUP, thisTransform.forward * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 70 + thisTransform.right * RRUP + -thisTransform.up * 6 + thisTransform.up * RUP, thisTransform.forward, hit1, VelClamp, targetLayers)){
RPointu = hit1.point;
}else{
RPointu = Vector3(2,2,2);
}

Debug.DrawRay (thisTransform.position + thisTransform.forward * 70 + thisTransform.right * RRUP + thisTransform.right * 1 + -thisTransform.up * 6 + thisTransform.up * RUP, thisTransform.forward * VelClamp, Color.blue);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 70 + thisTransform.right * RRUP + thisTransform.right * 1 + -thisTransform.up * 6 + thisTransform.up * RUP, thisTransform.forward, hit3, VelClamp, targetLayers)){
RPointur = hit3.point;
}else{
RPointur = Vector3(4,4,4);
}

Debug.DrawRay (thisTransform.position + thisTransform.forward * 70 + thisTransform.right * RRUP + -thisTransform.up * 7 + thisTransform.up * RUP, thisTransform.forward * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 70 + thisTransform.right * RRUP + -thisTransform.up * 7 + thisTransform.up * RUP, thisTransform.forward, hit2, VelClamp, targetLayers)){
RPointd = hit2.point;
RightDist = hit2.distance;
}else{
RPointd = Vector3(8,8,8);
RightDist = 512;
}

if(Vector3.Distance(RPointu, RPointd) < AngClamp)
RWall = true;

Debug.DrawRay (thisTransform.position + thisTransform.forward * 70 + -thisTransform.right * RRUP + -thisTransform.up * 6 + thisTransform.up * RUP, thisTransform.forward * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 70 + -thisTransform.right * RRUP + -thisTransform.up * 6 + thisTransform.up * RUP, thisTransform.forward, hit1, VelClamp, targetLayers)){
LPointu = hit1.point;
}else{
LPointu = Vector3(2,2,2);
}

Debug.DrawRay (thisTransform.position + thisTransform.forward * 70 + -thisTransform.right * RRUP + -thisTransform.right * 1 + -thisTransform.up * 6 + thisTransform.up * RUP, thisTransform.forward * VelClamp, Color.blue);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 70 + -thisTransform.right * RRUP + -thisTransform.right * 1 + -thisTransform.up * 6 + thisTransform.up * RUP, thisTransform.forward, hit3, VelClamp, targetLayers)){
LPointul = hit3.point;
}else{
LPointul = Vector3(4,4,4);
}

Debug.DrawRay (thisTransform.position + thisTransform.forward * 70 + -thisTransform.right * RRUP + -thisTransform.up * 7 + thisTransform.up * RUP, thisTransform.forward * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 70 + -thisTransform.right * RRUP + -thisTransform.up * 7 + thisTransform.up * RUP, thisTransform.forward, hit2, VelClamp, targetLayers)){
LPointd = hit2.point;
LeftDist = hit2.distance;
}else{
LPointd = Vector3(8,8,8);
LeftDist = 512;
}

if(Vector3.Distance(LPointu, LPointd) < AngClamp)
LWall = true;

Debug.DrawRay (thisTransform.position + thisTransform.up * 70 + thisTransform.forward * VelClamp, -thisTransform.up * DMod, Color.white);
if (!Physics.Raycast (thisTransform.position + thisTransform.up * 70 + thisTransform.forward * VelClamp, -thisTransform.up, DMod))
     Obstacle = true;

//===========================================================================================================================
             Debug.DrawRay (thisTransform.position + thisTransform.up * 80 
                                  + thisTransform.right * 80
                                  + thisTransform.forward * VelClamp, thisTransform.up * -160, Color.white);
if (!Physics.Raycast (thisTransform.position + thisTransform.up * 80
                                        + thisTransform.right * 80 
                                        + thisTransform.forward * VelClamp, -thisTransform.up, 160))
     TurnLeft = true;

             Debug.DrawRay (thisTransform.position + thisTransform.up * 80
                                  + -thisTransform.right * 80
                                  + thisTransform.forward * VelClamp, thisTransform.up * -160, Color.white);
if (!Physics.Raycast (thisTransform.position + thisTransform.up * 80
                                        + -thisTransform.right * 80 
                                        + thisTransform.forward * VelClamp, -thisTransform.up, 160))
     TurnRight = true;
     
//===========================================================================================================================

if(RightDist > LeftDist){
if(Vector3.Distance(LPointu, LPointd) < 4)
     TurnRight = true;
     }
     
 if(LeftDist > RightDist){
 if(Vector3.Distance(RPointu, RPointd) < 4)
     TurnLeft = true;
     }
     
if(LeftDist < 160 && LWall)
Obstacle = true;

if(RightDist < 160 && RWall)
Obstacle = true;

}

}


function FixedUpdate () {

if(OnDuty){
if(!Docking){

if(Obstacle)
if(-localV.y > 0)
  vRigidbody.AddForce(thisVTransform.up * 10000);

if(Stuck)
if(localV.y < 8)
  vRigidbody.AddForce(thisVTransform.up * 10000);
  
if(!Obstacle && !Stuck && !TurnLeft && !TurnRight) {

if(!Attacking){
  if(-localV.y < 60)
  vRigidbody.AddForce(-thisVTransform.up * 10000);
  }else{
  if(Distancing > 0){
  if(-localV.y < 80)
  vRigidbody.AddForce(-thisVTransform.up * 15000);
  }else{
  if(-localV.y > 2)
  vRigidbody.AddForce(thisVTransform.up * 10000);
  }
  }
  
}else{
if(Attacking && !ReturningToDock && OnDuty)
Reversing = true;
}

if(!Stuck){
if(TurnLeft){
AimForce = 0;
TurnForce = -400000;
}

if(TurnRight){
AimForce = 0;
TurnForce = 400000;
}
}else{
AimForce = 0;
TurnForce = 400000;
}

if(TurnRight && TurnLeft && Obstacle){
TurnForce = -400000;
}

if(!ReturningToDock && OnDuty)
if(Attacking && !Obstacle && AimTarget != null){
if(!TurnRight && !TurnLeft){

if(Vector3.Distance(thisTransform.position, AimTarget.position) > 300 && !TurnRight && !TurnLeft){
AimForce = 20000;
TurnForce = -100000;
}

}
}

}else{
if(!Obstacle){
if(DockingPart == 0){
if(-localV.y < 10)
vRigidbody.AddForce(-thisVTransform.up * 3300);
else
vRigidbody.AddForce(thisVTransform.up * 5000);
}
if(DockingPart == 2){
if(-localV.y > 1)
  vRigidbody.AddForce(thisVTransform.up * 5000);
}
}else{
if(-localV.y > 0)
  vRigidbody.AddForce(thisVTransform.up * 5000);
}
}

}else{

if(Reversing){
if(localV.y < 40)
vRigidbody.AddForce(thisVTransform.up * 3300);

if(TurnRight){
AimForce = 0;
TurnForce = 200000;
}
}

}

vRigidbody.AddTorque(thisTransform.up * TurnForce);

if(AimTarget){
vRigidbody.AddForceAtPosition((AimTarget.position - thisTransform.position).normalized * AimForce, thisTransform.forward * 16);
vRigidbody.AddForceAtPosition((AimTarget.position - thisTransform.position).normalized * -AimForce, -thisTransform.forward * 16);
}

if(FineTarget){
if(DockingPart < 4){
if(!Obstacle){
if(-localV.y < 5)
vRigidbody.AddForce((FineTarget.position - thisTransform.position).normalized * 2000);
}else{
if(-localV.y < 0.1)
vRigidbody.AddForce((FineTarget.position - thisTransform.position).normalized * 2000);
}
}else{
vRigidbody.AddForce((FineTarget.position - thisTransform.position).normalized * 1000);
}
}

if(OnDuty){
if(BomberTarget){

var LocalRBLP = BombLauncherR.InverseTransformPoint(BomberTarget.position);
var LocalLBLP = BombLauncherL.InverseTransformPoint(BomberTarget.position);

RPClampX = Mathf.Abs(LocalRBLP.x);
LPClampX = Mathf.Abs(LocalLBLP.x);

if(!RBReloading){
if(!RBombLaunch){
if(LocalRBLP.x < 0)
if(BombLauncherR.localEulerAngles.y < 30 || BombLauncherR.localEulerAngles.y > 180)
BombLauncherR.localEulerAngles.y += 1;

if(LocalRBLP.x > 0)
if(BombLauncherR.localEulerAngles.y > 315 || BombLauncherR.localEulerAngles.y < 180)
BombLauncherR.localEulerAngles.y -= 1;
}else{
if(BombLauncherR.localEulerAngles.y > 315 || BombLauncherR.localEulerAngles.y < 180)
BombLauncherR.localEulerAngles.y -= 1;
}
}else{
if(BombLauncherR.localEulerAngles.y > 110 || BombLauncherR.localEulerAngles.y < 0)
BombLauncherR.localEulerAngles.y -= 1;
}

if(!LBReloading){
if(!LBombLaunch){
if(LocalLBLP.x < 0)
if(BombLauncherL.localEulerAngles.y < 45 || BombLauncherL.localEulerAngles.y > 180)
BombLauncherL.localEulerAngles.y += 1;

if(LocalLBLP.x > 0)
if(BombLauncherL.localEulerAngles.y > 330 || BombLauncherL.localEulerAngles.y < 180)
BombLauncherL.localEulerAngles.y -= 1;
}else{
if(BombLauncherL.localEulerAngles.y < 45 || BombLauncherL.localEulerAngles.y > 180)
BombLauncherL.localEulerAngles.y += 1;
}
}else{
if(BombLauncherL.localEulerAngles.y < 250 || BombLauncherL.localEulerAngles.y < 0)
BombLauncherL.localEulerAngles.y += 1;
}

if(RPClampX < 16 && LocalRBLP.y > 100 && !RBombLaunch){
RBombLaunch = true;
RBombing();
}

if(LPClampX < 16 && LocalLBLP.y > 100 && !LBombLaunch){
LBombLaunch = true;
LBombing();
}

}else{
if(BombLauncherR.localEulerAngles.y < 20 || BombLauncherR.localEulerAngles.y > 180)
BombLauncherR.localEulerAngles.y += 1;
if(BombLauncherL.localEulerAngles.y > 340 || BombLauncherL.localEulerAngles.y < 180)
BombLauncherL.localEulerAngles.y -= 1;
}
}



if(LaunchingBM100){
if(BM100Launcher.spring.targetPosition > -90)
BM100Launcher.spring.targetPosition -= 0.5;
}else{
if(BM100Launcher.spring.targetPosition < 0)
BM100Launcher.spring.targetPosition += 0.5;
}

//[Launch]====================================================================================================
if(target)
if(Attacking && CanLaunch < 1 && OnDuty){


if(LaunchTimerC < 29){
if (!Physics.Linecast (OverviewB.position, target.position, MtargetLayers)){
if(target.name.Contains ("bTC")){
if(LaunchTimerC == 0)
Turret1.Firing = true;
if(LaunchTimerC == 14)
Turret2.Firing = true;
}
}
LaunchTimerC += 1;
}else{
LaunchTimerC = 0;
}



if(LaunchTimerR < 15){
if (!Physics.Linecast (OverviewMR.position, target.position, MtargetLayers)){
if(LaunchTimerR == 0)
Turret3.Firing = true;
if(LaunchTimerR == 7){
Turret4.Firing = true;
RVO = false;
}
}else{
RVO = true;
}
LaunchTimerR += 1;
}else{
LaunchTimerR = 0;
}



if(LaunchTimerL < 15){
if (!Physics.Linecast (OverviewML.position, target.position, MtargetLayers)){
if(LaunchTimerL == 0)
Turret5.Firing = true;
if(LaunchTimerL == 7){
Turret6.Firing = true;
LVO = false;
}
}else{
LVO = true;
}
LaunchTimerL += 1;
}else{
LaunchTimerL = 0;
}
}
//[Launch]====================================================================================================

}

function RBombing (){
var _SpawnedObject01 = Instantiate(Bomb, RBLModel1.position, RBLModel1.rotation);
    _SpawnedObject01.rigidbody.velocity = vRigidbody.velocity * 1;
    RBLModel1R.enabled = false;
yield WaitForSeconds (0.5);
var _SpawnedObject02 = Instantiate(Bomb, RBLModel2.position, RBLModel2.rotation);
    _SpawnedObject02.rigidbody.velocity = vRigidbody.velocity * 1;
    RBLModel2R.enabled = false;
yield WaitForSeconds (0.5);
var _SpawnedObject03 = Instantiate(Bomb, RBLModel3.position, RBLModel3.rotation);
    _SpawnedObject03.rigidbody.velocity = vRigidbody.velocity * 1;
    RBLModel3R.enabled = false;
yield WaitForSeconds (3);
RBReloading = true;
yield WaitForSeconds (15);
RBLModel1R.enabled = true;
RBLModel2R.enabled = true;
RBLModel3R.enabled = true;
RBReloading = false;
yield WaitForSeconds (2);
RBombLaunch = false;
}

function LBombing (){
var _SpawnedObject04 = Instantiate(Bomb, LBLModel1.position, LBLModel1.rotation);
    _SpawnedObject04.rigidbody.velocity = vRigidbody.velocity * 1;
    LBLModel1R.enabled = false;
yield WaitForSeconds (0.5);
var _SpawnedObject05 = Instantiate(Bomb, LBLModel2.position, LBLModel2.rotation);
    _SpawnedObject05.rigidbody.velocity = vRigidbody.velocity * 1;
    LBLModel2R.enabled = false;
yield WaitForSeconds (0.5);
var _SpawnedObject06 = Instantiate(Bomb, LBLModel3.position, LBLModel3.rotation);
    _SpawnedObject06.rigidbody.velocity = vRigidbody.velocity * 1;
    LBLModel3R.enabled = false;
yield WaitForSeconds (3);
LBReloading = true;
yield WaitForSeconds (15);
LBLModel1R.enabled = true;
LBLModel2R.enabled = true;
LBLModel3R.enabled = true;
LBReloading = false;
yield WaitForSeconds (2);
LBombLaunch = false;
}

function TargetIn (other : Transform) {

ON = other.name;

if(!ON.Contains ("TC5")){
  
if(PissedAtTC0a > 1)
 if(ON.Contains ("TC0a")){
 
 if(ON.Contains ("mT") && !FoundMedium ||
    ON.Contains ("bT") && !FoundBig ||
    ON.Contains ("xbT")){
 
  Spot = 0;
  target = other;
  
  if(!Attacking)
  AttackNoise();
  
  Attacking = true;
  PissedAtTC0a -= 1;
 }
}
  
if(PissedAtTC1 > 1)
if(ON.Contains ("TC1")){
 
 if(ON.Contains ("mT") && !FoundMedium ||
    ON.Contains ("bT") && !FoundBig ||
    ON.Contains ("xbT")){
 
  Spot = 0;
  target = other;
  
  if(!Attacking)
  AttackNoise();
  
  Attacking = true;
  PissedAtTC1 -= 1;
}
}

if(PissedAtTC3 > 1)
if(!ON.Contains ("cT"))
 if(ON.Contains ("TC3")){
 
 if(ON.Contains ("mT") && !FoundMedium ||
    ON.Contains ("bT") && !FoundBig ||
    ON.Contains ("xbT")){
 
  Spot = 0;
  target = other;
  
  if(!Attacking)
  AttackNoise();
  
  Attacking = true;
  PissedAtTC3 -= 1;
}
}

if(PissedAtTC4 > 1)
 if(ON.Contains ("TC4")){
 
 if(ON.Contains ("mT") && !FoundMedium ||
    ON.Contains ("bT") && !FoundBig ||
    ON.Contains ("xbT")){
 
  Spot = 0;
  target = other;
  
  if(!Attacking)
  AttackNoise();
  
  Attacking = true;
  PissedAtTC4 -= 1;
}
}

if(PissedAtTC7 > 1)
if(!ON.Contains ("cT"))
 if(ON.Contains ("TC7")){
 
 if(ON.Contains ("mT") && !FoundMedium ||
    ON.Contains ("bT") && !FoundBig ||
    ON.Contains ("xbT")){
 
  Spot = 0;
  target = other;
  
  if(!Attacking)
  AttackNoise();
  
  Attacking = true;
  PissedAtTC7 -= 1;
}
}

if(PissedAtTC6 > 1)
if(!ON.Contains ("cT"))
 if(ON.Contains ("TC6")){
 
 if(ON.Contains ("mT") && !FoundMedium ||
    ON.Contains ("bT") && !FoundBig ||
    ON.Contains ("xbT")){
 
  Spot = 0;
  target = other;
  
  if(!Attacking)
  AttackNoise();
  
  Attacking = true;
  PissedAtTC6 -= 1;
}
}

if(PissedAtTC8 > 1)
if(!ON.Contains ("cT"))
 if(ON.Contains ("TC8")){
 
 if(ON.Contains ("mT") && !FoundMedium ||
    ON.Contains ("bT") && !FoundBig ||
    ON.Contains ("xbT")){
 
  Spot = 0;
  target = other;
  
  if(!Attacking)
  AttackNoise();
  
  Attacking = true;
  PissedAtTC8 -= 1;
}
}

if(PissedAtTC9 > 1)
if(!ON.Contains ("cT"))
 if(ON.Contains ("TC9")){
 
 if(ON.Contains ("mT") && !FoundMedium ||
    ON.Contains ("bT") && !FoundBig ||
    ON.Contains ("xbT")){
 
  Spot = 0;
  target = other;
  
  if(!Attacking)
  AttackNoise();
  
  Attacking = true;
  PissedAtTC9 -= 1;
}
}

if(Attacking){
if(ON.Contains ("mT"))
FoundMedium = true;
if(ON.Contains ("bT"))
FoundBig = true;
}

}
}

function AttackNoise () {
var TheThing = Instantiate(AttackSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing.transform.parent = thisTransform;
}

function Regenerator () {

Wall = false;
RWall = false;
LWall = false;

TurnRight = false;
TurnLeft = false;

if(SlavuicNetwork.TC1DeathRow > 8)
PissedAtTC1 = SlavuicNetwork.TC1DeathRow;
if(SlavuicNetwork.TC3DeathRow > 8)
PissedAtTC3 = SlavuicNetwork.TC3DeathRow;
if(SlavuicNetwork.TC4DeathRow > 8)
PissedAtTC4 = SlavuicNetwork.TC4DeathRow;
if(SlavuicNetwork.TC6DeathRow > 8)
PissedAtTC6 = SlavuicNetwork.TC6DeathRow;
if(SlavuicNetwork.TC7DeathRow > 8)
PissedAtTC7 = SlavuicNetwork.TC7DeathRow;
if(SlavuicNetwork.TC8DeathRow > 8)
PissedAtTC8 = SlavuicNetwork.TC8DeathRow;
if(SlavuicNetwork.TC9DeathRow > 8)
PissedAtTC9 = SlavuicNetwork.TC9DeathRow;

if(upperTarget){

ON = upperTarget.name;

if(!ON.Contains ("bM")){

if(PissedAtTC1 > 1)
if(ON.Contains ("TC1")){
if(RayGun1.target)
if(!RayGun1.target.name.Contains ("TC"))
RayGun1.target = upperTarget;

if(RayGun2.target)
if(!RayGun2.target.name.Contains ("TC"))
RayGun2.target = upperTarget;
}

if(PissedAtTC3 > 1)
if(!ON.Contains ("cT"))
if(ON.Contains ("TC3")){
if(RayGun1.target)
if(!RayGun1.target.name.Contains ("TC"))
RayGun1.target = upperTarget;

if(RayGun2.target)
if(!RayGun2.target.name.Contains ("TC"))
RayGun2.target = upperTarget;
}

if(PissedAtTC4 > 1)
if(ON.Contains ("TC4")){
if(RayGun1.target)
if(!RayGun1.target.name.Contains ("TC"))
RayGun1.target = upperTarget;

if(RayGun2.target)
if(!RayGun2.target.name.Contains ("TC"))
RayGun2.target = upperTarget;
}

if(PissedAtTC6 > 1)
if(!ON.Contains ("cT"))
if(ON.Contains ("TC6")){
if(RayGun1.target)
if(!RayGun1.target.name.Contains ("TC"))
RayGun1.target = upperTarget;

if(RayGun2.target)
if(!RayGun2.target.name.Contains ("TC"))
RayGun2.target = upperTarget;
}

if(PissedAtTC7 > 1)
if(ON.Contains ("TC7")){
if(RayGun1.target)
if(!RayGun1.target.name.Contains ("TC"))
RayGun1.target = upperTarget;

if(RayGun2.target)
if(!RayGun2.target.name.Contains ("TC"))
RayGun2.target = upperTarget;
}

if(PissedAtTC8 > 1)
if(ON.Contains ("TC8")){
if(RayGun1.target)
if(!RayGun1.target.name.Contains ("TC"))
RayGun1.target = upperTarget;

if(RayGun2.target)
if(!RayGun2.target.name.Contains ("TC"))
RayGun2.target = upperTarget;
}

if(PissedAtTC9 > 1)
if(ON.Contains ("TC9")){
if(RayGun1.target)
if(!RayGun1.target.name.Contains ("TC"))
RayGun1.target = upperTarget;

if(RayGun2.target)
if(!RayGun2.target.name.Contains ("TC"))
RayGun2.target = upperTarget;
}

}else{
RayGun1.target = upperTarget;
RayGun2.target = upperTarget;
}

}

if(bottomTarget){

ON = bottomTarget.name;

if(Vector3.Distance(thisTransform.position, bottomTarget.position) < 200)
if(!ON.Contains ("sT")){

if(PissedAtTC1 > 1)
if(ON.Contains ("TC1")){
BomberTarget = bottomTarget;
Distancing = 10;
Stuck = false;
}

if(PissedAtTC3 > 1)
if(!ON.Contains ("cT"))
if(ON.Contains ("TC3")){
BomberTarget = bottomTarget;
Distancing = 10;
Stuck = false;
}

if(PissedAtTC4 > 1)
if(ON.Contains ("TC4")){
BomberTarget = bottomTarget;
Distancing = 10;
Stuck = false;
}

if(PissedAtTC6 > 1)
if(!ON.Contains ("cT"))
if(ON.Contains ("TC6")){
BomberTarget = bottomTarget;
Distancing = 10;
Stuck = false;
}

if(PissedAtTC7 > 1)
if(!ON.Contains ("cT"))
if(ON.Contains ("TC7")){
BomberTarget = bottomTarget;
Distancing = 10;
Stuck = false;
}

if(PissedAtTC8 > 1)
if(!ON.Contains ("cT"))
if(ON.Contains ("TC8")){
BomberTarget = bottomTarget;
Distancing = 10;
Stuck = false;
}

if(PissedAtTC9 > 1)
if(!ON.Contains ("cT"))
if(ON.Contains ("TC9")){
BomberTarget = bottomTarget;
Distancing = 10;
Stuck = false;
}

}

}

if(target){

if(!Base1){
DutyTimer = 64;
}else{
if(Vector3.Distance(target.position, Base1.position) < 500)
CanLaunch = 4;
}

var lastTPos : Vector3 = target.position;

if(BomberTarget){
if(BomberTarget.name.Contains ("broken"))
BomberTarget = null;
}

if(Attacking){

if(OnDuty){

if(!ReturningToDock)
Reversing = false;

if(RVO && LVO){

var hitO : RaycastHit;

RVODist = 1000;
LVODist = 1000;

      Debug.DrawRay (OverviewMR.position, -RRP.up * 1000, Color.red);
if (Physics.Raycast (OverviewMR.position, -RRP.up, hitO, 1000, MtargetLayers))
RVODist = hitO.distance;
      Debug.DrawRay (OverviewML.position, -LRP.up * 1000, Color.red);
if (Physics.Raycast (OverviewML.position, -LRP.up, hitO, 1000, MtargetLayers))
LVODist = hitO.distance;

if(RVODist > LVODist){
TurnLeft = true;
TurnRight = false;
if(!ReturningToDock && OnDuty)
Reversing = true;
}

 if(LVODist > RVODist){
TurnRight = true;
TurnLeft = false;
if(!ReturningToDock && OnDuty)
Reversing = true;
}
}
}

if(target.name.Contains ("bT"))
if(SlavuicNetwork.Emergency)
Emergency = true;

if(Emergency){
DecidingToLaunch += 1;
if(DecidingToLaunch > 15 && !LaunchingBM100){
LaunchingBM100 = true;
LaunchBM100();
}

if(target.name.Contains ("xbT"))
SlavuicNetwork.primaryTarget = target;

}

}else{

if(DecidingToLaunch > 0)
DecidingToLaunch -= 1;

}

}








if(OnDuty){
if(Attacking){

Turret1.LeadDiv = Vel;
Turret1.VelDir = VelDir;
Turret2.LeadDiv = Vel;
Turret2.VelDir = VelDir;
Turret3.LeadDiv = Vel;
Turret3.VelDir = VelDir;
Turret4.LeadDiv = Vel;
Turret4.VelDir = VelDir;
Turret5.LeadDiv = Vel;
Turret5.VelDir = VelDir;
Turret6.LeadDiv = Vel;
Turret6.VelDir = VelDir;

if(AimTarget && !Docking){
if(Vector3.Distance(thisTransform.position, AimTarget.position) < 330){
Distancing = 10;
}else{
if(Distancing > 0)
Distancing -= 1;
}
}

if(target){
if(Vector3.Distance(thisTransform.position, target.position) > 2000){
target = ResetAimpoint;
Attacking = false;
Spot = 0;
FoundMedium = false;
FoundBig = false;
}

if(!target.name.Contains ("TC"))
Attacking = false;
}

if(CanLaunch > 0)
CanLaunch -= 1;

}else{

if(SlavuicNetwork.Emergency){
if(SlavuicNetwork.target){
if(Vector3.Distance(thisTransform.position, SlavuicNetwork.target.position) < 2000){
if(SlavuicNetwork.TC0aDeathRow > 100)
if(SlavuicNetwork.target.name.Contains ("TC0a")){
target = SlavuicNetwork.target;
Attacking = true;
}

if(SlavuicNetwork.TC1DeathRow > 100)
if(SlavuicNetwork.target.name.Contains ("TC1")){
target = SlavuicNetwork.target;
Attacking = true;
}

if(SlavuicNetwork.TC3DeathRow > 100)
if(SlavuicNetwork.target.name.Contains ("TC3")){
target = SlavuicNetwork.target;
Attacking = true;
}

if(SlavuicNetwork.TC4DeathRow > 100)
if(SlavuicNetwork.target.name.Contains ("TC4")){
target = SlavuicNetwork.target;
Attacking = true;
}

if(SlavuicNetwork.TC6DeathRow > 100)
if(SlavuicNetwork.target.name.Contains ("TC6")){
target = SlavuicNetwork.target;
Attacking = true;
}

if(SlavuicNetwork.TC7DeathRow > 100)
if(SlavuicNetwork.target.name.Contains ("TC7")){
target = SlavuicNetwork.target;
Attacking = true;
}

if(SlavuicNetwork.TC8DeathRow > 100)
if(SlavuicNetwork.target.name.Contains ("TC8")){
target = SlavuicNetwork.target;
Attacking = true;
}

if(SlavuicNetwork.TC9DeathRow > 100)
if(SlavuicNetwork.target.name.Contains ("TC9")){
target = SlavuicNetwork.target;
Attacking = true;
}

}
}
}

if(StuckCounter > 0){
if(!TurnLeft)
StuckCounter -= 1;
}


if(Stuck){
if(StuckCounter < 28){
Stuck = false;
StuckTimer = 0;
}
}else{
if(TurnIn > 0){
if(Vector3.Distance(thisTransform.position, MapCenter.position) > 5000)
TurnIn -= 1;
}else{
TurnIn = 60;
}

if(TurnIn < 8){

var relativePoint = thisVTransform.InverseTransformPoint(MapCenter.position);

if(relativePoint.y > 0)
TurnIn = 7;

target = MapCenter;
AimForce = 10000;
}else{
target = ResetAimpoint;
}

if(Comrade){
if(Vector3.Distance(thisTransform.position, Comrade.position) < 330){
var relativeCPoint = thisVTransform.InverseTransformPoint(Comrade.position);
if(relativeCPoint.y < 0)
Stuck = true;
}
}

}

StuckTimer += 1;

if(StuckTimer > 24){
var lastPos : Vector3 = thisTransform.position;
IsEscaping(lastPos);
StuckTimer = 0;
}

if(SlavuicNetwork.FoundExtraBig){
Waypoint.position = SlavuicNetwork.instance.PriorityWaypoint.position;
target = Waypoint;
}

CanLaunch = 3;

if(DutyTimer > 0){
DutyTimer -= 1;
}else{

if(AimTarget)
var relativeDPoint = thisVTransform.InverseTransformPoint(AimTarget.position);

RDP = Mathf.Abs(relativeDPoint.x);

if(Docking){
if(-relativeDPoint.y > 0){
if(RDP < 8)
Obstacle = false;
else
Obstacle = true;
}else{
Obstacle = true;
}
}

ReturningToDock = true;

if(AimTarget != DockEnter && AimTarget != DockAim)
AimTarget = DockEnter;

if(AimTarget == DockEnter){
AimForce = 20000;
if(Vector3.Distance(thisTransform.position, DockEnter.position) < 330){
Docking = true;
if(Vector3.Distance(thisTransform.position, DockEnter.position) < 16){
DockingPart = 1;
FineTarget = DockEnter;
}else{
DockingPart = 0;
}
}else{
Docking = false;
}
if(Vector3.Distance(thisTransform.position, DockEnter.position) < 1){
AimTarget = DockAim;
Docking = true;
}
}
if(AimTarget == DockAim){
AimForce = 20000;
DockingPart = 1;
Docking = true;
FineTarget = DockPoint;
if(Vector3.Distance(thisTransform.position, DockPoint.position) < 16){
if(Vector3.Distance(thisTransform.position, DockPoint.position) < 1){
ReturningToDock = false;
Reversing = false;
Docking = false;
OnDuty = false;
DockingPart = 0;
}else{
DockingPart = 2;
}
}
}


}
}

if(!ReturningToDock)
AimTarget = target;

}else{

if(target)
if(!target.name.Contains ("TC"))
Attacking = false;

if(DockingPart < 4)
DockingPart += 1;

DockTimer -= 1;

if(DockTimer < 20){
Reversing = true;

if(DockTimer < 5)
TurnRight = true;

if(DockTimer < 1){
OnDuty = true;
Docking = false;
Reversing = false;
DockTimer = 480;
DutyTimer = 600;
Reversionaise = 0;
FineTarget = null;
}
AimTarget = ResetAimpoint;
}else{
AimForce = 10000;
AimTarget = DockAim;
FineTarget = DockPoint;
}

}















if(Spot > 0)
Spot -= 1;

if(SpawnCounter > 0)
SpawnCounter -= 1;

if(Ignorage > 4){
Ignorage = 0;
target = null;
}

if(AimTarget == Waypoint)
AimForce = 40000;

TurnForce = 0;

if(OnHull){
if(SpawnCounter == 0)
DeployCrew();
OnHull = false;
}

SenseTargDir();

Notice2(lastTPos);

}

function SenseTargDir(){
if(target){
var targPos = Vector3.Distance(thisTransform.position, target.position);

yield WaitForSeconds (0.5);
  
  if(target){
  if(Vector3.Distance(thisTransform.position, target.position) < targPos)
  EnemyApproaching = true;
  else
  EnemyApproaching = false;
  }
}
}

function Notice2(lastTPos : Vector3){
yield WaitForSeconds (0.5);
if(target){
if(target.name.Contains ("sTC")){
if(Vector3.Distance(target.position, lastTPos) < 0.5)
  Ignorage += 1;
  else
  Ignorage = 0;
}
}
}

function DeployCrew () {
SpawnCounter = 16;

if(!LiveCrewman1){
LiveCrewman1 = Instantiate(Crewman1, CrewSpawn1.position, CrewSpawn1.rotation);
LiveCrewman1.transform.GetChild(0).rigidbody.velocity = vRigidbody.velocity * 1;
LiveCrewman1.transform.GetChild(0).transform.GetChild(1).rigidbody.velocity = vRigidbody.velocity * 1;
LiveCrewman1.transform.GetChild(0).transform.GetChild(0).transform.GetComponent(SlavuicPersonAI).FreeRoam = true;
}
if(!LiveCrewman2){
LiveCrewman2 = Instantiate(Crewman2, CrewSpawn2.position, CrewSpawn2.rotation);
LiveCrewman2.transform.GetChild(0).rigidbody.velocity = vRigidbody.velocity * 1;
LiveCrewman2.transform.GetChild(0).transform.GetChild(1).rigidbody.velocity = vRigidbody.velocity * 1;
LiveCrewman2.transform.GetChild(0).transform.GetChild(0).transform.GetComponent(SlavuicPersonAI).FreeRoam = true;
}

yield WaitForSeconds (8);

if(!LiveCrewman3){
LiveCrewman3 = Instantiate(Crewman1, CrewSpawn1.position, CrewSpawn1.rotation);
LiveCrewman3.transform.GetChild(0).rigidbody.velocity = vRigidbody.velocity * 1;
LiveCrewman3.transform.GetChild(0).transform.GetChild(1).rigidbody.velocity = vRigidbody.velocity * 1;
LiveCrewman3.transform.GetChild(0).transform.GetChild(0).transform.GetComponent(SlavuicPersonAI).FreeRoam = true;
}
if(!LiveCrewman4){
LiveCrewman4 = Instantiate(Crewman2, CrewSpawn2.position, CrewSpawn2.rotation);
LiveCrewman4.transform.GetChild(0).rigidbody.velocity = vRigidbody.velocity * 1;
LiveCrewman4.transform.GetChild(0).transform.GetChild(1).rigidbody.velocity = vRigidbody.velocity * 1;
LiveCrewman4.transform.GetChild(0).transform.GetChild(0).transform.GetComponent(SlavuicPersonAI).FreeRoam = true;
}
}

function LaunchBM100(){
if(target){
LaunchingBM100 = true;
RocketModelR.enabled = true;

yield WaitForSeconds (4);
  
var _SpawnedObject100 = Instantiate(Rocket, RocketModel.position, RocketModel.rotation);
    _SpawnedObject100.rigidbody.velocity = vRigidbody.velocity * 1;
    _SpawnedObject100.transform.GetComponent(MissileScript).target = target;
    RocketModelR.enabled = false;
    
yield WaitForSeconds (2);
DecidingToLaunch = 0;
LaunchingBM100 = false;
Emergency = false;
}
}

function IsEscaping(lastPos : Vector3){
Stuck = false;
TurnRight = false;
TurnLeft = false;
yield WaitForSeconds (1);

  if(Vector3.Distance(thisTransform.position, lastPos) < 32){
  Stuck = true;
  StuckCounter = 32;
  }
}