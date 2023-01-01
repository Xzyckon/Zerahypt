private var x0 : int;
private var y0 : int;
private var z0 : int;
var LowSpeed1 : GameObject;
var LowSpeed2 : GameObject;
var LowSpeed3 : GameObject;
var HighSpeed1 : GameObject;
var HighSpeed2 : GameObject;
var HighSpeed3 : GameObject;
var randomseed : float;

private var cooldown2 : int = 40;
var isgrounded : boolean;
var AirTime : float;

function Update () {
x0 = transform.position.x;
y0 = transform.position.y;
z0 = transform.position.z;

if(isgrounded == false){
AirTime += 0.1;
}
}

    //private var cooldown2 : int = 20;
    //private var height : int;
    //private var oldheight : int;
    //private var isgrounded : boolean;
function OnCollisionEnter(theCollision : Collision){
    if (theCollision.gameObject.tag.Contains("Te")){
    
    randomseed = Random.value;
    
    if(AirTime >= 4 && AirTime < 30){
    		if(randomseed < 0.3){
    		Instantiate(LowSpeed1,new Vector3(x0, y0, z0),transform.rotation);
    		} else if(randomseed >= 0.3 && randomseed < 0.6){
    		Instantiate(LowSpeed2,new Vector3(x0, y0, z0),transform.rotation);
    		} else if(randomseed >= 0.6){
    		Instantiate(LowSpeed3,new Vector3(x0, y0, z0),transform.rotation);
    		}
    	} else if(AirTime >= 30) {
    		if(randomseed < 0.3){
    		Instantiate(HighSpeed1,new Vector3(x0, y0, z0),transform.rotation);
    		} else if(randomseed >= 0.3 && randomseed < 0.6){
    		Instantiate(HighSpeed2,new Vector3(x0, y0, z0),transform.rotation);
    		} else if(randomseed >= 0.6){
    		Instantiate(HighSpeed3,new Vector3(x0, y0, z0),transform.rotation);
    		}
    		    		
    	}
		isgrounded = true;
		AirTime = 0;
	}
}
	
function OnCollisionExit(theCollision : Collision){
	if (theCollision.gameObject.tag.Contains("Te")){
		isgrounded = false;
	}
}