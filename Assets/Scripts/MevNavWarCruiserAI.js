var target : Transform;
var Waypoint : Transform;

var Stranger : Transform;

var TargetTrace : Transform;
var TargetLead : Transform;
var TLCol : SphereCollider;

var thisTransform : Transform;
var thisVTransform : Transform;

var vRigidbody : Rigidbody;

var ResetAimpoint : Transform;

var AIAnchor : Transform;

var HasRequested : boolean;

var CMissileAmmo : GameObject;
var CMissile1 : Transform;
var CMissile2 : Transform;
var CMissile3 : Transform;
var CMissile4 : Transform;
var Drone1 : GameObject;
var Vult : GameObject;
var DroneSpawn1 : Transform;
var DroneSpawn2 : Transform;
var DroneSpawn3 : Transform;
var DroneSpawn4 : Transform;

var PresentDrone1 : GameObject;
var PresentDrone2 : GameObject;

var Drone1AI : MevNavBattledroneAI;
var Drone2AI : MevNavBattledroneAI;

var Gate : Transform;

var GateSound : AudioSource;

var Turret1TF : Transform;
var Turret2TF : Transform;
var Turret3TF : Transform;
var Turret4TF : Transform;
var Turret5TF : Transform;
var Turret6TF : Transform;
var Turret7TF : Transform;
var Turret8TF : Transform;
var TurretB1TF : Transform;
var TurretB2TF : Transform;

var Turret1RB : Rigidbody;
var Turret2RB : Rigidbody;
var Turret3RB : Rigidbody;
var Turret4RB : Rigidbody;
var Turret5RB : Rigidbody;
var Turret6RB : Rigidbody;
var Turret7RB : Rigidbody;
var Turret8RB : Rigidbody;
var TurretB1RB : Rigidbody;
var TurretB2RB : Rigidbody;

var Gun1 : NPCGun;
var Gun2 : NPCGun;
var Gun3 : NPCGun;
var Gun4 : NPCGun;
var Gun5 : NPCGun;
var Gun6 : NPCGun;
var Gun7 : NPCGun;
var Gun8 : NPCGun;
var GunB1 : NPCGun;
var GunB2 : NPCGun;

var Gyro : MevNavGyro;
var Trig : BoxCollider;
var ThrusterEffect1 : GameObject;
var ThrusterEffect2 : GameObject;
var ThrusterEffect3 : GameObject;
var ThrusterEffect4 : GameObject;
var ThrusterEffect5 : GameObject;
var ThrusterEffect6 : GameObject;
var ThrusterEffect7 : GameObject;
var ThrusterEffect8 : GameObject;
var Presence : GameObject;

var PissedAtTC0a = 0;

var PissedAtTC1 = 0;
var PissedAtTC3 = 0;
var PissedAtTC4 = 0;
var PissedAtTC5 = 0;
var PissedAtTC6 = 0;
var PissedAtTC8 = 0;
var PissedAtTC9 = 0;

var FoundSmall : boolean;
var FoundMedium : boolean;
var FoundBig : boolean;

var Hunting : boolean;
var Attacking : boolean;
var Obstacle : boolean = false;
var Stuck : boolean = false;
var StuckTimer = 0;
var StuckCounter = 0;
var Emergency : boolean;
var Damaged : boolean;

var OnHull : boolean;

var TurnRight : boolean;
var TurnLeft : boolean;

var FiringMainGuns : boolean;
var MainGunsCooldown = 0;

var RightDist : float = 200;
var LeftDist : float = 200;

var RUP : float = 0;

var RRUP : float = 0;

var RRUPz : float = 0;

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

var Vel : float = 0;

var RelativeTarget : Vector3;

var targetLayers : LayerMask;

var DangerSense = 0;

var DangerTick : boolean;

var LaunchingCM : boolean;

var DistantThreat : boolean;

var TargetClose : boolean;

var GOpen : boolean;
var GClose : boolean;

var SpawnCounter = 0;

var Spot = 0;

var Ignorage = 0;

var StoredCMissiles = 128;

var targetLayersD : LayerMask;

var CollisionFX : GameObject;

var DamageColRayFR : Transform;
var DamageColRayFRGO : GameObject;
var FRCollide : boolean;
var DamageColRayFL : Transform;
var DamageColRayFLGO : GameObject;
var FLCollide : boolean;
var FrontCollide : boolean;
var FrontCollideSFX : AudioSource;

var DamageColRayRR : Transform;
var DamageColRayRRGO : GameObject;
var RRCollide : boolean;
var DamageColRayRL : Transform;
var DamageColRayRLGO : GameObject;
var RLCollide : boolean;
var RearCollide : boolean;
var RearCollideSFX : AudioSource;

InvokeRepeating("Regenerator", 1, 1);

InvokeRepeating("Targety", 15, 15);

InvokeRepeating("Shooty", Random.Range(2, 3), 0.2);

InvokeRepeating("Launchy", 1, 11);

InvokeRepeating("EmergencyLaunchy", 1, 1.2);

InvokeRepeating("CalcLead", 1, 0.15);

function Start () {

DamageColRayFRGO = DamageColRayFR.gameObject;
DamageColRayFLGO = DamageColRayFL.gameObject;

DamageColRayRRGO = DamageColRayRR.gameObject;
DamageColRayRLGO = DamageColRayRL.gameObject;

}

