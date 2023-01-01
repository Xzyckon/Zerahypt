var target : Transform;

var AimForce : float = 1;

var Force : float = 0;

var Aiming : boolean;

var thisTransform : Transform;

var thisRigidbody : Rigidbody;

var ProximityRange = 5;

var IsDoomstar : boolean;

var PylonMigrate : boolean;

var DoomclawMigrate : boolean;

var LinearCourse : boolean;

var CanCol : boolean;

var Discharge : boolean;

var Charged : boolean;

var Boosting : boolean;
var Boosted : boolean;

var BoostSound: GameObject;

var localV : Vector3;

var Obstacle : boolean;

var Sphere1 : SphereCollider;
var Sphere2 : SphereCollider;

var Trigger : SphereCollider;

var Noise1: AudioSource;
var Noise2: AudioSource;

var BowShockEffects: GameObject;
var AllEffects: GameObject;
var AuraEffects: GameObject;
var explosion: GameObject;
var DischargeEffect: GameObject;
var GlowOffEffect: GameObject;

var GlowEffect : ParticleSystem;
var LightEffect: Light;

var Remover : KillOverTime;

static var newTarget : Transform;

var CivArea : Transform;

var CivCount = 0;

var VelClamp : float = 0;

var targetLayers : LayerMask;

InvokeRepeating("Counter", 0.1, 0.33);

function Start () {

if(IsDoomstar){
AgrianNetwork.DoomstarActive = true;
AgrianNetwork.theDoomstar = thisTransform;
Charged = true;
Aiming = true;
Noise2.volume = 1;
Noise1.volume = 0;
AuraEffects.gameObject.SetActive (true);
BowShockEffects.gameObject.SetActive (true);
GlowEffect.emissionRate = 64;
LightEffect.intensity = 1;
Sphere1.enabled = true;
Sphere2.enabled = true;
Force = 16;
thisRigidbody.mass = 0.1;
thisRigidbody.drag = 0.7;
thisRigidbody.angularDrag = 4;
Trigger.radius = 500;
}else{
AgrianNetwork.DoomstarActive = false;
Charged = false;
Aiming = false;
Noise2.volume = 0;
Noise1.volume = 0;
AuraEffects.gameObject.SetActive (false);
BowShockEffects.gameObject.SetActive (false);
GlowEffect.emissionRate = 0;
LightEffect.intensity = 0;
Sphere1.enabled = false;
Sphere2.enabled = false;
Force = 16;
thisRigidbody.mass = 0.02;
thisRigidbody.drag = 0.1;
thisRigidbody.angularDrag = 0.1;
Trigger.radius = 1;
}

if(LinearCourse){
Trigger.radius = 1;
thisRigidbody.drag = 0;
thisRigidbody.velocity = thisTransform.forward * 250;
}

}

function Update () {
var hit : RaycastHit;
VelClamp = Mathf.Clamp(thisRigidbody.velocity.magnitude,10,500);

if (Physics.Raycast (thisTransform.position, thisTransform.forward, hit, VelClamp, targetLayers))
Obstacle = true;
else
Obstacle = false;
}

function FixedUpdate () {

if(!Discharge && IsDoomstar && !LinearCourse){

if (thisRigidbody.velocity != Vector3.zero)
BowShockEffects.transform.rotation = Quaternion.LookRotation(thisRigidbody.velocity);
         
         if(target){
         if(Obstacle){
         thisRigidbody.AddForce(Vector3.up * 8);
         }else{
         
         if(!Boosting){
         thisRigidbody.AddForce(thisTransform.forward * Force);
         AimForce = 1;
         }else{
         thisRigidbody.AddForce(thisTransform.forward * Force);
         AimForce = 2;
         }
         
         }
         }else{
         thisRigidbody.AddForce(thisTransform.forward * 8);
         }
         
         if(target){
         thisRigidbody.AddForceAtPosition((target.transform.position - thisTransform.position).normalized * AimForce, thisTransform.forward * 1);
         thisRigidbody.AddForceAtPosition((target.transform.position - thisTransform.position).normalized * -AimForce, -thisTransform.forward * 1);
         }

if(target)
if(Vector3.Distance(thisTransform.position, target.position) < ProximityRange && Aiming && CivCount < 1){
    Instantiate(explosion, thisTransform.position, explosion.transform.rotation);
    
    Noise2.volume = 0;
    
    gameObject.collider.enabled = false;
    
    AllEffects.gameObject.SetActive (false);
    
    Remover.IsRemoving = true;
    
    AgrianNetwork.DoomstarActive = false;
    
    Destroy(this);
  }
}
  
  if(Discharge){
  
  if(target){
         thisRigidbody.AddForce(thisTransform.forward * 4);
         thisRigidbody.AddForceAtPosition((target.transform.position - thisTransform.position).normalized * AimForce, thisTransform.forward * 1);
         thisRigidbody.AddForceAtPosition((target.transform.position - thisTransform.position).normalized * -AimForce, -thisTransform.forward * 1);
  }
  
  if(Noise2.volume > 0)
	 Noise2.volume -= 0.001;
	
  if(Noise1.volume < 1)
	 Noise1.volume += 0.001;
	
  if(Noise2.volume == 0.999){
    var SpawnedObject = Instantiate(DischargeEffect, thisTransform.position, thisTransform.rotation);
	SpawnedObject.transform.parent = thisTransform;
	
    AuraEffects.gameObject.SetActive (false);
    BowShockEffects.gameObject.SetActive (false);
    
    AgrianNetwork.DoomstarActive = false;
    }
    
    if(Noise2.volume == 0){
    thisRigidbody.mass = 0.02;
    thisRigidbody.drag = 0.1;
    thisRigidbody.angularDrag = 0.1;
    target = null;
    Discharge = false;
    }
    
  }

}

