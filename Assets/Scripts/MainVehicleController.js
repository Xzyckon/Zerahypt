#pragma strict
#pragma implicit
#pragma downcast

var Pirizuka : GameObject;

var TravelSpeed = 40;
var SpawnDist : float = 1.5;

var COMx : float = 0;
var COMy : float = 0;
var COMz : float = 0;

var vehicleLevel = 0;

var ThisVehiclesID : String = "Null";

var ThisVehiclesTC : String = "null";

var hasHorn : boolean;
var horn : AudioSource;

var EngineFXGO : GameObject;

var HasGarage : boolean;
var GaragePoint : Transform;
var GarageLight : GameObject;

var CeptoPoint : Transform;

var Drone : GameObject;
var DronePoint1 : Transform;
var DronePoint2 : Transform;
var DroneRot : Transform;

var Backpack : GameObject;
var BackpackPoint : Transform;

var Piribun : GameObject;
var PiribunPoint : Transform;

var thisVTransform : Transform;
var vRigidbody : Rigidbody;

var localV : Vector3;

var ParentVS : VehicleSensor;
var Anchor1 : GameObject;
var Anchor2 : GameObject;
var VehicleSight : GameObject;
var WheelController1 : GameObject;
var WheelController2 : GameObject;
var WheelController3 : GameObject;
var WheelController4 : GameObject;
var WheelController5 : GameObject;
var WheelController6 : GameObject;

var Hover1 : AdvancedHoverScript;
var Hover2 : AdvancedHoverScript;
var Hover3 : AdvancedHoverScript;
var Hover4 : AdvancedHoverScript;
var Hover5 : AdvancedHoverScript;
var Hover6 : AdvancedHoverScript;

var Leg1 : LegScript;
var Leg2 : LegScript;
var Leg3 : LegScript;

var Wing1 : WingScript;

var RB1 : Rigidbody;
var RB2 : Rigidbody;

private var RB1D : float = 1;
private var RB2D : float = 1;

var WeightFix : boolean;

var SkipTempLock : boolean;

var PiriZerzek : boolean;

var WarpVessel : boolean;

var SpaceVessel : boolean;

var OpenVessel : boolean;

var BigVessel : boolean;

var BrightVessel : boolean;

var Hitcher : boolean;
var HovJoint : ConfigurableJoint;
var Translator : ConfigurableJoint;
var TranslatorGO : GameObject;
var Hook1 : HingeJoint;
var Hook1Tip : Transform;
var Hook2 : HingeJoint;
var Hook2Tip : Transform;

var AttachNoise : GameObject;
var DetachNoise : GameObject;

var NoiseArea : Transform;

var HitcherJoint : ConfigurableJoint;

var Thruster : GameObject;
var Hover : GameObject;
var Gyro : GyroStabilizer;

var Boosting : boolean;
var BoostSound : GameObject;

var CanJam : boolean;
var JamPrefab : GameObject;
var JamArea : Transform;

var CanDuck : boolean;
var HoverJoint : ConfigurableJoint;
var HoverJointMax : float = -1;
var HoverVarSpeed : float = 0.01;
var Num : float = 0;
var NPOffset : float = 2;
var NPForce : float = 2;

var AffectedBySvibra : boolean;

var StartableEngine : boolean;
var Starting : boolean;
var EngineOn : boolean;
var EngineRunning : boolean;
var EngineAudio : GameObject;
var EngineAudioVol : float = 1.0;
var EngineVolFadeSpeed : float = 0.05;
var EngineOffAudio : GameObject;
var EngineLFX : GameObject;
var EngineFX1 : GameObject;
var EngineFX2 : GameObject;
var EngineFX3 : GameObject;
var EngineFX4 : GameObject;
var EngineFX5 : GameObject;
var EngineFX6 : GameObject;
var EngineFX7 : GameObject;
var EngineFX8 : GameObject;
var EngineFX9 : GameObject;
var EngineFX10 : GameObject;
var EngineFX11 : GameObject;
var EngineFX12 : GameObject;
var EngineFX13 : GameObject;
var EngineFX14 : GameObject;
var EngineFX15 : GameObject;
var EngineFX16 : GameObject;
var EngineFX17 : GameObject;
var EngineFX18 : GameObject;

var EngineOnFXDelay : float = 0;
var EngineOffFXDelay : float = 0;
var WingPivScriptR : PivotingHingeThrusterScript;
var WingPivScriptL : PivotingHingeThrusterScript;
var PivAng = 0;
var PivAngBoost = 0;
var Rotor1 : GameObject;
var Rotor2 : GameObject;
var Rotor1SpinMesh: GameObject;
var Rotor1IdleMesh: GameObject;
var Rotor2SpinMesh: GameObject;
var Rotor2IdleMesh: GameObject;
var RotorRotSpeed : float = 60;
var RotorSpeed : float = 0;
var EngineCounter = 0;
var SvibraEnveloped = 0;
var SvibraFX1 : GameObject;
var SvibraFX2 : GameObject;
var canCivmode : boolean;
var Civmode : boolean;
var CanCruise : boolean;
var Cruising : boolean;
var canVS : boolean;
var VSmode : boolean;
var CanAscend : boolean;
var CanDescend : boolean;
var CanChangeGravity : boolean;
var CanAntiGravity : boolean;
var CanAngularDrag : boolean;
var CanDrag : boolean;
var IntegratedController : boolean;
var AirController : boolean;

var canStrafe : boolean;

var BreakNoRev : boolean;

var CanBoost : boolean;

var EnergyIndicator : ParticleSystem;
var BoostDemand : float = 0.01;
var BoostRegen : float = 0.01;

var bRegen : boolean;

var useForceCurve : boolean;
var forceCurve : AnimationCurve = new AnimationCurve();
var bForceCurve : AnimationCurve = new AnimationCurve();

var rBoostThrusterFX1 : ParticleSystem;
var lBoostThrusterFX1 : ParticleSystem;
var rBoostThrusterFX2 : ParticleSystem;
var lBoostThrusterFX2 : ParticleSystem;

var DirForce : float = 1;
var DirRevForce : float = 1;
var BooostForce : float = 0;
var XCorrectForce : float = 0;
var TiltForce : float = 1;
var AngForce : float = 1;
var PitchForce : float = 1;
var AscendForce : float = 5;
var DescendForce : float = 5;
var KeyW : boolean;
var KeyA : boolean;
var KeyS : boolean;
var KeyD : boolean;
var KeyZ : boolean;
var KeyX : boolean;
var KeyLM : boolean;
var KeyRM : boolean;
var KeySpace : boolean;
var KeyShift : boolean;
var KeyCtrl : boolean;
var AngDragObject: Rigidbody;
var AngularDragOn : float = 2;
var AngularDragOff : float = 0.2;
var DragOn : float = 2;
var DragOff : float = 0.05;
var AtmosphericDrag : float = 0.05;
var Breakless : boolean;
var breaksOn : boolean;
var Inside : boolean;
var Broken : boolean;
var Once : boolean;

