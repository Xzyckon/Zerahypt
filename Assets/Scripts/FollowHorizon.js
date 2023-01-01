var LevelMode : boolean;

static var LevelRot = 0;

var cameraToFollow : Transform;

InvokeRepeating("Reset", 0.17, 0.5);

function Start () {

}

function FixedUpdate () {
if(!LevelMode){
var horizon1 : Vector3 = cameraToFollow.position + cameraToFollow.forward * 20000000;
var lookPos1 : Vector3 = (horizon1 - transform.position);

if (!Input.GetMouseButton(1)) lookPos1.y = transform.position.y;

transform.rotation = Quaternion.LookRotation(lookPos1);

transform.position = cameraToFollow.position;
}else{
var horizon2 : Vector3 = cameraToFollow.position + cameraToFollow.right * -20000000;
var lookPos2 : Vector3 = (horizon2 - transform.position);

transform.rotation = Quaternion.LookRotation(horizon2);

transform.position = cameraToFollow.position;
}
}

function Reset () {
if(LevelRot == 180){
AgrianNetwork.Spawn = 16;
//Debug.Log("ItDid");
LevelRot = 0;
}
}