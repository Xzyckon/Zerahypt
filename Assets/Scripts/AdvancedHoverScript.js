var Multiplier : float = 1;
var MainBody : GameObject;
var HoverForce : float = 1;
var MaxHoverForce : float = 90000;
var HoverDistance : float = 20;
var SpeedMultiplier : float = 1;

var RightingForce : float = 1;

var VSAscDescSpeed : float = 0.0005;
var VSAscDescSpeedTop : float = 0.1;

var IncreaseSpeed : float = 0.01;
var DecreaseSpeed : float = 0.01;
var MinMultiplier : float = 0;
var MaxMultiplier : float = 0;

var RD : float = 1;

var statInt : float = 0;

var thisDist : float = 0;
var virtualDistance : float = 0;

var GlobalOri : boolean;

var breaksOn : boolean;

var UseSpeed : boolean;

var SkipStab : boolean;

var SmoothStart : boolean;

var hovering : boolean;

var inside : boolean;

var curve : AnimationCurve = new AnimationCurve();

var targetLayers : LayerMask;

function Start () {
RD = 1;
if(breaksOn)
Multiplier = 0;
}

function hBool () {
var hitHB : RaycastHit;
if(hovering){
hovering = false;
}else{
hovering = true;
if (Physics.Raycast (MainBody.transform.position, Vector3.down, hitHB, HoverDistance, targetLayers))
virtualDistance = MainBody.transform.position.y - hitHB.distance;
else
virtualDistance = MainBody.transform.position.y - HoverDistance;
Multiplier = MinMultiplier;
}
}

function FixedUpdate () {

var localV = MainBody.transform.InverseTransformDirection(MainBody.rigidbody.velocity);

if(!SkipStab){
if(-localV.z > 0.1){
var RDa = 1 + Mathf.Abs(localV.z);
RD = Mathf.Clamp(RDa,0,2);
}else{
RD = 1;
}
}

var fwd = transform.TransformDirection (Vector3.back);
var hit : RaycastHit;

if(breaksOn){
if(Multiplier > 0)
Multiplier -= DecreaseSpeed;
if(SmoothStart)
if(Multiplier > MaxMultiplier)
Multiplier = MaxMultiplier;
}

if(!breaksOn){
if(Multiplier < 1)
Multiplier += IncreaseSpeed;
if(SmoothStart)
if(Multiplier < MinMultiplier)
Multiplier = MinMultiplier;
}

if(UseSpeed){
var SpeedModifier = MainBody.rigidbody.velocity.magnitude * SpeedMultiplier;
SpeedModifier = SpeedModifier + 1;
}

if(!UseSpeed)
SpeedModifier = 1;

if(!GlobalOri){
if(hovering){
thisDist = transform.position.y - virtualDistance;
HoverForce = curve.Evaluate(thisDist);

if(HoverForce > MaxHoverForce * 0.5)
HoverForce = MaxHoverForce * 0.5;

if(inside){
if(Input.GetKey(KeyCode.LeftControl)){
if(statInt < VSAscDescSpeedTop)
statInt += VSAscDescSpeed;
virtualDistance -= statInt;
}else{
if(!Input.GetKey(KeyCode.LeftShift))
statInt = 0;
}

if(Input.GetKey(KeyCode.LeftShift)){
if(statInt < VSAscDescSpeedTop)
statInt += VSAscDescSpeed;
virtualDistance += statInt;
}else{
if(!Input.GetKey(KeyCode.LeftControl))
statInt = 0;
}
}

MainBody.rigidbody.AddForceAtPosition(Vector3.up * HoverForce * Multiplier * SpeedModifier * RD, transform.position, ForceMode.Impulse);
}else{
if (Physics.Raycast (transform.position, fwd, hit, HoverDistance, targetLayers)) {
HoverForce = curve.Evaluate(hit.distance);

if(HoverForce > MaxHoverForce)
HoverForce = MaxHoverForce;

MainBody.rigidbody.AddForceAtPosition(Vector3.up * HoverForce * Multiplier * SpeedModifier * RD, transform.position, ForceMode.Impulse);
}else{
HoverForce = 0;
}
}
}else{
if(hovering){
thisDist = transform.position.y - virtualDistance;
HoverForce = curve.Evaluate(thisDist);

if(HoverForce > MaxHoverForce * 0.5)
HoverForce = MaxHoverForce * 0.5;

if(inside){
if(Input.GetKey(KeyCode.LeftControl)){
if(statInt < VSAscDescSpeedTop)
statInt += VSAscDescSpeed;
virtualDistance -= statInt;
}

if(Input.GetKey(KeyCode.LeftShift)){
if(statInt < VSAscDescSpeedTop)
statInt += VSAscDescSpeed;
virtualDistance += statInt;
}
}

MainBody.rigidbody.AddForceAtPosition(Vector3.up * HoverForce * Multiplier * SpeedModifier * RD, transform.position, ForceMode.Impulse);
}else{
if (Physics.Raycast (transform.position, Vector3.down, hit, HoverDistance, targetLayers)) {
HoverForce = curve.Evaluate(hit.distance);

if(HoverForce > MaxHoverForce)
HoverForce = MaxHoverForce;

var RelativePoint = transform.InverseTransformPoint(hit.point);

if(RelativePoint.z < 0)
MainBody.rigidbody.AddForceAtPosition(Vector3.up * HoverForce * Multiplier * SpeedModifier * RD, transform.position, ForceMode.Impulse);
else
MainBody.rigidbody.AddTorque(MainBody.transform.up * RightingForce);
}else{
HoverForce = 0;
}
}
}
}