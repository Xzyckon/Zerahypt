#pragma strict

var HUDAni : Animation;

var Hidden : boolean;

function Update () {
if(Input.GetKeyDown(KeyCode.H))
if(Input.GetKey(KeyCode.LeftShift))
if(!CameraScript.InInterface)
Hide();
}

function Hide () {
        if(Hidden){
           HUDAni.CrossFade("ZerahyptInterfaceShow");
           Hidden = false;
           }else{
           HUDAni.CrossFade("ZerahyptInterfaceHide");
           Hidden = true;
           }
}