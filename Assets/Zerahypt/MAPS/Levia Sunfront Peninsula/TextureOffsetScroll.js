// Scroll main texture based on time

var ScrollTex : boolean;
var ScrollBump : boolean;

var scrollSpeed : float = 0.5;
var rend: Renderer;


function Start() {
    rend = GetComponent.<Renderer>();
}


function Update () {
    var offset : float = Time.time * scrollSpeed;
    if(ScrollTex)
    rend.material.SetTextureOffset("_MainTex", Vector2(offset,0));
    if(ScrollBump)
    rend.material.SetTextureOffset("_BumpMap", Vector2(offset,0));
}