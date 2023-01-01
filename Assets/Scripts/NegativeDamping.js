#pragma strict
var speed: float = 0.1;

function FixedUpdate () {
rigidbody.AddForce(rigidbody.velocity.normalized * speed);
}