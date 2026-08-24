import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  FileText,
  Clock,
  Sparkles,
  BarChart3,
  MapPin,
  Heart,
  Send,
  Zap,
  Filter,
  Check
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid
} from 'recharts';

export default function AdminDashboard() {
  const {
    workers,
    pendingWorkers,
    bookings,
    aiDemandData,
    approveWorker,
    rejectWorker,
    reallocateWorkforce,
    addNotification
  } = useApp();

  const [activeTab, setActiveTab] = useState('aiIntelligence'); // aiIntelligence | verification | bookings | analytics
  const [reallocatedMap, setReallocatedMap] = useState({});

  const totalFairWagesDisbursed = bookings.reduce(
    (sum, b) => sum + (b.breakdown?.workerEarning || Math.round(b.totalAmount * 0.8)),
    14820000
  );

  const totalWelfareFundPool = bookings.reduce(
    (sum, b) => sum + (b.breakdown?.coopWelfare || 50),
    1850000
  );

  const handleExecuteRecommendation = (alertId, region, category, count) => {
    reallocateWorkforce(region, category, count);
    setReallocatedMap(prev => ({ ...prev, [alertId]: true }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Federation Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-elevated flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-coop-500/20 text-coop-300 border border-coop-500/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            Labour Cooperative Federation Central Command
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">Cooperative Administration</h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Governing Ghaziabad Shramik Samiti, Noida Craft Federation & NCR Trades Union
          </p>
        </div>

        {/* Quick Pending Alert Pill */}
        {pendingWorkers.length > 0 && (
          <button
            onClick={() => setActiveTab('verification')}
            className="p-3 bg-amber-500/20 border border-amber-500/40 rounded-2xl flex items-center gap-3 text-amber-300 hover:bg-amber-500/30 transition-colors"
          >
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 animate-bounce" />
            <div className="text-left text-xs">
              <span className="font-bold block">{pendingWorkers.length} Pending Worker Verifications</span>
              <span className="text-[10px] text-slate-300">Click to review certificates</span>
            </div>
          </button>
        )}
      </div>

      {/* High-Level Federation KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-soft space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-coop-600" /> Active Verified Workers
          </span>
          <span className="text-2xl sm:text-3xl font-black text-slate-900 block">{workers.length + 1572}</span>
          <span className="text-[11px] text-coop-700 font-semibold block">100% background cleared</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-soft space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-blue-600" /> Fair Wages Disbursed
          </span>
          <span className="text-2xl sm:text-3xl font-black text-slate-900 block">₹{(totalFairWagesDisbursed / 10000000).toFixed(2)} Cr</span>
          <span className="text-[11px] text-slate-500 block">80% direct to worker families</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-soft space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 text-red-500" /> Welfare Fund Pool
          </span>
          <span className="text-2xl sm:text-3xl font-black text-coop-700 block">₹{(totalWelfareFundPool / 100000).toFixed(1)} L</span>
          <span className="text-[11px] text-coop-700 font-semibold block">₹5L Insurance & Relief Active</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-soft space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-500" /> Total Bookings Closed
          </span>
          <span className="text-2xl sm:text-3xl font-black text-slate-900 block">{bookings.length + 8940}</span>
          <span className="text-[11px] text-slate-500 block">99.2% customer satisfaction</span>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('aiIntelligence')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'aiIntelligence'
              ? 'bg-coop-700 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Sparkles className="w-4 h-4 text-coop-300" />
          <span>AI Demand Intelligence & Dispatch</span>
        </button>

        <button
          onClick={() => setActiveTab('verification')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all relative ${
            activeTab === 'verification'
              ? 'bg-coop-700 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Worker Verification Queue</span>
          {pendingWorkers.length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-900 font-black text-[10px]">
              {pendingWorkers.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('bookings')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'bookings'
              ? 'bg-coop-700 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Live Federation Bookings</span>
        </button>
      </div>

      {/* TAB 1: AI DEMAND INTELLIGENCE (Section 10) */}
      {activeTab === 'aiIntelligence' && (
        <div className="space-y-6">
          {/* AI Demand Intelligence Alerts */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-coop-600" />
                  AI Predictive Workforce Forecasts & Alerts
                </h3>
                <p className="text-xs text-slate-500">Machine learning demand heatmaps for Ghaziabad & Delhi NCR</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {aiDemandData.highDemandAlerts.map((alert) => {
                const isExecuted = reallocatedMap[alert.id];
                return (
                  <div
                    key={alert.id}
                    className={`rounded-3xl p-5 border-2 ${
                      alert.severity === 'high'
                        ? 'border-red-300 bg-red-50/40'
                        : alert.severity === 'medium'
                        ? 'border-amber-300 bg-amber-50/40'
                        : 'border-blue-300 bg-blue-50/40'
                    } shadow-soft flex flex-col justify-between space-y-4`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                          alert.severity === 'high' ? 'bg-red-600 text-white' : 'bg-amber-500 text-white'
                        }`}>
                          {alert.severity === 'high' ? 'High Demand Surge' : 'Shortage Alert'}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-600">{alert.region}</span>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900">{alert.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{alert.message}</p>

                      <div className="p-3 bg-white/80 rounded-2xl border border-slate-200/80 text-xs text-slate-800">
                        <strong className="text-coop-800 block text-[11px] uppercase mb-0.5">AI Recommendation:</strong>
                        {alert.recommendation}
                      </div>
                    </div>

                    <button
                      onClick={() => handleExecuteRecommendation(alert.id, alert.region, alert.category, 12)}
                      disabled={isExecuted}
                      className={`w-full py-2.5 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 ${
                        isExecuted
                          ? 'bg-coop-100 text-coop-800 border border-coop-300'
                          : 'bg-coop-600 hover:bg-coop-700 text-white hover:scale-105'
                      }`}
                    >
                      {isExecuted ? (
                        <>
                          <Check className="w-4 h-4 text-coop-700" />
                          <span>Workforce Deployed & Standby Active ✓</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4" />
                          <span>Execute AI Recommendation</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Demand Intelligence Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart 1: Current vs Predicted Demand by Category */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Category Service Demand (Next 72 Hours)</h4>
                <p className="text-xs text-slate-500">Current active requests vs predicted surge volume</p>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={aiDemandData.categoryDemandChart}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="category" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="currentDemand" name="Current Demand" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="predictedDemand" name="AI Predicted Demand" fill="#16a34a" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Regional Demand & Worker Availability */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Regional Demand Index & Worker Supply</h4>
                <p className="text-xs text-slate-500">Sector-by-sector live workforce distribution in NCR</p>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={aiDemandData.regionalDemandChart}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="region" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="demandIndex" name="Demand Index (0-100)" fill="#d97706" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="workersActive" name="Active Standby Fleet" fill="#0284c7" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: WORKER VERIFICATION MANAGEMENT (Section 8 & 15) */}
      {activeTab === 'verification' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Pending Cooperative Verifications ({pendingWorkers.length})</h3>
              <p className="text-xs text-slate-500">Review trade certificates, identity proof, and cooperative society membership.</p>
            </div>
          </div>

          {pendingWorkers.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {pendingWorkers.map((pending) => (
                <div
                  key={pending.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-slate-900">{pending.name}</h4>
                        <span className="text-[10px] font-bold uppercase bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full">
                          Pending Review
                        </span>
                      </div>
                      <p className="text-xs text-coop-800 font-semibold capitalize mt-0.5">
                        {pending.category} ({pending.experienceYears} yrs exp) • {pending.coopName}
                      </p>
                      <span className="text-[11px] text-slate-500">Membership: {pending.coopMembershipId} • Applied: {pending.appliedDate}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => rejectWorker(pending.id)}
                        className="px-4 py-2 rounded-xl border border-red-200 text-red-700 font-semibold text-xs hover:bg-red-50 transition-colors"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => approveWorker(pending.id)}
                        className="px-6 py-2.5 bg-coop-600 hover:bg-coop-700 text-white font-bold rounded-xl text-xs shadow-md transition-all hover:scale-105 flex items-center gap-1.5"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>Approve & Verify ✓</span>
                      </button>
                    </div>
                  </div>

                  {/* Document Inspection Strip */}
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Attached Verification Documents
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      {pending.documents?.map((doc, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-coop-600 shrink-0" />
                            <span className="text-slate-800 font-medium truncate max-w-[140px]">{doc.name}</span>
                          </div>
                          <span className="text-[10px] font-bold text-coop-700 bg-coop-100 px-2 py-0.5 rounded-full">
                            Valid
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-2">
              <CheckCircle className="w-10 h-10 text-coop-600 mx-auto" />
              <h4 className="text-base font-bold text-slate-900">Verification Queue is Empty</h4>
              <p className="text-xs text-slate-500">All member registration applications have been verified and approved.</p>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: LIVE FEDERATION BOOKINGS (Section 15) */}
      {activeTab === 'bookings' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Federation Live Bookings Feed ({bookings.length})</h3>
            <span className="text-xs text-slate-500">Audited transaction registry</span>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-800 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-4">Booking ID</th>
                    <th className="p-4">Worker</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Total Fare</th>
                    <th className="p-4">Worker (80%)</th>
                    <th className="p-4">Welfare (10%)</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50/60">
                      <td className="p-4 font-mono font-bold text-slate-900">{b.id}</td>
                      <td className="p-4 font-semibold text-slate-800">{b.workerName}</td>
                      <td className="p-4">{b.customerName}</td>
                      <td className="p-4 font-bold text-slate-900">₹{b.totalAmount}</td>
                      <td className="p-4 text-coop-700 font-semibold">₹{b.breakdown?.workerEarning || Math.round(b.totalAmount * 0.8)}</td>
                      <td className="p-4 text-blue-700 font-semibold">₹{b.breakdown?.coopWelfare || 50}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          b.status === 'completed' ? 'bg-coop-100 text-coop-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
