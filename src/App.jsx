import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DemoScenarioBar from './components/DemoScenarioBar';
import EmergencyModal from './components/EmergencyModal';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import WorkerProfile from './pages/WorkerProfile';
import BookingPage from './pages/BookingPage';
import CustomerDashboard from './pages/CustomerDashboard';
import WorkerDashboard from './pages/WorkerDashboard';
import WorkerWelfare from './pages/WorkerWelfare';
import WorkerRegistration from './pages/WorkerRegistration';
import AdminDashboard from './pages/AdminDashboard';
import ImpactReport from './pages/ImpactReport';

function MainLayout() {
  const { emergencyModalOpen, setEmergencyModalOpen } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-coop-200 selection:text-coop-900">
      {/* 1. Hackathon Judge & Demo Scenario Bar */}
      <DemoScenarioBar />

      {/* 2. Global Cooperative Header & Navigation */}
      <Navbar />

      {/* 3. Main View Routes */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/worker/:id" element={<WorkerProfile />} />
          <Route path="/book/:id" element={<BookingPage />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="/worker-dashboard" element={<WorkerDashboard />} />
          <Route path="/worker-welfare" element={<WorkerWelfare />} />
          <Route path="/worker-register" element={<WorkerRegistration />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/impact" element={<ImpactReport />} />
        </Routes>
      </main>

      {/* 4. Global 1-Click Emergency SOS Modal */}
      <EmergencyModal
        isOpen={emergencyModalOpen}
        onClose={() => setEmergencyModalOpen(false)}
      />

      {/* 5. Footer with Cooperative Credentials & Helpline */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Router>
        <MainLayout />
      </Router>
    </AppProvider>
  );
}
