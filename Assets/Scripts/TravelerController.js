static var DirForce : float = 100;
var AngForce : float = 40;
var OriDirForce : float = 100;

var BoostTimer = 0;

var TargetAnimation1: GameObject;
var TargetAnimation2: GameObject;

var ModelSpawn : Transform;

var FX : ParticleSystem;

var TFMaedracanDesert : Transform;
var TFOyhuratIsland : Transform;
var TFKabriusEstrellite : Transform;
var TFPiriPlanet : Transform;
var TFAthnias : Transform;
var TFJaedenAgracoast : Transform;
var TFSunfrontPeninsula : Transform;
var TFAnodOutpost : Transform;
var TFDarkKeigan : Transform;
var TFAzecreas : Transform;
var TFDutvutan : Transform;

var MarkerGlow : Blinker;

var CanWarp : boolean;

var Warping : boolean;

var SpaceVessel : boolean;

var RunningF : boolean;
var RunningR : boolean;

var RunningA : boolean;
var RunningD : boolean;

InvokeRepeating("Counter", 1, 1);

function Start () {

if(DrivenVesselScript.instance.isWarpVessel)
CanWarp = true;

if(DrivenVesselScript.instance.LastScene == "PiriZerzek")
transform.position = TFPiriPlanet.position;
if(DrivenVesselScript.instance.LastScene == "AnodOutpost")
transform.position = TFAnodOutpost.position;
if(DrivenVesselScript.instance.LastScene == "DarkKeiganSanis")
transform.position = TFDarkKeigan.position;
if(DrivenVesselScript.instance.LastScene == "MaedracanDesert")
transform.position = TFMaedracanDesert.position;
if(DrivenVesselScript.instance.LastScene == "OyhuratIsland")
transform.position = TFOyhuratIsland.position;
if(DrivenVesselScript.instance.LastScene == "CentralAthnias")
transform.position = TFAthnias.position;
if(DrivenVesselScript.instance.LastScene == "JaedenAgracoast")
transform.position = TFJaedenAgracoast.position;
if(DrivenVesselScript.instance.LastScene == "SunfrontPeninsula")
transform.position = TFSunfrontPeninsula.position;
if(DrivenVesselScript.instance.LastScene == "KabriusEstrellite")
transform.position = TFKabriusEstrellite.position;
if(DrivenVesselScript.instance.LastScene == "OuterAzecreas")
transform.position = TFAzecreas.position;
if(DrivenVesselScript.instance.LastScene == "DutvutanOutpost1")
transform.position = TFDutvutan.position;

transform.position.y += 30;

if(DrivenVesselScript.instance.WhatToSpawn == "null"){
DirForce = 60;
OriDirForce = 60;
CanWarp = true;
SpaceVessel = true;
var Prefabionaise = Resources.Load("VesselModels/MVessel1337", GameObject) as GameObject;
var TheThing = Instantiate(Prefabionaise, ModelSpawn.position, ModelSpawn.rotation);
TheThing.transform.parent = ModelSpawn.parent;
TheThing.transform.localScale += Vector3(0.5, 0.5, 0.5);

}else{
DirForce = DrivenVesselScript.VesselTravelSpeed;
OriDirForce = DrivenVesselScript.VesselTravelSpeed;
var Prefabionaise2 = Resources.Load("VesselModels/M" + DrivenVesselScript.instance.WhatToSpawn, GameObject) as GameObject;
var TheThing2 = Instantiate(Prefabionaise2, ModelSpawn.position, ModelSpawn.rotation);
TheThing2.transform.parent = ModelSpawn.parent;
TheThing2.transform.localScale += Vector3(0.5, 0.5, 0.5);
}

yield WaitForSeconds (0.1);

WorldInformation.isTraveling = true;
}

function Update () {
if(!MapInfoDisplay.isShowingWindow){
if(Input.GetKeyDown("w"))
			RunningF = true;
if(Input.GetKeyUp("w"))
			RunningF = false;

if(Input.GetKeyDown("a"))
			RunningA = true;
if(Input.GetKeyUp("a"))
			RunningA = false;

if(Input.GetKeyDown("d"))
			RunningD = true;
if(Input.GetKeyUp("d"))
			RunningD = false;
}else{
RunningF = false;
RunningR = false;
RunningA = false;
RunningD = false;
rigidbody.velocity = Vector3.zero;
}
			
if(CanWarp){

if(BoostTimer == 0)
if(Input.GetKey(KeyCode.LeftShift) && !Warping)
if(Input.GetKey("w")){
Warping = true;
RunningF = true;
rigidbody.AddForce(-transform.up * 10000);
DirForce = 1000;
BoostTimer = 2;
audio.Play();
FX.enableEmission = true;
}
if(Input.GetKeyUp("w") || Input.GetKeyUp(KeyCode.LeftShift)){
DirForce = OriDirForce;
FX.enableEmission = false;
Warping = false;
}

}

if(!Warping){
Debug.DrawRay (transform.position + -transform.up * 20, -transform.forward * 40, Color.white);
if (!Physics.Raycast (transform.position + -transform.up * 20, -transform.forward, 40)){
     DirForce = 0;
     
     if(!CanWarp){
     TargetAnimation1.animation.Play("ScreenTextFade");
     }else{
     TargetAnimation2.animation.Play("ScreenTextFade");
     }
     
     }else{
     DirForce = OriDirForce;
     }
}

var hit : RaycastHit;

Debug.DrawRay (transform.position, -transform.forward * 500, Color.red);
if (Physics.Raycast (transform.position, -transform.forward, hit, 500)){
if (hit.collider.gameObject.GetComponent(MapMarkerClick) != null){
	hit.collider.gameObject.GetComponent(MapMarkerClick).Entered = true;
	if (hit.collider.gameObject.GetComponent(MapMarkerClick).HasMarker)
	MarkerGlow.IsActive = true;
	else
	MarkerGlow.IsActive = false;
	}else{
	MarkerGlow.IsActive = false;
	}
}else{
MarkerGlow.IsActive = false;
}

}

function FixedUpdate () {

		if(RunningF)
			rigidbody.AddForce(-transform.up * DirForce);

		if(RunningA)
			rigidbody.AddTorque(-transform.forward * AngForce);
			
		if(RunningD)
			rigidbody.AddTorque(transform.forward * AngForce);

}

function Counter () {

if(DrivenVesselScript.instance.WhatToSpawn == "Vessel1337"){
WorldInformation.DrivingZerzek = true;
}else{
WorldInformation.DrivingZerzek = false;
}

if(transform.eulerAngles.y > 45 && transform.eulerAngles.y < 135){
WorldInformation.FacingNorth = true;
WorldInformation.FacingSouth = false;
WorldInformation.FacingWest = false;
WorldInformation.FacingEast = false;
}
if(transform.eulerAngles.y > 135 && transform.eulerAngles.y < 225){
WorldInformation.FacingNorth = false;
WorldInformation.FacingSouth = false;
WorldInformation.FacingWest = false;
WorldInformation.FacingEast = true;
}
if(transform.eulerAngles.y > 225 && transform.eulerAngles.y < 315){
WorldInformation.FacingNorth = false;
WorldInformation.FacingSouth = true;
WorldInformation.FacingWest = false;
WorldInformation.FacingEast = false;
}
if(transform.eulerAngles.y > 315 || transform.eulerAngles.y < 45){
WorldInformation.FacingNorth = false;
WorldInformation.FacingSouth = false;
WorldInformation.FacingWest = true;
WorldInformation.FacingEast = false;
}

if(BoostTimer > 0)
BoostTimer -= 1;
}