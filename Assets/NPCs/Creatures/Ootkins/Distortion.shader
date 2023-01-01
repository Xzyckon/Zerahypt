// This source code is NOT a full fledged distortion solution.
// It's just an example and hopefully proves useful for someone.
//
// I'm not sure if Unity Pro is required due to the usage of "GrabPass".
Shader "Custom/DistortionExample" {
    Properties {
        _MainTex ("Base (RGB)", 2D) = "white" {}
        _IntensityAndScrolling ("Intensity (XY), Scrolling (ZW)", Vector) = (0.1,0.1,1,1)
    }
    SubShader {
        Tags {"Queue" = "Transparent" "IgnoreProjector" = "True"}
        Lighting Off
        LOD 200
 
        // See http://docs.unity3d.com/Manual/SL-GrabPass.html
        GrabPass { "_GrabTexture" }
 
        CGPROGRAM
        #pragma surface surf Lambert
 
        sampler2D _MainTex;
        sampler2D _GrabTexture;
 
        // x=horizontal intensity, y=vertical intensity
        // z=horizontal scrolling speed, w=vertical scrolling speed
        float4 _IntensityAndScrolling;
 
        struct Input
        {
            float2 uv_MainTex;
            float4 screenPos;
        };
 
        void surf (Input IN, inout SurfaceOutput o)
        {
            // get screen space position of current pixel
            half2 screenUV = IN.screenPos.xy / IN.screenPos.w;
        #if UNITY_UV_STARTS_AT_TOP
            screenUV.y = 1-screenUV.y;
        #endif
     
            // _MainTex should use "Bypass sRGB Sampling" import setting.
            // d.x = horizontal offset 0..1
            // d.y = vertical offset 0..1
            float4 d = tex2D (_MainTex, IN.uv_MainTex+_Time.gg*_IntensityAndScrolling.zw);
     
            // d.x*2-1 transforms range from 0..1 to -1..1.
            // negative values move to the left, positive to the right.
            screenUV.x += (d.x*2-1) * _IntensityAndScrolling.x;
            screenUV.y += (d.y*2-1) * _IntensityAndScrolling.y;
     
            half4 c = tex2D (_GrabTexture, screenUV);
            o.Emission = c.rgb;
            o.Alpha = 1;
        }
        ENDCG
    }
    FallBack "Diffuse"
}