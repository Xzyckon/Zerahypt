// Upgrade NOTE: replaced 'SeperateSpecular' with 'SeparateSpecular'
 
Shader " Vertex Colored Fog OFF" {
Properties {
    _Color ("Main Color", Color) = (1,1,1,1)
    _SpecColor ("Spec Color", Color) = (1,1,1,1)
    _Emission ("Emmisive Color", Color) = (0,0,0,0)
    _Shininess ("Shininess", Range (0.01, 1)) = 0.7
    _MainTex ("Base (RGB)", 2D) = "white" {}
}
 
SubShader {
    Pass {
        Fog {Mode Off}
        Material {
            Shininess [_Shininess]
            Specular [_SpecColor]
            Emission [_Emission]    
        }
        #warning Upgrade NOTE: ColorMaterial mode Diffuse is no longer supported
/*ColorMaterial Diffuse */
        Lighting On
        SeparateSpecular On
        SetTexture [_MainTex] {
            Combine texture * primary, texture * primary
        }
        SetTexture [_MainTex] {
            constantColor [_Color]
            Combine previous * constant DOUBLE, previous * constant
        } 
    }
}
 
Fallback " VertexLit", 1
}