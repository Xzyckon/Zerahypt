var force = 10.0;
var AimForce = 10.0;
var AimTarget : Transform;
var TurnForce : float = 0;

var Stabilize : boolean;

var offset = 1.0;

InvokeRepeating("Reset", 1, 1);

function FixedUpdate (){

rigidbody.AddTorque(transform.up * TurnForce);

if(AimTarget && Stabilize){
    rigidbody.AddForceAtPosition((AimTarget.transform.position - transform.position).normalized * AimForce, transform.forward*offset);
    rigidbody.AddForceAtPosition((AimTarget.transform.position - transform.position).normalized * -AimForce, -transform.forward*offset);
}
if(Stabilize){
    rigidbody.AddForceAtPosition(Vector3.up*force, transform.up*offset);
    rigidbody.AddForceAtPosition(-Vector3.up*force, -transform.up*offset);
    }
}

function Reset (){
Stabilize = true;
}