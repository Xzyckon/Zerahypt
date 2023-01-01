#pragma strict
static var vessel_buttons : VesselList_Button[] = new VesselList_Button[5];
static var selected_button : VesselList_Button;
static var selected_index : int;

var index : int;

function Awake() {
	vessel_buttons[index] = this;
}

function OnMouseDown() {
	if (index + VesselList.offset < VesselList.Count()) {
		if (selected_button != null) {
			selected_button.UpdateState(false, -1);
			if (selected_button == this) {
				selected_button = null;
				selected_index = -1;
			} else {
				this.UpdateState(true, index);
				selected_button = this;
			}
		} else {
			this.UpdateState(true, index);
			selected_button = this;
		}
	}
	VesselList.UpdateSummonButton();
}

function UpdateUI(str : String) {
	transform.GetChild(2).GetComponent(TextMesh).text = str;
}

function UpdateState(selected : boolean, new_index : int) {
	transform.GetChild(0).renderer.enabled = selected;
	if (selected) selected_index = new_index;
}

static function DeselectAll() {
	//if (selected_index == -1) return;
	if (selected_button != null) {
		selected_button.transform.GetChild(0).renderer.enabled = false;
		selected_button = null;
	}
}

static function Count() : int {
	return vessel_buttons.Length;
}