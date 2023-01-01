#pragma strict
public static var instance : VehicleManager;
enum VMState { CreateInstance, DuplicateInstance, HoldInstance }

function Awake() {
	DontDestroyOnLoad(gameObject);
	switch(GetCurrentCircumstances()) {
		case VMState.CreateInstance:
			instance = this;
			break;
		case VMState.DuplicateInstance:
			Destroy(gameObject);
			break;
	}
}

function Start() {
	var _path : String = SaveInfo.GetAppData() + "/Zerahypt/Initializer.ini";
	if (System.IO.File.Exists(_path)) {
		var data : String = System.IO.File.ReadAllText(_path);
		if (data.Length > 0) {
			eval(data);
		}
	}
}

static function EnterVehicle(_vehicle : MainVehicleController, _door : CarDoorController) {
	WorldInformation.vehicleDoorController = _door;
	WorldInformation.vehicleController = _vehicle;
	WorldInformation.vehicleController.Update2();
}

static function ExitVehicle() {
	WorldInformation.vehicleController.Update2();
	
	WorldInformation.vehicleDoorController = null;
	WorldInformation.vehicleController = null;
}

function GetCurrentCircumstances() : VMState {
	if (instance == null) return VMState.CreateInstance;
	else if (instance == this) return VMState.HoldInstance;
	else return VMState.DuplicateInstance;
}

function Update() {
	if (Input.GetKeyDown(KeyCode.E)){
	if (!Input.GetMouseButton(1) && !FurtherActionScript.IsActive && !TalkScript.isTyping && !WorldInformation.isHolding && !WorldInformation.PiriIsHurt){
		if (WorldInformation.vehicleDoorController != null) {
			if (!WorldInformation.vehicleDoorController.inVehicle) {
				if (WorldInformation.vehicleDoorController.nearVehicle)
					WorldInformation.vehicleDoorController.Enter();
			} else if(WorldInformation.CanLeaveVehicle) {
				WorldInformation.vehicleDoorController.Exit();
			}
		}
	}
	}
	
	if (WorldInformation.vehicleController != null) {
		WorldInformation.vehicleController.ArtificialUpdate();
	if (WorldInformation.vehicleDoorController != null)
		WorldInformation.vehicleDoorController.ArtificialUpdate();
	}
}