var targetLayers : LayerMask;
var HtargetLayers : LayerMask;

private var AngDrag : float = 0.05;

InvokeRepeating("Counter", 0.23, 1);

InvokeRepeating("BoostTicker", 0.1, 0.1);

function Start (){

if(!SkipTempLock)
rigidbody.isKinematic = true;

if(!SpaceVessel){
if(WorldInformation.instance.AreaSpace == true)
Broken = true;
}

if(WeightFix){
rigidbody.useGravity = false;
}

thisVTransform = gameObject.transform;
vRigidbody = gameObject.rigidbody;

Pirizuka = PlayerInformation.instance.Pirizuka.gameObject;

AngDrag = rigidbody.angularDrag;

AtmosphericDrag = rigidbody.drag;

rigidbody.centerOfMass = Vector3(COMx, COMy, COMz);

if (RB1)
	RB1D = RB1.angularDrag;
if (RB2)
	RB2D = RB2.angularDrag;

Inside = false;

if(PiriZerzek){
if(!WorldInformation.PiriPodPresent){
var Prefabionaise0 = Resources.Load("VesselPrefabs/Vessel1338", GameObject) as GameObject;
var TheThing0 = Instantiate(Prefabionaise0, CeptoPoint.position, CeptoPoint.rotation);
TheThing0.transform.GetComponent(VehicleSensor).Vessel.name = "GaragedPod";
}
}

ThisVehiclesID = transform.parent.name.Replace("(Clone)", "");

if(VehicleSight != null){
VehicleSight.SetActive(false);

var Prefabionaise = Resources.Load("Prefabs/CamSight", GameObject) as GameObject;
var TheThing = Instantiate(Prefabionaise, VehicleSight.transform.position, VehicleSight.transform.rotation);

TheThing.transform.parent = VehicleSight.gameObject.transform;
}

if(Drone){
var TheDrone1 = Instantiate(Drone, DronePoint1.transform.position, DroneRot.transform.rotation);
var TheDrone2 = Instantiate(Drone, DronePoint2.transform.position, DroneRot.transform.rotation);
TheDrone1.transform.GetChild(0).GetComponent(PiriDefenseDroneAI).OnStartup = true;
TheDrone1.transform.GetChild(0).GetComponent(PiriDefenseDroneAI).Settlepoint = DronePoint1;
TheDrone2.transform.GetChild(0).GetComponent(PiriDefenseDroneAI).Settlepoint = DronePoint2;
}

if(!WheelController1 &&
   !WheelController2 &&
   !WheelController3 &&
   !WheelController4 &&
   !WheelController5 &&
   !WheelController6 &&
   !Anchor1 && !Anchor2 &&
   !Hover1 && !Hover2 &&
   !Hover3 && !Hover4 &&
   !Hover5 && !Hover6 &&
   !Leg1 && !Leg2 && !Leg3 &&
   !Wing1 && !RB1 && !RB2){
 Breakless = true;
 breaksOn = false;
 }
 
if(Breakless && StartableEngine){
        if (Hover1 != null)
	    Hover1.breaksOn = true;
	    if (Hover2 != null)
	    Hover2.breaksOn = true;
	    if (Hover3 != null)
	    Hover3.breaksOn = true;
	    if (Hover4 != null)
	    Hover4.breaksOn = true;
	    if (Hover5 != null)
	    Hover5.breaksOn = true;
	    if (Hover6 != null)
	    Hover6.breaksOn = true;
	    
	    breaksOn = false;
}
 
if(breaksOn){
	    if (WheelController1 != null)
	    WheelController1.GetComponent(WheelMotorController).breaksOn = true;
	    if (WheelController2 != null)
	    WheelController2.GetComponent(WheelMotorController).breaksOn = true;
	    if (WheelController3 != null)
	    WheelController3.GetComponent(WheelMotorController).breaksOn = true;
	    if (WheelController4 != null)
	    WheelController4.GetComponent(WheelMotorController).breaksOn = true;
	    if (WheelController5 != null)
	    WheelController5.GetComponent(WheelMotorController).breaksOn = true;
	    if (WheelController6 != null)
	    WheelController6.GetComponent(WheelMotorController).breaksOn = true;

        if (Hover1 != null)
	    Hover1.breaksOn = true;
	    if (Hover2 != null)
	    Hover2.breaksOn = true;
	    if (Hover3 != null)
	    Hover3.breaksOn = true;
	    if (Hover4 != null)
	    Hover4.breaksOn = true;
	    if (Hover5 != null)
	    Hover5.breaksOn = true;
	    if (Hover6 != null)
	    Hover6.breaksOn = true;
	    
	    if (Leg1 != null)
	    Leg1.breaksOn = true;
	    if (Leg2 != null)
	    Leg2.breaksOn = true;
	    if (Leg3 != null)
	    Leg3.breaksOn = true;
	    
	    if (Wing1 != null)
	    Wing1.Broken = true;
	
        if (RB1)
	    RB1.angularDrag = 0.1;
        if (RB2)
	    RB2.angularDrag = 0.1;
}

if(WorldInformation.instance.AreaSpace){
if(CanChangeGravity)
rigidbody.useGravity = false;
rigidbody.drag = 0;
}

if(!WorldInformation.instance.AreaSpace){
if(CanChangeGravity)
rigidbody.useGravity = true;
rigidbody.drag = AtmosphericDrag;
}

if(HasGarage){
if(PlayerPrefs.HasKey("GaragedID")){

var Dist = PlayerPrefs.GetFloat("GaragedDist");
var ID = PlayerPrefs.GetString("GaragedID");

//var Prefabionaise2 = Resources.Load("VesselPrefabs/" + WorldInformation.GaragedVehicle, GameObject) as GameObject;

var Prefabionaise2 = Resources.Load("VesselPrefabs/" + ID, GameObject) as GameObject;

var TheThing1 = Instantiate(Prefabionaise2, GaragePoint.position, GaragePoint.rotation);
TheThing1.transform.position.y += Dist;
if(ID != "Vessel74")
TheThing1.transform.GetComponent(VehicleSensor).Vessel.name = "GaragedVessel";

}
}
yield WaitForSeconds (0.1);
rigidbody.isKinematic = false;

if(PiriZerzek)
Instantiate(Piribun, PiribunPoint.position, PiribunPoint.rotation);

yield WaitForSeconds (0.3);
var horny = transform.FindChild("Horn");
if(horny)
horn = horny.GetComponent(AudioSource);
if(horn)
hasHorn = true;
else
hasHorn = false;

if(PiriZerzek){
if(!WorldInformation.backpackIsPresent)
Instantiate(Backpack, BackpackPoint.position, BackpackPoint.rotation);
Instantiate(Piribun, PiribunPoint.position, PiribunPoint.rotation);
}

yield WaitForSeconds (0.3);

var Fxy = transform.FindChild("EngineFX");
if(Fxy)
EngineFXGO = Fxy.gameObject;

if(PiriZerzek){
Instantiate(Piribun, PiribunPoint.position, PiribunPoint.rotation);
yield WaitForSeconds (0.3);
Instantiate(Piribun, PiribunPoint.position, PiribunPoint.rotation);
}

}

