#pragma strict

var Faceplant : GameObject;
var HurtNoise : GameObject;
var FaceplantArea : Transform;
var KickArea : Transform;
var KickPrefab : GameObject;
var KickSoundPrefab : GameObject;

var CarryPointTF : Transform;

var RayPointTF : Transform;

var thisLevelTransform : Transform;

var steppypoint : Transform;

var thisTransform : Transform;

var thisRigidbody : Rigidbody;

var PiriCapCol: CapsuleCollider;

var PiriBoxCol : BoxCollider;

var pivotTF: Transform;

var pivotRB: Rigidbody;

var pivotHinge: HingeJoint;

var PiriWheel: HingeJoint;

var PiriWheelRB: Rigidbody;

var PiriWheelCol: SphereCollider;

var RotForce : float = 0;

var BrakeJoint : FixedJoint;

var CarryJoint : ConfigurableJoint;

var PiriAni : Animation;
var PiriBaseTF : Transform;
var PiriHeadTF : Transform;
var Pirizuka : GameObject;
var PiriUBC : GameObject;
var RBosom : GameObject;
var LBosom : GameObject;
var RBosomCJ : ConfigurableJoint;
var LBosomCJ : ConfigurableJoint;
var maxAnimationSpeed = 2F;
var backwardSpeed = 1F;
var forwardSpeed = 1F;
var sprintSpeed = 1F;
var Idling : String;
var Idling2 : String;
var Holding : String;
var forward : String;
var HoldingW : String;
var sprint : String;
var falling : String;
var floating : String;
var floatingF : String;
var HoldingOn : String;
var swimming : String;
var jump : String;
var land : String;
var kick : String;
var GunWalk : String;
var GunStrafe : String;
var GunStill : String;
var RidingMotus : String;
var RidingCepstol : String;
private var targetRigidbody : GameObject;

static var instance : PlayerMotionAnimator;

var inInterface : boolean;

enum pState {
	Idling, WalkForward, Sprinting
}
var state: pState;

enum eState {
	Idle, Idle2, Idle3
}
var aState: eState = eState.Idle;

var Count: float;
private var relative : Vector3;

static var lastVelocity : float;

var acceleration : float;
var Gs : float;

var Performing : boolean;

static var CanCollide : boolean;
var CanIdle : boolean;
var HasJiggled : boolean;
var PiriFloating : boolean;
var CloseToGround : boolean;
var GroundClearance : float = 0.5;
static var Landing : boolean;
static var PiriStill : boolean;
var PiriGrounded : boolean;
var CanMove : boolean = true;
var CanFPAnimationaise : boolean;
static var UsingMotus : boolean;
static var Transit : boolean;

var JumpForce : float = 100;

var StabilizeForce = 10.0;
var TStabilizeForce = 10.0;
var AngDrag = 40;
var TC : Transform;
var AimTarget : GameObject;
var AimSideTarget : GameObject;
var AimingForward : boolean;
var AimingLeft : boolean;
var AimingRight : boolean;
var AimingBack : boolean;

var keyW : boolean;
var keyA : boolean;
var keyS : boolean;
var keyD : boolean;

var InWater : boolean;
var OnGround : boolean;
var onMovingGround : boolean;
var groundRigidbody : Rigidbody;
var Moving : boolean;
var Jumping : boolean;

var Carrying : boolean;

var HeavyCarry : boolean;

var once : boolean;

var targetLayers : LayerMask;

var WtargetLayers : LayerMask;

var CtargetLayers : LayerMask;

InvokeRepeating("Tick", 1, 0.2);

InvokeRepeating("Counter", 0.33, 0.5);

function Awake(){
	instance = this;
}

function Start() {
    AimTarget = GameObject.Find("PiriAimFront").gameObject;
    AimSideTarget = GameObject.Find("PiriAimSide").gameObject;

    lastVelocity = 0;

    GroundClearance = 2;
	targetRigidbody = thisTransform.gameObject;
	PiriStill = false;
	Landing = false;
	WorldInformation.UsingVessel = false;
	CanMove = true;
	CanFPAnimationaise = false;
	
if(WorldInformation.isWearingBackpack){
var Prefabionaise0 = Resources.Load("Objects/" + WorldInformation.whatBackpack, GameObject) as GameObject;
var TheThing0 = Instantiate(Prefabionaise0, PlayerInformation.instance.BackpackPoint.position, PlayerInformation.instance.BackpackPoint.rotation);
TheThing0.name = WorldInformation.whatBackpack;
TheThing0.transform.GetComponent(BackpackScript).GetWorn();
}









}

function Timer() {
    GroundClearance = 0.5;
    yield WaitForSeconds(1);
    Jumping = false;
    GroundClearance = 2;
}

function Timer2() {
	yield WaitForSeconds(0.8);
	Landing = false;
	PiriAni.CrossFade(Idling, 0.5f);
}

function Timer3() {
    PiriWheel.spring.damper = 2;
    thisRigidbody.constraints = RigidbodyConstraints.FreezeRotationX 
                      | RigidbodyConstraints.FreezeRotationZ;
	yield WaitForSeconds(3.3);
	if (keyW || keyA || keyS || keyD){
	CanMove = true;
	CanFPAnimationaise = false;
	thisRigidbody.constraints = RigidbodyConstraints.None;
	}
	yield WaitForSeconds(0.5);
	CanMove = true;
	CanFPAnimationaise = false;
	thisRigidbody.constraints = RigidbodyConstraints.None;
}

function Timer4() {
    var TheThing = Instantiate(KickSoundPrefab, thisTransform.position, thisTransform.rotation);
    TheThing.transform.parent = thisTransform;
	yield WaitForSeconds(0.4);
	
	var hit : RaycastHit;
	if (Physics.Raycast (KickArea.transform.position + -KickArea.transform.forward * 0.5, KickArea.transform.forward, hit, 1.2, targetLayers)){
	var TheThing2 = Instantiate(KickPrefab, KickArea.transform.position, KickArea.transform.rotation);
	TheThing2.transform.parent = thisTransform;
	if(hit.rigidbody)
	hit.rigidbody.AddForceAtPosition (thisTransform.forward * 4, hit.point);
	}
	yield WaitForSeconds(0.5);
	PiriAni.CrossFade(Idling);
	yield WaitForSeconds(0.3);
	CanMove = true;
}

