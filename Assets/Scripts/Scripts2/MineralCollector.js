#pragma strict
var ContainerTarget : MineralContainer;
var MiningBeam : GameObject;
var hitDistance : float = 9999;

function Start()
{
	if(ContainerTarget == null)
	{
		Debug.LogError("Assign the Container in the hierarchy for the MineralCollector on the GameObject called "
		+ this.name, this);
	}
}

private var lastTime : float;

function Update(){
var hit : RaycastHit;
if (Physics.Raycast(transform.position, transform.forward, hit, hitDistance)){


if(MiningBeam.activeInHierarchy){



if(hit.collider.gameObject.name.ToLower().Contains("mineral")){
if(Time.time - lastTime > 1f){
var MineralInfo : MineralInformation = hit.collider.gameObject.GetComponent(MineralInformation);
				
if(MineralInfo != null){
var empty : int = 0;
var i : int;
for(i = 0; i < MineralInfo.Minerals.Count; i++){
if(MineralInfo.Minerals[i].mineralAmount > 0){
var incrementAmount : int = MineralInfo.Minerals[i].mineralReceivePerSec;

MineralInfo.Minerals[i].mineralAmount = Mathf.Clamp(MineralInfo.Minerals[i].mineralAmount - incrementAmount, 0, 1000000);
ContainerTarget.InsertMineralToContainer(MineralInfo.Minerals[i].mineralType, incrementAmount);
}else{
empty++;
}
}
lastTime = Time.time;
					
if(empty >= MineralInfo.Minerals.Count){
Instantiate(MineralInfo.CrumblePrefab,
hit.collider.gameObject.transform.position,
hit.collider.gameObject.transform.rotation);
Destroy(hit.collider.gameObject);
}
}
}
}else{








if(Time.time - lastTime > 1f){
ContainerTarget.InsertMineralToContainer(0, 10);
lastTime = Time.time;
}









}
}
}
}