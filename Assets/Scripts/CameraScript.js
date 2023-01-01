public static var instance : CameraScript;
static var InInterface : boolean = false;
public var DefaultDistance : float = 3.5;
var target : Transform;
var speedOmeter : GameObject;
var PhysCam : GameObject;
var CamCol : CapsuleCollider;
var PiriBodyCam : Transform;
var PiriHeadCam : Transform;
var CamResetPoint : Transform;
var pAimer : Transform;
static var CamNoFP : boolean;
var CamObstacle : boolean;
var CamWater : boolean;
var TheCam : Camera;
var TheCam2 : Camera;
var StartingUp : boolean;
var DoOnce : boolean;

private var thisTF : Transform;
private var presenceTF : Transform;

static var changeColOnce : boolean;
static var cameraSetOnce : boolean;

var UWallSensor : float = 1.5;
var RWallSensor : float = 1.5;

var CCRadius : float = 0.8;
var CCHeight : float = 2.8;

var UR : float = 1;
var RR : float = 1;

var URp : float = 1;
var RRp : float = 1;

static var ClipPlus : float = 1;

var distance = 3.5;
private var OriginalDistance = 3.5;
   
static var xSpeed = 60;
static var ySpeed = 60;
   
var yMinLimit = -0.5;
var yMaxLimit = 80;
   
var x = 0.0;
var y = 0.0;
private var xdis : int;
private var lastTarget : Vector3;
private var rotating : boolean = false;

var targetLayers : LayerMask;
var targetLayersW : LayerMask;
var MtargetLayers : LayerMask;
 
function Awake()
{
	instance = this;
}

function Start(){

    presenceTF = PlayerInformation.instance.PiriPresence;
    thisTF = PhysCam.transform;

    xSpeed = WorldInformation.Sensitivity;
    ySpeed = WorldInformation.Sensitivity;

    StartingUp = true;
    
    InInterface = false;
    
    if(!PlayerCamFollow.HoldCam)
    if(!WorldInformation.FPMode)
    ColOnceDelay2();
	
	var angles = transform.eulerAngles;
    x = angles.y;
    y = angles.x;
    
    yield WaitForSeconds (0.1);
    
    lastTarget = target.position;
    
    StartingUp = false;
    
    if(!WorldInformation.FPMode){
        CCRadius = 0.8;
        CCHeight = 2.8;
    }else{
	    CCRadius = 0.2;
	    CCHeight = 0.2;
    }
        
   tm = speedOmeter.gameObject.GetComponent(TextMesh);
        
yield WaitForSeconds (0.3);
Screen.lockCursor = true;
yield WaitForSeconds (0.3);
Screen.lockCursor = false;
yield WaitForSeconds (0.3);
Screen.lockCursor = true;
}
 
public function CheckCars(_target : Transform, _distance : float){

    if(_target != null)
	{
		target = _target;
		distance = _distance;
		OriginalDistance = _distance;
    }
	else
	{
        target = PiriBodyCam;
        distance = DefaultDistance;
        OriginalDistance = DefaultDistance;
    }
}

private var xtimer : int = 1;

