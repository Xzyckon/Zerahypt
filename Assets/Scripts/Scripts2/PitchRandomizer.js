#pragma strict

var MaxPitch : float = 0.05;

function Start () {
audio.pitch = audio.pitch += Random.Range(0, MaxPitch);
}