#pragma strict

var soundsies : AudioClip[];

var Lengthrandomizer: float = 6.0;

var Switchoff : boolean = false;
 
function Start(){
    InvokeRepeating("PlayClipAndChange",1.0,Lengthrandomizer);
}

function PlayClipAndChange(){
if(Switchoff == false){
    audio.clip = soundsies[Random.Range(0, soundsies.Length)];
    audio.Play();
}
}

function Update () {
if(Switchoff == false){
Lengthrandomizer = 1.0 + 5.0*Random.value;
ActivateDestabilize();
}
}

function ActivateDestabilize () {
    if(null){
    Switchoff = true;
    audio.Stop();
    }
}