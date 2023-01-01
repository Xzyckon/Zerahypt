
var FadeOut : boolean;

var Duration = 105;

var range : float = 20;

var power : float = 0;

var fullPower : float = 40;

InvokeRepeating("Tick", 1, 0.1);

function Start () {

FadeOut = false;
yield WaitForSeconds (Duration);
FadeOut = true;
yield WaitForSeconds (20);
  Destroy(gameObject);
}

function Update () {

}

 function FixedUpdate() {
 
 var newRot : Vector3 = (transform.forward * 0.6f ).normalized;

newRot = (transform.forward * 0.6f + transform.right * 0.4f).normalized;

Debug.DrawRay (transform.position + transform.up * 10, newRot * 200f, Color.black);
if (Physics.Raycast (transform.position + transform.up * 10, newRot, 200))
     rigidbody.AddTorque(transform.up * -5);
 
newRot = (transform.forward * 0.6f + transform.right * -0.4f).normalized;

Debug.DrawRay (transform.position + transform.up * 10, newRot * 200f, Color.black);
if (Physics.Raycast (transform.position + transform.up * 10, newRot, 200))
     rigidbody.AddTorque(transform.up * 5);
 
 
 rigidbody.AddTorque(transform.up * Random.Range (-4, 4));
 rigidbody.AddForce(transform.forward * 4);

 rigidbody.AddForceAtPosition(Vector3.up * 2, transform.up * 2);
 rigidbody.AddForceAtPosition(-Vector3.up * 2, -transform.up * 2);
 
if(!FadeOut){
if(audio.volume < 1)
audio.volume += 0.002;
if(power < fullPower)
power += 0.05;
}

if(FadeOut){
if(audio.volume > 0)
audio.volume -= 0.001;
if(power > 0)
power -= 0.05;
}

}

function Tick () {
	var collideArray : Collider[] = Physics.OverlapSphere(transform.position, range);
	var rigidbodyArray : Array = new Array();
	
	for (counter = 0; counter < collideArray.length; counter++ ) {
	
	var zTag: String = collideArray[counter].gameObject.tag;
	
	if (collideArray[counter].attachedRigidbody && collideArray[counter].attachedRigidbody != rigidbody) {
	if(!zTag.Contains("Player") && !zTag.Contains("Ghosts") && !zTag.Contains("Explosions")){
	
	var breaking : boolean = false;
			
	for (rounter = 0; rounter < rigidbodyArray.length; rounter++) {
	if (collideArray[counter].attachedRigidbody == rigidbodyArray[rounter]) {
	breaking = true;
	break;
	}
    }
			
	if (breaking) continue;
			
	rigidbodyArray.Add(collideArray[counter].attachedRigidbody);
	var offset : Vector3 = (transform.position - collideArray[counter].transform.position);
			
	if(Vector3.Distance(collideArray[counter].transform.position, transform.position) > 1f)
	collideArray[counter].attachedRigidbody.AddForce(offset / offset.sqrMagnitude * power);
}
}
}
}