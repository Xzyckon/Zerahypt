var damage : float;
var range : float;
var power : float = 100.0;
var penDamage : float;
var penRange : float;
var damageCode = 0;

var PlayerHit : boolean;

var PassKL : boolean;

var Constant : boolean;
var Frequency = 20;
private var FrequencyStat = 20;

var Penetrative : boolean;

var UseDamageCurve : boolean;
var DamageCurve : AnimationCurve = new AnimationCurve();

var ForceCurve : AnimationCurve = new AnimationCurve();
var PushCurve : AnimationCurve = new AnimationCurve();
var ForceAmount : float = 0;
var PushAmount : float = 0;
var UseForceCurve : boolean;

var Ejecta1 : GameObject;
var Ejecta1Amount = 0;
var Ejecta1XForce = 0;
var Ejecta1YForce = 0;
var Ejecta1ZForce = 0;

var Ejecta2 : GameObject;
var Ejecta2Amount = 0;
var Ejecta2XForce = 0;
var Ejecta2YForce = 0;
var Ejecta2ZForce = 0;

var Ejecta3 : GameObject;
var Ejecta3Amount = 0;
var Ejecta3XForce = 0;
var Ejecta3YForce = 0;
var Ejecta3ZForce = 0;

var EjectaPos : Transform;

var GetAttention : boolean;

var targetLayers : LayerMask;

var staticRot0 : Quaternion;
var hit0 : RaycastHit;
var TheCol0 : Transform;

var staticRot1 : Quaternion;
var hit1 : RaycastHit;
var TheCol1 : Transform;

var staticRot2 : Quaternion;
var hit2 : RaycastHit;
var TheCol2 : Transform;

var pD : float;

private var proceed: boolean;

