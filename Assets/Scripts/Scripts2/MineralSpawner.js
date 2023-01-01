#pragma strict
import System.Collections.Generic;
public static var AllMineralsInGame : List.<GameObject> = new List.<GameObject>();
public static var MaxMineralsInScene : int = 8;

var OnePerc : GameObject;
var FivePerc : GameObject;
var TenPerc : GameObject;
var TwentyfivePerc : GameObject;
var FiftyPerc : GameObject;
var SixtyPerc : GameObject;
var SeventyPerc : GameObject;
var EightyPerc : GameObject;
var NinetyPerc : GameObject;
var HundredPerc : GameObject;

var minSpawnRate : float;
var maxSpawnRate : float;

private var currentSpawnRate : float;
private var lastTime : float;

function FixedUpdate () {
 if(AllMineralsInGame.Count < MaxMineralsInScene && Time.time - lastTime > currentSpawnRate)
 {
  UpdateSpawnRate();
  SelectObject();
  lastTime = Time.time;
 }
}

function SelectObject()
{
 var targetObj : GameObject;
 
 if(Random.Range(0, 100) < 1 && OnePerc != null)
 {
  targetObj = OnePerc;
 }
 else if(Random.Range(0, 100) < 5 && FivePerc != null)
 {
  targetObj = FivePerc;
 }
 else if(Random.Range(0, 100) < 10 && TenPerc != null)
 {
  targetObj = TenPerc;
 }
 else if(Random.Range(0, 100) < 25 && TwentyfivePerc != null)
 {
  targetObj = TwentyfivePerc;
 }
 else if(Random.Range(0, 100) < 50 && FiftyPerc != null)
 {
  targetObj = FiftyPerc;
 }
 else if(Random.Range(0, 100) < 60 && SixtyPerc != null)
 {
  targetObj = SixtyPerc;
 }
 else if(Random.Range(0, 100) < 70 && SeventyPerc != null)
 {
  targetObj = SeventyPerc;
 }
 else if(Random.Range(0, 100) < 80 && EightyPerc != null)
 {
  targetObj = EightyPerc;
 }
 else if(Random.Range(0, 100) < 90 && NinetyPerc != null)
 {
  targetObj = NinetyPerc;
 }
 else
 {
  targetObj = HundredPerc;
 }
 
 if(targetObj != null)
  SpawnObject(targetObj);
}

function SpawnObject(obj : GameObject)
{
 var inst = Instantiate(obj, transform.position, transform.rotation);
 inst.rigidbody.AddRelativeForce(Vector3(420, 0, 0) * (inst.rigidbody.mass * 10));
 inst.rigidbody.angularVelocity = Vector3(Random.Range(-0.1,0.1), Random.Range(-0.1,0.1), Random.Range(-0.1,0.1));
}

function UpdateSpawnRate()
{
 currentSpawnRate = Random.Range(minSpawnRate, maxSpawnRate);
}