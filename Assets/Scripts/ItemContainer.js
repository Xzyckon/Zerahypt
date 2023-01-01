#pragma strict
#pragma downcast
import System.Collections.Generic;
import System.Xml;

public enum ItemEnum {
	empty 	   	           	= 0,
	Ammunition_10mm	   	   	= 100,
	Ammunition_20mm	   	   	= 101,
	Ammunition_30mm	   	   	= 102,
	Ammunition_40mmSK	   	= 103,
	Ammunition_40mmSHE  	= 104,
	Ammunition_50mm	   	   	= 105,
	Ammunition_100mmS	   	= 106,
	Ammunition_100mm	   	= 107,
	Ammunition_150mm	   	= 108,
	LEXAM_Short_Missile	   	= 150,
	Jolt_Missile	     	= 151,
	Agrian_Bowl_Lamp  	   	= 201,
	Slav_Radio	        	= 202,
	Trumpgun	        	= 250,
	TestGun	            	= 300,
	Anoca_PT13	           	= 301,
	Posmer_HC40	           	= 302,
	Posmer_10c	           	= 303,
	Shakar_17	           	= 304,
	Tothler_Tygria_M2      	= 305,
	AROT_Iter_1      	    = 306,
	BK      	            = 307,
	TLF_PTSD_G1	           	= 308,
	MevNav_MRCHg	        = 309,
	Anoca_PT32	           	= 310,
	Posmer_10cR	           	= 311,
	Metis_CAR_05	       	= 312,
	DASMUN_SR2	       	    = 313,
	TRN_PTSD_Az	       	    = 314,
	Fawcett_Alton	        = 315,
	Katovari_MD	            = 316,
	Beverage_See_Cola       = 401,
	Slavoico_Vodka          = 402,
	Fidget_Spinner          = 500,
	Snyf	   	        	= 600,
	Snyfped	   	        	= 601,
	Piribunny	   	        = 602,
	Agrian_Abettor	   	    = 700,
	Radar_Drone	   	        = 701,
	TLF_SDRBHc1	   	        = 702,
	Terbotek_Dasinyk	   	= 703,
	TAK_Ml1	   	            = 750,
	Katovari_Motus	   	    = 751,
	Peuktuber	   	       	= 800,
	Peuknyth	           	= 801
	
}

public enum ItemTypes {
	None, Consumable, Weapon, Toy, LongObject, BigObject, BigObject2
}

public enum DataType {
	None, Description
}

public enum SizeEnum {
	Container,
	Pirizuka
}

public class ItemDisplay {
	public var ItemTexture : Sprite;
	public var ItemPrefab : GameObject;
	public var ItemDropPrefab : GameObject;
	
	public function ItemDisplay () {
		this.ItemTexture = null;
		this.ItemPrefab = null;
		this.ItemDropPrefab = null;
	}
	
	public function ItemDisplay (_texture : Sprite, _prefab : GameObject, _dropPrefab : GameObject) {
		this.ItemTexture = _texture;
		this.ItemPrefab = _prefab;
		this.ItemDropPrefab = _dropPrefab;
	}
}

@System.Serializable
public class Item {
	public var ID: ItemEnum;
	public var ItemType : ItemTypes;
	public var ItemDataType: DataType;
	public var ItemData: String;
	
	@HideInInspector
	public var Initialized : boolean;
	
	@HideInInspector
	public var location : Vector2;
	
	public function Item () {
		this.ID = 0;
		this.ItemType = ItemTypes.None;
		this.ItemData = "";
		this.ItemDataType = DataType.None;
		this.Initialized = true;
	}

	public function Item(id : int) {
		this.ID = id;
		this.ItemType = ItemTypes.None;
		this.ItemData = "";
		this.ItemDataType = DataType.None;
		if (this.GetID() > 0)
			this.Initialize();
	}
	
	public function Item(id : int, itemType : ItemTypes) {
		this.ID = id;
		this.ItemType = itemType;
		this.ItemData = "";
		this.ItemDataType = DataType.None;
		if (this.GetID() > 0)
			this.Initialize();
	}
	
	public function Item(id : int, itemType : ItemTypes, data : String, dataType : DataType) {
		this.ID = id;
		this.ItemType = itemType;
		this.ItemData = data;
		this.ItemDataType = dataType;
		this.Initialize();
	}
	