function Update() {

if(WorldInformation.PiriIsHurt)
return;

inInterface = CameraScript.InInterface;

keyW = false;
keyA = false;
keyS = false;
keyD = false;

if(!inInterface) {

if (Input.GetKey("w"))
keyW = true;
if (Input.GetKey("a"))
keyA = true;
if (Input.GetKey("s"))
keyS = true;
if (Input.GetKey("d"))
keyD = true;

}

if (!Jumping){

    if (Physics.Raycast(PiriBaseTF.position + -PiriBaseTF.forward * 0.1 + PiriBaseTF.up * 1, -PiriBaseTF.up, 1.05, targetLayers) ||
		Physics.Raycast(PiriBaseTF.position + PiriBaseTF.forward * 0.2 + PiriBaseTF.up * 1, -PiriBaseTF.up, 1.05, targetLayers) ||
		Physics.Raycast(PiriBaseTF.position + PiriBaseTF.right * 0.15 + PiriBaseTF.up * 1, -PiriBaseTF.up, 1.05, targetLayers) ||
		Physics.Raycast(PiriBaseTF.position + -PiriBaseTF.right * 0.15 + PiriBaseTF.up * 1, -PiriBaseTF.up, 1.05, targetLayers)){
		OnGround = true;
		PiriGrounded = true;
	}else{
		OnGround = false;
		PiriGrounded = false;
    }
    
if (Physics.Raycast(PiriBaseTF.position + PiriBaseTF.up * 0.2, PiriBaseTF.forward, 0.6, targetLayers) &&
    !Physics.Raycast(PiriBaseTF.position + PiriBaseTF.up * 1, PiriBaseTF.forward, 1, targetLayers)){
		OnGround = true;
		PiriGrounded = true;
		}
}
		
if (Physics.Raycast(PiriHeadTF.position, Vector3.down, 1.5, WtargetLayers)){
		InWater = true;
		}else{
		InWater = false;
		}

if (WorldInformation.UsingVessel){
		
if (!Input.GetMouseButton(1)){
TStabilizeForce = 1;
thisRigidbody.angularDrag = 1;
if(UsingMotus)
PiriAni.CrossFade(RidingMotus);
else
PiriAni.CrossFade(RidingCepstol);
}else{
TStabilizeForce = 1;
thisRigidbody.angularDrag = 32;
PiriAni.Stop();
}
	
	}else{
	
if(Transit){
Transit = false;
PiriFloating = false;
Jumping = false;
PiriAni.CrossFade(Idling);
}

if (WorldInformation.FPMode){
AimingForward = true;

thisRigidbody.drag = 0;

pivotTF.localEulerAngles.y = 0;
//pivotHinge.spring.targetPosition = 0;

if (keyW){

if (keyA){
pivotTF.localEulerAngles.y = -45;
//pivotHinge.spring.targetPosition = -45;
}
if (keyD){
pivotTF.localEulerAngles.y = 45;
//pivotHinge.spring.targetPosition = 45;
}
}else{

if (keyS){

pivotTF.localEulerAngles.y = 180;
//pivotHinge.spring.targetPosition = 180;

if (keyA){
pivotTF.localEulerAngles.y = -135;
//pivotHinge.spring.targetPosition = -135;
}
if (keyD){
pivotTF.localEulerAngles.y = 135;
//pivotHinge.spring.targetPosition = 135;
}
}else{
if (keyA){
pivotTF.localEulerAngles.y = -90;
//pivotHinge.spring.targetPosition = -90;
}
if (keyD){
pivotTF.localEulerAngles.y = 90;
//pivotHinge.spring.targetPosition = 90;
}
}

}

}else{

thisRigidbody.drag = 0.1;

pivotTF.localEulerAngles.y = 0;
//pivotHinge.spring.targetPosition = 0;

if (Input.GetMouseButton(1)){
if (keyW){

if (keyA){
pivotTF.localEulerAngles.y = -45;
//pivotHinge.spring.targetPosition = -45;
}
if (keyD){
pivotTF.localEulerAngles.y = 45;
//pivotHinge.spring.targetPosition = 45;
}
}else{

if (keyS){

pivotTF.localEulerAngles.y = 180;
//pivotHinge.spring.targetPosition = 180;

if (keyA){
pivotTF.localEulerAngles.y = -135;
//pivotHinge.spring.targetPosition = -135;
}
if (keyD){
pivotTF.localEulerAngles.y = 135;
//pivotHinge.spring.targetPosition = 135;
}
}else{
if (keyA){
pivotTF.localEulerAngles.y = -90;
//pivotHinge.spring.targetPosition = -90;
}
if (keyD){
pivotTF.localEulerAngles.y = 90;
//pivotHinge.spring.targetPosition = 90;
}
}

}

}
}

if(!inInterface) {

		if (Input.GetMouseButtonDown(1)){
			AimingForward = true;
			AimingBack = false;
			AimingLeft = false;
			AimingRight = false;
			}
	    if (Input.GetMouseButtonUp(1)){
			AimingForward = false;
			AimingBack = false;
			AimingLeft = false;
			AimingRight = false;
			}
}

	if(!inInterface && !Input.GetMouseButton(1) && !WorldInformation.FPMode) {

    if (Input.GetKeyDown("w"))
	TStabilizeForce = 0;
    if (Input.GetKeyDown("s"))
    TStabilizeForce = 0;
    if (Input.GetKeyDown("a"))
    TStabilizeForce = 0;
    if (Input.GetKeyDown("d"))
    TStabilizeForce = 0;

			if (keyW)
				AimingForward = true;
			if (keyS){
			if (!Carrying)
				AimingBack = true;
				else
				AimingForward = true;
				}
			if (keyA)
				AimingLeft = true;
			if (keyD)
				AimingRight = true;
				
		if (Input.GetKeyUp("w")){
			AimingForward = false;
			TStabilizeForce = 0;
			}
		if (Input.GetKeyUp("s")){
			AimingBack = false;
			TStabilizeForce = 0;
			}
		if (Input.GetKeyUp("a")){
			AimingLeft = false;
			TStabilizeForce = 0;
			}
		if (Input.GetKeyUp("d")){
			AimingRight = false;
			TStabilizeForce = 0;
			}
	}

if (OnGround)
GroundClearance = 2;

thisRigidbody.angularDrag = 48;

if (!CanMove)
     return;

	var _velocity : Vector3 = onMovingGround ? targetRigidbody.rigidbody.velocity - groundRigidbody.velocity : targetRigidbody.rigidbody.velocity;
	relative = thisTransform.InverseTransformDirection(_velocity) / 2;
	
	if (Physics.Raycast(PiriBaseTF.position + PiriBaseTF.up * 1.8, Vector3.down, GroundClearance, targetLayers))
	    CloseToGround = true;
	else
	    CloseToGround = false;

    if (Landing && Input.GetMouseButton(1))
    CanFPAnimationaise = false;
    
    if(WorldInformation.IsNopass)
    CanFPAnimationaise = false;
	

if (Input.GetKeyDown(KeyCode.Space) && !Input.GetMouseButton(1)) {
        if (!inInterface){
		if (!InWater) {
		if (!PiriFloating && CanMove && PiriGrounded && OnGround) {
		    targetRigidbody = transform.gameObject;
		    thisRigidbody.AddForce(thisTransform.up * JumpForce);
			PiriAni.Stop();
			PiriAni.Play(jump);
			onMovingGround = false;
			Jumping = true;
			OnGround = false;
		    PiriGrounded = false;
		    CanIdle = false;
			GroundClearance = 2;
			StopAllCoroutines();
			Pauser();
			Timer();
			}
		}else{
		    targetRigidbody = transform.gameObject;
		    thisRigidbody.AddForce(thisTransform.up * JumpForce);
			PiriAni.Stop();
			PiriAni.Play(jump);
			onMovingGround = false;
			Jumping = true;
			OnGround = false;
		    PiriGrounded = false;
		    CanIdle = false;
			GroundClearance = 2;
			StopAllCoroutines();
			Pauser();
			Timer();
		}
		if(Carrying){
	        if(CarryJoint)
            Destroy(CarryJoint);
            Carrying = false;
            WorldInformation.isHolding = false;
            PiriCapCol.enabled = true;
            PiriWheelCol.enabled = true;
            }
		}
    }
    
if (Input.GetMouseButtonDown(0)) {
if (!inInterface){
	
	if(Carrying){
	    if(CarryJoint)
        Destroy(CarryJoint);
        Carrying = false;
        WorldInformation.isHolding = false;
        PiriCapCol.enabled = true;
        PiriWheelCol.enabled = true;
        
        PiriBoxCol.center = Vector3(0, -0.2, 0);
        PiriBoxCol.size = Vector3(0.4, 2.1, 0.4);
        PiriAni.CrossFade(Idling);
        }else{
    if(!FurtherActionScript.IsActive){
    if (!Input.GetMouseButton(1) && !PiriFloating && CanMove && PiriGrounded) {
			CanMove = false;
			PiriAni.CrossFade(kick);
			Timer4();
			return;
	}
    }
    
    }
	}
	}
	
if (Input.GetMouseButtonUp(0)) {
	
	if(!Carrying){
    if(FurtherActionScript.FurtherActionLMB){
    
    var CRB : Rigidbody;
    
    var hitC : RaycastHit;
    var hitC2 : RaycastHit;
    
    var LastCDist : float;
    
    var C2Dist : float;
    
    var DidHit : boolean;
    var BotObs : boolean;
    var IsOk : boolean;
    
    CarryPointTF.localPosition.y = 0;
    
    if (Physics.Raycast (CarryPointTF.position + CarryPointTF.forward * -0.3 , CarryPointTF.forward, hitC, 1, CtargetLayers)){
    if(hitC.rigidbody){ 
    if (Physics.Raycast (CarryPointTF.position + CarryPointTF.forward * 0.7 , -RayPointTF.up, hitC2, 2, CtargetLayers)){
    BotObs = true;
    CRB = hitC.rigidbody;
    IsOk = true;
    }
    }
    }
    
    if(!IsOk){
    if (Physics.Raycast (RayPointTF.position + RayPointTF.forward * 0.1 , RayPointTF.up, hitC2, 2, CtargetLayers) ||
        Physics.Raycast (RayPointTF.position + RayPointTF.forward * 0.2 , RayPointTF.up, hitC2, 2, CtargetLayers) ||
        Physics.Raycast (RayPointTF.position + RayPointTF.forward * 0.3 , RayPointTF.up, hitC2, 2, CtargetLayers) ||
        Physics.Raycast (RayPointTF.position + RayPointTF.forward * 0.4 , RayPointTF.up, hitC2, 2, CtargetLayers) ||
        Physics.Raycast (RayPointTF.position + RayPointTF.forward * 0.5 , RayPointTF.up, hitC2, 2, CtargetLayers) ||
        Physics.Raycast (RayPointTF.position + RayPointTF.forward * 0.6 , RayPointTF.up, hitC2, 2, CtargetLayers) ||
        Physics.Raycast (RayPointTF.position + RayPointTF.forward * 0.7 , RayPointTF.up, hitC2, 2, CtargetLayers) ||
        Physics.Raycast (RayPointTF.position + RayPointTF.forward * 0.8 , RayPointTF.up, hitC2, 2, CtargetLayers) ||
        Physics.Raycast (RayPointTF.position + RayPointTF.forward * 0.9 , RayPointTF.up, hitC2, 2, CtargetLayers) ||
        Physics.Raycast (RayPointTF.position + RayPointTF.forward * 1 , RayPointTF.up, hitC2, 2, CtargetLayers)){
    if(hitC2.rigidbody){
    C2Dist = hitC2.distance;
    
    CarryPointTF.localPosition.y = RayPointTF.localPosition.y;
    CarryPointTF.localPosition.y += C2Dist;
    
    }
    }
    }
    
    if(!IsOk){
    if (Physics.Raycast (CarryPointTF.position + CarryPointTF.forward * -0.3 , CarryPointTF.forward, hitC, 1, CtargetLayers))
    if(hitC.rigidbody){ LastCDist = hitC.distance; CarryPointTF.localPosition.y += 0.1; CRB = hitC.rigidbody; DidHit = true; }

    if (Physics.Raycast (CarryPointTF.position + CarryPointTF.forward * -0.3 , CarryPointTF.forward, hitC, 1, CtargetLayers)){
    if(hitC.rigidbody){ if(hitC.distance < LastCDist){ LastCDist = hitC.distance; }else{ IsOk = true; }
    CarryPointTF.localPosition.y += 0.1;
    }
    }else{
    if(DidHit)
    IsOk = true;
    }
    }
    
    if(!IsOk){
    if (Physics.Raycast (CarryPointTF.position + CarryPointTF.forward * -0.3 , CarryPointTF.forward, hitC, 1, CtargetLayers)){
    if(hitC.rigidbody){ if(hitC.distance < LastCDist){ LastCDist = hitC.distance; }else{ IsOk = true; }
    CarryPointTF.localPosition.y += 0.1;
    }
    }
    }
    if(!IsOk){
    if (Physics.Raycast (CarryPointTF.position + CarryPointTF.forward * -0.3 , CarryPointTF.forward, hitC, 1, CtargetLayers)){
    if(hitC.rigidbody){ if(hitC.distance < LastCDist){ LastCDist = hitC.distance; }else{ IsOk = true; }
    CarryPointTF.localPosition.y += 0.1;
    }
    }
    }
    if(!IsOk){
    if (Physics.Raycast (CarryPointTF.position + CarryPointTF.forward * -0.3 , CarryPointTF.forward, hitC, 1, CtargetLayers)){
    if(hitC.rigidbody){ if(hitC.distance < LastCDist){ LastCDist = hitC.distance; }else{ IsOk = true; }
    CarryPointTF.localPosition.y += 0.1;
    }
    }
    }
    if(!IsOk){
    if (Physics.Raycast (CarryPointTF.position + CarryPointTF.forward * -0.3 , CarryPointTF.forward, hitC, 1, CtargetLayers)){
    if(hitC.rigidbody){ if(hitC.distance < LastCDist){ LastCDist = hitC.distance; }else{ IsOk = true; }
    CarryPointTF.localPosition.y += 0.1;
    }
    }
    }
    if(!IsOk){
    if (Physics.Raycast (CarryPointTF.position + CarryPointTF.forward * -0.3 , CarryPointTF.forward, hitC, 1, CtargetLayers)){
    if(hitC.rigidbody){ if(hitC.distance < LastCDist){ LastCDist = hitC.distance; }else{ IsOk = true; }
    CarryPointTF.localPosition.y += 0.1;
    }
    }
    }
    if(!IsOk){
    if (Physics.Raycast (CarryPointTF.position + CarryPointTF.forward * -0.3 , CarryPointTF.forward, hitC, 1, CtargetLayers)){
    if(hitC.rigidbody){ if(hitC.distance < LastCDist){ LastCDist = hitC.distance; }else{ IsOk = true; }
    CarryPointTF.localPosition.y += 0.1;
    }
    }
    }
    
    if(CRB)
    if(CRB.mass > 0.1 && -CarryPointTF.localPosition.y > 0.5)
    IsOk = false;

	if(IsOk){
	
	CarryJoint = gameObject.AddComponent ("ConfigurableJoint");
    CarryJoint.connectedBody = CRB;
    CarryJoint.xDrive.mode = JointDriveMode.Position;
    CarryJoint.yDrive.mode = JointDriveMode.Position;
    CarryJoint.zDrive.mode = JointDriveMode.Position;
    CarryJoint.angularXDrive.mode = JointDriveMode.Position;
    CarryJoint.angularYZDrive.mode = JointDriveMode.Position;
   
    CarryJoint.xDrive.positionSpring = 1;
    CarryJoint.yDrive.positionSpring = 1;
    CarryJoint.zDrive.positionSpring = 1;
    
    CarryJoint.angularXDrive.positionSpring = 1;
    CarryJoint.angularYZDrive.positionSpring = 1;
   
    CarryJoint.xDrive.positionDamper = 0.05;
    CarryJoint.yDrive.positionDamper = 0.1;
    CarryJoint.zDrive.positionDamper = 0.05;
    
    CarryJoint.angularXDrive.positionDamper = 0.05;
    CarryJoint.angularYZDrive.positionDamper = 0.05;
    
    CarryJoint.targetPosition.z = -hitC.distance + 0.3;
    
    Carrying = true;
    
    WorldInformation.isHolding = true;
    
    DidHit = false;
    IsOk = false;
    
    if(CRB.mass > 0.1){
    HeavyCarry = true;
    PiriCapCol.enabled = false;
    PiriWheelCol.enabled = false;
    PiriAni.CrossFade(HoldingOn, 0.5f);
    CarryJoint.targetPosition.y = -CarryPointTF.localPosition.y;
    
    PiriBoxCol.center = Vector3(0, 0.3, 0);
    PiriBoxCol.size = Vector3(0.4, 1.1, 0.4);
    }else{
    HeavyCarry = false;
    PiriCapCol.enabled = true;
    PiriWheelCol.enabled = true;
    PiriAni.CrossFade(Holding);
    
    if(!BotObs)
    CarryJoint.targetPosition.y += 1.6;
    
    CarryJoint.targetPosition.y -= C2Dist;
    }
    
    CRB = null;
    BotObs = false;
    C2Dist = 0;
    CarryPointTF.localPosition.y = 0;
    
    }
    }
       
    }
    
    }
    
	if (PiriStill && CanFPAnimationaise) {
		if (relative.z > 0.4) {
			PiriAni.CrossFade(GunWalk);
			PiriAni[GunWalk].speed = Mathf.Clamp(Mathf.Abs(relative.z) / forwardSpeed, 1, maxAnimationSpeed);
		}
		if (-relative.z > 0.4) {
			PiriAni.CrossFade(GunWalk);
			PiriAni[GunWalk].speed = Mathf.Clamp(Mathf.Abs(-relative.z) / -forwardSpeed, -1, -maxAnimationSpeed);
		}
		if (relative.x > 0.4 || -relative.x > 0.4) {
			PiriAni.CrossFade(GunStrafe);
			PiriAni[GunStrafe].speed = Mathf.Clamp(Mathf.Abs(relative.z) / forwardSpeed, 1, maxAnimationSpeed);
		}
		if (relative.z < 0.4 && -relative.z < 0.4 && relative.x < 0.4 && -relative.x < 0.4) {
			PiriAni.CrossFade(GunStill);
		}
	}
	
	if (!Jumping){
	if (PiriFloating){
	if (!CanFPAnimationaise && CanMove) {
	
	if (thisRigidbody.velocity.magnitude < 15){
	if (relative.z > 0.4){
	if (InWater){
		PiriAni.CrossFade(swimming, 0.8f);
		}else{
		if(!Carrying)
	    PiriAni.CrossFade(floatingF, 1f);
	    else
	    PiriAni.CrossFade(HoldingOn, 0.5f);
		}
		}
	if (relative.z < 0.4){
	if(!Carrying)
	    PiriAni.CrossFade(floating, 1f);
	    else
	    PiriAni.CrossFade(HoldingOn, 0.5f);
	    }
	}else{
	if(!Carrying)
	PiriAni.CrossFade(falling, 1f);
	else
	PiriAni.CrossFade(HoldingOn, 0.5f);
	}
	}
	
    if (PiriGrounded){
            PiriFloating = false;
            Landing = false;
            if (!Input.GetMouseButton(1))
	        PiriAni.CrossFade(Idling);
            }
    }else{
    if (!PiriGrounded)
        PiriFloating = true;
    }
    }else{
    if (PiriGrounded){
            PiriAni.CrossFade(land, 0.4f);
            Timer2();
            }else{
            PiriFloating = true;
            }
    }
    
    if(!inInterface){
    
    if (Input.GetMouseButtonUp(1)){
	if (!PiriFloating){
		PiriAni.CrossFade(Idling);
		CanFPAnimationaise = false;
		}else{
		PiriAni.CrossFade(floating);
		CanFPAnimationaise = false;
		}
		}
		
	if (Input.GetMouseButtonDown(1) && !Landing){
		PiriAni.Stop();
		CanFPAnimationaise = true;
		
		if(Carrying){
	    if(CarryJoint)
        Destroy(CarryJoint);
        Carrying = false;
        WorldInformation.isHolding = false;
        PiriCapCol.enabled = true;
        PiriWheelCol.enabled = true;
        
        PiriBoxCol.center = Vector3(0, -0.2, 0);
        PiriBoxCol.size = Vector3(0.4, 2.1, 0.4);
        }
		}
		
		}

	if (Input.GetMouseButton(1) && Input.GetKeyDown(KeyCode.I) || Input.GetMouseButton(1) && Input.GetMouseButton(2)){
	if(!Carrying){
    PiriAni.Play(Idling);
    }else{
    if(!HeavyCarry)
    PiriAni.Play(Holding);
    else
    PiriAni.Play(HoldingOn);
    }
	CanFPAnimationaise = false;
	}
		
	if(CanFPAnimationaise)
    if(!Input.GetMouseButton(1)){
    CanFPAnimationaise = false;
    if(!Carrying){
    PiriAni.Play(Idling);
    }else{
    if(!HeavyCarry)
    PiriAni.Play(Holding);
    else
    PiriAni.Play(HoldingOn);
    }
    }
	
	if (PiriGrounded && !CanFPAnimationaise && !PiriFloating) {
			
		if (Input.GetKeyUp("w") && !keyA && !keyS && !keyD){
			if(!Carrying){
			PiriAni.CrossFade(Idling);
			}else{
			if(!HeavyCarry)
    PiriAni.CrossFade(Holding);
    else
    PiriAni.CrossFade(HoldingOn);
    }
			}

		if (Input.GetKeyUp("a") && !keyW && !keyS && !keyD){
			if(!Carrying){
			PiriAni.CrossFade(Idling);
			}else{
			if(!HeavyCarry)
    PiriAni.CrossFade(Holding);
    else
    PiriAni.CrossFade(HoldingOn);
    }
			}

		if (Input.GetKeyUp("d") && !keyW && !keyA && !keyS){
			if(!Carrying){
			PiriAni.CrossFade(Idling);
			}else{
			if(!HeavyCarry)
    PiriAni.CrossFade(Holding);
    else
    PiriAni.CrossFade(HoldingOn);
    }
			}

		if (Input.GetKeyUp("s") && !keyW && !keyA && !keyD){
			if(!Carrying){
			PiriAni.CrossFade(Idling);
			}else{
			if(!HeavyCarry)
    PiriAni.CrossFade(Holding);
    else
    PiriAni.CrossFade(HoldingOn);
    }
			}

if (inInterface){
if (!once){
if(!Carrying){
PiriAni.CrossFade(Idling);
}else{
if(!HeavyCarry)
PiriAni.CrossFade(Holding);
else
PiriAni.CrossFade(HoldingOn);
}

keyW = false;
keyA = false;
keyS = false;
keyD = false;

once = true;
}
}else{
once = false;
}

}
	
	if (!keyW && !keyA && !keyS && !keyD)
		return;

	if (CanFPAnimationaise || PiriFloating || !PiriGrounded)
		return;
		
	if (relative.z > relative.x && relative.z < 0.4) {
		CanIdle = true;
	} else if (relative.z > relative.x && relative.z > 0.4) {
		CanIdle = false;
	}
	
	//relative.z > relative.x && 
	if (relative.z > 0.4) {
		if (relative.z < 2.5) {
			if (state != pState.WalkForward) {
			if(!Carrying){
				PiriAni.CrossFade(forward);
				}else{
				if(!HeavyCarry)
				PiriAni.CrossFade(HoldingW);
				}
				state = pState.WalkForward;
			}
			if(!Carrying){
			if (PiriAni.IsPlaying(forward))
				PiriAni[forward].speed = Mathf.Clamp(Mathf.Abs(relative.z) / forwardSpeed, 0, maxAnimationSpeed);
				}else{
				if (PiriAni.IsPlaying(HoldingW))
				PiriAni[HoldingW].speed = Mathf.Clamp(Mathf.Abs(relative.z) / forwardSpeed, 0, maxAnimationSpeed);
				}
		} else {
			if (state != pState.Sprinting) {
			if(!Carrying){
				PiriAni.CrossFade(sprint);
				}else{
				if(!HeavyCarry)
				PiriAni.CrossFade(HoldingW);
				}
				state = pState.Sprinting;
			}
			if(!Carrying){
			if (PiriAni.IsPlaying(sprint))
				PiriAni[sprint].speed = Mathf.Clamp(Mathf.Abs(relative.z) / sprintSpeed, 0, maxAnimationSpeed);
				}else{
				if (PiriAni.IsPlaying(HoldingW))
				PiriAni[HoldingW].speed = Mathf.Clamp(Mathf.Abs(relative.z) / sprintSpeed, 0, maxAnimationSpeed);
				}
		}
		reset();
		state = pState.Idling;
	}
	
	if(Carrying)
	if (-relative.z > 0.4){
	if(!HeavyCarry)
	PiriAni.CrossFade(HoldingW);
	PiriAni[HoldingW].speed = -Mathf.Abs(-relative.z) / forwardSpeed;
	}
	
}
}

