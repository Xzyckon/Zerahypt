#pragma strict
var MinRepetition : float = 0.2;

var Chance : float = 2;

InvokeRepeating("PlayStuff", 4, Random.Range (MinRepetition, Chance));

function PlayStuff () {

  var Interval: int = Random.Range(0, Chance);
       
  switch (Interval) {
  case 1:
   audio.Play();
   break;
}
}