function Start () {

if(Constant){

FrequencyStat = Frequency;

return;
}

if(Penetrative){
var hitCollidersP = Physics.OverlapSphere(transform.position + transform.forward * penRange, penRange);
		
for (var i2 = 0; i2 < hitCollidersP.Length; i2++) {
if (hitCollidersP[i2].gameObject.GetComponent("VehicleDamage") != null)
    hitCollidersP[i2].gameObject.GetComponent("VehicleDamage").DamageIn(penDamage, damageCode, 0, PlayerHit);
if (hitCollidersP[i2].gameObject.GetComponent("SubDamage") != null)
    hitCollidersP[i2].gameObject.GetComponent("SubDamage").DamageIn(penDamage, damageCode, PlayerHit);
if (hitCollidersP[i2].gameObject.GetComponent("ReactiveObject") != null)
    hitCollidersP[i2].gameObject.GetComponent("ReactiveObject").DamageIn(penDamage, damageCode);
}
}

if(GetAttention)
SlavuicNetwork.Attention = true;

if(PlayerHit){

if(WorldInformation.PiriExposed > 1)
DamageCode = 1;

if(!PassKL)
KabrianLaw.Amount2 += damage;

}
 
var cols : Collider[] = Physics.OverlapSphere(transform.position, range);
 
for ( c = 0; c < cols.length; c++) {
proceed = true;

if(UseDamageCurve){

if (cols[c].gameObject.GetComponent("VehicleDamage") != null){

staticRot0 = transform.rotation;

TheCol0 = cols[c].transform;

transform.LookAt(TheCol0);
transform.Translate(Vector3.back * 2);

if (Physics.Raycast (transform.position, transform.forward, hit0, 8000, targetLayers)){
if(hit0.transform == TheCol0){
//Debug.Log("IT DID " + TheCol0);
pD = hit0.distance;
}else{
//Debug.Log(hit0.transform);
//Debug.Log(TheCol0);
pD = Vector3.Distance(TheCol0.position, transform.position);
}
}else{
//Debug.Log("DidOOPS");
//Time.timeScale = 0;
//Debug.Break();
pD = 8000;
}

transform.Translate(Vector3.forward * 2);
transform.rotation = staticRot0;

var relativePoint1 = TheCol0.InverseTransformPoint(transform.position);

if(relativePoint1.y < 0){
cols[c].gameObject.GetComponent("VehicleDamage").DamageIn(damage * DamageCurve.Evaluate(pD), damageCode, 1, PlayerHit);
}else{
cols[c].gameObject.GetComponent("VehicleDamage").DamageIn(damage * DamageCurve.Evaluate(pD), damageCode, 2, PlayerHit);
}
}

if (cols[c].gameObject.GetComponent("SubDamage") != null){

staticRot1 = transform.rotation;

TheCol1 = cols[c].transform;

transform.LookAt(TheCol1);
transform.Translate(Vector3.back * 2);

if (Physics.Raycast (transform.position, transform.forward, hit1, 8000, targetLayers)){
if(hit1.transform == TheCol1){
pD = hit1.distance;
}else{
pD = Vector3.Distance(TheCol1.position, transform.position);
}
}else{
pD = 8000;
}

transform.Translate(Vector3.forward * 2);
transform.rotation = staticRot1;
cols[c].gameObject.GetComponent("SubDamage").DamageIn(damage * DamageCurve.Evaluate(pD), damageCode, PlayerHit);
}

if (cols[c].gameObject.GetComponent("ReactiveObject") != null){

staticRot2 = transform.rotation;

TheCol2 = cols[c].transform;

transform.LookAt(TheCol2);
transform.Translate(Vector3.back * 2);

//Debug.DrawRay (transform.position, transform.forward * 8000, Color.red);
if (Physics.Raycast (transform.position, transform.forward, hit2, 8000, targetLayers)){
if(hit2.transform == TheCol2){
pD = hit2.distance;
}else{
pD = Vector3.Distance(TheCol2.position, transform.position);
}
}else{
pD = 8000;
}

transform.Translate(Vector3.forward * 2);
transform.rotation = staticRot2;
cols[c].gameObject.GetComponent("ReactiveObject").DamageIn(damage * DamageCurve.Evaluate(pD), damageCode);
}

}else{
if (cols[c].gameObject.GetComponent("VehicleDamage") != null){
var relativePoint2 = cols[c].transform.InverseTransformPoint(transform.position);
if(relativePoint2.y < 0)
cols[c].gameObject.GetComponent("VehicleDamage").DamageIn(damage, damageCode, 1, PlayerHit);
else
cols[c].gameObject.GetComponent("VehicleDamage").DamageIn(damage, damageCode, 2, PlayerHit);
}
if (cols[c].gameObject.GetComponent("SubDamage") != null)
    cols[c].gameObject.GetComponent("SubDamage").DamageIn(damage, damageCode, PlayerHit);
if (cols[c].gameObject.GetComponent("ReactiveObject") != null)
    cols[c].gameObject.GetComponent("ReactiveObject").DamageIn(damage, damageCode);
}

if(power != 0){
  
  var zTag: String = cols[c].gameObject.tag;
  if(zTag.Contains("Player") || zTag.Contains("Ghosts") || zTag.Contains("Explosions") || zTag.Contains("Structure"))
   proceed = false;
   
  if(proceed){
   if (cols[c].attachedRigidbody && cols[c].attachedRigidbody != rigidbody) {
   
    var offset : Vector3 = (transform.position - cols[c].transform.position);
    
    if(!UseForceCurve){
    var mag: float = offset.magnitude;
    if(Vector3.Distance(cols[c].transform.position, transform.position) > 1)
    cols[c].attachedRigidbody.AddForce(offset/mag/mag * power);
    if(Vector3.Distance(cols[c].transform.position, transform.position) < 1)
    cols[c].attachedRigidbody.AddForce(offset * power * 0.5);
    }else{
    ForceAmount = ForceCurve.Evaluate(Vector3.Distance(cols[c].transform.position, transform.position));
    PushAmount = PushCurve.Evaluate(Vector3.Distance(cols[c].transform.position, transform.position));
    cols[c].attachedRigidbody.AddForce(offset * -ForceAmount);
    cols[c].attachedRigidbody.AddForce(offset * -PushAmount, ForceMode.Acceleration);
    }
    
   }
  }
 }
 }
 
if(!name.Contains ("TFC2"))
if(WorldInformation.instance.AreaKabrian == true){
AgrianNetwork.instance.PriorityWaypoint.transform.position = transform.position;
AgrianNetwork.instance.AlertTime = 120;
}
}

