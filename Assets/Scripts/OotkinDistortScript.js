#pragma strict

var PhysCam : Rigidbody;
var Distort1 : GameObject;
var Distort2 : GameObject;
var Distort3 : GameObject;
var Distort4 : GameObject;
var DistortPoint : GameObject;

var StaticAudio : AudioSource;
var ShockAudio : AudioSource;
var SicknessAudio : AudioSource;

var OotkinBlotches : GameObject;
var OotkinSickness : GameObject;

static var ContactingOotkin : boolean;

static var TouchingOotkin : boolean;

var CanShock : boolean = true;

var CamDistortPower : float = 0;

var Ending : boolean;

InvokeRepeating("ResetTouch", 0.1, 0.7);

function Start () {
WorldInformation.IsOotkinSick = false;
ContactingOotkin = false;
TouchingOotkin = false;
}

function FixedUpdate () {

if(TouchingOotkin && Distort1.particleSystem.emissionRate > 500 && CanShock){

var TheThing = Instantiate(OotkinBlotches, DistortPoint.transform.position, DistortPoint.transform.rotation);
    TheThing.transform.parent = DistortPoint.transform;
    
if(WorldInformation.IsOotkinSick)
LoadPiriLocation.CallingAmbulance = true;

if(!WorldInformation.IsOotkinSick){
WorldInformation.IsOotkinSick = true;
var TheThing2 = Instantiate(OotkinSickness, DistortPoint.transform.position, DistortPoint.transform.rotation);
    TheThing2.transform.parent = DistortPoint.transform;
SicknessAudio.Play();
OotkinSick();
}
    
DistortPoint.particleSystem.emissionRate = 200;
CamDistortPower = 100;
ShockAudio.Play();
TouchingOotkin = false;
CanShock = false;
ResetShock();
}

if(CamDistortPower > 0){
PhysCam.AddTorque(transform.up * Random.Range (-CamDistortPower, CamDistortPower));
PhysCam.AddTorque(transform.right * Random.Range (-CamDistortPower, CamDistortPower));
PhysCam.AddTorque(transform.forward * Random.Range (-CamDistortPower, CamDistortPower));
PhysCam.freezeRotation = false;
}else{
PhysCam.freezeRotation = true;
}

DistortPoint.particleSystem.emissionRate -= 10;

if(ContactingOotkin){

if(StaticAudio.volume == 0)
StaticAudio.Play();

StaticAudio.volume += 0.005;

if(CamDistortPower < 0.005)
CamDistortPower += 0.000002;

if(Distort1.particleSystem.emissionRate < 1000)
Distort1.particleSystem.emissionRate += 1;

if(Distort2.particleSystem.emissionRate < 40){
Distort2.particleSystem.emissionRate += 0.5;
Distort3.particleSystem.emissionRate += 0.5;
Distort4.particleSystem.emissionRate += 0.5;
}
}


if(!ContactingOotkin){

StaticAudio.volume -= 0.005;

if(StaticAudio.volume == 0)
StaticAudio.Stop();

if(CamDistortPower > 0)
CamDistortPower -= 0.000003;

if(Distort1.particleSystem.emissionRate > 0)
Distort1.particleSystem.emissionRate -= 0.5;

if(Distort2.particleSystem.emissionRate > 0){
Distort2.particleSystem.emissionRate -= 1;
Distort3.particleSystem.emissionRate -= 1;
Distort4.particleSystem.emissionRate -= 1;
}
}

if(WorldInformation.IsOotkinSick){
if(!Ending){
if(SicknessAudio.volume < 0.5)
SicknessAudio.volume += 0.001;
}else{
SicknessAudio.volume -= 0.0002;
if(SicknessAudio.volume == 0)
SicknessAudio.Stop();
}
}

}

function ResetTouch () {
TouchingOotkin = false;
}

function ResetShock () {
yield WaitForSeconds (0.3);
CamDistortPower = 0.004;
yield WaitForSeconds (3);
CanShock = true;
}

function OotkinSick(){
Ending = false;
yield WaitForSeconds (120);
Ending = true;
}