function Update () {

if(Damaged)
return;

if(!DangerTick)
thisTransform.rotation = AIAnchor.transform.rotation;

thisTransform.position = AIAnchor.transform.position;

if(Attacking){
if(target == ResetAimpoint){
Gyro.AimTarget = ResetAimpoint;
Attacking = false;
Spot = 0;
Hunting = true;
FoundSmall = false;
FoundMedium = false;
}
if(target == Waypoint){
target = ResetAimpoint;
Gyro.AimTarget = ResetAimpoint;
Attacking = false;
Spot = 0;
Hunting = true;
FoundSmall = false;
FoundMedium = false;
}
if(target == null){
target = ResetAimpoint;
Gyro.AimTarget = ResetAimpoint;
Attacking = false;
Spot = 0;
Hunting = true;
FoundSmall = false;
FoundMedium = false;
}else{
if(target.name.Contains ("broken")){
target = ResetAimpoint;
Gyro.AimTarget = ResetAimpoint;
Attacking = false;
Spot = 0;
Hunting = true;
FoundSmall = false;
FoundMedium = false;
}
}
}

if(!Stuck){
if(TurnLeft){
Gyro.AimForce = 0;
Gyro.TurnForce = -60000000;
}

if(TurnRight){
Gyro.AimForce = 0;
Gyro.TurnForce = 60000000;
}
}else{
Gyro.AimForce = 0;
Gyro.TurnForce = 60000000;
}

if(TurnRight && TurnLeft && Obstacle){
  Gyro.TurnForce = -60000000;
}

if(Attacking && !Obstacle && target != null){
if(!TurnRight && !TurnLeft){

RelativeTarget = thisTransform.InverseTransformPoint(target.position);

//Debug.Log(RelativeTarget.z + " Z Axis \n" + RelativeTarget.x + " X Axis");

if(Vector3.Distance(thisTransform.position, target.position) > 400 && !TurnRight && !TurnLeft){

if(RelativeTarget.z < 0){
if(RelativeTarget.x > 0)
Gyro.TurnForce = 60000000;
else
Gyro.TurnForce = -60000000;

Gyro.AimForce = 0;
}else{
Gyro.AimForce = 2000000;
}

}

}
}
	
localV = thisVTransform.InverseTransformDirection(vRigidbody.velocity);

Vel = vRigidbody.velocity.magnitude;

var hit : RaycastHit;

var hit1 : RaycastHit;
var hit2 : RaycastHit;
var hit3 : RaycastHit;

if(RUP < 4)
RUP += 1;
else
RUP = 0;

if(RRUP < 150){
RRUP += 4;
RRUPz -= 1;
}else{
RRUP = 2;
RRUPz = 187;

if(!OnHull)
Obstacle = false;
}

var VelClamp = Mathf.Clamp(Vel * 6,187,600);
AngClamp = Mathf.Clamp(Vel * 0.15,2,8);

var DMod1 = 160 - Vel;
var DMod = Mathf.Clamp(DMod1,1,160);

Debug.DrawRay (thisTransform.position + thisTransform.forward * 187 + -thisTransform.up * 24 + thisTransform.up * RUP, thisTransform.forward * VelClamp, Color.white);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 187 + -thisTransform.up * 24 + thisTransform.up * RUP, thisTransform.forward, hit1, VelClamp, targetLayers))
Pointu = hit1.point;
else
Pointu = Vector3(2,2,2);

Debug.DrawRay (thisTransform.position + thisTransform.forward * 187 + -thisTransform.up * 25 + thisTransform.up * RUP, thisTransform.forward * VelClamp, Color.white);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 187 + -thisTransform.up * 25 + thisTransform.up * RUP, thisTransform.forward, hit2, VelClamp, targetLayers))
Pointd = hit2.point;
else
Pointd = Vector3(8,8,8);

if(Vector3.Distance(Pointu, Pointd) < AngClamp){
Wall = true;
}

Debug.DrawRay (thisTransform.position + thisTransform.forward * 187 + thisTransform.right * 40, thisTransform.forward * VelClamp, Color.green);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 187 + thisTransform.right * 40, thisTransform.forward, hit, VelClamp, targetLayers))
     if(Wall)
     Obstacle = true;

Debug.DrawRay (thisTransform.position + thisTransform.forward * 187 + -thisTransform.right * 40, thisTransform.forward * VelClamp, Color.green);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 187 + -thisTransform.right * 40, thisTransform.forward, hit, VelClamp, targetLayers))
     if(Wall)
     Obstacle = true;

Debug.DrawRay (thisTransform.position + thisTransform.forward * RRUPz + thisTransform.right * RRUP + -thisTransform.up * 20 + thisTransform.up * RUP, thisTransform.forward * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * RRUPz + thisTransform.right * RRUP + -thisTransform.up * 20 + thisTransform.up * RUP, thisTransform.forward, hit1, VelClamp, targetLayers)){
RPointu = hit1.point;
}else{
RPointu = Vector3(2,2,2);
}

Debug.DrawRay (thisTransform.position + thisTransform.forward * RRUPz + thisTransform.right * RRUP + thisTransform.right * 1 + -thisTransform.up * 20 + thisTransform.up * RUP, thisTransform.forward * VelClamp, Color.blue);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * RRUPz + thisTransform.right * RRUP + thisTransform.right * 1 + -thisTransform.up * 20 + thisTransform.up * RUP, thisTransform.forward, hit3, VelClamp, targetLayers)){
RPointur = hit3.point;
}else{
RPointur = Vector3(4,4,4);
}

