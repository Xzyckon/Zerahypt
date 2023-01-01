#pragma strict

var ConfJ : HingeJoint;

var reversedOpening : boolean;

var Open : boolean;

var Opening : boolean;
var Closing : boolean;

function FixedUpdate () {
if(!reversedOpening){
if(Closing || Opening){
        if(ConfJ.spring.targetPosition > 133){
        Open = true;
        Opening = false;
        }
        if(ConfJ.spring.targetPosition < 2){
        Open = false;
        Closing = false;
        }
}
        if(Opening){
        if(ConfJ.spring.targetPosition < 135)
            ConfJ.spring.targetPosition += 2;
            }
            
        if(Closing){
        if(ConfJ.spring.targetPosition > 0)
            ConfJ.spring.targetPosition -= 2;
            }
}else{
if(Closing || Opening){
        if(ConfJ.spring.targetPosition < -90){
        Open = true;
        Opening = false;
        }
        if(ConfJ.spring.targetPosition > 0){
        Open = false;
        Closing = false;
        }
}
        if(Opening){
        if(ConfJ.spring.targetPosition > -91)
            ConfJ.spring.targetPosition -= 2;
            }
            
        if(Closing){
        if(ConfJ.spring.targetPosition < 1)
            ConfJ.spring.targetPosition += 2;
            }
}
}

function Move () {
if(!reversedOpening){
            if(!Open){
            ConfJ.spring.targetPosition += 2;
            Opening = true;
            Closing = false;
            }
            if(Open){
            ConfJ.spring.targetPosition -= 2;
            Opening = false;
            Closing = true;
            }
            }else{
            if(!Open){
            ConfJ.spring.targetPosition += 2;
            Opening = true;
            Closing = false;
            }
            if(Open){
            ConfJ.spring.targetPosition -= 2;
            Opening = false;
            Closing = true;
            }
            }
}