function LateUpdate(){
if(!InInterface){

        x += Input.GetAxis("Mouse X") * xSpeed * 0.02;
        if(!CamWater)
        y -= Input.GetAxis("Mouse Y") * ySpeed * 0.02;
        
        if(WorldInformation.playerCar != "null")
		if(WorldInformation.FPMode)
		if(!Input.GetMouseButton(1))
        x = PiriBodyCam.eulerAngles.y;
        
if (WorldInformation.UsingClosedVessel == false){
		if (WorldInformation.FPMode){
		if (!InInterface){
			PhysCam.transform.position = PiriHeadCam.transform.position;
			if(!WorldInformation.UsingBigVessel)
			target = PiriHeadCam;
			}
		    }else{
		    if(!WorldInformation.UsingBigVessel)
			target = PiriBodyCam;
		}
		
	    if(!WorldInformation.IsNopass && !WorldInformation.FPMode){
		if(Input.GetMouseButton(1)){
		if (!InInterface && !CamNoFP){
			PhysCam.transform.position = PiriHeadCam.transform.position;
			if(!WorldInformation.UsingBigVessel)
			target = PiriHeadCam;
			}
		    }else{
		    if(!WorldInformation.UsingBigVessel)
			target = PiriBodyCam;
			CamNoFP = false;
		}
		}
	}
        
}else{

if (WorldInformation.FPMode)
PhysCam.transform.position = PiriHeadCam.transform.position;

}

ClipPlus = TheCam2.farClipPlane + 0.2;

UR = UWallSensor * TheCam2.farClipPlane;
RR = RWallSensor * TheCam2.farClipPlane;

URp = UR * 2;
RRp = RR * 2;

//Debug.DrawRay (PhysCam.transform.position + PhysCam.transform.forward * ClipPlus + PhysCam.transform.right * RR + PhysCam.transform.up * UR, -PhysCam.transform.right * RRp, Color.red);
//Debug.DrawRay (PhysCam.transform.position + PhysCam.transform.forward * ClipPlus + PhysCam.transform.right * -RR + PhysCam.transform.up * UR, -PhysCam.transform.up * URp, Color.red);
//Debug.DrawRay (PhysCam.transform.position + PhysCam.transform.forward * ClipPlus + PhysCam.transform.right * -RR + PhysCam.transform.up * -UR, PhysCam.transform.right * RRp, Color.red);
//Debug.DrawRay (PhysCam.transform.position + PhysCam.transform.forward * ClipPlus + PhysCam.transform.right * RR + PhysCam.transform.up * -UR, PhysCam.transform.up * URp, Color.red);
//Debug.DrawRay (PhysCam.transform.position + PhysCam.transform.forward * ClipPlus + PhysCam.transform.up * UR, -PhysCam.transform.up * URp, Color.red);
if (!Physics.Raycast (PhysCam.transform.position + PhysCam.transform.forward * ClipPlus + PhysCam.transform.right * RR + PhysCam.transform.up * UR, -PhysCam.transform.right, RRp, targetLayers) &&
    !Physics.Raycast (PhysCam.transform.position + PhysCam.transform.forward * ClipPlus + PhysCam.transform.right * -RR + PhysCam.transform.up * UR, -PhysCam.transform.up, URp, targetLayers) &&
    !Physics.Raycast (PhysCam.transform.position + PhysCam.transform.forward * ClipPlus + PhysCam.transform.right * -RR + PhysCam.transform.up * -UR, PhysCam.transform.right, RRp, targetLayers) &&
    !Physics.Raycast (PhysCam.transform.position + PhysCam.transform.forward * ClipPlus + PhysCam.transform.right * RR + PhysCam.transform.up * -UR, PhysCam.transform.up, URp, targetLayers) &&
    !Physics.Raycast (PhysCam.transform.position + PhysCam.transform.forward * ClipPlus + PhysCam.transform.up * UR, -PhysCam.transform.up, URp, targetLayers)){

}else{
if(TheCam2.farClipPlane > 0.25){
TheCam.nearClipPlane -= 0.1;
TheCam2.farClipPlane -= 0.1;
}
}

}

function FixedUpdate(){

if(!WorldInformation.FPMode){
if(!InInterface){
if (target && !WorldInformation.stopCamera){
        
        y = ClampAngle(y, yMinLimit, yMaxLimit);
                 
        var rotation = Quaternion.Euler(y, x, 0);
        var position = rotation * Vector3(0.0, 0.0, -distance) + target.position;
           
        if(StartingUp)
        rotation = transform.rotation;
        
        if(!StartingUp){
        transform.rotation = rotation;
        transform.position = position;
        }
        
    }

	if(target == null){
	    target = PiriBodyCam;
		transform.position = target.position;
	}

}else{

var position2 : Vector3;

var rotation2 = Quaternion.Euler(y, x, 0);

if (target)
position2 = rotation2 * Vector3(0.0, 0.0, -distance) + target.position;
else
position2 = rotation2 * Vector3(0.0, 0.0, -distance);

if(!StartingUp)
if(!WorldInformation.stopCamera)
transform.position = position2;
}

if(xtimer == 0){
        xdis = Vector3.Distance(target.position, lastTarget) * 27;
                WorldInformation.vehicleSpeed = xdis;
        lastTarget = target.position;
        xtimer = 4;
    }else{
        xtimer -= 1;
    }
    
}else{

if (target && !WorldInformation.stopCamera){
        
        y = ClampAngle(y, yMinLimit, yMaxLimit);
        
                 
        var rotation3 = Quaternion.Euler(y, x, 0);

        transform.rotation = rotation3;
        transform.position = target.position;

        
    }

	if(target == null){
	    target = PiriBodyCam;
		transform.position = target.position;
	}



if(xtimer == 0){
        xdis = Vector3.Distance(target.position, lastTarget) * 27;
                WorldInformation.vehicleSpeed = xdis;
        lastTarget = target.position;
        xtimer = 4;
    }else{
        xtimer -= 1;
    }
}
}
 
