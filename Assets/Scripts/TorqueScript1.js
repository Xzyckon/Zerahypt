#pragma strict
var Power : float = 100;

function FixedUpdate () {
			
			rigidbody.AddTorque(transform.up * Power);
		
	}