var range : float = 30.0;
var power : float = 10.0;

var Tickspeed : float = 0.2;
 
InvokeRepeating("Tick", 1, Tickspeed);

function Tick () {
	var collideArray : Collider[] = Physics.OverlapSphere(transform.position, range); //Get all objects inside the sphere within range's units.
	var rbs : Array = new Array();
	for ( counter = 0; counter < collideArray.length; counter++ ) {
		if (collideArray[counter].attachedRigidbody && collideArray[counter].attachedRigidbody != rigidbody) {
			var breaking :boolean = false;
			for (r=0; r<rbs.length; r++) {
				if (collideArray[counter].attachedRigidbody == rbs[r]) {
					breaking=true;
					break;
				}
			}
			if (breaking) continue;
			rbs.Add(collideArray[counter].attachedRigidbody);
			var offset : Vector3 = (transform.position - collideArray[counter].transform.position);
			
			if(Vector3.Distance(collideArray[counter].transform.position, transform.position) > 1f)
			collideArray[counter].attachedRigidbody.AddForce(offset / offset.sqrMagnitude  * power, ForceMode.Acceleration );
		}
	}
}