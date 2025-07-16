"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const Hero3DBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let renderer: THREE.WebGLRenderer | undefined;
    let frameId: number;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let sphere: THREE.Mesh;

    if (mountRef.current) {
      // Scene setup
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        60,
        mountRef.current.clientWidth / mountRef.current.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 8;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setClearColor(0x000000, 0); // transparent
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      mountRef.current.appendChild(renderer.domElement);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
      scene.add(ambientLight);
      const dirLight = new THREE.DirectionalLight(0x818cf8, 1);
      dirLight.position.set(5, 5, 5);
      scene.add(dirLight);


      // 3D Objects: Tech-inspired animated shapes
      const objects: THREE.Mesh[] = [];

      // Central glowing sphere
      const sphereGeometry = new THREE.SphereGeometry(1.7, 48, 48);
      const sphereMaterial = new THREE.MeshStandardMaterial({
        color: 0x818cf8,
        emissive: 0x818cf8,
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.7,
        wireframe: false,
        metalness: 0.6,
        roughness: 0.2,
      });
      const mainSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      scene.add(mainSphere);
      objects.push(mainSphere);

      // Floating cubes
      for (let i = 0; i < 4; i++) {
        const cubeGeometry = new THREE.BoxGeometry(0.7, 0.7, 0.7);
        const cubeMaterial = new THREE.MeshStandardMaterial({
          color: 0x38bdf8,
          emissive: 0x38bdf8,
          emissiveIntensity: 0.3,
          transparent: true,
          opacity: 0.5,
          metalness: 0.7,
          roughness: 0.3,
        });
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.position.set(Math.cos((i / 4) * Math.PI * 2) * 3.2, Math.sin((i / 4) * Math.PI * 2) * 2.2, -0.7 + i * 0.5);
        scene.add(cube);
        objects.push(cube);
      }

      // Floating torus (ring)
      const torusGeometry = new THREE.TorusGeometry(2.7, 0.13, 16, 100);
      const torusMaterial = new THREE.MeshStandardMaterial({
        color: 0x818cf8,
        emissive: 0x818cf8,
        emissiveIntensity: 0.2,
        transparent: true,
        opacity: 0.3,
        metalness: 0.5,
        roughness: 0.4,
        wireframe: true,
      });
      const torus = new THREE.Mesh(torusGeometry, torusMaterial);
      torus.rotation.x = Math.PI / 2;
      scene.add(torus);
      objects.push(torus);

      // --- Animated, color-shifting floors ---
      // Solid color floor
      const floorGeometry = new THREE.PlaneGeometry(12, 12);
      const floorMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xffffff,
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
      });
      const floor = new THREE.Mesh(floorGeometry, floorMaterial);
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -2.5;
      scene.add(floor);
      objects.push(floor);

      // Grid floor
      const gridHelper = new THREE.GridHelper(12, 24, 0x38bdf8, 0x818cf8);
      gridHelper.position.y = -2.49;
      gridHelper.material.transparent = true;
      gridHelper.material.opacity = 0;
      scene.add(gridHelper);

      // Checkerboard floor (using a texture)
      const checkerCanvas = document.createElement('canvas');
      checkerCanvas.width = checkerCanvas.height = 128;
      const ctx = checkerCanvas.getContext('2d');
      if (ctx) {
        for (let y = 0; y < 8; y++) {
          for (let x = 0; x < 8; x++) {
            ctx.fillStyle = (x + y) % 2 === 0 ? '#818cf8' : '#38bdf8';
            ctx.fillRect(x * 16, y * 16, 16, 16);
          }
        }
      }
      const checkerTexture = new THREE.CanvasTexture(checkerCanvas);
      checkerTexture.wrapS = checkerTexture.wrapT = THREE.RepeatWrapping;
      checkerTexture.repeat.set(1, 1);
      const checkerMaterial = new THREE.MeshStandardMaterial({
        map: checkerTexture,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        metalness: 0.7,
        roughness: 0.3,
        emissive: 0x38bdf8,
        emissiveIntensity: 0.2,
      });
      const checkerFloor = new THREE.Mesh(floorGeometry, checkerMaterial);
      checkerFloor.rotation.x = -Math.PI / 2;
      checkerFloor.position.y = -2.48;
      scene.add(checkerFloor);

      // Rain (group of animated lines)
      const rainGroup = new THREE.Group();
      const rainDrops: THREE.Mesh[] = [];
      for (let i = 0; i < 150; i++) {
        const dropGeometry = new THREE.CylinderGeometry(0.015, 0.015, 0.8, 6);
        const dropMaterial = new THREE.MeshStandardMaterial({
          color: 0x38bdf8,
          emissive: 0x38bdf8,
          emissiveIntensity: 0.3,
          transparent: true,
          opacity: 0,
        });
        const drop = new THREE.Mesh(dropGeometry, dropMaterial);
        drop.position.set(
          Math.random() * 20 - 10,  // wider spread
          Math.random() * 8,        // higher spawn
          Math.random() * -8 + 2    // deeper spread
        );
        rainGroup.add(drop);
        rainDrops.push(drop);
      }
      scene.add(rainGroup);
      rainGroup.visible = false;

      // Light Rays effect
      const lightRaysGroup = new THREE.Group();
      for (let i = 0; i < 8; i++) {
        const rayGeometry = new THREE.PlaneGeometry(0.1, 15);
        const rayMaterial = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0,
          blending: THREE.AdditiveBlending,
        });
        const ray = new THREE.Mesh(rayGeometry, rayMaterial);
        ray.position.z = -5;
        ray.rotation.z = (i / 8) * Math.PI * 2;
        lightRaysGroup.add(ray);
      }
      lightRaysGroup.position.set(-2, 2, -3);
      lightRaysGroup.rotation.x = Math.PI / 6;
      scene.add(lightRaysGroup);

      // Add a glow sphere at the source of light rays
      const glowGeometry = new THREE.SphereGeometry(0.5, 32, 32);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffcc,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
      });
      const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
      glowSphere.position.copy(lightRaysGroup.position);
      scene.add(glowSphere);

      // Animation loop
      let t = 0;
      const animate = () => {
        t += 0.01;
        // Animate main sphere
        mainSphere.rotation.y += 0.004;
        mainSphere.position.y = Math.sin(t) * 0.2;
        // Animate cubes
        objects.slice(1, 5).forEach((cube, i) => {
          cube.rotation.x += 0.01 + i * 0.003;
          cube.rotation.y += 0.012 + i * 0.002;
          cube.position.y = Math.sin(t + i) * 1.2;
        });
        // Animate torus
        torus.rotation.z += 0.003;
        // Color shift for tech vibe
        const hue = (t * 10) % 360;
        mainSphere.material.color.setHSL(hue / 360, 0.6, 0.6);
        torus.material.color.setHSL(((hue + 60) % 360) / 360, 0.5, 0.5);

        // Animate floors: cycle through types and colors
        const floorCycle = (t / 6) % 3; // 0-1: solid, 1-2: grid, 2-3: checker
        
        // Animate solid color floor
        const floorMat = floor.material as THREE.MeshStandardMaterial;
        if (floorCycle < 1) {
          floorMat.opacity = Math.sin(t * 0.5) * 0.15 + 0.25;
          const hueFloor = (t * 8) % 360;
          floorMat.emissive.setHSL(hueFloor / 360, 0.7, 0.5);
          floorMat.color.setHSL(((hueFloor + 120) % 360) / 360, 0.5, 0.7);
        } else {
          floorMat.opacity = 0;
        }

        // Animate grid floor
        if (floorCycle >= 1 && floorCycle < 2) {
          gridHelper.material.opacity = Math.abs(Math.sin(t * 0.7)) * 0.4 + 0.3;
          (gridHelper.material as any).color.setHSL(((t * 12) % 360) / 360, 0.7, 0.7);
        } else {
          gridHelper.material.opacity = 0;
        }

        // Animate checkerboard floor
        if (floorCycle >= 2) {
          checkerMaterial.opacity = Math.abs(Math.sin(t * 0.8)) * 0.4 + 0.3;
          checkerTexture.offset.x = (Math.sin(t * 0.2) + 1) * 0.1;
          checkerTexture.offset.y = (Math.cos(t * 0.2) + 1) * 0.1;
        } else {
          checkerMaterial.opacity = 0;
        }

        // Animate rain
        if (floorCycle >= 1 && floorCycle < 2) {
          rainGroup.visible = true;
          rainDrops.forEach((drop, i) => {
            const mat = drop.material as THREE.MeshStandardMaterial;
            mat.opacity = 0.5 + 0.5 * Math.abs(Math.sin(t + i));
            drop.position.y -= 0.12 + Math.random() * 0.04;
            if (drop.position.y < -1.5) {
              drop.position.y = 5.5 + Math.random() * 1.5;
            }
          });
        } else {
          rainGroup.visible = false;
        }

        // Animate light rays
        if (floorCycle < 1 || floorCycle >= 2) { // Show during solid and checker floor phases
          lightRaysGroup.children.forEach((ray, i) => {
            const rayMesh = ray as THREE.Mesh;
            const rayMat = rayMesh.material as THREE.MeshBasicMaterial;
            rayMat.opacity = 0.15 + 0.1 * Math.sin(t * 2 + i);
            rayMesh.rotation.z += 0.001 + Math.sin(t + i) * 0.001;
          });
          glowMaterial.opacity = 0.7 + 0.3 * Math.sin(t * 3);
          lightRaysGroup.rotation.y = Math.sin(t * 0.2) * 0.2;
        } else {
          lightRaysGroup.children.forEach(ray => {
            const rayMesh = ray as THREE.Mesh;
            (rayMesh.material as THREE.MeshBasicMaterial).opacity = 0;
          });
          glowMaterial.opacity = 0;
        }

        renderer!.render(scene, camera);
        frameId = requestAnimationFrame(animate);
      };
      animate();

      // Handle resize
      const handleResize = () => {
        if (!mountRef.current) return;
        camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer!.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      };
      window.addEventListener("resize", handleResize);

      // Cleanup
      return () => {
        window.removeEventListener("resize", handleResize);
        if (renderer) {
          renderer.dispose();
          if (renderer.domElement.parentNode) {
            renderer.domElement.parentNode.removeChild(renderer.domElement);
          }
        }
        cancelAnimationFrame(frameId);
      };
    }
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default Hero3DBackground;
