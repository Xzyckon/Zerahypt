#pragma strict

var CountdownTime : float = 1;

var Gameobject : GameObject;

function Start () {
Countdown();
}

function Countdown() {
yield WaitForSeconds (CountdownTime);
Gameobject.gameObject.SetActive (true);
}