// ---------------------------------------------------------------------------
// HandyTrust — single source of truth for the 3D scrollytelling timeline,
// services, artisans and escrow copy.
// ---------------------------------------------------------------------------

// 8-beat camera timeline. Each keyframe is [x, y, z] in world units.
// Tuned for the dollhouse-style Nigerian residence built in src/components.
export const CAMERA_KEYFRAMES = [
  { pos: [30, 18, 32], lookAt: [0, 3, -2], fov: 47 }, // 0 Mansion estate
  { pos: [66, 10, -3], lookAt: [55, 3.5, -25], fov: 43 }, // 1 Plumbing studio
  { pos: [117, 10, -30], lookAt: [105, 4, -55], fov: 42 }, // 2 HVAC lab
  { pos: [168, 10, -10], lookAt: [155, 4, -35], fov: 42 }, // 3 Electrical room
  { pos: [220, 16, -38], lookAt: [205, 3, -70], fov: 48 }, // 4 Solar field
  { pos: [268, 11, -15], lookAt: [255, 3.5, -40], fov: 42 }, // 5 Verified pros hub
  { pos: [323, 11, -47], lookAt: [309, 4, -76], fov: 40 }, // 6 Escrow chamber
  { pos: [416, 38, -42], lookAt: [380, 3, -100], fov: 57 }, // 7 Lagos reveal
];

export const BEATS = [
  { id: 'entry', label: 'Welcome' },
  { id: 'plumbing', label: 'Plumbing' },
  { id: 'ac', label: 'AC Repair' },
  { id: 'electrical', label: 'Electrical' },
  { id: 'solar', label: 'Solar' },
  { id: 'pros', label: 'Verified Pros' },
  { id: 'escrow', label: 'Escrow' },
  { id: 'book', label: 'Get Started' },
];

export const SERVICES = {
  plumbing: {
    name: 'Plumbing',
    tagline: 'Leaks, blockages & fittings',
    price: '₦7,500',
    unit: 'starting price',
    eta: 'Same-day in Ibadan',
    desc: 'A verified plumber diagnoses the fault on arrival and confirms an upfront, fixed quote before touching a single pipe.',
    includes: [
      'In-home diagnosis & fixed upfront quote',
      'Certified parts with receipts',
      '90-day workmanship warranty',
      'Free re-visit if the fault returns',
    ],
  },
  ac: {
    name: 'AC Repair & Servicing',
    tagline: 'Split units, cassettes & chillers',
    price: '₦12,000',
    unit: 'full service',
    eta: 'Same-day in Lagos & Ibadan',
    desc: 'Deep chemical wash, gas top-up with gauge readings, and electrical checks — cooling restored or you pay nothing.',
    includes: [
      'Indoor + outdoor deep service',
      'Gas pressure check & top-up option',
      'Thermostat & drainage calibration',
      '30-day cooling guarantee',
    ],
  },
  electrical: {
    name: 'Electrical',
    tagline: 'Panels, wiring & faults',
    price: '₦8,000',
    unit: 'starting price',
    eta: 'Emergency callouts available',
    desc: 'Licensed electricians for distribution boards, rewiring, and stubborn faults — tested live and certified safe.',
    includes: [
      'Full safety & load inspection',
      'Genuine breakers & accessories',
      'Live testing before sign-off',
      '90-day workmanship warranty',
    ],
  },
  solar: {
    name: 'Solar & Inverter',
    tagline: 'Design, install & maintain',
    price: '₦15,000',
    unit: 'site assessment (waived on install)',
    eta: 'Assessment within 48 hours',
    desc: 'Load-matched solar + inverter systems sized for your actual consumption — no guesswork, no oversized quotes.',
    includes: [
      'Load audit & shade analysis',
      'Tier-1 panels & lithium storage',
      'Remote monitoring setup',
      '2-year installation warranty',
    ],
  },
  general: {
    name: 'General Repairs',
    tagline: 'Painting, masonry, cleaning & more',
    price: '₦6,000',
    unit: 'starting price',
    eta: 'Next-day availability',
    desc: 'One booking for everything else — painting, tiling, carpentry, deep cleaning and generator servicing.',
    includes: [
      'Background-checked professionals',
      'Photo-documented before & after',
      'Escrow protection on every job',
      '90-day workmanship warranty',
    ],
  },
};

export const ARTISANS = [
  { name: 'Adebayo O.', trade: 'plumbing', label: 'Master Plumber', city: 'Ibadan', rating: 4.9, jobs: 212, years: 7, color: '#38bdf8' },
  { name: 'Chidi E.', trade: 'electrical', label: 'Licensed Electrician', city: 'Lagos', rating: 4.8, jobs: 340, years: 9, color: '#fbbf24' },
  { name: 'Fatima B.', trade: 'ac', label: 'AC Specialist', city: 'Abuja', rating: 4.9, jobs: 187, years: 6, color: '#7dd3fc' },
  { name: 'Tunde A.', trade: 'solar', label: 'Solar Engineer', city: 'Ibadan', rating: 5.0, jobs: 96, years: 8, color: '#4ade80' },
  { name: 'Emeka N.', trade: 'general', label: 'Painter & Mason', city: 'Lagos', rating: 4.7, jobs: 265, years: 11, color: '#f472b6' },
  { name: 'Aisha K.', trade: 'general', label: 'Deep-Clean Lead', city: 'Abuja', rating: 4.9, jobs: 158, years: 5, color: '#c084fc' },
];

export const ESCROW_STEPS = [
  {
    t: 'Fund escrow',
    d: 'Your payment moves into the HandyTrust vault — never straight to the artisan.',
  },
  {
    t: 'Work gets done',
    d: 'The artisan completes the job. You inspect and approve with photos.',
  },
  {
    t: 'Money releases',
    d: 'Funds release instantly on approval. Warranty stays active for 90 days.',
  },
];

export const TRADES = ['Plumbing', 'Electrical', 'AC & Refrigeration', 'Solar & Inverter', 'Painting', 'Masonry', 'Carpentry', 'Cleaning', 'Generator'];
