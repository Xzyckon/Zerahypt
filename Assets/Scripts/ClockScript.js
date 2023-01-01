
var handFront : Transform;
var handBack : Transform;

var noise : AudioSource;
var bellNoise : AudioSource;

var minuteBell: AudioClip;
var halfhourBell: AudioClip;
var hourBell: AudioClip;
var halfraonBell: AudioClip;

var clockTime = 0;

var prod : float;
var prod2 : float;

var Ticked : boolean;

var Belled : boolean;

function Start () {
yield WaitForSeconds (1);
audio.Play();
}

function FixedUpdate () {

//65536 times 0.01098633

if(WorldInformation.terrahyptTime > clockTime){
clockTime = WorldInformation.terrahyptTime;
if(noise.time > 0.1)
audio.Play();
}

prod = WorldInformation.terrahyptTime;

prod2 = prod * 0.005493165;

handFront.localEulerAngles.y = -prod2;
handBack.localEulerAngles.y = prod2;

if(WorldInformation.halfraonBell && !Belled){
Belled = true;
bellNoise.PlayOneShot(halfraonBell);
BellReset();
return;
}
if(WorldInformation.halfhourBell && !Belled){
Belled = true;
bellNoise.PlayOneShot(halfhourBell);
BellReset();
return;
}
if(WorldInformation.hourBell && !Belled){
Belled = true;
bellNoise.PlayOneShot(hourBell);
BellReset();
return;
}
if(WorldInformation.minuteBell && !Belled){
Belled = true;
bellNoise.PlayOneShot(minuteBell);
BellReset();
return;
}
}

function BellReset (){
yield WaitForSeconds (8);
Belled = false;
}