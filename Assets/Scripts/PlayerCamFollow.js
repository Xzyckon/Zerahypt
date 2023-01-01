#pragma strict

static var HoldCam : boolean;

var PlayerCamera : Transform;
var LookTarget : Transform;

var Piri : Transform;

var mainListener : AudioListener;
var conListener : AudioListener;

var conScreenAudio : AudioSource;

var ConIcon : GameObject;
var ConScreen : GameObject;

var conFar : boolean;
var once : boolean;

var StabForce = 6.0;
var Force : float = 0.002;

var camDist : float = 1;

InvokeRepeating("Tick", 2, 0.25);

function Start () {

Force = 0.002;

Piri = PlayerInformation.instance.PiriPresence;

if(HoldCam){
rigidbody.isKinematic = true;
yield WaitForSeconds (0.05);
transform.position = PlayerInformation.instance.Pirizuka.position + PlayerInformation.instance.Pirizuka.up * 3 
+ PlayerInformation.instance.Pirizuka.forward * 1.5;
rigidbody.isKinematic = false;
}else{
rigidbody.isKinematic = true;
yield WaitForSeconds (0.05);
transform.position = PlayerInformation.instance.Pirizuka.position + PlayerInformation.instance.Pirizuka.up * 1000;
rigidbody.isKinematic = false;
}

}

function Update (){

if(conFar && !once){
once = true;
audio.Stop();
audio.loop = false;
ConnectionBroken();
}

camDist = Vector3.Distance(transform.position, Piri.position);

}

function FixedUpdate(){
if(!WorldInformation.FPMode)
rigidbody.AddForce((PlayerCamera.transform.position - transform.position) * Force);
    
var rotation = Quaternion.LookRotation(LookTarget.position - transform.position);
transform.rotation = Quaternion.Slerp(transform.rotation, rotation, Time.deltaTime * StabForce);
	
if(Force < 0.002)
Force += 0.00005;
}

function Tick(){
if(!WorldInformation.UsingSnyf){
if(camDist > 512){
conFar = true;
}else{

if(camDist > 256){
ConIcon.SetActive (true);

if(!conFar)
if(!audio.isPlaying)
audio.Play();
audio.loop = true;

}else{
ConIcon.SetActive (false);

audio.loop = false;

if(camDist < 128){
conFar = false;
once = false;
}

}
}
}
}

function ConnectionBroken(){
mainListener.enabled = false;
conListener.enabled = true;
ConScreen.SetActive (true);
conScreenAudio.Play();
yield WaitForSeconds (31);
if(conFar){
WorldInformation.FPMode = false;
PlayerCamFollow.HoldCam = false;
Application.LoadLevel("PiriZerzek");
}else{
mainListener.enabled = true;
conListener.enabled = false;
ConScreen.SetActive (false);
}
}

function OnCollisionStay(col : Collision) {
if(col.gameObject.name.Contains("Wa"))
Force = 0.0005;
}