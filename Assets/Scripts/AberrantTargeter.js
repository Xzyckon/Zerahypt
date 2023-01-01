var AberrantGun : NPCGun;
var Obscured : boolean;

var targetLayers : LayerMask;

InvokeRepeating("Nuller", 1, 1);

function Update () {

var hit : RaycastHit;

if(AberrantGun == null)
return;

if (Physics.Raycast (transform.position + transform.forward * 5, transform.forward, hit, 600, targetLayers)) {

if (hit.collider.tag == "TC4"){
     Obscured = true;
     AberrantGun.LineOfFire = false;
 }else{
     Obscured = false;
}
 
 if(hit.collider.name.Contains ("TC0")  || hit.collider.name.Contains ("TC1") 
                                        || hit.collider.name.Contains ("TC2") 
                                        || hit.collider.name.Contains ("TC3")
                                        || hit.collider.name.Contains ("TC5")
                                        || hit.collider.name.Contains ("TC6")
                                        || hit.collider.name.Contains ("TC7")
                                        || hit.collider.name.Contains ("TC8")
                                        || hit.collider.name.Contains ("TC9")){
 if (Obscured == false)
     AberrantGun.LineOfFire = true;
 }else{
     AberrantGun.LineOfFire = false;
 }
}
}

function Nuller () {
if(AberrantGun != null)
AberrantGun.LineOfFire = false;
}