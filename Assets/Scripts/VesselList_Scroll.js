#pragma strict
import System.Collections.Generic;
public var offset : int = 1;

static var scroll_buttons : VesselList_Scroll[] = new VesselList_Scroll[2];

function Awake() {
	if (offset < 0)
		scroll_buttons[0] = this;
	else
		scroll_buttons[1] = this;
}

function Start() {
	this.CheckState();
}

function OnMouseDown() {
Scroll();
}

function Scroll() {
	if (!this.renderer.enabled || this.CheckState()) return;
	
	VesselList.offset = Mathf.Clamp(VesselList.offset + offset, 0, VesselList.Count() - VesselList_Button.Count());
	for (var i = 0; i < VesselList_Button.Count(); i++) {
		var _name : String = VesselList.GetVehicle(i + VesselList.offset).vehicle_name;
		VesselList_Button.vessel_buttons[i].UpdateUI(_name);
	}
	VesselList_Button.DeselectAll();
	
	scroll_buttons[0].UpdateState(VesselList.offset != 0);
	scroll_buttons[1].UpdateState(VesselList.offset < VesselList.Count() - VesselList_Button.Count());
}

function CheckState() : boolean {
	if (VesselList.Count() <= VesselList_Button.Count()) {
		this.UpdateState(false);
		return true;
	} else {
		if (VesselList.offset == 0 && scroll_buttons[0] == this) {
			return true;
		}
	}
	return false;
}

function UpdateState(enable : boolean) {
	this.renderer.enabled = enable;
}

static function UpdateUI() {
	for (var i = 0; i < scroll_buttons.Length; i++) {
		if (!scroll_buttons[i].CheckState())
			scroll_buttons[i].UpdateState(true);
	}
}