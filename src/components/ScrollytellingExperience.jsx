import React, { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';

function Scene() {
  const groupRef = useRef();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = scrollY * 0.003;
      groupRef.current.position.y = scrollY * 0.002;
    }
  }, [scrollY]);

  return (
    <group ref={groupRef}>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, 5]} intensity={0.4} color="#e9b558" />

      {/* Main 3D Objects */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial 
          color="#e9b558" 
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>

      {/* Rotating Ring */}
      <mesh rotation={[Math.PI / 4, 0, 0]} position={[0, 2, 0]}>
        <torusGeometry args={[1.5, 0.3, 16, 100]} />
        <meshStandardMaterial 
          color="#faf7f0" 
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>

      {/* Floating Spheres */}
      <mesh position={[3, 1, 0]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial 
          color="#4a4a4a" 
          metalness={0.8}
          roughness={0.1}
        />
      </mesh>
      <mesh position={[-3, -1, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial 
          color="#2d2d2d" 
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>

      {/* HTML Card Overlay */}
      <Html position={[0, -2.5, 0]} scale={0.003}>
        <div className="beat-card" style={{ width: '420px' }}>
          <span className="beat-kicker">ESCROW-BACKED</span>
          <h2 className="beat-title">Fix it now. Pay when it's done.</h2>
          <p className="beat-sub">Verified professionals. Transparent pricing. Zero risk.</p>
          <button className="beat-btn">Get Started →</button>
        </div>
      </Html>
    </group>
  );
}

export default function ScrollytellingExperience() {
  return (
    <div className="fixed inset-0 w-full h-full">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
        <OrbitControls 
          enableZoom={true}
          enablePan={true}
          autoRotate={true}
          autoRotateSpeed={2}
        />
      </Canvas>
      
      {/* Scroll Content Area */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="h-[400vh] pointer-events-none" />
      </div>
    </div>
  );
}