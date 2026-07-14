'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { ShaderMaterial, Vector2 } from 'three';

const vertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uCompact;
  uniform float uAspect;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(41.73, 289.11))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(p);
      p = p * 2.03 + 17.2;
      amplitude *= 0.5;
    }
    return value;
  }

  float circle(vec2 p, vec2 center, float radius) {
    return length(p - center) - radius;
  }

  float cloud(vec2 p, float t) {
    float drift = sin(t * 0.19) * 0.035;
    float field = circle(p, vec2(-0.54 + drift, 0.03), 0.34);
    field = min(field, circle(p, vec2(-0.19, -0.02), 0.46));
    field = min(field, circle(p, vec2(0.24, -0.02), 0.48));
    field = min(field, circle(p, vec2(0.62, 0.04), 0.35));
    field = min(field, circle(p, vec2(0.02, 0.15), 0.28));
    return field;
  }

  void main() {
    vec2 p = vUv - 0.5;
    p.x *= uAspect;
    vec2 mouse = uPointer * vec2(0.22, 0.15);
    float n = fbm(p * 3.2 + vec2(uTime * 0.028, -uTime * 0.022));
    float alpha;

    if (uCompact > 0.5) {
      vec2 roundP = p + mouse * 0.32;
      float radius = 0.52 + (n - 0.5) * 0.17;
      alpha = 1.0 - smoothstep(radius - 0.04, radius + 0.06, length(roundP));
    } else {
      float edge = cloud(p + mouse * 0.50, uTime);
      alpha = 1.0 - smoothstep(-0.02, 0.06, edge);
    }

    float light = smoothstep(-0.66, 0.78, p.x + p.y * 0.28 + n * 0.22);
    float aqua = smoothstep(0.12, 0.82, n + p.x * 0.17 + 0.18);
    vec3 blue = vec3(0.282, 0.827, 0.894);
    vec3 green = vec3(0.106, 0.941, 0.020);
    vec3 pale = vec3(0.66, 0.94, 0.96);
    vec3 colour = mix(pale, blue, light);
    colour = mix(colour, green, aqua * 0.18);
    colour += (n - 0.5) * 0.05;
    vec3 paper = vec3(0.992, 0.992, 0.988);
    gl_FragColor = vec4(mix(paper, colour, alpha), 1.0);
  }
`;

function CloudPlane({ compact }: { compact: boolean }) {
  const material = useRef<ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new Vector2() },
      uCompact: { value: compact ? 1 : 0 },
      uAspect: { value: 1.6 },
    }),
    [compact]
  );

  useFrame((state) => {
    if (!material.current) return;
    material.current.uniforms.uTime.value = state.clock.getElapsedTime();
    material.current.uniforms.uPointer.value.set(state.pointer.x, state.pointer.y);
    material.current.uniforms.uAspect.value = state.size.width / state.size.height;
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

export function AtmosphereCanvas({ compact }: { compact: boolean }) {
  return (
    <Canvas
      className="atmosphere-canvas"
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, premultipliedAlpha: false }}
      camera={{ position: [0, 0, 1] }}
    >
      <CloudPlane compact={compact} />
    </Canvas>
  );
}
