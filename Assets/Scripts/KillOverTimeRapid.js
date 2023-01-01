var lifetime : float = 0.5;
 
    function FixedUpdate()
    {
        Destroy(gameObject, lifetime);
    }