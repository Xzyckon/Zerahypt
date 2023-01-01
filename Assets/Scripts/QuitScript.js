var Confirmer: GameObject;
var CanQuit: boolean;

var QuitTimer = 0;

InvokeRepeating("Timer", 1, 1);

function Update () {
if (Input.GetKeyDown(KeyCode.Escape)){
Confirmer.gameObject.SetActive (true);
QuitTimer = 4;
CanQuit = true;
}
}

function Timer () {

if(CanQuit){
if (Input.GetKey(KeyCode.Escape))
QuitTimer += 1;
else
QuitTimer -= 1;

if(QuitTimer > 0){

if(QuitTimer > 6){
QuitTimer = 4;
WorldInformation.instance.QuitZerahypt();
}

}else{
Confirmer.gameObject.SetActive (false);
CanQuit = false;
}
}

}