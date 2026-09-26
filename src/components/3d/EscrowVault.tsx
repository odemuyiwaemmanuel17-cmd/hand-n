import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const EscrowVault: React.FC = () => {
  const vaultRef = useRef<THREE.Group>(null);
  const doorRef = useRef<THREE.Group>(null);
  const tokenRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = React.useState(false);
  const animationPhase = useRef<number>(0);

  useFrame(() => {
    if (vaultRef.current) {
      vaultRef.current.rotation.y += 0.002;
    }

    if (hovered && doorRef.current) {
      animationPhase.current += 0.02;
      const phase = animationPhase.current % (Math.PI * 2);

      if (tokenRef.current) {
        tokenRef.current.rotation.x += 0.03;
        tokenRef.current.rotation.z += 0.05;
        tokenRef.current.scale.x = 1 + Math.sin(phase) * 0.1;
      }

      if (phase < Math.PI) {
        doorRef.current.rotation.y = Math.sin(phase) * 0.6;
      } else {
        doorRef.current.rotation.y = Math.cos(phase) * 0.3;
      }
    }
  });

  return (
    <group ref={vaultRef} onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 1.4, 0.8]} />
        <meshStandardMaterial
          color={hovered ? '#1a1a3e' : '#0a0a1e'}
          metalness={0.8}
          roughness={0.1}
          emissive={hovered ? '#4da6ff' : '#000000'}
          emissiveIntensity={hovered ? 0.3 : 0}
        />
      </mesh>

      <group ref={doorRef} position={[0.6, 0, 0.4]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.15, 1.4, 0.8]} />
          <meshStandardMaterial color="#1a1a3e" metalness={0.9} roughness={0.05} />
        </mesh>

        <mesh position={[0, 0, 0.5]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 0.15]} rotation={[0, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#ffaa00" metalness={0.9} roughness={0.1} />
        </mesh>

        <mesh position={[0.08, 0.5, 0.42]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.08]} rotation={[0.3, 0, 0]} />
          <meshStandardMaterial color="#ffaa00" metalness={0.8} />
        </mesh>
      </group>

      <mesh position={[-0.3, 0, 0]} castShadow>
        <boxGeometry args={[0.8, 1.2, 0.6]} />
        <meshStandardMaterial color="#050510" metalness={0.6} roughness={0.3} transparent opacity={0.7} />
      </mesh>

      {hovered && (
        <>
          <mesh ref={tokenRef} position={[-0.3, 0, 0]} castShadow>
            <cylinderGeometry args={[0.2, 0.2, 0.08]} />
            <meshStandardMaterial color="#00ff88" metalness={0.8} roughness={0.2} emissive="#00ff88" emissiveIntensity={0.6} />
          </mesh>

          <pointLight position={[-0.3, 0, 0]} intensity={2} color="#00ff88" distance={2} />

          {[0, 1, 2].map((i) => (
            <mesh key={`tape-${i}`} position={[0, -0.5 + i * 0.5, 0.42]}>
              <boxGeometry args={[1.2, 0.08, 0.05]} />
              <meshStandardMaterial color="#ff0000" metalness={0.5} roughness={0.5} emissive="#ff0000" emissiveIntensity={0.3} />
            </mesh>
          ))}
        </>
      )}

      {[0, 1, 2, 3].map((i) => (
        <pointLight
          key={`lock-light-${i}`}
          position={[0, -0.5 + i * 0.5, 0.45]}
          intensity={hovered ? 1.5 : 0.5}
          color={hovered ? '#00ff88' : '#ff6600'}
          distance={0.8}
        />
      ))}

      <mesh position={[0, -0.8, 0.42]} castShadow>
        <boxGeometry args={[0.8, 0.2, 0.08]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.5} />
      </mesh>

      {[0, 1, 2].map((i) => (
        <pointLight
          key={`status-${i}`}
          position={[-0.3 + i * 0.3, -0.8, 0.45]}
          intensity={hovered ? 1 : 0.3}
          color={hovered ? '#00ff88' : '#ffaa00'}
          distance={0.5}
        />
      ))}
    </group>
  );
};

export default EscrowVault;
