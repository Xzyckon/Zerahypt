#pragma strict
public var Miner : GameObject;
public var compressedMineralPrefab : GameObject;
public var spawnLocation : Transform;
public var mineralContainer : MineralContainer;

public var AniName : String;
var AniObject : GameObject;

function Update () {
	if(Input.GetKeyDown(KeyCode.Alpha5) && HasEnoughToDispense()) {
		DispenseBlock();
	}
}

function DispenseBlock () {
	var spawnedObj = Instantiate(compressedMineralPrefab, spawnLocation.position, spawnLocation.rotation);
	var CM = spawnedObj.GetComponent(CompressedMinerals);
	
	var i : int;
	for(i = 0; i < mineralContainer.myMinerals.Count; i++) {
		CM.MineralData.Add(mineralContainer.myMinerals[i]);
	}
	mineralContainer.myMinerals.Clear();
	mineralContainer.currentMineralCount = 0;
	AniObject.animation.Play(AniName);
	
}

function HasEnoughToDispense() : boolean {
	var sum : int;
	var i : int;
	for(i = 0; i < mineralContainer.myMinerals.Count; i++) {
		sum += mineralContainer.myMinerals[i].mineralAmount;
	}
	return (sum >= Miner.GetComponent(MinerOnOff).MinerContainerCapacity);
}