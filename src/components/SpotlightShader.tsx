// // SpotlightShader.tsx
// import { useEffect } from "react";
// import { useFrame, useThree } from "@react-three/fiber";
// import { useRef, useState } from "react";

// import * as THREE from "three";

// interface SpotlightShaderProps {
//   color?: string; // Accept color as a prop
// }

// export function SpotlightShader({ color = "#ffffff" }: SpotlightShaderProps) {
//   const meshRef = useRef<THREE.Mesh>(null);
//   // const [mouse, setMouse] = useState([0.5, 0.5]); // Default to center

//   const { size } = useThree();

//       useEffect(() => {
//         console.log('Current theme from config:', color);
  
//       }, [color]);

//   const uniforms = useRef({
//     uMouse: { value: new THREE.Vector2(0.5, 0.5) },
//     uResolution: { value: new THREE.Vector2(size.width, size.height) },
//     uColor: { value: new THREE.Color(color) },
//   });

//   useEffect(() => {
//     const handleResize = () => {
//       uniforms.current.uResolution.value.set(window.innerWidth, window.innerHeight);
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [uniforms]);



//   useEffect(() => {
//     uniforms.current.uColor.value.set(color); // Update color dynamically when prop changes
//   }, [color, uniforms]);



//   return (
//     <mesh ref={meshRef}>
//       <planeGeometry args={[2, 2]} />
//       <shaderMaterial
//         fragmentShader={fragment}
//         vertexShader={vertex}
//         uniforms={uniforms.current}
//         transparent
//       />
//     </mesh>
//   );
// }

// const vertex = `
// varying vec2 vUv;
// void main() {
//   vUv = uv;
//   gl_Position = vec4(position, 1.0);
// }
// `;

// const fragment = `
// uniform vec2 uMouse;
// uniform vec2 uResolution;
// uniform vec3 uColor; // Add color uniform
// varying vec2 vUv;

// void main() {
//   vec2 st = gl_FragCoord.xy / uResolution.xy;
//   float dist = distance(st, uMouse);
//   float intensity = smoothstep(0.3, 0.0, dist);
//   gl_FragColor = vec4(uColor, intensity * 0.5); // Use color uniform
// }
// `;



// SpotlightShader.tsx
import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SpotlightShaderProps {
  color?: string;
}

export function SpotlightShader({ color = "#ffffff" }: SpotlightShaderProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size,  } = useThree();

  const uniforms = useRef({
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
    uColor: { value: new THREE.Color(color) },
    uTime: { value: 0 },
  });

  // Resize
  useEffect(() => {
    const handleResize = () => {
      uniforms.current.uResolution.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Color update
  useEffect(() => {
    uniforms.current.uColor.value.set(color);
  }, [color]);

  // Mouse tracking
  // useFrame(({ mouse, clock }) => {
  //   uniforms.current.uTime.value = clock.getElapsedTime();
  //   uniforms.current.uMouse.value.set(
  //     (mouse.x + 1) / 2,
  //     (1 - mouse.y) / 2
  //   );
  // });

  return (
    <mesh ref={meshRef}  renderOrder={-999}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        fragmentShader={fragment}
        vertexShader={vertex}
        uniforms={uniforms.current}
        transparent
        depthWrite={false} 
        depthTest={false}
      />
    </mesh>
  );
}

const vertex = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const fragment = `
uniform vec2 uMouse;
uniform vec2 uResolution;
uniform vec3 uColor;
uniform float uTime;

varying vec2 vUv;

float circle(vec2 uv, vec2 pos, float r, float blur) {
  float d = distance(uv, pos);
  return smoothstep(r + blur, r - blur, d);
}

float noise(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
  vec2 st = gl_FragCoord.xy / uResolution.xy;

  // Add time-based shimmer
  float n = noise(st * 50.0 + uTime * 0.5) * 0.02;

  // Create spotlight effect
  float spot = circle(st, uMouse, 0.2, 0.2);
  float edgeSoftness = smoothstep(0.0, 1.0, spot);

  // Fresnel-like edge glow
  float fresnel = pow(1.0 - distance(st, uMouse), 3.0);

  vec3 finalColor = uColor * (edgeSoftness + fresnel * 0.3 + n) * 0.8;
  float alpha = edgeSoftness * 0.2 + fresnel * 0.01;

  if (alpha < 0.01) discard;
  gl_FragColor = vec4(finalColor, alpha) * 0.99;
}
`;