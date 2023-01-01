 var Aimer : GameObject;
 
 var HatchAniObject : GameObject;
 var Closing : String;
 var Opening : String;
 
 var GunForward : String;
 var GunBack : String;
 
 var ActivateSound : GameObject;
 var DeactivateSound : GameObject;
 
 var GunBase : GameObject;
 var NewGunBase : GameObject;
 
 var AmmoBay : GameObject;
 var Ammunition : GameObject;
 var ShockwaveLocation : Transform;
 var BarrelLocation : Transform;
 
 var Shockwave : GameObject;
 var RecoilAnimationObject : GameObject;
 var RecoilAnimationName : String = "Name";
 
 var Broken : boolean;
 var CanFire : boolean = false;
 var IsShooting : boolean;
 var IsAnimating : boolean;
 var IsOut : boolean;
 var GunCooldown : float = 3;
 private var xStartTime: float;
 private var gunTimer : float;

function Update () {

if(Broken)
return;

if(WorldInformation.playerCar == this.gameObject.name){

if(Input.GetKey("6") && IsAnimating == false && !IsShooting)
GunBoolean();

if(Input.GetKey("5"))
Shoot(); 
 }
}

function GunBoolean () {
if(IsAnimating == false && !IsOut){
hinge = GunBase.GetComponent("HingeJoint");
Animating();
HatchAniObject.animation.Play(Opening);

yield WaitForSeconds (0.2);

Cjoint = NewGunBase.GetComponent("ConfigurableJoint");
Cjoint.targetPosition = Vector3(0,0,0);

yield WaitForSeconds (0.6);
ActivateSound.audio.Play();
hinge.spring.targetPosition = 0;

yield WaitForSeconds (0.6);

RecoilAnimationObject.animation.Play(GunForward);
hinge.spring.spring = 0;

Aimer.GetComponent("TurretAim").Activated = true;
hinge.limits.max = -15;
yield WaitForSeconds (0.05);
hinge.limits.max = -10;
yield WaitForSeconds (0.05);
hinge.limits.max = -5;
yield WaitForSeconds (0.05);
hinge.limits.max = 0;
yield WaitForSeconds (0.05);

IsOut = true;
CanFire = true;
}

if(IsAnimating == false && IsOut){
hinge = GunBase.GetComponent("HingeJoint");
Animating();

IsOut = false;
CanFire = false;
hinge.limits.max = -90;
Aimer.GetComponent("TurretAim").Activated = false;

RecoilAnimationObject.animation.Play(GunBack);
DeactivateSound.audio.Play();

yield WaitForSeconds (0.4);

hinge.spring.spring = 0.3;
hinge.spring.targetPosition = -90;

yield WaitForSeconds (0.8);

Cjoint = NewGunBase.GetComponent("ConfigurableJoint");
Cjoint.targetPosition = Vector3(0,0,-3);

HatchAniObject.animation.Play(Closing);
}
}

function Animating () {
IsAnimating = true;
yield WaitForSeconds (3);
IsAnimating = false;
}

function Shooting () {
IsShooting = true;
yield WaitForSeconds (3);
IsShooting = false;
}

function Shoot () {
    if(Mathf.Abs(xStartTime - Time.time) >= gunTimer && CanFire == true && IsOut){
        xStartTime = Time.time;
            gunTimer = GunCooldown;
            gunShot();
            Shooting();
    }
}

function gunShot () {

var TheThing = Instantiate(Ammunition, BarrelLocation.position, BarrelLocation.rotation);
    TheThing.transform.parent = RecoilAnimationObject.transform;
    
    RecoilAnimationObject.animation.Play(RecoilAnimationName);
    
    AmmoBay.GetComponent("AmmoBay").ExpendedRound(1);
}