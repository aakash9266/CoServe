import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Zap,
  Droplet,
  Flame,
  Lock,
  HeartHandshake,
  Wrench,
  ShieldCheck,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  X,
  ArrowRight,
  Radar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

export default function EmergencyModal({ isOpen, onClose }) {
  const {
    workers,
    createBooking,
    activeEmergencyCategory,
    setActiveEmergencyCategory,
    userLocation
  } = useApp();

  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: Select Type, 2: Radar Scanning & AI Auto-Match, 3: Dispatch Confirmed
  const [selectedType, setSelectedType] = useState(activeEmergencyCategory || 'plumber');
  const [matchedWorker, setMatchedWorker] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [createdBooking, setCreatedBooking] = useState(null);

  const emergencyCategories = [
    {
      id: 'plumber',
      title: 'Water Leakage / Pipe Burst',
      desc: 'Immediate emergency shutoff and pipe welding/clamp fix.',
      icon: Droplet,
      color: 'sky',
      eta: '12 mins',
      rate: 349
    },
    {
      id: 'electrician',
      title: 'Electrical Spark / MCB Tripping',
      desc: 'Short circuit troubleshooting & emergency power restoration.',
      icon: Flame,
      color: 'amber',
      eta: '15 mins',
      rate: 399
    },
    {
      id: 'carpenter',
      title: 'Broken Lock / Door Lockout',
      desc: 'Urgent lockout assistance & safety lock replacement.',
      icon: Lock,
      color: 'orange',
      eta: '18 mins',
      rate: 449
    },
    {
      id: 'caregiver',
      title: 'Urgent Caregiver Assistance',
      desc: 'Emergency eldercare nursing, vitals check & patient support.',
      icon: HeartHandshake,
      color: 'rose',
      eta: '20 mins',
      rate: 749
    }
  ];

  useEffect(() => {
    if (activeEmergencyCategory) {
      setSelectedType(activeEmergencyCategory);
    }
  }, [activeEmergencyCategory]);

  const handleStartSearch = (catId) => {
    setSelectedType(catId);
    setStep(2);
    setIsScanning(true);

    // Simulate AI radar scanning nearby verified workers
    setTimeout(() => {
      // Find top available worker for this category
      const availableWorkers = workers.filter(
        w => w.category.toLowerCase() === catId.toLowerCase() && w.status === 'available'
      );
      const topWorker = availableWorkers[0] || workers[0];
      setMatchedWorker(topWorker);
      setIsScanning(false);
    }, 1500);
  };

  const handleConfirmEmergencyDispatch = () => {
    if (!matchedWorker) return;

    const currentCatObj = emergencyCategories.find(c => c.id === selectedType) || emergencyCategories[0];

    const booking = createBooking({
      workerId: matchedWorker.id,
      workerName: matchedWorker.name,
      workerAvatar: matchedWorker.avatar,
      category: matchedWorker.category,
      serviceTitle: `🚨 EMERGENCY: ${currentCatObj.title}`,
      isEmergency: true,
      totalAmount: currentCatObj.rate,
      customerAddress: userLocation.name,
      paymentMethod: 'UPI (GPay / PhonePe)'
    });

    setCreatedBooking(booking);
    setStep(3);

    // Confetti burst for reassurance
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  const handleTrackBooking = () => {
    onClose();
    navigate('/customer-dashboard');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-elevated border border-rose-200 overflow-hidden relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step 1: Select Emergency Category */}
        {step === 1 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 rounded-xl bg-red-100 text-red-600 animate-pulse">
                <Zap className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-xl font-black text-slate-900">🚨 1-Click Emergency SOS</h3>
                <p className="text-xs text-slate-500">Fastest verified cooperative worker dispatch in Ghaziabad</p>
              </div>
            </div>

            <div className="p-3 bg-red-50/80 border border-red-200 rounded-2xl mb-4 text-xs text-red-800 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
              <span>Priority SOS channels bypass queues to notify nearest standby cooperative members.</span>
            </div>

            <div className="space-y-2.5 mb-5">
              {emergencyCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleStartSearch(cat.id)}
                    className="w-full p-3.5 rounded-2xl border border-slate-200 hover:border-red-400 hover:bg-red-50/40 flex items-center justify-between text-left transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-red-100 text-slate-700 group-hover:text-red-600 flex items-center justify-center transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-red-900">{cat.title}</h4>
                        <p className="text-[11px] text-slate-500">{cat.desc}</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-red-600 block">ETA ~{cat.eta}</span>
                      <span className="text-[11px] text-slate-500 font-semibold">₹{cat.rate}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1">
              <MapPin className="w-3 h-3 text-red-500" />
              <span>Detecting GPS Location: {userLocation.name}</span>
            </div>
          </div>
        )}

        {/* Step 2: Radar Scanning & Nearest Worker Lock */}
        {step === 2 && (
          <div className="text-center py-4">
            {isScanning ? (
              <div className="space-y-4">
                <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-4 border-red-500/20 animate-ping"></div>
                  <div className="absolute inset-2 rounded-full border-4 border-red-500/40 animate-pulse"></div>
                  <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg">
                    <Radar className="w-8 h-8 animate-spin" />
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-slate-900">Scanning Nearest Verified Cooperative Fleet...</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Matching certified tradespersons within 3.5 km of {userLocation.name}
                  </p>
                </div>
              </div>
            ) : matchedWorker ? (
              <div className="space-y-4 text-left">
                <div className="text-center mb-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-coop-100 text-coop-800">
                    <CheckCircle className="w-3.5 h-3.5 text-coop-700" />
                    Nearest Verified Tradesperson Found
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-1">Priority Dispatch Lock</h3>
                </div>

                {/* Worker Card */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-coop-50/40 border border-coop-200">
                  <div className="flex items-center gap-3.5 mb-3">
                    <img
                      src={matchedWorker.avatar}
                      alt={matchedWorker.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-coop-500 shadow-md"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-base font-bold text-slate-900">{matchedWorker.name}</h4>
                        <span className="text-[10px] bg-coop-600 text-white px-1.5 py-0.5 rounded font-bold">
                          98% AI Match
                        </span>
                      </div>
                      <p className="text-xs text-coop-800 font-semibold flex items-center gap-1 mt-0.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-coop-600" />
                        {matchedWorker.coopName}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-slate-600 mt-1">
                        <span>⭐ {matchedWorker.rating} ({matchedWorker.completedJobs}+ jobs)</span>
                        <span>•</span>
                        <span>{matchedWorker.experienceYears} yrs exp</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 bg-white p-3 rounded-xl border border-slate-200/80 text-xs">
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">Distance</span>
                      <span className="font-extrabold text-slate-800 text-sm">📍 {matchedWorker.distanceKm} km away</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">Estimated Arrival</span>
                      <span className="font-extrabold text-red-600 text-sm flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> ~{matchedWorker.responseTimeMin || 12} mins
                      </span>
                    </div>
                  </div>
                </div>

                {/* Confirm Dispatch CTA */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setStep(1)}
                    className="py-3 px-4 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleConfirmEmergencyDispatch}
                    className="flex-1 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold rounded-xl shadow-md text-sm flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Request Emergency Dispatch (₹{matchedWorker.emergencyRate || 349})</span>
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* Step 3: Dispatch Confirmed */}
        {step === 3 && createdBooking && (
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 rounded-full bg-coop-100 text-coop-700 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-coop-700">
                Cooperative Dispatch Activated
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-0.5">Worker En Route!</h3>
              <p className="text-xs text-slate-600 mt-1">
                Booking ID: <strong className="text-slate-900 font-mono">{createdBooking.id}</strong>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-slate-500">Assigned Professional:</span>
                <strong className="text-slate-900">{createdBooking.workerName}</strong>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-slate-500">Estimated Arrival:</span>
                <strong className="text-red-600 font-bold">~12 minutes</strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Welfare Contribution:</span>
                <span className="text-coop-700 font-bold">₹{createdBooking.breakdown.coopWelfare} credited to worker shield</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleTrackBooking}
                className="w-full py-3 bg-coop-600 hover:bg-coop-700 text-white font-bold rounded-xl shadow-md text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <span>Track Worker on Live Map</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
