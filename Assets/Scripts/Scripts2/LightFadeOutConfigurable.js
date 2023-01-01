#pragma strict

var Step : float = 0.01;

function Start () {

}

function FixedUpdate () {

light.intensity -= Step;

}