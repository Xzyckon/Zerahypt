function Update(){

    if (Input.GetMouseButtonDown(1)) {
     transform.localRotation.x = 0;
     transform.localRotation.y = 0;
     transform.localRotation.z = 0;
     }
    if (!Input.GetMouseButton(1)) {
     transform.rotation.x = 0;
     transform.localRotation.y = 0;
     transform.localRotation.z = 0;
    }
    
}