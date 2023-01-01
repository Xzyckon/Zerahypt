
var IngameHUD : GameObject;
var Tutstart : Transform;
var Nopass : Transform;
var PlayerCamera : Transform;
var PhysCamScript : PlayerCamFollow;
var SWISH : Transform;
var ScreenFreezer : Transform;
var Titlemation : GameObject;
var OrbitAnimation : Transform;
var OrbitPoint : Transform;

var UpdateText : TextMesh;

var isStarting : boolean;

function Start () {
UpdateText.text = "Update " + WorldInformation.VersionID;
}

function FixedUpdate () {
transform.position = OrbitPoint.position;
transform.rotation = OrbitPoint.rotation;
}

function Update () {

if(Input.GetKeyDown(KeyCode.E) && !isStarting){
isStarting = true;
SWISH.audio.Play();
Titlemation.animation.Play();
Starting();
}
}

function Starting () {
ScreenFadeScript.FadeOut = true;
yield WaitForSeconds(3);
Application.LoadLevel("PiriZerzek");
}