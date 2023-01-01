var UpdateAni : Animation;

var UpdateCam : Camera;

var Background1 : GameObject;
var Background2 : GameObject;

var AL1 : AudioListener;
var AL2 : AudioListener;

var ALFade : boolean;

var SFX1 : AudioSource;

var SFX2 : AudioSource;
var SFX2VolDown : boolean;

var SFX3 : AudioSource;

var FX1 : ParticleSystem;
var FX2 : ParticleSystem;

var uNum : int;

function Start () {
UpdateCam.enabled = false;
SFX2VolDown = false;
SFX2.volume = 1;
}

function Update () {

if(uNum > 0)
uNum -= 1;

if(Input.GetKeyDown("u")){

if(Input.GetKey("t")){

if(Background1.activeSelf){
UpdateCam.enabled = true;
Background1.SetActive(false);
Background2.SetActive(true);
}else{
UpdateCam.enabled = false;
Background1.SetActive(true);
Background2.SetActive(false);
}

}

if(uNum > 1){
UpdateAni.Play();
UpdateCam.enabled = true;
AL1.enabled = false;
AL2.enabled = true;
SFX2VolDown = false;
SFX2.volume = 1;
}
uNum = 10;
}

if(SFX2VolDown){
if(SFX2.volume > 0.1)
SFX2.volume -= 0.1;
else
SFX2.volume -= 0.01;
}

}

function SFX1Start () {
SFX1.Play();
}

function SFX2Start () {
SFX2.Play();
}

function SFX2Cutoff () {
SFX2VolDown = true;
}

function SFX3Start () {
SFX3.Play();
}

function FX1Start () {
FX1.Play();
}

function FX2Start () {
FX2.Play();
}

function ALSwitch () {
AL2.enabled = false;
AL1.enabled = true;
}

function Camdisable () {
UpdateCam.enabled = false;
SFX2VolDown = false;
}