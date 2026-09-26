import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const NigerianHome: React.FC = () => {
  const homeRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (homeRef.current) {
      homeRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={homeRef}>
      <mesh castShadow receiveShadow position={[0, -2, 0]}>
        <boxGeometry args={[8, 0.2, 8]} />
        <meshStandardMaterial color="#d4a574" metalness={0.1} roughness={0.8} />
      </mesh>

      <group>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={`fence-${i}`} position={[4, 1, -4 + i * 2.7]} castShadow>
            <boxGeometry args={[0.15, 3, 0.15]} />
            <meshStandardMaterial color="#333333" metalness={0.6} />
          </mesh>
        ))}
      </group>

      <group>
        <mesh castShadow receiveShadow position={[0, 1.5, -2]}>
          <boxGeometry args={[6, 3, 0.3]} />
          <meshStandardMaterial color="#f5e6d3" metalness={0.05} roughness={0.9} />
        </mesh>

        <mesh castShadow receiveShadow position={[-3, 1.5, 0]}>
          <boxGeometry args={[0.3, 3, 4]} />
          <meshStandardMaterial color="#e8d9c3" metalness={0.05} roughness={0.9} />
        </mesh>

        <mesh castShadow receiveShadow position={[3, 1.5, 0]}>
          <boxGeometry args={[0.3, 3, 4]} />
          <meshStandardMaterial color="#e8d9c3" metalness={0.05} roughness={0.9} />
        </mesh>

        <mesh castShadow receiveShadow position={[0, 3.2, 0]}>
          <coneGeometry args={[4, 1.2, 8]} />
          <meshStandardMaterial color="#8b4513" metalness={0.3} roughness={0.7} />
        </mesh>
      </group>

      <mesh castShadow receiveShadow position={[-1.5, 1, -2.15]}>
        <boxGeometry args={[0.8, 2, 0.1]} />
        <meshStandardMaterial color="#654321" metalness={0.8} roughness={0.2} />
      </mesh>

      {[
        [-2.5, 1.8, -2.15],
        [2.5, 1.8, -2.15],
        [-2.85, 1.5, -1],
        [-2.85, 1.5, 1],
      ].map((pos, i) => (
        <mesh key={`window-${i}`} castShadow receiveShadow position={pos as [number, number, number]}>
          <boxGeometry args={[0.6, 0.6, 0.05]} />
          <meshStandardMaterial color="#87ceeb" metalness={0.8} roughness={0.1} />
        </mesh>
      ))}

      <pointLight position={[0, 1.5, 0]} intensity={0.8} color="#ffffcc" distance={6} />

      {[
        [-2.5, 1.8, -2.2],
        [2.5, 1.8, -2.2],
      ].map((pos, i) => (
        <group key={`bars-${i}`} position={pos as [number, number, number]}>
          {[0, 1, 2].map((j) => (
            <mesh key={`bar-${j}`} position={[(-0.25 + j * 0.25), 0, 0]}>
              <cylinderGeometry args={[0.04, 0.04, 0.6]} />
              <meshStandardMaterial color="#333333" metalness={0.7} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
};

export default NigerianHome;
