#pragma strict
var Chunk : GameObject;

var TimeSpan : float = 2.7;

InvokeRepeating("BeamSequence", 0.05, 0.05);

function Start() {
yield WaitForSeconds (TimeSpan);
StopAllCoroutines();
Destroy(this);
}

function BeamSequence () {
Instantiate(Chunk, transform.position, transform.rotation);
}