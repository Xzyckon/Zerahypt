#pragma strict
import System.Collections.Generic;
public static var instance : InventoryManager;
public static var MouseOffset : Vector2;

public var piri_hand_slot : Transform;
public var Weight_Text : TextMesh;
public var Bounds_TopLeft : Vector3;
public var Bounds_BottomRight : Vector3;
public var Item_Padding : Vector2;
public var Item_Size : Vector2;

public var MenuGraphics : GameObject;
public var IdleAnimation : String;
public var DropAnimation : String;
public var Pirizuka : Animation;
public var PirizukaHand : Transform;
public var PirizukaHandCan : Transform;
public var PirizukaWeapon : Transform;
public var PirizukaToy : Transform;

public var ItemIndicator : TextMesh;
var targetLayers : LayerMask;

@HideInInspector
public var CarryObject : GameObject;
public var ItemDictionary : Dictionary.<int, ItemDisplay>  = new Dictionary.<int, ItemDisplay>();
public var UseMouseOffsetWhenDragging : boolean;

private var dropping : boolean;

function OnDrawGizmos () {
	var pos_a : Vector3 = transform.position + Bounds_TopLeft;
	var pos_b : Vector3 = transform.position + Bounds_BottomRight;

	Gizmos.color = Color.clear;
	Gizmos.DrawWireCube(Vector3.Lerp(pos_a, pos_b, 0.5f), pos_b - pos_a);

	var item_width = Vector3(Item_Size.x, 0);
	var item_height = Vector3(0, Item_Size.y);

	var pos = transform.position + Bounds_TopLeft + item_width / 2f - item_height / 2f;
	var max_on_one_line : int = (Bounds_BottomRight.x - Bounds_TopLeft.x + Item_Padding.x) / (item_width.x + Item_Padding.x);
	var max_lines : int = (Bounds_TopLeft.y - Bounds_BottomRight.y + Item_Padding.y) / (item_height.y + Item_Padding.y);

	var item_count = Mathf.Clamp(100, 0, max_on_one_line * max_lines);
	for (var i : int = 0; i < item_count; i++) {
		var height_offset : int = item_count / max_on_one_line;
		Gizmos.DrawWireCube(pos + (item_width + Vector2(Item_Padding.x, 0)) * (i % max_on_one_line) - (item_height + Vector2(0, Item_Padding.y)) * (i / max_on_one_line), Item_Size);
	}
}

function Awake () {
	instance = this;
}

function Start () {
	//Wait for all the other scripts to initialize.
	yield 0;
	Pirizuka = PlayerInformation.instance.PiriAni;
	PirizukaHand = PlayerInformation.instance.PiriHeldThing;
	PirizukaWeapon = PlayerInformation.instance.PiriHeldWeapon;
	PirizukaToy = PlayerInformation.instance.PiriHeldToy;

	InventoryManager.instance.SetChildActive(false);
	UpdateHand();

	Debug.Log("InventoryManager Initialized!");
}

function RefreshItems (item_container : ItemContainer) {
	var i : int;
	for (i = 0; i < transform.childCount; i++) {
		if(transform.GetChild(i).name.Contains("[Inventory_Item]"))
			Destroy(transform.GetChild(i).gameObject);
	}

	var item_space_sum : float;

	var item_count : int = item_container.ContainerItems.Count;
	var item_width = Vector3(Item_Size.x, 0);
	var item_height = Vector3(0, Item_Size.y);

	var pos = transform.position + Bounds_TopLeft + item_width / 2f - item_height / 2f;
	var max_on_one_line : int = (Bounds_BottomRight.x - Bounds_TopLeft.x + Item_Padding.x) / (item_width.x + Item_Padding.x);
	var max_lines : int = (Bounds_TopLeft.y - Bounds_BottomRight.y + Item_Padding.y) / (item_height.y + Item_Padding.y);

	var item_slot_prefab : GameObject = Resources.Load("Prefabs/[Inventory_Item]") as GameObject;

	item_count = Mathf.Clamp(item_count, 0, max_on_one_line * max_lines);
	for (i = 0; i < item_count; i++) {
		var height_offset : int = item_count / max_on_one_line;

		var position : Vector3;
		var local_pos : Vector3 = item_container.ContainerItems[i].location;
		var item_slot : GameObject;
		if (local_pos == Vector2.zero) {
			position = pos + (item_width + Vector2(Item_Padding.x, 0)) * (i % max_on_one_line) - (item_height + Vector2(0, Item_Padding.y)) * (i / max_on_one_line);
			item_slot = Instantiate(item_slot_prefab, position - Vector3(0, 0, 0.3f), Quaternion.identity) as GameObject;
			item_slot.transform.parent = transform;
		} else {
			position = new Vector3(local_pos.x, local_pos.y, -0.25f);
			item_slot = Instantiate(item_slot_prefab) as GameObject;
			item_slot.transform.parent = transform;
			item_slot.transform.localPosition = position;
		}
		item_slot.GetComponent(ItemDraw).UpdateIcon(item_container, false, i);
		item_space_sum += item_container.ContainerItems[i].GetVolume();
	}
	Weight_Text.text = String.Format("{0} / {1}", item_space_sum, item_container.MaxLoad);
}

