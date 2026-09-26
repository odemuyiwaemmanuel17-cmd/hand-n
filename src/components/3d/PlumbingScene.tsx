import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const WaterDrop: React.FC<{ position: [number, number, number]; delay: number }> = ({ position, delay }) => {
  const dropRef = useRef<THREE.Mesh>(null);
  const startTime = useRef(Date.now());

  useFrame(() => {
    if (dropRef.current) {
      const elapsed = (Date.now() - startTime.current + delay * 1000) % 2000;
      const progress = elapsed / 2000;
      dropRef.current.position.y = position[1] - progress * 1.5;
      dropRef.current.position.z = position[2] + Math.sin(progress * Math.PI) * 0.1;
    }
  });

  return (
    <mesh ref={dropRef} position={position} scale={0.15}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial color="#4da6ff" metalness={0.6} roughness={0.2} transparent opacity={0.8} />
    </mesh>
  );
};

const PlumbingScene: React.FC = () => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = React.useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={meshRef}>
      <mesh castShadow receiveShadow position={[0, 0.5, 0]} onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
        <boxGeometry args={[1.5, 0.3, 1]} />
        <meshStandardMaterial color={hovered ? '#5da6ff' : '#ffffff'} metalness={0.7} roughness={0.3} />
      </mesh>

      <mesh castShadow receiveShadow position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.6, 0.7, 0.7]} />
        <meshStandardMaterial color="#d4d4d4" metalness={0.5} />
      </mesh>

      <group>
        <mesh castShadow position={[0, -0.8, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 1.5]} />
          <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.2} />
        </mesh>

        {[
          [0.4, -0.3, 0],
          [-0.4, -0.3, 0],
        ].map((pos, i) => (
          <mesh key={`pipe-${i}`} position={pos as [number, number, number]} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 0.6]} rotation={[0, 0, 0.5]} />
            <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.2} />
          </mesh>
        ))}
      </group>

      <mesh castShadow position={[-0.5, 0.85, -0.5]}>
        <cylinderGeometry args={[0.06, 0.06, 0.4]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
      </mesh>

      {hovered &&
        [
          [[-0.5, 0.4, -0.5], 0],
          [[-0.5, 0.3, -0.5], 0.2],
          [[-0.5, 0.2, -0.5], 0.4],
        ].map(([pos, delay], i) => <WaterDrop key={`drop-${i}`} position={pos as [number, number, number]} delay={delay} />)}

      {hovered && <pointLight position={[0, 0, 0]} intensity={1.5} color="#4da6ff" distance={3} />}
    </group>
  );
};

export default PlumbingScene;
