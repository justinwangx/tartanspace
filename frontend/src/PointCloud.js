import React, { useRef, useState } from 'react';
import { Canvas } from 'react-three-fiber';
import * as THREE from 'three';
import { animated, a } from '@react-spring/three';
import { useSpring } from '@react-spring/core';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const vertexShader = `
  varying vec3 vPosition;
  void main() {
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = 8.0; // Adjust the size of the points
  }
`;

const fragmentShader = `
  varying vec3 vPosition;
  void main() {
    vec3 color = vec3(1.0, 1.0, 1.0); // White core color
    vec3 glowColor = vec3(0.5, 0.2, 1.0);

    // Calculate the distance from the center of the point
    float distance = length(gl_PointCoord - vec2(0.5, 0.5));
    
    // Define the size of the white core and the glow
    float coreSize = 0.1; // Adjust the size of the white core
    float glowSize = 0.2; // Adjust the size of the glow
    
    // Create a smooth transition from the core to the glow
    float alpha = smoothstep(coreSize, coreSize + glowSize, distance);
    
    // Mix the core color and the glow color based on the distance
    gl_FragColor = vec4(mix(color, glowColor, alpha), 1.0);
  }
`;

function Point({ position, onHover }) {
  const [isHovered, setHovered] = useState(false);

  const { hoverIntensity } = useSpring({
    hoverIntensity: isHovered ? 1.0 : 0.0,
  });

  return (
    <animated.mesh
      position={position}
      onClick={() => console.log('Clicked!')}
      onPointerOver={() => {
        setHovered(true);
        onHover(true);
      }}
      onPointerOut={() => {
        setHovered(false);
        onHover(false);
      }}
    >
      <sphereGeometry args={[0.1, 32, 32]} />
      <shaderMaterial
        attach="material"
        args={[{ vertexShader, fragmentShader, uniforms: { hoverIntensity: hoverIntensity } }]}
      />
    </animated.mesh>
  );
}

function generatePointCoords(numPoints, radius) {
  const pointCoords = [];

  for (let i = 0; i < numPoints; i++) {
    // Generate random values for θ and φ
    const theta = Math.random() * Math.PI; // [0, π]
    const phi = Math.random() * 2 * Math.PI; // [0, 2π]

    // Convert spherical coordinates to Cartesian coordinates
    const x = radius * Math.sin(theta) * Math.cos(phi);
    const y = radius * Math.sin(theta) * Math.sin(phi);
    const z = radius * Math.cos(theta);

    pointCoords.push([ x, y, z ]);
  }

  return pointCoords;
}

function PointCloud() {

  const pointCoords = generatePointCoords(100, 10);
  const points = [];
  for (var i = 0; i < 100; i++) {
    points.push({position: pointCoords[i], color: 
    'white'})
  }

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, 0], fov: 90 }}
        onCreated={({ gl, camera, scene }) => {
          const controls = new OrbitControls(camera, gl.domElement);
          controls.minDistance = 1;
          controls.maxDistance = 10;
          const pointsGeometry = new THREE.BufferGeometry();
          const positions = [];

          points.forEach((point) => {
            positions.push(...point.position);
          });

          pointsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

          const pointsMaterial = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            blending: THREE.AdditiveBlending,
            depthTest: false, // Disable depth testing to make points always visible
            transparent: true, // Enable transparency for the glow effect
          });

          const pointsMesh = new THREE.Points(pointsGeometry, pointsMaterial);
          scene.add(pointsMesh);
        }}
        width="100%"
        height="100%"
        style={{ background: 'black' }} // Set the background color to black
      >
      </Canvas>
    </div>
  );
}

export default PointCloud;
