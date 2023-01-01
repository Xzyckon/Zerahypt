#pragma strict

var UseCountDown : boolean;
var RemoveWhenDone : boolean;
var WhatToRemove : GameObject;

var CountDown : float = 1.3;

var WhatToSpawn : GameObject;

var WhereToSpawn : Transform;

function Start () {
if(UseCountDown){
if(CountDown > 0){
yield WaitForSeconds (CountDown);
Instantiate(WhatToSpawn, transform.position, transform.rotation);
if(RemoveWhenDone)
Destroy(WhatToRemove);
}else{
if(!WhereToSpawn)
Instantiate(WhatToSpawn, transform.position, transform.rotation);
else
Instantiate(WhatToSpawn, WhereToSpawn.position, WhereToSpawn.rotation);
if(RemoveWhenDone)
Destroy(WhatToRemove);
}
}
}

function Spawn () {
  Instantiate(WhatToSpawn, transform.position, transform.rotation);
}