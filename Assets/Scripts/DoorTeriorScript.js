var ControlLight : boolean;

var ActivateLight : boolean;

var ActivateFP : boolean;

function OnTriggerStay(other : Collider) {

ON = other.name;

if(WorldInformation.UsingVessel && WorldInformation.UsingClosedVessel)
  return;
  
if(WorldInformation.IsNopass)
  return;

if(!ControlLight){
if(ON.Contains("sTC1p")){
if(ActivateFP)
WorldInformation.FPMode = true;
else
WorldInformation.FPMode = false;
}
}else{
if(ON.Contains("sTC1p")){
if(ActivateLight){
PlayerStronglight.Activated = true;
WorldInformation.AmbOn = true;
}else{
PlayerStronglight.Activated = false;
WorldInformation.AmbOff = true;
}
}
}

}