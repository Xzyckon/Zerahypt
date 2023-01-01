var Vehicle : GameObject;

var MagnitudeValue : float = 30;

var curve : AnimationCurve = new AnimationCurve();
var VolumeAmount : float = 0;
var VolumeMod : float = 1.0;

 
function Update() {
if(Vehicle.rigidbody.velocity.magnitude > 0.1 && PlayerInformation.playerCar.Contains(Vehicle.name)) {

    var p = Vehicle.rigidbody.velocity.magnitude / MagnitudeValue;
    particleSystem.emissionRate = VolumeAmount;
    VolumeAmount = curve.Evaluate(p) * VolumeMod;
    
}
}