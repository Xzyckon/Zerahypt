#pragma strict
import System.Collections.Generic;

public static var instance : MineralRefinery;

public static var WaitTime : float;
public static var ChildListeners : List.<MineralGUI> = new List.<MineralGUI>();
public static var RequiredToRefine : Dictionary.<int, int> = new Dictionary.<int, int>();
public var RefineryDispenseLocation : Transform;
var RefineryInterface : Transform;
public var TextMeshObjects : TextMeshObjs;

public var NotEnoughToDeliver : LinkAnimation;
public var NotEnoughToRefine : LinkAnimation;
public var NotEnoughToDispense : LinkAnimation;

var StateSound : AudioSource;
var NavSound : AudioSource;

public var ConnectedContainer : MineralContainer;
public var LinkedCompressedMinerals : List.<CompressedMinerals> = new List.<CompressedMinerals>();

@System.Serializable
public class WaitTimeSettings
{
	public var AnimationName : String;
	public var WaitTime : float;
	
	function WaitTimeSettings(_AnimationName : String, _WaitTime : float)
	{
		AnimationName = _AnimationName;
		WaitTime = _WaitTime;
	}
}

@System.Serializable
public class LinkAnimation
{
	public var AnimationName : String;
	public var TargetAnimationObject : GameObject;
}

@System.Serializable
public class TextMeshObjs
{
	//		5 text meshes		//
	public var LoadText : TextMesh[] = new TextMesh[5];
	public var RefineText : TextMesh[] = new TextMesh[5];
	public var DispenseText : TextMesh[] = new TextMesh[5];
}

function Awake()
{
	instance = this;
	RequiredToRefine.Clear();
	ChildListeners.Clear();
}

@System.Serializable
public class rMineralAtt
{
	public var refinedType : rMineralType;
	public var refinedAmount : int = 0;
	
	public function rMineralAtt()
	{
		this.refinedType = 0;
		this.refinedAmount = 0;
	}
	
	public function rMineralAtt(_type : rMineralType, _amount : int)
	{
		this.refinedType = _type;
		this.refinedAmount = _amount;
	}
}

function Start() {
	LoadRefineryData();
	RefineryInterface.localPosition.y = 3.9;
}

function OnApplicationQuit() {
	SaveRefineryData();
}

function LoadRefineryData() {
	var _data : String;
	var _split : String[];
	var i : int;
	
	var _type1 : eMineralType;
	var _type2 : rMineralType;
	var _itemData : String[];
	var _amount : int;
	
	//Raw
	if (SaveInfo.HasData(GetKey("RW"))) {
		_data = SaveInfo.LoadData(GetKey("RW"));
		_split = _data.Split(" "[0]);
		
		for (i = 0; i < _split.Length-1; i++) {
			_itemData 	= _split[i].Split(","[0]);
			_type1 		= int.Parse(_itemData[0]);
			_amount 	= int.Parse(_itemData[1]);
			
			var rawMineral : MineralBarrel = new MineralBarrel();
			rawMineral.mineralType 		= _type1;
			rawMineral.mineralAmount 	= _amount;
			//Add to list
			RawMinerals.Add(rawMineral);
		}
	}
	
	//Refined
	if (SaveInfo.HasData(GetKey("RD"))) {
		_data = SaveInfo.LoadData(GetKey("RD"));
		_split = _data.Split(" "[0]);
		
		for (i = 0; i < _split.Length-1; i++) {
			_itemData	= _split[i].Split(","[0]);
			_type2		= int.Parse(_itemData[0]);
			_amount 	= int.Parse(_itemData[1]);
			
			var refMineral : rMineralAtt = new rMineralAtt();
			refMineral.refinedType 		= _type2;
			refMineral.refinedAmount 	= _amount;
			//Add to list
			RefinedMinerals.Add(refMineral);
		}
	}
}

