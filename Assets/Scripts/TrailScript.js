var targetLayers : LayerMask;

var VelSource : Rigidbody;

var isBig : boolean;

var Trail1 : GameObject;
var Trail2 : GameObject;

var TrailW1 : GameObject;
var TrailW2 : GameObject;

var Trail1TF : Transform;
var Trail2TF : Transform;

var TrailW1TF : Transform;
var TrailW2TF : Transform;

var Trail1PS : ParticleSystem;
var Trail2PS : ParticleSystem;

var TrailW1PS : ParticleSystem;
var TrailW2PS : ParticleSystem;

var OverWater : boolean;

var ContactDist : float = 2;
var TrailBaseX : float = 4;
var TrailBaseY : float = 4;

var speed : float;
var Stop : boolean;

function Start () {

if(WorldInformation.instance.AreaSpace == true)
Destroy(this);

if(WorldInformation.instance.AreaDark == false){

if(WorldInformation.instance.AreaBeige == true){
if(!isBig){
var Prefabionaise1 = Resources.Load("Trails/TrailStreakBeige", GameObject) as GameObject;
Trail1 = Instantiate(Prefabionaise1, transform.position, transform.rotation);
Trail1TF = Trail1.transform;
Trail1TF.parent = gameObject.transform;
Trail1TF.localScale = Vector3(TrailBaseX, TrailBaseY, 0.2);
}else{
var Prefabionaise1B = Resources.Load("Trails/TrailStreakBeigeB", GameObject) as GameObject;
Trail1 = Instantiate(Prefabionaise1B, transform.position, transform.rotation);
Trail1TF = Trail1.transform;
Trail1TF.parent = gameObject.transform;
Trail1TF.localScale = Vector3(TrailBaseX, TrailBaseY, 0.2);
}

if(!isBig){
var Prefabionaise2 = Resources.Load("Trails/TrailCloudBeige", GameObject) as GameObject;
Trail2 = Instantiate(Prefabionaise2, transform.position, transform.rotation);
Trail2TF = Trail2.transform;
Trail2TF.parent = gameObject.transform;
Trail2TF.localScale = Vector3(TrailBaseX, TrailBaseY, 0.2);
}else{
var Prefabionaise2B = Resources.Load("Trails/TrailCloudBeigeB", GameObject) as GameObject;
Trail2 = Instantiate(Prefabionaise2B, transform.position, transform.rotation);
Trail2TF = Trail2.transform;
Trail2TF.parent = gameObject.transform;
Trail2TF.localScale = Vector3(TrailBaseX, TrailBaseY, 0.2);
}

var Prefabionaise3 = Resources.Load("Trails/TrailStreakWater", GameObject) as GameObject;
TrailW1 = Instantiate(Prefabionaise3, transform.position, transform.rotation);
TrailW1TF = TrailW1.transform;
TrailW1TF.parent = gameObject.transform;
TrailW1TF.localScale = Vector3(TrailBaseX, TrailBaseY, 0.2);

var Prefabionaise4 = Resources.Load("Trails/TrailCloudWater", GameObject) as GameObject;
TrailW2 = Instantiate(Prefabionaise4, transform.position, transform.rotation);
TrailW2TF = TrailW2.transform;
TrailW2TF.parent = gameObject.transform;
TrailW2TF.localScale = Vector3(TrailBaseX, TrailBaseY, 0.2);

Trail1PS = Trail1.GetComponent(ParticleSystem);
Trail2PS = Trail2.GetComponent(ParticleSystem);
TrailW1PS = TrailW1.GetComponent(ParticleSystem);
TrailW2PS = TrailW2.GetComponent(ParticleSystem);
}
if(WorldInformation.instance.AreaGray == true){
if(!isBig){
var Prefabionaise5 = Resources.Load("Trails/TrailStreakPale", GameObject) as GameObject;
Trail1 = Instantiate(Prefabionaise5, transform.position, transform.rotation);
Trail1TF = Trail1.transform;
Trail1TF.parent = gameObject.transform;
Trail1TF.localScale = Vector3(TrailBaseX, TrailBaseY, 0.2);
}else{
var Prefabionaise5B = Resources.Load("Trails/TrailStreakPaleB", GameObject) as GameObject;
Trail1 = Instantiate(Prefabionaise5B, transform.position, transform.rotation);
Trail1TF = Trail1.transform;
Trail1TF.parent = gameObject.transform;
Trail1TF.localScale = Vector3(TrailBaseX, TrailBaseY, 0.2);
}

if(!isBig){
var Prefabionaise6 = Resources.Load("Trails/TrailCloudPale", GameObject) as GameObject;
Trail2 = Instantiate(Prefabionaise6, transform.position, transform.rotation);
Trail2TF = Trail2.transform;
Trail2TF.parent = gameObject.transform;
Trail2TF.localScale = Vector3(TrailBaseX, TrailBaseY, 0.2);
}else{
var Prefabionaise6B = Resources.Load("Trails/TrailCloudPaleB", GameObject) as GameObject;
Trail2 = Instantiate(Prefabionaise6B, transform.position, transform.rotation);
Trail2TF = Trail2.transform;
Trail2TF.parent = gameObject.transform;
Trail2TF.localScale = Vector3(TrailBaseX, TrailBaseY, 0.2);
}

var Prefabionaise7 = Resources.Load("Trails/TrailStreakWater", GameObject) as GameObject;
TrailW1 = Instantiate(Prefabionaise7, transform.position, transform.rotation);
TrailW1TF = TrailW1.transform;
TrailW1TF.parent = gameObject.transform;
TrailW1TF.localScale = Vector3(TrailBaseX, TrailBaseY, 0.2);

var Prefabionaise8 = Resources.Load("Trails/TrailCloudWater", GameObject) as GameObject;
TrailW2 = Instantiate(Prefabionaise8, transform.position, transform.rotation);
TrailW2TF = TrailW2.transform;
TrailW2TF.parent = gameObject.transform;
TrailW2TF.localScale = Vector3(TrailBaseX, TrailBaseY, 0.2);

Trail1PS = Trail1.GetComponent(ParticleSystem);
Trail2PS = Trail2.GetComponent(ParticleSystem);
TrailW1PS = TrailW1.GetComponent(ParticleSystem);
TrailW2PS = TrailW2.GetComponent(ParticleSystem);

}
}else{

if(WorldInformation.instance.AreaDut == false){
if(!isBig){
var Prefabionaise9 = Resources.Load("Trails/TrailStreakDark", GameObject) as GameObject;
Trail1 = Instantiate(Prefabionaise9, transform.position, transform.rotation);
Trail1TF = Trail1.transform;
Trail1TF.parent = gameObject.transform;
Trail1TF.localScale = Vector3(TrailBaseX, TrailBaseY, 0.2);
}else{
var Prefabionaise9B = Resources.Load("Trails/TrailStreakDarkB", GameObject) as GameObject;
Trail1 = Instantiate(Prefabionaise9B, transform.position, transform.rotation);
Trail1TF = Trail1.transform;
Trail1TF.parent = gameObject.transform;
Trail1TF.localScale = Vector3(TrailBaseX, TrailBaseY, 0.2);
}

if(!isBig){
var Prefabionaise10 = Resources.Load("Trails/TrailCloudDark", GameObject) as GameObject;
Trail2 = Instantiate(Prefabionaise10, transform.position, transform.rotation);
Trail2TF = Trail2.transform;
Trail2TF.parent = gameObject.transform;
Trail2TF.localScale = Vector3(TrailBaseX, TrailBaseY, 0.2);
}else{
var Prefabionaise10B = Resources.Load("Trails/TrailCloudDarkB", GameObject) as GameObject;
Trail2 = Instantiate(Prefabionaise10B, transform.position, transform.rotation);
Trail2TF = Trail2.transform;
Trail2TF.parent = gameObject.transform;
Trail2TF.localScale = Vector3(TrailBaseX, TrailBaseY, 0.2);
}
}else{
if(!isBig){
var Prefabionaise13 = Resources.Load("Trails/TrailStreakDut", GameObject) as GameObject;
Trail1 = Instantiate(Prefabionaise13, transform.position, transform.rotation);
Trail1TF = Trail1.transform;
Trail1TF.parent = gameObject.transform;
Trail1TF.localScale = Vector3(TrailBaseX, TrailBaseY, 0.2);
}else{
var Prefabionaise13B = Resources.Load("Trails/TrailStreakDutB", GameObject) as GameObject;
Trail1 = Instantiate(Prefabionaise13B, transform.position, transform.rotation);
Trail1TF = Trail1.transform;
Trail1TF.parent = gameObject.transform;
Trail1TF.localScale = Vector3(TrailBaseX, TrailBaseY, 0.2);
}

if(!isBig){
var Prefabionaise14 = Resources.Load("Trails/TrailCloudDut", GameObject) as GameObject;
Trail2 = Instantiate(Prefabionaise14, transform.position, transform.rotation);
Trail2TF = Trail2.transform;
Trail2TF.parent = gameObject.transform;
Trail2TF.localScale = Vector3(TrailBaseX, TrailBaseY, 0.2);
}else{
var Prefabionaise14B = Resources.Load("Trails/TrailCloudDutB", GameObject) as GameObject;
Trail2 = Instantiate(Prefabionaise14B, transform.position, transform.rotation);
Trail2TF = Trail2.transform;
Trail2TF.parent = gameObject.transform;
Trail2TF.localScale = Vector3(TrailBaseX, TrailBaseY, 0.2);
}
}

var Prefabionaise11 = Resources.Load("Trails/TrailStreakWater", GameObject) as GameObject;
TrailW1 = Instantiate(Prefabionaise11, transform.position, transform.rotation);
TrailW1TF = TrailW1.transform;
TrailW1TF.parent = gameObject.transform;
TrailW1TF.localScale = Vector3(TrailBaseX, TrailBaseY, 0.2);

var Prefabionaise12 = Resources.Load("Trails/TrailCloudWater", GameObject) as GameObject;
TrailW2 = Instantiate(Prefabionaise12, transform.position, transform.rotation);
TrailW2TF = TrailW2.transform;
TrailW2TF.parent = gameObject.transform;
TrailW2TF.localScale = Vector3(TrailBaseX, TrailBaseY, 0.2);

Trail1PS = Trail1.GetComponent(ParticleSystem);
Trail2PS = Trail2.GetComponent(ParticleSystem);
TrailW1PS = TrailW1.GetComponent(ParticleSystem);
TrailW2PS = TrailW2.GetComponent(ParticleSystem);

}

Trail1PS.emissionRate = 1;
Trail2PS.emissionRate = 1;
TrailW1PS.emissionRate = 1;
TrailW2PS.emissionRate = 1;

}

