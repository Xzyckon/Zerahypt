var explosion: GameObject;

var Point : Vector3;

function Start () {
        
        var hit : RaycastHit;
        
		if (Physics.Raycast (transform.position, transform.forward, hit, 2000)) {
		
		Point = hit.point;
		
		var NormalAngle = Quaternion.LookRotation(hit.normal);
		
			Instantiate(explosion, Point, NormalAngle);
		}
	}