var target : Transform;
var targetLayers : LayerMask;
var LightTex : GameObject;

var UseLineOfSight: boolean;

function Start () {
if(PlayerInformation.instance)
target = PlayerInformation.instance.PhysCam;
}

function LateUpdate () {

if(UseLineOfSight){
if (!Physics.Linecast (transform.position, target.position, targetLayers))
LightTex.gameObject.SetActive (true);
else
LightTex.gameObject.SetActive (false);
}

transform.LookAt(target);
		    
if(target == null)
target = PlayerInformation.instance.PhysCam;
}