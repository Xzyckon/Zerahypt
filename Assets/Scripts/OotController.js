var Target : Transform;
var Model : GameObject;
var Blur : ParticleSystem;

var newColor : Color;

var isBlurryOot : boolean;

var CanFade : boolean;
var IsFading : boolean;
var IsFadingOut : boolean;

function Start () {

if(isBlurryOot)
newColor = Model.renderer.material.GetColor("_TintColor");
else
newColor = Model.renderer.material.GetColor("_Color");

Target = PlayerInformation.instance.Pirizuka;
yield WaitForSeconds (1);
CanFade = true;
yield WaitForSeconds (Random.Range(2, 8));
IsFadingOut = true;
yield WaitForSeconds (3.5);
Destroy(transform.parent.gameObject);
}

function FixedUpdate () {

if(isBlurryOot)
rigidbody.AddForce(transform.forward * Random.Range (0.0001, 0.0003));
else
rigidbody.AddForce(transform.forward * 0.0001);

rigidbody.AddTorque(transform.up * Random.Range (-0.0001, 0.0001));
rigidbody.AddTorque(transform.right * Random.Range (-0.0001, 0.0001));
rigidbody.AddTorque(transform.forward * Random.Range (-0.0001, 0.0001));

if(Blur.startColor.a < 0.5 && !IsFading)
Blur.startColor.a += 0.005;

if(newColor.a < 0.5 && !IsFading)
newColor.a += 0.01;

if(Vector3.Distance(transform.position, Target.position) < 3 && !IsFadingOut && CanFade){
IsFading = true;
Blur.startColor.a -= 0.005;
newColor.a -= 0.005;
}

if(IsFadingOut){
IsFading = true;
Blur.startColor.a -= 0.005;
newColor.a -= 0.005;
}

if(isBlurryOot)
Model.renderer.material.SetColor("_TintColor", newColor);
else
Model.renderer.material.SetColor("_Color", newColor);

}