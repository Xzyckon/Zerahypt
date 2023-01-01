var Root : Transform;
var RootScript : tendrilSectionScript;
var thisTransform : Transform;
var target : Transform;
var tip : Transform;

var Impact: GameObject;

var mainBody : Transform;

var isEnd : boolean;
var maybeEnd : boolean;
var Retracting : boolean;

var Zprod : float = 0.12;

var PeukAI : PeukopedeAI;

var targetLayers : LayerMask;

function Start () {

maybeEnd = true;

if(Root){

if(Root.GetComponent(tendrilSectionScript)){
RootScript = Root.GetComponent(tendrilSectionScript);
RootScript.maybeEnd = false;
}

thisTransform.localPosition = Root.localPosition;
}

if(isEnd){
var hit : RaycastHit;
if (Physics.Raycast (thisTransform.position + -thisTransform.forward * 0.25, thisTransform.forward, hit, 0.5, targetLayers))
Instantiate(Impact, hit.point, thisTransform.rotation);
}

yield WaitForSeconds (0.5);

if(maybeEnd)
isEnd = true;

}

function Update () {

if(!Retracting){

target = PeukAI.Target;

if(target && Root){
var relativePoint = Root.InverseTransformPoint(tip.position);
FAndB = relativePoint.z;

if(FAndB > 0.26){
NewRotation = Quaternion.LookRotation(target.position - thisTransform.position);
thisTransform.rotation = Quaternion.Slerp(thisTransform.rotation, NewRotation, Time.deltaTime * 3);
}else{
thisTransform.rotation = Quaternion.Slerp(thisTransform.rotation, Root.rotation, Time.deltaTime * 3);
}

}

if(isEnd)
if(!mainBody)
Retracting = true;

}

}

function FixedUpdate () {

if(Root){
thisTransform.localPosition = Root.localPosition;
if(!Retracting){
thisTransform.Translate(0, 0, 0.12, Root);
}else{
thisTransform.rotation = Quaternion.RotateTowards(thisTransform.rotation, Root.rotation, Time.deltaTime * 512);
Zprod -= 0.03;
thisTransform.Translate(0, 0, Zprod, Root);
if(Zprod < 0){
if(RootScript)
RootScript.Retracting = true;
Destroy(gameObject);
}
}
}

}