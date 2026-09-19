import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Artisan from './Artisan.jsx';
import EscrowVault from './EscrowVault.jsx';

export const SCENE_CENTERS = {
  home: [0, 0, 0],
  plumbing: [55, 0, -25],
  hvac: [105, 0, -55],
  electrical: [155, 0, -35],
  solar: [205, 0, -70],
  pros: [255, 0, -40],
  escrow: [310, 0, -75],
  neighborhood: [380, 0, -100],
};

const mat = (color, roughness = 0.65, metalness = 0.05) => ({ color, roughness, metalness });

function Palm({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      <mesh castShadow position={[0, 2.2, 0]} rotation={[0, 0, -0.04]}>
        <cylinderGeometry args={[0.18, 0.3, 4.4, 12]} />
        <meshStandardMaterial {...mat('#72513a', 0.95)} />
      </mesh>
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} castShadow position={[0, 4.45, 0]} rotation={[0.28, (i / 8) * Math.PI * 2, 0]}>
          <capsuleGeometry args={[0.11, 2.2, 5, 10]} />
          <meshStandardMaterial {...mat(i % 2 ? '#275c38' : '#347346', 0.9)} />
        </mesh>
      ))}
    </group>
  );
}

function EstateCar({ position, color = '#182a3d', rotation = 0 }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh castShadow position={[0, 0.55, 0]}>
        <boxGeometry args={[2, 0.55, 4.4]} />
        <meshPhysicalMaterial color={color} roughness={0.22} metalness={0.7} clearcoat={1} />
      </mesh>
      <mesh castShadow position={[0, 1.05, -0.3]}>
        <boxGeometry args={[1.7, 0.55, 2.2]} />
        <meshPhysicalMaterial color="#17202b" roughness={0.08} metalness={0.5} />
      </mesh>
      {[[-1, -1.4], [1, -1.4], [-1, 1.4], [1, 1.4]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.35, z]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.38, 0.38, 0.28, 20]} />
          <meshStandardMaterial color="#101113" roughness={0.85} />
        </mesh>
      ))}
    </group>
  );
}

