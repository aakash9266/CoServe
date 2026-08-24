import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PlayCircle, Zap, Shield, Sparkles, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DemoScenarioBar() {
  const {
    triggerDemoScenario,
    resetDemoData,
    setRole,
    pendingWorkers,
    bookings
  } = useApp();

  const [expanded, setExpanded] = useState(true);
  const navigate = useNavigate();

  const handleScenarioClick = (action) => {
    if (action === 'emergency') {
      setRole('customer');
      navigate('/services');
      triggerDemoScenario('emergency_ghaziabad');
    } else if (action === 'worker_accept') {
      setRole('worker');
      navigate('/worker-dashboard');
    } else if (action === 'admin_verify') {
      setRole('admin');
      navigate('/admin');
    } else if (action === 'ai_demand') {
      setRole('admin');
      navigate('/admin');
    }
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border-b border-indigo-900/50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center justify-between w-full sm:w-auto gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-coop-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-coop-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-coop-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> CoServe — Serving Homes.
              Empowering Communities.
            </span>
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="sm:hidden text-slate-400 hover:text-white text-xs"
          >
            {expanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>

        {expanded && (
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {/* Scenario 1: Ghaziabad Water Leakage */}
            <button
              onClick={() => handleScenarioClick("emergency")}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-600/90 hover:bg-red-600 text-white rounded-lg text-xs font-semibold shadow-sm transition-all hover:scale-105"
              title="Trigger Instant SOS Dispatch in Ghaziabad"
            >
              <Zap className="w-3 h-3 animate-pulse" />
              <span>1. SOS Water Leakage Dispatch</span>
            </button>

            {/* Scenario 2: Worker View & Job Accept */}
            <button
              onClick={() => handleScenarioClick("worker_accept")}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-coop-600/90 hover:bg-coop-600 text-white rounded-lg text-xs font-semibold shadow-sm transition-all hover:scale-105"
              title="Inspect Worker Inbound Job & Accept"
            >
              <PlayCircle className="w-3 h-3" />
              <span>2. Worker Accept & Lifecycle</span>
            </button>

            {/* Scenario 3: Admin Approval */}
            <button
              onClick={() => handleScenarioClick("admin_verify")}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-600/90 hover:bg-amber-600 text-white rounded-lg text-xs font-semibold shadow-sm transition-all hover:scale-105 relative"
              title="Cooperative Admin Verification Queue"
            >
              <Shield className="w-3 h-3" />
              <span>3. Admin Verification</span>
              {pendingWorkers.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-white text-amber-800 text-[10px] font-bold flex items-center justify-center">
                  {pendingWorkers.length}
                </span>
              )}
            </button>

            {/* Reset Data */}
            <button
              onClick={resetDemoData}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-medium border border-slate-700 transition-colors"
              title="Reset mock data to initial NCR state"
            >
              <RefreshCw className="w-3 h-3" />
              <span className="hidden md:inline">Reset State</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
