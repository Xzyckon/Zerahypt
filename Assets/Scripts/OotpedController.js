#pragma strict
var Target : Transform;
var Model : GameObject;
var Blur : GameObject;

var CanFade : boolean;
var IsFading : boolean;
var IsFadingOut : boolean;

var AimForce : float = 0.1;
var Force : float = 0.1;

InvokeRepeating("Skitter", 0.1, 0.06);

InvokeRepeating("Reset", 0.1, 0.17);

function Start () {
Target = PlayerInformation.instance.Pirizuka;
yield WaitForSeconds (0.1);
gameObject.GetComponent(SphereCollider).radius = 0.2;
yield WaitForSeconds (0.1);
gameObject.GetComponent(SphereCollider).radius = 0.3;
yield WaitForSeconds (0.1);
gameObject.GetComponent(SphereCollider).radius = 0.4;
yield WaitForSeconds (0.1);
gameObject.GetComponent(SphereCollider).radius = 0.5;
yield WaitForSeconds (1.6);
CanFade = true;
yield WaitForSeconds (18);
IsFadingOut = true;
yield WaitForSeconds (2);
Destroy(transform.parent.gameObject);
}

function FixedUpdate () {

var newColor : Color = Model.renderer.material.GetColor("_TintColor");

rigidbody.AddForceAtPosition((Target.transform.position - transform.position).normalized * AimForce, transform.up*1);
rigidbody.AddForceAtPosition((Target.transform.position - transform.position).normalized * -AimForce, -transform.up*1);

rigidbody.AddForce(transform.up * Force);

if(Blur.particleSystem.emissionRate < 10 && !IsFading)
Blur.particleSystem.emissionRate += 0.05;

if(newColor.a < 0.2 && !IsFading)
newColor.a += 0.02;


if(Vector3.Distance(transform.position, Target.position) < 5 && !IsFadingOut && CanFade){
IsFading = true;
Blur.particleSystem.emissionRate = 0;
newColor.a -= 0.02;
}

if(IsFadingOut){
IsFading = true;
Blur.particleSystem.emissionRate = 0;
newColor.a -= 0.02;
}
Model.renderer.material.SetColor("_TintColor", newColor);
}

function Skitter () {
Model.transform.Rotate(Random.Range (-20, 20),Random.Range (-30, 30),Random.Range (-170, -190));
}

function Reset () {
Model.transform.rotation = gameObject.transform.rotation;
}