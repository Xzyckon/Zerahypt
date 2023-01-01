
static var TCName : String = "sTC1p";

static var DidShootNum : int;

var forcedTCName : String;

var nameDisplayer : AngyScript;

InvokeRepeating("Switcher", 0.83, 0.25);

function Update () {

if(PlayerInformation.instance.Pirizuka.active){
transform.position = PlayerInformation.instance.Pirizuka.position + transform.up * 0.7;
}else{
transform.localPosition = Vector3(0, 0, 0);
}

//if(Input.GetKey(KeyCode.LeftShift))
//if(Input.GetKey("n"))
//if(Input.GetKey("p")){
//if(!name.Contains ("snyf"))
//name = "snyf";
//else
//name = "sTC1p";
//}

}

function Switcher () {

if(nameDisplayer){
nameDisplayer.myText = name;
nameDisplayer.DisplayName();
}

if(DidShootNum > 0)
DidShootNum -= 1;

if(forcedTCName){
name = forcedTCName;
return;
}

if(name.Contains ("snyf"))
return;

if(WorldInformation.playerCar == "null"){

if(WorldInformation.PiriExposed < 1){
name = "csTC1p";
WorldInformation.playerLevel = 0;
}else{
name = "sTC1p";
WorldInformation.playerLevel = 0;
}

}else{
name = TCName;

if(name.Contains ("7")){
if(DidShootNum > 1)
name = "mTC7";

if(WorldInformation.PiriExposed > 1)
name = "mTC1";

}

if(WorldInformation.PiriExposed > 1){

//Debug.Log("IsExposed " + WorldInformation.PiriExposed);

if(name.Contains ("sT"))
name = "sTC1p";
if(name.Contains ("mT"))
name = "mTC1p";
if(name.Contains ("bT"))
name = "bTC1p";
}

}

if(WorldInformation.playerCar.Contains ("broken"))
name = "broken";

}