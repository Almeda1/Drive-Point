import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components';
import { 
  LandingPage, 
  ContactUsPage, 
  FleetPage 
} from './pages';

function AppRoutes() {
  // REMOVED: const { isAuthenticated, isAdmin } = useAuth(); 
  // We don't need to check auth state anymore.

  return (
    <Routes>
      {/* --- MAIN APP ROUTES WITH NAVBAR/LAYOUT --- */}
      <Route element={<MainLayout />}>
        
        {/* Public Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Fleet Page */}
        <Route path="/fleet" element={<FleetPage />} />

        {/* Contact Us */}
        <Route path="/contact" element={<ContactUsPage />} />

        {/* 404 Page */}
        <Route
          path="*"
          element={
            <div className="text-center py-12">
              <span className="text-6xl mb-4 block">🔍</span>
              <h2 className="text-2xl font-bold text-gray-900">Page Not Found</h2>
              <p className="text-gray-600">The page you're looking for doesn't exist.</p>
            </div>
          }
        />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      {/* REMOVED: <AuthProvider> wrapper */}
        <AppRoutes />
      {/* REMOVED: </AuthProvider> */}
    </BrowserRouter>
  );
}

export default App;