function reset() {
	if (relative.x < 0.8 && relative.z < 0.8) {
		if (!PiriAni.IsPlaying(Idling)) {
			state = pState.Idling;
		}
	}
}

function FixedUpdate() {

var localAngVel = thisTransform.InverseTransformDirection(thisRigidbody.angularVelocity);

acceleration = (thisRigidbody.velocity.magnitude - lastVelocity) / Time.deltaTime;
lastVelocity = thisRigidbody.velocity.magnitude;

var RPVelClamp = Mathf.Clamp(lastVelocity * 0.035,0,128);

var RPVC = 0.75 + RPVelClamp;
    
Gs = acceleration;

if (!WorldInformation.UsingVessel) {

if (OnGround){
if(AimingForward || AimingBack || AimingLeft || AimingRight)
if(TStabilizeForce < 8)
TStabilizeForce += 0.5;
}else{
TStabilizeForce = 2;
}

if(!onMovingGround){
var VelClamp1 = Mathf.Clamp(lastVelocity,0,8);
thisRigidbody.AddTorque(thisTransform.forward * -localAngVel.y * VelClamp1 * 0.3);
}else{
var VelClamp2 = Mathf.Clamp(relative.magnitude,0,8);
thisRigidbody.AddTorque(thisTransform.forward * -localAngVel.y * VelClamp2 * 0.3);
}

if(Gs < -2500)
if (!WorldInformation.PiriIsHurt) {
        CanCollide = false;
        Pauser();
		CanFPAnimationaise = false;
	    PiriUpperBodyController.Resetting = true;
		CanMove = false;
		PiriAni.Stop();
		PiriAni.CrossFade("PiriArmature|Faceplant");
        var TheThing4 = Instantiate(Faceplant, FaceplantArea.transform.position, FaceplantArea.transform.rotation);
        TheThing4.transform.parent = thisTransform;
        PiriFloating = false;
        Timer3();
		Hurt2();
}

if (CanCollide){
    if(Gs < -500){
    CanCollide = false;
    Pauser();
            CanFPAnimationaise = false;
			PiriUpperBodyController.Resetting = true;
			CanMove = false;
			PiriAni.Stop();
			PiriAni.CrossFade("PiriArmature|Faceplant");
            var TheThing5 = Instantiate(Faceplant, FaceplantArea.transform.position, FaceplantArea.transform.rotation);
            TheThing5.transform.parent = thisTransform;
            PiriFloating = false;
			Timer3();
    }
}

if (CanCollide && CanMove && !Input.GetMouseButton(1)){
    if(Gs < -200){
    CanCollide = false;
    Pauser();
			CanFPAnimationaise = false;
			PiriUpperBodyController.Resetting = true;
			PiriAni.Stop();
			if (!Input.GetMouseButton(1))
			PiriAni.Play(land);
			Landing = true;
			PiriGrounded = true;
			PiriFloating = false;
			Timer2();
    }
}
}

	if (Input.GetMouseButton(1) && WorldInformation.UsingVessel && CanMove && !inInterface) {
		thisRigidbody.AddForceAtPosition((AimTarget.transform.position - thisTransform.position).normalized * TStabilizeForce, thisTransform.forward * 1);
		thisRigidbody.AddForceAtPosition((AimTarget.transform.position - thisTransform.position).normalized * -TStabilizeForce, -thisTransform.forward * 1);
	}
	
if(CloseToGround){

if (!WorldInformation.UsingVessel){
    thisRigidbody.AddForceAtPosition(Vector3.up * StabilizeForce, thisTransform.up * 2);
	thisRigidbody.AddForceAtPosition(-Vector3.up * StabilizeForce, -thisTransform.up * 2);
	}
	}else{
	thisRigidbody.AddForceAtPosition(Vector3.up * StabilizeForce, thisTransform.up * 0.2);
	thisRigidbody.AddForceAtPosition(-Vector3.up * StabilizeForce, -thisTransform.up * 0.2);
	}

	if (CanMove && !WorldInformation.UsingVessel){
		
    if (AimingForward && thisRigidbody.angularVelocity.magnitude < 5) {
		thisRigidbody.AddForceAtPosition((AimTarget.transform.position - thisTransform.position).normalized * TStabilizeForce, thisTransform.forward * 1);
		thisRigidbody.AddForceAtPosition((AimTarget.transform.position - thisTransform.position).normalized * -TStabilizeForce, -thisTransform.forward * 1);
	}

	if (AimingBack && thisRigidbody.angularVelocity.magnitude < 5) {
		thisRigidbody.AddForceAtPosition((AimTarget.transform.position - thisTransform.position).normalized * TStabilizeForce, -thisTransform.forward * 1);
		thisRigidbody.AddForceAtPosition((AimTarget.transform.position - thisTransform.position).normalized * -TStabilizeForce, thisTransform.forward * 1);
	}

	if (AimingLeft && thisRigidbody.angularVelocity.magnitude < 5) {
		thisRigidbody.AddForceAtPosition((AimSideTarget.transform.position - thisTransform.position).normalized * TStabilizeForce, -thisTransform.forward * 1);
		thisRigidbody.AddForceAtPosition((AimSideTarget.transform.position - thisTransform.position).normalized * -TStabilizeForce, thisTransform.forward * 1);
	}

	if (AimingRight && thisRigidbody.angularVelocity.magnitude < 5) {
		thisRigidbody.AddForceAtPosition((AimSideTarget.transform.position - thisTransform.position).normalized * TStabilizeForce, thisTransform.forward * 1);
		thisRigidbody.AddForceAtPosition((AimSideTarget.transform.position - thisTransform.position).normalized * -TStabilizeForce, -thisTransform.forward * 1);
	}
	
var newRot : Vector3 = (-thisLevelTransform.up * 2 + -thisLevelTransform.forward * 2).normalized;

Debug.DrawRay (steppypoint.position + thisLevelTransform.forward * 0.75, newRot * 0.5, Color.white);

if(OnGround){
	if (keyW || keyA || keyS || keyD) {
		var _velocity : Vector3 = onMovingGround ? thisRigidbody.velocity - groundRigidbody.velocity : thisRigidbody.velocity;

if (!inInterface) {

if (WorldInformation.FPMode){

if (Physics.Raycast (steppypoint.position + thisLevelTransform.forward * 0.75, newRot, 0.5, targetLayers)){
	thisRigidbody.AddForce(thisTransform.up * 1.5);
    thisRigidbody.AddForce(thisTransform.forward * 2);
}

}else{

if (_velocity.magnitude < 4) {
if (_velocity.magnitude < 2) {
if (Physics.Raycast (steppypoint.position + thisLevelTransform.forward * 0.75, newRot, 0.5, targetLayers)){
	thisRigidbody.AddForce(thisTransform.up * 1.5);
    thisRigidbody.AddForce(thisTransform.forward * 1.5);
}
}else{
if (Physics.Raycast (steppypoint.position + thisLevelTransform.forward * 0.75, newRot, 0.5, targetLayers)){
	thisRigidbody.AddForce(thisTransform.up * 1);
    thisRigidbody.AddForce(thisTransform.forward * 1);
}
}
}

}

		if (PiriWheelRB.angularVelocity.magnitude < 7) {
		    
		    if(Carrying){
		    if(Input.GetKey("s")){
		    if(!WorldInformation.FPMode){
	        if(RotForce > -0.5)
			RotForce -= 0.02;
			}else{
			if(RotForce < 0.5)
			RotForce += 0.02;
			}
			}else{
			if(RotForce < 0.5)
			RotForce += 0.02;
			}
			}else{
		    if(RotForce < 1)
			RotForce += 0.02;
			}
			
		}else{
		
		if (PiriWheelRB.angularVelocity.magnitude < 19){
		
		if(Carrying){
	    
	    if(Input.GetKey("s")){
	    if(!WorldInformation.FPMode){
	    if(RotForce < 0)
	    RotForce += 0.02;
	    }else{
	    if(RotForce > 0)
	    RotForce -= 0.02;
	    }
		}else{
		if(RotForce > 0)
	    RotForce -= 0.02;
		}
	    
		}else{
		
		if(!Input.GetKey(KeyCode.LeftShift)){
		if(RotForce > 0)
		RotForce -= 0.02;
		}else{
		if (!Input.GetMouseButton(1)){
		if(RotForce < 0.5)
		RotForce += 0.02;
		}else{
		if(RotForce > 0)
	    RotForce -= 0.02;
		}
		}
		}
		
		}else{
		if(RotForce > 0)
	    RotForce -= 0.02;
		}
		
		    if(PiriWheel.spring.damper < 0.001)
		    PiriWheel.spring.damper += 0.0001;
		
		}
		
		if(PiriWheel.spring.damper > 0.001)
		PiriWheel.spring.damper = 0.001;
		
		PiriWheelRB.AddTorque(pivotRB.transform.right * RotForce);
        
        if(BrakeJoint)
        Destroy(BrakeJoint);
        
		Moving = true;
		
}else{
Moving = false;
if(CanMove)
PiriWheel.spring.damper = 8;
RotForce = 0;
}
	} else if (!keyW && !keyA && !keyS && !keyD) {
		if(!BrakeJoint){
		BrakeJoint = PlayerInformation.instance.PiriWheel.AddComponent ("FixedJoint");
        BrakeJoint.connectedBody = pivotRB;
        }
		Moving = false;
		if(CanMove)
		PiriWheel.spring.damper = 8;
		
		RotForce = 0;
	}
}else{

if(WorldInformation.instance.AreaSpace){
if (keyW || keyS || keyA || keyD)
			thisRigidbody.AddForce(thisTransform.forward * 0.1);
if (Input.GetKey(KeyCode.LeftShift))
            thisRigidbody.AddForce(thisTransform.up * -0.1);
if (Input.GetKey(KeyCode.Space))
            thisRigidbody.AddForce(thisTransform.up * 0.1);
}else{
if(InWater)
if (keyW || keyS || keyA || keyD)
thisRigidbody.AddForce(thisTransform.forward * 0.5);
}
}

//-------------------------------------------------------------------------------------------------------------------------|

	var hit: RaycastHit;
	if (Physics.Raycast(PiriBaseTF.position + PiriBaseTF.up * 1, -PiriBaseTF.up, hit, 5, targetLayers) && hit.rigidbody) {
		if (hit.rigidbody.velocity.magnitude > 2) {
			onMovingGround = true;
			groundRigidbody = hit.rigidbody;
		
		if (relative.magnitude < 1){
		if(StabilizeForce < 50)
		StabilizeForce += 1;
		}else{
		StabilizeForce = 10;
		}
			
		}else{
		
		if (thisRigidbody.velocity.magnitude < 1){
	    if(StabilizeForce < 50)
		StabilizeForce += 1;
	    }else{
	    StabilizeForce = 10;
	    }
		
		}
		
	}else{
	
	    if (thisRigidbody.velocity.magnitude < 1){
	    if(StabilizeForce < 50)
		StabilizeForce += 1;
	    }else{
	    StabilizeForce = 10;
	    }
		onMovingGround = false;
		groundRigidbody = thisRigidbody;
	}
	
	if(groundRigidbody == null){
	groundRigidbody = thisRigidbody;
	onMovingGround = false;
	}

}

//-------------------------------------------------------------------------------------------------------------------------|

if(!WorldInformation.PiriIsHurt){

	if (!CanIdle || WorldInformation.UsingVessel || Performing)
		return;

	if (PiriStill || Landing || PiriFloating  || !CanMove)
		return;

	if (Count < 2.5)
		return;
		
		Count = 0;

	var randomValue: int = Random.Range(0, 10);

	switch (randomValue) {
		case 1: //when randomValue is 1
		if (!WorldInformation.FPMode && !Carrying){
			aState = eState.Idle2;
				PiriAni.CrossFade(Idling2);
				StopCoroutine("Jiggle");
				Jiggle();
				}
			break;
		case 2: //when randomValue is 2
		if (!WorldInformation.FPMode && !Carrying){
			aState = eState.Idle3;
				PiriAni.CrossFade(Idling2);
				StopCoroutine("Jiggle");
				Jiggle();
				}
			break;
		default: //When randomValue is not 1 or 2
		if (!Carrying){
			aState = eState.Idle;
			PiriAni.CrossFade(Idling);
			}else{
			if(!HeavyCarry)
    PiriAni.CrossFade(Holding);
    else
    PiriAni.CrossFade(HoldingOn);
    }
			break;
	}
}

}

