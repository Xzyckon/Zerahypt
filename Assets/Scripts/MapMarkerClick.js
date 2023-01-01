#pragma strict
var Click : AudioClip;
var Unclick : AudioClip;
var ViewDistance = 10;
var ZoomDistance = 670;
var MapCam : GameObject;
var ZoomCam : GameObject;

var NameOfArea : String;

var MarkerSelected : GameObject;
var InfoSelected : GameObject;
var VisiterSelected : GameObject;

var HasMarker : boolean;

var Entered : boolean;

var isActive : boolean;

function Start () {
Entered = false;
}

function Update () {

if(Entered && !isActive){
isActive = true;
					
if(HasMarker){

audio.clip = Click;
audio.Play();

MarkerSelected.SetActive (true);
VisiterSelected.SetActive (true);
InfoSelected.SetActive (true);
WorldInformation.Unset = false;
}else{
WorldInformation.Unset = true;
}

}

if(WorldInformation.Unset && HasMarker && isActive){
isActive = false;
Entered = false;

audio.clip = Unclick;
audio.Play();

MarkerSelected.SetActive (false);
VisiterSelected.SetActive (false);
				
InfoSelected.SetActive (false);

}

if(!WorldInformation.Unset && !HasMarker && isActive){
isActive = false;
Entered = false;

}

}