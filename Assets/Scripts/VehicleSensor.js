
var Target : Transform;

var ExitSphere : Transform;

var DeactivateDist = 300;

var MidToGroundDist : float = 1.3;

var TailEndDist : float = 0;

var IsTrailer : boolean;

var HugeVessel : boolean;

var LargeVessel : boolean;

var Enabled : boolean;
var Once : boolean;

var HavePassed : boolean;

var Repositioned : boolean;

var Garaged : boolean;
var Garage : Transform;

var prefab_name : String = "prefab1";
var Vessel : GameObject;
var Model : GameObject;
var Col : GameObject;

var targetLayers : LayerMask;

InvokeRepeating("VesselUpdate", 4, 1);

function Start () {
Target = PlayerInformation.instance.Pirizuka;

if(prefab_name != "Vessel74")
if(prefab_name != "Vessel118")
if(prefab_name != "Vessel1337")
if(!Repositioned){
if(prefab_name == DrivenVesselScript.WhatToSpawn && DrivenVesselScript.LastScene == (Application.loadedLevelName)){

Destroy(gameObject);

}
if(prefab_name == DrivenVesselScript.WhatToSpawn && WorldInformation.isSwitchingScene){

Destroy(gameObject);

}
}

yield WaitForSeconds (1);

if(prefab_name == "Vessel1337")
WorldInformation.PiriZerzekPresent = true;

yield WaitForSeconds (1);

if(!Once){
Once = true;
if(Vessel != null)
Vessel.transform.parent = null;
}
}

function VesselUpdate () {

var hit : RaycastHit;

if(Vessel != null){
transform.position = Vessel.transform.position;
transform.rotation = Vessel.transform.rotation;

transform.Rotate(Vector3.right * -90);
transform.Rotate(Vector3.up * -90);
transform.Rotate(Vector3.forward * 180);
}else{
if(!HavePassed)
Destroy(gameObject);
}

if(!Enabled)
return;

if(Garaged){
if(Vector3.Distance(transform.position, Garage.position) < 256){
return;
}else{
Garaged = false;
}
}

if(Vessel != null){

if(!IsTrailer)
if(Vessel.GetComponent("MainVehicleController").Broken == true){
Destroy(gameObject);
}

}

if(Physics.Raycast(transform.position, Vector3.down, hit, 64, targetLayers))
if(hit.collider.name.Contains ("Pir"))
return;

if(!HavePassed)
if(Vector3.Distance(transform.position, Target.position) > DeactivateDist && Vessel.rigidbody.velocity.magnitude < 2){

HavePassed = true;
Model.gameObject.SetActive (true);

if(Col != null)
Col.gameObject.SetActive (true);

if(Vessel != null)
Destroy(Vessel);

}

if(HavePassed){

if(!HugeVessel){

if(!LargeVessel){
if(Vector3.Distance(transform.position, Target.position) > 2000)
Model.gameObject.SetActive (false);
else
Model.gameObject.SetActive (true);
}

if(LargeVessel){
if(Vector3.Distance(transform.position, Target.position) > 4000)
Model.gameObject.SetActive (false);
else
Model.gameObject.SetActive (true);
}
}

}

if(Vector3.Distance(transform.position, Target.position) < DeactivateDist){

if(HavePassed){

if(Col != null)
Col.gameObject.SetActive (false);

var Prefabionaise = Resources.Load("VesselPrefabs/" + prefab_name, GameObject) as GameObject;

var TheThing = Instantiate(Prefabionaise, transform.position + transform.up * 0.1, transform.rotation);
TheThing.transform.GetComponent(VehicleSensor).Repositioned = true;

Destroy(gameObject);
}
}

}