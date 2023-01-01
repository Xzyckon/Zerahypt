
function Start (){
yield WaitForSeconds (1);
GetComponent(MeshRenderer).enabled = true;
}


function OnCollisionEnter(){
    var Colly = GetComponent(SphereCollider);
    var Meshy = GetComponent(MeshRenderer);
    Destroy(Colly);
    Destroy(Meshy);
}