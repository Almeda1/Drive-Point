import React from 'react';
import { Link } from 'react-router-dom';

// ❌ OLD IMPORT REMOVED
// import wheelLogo from '../../assets/wheel logo.png';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-12 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              
              {/* --- LOGO UPDATE START --- */}
              <div className="relative w-12 h-12 flex items-center justify-center">
                <img 
                  // ✅ UPDATED: Points directly to public folder
                  src="/wheel-logo.png" 
                  alt="DrivePoint Logo" 
                  className="w-12 h-12 object-contain hover:scale-110 transition-transform duration-300"
                />
              </div>
              {/* --- LOGO UPDATE END --- */}
              
              <div className="flex flex-col">
                 <div className="flex items-baseline">
                    <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent leading-none">
                      DRIVE
                    </span>
                    <span className="text-xl font-bold text-white ml-0.5 leading-none">
                      POINT
                    </span>
                 </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-500">
              Premium logistics and fleet management. Experience the journey, redefined with precision tracking.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Services</h3>
            <ul className="space-y-2 text-sm font-medium">
              <li><Link to="/book" className="hover:text-cyan-400 transition-colors">Book a Ride</Link></li>
              <li><Link to="/fleet" className="hover:text-cyan-400 transition-colors">Our Fleet</Link></li>
              <li><Link to="/history" className="hover:text-cyan-400 transition-colors">My Trips</Link></li>
              <li><Link to="/business" className="hover:text-cyan-400 transition-colors">Corporate Accounts</Link></li>
            </ul>
          </div>

          {/* Legal/Support */}
          <div>
            <h3 className="text-white font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-sm font-medium">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Safety Protocols</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm font-medium">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                support@drivepoint.com
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                +234 800 DRIVE PT
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Lagos, Nigeria
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600">
          <p>&copy; {currentYear} DrivePoint Logistics. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
             <a href="#" className="hover:text-cyan-400 transition-colors">Twitter</a>
             <a href="#" className="hover:text-cyan-400 transition-colors">Instagram</a>
             <a href="#" className="hover:text-cyan-400 transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}