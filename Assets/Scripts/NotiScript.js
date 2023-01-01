
public var SnyfAni : String;
var SnyfAniObject : GameObject;
var SnyfSpawn : GameObject;
var PiriNotice : GameObject;
var Head : GameObject;
var Tick : boolean;
var Snyfs = 0;

var SnfIn : AudioClip;
var SnfOut : AudioClip;

var Snys : AudioClip;

var targetLayers : LayerMask;

static var Notipoint : Transform;

static var thisTransform : Transform;
static var PiriNotis : boolean;

InvokeRepeating("Untick", 2, 2);

function Start () {
thisTransform = transform;
Notipoint = PlayerInformation.instance.PiriNose;
}

function Update () {

var hit : RaycastHit;

if(CameraScript.InInterface)
return;

if(Input.GetKey("e"))
Head.rigidbody.AddTorque(thisTransform.right * -0.01);

if(Input.GetKeyDown("e")){

audio.maxDistance = 100;
audio.volume = 0.2;

if (Physics.Raycast (thisTransform.position + thisTransform.forward * 0.1, thisTransform.forward, hit, 3, targetLayers)){
			if (hit.collider.gameObject.GetComponent(HingeScript) != null)
				hit.collider.gameObject.GetComponent(HingeScript).Move();
				
			if (hit.collider.gameObject.GetComponent(HatchScript) != null)
				hit.collider.gameObject.GetComponent(HatchScript).Move();
}

SnyfAniObject.animation.Play(SnyfAni);
audio.clip = SnfOut;
audio.Play();
Snyf();
Snyfs += 1;
if(Snyfs > 6){
Instantiate(SnyfSpawn, thisTransform.position, thisTransform.rotation);
Snyfs = 0;
}
}

if(Input.GetKeyDown("r")){

if (Physics.Raycast (thisTransform.position + thisTransform.forward * 0.1, thisTransform.forward, hit, 3, targetLayers)){
			if (hit.collider.gameObject.GetComponent(BackpackScript) != null)
				hit.collider.gameObject.GetComponent(BackpackScript).GetWorn();
}

}

if(Input.GetKeyUp("e")){
if(!FurtherActionScript.FurtherActionE1){
audio.clip = SnfIn;
audio.Play();
}else{
audio.maxDistance = 500;
audio.volume = 1;
audio.clip = Snys;
audio.Play();
PiriNotis = true;
TalkScript.isTyping = true;
Instantiate(PiriNotice, thisTransform.position, thisTransform.rotation);
}
}
}

function FixedUpdate () {
thisTransform.position = Notipoint.position;
thisTransform.rotation = Notipoint.rotation;
}

function Snyf () {
if(Tick)
return;
Tick = true;
yield WaitForSeconds (2);
Snyfs = 0;
Tick = false;
}

function Untick () {
Tick = false;
}