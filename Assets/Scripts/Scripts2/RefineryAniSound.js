#pragma strict

var Dump : AudioClip;
var Refine : AudioClip;
var Dispense : AudioClip;

static var IsDumping : boolean = false;
static var IsRefining : boolean = false;
static var IsDispensing : boolean = false;

function Update (){
if(IsDumping == true){
SoundDump();
IsDumping = false;
}
if(IsRefining == true){
SoundRefine();
IsRefining = false;
}
if(IsDispensing == true){
SoundDispense();
IsDispensing = false;
}
}

function SoundDump (){
audio.PlayOneShot(Dump);
}

function SoundRefine (){
audio.PlayOneShot(Refine);
}

function SoundDispense (){
audio.PlayOneShot(Dispense);
}