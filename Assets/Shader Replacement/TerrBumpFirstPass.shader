Shader "Nature/Terrain/Bumped Specular Other" {
Properties {
	_SpecColor ("Specular Color", Color) = (0.5, 0.5, 0.5, 1)
	_Shininess ("Shininess", Range (0.03, 1)) = 0.078125

	// set by terrain engine
	[HideInInspector] _Control ("Control (RGBA)", 2D) = "red" {}
	[HideInInspector] _Splat3 ("Layer 3 (A)", 2D) = "white" {}
	[HideInInspector] _Splat2 ("Layer 2 (B)", 2D) = "white" {}
	[HideInInspector] _Splat1 ("Layer 1 (G)", 2D) = "white" {}
	[HideInInspector] _Splat0 ("Layer 0 (R)", 2D) = "white" {}
	[HideInInspector] _Normal3 ("Normal 3 (A)", 2D) = "bump" {}
	[HideInInspector] _Normal2 ("Normal 2 (B)", 2D) = "bump" {}
	[HideInInspector] _Normal1 ("Normal 1 (G)", 2D) = "bump" {}
	[HideInInspector] _Normal0 ("Normal 0 (R)", 2D) = "bump" {}
	// used in fallback on old cards & base map
	[HideInInspector] _MainTex ("BaseMap (RGB)", 2D) = "white" {}
	[HideInInspector] _Color ("Main Color", Color) = (1,1,1,1)
}
	
SubShader {
	Tags {
		"SplatCount" = "4"
		"Queue" = "Geometry-100"
		"RenderType" = "Opaque"
	}
CGPROGRAM
#pragma surface surf BlinnPhong vertex:vert
#pragma target 3.0

void vert (inout appdata_full v)
{
	v.tangent.xyz = cross(v.normal, float3(0,0,1));
	v.tangent.w = -1;
}

struct Input {
	float2 uv_Control : TEXCOORD0;
	float2 uv_Splat0 : TEXCOORD1;
	float2 uv_Splat1 : TEXCOORD2;
	float2 uv_Splat2 : TEXCOORD3;
	float2 uv_Splat3 : TEXCOORD4;
};

sampler2D _Control;
sampler2D _Splat0,_Splat1,_Splat2,_Splat3;
sampler2D _Normal0,_Normal1,_Normal2,_Normal3;
half _Shininess;

void surf (Input IN, inout SurfaceOutput o) {
	fixed4 splat_control = tex2D (_Control, IN.uv_Control);
	fixed4 col;
	col  = splat_control.r * tex2D (_Splat0, IN.uv_Splat0);
	col += splat_control.g * tex2D (_Splat1, IN.uv_Splat1);
	col += splat_control.b * tex2D (_Splat2, IN.uv_Splat2);
	col += splat_control.a * tex2D (_Splat3, IN.uv_Splat3);
	o.Albedo = col.rgb;
	
	float3 normal0 = UnpackNormal(tex2D(_Normal0, IN.uv_Splat0));
	float3 normal1 = UnpackNormal(tex2D(_Normal1, IN.uv_Splat1));
	float3 normal2 = UnpackNormal(tex2D(_Normal2, IN.uv_Splat2));
	float3 normal3 = UnpackNormal(tex2D(_Normal3, IN.uv_Splat3));
	
	float3 combinedNormal = normal0 * splat_control.r;
	combinedNormal += normal1 * splat_control.g;
	combinedNormal += normal2 * splat_control.b;
	combinedNormal += normal3 * splat_control.a;
	
	#if defined(UNITY_PASS_FORWARDBASE) || defined(UNITY_PASS_FORWARDADD)
	// Deferred pass data is combined, but forward lighting requires local normals:
	combinedNormal = normalize(combinedNormal);
	#endif
	o.Normal = combinedNormal;
	
	fixed splatSum = dot(splat_control, fixed4(1,1,1,1));
	o.Gloss = col.a * splatSum;
	o.Specular = _Shininess;
	
	o.Alpha = 0.0;
}
ENDCG  
}

Dependency "AddPassShader" = "Hidden/Nature/Terrain/Bumped Specular AddPass"
Dependency "BaseMapShader" = "Specular"

Fallback "Nature/Terrain/Diffuse"
}
