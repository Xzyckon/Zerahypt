import System.Collections.Generic;
#pragma strict

@System.Serializable
public class MineralAtt
{
	public var mineralType : eMineralType;
	public var mineralAmount : int = 0;
	public var mineralReceivePerSec : int = 1;
}

public var Minerals : List.<MineralAtt>;
public var CrumblePrefab : GameObject;