function Update () {

if(WorldInformation.instance.AreaSpace == true)
return;

if(!Stop){

var hit : RaycastHit;

speed = VelSource.velocity.magnitude;

if (Physics.Raycast (transform.position, Vector3.down, hit, ContactDist, targetLayers)) {

if(!hit.collider.tag.Contains ("tru")){

var speedC1 = speed * 0.2;

if(speed > 10){

if(OverWater){
TrailW1PS.emissionRate = speedC1 * 6;
}else{
Trail1PS.emissionRate = speedC1 * 6;
}


}else{
if(TrailW1PS.emissionRate > 0)
TrailW1PS.emissionRate -= 1;
if(Trail1PS.emissionRate > 0)
Trail1PS.emissionRate -= 1;
}

if(speed > 5){

if(OverWater){
TrailW2PS.emissionRate = speedC1;
}else{
if(!isBig)
Trail2PS.emissionRate = speedC1;
else
Trail2PS.emissionRate = speedC1 * 2;
}

}else{
if(TrailW2PS.emissionRate > 0)
Trail2PS.emissionRate -= 1;
if(Trail2PS.emissionRate > 0)
Trail2PS.emissionRate -= 1;
}
		
		if(hit.collider.name == "Wa"){
		OverWater = true;
		Trail1PS.emissionRate = 0;
        Trail2PS.emissionRate = 0;
		}else{
		OverWater = false;
		TrailW1PS.emissionRate = 0;
        TrailW2PS.emissionRate = 0;
		}
		
		Trail1TF.position = hit.point;
		Trail2TF.position = hit.point;
		TrailW1TF.position = hit.point;
		TrailW2TF.position = hit.point;
}else{
var speedC2 = speed * 0.05;
if(Trail1PS.emissionRate > 0)
Trail1PS.emissionRate -= 1 + speedC2;
if(Trail2PS.emissionRate > 0)
Trail2PS.emissionRate -= 1 + speedC2;
if(TrailW1PS.emissionRate > 0)
TrailW1PS.emissionRate -= 1 + speedC2;
if(TrailW2PS.emissionRate > 0)
TrailW2PS.emissionRate -= 1 + speedC2;
}

}else{
		
var speedC3 = speed * 0.05;
        
if(Trail1PS.emissionRate > 0)
Trail1PS.emissionRate -= 1 + speedC3;
if(Trail2PS.emissionRate > 0)
Trail2PS.emissionRate -= 1 + speedC3;
if(TrailW1PS.emissionRate > 0)
TrailW1PS.emissionRate -= 1 + speedC3;
if(TrailW2PS.emissionRate > 0)
TrailW2PS.emissionRate -= 1 + speedC3;
}

}else{
Trail1PS.emissionRate = 0;
Trail2PS.emissionRate = 0;
TrailW1PS.emissionRate = 0;
TrailW2PS.emissionRate = 0;
}
}