function SaveRefineryData() {
	var _data : String;
	var i : int;
	
	//Raw
	_data = "";
	for (i = 0; i < RawMinerals.Count; i++) {
		//public var mineralType : eMineralType;
		//public var mineralAmount : int = 0;
		var _type1 : int = RawMinerals[i].mineralType;
		var _amount1 : int = RawMinerals[i].mineralAmount;
		_data += _type1 + "," + _amount1 + " ";
		SaveInfo.SaveData(GetKey("RW"), _data);
	}
	
	//Refined
	_data = "";
	for (i = 0; i < RefinedMinerals.Count; i++) {
		//public var refinedType : rMineralType;
		//public var refinedAmount : int = 0;
		var _type2 : int = RefinedMinerals[i].refinedType;
		var _amount2 : int = RefinedMinerals[i].refinedAmount;
		_data += _type2 + "," + _amount2 + " ";
		SaveInfo.SaveData(GetKey("RD"), _data);
	}
}

//Heavy task cpu usage v
function Update()
{
	WaitTime = Mathf.Clamp(WaitTime - Time.deltaTime, 0, 1000);

}

public static function StartWait(_aniName : String, _waitTime : float)
{
	MineralRefinery.WaitTime = _waitTime;
	MineralSetup.instance.LoadingBarTarget.animation.Play(_aniName);
}

public function GetAllMineralData(_list : List.<CompressedMinerals>) : List.<MineralBarrel> {
	var listAllItems : List.<MineralBarrel> = new List.<MineralBarrel>();
	var i : int;
	if(this.ConnectedContainer != null) {
		for(i = 0; i < this.ConnectedContainer.myMinerals.Count; i++ ) {
			listAllItems.Add(this.ConnectedContainer.myMinerals[i]);
		}
	}
	
	for(i = 0; i < _list.Count; i++) {
		var i2 : int;
		for(i2 = 0; i2 < _list[i].MineralData.Count; i2++) {
			listAllItems.Add(_list[i].MineralData[i2]);
		}
	}
	return listAllItems;
}

public function RefreshGUI()
{
	//5 Indicates the amount of minerals that is being showed on the gui.
	var _rawCount : int = Mathf.Clamp(RawMinerals.Count - 5, 0, 1000);
	var _refinedCount : int = Mathf.Clamp(RefinedMinerals.Count - 5, 0, 1000);
	MineralGUI.RefineOffset = Mathf.Clamp(MineralGUI.RefineOffset, 0, _rawCount);
	MineralGUI.DispenseOffset = Mathf.Clamp(MineralGUI.DispenseOffset, 0, _refinedCount);
				
	var MineralData : List.<MineralBarrel> = GetAllMineralData(this.LinkedCompressedMinerals);
	var i : int;
	for(i = 0; i < 5; i++)
	{
		if(MineralData.Count > i)
			TextMeshObjects.LoadText[i].text = MineralData[i].mineralAmount + " " + MineralData[i].mineralType.ToString();
		else
			TextMeshObjects.LoadText[i].text = "";
			
		if(RawMinerals.Count > i + MineralGUI.RefineOffset)
			TextMeshObjects.RefineText[i].text = RawMinerals[i + MineralGUI.RefineOffset].mineralAmount + " " + RawMinerals[i + MineralGUI.RefineOffset].mineralType.ToString();
		else
			TextMeshObjects.RefineText[i].text = "";
					
		if(RefinedMinerals.Count > i + MineralGUI.DispenseOffset)
			TextMeshObjects.DispenseText[i].text = RefinedMinerals[i + MineralGUI.DispenseOffset].refinedAmount + " " + RefinedMinerals[i + MineralGUI.DispenseOffset].refinedType.ToString();
		else
			TextMeshObjects.DispenseText[i].text = "";
	}
	
	for(i = 0; i < ChildListeners.Count; i++)
	{
		ChildListeners[i].RefreshGUI();
	}
}