private var tm : TextMesh;

function Update(){

if(!InInterface){

var hit : RaycastHit;

if (Physics.Raycast (PhysCam.transform.position, PhysCam.transform.forward, hit, 0.5, targetLayers)){
			CamObstacle = true;
			}else{
			CamObstacle = false;
			}


if (Physics.Raycast (PhysCam.transform.position + PhysCam.transform.forward * 1.3 + PhysCam.transform.up * 1, -PhysCam.transform.up, hit, 1.75, targetLayersW)){
			if(hit.collider.name.Contains ("w"))
			CamWater = true;
			}else{
			CamWater = false;
			}
	
	if(tm != null)
    	tm.text = xdis.ToString();
    
    if(!WorldInformation.FPMode){
    if(DoOnce){
    CCRadius = 0.8;
    CCHeight = 2.8;
    if(!WorldInformation.UsingClosedVessel){
	distance = OriginalDistance;
	if(!Input.GetMouseButton(1))
	CamCol.enabled = true;
    }else{
    CamCol.enabled = false;
    }
    DoOnce = false;
    }
    }
    
    if(WorldInformation.FPMode){
    if(!DoOnce){
    CCRadius = 0.2;
	CCHeight = 0.2;
    if(!WorldInformation.UsingClosedVessel){
	distance = 0;
	CamCol.enabled = false;
    }else{
    CamCol.enabled = false;
    }
    DoOnce = true;
    }
    }
    
    if(Input.GetMouseButtonDown(1)){
    if(!WorldInformation.IsNopass){
    if(!WorldInformation.UsingClosedVessel){
        CCRadius = 0.2;
	    CCHeight = 0.2;
        PlayerMotionAnimator.PiriStill = true;
		distance = 0;
		}
		if(WorldInformation.playerCar == "null"){
		PhysCam.rigidbody.isKinematic = true;
		CamCol.enabled = false;
		}else{
		CamCol.enabled = true;
		distance = OriginalDistance;
		}
    }
    }
    
if(Input.GetMouseButtonUp(1) || Input.GetMouseButtonDown(2) && distance < 1 || Input.GetKeyDown(KeyCode.I) && distance < 1){
if(!WorldInformation.IsNopass && !InInterface){
if(!WorldInformation.FPMode){
        CCRadius = 0.8;
        CCHeight = 2.8;
        PlayerMotionAnimator.PiriStill = false;
		distance = OriginalDistance;
		

if(!WorldInformation.UsingClosedVessel)
if(!WorldInformation.UsingBigVessel)
PhysCam.transform.position = CamResetPoint.transform.position;
		
		if(!WorldInformation.UsingClosedVessel)
		CamCol.enabled = false;
		else
		CamCol.enabled = true;
		if(WorldInformation.playerCar == "null"){
        CamCol.enabled = true;
        PhysCam.rigidbody.isKinematic = false;
        }
    }else{
	    CCRadius = 0.2;
	    CCHeight = 0.2;
        if(!WorldInformation.UsingClosedVessel){
        PlayerMotionAnimator.PiriStill = false;
        CamCol.enabled = false;
        }else{
        CamCol.enabled = false;
        }
        if(WorldInformation.playerCar == "null"){
        CamCol.enabled = false;
        PhysCam.rigidbody.isKinematic = false;
        }
    }
    }
    }

if(!Input.GetMouseButton(1) && !WorldInformation.FPMode){
var d = Input.GetAxis("Mouse ScrollWheel");

var hitSC : RaycastHit;
pAimer.LookAt(thisTF);

if(distance > 0){
      Debug.DrawRay (pAimer.position, pAimer.forward * distance, Color.red);
if (Physics.Raycast (pAimer.position, pAimer.forward, hitSC, distance, MtargetLayers)){
if(!Physics.Linecast (PhysCam.transform.position, pAimer.position, MtargetLayers))
distance = hitSC.distance;
}
}

if (d > 0f){
distance -= 1;
}else if (d < 0f){
distance += 1;
}

}
	
}

ClipPlus = TheCam2.farClipPlane + 0.2;

//Debug.DrawRay (PhysCam.transform.position + PhysCam.transform.forward * ClipPlus + PhysCam.transform.right * RR + PhysCam.transform.up * UR, -PhysCam.transform.right * RRp, Color.red);
//Debug.DrawRay (PhysCam.transform.position + PhysCam.transform.forward * ClipPlus + PhysCam.transform.right * -RR + PhysCam.transform.up * UR, -PhysCam.transform.up * URp, Color.red);
//Debug.DrawRay (PhysCam.transform.position + PhysCam.transform.forward * ClipPlus + PhysCam.transform.right * -RR + PhysCam.transform.up * -UR, PhysCam.transform.right * RRp, Color.red);
//Debug.DrawRay (PhysCam.transform.position + PhysCam.transform.forward * ClipPlus + PhysCam.transform.right * RR + PhysCam.transform.up * -UR, PhysCam.transform.up * URp, Color.red);
//Debug.DrawRay (PhysCam.transform.position + PhysCam.transform.forward * ClipPlus + PhysCam.transform.up * UR, -PhysCam.transform.up * URp, Color.red);
if (!Physics.Raycast (PhysCam.transform.position + PhysCam.transform.forward * ClipPlus + PhysCam.transform.right * RR + PhysCam.transform.up * UR, -PhysCam.transform.right, RRp, targetLayers) &&
    !Physics.Raycast (PhysCam.transform.position + PhysCam.transform.forward * ClipPlus + PhysCam.transform.right * -RR + PhysCam.transform.up * UR, -PhysCam.transform.up, URp, targetLayers) &&
    !Physics.Raycast (PhysCam.transform.position + PhysCam.transform.forward * ClipPlus + PhysCam.transform.right * -RR + PhysCam.transform.up * -UR, PhysCam.transform.right, RRp, targetLayers) &&
    !Physics.Raycast (PhysCam.transform.position + PhysCam.transform.forward * ClipPlus + PhysCam.transform.right * RR + PhysCam.transform.up * -UR, PhysCam.transform.up, URp, targetLayers) &&
    !Physics.Raycast (PhysCam.transform.position + PhysCam.transform.forward * ClipPlus + PhysCam.transform.up * UR, -PhysCam.transform.up, URp, targetLayers)){
if(TheCam2.farClipPlane < 1){
TheCam.nearClipPlane += 0.1;
TheCam2.farClipPlane += 0.1;
}
}

if(Input.GetKeyDown(KeyCode.I) || Input.GetMouseButtonDown(2)){
if(!TalkScript.isTyping){
if(!InInterface){
InInterface = true;
distance = OriginalDistance;
PlayerMotionAnimator.PiriStill = true;
Screen.lockCursor = false;
Screen.showCursor = true;
    
}else{
InInterface = false;
distance = OriginalDistance;
PlayerMotionAnimator.PiriStill = false;
Screen.lockCursor = true;
Screen.showCursor = false;
}

if(Input.GetMouseButton(1))
CamNoFP = true;
}
}

if(CamCol.radius < CCRadius)
CamCol.radius += 0.01;
if(CamCol.height < CCHeight)
CamCol.height += 0.02;

if(CamCol.radius > CCRadius)
CamCol.radius = CCRadius;
if(CamCol.height > CCHeight)
CamCol.height = CCHeight;

if(changeColOnce){
ColOnceDelay();
changeColOnce = false;
}

if(cameraSetOnce){
CameraSet();
cameraSetOnce = false;
}

}

function ColOnceDelay (){
CamCol.enabled = false;
yield WaitForSeconds (0.3);
CCRadius = 0.8;
CCHeight = 2.8;
distance = OriginalDistance;
CamCol.enabled = true;
}

function ColOnceDelay2 (){
CamCol.enabled = false;
yield WaitForSeconds (1);
CamCol.enabled = true;
}

function CameraSet (){
WorldInformation.FPMode = true;
yield WaitForSeconds (0.3);
WorldInformation.FPMode = false;
}
   
function ClampAngle (angle : float, min : float, max : float){


    if(CamWater){
    angle -= 10;
    if(angle > 0)
    angle = 0;
    }else{
    
    if(CamObstacle)
        angle = 0;
    }
    
    if (WorldInformation.FPMode){
    if (!Input.GetMouseButton(1)){
    if (angle < -30)
        angle = -30;
    if (angle > 30)
        angle = 30;
    }
    if (Input.GetMouseButton(1)){
    if (angle < -60)
        angle = -60;
    if (angle > 60)
        angle = 60;
    }
    }
    
    
    if (!WorldInformation.FPMode){
    if (angle < -60)
        angle = -60;
    if (angle > 60)
        angle = 60;
    }
    
    
    return Mathf.Clamp (angle, min, max);
}