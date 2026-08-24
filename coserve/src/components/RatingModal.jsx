import React, { useState } from 'react';
import { Star, X, CheckCircle, HeartHandshake } from 'lucide-react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';

export default function RatingModal({ isOpen, onClose, booking }) {
  const { rateBooking } = useApp();

  const [overallRating, setOverallRating] = useState(5);
  const [punctuality, setPunctuality] = useState(5);
  const [quality, setQuality] = useState(5);
  const [behaviour, setBehaviour] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen || !booking) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    rateBooking(booking.id, {
      overall: overallRating,
      punctuality,
      quality,
      behaviour,
      review: reviewText
    });

    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {}

    setTimeout(() => {
      onClose();
      setIsSubmitted(false);
    }, 1800);
  };

  const renderStarSelector = (value, onChange, max = 5) => {
    return (
      <div className="flex items-center gap-1.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            type="button"
            key={star}
            onClick={() => onChange(star)}
            className="p-1 text-2xl transition-transform hover:scale-125 focus:outline-none"
          >
            <Star
              className={`w-6 h-6 ${
                star <= value ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
              }`}
            />
          </button>
        ))}
        <span className="text-xs font-bold text-slate-700 ml-2">{value} / 5</span>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-elevated border border-slate-200 overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-16 h-16 rounded-full bg-coop-100 text-coop-700 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle className="w-9 h-9" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Review Submitted!</h3>
            <p className="text-xs text-slate-500">
              Thank you for strengthening our cooperative trades community with honest feedback.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-center">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-coop-700 bg-coop-50 px-2.5 py-1 rounded-full uppercase tracking-wider mb-1">
                <HeartHandshake className="w-3.5 h-3.5" /> Rate Cooperative Service
              </span>
              <h3 className="text-xl font-black text-slate-900">
                Rate {booking.workerName}
              </h3>
              <p className="text-xs text-slate-500">
                Booking ID: {booking.id} • {booking.serviceTitle}
              </p>
            </div>

            {/* Overall Star Rating */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <span className="text-xs font-semibold text-slate-700 block mb-1">Overall Satisfaction</span>
              <div className="flex justify-center">
                {renderStarSelector(overallRating, setOverallRating)}
              </div>
            </div>

            {/* Dimensional Criteria */}
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-600 font-medium">Punctuality & Arrival:</span>
                {renderStarSelector(punctuality, setPunctuality)}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-600 font-medium">Work Quality & Skill:</span>
                {renderStarSelector(quality, setQuality)}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-600 font-medium">Behaviour & Politeness:</span>
                {renderStarSelector(behaviour, setBehaviour)}
              </div>
            </div>

            {/* Written Review */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Your Review & Cooperative Experience:
              </label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share how this worker performed and how cooperative transparent pricing felt..."
                rows={3}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-coop-500 focus:outline-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 bg-coop-600 hover:bg-coop-700 text-white font-bold rounded-xl shadow-md text-xs transition-colors"
            >
              Submit Verified Feedback
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
