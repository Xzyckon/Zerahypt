#pragma strict

var prefab : GameObject;

var LastSpawnPoint : Transform;

var SpawnPoint : Transform;

var MSTimeRep = 600;

var PrivTimeRep = 600;

var PushVelocity = 0;

var WallLength = 2000;

var WallWidth = 2000;

var UseSpacing: boolean;

var Spacing = 1000;

function Start () {

PrivTimeRep = MSTimeRep;

var gO = new GameObject("LastSpawn");
		gO.transform.position = transform.position;
        gO.transform.rotation = transform.rotation;
        LastSpawnPoint = gO.transform;
		
var gO2 = new GameObject("CurrentSpawn");
		gO2.transform.position = transform.position;
        gO2.transform.rotation = transform.rotation;
        SpawnPoint = gO2.transform;
        
Spawn();

}

function Update () {

MSTimeRep -= 1;

if(MSTimeRep < 1){
MSTimeRep = PrivTimeRep;
Spawn();
}

}

function Spawn () {

 if(UseSpacing){
 
 SpawnPoint.position = transform.position + transform.right * Random.Range(-WallLength,WallLength)
                                          + transform.forward * Random.Range(-WallWidth,WallWidth);
 
 if(Vector3.Distance(SpawnPoint.position, LastSpawnPoint.position) < Spacing){
 MSTimeRep = 6;
 SpawnPoint.position = transform.position + transform.right * Random.Range(-WallLength,WallLength)
                                          + transform.forward * Random.Range(-WallWidth,WallWidth);
 }else{
 var Thing1 = Instantiate(prefab, SpawnPoint.position, transform.rotation);
 Thing1.rigidbody.velocity = transform.forward * PushVelocity * 0.45;
 LastSpawnPoint.position = Thing1.transform.position;
 }
 
 }else{
 var Thing2 = Instantiate(prefab, transform.position + transform.right * Random.Range(-WallLength,WallLength), transform.rotation);
 Thing2.rigidbody.velocity = transform.forward * PushVelocity * 0.45;
 }
 
}