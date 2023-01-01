
var isHome : boolean;

var GoingHome : boolean;

var ZoomedOut : boolean;

function OnMouseDown() {
if (isHome && !GoingHome) {
GoingHome = true;
ScreenFadeScript.FadeOut = true;
yield WaitForSeconds (1);
PlayerPrefs.SetFloat("Injured", 1);
PlayerPrefs.Save();
yield WaitForSeconds (1);
WorldInformation.FPMode = false;
PlayerCamFollow.HoldCam = false;
Application.LoadLevel("PiriZerzek");
}
if (!isHome && !GoingHome) {
if(ZoomedOut){
ZoomedOut = false;
MapCamZ.ZoomDist = -32;
audio.Play();
}else{
ZoomedOut = true;
MapCamZ.ZoomDist = -1000;
audio.Play();
}
}
}