function OnTriggerStay (other : Collider) {
if(!Discharge && IsDoomstar && !LinearCourse){
if(other.collider.name.Contains ("C2")){
if(!other.collider.name.Contains ("tTC")){
CivArea = other.gameObject.transform;
Trigger.radius = 1;
CivCount = 4;
Aiming = false;
}
}
}
}

function OnCollisionEnter(collision : Collision){

if(LinearCourse && CanCol){
Instantiate(explosion, thisTransform.position, explosion.transform.rotation);
    
Noise2.volume = 0;
    
gameObject.collider.enabled = false;
    
AllEffects.gameObject.SetActive (false);
    
Remover.IsRemoving = true;
    
AgrianNetwork.DoomstarActive = false;
    
Destroy(this);
}

if(Charged && !IsDoomstar && !LinearCourse && Noise2.volume == 0)
if(collision.gameObject.tag == "SoftTerrain"  || collision.gameObject.tag == "Terrain"
                                        || collision.gameObject.tag == "Structure"
                                        || collision.gameObject.tag == "MetalStructure"
                                        || collision.gameObject.tag == "Vehicle"){
Charged = false;
GlowEffect.emissionRate = 0;
Noise1.volume = 0;
LightEffect.intensity = 0;
Instantiate(GlowOffEffect, thisTransform.position, thisTransform.rotation);
}

if(collision.gameObject.name.Contains("Z#") && !Charged){

if(GlowEffect.emissionRate < 64)
   GlowEffect.emissionRate += 8;
   
if(Noise1.volume < 1){
   Noise1.volume += 0.125;
   LightEffect.intensity += 0.125;
}
   
if(GlowEffect.emissionRate == 64)
Charged = true;
}

}

function Counter () {

if(newTarget)
target = newTarget;

if(AgrianNetwork.DoomclawActive){
target = AgrianNetwork.theDoomclaw;
DoomclawMigrate = true;
thisRigidbody.drag = 4;
}

if(DoomclawMigrate)
return;

if(target){

AgrianNetwork.doomstarTarget = target;

if(target.name.Contains ("EnergyBall")){
if(Vector3.Distance(thisTransform.position, target.position) < 30){

Sphere2.enabled = false;

if(Vector3.Distance(thisTransform.position, target.position) < 15){
IsDoomstar = false;
Trigger.radius = 1;
Discharge = true;
Sphere1.enabled = false;
Sphere2.enabled = false;

}

}
}

}

if(!Discharge && IsDoomstar && !LinearCourse){

if(PylonMigrate){
Force = 16;

if(Vector3.Distance(thisTransform.position, target.position) < 1000)
thisRigidbody.drag = 4;
else
thisRigidbody.drag = 0.7;

}else{

if(target == null){
target = EnergyPylonScript.EnergyBallArea;
}else{

if(WorldInformation.instance.AreaCode == 9)
target = EnergyPylonScript.EnergyBallArea;

if(!target.name.Contains ("TC")){
target = EnergyPylonScript.EnergyBallArea;
PylonMigrate = true;
}else{

localV = thisTransform.InverseTransformDirection(thisRigidbody.velocity);

if(localV.x < 10 && localV.y < 10)
if(!Boosted && !CivArea)
Boost();

}
}

if(target){

if(!Boosting){

if(thisRigidbody.drag < 2)
thisRigidbody.drag += 0.005;

if(Force < 50)
Force += 0.125;

}else{
thisRigidbody.drag = 2;
}

if(CivArea){
if(Vector3.Distance(CivArea.position, target.position) < 1000){
thisRigidbody.drag = 4;
}else{
if(thisRigidbody.drag > 2)
thisRigidbody.drag = 0.7;
}

}

}

Trigger.radius = 1000;

if(CivArea){
if(Vector3.Distance(CivArea.transform.position, thisTransform.position) > 1000){
CivArea = null;
Aiming = true;
}
}else{
Aiming = true;
}

if(CivCount > 0)
CivCount -= 1;

if(AgrianNetwork.DismissDoomstar){
target = EnergyPylonScript.EnergyBallArea;
}

}

}

CanCol = true;

}

function Boost () {
Boosting = true;
Boosted = true;
thisRigidbody.drag = 2;
Force = 180;
var TheThing = Instantiate(BoostSound, thisTransform.position, thisTransform.rotation);
    TheThing.transform.parent = thisTransform;
yield WaitForSeconds (1.5);
Boosting = false;
thisRigidbody.drag = 0.7;
Force = 16;
yield WaitForSeconds (6);
Boosted = false;
}