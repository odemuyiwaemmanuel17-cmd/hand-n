import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const AirConditioningScene: React.FC = () => {
  const unitRef = useRef<THREE.Group>(null);
  const fanRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = React.useState(false);

  useFrame(() => {
    if (unitRef.current) {
      unitRef.current.rotation.y += 0.002;
    }
    if (fanRef.current && hovered) {
      fanRef.current.rotation.z += 0.1;
    }
  });

  return (
    <group ref={unitRef}>
      <mesh castShadow receiveShadow position={[0, 0.5, 0]} onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
        <boxGeometry args={[2, 0.8, 0.5]} />
        <meshStandardMaterial color={hovered ? '#e0e0ff' : '#f0f0f0'} metalness={0.6} roughness={0.4} />
      </mesh>

      <mesh castShadow position={[0, 1.1, -0.3]}>
        <boxGeometry args={[2.2, 0.1, 0.3]} />
        <meshStandardMaterial color="#888888" metalness={0.7} />
      </mesh>

      <mesh castShadow receiveShadow position={[0.5, 0.5, 0.35]}>
        <cylinderGeometry args={[0.4, 0.4, 0.15]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#333333" metalness={0.5} roughness={0.5} />
      </mesh>

      <group ref={fanRef} position={[0.5, 0.5, 0.35]}>
        {[0, 1, 2].map((i) => (
          <mesh key={`blade-${i}`} position={[0, 0, 0]} rotation={[(i * Math.PI * 2) / 3, 0, 0]} scale={[1, 0.15, 0.5]}>
            <boxGeometry args={[0.1, 0.1, 0.8]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
          </mesh>
        ))}
      </group>

      {[0, 1, 2, 3].map((i) => (
        <mesh key={`vent-${i}`} position={[-0.4, 0.5 + i * 0.15, 0.1]} castShadow>
          <boxGeometry args={[1.2, 0.08, 0.12]} />
          <meshStandardMaterial color="#666666" metalness={0.6} roughness={0.4} />
        </mesh>
      ))}

      <mesh castShadow position={[0.5, 0.1, 0.3]}>
        <boxGeometry args={[0.6, 0.3, 0.1]} />
        <meshStandardMaterial color="#222222" metalness={0.7} roughness={0.3} />
      </mesh>

      {[0, 1, 2].map((i) => (
        <pointLight
          key={`light-${i}`}
          position={[0.2 + i * 0.15, 0.2, 0.35]}
          intensity={hovered ? 1.5 : 0.5}
          color={hovered ? '#00ff00' : '#ff6600'}
          distance={1}
        />
      ))}

      {hovered && (
        <group>
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * Math.PI * 2) / 8;
            return (
              <mesh key={`particle-${i}`} position={[0.5 + Math.cos(angle) * 0.3, 0.5, 0.35 + Math.sin(angle) * 0.3]}>
                <sphereGeometry args={[0.05, 4, 4]} />
                <meshStandardMaterial color="#87ceeb" transparent opacity={0.4} />
              </mesh>
            );
          })}
        </group>
      )}
    </group>
  );
};

export default AirConditioningScene;
