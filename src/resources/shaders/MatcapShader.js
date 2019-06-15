import { ShaderLib, Vector2 } from 'three';

const uniforms = Object.assign(
  ShaderLib.matcap.uniforms,
  {
    u_blendPos: {type: "f", value: 0 },
    u_map1Offset: { type: "v2", value: new Vector2() },
    u_map2Offset: { type: "v2", value: new Vector2() }
  }
);

const vertShader = `
  #define MATCAP

  varying vec3 vViewPosition;

  #ifndef FLAT_SHADED

    varying vec3 vNormal;

  #endif

  #include <common>

  varying vec2 vUv;
  uniform mat3 uvTransform;

  #include <displacementmap_pars_vertex>
  #include <fog_pars_vertex>
  #include <morphtarget_pars_vertex>
  #include <skinning_pars_vertex>

  #include <logdepthbuf_pars_vertex>
  #include <clipping_planes_pars_vertex>

  void main() {

    vUv = ( uvTransform * vec3( uv, 1 ) ).xy;

    #include <beginnormal_vertex>
    #include <morphnormal_vertex>
    #include <skinbase_vertex>
    #include <skinnormal_vertex>
    #include <defaultnormal_vertex>

    #ifndef FLAT_SHADED // Normal computed with derivatives when FLAT_SHADED

      vNormal = normalize( transformedNormal );

    #endif

    #include <begin_vertex>
    #include <morphtarget_vertex>
    #include <skinning_vertex>
    #include <displacementmap_vertex>
    #include <project_vertex>

    #include <logdepthbuf_vertex>
    #include <clipping_planes_vertex>
    #include <fog_vertex>

    vViewPosition = - mvPosition.xyz;

  }
`;

const fragShader = `
  #define MATCAP

  uniform vec3 diffuse;
  uniform float opacity;
  uniform sampler2D matcap;
  uniform float u_scrollpos;

  uniform float u_blendPos;
  uniform vec2 u_map1Offset;
  uniform vec2 u_map2Offset;

  const float smoothness = 0.3;

  varying vec3 vViewPosition;

  #ifndef FLAT_SHADED

    varying vec3 vNormal;

  #endif

  #include <common>
  varying vec2 vUv;
  #include <map_pars_fragment>
  #include <alphamap_pars_fragment>

  #include <fog_pars_fragment>
  #include <bumpmap_pars_fragment>
  #include <normalmap_pars_fragment>
  #include <logdepthbuf_pars_fragment>
  #include <clipping_planes_pars_fragment>

  void main() {

    #include <clipping_planes_fragment>

    vec4 diffuseColor = vec4( diffuse, opacity );

    #include <logdepthbuf_fragment>
    #include <map_fragment>
    #include <alphamap_fragment>
    #include <alphatest_fragment>
    #include <normal_fragment_begin>
    #include <normal_fragment_maps>

    vec3 viewDir = normalize( vViewPosition );
    vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
    vec3 y = cross( viewDir, x );
    vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.47 + 0.5; // 0.47 to remove artifacts caused by undersized matcap disks

    #ifdef USE_MATCAP
      float m = (1.0-step(u_blendPos, 0.0)) * (1.0 - smoothstep(-smoothness, 0.0, .5 * uv.x + .5 * uv.y - (u_blendPos*(1.0 + smoothness))));
      vec4 matcapColor = texture2D( matcap, vec2(uv.x *0.5 + u_map1Offset.x, uv.y*0.5 + u_map1Offset.y));
      vec4 matcapColor2 = texture2D( matcap, vec2(uv.x *0.5 + u_map2Offset.x, uv.y*0.5 + u_map2Offset.y));
      matcapColor = mix(matcapColor, matcapColor2, m);
      matcapColor = matcapTexelToLinear( matcapColor );

    #else

      vec4 matcapColor = vec4( 1.0 );

    #endif

    vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;

    gl_FragColor = vec4( outgoingLight, diffuseColor.a );

    #include <premultiplied_alpha_fragment>
    #include <tonemapping_fragment>
    #include <encodings_fragment>
    #include <fog_fragment>

  }
`;

export default {uniforms, vertShader, fragShader };
