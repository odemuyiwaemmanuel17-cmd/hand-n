import React from 'react';

// Minimal placeholder - remove Three.js complexity for faster load
export default function ScrollytellingExperience() {
  return (
    <div className="fixed inset-0 w-full h-full bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]">
      {/* Simple gradient background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brass-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brass-300/10 rounded-full blur-3xl" />
      </div>
      
      {/* Simple scroll indicator */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="h-[400vh]" />
      </div>
    </div>
  );
}