function Jiggle (){
yield WaitForSeconds(1.35);
if (PiriAni.IsPlaying(Idling2))
RBosom.rigidbody.AddForce(thisTransform.up * 0.07);
if (PiriAni.IsPlaying(Idling2))
LBosom.rigidbody.AddForce(thisTransform.up * 0.07);
yield WaitForSeconds(0.05);
if (PiriAni.IsPlaying(Idling2))
RBosom.rigidbody.AddForce(thisTransform.up * 0.07);
if (PiriAni.IsPlaying(Idling2))
LBosom.rigidbody.AddForce(thisTransform.up * 0.07);
yield WaitForSeconds(0.05);
if (PiriAni.IsPlaying(Idling2))
RBosom.rigidbody.AddForce(thisTransform.up * 0.07);
if (PiriAni.IsPlaying(Idling2))
LBosom.rigidbody.AddForce(thisTransform.up * 0.07);
yield WaitForSeconds(0.13);
if (PiriAni.IsPlaying(Idling2))
RBosom.rigidbody.AddForce(thisTransform.up * -0.2);
if (PiriAni.IsPlaying(Idling2))
LBosom.rigidbody.AddForce(thisTransform.up * -0.2);
}

function PlayAnimation(ani: String) {
	if (!PiriAni.IsPlaying(ani)) {
		PiriAni.CrossFade(ani);
	}
}

