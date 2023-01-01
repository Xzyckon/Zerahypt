#pragma strict

var Ceptobarge : GameObject;
var Container : GameObject;
var ContainerModel : GameObject;
var ContainerEmptyModel : GameObject;

var DidItNow : boolean;

var Working : boolean;

var Arrive : boolean;
var Position : boolean;
var Drop : boolean;
var GoingToLeave : boolean;
var Leaving : boolean;

function Start () {
yield WaitForSeconds (120);
Ceptobarge.gameObject.SetActive (true);
Working = true;

Ceptobarge.rigidbody.velocity = Ceptobarge.transform.up * -8000 * 0.45;
}

function DoItNow () {
StopAllCoroutines();
Ceptobarge.gameObject.SetActive (true);
Working = true;

Ceptobarge.rigidbody.velocity = Ceptobarge.transform.up * -8000 * 0.45;
}

function FixedUpdate () {

if (Input.GetKey(KeyCode.LeftShift) && Input.GetKey("l") && !DidItNow){
DoItNow();
DidItNow = true;
}

if(Working){


if(Arrive && !Position){
if(Ceptobarge.rigidbody.velocity.magnitude > 100)
Ceptobarge.rigidbody.AddForce(Ceptobarge.transform.up * 5000000);
Ceptobarge.rigidbody.drag = 3;
if(Ceptobarge.rigidbody.velocity.magnitude < 100)
Position = true;
}

if(Position && !Drop){

if(Vector3.Distance(Ceptobarge.transform.position, transform.position) > 20)
if(Ceptobarge.rigidbody.velocity.magnitude < 50)
Ceptobarge.rigidbody.drag = 1;

if(Vector3.Distance(Ceptobarge.transform.position, transform.position) < 20)
if(Ceptobarge.rigidbody.velocity.magnitude < 50)
Ceptobarge.rigidbody.drag = 4;

Ceptobarge.rigidbody.AddForce(Ceptobarge.transform.up * -50000);
}

if(Vector3.Distance(Ceptobarge.transform.position, transform.position) < 1000 && !Arrive){
Arrive = true;
}

if(Vector3.Distance(Ceptobarge.transform.position, transform.position) < 1 && !Drop){
Drop = true;
DropContainer();
}

if(ContainerEmptyModel.active && !GoingToLeave){
Ceptobarge.rigidbody.drag = 0.1;
GoingToLeave = true;
Done();
}

if(Leaving){
if(Ceptobarge.rigidbody.velocity.magnitude < 1000)
Ceptobarge.rigidbody.AddForce(Ceptobarge.transform.up * -100000);
if(Vector3.Distance(Ceptobarge.transform.position, transform.position) > 30000)
Destroy(gameObject);
}

}
}

function DropContainer () {
yield WaitForSeconds (2);
Container.gameObject.SetActive (true);
ContainerModel.gameObject.SetActive (false);
}

function Done () {
yield WaitForSeconds (1);
Ceptobarge.audio.Play();
Leaving = true;
}