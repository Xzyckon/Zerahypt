#pragma strict

var IsNear : boolean;

function OnTriggerEnter(other : Collider) {
    if(other.name.Contains("TC1") && WorldInformation.playerCar == "null")
    if(!other.name.Contains("TC1d")){
        IsNear = true;
}
}

function OnTriggerExit(other : Collider) {
    if(other.name.Contains("TC1") && WorldInformation.playerCar == "null")
    if(!other.name.Contains("TC1d")){
        IsNear = false;
        MineralRefinery.instance.ToggleRefinery(false);
        }
}

function Update () {
  if(Input.GetKeyDown(KeyCode.E) && IsNear){
  MineralRefinery.instance.ToggleRefinery(true);
  IsNear = false;
  }
}