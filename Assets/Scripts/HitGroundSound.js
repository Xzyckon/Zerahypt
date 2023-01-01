var audioC1  : AudioClip;

var targetLayers : LayerMask;
var ContactRange : float = 1;

var isgrounded : boolean;
var AirTime : float;


function FixedUpdate () {

var randomValue : int = Random.Range(1, 4);

		if (Physics.Raycast (transform.position + Vector3(0,0,0), transform.up, ContactRange, targetLayers)) {
		isgrounded = true;
		} else {
		isgrounded = false;
}
		
if (isgrounded == true){

            if(AirTime >= 4){
    		audio.PlayOneShot(audioC1);
    }
	isgrounded = true;
	AirTime = 0;
}
}

function Update () {

if(isgrounded == false){
AirTime += 0.1;
}
}