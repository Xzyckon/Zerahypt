function Update () {
     if(WorldInformation.playerCar.Contains(transform.parent.name)){
     
     if(CameraScript.InInterface == false){
     
		if(Input.GetKeyDown(KeyCode.Mouse0)){
			light.intensity = 0.6;
		} else if(Input.GetKeyUp(KeyCode.Mouse0)){
			light.intensity = 0;
		}
}
}
}