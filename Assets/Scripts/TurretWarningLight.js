
var LightingUp : boolean;
var WarningLight : GameObject;

function Update () {

if(AgrianNetwork.instance.RedAlertTime > 1 && !LightingUp){
LightingUp = true;
LightOn ();
}

}

function LightOn () {
yield WaitForSeconds (2);
WarningLight.gameObject.SetActive (true);
yield WaitForSeconds (30);
WarningLight.gameObject.SetActive (false);
LightingUp = false;
}