var Sound: GameObject;



function Update () {
if(WorldInformation.playerCar == transform.parent.name){
PlayIt();
}
}

function PlayIt () {
   if(Input.GetKeyDown(KeyCode.P)){
   
var TheThing = Instantiate(Sound, transform.position, Quaternion.Euler(transform.eulerAngles.x, transform.eulerAngles.y, transform.eulerAngles.z));
    TheThing.transform.parent = gameObject.transform;
    }
}