Debug.DrawRay (thisTransform.position + thisTransform.forward * RRUPz + thisTransform.right * RRUP + -thisTransform.up * 21 + thisTransform.up * RUP, thisTransform.forward * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * RRUPz + thisTransform.right * RRUP + -thisTransform.up * 21 + thisTransform.up * RUP, thisTransform.forward, hit2, VelClamp, targetLayers)){
RPointd = hit2.point;
RightDist = hit2.distance;
}else{
RPointd = Vector3(8,8,8);
RightDist = 512;
}

if(Vector3.Distance(RPointu, RPointd) < AngClamp)
RWall = true;

Debug.DrawRay (thisTransform.position + thisTransform.forward * RRUPz + -thisTransform.right * RRUP + -thisTransform.up * 20 + thisTransform.up * RUP, thisTransform.forward * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * RRUPz + -thisTransform.right * RRUP + -thisTransform.up * 20 + thisTransform.up * RUP, thisTransform.forward, hit1, VelClamp, targetLayers)){
LPointu = hit1.point;
}else{
LPointu = Vector3(2,2,2);
}

Debug.DrawRay (thisTransform.position + thisTransform.forward * RRUPz + -thisTransform.right * RRUP + -thisTransform.right * 1 + -thisTransform.up * 20 + thisTransform.up * RUP, thisTransform.forward * VelClamp, Color.blue);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * RRUPz + -thisTransform.right * RRUP + -thisTransform.right * 1 + -thisTransform.up * 20 + thisTransform.up * RUP, thisTransform.forward, hit3, VelClamp, targetLayers)){
LPointul = hit3.point;
}else{
LPointul = Vector3(4,4,4);
}