static function UpdateWeightDisplay () {
	var item_space_sum : float = 0;

	var container : ItemContainer = ItemContainer.PlayerContainer;
	for (var i = 0; i < container.ContainerItems.Count; i++) {
		item_space_sum += container.ContainerItems[i].GetVolume();
	}
	instance.Weight_Text.text = String.Format("{0} / {1}", item_space_sum, container.MaxLoad);
}

function Update () {
	//Open container
	if (Input.GetKeyDown(KeyCode.E) && WorldInformation.vehicleController == null && WorldInformation.vehicleDoorController == null) {
  
		if (!container_opened) {
			if (ItemContainer.PlayerContainer != null) {
				InventoryManager.instance.RefreshItems(ItemContainer.PlayerContainer);
				InventoryManager.instance.SetChildActive(true);
				CameraScript.InInterface = true;
				PlayerMotionAnimator.PiriStill = true;
				Screen.lockCursor = false;
                Screen.showCursor = true;
			}
		} else {
			InventoryManager.instance.SetChildActive(false);
			CameraScript.InInterface = false;
			PlayerMotionAnimator.PiriStill = false;
			Screen.lockCursor = true;
            Screen.showCursor = false;
		}
	}
	if (Input.GetKeyDown(KeyCode.R) && WorldInformation.vehicleController == null && !CameraScript.InInterface) {
		InteractWithEnviroment();
	}
}

//MUGG!
function UpdateHand() {
	var item : Item =  ItemContainer.PiriContainer.ContainerItems.Count > 0 ? ItemContainer.PiriContainer.ContainerItems[0] : new Item();
	var display : ItemDisplay = item.GetDisplay();

	var im : InventoryManager = InventoryManager.instance;

	//Update Hand
	if (im.CarryObject != display.ItemPrefab) {
		if (im.CarryObject != null)
			Destroy(im.CarryObject);
		if (display.ItemPrefab != null) {
			var newHandItem : GameObject = Instantiate(display.ItemPrefab) as GameObject;
			InventoryManager.Hold(newHandItem, item.ItemType);
		} else { Debug.LogWarning("Item doesnt have a prefab located in resources!", this); }
	}
}

//Pickup/drop item
function InteractWithEnviroment() {
	if (dropping) return;

	var item : Item;
	var obj : GameObject;
	if (ItemContainer.PiriContainer.ContainerItems.Count > 0 && ItemContainer.PiriContainer.ContainerItems[0] != null) {
		//Has Item		->	  Drop
		item = ItemContainer.PiriContainer.ContainerItems[0];
		var display : ItemDisplay = item.GetDisplay();

		ItemContainer.PiriContainer.DeletePiriSlot();

		dropping = true;
		Pirizuka.CrossFade(DropAnimation);
		yield WaitForSeconds(0.5);

		obj = Instantiate(display.ItemDropPrefab) as GameObject;
		switch(item.ItemType) {
			case ItemTypes.Weapon:
				obj.transform.position = PirizukaWeapon.position;
				obj.transform.eulerAngles = PirizukaWeapon.eulerAngles;
				obj.name = "drop " + item.ID;
				if(obj.rigidbody)
				obj.rigidbody.velocity = PlayerInformation.instance.PirizukaRB.velocity;
				break;
			case ItemTypes.Toy:
				obj.transform.position = PirizukaToy.position;
				obj.transform.eulerAngles = PirizukaToy.eulerAngles;
				obj.name = "drop " + item.ID;
				if(obj.rigidbody)
				obj.rigidbody.velocity = PlayerInformation.instance.PirizukaRB.velocity;
				break;
			case ItemTypes.LongObject:
				obj.transform.position = PirizukaHand.position;
				obj.transform.parent = instance.PirizukaHand;
				obj.transform.localRotation = Quaternion.Euler(90, 0, 0);
				obj.name = "drop " + item.ID;
				obj.transform.parent = null;
				if(obj.rigidbody)
				obj.rigidbody.velocity = PlayerInformation.instance.PirizukaRB.velocity;
				break;
			case ItemTypes.BigObject:
				obj.transform.position = PirizukaHand.position;
				obj.transform.parent = instance.PirizukaHand;
				obj.transform.localRotation = Quaternion.Euler(0, 110, 0);
				obj.name = "drop " + item.ID;
				obj.transform.parent = null;
				if(obj.rigidbody)
				obj.rigidbody.velocity = PlayerInformation.instance.PirizukaRB.velocity;
				break;
			case ItemTypes.BigObject2:
				obj.transform.position = PirizukaHand.position;
				obj.transform.parent = instance.PirizukaHand;
				obj.transform.localRotation = Quaternion.Euler(-90, -90, 20);
				obj.name = "drop " + item.ID;
				obj.transform.parent = null;
				if(obj.rigidbody)
				obj.rigidbody.velocity = PlayerInformation.instance.PirizukaRB.velocity;
				break;
			default:
				obj.transform.position = PirizukaHand.position;
				obj.transform.eulerAngles = PirizukaHand.eulerAngles;
				obj.name = "drop " + item.ID;
				if(obj.rigidbody)
				obj.rigidbody.velocity = PlayerInformation.instance.PirizukaRB.velocity;
				break;
		}
		obj.AddComponent(DataContainer).item = ItemContainer.PiriContainer.ContainerItems[0];

		ItemContainer.PiriContainer.ContainerItems.Clear();
		dropping = false;
		Pirizuka.CrossFade(IdleAnimation);
	} else {
		//Has no Item	->	  Pickup
		var pos : Vector3 = PlayerInformation.instance.PiriAim.position;
		var dir : Vector3 = PlayerInformation.instance.PiriAim.forward;

		var hit : RaycastHit;
		if (Physics.Raycast(pos, dir, hit, 5, targetLayers)) {
			obj = hit.collider.gameObject;
			if(obj.GetComponent(DataContainer)){
			
			if(obj.GetComponent(ObjectInfo)){
			if(obj.GetComponent(ObjectInfo).ObjectStringCode == DrivenVesselScript.WhatToSpawn)
			DrivenVesselScript.WhatToSpawn = null;
			}
			
				ItemContainer.PiriContainer.ContainerItems.Add(obj.GetComponent(DataContainer).item);
				if (ItemDraw.hand_instance == null) {
					ItemContainer.PiriContainer.CreatePiriSlot();
				}
				if (obj.name.Contains("40mm")) {
				var gun_item : Item = obj.GetComponent(DataContainer).item;
				var name : String = gun_item.ItemData.Substring(1, gun_item.ItemData.Length-1);
				var offset : int = int.Parse(gun_item.ItemData[0].ToString());
				InventoryManager.AllowGunAmmo(name, offset);
			    }
				Destroy(obj);
				}
		}
	}

	//Required to update data for some strange reason	(disabled due to piris inventory possibly being empty)
	//item = ItemContainer.PiriContainer.ContainerItems[0];
	//display = item.GetDisplay();

	//Update Hand
	UpdateHand();
}

