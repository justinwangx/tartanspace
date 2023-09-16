import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ShaderMaterial } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Graph = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Initialize renderer and canvas
    const renderer = new THREE.WebGLRenderer();
    const canvas = renderer.domElement;
    canvasRef.current.appendChild(canvas);

    // Initialize camera, scene, and controls
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 100;
    const scene = new THREE.Scene();
    new OrbitControls(camera, renderer.domElement);

    // Initialize raycaster and mouse vector
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Setting up canvas dimensions
    const setCanvasSize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };

    // Initial setting
    setCanvasSize();

    // Generate stars
    const spheres = [];
    for (let i = 0; i < 100; i++) {
      const geometry = new THREE.SphereGeometry(0.5, 64, 64);
      const material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(Math.random() * 250 - 125, Math.random() * 250 - 125, Math.random() * 250 - 125);
      scene.add(sphere);
      spheres.push(sphere);
    }

    // Animate function
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    // Mouse move event handler
    const onMouseMove = (e) => {
      // Update mouse vector
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      // Update raycaster
      raycaster.setFromCamera(mouse, camera);

      // Check for intersected objects
      const intersects = raycaster.intersectObjects(spheres);

      // Reset all spheres to original color
      spheres.forEach(sphere => {
        sphere.material.color.set(0xFFFFFF);
      });

      // Change color of intersected object
      if (intersects.length > 0) {
        intersects[0].object.material.color.set(0xFFCC00);
      }
    };

    // Add event listeners
    window.addEventListener('resize', setCanvasSize);
    window.addEventListener('mousemove', onMouseMove);

    // Kick off animation
    animate();

    // Cleanup function
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', onMouseMove);
      canvasRef.current.removeChild(canvas);
    };

  }, []);

  return <div ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }}></div>;
};

export default Graph;