function MansionEstate() {
  const wings = [-7.5, 7.5];
  return (
    <group position={SCENE_CENTERS.home}>
      <mesh receiveShadow position={[0, -0.3, 0]}>
        <boxGeometry args={[62, 0.5, 46]} />
        <meshStandardMaterial color="#345536" roughness={1} />
      </mesh>
      <mesh receiveShadow position={[0, 0.01, 8]}>
        <boxGeometry args={[12, 0.12, 38]} />
        <meshStandardMaterial color="#b6b0a4" roughness={0.9} />
      </mesh>
      <mesh receiveShadow position={[14, 0.02, 4]}>
        <boxGeometry args={[16, 0.18, 25]} />
        <meshStandardMaterial color="#1788a0" roughness={0.16} metalness={0.15} />
      </mesh>
      <mesh position={[14, 0.14, 4]}>
        <boxGeometry args={[15.2, 0.05, 24.2]} />
        <meshPhysicalMaterial color="#5fd8ec" transparent opacity={0.62} roughness={0.08} />
      </mesh>

      {/* expansive two-storey contemporary mansion */}
      <mesh castShadow receiveShadow position={[0, 1.9, -5]}>
        <boxGeometry args={[27, 3.8, 13]} />
        <meshStandardMaterial {...mat('#e6dfd2', 0.72)} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 5.4, -6]}>
        <boxGeometry args={[20, 3.2, 10]} />
        <meshStandardMaterial {...mat('#d9d1c4', 0.68)} />
      </mesh>
      {wings.map((x) => (
        <group key={x}>
          <mesh castShadow position={[x, 5.4, -0.4]}>
            <boxGeometry args={[7.2, 3.2, 2.1]} />
            <meshPhysicalMaterial color="#17232c" roughness={0.12} metalness={0.55} clearcoat={0.8} />
          </mesh>
          <mesh position={[x, 5.4, 0.68]}>
            <planeGeometry args={[6.2, 2.35]} />
            <meshPhysicalMaterial color="#87b9cc" transmission={0.35} transparent opacity={0.75} roughness={0.08} />
          </mesh>
        </group>
      ))}
      <mesh castShadow position={[0, 7.2, -5.8]}>
        <boxGeometry args={[22, 0.35, 11.5]} />
        <meshStandardMaterial {...mat('#25292d', 0.36, 0.45)} />
      </mesh>
      <mesh castShadow position={[0, 4.0, 1.4]}>
        <boxGeometry args={[12, 0.32, 4.2]} />
        <meshStandardMaterial {...mat('#303337', 0.4, 0.4)} />
      </mesh>
      {[-4.9, -2.45, 0, 2.45, 4.9].map((x) => (
        <mesh key={x} castShadow position={[x, 2, 2]}>
          <cylinderGeometry args={[0.22, 0.26, 4, 22]} />
          <meshStandardMaterial color="#f0e8da" roughness={0.55} />
        </mesh>
      ))}
      <mesh position={[0, 1.8, 1.84]}>
        <boxGeometry args={[3.4, 3.6, 0.18]} />
        <meshPhysicalMaterial color="#34251d" roughness={0.3} metalness={0.2} clearcoat={0.7} />
      </mesh>
      {[-9, -4.8, 4.8, 9].map((x) => (
        <mesh key={x} position={[x, 2, 1.55]}>
          <planeGeometry args={[3.2, 2.2]} />
          <meshPhysicalMaterial color="#80afc0" transmission={0.25} transparent opacity={0.75} roughness={0.1} />
        </mesh>
      ))}
      <mesh receiveShadow position={[-14, 0.02, -2]}>
        <circleGeometry args={[6.5, 48]} />
        <meshStandardMaterial color="#989288" roughness={0.9} />
      </mesh>
      <EstateCar position={[-14, 0, -2]} color="#461c1c" rotation={0.4} />
      <EstateCar position={[-8, 0, 11]} color="#172d44" rotation={-0.15} />
      {[-25, -18, 22, 27].map((x, i) => <Palm key={x} position={[x, 0, i % 2 ? -13 : 14]} scale={1.35} />)}
      {[[-26, -21], [26, -21], [-26, 20], [26, 20]].map(([x, z], i) => (
        <mesh key={i} castShadow position={[x, 1.1, z]}>
          <boxGeometry args={[1.1, 2.2, 1.1]} />
          <meshStandardMaterial color="#d8d0c1" roughness={0.8} />
        </mesh>
      ))}
      <pointLight position={[0, 4, 4]} intensity={30} distance={32} color="#ffd7a0" />
    </group>
  );
}

function PlumbingWorld() {
  const c = SCENE_CENTERS.plumbing;
  return (
    <group position={c}>
      <mesh receiveShadow position={[0, -0.2, 0]}><cylinderGeometry args={[17, 19, 0.4, 64]} /><meshStandardMaterial color="#ced5d7" roughness={0.78} /></mesh>
      <mesh position={[0, 5, -5]}><boxGeometry args={[22, 10, 0.45]} /><meshStandardMaterial color="#e8ecea" roughness={0.82} /></mesh>
      {[-6, -3, 0, 3, 6].map((x, i) => (
        <group key={x}>
          <mesh castShadow position={[x, 4, -4.55]}><cylinderGeometry args={[0.32, 0.32, 8, 24]} /><meshStandardMaterial color={i % 2 ? '#e2554f' : '#3d91c7'} metalness={0.55} roughness={0.3} /></mesh>
          <mesh castShadow position={[x + 1.3, 7.8, -4.55]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.32, 0.32, 2.6, 24]} /><meshStandardMaterial color={i % 2 ? '#e2554f' : '#3d91c7'} metalness={0.55} roughness={0.3} /></mesh>
        </group>
      ))}
      <mesh castShadow position={[5, 1.1, 2]}><boxGeometry args={[5.5, 2.2, 3]} /><meshStandardMaterial color="#f7f6f1" roughness={0.35} /></mesh>
      <mesh position={[5, 2.28, 2]} rotation={[-Math.PI / 2, 0, 0]}><torusGeometry args={[0.7, 0.16, 20, 40]} /><meshStandardMaterial color="#b8c3c8" metalness={0.85} roughness={0.18} /></mesh>
      <mesh position={[5, 3.2, 2.6]}><torusGeometry args={[0.65, 0.1, 18, 36, Math.PI]} /><meshStandardMaterial color="#d8dde0" metalness={0.9} roughness={0.15} /></mesh>
      <pointLight position={[0, 8, 5]} intensity={35} distance={32} color="#ccecff" />
    </group>
  );
}