function Hurt () {
if(!WorldInformation.Godmode){
 WorldInformation.PiriIsHurt = true;
 CanMove = false;
 TC.name = "snyf";
 PiriAni.Stop();
 Instantiate(HurtNoise, thisTransform.position, thisTransform.rotation);
 //WheelBrake
 yield WaitForSeconds (0.2);
 PiriAni.CrossFade("PiriArmature|Faceplant");
 WorldInformation.instance.Hurt();
}
}

function Hurt2 () {
if(!WorldInformation.Godmode){
 WorldInformation.PiriIsHurt = true;
 CanMove = false;
 TC.name = "snyf";
 WorldInformation.instance.Hurt();
}
}

function Counter(){
Count += 0.5;
}

function Pauser () {
yield WaitForSeconds (0.3);
CanCollide = true;
}

function Tick () {

if(Pirizuka.activeSelf)
Pauser();

if(thisRigidbody.velocity.magnitude < 15){
RBosomCJ.angularXDrive.positionDamper = 0;
RBosomCJ.angularYZDrive.positionDamper = 0;

RBosomCJ.angularXDrive.positionSpring = 0.002;
RBosomCJ.angularYZDrive.positionSpring = 0.002;

LBosomCJ.angularXDrive.positionDamper = 0;
LBosomCJ.angularYZDrive.positionDamper = 0;

LBosomCJ.angularXDrive.positionSpring = 0.002;
LBosomCJ.angularYZDrive.positionSpring = 0.002;
}
if(thisRigidbody.velocity.magnitude > 15){
RBosomCJ.angularXDrive.positionDamper = 0.0002;
RBosomCJ.angularYZDrive.positionDamper = 0.0002;

RBosomCJ.angularXDrive.positionSpring = 0.006;
RBosomCJ.angularYZDrive.positionSpring = 0.006;

LBosomCJ.angularXDrive.positionDamper = 0.0002;
LBosomCJ.angularYZDrive.positionDamper = 0.0002;

LBosomCJ.angularXDrive.positionSpring = 0.006;
LBosomCJ.angularYZDrive.positionSpring = 0.006;
}
if(thisRigidbody.velocity.magnitude > 50){
RBosomCJ.angularXDrive.positionDamper = 0.0004;
RBosomCJ.angularYZDrive.positionDamper = 0.0004;

RBosomCJ.angularXDrive.positionSpring = 0.01;
RBosomCJ.angularYZDrive.positionSpring = 0.01;

LBosomCJ.angularXDrive.positionDamper = 0.0004;
LBosomCJ.angularYZDrive.positionDamper = 0.0004;

LBosomCJ.angularXDrive.positionSpring = 0.01;
LBosomCJ.angularYZDrive.positionSpring = 0.01;
}

if(!Input.GetMouseButton(1) && !WorldInformation.FPMode) {
			AimingForward = false;
			AimingBack = false;
			AimingLeft = false;
			AimingRight = false;
			}
}