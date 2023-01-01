#pragma strict

function Start () {
yield WaitForSeconds (0.1);
Destroy(GetComponent(SphereCollider));
}