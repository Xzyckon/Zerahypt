
var MaxTime : float = 0.3;

var AlterPitch : boolean;

var Alteration : float = 0.2;

var NoRandom : boolean;

function Start () {

var delayTime : float = Random.Range(0.1, MaxTime);

if(AlterPitch)
audio.pitch = audio.pitch += Random.Range(-Alteration, Alteration);

if(!NoRandom){
    audio.playOnAwake = true;
    
       audio.PlayDelayed(delayTime);
       
yield WaitForSeconds (MaxTime);

if(audio){
audio.playOnAwake = true;
audio.Play();
}

}
if(NoRandom){
       
yield WaitForSeconds (MaxTime);

if(audio){
audio.playOnAwake = true;
audio.Play();
}

}
}