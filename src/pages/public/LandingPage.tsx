import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/layout'; 

// --- ICONS ---
const DiamondIcon = () => (
  <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const CarIcon = () => (
  <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l2-2h10l2 2v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-1H9v1a1 1 0 01-1 1H6a1 1 0 01-1-1v-6z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 14a1 1 0 100 2 1 1 0 000-2zm10 0a1 1 0 100 2 1 1 0 000-2z" />
  </svg>
);

// --- DATA ---
const TESTIMONIALS = [
  {
    text: "The booking process was seamless, and the Porsche 911 was in pristine condition. Highly recommended!",
    name: "James Wilson",
    role: "Weekend Getaway",
    initials: "JW"
  },
  {
    text: "Exceptional chauffeur service. The S-Class was immaculate and the driver was incredibly professional.",
    name: "Elena Rodriguez",
    role: "Business Traveler",
    initials: "ER"
  },
  {
    text: "DrivePoint saved our wedding day with a last-minute vintage convertible. Truly outstanding service.",
    name: "Marcus Chen",
    role: "Wedding Client",
    initials: "MC"
  }
];

const SERVICES = [
    {
      title: "Self-Drive Rental",
      desc: "Take control of the world's most prestigious vehicles for your personal adventures.",
      features: ["Supercars", "Luxury SUVs", "Convertibles"],
      iconPath: "M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
    },
    {
      title: "Chauffeur Service",
      desc: "Sit back and relax while our professional chauffeurs navigate the city for you.",
      features: ["Airport Transfers", "Corporate Events", "City Tours"],
      iconPath: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    },
    {
      title: "Wedding & Events",
      desc: "Make a grand entrance with our curated collection of classic and modern luxury cars.",
      features: ["Vintage Classics", "Decoration", "Photography"],
      iconPath: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
    }
];

export function LandingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Small timeout ensures the browser paints before we trigger the transition
    const timer = setTimeout(() => setMounted(true), 50);
    document.title = "DrivePoint | Luxury Car Rental";
    return () => clearTimeout(timer);
  }, []);

  const smoothScrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Helper for Cinematic Reveal Classes
  // Uses: Blur removal + Slide Up + Scale Up
  const getRevealClass = (delay: string) => `
    transform transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] 
    ${delay}
    ${mounted ? 'opacity-100 translate-y-0 scale-100 blur-0' : 'opacity-0 translate-y-12 scale-95 blur-sm'}
  `;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Background Ambiance (Fades in slowly) */}
      <div className={`fixed inset-0 z-0 pointer-events-none overflow-hidden transition-opacity duration-[2000ms] ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[120px] mix-blend-screen"></div>
      </div>

      <main id="main-content" className="relative z-10 pt-32">
        
        {/* --- HERO SECTION --- */}
        <section className="relative px-6 lg:px-8 mb-24">
          <div className="max-w-7xl mx-auto text-center">
            
            {/* Pill Label */}
            <div className={getRevealClass('delay-100')}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/50 border border-slate-700 backdrop-blur-sm mb-6">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
                <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase">Premium Fleet Available</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className={`text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight text-white ${getRevealClass('delay-200')}`}>
              Drive the <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-indigo-500 via-cyan-400 to-indigo-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                Extraordinary
              </span>
            </h1>

            {/* Subtext */}
            <p className={`text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed ${getRevealClass('delay-300')}`}>
              Experience the thrill of the world's most exclusive vehicles. 
              From Italian supercars to German engineering, the road is yours to command.
            </p>

            {/* Buttons */}
            <div className={`flex flex-col sm:flex-row gap-5 justify-center items-center ${getRevealClass('delay-500')}`}>
              <button 
                onClick={() => smoothScrollTo('services')} 
                className="group px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-cyan-600 hover:shadow-lg hover:shadow-cyan-600/30 transition-all hover:scale-105 flex items-center gap-2"
              >
                Our Services
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
              </button>

              <Link 
                to="/fleet" 
                className="px-8 py-4 rounded-xl bg-slate-900 text-slate-200 font-semibold border border-slate-700 hover:bg-slate-800 hover:text-white hover:border-slate-500 transition-all"
              >
                View Fleet
              </Link>
            </div>
          </div>

          {/* Stats Grid - Staggered Reveal */}
          <div className={`max-w-7xl mx-auto mt-24 ${getRevealClass('delay-700')}`}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {[
                { value: "500+", label: "Happy Clients", icon: <DiamondIcon /> },
                { value: "50+", label: "Luxury Cars", icon: <CarIcon /> },
                { value: "24/7", label: "Concierge", icon: <ShieldCheckIcon /> },
                { value: "4.9", label: "Average Rating", icon: <StarIcon /> }
              ].map((stat, i) => (
                <div key={i} className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:border-indigo-500/30 transition-all hover:-translate-y-1 group">
                  <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-slate-500 text-sm font-bold uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SERVICES SECTION --- */}
        <section id="services" className="py-24 relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                Our <span className="text-indigo-400">Services</span>
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                Whether for business or pleasure, we offer a range of premium services to meet your needs.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {SERVICES.map((service, index) => (
                <div key={index} className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-slate-800/80 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10 group">
                  <div className="w-14 h-14 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:bg-indigo-500/20 transition-colors">
                    <svg className="w-7 h-7 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={service.iconPath} />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">{service.title}</h3>
                  <p className="text-slate-400 mb-6 text-sm leading-relaxed">{service.desc}</p>
                  
                  <div className="h-px w-full bg-white/5 mb-6"></div>

                  <ul className="space-y-3">
                    {service.features.map((f, i) => (
                      <li key={i} className="flex items-center text-sm text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mr-2 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
        </section>

        {/* --- TESTIMONIALS --- */}
        <section id="testimonials" className="py-24 px-6 lg:px-8 bg-slate-900/30 border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-white">Client Stories</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t, index) => (
                <div key={index} className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 relative hover:border-slate-600 transition-colors">
                   {/* Decorative Quote */}
                   <div className="absolute top-6 right-8 text-6xl text-indigo-500/20 font-serif leading-none select-none">"</div>
                   
                   <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-indigo-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                  </div>
                  <p className="text-slate-300 italic mb-6 text-sm leading-7 relative z-10">{t.text}</p>
                  <div className="flex items-center mt-auto">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-cyan-600 flex items-center justify-center font-bold text-white text-xs mr-3 shadow-lg">
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">{t.name}</p>
                      <p className="text-xs text-slate-500 uppercase tracking-wider">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="py-20 px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden p-1 group">
              {/* Animated Border Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-cyan-500 to-indigo-600 opacity-50 blur-lg group-hover:opacity-75 transition-opacity duration-500 animate-gradient bg-[length:200%_auto]"></div>
              
              <div className="relative bg-slate-900 rounded-[22px] px-8 py-16 md:px-16 text-center border border-white/10">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Drive?</h2>
                <p className="text-slate-400 mb-10 max-w-xl mx-auto text-lg">
                  Book your dream car today and experience the ultimate in luxury and performance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    to="/contact" 
                    className="px-10 py-4 rounded-xl bg-slate-200 text-slate-900 font-bold hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                  >
                    Book Now
                  </Link>
                  <button 
                      onClick={() => window.location.href = 'tel:+2347015502629'}
                      className="px-10 py-4 rounded-xl border border-slate-700 text-white font-semibold hover:bg-slate-800 transition-colors"
                  >
                    Call Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}