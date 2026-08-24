import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_WORKERS,
  INITIAL_PENDING_WORKERS,
  INITIAL_BOOKINGS,
  SERVICE_CATEGORIES,
  COOPERATIVE_SOCIETIES,
  AI_DEMAND_INSIGHTS,
  DEMO_LOCATION,
  calculateFareBreakdown
} from '../data/mockData';
import { TRANSLATIONS } from '../data/translations';
import { rankWorkersForService } from '../utils/aiMatcher';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // 1. Role & Identity Management
  const [role, setRole] = useState(() => localStorage.getItem('coserve_role') || 'customer');
  const [language, setLanguage] = useState(() => localStorage.getItem('coserve_lang') || 'en');
  
  // Current active worker profile when in Worker mode (defaults to w-1 Ramesh Kumar)
  const [activeWorkerId, setActiveWorkerId] = useState('w-1');

  // 2. Persistent State
  const [workers, setWorkers] = useState(() => {
    const saved = localStorage.getItem('coserve_workers');
    return saved ? JSON.parse(saved) : INITIAL_WORKERS;
  });

  const [pendingWorkers, setPendingWorkers] = useState(() => {
    const saved = localStorage.getItem('coserve_pending_workers');
    return saved ? JSON.parse(saved) : INITIAL_PENDING_WORKERS;
  });

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('coserve_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'Welcome to CoServe!',
      message: 'Cooperative gig platform is live in Ghaziabad & Delhi NCR.',
      time: 'Just now',
      type: 'info',
      read: false
    }
  ]);

  const [aiDemandData, setAiDemandData] = useState(AI_DEMAND_INSIGHTS);
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);
  const [activeEmergencyCategory, setActiveEmergencyCategory] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('coserve_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('coserve_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('coserve_workers', JSON.stringify(workers));
  }, [workers]);

  useEffect(() => {
    localStorage.setItem('coserve_pending_workers', JSON.stringify(pendingWorkers));
  }, [pendingWorkers]);

  useEffect(() => {
    localStorage.setItem('coserve_bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Translation Helper
  const t = (key) => {
    const langDict = TRANSLATIONS[language] || TRANSLATIONS.en;
    return langDict[key] || TRANSLATIONS.en[key] || key;
  };

  const addNotification = (title, message, type = 'info') => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      title,
      message,
      time: 'Just now',
      type,
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Actions: Customer Flow
  const createBooking = (bookingData) => {
    const newBookingId = `BK-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const breakdown = calculateFareBreakdown(bookingData.totalAmount);
    
    const newBooking = {
      id: newBookingId,
      workerId: bookingData.workerId,
      workerName: bookingData.workerName,
      workerAvatar: bookingData.workerAvatar,
      category: bookingData.category,
      serviceTitle: bookingData.serviceTitle || `${bookingData.category} Standard Service`,
      isEmergency: !!bookingData.isEmergency,
      status: 'pending', // pending -> accepted -> in_progress -> completed
      scheduledDate: bookingData.scheduledDate || new Date().toISOString().split('T')[0],
      scheduledTime: bookingData.scheduledTime || 'Immediate',
      customerName: bookingData.customerName || 'Aakash Sharma',
      customerPhone: bookingData.customerPhone || '+91 99887 76655',
      customerAddress: bookingData.customerAddress || DEMO_LOCATION.name,
      customerCoords: [DEMO_LOCATION.lat, DEMO_LOCATION.lng],
      totalAmount: bookingData.totalAmount,
      breakdown: {
        workerEarning: breakdown.workerPayout,
        coopWelfare: breakdown.coopWelfare,
        insuranceFund: breakdown.insuranceCover,
        platformFee: breakdown.platformFee
      },
      paymentMethod: bookingData.paymentMethod || 'UPI',
      paymentStatus: bookingData.paymentMethod === 'Cash after Service' ? 'pending' : 'paid',
      rated: false,
      timeline: [
        { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), label: 'Booking Placed & Dispatched' }
      ]
    };

    setBookings(prev => [newBooking, ...prev]);

    // Send notification to worker
    addNotification(
      'New Booking Dispatched!',
      `Booking ${newBookingId} sent to worker ${bookingData.workerName}. (Fair payout: ₹${breakdown.workerPayout})`,
      'success'
    );

    return newBooking;
  };

  // Actions: Worker Flow
  const acceptJobRequest = (bookingId) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          status: 'accepted',
          timeline: [
            ...b.timeline,
            { time: timeStr, label: 'Worker Accepted & En Route' }
          ]
        };
      }
      return b;
    }));

    addNotification('Job Accepted', `Booking ${bookingId} is now active. Customer notified!`, 'success');
  };

  const updateJobProgress = (bookingId, newStatus) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let statusLabel = 'Job status updated';
    if (newStatus === 'in_progress') statusLabel = 'Service In Progress on site';
    if (newStatus === 'completed') statusLabel = 'Service Completed & Inspected';

    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        // If completed, update worker stats
        if (newStatus === 'completed' && b.status !== 'completed') {
          // Increase worker's completed jobs & welfare
          setWorkers(wList => wList.map(w => {
            if (w.id === b.workerId) {
              return {
                ...w,
                completedJobs: w.completedJobs + 1,
                welfareBalance: w.welfareBalance + (b.breakdown?.coopWelfare || 50)
              };
            }
            return w;
          }));
        }

        return {
          ...b,
          status: newStatus,
          paymentStatus: newStatus === 'completed' ? 'paid' : b.paymentStatus,
          timeline: [
            ...b.timeline,
            { time: timeStr, label: statusLabel }
          ]
        };
      }
      return b;
    }));

    addNotification('Service Update', `Booking ${bookingId}: ${statusLabel}`, 'info');
  };

  const declineJobRequest = (bookingId) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return { ...b, status: 'cancelled' };
      }
      return b;
    }));
    addNotification('Job Declined', `Booking ${bookingId} was declined and rerouted.`, 'warning');
  };

  const toggleWorkerAvailability = (workerId) => {
    setWorkers(prev => prev.map(w => {
      if (w.id === workerId) {
        const nextStatus = w.status === 'available' ? 'busy' : 'available';
        addNotification(
          'Availability Changed',
          `${w.name} is now ${nextStatus.toUpperCase()}`,
          nextStatus === 'available' ? 'success' : 'info'
        );
        return { ...w, status: nextStatus };
      }
      return w;
    }));
  };

  // Actions: Rating & Feedback
  const rateBooking = (bookingId, ratingObj) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        // Update worker rating average
        setWorkers(wList => wList.map(w => {
          if (w.id === b.workerId) {
            const newCount = (w.ratingCount || 1) + 1;
            const newRating = Number((((w.rating * w.ratingCount) + ratingObj.overall) / newCount).toFixed(1));
            const newReview = {
              id: `rev-${Date.now()}`,
              customerName: b.customerName,
              rating: ratingObj.overall,
              date: new Date().toISOString().split('T')[0],
              comment: ratingObj.review || 'Excellent cooperative service!',
              punctuality: ratingObj.punctuality,
              quality: ratingObj.quality,
              behaviour: ratingObj.behaviour
            };
            return {
              ...w,
              rating: newRating,
              ratingCount: newCount,
              reviews: [newReview, ...w.reviews]
            };
          }
          return w;
        }));

        return {
          ...b,
          rated: true,
          userRating: ratingObj
        };
      }
      return b;
    }));

    addNotification('Review Submitted', 'Thank you for supporting cooperative fair work!', 'success');
  };

  // Actions: Worker Registration Wizard
  const registerWorker = (formData) => {
    const newPendingWorker = {
      id: `w-pending-${Date.now()}`,
      name: formData.name,
      nameHi: formData.name,
      category: formData.primarySkillCategory || 'plumber',
      phone: formData.phone,
      email: formData.email,
      locationName: formData.location || 'Ghaziabad',
      address: formData.address,
      experienceYears: Number(formData.experienceYears) || 3,
      hourlyRate: Number(formData.hourlyRate) || 299,
      coopName: formData.coopName || 'Ghaziabad Shramik Sahakari Samiti',
      coopMembershipId: formData.coopMembershipId || `GZB-APPL-${Math.floor(1000 + Math.random() * 9000)}`,
      primarySkill: formData.primarySkill,
      additionalSkills: formData.additionalSkills ? formData.additionalSkills.split(',').map(s => s.trim()) : [],
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'pending_verification',
      documents: [
        { name: 'Government ID / Aadhaar Card', status: 'verified_auto', file: 'aadhaar_doc.pdf' },
        { name: 'Skill Trade Certificate', status: 'pending_review', file: 'skill_trade_cert.pdf' },
        { name: 'Labour Cooperative Endorsement', status: 'pending_review', file: 'coop_endorsement.pdf' }
      ]
    };

    setPendingWorkers(prev => [newPendingWorker, ...prev]);
    addNotification(
      'Application Submitted',
      `Welcome ${formData.name}! Your application is with the Cooperative Admin for verification.`,
      'info'
    );
    return newPendingWorker;
  };

  // Actions: Admin Flow
  const approveWorker = (pendingId) => {
    const target = pendingWorkers.find(p => p.id === pendingId);
    if (!target) return;

    const newVerifiedWorker = {
      id: `w-${Date.now()}`,
      name: target.name,
      nameHi: target.nameHi || target.name,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      category: target.category,
      secondarySkills: target.additionalSkills || ['General Maintenance'],
      rating: 5.0,
      ratingCount: 1,
      completedJobs: 0,
      experienceYears: target.experienceYears || 4,
      coopId: 'coop-gzb-1',
      coopName: target.coopName || 'Ghaziabad Shramik Sahakari Samiti',
      membershipId: target.coopMembershipId || 'GZB-VER-2026',
      isVerified: true,
      verificationDate: new Date().toISOString().split('T')[0],
      status: 'available',
      hourlyRate: target.hourlyRate || 299,
      emergencyRate: (target.hourlyRate || 299) + 100,
      locationName: target.locationName,
      lat: 28.6350 + (Math.random() - 0.5) * 0.05,
      lng: 77.3600 + (Math.random() - 0.5) * 0.05,
      distanceKm: 2.2,
      responseTimeMin: 15,
      phone: target.phone,
      email: target.email,
      bio: `Cooperative verified professional in ${target.category} with ${target.experienceYears} years experience.`,
      certifications: ['Labour Cooperative Society Verified Member', 'Govt Skill Certified'],
      punctualityScore: 98,
      qualityScore: 99,
      behaviourScore: 100,
      insuranceCover: 'Active (₹5,00,000 Ayushman Sahakar)',
      welfareBalance: 500,
      reviews: []
    };

    setWorkers(prev => [newVerifiedWorker, ...prev]);
    setPendingWorkers(prev => prev.filter(p => p.id !== pendingId));

    addNotification(
      'Worker Approved & Verified ✓',
      `${target.name} is now approved as a verified cooperative service provider!`,
      'success'
    );
  };

  const rejectWorker = (pendingId, reason = 'Incomplete documentation') => {
    const target = pendingWorkers.find(p => p.id === pendingId);
    setPendingWorkers(prev => prev.filter(p => p.id !== pendingId));
    addNotification('Application Rejected', `Application for ${target?.name || 'worker'} was rejected: ${reason}`, 'warning');
  };

  const reallocateWorkforce = (region, category, count) => {
    addNotification(
      'AI Workforce Reallocated',
      `Success: Reallocated ${count} ${category} workers to ${region} on active emergency standby.`,
      'success'
    );
  };

  // Demo Scenarios for Hackathon Presentation
  const triggerDemoScenario = (scenarioId) => {
    if (scenarioId === 'emergency_ghaziabad') {
      setActiveEmergencyCategory('plumber');
      setEmergencyModalOpen(true);
      addNotification('Demo Scenario Triggered', '🚨 Emergency Water Leakage in Ghaziabad activated.', 'warning');
    } else if (scenarioId === 'worker_admin_flow') {
      setRole('admin');
      addNotification('Demo Scenario', 'Switched to Cooperative Admin to verify pending workers.', 'info');
    } else if (scenarioId === 'welfare_shield') {
      setRole('worker');
      addNotification('Demo Scenario', 'Switched to Worker view to inspect Cooperative Shield & Welfare.', 'info');
    }
  };

  // Reset to default demo data
  const resetDemoData = () => {
    localStorage.removeItem('coserve_workers');
    localStorage.removeItem('coserve_pending_workers');
    localStorage.removeItem('coserve_bookings');
    setWorkers(INITIAL_WORKERS);
    setPendingWorkers(INITIAL_PENDING_WORKERS);
    setBookings(INITIAL_BOOKINGS);
    addNotification('Data Reset', 'Demo database restored to default Ghaziabad NCR state.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        language,
        setLanguage,
        t,
        activeWorkerId,
        setActiveWorkerId,
        workers,
        setWorkers,
        pendingWorkers,
        bookings,
        notifications,
        addNotification,
        aiDemandData,
        emergencyModalOpen,
        setEmergencyModalOpen,
        activeEmergencyCategory,
        setActiveEmergencyCategory,
        // Methods
        createBooking,
        acceptJobRequest,
        updateJobProgress,
        declineJobRequest,
        toggleWorkerAvailability,
        rateBooking,
        registerWorker,
        approveWorker,
        rejectWorker,
        reallocateWorkforce,
        triggerDemoScenario,
        resetDemoData,
        // Helpers
        categories: SERVICE_CATEGORIES,
        cooperatives: COOPERATIVE_SOCIETIES,
        userLocation: DEMO_LOCATION
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