	public function Initialize() {
		var display : ItemDisplay;
		if (!InventoryManager.instance.ItemDictionary.ContainsKey(GetID())) {
			var _itemTexture : Sprite = Resources.Load("Items/" + ID.ToString() + "/sprite", typeof(Sprite));
			var _itemPrefab : GameObject = Resources.Load("Items/" + ID.ToString() + "/prefab") as GameObject;
			var _itemDropPrefab : GameObject = Resources.Load("Items/" + ID.ToString() + "/drop") as GameObject;
			
			display = new ItemDisplay(_itemTexture, _itemPrefab, _itemDropPrefab);
			InventoryManager.instance.ItemDictionary.Add(this.GetID(), display);
			
			if (_itemTexture == null) {
				Debug.LogWarning("Texture File (" + "Resources/Items/" + ID.ToString() + "/sprite" + ") is missing!");
			}
			if (_itemPrefab == null) {
				Debug.LogWarning("Prefab File (" + "Resources/Items/" + ID.ToString() + "/prefab" + ") is missing!");
			}
			if (_itemDropPrefab == null) {
				Debug.LogWarning("Prefab File (" + "Resources/Items/" + ID.ToString() + "/drop" + ") is missing!");
			}
		}
		this.Initialized = true;
	}
	
	public function GetDisplay() : ItemDisplay {
		var key : int = this.GetID();
		if(InventoryManager.instance.ItemDictionary.ContainsKey(key)) {
			return InventoryManager.instance.ItemDictionary[key];
		}
		return new ItemDisplay();
	}
	
	public function GetVolume() : float {
		switch (this.ID) {
		    case ItemEnum.Ammunition_10mm:
				return 10f;
			case ItemEnum.Ammunition_20mm:
				return 20f;
			case ItemEnum.Ammunition_30mm:
				return 30f;
			case ItemEnum.Ammunition_40mmSK:
				return 30f;
			case ItemEnum.Ammunition_40mmSHE:
				return 30f;
			case ItemEnum.Ammunition_50mm:
				return 50f;
			case ItemEnum.Ammunition_100mmS:
				return 70f;
			case ItemEnum.Ammunition_100mm:
				return 80f;
			case ItemEnum.Ammunition_150mm:
				return 100f;
			case ItemEnum.LEXAM_Short_Missile:
				return 80f;
			case ItemEnum.Jolt_Missile:
				return 50f;
			case ItemEnum.Agrian_Bowl_Lamp:
				return 100f;
			case ItemEnum.Slav_Radio:
				return 100f;
			case ItemEnum.Trumpgun:
				return 100f;
			case ItemEnum.Anoca_PT13:
				return 150f;
			case ItemEnum.Posmer_HC40:
				return 200f;
			case ItemEnum.Posmer_10c:
				return 120f;
			case ItemEnum.Shakar_17:
				return 150f;
			case ItemEnum.Tothler_Tygria_M2:
				return 150f;
			case ItemEnum.AROT_Iter_1:
				return 150f;
			case ItemEnum.BK:
				return 200f;
			case ItemEnum.TLF_PTSD_G1:
				return 120f;
			case ItemEnum.MevNav_MRCHg:
				return 150f;
			case ItemEnum.TestGun:
				return 10f;
			case ItemEnum.Anoca_PT32:
				return 150f;
			case ItemEnum.Posmer_10cR:
				return 150f;
			case ItemEnum.Metis_CAR_05:
				return 150f;
			case ItemEnum.DASMUN_SR2:
				return 200f;
			case ItemEnum.TRN_PTSD_Az:
			    return 150f;
			case ItemEnum.Fawcett_Alton:
			    return 200f;
			case ItemEnum.Katovari_MD:
			    return 200f;
			case ItemEnum.Beverage_See_Cola:
				return 50f;
			case ItemEnum.Slavoico_Vodka:
				return 70f;
			case ItemEnum.Fidget_Spinner:
				return 25f;
			case ItemEnum.Snyf:
				return 50f;
			case ItemEnum.Snyfped:
				return 60f;
			case ItemEnum.Piribunny:
				return 80f;
			case ItemEnum.Agrian_Abettor:
				return 150f;
			case ItemEnum.Radar_Drone:
				return 200f;
			case ItemEnum.TLF_SDRBHc1:
				return 170f;
			case ItemEnum.Terbotek_Dasinyk:
				return 200f;
			case ItemEnum.TAK_Ml1:
			    return 400f;
			case ItemEnum.Katovari_Motus:
			    return 400f;
			case ItemEnum.Peuktuber:
				return 50f;
			case ItemEnum.Peuknyth:
				return 60f;
			default:
				return 1f;
		}
	}
	
	public function GetID() {
		var _id : int = this.ID;
		return _id;
	}
}

public var ContainerID: int = -1;
public var MaxLoad : float = 600;
public var ContainerSize : SizeEnum;
public var ContainerItems : List.<Item> = new List.<Item>();
public var ResetItemsToPreset : boolean;

public static var PlayerContainer : ItemContainer;
public static var PiriContainer : ItemContainer;

//InvokeRepeating("Refresher", 0.43, 0.45);

function Awake () {
	if (ContainerID == -1) {
		Debug.LogError("Please give this container an ID!", this);
	}
}

function Start () {
	if (!ResetItemsToPreset)
		LoadContainer();
		
	switch (ContainerSize) {
		case SizeEnum.Pirizuka:
			PiriContainer = this;
			CreatePiriSlot();
			break;
		case SizeEnum.Container:
			break;
	}
	
}

