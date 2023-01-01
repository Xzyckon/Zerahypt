#pragma strict
import System.Collections.Generic;
import System.Xml;

var StaticStringOut : String;

var VLScroller : VesselList_Scroller;

static var instance : VesselList;
var VLTF : Transform;
var unlocked_vehicles : List.<VehicleLinker> = new List.<VehicleLinker>();

static var offset : int = 0;
var summonButton : GameObject;
var summonButton2 : GameObject;

var ModelSpawn : Transform;
var TheModel : GameObject;

function Awake() {
	instance = this;
}

function Start() {

StaticStringOut = null;

	yield 0;
	LoadList();
}

function OnDisable() {
	SaveList();
}

function OnMouseDown () {
	transform.parent.Translate(Vector3.right * -3);
	VLScroller.isActive = false;
}

function StringIn(vehicle_linker : VehicleLinker) {
	if (!ListContains(vehicle_linker)) {
		unlocked_vehicles.Add(vehicle_linker);
		Debug.Log(String.Format("Added {0} to the list with name {1}", vehicle_linker.vehicle_id, vehicle_linker.vehicle_name));
	}
	for (var i = 0; i < VesselList_Button.vessel_buttons.Length; i++) {
		if (unlocked_vehicles.Count <= i + offset) break;
		if(VesselList_Button.vessel_buttons.Length > i && VesselList_Button.vessel_buttons[i] != null) { 
			VesselList_Button.vessel_buttons[i].UpdateUI(unlocked_vehicles[i + offset].vehicle_name);
		}
	}
	VesselList_Scroll.UpdateUI();
}

function StringOut() : String {
	if (VesselList_Button.selected_index > -1) {
		return StringOut_I(VesselList_Button.selected_index + offset);
	}
	return null;
}

function StringOut_I(index : int) : String {
	return unlocked_vehicles[index].vehicle_id;
}

function IsVehicleInspect(display_string : String) : boolean {
	return display_string.Contains("Vessel");
}

private function ListContains(vehicle_linker : VehicleLinker) : boolean {
	var i : int;
	for (i = 0; i < unlocked_vehicles.Count; i++) {
		if (unlocked_vehicles[i].vehicle_id == vehicle_linker.vehicle_id) {
			return true;
		}
	}
	return false;
}

static function GetVehicle(index : int) : VehicleLinker {
	return instance.unlocked_vehicles[index];
}

static function Count() : int {
	return instance.unlocked_vehicles.Count;
}

static function UpdateSummonButton() {
instance.summonButton.SetActive(VesselList_Button.selected_button != null);
instance.summonButton2.SetActive(VesselList_Button.selected_button != null);
VesselList.instance.UpdateModel();
}

function UpdateModel() {
if(TheModel)
Destroy(TheModel);

var Prefabionaise = Resources.Load("VesselSilhouettes/S" + VesselList.instance.StringOut(), GameObject) as GameObject;
if(Prefabionaise){
TheModel = Instantiate(Prefabionaise, ModelSpawn.position, ModelSpawn.rotation);
var MTF = TheModel.transform;
MTF.parent = ModelSpawn.parent;
MTF.localScale = Vector3(MTF.localScale.x/14,MTF.localScale.y/14,MTF.localScale.z/14);
}
}

public function SaveList() {
	var xml_document : XmlDocument = new XmlDocument();
	xml_document.LoadXml(String.Format("<Vessels {0}=\"{1}\"></Vessels>", "zerahypt_version", WorldInformation.VersionID));

	var node_items : XmlNode = xml_document.GetElementsByTagName("Vessels")[0];
	for(var i = 0; i < unlocked_vehicles.Count; i++) {
		var new_item : XmlElement = xml_document.CreateElement("Item");
		new_item.SetAttribute("id", unlocked_vehicles[i].vehicle_id);
		new_item.SetAttribute("name", unlocked_vehicles[i].vehicle_name);
		node_items.AppendChild(new_item);
	}
	SaveInfo.SaveDataXml(GetKey(), xml_document);
}

public function LoadList() {
	if (!SaveInfo.HasData(GetKey())) {
		Debug.Log("VesselList empty, didnt load any data.");
		return;
	}
	
	var xml_data : String = SaveInfo.LoadData(GetKey());
	var xml_document : XmlDocument = new XmlDocument();
	xml_document.LoadXml(xml_data);
	
	var node_items : XmlNode = xml_document.GetElementsByTagName("Vessels")[0];
	var data_header = GetAttributes(node_items);
	
	if (data_header["zerahypt_version"] == WorldInformation.VersionID) {
		unlocked_vehicles.Clear();
		
		for (var node : XmlNode in node_items.ChildNodes) {
			var attributes = GetAttributes(node);
			
			var vehicle_id : String = attributes["id"];
			var vehicle_name : String = attributes["name"];
			StringIn(new VehicleLinker(vehicle_id, vehicle_name));
		}
	}
}

function GetAttributes(xml_node : XmlNode) : Dictionary.<String, String> {
	var attributes : Dictionary.<String, String> = new Dictionary.<String, String>();
	for (var att : XmlAttribute in xml_node.Attributes) {
		attributes.Add(att.Name, att.Value);
	}
	return attributes;
}

function GetKey() : String {
	return "Vessels/List";
}

@System.Serializable
class VehicleLinker {
	var vehicle_id : String;
	var vehicle_name : String;
	
	function VehicleLinker(id : String, name : String) {
		this.vehicle_id = id;
		this.vehicle_name = name;
	}
}