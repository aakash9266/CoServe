import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Heart,
  Award,
  BookOpen,
  DollarSign,
  CheckCircle,
  FileCheck,
  AlertCircle,
  Clock,
  Sparkles,
  Download,
  Users,
  Lock
} from 'lucide-react';

export default function WorkerWelfare() {
  const { workers, activeWorkerId, addNotification } = useApp();
  const worker = workers.find(w => w.id === activeWorkerId) || workers[0];

  const [loanModalOpen, setLoanModalOpen] = useState(false);
  const [loanAmount, setLoanAmount] = useState(5000);
  const [loanRequested, setLoanRequested] = useState(false);

  const handleRequestLoan = (e) => {
    e.preventDefault();
    setLoanRequested(true);
    addNotification(
      'Emergency Loan Dispatched',
      `₹${loanAmount} zero-interest cooperative emergency loan approved for ${worker.name}.`,
      'success'
    );
    setTimeout(() => {
      setLoanModalOpen(false);
      setLoanRequested(false);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-coop-700">
            Cooperative Worker Social Security
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5">
            Worker Welfare & Protection Shield
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Empowering member <strong className="text-slate-800">{worker.name}</strong> • {worker.coopName}
          </p>
        </div>

        <button
          onClick={() => setLoanModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-coop-600 hover:bg-coop-700 text-white font-bold rounded-xl text-xs shadow-md transition-colors self-start sm:self-auto"
        >
          <DollarSign className="w-4 h-4" />
          <span>Apply for 0% Interest Emergency Loan</span>
        </button>
      </div>

      {/* Digital Cooperative Health & Welfare Pass */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pass Card */}
        <div className="bg-gradient-to-br from-coop-800 via-coop-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-elevated relative overflow-hidden space-y-6">
          <div className="absolute right-0 top-0 w-64 h-64 bg-coop-400/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-coop-500 flex items-center justify-center font-black">
                CS
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-coop-300">
                Cooperative Welfare Shield Pass
              </span>
            </div>
            <span className="text-xs font-bold bg-coop-400 text-coop-950 px-2.5 py-0.5 rounded-full">
              ACTIVE ✓
            </span>
          </div>

          <div className="space-y-1 relative z-10">
            <h2 className="text-2xl font-black">{worker.name}</h2>
            <p className="text-xs text-coop-300 font-mono">ID: {worker.membershipId}</p>
            <p className="text-xs text-slate-300 capitalize">{worker.category} Tradesperson</p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 relative z-10 text-xs">
            <div className="p-3 bg-white/10 rounded-2xl">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Medical Cover</span>
              <span className="text-base font-black text-coop-300">₹5,00,000</span>
              <span className="text-[10px] text-slate-300 block">Ayushman Sahakar</span>
            </div>
            <div className="p-3 bg-white/10 rounded-2xl">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Accidental Shield</span>
              <span className="text-base font-black text-coop-300">₹10,00,000</span>
              <span className="text-[10px] text-slate-300 block">On-Job Disability</span>
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Verified by {worker.coopName.split(' ')[0]}</span>
            <span className="font-mono">Valid: 2026-2027</span>
          </div>
        </div>

        {/* Welfare Balance & Social Dividend Breakdown */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-coop-700">Accumulated Balance</span>
              <h3 className="text-3xl font-black text-slate-900 mt-0.5">₹{worker.welfareBalance}</h3>
              <p className="text-xs text-slate-500">Auto-credited with 10% from every completed customer booking.</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-coop-100 text-coop-800 font-bold text-xs">
                3 Training Courses Completed
              </span>
            </div>
          </div>

          {/* Benefits Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <Heart className="w-5 h-5 text-red-500" />
              <h4 className="font-bold text-slate-900">Family Health OPD</h4>
              <p className="text-slate-500 text-[11px]">Free doctor consultations at affiliated cooperative dispensaries.</p>
              <span className="text-[10px] font-bold text-coop-700 bg-coop-100 px-2 py-0.5 rounded-full inline-block">
                Unlimited
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <h4 className="font-bold text-slate-900">Child Education Grant</h4>
              <p className="text-slate-500 text-[11px]">₹12,000 annual scholarship pool for worker children schooling.</p>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full inline-block">
                Eligible
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <Award className="w-5 h-5 text-amber-600" />
              <h4 className="font-bold text-slate-900">Safety Gear Kit</h4>
              <p className="text-slate-500 text-[11px]">Certified insulated tools, safety boots, and emergency kit issued.</p>
              <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full inline-block">
                Delivered 2026
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Cooperative Training & Skill Upgradation Courses */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-coop-700">Skill Development</span>
          <h2 className="text-xl font-bold text-slate-900 mt-0.5">Cooperative Training Programs</h2>
          <p className="text-xs text-slate-500">Government certified masterclasses to upgrade your earning potential.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl border border-coop-200 bg-coop-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase bg-coop-600 text-white px-2 py-0.5 rounded">Completed</span>
              <span className="text-xs font-mono text-slate-500">NSDC-2025</span>
            </div>
            <h4 className="text-sm font-bold text-slate-900">Advanced Inverter & Solar Pump Installation</h4>
            <p className="text-xs text-slate-600">30-day masterclass on modern energy systems.</p>
            <div className="text-[11px] text-coop-800 font-semibold">Certificate ID: #NSDC-ELEC-8812</div>
          </div>

          <div className="p-4 rounded-2xl border border-coop-200 bg-coop-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase bg-coop-600 text-white px-2 py-0.5 rounded">Completed</span>
              <span className="text-xs font-mono text-slate-500">SAFETY-2025</span>
            </div>
            <h4 className="text-sm font-bold text-slate-900">High-Voltage Electrical Safety & Hygiene</h4>
            <p className="text-xs text-slate-600">Certified by UP Labour Welfare Board standards.</p>
            <div className="text-[11px] text-coop-800 font-semibold">Certificate ID: #LWB-SAFE-9901</div>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase bg-blue-600 text-white px-2 py-0.5 rounded">Enrollable</span>
              <span className="text-xs font-mono text-slate-500">UPCOMING</span>
            </div>
            <h4 className="text-sm font-bold text-slate-900">Smart Home IoT & Automated Switchboards</h4>
            <p className="text-xs text-slate-600">Free cooperative training starting next month.</p>
            <button
              onClick={() => addNotification('Enrolled in IoT Masterclass', 'You have been registered for next month training cohort.', 'success')}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors"
            >
              Enroll for Free (Funded)
            </button>
          </div>
        </div>
      </section>

      {/* Emergency Loan Modal */}
      {loanModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-elevated border border-slate-200 relative">
            {loanRequested ? (
              <div className="text-center py-6 space-y-3">
                <CheckCircle className="w-12 h-12 text-coop-600 mx-auto" />
                <h3 className="text-lg font-bold text-slate-900">Loan Disbursed Instantly!</h3>
                <p className="text-xs text-slate-500">₹{loanAmount} has been credited to your linked bank account.</p>
              </div>
            ) : (
              <form onSubmit={handleRequestLoan} className="space-y-4">
                <div className="text-center">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-coop-800 bg-coop-100 px-3 py-1 rounded-full mb-1">
                    0% Interest Cooperative Advance
                  </span>
                  <h3 className="text-xl font-black text-slate-900">Emergency Worker Loan</h3>
                  <p className="text-xs text-slate-500">Immediate financial assistance with zero predatory interest.</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Select Advance Amount (₹):</label>
                  <select
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full p-3 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none font-bold text-slate-900"
                  >
                    <option value="3000">₹3,000 (Repayable over 6 bookings)</option>
                    <option value="5000">₹5,000 (Repayable over 10 bookings)</option>
                    <option value="10000">₹10,000 (Repayable over 20 bookings)</option>
                  </select>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1 text-slate-600">
                  <div className="flex justify-between"><span>Interest Rate:</span><strong className="text-coop-700">0.0% (Cooperative Guarantee)</strong></div>
                  <div className="flex justify-between"><span>Deduction:</span><span>Small 10% auto-recovery on future bookings</span></div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setLoanModalOpen(false)}
                    className="w-1/3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-2.5 bg-coop-600 hover:bg-coop-700 text-white font-bold rounded-xl text-xs shadow-md transition-colors"
                  >
                    Confirm & Disburse ₹{loanAmount}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
