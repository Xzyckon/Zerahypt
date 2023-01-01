#pragma strict

var Amb1Vol : float = 1;
var Amb2Vol : float = 0;

var IsAmb1 : boolean;
var IsAmb2 : boolean;

function Start () {

}

function FixedUpdate () {
if(IsAmb1){
if(audio.volume > Amb1Vol)
audio.volume -= 0.002;

if(audio.volume < Amb1Vol)
audio.volume += 0.002;
}
if(IsAmb2){
if(audio.volume > Amb2Vol)
audio.volume -= 0.002;

if(audio.volume < Amb2Vol)
audio.volume += 0.002;
}
}