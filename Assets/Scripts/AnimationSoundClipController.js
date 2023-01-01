#pragma strict

var Sound1 : AudioClip;
var Sound2 : AudioClip;
var Sound3 : AudioClip;

function PlayS1 () {
audio.clip = Sound1;
audio.Play();
}

function PlayS2 () {
audio.clip = Sound2;
audio.Play();
}

function PlayS3 () {
audio.clip = Sound3;
audio.Play();
}