function OnEnable () {
if(!Breakless && !StartableEngine)
    breaksOn = true;
}

function FixedUpdate () {

if(WeightFix)
rigidbody.AddForce(Vector3(0.0, -0.2, 0.0), ForceMode.VelocityChange);

if(CanAscend || useForceCurve)
localV = thisVTransform.InverseTransformDirection(vRigidbody.velocity);

if(Hitcher){
Translator.transform.localPosition.x = 0;
Translator.transform.localPosition.y = 0;
Translator.transform.localRotation = Quaternion.Euler(0, 0, 0);

if(Broken)
if(HitcherJoint)
   Destroy(HitcherJoint);
}

if(!Broken){
if(CanDuck && !CameraScript.InInterface && WorldInformation.playerCar == transform.name){

        if(!Input.GetKey(KeyCode.LeftControl))
        if(Num < 0)
            Num += HoverVarSpeed;
            
        if(Input.GetKey(KeyCode.LeftControl))
        if(Num > HoverJointMax)
            Num -= HoverVarSpeed;
            
HoverJoint.targetPosition = Vector3(0,0,Num);
}

if(Inside)
if(WorldInformation.IsNopass == true){

if(rigidbody.mass < 10)
NPOffset = 10;
else
NPOffset = rigidbody.mass;

if(rigidbody.mass < 2)
NPForce = 2;
else
NPForce = rigidbody.mass;

if(rigidbody.mass > 1000){
rigidbody.constraints = RigidbodyConstraints.FreezeRotationX | RigidbodyConstraints.FreezeRotationZ;
NPOffset = rigidbody.mass * 0.1;

var AngVelMod = rigidbody.angularVelocity.magnitude * 32;
var NPAng = Mathf.Clamp(AngVelMod,3.33,32);
AngDragObject.angularDrag = NPAng;
}
if(rigidbody.angularVelocity.magnitude < 0.5){
    rigidbody.AddForceAtPosition((WorldInformation.instance.transform.position - transform.position).normalized * NPForce, -transform.up * NPOffset);
    rigidbody.AddForceAtPosition((WorldInformation.instance.transform.position - transform.position).normalized * -NPForce, transform.up * NPOffset);
}
}

if(IntegratedController){

if(useForceCurve){
           DirForce = forceCurve.Evaluate(-localV.y);
           BooostForce = bForceCurve.Evaluate(-localV.y);
           }

if(StartableEngine){

if(EngineRunning){

if(Inside)
rigidbody.AddTorque(transform.right * XCorrectForce);

	if(AirController){
			
		if(KeyLM)
			rigidbody.AddForce(transform.up * -DirForce);
			
		if(KeySpace)
			rigidbody.AddForce(transform.up * DirRevForce);
			
		if(KeyZ)
			rigidbody.AddTorque(transform.forward * -AngForce);
	
		if(KeyX)
			rigidbody.AddTorque(transform.forward * AngForce);
			
		if(KeyA)
			rigidbody.AddTorque(transform.up * -AngForce);
			
		if(KeyD)
			rigidbody.AddTorque(transform.up * AngForce);
			
		if(KeyS)
			rigidbody.AddTorque(transform.right * -PitchForce);
			
		if(KeyW)
			rigidbody.AddTorque(transform.right * PitchForce);
			
			}else{
        
        if(KeyW){
           if(!Civmode){
           
		   if(!Boosting){
            
            if(!canStrafe){
			rigidbody.AddForce(transform.up * -DirForce);
			}else{
			if(KeyA || KeyD)
			rigidbody.AddForce(transform.up * -DirForce * 0.7);
			else
			rigidbody.AddForce(transform.up * -DirForce);
			}
            
            }else{
            rigidbody.AddForce(transform.up * -BooostForce);
            }
            }else{
            rigidbody.AddForce(transform.up * -DirRevForce);
            }
            
            rigidbody.AddTorque(transform.right * TiltForce);
            }

        if(KeyS){
        
        if(BreakNoRev){
	    if(-localV.y > 0){
            if(!Boosting)
            rigidbody.AddForce(transform.up * DirRevForce);
            else
            rigidbody.AddForce(transform.up * BooostForce);
            }
            }else{
            if(!Boosting){
            
            if(!canStrafe){
			rigidbody.AddForce(transform.up * DirRevForce);
			}else{
			if(KeyA || KeyD)
			rigidbody.AddForce(transform.up * DirRevForce * 0.7);
			else
			rigidbody.AddForce(transform.up * DirRevForce);
			}
            
            }else{
            rigidbody.AddForce(transform.up * BooostForce);
            }
            }
            
            rigidbody.AddTorque(transform.right * -TiltForce);
            }
            
        if(KeyA){
			if(canStrafe){
			if(!KeyRM){
			rigidbody.AddTorque(transform.forward * -AngForce);
			}else{
			if(!KeyW)
			rigidbody.AddForce(transform.right * -DirRevForce);
			else
			rigidbody.AddForce(transform.right * -DirRevForce * 0.7);
			}
			}else{
			rigidbody.AddTorque(transform.forward * -AngForce);
			}
			}
			
        if(KeyD){
			if(canStrafe){
			if(!KeyRM){
			rigidbody.AddTorque(transform.forward * AngForce);
			}else{
			if(!KeyW)
			rigidbody.AddForce(transform.right * DirRevForce);
			else
			rigidbody.AddForce(transform.right * DirRevForce * 0.7);
			}
			}else{
			rigidbody.AddTorque(transform.forward * AngForce);
			}
			}
			
            }
            
if(CanAscend){
if(KeyShift)
rigidbody.AddForce(transform.forward * AscendForce);
}

if(CanDescend){
if(KeyCtrl)
rigidbody.AddForce(-transform.forward * DescendForce);
}

}

}else{

if(Inside)
rigidbody.AddTorque(transform.right * XCorrectForce);
	
	if(AirController){
			
		if(KeyLM)
			rigidbody.AddForce(transform.up * -DirForce);
			
		if(KeySpace)
			rigidbody.AddForce(transform.up * DirRevForce);
			
		if(KeyZ)
			rigidbody.AddTorque(transform.forward * -AngForce);
	
		if(KeyX)
			rigidbody.AddTorque(transform.forward * AngForce);
			
		if(KeyA)
			rigidbody.AddTorque(transform.up * -AngForce);
			
		if(KeyD)
			rigidbody.AddTorque(transform.up * AngForce);
			
		if(KeyS)
			rigidbody.AddTorque(transform.right * -PitchForce);
			
		if(KeyW)
			rigidbody.AddTorque(transform.right * PitchForce);
			
			}else{
        
        if(KeyW){
           if(!Civmode){
           
		   if(!Boosting){
            
            if(!canStrafe){
			rigidbody.AddForce(transform.up * -DirForce);
			}else{
			if(KeyA || KeyD)
			rigidbody.AddForce(transform.up * -DirForce * 0.7);
			else
			rigidbody.AddForce(transform.up * -DirForce);
			}
            
            }else{
            rigidbody.AddForce(transform.up * -BooostForce);
            }
            }else{
            rigidbody.AddForce(transform.up * -DirRevForce);
            }
            
            rigidbody.AddTorque(transform.right * TiltForce);
            }

        if(KeyS){
        if(BreakNoRev){
	    if(-localV.y > 0){
            if(!Boosting)
            rigidbody.AddForce(transform.up * DirRevForce);
            else
            rigidbody.AddForce(transform.up * BooostForce);
            }
            }else{
            if(!Boosting){
            
            if(!canStrafe){
			rigidbody.AddForce(transform.up * DirRevForce);
			}else{
			if(KeyA || KeyD)
			rigidbody.AddForce(transform.up * DirRevForce * 0.7);
			else
			rigidbody.AddForce(transform.up * DirRevForce);
			}
            
            }else{
            rigidbody.AddForce(transform.up * BooostForce);
            }
            }
            
            rigidbody.AddTorque(transform.right * -TiltForce);
            }
            
        if(KeyA){
			if(canStrafe){
			if(!KeyRM){
			rigidbody.AddTorque(transform.forward * -AngForce);
			}else{
			if(!KeyW)
			rigidbody.AddForce(transform.right * -DirRevForce);
			else
			rigidbody.AddForce(transform.right * -DirRevForce * 0.7);
			}
			}else{
			rigidbody.AddTorque(transform.forward * -AngForce);
			}
			}
			
        if(KeyD){
			if(canStrafe){
			if(!KeyRM){
			rigidbody.AddTorque(transform.forward * AngForce);
			}else{
			if(!KeyW)
			rigidbody.AddForce(transform.right * DirRevForce);
			else
			rigidbody.AddForce(transform.right * DirRevForce * 0.7);
			}
			}else{
			rigidbody.AddTorque(transform.forward * AngForce);
			}
			}
			
            }
            
if(CanAscend){
if(KeyShift){
rigidbody.AddForce(transform.forward * AscendForce);
if(XCorrectForce != 0)
rigidbody.AddTorque(transform.right * XCorrectForce * 6);
}

}

if(CanDescend){
if(KeyCtrl)
rigidbody.AddForce(-transform.forward * DescendForce);

}

}





if(IntegratedController && WorldInformation.playerCar == transform.name){
	
if(Hitcher && !CameraScript.InInterface){
	
if(Input.GetKey(KeyCode.PageDown))
if(HovJoint.targetPosition.z > -0.5)
   HovJoint.targetPosition -= Vector3(0,0,0.01);
            
if(Input.GetKey(KeyCode.PageUp))
if(HovJoint.targetPosition.z < 0.5)
   HovJoint.targetPosition += Vector3(0,0,0.01);
	
if(Input.GetKey("2"))
if(Translator.targetPosition.z > -2.5)
   Translator.targetPosition -= Vector3(0,0,0.01);
            
if(Input.GetKey("1"))
if(Translator.targetPosition.z < 0)
   Translator.targetPosition += Vector3(0,0,0.01);
            
if(Input.GetKey("4")){
if(Hook1.spring.targetPosition < 90)
   Hook1.spring.targetPosition += 1;
if(Hook2.spring.targetPosition > -90)
   Hook2.spring.targetPosition -= 1;
            
if(HitcherJoint){
Destroy(HitcherJoint);
            
var TheThing1 = Instantiate(DetachNoise, NoiseArea.position, NoiseArea.rotation);
	TheThing1.transform.parent = gameObject.transform;
}
}





if(Input.GetKey("3")){

if(!HitcherJoint){
    
if(Hook1.spring.targetPosition > 0)
Hook1.spring.targetPosition -= 1;
if(Hook2.spring.targetPosition < 0)
Hook2.spring.targetPosition += 1;
            
var hit : RaycastHit;
if (Physics.Raycast (Hook1Tip.position, Hook1Tip.forward, hit, 0.4, HtargetLayers) &&
	Physics.Raycast (Hook2Tip.position, Hook2Tip.forward, hit, 0.4, HtargetLayers)){
	
HitcherJoint = TranslatorGO.AddComponent ("ConfigurableJoint");
HitcherJoint.connectedBody = hit.rigidbody;
HitcherJoint.xDrive.mode = JointDriveMode.Position;
HitcherJoint.yDrive.mode = JointDriveMode.Position;
HitcherJoint.zDrive.mode = JointDriveMode.Position;
HitcherJoint.angularXDrive.mode = JointDriveMode.Position;
HitcherJoint.angularYZDrive.mode = JointDriveMode.Position;
   
HitcherJoint.xDrive.positionSpring = 10000;
HitcherJoint.yDrive.positionSpring = 10000;
HitcherJoint.zDrive.positionSpring = 10000;
    
HitcherJoint.angularXDrive.positionSpring = 10000;
HitcherJoint.angularYZDrive.positionSpring = 10000;
   
HitcherJoint.xDrive.positionDamper = 1;
HitcherJoint.yDrive.positionDamper = 1;
HitcherJoint.zDrive.positionDamper = 1;
    
HitcherJoint.angularXDrive.positionDamper = 1;
HitcherJoint.angularYZDrive.positionDamper = 1;
    
var TheThing2 = Instantiate(AttachNoise, NoiseArea.position, NoiseArea.rotation);
	TheThing2.transform.parent = gameObject.transform;
}
}
}

}

}



}




















if(Rotor1){
Rotor1.transform.Rotate(0,-RotorSpeed,0 * Time.deltaTime);
Rotor2.transform.Rotate(0,RotorSpeed,0 * Time.deltaTime);

if(EngineRunning){
if(RotorSpeed < RotorRotSpeed)
RotorSpeed += 1;
}else{
if(RotorSpeed > 0)
RotorSpeed -= 1;
}

if(RotorSpeed > 20){
Rotor1IdleMesh.gameObject.SetActive (false);
Rotor1SpinMesh.gameObject.SetActive (true);
Rotor2IdleMesh.gameObject.SetActive (false);
Rotor2SpinMesh.gameObject.SetActive (true);
}else{
Rotor1IdleMesh.gameObject.SetActive (true);
Rotor1SpinMesh.gameObject.SetActive (false);
Rotor2IdleMesh.gameObject.SetActive (true);
Rotor2SpinMesh.gameObject.SetActive (false);
}

}
}else{
if(Rotor1){
Rotor1.transform.Rotate(0,-RotorSpeed,0 * Time.deltaTime);
Rotor2.transform.Rotate(0,RotorSpeed,0 * Time.deltaTime);

if(RotorSpeed > 0)
RotorSpeed -= 1;

if(RotorSpeed > 20){
Rotor1IdleMesh.gameObject.SetActive (false);
Rotor1SpinMesh.gameObject.SetActive (true);
Rotor2IdleMesh.gameObject.SetActive (false);
Rotor2SpinMesh.gameObject.SetActive (true);
}else{
Rotor1IdleMesh.gameObject.SetActive (true);
Rotor1SpinMesh.gameObject.SetActive (false);
Rotor2IdleMesh.gameObject.SetActive (true);
Rotor2SpinMesh.gameObject.SetActive (false);
}

}
}

if(AffectedBySvibra){

if(SvibraEnveloped > 1){
SvibraEnveloped -= 1;

if(SvibraEnveloped > 50){

if(rigidbody.drag < 10)
rigidbody.drag += 0.02;

SvibraFX1.particleSystem.enableEmission = true;
SvibraFX2.particleSystem.enableEmission = true;
}

if(SvibraEnveloped < 2){
rigidbody.drag = AtmosphericDrag;
SvibraFX1.particleSystem.enableEmission = false;
SvibraFX2.particleSystem.enableEmission = false;
}
}

}

if(StartableEngine){

if(EngineOn && Broken){
EngineOn = false;
if(EngineOffAudio)
EngineOffAudio.audio.Play();
EngineEffectsOff();
}

if(!EngineOn && !Broken){
if(EngineAudio.audio.volume > 0)
EngineAudio.audio.volume -= EngineVolFadeSpeed;
if(EngineAudio.audio.volume == 0)
EngineAudio.audio.Stop();
}

if(Starting && !Broken){

if(EngineCounter < 100 && !EngineOn)
EngineCounter += 1;

if(EngineCounter > 0 && EngineOn)
EngineCounter -= 1;
        
if(EngineCounter == 100 && !EngineOn){
EngineOn = true;
EngineAudio.audio.volume = EngineAudioVol;
EngineAudio.audio.Play();
EngineEffectsOn();

if (Hover1 != null)
	    Hover1.breaksOn = false;
if (Hover2 != null)
	    Hover2.breaksOn = false;
if (Hover3 != null)
	    Hover3.breaksOn = false;
if (Hover4 != null)
	    Hover4.breaksOn = false;
if (Hover5 != null)
	    Hover5.breaksOn = false;
if (Hover6 != null)
	    Hover6.breaksOn = false;
	    
breaksOn = false;

}

if(EngineCounter == 0 && EngineOn){
EngineOn = false;
EngineOffAudio.audio.Play();
EngineEffectsOff();

KeySpace = false;
KeyRM = false;
KeyLM = false;
KeyW = false;
KeyA = false;
KeyS = false;
KeyD = false;
KeyZ = false;
KeyX = false;

if (Hover1 != null)
	Hover1.breaksOn = true;
if (Hover2 != null)
	Hover2.breaksOn = true;
if (Hover3 != null)
	Hover3.breaksOn = true;
if (Hover4 != null)
	Hover4.breaksOn = true;
if (Hover5 != null)
	Hover5.breaksOn = true;
if (Hover6 != null)
	Hover6.breaksOn = true;
	
if (Leg1 != null)
	Leg1.breaksOn = true;
if (Leg2 != null)
	Leg2.breaksOn = true;
if (Leg3 != null)
	Leg3.breaksOn = true;
	    
}

}
}

   if(VehicleSight != null)
       	ActivateSight();
       	
}

