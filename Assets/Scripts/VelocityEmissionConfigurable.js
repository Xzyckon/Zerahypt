// speed at which audio clip plays at its original pitch:
var TargetVelocity : Transform;
var EmitSpeed = 60.0;
var MaxEmissionaise : float = 200;
var MinEmissionaise : float = 0;

var CanFade : boolean;
var FadeSpeed  : float = 2;

var TwoDirectional : boolean;

var Reversed : boolean;

var YAxis : boolean;

var Broken : boolean;

private var pSystem : ParticleSystem;
private var thisTransform : Transform;
private var thisRB : Rigidbody;

function Start() {
thisTransform = transform;
thisRB = TargetVelocity.rigidbody;
pSystem = particleSystem;
}
 
function FixedUpdate() {

    if(!Broken && TargetVelocity != null){
    if(!YAxis){
    if(!Reversed){
    var localV = thisTransform.InverseTransformDirection(thisRB.velocity);
    var p = -localV.z / EmitSpeed;
    var r = localV.z / EmitSpeed;
    
    if(!TwoDirectional){
    if(CanFade)
    pSystem.startColor.a = p * FadeSpeed;
    pSystem.emissionRate = Mathf.Clamp( p, MinEmissionaise, MaxEmissionaise);
    }else{
    if(CanFade)
    pSystem.startColor.a = p * FadeSpeed;
    pSystem.emissionRate = Mathf.Clamp( p, MinEmissionaise, MaxEmissionaise) + 
                                  Mathf.Clamp( r, MinEmissionaise, MaxEmissionaise);
    }
    }else{
    var localV1 = thisTransform.InverseTransformDirection(thisRB.velocity);
    var p1 = localV.z / EmitSpeed;
    var r1 = -localV.z / EmitSpeed;
    
    if(!TwoDirectional){
    if(CanFade)
    pSystem.startColor.a = p * FadeSpeed;
    pSystem.emissionRate = Mathf.Clamp( p1, MinEmissionaise, MaxEmissionaise);
    }else{
    if(CanFade)
    pSystem.startColor.a = p * FadeSpeed;
    pSystem.emissionRate = Mathf.Clamp( p1, MinEmissionaise, MaxEmissionaise) + 
                                  Mathf.Clamp( r1, MinEmissionaise, MaxEmissionaise);
    }
    }
    }else{
    var localV2 = thisTransform.InverseTransformDirection(thisRB.velocity);
    var p2 = -localV2.y / EmitSpeed;
    var r2 = localV2.y / EmitSpeed;
    
    if(!TwoDirectional){
    if(CanFade)
    pSystem.startColor.a = p * FadeSpeed;
    pSystem.emissionRate = Mathf.Clamp( p2, MinEmissionaise, MaxEmissionaise);
    }else{
    if(CanFade)
    pSystem.startColor.a = p * FadeSpeed;
    pSystem.emissionRate = Mathf.Clamp( p2, MinEmissionaise, MaxEmissionaise) + 
                                  Mathf.Clamp( r2, MinEmissionaise, MaxEmissionaise);
    }
    }
    
    }
    if(Broken || TargetVelocity == null)
    pSystem.emissionRate -= 1;
}