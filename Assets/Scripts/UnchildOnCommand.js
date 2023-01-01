#pragma strict

var Unchild: boolean;

function Update () {
if(Unchild){
transform.parent = null;
Destroy(this);
}
}