#pragma strict
var Vessel : GameObject;

var Damager : GameObject;

var partOfWarper : boolean;

var warperScript : Warper;

var SpeedThreshold = 300;

function Start () {
if(!partOfWarper){
var newColor : Color = renderer.material.GetColor("_TintColor");
newColor.a = 0;
renderer.material.SetColor("_TintColor", newColor);
}
}

function FixedUpdate () {

var newColor : Color = renderer.material.GetColor("_TintColor");

if(!partOfWarper){
if (Vessel.rigidbody.velocity.magnitude > SpeedThreshold) {

if(Damager)
Damager.gameObject.SetActive (true);

if(newColor.a < 0.03f)
newColor.a += 0.01f;
}else{

if(Damager)
Damager.gameObject.SetActive (false);

if(newColor.a > 0f)
newColor.a -= 0.01f;
}
}else{
if (warperScript.warpStartFXed) {

if(Damager)
Damager.gameObject.SetActive (true);

if(newColor.a < 0.03f)
newColor.a += 0.01f;
}else{

if(Damager)
Damager.gameObject.SetActive (false);

if(newColor.a > 0f)
newColor.a -= 0.01f;
}
}
renderer.material.SetColor("_TintColor", newColor);
}