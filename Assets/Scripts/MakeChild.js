#pragma strict

function Start () {
var Diapos = GameObject.Find("DialoguePos");
transform.parent = Diapos.transform;
}