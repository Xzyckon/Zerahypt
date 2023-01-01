var NoClipping : boolean;

var DoIt : boolean;

var target : Transform;

var targetLayers : LayerMask;

function Start () {
if(NoClipping){

target = PlayerInformation.instance.Pirizuka;

InvokeRepeating("Tick", 0.05, 0.5);
}
}

function FixedUpdate () {

if(!DoIt)
return;

var hit : RaycastHit;
var dirRot : Vector3 = (rigidbody.velocity);
var RBV = rigidbody.velocity.magnitude * 1.2 * Time.deltaTime;

      Debug.DrawRay (transform.position, transform.right * RBV, Color.green);
if (Physics.Raycast (transform.position, dirRot, hit, RBV, targetLayers)){
rigidbody.velocity = dirRot * RBV * -1;
if(hit.rigidbody)
rigidbody.velocity = hit.rigidbody.velocity;
}

}

function Tick () {
if(Vector3.Distance(transform.position, target.position) < 300)
DoIt = true;
else
DoIt = false;
}