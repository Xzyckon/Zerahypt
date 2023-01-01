var Force : float = 0;
var ForwardForce : float = 0;

function FixedUpdate () {
			
         rigidbody.AddForce(transform.up * Force);
         rigidbody.AddForce(transform.forward * ForwardForce);
}