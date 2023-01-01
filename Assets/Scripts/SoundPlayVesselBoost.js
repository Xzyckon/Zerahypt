var SoundStart : AudioClip;
var SoundEnd : AudioClip;
var BoomEffectStart : GameObject;
var BoomEffectEnd : GameObject;
var Vessel : GameObject;

var SpeedThreshold = 300;

var Fast : boolean;

function LateUpdate () {
	if (Vessel.rigidbody.velocity.magnitude > SpeedThreshold){
	if(!Fast){
	Fast = true;
	audio.PlayOneShot(SoundStart);
	Instantiate(BoomEffectStart, transform.position + Vector3(0,0,0), transform.rotation);
	}
	} else {
	if(Fast){
	Fast = false;
	audio.PlayOneShot(SoundEnd);
	Instantiate(BoomEffectEnd, transform.position + Vector3(0,0,0), transform.rotation);
}
}
}