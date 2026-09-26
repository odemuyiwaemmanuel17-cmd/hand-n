import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Html } from '@react-three/drei';
import * as THREE from 'three';
import NigerianHome from './3d/NigerianHome';
import PlumbingScene from './3d/PlumbingScene';
import AirConditioningScene from './3d/AirConditioningScene';
import ElectricalScene from './3d/ElectricalScene';
import SolarScene from './3d/SolarScene';
import PaintingScene from './3d/PaintingScene';
import ProfessionalCharacter from './3d/ProfessionalCharacter';
import EscrowVault from './3d/EscrowVault';
import CommunityView from './3d/CommunityView';
import ScrollManager from './3d/ScrollManager';

const SceneContent: React.FC<{ scrollProgress: number }> = ({ scrollProgress }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const [activeScene, setActiveScene] = useState(0);

  useFrame(() => {
    if (groupRef.current) {
      const rotationTarget = scrollProgress * Math.PI * 2;
      groupRef.current.rotation.y += (rotationTarget - groupRef.current.rotation.y) * 0.05;
    }
  });

  useEffect(() => {
    const newScene = Math.floor(scrollProgress * 9);
    setActiveScene(Math.min(newScene, 8));
  }, [scrollProgress]);

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 15, 10]} intensity={1.2} castShadow shadow-mapSize={[2048, 2048]} />
      <pointLight position={[-10, 5, -10]} intensity={0.5} color="#ff9500" />

      <group position={[0, 0, 0]} scale={activeScene === 0 ? 1 : 0.7} opacity={activeScene === 0 ? 1 : 0.3}>
        <NigerianHome />
      </group>

      <group position={[3, 0, 0]} opacity={activeScene === 1 ? 1 : 0.2}>
        <PlumbingScene />
      </group>

      <group position={[-3, 0, 0]} opacity={activeScene === 2 ? 1 : 0.2}>
        <AirConditioningScene />
      </group>

      <group position={[0, 3, 0]} opacity={activeScene === 3 ? 1 : 0.2}>
        <ElectricalScene />
      </group>

      <group position={[0, -3, 0]} opacity={activeScene === 4 ? 1 : 0.2}>
        <SolarScene />
      </group>

      <group position={[3, 3, 0]} opacity={activeScene === 5 ? 1 : 0.2}>
        <PaintingScene />
      </group>

      <group position={[-3, 3, 0]} opacity={activeScene === 6 ? 1 : 0.2}>
        <ProfessionalCharacter />
      </group>

      <group position={[0, 0, -5]} opacity={activeScene === 7 ? 1 : 0.2}>
        <EscrowVault />
      </group>

      <group position={[0, 0, 5]} opacity={activeScene === 8 ? 1 : 0.2}>
        <CommunityView />
      </group>
    </group>
  );
};

const ThreeScene: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (canvasRef.current?.parentElement) {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.min(scrollTop / docHeight, 1);
        setScrollProgress(scrollPercent);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={canvasRef} className="relative w-full h-screen sticky top-0">
      <Canvas
        shadows
        camera={{ position: [0, 3, 8], fov: 75 }}
        style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
      >
        <PerspectiveCamera makeDefault position={[0, 3, 8]} />
        <SceneContent scrollProgress={scrollProgress} />
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          autoRotate
          autoRotateSpeed={2}
        />
      </Canvas>
    </div>
  );
};

export default ThreeScene;