function FixedUpdate () {
if(Ejecta1Amount > 0){
var E1 = Instantiate(Ejecta1, EjectaPos.position, EjectaPos.rotation);
var E1RB = E1.rigidbody;
var E1TF = E1.transform;
E1RB.AddForce(E1TF.right * Random.Range (-Ejecta1XForce, Ejecta1XForce));
E1RB.AddForce(E1TF.up * Random.Range (-Ejecta1YForce, Ejecta1YForce));
E1RB.AddForce(E1TF.forward * Random.Range (Ejecta1ZForce * 0.3, Ejecta1ZForce));
E1RB.AddTorque(E1TF.up * Random.Range (-30, 30));
E1RB.AddTorque(E1TF.right * Random.Range (-30, 30));
E1RB.AddTorque(E1TF.forward * Random.Range (-30, 30));
Ejecta1Amount -= 1;
}
if(Ejecta2Amount > 0){
var E2 = Instantiate(Ejecta2, EjectaPos.position, EjectaPos.rotation);
var E2RB = E2.rigidbody;
var E2TF = E2.transform;
E2RB.AddForce(E2TF.right * Random.Range (-Ejecta2XForce, Ejecta2XForce));
E2RB.AddForce(E2TF.up * Random.Range (-Ejecta2YForce, Ejecta2YForce));
E2RB.AddForce(E2TF.forward * Random.Range (Ejecta2ZForce * 0.3, Ejecta2ZForce));
E2RB.AddTorque(E2TF.up * Random.Range (-30, 30));
E2RB.AddTorque(E2TF.right * Random.Range (-30, 30));
E2RB.AddTorque(E2TF.forward * Random.Range (-30, 30));
Ejecta2Amount -= 1;
}
if(Ejecta3Amount > 0){
var E3 = Instantiate(Ejecta3, EjectaPos.position, EjectaPos.rotation);
var E3RB = E3.rigidbody;
var E3TF = E3.transform;
E3RB.AddForce(E3TF.right * Random.Range (-Ejecta3XForce, Ejecta3XForce));
E3RB.AddForce(E3TF.up * Random.Range (-Ejecta3YForce, Ejecta3YForce));
E3RB.AddForce(E3TF.forward * Random.Range (Ejecta3ZForce * 0.3, Ejecta3ZForce));
E3RB.AddTorque(E3TF.up * Random.Range (-30, 30));
E3RB.AddTorque(E3TF.right * Random.Range (-30, 30));
E3RB.AddTorque(E3TF.forward * Random.Range (-30, 30));
Ejecta3Amount -= 1;
}

if(Constant){

if(Frequency > 0){
Frequency -= 1;
}else{
Frequency = FrequencyStat;
Rep();
}

}

}

function Rep () {

var colsR : Collider[] = Physics.OverlapSphere(transform.position, range);
 
for ( c = 0; c < colsR.length; c++) {

if (colsR[c].gameObject.GetComponent("VehicleDamage") != null){
var relativePointR = colsR[c].transform.InverseTransformPoint(transform.position);
if(relativePointR.y < 0)
colsR[c].gameObject.GetComponent("VehicleDamage").DamageIn(damage, damageCode, 1, PlayerHit);
else
colsR[c].gameObject.GetComponent("VehicleDamage").DamageIn(damage, damageCode, 2, PlayerHit);
}
if (colsR[c].gameObject.GetComponent("SubDamage") != null)
    colsR[c].gameObject.GetComponent("SubDamage").DamageIn(damage, damageCode, PlayerHit);
if (colsR[c].gameObject.GetComponent("ReactiveObject") != null)
    colsR[c].gameObject.GetComponent("ReactiveObject").DamageIn(damage, damageCode);

}

}