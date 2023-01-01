var trackWheel1TF : Transform;
var trackWheel1RB : Rigidbody;

var trackWheel2TF : Transform;
var trackWheel2RB : Rigidbody;

var subWheel1TF : Transform;
var subWheel2TF : Transform;

var sWheelSpinTweak : float;

var tracks : Transform[];

var trackBase : Transform;
var trackNumber : int;

var trackSpacing : float;

var trackOffset : float;

var tweak : float = 0.1;

var TSpeed : float;
var speedMod : float;
var TLocation : float;

var trackPosCurve : AnimationCurve = new AnimationCurve();
var trackAngCurve : AnimationCurve = new AnimationCurve();
var trackRadCurve : AnimationCurve = new AnimationCurve();

function Start () {
    trackOffset = 100f / trackNumber;
tracks = new Transform[trackNumber];
tracks[0] = trackBase;
    for (i = 1; i < trackNumber; i++){
        tracks[i] = Instantiate(trackBase);
        tracks[i].parent = this.transform;
        tracks[i].transform.position = this.transform.position;
    }
}

function FixedUpdate () {
    
    var TAv1 = trackWheel1TF.InverseTransformDirection(trackWheel1RB.angularVelocity);
    var TAv2 = trackWheel2TF.InverseTransformDirection(trackWheel2RB.angularVelocity);
    
    TAvD = TAv1.x + TAv2.x;
    
    TSpeed = TAvD * speedMod;

    for (i = 0; i < tracks.Length; i++){
        UpdateTrackPos(i);
    }
    
    subWheel1TF.Rotate(TSpeed * sWheelSpinTweak,0,0);
    subWheel2TF.Rotate(TSpeed * sWheelSpinTweak,0,0);
}








function UpdateTrackPos (trackID : int) {

TLocation += TSpeed;

var sTweak = TSpeed * tweak;

var trackOffset2 = trackOffset + sTweak;

var ThisOffset = trackOffset2 * trackID;

tracks[trackID].localEulerAngles.y = 0;
tracks[trackID].localEulerAngles.z = 0;

tracks[trackID].localPosition.z = trackPosCurve.Evaluate(TLocation + ThisOffset);
tracks[trackID].localEulerAngles.x = trackAngCurve.Evaluate(TLocation + ThisOffset);

if(TLocation > 100)
TLocation -= 100;
if(TLocation < 0)
TLocation += 100;

}









