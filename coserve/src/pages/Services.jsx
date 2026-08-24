import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Search,
  Filter,
  MapPin,
  Star,
  ShieldCheck,
  Zap,
  SlidersHorizontal,
  LayoutGrid,
  Map as MapIcon,
  Clock,
  ArrowUpDown,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { rankWorkersForService } from '../utils/aiMatcher';
import MapView from '../components/MapView';
import AiMatchBadge from '../components/AiMatchBadge';

export default function Services() {
  const { workers, categories, userLocation, t } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Filters from Query Params or Local State
  const initialCategory = searchParams.get('cat') || 'all';
  const initialSearch = searchParams.get('q') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [maxDistance, setMaxDistance] = useState(10);
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortBy, setSortBy] = useState('aiMatch'); // aiMatch | distance | rating | price
  const [viewMode, setViewMode] = useState('grid'); // grid | map
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  // Compute AI Match scores & Filter Workers
  const processedWorkers = useMemo(() => {
    // 1. Run through AI Matcher
    const ranked = rankWorkersForService(workers, {
      targetCategory: selectedCategory === 'all' ? '' : selectedCategory,
      searchQuery: searchQuery,
      maxDistanceKm: maxDistance
    });

    // 2. Filter criteria
    return ranked.filter((w) => {
      // Category match
      if (selectedCategory !== 'all' && w.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      // Text Search
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesName = w.name.toLowerCase().includes(q);
        const matchesCat = w.category.toLowerCase().includes(q);
        const matchesSkills = w.secondarySkills?.some(s => s.toLowerCase().includes(q));
        if (!matchesName && !matchesCat && !matchesSkills) return false;
      }
      // Distance filter
      if (w.distanceKm > maxDistance) return false;
      // Rating filter
      if (w.rating < minRating) return false;
      // Price filter
      if (w.hourlyRate > maxPrice) return false;
      // Availability filter
      if (onlyAvailable && w.status !== 'available') return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price') return a.hourlyRate - b.hourlyRate;
      return (b.aiMatchScore || 0) - (a.aiMatchScore || 0); // Default AI Match
    });
  }, [workers, selectedCategory, searchQuery, maxDistance, minRating, maxPrice, sortBy, onlyAvailable]);

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    setSearchParams(catId === 'all' ? {} : { cat: catId });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-coop-700">
            Cooperative Verified Network
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5">
            Find Trusted Local Service Providers
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Centred at <strong className="text-slate-800">{userLocation.name}</strong> • Vetted by Labour Cooperative Societies
          </p>
        </div>

        {/* View Mode Toggle (Grid vs Map) */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200 self-start md:self-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'grid'
                ? 'bg-white text-coop-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Grid Cards</span>
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'map'
                ? 'bg-white text-coop-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MapIcon className="w-4 h-4" />
            <span>Interactive Map</span>
          </button>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => handleCategorySelect('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            selectedCategory === 'all'
              ? 'bg-coop-700 text-white shadow-sm'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          All Services ({workers.length})
        </button>
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count = workers.filter(w => w.category.toLowerCase() === cat.id.toLowerCase()).length;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-coop-700 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>{cat.name}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search & Filter Controls Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-soft grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Search Query */}
        <div className="md:col-span-4 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by skill, name or task..."
            className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-coop-500 focus:outline-none"
          />
        </div>

        {/* Max Distance Slider */}
        <div className="md:col-span-3 flex items-center gap-2 text-xs">
          <span className="text-slate-500 shrink-0 font-medium">Radius:</span>
          <input
            type="range"
            min="1"
            max="15"
            value={maxDistance}
            onChange={(e) => setMaxDistance(Number(e.target.value))}
            className="w-full accent-coop-600 cursor-pointer"
          />
          <span className="font-bold text-slate-800 shrink-0">{maxDistance} km</span>
        </div>

        {/* Min Rating Filter */}
        <div className="md:col-span-2 text-xs">
          <select
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
            className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-medium focus:outline-none cursor-pointer"
          >
            <option value="0">All Ratings</option>
            <option value="4.5">⭐ 4.5 & Above</option>
            <option value="4.8">⭐ 4.8 & Above</option>
          </select>
        </div>

        {/* Sort Dropdown */}
        <div className="md:col-span-3 text-xs flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-bold focus:outline-none cursor-pointer"
          >
            <option value="aiMatch">Sort by: AI Best Match</option>
            <option value="distance">Sort by: Nearest Distance</option>
            <option value="rating">Sort by: Highest Rating</option>
            <option value="price">Sort by: Lowest Price</option>
          </select>
        </div>
      </div>

      {/* Main Content Area: Map View OR Grid Cards View */}
      {viewMode === 'map' ? (
        <div className="space-y-4">
          <div className="h-[550px]">
            <MapView
              workers={processedWorkers}
              height="550px"
              onSelectWorker={(w) => navigate(`/worker/${w.id}`)}
            />
          </div>
          <p className="text-xs text-slate-500 text-center">
            Click on any cooperative pin on the map to inspect worker credentials and initiate direct booking.
          </p>
        </div>
      ) : (
        <div>
          {/* Results Summary */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-700">
              Showing <strong className="text-coop-800">{processedWorkers.length}</strong> verified cooperative workers
            </span>
            <div className="flex items-center gap-2">
              <label className="text-xs text-slate-600 flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyAvailable}
                  onChange={(e) => setOnlyAvailable(e.target.checked)}
                  className="rounded text-coop-600 focus:ring-coop-500 accent-coop-600"
                />
                <span>Available Now Only</span>
              </label>
            </div>
          </div>

          {/* Workers Grid */}
          {processedWorkers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {processedWorkers.map((worker) => {
                const isAvailable = worker.status === 'available';

                return (
                  <div
                    key={worker.id}
                    className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between group relative overflow-hidden"
                  >
                    {/* Top Worker Info */}
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img
                              src={worker.avatar}
                              alt={worker.name}
                              className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-100 group-hover:border-coop-500 transition-colors shadow-sm"
                            />
                            <span
                              className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                                isAvailable ? 'bg-coop-500' : 'bg-slate-400'
                              }`}
                              title={isAvailable ? 'Available Now' : 'Busy'}
                            />
                          </div>

                          <div>
                            <div className="flex items-center gap-1.5">
                              <h3 className="text-base font-bold text-slate-900 group-hover:text-coop-700 transition-colors">
                                {worker.name}
                              </h3>
                            </div>
                            <span className="text-xs font-semibold text-coop-800 capitalize flex items-center gap-1">
                              <ShieldCheck className="w-3.5 h-3.5 text-coop-600" />
                              {worker.category} ({worker.experienceYears} yrs exp)
                            </span>
                            <span className="text-[11px] text-slate-400 block mt-0.5">
                              {worker.coopName.split(' ')[0]} Cooperative
                            </span>
                          </div>
                        </div>

                        {/* AI Match Badge */}
                        <AiMatchBadge score={worker.aiMatchScore || 92} reasons={worker.aiReasons} />
                      </div>

                      {/* Bio / Secondary Skills */}
                      <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                        {worker.bio}
                      </p>

                      {/* Secondary Skills Badges */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {worker.secondarySkills?.slice(0, 3).map((skill, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Metric Badges Grid */}
                      <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-2xl text-center text-xs mb-4">
                        <div>
                          <span className="text-slate-400 text-[10px] block">Rating</span>
                          <span className="font-bold text-amber-600 flex items-center justify-center gap-0.5">
                            ⭐ {worker.rating}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[10px] block">Distance</span>
                          <span className="font-bold text-slate-800">
                            📍 {worker.distanceKm} km
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[10px] block">Jobs Done</span>
                          <span className="font-bold text-coop-700">
                            {worker.completedJobs}+
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Pricing & Actions */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Starting Price</span>
                        <span className="text-lg font-black text-slate-900">
                          ₹{worker.hourlyRate}
                          <span className="text-xs font-normal text-slate-500"> / visit</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => navigate(`/worker/${worker.id}`)}
                          className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => navigate(`/book/${worker.id}`)}
                          className="px-4 py-2 bg-coop-600 hover:bg-coop-700 text-white font-bold rounded-xl text-xs shadow-md transition-all hover:scale-105"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Filter className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800">No Workers Match Your Current Filter</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try widening your distance slider or resetting your service category filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setMaxDistance(15);
                  setMinRating(0);
                  setOnlyAvailable(false);
                }}
                className="px-4 py-2 bg-coop-600 text-white text-xs font-bold rounded-xl shadow-sm"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
