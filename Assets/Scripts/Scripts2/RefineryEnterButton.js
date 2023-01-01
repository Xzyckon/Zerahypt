#pragma strict

var RefineryCam : GameObject;
var Cam : Camera;
var CamAL : AudioListener;
var RefineryRoom : GameObject;
//var RefineryGraphicsAnimationObject : GameObject;
//var RefineryGraphicsAnimationName : String = "Name";

function Update () {
	if(Input.GetKeyDown("e")){
	//RefineryGraphicsAnimationObject.audio.Play();
	Show();
}
}

function Show () {
if(RefineryCam.activeSelf == false){
    RefineryCam.gameObject.SetActive (true);
    Cam.enabled = false;
    CamAL.enabled = false;
    RefineryRoom.gameObject.SetActive (true);
    Screen.lockCursor = false;
    Screen.showCursor = true;
    } else {
    RefineryCam.gameObject.SetActive (false);
    Cam.enabled = true;
    CamAL.enabled = true;
    RefineryRoom.gameObject.SetActive (false);
    Screen.lockCursor = true;
    Screen.showCursor = false;
}
}