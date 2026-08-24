import React, { useState } from 'react';
import { Sparkles, Info, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function AiMatchBadge({ score, reasons = [], compact = false }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const getScoreColor = (sc) => {
    if (sc >= 90) return 'from-coop-600 to-emerald-600 text-white border-coop-500';
    if (sc >= 80) return 'from-blue-600 to-indigo-600 text-white border-blue-500';
    return 'from-amber-600 to-yellow-600 text-white border-amber-500';
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowTooltip(!showTooltip);
        }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getScoreColor(
          score
        )} shadow-sm transition-all transform hover:scale-105`}
      >
        <Sparkles className="w-3 h-3" />
        <span>{score}% AI Match</span>
        <Info className="w-3 h-3 opacity-80" />
      </button>

      {/* AI Breakdown Popover */}
      {showTooltip && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-slate-900 text-white p-3.5 rounded-2xl shadow-elevated border border-slate-700 z-50 text-left text-xs pointer-events-auto">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
            <span className="font-bold flex items-center gap-1.5 text-coop-400">
              <Sparkles className="w-3.5 h-3.5" /> AI Ranking Rationale
            </span>
            <span className="text-xs font-black bg-coop-500/20 text-coop-300 px-2 py-0.5 rounded-full border border-coop-500/40">
              {score}% Match
            </span>
          </div>

          <p className="text-[11px] text-slate-300 mb-2">
            Algorithmic score weighted on distance, skills, cooperative verification, and customer ratings:
          </p>

          <ul className="space-y-1.5">
            {reasons.length > 0 ? (
              reasons.map((r, i) => (
                <li key={i} className="flex items-start gap-1.5 text-[11px] text-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-coop-400 shrink-0 mt-0.5" />
                  <span>{r}</span>
                </li>
              ))
            ) : (
              <li className="flex items-start gap-1.5 text-[11px] text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-coop-400 shrink-0 mt-0.5" />
                <span>Nearest verified cooperative tradesperson with top feedback.</span>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
