import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// --- IMPORT YOUR LOGO HERE ---
 //import carLogo from '../../assets/car logo.png'; 
import wheelLogo from '../../assets/wheel logo.png';
//import thirdLogo from '../../assets/third logo.png';

export function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [, setScrolled] = useState(false);
  const [logoHover, setLogoHover] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => setIsMobileMenuOpen(false);

  const getLinkClass = (path: string) => {
    const isActive = location.pathname === path;
    const baseClass = "relative px-5 py-2 text-sm font-bold transition-all duration-300";
    
    if (isActive) {
      return `${baseClass} text-white before:absolute before:bottom-0 before:left-0 before:w-full before:h-1 before:bg-gradient-to-r before:from-indigo-500 before:to-cyan-500 before:rounded-t`;
    }
    return `${baseClass} text-slate-300 hover:text-white hover:before:absolute hover:before:bottom-0 hover:before:left-0 hover:before:w-full hover:before:h-0.5 hover:before:bg-slate-300 hover:before:rounded-t hover:before:transition-all hover:before:duration-300`;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-slate-900/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          
          {/* --- LOGO SECTION --- */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
            onClick={handleLinkClick}
            onMouseEnter={() => setLogoHover(true)}
            onMouseLeave={() => setLogoHover(false)}
          >
            {/* UPDATED LOGO CONTAINER: 
                Removed the background gradients and box shadows.
                Kept the sizing wrapper.
            */}
            <div className="relative w-12 h-12 flex items-center justify-center">
              <img 
                src={wheelLogo} 
                alt="DrivePoint Logo" 
                // Transferred animations (scale & rotate) directly to the image
                className={`
                  w-12 h-12 object-contain drop-shadow-md 
                  transition-all duration-500 ease-out
                  ${logoHover ? 'scale-110 -rotate-6' : ''}
                `}
              />
            </div>
            
            {/* Text Label */}
            <div className="flex flex-col">
              <div className="flex items-baseline">
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent leading-none group-hover:from-indigo-500 group-hover:to-cyan-400 transition-all duration-300">
                  DRIVE
                </span>
                <span className="text-xl font-bold text-white ml-0.5 leading-none transition-colors duration-300">
                  POINT
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-xs font-medium text-slate-400 tracking-wider group-hover:text-slate-300 transition-colors duration-300">
                  LOGISTICS
                </span>
              </div>
            </div>
          </Link>

          {/* --- DESKTOP NAVIGATION --- */}
          <div className="hidden md:flex items-center space-x-1 p-0">
            <Link to="/" className={getLinkClass('/')}><span className="relative z-10">HOME</span></Link>
            <Link to="/fleet" className={getLinkClass('/fleet')}><span className="relative z-10">OUR FLEET</span></Link>
            <Link to="/contact" className={getLinkClass('/contact')}><span className="relative z-10">CONTACT</span></Link>
          </div>

          {/* --- ACTION BUTTONS --- */}
          <div className="hidden md:flex items-center space-x-3">
            <Link 
              to="/contact"
              className="px-6 py-2.5 rounded-lg font-semibold text-sm bg-gradient-to-r from-indigo-600 to-cyan-600 text-white hover:shadow-lg hover:shadow-cyan-600/30 transition-all duration-300 hover:scale-105"
            >
              Get Quote
            </Link>
          </div>

          {/* --- MOBILE BUTTON --- */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`w-10 h-10 flex items-center justify-center rounded-lg text-white focus:outline-none transition-all duration-300 border border-white/20 hover:border-white/40 ${
                isMobileMenuOpen ? 'bg-white/10' : ''
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* --- MOBILE MENU --- */}
        <div className={`fixed inset-x-0 top-24 md:hidden transition-all duration-500 transform ${
          isMobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-10 pointer-events-none'
        }`}>
          <div className="mx-6">
            <div className="bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-lg border border-white/10 p-1">
              <div className="p-5 space-y-1">
                <Link to="/" onClick={handleLinkClick} className="block p-3 rounded-xl hover:bg-white/5 font-bold text-slate-200">Home</Link>
                <Link to="/fleet" onClick={handleLinkClick} className="block p-3 rounded-xl hover:bg-white/5 font-bold text-slate-200">Our Fleet</Link>
                <Link to="/contact" onClick={handleLinkClick} className="block p-3 rounded-xl hover:bg-white/5 font-bold text-slate-200">Contact</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}