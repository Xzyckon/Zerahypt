var CallOk : AudioClip;
var CallBad : AudioClip;

var CeptoBarge : GameObject;
var Waypoint : GameObject;
var CalledRecently : boolean;

static var CallingCeptobarge : boolean;

function Start () {
CeptoBarge = GameObject.Find("CeptoBarge");
}

function Update () {
Debug.DrawRay(transform.position + transform.up * -10, transform.up * 13, Color.green);

if(Input.GetKey(KeyCode.LeftShift) || Input.GetKey(KeyCode.RightShift))
return;

if(CallingCeptobarge){

if (Physics.Raycast (transform.position + transform.up * -10, transform.up, 13)) {
audio.clip = CallBad;
audio.Play();
} else {

if(CalledRecently == false){
StopAllCoroutines();
Call();
}

}
CallingCeptobarge = false;
}
}

function Call () {
Waypoint.transform.position = transform.position;
audio.clip = CallOk;
audio.Play();
if(CeptoBarge)
CeptoBarge.GetComponent("CeptoBargeController").DoStuff();
}