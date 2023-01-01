var Ootkin : GameObject;

var Limb1 : GameObject;
var Limb2 : GameObject;
var Limb3 : GameObject;

var audioC1  : AudioClip;
var audioC2  : AudioClip;
var audioC3  : AudioClip;

var EndemicTarget : Transform;
var Target : Transform;
var Antagonist : Transform;
var WanderStrength : float = 0;
var Power : float = 0.01;
var OotkinTransparency : float = 0.8;
var OotkinFadeSpeed : float = 0.02;

var OotkinFadeoutSpeed : float = 0.02;
var OotkinFadeinSpeed : float = 0.02;

var Remover : RemoveOverTime;

var Lifetime = 60;

var Wander : boolean;

var WanderAllAxis : boolean;

var SomeoneClose : boolean;

var Fadeout : boolean;

var CanPlayNoise : boolean = true;

InvokeRepeating("Ticker", 1, 1);

function Start () {

Lifetime = Lifetime - Random.Range (0, Lifetime - 20);

Ootkin.renderer.material.color.a = 0;
if(Limb1 != null)
Limb1.renderer.material.color.a = 0;
if(Limb2 != null)
Limb2.renderer.material.color.a = 0;
if(Limb3 != null)
Limb3.renderer.material.color.a = 0;
}

function FixedUpdate(){
if(!Fadeout){
if(SomeoneClose && Ootkin.renderer.material.color.a > 0){
Ootkin.renderer.material.color.a -= OotkinFadeoutSpeed;
if(Limb1 != null)
Limb1.renderer.material.color.a -= OotkinFadeoutSpeed;
if(Limb2 != null)
Limb2.renderer.material.color.a -= OotkinFadeoutSpeed;
if(Limb3 != null)
Limb3.renderer.material.color.a -= OotkinFadeoutSpeed;
}

if(!SomeoneClose && Ootkin.renderer.material.color.a < OotkinTransparency){
Ootkin.renderer.material.color.a += OotkinFadeinSpeed;
if(Limb1 != null)
Limb1.renderer.material.color.a += OotkinFadeinSpeed;
if(Limb2 != null)
Limb2.renderer.material.color.a += OotkinFadeinSpeed;
if(Limb3 != null)
Limb3.renderer.material.color.a += OotkinFadeinSpeed;
}
}else{
if(Ootkin.renderer.material.color.a > 0){
Ootkin.renderer.material.color.a -= OotkinFadeoutSpeed;
if(Limb1 != null)
Limb1.renderer.material.color.a -= OotkinFadeoutSpeed;
if(Limb2 != null)
Limb2.renderer.material.color.a -= OotkinFadeoutSpeed;
if(Limb3 != null)
Limb3.renderer.material.color.a -= OotkinFadeoutSpeed;
}
}

if(Lifetime > 2){
if(Target)
if(Vector3.Distance(transform.position, Target.position) < 1)
OotkinDistortScript.TouchingOotkin = true;

if(Target)
if(Vector3.Distance(transform.position, Target.position) < 2)
OotkinDistortScript.ContactingOotkin = true;

if(Target)
if(Vector3.Distance(transform.position, Target.position) > 5)
OotkinDistortScript.ContactingOotkin = false;
}

if(Wander && !WanderAllAxis)
   Ootkin.rigidbody.AddTorque(transform.forward * Random.Range (-WanderStrength, WanderStrength));

if(Wander && WanderAllAxis){
   Ootkin.rigidbody.AddTorque(transform.right * Random.Range (-WanderStrength, WanderStrength));
   Ootkin.rigidbody.AddTorque(transform.up * Random.Range (-WanderStrength, WanderStrength));
   Ootkin.rigidbody.AddTorque(transform.forward * Random.Range (-WanderStrength, WanderStrength));
   }

if(EndemicTarget != null && Vector3.Distance(transform.position, EndemicTarget.position) > 200)
   Ootkin.rigidbody.AddForce((EndemicTarget.transform.position - transform.position).normalized * Power);

if(Target != null){
if(Vector3.Distance(transform.position, Target.position) < 20)
Ootkin.rigidbody.AddForce((Target.transform.position - transform.position).normalized * Power);
else
Ootkin.rigidbody.AddForce(transform.up * -Power);
}else{
Ootkin.rigidbody.AddForce(transform.up * -Power);
}

if(Antagonist != null && Vector3.Distance(transform.position, Antagonist.position) < 20)
   Ootkin.rigidbody.AddForce((Antagonist.transform.position - transform.position).normalized * -0.004);
}

function OnTriggerEnter (other : Collider) {
if(other.name == "PiriHeatSource"){
SomeoneClose = true;
Target = other.gameObject.transform;
Sound();
Cooldown();
Lifetime = Random.Range (40, 80);
}
}

function OnTriggerStay (other : Collider) {

if(other.name == "OoDet")
Antagonist = other.gameObject.transform;

if(Lifetime > 2)
if(other.name == "Oof")
Lifetime = 2;

}

function OnTriggerExit (other : Collider) {
if(other.name == "PiriHeatSource"){
SomeoneClose = false;
Target = null;
}
}

function Cooldown () {
yield WaitForSeconds (2);
CanPlayNoise = true;
}

function Ticker () {
Lifetime -= 1;

if(Lifetime < 3){
Fadeout = true;
OotkinFadeoutSpeed = 0.01;
OotkinDistortScript.TouchingOotkin = false;
OotkinDistortScript.ContactingOotkin = false;
}

if(Lifetime < 1)
Remover.Removal();
}

function Sound () {

if(!CanPlayNoise)
return;

CanPlayNoise = false;

var randomValue : int = Random.Range(1, 4);

            switch (randomValue) {
    		case 1:
    		audio.PlayOneShot(audioC1);
    		break;
    		case 2:
    		audio.PlayOneShot(audioC2);
    		break;
    		case 3:
    		audio.PlayOneShot(audioC3);
    		break;
    		}
}