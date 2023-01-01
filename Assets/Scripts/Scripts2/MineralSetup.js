#pragma strict
public static var instance : MineralSetup;
function Awake() { instance = this; }

public var LoadingBarTarget : GameObject;
public static var DeliverLoadAnimation : String = "MRHLoadingBarDeliver";
public static var DeliverLoadWaitTime : float = 2.0;
public static var RefineLoadAnimation : String = "MRHLoadingBarRefine";
public static var RefineLoadWaitTime : float = 60.0;
public static var DispenseLoadAnimation : String = "MRHLoadingBarDispense";
public static var DispenseLoadWaitTime : float = 2.0;

//Raw
public enum eMineralType
{
	Feldspar,
	Cohenite,
	Dappernite,
	Gypsum,
	Cassiterite,
	Chalcocite,
	Stolzite,
	Argentite,
	Argalite,
	Sperrylite,
	Augurite
}

//Refined
public enum rMineralType
{
	Silicon,
	Iron,
	Nickel,
	Tin,
	Cobalt,
	Copper,
	Carbon,
	Aluminium,
	Sulfur,
	Potassium,
	Sodium,
	Calcium,
	Magnesium,
	Lead,
	Poshium,
	Tungsten,
	Silver,
	Iridium,
	Osmium,
	Arsenic,
	Platinum,
	Tellurium,
	Gold
}

//This is to setup the amount of <A> you need to refine.
function Start()
{
	//									RawMineralType	NeedToRefine
	MineralRefinery.RequiredToRefine.Add( eMineralType.Feldspar,    2000);
	MineralRefinery.RequiredToRefine.Add( eMineralType.Stolzite,     800);
	MineralRefinery.RequiredToRefine.Add( eMineralType.Cassiterite,  400);
	MineralRefinery.RequiredToRefine.Add( eMineralType.Argentite,    800);
	MineralRefinery.RequiredToRefine.Add( eMineralType.Sperrylite,   400);
	MineralRefinery.RequiredToRefine.Add( eMineralType.Argalite,     800);
	MineralRefinery.RequiredToRefine.Add( eMineralType.Augurite,     800);
	MineralRefinery.RequiredToRefine.Add( eMineralType.Chalcocite,   800);
	MineralRefinery.RequiredToRefine.Add( eMineralType.Gypsum,       800);
	MineralRefinery.RequiredToRefine.Add( eMineralType.Cohenite,    2800);
	MineralRefinery.RequiredToRefine.Add( eMineralType.Dappernite,    60);
}

//This is to setup the amount of refined <B>'s you'll get from refining <A>
public function AddRefinedM(_mineralType : eMineralType)
{
	switch(_mineralType)
	{
		case eMineralType.Feldspar://			 MineralType			Amount//
			MineralRefinery.instance.AddRefined( rMineralType.Silicon,		4);
			MineralRefinery.instance.AddRefined( rMineralType.Aluminium,	2);
			MineralRefinery.instance.AddRefined( rMineralType.Potassium,	1);
			MineralRefinery.instance.AddRefined( rMineralType.Sodium,		1);
			MineralRefinery.instance.AddRefined( rMineralType.Calcium,		1);
			MineralRefinery.instance.AddRefined( rMineralType.Magnesium,    1);
			break;
			
		case eMineralType.Stolzite:
			MineralRefinery.instance.AddRefined( rMineralType.Lead,	        1);
			MineralRefinery.instance.AddRefined( rMineralType.Tungsten,	    1);
			break;
			
		case eMineralType.Cassiterite:
			MineralRefinery.instance.AddRefined( rMineralType.Tin,	        1);
			break;
			
		case eMineralType.Chalcocite:
			MineralRefinery.instance.AddRefined( rMineralType.Copper,       1);
			MineralRefinery.instance.AddRefined( rMineralType.Sulfur,       1);
			break;
			
		case eMineralType.Sperrylite:
			MineralRefinery.instance.AddRefined( rMineralType.Platinum,     1);
			MineralRefinery.instance.AddRefined( rMineralType.Arsenic,      1);
			break;
			
		case eMineralType.Argentite:
			MineralRefinery.instance.AddRefined( rMineralType.Silver,       1);
			MineralRefinery.instance.AddRefined( rMineralType.Sulfur,       1);
			break;
			
		case eMineralType.Argalite:
			MineralRefinery.instance.AddRefined( rMineralType.Osmium,       1);
			MineralRefinery.instance.AddRefined( rMineralType.Iridium,      1);
			break;
		
		case eMineralType.Augurite:
			MineralRefinery.instance.AddRefined( rMineralType.Gold,         1);
			MineralRefinery.instance.AddRefined( rMineralType.Tellurium,    1);
			break;
			
		case eMineralType.Gypsum:
			MineralRefinery.instance.AddRefined( rMineralType.Calcium,	    1);
			MineralRefinery.instance.AddRefined( rMineralType.Sulfur,	    1);
			break;
			
		case eMineralType.Cohenite:
			MineralRefinery.instance.AddRefined( rMineralType.Iron,	        8);
			MineralRefinery.instance.AddRefined( rMineralType.Nickel,	    4);
			MineralRefinery.instance.AddRefined( rMineralType.Cobalt,	    1);
			MineralRefinery.instance.AddRefined( rMineralType.Carbon,	    1);
			break;
			
		case eMineralType.Dappernite:
			MineralRefinery.instance.AddRefined( rMineralType.Poshium,	    1);
			break;
			
		default:
			Debug.LogError("Couldnt find the configuration for " + _mineralType.ToString(), this);
			return;
	}
}