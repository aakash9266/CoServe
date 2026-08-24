import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  Zap,
  CreditCard,
  QrCode,
  Banknote,
  CheckCircle,
  ArrowRight,
  AlertCircle,
  FileText,
  Heart
} from 'lucide-react';
import { calculateFareBreakdown } from '../data/mockData';
import confetti from 'canvas-confetti';

export default function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { workers, createBooking, userLocation } = useApp();

  const worker = workers.find(w => w.id === id) || workers[0];

  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [timeSlot, setTimeSlot] = useState('11:00 AM - 01:00 PM');
  const [address, setAddress] = useState('Tower 4, Flat 702, Shipra Sun City, Indirapuram, Ghaziabad');
  const [serviceNotes, setServiceNotes] = useState('Inspection and repair needed.');
  const [isEmergency, setIsEmergency] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const basePrice = isEmergency ? (worker.emergencyRate || worker.hourlyRate + 100) : worker.hourlyRate;
  const breakdown = calculateFareBreakdown(basePrice);

  const timeSlots = [
    '09:00 AM - 11:00 AM',
    '11:00 AM - 01:00 PM',
    '02:00 PM - 04:00 PM',
    '04:00 PM - 06:00 PM',
    '06:00 PM - 08:00 PM'
  ];

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    const newBooking = createBooking({
      workerId: worker.id,
      workerName: worker.name,
      workerAvatar: worker.avatar,
      category: worker.category,
      serviceTitle: `${worker.category.toUpperCase()} Service (${isEmergency ? 'Emergency' : 'Scheduled'})`,
      isEmergency,
      scheduledDate: date,
      scheduledTime: isEmergency ? 'Immediate (~15 mins)' : timeSlot,
      customerAddress: address,
      totalAmount: basePrice,
      paymentMethod
    });

    setConfirmedBooking(newBooking);

    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (err) {}
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {confirmedBooking ? (
        /* Confirmation Screen */
        <div className="bg-white rounded-3xl p-8 border border-coop-200 shadow-elevated text-center space-y-6 animate-fadeIn">
          <div className="w-20 h-20 rounded-full bg-coop-100 text-coop-700 flex items-center justify-center mx-auto shadow-md">
            <CheckCircle className="w-12 h-12" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-coop-700">
              Cooperative Service Dispatched
            </span>
            <h1 className="text-3xl font-black text-slate-900 mt-1">Booking Confirmed!</h1>
            <p className="text-xs text-slate-500 mt-1">
              Booking ID: <strong className="font-mono text-slate-900">{confirmedBooking.id}</strong>
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs max-w-md mx-auto space-y-3">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
              <img
                src={worker.avatar}
                alt={worker.name}
                className="w-12 h-12 rounded-xl object-cover border border-coop-300"
              />
              <div>
                <h4 className="text-sm font-bold text-slate-900">{worker.name}</h4>
                <p className="text-xs text-coop-700 font-semibold">{worker.coopName}</p>
                <span className="text-[11px] text-slate-500">Contact: {worker.phone}</span>
              </div>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Date & Slot:</span>
              <strong className="text-slate-900">{confirmedBooking.scheduledDate} ({confirmedBooking.scheduledTime})</strong>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Service Location:</span>
              <span className="text-slate-900 font-medium text-right max-w-[200px] truncate">{address}</span>
            </div>

            <div className="flex justify-between pt-2 border-t border-slate-200 font-bold">
              <span className="text-slate-700">Total Fair Fare:</span>
              <span className="text-coop-800 text-sm">₹{confirmedBooking.totalAmount}</span>
            </div>

            <div className="p-2.5 rounded-xl bg-coop-50 border border-coop-200 text-[11px] text-coop-800 flex items-center gap-2">
              <Heart className="w-4 h-4 text-coop-600 shrink-0" />
              <span>₹{confirmedBooking.breakdown.workerEarning} direct to worker • ₹{confirmedBooking.breakdown.coopWelfare} to Welfare Fund</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto pt-2">
            <button
              onClick={() => navigate('/customer-dashboard')}
              className="w-full py-3 bg-coop-600 hover:bg-coop-700 text-white font-bold rounded-xl shadow-md text-xs transition-colors flex items-center justify-center gap-2"
            >
              <span>Track Live Booking</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/services')}
              className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors"
            >
              Browse More Services
            </button>
          </div>
        </div>
      ) : (
        /* Booking Form */
        <div className="space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-coop-700">Fair & Transparent Checkout</span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5">Schedule Your Service</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form Fields */}
            <form onSubmit={handleBookingSubmit} className="lg:col-span-2 space-y-6">
              {/* Worker Quick Card */}
              <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-center justify-between shadow-soft">
                <div className="flex items-center gap-3">
                  <img
                    src={worker.avatar}
                    alt={worker.name}
                    className="w-12 h-12 rounded-xl object-cover border border-coop-300"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{worker.name}</h3>
                    <p className="text-xs text-coop-700 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {worker.coopName}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-amber-600">⭐ {worker.rating}</span>
                  <span className="text-xs text-slate-500 block">📍 {worker.distanceKm} km</span>
                </div>
              </div>

              {/* Emergency Toggle */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-red-50 to-rose-50 border border-rose-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Zap className="w-5 h-5 text-red-600" />
                  <div>
                    <h4 className="text-xs font-bold text-red-900">Urgent SOS Request</h4>
                    <p className="text-[11px] text-red-700">Dispatch worker immediately within ~15 minutes</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isEmergency}
                    onChange={(e) => setIsEmergency(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                </label>
              </div>

              {/* Date & Time Slot (Only if not emergency) */}
              {!isEmergency && (
                <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-soft space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-coop-600" /> Select Date & Time Slot
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Service Date:</label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full p-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Preferred Slot:</label>
                      <select
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        className="w-full p-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none"
                      >
                        {timeSlots.map((slot, i) => (
                          <option key={i} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Service Location */}
              <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-soft space-y-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-500" /> Service Location
                </h3>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter house/flat number, apartment, sector, Ghaziabad..."
                  className="w-full p-3 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none"
                  required
                />
                <div className="flex items-center gap-1.5 text-[11px] text-coop-700 font-semibold">
                  <CheckCircle className="w-3.5 h-3.5 text-coop-600" />
                  <span>GPS Confirmed: Ghaziabad Trans-Hindon Zone (Within Coverage Radius)</span>
                </div>
              </div>

              {/* Service Notes */}
              <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-soft space-y-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-coop-600" /> Job Notes for Worker
                </h3>
                <textarea
                  value={serviceNotes}
                  onChange={(e) => setServiceNotes(e.target.value)}
                  placeholder="Describe the issue, tools required, or any specific instructions..."
                  rows={2}
                  className="w-full p-3 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none"
                />
              </div>

              {/* Payment Method Selector */}
              <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-soft space-y-3">
                <h3 className="text-sm font-bold text-slate-900">Select Payment Method</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'UPI', label: 'UPI / QR', icon: QrCode },
                    { id: 'Cards', label: 'Cards / NetBanking', icon: CreditCard },
                    { id: 'Wallet', label: 'Co-op Wallet', icon: ShieldCheck },
                    { id: 'Cash after Service', label: 'Cash on Delivery', icon: Banknote },
                  ].map((method) => {
                    const Icon = method.icon;
                    const isSelected = paymentMethod === method.id;
                    return (
                      <button
                        type="button"
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all ${
                          isSelected
                            ? 'bg-coop-50 border-coop-500 text-coop-800 font-bold shadow-sm'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${isSelected ? 'text-coop-600' : 'text-slate-400'}`} />
                        <span className="text-[11px]">{method.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 bg-coop-600 hover:bg-coop-700 text-white font-bold rounded-2xl shadow-md text-sm transition-all transform hover:scale-[1.01] flex items-center justify-center gap-2"
              >
                <span>Confirm & Dispatch Booking (₹{basePrice})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Fare Summary & Rupee Transparency Breakdown (Section 13) */}
            <div className="space-y-4">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4 sticky top-24">
                <div className="border-b border-slate-100 pb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-coop-700">
                    Transparent Itemization
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-0.5">Fare Summary</h3>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Base Service Fee:</span>
                    <span className="font-semibold text-slate-900">₹{basePrice}</span>
                  </div>
                  {isEmergency && (
                    <div className="flex justify-between text-red-600 font-semibold">
                      <span>Emergency SOS Priority:</span>
                      <span>Included</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-600">
                    <span>Taxes & GST (0% Co-op Exemption):</span>
                    <span className="font-semibold text-coop-700">₹0 (Waived)</span>
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-black text-slate-900">
                    <span>Total Amount:</span>
                    <span className="text-coop-700 text-base">₹{basePrice}</span>
                  </div>
                </div>

                {/* Where Does the Money Go? */}
                <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                    Rupee Distribution (100% Transparent)
                  </span>

                  <div className="p-3 bg-slate-50 rounded-2xl space-y-1.5 text-[11px]">
                    <div className="flex justify-between text-coop-800 font-semibold">
                      <span>Worker Direct Payout (80%):</span>
                      <span>₹{breakdown.workerPayout}</span>
                    </div>
                    <div className="flex justify-between text-blue-700">
                      <span>Cooperative Welfare Fund (10%):</span>
                      <span>₹{breakdown.coopWelfare}</span>
                    </div>
                    <div className="flex justify-between text-amber-700">
                      <span>₹5L Health & Accident Cover (6%):</span>
                      <span>₹{breakdown.insuranceCover}</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Platform Tech Maintenance (4%):</span>
                      <span>₹{breakdown.platformFee}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