function ArtificialUpdate () {

if(Broken)
Starting = true;

if(Input.GetKeyDown("q"))
Starting = true;

if(Input.GetKeyUp("q"))
Starting = false;
	
	if(Broken && !Once){
	name = "broken";
	WorldInformation.playerCar = transform.name;
	
	if(OpenVessel){
	WorldInformation.vehicleDoorController.Exit();
	Destroy(WorldInformation.vehicleDoorController);
	}
	
	if(Inside)
    DrivenVesselScript.instance.WhatToSpawn = "null";
    
    if(HitcherJoint)
       Destroy(HitcherJoint);
    
    Once = true;
	}
	
	if(Broken)
		return;
	
	verticalInput = Input.GetAxis("Vertical");
	
	if(hasHorn){
	if(Input.GetKeyDown("h")){
	if(!Input.GetKey(KeyCode.LeftShift)){
	if(!horn.isPlaying){
	horn.Play();
	horn.loop = true;
	}
	}
	}
	
	if(Input.GetKeyUp("h"))
	horn.loop = false;
	}
	
	if(CanJam)
	if(Input.GetKeyDown("g")){
	var TheThingJ = Instantiate(JamPrefab, JamArea.position, JamArea.rotation);
	TheThingJ.transform.parent = JamArea;
	JamReset();
	CanJam = false;
	}
	    
	    if(!Breakless && !CameraScript.InInterface){
	    if(StartableEngine){
	    if (Input.GetKeyDown(KeyCode.P) && EngineOn)
	    	CheckWheels();
	    }else{
	    if (Input.GetKeyDown(KeyCode.P))
	    	CheckWheels();
	    }
	    }
	    
	    if(canCivmode){
	    if(Input.GetKeyDown("c")){
	    if(!KeyW){
	    
	    if(!Civmode)
	    Civmode = true;
	    else
	    Civmode = false;
	    
	    }
	    }
	    }
	    
	if(!StartableEngine){
    
    if(!CameraScript.InInterface){
    
if(canVS){
if(Input.GetKeyDown("v")){
if (Hover1 != null)
Hover1.hBool();
if (Hover2 != null)
Hover2.hBool();
if (Hover3 != null)
Hover3.hBool();
if (Hover4 != null)
Hover4.hBool();
if (Hover5 != null)
Hover5.hBool();
if (Hover6 != null)
Hover6.hBool();


if(!VSmode)
VSmode = true;
else
VSmode = false;
	    
}
}
    
    if(IntegratedController){
    
    if(Input.GetKeyDown(KeyCode.Space))
    KeySpace = true;
    if(Input.GetKeyUp(KeyCode.Space))
    KeySpace = false;
    
    if(Input.GetKeyDown(KeyCode.LeftShift))
    KeyShift = true;
    if(Input.GetKeyUp(KeyCode.LeftShift))
    KeyShift = false;
    
    if(Input.GetKeyDown(KeyCode.LeftControl))
    KeyCtrl = true;
    if(Input.GetKeyUp(KeyCode.LeftControl))
    KeyCtrl = false;
    
    if(Input.GetKeyDown(KeyCode.Mouse0))
			KeyLM = true;
	if(Input.GetKeyUp(KeyCode.Mouse0))
			KeyLM = false;
			
    if(Input.GetKeyDown(KeyCode.Mouse1))
			KeyRM = true;
	if(Input.GetKeyUp(KeyCode.Mouse1))
			KeyRM = false;
    
    if(Input.GetKeyDown("w"))
		   KeyW = true;
    if(Input.GetKeyUp("w"))
		   KeyW = false;
		   
    if(Input.GetKeyDown("a"))
		   KeyA = true;
    if(Input.GetKeyUp("a"))
		   KeyA = false;

    if(Input.GetKeyDown("s"))
           KeyS = true;
    if(Input.GetKeyUp("s"))
           KeyS = false;
           
    if(Input.GetKeyDown("d"))
		   KeyD = true;
    if(Input.GetKeyUp("d"))
		   KeyD = false;
		   
    if(Input.GetKeyDown("z"))
		   KeyZ = true;
    if(Input.GetKeyUp("z"))
		   KeyZ = false;
		   
    if(Input.GetKeyDown("x"))
		   KeyX = true;
    if(Input.GetKeyUp("x"))
		   KeyX = false;
          
    }
    }

    }else{

    if(EngineOn){
    
    if(!CameraScript.InInterface){
    
if(canVS){
if(Input.GetKeyDown("v")){
if (Hover1 != null)
Hover1.hBool();
if (Hover2 != null)
Hover2.hBool();
if (Hover3 != null)
Hover3.hBool();
if (Hover4 != null)
Hover4.hBool();
if (Hover5 != null)
Hover5.hBool();
if (Hover6 != null)
Hover6.hBool();

if(!VSmode)
VSmode = true;
else
VSmode = false;

}
}
    
    if(IntegratedController){
    
    if(Input.GetKeyDown(KeyCode.Space))
    KeySpace = true;
    if(Input.GetKeyUp(KeyCode.Space))
    KeySpace = false;
    
    if(Input.GetKeyDown(KeyCode.LeftShift))
    KeyShift = true;
    if(Input.GetKeyUp(KeyCode.LeftShift))
    KeyShift = false;
    
    if(Input.GetKeyDown(KeyCode.LeftControl))
    KeyCtrl = true;
    if(Input.GetKeyUp(KeyCode.LeftControl))
    KeyCtrl = false;
    
    if(Input.GetKeyDown(KeyCode.Mouse0))
			KeyLM = true;
	if(Input.GetKeyUp(KeyCode.Mouse0))
			KeyLM = false;
			
    if(Input.GetKeyDown(KeyCode.Mouse1))
			KeyRM = true;
	if(Input.GetKeyUp(KeyCode.Mouse1))
			KeyRM = false;
    
    if(Input.GetKeyDown("w"))
		   KeyW = true;
    if(Input.GetKeyUp("w"))
		   KeyW = false;
		   
    if(Input.GetKeyDown("a"))
		   KeyA = true;
    if(Input.GetKeyUp("a"))
		   KeyA = false;

    if(Input.GetKeyDown("s"))
           KeyS = true;
    if(Input.GetKeyUp("s"))
           KeyS = false;
           
    if(Input.GetKeyDown("d"))
		   KeyD = true;
    if(Input.GetKeyUp("d"))
		   KeyD = false;
		   
    if(Input.GetKeyDown("z"))
		   KeyZ = true;
    if(Input.GetKeyUp("z"))
		   KeyZ = false;
		   
    if(Input.GetKeyDown("x"))
		   KeyX = true;
    if(Input.GetKeyUp("x"))
		   KeyX = false;
           }
           }
    
    }else{
    IndicatorScript.ParkingBrakeOn = false;
    }

    }
    
if(CanBoost){

if(!Boosting){
if(BoostSound.audio.volume > 0)
BoostSound.audio.volume -= 0.1;
if(BoostSound.audio.volume == 0)
BoostSound.audio.Stop();
}
    
   if(EngineOn){
   
   if(Input.GetKey(KeyCode.W) && Input.GetKey(KeyCode.B) || Input.GetKey(KeyCode.S) && Input.GetKey(KeyCode.B)){
   if(!Boosting && !bRegen){
   Boosting = true;
   BoostSound.audio.Play();
   BoostSound.audio.volume = 1;
   Force = BooostForce;
   
   if(WingPivScriptR)
   WingPivScriptR.ForwardPivotAngle = PivAngBoost;
   
   if(WingPivScriptL)
   WingPivScriptL.ForwardPivotAngle = -PivAngBoost;
   
   if(rBoostThrusterFX1)
   rBoostThrusterFX1.enableEmission = true;
   if(lBoostThrusterFX1)
   lBoostThrusterFX1.enableEmission = true;
   if(rBoostThrusterFX2)
   rBoostThrusterFX2.enableEmission = true;
   if(lBoostThrusterFX2)
   lBoostThrusterFX2.enableEmission = true;
}
}
   if(!Input.GetKey(KeyCode.W) && !Input.GetKey(KeyCode.B) && !Input.GetKey(KeyCode.S) && !Input.GetKey(KeyCode.B)){
   if(Boosting){
   Boosting = false;
   Force = DirForce;
   
   if(WingPivScriptR)
   WingPivScriptR.ForwardPivotAngle = PivAng;
   
   if(WingPivScriptL)
   WingPivScriptL.ForwardPivotAngle = -PivAng;
   
   if(rBoostThrusterFX1)
   rBoostThrusterFX1.enableEmission = false;
   if(lBoostThrusterFX1)
   lBoostThrusterFX1.enableEmission = false;
   if(rBoostThrusterFX2)
   rBoostThrusterFX2.enableEmission = false;
   if(lBoostThrusterFX2)
   lBoostThrusterFX2.enableEmission = false;
   }
}
}
}
}

