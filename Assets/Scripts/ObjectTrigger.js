
var AI1 : AgrianCarrierAI;
var AI2 : AgrianTowerAI;

var audio1 : AudioSource;
var SoundPoint : Transform;
var SoundTrigger : boolean;
var SoundTriggerBrake : boolean;
var STOnce : boolean;
var STBOnce : boolean;

function Start () {

}

function OnTriggerEnter (other : Collider) {
if(!SoundTrigger && AI1){
if(other.gameObject.rigidbody)
if(other.gameObject.rigidbody.mass > 0.1)
AI1.Brake = true;
}

if(!SoundTrigger && AI2){
if(other.gameObject.rigidbody)
if(other.gameObject.rigidbody.mass > 0.1)
if(!AI2.Gonnatow && !AI2.Gonnaput)
AI2.Brake = true;
}

if(SoundTriggerBrake && !STBOnce){
STBOnce = true;
audio1.Play();
}

if(SoundTrigger && !STOnce)
if(other.name.Contains("TC1")){
STOnce = true;
audio1.Play();

if(Vector3.Distance(other.transform.position, SoundPoint.position) > 50)
audio1.volume = 1;
if(Vector3.Distance(other.transform.position, SoundPoint.position) > 100)
audio1.volume = 0.8;
if(Vector3.Distance(other.transform.position, SoundPoint.position) > 150)
audio1.volume = 0.6;
if(Vector3.Distance(other.transform.position, SoundPoint.position) > 200)
audio1.volume = 0.4;
if(Vector3.Distance(other.transform.position, SoundPoint.position) > 300)
audio1.volume = 0.3;
if(Vector3.Distance(other.transform.position, SoundPoint.position) > 400)
audio1.volume = 0.2;
if(Vector3.Distance(other.transform.position, SoundPoint.position) > 600)
audio1.volume = 0.1;
}
}