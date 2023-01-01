// speed at which audio clip plays at its original pitch:
var TargetVelocity : Transform;
var EmitSpeed = 60.0;
var MaxLightionaise : float = 1;
var MinLightionaise : float = 0;
 
function Update() {
    var p = TargetVelocity.rigidbody.velocity.magnitude / EmitSpeed;
    light.intensity = Mathf.Clamp( p, MinLightionaise, MaxLightionaise);
}