function EngineEffectsOn () {
yield WaitForSeconds (EngineOnFXDelay);
EngineRunning = true;

if(Thruster)
Thruster.SetActive (true);

if(Gyro)
Gyro.Deactivated = false;

if(CanAntiGravity){
rigidbody.useGravity = false;
if(AngDragObject)
AngDragObject.useGravity = false;
}

if(CanAngularDrag)
if(AngDragObject)
AngDragObject.angularDrag = AngularDragOn;

if(CanDrag)
rigidbody.drag = DragOn;

if(EngineFX1)
EngineFX1.particleSystem.enableEmission = true;
if(EngineFX2)
EngineFX2.particleSystem.enableEmission = true;
if(EngineFX3)
EngineFX3.particleSystem.enableEmission = true;
if(EngineFX4)
EngineFX4.particleSystem.enableEmission = true;
if(EngineFX5)
EngineFX5.particleSystem.enableEmission = true;
if(EngineFX6)
EngineFX6.particleSystem.enableEmission = true;
if(EngineFX7)
EngineFX7.particleSystem.enableEmission = true;
if(EngineFX8)
EngineFX8.particleSystem.enableEmission = true;
if(EngineFX9)
EngineFX9.particleSystem.enableEmission = true;
if(EngineFX10)
EngineFX10.particleSystem.enableEmission = true;
if(EngineFX11)
EngineFX11.particleSystem.enableEmission = true;
if(EngineFX12)
EngineFX12.particleSystem.enableEmission = true;
if(EngineFX13)
EngineFX13.particleSystem.enableEmission = true;
if(EngineFX14)
EngineFX14.particleSystem.enableEmission = true;
if(EngineFX15)
EngineFX15.particleSystem.enableEmission = true;
if(EngineFX16)
EngineFX16.particleSystem.enableEmission = true;
if(EngineFX17)
EngineFX17.particleSystem.enableEmission = true;
if(EngineFX18)
EngineFX18.particleSystem.enableEmission = true;
if(EngineLFX)
EngineLFX.SetActive(true);
}


