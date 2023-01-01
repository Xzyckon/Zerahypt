#pragma strict
var target : Transform;
var IsNear : boolean = false;

var MainScript : ReactiveObject;

var Persist : boolean;

var EnterSymbol : boolean;
var InteractSymbol : boolean;
var TalkSymbol : boolean;
var OpenSymbol : boolean;
var AmmoSymbol : boolean;

function Start () {
if(EnterSymbol)
target = Symbols.instance.Enter;
if(InteractSymbol)
target = Symbols.instance.Interact;
if(TalkSymbol)
target = Symbols.instance.Talk;
if(OpenSymbol)
target = Symbols.instance.Open;
if(AmmoSymbol)
target = Symbols.instance.Ammo;
}

function OnTriggerEnter(other : Collider) {
    if(other.name.Contains("TC1p") && WorldInformation.playerCar == "null"){
     if(target)
        target.gameObject.SetActive (true);
        IsNear = true;
        
        if(MainScript)
        MainScript.Entered = true;
}
}

function OnTriggerExit(other : Collider) {
    if(other.name.Contains("TC1p") && WorldInformation.playerCar == "null"){
     if(target)
        target.gameObject.SetActive (false);
        IsNear = false;
        
        if(MainScript)
        MainScript.Entered = false;
}
}

function Update () {
  if(IsNear)
  if(Input.GetKeyDown(KeyCode.E)){
  if(!Persist){
  target.gameObject.SetActive (false);
  IsNear = false;
  }
  }
}