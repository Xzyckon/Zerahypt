#pragma strict

var Vessel : GameObject;

var LeftPivotAngle : float = 0;
var RightPivotAngle : float = 0;

var PivotSpeed : float = 0.5;

var PivotAngle : float = 0;

var AllPivotAngle : float = 0;

var UseDuck : boolean;

var Limit : float = 5;
var LimitAngle : float = 10;

var FastTurnReset : boolean;

var Reversed : boolean;

var UseCurve : boolean;
var curve : AnimationCurve = new AnimationCurve();
var PivotAmount : float = 0;

function FixedUpdate () {
	if(WorldInformation.playerCar == transform.parent.name){
	
if(UseCurve){

var p = Vessel.rigidbody.velocity.magnitude;

PivotAmount = curve.Evaluate(p);

}
	
	if(UseDuck){
	    if(Input.GetKey(KeyCode.LeftShift) && PivotAngle < AllPivotAngle)
            PivotAngle += PivotSpeed;
            
		if(!Input.GetKey(KeyCode.LeftShift) && PivotAngle > 0)
			PivotAngle -= PivotSpeed;
			
		hingeJoint.spring.targetPosition = PivotAngle;
	
	}else{
	
	if(!Reversed){
	
	if(UseCurve){
	    if(Input.GetKey("a")){
	    
	     if(PivotAngle > -PivotAmount)
            PivotAngle -= PivotSpeed;
            
         if(-PivotAmount > PivotAngle)
			PivotAngle += PivotSpeed;
         
            }
            
        if(Input.GetKey("d")){
        
         if(PivotAngle < PivotAmount)
			PivotAngle += PivotSpeed;
			
		 if(PivotAmount < PivotAngle)
			PivotAngle -= PivotSpeed;
         
			}
        
        if(!Input.GetKey("d"))
		if(!Input.GetKey("a") && PivotAngle > 0)
			PivotAngle -= PivotSpeed;
		
		if(!Input.GetKey("a"))
		if(!Input.GetKey("d") && PivotAngle < 0)
			PivotAngle += PivotSpeed;
			
		hingeJoint.spring.targetPosition = PivotAngle;

		}else{
	    if(Input.GetKey("a") && PivotAngle > -LeftPivotAngle)
            PivotAngle -= PivotSpeed;
            
        if(Input.GetKey("d") && PivotAngle < RightPivotAngle)
			PivotAngle += PivotSpeed;
        
        if(!Input.GetKey("d"))
		if(!Input.GetKey("a") && PivotAngle > 0){
		if(FastTurnReset){
			PivotAngle -= PivotSpeed * 2;
			if(PivotAngle < 1)
			PivotAngle = 0;
			}else{
			PivotAngle -= PivotSpeed;
			}
			}
		
		if(!Input.GetKey("a"))
		if(!Input.GetKey("d") && PivotAngle < 0){
			if(FastTurnReset){
			PivotAngle += PivotSpeed * 2;
			if(PivotAngle > -1)
			PivotAngle = 0;
			}else{
			PivotAngle += PivotSpeed;
			}
			}
			
		hingeJoint.spring.targetPosition = PivotAngle;
	}
}else{

if(UseCurve){
	    if(Input.GetKey("d")){
	    
	     if(PivotAngle > -PivotAmount)
            PivotAngle -= PivotSpeed;
            
         if(-PivotAmount > PivotAngle)
			PivotAngle += PivotSpeed;
         
            }
            
        if(Input.GetKey("a")){
        
         if(PivotAngle < PivotAmount)
			PivotAngle += PivotSpeed;
			
		 if(PivotAmount < PivotAngle)
			PivotAngle -= PivotSpeed;
         
			}
        
        if(!Input.GetKey("a"))
		if(!Input.GetKey("d") && PivotAngle > 0)
			PivotAngle -= PivotSpeed;
		
		if(!Input.GetKey("d"))
		if(!Input.GetKey("a") && PivotAngle < 0)
			PivotAngle += PivotSpeed;
			
		hingeJoint.spring.targetPosition = PivotAngle;

		}else{
	    if(Input.GetKey("d") && PivotAngle > -LeftPivotAngle)
            PivotAngle -= PivotSpeed;
            
        if(Input.GetKey("a") && PivotAngle < RightPivotAngle)
			PivotAngle += PivotSpeed;
        
        if(!Input.GetKey("a"))
		if(!Input.GetKey("d") && PivotAngle > 0)
			PivotAngle -= PivotSpeed;
		
		if(!Input.GetKey("d"))
		if(!Input.GetKey("a") && PivotAngle < 0)
			PivotAngle += PivotSpeed;
			
		hingeJoint.spring.targetPosition = PivotAngle;
	}

}
}
}
}