function EngineEffectsOff () {
yield WaitForSeconds (EngineOffFXDelay);
EngineRunning = false;

if(Thruster)
Thruster.SetActive (false);

if(Gyro)
Gyro.Deactivated = true;

if(CanAntiGravity){
rigidbody.useGravity = true;
if(AngDragObject)
AngDragObject.useGravity = true;
}

if(CanAngularDrag)
if(AngDragObject)
AngDragObject.angularDrag = AngularDragOff;

if(CanDrag)
rigidbody.drag = DragOff;

if(EngineFX1)
EngineFX1.particleSystem.enableEmission = false;
if(EngineFX2)
EngineFX2.particleSystem.enableEmission = false;
if(EngineFX3)
EngineFX3.particleSystem.enableEmission = false;
if(EngineFX4)
EngineFX4.particleSystem.enableEmission = false;
if(EngineFX5)
EngineFX5.particleSystem.enableEmission = false;
if(EngineFX6)
EngineFX6.particleSystem.enableEmission = false;
if(EngineFX7)
EngineFX7.particleSystem.enableEmission = false;
if(EngineFX8)
EngineFX8.particleSystem.enableEmission = false;
if(EngineFX9)
EngineFX9.particleSystem.enableEmission = false;
if(EngineFX10)
EngineFX10.particleSystem.enableEmission = false;
if(EngineFX11)
EngineFX11.particleSystem.enableEmission = false;
if(EngineFX12)
EngineFX12.particleSystem.enableEmission = false;
if(EngineFX13)
EngineFX13.particleSystem.enableEmission = false;
if(EngineFX14)
EngineFX14.particleSystem.enableEmission = false;
if(EngineFX15)
EngineFX15.particleSystem.enableEmission = false;
if(EngineFX16)
EngineFX16.particleSystem.enableEmission = false;
if(EngineFX17)
EngineFX17.particleSystem.enableEmission = false;
if(EngineFX18)
EngineFX18.particleSystem.enableEmission = false;
if(EngineLFX)
EngineLFX.SetActive(false);
}

