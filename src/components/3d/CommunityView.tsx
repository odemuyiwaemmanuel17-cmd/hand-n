import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CommunityView: React.FC = () => {
  const viewRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = React.useState(false);

  useFrame(() => {
    if (viewRef.current) {
      viewRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={viewRef} onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
      {[0, 1, 2].map((row) =>
        [0, 1, 2, 3].map((col) => {
          const x = -3 + col * 2;
          const z = -3 + row * 2;

          return (
            <group key={`neighborhood-${row}-${col}`} position={[x, 0, z]}>
              <mesh castShadow receiveShadow position={[0, 0.3, 0]}>
                <boxGeometry args={[0.8, 0.6, 0.8]} />
                <meshStandardMaterial color={hovered ? '#e8d9c3' : '#d4a574'} metalness={0.05} roughness={0.9} />
              </mesh>

              <mesh castShadow position={[0, 0.85, 0]}>
                <coneGeometry args={[0.6, 0.4, 6]} />
                <meshStandardMaterial color="#8b4513" metalness={0.3} roughness={0.7} />
              </mesh>

              <mesh castShadow position={[-0.2, 0.2, 0.42]}>
                <boxGeometry args={[0.25, 0.4, 0.05]} />
                <meshStandardMaterial color="#654321" metalness={0.6} />
              </mesh>

              <mesh castShadow position={[0.25, 0.45, 0.42]}>
                <boxGeometry args={[0.2, 0.2, 0.05]} />
                <meshStandardMaterial color="#87ceeb" metalness={0.8} roughness={0.1} />
              </mesh>
            </group>
          );
        })
      )}

      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={`street-h-${i}`} position={[0, 0.01, -4 + i * 2]} castShadow>
          <boxGeometry args={[8, 0.02, 0.2]} />
          <meshStandardMaterial color="#666666" metalness={0.5} roughness={0.5} />
        </mesh>
      ))}

      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={`street-v-${i}`} position={[-4 + i * 2, 0.01, 0]} castShadow>
          <boxGeometry args={[0.2, 0.02, 8]} />
          <meshStandardMaterial color="#666666" metalness={0.5} roughness={0.5} />
        </mesh>
      ))}

      {[
        [0, 0],
        [-2, 2],
        [2, -2],
        [-2, -2],
        [2, 2],
      ].map((pos, i) => (
        <group key={`pin-${i}`} position={[pos[0], 1.2, pos[1]]}>
          <mesh castShadow>
            <coneGeometry args={[0.15, 0.4, 12]} />
            <meshStandardMaterial color={hovered ? '#00ff88' : '#ff6b35'} emissive={hovered ? '#00ff88' : '#ff6b35'} emissiveIntensity={hovered ? 0.8 : 0.4} />
          </mesh>

          {hovered && (
            <>
              <pointLight position={[0, 0.2, 0]} intensity={2} color="#00ff88" distance={1.5} />

              <mesh position={[0, 0.2, 0]} scale={[1.2, 1.2, 1.2]}>
                <sphereGeometry args={[0.15, 8, 8]} />
                <meshBasicMaterial color="#00ff88" transparent opacity={0.2} />
              </mesh>
            </>
          )}
        </group>
      ))}

      {hovered && (
        <>
          {[
            [[0, 0], [-2, 2]],
            [[0, 0], [2, -2]],
            [[-2, 2], [2, 2]],
          ].map((line, i) => {
            const start = [...line[0], 1.2] as [number, number, number];
            const end = [...line[1], 1.2] as [number, number, number];
            const mid = [(start[0] + end[0]) / 2, start[1], (start[2] + end[2]) / 2] as [number, number, number];
            const dist = Math.sqrt(Math.pow(end[0] - start[0], 2) + Math.pow(end[2] - start[2], 2));

            return (
              <mesh key={`connection-${i}`} position={mid} rotation={[0, Math.atan2(end[2] - start[2], end[0] - start[0]), 0]}>
                <boxGeometry args={[dist, 0.05, 0.05]} />
                <meshBasicMaterial color="#00ff88" transparent opacity={0.6} />
              </mesh>
            );
          })}
        </>
      )}

      <mesh castShadow position={[4, 0.5, 4]}>
        <cylinderGeometry args={[0.1, 0.1, 2]} />
        <meshStandardMaterial color="#333333" metalness={0.7} />
      </mesh>

      {hovered && <pointLight position={[4, 1.5, 4]} intensity={1.5} color="#00ff88" distance={8} />}
    </group>
  );
};

export default CommunityView;
