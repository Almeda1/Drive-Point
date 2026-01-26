import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // 1. Added Import
import { Navbar } from '../../components/layout'; 

// --- 1. LOCAL IMAGE IMPORTS ---
import escaladeImg from '../../assets/escalade.png';
import velarImg from '../../assets/velar.png';
import hiluxImg from '../../assets/hilux.png';
import gx460Img from '../../assets/gx460.png';
import gwagonImg from '../../assets/gwagon.png';
import camrySportImg from '../../assets/camry-sport.png';
import pradoImg from '../../assets/prado.png';
import urusImg from '../../assets/urus.png';
import corollaImg from '../../assets/corolla.png';
import gle53Img from '../../assets/gle53.png';
import landcruiserImg from '../../assets/landcruiser.png';
import rx350Img from '../../assets/rx350.png';
import gls450Img from '../../assets/gls450.png';
import lx570Img from '../../assets/lx570.png';
import gs4Img from '../../assets/gac-gs4.png';
import sprinterImg from '../../assets/sprinter.png';
import roverImg from '../../assets/rangerover.png';
import vintageImg from '../../assets/vintage.png';
import granvia25Img from '../../assets/granvia-2025.png';
import granvia24Img from '../../assets/granvia-2024.png';

// --- FLEET DATA ---
const FLEET_DATA = [
  { id: 1, name: "Cadillac Escalade", category: "Luxury SUV", image: escaladeImg, seats: "7 Seats", transmission: "Auto", status: "Available" },
  { id: 2, name: "Range Rover Velar", category: "Luxury SUV", image: velarImg, seats: "5 Seats", transmission: "Auto", status: "Available" },
  { id: 3, name: "Toyota Hilux", category: "Truck/Pickup", image: hiluxImg, seats: "5 Seats", transmission: "4x4 Manual", status: "In Use" },
  { id: 4, name: "Lexus GX 460", category: "Luxury SUV", image: gx460Img, seats: "7 Seats", transmission: "Auto", status: "Available" },
  { id: 5, name: "Mercedes G63 AMG", category: "Luxury SUV", image: gwagonImg, seats: "5 Seats", transmission: "Auto", status: "Reserved" },
  { id: 6, name: "Camry Sport", category: "Sedan", image: camrySportImg, seats: "5 Seats", transmission: "Auto", status: "Available" },
  { id: 7, name: "Prado SUV", category: "SUV", image: pradoImg, seats: "7 Seats", transmission: "Auto", status: "Available" },
  { id: 8, name: "Lamborghini Urus", category: "Exotic", image: urusImg, seats: "4 Seats", transmission: "Auto", status: "Maintenance" },
  { id: 9, name: "Corolla Sport", category: "Sedan", image: corollaImg, seats: "5 Seats", transmission: "Auto", status: "Available" },
  { id: 10, name: "Mercedes GLE 53", category: "Luxury SUV", image: gle53Img, seats: "5 Seats", transmission: "Auto", status: "Available" },
  { id: 11, name: "Land Cruiser", category: "SUV", image: landcruiserImg, seats: "7 Seats", transmission: "Auto", status: "Available" },
  { id: 12, name: "Lexus RX 350", category: "SUV", image: rx350Img, seats: "5 Seats", transmission: "Auto", status: "Available" },
  { id: 13, name: "Mercedes GLS 450", category: "Luxury SUV", image: gls450Img, seats: "7 Seats", transmission: "Auto", status: "Available" },
  { id: 14, name: "Lexus LX 570", category: "Armored", image: lx570Img, seats: "7 Seats", transmission: "Bullet-Proof", status: "Request Only" },
  { id: 15, name: "GAC GS4", category: "SUV", image: gs4Img, seats: "5 Seats", transmission: "Auto", status: "Available" },
  { id: 16, name: "Mercedes Sprinter Bus", category: "Bus / Van", image: sprinterImg, seats: "14 Seats", transmission: "Manual", status: "Available" },
  { id: 17, name: "Range Rover", category: "Luxury SUV", image: roverImg, seats: "5 Seats", transmission: "Auto", status: "Available" },
  { id: 18, name: "Vintage Cars", category: "Classic", image: vintageImg, seats: "2-4 Seats", transmission: "Manual", status: "Events Only" },
  { id: 19, name: "2025 GAC Granvia", category: "Van / MPV", image: granvia25Img, seats: "7 Seats", transmission: "Auto", status: "Pre-Order" },
  { id: 20, name: "2024 GAC Granvia", category: "Van / MPV", image: granvia24Img, seats: "7 Seats", transmission: "Auto", status: "Available" }
];

const CATEGORIES = ["All", "Luxury SUV", "SUV", "Sedan", "Exotic", "Truck/Pickup", "Van / MPV", "Armored", "Classic"];

