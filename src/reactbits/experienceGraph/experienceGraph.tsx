'use client';

import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  Text,
  Environment,
  Sky,
  Sparkles,
  Billboard,
  Html // For potential advanced tooltips
} from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three'; // Import THREE for Vector3 and Color

// Enhanced frameworks data with unique IDs and thematic colors
const frameworks = [
  { id: 'nextjs', name: 'Next.js', x: 1, y: 8, z: 6, color: '#0070f3', description: 'The React Framework for Production.' },
  { id: 'flask', name: 'Flask', x: 1, y: 1, z: 7, color: '#3775A8', description: 'A micro web framework written in Python.' }, // Updated color for better visibility
  { id: 'laravel', name: 'Laravel', x: 9, y: 6, z: 4, color: '#ff2d20', description: 'A PHP web framework with expressive, elegant syntax.' },
  { id: 'rails', name: 'Rails', x: 9, y: 3, z: 6, color: '#CC0000', description: 'A web-application framework written in Ruby.' },
  { id: 'django', name: 'Django', x: 9, y: 2, z: 8, color: '#092e20', description: 'A high-level Python Web framework.' },
  { id: 'phoenix', name: 'Phoenix', x: 7, y: 4, z: 5, color: '#FD4F00', description: 'A productive web framework that does not compromise speed and maintainability.' },
];

// A more sophisticated Dot component
function Dot({ id, name, x, y, z, color, description, onFocus }) {
  const meshRef = useRef();
  const textRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  const baseScale = active ? 1.8 : (hovered ? 1.5 : 1);
  const targetColor = new THREE.Color(hovered || active ? 'white' : color);
  const emissiveColor = new THREE.Color(hovered || active ? color : 'black');

  useFrame((state, delta) => {
    // Smooth scaling animation
    meshRef.current.scale.lerp(new THREE.Vector3(baseScale, baseScale, baseScale), delta * 10);
    // Smooth color transition for the mesh material
    meshRef.current.material.color.lerp(targetColor, delta * 10);
    meshRef.current.material.emissive.lerp(emissiveColor, delta * 10);

    // Make text slightly more visible when hovered/active
    if (textRef.current) {
      textRef.current.material.opacity = THREE.MathUtils.lerp(
        textRef.current.material.opacity,
        hovered || active ? 1 : 0.7,
        delta * 10
      );
    }
  });

  const handleClick = (event) => {
    event.stopPropagation(); // Prevent orbit controls from firing if we click on a dot
    setActive(!active);
    onFocus(active ? null : { x, y, z, name }); // Send focus information to parent
  };

  return (
    <group
      position={[x, y, z]}
      onPointerOver={(event) => { event.stopPropagation(); setHovered(true); }}
      onPointerOut={() => setHovered(false)}
      onClick={handleClick}
    >
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.25, 32, 32]} /> {/* Smoother sphere */}
        <meshPhysicalMaterial // More realistic material
          color={color}
          metalness={0.3}
          roughness={0.4}
          emissive="black" // Will be changed on hover/active
          transparent // Needed for opacity changes if any
        />
      </mesh>
      <Billboard> {/* Text always faces the camera */}
        <Text
          ref={textRef}
          position={[0, 0.5, 0]} // Positioned above the sphere
          fontSize={0.4}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#1c1c1c"
          material-transparent={true} // Ensure material supports opacity
          material-opacity={0.7} // Initial opacity
        >
          {name}
        </Text>
        {active && (
          <Html position={[0, -0.6, 0]} center distanceFactor={10} zIndexRange={[100,0]}>
            <div style={{
              padding: '8px 12px',
              background: 'rgba(0,0,0,0.7)',
              color: 'white',
              borderRadius: '4px',
              fontSize: '12px',
              width: '150px',
              textAlign: 'center',
              border: `1px solid ${color}`
            }}>
              {description}
            </div>
          </Html>
        )}
      </Billboard>
    </group>
  );
}

export default function Framework3DGraph() {
  const [focusedFramework, setFocusedFramework] = useState(null);
  const controlsRef = useRef();

  useFrame((state) => {
    // Gently orbit around the focused framework, or the center if none is focused
    if (controlsRef.current) {
        if (focusedFramework) {
            const targetPosition = new THREE.Vector3(focusedFramework.x, focusedFramework.y, focusedFramework.z);
            controlsRef.current.target.lerp(targetPosition, 0.02); // Smoothly move target
        } else {
            // Optionally, reset to center or maintain current if preferred
            // controlsRef.current.target.lerp(new THREE.Vector3(5, 4, 5), 0.02); // Example center
        }
        controlsRef.current.update(); // Important for damping and target changes
    }
  });


  const handleFocusFramework = (frameworkData) => {
    setFocusedFramework(frameworkData);
  };


  return (
    <div style={{ height: '100vh', width: '100vw', background: 'linear-gradient(to bottom, #1a2a6c, #b21f1f, #fdbb2d)' }}> {/* Fullscreen with gradient */}
      <Canvas
        camera={{ position: [12, 12, 18], fov: 55, near: 0.1, far: 1000 }} // Adjusted camera
        shadows // Enable shadows
      >
        <Suspense fallback={null}> {/* Suspense for async components like Environment */}
          {/* Enhanced Lighting */}
          <ambientLight intensity={0.6} /> {/* Softer ambient light */}
          <directionalLight
            position={[10, 15, 5]}
            intensity={1.5}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          <pointLight position={[-10, -5, -10]} intensity={0.8} color="#ffccaa" />
          <Environment preset="sunset" blur={0.5} /> {/* Realistic environment lighting and reflections */}
          {/* <Sky sunPosition={[100, 20, 100]} /> */} {/* Optional: dynamic sky */}

          <Sparkles // Add some subtle visual flair
            count={100}
            scale={8}
            size={6}
            speed={0.3}
            color="#fff5b0"
          />

          <OrbitControls
            ref={controlsRef}
            enableDamping // Smooth camera movement
            dampingFactor={0.05}
            autoRotate={!focusedFramework} // Auto-rotate when no framework is focused
            autoRotateSpeed={0.3}
            maxPolarAngle={Math.PI / 1.6} // Prevent looking too far up or down
            minDistance={5} // Min zoom
            maxDistance={50} // Max zoom
            target={focusedFramework ? new THREE.Vector3(focusedFramework.x, focusedFramework.y, focusedFramework.z) : new THREE.Vector3(5, 4, 5)} // Initial target centered around data
          />

          {/* Render Dots */}
          {frameworks.map((fw) => (
            <Dot
              key={fw.id} // Use unique ID for key
              {...fw}
              onFocus={handleFocusFramework}
            />
          ))}

          {/* Ground Plane (optional for better shadow reception) */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[5, -1, 5]} receiveShadow>
            <planeGeometry args={[30, 30]} />
            <meshStandardMaterial color="#333" roughness={0.8} metalness={0.2} />
          </mesh>

          {/* Axes Helper (still useful for development/orientation) */}
          {/* <axesHelper args={[10]} /> */}

          {/* Post-processing Effects */}
          <EffectComposer>
            <Bloom
              luminanceThreshold={0.4} // Only bright objects bloom
              luminanceSmoothing={0.9}
              intensity={0.6} // Bloom intensity
              mipmapBlur
            />
            {/* Add other effects like DepthOfField, Vignette, etc. if desired */}
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}