function HVACWorld() {
  const c = SCENE_CENTERS.hvac;
  const fan = useRef();
  useFrame((_, delta) => { if (fan.current) fan.current.rotation.z -= delta * 2.4; });
  return (
    <group position={c}>
      <mesh receiveShadow position={[0, -0.2, 0]}><cylinderGeometry args={[18, 20, 0.45, 64]} /><meshStandardMaterial color="#1d2935" roughness={0.8} /></mesh>
      <mesh castShadow position={[0, 4, 0]}><boxGeometry args={[13, 8, 5]} /><meshStandardMaterial color="#e8ecef" roughness={0.42} /></mesh>
      <group ref={fan} position={[0, 4, 2.6]}>
        {Array.from({ length: 7 }).map((_, i) => <mesh key={i} rotation={[0, 0, i * Math.PI * 2 / 7]} position={[0, 1.6, 0]}><capsuleGeometry args={[0.55, 2.3, 8, 18]} /><meshStandardMaterial color="#73818b" metalness={0.55} roughness={0.25} /></mesh>)}
        <mesh><cylinderGeometry args={[1, 1, 0.7, 32]} /><meshStandardMaterial color="#263441" metalness={0.75} roughness={0.2} /></mesh>
      </group>
      {[0, 1, 2, 3].map((i) => <mesh key={i} position={[0, 2 + i * 1.35, 3.2]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[6.8 + i * 1.3, 0.08, 12, 80]} /><meshBasicMaterial color="#73ddff" transparent opacity={0.22 - i * 0.035} /></mesh>)}
      <pointLight position={[0, 8, 6]} intensity={45} distance={35} color="#89dcff" />
    </group>
  );
}

function ElectricalWorld() {
  const c = SCENE_CENTERS.electrical;
  return (
    <group position={c}>
      <mesh receiveShadow position={[0, -0.2, 0]}><boxGeometry args={[34, 0.4, 27]} /><meshStandardMaterial color="#171a20" roughness={0.92} /></mesh>
      <mesh castShadow position={[0, 5, -6]}><boxGeometry args={[18, 10, 1]} /><meshStandardMaterial color="#303640" metalness={0.55} roughness={0.35} /></mesh>
      {Array.from({ length: 24 }).map((_, i) => {
        const x = -7.5 + (i % 6) * 3;
        const y = 1.5 + Math.floor(i / 6) * 2.1;
        const on = i % 4 !== 0;
        return <group key={i} position={[x, y, -5.4]}><mesh><boxGeometry args={[1.7, 1.15, 0.25]} /><meshStandardMaterial color="#15191e" metalness={0.4} roughness={0.5} /></mesh><mesh position={[0.45, 0, 0.17]}><sphereGeometry args={[0.1, 12, 10]} /><meshStandardMaterial color={on ? '#35ff8b' : '#ff554f'} emissive={on ? '#35ff8b' : '#ff554f'} emissiveIntensity={2.5} /></mesh></group>;
      })}
      {[-6, -3, 0, 3, 6].map((x, i) => <mesh key={x} position={[x, 0.06, 3]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[0.16, 16]} /><meshBasicMaterial color={i % 2 ? '#f0bd4c' : '#58a7ff'} /></mesh>)}
      <pointLight position={[0, 8, 4]} intensity={28} distance={32} color="#ffc75b" />
    </group>
  );
}

