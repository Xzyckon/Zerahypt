var Multiplier : float;

var toots : AudioClip[];

var BandF : boolean;
var Forth : boolean;

var MoveLengthrandomizer : float = 6.0;
var MoveMinDelay : float = 6.0;
var MoveMaxDelay : float = 12.0;

var TootLengthrandomizer : float = 6.0;
var TootMinDelay : float = 6.0;
var TootMaxDelay : float = 12.0;

function Start (){
StuffSpawner.TheNPC002N += 1;
lastTime = Time.time + 2;
}

function Move(){
rigidbody.AddForce(transform.up * Multiplier, ForceMode.Impulse);
}

function Toot(){
audio.clip = toots[Random.Range(0, toots.Length)];
audio.Play();
}

var moveLastTime : float;
var tootLastTime : float;

function Update () {
if(Time.time - moveLastTime > MoveLengthrandomizer) {
MoveLengthrandomizer = MoveMinDelay + Random.value * (MoveMaxDelay-MoveMinDelay);
Move();
moveLastTime = Time.time;
}

if(Time.time - tootLastTime > TootLengthrandomizer) {
TootLengthrandomizer = TootMinDelay + Random.value * (TootMaxDelay-TootMinDelay);
Toot();
tootLastTime = Time.time;
}
}


function Damage (){
StuffSpawner.TheNPC002N -= 1;
}