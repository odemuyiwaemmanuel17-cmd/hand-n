import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Stars } from '@react-three/drei';
import CameraRig from './CameraRig.jsx';
import BeatOverlay from './BeatOverlay.jsx';
import CinematicWorlds from './CinematicWorlds.jsx';
import { openBooking } from '../store.js';

function Meta({ items }) {
  return <div className="beat-meta">{items.map((item, i) => <React.Fragment key={item}>{i > 0 && <span className="beat-dot" />}<span>{item}</span></React.Fragment>)}</div>;
}

function Scene() {
  return (
    <>
      <CameraRig />
      <CinematicWorlds />

      <BeatOverlay index={0} position={[0, 11, 8]} rotation={[-0.08, 0.45, 0]} scale={1.35} width={590}>
        <div className="beat-hero">
          <span className="brand-mark">◆ HandyTrust Estates</span>
          <h1 className="beat-title">Exceptional homes deserve exceptional care.</h1>
          <p className="beat-sub">Trusted maintenance for every room, system and outdoor space—protected by escrow from booking to sign-off.</p>
          <Meta items={['Verified professionals', 'Escrow protected', '90-day warranty']} />
          <p className="beat-sub" style={{ marginTop: 14, marginBottom: 0, fontSize: 12 }}>↓ Scroll to enter the experience ↓</p>
        </div>
      </BeatOverlay>

      <BeatOverlay index={1} position={[60, 7.5, -15]} rotation={[0, 0.35, 0]} scale={0.72} width={350}>
        <span className="beat-kicker">01 · Plumbing studio</span>
        <h2 className="beat-title">Every connection, expertly handled.</h2>
        <p className="beat-sub">Travel inside a full-scale pipe network where leaks, pressure and fixtures become visible—and every repair is verified.</p>
        <button className="beat-btn" onClick={() => openBooking('plumbing')}>Find a verified plumber →</button>
        <Meta items={['Same-day response', 'Certified parts']} />
      </BeatOverlay>

      <BeatOverlay index={2} position={[110, 8, -43]} rotation={[0, 0.35, 0]} scale={0.72} width={350}>
        <span className="beat-kicker">02 · Climate laboratory</span>
        <h2 className="beat-title">Comfort, engineered.</h2>
        <p className="beat-sub">An exploded HVAC system reveals airflow, fan mechanics and cooling performance before a technician restores the room.</p>
        <button className="beat-btn" onClick={() => openBooking('ac')}>Book an HVAC expert →</button>
        <Meta items={['Deep service', 'Cooling guarantee']} />
      </BeatOverlay>

      <BeatOverlay index={3} position={[160, 8, -23]} rotation={[0, 0.35, 0]} scale={0.72} width={350}>
        <span className="beat-kicker">03 · Electrical systems</span>
        <h2 className="beat-title">Safety you can see.</h2>
        <p className="beat-sub">Follow the illuminated circuits through a precision switchboard as faults are isolated, repaired and live-tested.</p>
        <button className="beat-btn" onClick={() => openBooking('electrical')}>Find an electrician →</button>
        <Meta items={['Licensed & insured', 'Full safety test']} />
      </BeatOverlay>

      <BeatOverlay index={4} position={[211, 9, -53]} rotation={[-0.08, 0.4, 0]} scale={0.78} width={360}>
        <span className="beat-kicker">04 · Solar landscape</span>
        <h2 className="beat-title">Power across the whole estate.</h2>
        <p className="beat-sub">Move over a dedicated solar field with tier-1 arrays, hybrid inverters and intelligent lithium storage.</p>
        <button className="beat-btn" onClick={() => openBooking('solar')}>Design my solar system →</button>
        <Meta items={['Free load audit', '24/7 monitoring']} />
      </BeatOverlay>

      <BeatOverlay index={5} position={[260, 8, -27]} rotation={[0, 0.35, 0]} scale={0.76} width={360}>
        <span className="beat-kicker">05 · Verified professionals</span>
        <h2 className="beat-title">Trust has a face.</h2>
        <p className="beat-sub">Meet background-checked, skill-tested and insured professionals whose work is rated after every completed job.</p>
        <button className="beat-btn" onClick={() => openBooking('pros')}>Explore professionals →</button>
        <Meta items={['ID verified', 'Skill tested', 'Insured']} />
      </BeatOverlay>

      <BeatOverlay index={6} position={[315, 9, -58]} rotation={[0, 0.35, 0]} scale={0.78} width={360}>
        <span className="beat-kicker">06 · Escrow chamber</span>
        <h2 className="beat-title">Your money stays protected.</h2>
        <p className="beat-sub">Funds remain locked in the HandyTrust vault and are released only when the finished work earns your approval.</p>
        <button className="beat-btn" onClick={() => openBooking('escrow')}>See how escrow works →</button>
        <Meta items={['100% protected', 'You approve release']} />
      </BeatOverlay>

      <BeatOverlay index={7} position={[392, 25, -70]} rotation={[-0.15, 0.45, 0]} scale={1.75} width={620}>
        <div className="beat-hero">
          <span className="brand-mark">◆ Lagos, connected</span>
          <h2 className="beat-title">Dependable help for every home.</h2>
          <p className="beat-sub">From a single mansion to an entire city, HandyTrust connects households with reliable local professionals.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="beat-btn" onClick={() => openBooking('general')}>Book a Service</button>
            <button className="beat-btn-ghost" onClick={() => openBooking('artisan')}>Become an Artisan</button>
          </div>
          <Meta items={['Lagos', 'Ibadan', 'Abuja']} />
        </div>
      </BeatOverlay>
    </>
  );
}

export default function ScrollytellingExperience() {
  return (
    <div className="absolute inset-0 h-full w-full">
      <Canvas
        shadows
        dpr={[1, 1.6]}
        camera={{ fov: 47, near: 0.1, far: 1000, position: [30, 18, 32] }}
        gl={{ antialias: true, powerPreference: 'high-performance', toneMapping: 4, toneMappingExposure: 1.05 }}
      >
        <color attach="background" args={['#071018']} />
        <fog attach="fog" args={['#071018', 110, 430]} />
        <ambientLight intensity={0.42} color="#dbe8ff" />
        <hemisphereLight args={['#87a8c8', '#24301f', 0.8]} />
        <directionalLight
          position={[-40, 55, 30]}
          intensity={2.2}
          color="#ffd0a3"
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-left={-45}
          shadow-camera-right={45}
          shadow-camera-top={45}
          shadow-camera-bottom={-45}
          shadow-camera-near={1}
          shadow-camera-far={130}
          shadow-bias={-0.0003}
        />
        <Stars radius={500} depth={120} count={3600} factor={4} saturation={0.2} fade speed={0.35} />
        <Suspense fallback={null}>
          <ScrollControls pages={8} damping={0.24}>
            <Scene />
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