public static var container_opened : boolean;
function SetChildActive (bool : boolean) {
	container_opened = bool;
	MenuGraphics.SetActive (bool);
	for (var i = 0; i < transform.childCount; i++) {
		transform.GetChild(i).gameObject.SetActive(bool);
	}
}

public static function Hold(obj : GameObject, itemType : ItemTypes) {
	instance.CarryObject = obj;
	
	switch(itemType) {
			case ItemTypes.Weapon:
				obj.transform.position = instance.PirizukaWeapon.position;
		        obj.transform.eulerAngles = instance.PirizukaWeapon.eulerAngles;
		        obj.transform.parent = instance.PirizukaWeapon;
				break;
			case ItemTypes.Toy:
				obj.transform.position = instance.PirizukaToy.position;
		        obj.transform.eulerAngles = instance.PirizukaToy.eulerAngles;
		        obj.transform.parent = instance.PirizukaToy;
				break;
			case ItemTypes.LongObject:
				obj.transform.position = instance.PirizukaHand.position;
				obj.transform.parent = instance.PirizukaHand;
				obj.transform.localRotation = Quaternion.Euler(90, 0, 0);
				break;
			case ItemTypes.BigObject:
				obj.transform.position = instance.PirizukaHand.position;
				obj.transform.parent = instance.PirizukaHand;
				obj.transform.localRotation = Quaternion.Euler(0, 110, 0);
				break;
			case ItemTypes.BigObject2:
				obj.transform.position = instance.PirizukaHand.position;
				obj.transform.parent = instance.PirizukaHand;
				obj.transform.localRotation = Quaternion.Euler(-90, -90, 20);
				break;
			default:
				obj.transform.position = instance.PirizukaHand.position;
		        obj.transform.eulerAngles = instance.PirizukaHand.eulerAngles;
		        obj.transform.parent = instance.PirizukaHand;
				break;
		}
}

public static function SetMouseOffset(_offset : Vector2) {
	if(instance.UseMouseOffsetWhenDragging)
		MouseOffset = _offset;
	else
		MouseOffset = Vector2.zero;
}


//__________________________________________________________________________________________________\\
//											GUN_MANAGER												\\
//__________________________________________________________________________________________________\\

static var dictAllowedGunAmmo : Dictionary.<String, boolean> = new Dictionary.<String, boolean>();

static function AllowGunAmmo(gun_name : String, offset : int) {
    if (offset == 1) return;
    var key = String.Format("Unlockables/unlockable_ammo_{0}_{1}", gun_name, offset);
    if (!dictAllowedGunAmmo.ContainsKey(key)) {
        dictAllowedGunAmmo.Add(key, true);
        SaveInfo.SaveData(key, "1");
    }
}

static function CanUseGunAmmo(gun_name : String, offset : int) : boolean {
    if (offset == 1) return true;
    var key = String.Format("Unlockables/unlockable_ammo_{0}_{1}", gun_name, offset);
    if (!dictAllowedGunAmmo.ContainsKey(key)) {
        if (SaveInfo.HasData(key)) {
            return true;
        }
    } else {
        return true;
    }
    return false;
}
