import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Star, ShieldCheck, Phone, MapPin, Zap, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

// Helper component to center map dynamically
function MapCenterUpdater({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, zoom || 13);
    }
  }, [center, zoom, map]);
  return null;
}

export default function MapView({ workers = [], selectedWorkerId = null, onSelectWorker, height = '450px' }) {
  const { userLocation, categories } = useApp();
  const navigate = useNavigate();

  // Create custom marker icons
  const createWorkerIcon = (worker) => {
    const isTop = worker.isTopMatch;
    const isEmergency = worker.status === 'available';
    const bgColor = isTop ? '#16a34a' : '#1e40af';
    const borderColor = isEmergency ? '#22c55e' : '#94a3b8';

    const html = `
      <div style="
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background-color: white;
        border: 3px solid ${borderColor};
        box-shadow: 0 4px 12px rgba(0,0,0,0.25);
        cursor: pointer;
        transform: translate(-50%, -50%);
      ">
        <img 
          src="${worker.avatar}" 
          alt="${worker.name}" 
          style="width: 36px; height: 36px; border-radius: 50%; object-fit: cover;" 
        />
        ${isTop ? `
          <div style="
            position: absolute;
            bottom: -4px;
            right: -4px;
            background: #16a34a;
            color: white;
            font-size: 9px;
            font-weight: bold;
            padding: 1px 4px;
            border-radius: 8px;
            border: 1px solid white;
          ">
            AI
          </div>
        ` : ''}
      </div>
    `;

    return L.divIcon({
      html,
      className: 'custom-worker-pin',
      iconSize: [44, 44],
      iconAnchor: [22, 22]
    });
  };

  // User location marker
  const userIcon = L.divIcon({
    html: `
      <div style="
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: #ef4444;
        border: 3px solid white;
        box-shadow: 0 0 15px rgba(239, 68, 68, 0.8);
        transform: translate(-50%, -50%);
        position: relative;
      ">
        <div style="
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: #ef4444;
          opacity: 0.4;
          animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        "></div>
      </div>
    `,
    className: 'custom-user-pin',
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });

  const centerCoords = [userLocation.lat, userLocation.lng];

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-card border border-slate-200" style={{ height }}>
      <MapContainer
        center={centerCoords}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapCenterUpdater center={centerCoords} zoom={13} />

        {/* Customer Location Marker & Service Coverage Radius */}
        <Marker position={centerCoords} icon={userIcon}>
          <Popup>
            <div className="p-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600">Your Detected Location</span>
              <p className="text-xs font-semibold text-slate-800">{userLocation.name}</p>
            </div>
          </Popup>
        </Marker>

        <Circle
          center={centerCoords}
          radius={3500}
          pathOptions={{ color: '#16a34a', fillColor: '#22c55e', fillOpacity: 0.08, weight: 1.5, dashArray: '4, 6' }}
        />

        {/* Worker Markers */}
        {workers.map((worker) => (
          <Marker
            key={worker.id}
            position={[worker.lat, worker.lng]}
            icon={createWorkerIcon(worker)}
            eventHandlers={{
              click: () => onSelectWorker && onSelectWorker(worker)
            }}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={worker.avatar}
                    alt={worker.name}
                    className="w-10 h-10 rounded-full object-cover border border-coop-300"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 leading-tight">{worker.name}</h4>
                    <span className="text-[10px] text-coop-700 font-semibold flex items-center gap-0.5">
                      <ShieldCheck className="w-3 h-3 text-coop-600" />
                      {worker.coopName.split(' ')[0]} Co-op
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-1 text-[11px] bg-slate-50 p-2 rounded-lg mb-2">
                  <div>
                    <span className="text-slate-500 text-[10px] block">Distance</span>
                    <span className="font-bold text-slate-800">📍 {worker.distanceKm} km</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">Rating</span>
                    <span className="font-bold text-amber-600">⭐ {worker.rating}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">Starting Rate</span>
                    <span className="font-bold text-coop-700">₹{worker.hourlyRate}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">Response</span>
                    <span className="font-bold text-slate-800">~{worker.responseTimeMin}m</span>
                  </div>
                </div>

                {worker.aiMatchScore && (
                  <div className="mb-2 px-2 py-1 bg-coop-50 border border-coop-200 rounded text-[10px] text-coop-800 font-semibold flex items-center justify-between">
                    <span>AI Match Score:</span>
                    <span className="text-coop-700 font-bold">{worker.aiMatchScore}%</span>
                  </div>
                )}

                <div className="flex gap-1.5">
                  <button
                    onClick={() => navigate(`/worker/${worker.id}`)}
                    className="flex-1 text-center py-1.5 bg-coop-600 hover:bg-coop-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
                  >
                    Book Worker
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Map Legend Overlay */}
      <div className="absolute bottom-3 left-3 z-[1000] bg-white/90 backdrop-blur-md px-3 py-2 rounded-xl shadow-md border border-slate-200 text-[11px] space-y-1">
        <div className="flex items-center gap-2 font-semibold text-slate-800">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
          <span>Your Location (Ghaziabad)</span>
        </div>
        <div className="flex items-center gap-2 text-slate-600">
          <span className="w-2.5 h-2.5 rounded-full bg-coop-600"></span>
          <span>Verified Co-op Workers</span>
        </div>
        <div className="flex items-center gap-2 text-slate-600">
          <span className="w-2 h-2 rounded-full border border-coop-600"></span>
          <span>3.5 km Fast Dispatch Radius</span>
        </div>
      </div>
    </div>
  );
}
