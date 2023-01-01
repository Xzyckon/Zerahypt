#pragma strict

var breaksOn : boolean;

var AnchorLength : float = 2;

function Start () {
if(breaksOn == true){
            breaksOn = true;
            GetComponent(ConfigurableJoint).targetPosition = Vector3(0,0,AnchorLength);
}
}

function Update () {
if(WorldInformation.playerCar == transform.parent.name){
   
        if(breaksOn == false){
            breaksOn = false;
            GetComponent(ConfigurableJoint).targetPosition = Vector3(0,0,0);
}
        if(breaksOn == true){
            breaksOn = true;
            GetComponent(ConfigurableJoint).targetPosition = Vector3(0,0,AnchorLength);
        }
}
}