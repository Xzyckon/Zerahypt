#pragma strict
public var ScrollType : mDir;
public var ScrollDirection : sDir;

public enum mDir { RawWindow, RefinedWindow }
public enum sDir { Up, Down }

function OnMouseUpAsButton()
{
	switch(ScrollType)
	{
		case mDir.RawWindow:
			if(ScrollDirection == sDir.Up)
				MineralGUI.RefineOffset = Mathf.Clamp(MineralGUI.RefineOffset - 1, 0,
				MineralRefinery.instance.RawMinerals.Count);
			if(ScrollDirection == sDir.Down)
				MineralGUI.RefineOffset = Mathf.Clamp(MineralGUI.RefineOffset + 1, 0,
				MineralRefinery.instance.RawMinerals.Count);
			break;
		case mDir.RefinedWindow:
			if(ScrollDirection == sDir.Up)
				MineralGUI.DispenseOffset = Mathf.Clamp(MineralGUI.DispenseOffset - 1, 0,
				MineralRefinery.instance.RefinedMinerals.Count);
			if(ScrollDirection == sDir.Down)
				MineralGUI.DispenseOffset = Mathf.Clamp(MineralGUI.DispenseOffset + 1, 0,
				MineralRefinery.instance.RefinedMinerals.Count);
			break;
	}
	MineralRefinery.instance.RefreshGUI();
}