function CreatePiriSlot () {
	if (PiriContainer.ContainerItems.Count > 0) {
		var im : InventoryManager = InventoryManager.instance;
		
		var item_slot_prefab : GameObject = Resources.Load("Prefabs/[Inventory_Item]") as GameObject;
		var item_slot : GameObject = Instantiate(item_slot_prefab) as GameObject;
		
		item_slot.name = "[Inventory_Hand_Item]";
		item_slot.transform.parent = im.transform;
		item_slot.transform.position = im.piri_hand_slot.position;
		item_slot.transform.localPosition += new Vector3(0, 0, -0.25f);
		item_slot.GetComponent(ItemDraw).UpdateIcon(PiriContainer, true, 0);
		
		if (!InventoryManager.container_opened) {
			item_slot.SetActive(false);
		}
	}
}

function DeletePiriSlot () {
	if (PiriContainer.ContainerItems.Count > 0) {
		var im : InventoryManager = InventoryManager.instance;
		
		Destroy(ItemDraw.hand_instance.gameObject);
	}
}

public function OnTriggerEnter (other : Collider) {

    if(!WorldInformation.UsingVessel)
	if(other.name.Contains("TC1p"))
		ItemContainer.PlayerContainer = this;
}

public function OnTriggerExit (other : Collider) {
    
    if(!WorldInformation.UsingVessel)
	if(other.name.Contains ("TC1p")){
		InventoryManager.instance.SetChildActive(false);
		ItemContainer.PlayerContainer = null;
		CameraScript.InInterface = false;
		PlayerMotionAnimator.PiriStill = false;
		Screen.lockCursor = true;
        Screen.showCursor = false;
	}
		if (other.name.Contains ("broken")){
		InventoryManager.instance.SetChildActive(false);
		ItemContainer.PlayerContainer = null;
		CameraScript.InInterface = false;
		PlayerMotionAnimator.PiriStill = false;
		Screen.lockCursor = true;
        Screen.showCursor = false;
	}
}

public function SaveContainer () {
	var xml_document : XmlDocument = new XmlDocument();
	xml_document.LoadXml(String.Format("<Items {0}=\"{1}\"></Items>", "zerahypt_version", WorldInformation.VersionID));

	var node_items : XmlNode = xml_document.GetElementsByTagName("Items")[0];
	for(var i = 0; i < ContainerItems.Count; i++) {
		var _dataType : int = ContainerItems[i].ItemDataType;
		var _itemType : int = ContainerItems[i].ItemType;
			
		var new_item : XmlElement = xml_document.CreateElement("Item");
		new_item.SetAttribute("id", ContainerItems[i].GetID().ToString());
		new_item.SetAttribute("itemtype", _itemType.ToString());
		new_item.SetAttribute("datatype", _dataType.ToString());
		new_item.SetAttribute("data", ContainerItems[i].ItemData);
		new_item.SetAttribute("x", ContainerItems[i].location.x.ToString());
		new_item.SetAttribute("y", ContainerItems[i].location.y.ToString());
		node_items.AppendChild(new_item);
	}
	SaveInfo.SaveDataXml(GetKey(), xml_document);
}

public function LoadContainer () {
	if (!SaveInfo.HasData(GetKey())) {
		Debug.Log("Container empty, didnt load any data.");
		return;
	}
	
	var xml_data : String = SaveInfo.LoadData(GetKey());
	var xml_document : XmlDocument = new XmlDocument();
	xml_document.LoadXml(xml_data);
	
	var node_items : XmlNode = xml_document.GetElementsByTagName("Items")[0];
	var data_header = GetAttributes(node_items);
	
	if (data_header["zerahypt_version"] == WorldInformation.VersionID) {
		ContainerItems.Clear();
		
		for (var node : XmlNode in node_items.ChildNodes) {
			var attributes = GetAttributes(node);
			
			var id : int = int.Parse(attributes["id"]);
			var itemtype : ItemTypes = int.Parse(attributes["itemtype"]);
			var datatype : DataType = int.Parse(attributes["datatype"]);
			var data : String = attributes["data"];
			var x : float = float.Parse(attributes["x"]);
			var y : float = float.Parse(attributes["y"]);
			
			var newItem : Item = new Item(id, itemtype, data, datatype);
			newItem.location = Vector2(x, y);
			Add(newItem);
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

function DoesFit(item : Item) : boolean {
	var sum : float = 0f;
	for (var i = 0; i < ContainerItems.Count; i++) {
		sum += ContainerItems[i].GetVolume();
	}
	return (sum + item.GetVolume() < this.MaxLoad);
}

function Add(newItem : Item) {
	ContainerItems.Add(newItem);
}

function Refresher() {
	if (!ResetItemsToPreset) {
		SaveContainer();
	}
}

function OnDisable() {
	if (!ResetItemsToPreset) {
		SaveContainer();
	}
}

function GetKey() : String {
	return "ItemContainers/" + ContainerID;
}