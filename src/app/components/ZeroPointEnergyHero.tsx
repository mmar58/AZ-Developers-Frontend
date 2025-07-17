"use client";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import "./ZeroPointEnergyHero.css";

const ZeroPointEnergyHero: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [sphereMode, setSphereMode] = useState<'floating' | 'logo'>('floating');
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set client-side flag to prevent hydration mismatch
    setIsClient(true);
    
    // Check if we're on mobile for performance fallback
    const checkMobile = () => window.innerWidth < 768;
    setIsMobile(checkMobile());

    const handleResize = () => {
      setIsMobile(checkMobile());
    };

    window.addEventListener('resize', handleResize);
    
    let renderer: THREE.WebGLRenderer | undefined;
    let frameId: number;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let sphere: THREE.Mesh;
    let infinityGroup: THREE.Group;

    // GSAP Animation Timeline
    const animateText = () => {
      if (!isClient) return; // Only run on client side
      
      const letters = textRef.current?.querySelectorAll('.letter');
      if (!letters || letters.length === 0) {
        console.warn('No letters found for animation');
        return;
      }

      // Create GSAP timeline
      const tl = gsap.timeline({
        onComplete: () => {
          setTimeout(() => {
            animateToInfinity();
          }, 500);
        }
      });

      // Add individual string physics to each letter
      letters.forEach((letter, i) => {
        const stringFreq = 0.02 + (i * 0.005); // Different frequency for each letter
        const stringAmplitude = 0.3 + (i % 10) * 0.07; // Deterministic amplitude
        
        gsap.set(letter, {
          transformOrigin: "center bottom",
          transformStyle: "preserve-3d"
        });
      });

      // 1. Text appears
      tl.from(letters, {
        duration: 0.8,
        y: 100,
        opacity: 0,
        stagger: 0.1,
        ease: "back.out(1.7)"
      })
      // 2. Letters transform into vibrating quantum strings
      .to(letters, {
        duration: 0.5,
        scaleY: 3,
        scaleX: 0.3,
        skewY: "10deg",
        transformOrigin: "bottom center",
        ease: "elastic.out(1, 0.3)",
        stagger: 0.1
      })
      // 3. Quantum string vibration - rapid oscillations
      .to(letters, {
        duration: 0.05,
        scaleY: 2.8,
        skewY: "-8deg",
        repeat: 40,
        yoyo: true,
        ease: "none",
        stagger: {
          amount: 0.3,
          from: "random"
        }
      })
      // 4. String harmonics - different frequencies
      .to(letters, {
        duration: 0.03,
        scaleY: "+=0.5",
        skewX: (i) => `${-15 + (i % 10) * 3}deg`,
        skewY: (i) => `${-12 + (i % 8) * 3}deg`,
        repeat: 60,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          amount: 0.4,
          from: "start"
        }
      }, "-=1")
      // 5. Energy resonance - pulsing glow
      .to(letters, {
        duration: 0.1,
        textShadow: "0 0 30px #00ffff, 0 0 60px #00ffff, 0 0 90px #ff00ff",
        filter: "brightness(1.5) saturate(1.8)",
        repeat: 20,
        yoyo: true,
        stagger: 0.02
      }, "-=1.5")
      // 6. String tension changes - varying stretch
      .to(letters, {
        duration: 0.08,
        scaleY: (i) => 2 + (i % 4) * 0.5,
        scaleX: (i) => 0.2 + (i % 5) * 0.04,
        rotation: (i) => `${-5 + (i % 10)}deg`,
        repeat: 25,
        yoyo: true,
        ease: "power2.inOut",
        stagger: {
          amount: 0.6,
          from: "start"
        }
      }, "-=1")
      // 7. Final quantum field fluctuation
      .to(letters, {
        duration: 0.02,
        x: (i) => `${-10 + (i % 20)}px`,
        y: (i) => `${-5 + (i % 10)}px`,
        scaleY: (i) => 2.5 + (i % 4) * 0.25,
        skewX: (i) => `${-20 + (i % 20) * 2}deg`,
        repeat: 80,
        yoyo: true,
        ease: "none",
        stagger: 0.01
      });
    };

    const animateToInfinity = () => {
      if (!isClient) return;
      
      const letters = textRef.current?.querySelectorAll('.letter');
      if (!letters) return;

      const tl = gsap.timeline({
        onComplete: () => {
          setTimeout(() => {
            animateToSphere();
          }, 1000);
        }
      });

      // 4. Letters converge to center and form infinity symbol
      tl.to(letters, {
        duration: 1.5,
        x: "0px",
        y: "0px",
        scaleX: 1,
        scaleY: 1,
        skewX: "0deg",
        skewY: "0deg",
        rotation: 0,
        scale: 0,
        opacity: 0,
        ease: "power2.inOut",
        stagger: 0.05,
        transformOrigin: "center center"
      })
      .to('.infinity-container', {
        duration: 1.5,
        scale: 1,
        opacity: 1,
        ease: "elastic.out(1, 0.3)"
      }, "-=1")
      // Animate the infinity symbol itself
      .to('.infinity-path', {
        duration: 2,
        strokeDashoffset: 0,
        ease: "power2.inOut"
      }, "-=1")
      .to('.infinity-glow', {
        duration: 1,
        scale: 1.2,
        opacity: 0.8,
        ease: "sine.inOut",
        repeat: 3,
        yoyo: true
      }, "-=1.5");
    };

    const animateToSphere = () => {
      if (!isClient) return;
      
      const tl = gsap.timeline({
        onComplete: () => {
          setAnimationComplete(true);
          // Keep the sphere floating permanently
          if (sphere && !isMobile) {
            startFloatingAnimation();
          }
        }
      });

      // 5. Infinity symbol morphs into 3D sphere
      tl.to('.infinity-container', {
        duration: 1.5,
        scale: 0,
        opacity: 0,
        rotation: 360,
        ease: "power2.inOut"
      });

      // Show sphere only on desktop
      if (!isMobile) {
        tl.to('.sphere-container', {
          duration: 2,
          scale: 1,
          opacity: 1,
          ease: "elastic.out(1, 0.3)"
        }, "-=0.8")
        .to('.sphere-container', {
          duration: 1,
          y: -20,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        });
      }
    };

    // Floating animation for the sphere
    const startFloatingAnimation = () => {
      if (!sphere) return;
      
      gsap.to('.sphere-container', {
        duration: 3,
        y: -30,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });
      
      gsap.to('.sphere-container', {
        duration: 4,
        x: 20,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });
    };

    // Three.js Setup (desktop only)
    if (mountRef.current && !isMobile) {
      // Scene setup
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        75,
        mountRef.current.clientWidth / mountRef.current.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 5;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setClearColor(0x000000, 0);
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      mountRef.current.appendChild(renderer.domElement);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);
      
      const pointLight = new THREE.PointLight(0x00ffff, 2, 100);
      pointLight.position.set(10, 10, 10);
      scene.add(pointLight);

      const pointLight2 = new THREE.PointLight(0xff00ff, 1.5, 100);
      pointLight2.position.set(-10, -10, 10);
      scene.add(pointLight2);

      // Create energy sphere with dynamic materials
      const sphereGeometry = new THREE.SphereGeometry(1.5, 64, 64);
      
      // Custom shader material for energy effect
      const sphereMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color1: { value: new THREE.Color(0x00ffff) },
          color2: { value: new THREE.Color(0xff00ff) },
          color3: { value: new THREE.Color(0xffff00) },
          opacity: { value: 0.9 },
          energy: { value: 1.0 }
        },
        vertexShader: `
          uniform float time;
          uniform float energy;
          varying vec3 vPosition;
          varying vec3 vNormal;
          varying vec3 vWorldPosition;
          
          void main() {
            vPosition = position;
            vNormal = normalize(normalMatrix * normal);
            
            vec3 pos = position;
            // Add more dynamic noise for energy effect
            float noise1 = sin(pos.x * 8.0 + time * 2.0) * sin(pos.y * 8.0 + time * 1.5) * sin(pos.z * 8.0 + time * 1.8);
            float noise2 = sin(pos.x * 15.0 + time * 3.0) * sin(pos.y * 15.0 + time * 2.5) * sin(pos.z * 15.0 + time * 2.8);
            
            pos += normal * (noise1 * 0.15 + noise2 * 0.08) * energy;
            
            vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
            vWorldPosition = worldPosition.xyz;
            
            gl_Position = projectionMatrix * viewMatrix * worldPosition;
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform vec3 color1;
          uniform vec3 color2;
          uniform vec3 color3;
          uniform float opacity;
          uniform float energy;
          varying vec3 vPosition;
          varying vec3 vNormal;
          varying vec3 vWorldPosition;
          
          void main() {
            // Enhanced fresnel effect
            vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
            float fresnel = 1.0 - dot(vNormal, viewDirection);
            fresnel = pow(fresnel, 2.0);
            
            // Dynamic color mixing
            float colorMix1 = sin(time * 2.0 + vPosition.x + vPosition.y) * 0.5 + 0.5;
            float colorMix2 = sin(time * 1.5 + vPosition.y + vPosition.z) * 0.5 + 0.5;
            
            vec3 color = mix(color1, color2, colorMix1);
            color = mix(color, color3, colorMix2);
            
            // Add energy pulses
            float pulse = sin(time * 4.0) * 0.3 + 0.7;
            color *= pulse * energy;
            
            // Enhanced glow
            color += fresnel * 0.8;
            
            // Add internal energy patterns
            float pattern = sin(vPosition.x * 10.0 + time) * sin(vPosition.y * 10.0 + time) * sin(vPosition.z * 10.0 + time);
            color += vec3(pattern * 0.2);
            
            gl_FragColor = vec4(color, opacity * (0.8 + fresnel * 0.2));
          }
        `,
        transparent: true,
        side: THREE.DoubleSide
      });

      sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      scene.add(sphere);

      // Particle system around sphere
      const particleGeometry = new THREE.BufferGeometry();
      const particleCount = 100;
      const positions = new Float32Array(particleCount * 3);
      
      // Use deterministic positioning based on index
      for (let i = 0; i < particleCount * 3; i += 3) {
        const index = i / 3;
        const phi = Math.acos(-1 + (2 * index) / particleCount);
        const theta = Math.sqrt(particleCount * Math.PI) * phi;
        const radius = 5;
        
        positions[i] = radius * Math.cos(theta) * Math.sin(phi);
        positions[i + 1] = radius * Math.sin(theta) * Math.sin(phi);
        positions[i + 2] = radius * Math.cos(phi);
      }
      
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      
      const particleMaterial = new THREE.PointsMaterial({
        color: 0x00ffff,
        size: 0.05,
        transparent: true,
        opacity: 0.6
      });
      
      const particles = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particles);

      // Animation loop
      let time = 0;
      const animate = () => {
        if (!renderer) return;
        
        time += 0.01;
        
        // Animate sphere with more dynamic effects
        if (sphere) {
          sphere.rotation.x += 0.008;
          sphere.rotation.y += 0.012;
          sphere.rotation.z += 0.005;
          
          const material = sphere.material as THREE.ShaderMaterial;
          material.uniforms.time.value = time;
          material.uniforms.energy.value = 1.0 + Math.sin(time * 2) * 0.3;
          
          // Pulsating scale effect
          const scale = 1 + Math.sin(time * 1.5) * 0.1;
          sphere.scale.setScalar(scale);
        }
        
        // Animate particles with more complex motion
        if (particles) {
          particles.rotation.x += 0.002;
          particles.rotation.y += 0.003;
          particles.rotation.z += 0.001;
          
          // Update particle positions for swirling effect
          const positions = particles.geometry.attributes.position.array as Float32Array;
          for (let i = 0; i < positions.length; i += 3) {
            const radius = Math.sqrt(positions[i] * positions[i] + positions[i + 1] * positions[i + 1] + positions[i + 2] * positions[i + 2]);
            const angle = time * 0.5 + radius * 0.1;
            positions[i] += Math.cos(angle) * 0.01;
            positions[i + 1] += Math.sin(angle) * 0.01;
          }
          particles.geometry.attributes.position.needsUpdate = true;
        }
        
        renderer.render(scene, camera);
        frameId = requestAnimationFrame(animate);
      };

      animate();

      // Handle resize
      const handleResize = () => {
        if (!mountRef.current || !renderer) return;
        camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
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

    // Start animation sequence only on client side
    if (isClient) {
      // Use a longer delay to ensure DOM is fully ready
      const startAnimation = () => {
        const letters = textRef.current?.querySelectorAll('.letter');
        if (letters && letters.length > 0) {
          animateText();
        } else {
          // Retry if letters not found
          setTimeout(startAnimation, 100);
        }
      };
      
      setTimeout(startAnimation, 500);
    }

  }, [isClient]);

  // Collapse sphere to logo
  const collapseToLogo = () => {
    gsap.to('.sphere-container', {
      duration: 1.5,
      scale: 0.3,
      x: 0,
      y: 0,
      ease: "power2.inOut"
    });
    
    gsap.to('.logo-container', {
      duration: 1,
      opacity: 1,
      scale: 1,
      ease: "elastic.out(1, 0.3)",
      delay: 0.8
    });
  };

  // Expand logo back to sphere
  const expandFromLogo = () => {
    gsap.to('.logo-container', {
      duration: 0.8,
      opacity: 0,
      scale: 0,
      ease: "power2.inOut"
    });
    
    gsap.to('.sphere-container', {
      duration: 1.5,
      scale: 1,
      ease: "elastic.out(1, 0.3)",
      delay: 0.5,
      onComplete: () => {
        gsap.to('.sphere-container', {
          duration: 3,
          y: -30,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        });
        
        gsap.to('.sphere-container', {
          duration: 4,
          x: 20,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        });
      }
    });
  };

  const text = "ZERO POINT ENERGY LAB";
  const letters = text.split('').map((char, index) => (
    <span
      key={index}
      className={`letter inline-block ${char === ' ' ? 'w-4' : ''}`}
      style={{
        fontFamily: "'Orbitron', 'Space Mono', monospace",
        fontWeight: 700,
        fontSize: 'clamp(2rem, 8vw, 4rem)',
        background: 'linear-gradient(45deg, #00ffff, #ff00ff, #ffff00)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        textShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
        filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.3))',
        WebkitFilter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.3))',
        letterSpacing: '0.1em',
      }}
      data-letter={char}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Animated background grid */}
      {isClient && (
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-12 grid-rows-12 w-full h-full">
            {Array.from({ length: 144 }).map((_, i) => (
              <div
                key={i}
                className="border border-cyan-500/20 animate-pulse"
                style={{
                  animationDelay: `${(i * 0.1) % 2}s`,
                  animationDuration: `${2 + (i % 3)}s`
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Text Animation Container */}
      <div
        ref={textRef}
        className="absolute inset-0 flex items-center justify-center z-10"
      >
        <div className="text-center">
          <div className="flex flex-wrap justify-center items-center gap-1">
            {letters}
          </div>
        </div>
      </div>

      {/* Infinity Symbol Container */}
      <div className="infinity-container absolute inset-0 flex items-center justify-center z-20 opacity-0 scale-0">
        <div className="relative infinity-glow">
          <svg
            width="300"
            height="150"
            viewBox="0 0 300 150"
            className="animate-pulse"
          >
            <path
              className="infinity-path drop-shadow-lg"
              d="M75,75 Q37.5,37.5 75,75 Q112.5,112.5 150,75 Q187.5,37.5 225,75 Q262.5,112.5 225,75 Q187.5,37.5 150,75 Q112.5,112.5 75,75"
              fill="none"
              stroke="url(#infinityGradient)"
              strokeWidth="6"
              strokeDasharray="1000"
              strokeDashoffset="1000"
            />
            <defs>
              <linearGradient id="infinityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00ffff">
                  <animate attributeName="stop-color" values="#00ffff;#ff00ff;#ffff00;#00ffff" dur="3s" repeatCount="indefinite" />
                </stop>
                <stop offset="50%" stopColor="#ff00ff">
                  <animate attributeName="stop-color" values="#ff00ff;#ffff00;#00ffff;#ff00ff" dur="3s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#ffff00">
                  <animate attributeName="stop-color" values="#ffff00;#00ffff;#ff00ff;#ffff00" dur="3s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
              <filter id="infinityGlow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
          </svg>
          <div className="absolute inset-0 animate-spin-slow">
            <div className="w-full h-full rounded-full bg-gradient-to-r from-cyan-500/30 to-purple-500/30 blur-2xl"></div>
          </div>
          {/* Energy particles around infinity */}
          {isClient && (
            <div className="absolute inset-0">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
                  style={{
                    left: `${20 + Math.cos((i / 8) * Math.PI * 2) * 40}%`,
                    top: `${50 + Math.sin((i / 8) * Math.PI * 2) * 25}%`,
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: `${2 + (i % 2)}s`
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 3D Sphere Container */}
      <div className="sphere-container absolute inset-0 opacity-0 scale-0 z-30">
        <div
          ref={mountRef}
          className="w-full h-full"
        />
      </div>

      {/* Logo Container */}
      <div className="logo-container absolute inset-0 flex items-center justify-center z-35 opacity-0 scale-0">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-cyan-400 via-purple-500 to-yellow-400 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-black">ZPE</span>
          </div>
          <h3 className="text-xl font-semibold text-white">Zero Point Energy Lab</h3>
        </div>
      </div>

      {/* Mode Toggle Button (only shows after animation completes) */}
      {animationComplete && !isMobile && (
        <button
          onClick={() => {
            if (sphereMode === 'floating') {
              collapseToLogo();
              setSphereMode('logo');
            } else {
              expandFromLogo();
              setSphereMode('floating');
            }
          }}
          className="absolute top-4 right-4 z-50 bg-gradient-to-r from-cyan-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-cyan-700 hover:to-purple-700 transition-all duration-300 text-sm font-semibold"
        >
          {sphereMode === 'floating' ? 'Show Logo' : 'Show Sphere'}
        </button>
      )}

      {/* Mobile Fallback */}
      <div className="md:hidden absolute inset-0 flex items-center justify-center z-40">
        <div className="text-center">
          <h1
            className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
            style={{ fontFamily: "'Orbitron', monospace" }}
          >
            ZERO POINT
          </h1>
          <h2
            className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-cyan-500 bg-clip-text text-transparent mt-2"
            style={{ fontFamily: "'Orbitron', monospace" }}
          >
            ENERGY LAB
          </h2>
          <div className="mt-4 animate-pulse">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 opacity-50"></div>
          </div>
        </div>
      </div>

      {/* Completion indicator for testing */}
      {animationComplete && (
        <div className="absolute bottom-4 right-4 text-cyan-400 text-sm opacity-50">
          Animation Complete
        </div>
      )}
    </div>
  );
};

export default ZeroPointEnergyHero;
