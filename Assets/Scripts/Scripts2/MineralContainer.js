import System.Collections.Generic;
#pragma strict

@System.Serializable
public class MineralBarrel
{
	public var mineralType : eMineralType;
	public var mineralAmount : int = 0;
	
	
	public function MineralBarrel()
	{
		mineralType = 0;
		mineralAmount = 0;
	}
	
	public function MineralBarrel(_type : eMineralType, _amount : int)
	{
		mineralType = _type;
		mineralAmount = _amount;
	}
}

public static var instance : MineralContainer;
public static var currentMineralCount : int = 0;
var myMinerals : List.<MineralBarrel> = new List.<MineralBarrel>();

function Awake()
{
	instance = this;
}

function Update()
{
	if (currentMineralCount < 0) {
		currentMineralCount = 0;
	}
}

function Start()
{
	/*var myEnumCount : int = System.Enum.GetNames(typeof(eMineralType)).Length;
	var i : int;
	for(i = 0; i < myEnumCount; i++)
	{
		var newMineral : MineralBarrel = new MineralBarrel();
		newMineral.mineralType = i;
		myMinerals.Add(newMineral);
	}*/
}

public function InsertMineralToContainer(_mineralType : eMineralType, _amount : int)
{
	var i : int;
	for(i = 0; i < myMinerals.Count; i++)
	{
		var eNumber : int = _mineralType;
		var loopedNumber : int = myMinerals[i].mineralType;
		if(_mineralType == myMinerals[i].mineralType)
		{
			myMinerals[i].mineralAmount += _amount;
			currentMineralCount += _amount;
			return;
		}
	}
	
	//else
	
	var _newClass : MineralBarrel = new MineralBarrel();
	_newClass.mineralType = _mineralType;
	_newClass.mineralAmount = _amount;
	myMinerals.Add(_newClass);
}

public function RemoveMineral(_mineralType : eMineralType)
{
	var i : int;
	for(i = 0; i < myMinerals.Count; i++)
	{
		if(myMinerals[i].mineralType == _mineralType)
		{
			myMinerals.RemoveAt(i);
		}
	}
}

public static function SaveDataToContainer(_listMinerals : List.<MineralBarrel>)
{
	var _saveText : String = "";
	var i : int;
	for(i = 0; i < _listMinerals.Count; i++)
	{
		_saveText += (_listMinerals[i].mineralType) + ":" + _listMinerals[i].mineralAmount + " ";
	}
	_listMinerals.Clear();
	PlayerPrefs.SetString("SavedMinerals", _saveText);
	PlayerPrefs.Save();
}

public static function LoadDataToContainer(_listMinerals : List.<MineralBarrel>)
{
	if(PlayerPrefs.HasKey("SavedMinerals"))
	{
		var _loadText : String = PlayerPrefs.GetString("SavedMinerals");
		var _parts : String[] = _loadText.Split(" "[0]);
		
		var i : int;
		for(i = 0; i < _parts.Length - 1; i++)
		{
			var _type : eMineralType = int.Parse(_parts[i].Split(":"[0])[0]);
			var _amount : int = int.Parse(_parts[i].Split(":"[0])[1]);
			
			var newMineral : MineralBarrel = new MineralBarrel(_type, _amount);
			_listMinerals.Add(newMineral);
		}
		
		PlayerPrefs.DeleteKey("SavedMinerals");
		PlayerPrefs.Save();
	}
}
