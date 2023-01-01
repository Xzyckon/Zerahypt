#pragma strict
var Lift : float = 100;
var CruiseLift : float = 100;
var CruiseHover : boolean = false;

var CanLiftFurther : boolean = true;

function Update () {
if(Input.GetKeyDown(KeyCode.PageDown)){
        if(CruiseHover == true){
            CruiseHover = false;
        } else {
            CruiseHover = true;
}
}
}

function FixedUpdate () {
	if(WorldInformation.playerCar == transform.parent.name){
		if(Input.GetKey(KeyCode.PageUp) && CanLiftFurther)
			rigidbody.AddForce(transform.forward * Lift);
			
		if(CruiseHover == true)
			rigidbody.AddForce(transform.forward * CruiseLift);
}
}