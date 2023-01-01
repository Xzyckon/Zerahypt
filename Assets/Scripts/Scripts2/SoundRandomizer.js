#pragma strict

var soundsies : AudioClip[];

var Lengthrandomizer : float = 6.0;

var MinDelay : float = 6.0;
var MaxDelay : float = 12.0;

var lastTime : float;

function Start (){
    lastTime = Time.time + 2;
}

function PlayClipAndChange(){
    audio.clip = soundsies[Random.Range(0, soundsies.Length)];
    audio.Play();
}

function Update () {
 if(Time.time - lastTime > Lengthrandomizer) {
  Lengthrandomizer = MinDelay + Random.value * (MaxDelay-MinDelay);
  PlayClipAndChange();
  lastTime = Time.time;
 }
}