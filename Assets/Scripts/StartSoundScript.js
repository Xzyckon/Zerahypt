#pragma strict

var FadeOut : boolean;

var StartScene : boolean;

var EndVolume : float = 0.5;

var VolumeInSpeed : float = 0.002;
var VolumeOutSpeed : float = 0.002;

function Start () {

if(!StartScene){
if(WorldInformation.MusicOff){
audio.volume = 0;
FadeOut = true;
}
}else{
AudioListener.volume = 1;
yield WaitForSeconds (1);
audio.Play();
}

}

function Update () {
if(Input.GetKey(KeyCode.E) && StartScene){
FadeOut = true;
}
}

function FixedUpdate () {
if(!FadeOut && audio.volume < EndVolume)
audio.volume += VolumeInSpeed;
if(FadeOut && audio.volume > 0)
audio.volume -= VolumeOutSpeed;
}