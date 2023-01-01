
var RotateDown : boolean;

var MoveDown : boolean;

var targetLayers : LayerMask;

function Start () {

if(!RotateDown)
transform.Rotate( 0 , 0 , Random.Range(0, 360));
else
transform.rotation = Quaternion.LookRotation(Vector3.down);

if(MoveDown){
var hit : RaycastHit;
if(Physics.Raycast(transform.position, transform.forward, hit, 20000, targetLayers))
transform.position += transform.forward * hit.distance;
}

}