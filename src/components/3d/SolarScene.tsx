import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const SolarScene: React.FC = () => {
  const panelsRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = React.useState(false);
  const reflectionRef = useRef<number>(0);

  useFrame(() => {
    if (panelsRef.current) {
      panelsRef.current.rotation.y += 0.002;
    }
    if (hovered) {
      reflectionRef.current += 0.02;
    }
  });

  return (
    <group ref={panelsRef}>
      <mesh castShadow position={[0, 0.8, 0]}>
        <boxGeometry args={[3.5, 0.1, 0.5]} />
        <meshStandardMaterial color="#666666" metalness={0.6} roughness={0.5} />
      </mesh>

      {[0, 1].map((row) =>
        [0, 1, 2].map((col) => (
          <mesh
            key={`panel-${row}-${col}`}
            castShadow
            receiveShadow
            position={[-0.9 + col * 0.95, 1.3 + row * 0.65, 0]}
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
          >
            <boxGeometry args={[0.8, 0.6, 0.05]} />
            <meshStandardMaterial
              color={hovered ? '#87ceeb' : '#1a1a2e'}
              metalness={0.8}
              roughness={hovered ? 0.15 : 0.3}
              emissive={hovered ? '#4da6ff' : '#000000'}
              emissiveIntensity={hovered ? 0.5 : 0}
            />
          </mesh>
        ))
      )}

      {[0, 1].map((i) => (
        <mesh key={`junction-${i}`} castShadow position={[-1.5 + i * 3, 1, -0.1]}>
          <boxGeometry args={[0.25, 0.25, 0.15]} />
          <meshStandardMaterial color="#333333" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}

      <mesh castShadow receiveShadow position={[1.2, 0.5, 0]} onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
        <boxGeometry args={[0.8, 0.8, 0.4]} />
        <meshStandardMaterial color={hovered ? '#f0f0ff' : '#e0e0e0'} metalness={0.5} roughness={0.4} />
      </mesh>

      <mesh castShadow position={[1.2, 0.8, 0.22]}>
        <boxGeometry args={[0.6, 0.35, 0.08]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.2} />
      </mesh>

      {[0, 1, 2].map((i) => (
        <pointLight
          key={`inverter-light-${i}`}
          position={[0.95 + i * 0.12, 0.8, 0.25]}
          intensity={hovered ? 1.5 : 0.8}
          color={hovered ? '#00ff00' : '#ffaa00'}
          distance={0.6}
        />
      ))}

      {[0, 1, 2].map((i) => (
        <mesh key={`wire-${i}`} position={[0 + i * 0.5, 0.8, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.6]} rotation={[0, 0, 0.3]} />
          <meshStandardMaterial color="#ff3333" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}

      {[0, 1].map((i) => (
        <mesh key={`ac-wire-${i}`} position={[1.2, 0.1 + i * 0.15, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.4]} rotation={[1.2, 0, 0]} />
          <meshStandardMaterial color="#0000ff" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}

      {hovered && (
        <group position={[0, 2, -1]}>
          <pointLight position={[0, 0, 0]} intensity={2} color="#ffff99" distance={5} />
          <mesh position={[0.5, 0, 0]} scale={0.3}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshBasicMaterial color="#ffff99" transparent opacity={0.3} />
          </mesh>
        </group>
      )}
    </group>
  );
};

export default SolarScene;
