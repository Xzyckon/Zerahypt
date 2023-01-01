
var CamTarget : Transform;
var thisTransform : Transform;

var DistThreshold = 100;

var Particle1 : ParticleSystem;
var Particle2 : ParticleSystem;

var OriginalRate1 : float = 0;
var OriginalRate2 : float = 0;

var StartFromZero : boolean;

InvokeRepeating("Ticker", 0, 0.16);

function Start () {
thisTransform = transform;
CamTarget = PlayerInformation.instance.PhysCam;
if(Particle1)
OriginalRate1 = Particle1.startColor.a;
if(Particle2)
OriginalRate2 = Particle2.startColor.a;

if(Vector3.Distance(thisTransform.position, CamTarget.position) > DistThreshold){
if(Particle1)
Particle1.startColor.a = 0;
if(Particle2)
Particle2.startColor.a = 0;
}

if(StartFromZero){
if(Particle1)
Particle1.startColor.a = 0;
if(Particle2)
Particle2.startColor.a = 0;
}
}

function Ticker () {
if(Vector3.Distance(thisTransform.position, CamTarget.position) > DistThreshold){
if(Particle1)
Particle1.startColor.a -= 0.01;
if(Particle2)
Particle2.startColor.a -= 0.01;
}else{
if(Particle1)
if(Particle1.startColor.a < OriginalRate1)
Particle1.startColor.a += 0.01;
if(Particle2)
if(Particle2.startColor.a < OriginalRate2)
Particle2.startColor.a += 0.01;
}
}