@HideInInspector
public var RawMinerals : List.<MineralBarrel>;
@HideInInspector
public var RefinedMinerals : List.<rMineralAtt>;

public function InsertMineralToRefinery(_mineralType : eMineralType, _amount : int)
{
	var i : int;
	for(i = 0; i < RawMinerals.Count; i++)
	{
		var eNumber : int = _mineralType;
		var loopedNumber : int = RawMinerals[i].mineralType;
		if(_mineralType == RawMinerals[i].mineralType)
		{
			RawMinerals[i].mineralAmount += _amount;
			RefreshGUI();
			return;
		}
	}
	
	//else
	
	var _newClass : MineralBarrel = new MineralBarrel();
	_newClass.mineralType = _mineralType;
	_newClass.mineralAmount = _amount;
	RawMinerals.Add(_newClass);
	RefreshGUI();
}

public function RemoveMineral(_mineralType : eMineralType, _minimumAmountToRefine : int)
{
	var i : int;
	for(i = 0; i < RawMinerals.Count; i++)
	{
		if(RawMinerals[i].mineralType == _mineralType && RawMinerals[i].mineralAmount >= _minimumAmountToRefine)
		{
			RawMinerals[i].mineralAmount -= _minimumAmountToRefine;
		}
		if(RawMinerals[i].mineralAmount <= 0)
		{
			RawMinerals.RemoveAt(i);
		}
	}
	RefreshGUI();
}

public function RemoveRefined(_mineralType : rMineralType, _removeAmount : int)
{
	var i : int;
	for(i = 0; i < RefinedMinerals.Count; i++)
	{
		if(RefinedMinerals[i].refinedType == _mineralType)
		{
			RefinedMinerals[i].refinedAmount -= _removeAmount;
		}
		if(RefinedMinerals[i].refinedAmount <= 0)
		{
			RefinedMinerals.RemoveAt(i);
		}
	}
	RefreshGUI();
}

public function AddRefined(_refinedType : rMineralType, _amount : int)
{
	var i : int;
	for(i = 0; i < RefinedMinerals.Count; i++)
	{
		if(RefinedMinerals[i].refinedType == _refinedType)
		{
			RefinedMinerals[i].refinedAmount += _amount;
			RefreshGUI();
			//Stops reading when material is found.
			return;
		}
	}
	
	//if not found in list; will add to the list.//
	var newClass : rMineralAtt = new rMineralAtt();
	newClass.refinedType = _refinedType;
	newClass.refinedAmount = _amount;
	RefinedMinerals.Add(newClass);
	RefreshGUI();
}

public function ConvertMineralToRefined(_mineralType : eMineralType)
{
	MineralSetup.instance.AddRefinedM(_mineralType);
	
	MineralRefinery.instance.RemoveMineral(_mineralType, MineralRefinery.RequiredToRefine[_mineralType]);
	MineralRefinery.instance.RefreshGUI();
}

function OnTriggerEnter (col : Collider){

	var other : GameObject = col.collider.gameObject;
	if (other.name.ToLower().Contains("compressedmineral"))
		LinkedCompressedMinerals.Add(other.GetComponent(CompressedMinerals));
}

function OnTriggerExit (col : Collider){

	var other : GameObject = col.collider.gameObject;
	if (other.name.ToLower().Contains("compressedmineral"))
		LinkedCompressedMinerals.Remove(other.GetComponent(CompressedMinerals));
}

function ToggleRefinery(enterRefinery : boolean){

	if(enterRefinery) {
		RefineryInterface.localPosition.y = 3.8;
		StateSound.Play();
		RefreshGUI();
		SaveRefineryData();
	} else {
		RefineryInterface.localPosition.y = 3.9;
		StateSound.Play();
		RefreshGUI();
		SaveRefineryData();
	}
}

public static function GetKey(chunk : String) : String {
	return "MineralRefinery/" + chunk;
}