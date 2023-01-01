function OnTriggerEnter (other : Collider) {
   if(other.rigidbody)
    other.rigidbody.useGravity = true;
}