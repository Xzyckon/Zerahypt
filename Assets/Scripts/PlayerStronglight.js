#pragma strict

static var Activated : boolean;

function Start () {

}

function Update () {
if(light.intensity < 1 && Activated)
light.intensity += 0.01;
if(light.intensity > 0 && !Activated)
light.intensity -= 0.01;
}