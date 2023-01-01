
var AniObject : GameObject;
var ButtonObject : GameObject;
var OtherButtonObject1 : GameObject;
var OtherButtonObject2 : GameObject;
var OtherButtonObject3 : GameObject;
var OtherButtonObject4 : GameObject;
public var AniName : String;
private var entered : boolean;

var SettingsButton : boolean;
var MouseSensitivityButton : boolean;
var Sensitivity = 50;

var AudioVolumeButton : boolean;
var Volume : float = 1;

var MusicButton : boolean;

var TutorialButton : boolean;
var TutorialScript : StartTutorialScript;

var DamageCounterButton : boolean;
var IsDisable : boolean;

function Start () {
if(SettingsButton){

if(AudioVolumeButton)
if(WorldInformation.AudioVolume == Volume){

    ButtonObject.gameObject.SetActive (true);
    
    if(OtherButtonObject1.activeSelf == true)
    OtherButtonObject1.gameObject.SetActive (false);
    
    if(OtherButtonObject2.activeSelf == true)
    OtherButtonObject2.gameObject.SetActive (false);
    
    if(OtherButtonObject3.activeSelf == true)
    OtherButtonObject3.gameObject.SetActive (false);
    
    if(OtherButtonObject4.activeSelf == true)
    OtherButtonObject4.gameObject.SetActive (false);
    
}

if(MusicButton)
if(WorldInformation.MusicOff && IsDisable){

    ButtonObject.gameObject.SetActive (true);
    
    if(OtherButtonObject1.activeSelf == true)
    OtherButtonObject1.gameObject.SetActive (false);
    
}

if(MouseSensitivityButton){
if(WorldInformation.Sensitivity == Sensitivity){

    ButtonObject.gameObject.SetActive (true);
    
    if(OtherButtonObject1.activeSelf == true)
    OtherButtonObject1.gameObject.SetActive (false);
    
    if(OtherButtonObject2.activeSelf == true)
    OtherButtonObject2.gameObject.SetActive (false);
    
}
}

if(DamageCounterButton)
if(WorldInformation.DamageCounterOff && IsDisable){

    ButtonObject.gameObject.SetActive (true);
    
    if(OtherButtonObject1.activeSelf == true)
    OtherButtonObject1.gameObject.SetActive (false);
    
}

if(TutorialButton)
if(WorldInformation.TutorialOff && IsDisable){

    ButtonObject.gameObject.SetActive (true);
    
    if(OtherButtonObject1.activeSelf == true)
    OtherButtonObject1.gameObject.SetActive (false);
    
}

}
}

function Update () {
	if(entered && Input.GetMouseButtonDown(0)){
	if(!SettingsButton)
		AniObject.animation.Play(AniName);
		
    if(SettingsButton){
    
    if(ButtonObject.activeSelf == false){
    ButtonObject.gameObject.SetActive (true);
    if(MouseSensitivityButton){
    CameraScript.xSpeed = Sensitivity;
    CameraScript.ySpeed = Sensitivity;
    PlayerPrefs.SetInt("Sensitivity", Sensitivity);
    PlayerPrefs.Save();
    }
    
    if(AudioVolumeButton){
    ScreenFadeScript.ProgVol = Volume;
    AudioListener.volume = Volume;
    PlayerPrefs.SetFloat("Volume", Volume);
    PlayerPrefs.Save();
    }
    
    if(MusicButton){
    if(IsDisable){
    if(!WorldInformation.MusicOff){
    WorldInformation.MusicOff = true;
    PlayerPrefs.SetInt("Music", 0);
    PlayerPrefs.Save();
    }
    }else{
    if(WorldInformation.MusicOff){
    WorldInformation.MusicOff = false;
    PlayerPrefs.SetInt("Music", 1);
    PlayerPrefs.Save();
    }
    }
    }
    
    if(DamageCounterButton){
    if(IsDisable){
    if(!WorldInformation.DamageCounterOff){
    WorldInformation.DamageCounterOff = true;
    DamageCounter.instance.thisTransform.localPosition.x -= 2;
    PlayerPrefs.SetInt("Damage", 0);
    PlayerPrefs.Save();
    }
    }else{
    if(WorldInformation.DamageCounterOff){
    WorldInformation.DamageCounterOff = false;
    DamageCounter.instance.thisTransform.localPosition.x += 2;
    PlayerPrefs.SetInt("Damage", 1);
    PlayerPrefs.Save();
    }
    }
    }
    
    if(TutorialButton){
    if(IsDisable){
    WorldInformation.TutorialOff = true;
    PlayerPrefs.SetInt("Tutorial", 0);
    PlayerPrefs.Save();
    }else{
    WorldInformation.TutorialOff = false;
    TutorialScript.StartNow();
    PlayerPrefs.SetInt("Tutorial", 1);
    PlayerPrefs.Save();
    }
    }
    
    if(OtherButtonObject1.activeSelf == true)
    OtherButtonObject1.gameObject.SetActive (false);
    
    if(OtherButtonObject2)
    if(OtherButtonObject2.activeSelf == true)
    OtherButtonObject2.gameObject.SetActive (false);
    
    if(OtherButtonObject3)
    if(OtherButtonObject3.activeSelf == true)
    OtherButtonObject3.gameObject.SetActive (false);
    
    if(OtherButtonObject4)
    if(OtherButtonObject4.activeSelf == true)
    OtherButtonObject4.gameObject.SetActive (false);
    
    }

}
}
}

function OnMouseEnter () {
	entered = true;
}

function OnMouseExit () {
	entered = false;
}