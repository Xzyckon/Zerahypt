#pragma strict
public var item : Item;

public function Start () {
	if(item.GetID() > 0)
		item = new Item(item.GetID(), item.ItemType, item.ItemData, item.ItemDataType);
}