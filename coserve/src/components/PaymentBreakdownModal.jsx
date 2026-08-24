import React from 'react';
import { ShieldCheck, Heart, Wrench, Server, Check, X, ArrowRight } from 'lucide-react';
import { calculateFareBreakdown } from '../data/mockData';

export default function PaymentBreakdownModal({ isOpen, onClose, amount = 500 }) {
  if (!isOpen) return null;

  const breakdown = calculateFareBreakdown(amount);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-elevated border border-slate-100 overflow-hidden relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-coop-100 text-coop-800 mb-2">
            <ShieldCheck className="w-4 h-4 text-coop-700" />
            100% Transparent Cooperative Economy
          </span>
          <h3 className="text-2xl font-black text-slate-900">
            Where Does Your ₹{amount} Go?
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Unlike corporate gig apps with hidden deductions, CoServe publishes full rupee distribution.
          </p>
        </div>

        {/* Visual Progress Stack Bar */}
        <div className="h-4 w-full rounded-full overflow-hidden flex shadow-inner mb-6">
          <div style={{ width: '80%' }} className="bg-coop-600 h-full" title="Worker Payout (80%)"></div>
          <div style={{ width: '10%' }} className="bg-blue-600 h-full" title="Co-op Welfare (10%)"></div>
          <div style={{ width: '6%' }} className="bg-amber-500 h-full" title="Insurance (6%)"></div>
          <div style={{ width: '4%' }} className="bg-slate-400 h-full" title="Platform Tech (4%)"></div>
        </div>

        {/* Breakdown Items List */}
        <div className="space-y-3 mb-6">
          {/* Worker Payout */}
          <div className="p-3.5 rounded-2xl bg-coop-50/70 border border-coop-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-coop-600 text-white flex items-center justify-center font-bold">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Worker Direct Payout (80%)</h4>
                <p className="text-xs text-slate-600">Immediate direct disbursement into worker's bank account</p>
              </div>
            </div>
            <span className="text-base font-black text-coop-800">₹{breakdown.workerPayout}</span>
          </div>

          {/* Cooperative Welfare Fund */}
          <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Cooperative Welfare Fund (10%)</h4>
                <p className="text-xs text-slate-600">Emergency worker loans, children education & upskilling</p>
              </div>
            </div>
            <span className="text-base font-black text-blue-800">₹{breakdown.coopWelfare}</span>
          </div>

          {/* Insurance Fund */}
          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Health & Accidental Insurance (6%)</h4>
                <p className="text-xs text-slate-600">₹5 Lakh Ayushman Sahakar health + on-job accident coverage</p>
              </div>
            </div>
            <span className="text-base font-black text-amber-800">₹{breakdown.insuranceCover}</span>
          </div>

          {/* Platform Maintenance */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-500 text-white flex items-center justify-center font-bold">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Platform Technology & Support (4%)</h4>
                <p className="text-xs text-slate-600">Cloud servers, GPS tracking & 24x7 cooperative helpline</p>
              </div>
            </div>
            <span className="text-base font-black text-slate-800">₹{breakdown.platformFee}</span>
          </div>
        </div>

        {/* CoServe vs Private Gig Apps Comparative Box */}
        <div className="p-3.5 bg-slate-900 text-white rounded-2xl text-xs space-y-2 mb-6">
          <div className="flex items-center justify-between text-coop-400 font-bold uppercase tracking-wider text-[11px]">
            <span>CoServe Cooperative vs Private Gig Apps</span>
            <span>Comparison</span>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="border-r border-slate-700 pr-2">
              <span className="text-coop-300 font-bold block mb-1">🌿 CoServe (Cooperative)</span>
              <p className="text-[11px] text-slate-300">✓ 80% to Worker direct</p>
              <p className="text-[11px] text-slate-300">✓ ₹5L Insurance & Welfare</p>
              <p className="text-[11px] text-slate-300">✓ Worker-owned Federation</p>
            </div>
            <div>
              <span className="text-red-400 font-bold block mb-1">❌ Private Gig Apps</span>
              <p className="text-[11px] text-slate-400">✗ 25-35% Platform Commission</p>
              <p className="text-[11px] text-slate-400">✗ Zero Insurance / Welfare</p>
              <p className="text-[11px] text-slate-400">✗ Arbitrary Account Penalties</p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-coop-600 hover:bg-coop-700 text-white font-bold rounded-xl shadow-md transition-colors text-sm"
        >
          Got It, Support Fair Work!
        </button>
      </div>
    </div>
  );
}
