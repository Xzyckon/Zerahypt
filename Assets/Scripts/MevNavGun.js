var Fire1 : GameObject;
var Muzzle : Transform;

var targetLayers : LayerMask;

var Obscured : boolean;

var Pausing : boolean;
var LineOfFire : boolean;

var MaxShotSuccession = 5;
var GunCooldown = 2;
var UseCooldown : boolean;
var UseTrace : boolean;
var Shots = 0;

function Fire () {
if(!Pausing){
if(LineOfFire){
Instantiate(Fire1, Muzzle.position, Muzzle.rotation);
Shots += 1;
Pause();
}
}
}

function Pause () {
if(Shots > MaxShotSuccession && UseCooldown){
Pausing = true;
yield WaitForSeconds (GunCooldown);
Pausing = false;
Shots = 0;
}
}

function Update () {

LineOfFire = false;

var hit : RaycastHit;

if (Physics.Raycast (transform.position + transform.forward * 0.1, transform.forward, hit, 1000, targetLayers)) {

if (hit.collider != null && hit.collider.name.Contains("T7Obscure"))
Obscured = true;
else
Obscured = false;

if(hit.collider.name.Contains ("TC7"))
return;

if(!UseTrace){
 
if(hit.collider.name.Contains ("TC"))
if (Obscured == false)
LineOfFire = true;
     
}else{

if(hit.collider.name.Contains ("TLead") || hit.collider.name.Contains ("TC"))
if (Obscured == false)
LineOfFire = true;
     
}
     
}else{
LineOfFire = false;
}
}