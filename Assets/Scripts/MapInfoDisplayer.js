#pragma strict
function Start() {
	InvokeRepeating("Tick", 0, 0.1);
}

function Tick() {
	var hit : RaycastHit;
	if (Physics.Raycast(transform.position, -transform.forward, hit, 8000)){
		if(MapInfoDisplay.instance != null)
		if(hit.collider.gameObject.GetComponent(MapMarkerClick) != null)
			MapInfoDisplay.instance.UpdateName(hit.collider.gameObject.GetComponent(MapMarkerClick).NameOfArea);
    }
}