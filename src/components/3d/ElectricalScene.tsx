import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ElectricalScene: React.FC = () => {
  const boxRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = React.useState(false);

  useFrame(() => {
    if (boxRef.current) {
      boxRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={boxRef}>
      <mesh castShadow receiveShadow position={[0, 0, 0]} onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
        <boxGeometry args={[1.2, 1.6, 0.4]} />
        <meshStandardMaterial color={hovered ? '#e6e6fa' : '#f5f5f5'} metalness={0.5} roughness={0.5} />
      </mesh>

      <mesh castShadow position={[0, 0, 0.22]}>
        <boxGeometry args={[1, 1.4, 0.08]} />
        <meshStandardMaterial color="#d0d0d0" metalness={0.7} roughness={0.3} />
      </mesh>

      {[0, 1, 2, 3, 4, 5].map((i) => {
        const row = Math.floor(i / 3);
        const col = i % 3;
        const x = -0.3 + col * 0.3;
        const y = 0.4 - row * 0.35;

        return (
          <group key={`breaker-${i}`} position={[x, y, 0.25]}>
            <mesh castShadow>
              <boxGeometry args={[0.15, 0.2, 0.08]} />
              <meshStandardMaterial color={hovered ? '#ff9500' : '#333333'} metalness={0.8} roughness={0.2} />
            </mesh>

            <mesh position={[0, -0.15, 0]}>
              <boxGeometry args={[0.15, 0.08, 0.05]} />
              <meshStandardMaterial color="#666666" metalness={0.3} />
            </mesh>
          </group>
        );
      })}

      {[0, 1, 2, 3, 4, 5].map((i) => {
        const row = Math.floor(i / 3);
        const col = i % 3;
        const x = -0.3 + col * 0.3;
        const y = 0.65 - row * 0.35;

        return (
          <pointLight
            key={`indicator-${i}`}
            position={[x, y, 0.3]}
            intensity={hovered ? 2 : 0.8}
            color={hovered ? '#00ff00' : '#ffaa00'}
            distance={0.8}
          />
        );
      })}

      {[0, 1].map((i) => (
        <mesh key={`terminal-${i}`} position={[i === 0 ? -0.35 : 0.35, -0.75, 0.1]} castShadow>
          <boxGeometry args={[0.2, 0.3, 0.15]} />
          <meshStandardMaterial color="#888888" metalness={0.7} roughness={0.4} />
        </mesh>
      ))}

      <mesh castShadow position={[0, -0.5, 0.23]}>
        <boxGeometry args={[0.5, 0.35, 0.1]} />
        <meshStandardMaterial color="#e0e0e0" metalness={0.6} roughness={0.4} />
      </mesh>

      <pointLight position={[0, 0, 0.3]} intensity={hovered ? 1.5 : 0.3} color="#ffff00" distance={2} />
    </group>
  );
};

export default ElectricalScene;
