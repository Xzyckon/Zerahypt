var Multiplier : float;

var Lengthrandomizer : float = 6.0;
var BandF : boolean;
var Forth : boolean;

var MinDelay : float = 6.0;
var MaxDelay : float = 12.0;


function PlayClipAndChange(){
    rigidbody.AddForce(transform.up * Multiplier, ForceMode.Impulse);
}

var lastTime : float;
function Update () {
 if(Time.time - lastTime > Lengthrandomizer) {
  Lengthrandomizer = MinDelay + Random.value * (MaxDelay-MinDelay);
  PlayClipAndChange();
  lastTime = Time.time;
 }
}