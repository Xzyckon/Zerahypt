
var Controller : AgrianContainerController;

var FrontMagnet : boolean;

var IsActive : boolean;

function Start () {
yield WaitForSeconds (2);
IsActive = true;
}

function OnTriggerEnter (other : Collider) {
if(IsActive){
if(other.collider.name.Contains ("Magnet")){
if(FrontMagnet){

if(!other.collider.name.Contains ("TowerMagnet")){
Controller.Detach = true;
Controller.Node1 = other.gameObject.transform;
Controller.Node2 = null;
Controller.Cbody1 = null;
}

}else{
Controller.Detach = true;
Controller.Node2 = other.gameObject.transform;
Controller.Node1 = null;
Controller.Cbody2 = null;
}
}
}
}