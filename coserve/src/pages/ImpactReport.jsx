import React from 'react';
import {
  ShieldCheck,
  TrendingUp,
  Heart,
  Users,
  Award,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  PieChart as PieIcon,
  DollarSign
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ImpactReport() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Top Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-coop-100 text-coop-800 text-xs font-bold shadow-sm">
          <ShieldCheck className="w-4 h-4 text-coop-600" />
          The Cooperative Gig Economy Manifesto
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          How CoServe Re-engineers the Gig Economy for Community Prosperity
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Traditional corporate platforms extract billions in commissions while treating workers as disposable gig units. CoServe proves that a worker-owned, AI-empowered cooperative federation provides superior service, lower consumer prices, and life-changing worker dignity.
        </p>
      </div>

      {/* 1. SIDE-BY-SIDE ARCHITECTURAL COMPARISON (Section 22) */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-soft space-y-6">
        <div className="text-center max-w-xl mx-auto mb-6">
          <h2 className="text-2xl font-black text-slate-900">CoServe vs Private Gig Platforms</h2>
          <p className="text-xs text-slate-500 mt-1">Direct architectural comparison of economic incentives</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CoServe Side */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-coop-50/80 to-white border-2 border-coop-400 space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-coop-200">
              <span className="text-lg font-black text-coop-900 flex items-center gap-2">
                🌿 CoServe Cooperative
              </span>
              <span className="text-xs font-bold bg-coop-600 text-white px-2.5 py-1 rounded-full">
                Worker Owned
              </span>
            </div>

            <ul className="space-y-3 text-xs text-slate-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-coop-600 shrink-0 mt-0.5" />
                <span><strong>80% Direct Worker Payout:</strong> Workers take home 80% of every rupee paid by the customer.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-coop-600 shrink-0 mt-0.5" />
                <span><strong>₹5 Lakh Health & Disability Cover:</strong> Auto-funded via 6% insurance allocation on each job.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-coop-600 shrink-0 mt-0.5" />
                <span><strong>Cooperative Welfare Pool (10%):</strong> 0% interest emergency loans, children education funds, and pensions.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-coop-600 shrink-0 mt-0.5" />
                <span><strong>Cooperative Society Verification:</strong> Verified by local Labour Cooperatives registered under Govt of India.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-coop-600 shrink-0 mt-0.5" />
                <span><strong>AI For Worker Optimization:</strong> Predicts demand surges so workers work fewer hours for higher stable income.</span>
              </li>
            </ul>
          </div>

          {/* Private App Side */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="text-lg font-bold text-slate-800 flex items-center gap-2">
                ❌ Private Corporate Apps
              </span>
              <span className="text-xs font-semibold bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full">
                Investor Driven
              </span>
            </div>

            <ul className="space-y-3 text-xs text-slate-600">
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span><strong>25% - 35% Platform Cut:</strong> Heavy corporate commission extracted from every single transaction.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span><strong>Zero Social Security:</strong> Workers classified as independent contractors with no health or injury cover.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span><strong>Zero Welfare Reserve:</strong> No safety net, emergency loans, or child schooling assistance.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span><strong>Opaque Algorithmic Penalties:</strong> Workers blocked or fined without human arbitration or appeal.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span><strong>Wealth Extracted to VC Hubs:</strong> Local money drained out of cities like Ghaziabad into corporate offshore entities.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 2. THE ₹500 RUPEE TRANSPARENCY WHEEL (Section 13 & 22) */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-elevated border border-slate-800 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-coop-400">Economic Blueprint</span>
          <h2 className="text-3xl font-black">Where Every ₹500 Customer Payment Goes</h2>
          <p className="text-xs sm:text-sm text-slate-300">
            CoServe operates on 100% radical financial transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-2 text-center">
            <span className="text-3xl font-black text-coop-400">₹400</span>
            <span className="text-xs font-bold text-white block">Worker Take-Home (80%)</span>
            <p className="text-[11px] text-slate-400">Direct instant transfer to worker's UPI bank account.</p>
          </div>

          <div className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-2 text-center">
            <span className="text-3xl font-black text-blue-400">₹50</span>
            <span className="text-xs font-bold text-white block">Cooperative Welfare (10%)</span>
            <p className="text-[11px] text-slate-400">Funds 0% emergency loans, scholarships & pensions.</p>
          </div>

          <div className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-2 text-center">
            <span className="text-3xl font-black text-amber-400">₹30</span>
            <span className="text-xs font-bold text-white block">Health & Insurance (6%)</span>
            <p className="text-[11px] text-slate-400">₹5L Ayushman Sahakar medical & disability cover.</p>
          </div>

          <div className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-2 text-center">
            <span className="text-3xl font-black text-slate-300">₹20</span>
            <span className="text-xs font-bold text-white block">Platform Server & Tech (4%)</span>
            <p className="text-[11px] text-slate-400">Cloud servers, GPS routing & 24x7 cooperative toll-free helpline.</p>
          </div>
        </div>
      </div>

      {/* 3. CALL TO ACTION */}
      <div className="text-center bg-coop-50 rounded-3xl p-8 border border-coop-200 space-y-4">
        <h3 className="text-2xl font-black text-slate-900">Be Part of the Cooperative Movement</h3>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          Every time you book a service on CoServe, you support dignified work, fair wages, and local community self-reliance.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link
            to="/services"
            className="px-6 py-3 bg-coop-600 hover:bg-coop-700 text-white font-bold rounded-xl text-xs shadow-md transition-colors"
          >
            Find a Verified Worker
          </Link>
          <Link
            to="/worker-register"
            className="px-6 py-3 bg-white text-coop-800 font-bold rounded-xl text-xs border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            Register as a Cooperative Tradesperson
          </Link>
        </div>
      </div>
    </div>
  );
}