// --- BOOKING MODAL (With Animation) ---
function BookingModal({ vehicle, onClose }: { vehicle: any, onClose: () => void }) {
  const [formData, setFormData] = useState({ name: '', phone: '', date: '', notes: '' });
  const [isVisible, setIsVisible] = useState(false);

  // Trigger animation on mount
  useEffect(() => {
    if (vehicle) {
      // Small timeout ensures the class transition triggers after render
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer);
    }
  }, [vehicle]);

  if (!vehicle) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rawMessage = `Hello, I would like to book the *${vehicle.name}*.\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Date Needed:* ${formData.date}\n*Notes:* ${formData.notes}`;
    const encodedMessage = encodeURIComponent(rawMessage);
    window.open(`https://wa.me/2347015502629?text=${encodedMessage}`, '_blank');
    onClose();
  };

  const handleClose = () => {
    setIsVisible(false);
    // Wait for animation to finish before unmounting
    setTimeout(onClose, 300);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop with Fade */}
      <div 
        className={`absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity duration-300 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      ></div>

      {/* Modal with Scale & Slide */}
      <div 
        className={`
          relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col max-h-[90vh]
          transform transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
          ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}
        `}
      >
        
        {/* Header */}
        <div className="shrink-0 bg-gradient-to-r from-indigo-900/50 to-slate-900 p-4 border-b border-slate-700 flex justify-between items-center rounded-t-2xl">
          <div>
            <p className="text-cyan-400 text-[10px] font-bold uppercase tracking-wider">Request Booking</p>
            <h3 className="text-lg font-bold text-white truncate pr-4">{vehicle.name}</h3>
          </div>
          <button onClick={handleClose} className="p-1 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-3 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 text-xs font-medium mb-1">Name</label>
              <input 
                required
                type="text" 
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                placeholder="John"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-slate-400 text-xs font-medium mb-1">Phone</label>
              <input 
                required
                type="tel" 
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                placeholder="080..."
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 text-xs font-medium mb-1">Pick-up Date</label>
            <input 
              required
              type="date" 
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors [color-scheme:dark]"
              onChange={(e) => setFormData({...formData, date: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-slate-400 text-xs font-medium mb-1">Notes (Optional)</label>
            <textarea 
              rows={2}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
              placeholder="Any special requests..."
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
            ></textarea>
          </div>

          <button type="submit" className="w-full py-3 mt-1 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold text-sm hover:shadow-lg hover:shadow-cyan-500/20 transition-all active:scale-95 flex items-center justify-center gap-2">
            <span>Send via WhatsApp</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
          
          <p className="text-center text-[10px] text-slate-500">
            Opens WhatsApp to finalize booking details.
          </p>
        </form>
      </div>
    </div>
  );
}

// --- MAIN PAGE COMPONENT ---
export function FleetPage() {
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    window.scrollTo(0, 0);
    return () => clearTimeout(timer);
  }, []);

  const filteredFleet = activeCategory === "All" 
    ? FLEET_DATA 
    : FLEET_DATA.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30">
      
      <Navbar />

      {/* Background Ambiance */}
      <div className={`fixed inset-0 z-0 pointer-events-none overflow-hidden transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[120px] mix-blend-screen"></div>
      </div>

      <div className="relative z-10 pt-32 pb-20 px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Hero Header */}
        <div className={`text-center mb-16 space-y-4 transform transition-all duration-1000 ease-out ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/50 border border-slate-700 backdrop-blur-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Live Inventory</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
            Our Premium <br className="md:hidden" />
            <span className="bg-gradient-to-r from-indigo-500 via-cyan-400 to-indigo-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Vehicle Collection
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed">
            From bullet-proof security to exotic luxury, explore the fleet that defines elegance and reliability.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className={`flex flex-wrap justify-center gap-2 mb-12 transform transition-all duration-1000 delay-150 ease-out ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 border
                ${activeCategory === cat 
                  ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white border-transparent shadow-lg shadow-cyan-900/20 scale-105' 
                  : 'bg-slate-900/40 text-slate-400 border-slate-800 hover:border-slate-600 hover:text-white hover:bg-slate-800'
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFleet.map((vehicle, index) => (
            <div 
              key={vehicle.id}
              onMouseEnter={() => setHoveredCard(vehicle.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`
                group relative bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden
                transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] 
                hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 hover:z-20
                ${mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}
              `}
              style={{ transitionDelay: `${200 + (index * 50)}ms` }}
            >
              <div className="relative h-56 overflow-hidden">
                <div className="absolute top-3 right-3 z-10">
                    <span className={`
                      px-3 py-1 rounded-lg text-xs font-bold backdrop-blur-md border border-white/10 shadow-lg
                      ${vehicle.status === 'Available' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'}
                    `}>
                      {vehicle.status}
                    </span>
                </div>
                
                <img 
                  src={vehicle.image} 
                  alt={vehicle.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-80"></div>
              </div>

              <div className="p-6 relative">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{vehicle.name}</h3>
                    <p className="text-sm text-slate-500 font-medium">{vehicle.category}</p>
                  </div>
                </div>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-4"></div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="text-sm text-slate-300">{vehicle.seats}</span>
                  </div>
                  <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm text-slate-300">{vehicle.transmission}</span>
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedVehicle(vehicle)}
                  className="w-full py-3 rounded-xl font-bold text-sm bg-slate-800 text-white border border-slate-700 hover:bg-white hover:text-slate-900 transition-all duration-300 group-hover:border-cyan-500/30 flex items-center justify-center gap-2"
                >
                  Book This Vehicle
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>

              <div 
                className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/20 via-transparent to-cyan-500/20 opacity-0 transition-opacity duration-500 pointer-events-none ${hoveredCard === vehicle.id ? 'opacity-100' : ''}`} 
              />
            </div>
          ))}
        </div>
        
        {filteredFleet.length === 0 && (
           <div className={`text-center py-20 transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
             <p className="text-slate-500 text-lg">No vehicles found in this category.</p>
           </div>
        )}
      </div>

      <div className={`border-t border-white/10 bg-slate-900/50 backdrop-blur-md py-12 transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Don't see what you're looking for?</h2>
            <p className="text-slate-400 mb-8">We have access to an extended network of exclusive vehicles.</p>
            {/* 2. Changed Button to Link */}
            <Link 
                to="/contact" 
                className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold hover:shadow-lg hover:shadow-cyan-600/30 transition-all hover:scale-105"
            >
                Contact for Special Request
            </Link>
          </div>
      </div>

      <BookingModal 
        vehicle={selectedVehicle} 
        onClose={() => setSelectedVehicle(null)} 
      />
      
    </div>
  );
}