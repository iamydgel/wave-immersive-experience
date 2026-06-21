'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { supportsWebGL } from '@/utils/webgl-detect';

const vertexShader = `
  uniform float uTime;
  uniform float uAmplitude;
  uniform float uFrequency;
  uniform vec2 uOffset;

  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Double sinus pour effet eau réaliste avec offset souris
    pos.z += sin((pos.x + uOffset.x) * uFrequency + uTime * 0.8) * uAmplitude * 0.6;
    pos.z += sin((pos.y + uOffset.y) * uFrequency * 0.7 + uTime * 1.1) * uAmplitude * 0.4;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 uColorDeep;
  uniform vec3 uColorLight;
  uniform float uTime;

  varying vec2 vUv;

  void main() {
    // Gradient vertical basé sur la hauteur UV
    float mixFactor = vUv.y + sin(vUv.x * 3.0 + uTime * 0.5) * 0.1;
    vec3 color = mix(uColorDeep, uColorLight, mixFactor);

    // Spéculaire simple simulé
    float specular = pow(max(0.0, vUv.y - 0.6), 3.0) * 0.4;
    color += specular;

    gl_FragColor = vec4(color, 0.85);
  }
`;

export default function WebGLWave() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Détection WebGL
    if (!supportsWebGL()) {
      if (containerRef.current) {
        containerRef.current.classList.add('no-webgl');
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: any;
    let scene: any;
    let camera: any;
    let material: any;
    let mesh: any;
    let animationFrameId: number;

    const mouse = { x: 0, y: 0 };
    const targetMouse = { x: 0, y: 0 };
    let breathPhase = 0;

    // Import dynamique de Three.js
    const initThree = async () => {
      const THREE = await import('three');

      // Scène
      scene = new THREE.Scene();

      // Caméra
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
      camera.position.set(0, 3, 5);
      camera.lookAt(0, 0, 0);

      // Renderer
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
      });
      renderer.setSize(width, height, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Géométrie de la vague (128x64 segments pour la fluidité)
      const geometry = new THREE.PlaneGeometry(16, 12, 128, 64);

      // Matériau Shader personnalisé
      material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uAmplitude: { value: 0 }, // Animé de 0 à 0.6/0.8 au démarrage
          uFrequency: { value: 1.0 },
          uColorDeep: { value: new THREE.Color('#001A4D') },
          uColorLight: { value: new THREE.Color('#0057FF') },
          uOffset: { value: new THREE.Vector2(0, 0) },
        },
        transparent: true,
        side: THREE.DoubleSide,
      });

      mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.x = -Math.PI / 2.5;
      mesh.position.y = -1.0;
      scene.add(mesh);

      // Gestion du redimensionnement
      const handleResize = () => {
        if (!canvas || !camera || !renderer) return;
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
      };
      window.addEventListener('resize', handleResize);

      // Gestion des mouvements de la souris
      const handleMouseMove = (e: MouseEvent) => {
        targetMouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
        targetMouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener('mousemove', handleMouseMove);

      // Animation d'entrée pour l'amplitude
      gsap.to(material.uniforms.uAmplitude, {
        value: 0.6,
        duration: 1.8,
        ease: 'power2.out',
      });

      // Boucle de rendu
      let lastTime = 0;
      const tick = (time: number) => {
        const delta = (time - lastTime) / 1000;
        lastTime = time;

        if (material && renderer && scene && camera) {
          // Lerp souris
          mouse.x += (targetMouse.x - mouse.x) * 0.04;
          mouse.y += (targetMouse.y - mouse.y) * 0.04;

          // Respiration sinusoïdale subtile
          breathPhase += delta * 0.314;
          const breathAmp = 0.6 + Math.sin(breathPhase) * 0.06;

          material.uniforms.uTime.value += delta;
          material.uniforms.uAmplitude.value = breathAmp;
          material.uniforms.uOffset.value.set(mouse.x * 0.5, mouse.y * 0.3);

          // Légère rotation/mouvement de caméra
          camera.position.x = mouse.x * 0.5;
          camera.lookAt(0, 0, 0);

          renderer.render(scene, camera);
        }
        animationFrameId = requestAnimationFrame(tick);
      };
      animationFrameId = requestAnimationFrame(tick);
    };

    initThree();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (renderer) renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="hero-bg absolute inset-0 -z-10 w-full h-full overflow-hidden bg-deep-ocean transition-all duration-1000"
    >
      <canvas
        ref={canvasRef}
        className="wave-canvas block w-full h-full opacity-0 transition-opacity duration-1000"
        style={{ opacity: 1 }}
        role="img"
        aria-label="Animation décorative d'une vague bleue"
      />
      {/* Fallback si WebGL n'est pas supporté */}
      <div className="wave-fallback-img hidden absolute inset-0 bg-gradient-to-br from-deep-ocean via-wave-blue to-aqua-light" />
    </div>
  );
}
