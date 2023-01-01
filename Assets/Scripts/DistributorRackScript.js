
var SpawnCountdown = 2;

var SpawnSequenceTime = 0.2;

var Spawner1 : GameObject;
var Spawner2 : GameObject;
var Spawner3 : GameObject;
var Spawner4 : GameObject;
var Spawner5 : GameObject;
var Spawner6 : GameObject;
var Spawner7 : GameObject;
var Spawner8 : GameObject;
var Spawner9 : GameObject;
var Spawner10 : GameObject;
var Spawner11 : GameObject;
var Spawner12 : GameObject;

var SpawnGO : GameObject;

var Col : MeshCollider;

function Start () {

yield WaitForSeconds (SpawnCountdown);

Col.material = null;

Instantiate(SpawnGO, Spawner1.transform.position, Spawner1.transform.rotation);
Spawner1.SetActive (false);

yield WaitForSeconds (SpawnSequenceTime);

Instantiate(SpawnGO, Spawner2.transform.position, Spawner2.transform.rotation);
Spawner2.SetActive (false);

yield WaitForSeconds (SpawnSequenceTime);

Instantiate(SpawnGO, Spawner3.transform.position, Spawner3.transform.rotation);
Spawner3.SetActive (false);

yield WaitForSeconds (SpawnSequenceTime);

Instantiate(SpawnGO, Spawner4.transform.position, Spawner4.transform.rotation);
Spawner4.SetActive (false);

yield WaitForSeconds (SpawnSequenceTime);

Instantiate(SpawnGO, Spawner5.transform.position, Spawner5.transform.rotation);
Spawner5.SetActive (false);

yield WaitForSeconds (SpawnSequenceTime);

Instantiate(SpawnGO, Spawner6.transform.position, Spawner6.transform.rotation);
Spawner6.SetActive (false);

yield WaitForSeconds (SpawnSequenceTime);

Instantiate(SpawnGO, Spawner7.transform.position, Spawner7.transform.rotation);
Spawner7.SetActive (false);

yield WaitForSeconds (SpawnSequenceTime);

Instantiate(SpawnGO, Spawner8.transform.position, Spawner8.transform.rotation);
Spawner8.SetActive (false);

yield WaitForSeconds (SpawnSequenceTime);

Instantiate(SpawnGO, Spawner9.transform.position, Spawner9.transform.rotation);
Spawner9.SetActive (false);

yield WaitForSeconds (SpawnSequenceTime);

Instantiate(SpawnGO, Spawner10.transform.position, Spawner10.transform.rotation);
Spawner10.SetActive (false);

yield WaitForSeconds (SpawnSequenceTime);

Instantiate(SpawnGO, Spawner11.transform.position, Spawner11.transform.rotation);
Spawner11.SetActive (false);

yield WaitForSeconds (SpawnSequenceTime);

Instantiate(SpawnGO, Spawner12.transform.position, Spawner12.transform.rotation);
Spawner12.SetActive (false);

}

function FixedUpdate () {

}