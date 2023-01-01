#pragma strict
public var ButtonType : GUIType;
public var ButtonID : int;

public static var RefineOffset : int;
public static var DispenseOffset : int;

var BrightModel : GameObject;

public enum GUIType
{
	DisposeLoad,
	Refine,
	Dispense
}

function Start()
{
	Invoke("InitializeGUI", 1);
	Invoke("RefreshGUI", 2);
}

function InitializeGUI()
{
	MineralRefinery.ChildListeners.Add(this);
}

function DisposeLoad()
{
	MineralRefinery.StartWait(MineralSetup.DeliverLoadAnimation, MineralSetup.DeliverLoadWaitTime);
	yield WaitForSeconds(MineralSetup.DeliverLoadWaitTime);
	
	var i : int;
	if (MineralRefinery.instance.ConnectedContainer != null) {
		for(i = 0; i < MineralRefinery.instance.ConnectedContainer.myMinerals.Count; i++)
		{
			var _mType : eMineralType = MineralRefinery.instance.ConnectedContainer.myMinerals[i].mineralType;
			var _mAmount : int = MineralRefinery.instance.ConnectedContainer.myMinerals[i].mineralAmount;
			MineralRefinery.instance.ConnectedContainer.currentMineralCount -= _mAmount;
			MineralRefinery.instance.InsertMineralToRefinery(_mType, _mAmount);
		}
		MineralRefinery.instance.ConnectedContainer.myMinerals.Clear();
	}
	
	for(i = 0; i < MineralRefinery.instance.LinkedCompressedMinerals.Count; i++) {
		var _mData : List.<MineralBarrel>;
		_mData = MineralRefinery.instance.LinkedCompressedMinerals[i].MineralData;
		var i2 : int;
		for(i2 = 0; i2 < _mData.Count; i2++) { 
			MineralRefinery.instance.InsertMineralToRefinery(_mData[i2].mineralType, _mData[i2].mineralAmount);
		}
		Destroy(MineralRefinery.instance.LinkedCompressedMinerals[i].gameObject);
	}
	MineralRefinery.instance.LinkedCompressedMinerals.Clear();
}

function Refine()
{
	if(MineralRefinery.instance.RawMinerals.Count > ButtonID + RefineOffset)
	{
		var _mType : int = MineralRefinery.instance.RawMinerals[ButtonID + RefineOffset].mineralType;
		var _mAmount : int = MineralRefinery.instance.RawMinerals[ButtonID + RefineOffset].mineralAmount;
		if(_mAmount >= MineralRefinery.RequiredToRefine[_mType])
		{
			MineralRefinery.StartWait(MineralSetup.RefineLoadAnimation, MineralSetup.RefineLoadWaitTime);
			yield WaitForSeconds(MineralSetup.RefineLoadWaitTime);
			
			MineralRefinery.instance.ConvertMineralToRefined(_mType);
			Debug.Log("Refined " + MineralRefinery.instance.RawMinerals[ButtonID + RefineOffset].mineralType.ToString());
		}
		else
		{
			Debug.Log("Not enough to refine!");
		}
	}
	else
	{
		Debug.Log("Not enough to refine!");
	}
}

function Dispense()
{
	if(MineralRefinery.instance.RefinedMinerals.Count > ButtonID + DispenseOffset)
	{
		MineralRefinery.StartWait(MineralSetup.DispenseLoadAnimation, MineralSetup.DispenseLoadWaitTime);
		yield WaitForSeconds(MineralSetup.DispenseLoadWaitTime);
		
		var _prefabName : String = MineralRefinery.instance.RefinedMinerals[ButtonID + DispenseOffset].refinedType.ToString();
		
		var _pos : Vector3 = MineralRefinery.instance.RefineryDispenseLocation.position;
		var _rot : Quaternion = MineralRefinery.instance.RefineryDispenseLocation.rotation;
		
		var _prefab : GameObject = Resources.Load("RefinedMaterials/" + _prefabName, GameObject);
		if(_prefab != null)
		{
			var _Obj : GameObject = Instantiate(_prefab, _pos, _rot);
			MineralRefinery.instance.RemoveRefined(
				MineralRefinery.instance.RefinedMinerals[ButtonID + DispenseOffset].refinedType, 1);
		}
		else
		{
			Debug.LogError(_prefabName + " was not found in Assets/Resources/RefinedMaterials/");
		}
	}
	else
	{
		Debug.Log("Not enough to Dispense!");
	}
}

public function RefreshGUI()
{
	switch(ButtonType)
	{
		case GUIType.Refine:
			if(ButtonID + RefineOffset < MineralRefinery.instance.RawMinerals.Count)
			{
				var _ind : int = MineralRefinery.instance.RawMinerals[ButtonID + RefineOffset].mineralType;
				transform.FindChild("Text").GetComponent(TextMesh).text = "Refine " + MineralRefinery.RequiredToRefine[_ind] + "";
			}
			else
			{
				transform.FindChild("Text").GetComponent(TextMesh).text = " ";
			}
			break;
		
		case GUIType.Dispense:
			if(ButtonID + DispenseOffset < MineralRefinery.instance.RefinedMinerals.Count)
			{
				transform.FindChild("Text").GetComponent(TextMesh).text = "Dispense 1";
			}
			else
			{
				transform.FindChild("Text").GetComponent(TextMesh).text = " ";
			}
			break;
	}
}

function OnMouseEnter(){

	MineralRefinery.instance.RefreshGUI();
	BrightModel.SetActive (true);
}

function OnMouseExit(){

	MineralRefinery.instance.RefreshGUI();
	BrightModel.SetActive (false);
}

function OnMouseDownAsButton(){

	BrightModel.SetActive (false);
}

function OnMouseUpAsButton(){

	MineralRefinery.instance.RefreshGUI();
	
	if(MineralRefinery.WaitTime == 0)
	{
		switch(ButtonType)
		{
			case GUIType.DisposeLoad:
				DisposeLoad();
				break;
			case GUIType.Refine:
				Refine();
				break;
			case GUIType.Dispense:
				Dispense();
				break;
			default:
				Debug.LogError("ButtonType has not been assigned!", this);
				break;
		}
	}
}