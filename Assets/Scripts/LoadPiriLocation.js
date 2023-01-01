
var ExitedLocation : Transform;
var ExitedLocation2 : Transform;
var ExitedLocation3 : Transform;
var PlayerCamera : GameObject;
static var Exit1 : boolean;
static var Exit2 : boolean;
static var Exit3 : boolean;

static var CallingAmbulance: boolean = false;

var Once: boolean;

function Start () {

CallingAmbulance = false;
	
	if(Exit1) 
	   MoveToExit1();
		
	if(Exit2)
	   MoveToExit2();
	   
	if(Exit3)
	   MoveToExit3();
	   
yield WaitForSeconds (1);
WorldInformation.isSwitchingScene = false;
}

function Update (){

if(CallingAmbulance && !Once){
Once = true;
WorldInformation.instance.EscortHome();
}
}

function MoveToExit1(){
	PlayerInformation.instance.Pirizuka.position = ExitedLocation.position;
	PlayerInformation.instance.Pirizuka.rotation = ExitedLocation.rotation;
	PlayerInformation.instance.PhysCam.rotation = ExitedLocation.rotation;
	PlayerInformation.instance.PlayerCam.rotation = ExitedLocation.rotation;
	
	PlayerInformation.instance.Pirizuka.position.y += 1.8;
	
	Exit1 = false;
	
}
function MoveToExit2(){
	PlayerInformation.instance.Pirizuka.position = ExitedLocation2.position;
	PlayerInformation.instance.Pirizuka.rotation = ExitedLocation2.rotation;
	PlayerInformation.instance.PhysCam.rotation = ExitedLocation2.rotation;
	PlayerInformation.instance.PlayerCam.rotation = ExitedLocation2.rotation;
	
	PlayerInformation.instance.Pirizuka.position.y += 1.8;
	
	Exit2 = false;
}
function MoveToExit3(){
	PlayerInformation.instance.Pirizuka.position = ExitedLocation3.position;
	PlayerInformation.instance.Pirizuka.rotation = ExitedLocation3.rotation;
	PlayerInformation.instance.PhysCam.rotation = ExitedLocation3.rotation;
	PlayerInformation.instance.PlayerCam.rotation = ExitedLocation3.rotation;
	
	PlayerInformation.instance.Pirizuka.position.y += 1.8;
	
	Exit3 = false;
}