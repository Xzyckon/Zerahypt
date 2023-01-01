
var Sound1: AudioClip[];
var Sound1MinForce = 200;
var Sound2: AudioClip;
var Sound3: AudioClip;
var SoundT: AudioClip[];

var vRigidbody : Rigidbody;

var forwardTF : Transform;

var Complementary : boolean;
var MainCS : CollisionSound;

var CanSound : boolean;
var CanTSound : boolean;
var CanStrike : boolean;
var Broken : boolean;
var BrokenC : boolean;
var OnlySoundOnce : boolean;
var Invincible : boolean;

var SkidVehicle : boolean;

var Sturdy : boolean;
var Argaline : boolean;
var IgnoreSmallC : boolean;

var HasSpinVac : boolean;
var VacArea: GameObject;

var StrikePrefabMetal: GameObject;
var StrikePrefabMetalCont: GameObject;
var StrikePrefabStructure: GameObject;
var StrikePrefabStructureCont: GameObject;
var StrikePrefabGround: GameObject;
var StrikePrefabGroundCont: GameObject;

var MSGMaxVolume : float = 0.5;
var MotionSoundGround: GameObject;

var VesselHealth = 10;

var Reps = 0;

InvokeRepeating("Tick", 1, 0.3);
InvokeRepeating("Tick2", 1, 0.1);

var rAV : float;
var rV : float;

var lastVelocity : float;
var lastTVelocity : float;
var Gs : float;
var TGs : float;

function Start () {

if(!forwardTF)
forwardTF = transform;

vRigidbody = gameObject.rigidbody;

if(GetComponent("VehicleDamage") != null)
VesselHealth = GetComponent("VehicleDamage").Health;
}

function FixedUpdate () {

rV = vRigidbody.velocity.magnitude;
rAV = vRigidbody.angularVelocity.magnitude;

var acceleration = (rV - lastVelocity) / Time.deltaTime;
    lastVelocity = rV;
    
    Gs = Mathf.Abs(acceleration);
    
    var Tacceleration = (rAV - lastTVelocity) / Time.deltaTime;
    lastTVelocity = rAV;
    
    TGs = Mathf.Abs(Tacceleration);

if(!Complementary){

if(!Broken){

if(Sound3){
if (CanSound){
    if(!Sturdy && !Argaline)
    if(Gs > 2500){
    CanSound = false;
    if(Sound3)
    audio.PlayOneShot(Sound3, 1);
    if(OnlySoundOnce){
    Broken = true;
    return;
    }
    if(!Invincible){
    GetComponent("VehicleDamage").Health -= VesselHealth * 4;
    GetComponent("VehicleDamage").DamageIn(0, 0, 0, false);
    }
    }
    
    if(Sturdy)
    if(Gs > 3000){
    CanSound = false;
    audio.PlayOneShot(Sound3, 1);
    if(OnlySoundOnce){
    Broken = true;
    return;
    }
    if(!Invincible){
    GetComponent("VehicleDamage").Health -= VesselHealth * 4;
    GetComponent("VehicleDamage").DamageIn(0, 0, 0, false);
    }
    }
    
    if(Argaline)
    if(Gs > 4000){
    CanSound = false;
    audio.PlayOneShot(Sound3, 1);
    if(OnlySoundOnce){
    Broken = true;
    return;
    }
    if(!Invincible){
    GetComponent("VehicleDamage").Health -= VesselHealth * 4;
    GetComponent("VehicleDamage").DamageIn(0, 0, 0, false);
    }
    }
}

if (CanSound){
    if(Gs > 1500){
    CanSound = false;
    audio.PlayOneShot(Sound3, 1);
    if(OnlySoundOnce){
    Broken = true;
    return;
    }
    if(!Invincible){
    if(!Sturdy && !Argaline)
    GetComponent("VehicleDamage").Health -= VesselHealth * 0.75;
    if(Sturdy && !Argaline)
    GetComponent("VehicleDamage").Health -= VesselHealth * 0.35;
    if(Argaline)
    GetComponent("VehicleDamage").Health -= VesselHealth * 0.20;

    GetComponent("VehicleDamage").DamageIn(0, 0, 0, false);
    }
    }
}
}

if(Sound2)
if (CanSound){
    if(Gs > 700){
    CanSound = false;
    audio.PlayOneShot(Sound2, 1);
    if(OnlySoundOnce){
    Broken = true;
    return;
    }
    if(!Invincible){
    
    if(!Sturdy && !Argaline)
    GetComponent("VehicleDamage").Health -= VesselHealth * 0.25;
    if(Sturdy && !Argaline)
    GetComponent("VehicleDamage").Health -= VesselHealth * 0.15;
    
    GetComponent("VehicleDamage").DamageIn(0, 0, 0, false);
    }
    }
}

if(Sound1.length > 0)
if (CanSound && !IgnoreSmallC){
    if(Gs > Sound1MinForce){
    CanSound = false;
    audio.PlayOneShot(Sound1[Random.Range(0, Sound1.Length)], 1);
    if(OnlySoundOnce){
    Broken = true;
    return;
    }
    }
}

if(SoundT.length > 0){
if (CanTSound){
    if(TGs > 100){
    CanTSound = false;
    audio.PlayOneShot(SoundT[Random.Range(0, SoundT.Length)], 1);
    if(OnlySoundOnce){
    Broken = true;
    return;
    }
    }
}
}
}

if(MotionSoundGround)
MotionSoundGround.audio.volume -= 0.005;

}
}