Debug.DrawRay (thisTransform.position + thisTransform.forward * RRUPz + -thisTransform.right * RRUP + -thisTransform.up * 21 + thisTransform.up * RUP, thisTransform.forward * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * RRUPz + -thisTransform.right * RRUP + -thisTransform.up * 21 + thisTransform.up * RUP, thisTransform.forward, hit2, VelClamp, targetLayers)){
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

//---------------------------------------------------------------------------------------------
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
//---------------------------------------------------------------------------------------------

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


function FixedUpdate () {

if (Damaged) {
 
vRigidbody.angularDrag = 0.05;

var hitD : RaycastHit;

if(!FRCollide){
      Debug.DrawRay (DamageColRayFR.position + Vector3.up * 64, -Vector3.up * 64, Color.magenta);
if (Physics.Raycast (DamageColRayFR.position + Vector3.up * 64, -Vector3.up, hitD, 64, targetLayersD)){

FRCollide = true;

var theRB1 = DamageColRayFRGO.AddComponent ("Rigidbody");
theRB1.mass = vRigidbody.mass * 0.05;
theRB1.drag = 16;
theRB1.useGravity = false;

var theSpringJoint1 = DamageColRayFRGO.AddComponent ("SpringJoint");
theSpringJoint1.spring = vRigidbody.mass * 0.2;
theSpringJoint1.damper = vRigidbody.mass * 0.05;

var theFixedJoint1 = DamageColRayFRGO.AddComponent ("FixedJoint");
theFixedJoint1.connectedBody = vRigidbody;

var theSphereCol1 = DamageColRayFRGO.AddComponent ("SphereCollider");
theSphereCol1.radius = vRigidbody.mass * 0.0005;

var NormalAngle1 = Quaternion.LookRotation(hitD.normal);
Instantiate(CollisionFX, DamageColRayFR.position, NormalAngle1);
}
}

if(!FLCollide){
      Debug.DrawRay (DamageColRayFL.position + Vector3.up * 64, -Vector3.up * 64, Color.magenta);
if (Physics.Raycast (DamageColRayFL.position + Vector3.up * 64, -Vector3.up, hitD, 64, targetLayersD)){

FLCollide = true;

var theRB2 = DamageColRayFLGO.AddComponent ("Rigidbody");
theRB2.mass = vRigidbody.mass * 0.05;
theRB2.drag = 16;
theRB2.useGravity = false;

var theSpringJoint2 = DamageColRayFLGO.AddComponent ("SpringJoint");
theSpringJoint2.spring = vRigidbody.mass * 0.2;
theSpringJoint2.damper = vRigidbody.mass * 0.05;

var theFixedJoint2 = DamageColRayFLGO.AddComponent ("FixedJoint");
theFixedJoint2.connectedBody = vRigidbody;

var theSphereCol2 = DamageColRayFLGO.AddComponent ("SphereCollider");
theSphereCol2.radius = vRigidbody.mass * 0.0005;

var NormalAngle2 = Quaternion.LookRotation(hitD.normal);
Instantiate(CollisionFX, DamageColRayFL.position, NormalAngle2);
}
}

if(!RRCollide){
      Debug.DrawRay (DamageColRayRR.position + Vector3.up * 64, -Vector3.up * 64, Color.magenta);
if (Physics.Raycast (DamageColRayRR.position + Vector3.up * 64, -Vector3.up, hitD, 64, targetLayersD)){

RRCollide = true;

var theRB3 = DamageColRayRRGO.AddComponent ("Rigidbody");
theRB3.mass = vRigidbody.mass * 0.05;
theRB3.drag = 16;
theRB3.useGravity = false;

var theSpringJoint3 = DamageColRayRRGO.AddComponent ("SpringJoint");
theSpringJoint3.spring = vRigidbody.mass * 0.2;
theSpringJoint3.damper = vRigidbody.mass * 0.05;

var theFixedJoint3 = DamageColRayRRGO.AddComponent ("FixedJoint");
theFixedJoint3.connectedBody = vRigidbody;

var theSphereCol3 = DamageColRayRRGO.AddComponent ("SphereCollider");
theSphereCol3.radius = vRigidbody.mass * 0.0005;

var NormalAngle3 = Quaternion.LookRotation(hitD.normal);
Instantiate(CollisionFX, DamageColRayRR.position, NormalAngle3);
}
}

if(!RLCollide){
      Debug.DrawRay (DamageColRayRL.position + Vector3.up * 64, -Vector3.up * 64, Color.magenta);
if (Physics.Raycast (DamageColRayRL.position + Vector3.up * 64, -Vector3.up, hitD, 64, targetLayersD)){

RLCollide = true;

var theRB4 = DamageColRayRLGO.AddComponent ("Rigidbody");
theRB4.mass = vRigidbody.mass * 0.05;
theRB4.drag = 16;
theRB4.useGravity = false;

var theSpringJoint4 = DamageColRayRLGO.AddComponent ("SpringJoint");
theSpringJoint4.spring = vRigidbody.mass * 0.2;
theSpringJoint4.damper = vRigidbody.mass * 0.05;

var theFixedJoint4 = DamageColRayRLGO.AddComponent ("FixedJoint");
theFixedJoint4.connectedBody = vRigidbody;

var theSphereCol4 = DamageColRayRLGO.AddComponent ("SphereCollider");
theSphereCol4.radius = vRigidbody.mass * 0.0005;

var NormalAngle4 = Quaternion.LookRotation(hitD.normal);
Instantiate(CollisionFX, DamageColRayRL.position, NormalAngle4);
}
}

if(!FRCollide && !FLCollide && !RRCollide && !RLCollide){
vRigidbody.AddTorque(thisTransform.right * 400 * vRigidbody.mass * 0.8);

GravDiv = -Physics.gravity.y;

vRigidbody.AddForce(Vector3.up * vRigidbody.mass * 0.8 * GravDiv);
}

if(!FrontCollide){
if(FRCollide || FLCollide){
FrontCollideSFX.Play();
FrontCollide = true;
}
}

if(!RearCollide){
if(RRCollide || RLCollide){
RearCollideSFX.Play();
RearCollide = true;
}
}

return;
}

if(Obstacle){

if(-localV.y > 0){
  vRigidbody.AddForce(-thisVTransform.up * -600000);
  }
  
}

if(Stuck)
if(localV.y < 8)
vRigidbody.AddForce(thisVTransform.up * 600000);
  
if(!Obstacle && !Stuck && !TurnLeft && !TurnRight)
if(-localV.y < 60)
vRigidbody.AddForce(-thisVTransform.up * 600000);
 
if(target){
  if(Turret1RB.angularVelocity.magnitude < 1){
  Turret1RB.AddForceAtPosition((TargetLead.position - Turret1TF.position).normalized * 20, -Turret1TF.up * 4);
  Turret1RB.AddForceAtPosition((TargetLead.position - Turret1TF.position).normalized * -20, Turret1TF.up * 4);
  }
  if(Turret2RB.angularVelocity.magnitude < 1){
  Turret2RB.AddForceAtPosition((TargetLead.position - Turret2TF.position).normalized * 20, -Turret2TF.up * 4);
  Turret2RB.AddForceAtPosition((TargetLead.position - Turret2TF.position).normalized * -20, Turret2TF.up * 4);
}
  if(Turret3RB.angularVelocity.magnitude < 1){
  Turret3RB.AddForceAtPosition((TargetLead.position - Turret3TF.position).normalized * 20, -Turret3TF.up * 4);
  Turret3RB.AddForceAtPosition((TargetLead.position - Turret3TF.position).normalized * -20, Turret3TF.up * 4);
  }
  if(Turret4RB.angularVelocity.magnitude < 1){
  Turret4RB.AddForceAtPosition((TargetLead.position - Turret4TF.position).normalized * 20, -Turret4TF.up * 4);
  Turret4RB.AddForceAtPosition((TargetLead.position - Turret4TF.position).normalized * -20, Turret4TF.up * 4);
}
  if(Turret5RB.angularVelocity.magnitude < 1){
  Turret5RB.AddForceAtPosition((TargetLead.position - Turret5TF.position).normalized * 20, -Turret5TF.up * 4);
  Turret5RB.AddForceAtPosition((TargetLead.position - Turret5TF.position).normalized * -20, Turret5TF.up * 4);
  }
  if(Turret6RB.angularVelocity.magnitude < 1){
  Turret6RB.AddForceAtPosition((TargetLead.position - Turret6TF.position).normalized * 20, -Turret6TF.up * 4);
  Turret6RB.AddForceAtPosition((TargetLead.position - Turret6TF.position).normalized * -20, Turret6TF.up * 4);
}
  if(Turret7RB.angularVelocity.magnitude < 1){
  Turret7RB.AddForceAtPosition((TargetLead.position - Turret7TF.position).normalized * 20, -Turret7TF.up * 4);
  Turret7RB.AddForceAtPosition((TargetLead.position - Turret7TF.position).normalized * -20, Turret7TF.up * 4);
  }
  if(Turret8RB.angularVelocity.magnitude < 1){
  Turret8RB.AddForceAtPosition((TargetLead.position - Turret8TF.position).normalized * 20, -Turret8TF.up * 4);
  Turret8RB.AddForceAtPosition((TargetLead.position - Turret8TF.position).normalized * -20, Turret8TF.up * 4);
}

  if(TurretB1RB.angularVelocity.magnitude < 0.5){
  TurretB1RB.AddForceAtPosition((TargetLead.position - TurretB1TF.position).normalized * 500, -TurretB1TF.up * 8);
  TurretB1RB.AddForceAtPosition((TargetLead.position - TurretB1TF.position).normalized * -500, TurretB1TF.up * 8);
}
  if(TurretB2RB.angularVelocity.magnitude < 0.5){
  TurretB2RB.AddForceAtPosition((TargetLead.position - TurretB2TF.position).normalized * 500, -TurretB2TF.up * 8);
  TurretB2RB.AddForceAtPosition((TargetLead.position - TurretB2TF.position).normalized * -500, TurretB2TF.up * 8);
}
}

if(GOpen){
if(Gate.localPosition.z > -1.2)
Gate.localPosition.z -= 0.06;
}

if(GClose){
if(Gate.localPosition.z < 0)
Gate.localPosition.z += 0.06;
}

}

function OnTriggerEnter (other : Collider) {

ON = other.name;
OT = other.transform;

if(ON.Contains ("TFC"))
if(!ON.Contains ("TFC7")){

if(ON.Contains ("TFC0a"))
PissedAtTC0a = 2;

if(ON.Contains ("TFC1"))
PissedAtTC1 = 2;

if(ON.Contains ("TFC3"))
PissedAtTC3 = 2;

if(ON.Contains ("TFC4"))
PissedAtTC4 = 2;

if(ON.Contains ("TFC5"))
PissedAtTC5 = 2;

if(ON.Contains ("TFC6"))
PissedAtTC6 = 2;

if(ON.Contains ("TFC8"))
PissedAtTC8 = 2;

if(ON.Contains ("TFC9"))
PissedAtTC9 = 2;

if(!Attacking && StuckCounter < 1){
DangerSense = 10;
target = Waypoint;
Gyro.AimTarget = Waypoint;
if(other.rigidbody)
Waypoint.position = OT.position;
}
}

}

function OnTriggerStay (other : Collider) {

ON = other.name;
OT = other.transform;

if(!ON.Contains ("TC7")){

if(Vector3.Distance(thisTransform.position, OT.position) < 400)
if(ON.Contains ("TC"))
  Stranger = OT;
  
if(PissedAtTC0a > 1)
 if(ON.Contains ("TC0a")){
 
 if(ON.Contains ("sT") && !FoundSmall && !FoundMedium ||
    ON.Contains ("mT") && FoundSmall && !FoundMedium ||
    ON.Contains ("bT")){
 
  Spot = 0;
  Hunting = false;
  target = OT;
  if(Gyro != null)
  Gyro.AimTarget = OT;
  
  Attacking = true;
 }
}
  
if(PissedAtTC1 > 1)
if(ON.Contains ("TC1")){
 
 if(ON.Contains ("sT") && !FoundSmall ||
    ON.Contains ("mT") && !FoundMedium ||
    ON.Contains ("bT")){
 
  Spot = 0;
  Hunting = false;
  target = OT;
  if(Gyro != null)
  Gyro.AimTarget = OT;
  
  Attacking = true;
}
}

if(PissedAtTC3 > 1)
if(!ON.Contains ("cT"))
 if(ON.Contains ("TC3")){
 
 if(ON.Contains ("sT") && !FoundSmall ||
    ON.Contains ("mT") && !FoundMedium ||
    ON.Contains ("bT")){
 
  Spot = 0;
  Hunting = false;
  target = OT;
  if(Gyro != null)
  Gyro.AimTarget = OT;
  
  Attacking = true;
}
}

if(PissedAtTC4 > 1)
 if(ON.Contains ("TC4")){
 
 if(ON.Contains ("sT") && !FoundSmall ||
    ON.Contains ("mT") && !FoundMedium ||
    ON.Contains ("bT")){
 
  Spot = 0;
  Hunting = false;
  target = OT;
  if(Gyro != null)
  Gyro.AimTarget = OT;
  
  Attacking = true;
}
}

if(PissedAtTC5 > 1)
if(!ON.Contains ("cT"))
 if(ON.Contains ("TC5")){
 
 if(ON.Contains ("sT") && !FoundSmall ||
    ON.Contains ("mT") && !FoundMedium ||
    ON.Contains ("bT")){
 
  Spot = 0;
  Hunting = false;
  target = OT;
  if(Gyro != null)
  Gyro.AimTarget = OT;
  
  Attacking = true;
}
}

if(PissedAtTC6 > 1)
if(!ON.Contains ("cT"))
 if(ON.Contains ("TC6")){
 
 if(ON.Contains ("sT") && !FoundSmall ||
    ON.Contains ("mT") && !FoundMedium ||
    ON.Contains ("bT")){
 
  Spot = 0;
  Hunting = false;
  target = OT;
  if(Gyro != null)
  Gyro.AimTarget = OT;
  
  Attacking = true;
}
}

if(PissedAtTC8 > 1)
if(!ON.Contains ("cT"))
 if(ON.Contains ("TC8")){
 
 if(ON.Contains ("sT") && !FoundSmall ||
    ON.Contains ("mT") && !FoundMedium ||
    ON.Contains ("bT")){
 
  Spot = 0;
  Hunting = false;
  target = OT;
  if(Gyro != null)
  Gyro.AimTarget = OT;
  
  Attacking = true;
}
}

if(PissedAtTC9 > 1)
if(!ON.Contains ("cT"))
 if(ON.Contains ("TC9")){
 
 if(ON.Contains ("sT") && !FoundSmall ||
    ON.Contains ("mT") && !FoundMedium ||
    ON.Contains ("bT")){
 
  Spot = 0;
  Hunting = false;
  target = OT;
  if(Gyro != null)
  Gyro.AimTarget = OT;
  
  Attacking = true;
}
}

}
}

function Shooty () {

if(Damaged)
return;

if(Attacking){

if(MainGunsCooldown < 1)
ShootB();

if(!FiringMainGuns)
Shoot();

}
}

function Shoot () {
if(!FiringMainGuns)
if(Gun1)
Gun1.Fire();
yield WaitForSeconds (0.5);
if(!FiringMainGuns)
if(Gun2)
Gun2.Fire();
yield WaitForSeconds (0.5);
if(!FiringMainGuns)
if(Gun3)
Gun3.Fire();
yield WaitForSeconds (0.5);
if(!FiringMainGuns)
if(Gun4)
Gun4.Fire();
yield WaitForSeconds (0.5);
if(!FiringMainGuns)
if(Gun5)
Gun5.Fire();
yield WaitForSeconds (0.5);
if(!FiringMainGuns)
if(Gun6)
Gun6.Fire();
yield WaitForSeconds (0.5);
if(!FiringMainGuns)
if(Gun7)
Gun7.Fire();
yield WaitForSeconds (0.5);
if(!FiringMainGuns)
if(Gun8)
Gun8.Fire();
}

function ShootB () {
yield WaitForSeconds (1);
ShootingB(true);
yield WaitForSeconds (1.5);
ShootingB(false);
yield WaitForSeconds (1.5);
FiringMainGuns = false;
}

function ShootingB (FiringRight : boolean) {
if(FiringRight){
if(GunB1)
GunB1.Fire();
}else{
if(GunB2)
GunB2.Fire();
}
}

function EmergencyLaunchy () {

if(Damaged)
return;

if(Emergency){
LaunchCM();
}
}

function Launchy () {

if(Damaged)
return;

if(Attacking && !Emergency){

if(LaunchingCM)
LaunchCM();

}
}

function SpawnDrone () {

if(Damaged)
return;

GateSound.audio.Play();
SpawnCounter = 15;
GOpen = true;
GClose = false;
yield WaitForSeconds (0.3);
if(!DistantThreat){
if(!PresentDrone1){
    PresentDrone1 = Instantiate(Drone1, DroneSpawn2.position, DroneSpawn2.rotation) as GameObject;
    PresentDrone1.transform.GetChild(1).rigidbody.velocity = vRigidbody.velocity * 1;
    PresentDrone1.transform.GetChild(1).rigidbody.AddForce(DroneSpawn2.transform.right * 100);
    Drone1AI = PresentDrone1.transform.GetChild(0).GetComponent(MevNavBattledroneAI);
    Drone1AI.target = Stranger;
    Drone1AI.Home = AIAnchor;
    }else{
if(!PresentDrone2){
    PresentDrone2 = Instantiate(Drone1, DroneSpawn4.position, DroneSpawn4.rotation) as GameObject;
    PresentDrone2.transform.GetChild(1).rigidbody.velocity = vRigidbody.velocity * 1;
    PresentDrone2.transform.GetChild(1).rigidbody.AddForce(DroneSpawn4.transform.right * 100);
    Drone2AI = PresentDrone2.transform.GetChild(0).GetComponent(MevNavBattledroneAI);
    Drone2AI.target = Stranger;
    Drone2AI.Home = AIAnchor;
    }
    }
}else{
var _SpawnedObjectC1 = Instantiate(Vult, DroneSpawn1.position, DroneSpawn1.rotation);
    _SpawnedObjectC1.transform.GetChild(1).rigidbody.velocity = vRigidbody.velocity * 1;
    _SpawnedObjectC1.transform.GetChild(0).GetComponent(MevNavBattledroneAI).target = target;
    _SpawnedObjectC1.transform.GetChild(1).rigidbody.AddForce(DroneSpawn1.transform.right * 100);

var _SpawnedObjectC2 = Instantiate(Vult, DroneSpawn3.position, DroneSpawn3.rotation);
    _SpawnedObjectC2.transform.GetChild(1).rigidbody.velocity = vRigidbody.velocity * 1;
    _SpawnedObjectC2.transform.GetChild(0).GetComponent(MevNavBattledroneAI).target = target;
    _SpawnedObjectC2.transform.GetChild(0).GetComponent(MevNavBattledroneAI).Pause = true;
    _SpawnedObjectC2.transform.GetChild(1).rigidbody.AddForce(DroneSpawn3.transform.right * 100);

}
yield WaitForSeconds (0.35);
GOpen = false;
GClose = true;
}

function LaunchCM () {

if(target != null)
if(Attacking && StoredCMissiles > 0)
if(Vector3.Distance(thisTransform.position, target.position) < 3000 && Vector3.Distance(thisTransform.position, target.position) > 150){

StoredCMissiles -= 1;
LaunchingCM = false;

var _SpawnedObject0 = Instantiate(CMissileAmmo, CMissile1.position, CMissile1.rotation);
    _SpawnedObject0.rigidbody.velocity = vRigidbody.velocity * 1;
    _SpawnedObject0.transform.GetComponent(MissileScript).target = target;
yield WaitForSeconds (0.5);
var _SpawnedObject1 = Instantiate(CMissileAmmo, CMissile2.position, CMissile2.rotation);
    _SpawnedObject1.rigidbody.velocity = vRigidbody.velocity * 1;
    _SpawnedObject1.transform.GetComponent(MissileScript).target = target;
yield WaitForSeconds (0.5);
var _SpawnedObject2 = Instantiate(CMissileAmmo, CMissile3.position, CMissile3.rotation);
    _SpawnedObject2.rigidbody.velocity = vRigidbody.velocity * 1;
    _SpawnedObject2.transform.GetComponent(MissileScript).target = target;
yield WaitForSeconds (0.5);
var _SpawnedObject3 = Instantiate(CMissileAmmo, CMissile4.position, CMissile4.rotation);
    _SpawnedObject3.rigidbody.velocity = vRigidbody.velocity * 1;
    _SpawnedObject3.transform.GetComponent(MissileScript).target = target;
}
}

function Targety () {
if(Spot < 1 && !Attacking)
TargetArea();
}

function TargetArea () {

if(StuckCounter < 1 && !Attacking){
Waypoint.transform.position = MevNavNetwork.instance.PriorityWaypoint.position;
target = Waypoint;
Gyro.AimTarget = Waypoint;
}
}

function CalcLead () {
if(!Damaged)
Lead();
}

function Lead (){

if(target)
TargetTrace.position = target.position;

yield WaitForSeconds (0.1);

if(!Damaged)
if(target){

var Dist1 = Vector3.Distance(thisTransform.position, target.position);
var Dist2 = Vector3.Distance(TargetTrace.position, target.position);

TargetTrace.LookAt(target);

TargetLead.position = TargetTrace.position;
TargetLead.rotation = TargetTrace.rotation;
TargetLead.position += TargetLead.forward * Dist1 * Dist2 * 0.02;

if(Attacking)
TLCol.radius = Vector3.Distance(thisTransform.position, target.position) * 0.1;
else
TLCol.radius = 0.1;

}
}

function Regenerator () {

if(Damaged){

MevNavNetwork.AlertTime = 240;

MevNavNetwork.instance.PriorityWaypoint.position = thisTransform.position;

return;
}

if(MevNavNetwork.AlertTime > 230){
TargetArea();
MevNavNetwork.AlertTime = 230;
}

PissedAtTC1 = MevNavNetwork.TC1DeathRow;
PissedAtTC2 = MevNavNetwork.TC2DeathRow;
PissedAtTC3 = MevNavNetwork.TC3DeathRow;
PissedAtTC4 = MevNavNetwork.TC4DeathRow;
PissedAtTC5 = MevNavNetwork.TC5DeathRow;
PissedAtTC6 = MevNavNetwork.TC6DeathRow;
PissedAtTC8 = MevNavNetwork.TC8DeathRow;
PissedAtTC9 = MevNavNetwork.TC9DeathRow;

if(MainGunsCooldown > 0)
MainGunsCooldown -= 1;

if(target){

var lastTPos : Vector3 = target.position;

if(target.name.Contains ("sT"))
FoundSmall = true;

if(target.name.Contains ("mT"))
FoundMedium = true;

if(target.name.Contains ("xbT"))
if(SpawnCounter > 15)
SpawnCounter = 15;

if(Attacking){

MevNavNetwork.instance.EnemyTarget1 = target;

if(Vector3.Distance(thisTransform.position, target.position) < 300){
TargetClose = true;

if(Drone1AI && PresentDrone1)
if(Vector3.Distance(PresentDrone1.transform.position, target.position) > 500)
Drone1AI.target = target;

if(Drone2AI && PresentDrone2)
if(Vector3.Distance(PresentDrone2.transform.position, target.position) > 500)
Drone2AI.target = target;

if(SpawnCounter == 0)
SpawnDrone();
}

if(!Emergency){
if(Vector3.Distance(thisTransform.position, target.position) > 850){
if(target.name.Contains ("bT")){
DistantThreat = true;
if(SpawnCounter == 0)
SpawnDrone();
}else{
DistantThreat = false;
LaunchingCM = true;
}
}
}else{
if(Vector3.Distance(thisTransform.position, target.position) > 256){
if(target.name.Contains ("bT")){
DistantThreat = true;
if(SpawnCounter == 0)
SpawnDrone();
}else{
DistantThreat = false;
LaunchingCM = true;
}
}
}
  
}else{
  if(PissedAtTC0a > 1)
  if(target.name.Contains ("TC0a"))
  if(!target.name.Contains ("csT"))
  Attacking = true;
  if(PissedAtTC1 > 1)
  if(target.name.Contains ("TC1"))
  if(!target.name.Contains ("csT"))
  Attacking = true;
  if(PissedAtTC3 > 1)
  if(target.name.Contains ("TC3"))
  if(!target.name.Contains ("csT"))
  Attacking = true;
  if(PissedAtTC4 > 1)
  if(target.name.Contains ("TC4"))
  if(!target.name.Contains ("csT"))
  Attacking = true;
  if(PissedAtTC5 > 1)
  if(target.name.Contains ("TC5"))
  if(!target.name.Contains ("csT"))
  Attacking = true;
  if(PissedAtTC6 > 1)
  if(target.name.Contains ("TC6"))
  if(!target.name.Contains ("csT"))
  Attacking = true;
  if(PissedAtTC8 > 1)
  if(target.name.Contains ("TC8"))
  if(!target.name.Contains ("csT"))
  Attacking = true;
  if(PissedAtTC9 > 1)
  if(target.name.Contains ("TC9"))
  if(!target.name.Contains ("csT"))
  Attacking = true;
}

if(Vector3.Distance(thisTransform.position, target.position) > 8000)
if(target.name.Contains ("TC")){
target = ResetAimpoint;
Attacking = false;
}

if(!target.name.Contains ("xbT"))
if(MevNavNetwork.xbTarget)
if(Vector3.Distance(thisTransform.position, MevNavNetwork.xbTarget.position) < 8000){
if(MevNavNetwork.xbTarget.name.Contains ("TC1") && PissedAtTC1 > 400){
Spot = 0;
Hunting = false;
target = MevNavNetwork.xbTarget;
if(Gyro != null)
Gyro.AimTarget = MevNavNetwork.xbTarget;
  
Attacking = true;
}
if(MevNavNetwork.xbTarget.name.Contains ("TC3") && PissedAtTC3 > 400){
Spot = 0;
Hunting = false;
target = MevNavNetwork.xbTarget;
if(Gyro != null)
Gyro.AimTarget = MevNavNetwork.xbTarget;
  
Attacking = true;
}
if(MevNavNetwork.xbTarget.name.Contains ("TC5") && PissedAtTC5 > 400){
Spot = 0;
Hunting = false;
target = MevNavNetwork.xbTarget;
if(Gyro != null)
Gyro.AimTarget = MevNavNetwork.xbTarget;
  
Attacking = true;
}
if(MevNavNetwork.xbTarget.name.Contains ("TC6") && PissedAtTC6 > 400){
Spot = 0;
Hunting = false;
target = MevNavNetwork.xbTarget;
if(Gyro != null)
Gyro.AimTarget = MevNavNetwork.xbTarget;
  
Attacking = true;
}
if(MevNavNetwork.xbTarget.name.Contains ("TC8") && PissedAtTC8 > 400){
Spot = 0;
Hunting = false;
target = MevNavNetwork.xbTarget;
if(Gyro != null)
Gyro.AimTarget = MevNavNetwork.xbTarget;
  
Attacking = true;
}
if(MevNavNetwork.xbTarget.name.Contains ("TC9") && PissedAtTC9 > 400){
Spot = 0;
Hunting = false;
target = MevNavNetwork.xbTarget;
if(Gyro != null)
Gyro.AimTarget = MevNavNetwork.xbTarget;
  
Attacking = true;
}
}

}

if(Attacking){
Trig.center = Vector3(0,0,0);
Trig.size = Vector3(600,300,600);
}else{
Trig.center = Vector3(0,0,1700);
Trig.size = Vector3(600,300,4000);
}

if(Spot == 1 && !Attacking){
  Spot = 0;
  Hunting = true;
  target = ResetAimpoint;
  Gyro.AimTarget = ResetAimpoint;
}

if(DangerSense > 0){

if(DangerSense == 1 && !Attacking){
target = ResetAimpoint;
Gyro.AimTarget = ResetAimpoint;
}

DangerSense -= 1;
}

if(Spot > 0)
Spot -= 1;

if(SpawnCounter > 0)
SpawnCounter -= 1;

if(Ignorage > 4){
Ignorage = 0;
target = null;
}

if(StuckCounter > 0){
if(!TurnLeft)
StuckCounter -= 1;
}

if(Stuck){
if(StuckCounter < 18){
Stuck = false;
StuckTimer = 0;
}
}

StuckTimer += 1;

if(StuckTimer > 16){
var lastPos : Vector3 = thisTransform.position;
IsEscaping(lastPos);
StuckTimer = 0;
}

if(target == Waypoint)
Gyro.AimForce = 1000000;
else
Gyro.AimForce = 0;

Gyro.TurnForce = 0;

if(OnHull){
if(SpawnCounter == 0)
SpawnDrone();
OnHull = false;
Obstacle = true;
}

Wall = false;
RWall = false;
LWall = false;

TurnRight = false;
TurnLeft = false;

Notice();

Notice2(lastTPos);

}

function Notice(){

if(Attacking){
if(Emergency)
MevNavNetwork.instance.EnemyTarget1 = target;

if(target != null)
if(target.name.Contains ("bTC") && !HasRequested && StoredCMissiles < 1){
HasRequested = true;
MevNavNetwork.RequestCruiseMissile = true;
MevNavNetwork.instance.EnemyTarget2 = target;
}
}

if(DangerSense > 0){
DangerTick = true;
thisTransform.LookAt(Waypoint);
yield WaitForSeconds (0.1);
DangerTick = false;
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

function IsEscaping(lastPos : Vector3){
Stuck = false;
TurnRight = false;
TurnLeft = false;
yield WaitForSeconds (2);

  if(Vector3.Distance(thisTransform.position, lastPos) < 32){
  Stuck = true;
  StuckCounter = 26;
  }
}

function Damage () {

Trig.center = Vector3(0,0,0);
Trig.size = Vector3(1,1,1);

Damaged = true;
}