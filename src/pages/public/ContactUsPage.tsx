import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components/layout'; 

// --- ICONS ---
const WhatsAppIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.017-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
);
const PhoneIcon = () => (
  <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);
const MailIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);
const MailIconLarge = () => (
    <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);
const MapPinIcon = () => (
  <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const CheckCircleIcon = () => (
  <svg className="w-16 h-16 text-cyan-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export function ContactUsPage() {
  const [mounted, setMounted] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '', // Brought back
    phone: '',
    serviceType: '',
    message: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [lastAction, setLastAction] = useState<'whatsapp' | 'email' | null>(null);

  useEffect(() => {
    document.title = "Contact | DrivePoint Luxury";
    window.scrollTo(0, 0);
    setTimeout(() => setMounted(true), 100);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.fullName || !formData.email || !formData.message) {
      setErrorMessage("Please complete all required fields (Name, Email, Message).");
      setStatus('error');
      return false;
    }
    return true;
  };

  // --- HANDLER: WHATSAPP ---
  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus('loading');
    setLastAction('whatsapp');
    
    const whatsappMessage = `*New Contact Request from Website*\n\n` +
        `*Name:* ${formData.fullName}\n` +
        `*Email:* ${formData.email}\n` +
        `*Phone:* ${formData.phone || 'Not provided'}\n` +
        `*Interest:* ${formData.serviceType || 'General Inquiry'}\n\n` +
        `*Message:*\n${formData.message}`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    setTimeout(() => {
        window.open(`https://wa.me/2347015502629?text=${encodedMessage}`, '_blank');
        setStatus('success');
        setErrorMessage('');
        setFormData({ fullName: '', email: '', phone: '', serviceType: '', message: '' });
    }, 1000);
  };

  // --- HANDLER: EMAIL ---
  const handleEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus('loading');
    setLastAction('email');

    const subject = `Inquiry: ${formData.serviceType || 'General Request'} - ${formData.fullName}`;
    const body = `Name: ${formData.fullName}\n` +
                 `Email: ${formData.email}\n` +
                 `Phone: ${formData.phone || 'N/A'}\n\n` +
                 `Message:\n${formData.message}`;

    setTimeout(() => {
        // "mailto" opens the default mail client with fields pre-filled
        window.location.href = `mailto:tejirioscar5@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setStatus('success');
        setErrorMessage('');
        setFormData({ fullName: '', email: '', phone: '', serviceType: '', message: '' });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      <Navbar />

      <div className={`fixed inset-0 z-0 pointer-events-none overflow-hidden transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px] mix-blend-screen"></div>
      </div>

      <main id="main-content" className="relative z-10 pt-32 pb-24 px-6 lg:px-8">
        
        {/* Header Section */}
        <div className={`max-w-7xl mx-auto text-center mb-16 transition-all duration-1000 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/50 border border-slate-700 backdrop-blur-sm mb-6">
             <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
             <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">24/7 Concierge</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight">
            Start Your <span className="bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent">Journey</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            From bespoke itineraries to last-minute supercar reservations, our dedicated team is ready to fulfill your request with precision and discretion.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* --- LEFT COLUMN: INFO CARDS --- */}
          <div className="lg:col-span-2 space-y-6">
            
            <div 
              className={`bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-indigo-500/30 transition-all duration-700 group ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors shrink-0">
                  <PhoneIcon />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">Direct Line</h3>
                  <p className="text-slate-400 text-sm mb-3">Priority support for bookings.</p>
                  <a href="tel:+2347015502629" className="text-xl font-semibold text-white hover:text-cyan-400 transition-colors tracking-wide">
                    +234 701 550 2629
                  </a>
                </div>
              </div>
            </div>

            <div 
              className={`bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-indigo-500/30 transition-all duration-700 group ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
              style={{ transitionDelay: '300ms' }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors shrink-0">
                  <MailIconLarge />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">Concierge Email</h3>
                  <p className="text-slate-400 text-sm mb-3">For corporate or complex requests.</p>
                  <a href="mailto:tejirioscar5@gmail.com" className="text-lg font-semibold text-white hover:text-cyan-400 transition-colors">
                    tejirioscar5@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div 
              className={`bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 transition-all duration-700 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
              style={{ transitionDelay: '400ms' }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center shrink-0">
                  <MapPinIcon />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Headquarters</h3>
                  <p className="text-slate-400 text-sm mt-1">100 Luxury Lane, Beverly Hills, CA 90210</p>
                </div>
              </div>
              <div className="border-t border-white/5 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Mon - Fri</span>
                  <span className="text-white font-medium">8:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Weekend</span>
                  <span className="text-white font-medium">9:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>

          </div>

          {/* --- RIGHT COLUMN: DUAL ACTION FORM --- */}
          <div className={`lg:col-span-3 transition-all duration-1000 ease-out delay-500 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
              
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

              {status === 'success' ? (
                <div className="text-center py-16 animate-[fadeIn_0.5s_ease-out]">
                  <CheckCircleIcon />
                  <h2 className="text-3xl font-bold text-white mb-4">
                    {lastAction === 'whatsapp' ? 'Opening WhatsApp...' : 'Opening Mail App...'}
                  </h2>
                  <p className="text-slate-400 max-w-md mx-auto mb-8">
                    {lastAction === 'whatsapp' 
                        ? "Please press the 'Send' button in WhatsApp to finalize your inquiry." 
                        : "We have prepared a draft in your email client. Please review and hit Send."}
                  </p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="px-6 py-3 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
                  >
                    Send Another Request
                  </button>
                </div>
              ) : (
                <form className="space-y-6 relative z-10">
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Full Name</label>
                      <input 
                        required
                        type="text" 
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-700"
                        placeholder="John Doe"
                      />
                    </div>

                    {/* Email - BROUGHT BACK */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Email Address</label>
                      <input 
                        required
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-700"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Phone Number</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-700"
                        placeholder="+234 701 550 2629"
                      />
                    </div>

                    {/* Service Type */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Interest</label>
                      <div className="relative">
                        <select 
                          name="serviceType"
                          value={formData.serviceType}
                          onChange={handleChange}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all appearance-none"
                        >
                          <option value="">Select Service</option>
                          <option value="Rental">Self-Drive Rental</option>
                          <option value="Chauffeur">Chauffeur Service</option>
                          <option value="Event">Wedding / Event</option>
                          <option value="Corporate">Corporate Fleet</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Message Details</label>
                    <textarea 
                      required
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-700 resize-none"
                      placeholder="Please specify dates, vehicle preference, or special requirements..."
                    ></textarea>
                  </div>

                  {/* Error Message */}
                  {status === 'error' && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 animate-bounce">
                      <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span className="text-red-400 text-sm">{errorMessage}</span>
                    </div>
                  )}

                  {/* --- ACTION BUTTONS --- */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    
                    {/* BUTTON 1: WHATSAPP */}
                    <button 
                      type="button" // Important: type="button" prevents standard submit
                      onClick={handleWhatsApp}
                      disabled={status === 'loading'}
                      className="py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white font-bold text-lg shadow-lg shadow-green-600/20 hover:shadow-green-600/40 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                    >
                      {status === 'loading' && lastAction === 'whatsapp' ? (
                        <span className="animate-pulse">Loading...</span>
                      ) : (
                        <>
                          <span>Via WhatsApp</span>
                          <WhatsAppIcon />
                        </>
                      )}
                    </button>

                    {/* BUTTON 2: EMAIL */}
                    <button 
                      type="button"
                      onClick={handleEmail}
                      disabled={status === 'loading'}
                      className="py-4 rounded-xl border border-indigo-500/30 bg-slate-800/50 hover:bg-indigo-600 hover:border-indigo-500 text-white font-bold text-lg shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/30 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                    >
                      {status === 'loading' && lastAction === 'email' ? (
                         <span className="animate-pulse">Loading...</span>
                      ) : (
                        <>
                          <span>Via Email</span>
                          <MailIcon />
                        </>
                      )}
                    </button>
                    
                  </div>
                  
                  <p className="text-xs text-slate-500 text-center mt-2">
                    Both options will open the respective app on your device to send the message.
                  </p>

                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}