import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PaintingScene: React.FC = () => {
  const sceneRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = React.useState(false);

  useFrame(() => {
    if (sceneRef.current) {
      sceneRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={sceneRef}>
      <mesh castShadow receiveShadow position={[-0.5, 0, 0]}>
        <boxGeometry args={[1.2, 1.5, 0.1]} />
        <meshStandardMaterial color="#d4cfc9" metalness={0.05} roughness={0.95} />
      </mesh>

      <mesh castShadow receiveShadow position={[0.5, 0, 0]} onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
        <boxGeometry args={[1.2, 1.5, 0.1]} />
        <meshStandardMaterial color={hovered ? '#ff6b9d' : '#4a90e2'} metalness={0.1} roughness={0.8} emissive={hovered ? '#ff6b9d' : '#000000'} emissiveIntensity={hovered ? 0.2 : 0} />
      </mesh>

      <mesh castShadow position={[-0.8, -0.7, 0]}>
        <cylinderGeometry args={[0.25, 0.3, 0.45]} />
        <meshStandardMaterial color={hovered ? '#ff6b9d' : '#e8294b'} metalness={0.6} roughness={0.4} />
      </mesh>

      <mesh castShadow position={[-0.8, -0.3, 0]} scale={[1, 0.08, 1]}>
        <torusGeometry args={[0.35, 0.08, 8, 32]} />
        <meshStandardMaterial color="#666666" metalness={0.7} roughness={0.3} />
      </mesh>

      <mesh castShadow position={[0.2, -0.7, 0]}>
        <boxGeometry args={[0.45, 0.15, 0.35]} />
        <meshStandardMaterial color="#f0f0f0" metalness={0.5} roughness={0.4} />
      </mesh>

      <mesh castShadow position={[0.2, -0.62, -0.05]}>
        <boxGeometry args={[0.4, 0.02, 0.3]} />
        <meshStandardMaterial color={hovered ? '#ff6b9d' : '#e8294b'} metalness={0.7} roughness={0.3} />
      </mesh>

      <mesh castShadow position={[0.8, 0.3, -0.2]}>
        <cylinderGeometry args={[0.04, 0.04, 0.7]} rotation={[0.3, 0, 0.2]} />
        <meshStandardMaterial color="#8b4513" metalness={0.6} roughness={0.5} />
      </mesh>

      <mesh castShadow position={[0.9, 0.7, -0.1]} rotation={[0.3, 0, 0.2]} scale={[1.2, 0.5, 0.5]}>
        <cylinderGeometry args={[0.15, 0.15, 0.25]} />
        <meshStandardMaterial color={hovered ? '#ff6b9d' : '#e8294b'} metalness={0.5} roughness={0.6} />
      </mesh>

      <mesh castShadow position={[0, 0.75, 0.08]}>
        <boxGeometry args={[0.05, 1.5, 0.02]} />
        <meshStandardMaterial color="#ffff00" metalness={0.3} roughness={0.5} />
      </mesh>

      {hovered && (
        <>
          {[0, 1, 2].map((i) => (
            <mesh key={`splatter-${i}`} position={[0.5 + Math.random() * 0.3, 0.5 + Math.random() * 0.5, 0.1]}>
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshBasicMaterial color="#ff6b9d" />
            </mesh>
          ))}
        </>
      )}

      <pointLight position={[0.5, 0.5, 0.5]} intensity={hovered ? 1.5 : 0.5} color={hovered ? '#ff6b9d' : '#4a90e2'} distance={2} />
    </group>
  );
};

export default PaintingScene;
