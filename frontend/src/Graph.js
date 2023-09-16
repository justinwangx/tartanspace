import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ShaderMaterial } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from "/node_modules/three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "/node_modules/three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "/node_modules/three/examples/jsm/postprocessing/UnrealBloomPass.js";

const Graph = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // load points
    fetch('http://ec2-44-196-61-225.compute-1.amazonaws.com:8080/get-points')
    .then(response => response.json())
    .then(data => {
    // Process the response data
    console.log(data);
    })
    .catch(error => {
    // Handle any errors
    console.error('Error:', error);
  });

    //global declaration
    let scene = new THREE.Scene();
    let camera;
    let renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    let canvas;
    scene = new THREE.Scene();

    // Initialize camera, scene, and controls
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 100;
    new OrbitControls(camera, renderer.domElement);

    // Initialize bloom renderer and canvas
    canvas = renderer.domElement;
    canvasRef.current.appendChild(canvas);
    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      4.0,
      2.0,
      2.0
    )
    bloomPass.threshold = 0;
    bloomPass.strength = 2.0; //intensity of glow
    bloomPass.radius = 0.5;
    const bloomComposer = new EffectComposer(renderer);
    bloomComposer.setSize(window.innerWidth, window.innerHeight);
    bloomComposer.renderToScreen = true;
    bloomComposer.addPass(renderScene);
    bloomComposer.addPass(bloomPass);

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
    const sphereGeometries = [];
    const baseColor = new THREE.Color("#ff7800");
    const hoverColor = new THREE.Color("#ffffff");
    for (let i = 0; i < 100; i++) {
      sphereGeometries[i] = new THREE.IcosahedronGeometry(1, 15);
      const material = new THREE.MeshBasicMaterial({ color: baseColor });
      const sphere = new THREE.Mesh(sphereGeometries[i], material)
      const x = Math.random() * 250 - 125;
      const y = Math.random() * 250 - 125;
      const z = Math.random() * 250 - 125;
      sphere.position.set(x, y, z);
      spheres.push(sphere);
      scene.add(sphere);
    }

    // Animate function
    const animate = () => {
      bloomComposer.render();
      requestAnimationFrame(animate);
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
        sphere.material.color.set(baseColor);
      });

      // Change color of intersected object
      if (intersects.length > 0) {
        intersects[0].object.material.color.set(hoverColor);
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
