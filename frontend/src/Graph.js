import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from "/node_modules/three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "/node_modules/three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "/node_modules/three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import * as TWEEN from '@tweenjs/tween.js';

const Graph = () => {
  const canvasRef = useRef(null);

  function createLabel(text) {
    const div = document.createElement("div");
    
    div.style.backgroundColor = "argb(0, 0, 0, 0)";
    div.style.color = "white";
    div.style.position = "absolute";
    div.style.fontSize = "15px";

    const name = document.createElement("p")
    name.textContent = text;
    div.appendChild(name);

    let label = new CSS2DObject(div);
    label.frustumCulled = false;
    return label;
  }

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
    let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    let renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    scene = new THREE.Scene();

    let labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    document.body.appendChild(labelRenderer.domElement);

    // Initialize camera, scene, and controls
    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.z = 100;
    controls.update();

    // Initialize bloom renderer and canvas
    const canvas = renderer.domElement;
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

    const num_max = 1.7976931348623157e+308;

    // Generate stars
    const spheres = [];
    const labels = [];
    const sphereGeometry = new THREE.IcosahedronGeometry(1, 1);
    const baseColor = new THREE.Color("#ff7800"), hoverColor = new THREE.Color("#ffffff");
    for (let i = 0; i < 100; i++) {
      const material = new THREE.MeshBasicMaterial({ color: baseColor });
      const sphere = new THREE.Mesh(sphereGeometry, material);
      const x = Math.random() * 250 - 125;
      const y = Math.random() * 250 - 125;
      const z = Math.random() * 250 - 125;
      sphere.position.set(x, y, z);
      let label = createLabel('Sphere ' + String(i));
      sphere.add(label);
      label.position.set(0, 0, 0);
      label.visible = true;
      labels.push(label);
      spheres.push(sphere);
      scene.add(sphere);
    }

    // Animate function
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      bloomComposer.render();
      labelRenderer.render(scene, camera);

      // spheres.forEach(sphere => {
      //   const distance = camera.position.distanceTo(sphere.position);
      //   console.log(sphere);
      //   if (sphere)
      //     sphere.children[0].visible = (distance < 100);
      // })

      TWEEN.update();
    };

    let lastIntersected;
    const animationEasing = TWEEN.Easing.Quadratic.InOut;
    const hoverAnimationLength = 50;
    function startHoverAnimation(sphere) {
      console.log("Distance ", camera.position.distanceTo(sphere.position));
      lastIntersected = sphere;
      new TWEEN.Tween(sphere.material.color)
        .to(hoverColor, hoverAnimationLength)
        .easing(animationEasing) 
        .start();
      new TWEEN.Tween(sphere.scale)
        .to({ x: 2, y: 2, z: 2 }, hoverAnimationLength)
        .easing(animationEasing) 
        .start();
    }
    function startUnHoverAnimation(sphere) {
      lastIntersected = null;
      new TWEEN.Tween(sphere.material.color)
        .to(baseColor, hoverAnimationLength)
        .easing(animationEasing) 
        .start();
      new TWEEN.Tween(sphere.scale)
        .to({ x: 1, y: 1, z: 1 }, hoverAnimationLength)
        .easing(animationEasing) 
        .start();
    }
    // Mouse move event handler
    const onMouseMove = (e) => {
      // Update mouse vector
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      // Update raycaster
      raycaster.setFromCamera(mouse, camera);

      // Check for intersected objects
      const intersects = raycaster.intersectObjects(spheres);

      // We're intersecting something this frame
      if (intersects.length > 0) {
        if (intersects[0].object.children.length > 0) { 
          if (!lastIntersected) { // We weren't intersecting anything in the last frame
            startHoverAnimation(intersects[0].object);
          } else if (lastIntersected !== intersects[0].Object) { // We were intersecting something on the last frame, but it was a different object
            startUnHoverAnimation(lastIntersected);
            startHoverAnimation(intersects[0].object);
          }
        } 
      } else if (lastIntersected) { // We were intersecting something on the last frame, but we aren't intersecting anything this frame
        startUnHoverAnimation(lastIntersected);
      }
      TWEEN.update();

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
      if (canvasRef != null && canvasRef.current != null) {
        canvasRef.current.removeChild(canvas);
      }
      document.body.removeChild(labelRenderer.domElement);
    };

  }, []);

  return <div ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: 40}}></div>;
};

export default Graph;
