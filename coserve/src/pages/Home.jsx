import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Search,
  MapPin,
  Zap,
  ShieldCheck,
  Heart,
  Sparkles,
  Users,
  Award,
  ArrowRight,
  Droplet,
  Flame,
  Hammer,
  Paintbrush,
  HeartHandshake,
  Trees,
  Car,
  Wrench,
  TrendingUp,
  CheckCircle2,
  PhoneCall,
  Clock
} from 'lucide-react';
import AiMatchBadge from '../components/AiMatchBadge';

export default function Home() {
  const {
    categories,
    workers,
    setEmergencyModalOpen,
    setActiveEmergencyCategory,
    userLocation,
    t
  } = useApp();

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(userLocation.name);

  // Icon mapping for categories
  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Zap': return Zap;
      case 'Droplet': return Droplet;
      case 'Hammer': return Hammer;
      case 'Sparkles': return Sparkles;
      case 'Paintbrush': return Paintbrush;
      case 'HeartHandshake': return HeartHandshake;
      case 'Trees': return Trees;
      case 'Car': return Car;
      case 'Wrench': return Wrench;
      default: return Wrench;
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/services?q=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/services');
    }
  };

  const handleCategoryClick = (catId) => {
    navigate(`/services?cat=${catId}`);
  };

  const handleEmergencyClick = (catId = 'plumber') => {
    setActiveEmergencyCategory(catId);
    setEmergencyModalOpen(true);
  };

  // Top featured cooperative workers for live preview
  const featuredWorkers = workers.slice(0, 3);

  return (
    <div className="space-y-16 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-coop-50/70 via-white to-slate-50 pt-12 pb-20 border-b border-slate-200/60">
        <div className="absolute inset-0 bg-[radial-gradient(#16a34a_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            {/* Top Cooperative Gov Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-coop-100 text-coop-800 text-xs font-bold shadow-sm border border-coop-200 animate-fadeIn">
              <ShieldCheck className="w-4 h-4 text-coop-600" />
              <span>{t('heroBadge')}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              {t('heroTitle')}
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              {t('heroSubtitle')}
            </p>

            {/* Search & Location Bar */}
            <div className="pt-2">
              <form
                onSubmit={handleSearchSubmit}
                className="bg-white p-2 sm:p-3 rounded-2xl sm:rounded-3xl shadow-card border border-slate-200/80 flex flex-col sm:flex-row items-center gap-2"
              >
                {/* Location Select */}
                <div className="flex items-center gap-2 px-3 py-2 border-b sm:border-b-0 sm:border-r border-slate-200 w-full sm:w-auto shrink-0 text-slate-700 text-xs font-semibold">
                  <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="bg-transparent focus:outline-none cursor-pointer text-slate-800 text-xs"
                  >
                    <option value="Indirapuram, Ghaziabad (Shipra Sun City)">📍 Indirapuram, Ghaziabad</option>
                    <option value="Sector 62, Noida">📍 Sector 62, Noida</option>
                    <option value="Vaishali Sector 4, Ghaziabad">📍 Vaishali, Ghaziabad</option>
                    <option value="Crossings Republik, Ghaziabad">📍 Crossings Republik</option>
                    <option value="Vasundhara, Ghaziabad">📍 Vasundhara, Ghaziabad</option>
                  </select>
                </div>

                {/* Service Input */}
                <div className="flex items-center gap-2 px-3 py-2 w-full text-slate-700">
                  <Search className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('searchPlaceholder')}
                    className="w-full text-xs sm:text-sm bg-transparent focus:outline-none placeholder:text-slate-400"
                  />
                </div>

                {/* Search CTA */}
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-coop-600 hover:bg-coop-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 shrink-0"
                >
                  <Search className="w-4 h-4" />
                  <span>{t('findServiceBtn')}</span>
                </button>
              </form>
            </div>

            {/* Quick Emergency Action Ribbon */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => handleEmergencyClick('plumber')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 text-white text-xs sm:text-sm font-bold shadow-md emergency-pulse hover:scale-105 transition-all"
              >
                <Zap className="w-4 h-4 animate-bounce" />
                <span>{t('bookEmergencyBtn')}</span>
              </button>

              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white text-slate-700 hover:text-coop-700 text-xs sm:text-sm font-semibold border border-slate-200 hover:border-coop-300 shadow-sm transition-all"
              >
                <span>Browse All Verified Workers</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICE CATEGORIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-coop-700">
              Cooperative Trades Directory
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Explore Household & Community Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              All professionals are vetted by registered Labour Cooperative Federations.
            </p>
          </div>
          <Link
            to="/services"
            className="text-xs font-bold text-coop-700 hover:text-coop-800 flex items-center gap-1 shrink-0"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {categories.map((cat) => {
            const Icon = getCategoryIcon(cat.icon);
            return (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className="group relative bg-white p-4 rounded-2xl border border-slate-200/80 hover:border-coop-500 shadow-soft hover:shadow-elevated transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-coop-50 group-hover:bg-coop-600 text-coop-700 group-hover:text-white flex items-center justify-center transition-colors mb-3 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-coop-700 transition-colors">
                      {cat.name}
                    </h3>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium text-[11px]">Starts at</span>
                  <span className="font-extrabold text-coop-700">₹{cat.basePrice}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. AI-POWERED SMART MATCH HIGHLIGHT (Problem Statement Section 9) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-elevated border border-slate-800 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-coop-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-6 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-coop-500/20 text-coop-300 border border-coop-500/40">
                <Sparkles className="w-3.5 h-3.5" />
                AI Smart Matching Engine
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                Instantly Matched with the Best Nearby Cooperative Tradesperson
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                CoServe’s AI evaluates real-time proximity, skill certifications, availability, and customer satisfaction to rank top cooperative workers transparently.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-coop-400 text-xs font-bold block mb-1">📍 Dynamic Proximity</span>
                  <p className="text-[11px] text-slate-300">Under 15 mins response time in Ghaziabad & Noida</p>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-coop-400 text-xs font-bold block mb-1">📜 Labour Co-op Vetted</span>
                  <p className="text-[11px] text-slate-300">Zero unverified or arbitrary third-party workers</p>
                </div>
              </div>
            </div>

            {/* Preview AI Match Card */}
            <div className="lg:col-span-6">
              <div className="bg-white text-slate-900 p-5 rounded-2xl shadow-elevated border border-slate-200 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs font-bold text-coop-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-coop-600" />
                    Top AI Recommendation For Indirapuram
                  </span>
                  <span className="text-xs font-black bg-coop-100 text-coop-800 px-2.5 py-0.5 rounded-full">
                    96% Match
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=400&q=80"
                    alt="Ramesh Kumar"
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-coop-500"
                  />
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Ramesh Kumar</h3>
                    <p className="text-xs text-coop-700 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-coop-600" />
                      Verified Master Plumber (15 yrs exp)
                    </p>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <span>⭐ 4.9 (148 reviews)</span>
                      <span>•</span>
                      <span className="font-bold text-slate-700">📍 1.4 km away</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1.5 text-slate-700">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-coop-600" />
                    <span>Nearest available worker with fastest arrival (~12 mins)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-coop-600" />
                    <span>Member of Ghaziabad Shramik Sahakari Samiti</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Direct Payout</span>
                    <span className="text-lg font-black text-coop-700">₹249 <span className="text-xs text-slate-500 font-normal">/ visit</span></span>
                  </div>
                  <button
                    onClick={() => navigate('/worker/w-1')}
                    className="px-4 py-2 bg-coop-600 hover:bg-coop-700 text-white font-bold rounded-xl text-xs shadow-md transition-colors"
                  >
                    View Full Profile & Book
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE COSERVE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-coop-700">
            Cooperative Advantage
          </span>
          <h2 className="text-3xl font-black text-slate-900 mt-1">
            {t('whyChooseTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            {t('whyChooseSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-soft hover:shadow-card transition-all">
            <div className="w-12 h-12 rounded-xl bg-coop-100 text-coop-700 flex items-center justify-center font-bold mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">{t('usp1Title')}</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{t('usp1Desc')}</p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-soft hover:shadow-card transition-all">
            <div className="w-12 h-12 rounded-xl bg-coop-100 text-coop-700 flex items-center justify-center font-bold mb-4">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">{t('usp2Title')}</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{t('usp2Desc')}</p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-soft hover:shadow-card transition-all">
            <div className="w-12 h-12 rounded-xl bg-coop-100 text-coop-700 flex items-center justify-center font-bold mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">{t('usp3Title')}</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{t('usp3Desc')}</p>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-soft hover:shadow-card transition-all">
            <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">{t('usp4Title')}</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{t('usp4Desc')}</p>
          </div>

          {/* Card 5 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-soft hover:shadow-card transition-all">
            <div className="w-12 h-12 rounded-xl bg-coop-100 text-coop-700 flex items-center justify-center font-bold mb-4">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">{t('usp5Title')}</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{t('usp5Desc')}</p>
          </div>

          {/* Card 6 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-soft hover:shadow-card transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">{t('usp6Title')}</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{t('usp6Desc')}</p>
          </div>
        </div>
      </section>

      {/* 5. LIVE COMMUNITY IMPACT TICKER */}
      <section className="bg-coop-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-coop-300">
              Measurable Community Value
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              CoServe Federation Impact in NCR
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <span className="text-3xl sm:text-4xl font-black text-coop-400 block mb-1">₹1.48 Cr+</span>
              <span className="text-xs text-slate-300">Direct Fair Wages Disbursed</span>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <span className="text-3xl sm:text-4xl font-black text-coop-400 block mb-1">1,580+</span>
              <span className="text-xs text-slate-300">Verified Co-op Members</span>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <span className="text-3xl sm:text-4xl font-black text-coop-400 block mb-1">₹18.5 L</span>
              <span className="text-xs text-slate-300">Worker Welfare Fund Pool</span>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <span className="text-3xl sm:text-4xl font-black text-coop-400 block mb-1">12 Mins</span>
              <span className="text-xs text-slate-300">Avg Emergency SOS Arrival</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-coop-700">
            Simple 4-Step Process
          </span>
          <h2 className="text-3xl font-black text-slate-900 mt-1">
            How CoServe Connects You with Verified Help
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 text-center relative">
            <div className="w-10 h-10 rounded-full bg-coop-100 text-coop-800 font-black text-sm flex items-center justify-center mx-auto mb-3">
              1
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Search & AI Match</h3>
            <p className="text-xs text-slate-500">
              Pick your service or emergency type. AI ranks the closest verified tradesperson.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 text-center relative">
            <div className="w-10 h-10 rounded-full bg-coop-100 text-coop-800 font-black text-sm flex items-center justify-center mx-auto mb-3">
              2
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Transparent Booking</h3>
            <p className="text-xs text-slate-500">
              Select date, time, and inspect exactly where every rupee goes (80% to worker).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 text-center relative">
            <div className="w-10 h-10 rounded-full bg-coop-100 text-coop-800 font-black text-sm flex items-center justify-center mx-auto mb-3">
              3
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Service & Live Tracking</h3>
            <p className="text-xs text-slate-500">
              Worker arrives promptly in official cooperative uniform with tools and ID badge.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 text-center relative">
            <div className="w-10 h-10 rounded-full bg-coop-100 text-coop-800 font-black text-sm flex items-center justify-center mx-auto mb-3">
              4
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Rate & Welfare Credit</h3>
            <p className="text-xs text-slate-500">
              Rate quality and punctuality. Worker receives direct payout and welfare credit.
            </p>
          </div>
        </div>
      </section>

      {/* 7. DUAL CALL TO ACTION: CUSTOMERS & SKILLED TRADESPERSONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* For Customers */}
          <div className="bg-gradient-to-br from-coop-800 to-coop-950 text-white p-8 rounded-3xl space-y-4 shadow-elevated">
            <span className="text-xs font-bold uppercase tracking-wider text-coop-300">For Households</span>
            <h3 className="text-2xl font-black">Need Trusted Household Repairs?</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Experience the reliability of certified cooperative tradespeople with guaranteed transparent pricing.
            </p>
            <div className="pt-2">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-coop-900 font-bold rounded-xl text-xs shadow-md hover:bg-coop-50 transition-colors"
              >
                <span>Book a Service Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* For Skilled Workers */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-8 rounded-3xl space-y-4 shadow-elevated border border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-coop-400">For Skilled Workers</span>
            <h3 className="text-2xl font-black">Are You a Skilled Tradesperson?</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Join your local Labour Cooperative Society. Enjoy 80% direct earnings, ₹5 Lakh medical cover, and zero arbitrary platform fines.
            </p>
            <div className="pt-2">
              <Link
                to="/worker-register"
                className="inline-flex items-center gap-2 px-6 py-3 bg-coop-600 hover:bg-coop-700 text-white font-bold rounded-xl text-xs shadow-md transition-colors"
              >
                <span>Register with Cooperative Federation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
