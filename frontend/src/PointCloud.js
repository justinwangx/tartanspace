import React, { useRef, useState } from 'react';
import { Canvas } from 'react-three-fiber';
import { animated, a } from '@react-spring/three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function Point({ position, color }) {
  const [hovered, setHovered] = useState(false);

  return (
    <animated.mesh // Use 'animated.mesh' here
      position={position}
      onClick={() => console.log('Clicked!')}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? [1.2, 1.2, 1.2] : [1, 1, 1]} // Use 'animated' for scaling
    >
      <sphereGeometry args={[0.1, 32, 32]} />
      <meshBasicMaterial color={color} />
    </animated.mesh>
  );
}

function PointCloud() {


  const points = [
    { position: [5, 0, 0], color: 'red' },
    { position: [1, 1, 1], color: 'blue' },
    { position: [3, 2, 0], color: 'green' },
    // Add more points with positions and colors as needed
  ];
  for (var i = 0; i < 100; i++) {
    points.push({position: [Math.random()*5, Math.random()*5, Math.random()*5], color: 
    'white'})
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 5] }}
      style={{ background: 'black', height: '100%', width: '100%'}}
      onCreated={({ gl, camera }) => {
        const controls = new OrbitControls(camera, gl.domElement);
        controls.minDistance = 1;
        controls.maxDistance = 10;
      }}
    >
      {points.map((point, index) => (
        <Point key={index} position={point.position} color={point.color} />
      ))}
    </Canvas>
  );
}

export default PointCloud;
