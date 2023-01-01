    var target : Transform;
    var AimRate = 1;
 
    private var thisTransform : Transform;
 
 
    function Start()
    {
           thisTransform = transform;
    }
 
    function FixedUpdate()
    {
 
           thisTransform.position.x = Mathf.MoveTowards( thisTransform.position.x, target.position.x, AimRate);
 
           thisTransform.position.y = Mathf.MoveTowards( thisTransform.position.y, target.position.y, AimRate);
           
           thisTransform.position.z = Mathf.MoveTowards( thisTransform.position.z, target.position.z, AimRate);
 
    }