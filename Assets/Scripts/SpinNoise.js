var Stopped : boolean;

var Vessel: GameObject;

var UseOtherV : boolean;
var UseOtherV2 : boolean;

var AccurateVolume : boolean;

var UseSpecificAxis : boolean;
var UseX : boolean;

var OtherV2: GameObject;
var OtherV3: GameObject;
var OtherV4: GameObject;

var audioClipSpeed = 20.0;
var MaxPitch : float = 1.0;
var MinPitch : float = 0.0;

var curve : AnimationCurve = new AnimationCurve();
var VolumeAmount : float = 0;
var VolumeMod : float = 1.0;

var AngVel : float = 0;

var AngVel1 : float = 0;
var AngVel2 : float = 0;

function Start () {
Stopped = true;
}

function FixedUpdate () {

if(Vessel){

if(!UseOtherV && !UseOtherV2 && UseSpecificAxis){
if(Vessel.rigidbody.angularVelocity.magnitude > 0.1) {

var localV = Vessel.transform.InverseTransformDirection(Vessel.rigidbody.angularVelocity);

if(!UseX)
AngVel = Mathf.Abs(localV.y);
else
AngVel = Mathf.Abs(localV.x);

var p = AngVel / audioClipSpeed;

audio.pitch = Mathf.Clamp( p * 1 , MinPitch, MaxPitch);

VolumeAmount = curve.Evaluate(p) * VolumeMod;

audio.volume = VolumeAmount;

if(audio.volume < 0.05 && !AccurateVolume)
audio.volume = 0.04;

}

if(!Stopped)
if(audio.volume < 0.05)
audio.volume -= 0.005;

if(Stopped)
if(audio.volume > 0.001){
audio.Play();
Stopped = false;
}

if(!Stopped)
if(audio.volume == 0){
audio.Stop();
Stopped = true;
}
}

if(UseOtherV2 && UseSpecificAxis){
if(Vessel.rigidbody.angularVelocity.magnitude > 0.1 || OtherV2.rigidbody.angularVelocity.magnitude > 0.1) {

var localV1 = Vessel.transform.InverseTransformDirection(Vessel.rigidbody.angularVelocity);
             
var localV2 = OtherV2.transform.InverseTransformDirection(OtherV2.rigidbody.angularVelocity);

if(!UseX){
AngVel1 = Mathf.Abs(localV1.y);
AngVel2 = Mathf.Abs(localV2.y);
}else{
AngVel1 = Mathf.Abs(localV1.x);
AngVel2 = Mathf.Abs(localV2.x);
}

var AngVel3 = Mathf.Abs(AngVel1 + AngVel2);

var p4 = AngVel3 / audioClipSpeed;
audio.pitch = Mathf.Clamp( p4 * 1 , MinPitch, MaxPitch);

VolumeAmount = curve.Evaluate(p4) * VolumeMod;

audio.volume = VolumeAmount;

if(audio.volume < 0.05 && !AccurateVolume)
audio.volume = 0.04;

}
if(!Stopped)
if(audio.volume < 0.05)
audio.volume -= 0.005;

if(Stopped)
if(audio.volume > 0.001){
audio.Play();
Stopped = false;
}

if(!Stopped)
if(audio.volume == 0){
audio.Stop();
Stopped = true;
}
}

if(!UseOtherV && !UseOtherV2 && !UseSpecificAxis){
if(Vessel.rigidbody.angularVelocity.magnitude > 0.1) {

var p1 = Vessel.rigidbody.angularVelocity.magnitude / audioClipSpeed;
audio.pitch = Mathf.Clamp( p1 * 1 , MinPitch, MaxPitch);

VolumeAmount = curve.Evaluate(p1) * VolumeMod;

audio.volume = VolumeAmount;

if(audio.volume < 0.05 && !AccurateVolume)
audio.volume = 0.04;

}
if(!Stopped)
if(audio.volume < 0.05)
audio.volume -= 0.005;

if(Stopped)
if(audio.volume > 0.001){
audio.Play();
Stopped = false;
}

if(!Stopped)
if(audio.volume == 0){
audio.Stop();
Stopped = true;
}
}

if(UseOtherV){
if(OtherV2 && OtherV3 && OtherV4){
if(Vessel.rigidbody.angularVelocity.magnitude > 0.1) {

var OV = Vessel.rigidbody.angularVelocity.magnitude +
         OtherV2.rigidbody.angularVelocity.magnitude + 
         OtherV3.rigidbody.angularVelocity.magnitude + 
         OtherV4.rigidbody.angularVelocity.magnitude;

var p2 = OV / audioClipSpeed;
audio.pitch = Mathf.Clamp( p2 * 1 , MinPitch, MaxPitch);

VolumeAmount = curve.Evaluate(p2) * VolumeMod;

audio.volume = VolumeAmount;

}
if(!Stopped)
if(audio.volume < 0.05)
audio.volume -= 0.005;

if(Stopped)
if(audio.volume > 0.001){
audio.Play();
Stopped = false;
}

if(!Stopped)
if(audio.volume == 0){
audio.Stop();
Stopped = true;
}
}
}

if(UseOtherV2 && !UseSpecificAxis){
if(Vessel.rigidbody.angularVelocity.magnitude > 0.1) {

var OV2 = Vessel.rigidbody.angularVelocity.magnitude +
         OtherV2.rigidbody.angularVelocity.magnitude;

var p3 = OV2 / audioClipSpeed;
audio.pitch = Mathf.Clamp( p3 * 1 , MinPitch, MaxPitch);

VolumeAmount = curve.Evaluate(p3) * VolumeMod;

audio.volume = VolumeAmount;

}
if(!Stopped)
if(audio.volume < 0.05)
audio.volume -= 0.005;

if(Stopped)
if(audio.volume > 0.001){
audio.Play();
Stopped = false;
}

if(!Stopped)
if(audio.volume == 0){
audio.Stop();
Stopped = true;
}
}

}
}