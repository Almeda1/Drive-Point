import { useLayoutEffect } from 'react'; 
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer'; 

export function MainLayout() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  // 2. USE useLayoutEffect
  // This fires synchronously before the browser repaints the screen.
  useLayoutEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Optional if you remove CSS smooth scroll, but good safety
    });
  }, [location.pathname]);

  return (
    // Updated: bg-slate-950 (Darker Theme) | selection:bg-indigo-500/30 (Theme Accent)
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30 flex flex-col">
      <Navbar />
      
      {/* Updated Padding: 
          Increased from pt-20 to 'pt-24 md:pt-32' to match the spacious 
          design system used in the Contact and Fleet pages.
      */}
      <main className={`relative w-full flex-grow ${isLandingPage ? '' : 'pt-24 md:pt-32'}`}>
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
}