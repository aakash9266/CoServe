import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  AlertCircle,
  Star,
  ShieldCheck,
  Zap,
  ArrowRight,
  Heart,
  RotateCcw,
  Sparkles,
  Phone
} from 'lucide-react';
import RatingModal from '../components/RatingModal';

export default function CustomerDashboard() {
  const {
    bookings,
    workers,
    userLocation,
    setEmergencyModalOpen,
    t
  } = useApp();

  const navigate = useNavigate();
  const [selectedBookingForRating, setSelectedBookingForRating] = useState(null);
  const [ratingModalOpen, setRatingModalOpen] = useState(false);

  // Active bookings (pending, accepted, in_progress)
  const activeBookings = bookings.filter(b => b.status !== 'completed' && b.status !== 'cancelled');
  const pastBookings = bookings.filter(b => b.status === 'completed');

  // Calculate total welfare funded by this customer
  const totalWelfareFunded = pastBookings.reduce((sum, b) => sum + (b.breakdown?.coopWelfare || 50), 0);

  const handleOpenRating = (booking) => {
    setSelectedBookingForRating(booking);
    setRatingModalOpen(true);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'in_progress':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 animate-pulse">Service In Progress</span>;
      case 'accepted':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">Worker En Route</span>;
      case 'pending':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700">Dispatch Pending</span>;
      case 'completed':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-coop-100 text-coop-800">Completed ✓</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700">{status}</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header & Location Banner */}
      <div className="bg-gradient-to-r from-coop-900 via-slate-900 to-coop-950 text-white rounded-3xl p-6 sm:p-8 shadow-elevated flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-coop-500/20 text-coop-300 border border-coop-500/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            Verified Customer Dashboard
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">Welcome Back, Aakash!</h1>
          <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-1.5 pt-0.5">
            <MapPin className="w-4 h-4 text-red-400" />
            Current Location: <strong className="text-white">{userLocation.name}</strong>
          </p>
        </div>

        {/* Customer Social Impact Card */}
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 flex items-center gap-4 text-xs">
          <div className="w-10 h-10 rounded-xl bg-coop-500 text-white flex items-center justify-center font-bold">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <span className="text-slate-300 block text-[11px]">Your Cooperative Welfare Impact</span>
            <span className="text-base font-black text-coop-300">₹{totalWelfareFunded} Contributed</span>
            <span className="text-[10px] text-slate-400 block">Funds worker healthcare & child schooling</span>
          </div>
        </div>
      </div>

      {/* 1. ACTIVE LIVE BOOKINGS SECTION */}
      {activeBookings.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-coop-500 animate-ping"></span>
              Live Ongoing Bookings ({activeBookings.length})
            </h2>
            <span className="text-xs text-slate-500">Real-time cooperative worker telemetry</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {activeBookings.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-3xl p-6 border-2 border-coop-300 shadow-soft space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={b.workerAvatar}
                      alt={b.workerName}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-coop-500 shadow-sm"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-slate-900">{b.workerName}</h3>
                        {getStatusBadge(b.status)}
                      </div>
                      <p className="text-xs text-coop-700 font-semibold">{b.serviceTitle}</p>
                      <span className="text-[11px] text-slate-500 font-mono">ID: {b.id}</span>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-xs text-slate-400 block font-semibold">Total Fair Fare</span>
                    <span className="text-xl font-black text-slate-900">₹{b.totalAmount}</span>
                    <span className="text-[11px] text-coop-700 font-semibold block">80% direct to worker</span>
                  </div>
                </div>

                {/* Step Progression Timeline */}
                <div>
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                    Service Status Progression
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                    {[
                      { label: '1. Request Placed', active: true },
                      { label: '2. Worker Accepted', active: b.status === 'accepted' || b.status === 'in_progress' },
                      { label: '3. Service In Progress', active: b.status === 'in_progress' },
                      { label: '4. Done & Rated', active: b.status === 'completed' }
                    ].map((step, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border flex items-center gap-2 transition-all ${
                          step.active
                            ? 'bg-coop-50 border-coop-300 text-coop-900 font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-400'
                        }`}
                      >
                        <CheckCircle className={`w-4 h-4 ${step.active ? 'text-coop-600' : 'text-slate-300'}`} />
                        <span>{step.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timeline Log */}
                {b.timeline && b.timeline.length > 0 && (
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Activity Log</span>
                    {b.timeline.map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-slate-600">
                        <span>• {item.label}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{item.time}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 2. RECENT / PAST BOOKINGS & RATING FLOW */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Recent & Past Bookings</h2>
          <span className="text-xs text-slate-500">{pastBookings.length} completed services</span>
        </div>

        {pastBookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pastBookings.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-3xl p-5 border border-slate-200 shadow-soft space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={b.workerAvatar}
                        alt={b.workerName}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{b.workerName}</h4>
                        <p className="text-xs text-slate-600">{b.serviceTitle}</p>
                        <span className="text-[10px] text-slate-400">{b.scheduledDate}</span>
                      </div>
                    </div>

                    <span className="text-sm font-black text-slate-900">₹{b.totalAmount}</span>
                  </div>

                  {b.rated && b.userRating ? (
                    <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs space-y-1">
                      <div className="flex items-center gap-1 text-amber-600 font-bold">
                        <span>Your Rating: ⭐ {b.userRating.overall} / 5</span>
                      </div>
                      <p className="text-slate-600 italic">"{b.userRating.review}"</p>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleOpenRating(b)}
                      className="w-full py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs rounded-xl border border-amber-200 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>Rate Worker & Cooperative Experience</span>
                    </button>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Welfare Credited: <strong className="text-coop-700">₹{b.breakdown?.coopWelfare || 50}</strong></span>
                  <button
                    onClick={() => navigate(`/book/${b.workerId}`)}
                    className="text-coop-700 font-bold hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Re-book
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-3">
            <Calendar className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-xs text-slate-500">No past completed bookings yet.</p>
          </div>
        )}
      </section>

      {/* Rating Modal */}
      <RatingModal
        isOpen={ratingModalOpen}
        onClose={() => setRatingModalOpen(false)}
        booking={selectedBookingForRating}
      />
    </div>
  );
}