function SolarWorld() {
  const c = SCENE_CENTERS.solar;
  return (
    <group position={c}>
      <mesh receiveShadow position={[0, -0.2, 0]}><cylinderGeometry args={[25, 28, 0.45, 64]} /><meshStandardMaterial color="#9c845a" roughness={1} /></mesh>
      {[-9, -3, 3, 9].map((x) => [-7, 0, 7].map((z) => (
        <group key={`${x}-${z}`} position={[x, 2.2, z]} rotation={[-0.28, 0, 0]}>
          <mesh castShadow><boxGeometry args={[5, 0.16, 3.2]} /><meshStandardMaterial color="#0b3770" metalness={0.65} roughness={0.2} /></mesh>
          {[-1.65, 0, 1.65].map(g => <mesh key={g} position={[g, 0.1, 0]}><boxGeometry args={[0.04, 0.03, 3]} /><meshBasicMaterial color="#c7d9e6" /></mesh>)}
        </group>
      )))}
      <group position={[16, 2.8, 0]}>{[-3, 0, 3].map(x => <mesh key={x} castShadow position={[0, x, 0]}><boxGeometry args={[4, 2.5, 3]} /><meshStandardMaterial color="#e6e7e5" roughness={0.35} /></mesh>)}</group>
      <directionalLight position={[-10, 18, 10]} intensity={2.4} color="#fff0c2" />
    </group>
  );
}

function ProfessionalsWorld() {
  const c = SCENE_CENTERS.pros;
  return (
    <group position={c}>
      <mesh receiveShadow position={[0, -0.2, 0]}><cylinderGeometry args={[19, 21, 0.45, 64]} /><meshStandardMaterial color="#243229" roughness={0.9} /></mesh>
      {[-7, 0, 7].map((x, i) => (
        <group key={x} position={[x, 0, 0]} scale={2.4}>
          <Artisan position={[0, 0, 0]} />
          <mesh position={[0, 1.1, -0.8]}><torusGeometry args={[1.25, 0.035, 12, 64]} /><meshBasicMaterial color={i === 1 ? '#e9b558' : '#68d391'} /></mesh>
        </group>
      ))}
      {[-7, 0, 7].map((x, i) => <group key={x} position={[x, 7, -1]}><mesh><circleGeometry args={[1.35, 40]} /><meshStandardMaterial color="#14251c" emissive="#1f7a4a" emissiveIntensity={0.7} /></mesh><mesh position={[0, 0, 0.06]} rotation={[0, 0, -0.2]}><torusGeometry args={[0.55, 0.13, 16, 40, Math.PI * 1.4]} /><meshBasicMaterial color="#8ff0b6" /></mesh></group>)}
      <pointLight position={[0, 10, 5]} intensity={38} distance={38} color="#c5ffdb" />
    </group>
  );
}

function VaultWorld() {
  const c = SCENE_CENTERS.escrow;
  const rings = useRef();
  useFrame((_, delta) => { if (rings.current) rings.current.rotation.y += delta * 0.28; });
  return (
    <group position={c}>
      <mesh receiveShadow position={[0, -0.25, 0]}><cylinderGeometry args={[18, 21, 0.5, 64]} /><meshStandardMaterial color="#17140f" metalness={0.3} roughness={0.62} /></mesh>
      <group position={[0, 0, 0]} scale={5}><EscrowVault /></group>
      <group ref={rings} position={[-1, 6, -4]}>
        {[4.5, 6.2, 8].map((r, i) => <mesh key={r} rotation={[Math.PI / 2 + i * 0.35, i * 0.5, 0]}><torusGeometry args={[r, 0.07, 12, 90]} /><meshBasicMaterial color="#e9b558" transparent opacity={0.5 - i * 0.1} /></mesh>)}
      </group>
      <pointLight position={[0, 10, 6]} intensity={50} distance={38} color="#ffcf70" />
    </group>
  );
}

