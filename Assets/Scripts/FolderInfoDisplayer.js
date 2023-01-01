#pragma strict

import System.Collections.Generic;
import System.Xml;

static var instance : FolderInfoDisplayer;
var pages = new List.<GameObject>();

var CurrentPage : int = 0;
var UIcam : Camera;

var InstantiatedPage : GameObject;
var PageSpawn : Transform;

var Zoomer : PageZoomScript;

private var loaded : boolean;

function Awake() {
	instance = this;
}

function Start() {
	LoadList();
}

function SaveList() {
	var names = new List.<String>();
	for(var page in pages) {
		names.Add(page.name);
	}
	
	var xml_document : XmlDocument = new XmlDocument();
	xml_document.LoadXml(String.Format("<Pages {0}=\"{1}\"></Pages>", "zerahypt_version", WorldInformation.VersionID));

	var node_items : XmlNode = xml_document.GetElementsByTagName("Pages")[0];
	for(var i = 0; i < names.Count; i++) {
		var new_item : XmlElement = xml_document.CreateElement("Page");
		new_item.SetAttribute("name", names[i]);
		node_items.AppendChild(new_item);
	}
	SaveInfo.SaveDataXml("Folder/Pages", xml_document);
}

function LoadList() {

if (!SaveInfo.HasData("Folder/Pages")) {
		Debug.Log("Pages empty, didnt load any data.");
		return;
	}

	var xml_data : String = SaveInfo.LoadData("Folder/Pages");
	var xml_document : XmlDocument = new XmlDocument();
	xml_document.LoadXml(xml_data);
	
	var node_items : XmlNode = xml_document.GetElementsByTagName("Pages")[0];
	var data_header = GetAttributes(node_items);
	
	if (data_header["zerahypt_version"] == WorldInformation.VersionID) {
		pages.Clear();
		
		for (var node : XmlNode in node_items.ChildNodes) {
			var attributes = GetAttributes(node);
			var Prefabionaise = Resources.Load("Pages/" + attributes["name"], GameObject) as GameObject;
			pages.Add(Prefabionaise);
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

static function ListContains(name : String) {

var Prefabionaise = Resources.Load("Pages/" + name, GameObject) as GameObject;

var Add : boolean;

if (FolderInfoDisplayer.instance.pages.Count > 0){
Add = true;
		var i : int;
		for (i = 0; i < FolderInfoDisplayer.instance.pages.Count; i++) {
		 if(FolderInfoDisplayer.instance.pages[i].name == name){
			Add = false;
			FurtherActionScript.instance.NoDocument = true;
            FurtherActionScript.instance.ShowText();
			}
		}
}

if (FolderInfoDisplayer.instance.pages.Count < 1){
			FolderInfoDisplayer.instance.pages.Add(Prefabionaise);
}
if(Add){
FolderInfoDisplayer.instance.AddPage(Prefabionaise);
FurtherActionScript.instance.NewDocument = true;
FurtherActionScript.instance.ShowText();
}
}

function AddPage (Prefabionaision : GameObject){
pages.Add(Prefabionaision);
}

function OnMouseDown () {
	if (Input.mousePosition.x > UIcam.WorldToScreenPoint(transform.position).x) {
		 if (CurrentPage < pages.Count -1) {
			CurrentPage += 1;
			Pagionaise();
		}
	} else {
		 if (CurrentPage > 0) {
			CurrentPage -= 1;
			Pagionaise();
		}
	}
}

function Pagionaise (){
	if(InstantiatedPage != null)
		Destroy(InstantiatedPage);
		
    var tm : TextMesh = GetComponent(TextMesh);
	var PageToSpawn: GameObject = pages[CurrentPage];
	
	InstantiatedPage = Instantiate(PageToSpawn, PageSpawn.transform.position, PageSpawn.transform.rotation) as GameObject;
	InstantiatedPage.transform.parent = gameObject.transform;
	InstantiatedPage.name = PageToSpawn.name;
	
	Zoomer.PageTF = InstantiatedPage.transform;
	
	tm.text = PageToSpawn.name;
}

function PutUp (){
Zoomer.IsActivated = true;
}

function PutDown (){
Zoomer.Reset();
}

function OnDestroy() {
	SaveList();
}