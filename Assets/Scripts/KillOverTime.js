var Seconds = 8;

var UseRelier : boolean;

var IsRemoving : boolean;
 
function Start(){
if(!UseRelier)
    Destroy();
}

function Update(){
if(UseRelier && IsRemoving){
    IsRemoving = false;
    Destroy();
    }
}
 
function Destroy(){
    yield WaitForSeconds(Seconds);
    Destroy(gameObject);
}