
function FixedUpdate () {

if(rigidbody.velocity.magnitude > 30) {
if(gameObject.hingeJoint.spring.targetPosition < 20)
gameObject.hingeJoint.spring.targetPosition += 0.2;
}else{
if(gameObject.hingeJoint.spring.targetPosition > 0)
gameObject.hingeJoint.spring.targetPosition -= 0.2;
}

}