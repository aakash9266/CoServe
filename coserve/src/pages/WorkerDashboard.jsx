import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Briefcase,
  TrendingUp,
  Star,
  CheckCircle,
  Clock,
  MapPin,
  ShieldCheck,
  Zap,
  Phone,
  ArrowRight,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
  Heart,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WorkerDashboard() {
  const {
    workers,
    bookings,
    activeWorkerId,
    toggleWorkerAvailability,
    acceptJobRequest,
    updateJobProgress,
    declineJobRequest
  } = useApp();

  // Active worker (defaults to Ramesh Kumar w-1 or first worker)
  const currentWorker = workers.find(w => w.id === activeWorkerId) || workers[0];
  const isAvailable = currentWorker.status === 'available';

  // Inbound Pending Requests for this worker
  const pendingRequests = bookings.filter(
    b => b.workerId === currentWorker.id && b.status === 'pending'
  );

  // Active ongoing jobs (accepted or in_progress)
  const activeJobs = bookings.filter(
    b => b.workerId === currentWorker.id && (b.status === 'accepted' || b.status === 'in_progress')
  );

  // Completed jobs history
  const completedJobsList = bookings.filter(
    b => b.workerId === currentWorker.id && b.status === 'completed'
  );

  // Calculate earnings
  const totalEarnings = completedJobsList.reduce(
    (sum, b) => sum + (b.breakdown?.workerEarning || Math.round(b.totalAmount * 0.8)),
    18450 // base baseline
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Worker Profile & Status Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={currentWorker.avatar}
              alt={currentWorker.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-coop-500 shadow-md"
            />
            <span className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
              isAvailable ? 'bg-coop-500' : 'bg-slate-400'
            }`} />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">{currentWorker.name}</h1>
              <span className="text-xs font-bold bg-coop-100 text-coop-800 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-coop-600" />
                Verified Worker
              </span>
            </div>
            <p className="text-xs sm:text-sm text-coop-800 font-semibold capitalize">
              {currentWorker.category} Specialist • {currentWorker.coopName}
            </p>
            <span className="text-xs text-slate-500">Membership ID: {currentWorker.membershipId}</span>
          </div>
        </div>

        {/* Availability Toggle */}
        <div className="flex items-center gap-4 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 self-stretch md:self-auto justify-between md:justify-start">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Work Status</span>
            <span className={`text-xs font-black ${isAvailable ? 'text-coop-700' : 'text-slate-500'}`}>
              {isAvailable ? '🟢 Online (Receiving Jobs)' : '⚪ Busy / Offline'}
            </span>
          </div>
          <button
            onClick={() => toggleWorkerAvailability(currentWorker.id)}
            className="p-1 rounded-xl focus:outline-none"
            title="Toggle Availability"
          >
            {isAvailable ? (
              <ToggleRight className="w-10 h-10 text-coop-600 cursor-pointer" />
            ) : (
              <ToggleLeft className="w-10 h-10 text-slate-400 cursor-pointer" />
            )}
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Earnings */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-soft space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-coop-600" /> Total Earnings (80%)
          </span>
          <span className="text-2xl sm:text-3xl font-black text-slate-900 block">₹{totalEarnings.toLocaleString()}</span>
          <span className="text-[11px] text-coop-700 font-semibold block">Direct bank disbursement</span>
        </div>

        {/* Jobs Completed */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-soft space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Briefcase className="w-3.5 h-3.5 text-blue-600" /> Jobs Completed
          </span>
          <span className="text-2xl sm:text-3xl font-black text-slate-900 block">{currentWorker.completedJobs}</span>
          <span className="text-[11px] text-slate-500 block">All verified by federation</span>
        </div>

        {/* Rating */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-soft space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> Customer Rating
          </span>
          <span className="text-2xl sm:text-3xl font-black text-amber-600 block">
            ⭐ {currentWorker.rating}
          </span>
          <span className="text-[11px] text-slate-500 block">From {currentWorker.ratingCount || 148} reviews</span>
        </div>

        {/* Welfare Balance */}
        <div className="bg-gradient-to-br from-coop-800 to-coop-950 text-white p-5 rounded-3xl shadow-soft space-y-1">
          <span className="text-xs font-bold text-coop-300 uppercase tracking-wider flex items-center gap-1">
            <Heart className="w-3.5 h-3.5" /> Welfare Shield Fund
          </span>
          <span className="text-2xl sm:text-3xl font-black text-coop-300 block">₹{currentWorker.welfareBalance}</span>
          <Link to="/worker-welfare" className="text-[11px] text-white hover:underline block font-semibold">
            View ₹5L Insurance & Shield →
          </Link>
        </div>
      </div>

      {/* 1. INBOUND PENDING JOB REQUESTS (Section 7) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-100 text-amber-700">
              <Clock className="w-4 h-4" />
            </span>
            <span>Incoming Job Requests ({pendingRequests.length})</span>
          </h2>
          <span className="text-xs text-slate-500">Direct bookings dispatched to you</span>
        </div>

        {pendingRequests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingRequests.map((req) => (
              <div
                key={req.id}
                className={`bg-white rounded-3xl p-6 border-2 ${
                  req.isEmergency ? 'border-red-400 bg-red-50/20' : 'border-amber-300'
                } shadow-card space-y-4`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    {req.isEmergency && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-600 text-white mb-1.5 animate-pulse">
                        <Zap className="w-3 h-3" /> EMERGENCY SOS (PRIORITY)
                      </span>
                    )}
                    <h3 className="text-base font-bold text-slate-900">{req.serviceTitle}</h3>
                    <p className="text-xs text-slate-500 font-mono">Booking ID: {req.id}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 uppercase font-bold block">Your Earning</span>
                    <span className="text-xl font-black text-coop-700">₹{req.breakdown.workerEarning}</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1.5">
                  <div className="flex items-center gap-2 text-slate-700">
                    <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                    <span className="font-semibold">{req.customerAddress}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500 pt-1">
                    <span>Customer: <strong>{req.customerName}</strong></span>
                    <span>Slot: <strong>{req.scheduledTime}</strong></span>
                  </div>
                </div>

                {/* Accept / Decline CTA Buttons */}
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => declineJobRequest(req.id)}
                    className="w-1/3 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-colors"
                  >
                    Decline
                  </button>
                  <button
                    onClick={() => acceptJobRequest(req.id)}
                    className="w-2/3 py-2.5 bg-coop-600 hover:bg-coop-700 text-white font-bold rounded-xl text-xs shadow-md transition-all hover:scale-105 flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Accept Job (₹{req.breakdown.workerEarning})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 text-center space-y-2">
            <CheckCircle className="w-8 h-8 text-coop-500 mx-auto" />
            <p className="text-xs text-slate-600 font-medium">All caught up! No pending booking requests right now.</p>
            <p className="text-[11px] text-slate-400">Keep your status toggle ON to receive new nearby requests.</p>
          </div>
        )}
      </section>

      {/* 2. ACTIVE JOBS IN PROGRESS (Section 7) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
              <Briefcase className="w-4 h-4" />
            </span>
            <span>Active & In-Progress Jobs ({activeJobs.length})</span>
          </h2>
        </div>

        {activeJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-3xl p-6 border-2 border-blue-200 shadow-soft space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 mb-1">
                      {job.status === 'accepted' ? 'Worker En Route' : 'In Progress On-Site'}
                    </span>
                    <h3 className="text-base font-bold text-slate-900">{job.serviceTitle}</h3>
                    <span className="text-xs text-slate-500 font-mono">ID: {job.id}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-coop-700">₹{job.breakdown.workerEarning}</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                  <div className="flex items-center gap-2 text-slate-700">
                    <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                    <span>{job.customerAddress}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Contact: {job.customerPhone}</span>
                    <span>Payment: {job.paymentMethod}</span>
                  </div>
                </div>

                {/* Progress Buttons */}
                <div className="pt-2 flex gap-2">
                  {job.status === 'accepted' ? (
                    <button
                      onClick={() => updateJobProgress(job.id, 'in_progress')}
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md transition-colors"
                    >
                      Start Work On-Site →
                    </button>
                  ) : (
                    <button
                      onClick={() => updateJobProgress(job.id, 'completed')}
                      className="w-full py-3 bg-coop-600 hover:bg-coop-700 text-white font-bold rounded-xl text-xs shadow-md transition-colors"
                    >
                      Mark Completed & Disburse ₹{job.breakdown.workerEarning} ✓
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 text-center text-xs text-slate-500">
            No active jobs in execution currently.
          </div>
        )}
      </section>
    </div>
  );
}
