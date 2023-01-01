var explosion: GameObject;

function OnJointBreak(breakForce : float) {

    Instantiate(explosion, transform.position, transform.rotation);
    
    rigidbody.AddTorque(transform.up * Random.Range (-1, 1));
    rigidbody.AddTorque(transform.right * Random.Range (-1, 1));
    rigidbody.AddTorque(transform.forward * Random.Range (-1, 1));
    
    rigidbody.velocity = transform.up * Random.Range (-10, 10);
    rigidbody.velocity = transform.right * Random.Range (-10, 10);
    
    rigidbody.velocity = transform.forward * 100;
}