#pragma strict

var target: Transform;

var Snoud: AudioSource;

var isDouble: boolean;
var otherPoint: Transform;

var Obscured: boolean;

var DebugPop : GameObject;

var usesTandemSoundManipulator : boolean;
var VelNoiseConf : VelocityNoiseConfigurable2;

var targetLayers : LayerMask;

var StaticVol : float = 0.5;

var volIncr : float = 0.02;

function Start () {
target = PlayerInformation.instance.PhysCam;

//if(!Snoud){
//var Load = Resources.Load("Objects/CornerStone", GameObject) as GameObject;
//Instantiate(Load, transform.position, transform.rotation);
//Debug.Log(gameObject.name + "HasSnoud");
//Debug.Break();
//}

if (Physics.Linecast (transform.position, target.position, targetLayers)){
Snoud.volume = 0;
}

if(audio){
Snoud = audio;
if(StaticVol < 0.1)
StaticVol = Snoud.volume;
}else{
if(Snoud){
if(StaticVol < 0.1)
StaticVol = Snoud.volume;
}else{
if(StaticVol < 0.1)
StaticVol = audio.volume;
}
}

}

function FixedUpdate () {

if(Snoud){

if(!isDouble){
if (Physics.Linecast (transform.position, target.position, targetLayers)){
Obscured = true;
}else{
Obscured = false;
}
}else{
if (Physics.Linecast (transform.position, target.position, targetLayers) && 
    Physics.Linecast (otherPoint.position, target.position, targetLayers))
Obscured = true;
else
Obscured = false;
}

if(!usesTandemSoundManipulator){
if(!Obscured)
if(Snoud.volume < StaticVol)
Snoud.volume += volIncr;
}else{
if(!Obscured)
if(Snoud.volume < VelNoiseConf.VolumeAmount)
Snoud.volume += volIncr;
}

if(Obscured)
Snoud.volume -= volIncr;

}else{
Destroy(this);
}
}