import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, Preload } from '@react-three/drei';

function Scene() {
  const groupRef = useRef();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    const throttledScroll = () => {
      requestAnimationFrame(handleScroll);
    };
    
    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = scrollY * 0.001;
      groupRef.current.position.y = scrollY * 0.001;
    }
  }, [scrollY]);

  return (
    <group ref={groupRef}>
      {/* Minimal Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.6} />
      <pointLight position={[-10, -10, 5]} intensity={0.3} color="#e9b558" />

      {/* Simplified 3D Objects */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial 
          color="#e9b558" 
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>

      {/* Rotating Ring - Simplified */}
      <mesh rotation={[Math.PI / 4, 0, 0]} position={[0, 2, 0]}>
        <torusGeometry args={[1.5, 0.3, 8, 50]} />
        <meshStandardMaterial 
          color="#faf7f0" 
          metalness={0.4}
          roughness={0.4}
        />
      </mesh>

      {/* Floating Spheres - Simplified */}
      <mesh position={[3, 1, 0]}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshStandardMaterial 
          color="#4a4a4a" 
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[-3, -1, 0]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial 
          color="#2d2d2d" 
          metalness={0.5}
          roughness={0.4}
        />
      </mesh>

      {/* HTML Card Overlay */}
      <Html position={[0, -2.5, 0]} scale={0.003}>
        <div className="beat-card" style={{ width: '420px' }}>
          <span className="beat-kicker">ESCROW-BACKED</span>
          <h2 className="beat-title">Fix it now. Pay when it's done.</h2>
          <p className="beat-sub">Verified professionals. Zero risk.</p>
          <button className="beat-btn">Get Started →</button>
        </div>
      </Html>
    </group>
  );
}

function LoadingFallback() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0a0a0a]">
      <div className="text-center">
        <div className="w-12 h-12 rounded-full border-2 border-brass-500/30 border-t-brass-500 animate-spin mx-auto mb-4" />
        <p className="text-white/50 text-sm">Loading interactive experience...</p>
      </div>
    </div>
  );
}

export default function ScrollytellingExperience() {
  const [canvasReady, setCanvasReady] = useState(false);

  return (
    <div className="fixed inset-0 w-full h-full">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas 
          camera={{ position: [0, 0, 5], fov: 50 }}
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: 'high-performance',
            precision: 'mediump'
          }}
          onCreated={() => setCanvasReady(true)}
          dpr={[1, 2]}
        >
          <Scene />
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            autoRotate={true}
            autoRotateSpeed={1}
          />
          <Preload all />
        </Canvas>
      </Suspense>
      
      {/* Scroll Content Area */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="h-[400vh] pointer-events-none" />
      </div>
    </div>
  );
}
