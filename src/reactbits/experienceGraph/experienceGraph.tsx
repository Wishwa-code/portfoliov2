// @ts-nocheck
//! GET COLOR FROM CONFIG PROVIDEER AND APPLY TO MAKE SURE THEME CHANGES ARE APPLIED
'use client';

import React, { useRef, useState, Suspense , useEffect} from 'react';
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
import { useConfig } from '@/app/contexts/ConfigContext';

// Enhanced frameworks data with unique IDs and thematic colors
const frameworks = [
  { id: 'nextjs', name: 'Next.js', x: -2, y: 3, z: 3, color: '#000000', description: 'E-commerce(prod), Portfolio' },
  { id: 'flask', name: 'Flask', x: -4, y: -4, z: 3, color: '#4FB3C5', description: 'Book Reviewing web platform, Slack Clone.' }, // Updated color for better visibility
  { id: 'laravel', name: 'Laravel', x: 5, y: 1, z: 2, color: '#F53003', description: 'Hotel Management Application(prod)' },
  { id: 'django', name: 'Django', x: 4.4, y: -4, z: 5, color: '#0C4B33', description: 'E-commerce backend(prod), Online Classroom backend' },
  { id: 'react', name: 'React.js', x: -5, y: 6, z: 5, color: '#58C4DC', description: 'AI research assistant frontend, Online Classroom frontend, Table reservation platform(prod)' },
  { id: 'flutter', name: 'Flutter', x: 4, y: 4, z: 5, color: '#7E41F2', description: 'Travel iternary planning mobile app(prod), Cargo Management Dekstop App(prod), POS-desktop app(prod), Medical Appoinment Management mobile app' },
  { id: 'gin', name: 'Gin', x: -2, y: -3, z: 3, color: '#F4D91E', description: 'E-commerce backend(prod)' },
  { id: 'reactNative', name: 'ReactNative', x: -5, y: 5, z:2, color: '#58C4DC', description: 'Handcrafts marketplace app' },
  { id: 'ExpressJs', name: 'ExpressJs', x: -3, y: -4, z:1, color: '#1B619A', description: 'Blog Platform backend' },
  { id: 'SpringBoot', name: 'Spring Boot', x: 5, y: -3.5, z:2, color: '#6CB52D', description: 'URL Shortener backend' },
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
          // emissive="black" // Will be changed on hover/active
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
  const { config, setConfig } = useConfig();


  const handleFocusFramework = (frameworkData) => {
    setFocusedFramework(frameworkData);
  };


  return (
    <div style={{ height: '70vh', width: '100%', background:  'rgba(26, 42, 108, 0)' ,cursor: 'grab'}}> {/* Fullscreen with gradient */}
      <Canvas
        // **3. ADJUST CAMERA POSITION AND FOV** for the new chart scale
        camera={{ position: [0, 2, 25], fov: 34, near: 0.001, far: 1000 }}
        shadows
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

          <AxesAndLabels length={5} /> {/* Add the axes and labels */}

          <OrbitControls
            ref={controlsRef}
            enableDamping // Smooth camera movement
            dampingFactor={0.05}
            autoRotate={!focusedFramework} // Auto-rotate when no framework is focused
            autoRotateSpeed={0.29}
            maxPolarAngle={Math.PI / 1.6} // Prevent looking too far up or down
            minDistance={5} // Min zoom
            maxDistance={50} // Max zoom
            target={
                focusedFramework
                  ? new THREE.Vector3(focusedFramework.x, focusedFramework.y, focusedFramework.z)
                  : new THREE.Vector3(0, 0.5, 0) // <- Raise the default center of orbit here
              }          />

          {/* Render Dots */}
          {frameworks.map((fw) => (
            <Dot
              key={fw.id} // Use unique ID for key
              {...fw}
              onFocus={handleFocusFramework}
            />
          ))}

          {/* Ground Plane (optional for better shadow reception) */}
          {/* <mesh rotation={[-Math.PI / 2, 0, 0]} position={[5, -1, 5]} receiveShadow>
            <planeGeometry args={[30, 30]} />
            <meshStandardMaterial color="#333" roughness={0.8} metalness={0.2} />
          </mesh> */}

          {/* Axes Helper (still useful for development/orientation) */}
          {/* <axesHelper args={[10]} /> */}

          {/* Post-processing Effects */}
          <EffectComposer>
            <Bloom
              luminanceThreshold={0.9} // Only bright objects bloom
              luminanceSmoothing={0.2}
              intensity={0.1} // Bloom intensity
              mipmapBlur
            />
            {/* Add other effects like DepthOfField, Vignette, etc. if desired */}
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}

function AxesAndLabels({ length = 5, experienceAxisLength = 5 }) { // length for X/Y, experienceAxisLength for Z
    const [backendPriorityColor, setBackendPriorityColor] = useState('white'); // Default color
      const { config, setConfig } = useConfig();


    const lineMaterial = new THREE.LineBasicMaterial({ color: config.style.theme === 'dark' ? "#ffffff" : "#000000", linewidth: 2 });

  // X and Y Axes (same as before)
  const xAxisPoints = [new THREE.Vector3(-length, 0, 0), new THREE.Vector3(length, 0, 0)];
  const yAxisPoints = [new THREE.Vector3(0, -length, 0), new THREE.Vector3(0, length, 0)];
  const xAxisGeometry = new THREE.BufferGeometry().setFromPoints(xAxisPoints);
  const yAxisGeometry = new THREE.BufferGeometry().setFromPoints(yAxisPoints);

  // Z Axis (Positive part only, for experience)
  const zAxisPoints = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, experienceAxisLength)];
  const zAxisGeometry = new THREE.BufferGeometry().setFromPoints(zAxisPoints);

  const labelOffset = 0.8;
  const horizontalLabelOffset = 1.5;
  const experienceLabelOffset = 0.8; // Offset for Z-axis label
  const fontSize = 0.4;


  useEffect(() => {
    if (typeof window !== 'undefined') { // Ensure this runs only in the browser
      // Get the computed style of the root element (or any relevant element where the var is defined)
      const computedStyle = getComputedStyle(document.documentElement);
      const colorValue = computedStyle.getPropertyValue('--neutral-on-background-strong').trim();

      if (colorValue) {
        setBackendPriorityColor(colorValue);
      }
    }
  }, []); 

  return (
    <>
      {/* Axis Lines */}
      <line geometry={xAxisGeometry} material={lineMaterial} />
      <line geometry={yAxisGeometry} material={lineMaterial} />
      <line geometry={zAxisGeometry} material={lineMaterial} /> {/* Add Z-axis line */}

      {/* X and Y Axis Labels (same as before) */}
      <Billboard position={[0, length + labelOffset, 0]}>
        <Text fontSize={fontSize} color={config.style.theme === 'dark' ? "#ffffff" : "#000000"} anchorX="center" anchorY="middle">
          Frontend Priority
        </Text>
      </Billboard>
      <Billboard position={[0, -(length + labelOffset), 0]}>
        <Text fontSize={fontSize} color={config.style.theme === 'dark' ? "#ffffff" : "#000000"} anchorX="center" anchorY="middle">
          Backend Priority
        </Text>
      </Billboard>
      <Billboard position={[-(length + horizontalLabelOffset), 0, 0]}>
        <Text fontSize={fontSize} color={config.style.theme === 'dark' ? "#ffffff" : "#000000"} anchorX="center" anchorY="middle" textAlign="center">
          Minimal{'\n'}Primitives
        </Text>
      </Billboard>
      <Billboard position={[length + horizontalLabelOffset, 0, 0]}>
        <Text fontSize={fontSize} color={config.style.theme === 'dark' ? "#ffffff" : "#000000"} anchorX="center" anchorY="middle" textAlign="center">
          Batteries{'\n'}Included
        </Text>
      </Billboard>

      {/* Z Axis Labels (Experience) */}
      {/* "No Experience" at Origin (0,0,0) */}


      {/* "Max Experience" at the end of the positive Z-axis */}
      <Billboard position={[0, 0, experienceAxisLength + experienceLabelOffset]}>
        <Text fontSize={fontSize} color={config.style.theme === 'dark' ? "#ffffff" : "#000000"} anchorX="center" anchorY="middle">
          Experience
        </Text>
      </Billboard>
    </>
  );
}