import React, { useState, useEffect } from 'react';

export default function OverlayUI() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/10 z-50">
        <div 
          className="h-full bg-gradient-to-r from-brass-300 to-brass-500 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 32 32">
              <path d="M16 3l9 3.4V13c0 5.6-3.9 9.6-9 12.4C10.9 22.6 7 18.6 7 13V6.4L16 3z" fill="#e9b558"/>
            </svg>
            <span className="font-semibold text-[#faf7f0]">HandyTrust</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
            <a href="#features" className="hover:text-white/100 transition">Features</a>
            <a href="#how-it-works" className="hover:text-white/100 transition">How It Works</a>
            <a href="#pricing" className="hover:text-white/100 transition">Pricing</a>
          </nav>
          <button className="px-6 py-2 rounded-full bg-gradient-to-b from-brass-300 to-brass-500 text-black font-semibold text-sm hover:shadow-lg hover:shadow-brass-500/30 transition">
            Get Started
          </button>
        </div>
      </header>

      {/* Scroll Hint */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <div className="text-center">
          <div className="text-xs text-white/50 mb-2">SCROLL TO EXPLORE</div>
          <div className="ht-scroll-hint">
            <svg width="20" height="32" viewBox="0 0 20 32" fill="none" className="mx-auto">
              <path d="M10 2V22M3 15L10 22L17 15" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Right Rail Navigation */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                scrollProgress > (i * 25) ? 'bg-brass-500' : 'bg-white/20 hover:bg-white/40'
              }`}
              onClick={() => {
                window.scrollTo({
                  top: (window.innerHeight * 4 * i) / 4,
                  behavior: 'smooth'
                });
              }}
            />
          ))}
        </div>
      </div>

      {/* Scroll Content Sections */}
      <div className="relative z-10 w-full">
        {/* Hero Section */}
        <section className="h-screen flex items-center justify-center relative">
          <div className="text-center max-w-2xl mx-auto px-6">
            <div className="brand-mark justify-center">ESCROW-BACKED HOME MAINTENANCE</div>
            <h1 className="font-display text-6xl md:text-7xl text-[#faf7f0] mb-6 leading-tight">
              Fix it now.<br />Pay when it's done.
            </h1>
            <p className="text-lg text-white/70 mb-8 leading-relaxed">
              Verified plumbers, electricians, AC and solar professionals. Transparent pricing. Zero risk. Available across Nigeria.
            </p>
            <button className="beat-btn text-base px-8 py-3">
              Book Your Professional →
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="min-h-screen py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-5xl text-[#faf7f0] mb-20 text-center">How HandyTrust Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  num: '01',
                  title: 'Connect',
                  desc: 'Book a verified professional instantly. No haggling, transparent rates.'
                },
                {
                  num: '02',
                  title: 'Protect',
                  desc: 'Your payment is held in escrow until work is approved and complete.'
                },
                {
                  num: '03',
                  title: 'Verify',
                  desc: 'Inspect the work. Only then does the professional get paid.'
                }
              ].map((item, i) => (
                <div key={i} className="beat-card">
                  <div className="text-4xl font-display text-brass-500 mb-4">{item.num}</div>
                  <h3 className="text-xl font-semibold text-[#faf7f0] mb-3">{item.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="min-h-screen py-20 px-6 flex items-center justify-center">
          <div className="text-center max-w-2xl">
            <h2 className="font-display text-5xl text-[#faf7f0] mb-8">Ready to experience the future of home maintenance?</h2>
            <button className="beat-btn text-base px-8 py-3">
              Start Your Journey →
            </button>
          </div>
        </section>
      </div>
    </>
  );
}