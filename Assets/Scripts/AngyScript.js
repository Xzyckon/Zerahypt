var textObject : TextMesh;

var myText : String;

static var myTextStat : String;

var target : Transform;
var thisTransform : Transform;

var isSubPart : boolean;

function Start () {

if(!isSubPart){
if(WorldInformation.angyS == null){
WorldInformation.angyS = this;
textObject.text = myText;
target = PlayerInformation.instance.PhysCam;
thisTransform.position.y += 2;
yield WaitForSeconds (8);
Destroy(gameObject);
}else{
Destroy(gameObject);
}
}else{
textObject.text = myText;
target = PlayerInformation.instance.PhysCam;
}

}

function DisplayName () {
textObject.text = myText;
}

function LateUpdate() {

camDist = Vector3.Distance(thisTransform.position, target.position);

thisTransform.LookAt(target);

thisTransform.localScale = Vector3(camDist * 0.005, camDist * 0.005, camDist * 0.005);

}