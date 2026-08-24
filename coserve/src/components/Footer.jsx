import React from 'react';
import { Link } from 'react-router-dom';
import { Users, ShieldCheck, Heart, Phone, Mail, MapPin, Award, CheckCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Cooperative Mission */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-coop-600 flex items-center justify-center text-white font-bold shadow-md">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                Co<span className="text-coop-400">Serve</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              India's first AI-powered, worker-governed cooperative gig services platform. Empowering local tradespeople with fair wages, ₹5L health insurance, and transparent pricing.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-coop-400 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700 w-fit">
              <ShieldCheck className="w-4 h-4 text-coop-400" />
              <span>100% Cooperative Owned</span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Services We Provide
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/services?cat=plumber" className="hover:text-white transition-colors">Emergency Plumbing & Pipe Fix</Link></li>
              <li><Link to="/services?cat=electrician" className="hover:text-white transition-colors">Electrician & MCB Tripping</Link></li>
              <li><Link to="/services?cat=carpenter" className="hover:text-white transition-colors">Carpentry & Lockout Help</Link></li>
              <li><Link to="/services?cat=caregiver" className="hover:text-white transition-colors">Certified Eldercare & Nursing</Link></li>
              <li><Link to="/services?cat=cleaner" className="hover:text-white transition-colors">Deep Home Cleaning</Link></li>
              <li><Link to="/services?cat=technician" className="hover:text-white transition-colors">AC & Appliance Maintenance</Link></li>
            </ul>
          </div>

          {/* Col 3: Cooperative Ecosystem */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Cooperative Shield
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/impact" className="hover:text-white transition-colors">Community Impact Dashboard</Link></li>
              <li><Link to="/worker-welfare" className="hover:text-white transition-colors">Ayushman Sahakar Insurance (₹5L)</Link></li>
              <li><Link to="/worker-register" className="hover:text-white transition-colors">Labour Co-op Member Registration</Link></li>
              <li><Link to="/admin" className="hover:text-white transition-colors">Federation Admin Portal</Link></li>
              <li><span className="text-coop-400 font-medium">Fair Trade Gig Economy Standard</span></li>
            </ul>
          </div>

          {/* Col 4: Regional Help & Verification */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              NCR Federation Support
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-coop-400 shrink-0 mt-0.5" />
                <span>Sector 62 & Indirapuram, Ghaziabad / Noida NCR</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-coop-400 shrink-0" />
                <span>1800-COOP-SERV (Toll-Free 24x7)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-coop-400 shrink-0" />
                <span>support@coserve.coop</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <span className="text-[11px] text-slate-400 block font-medium">Cooperative Partner Federations:</span>
              <p className="text-[10px] text-slate-500 mt-1">
                Ghaziabad Shramik Samiti • Noida Trades Fed • NCR Karigar Union
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 CoServe Cooperative Gig Services Platform. Open Source Hackathon Prototype.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Fair Wages Guaranteed (80%)</span>
            <span>•</span>
            <span>Zero Predatory Algorithms</span>
            <span>•</span>
            <span>Govt Co-op Registered</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
