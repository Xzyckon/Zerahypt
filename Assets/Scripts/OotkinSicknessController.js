#pragma strict

var Blotches1 : GameObject;
var Blotches2 : GameObject;

var Ending : boolean;

function Start () {
yield WaitForSeconds (120);
Ending = true;
yield WaitForSeconds (60);
WorldInformation.IsOotkinSick = false;
Destroy(gameObject);
}

function FixedUpdate () {

if(Ending){
Blotches1.particleSystem.emissionRate -= 0.01;
Blotches2.particleSystem.emissionRate -= 0.01;
}

}