import React, { useRef, useState } from 'react';
import { Canvas } from 'react-three-fiber';
import * as THREE from 'three';
import { animated, a } from '@react-spring/three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useSpring } from 'react-spring';

const vertexShader = `
  varying vec3 vPosition;
  void main() {
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec3 vPosition;
  uniform float hoverIntensity; // Intensity of the hover effect

  void main() {
    vec3 coreColor = vec3(1.0, 1.0, 1.0); // White core color

    // Calculate the distance from the center of the point
    float distance = length(gl_PointCoord - vec2(0.5, 0.5));
    
    // Define the size of the white core and the glow
    float coreSize = 0.1; // Adjust the size of the white core
    float glowSize = 0.3; // Adjust the size of the glow

    // Create a smooth transition from the core to the glow
    float alpha = smoothstep(coreSize, coreSize + glowSize, distance);

    // Mix the core color and the glow color based on the distance and hover intensity
    vec3 finalColor = mix(coreColor, coreColor * (1.0 + hoverIntensity), alpha);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function Point({ position, onHover }) {
  const [isHovered, setHovered] = useState(false);

  const { hoverIntensity } = useSpring({
    hoverIntensity: isHovered ? 0.5 : 0.0, // Adjust the hover intensity as needed
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

function PointCloud() {
  const points = [];

  for (let i = 0; i < 100; i++) {
    const theta = Math.random() * Math.PI; // [0, π]
    const phi = Math.random() * 2 * Math.PI; // [0, 2π]

    const radius = 10;
    const x = radius * Math.sin(theta) * Math.cos(phi);
    const y = radius * Math.sin(theta) * Math.sin(phi);
    const z = radius * Math.cos(theta);

    points.push({ x, y, z });
  }

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, 0], fov: 90 }}
        onCreated={({ gl, camera, scene }) => {
          const controls = new OrbitControls(camera, gl.domElement);
          controls.minDistance = 1;
          controls.maxDistance = 10;
        }}
        width="100%"
        height="100%"
        style={{ background: 'black' }}
      >
        {points.map((point, index) => (
          <Point key={index} position={point} onHover={(isHovered) => console.log('Hovered:', isHovered)} />
        ))}
      </Canvas>
    </div>
  );
}

export default PointCloud;
