#pragma strict
public static var hand_instance : ItemDraw;

public var inHand : boolean;
public var item : Item;

@HideInInspector
public var dragging : ItemDraw;

@HideInInspector
public var container : ItemContainer;

private var start_pos : Vector3;
private var mouseEntered : boolean;

function UpdateIcon(container : ItemContainer, in_hand : boolean, item_index : int) {
	this.container = container;
	this.inHand = in_hand;
	
	if (in_hand) {
		hand_instance = this;
	} else {
		if (hand_instance == this) {
			hand_instance = null;
		}
	}
	
	item = container.ContainerItems[item_index];
	if (!item.Initialized) item.Initialize();
	GetComponent(SpriteRenderer).sprite = InventoryManager.instance.ItemDictionary[item.GetID()].ItemTexture;
}

function Update () {
	var ray : Ray;
	if (Input.GetMouseButtonDown(0) && mouseEntered) {
		ray = GUICamera.instance.ScreenPointToRay (Input.mousePosition);
		InventoryManager.MouseOffset = Vector2(ray.origin.x - transform.position.x, ray.origin.y - transform.position.y);
		collider.enabled = false;
		dragging = this;
		
		start_pos = transform.position;
	}
	
	if (dragging == this) {
		var newPos : Vector3;
		var im : InventoryManager = InventoryManager.instance;
		var topleft_border = im.transform.position + im.Bounds_TopLeft;
		var bottomright_border = im.transform.position + im.Bounds_BottomRight;
		//var margin_right : float = im.piri_hand_slot.position.x - bottomright_border.x;
		var margin_bottom : float = im.piri_hand_slot.position.y - bottomright_border.y;
		
		ray = GUICamera.instance.ScreenPointToRay (Input.mousePosition);
		newPos = new Vector3(ray.origin.x - InventoryManager.MouseOffset.x, ray.origin.y - InventoryManager.MouseOffset.y, transform.position.z);
		
		if (Input.GetMouseButton(0)) {
			newPos.x = Mathf.Clamp(newPos.x, topleft_border.x, bottomright_border.x);
			newPos.y = Mathf.Clamp(newPos.y, bottomright_border.y + margin_bottom, topleft_border.y);
			transform.position = Vector3.Lerp(transform.position, newPos, Time.smoothDeltaTime * 20);
		}
		
		if (Input.GetMouseButtonUp(0)) {
			var dist = Vector2.Distance(transform.position, im.piri_hand_slot.position);
			if (dist < 0.5f) {	//if moving to piri hand then...
				if (inHand) {
					newPos.x = im.piri_hand_slot.position.x;
					newPos.y = im.piri_hand_slot.position.y;
					transform.position = newPos;
				} else {
					var piri_container : ItemContainer = ItemContainer.PiriContainer;
					
					if (piri_container.ContainerItems.Count > 0) {
						var item_a : Item = this.item;
						var item_b : Item = piri_container.ContainerItems[0];
						
						if (this.container.DoesFit(item_b)) {
							this.container.ContainerItems.Remove(item_a);
							this.container.ContainerItems.Insert(0, item_b);
							
							piri_container.ContainerItems.Remove(item_b);
							piri_container.ContainerItems.Insert(0, item_a);
							
							var item_slot_b = ItemDraw.hand_instance;
							item_slot_b.transform.position = this.start_pos;
							item_slot_b.name = "[Inventory_Item](Clone)";
							item_slot_b.UpdateIcon(this.container, false, 0);
							
							this.UpdateIcon(piri_container, true, 0);
							this.name = "[Inventory_Hand_Item]";
							
							newPos.x = im.piri_hand_slot.position.x;
							newPos.y = im.piri_hand_slot.position.y;
							InventoryManager.UpdateWeightDisplay();
							InventoryManager.instance.UpdateHand();
						} else {
							newPos = start_pos;
						}
					} else {
						container.ContainerItems.Remove(item);
						ItemContainer.PiriContainer.ContainerItems.Add(item);
						
						this.name = "[Inventory_Hand_Item]";
						this.UpdateIcon(ItemContainer.PiriContainer, true, 0);
						
						newPos.x = im.piri_hand_slot.position.x;
						newPos.y = im.piri_hand_slot.position.y;
						
						InventoryManager.UpdateWeightDisplay();
						InventoryManager.instance.UpdateHand();
					}
					transform.position = newPos;
				}
			} else {			//else move back to container
				if (inHand) {
					if (ItemContainer.PlayerContainer.DoesFit(item)) {
						this.container.ContainerItems.Remove(item);
						ItemContainer.PlayerContainer.ContainerItems.Insert(0, item);
						this.UpdateIcon(ItemContainer.PlayerContainer, false, 0);
						this.name = "[Inventory_Item](Clone)";
						
						ray = GUICamera.instance.ScreenPointToRay (Input.mousePosition);
						newPos = new Vector3(ray.origin.x - InventoryManager.MouseOffset.x, ray.origin.y - InventoryManager.MouseOffset.y, transform.position.z);
						
						InventoryManager.UpdateWeightDisplay();
						InventoryManager.instance.UpdateHand();
						
						newPos.x = Mathf.Clamp(newPos.x, topleft_border.x, bottomright_border.x);
						newPos.y = Mathf.Clamp(newPos.y, bottomright_border.y, topleft_border.y);
					} else {
						newPos = start_pos;
					}
				} else {
					newPos.x = Mathf.Clamp(newPos.x, topleft_border.x, bottomright_border.x);
					newPos.y = Mathf.Clamp(newPos.y, bottomright_border.y, topleft_border.y);
				}
				transform.position = newPos;
			}
			item.location = Vector2(transform.localPosition.x, transform.localPosition.y);
			collider.enabled = true;
			dragging = null;
		}
	}
}

function OnMouseEnter () {
	mouseEntered = true;
}

function OnMouseExit () {
	mouseEntered = false;
}