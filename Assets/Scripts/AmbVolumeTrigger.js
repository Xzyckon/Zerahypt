var TAmb1Vol : float = 1;
var TAmb2Vol : float = 0;

var Amb1Script : AmbVolumeController;
var Amb2Script : AmbVolumeController;


function OnTriggerEnter (other : Collider) {
if(other.name.Contains("TC1")){
Amb1Script.Amb1Vol = TAmb1Vol;
Amb2Script.Amb2Vol = TAmb2Vol;
}
}