function OnCollisionStay(collision : Collision) {

if(collision.gameObject.tag == "Ghosts")
return;

if(collision.rigidbody)
if(collision.rigidbody.velocity.magnitude > rV)
CanStrike = false;

if(CanStrike)
if(collision.relativeVelocity.magnitude > 19)
Reps += 1;

if(CanStrike)
if(!OnlySoundOnce){
if(TGs > 200 || Gs > 400 || collision.relativeVelocity.magnitude > 20 || rAV > 10){

if(collision.contacts.length > 0){
var contact : ContactPoint = collision.contacts[0];
  
  if(collision.gameObject.tag == "SoftTerrain" || collision.gameObject.tag == "Terrain"){
  if(!Complementary){
  if(Reps < 2)
  Instantiate(StrikePrefabGround, contact.point, transform.rotation);
  if(Reps > 1 && !SkidVehicle){
  var Thing1 = Instantiate(StrikePrefabGroundCont, contact.point, transform.rotation);
  Thing1.rigidbody.velocity = vRigidbody.velocity * 1;
  }
  }else{
  if(MainCS.Reps < 2)
  Instantiate(StrikePrefabGround, contact.point, transform.rotation);
  if(MainCS.Reps > 1){
  var Thing2 = Instantiate(StrikePrefabGroundCont, contact.point, transform.rotation);
  Thing2.rigidbody.velocity = vRigidbody.velocity * 1;
  }
  }
  
  CanStrike = false;
  Reps = 4;
  if(Complementary)
  MainCS.Reps = 4;
  }
        
  if(collision.gameObject.tag == "Structure" || collision.gameObject.tag == "Mineral" || collision.gameObject.tag == "Untagged"){
  if(!Complementary){
  if(Reps < 2)
  Instantiate(StrikePrefabStructure, contact.point, transform.rotation);
  if(Reps > 1){
  var Thing3 = Instantiate(StrikePrefabStructureCont, contact.point, transform.rotation);
  Thing3.rigidbody.velocity = vRigidbody.velocity * 1;
  }
  }else{
  if(MainCS.Reps < 2)
  Instantiate(StrikePrefabStructure, contact.point, transform.rotation);
  if(MainCS.Reps > 1){
  var Thing4 = Instantiate(StrikePrefabStructureCont, contact.point, transform.rotation);
  Thing4.rigidbody.velocity = vRigidbody.velocity * 1;
  }
  }
 
  CanStrike = false;
  Reps = 4;
  if(Complementary)
  MainCS.Reps = 4;
  }
        
  if(collision.gameObject.tag == "Vehicle" || collision.gameObject.tag == "Metal" 
                                           || collision.gameObject.tag == "MetalStructure" 
                                           || collision.gameObject.tag == "ElementMaterials"){
  if(!Complementary){
  if(Reps < 2)
  Instantiate(StrikePrefabMetal, contact.point, forwardTF.rotation);
  if(Reps > 1){
  var Thing5 = Instantiate(StrikePrefabMetalCont, contact.point, forwardTF.rotation);
  Thing5.rigidbody.velocity = vRigidbody.velocity * 1;
  }
  }else{
  if(MainCS.Reps < 2)
  Instantiate(StrikePrefabMetal, contact.point, forwardTF.rotation);
  if(MainCS.Reps > 1){
  var Thing6 = Instantiate(StrikePrefabMetalCont, contact.point, forwardTF.rotation);
  Thing6.rigidbody.velocity = vRigidbody.velocity * 1;
  }
  }
  
  CanStrike = false;
  Reps = 4;
  if(Complementary)
  MainCS.Reps = 4;
 }
}
}
}else{
if(!BrokenC)
if(TGs > 200 || Gs > 100 || collision.relativeVelocity.magnitude > 20 || rAV > 10){

if(collision.contacts.length > 0){
var contact2 : ContactPoint = collision.contacts[0];
var NormalAngle = Quaternion.LookRotation(contact2.normal);
  
  if(collision.gameObject.tag == "SoftTerrain" || collision.gameObject.tag == "Terrain"){
  if(!Complementary){
  if(Reps < 2)
  Instantiate(StrikePrefabGround, contact2.point, NormalAngle);
  if(Reps > 1 && !SkidVehicle){
  var Thing1S = Instantiate(StrikePrefabGroundCont, contact2.point, transform.rotation);
  Thing1S.rigidbody.velocity = vRigidbody.velocity * 1;
  }
  }else{
  if(MainCS.Reps < 2)
  Instantiate(StrikePrefabGround, contact2.point, NormalAngle);
  if(MainCS.Reps > 1){
  var Thing2S = Instantiate(StrikePrefabGroundCont, contact2.point, transform.rotation);
  Thing2S.rigidbody.velocity = vRigidbody.velocity * 1;
  }
  }
  
  CanStrike = false;
  Reps = 4;
  if(Complementary)
  MainCS.Reps = 4;
  }
        
  if(collision.gameObject.tag == "Structure" || collision.gameObject.tag == "Mineral" || collision.gameObject.tag == "Untagged"){
  if(!Complementary){
  if(Reps < 2)
  Instantiate(StrikePrefabStructure, contact2.point, NormalAngle);
  if(Reps > 1){
  var Thing3S = Instantiate(StrikePrefabStructureCont, contact2.point, transform.rotation);
  Thing3S.rigidbody.velocity = vRigidbody.velocity * 1;
  }
  }else{
  if(MainCS.Reps < 2)
  Instantiate(StrikePrefabStructure, contact2.point, NormalAngle);
  if(MainCS.Reps > 1){
  var Thing4S = Instantiate(StrikePrefabStructureCont, contact2.point, transform.rotation);
  Thing4S.rigidbody.velocity = vRigidbody.velocity * 1;
  }
  }
 
  CanStrike = false;
  Reps = 4;
  if(Complementary)
  MainCS.Reps = 4;
  }
        
  if(collision.gameObject.tag == "Vehicle" || collision.gameObject.tag == "Metal" 
                                           || collision.gameObject.tag == "MetalStructure" 
                                           || collision.gameObject.tag == "ElementMaterials"){
  if(!Complementary){
  if(Reps < 2)
  Instantiate(StrikePrefabMetal, contact2.point, NormalAngle);
  if(Reps > 1){
  var Thing5S = Instantiate(StrikePrefabMetalCont, contact2.point, forwardTF.rotation);
  Thing5S.rigidbody.velocity = vRigidbody.velocity * 1;
  }
  }else{
  if(MainCS.Reps < 2)
  Instantiate(StrikePrefabMetal, contact2.point, NormalAngle);
  if(MainCS.Reps > 1){
  var Thing6S = Instantiate(StrikePrefabMetalCont, contact2.point, forwardTF.rotation);
  Thing6S.rigidbody.velocity = vRigidbody.velocity * 1;
  }
  }
  
  CanStrike = false;
  Reps = 4;
  if(Complementary)
  MainCS.Reps = 4;
 }
BrokenC = true;
}
}
}
        
if(MotionSoundGround){

if(collision.gameObject.tag == "SoftTerrain"  || collision.gameObject.tag == "Terrain"
                                        || collision.gameObject.tag == "Structure"
                                        || collision.gameObject.tag == "MetalStructure"
                                        || collision.gameObject.tag == "Metal"
                                        || collision.gameObject.tag == "ElementMaterials"
                                        || collision.gameObject.tag == "Vehicle")
if(MotionSoundGround.audio.volume < collision.relativeVelocity.magnitude * 0.015)
    MotionSoundGround.audio.volume = collision.relativeVelocity.magnitude * 0.015;
    
    
 if(MotionSoundGround.audio.volume > MSGMaxVolume)
    MotionSoundGround.audio.volume = MSGMaxVolume;
    
}
}

function Tick () {
CanSound = true;
CanTSound = true;
}

function Tick2 () {

if(HasSpinVac){
if(rAV > 32){
name = "TFC1#2";
VacArea.gameObject.SetActive (true);
}else{
VacArea.gameObject.SetActive (false);
if(rAV > 16){
name = "TFC1#1";
}else{
name = "Hull";
}
}
}

CanStrike = true;
if(Reps > 1)
Reps -= 1;
}