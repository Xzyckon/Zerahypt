#pragma strict

static var FadeOut : boolean;

static var FadeIn : boolean = true;

static var BlackOut : boolean;

static var ProgVol : float = 1;

function Start () {
ProgVol = WorldInformation.AudioVolume;
AudioListener.volume = ProgVol;
FadeOut = false;
FadeIn = true;
yield WaitForSeconds (2);
FadeIn = false;
}

function FixedUpdate () {

if(BlackOut){
renderer.material.color.a = 1;
}else{
if(!FadeOut)
if(renderer.material.color.a > 0)
renderer.material.color.a -= 0.02;
}

if(FadeIn){
if(renderer.material.color.a > 0)
renderer.material.color.a -= 0.02;

if(AudioListener.volume < ProgVol)
AudioListener.volume += 0.01;
else
AudioListener.volume -= 0.01;

}
if(FadeOut){
AudioListener.volume -= 0.008;

if(renderer.material.color.a < 1)
renderer.material.color.a += 0.01;
}
}