function RefreshFX () {
if(EngineFXGO){
EngineFXGO.SetActive(false);
yield WaitForSeconds (0.1);
EngineFXGO.SetActive(true);
}
}

function JamReset () {
yield WaitForSeconds (0.3);
CanJam = true;
}

function ActivateSight () {
    if(WorldInformation.playerCar == this.gameObject.name && Input.GetMouseButton(1)){
       	VehicleSight.SetActive(true);
	} else {
       	VehicleSight.SetActive(false);
	}
}

function Update2 () {
	if (WorldInformation.playerCar == this.gameObject.name){
	    IndicatorScript.IsInsideVehicle = true;
	} else {
	    IndicatorScript.IsInsideVehicle = false;
	}
}

function BoostTicker () {
if(EnergyIndicator){

if(Boosting){
EnergyIndicator.startColor.a -= BoostDemand;

if(EnergyIndicator.startColor.a == 0){
   Boosting = false;
   bRegen = true;
   Force = DirForce;
   
   if(WingPivScriptR)
   WingPivScriptR.ForwardPivotAngle = PivAng;
   
   if(WingPivScriptL)
   WingPivScriptL.ForwardPivotAngle = -PivAng;
   
   if(rBoostThrusterFX1)
   rBoostThrusterFX1.enableEmission = false;
   if(lBoostThrusterFX1)
   lBoostThrusterFX1.enableEmission = false;
   if(rBoostThrusterFX2)
   rBoostThrusterFX2.enableEmission = false;
   if(lBoostThrusterFX2)
   lBoostThrusterFX2.enableEmission = false;
   }

}else{
if(!Broken){
if(EnergyIndicator.startColor.a < 1){
EnergyIndicator.startColor.a += BoostRegen;
if(EnergyIndicator.startColor.a > 0.2)
bRegen = false;
}
}else{
EnergyIndicator.startColor.a -= BoostDemand;
}
}

}
}

