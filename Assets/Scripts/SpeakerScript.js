#pragma strict

var AudioComponent : AudioSource;

var IdleMusic1: AudioClip;
var IdleMusic2: AudioClip;

var BellIn: AudioClip;
var BelledIn : boolean;
var BellOut: AudioClip;
var BelledOut : boolean;

var IsAnnouncing : boolean;

var Announcement1: AudioClip;
var Announcement1Time = 10;
var Announcement2: AudioClip;
var Announcement2Time = 60;
var Announcement3: AudioClip;
var Announcement3Time = 90;

var FadingIn : boolean;
var FadingOut : boolean;

InvokeRepeating("Ticker", 1, 1);

function Start () {

Announcement1Time -= Random.Range(-10, 10);
Announcement2Time -= Random.Range(-10, 10);
Announcement3Time -= Random.Range(-10, 10);

yield WaitForSeconds (0.3);

AudioComponent.clip = IdleMusic1;
AudioComponent.Play();

}

function FixedUpdate () {

if(!FadingOut)
if(AudioComponent.volume < 1)
AudioComponent.volume += 0.05;


if(Announcement1Time == 1){
if(!BelledIn){
FadingOut = true;
AudioComponent.volume -= 0.05;
if(AudioComponent.volume == 0){
AudioComponent.loop = false;
AudioComponent.volume = 1;
AudioComponent.clip = BellIn;
AudioComponent.Play();
BelledIn = true;
}
}

if(BelledIn && !IsAnnouncing)
if(!AudioComponent.isPlaying){
AudioComponent.clip = Announcement1;
AudioComponent.Play();
IsAnnouncing = true;
}

if(IsAnnouncing && !BelledOut)
if(!AudioComponent.isPlaying){
AudioComponent.clip = BellOut;
AudioComponent.Play();
BelledOut = true;
}

if(BelledOut)
if(!AudioComponent.isPlaying){
AudioComponent.clip = IdleMusic1;
AudioComponent.Play();
AudioComponent.loop = true;
AudioComponent.volume = 0;
Announcement1Time = 0;
IsAnnouncing = false;
BelledIn = false;
BelledOut = false;
FadingOut = false;
}

}







if(Announcement2Time == 1){
if(!BelledIn){
FadingOut = true;
AudioComponent.volume -= 0.05;
if(AudioComponent.volume == 0){
AudioComponent.loop = false;
AudioComponent.volume = 1;
AudioComponent.clip = BellIn;
AudioComponent.Play();
BelledIn = true;
}
}

if(BelledIn && !IsAnnouncing)
if(!AudioComponent.isPlaying){
AudioComponent.clip = Announcement2;
AudioComponent.Play();
IsAnnouncing = true;
}

if(IsAnnouncing && !BelledOut)
if(!AudioComponent.isPlaying){
AudioComponent.clip = BellOut;
AudioComponent.Play();
BelledOut = true;
}

if(BelledOut)
if(!AudioComponent.isPlaying){
AudioComponent.clip = IdleMusic1;
AudioComponent.Play();
AudioComponent.loop = true;
AudioComponent.volume = 0;
Announcement2Time = 0;
IsAnnouncing = false;
BelledIn = false;
BelledOut = false;
FadingOut = false;
}

}






if(Announcement3Time == 1){
if(!BelledIn){
FadingOut = true;
AudioComponent.volume -= 0.05;
if(AudioComponent.volume == 0){
AudioComponent.loop = false;
AudioComponent.volume = 1;
AudioComponent.clip = BellIn;
AudioComponent.Play();
BelledIn = true;
}
}

if(BelledIn && !IsAnnouncing)
if(!AudioComponent.isPlaying){
AudioComponent.clip = Announcement3;
AudioComponent.Play();
IsAnnouncing = true;
}

if(IsAnnouncing && !BelledOut)
if(!AudioComponent.isPlaying){
AudioComponent.clip = BellOut;
AudioComponent.Play();
BelledOut = true;
}

if(BelledOut)
if(!AudioComponent.isPlaying){
AudioComponent.clip = IdleMusic1;
AudioComponent.Play();
AudioComponent.loop = true;
AudioComponent.volume = 0;
Announcement3Time = 0;
IsAnnouncing = false;
BelledIn = false;
BelledOut = false;
FadingOut = false;
}

}

}

function Ticker () {
if(Announcement1Time > 1)
Announcement1Time -= 1;
if(Announcement2Time > 1)
Announcement2Time -= 1;
if(Announcement3Time > 1)
Announcement3Time -= 1;
}