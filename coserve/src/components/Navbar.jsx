import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Users,
  ShieldCheck,
  Zap,
  Bell,
  Globe,
  Menu,
  X,
  AlertCircle,
  Briefcase,
  Layers,
  HeartHandshake,
  TrendingUp,
  Award
} from 'lucide-react';

export default function Navbar() {
  const {
    role,
    setRole,
    language,
    setLanguage,
    t,
    notifications,
    setEmergencyModalOpen,
    pendingWorkers
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const unreadNotifs = notifications.filter(n => !n.read).length;

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    if (newRole === 'admin') navigate('/admin');
    else if (newRole === 'worker') navigate('/worker-dashboard');
    else navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Top Cooperative Gov & Fair Wage Banner */}
      <div className="bg-slate-900 text-slate-200 px-4 py-1.5 text-xs font-medium flex flex-wrap justify-between items-center border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-coop-600 text-white">
            GOVT RECOGNIZED
          </span>
          <span className="hidden sm:inline">
            Affiliated with UP Labour Cooperative Federation & NCR Sahakari Samiti
          </span>
          <span className="sm:hidden">Cooperative Gig Platform</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-coop-300">
            <ShieldCheck className="w-3.5 h-3.5 text-coop-400" />
            <span className="hidden md:inline">80% Direct Worker Payout + ₹5L Health Cover</span>
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-1 border-l border-slate-700 pl-3">
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer"
            >
              <option value="en" className="text-slate-900">English</option>
              <option value="hi" className="text-slate-900">हिंदी (Hindi)</option>
              <option value="hinglish" className="text-slate-900">Hinglish</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-coop-700 to-coop-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-1">
                  Co<span className="text-coop-600">Serve</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-coop-100 text-coop-800 px-1.5 py-0.5 rounded ml-1">
                    Co-op
                  </span>
                </span>
                <p className="text-[10px] text-slate-500 font-medium leading-none hidden sm:block">
                  Trusted Local Services. Fair Work.
                </p>
              </div>
            </Link>
          </div>

          {/* Central Role Selector Pills */}
          <div className="hidden lg:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-inner">
            <button
              onClick={() => handleRoleChange('customer')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                role === 'customer'
                  ? 'bg-white text-coop-800 shadow-sm border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>{t('customer')}</span>
            </button>

            <button
              onClick={() => handleRoleChange('worker')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                role === 'worker'
                  ? 'bg-white text-coop-800 shadow-sm border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>{t('worker')}</span>
            </button>

            <button
              onClick={() => handleRoleChange('admin')}
              className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                role === 'admin'
                  ? 'bg-white text-coop-800 shadow-sm border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t('admin')}</span>
              {pendingWorkers.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] flex items-center justify-center font-bold">
                  {pendingWorkers.length}
                </span>
              )}
            </button>
          </div>

          {/* Navigation Links according to Role */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/' ? 'text-coop-700 font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t('home')}
            </Link>

            <Link
              to="/services"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/services' ? 'text-coop-700 font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t('services')}
            </Link>

            {role === 'customer' && (
              <Link
                to="/customer-dashboard"
                className={`text-sm font-medium transition-colors ${
                  location.pathname === '/customer-dashboard' ? 'text-coop-700 font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t('myBookings')}
              </Link>
            )}

            {role === 'worker' && (
              <>
                <Link
                  to="/worker-dashboard"
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === '/worker-dashboard' ? 'text-coop-700 font-semibold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t('dashboard')}
                </Link>
                <Link
                  to="/worker-welfare"
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === '/worker-welfare' ? 'text-coop-700 font-semibold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t('welfare')}
                </Link>
              </>
            )}

            {role === 'admin' && (
              <Link
                to="/admin"
                className={`text-sm font-medium transition-colors ${
                  location.pathname === '/admin' ? 'text-coop-700 font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t('admin')}
              </Link>
            )}

            <Link
              to="/impact"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/impact' ? 'text-coop-700 font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t('coopImpact')}
            </Link>
          </nav>

          {/* Right Action Cluster: Emergency SOS + Notifications + Worker Join */}
          <div className="flex items-center gap-3">
            {/* Emergency SOS Button */}
            <button
              onClick={() => setEmergencyModalOpen(true)}
              className="relative inline-flex items-center gap-1.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-md emergency-pulse transition-all transform hover:scale-105"
            >
              <Zap className="w-3.5 h-3.5 animate-bounce" />
              <span>{t('emergency')}</span>
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 relative transition-colors"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifs > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-coop-600 rounded-full ring-2 ring-white animate-pulse" />
                )}
              </button>

              {/* Notification Popover */}
              {notifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-elevated border border-slate-200 p-4 z-50">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Live Federation Updates
                    </h4>
                    <span className="text-[11px] bg-coop-100 text-coop-800 px-2 py-0.5 rounded-full font-semibold">
                      {notifications.length} updates
                    </span>
                  </div>
                  <div className="max-h-64 overflow-y-auto space-y-2.5 pr-1">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:bg-coop-50/50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-900">{n.title}</span>
                          <span className="text-[10px] text-slate-400">{n.time}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Worker Onboard CTA */}
            {role !== 'worker' && (
              <Link
                to="/worker-register"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-coop-700 bg-coop-50 hover:bg-coop-100 border border-coop-200 px-3 py-2 rounded-xl transition-colors"
              >
                <Award className="w-3.5 h-3.5" />
                <span>Join as Worker</span>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-5 space-y-3">
          {/* Mobile Role Switcher */}
          <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => { handleRoleChange('customer'); setMobileMenuOpen(false); }}
              className={`py-1.5 text-center text-xs font-bold rounded-lg ${
                role === 'customer' ? 'bg-white text-coop-700 shadow-sm' : 'text-slate-600'
              }`}
            >
              Customer
            </button>
            <button
              onClick={() => { handleRoleChange('worker'); setMobileMenuOpen(false); }}
              className={`py-1.5 text-center text-xs font-bold rounded-lg ${
                role === 'worker' ? 'bg-white text-coop-700 shadow-sm' : 'text-slate-600'
              }`}
            >
              Worker
            </button>
            <button
              onClick={() => { handleRoleChange('admin'); setMobileMenuOpen(false); }}
              className={`py-1.5 text-center text-xs font-bold rounded-lg ${
                role === 'admin' ? 'bg-white text-coop-700 shadow-sm' : 'text-slate-600'
              }`}
            >
              Admin
            </button>
          </div>

          <div className="space-y-1">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-100"
            >
              {t('home')}
            </Link>
            <Link
              to="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-100"
            >
              {t('services')}
            </Link>
            <Link
              to="/customer-dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-100"
            >
              Customer Bookings
            </Link>
            <Link
              to="/worker-dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-100"
            >
              Worker Dashboard
            </Link>
            <Link
              to="/worker-welfare"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-100"
            >
              Worker Welfare & Shield
            </Link>
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-100"
            >
              Cooperative Admin Panel
            </Link>
            <Link
              to="/worker-register"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-coop-700 bg-coop-50"
            >
              Register as Cooperative Worker
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
