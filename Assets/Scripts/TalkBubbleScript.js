var thisTransform : Transform;

var theCam : Transform;

var target : Transform;

var source : Transform;

static var myText : String;

var textWidth : float;

var floatHeight : float;

var camDist : float;

var cDist : float;

var waitTime : float;

var snyfsiesER : int;

var done : boolean;
var isRemoving : boolean;

var textObject : TextMesh;

var pop : GameObject;

var popPoint : Transform;

var snyfsies : ParticleSystem;

var targetLayers : LayerMask;

function Start () {

var hit : RaycastHit;

cDist = 1;

transform.Translate(Vector3.up * 64, Space.World);

theCam = PlayerInformation.instance.PhysCam;

thisTransform = transform;

if(transform.name.Contains ("1"))
WorldInformation.pSpeech = thisTransform;

if (Physics.Raycast (thisTransform.position, Vector3.down, hit, 64, targetLayers))
floatHeight = hit.distance - 64;

textObject.text = myText;
textWidth = textObject.renderer.bounds.size.magnitude * 5;
snyfsies.emissionRate = textObject.renderer.bounds.size.magnitude * 96;
snyfsies.transform.localScale.x = textWidth;

target = PlayerInformation.instance.PhysCam;

waitTime = Mathf.Clamp(textWidth * 0.3,2,128);

WorldInformation.PopUp = true;

yield WaitForSeconds (0.2);

if(myText != null)
if(myText.Contains ("heat"))
WorldInformation.cheatsOn = true;

WorldInformation.PopUp = false;

done = true;

yield WaitForSeconds (waitTime);

Removing();
}

function LateUpdate() {

if(!source){
if(!isRemoving){
isRemoving = true;
Removing();
return;
}
}

thisTransform.position.x = source.position.x;
thisTransform.position.y = source.position.y - floatHeight;
thisTransform.position.z = source.position.z;

thisTransform.LookAt(target);

camDist = Vector3.Distance(thisTransform.position, theCam.position);

cDist = Mathf.Lerp(cDist, camDist, 0.5);

if(done && WorldInformation.PopUp){
Removing();
}

thisTransform.localScale = Vector3(cDist * 0.2, cDist * 0.2, cDist * 0.2);

snyfsies.startSize = cDist * 0.2;
}

function Removing(){
var Load = Resources.Load("Prefabs/TalkBubblePop", GameObject) as GameObject;

var TGO = Instantiate(Load, popPoint.position, thisTransform.rotation);
TGO.GetComponent(ParticleSystem).maxParticles = textWidth * 4;
TGO.transform.localScale = Vector3(camDist * 0.2, camDist * 0.2, camDist * 0.2);
TGO.transform.localScale.x += textWidth * camDist * 0.2;
TGO.GetComponent(ParticleSystem).startSize = camDist * 0.2;

if(transform.name.Contains ("1"))
NotiScript.PiriNotis = false;

Destroy(gameObject);
}