function LagosNeighborhood() {
  const c = SCENE_CENTERS.neighborhood;
  const buildings = Array.from({ length: 42 }, (_, i) => ({
    x: (i % 7) * 8 - 24,
    z: Math.floor(i / 7) * 9 - 24,
    h: 3 + ((i * 7) % 9),
    color: ['#d5c6ad', '#c87f58', '#9aa9ad', '#dfd8c8'][i % 4],
  }));
  return (
    <group position={c}>
      <mesh receiveShadow position={[0, -0.3, 0]}><boxGeometry args={[72, 0.5, 65]} /><meshStandardMaterial color="#53633c" roughness={1} /></mesh>
      <mesh position={[31, 0, 0]}><boxGeometry args={[10, 0.12, 65]} /><meshStandardMaterial color="#2585a7" roughness={0.25} /></mesh>
      <mesh position={[0, 0.01, 0]}><boxGeometry args={[7, 0.12, 65]} /><meshStandardMaterial color="#25292c" roughness={0.9} /></mesh>
      {buildings.map((b, i) => <group key={i} position={[b.x, 0, b.z]}><mesh castShadow position={[0, b.h / 2, 0]}><boxGeometry args={[5.7, b.h, 6.2]} /><meshStandardMaterial color={b.color} roughness={0.82} /></mesh>{[1.5, 3.4, 5.3].filter(y => y < b.h).map(y => <mesh key={y} position={[0, y, 3.12]}><planeGeometry args={[3.8, 0.7]} /><meshBasicMaterial color="#ffdaa0" /></mesh>)}</group>)}
      {[-26, -14, 14, 26].map(z => <Palm key={z} position={[24, 0, z]} scale={1.1} />)}
      <pointLight position={[0, 18, 8]} intensity={55} distance={80} color="#ffc787" />
    </group>
  );
}

function DaylightLandscape() {
  const portals = [
    [30, -11, -0.35], [80, -40, -0.35], [130, -45, 0.35],
    [180, -53, -0.35], [230, -55, 0.35], [282, -58, -0.35], [345, -88, 0.3],
  ];
  return (
    <group>
      {/* One continuous world replaces the former floating dark islands. */}
      <mesh receiveShadow position={[190, -0.72, -50]}>
        <boxGeometry args={[470, 0.8, 150]} />
        <meshStandardMaterial color="#7f9b69" roughness={0.98} />
      </mesh>
      <mesh receiveShadow position={[190, -0.27, -48]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[445, 9]} />
        <meshStandardMaterial color="#d9d0bd" roughness={0.9} />
      </mesh>
      {/* White sculptural portals echo the reference video's Spline helix. */}
      {portals.map(([x, z, turn], i) => (
        <group key={i} position={[x, 0, z]} rotation={[0, turn, 0]}>
          {Array.from({ length: 11 }).map((_, j) => {
            const a = Math.PI * (j / 10);
            return (
              <mesh
                key={j}
                castShadow
                position={[Math.cos(a) * 7.5, Math.sin(a) * 7.5, 0]}
                rotation={[0, 0, a - Math.PI / 2]}
              >
                <capsuleGeometry args={[0.32, 2.4, 8, 16]} />
                <meshPhysicalMaterial color="#fffdf7" roughness={0.22} clearcoat={0.65} />
              </mesh>
            );
          })}
        </group>
      ))}
    </group>
  );
}

export default function CinematicWorlds() {
  return (
    <>
      <DaylightLandscape />
      <MansionEstate />
      <PlumbingWorld />
      <HVACWorld />
      <ElectricalWorld />
      <SolarWorld />
      <ProfessionalsWorld />
      <VaultWorld />
      <LagosNeighborhood />
    </>
  );
}
