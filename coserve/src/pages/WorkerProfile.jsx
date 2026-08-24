import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Star,
  ShieldCheck,
  MapPin,
  Clock,
  Award,
  CheckCircle,
  Phone,
  Mail,
  Calendar,
  Sparkles,
  Zap,
  ArrowLeft,
  HeartHandshake,
  CheckCircle2,
  FileText
} from 'lucide-react';
import AiMatchBadge from '../components/AiMatchBadge';
import PaymentBreakdownModal from '../components/PaymentBreakdownModal';

export default function WorkerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { workers, userLocation } = useApp();

  const [breakdownModalOpen, setBreakdownModalOpen] = useState(false);

  const worker = workers.find(w => w.id === id) || workers[0];

  if (!worker) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-800">Worker profile not found</h2>
        <Link to="/services" className="text-coop-600 text-sm mt-2 inline-block">Return to Services</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Search</span>
        </button>
      </div>

      {/* Main Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft">
        <div className="flex flex-col md:flex-row items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative">
              <img
                src={worker.avatar}
                alt={worker.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-4 border-coop-500 shadow-md"
              />
              <span className="absolute -bottom-2 -right-2 bg-coop-600 text-white p-1.5 rounded-xl shadow-md">
                <ShieldCheck className="w-5 h-5" />
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900">{worker.name}</h1>
                <span className="text-xs font-bold bg-coop-100 text-coop-800 px-3 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-coop-600" />
                  Verified Cooperative Professional
                </span>
              </div>

              <p className="text-sm font-semibold text-coop-800 capitalize flex items-center gap-1.5">
                <span>{worker.category} Specialist</span>
                <span>•</span>
                <span className="text-slate-500">{worker.experienceYears} Years Experience</span>
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-red-500" />
                  {worker.locationName} ({worker.distanceKm} km from you)
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-coop-600" />
                  Avg Response: ~{worker.responseTimeMin} mins
                </span>
              </div>
            </div>
          </div>

          {/* Booking & Price Box */}
          <div className="w-full md:w-auto bg-slate-50 p-5 rounded-2xl border border-slate-200 text-left md:text-right shrink-0 space-y-3">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Standard Visit Fee</span>
              <span className="text-3xl font-black text-slate-900">
                ₹{worker.hourlyRate}
              </span>
              <button
                onClick={() => setBreakdownModalOpen(true)}
                className="text-[11px] text-coop-700 font-bold block hover:underline mt-0.5"
              >
                View 100% Transparent Price Split →
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/book/${worker.id}`)}
                className="w-full py-3 px-6 bg-coop-600 hover:bg-coop-700 text-white font-bold rounded-xl text-xs shadow-md transition-all hover:scale-105"
              >
                Book Service Now
              </button>
            </div>
          </div>
        </div>

        {/* 4 Dimension Score Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-100">
          <div className="p-3 bg-slate-50 rounded-xl text-center">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Customer Rating</span>
            <span className="text-lg font-black text-amber-600 flex items-center justify-center gap-1">
              ⭐ {worker.rating} <span className="text-xs text-slate-400 font-normal">({worker.ratingCount})</span>
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl text-center">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Completed Jobs</span>
            <span className="text-lg font-black text-coop-700">{worker.completedJobs}+</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl text-center">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Punctuality Score</span>
            <span className="text-lg font-black text-blue-600">{worker.punctualityScore || 98}%</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl text-center">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Cooperative Shield</span>
            <span className="text-lg font-black text-coop-700 flex items-center justify-center gap-1">
              <ShieldCheck className="w-4 h-4 text-coop-600" /> Active
            </span>
          </div>
        </div>
      </div>

      {/* Profile Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Col 1 & 2: Bio, Skills, Certifications, Reviews */}
        <div className="lg:col-span-2 space-y-6">
          {/* About & Craftsmanship */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-coop-600" />
              About & Experience
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {worker.bio}
            </p>

            <div className="pt-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                Specialized Trade Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {worker.secondarySkills?.map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold bg-coop-50 text-coop-800 border border-coop-200 px-3 py-1.5 rounded-xl"
                  >
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Certifications & Government Badges */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-coop-600" />
              Verified Cooperative Certifications
            </h3>

            <div className="space-y-2.5">
              {worker.certifications?.map((cert, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-start gap-3"
                >
                  <FileText className="w-4 h-4 text-coop-600 shrink-0 mt-0.5" />
                  <span className="text-xs font-medium text-slate-800">{cert}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Customer Reviews */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                Verified Household Reviews ({worker.reviews?.length || 0})
              </h3>
            </div>

            {worker.reviews && worker.reviews.length > 0 ? (
              <div className="space-y-3">
                {worker.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{rev.customerName}</span>
                      <span className="text-[10px] text-slate-400">{rev.date}</span>
                    </div>

                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    <p className="text-xs text-slate-600">{rev.comment}</p>

                    <div className="flex items-center gap-3 pt-1 text-[10px] text-slate-500">
                      <span>Punctuality: ⭐ {rev.punctuality || 5}</span>
                      <span>•</span>
                      <span>Quality: ⭐ {rev.quality || 5}</span>
                      <span>•</span>
                      <span>Behaviour: ⭐ {rev.behaviour || 5}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400">No customer reviews recorded yet.</p>
            )}
          </div>
        </div>

        {/* Col 3: Cooperative Affiliation & Social Shield */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-coop-900 to-slate-900 text-white rounded-3xl p-6 shadow-elevated space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-coop-300">
              Cooperative Membership
            </span>
            <h3 className="text-lg font-bold">{worker.coopName}</h3>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between py-1.5 border-b border-white/10">
                <span className="text-slate-400">Membership ID:</span>
                <span className="font-mono font-bold text-coop-300">{worker.membershipId}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/10">
                <span className="text-slate-400">Verification Date:</span>
                <span>{worker.verificationDate}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/10">
                <span className="text-slate-400">Health Cover:</span>
                <span className="text-coop-400 font-bold">₹5,00,000 Ayushman</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Welfare Dividend Pool:</span>
                <span className="text-coop-300 font-bold">Active Participant</span>
              </div>
            </div>

            <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-[11px] text-slate-300">
              🔒 When you book {worker.name}, 80% goes directly to their family and 10% enters the cooperative welfare safety net.
            </div>
          </div>
        </div>
      </div>

      {/* Transparent Price Breakdown Modal */}
      <PaymentBreakdownModal
        isOpen={breakdownModalOpen}
        onClose={() => setBreakdownModalOpen(false)}
        amount={worker.hourlyRate}
      />
    </div>
  );
}
