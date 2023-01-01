var Multiplier : float = 1;

function FixedUpdate () {
	if(WorldInformation.playerCar.Contains(transform.parent.name)){
		if(Input.GetKey(KeyCode.LeftShift))
		if(transform.position.y < 550)
			transform.position.y += 1 * Multiplier;
		if(Input.GetKey(KeyCode.LeftControl))
			transform.position.y -= 1 * Multiplier;
	}
}