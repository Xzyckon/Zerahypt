var Target : Transform;
var FollowCam : boolean;

function Start () {
if(FollowCam)
Target = PlayerInformation.instance.PhysCam;
}
	
	function LateUpdate() {
	if(Target == null)
    return;
			transform.position = Target.transform.position;
	}