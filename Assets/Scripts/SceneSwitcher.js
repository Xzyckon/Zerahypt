#pragma strict

var OverEffect : GameObject;
var PressEffect : GameObject;

var entered : boolean;
var once : boolean;

var DarkKeigan : GameObject;
var Jaeden : GameObject;
var Levia : GameObject;
var Anod : GameObject;
var Encydros : GameObject;
var Maedracan : GameObject;
var Oyhurat : GameObject;
var Athnias : GameObject;
var Azecreas : GameObject;
var Pirizuka : GameObject;
var Dutvutan : GameObject;

var TargetAnimation: GameObject;

function Update () {

if(entered){
OverEffect.SetActive (true);
if(Input.GetMouseButtonDown(0) && !once){
once = true;
SwitchScene ();
}
}else{
OverEffect.SetActive (false);
}

}

function SwitchScene () {

if(DarkKeigan.activeSelf == true)
if(WorldInformation.UsingBrightVessel){
TargetAnimation.animation.Play("ScreenTextFade");
once = false;
return;
}

PressEffect.SetActive (true);

yield WaitForSeconds(0.2);
WorldInformation.isSwitchingScene = true;
ScreenFadeScript.FadeOut = true;
yield WaitForSeconds(1);

if(WorldInformation.DrivingZerzek && Pirizuka.activeSelf == true)
WorldInformation.isSwitchingScene = false;

yield WaitForSeconds(2);

PlayerCamFollow.HoldCam = false;
        
if(DarkKeigan.activeSelf == true)
        Application.LoadLevel("DarkKeiganSanis");
if(Jaeden.activeSelf == true)
        Application.LoadLevel("JaedenAgracoast");
if(Levia.activeSelf == true)
        Application.LoadLevel("SunfrontPeninsula");
if(Anod.activeSelf == true)
        Application.LoadLevel("AnodOutpost");
if(Encydros.activeSelf == true)
        Application.LoadLevel("KabriusEstrellite");
if(Maedracan.activeSelf == true)
        Application.LoadLevel("MaedracanDesert");
if(Oyhurat.activeSelf == true)
        Application.LoadLevel("OyhuratIslands");
if(Athnias.activeSelf == true)
        Application.LoadLevel("CentralAthnias");
if(Azecreas.activeSelf == true)
        Application.LoadLevel("OuterAzecreas");
if(Dutvutan.activeSelf == true)
        Application.LoadLevel("DutvutanOutpost1");
if(Pirizuka.activeSelf == true)
        Application.LoadLevel("PiriZerzek");
        
}

function OnMouseEnter () {
	entered = true;
}

function OnMouseExit () {
	entered = false;
}