function CheckWheels () {
	if(breaksOn == true){
	    breaksOn = false;
	    if (WheelController1 != null)
	    WheelController1.GetComponent(WheelMotorController).breaksOn = false;
	    if (WheelController2 != null)
	    WheelController2.GetComponent(WheelMotorController).breaksOn = false;
	    if (WheelController3 != null)
	    WheelController3.GetComponent(WheelMotorController).breaksOn = false;
	    if (WheelController4 != null)
	    WheelController4.GetComponent(WheelMotorController).breaksOn = false;
	    if (WheelController5 != null)
	    WheelController5.GetComponent(WheelMotorController).breaksOn = false;
	    if (WheelController6 != null)
	    WheelController6.GetComponent(WheelMotorController).breaksOn = false;
	    
	    if (Anchor1 != null)
	    Anchor1.GetComponent(PistonAnchorBreak).breaksOn = false;
	    if (Anchor2 != null)
	    Anchor2.GetComponent(PistonAnchorBreak).breaksOn = false;
	    
	     if (Hover1 != null)
	    Hover1.breaksOn = false;
	    if (Hover2 != null)
	    Hover2.breaksOn = false;
	    if (Hover3 != null)
	    Hover3.breaksOn = false;
	    if (Hover4 != null)
	    Hover4.breaksOn = false;
	    if (Hover5 != null)
	    Hover5.breaksOn = false;
	    if (Hover6 != null)
	    Hover6.breaksOn = false;
	    
if (Leg1 != null)
	Leg1.breaksOn = false;
if (Leg2 != null)
	Leg2.breaksOn = false;
if (Leg3 != null)
	Leg3.breaksOn = false;
	
if (Wing1 != null)
	Wing1.Broken = false;
	    
if (RB1)
	RB1.angularDrag = RB1D;
if (RB2)
	RB2.angularDrag = RB2D;
	    
	} else {
	
	    breaksOn = true;
	    if (WheelController1 != null)
	    WheelController1.GetComponent(WheelMotorController).breaksOn = true;
	    if (WheelController2 != null)
	    WheelController2.GetComponent(WheelMotorController).breaksOn = true;
	    if (WheelController3 != null)
	    WheelController3.GetComponent(WheelMotorController).breaksOn = true;
	    if (WheelController4 != null)
	    WheelController4.GetComponent(WheelMotorController).breaksOn = true;
	    if (WheelController5 != null)
	    WheelController5.GetComponent(WheelMotorController).breaksOn = true;
	    if (WheelController6 != null)
	    WheelController6.GetComponent(WheelMotorController).breaksOn = true;
	    
	    if (Anchor1 != null)
	    Anchor1.GetComponent(PistonAnchorBreak).breaksOn = true;
	    if (Anchor2 != null)
	    Anchor2.GetComponent(PistonAnchorBreak).breaksOn = true;
	    
	     if (Hover1 != null)
	    Hover1.breaksOn = true;
	    if (Hover2 != null)
	    Hover2.breaksOn = true;
	    if (Hover3 != null)
	    Hover3.breaksOn = true;
	    if (Hover4 != null)
	    Hover4.breaksOn = true;
	    if (Hover5 != null)
	    Hover5.breaksOn = true;
	    if (Hover6 != null)
	    Hover6.breaksOn = true;
	    
if (Leg1 != null)
	Leg1.breaksOn = true;
if (Leg2 != null)
	Leg2.breaksOn = true;
if (Leg3 != null)
	Leg3.breaksOn = true;
	
if (Wing1 != null)
	Wing1.Broken = true;
	
if (RB1)
	RB1.angularDrag = 0.1;
if (RB2)
	RB2.angularDrag = 0.1;
	    
	}
}

function SetState(_broken : boolean) {
	Broken = _broken;
}

function OnCollisionEnter(collision : Collision){
if(collision.gameObject.name.Contains("SvibraCloud"))
if(SvibraEnveloped < 2000)
SvibraEnveloped += 200;
}

function Counter(){

rigidbody.centerOfMass = Vector3(COMx, COMy, COMz);

if(WorldInformation.instance.AreaSpace)
rigidbody.drag = 0;

if(HasGarage){
WorldInformation.Garage = GaragePoint;

if(WorldInformation.InGarage){
GarageLight.SetActive (true);
}

if(!WorldInformation.InGarage){
GarageLight.SetActive (false);
}

}else{

if(WorldInformation.Garage)
if(WorldInformation.NearGarage){
if(Vector3.Distance(transform.position, WorldInformation.Garage.position) < 10){
PlayerPrefs.SetString("GaragedID", ThisVehiclesID);
PlayerPrefs.SetFloat("GaragedDist", SpawnDist);
PlayerPrefs.Save();
WorldInformation.InGarage = true;
}
}

if(WorldInformation.GarageF1){
if(WorldInformation.NearGarageF1){
if(Vector3.Distance(transform.position, WorldInformation.GarageF1.position) < 64){
PlayerPrefs.SetString("GaragedIDF1", ThisVehiclesID);
PlayerPrefs.SetFloat("GaragedDistF1", SpawnDist);
PlayerPrefs.Save();
WorldInformation.InGarageF1 = true;
ParentVS.Garaged = true;
ParentVS.Garage = WorldInformation.GarageF1;
}
}
}

if(WorldInformation.GarageF2)
if(WorldInformation.NearGarageF2){
if(Vector3.Distance(transform.position, WorldInformation.GarageF2.position) < 64){
PlayerPrefs.SetString("GaragedIDF2", ThisVehiclesID);
PlayerPrefs.SetFloat("GaragedDistF2", SpawnDist);
PlayerPrefs.Save();
WorldInformation.InGarageF2 = true;
ParentVS.Garaged = true;
ParentVS.Garage = WorldInformation.GarageF2;
}
}

}
        
if(!Broken){

if(Inside){

if (Civmode)
    IndicatorScript.CivilmodeOn = true;
    else
    IndicatorScript.CivilmodeOn = false;

if (VSmode)
    IndicatorScript.VSmodeOn = true;
    else
    IndicatorScript.VSmodeOn = false;
    
if (breaksOn)
    IndicatorScript.ParkingBrakeOn = true;
    else
    IndicatorScript.ParkingBrakeOn = false;

if(canVS){
if (Hover1 != null)
Hover1.inside = true;
if (Hover2 != null)
Hover2.inside = true;
if (Hover3 != null)
Hover3.inside = true;
if (Hover4 != null)
Hover4.inside = true;
if (Hover5 != null)
Hover5.inside = true;
if (Hover6 != null)
Hover6.inside = true;
}

DrivenVesselScript.instance.WhereToSpawnPos = ParentVS.gameObject.transform.position;
DrivenVesselScript.instance.WhereToSpawnRot = ParentVS.gameObject.transform.rotation;

DrivenVesselScript.instance.LastScene = (Application.loadedLevelName);

DrivenVesselScript.instance.WhatToSpawn = ParentVS.prefab_name;

DrivenVesselScript.instance.VesselTravelSpeed = TravelSpeed;
DrivenVesselScript.instance.VesselSpawnDist = SpawnDist;

DrivenVesselScript.instance.isWarpVessel = WarpVessel;

DrivenVesselScript.instance.isSpaceVessel = SpaceVessel;

WorldInformation.instance.UsingBrightVessel = BrightVessel;

WorldInformation.playerLevel = vehicleLevel;

if(ThisVehiclesTC == "null"){
if(vehicleLevel == 1)
TCChanger.TCName = "sTC1p";
if(vehicleLevel == 2)
TCChanger.TCName = "mTC1p";
if(vehicleLevel == 3)
TCChanger.TCName = "bTC1p";
if(vehicleLevel == 4)
TCChanger.TCName = "xbTC1p";
}else{
TCChanger.TCName = ThisVehiclesTC;
}

}else{
if(canVS){
if (Hover1 != null)
Hover1.inside = false;
if (Hover2 != null)
Hover2.inside = false;
if (Hover3 != null)
Hover3.inside = false;
if (Hover4 != null)
Hover4.inside = false;
if (Hover5 != null)
Hover5.inside = false;
if (Hover6 != null)
Hover6.inside = false;
}
}

if(WorldInformation.IsNopass == false)
if(rigidbody.mass > 1000){
rigidbody.constraints = RigidbodyConstraints.None;
AngDragObject.angularDrag = AngDrag;
}

}else{
if(Inside){
IndicatorScript.CivilmodeOn = false;
IndicatorScript.VSmodeOn = false;
IndicatorScript.VehicleIsDamaged = true;
TCChanger.TCName = "broken";
}
}


}