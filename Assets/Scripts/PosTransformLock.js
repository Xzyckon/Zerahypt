var X : float = 0;
var Y : float = 0;
var Z : float = 0;

var Aimer : GameObject;
var Gun : GameObject;

function FixedUpdate()
    {
     transform.localPosition = Vector3(X,Y,Z);
    }
    
function OnJointBreak(breakForce : float) {
        Gun.GetComponent(NewgunController).enabled = false;
        rigidbody.useGravity = true;
        Destroy(Aimer);
        transform.parent = null;
		Destroy(this);
}