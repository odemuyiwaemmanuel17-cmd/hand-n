import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ProfessionalCharacter: React.FC = () => {
  const characterRef = useRef<THREE.Group>(null);
  const armRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = React.useState(false);

  useFrame((state) => {
    if (characterRef.current) {
      characterRef.current.rotation.y += 0.002;
      characterRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }

    if (armRef.current && hovered) {
      armRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.3;
    }
  });

  return (
    <group ref={characterRef} onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
      <mesh castShadow position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#d4a574" metalness={0.1} roughness={0.9} />
      </mesh>

      {[0.08, -0.08].map((x, i) => (
        <mesh key={`eye-${i}`} position={[x, 0.9, 0.2]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.5} />
        </mesh>
      ))}

      <mesh castShadow position={[0, 0.35, 0]}>
        <boxGeometry args={[0.35, 0.5, 0.25]} />
        <meshStandardMaterial color="#ff6b35" metalness={0.2} roughness={0.8} />
      </mesh>

      <mesh castShadow position={[0, 0.35, 0.15]}>
        <boxGeometry args={[0.45, 0.55, 0.15]} />
        <meshStandardMaterial color="#004e89" metalness={0.1} roughness={0.8} />
      </mesh>

      <mesh castShadow position={[-0.25, 0.5, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.4]} rotation={[0, 0, 0.3]} />
        <meshStandardMaterial color="#d4a574" metalness={0.1} roughness={0.9} />
      </mesh>

      <group ref={armRef} position={[0.25, 0.5, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.4]} rotation={[0, 0, -0.3]} />
          <meshStandardMaterial color="#d4a574" metalness={0.1} roughness={0.9} />
        </mesh>

        <mesh castShadow position={[0.1, -0.3, 0]}>
          <boxGeometry args={[0.15, 0.08, 0.08]} />
          <meshStandardMaterial color="#ffaa00" metalness={0.7} roughness={0.3} />
        </mesh>

        <mesh position={[0.15, -0.35, 0]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color="#555555" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {[-0.1, 0.1].map((x, i) => (
        <mesh key={`leg-${i}`} castShadow position={[x, -0.1, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.35]} />
          <meshStandardMaterial color="#333333" metalness={0.1} roughness={0.9} />
        </mesh>
      ))}

      {[-0.1, 0.1].map((x, i) => (
        <mesh key={`shoe-${i}`} castShadow position={[x, -0.3, 0.05]}>
          <boxGeometry args={[0.1, 0.08, 0.15]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.2} roughness={0.8} />
        </mesh>
      ))}

      {hovered && <pointLight position={[0, 0.8, 0.5]} intensity={1.5} color="#00ff88" distance={1.5} />}

      {hovered && (
        <mesh position={[0, 0.4, 0]}>
          <sphereGeometry args={[0.6, 16, 16]} />
          <meshBasicMaterial color="#00ff88" transparent opacity={0.1} wireframe={false} />
        </mesh>
      )}
    </group>
  );
};

export default ProfessionalCharacter;
