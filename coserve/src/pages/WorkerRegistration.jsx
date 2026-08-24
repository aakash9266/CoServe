import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  User,
  Briefcase,
  ShieldCheck,
  UploadCloud,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  FileText,
  Clock,
  Sparkles,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function WorkerRegistration() {
  const { registerWorker, cooperatives, setRole } = useApp();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: 'Vikram Singh',
    phone: '+91 98765 43210',
    email: 'vikram.trades@gmail.com',
    location: 'Indirapuram, Ghaziabad',
    address: 'Flat 302, Gaur Green Vista, Indirapuram, Ghaziabad',
    primarySkillCategory: 'carpenter',
    primarySkill: 'Modular Kitchen Fitting & Lock Repair',
    additionalSkills: 'Door Hinge Repair, Antique Furniture Polish, Wood Laminate',
    experienceYears: '8',
    hourlyRate: '349',
    coopName: 'Ghaziabad Shramik Swavalamban Sahakari Samiti',
    coopMembershipId: 'GZB-MEM-2026-99',
    idProof: 'aadhaar_card.pdf',
    tradeCert: 'nsdc_carpenter_level4.pdf',
    coopLetter: 'sahakari_samiti_nomination.pdf'
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerWorker(formData);
    setSubmitted(true);

    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {}
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-coop-100 text-coop-800">
          <Award className="w-4 h-4 text-coop-700" />
          Labour Cooperative Federation Onboarding
        </div>
        <h1 className="text-3xl font-black text-slate-900">
          Register as a Cooperative Service Provider
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
          Get verified by your local Labour Cooperative. Enjoy 80% direct payouts, ₹5 Lakh medical coverage, and transparent job distribution.
        </p>
      </div>

      {submitted ? (
        /* Submitted Screen */
        <div className="bg-white rounded-3xl p-8 border border-coop-200 shadow-elevated text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto shadow-md">
            <Clock className="w-10 h-10" />
          </div>

          <div>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 mb-2">
              Status: Pending Cooperative Verification
            </span>
            <h2 className="text-2xl font-black text-slate-900">Application Submitted!</h2>
            <p className="text-xs text-slate-600 max-w-md mx-auto mt-1">
              Your application for <strong>{formData.name}</strong> has been routed to <strong>{formData.coopName}</strong> for document review.
            </p>
          </div>

          {/* Quick Hackathon Demo Hint */}
          <div className="p-4 rounded-2xl bg-slate-900 text-white text-xs max-w-md mx-auto text-left space-y-2">
            <div className="flex items-center gap-1.5 text-coop-400 font-bold">
              <Sparkles className="w-4 h-4" /> Hackathon Demo Note:
            </div>
            <p className="text-[11px] text-slate-300">
              You can now switch to the <strong>Cooperative Admin</strong> portal to approve this pending worker registration in 1-click!
            </p>
            <button
              onClick={() => {
                setRole('admin');
                navigate('/admin');
              }}
              className="w-full py-2 bg-coop-600 hover:bg-coop-700 text-white font-bold rounded-xl text-xs transition-colors"
            >
              Open Cooperative Admin to Verify →
            </button>
          </div>

          <div className="pt-2">
            <button
              onClick={() => navigate('/')}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Return to Homepage
            </button>
          </div>
        </div>
      ) : (
        /* Multi-step Registration Form */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
          {/* Progress Indicator */}
          <div className="grid grid-cols-4 gap-2 text-center text-xs font-bold">
            {[
              { num: 1, label: 'Personal' },
              { num: 2, label: 'Skills & Rate' },
              { num: 3, label: 'Cooperative' },
              { num: 4, label: 'Documents' }
            ].map((s) => (
              <div
                key={s.num}
                className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                  step === s.num
                    ? 'bg-coop-600 text-white border-coop-600 shadow-sm'
                    : step > s.num
                    ? 'bg-coop-50 text-coop-800 border-coop-300'
                    : 'bg-slate-50 text-slate-400 border-slate-200'
                }`}
              >
                <span className="text-[10px] uppercase">Step {s.num}</span>
                <span className="text-xs hidden sm:inline">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Step 1: Personal Info */}
          {step === 1 && (
            <form onSubmit={handleNext} className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <User className="w-5 h-5 text-coop-600" /> Step 1: Personal Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Legal Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile (Aadhaar linked):</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Operating Region / Zone:</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full p-3 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Residential Address:</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={2}
                  className="w-full p-3 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-coop-600 hover:bg-coop-700 text-white font-bold rounded-xl text-xs shadow-md transition-colors flex items-center gap-1.5"
                >
                  <span>Next: Professional Skills</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* Step 2: Professional Skills & Rates */}
          {step === 2 && (
            <form onSubmit={handleNext} className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-coop-600" /> Step 2: Skills & Service Rates
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Trade Category:</label>
                  <select
                    name="primarySkillCategory"
                    value={formData.primarySkillCategory}
                    onChange={handleChange}
                    className="w-full p-3 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none capitalize"
                  >
                    <option value="plumber">Plumber</option>
                    <option value="electrician">Electrician</option>
                    <option value="carpenter">Carpenter</option>
                    <option value="cleaner">Cleaner</option>
                    <option value="painter">Painter</option>
                    <option value="caregiver">Caregiver</option>
                    <option value="technician">Appliance Technician</option>
                    <option value="gardener">Gardener</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Years of Practical Experience:</label>
                  <input
                    type="number"
                    name="experienceYears"
                    value={formData.experienceYears}
                    onChange={handleChange}
                    min="1"
                    className="w-full p-3 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Skill Specialization:</label>
                  <input
                    type="text"
                    name="primarySkill"
                    value={formData.primarySkill}
                    onChange={handleChange}
                    placeholder="e.g. Master Wood Joinery, Inverter Wiring..."
                    className="w-full p-3 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Standard Visit Rate (₹):</label>
                  <input
                    type="number"
                    name="hourlyRate"
                    value={formData.hourlyRate}
                    onChange={handleChange}
                    min="100"
                    className="w-full p-3 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Additional Skills (Comma separated):</label>
                <input
                  type="text"
                  name="additionalSkills"
                  value={formData.additionalSkills}
                  onChange={handleChange}
                  className="w-full p-3 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-coop-600 hover:bg-coop-700 text-white font-bold rounded-xl text-xs shadow-md transition-colors flex items-center gap-1.5"
                >
                  <span>Next: Cooperative Info</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Cooperative Membership Info */}
          {step === 3 && (
            <form onSubmit={handleNext} className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-coop-600" /> Step 3: Cooperative Affiliation
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Select Your Labour Cooperative Society:</label>
                  <select
                    name="coopName"
                    value={formData.coopName}
                    onChange={handleChange}
                    className="w-full p-3 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none"
                  >
                    {cooperatives.map((c) => (
                      <option key={c.id} value={c.name}>{c.name} ({c.region})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Cooperative Membership / Passbook ID:</label>
                  <input
                    type="text"
                    name="coopMembershipId"
                    value={formData.coopMembershipId}
                    onChange={handleChange}
                    placeholder="e.g. GZB-MEM-2026-99"
                    className="w-full p-3 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none font-mono"
                    required
                  />
                </div>
              </div>

              <div className="p-3 bg-coop-50 border border-coop-200 rounded-2xl text-xs text-coop-900">
                💡 Being a verified member connects you automatically to the ₹5L Ayushman Sahakar health pool and emergency cooperative loan facility.
              </div>

              <div className="pt-2 flex justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-coop-600 hover:bg-coop-700 text-white font-bold rounded-xl text-xs shadow-md transition-colors flex items-center gap-1.5"
                >
                  <span>Next: Upload Documents</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* Step 4: Document Uploads & Review */}
          {step === 4 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-coop-600" /> Step 4: Verification Documents
              </h3>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-coop-600" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Government Photo ID (Aadhaar / Voter ID)</h4>
                      <span className="text-[10px] text-slate-500 font-mono">{formData.idProof}</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-coop-700 bg-coop-100 px-2.5 py-1 rounded-full">
                    Attached ✓
                  </span>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-coop-600" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Skill / Trade Certificate (NSDC / ITI)</h4>
                      <span className="text-[10px] text-slate-500 font-mono">{formData.tradeCert}</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-coop-700 bg-coop-100 px-2.5 py-1 rounded-full">
                    Attached ✓
                  </span>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-coop-600" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Cooperative Society Endorsement Letter</h4>
                      <span className="text-[10px] text-slate-500 font-mono">{formData.coopLetter}</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-coop-700 bg-coop-100 px-2.5 py-1 rounded-full">
                    Attached ✓
                  </span>
                </div>
              </div>

              <div className="pt-2 flex justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-coop-600 hover:bg-coop-700 text-white font-bold rounded-xl text-xs shadow-md transition-colors flex items-center gap-1.5"
                >
                  <span>Submit Application for Cooperative Verification</span>
                  <CheckCircle className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
