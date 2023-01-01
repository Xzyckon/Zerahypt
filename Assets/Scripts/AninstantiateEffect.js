#pragma strict

var Prefab1 : GameObject;

var InstantiateLocation : Transform;

function InstantiateIt() {
Instantiate(Prefab1, InstantiateLocation.position, InstantiateLocation.rotation);
}