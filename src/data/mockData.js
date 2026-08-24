// Comprehensive Mock Data for CoServe Platform (Ghaziabad / Delhi NCR region)

export const SERVICE_CATEGORIES = [
  {
    id: 'electrician',
    name: 'Electrician',
    nameHi: 'इलेक्ट्रीशियन',
    nameHinglish: 'Electrician',
    icon: 'Zap',
    color: 'amber',
    basePrice: 299,
    popular: true,
    description: 'Wiring, MCB repair, appliance installations, fan/light fittings, short circuit fix.',
    emergencyAvailable: true,
  },
  {
    id: 'plumber',
    name: 'Plumber',
    nameHi: 'प्लंबर',
    nameHinglish: 'Plumber',
    icon: 'Droplet',
    color: 'sky',
    basePrice: 249,
    popular: true,
    description: 'Pipe leakage, tap repair, drain unclogging, water pump, bathroom fittings.',
    emergencyAvailable: true,
  },
  {
    id: 'carpenter',
    name: 'Carpenter',
    nameHi: 'बढ़ई / कारपेंटर',
    nameHinglish: 'Carpenter',
    icon: 'Hammer',
    color: 'orange',
    basePrice: 349,
    popular: true,
    description: 'Furniture repair, door locks, modular kitchen assembly, hinge fixes.',
    emergencyAvailable: true,
  },
  {
    id: 'cleaner',
    name: 'Cleaner',
    nameHi: 'सफाई कर्मी',
    nameHinglish: 'Deep Cleaning',
    icon: 'Sparkles',
    color: 'emerald',
    basePrice: 399,
    popular: true,
    description: 'Deep home cleaning, sofa/carpet shampooing, kitchen & bathroom sanitization.',
    emergencyAvailable: false,
  },
  {
    id: 'painter',
    name: 'Painter',
    nameHi: 'पेंटर',
    nameHinglish: 'Painter',
    icon: 'Paintbrush',
    color: 'purple',
    basePrice: 499,
    popular: false,
    description: 'Wall painting, waterproof coating, touch-ups, texture finish.',
    emergencyAvailable: false,
  },
  {
    id: 'caregiver',
    name: 'Caregiver',
    nameHi: 'देखभालकर्ता (केयरगिवर)',
    nameHinglish: 'Caregiver & Eldercare',
    icon: 'HeartHandshake',
    color: 'rose',
    basePrice: 599,
    popular: true,
    description: 'Elderly assistance, post-hospitalization care, certified nursing support.',
    emergencyAvailable: true,
  },
  {
    id: 'gardener',
    name: 'Gardener',
    nameHi: 'माली',
    nameHinglish: 'Mali / Gardener',
    icon: 'Trees',
    color: 'green',
    basePrice: 299,
    popular: false,
    description: 'Lawn trimming, plant pruning, potting, organic fertilizer application.',
    emergencyAvailable: false,
  },
  {
    id: 'driver',
    name: 'Driver',
    nameHi: 'ड्राइवर',
    nameHinglish: 'Driver',
    icon: 'Car',
    color: 'indigo',
    basePrice: 450,
    popular: false,
    description: 'Verified on-demand personal and outstation drivers with license verification.',
    emergencyAvailable: false,
  },
  {
    id: 'technician',
    name: 'Appliance Tech',
    nameHi: 'तकनीशियन',
    nameHinglish: 'Appliance Technician',
    icon: 'Wrench',
    color: 'teal',
    basePrice: 399,
    popular: true,
    description: 'AC servicing, refrigerator maintenance, washing machine repair.',
    emergencyAvailable: true,
  },
];

export const COOPERATIVE_SOCIETIES = [
  {
    id: 'coop-gzb-1',
    name: 'Ghaziabad Shramik Swavalamban Sahakari Samiti',
    registrationNo: 'UP/GZB/COOP/2018/8842',
    region: 'Ghaziabad Central & Trans-Hindon',
    membersCount: 420,
    welfareFundPool: 685000,
    establishedYear: 2018,
    leadOfficer: 'Shri Vinod Sharma',
  },
  {
    id: 'coop-noida-2',
    name: 'Noida Craft & Trades Cooperative Federation',
    registrationNo: 'UP/GBN/FED/2020/1209',
    region: 'Noida Sector 62 & Greater Noida',
    membersCount: 650,
    welfareFundPool: 1240000,
    establishedYear: 2020,
    leadOfficer: 'Smt. Anita Chauhan',
  },
  {
    id: 'coop-delhi-3',
    name: 'NCR Karigar Sahakari Union',
    registrationNo: 'DL/COOP/LABOUR/2016/5412',
    region: 'East Delhi & Anand Vihar Border',
    membersCount: 510,
    welfareFundPool: 980000,
    establishedYear: 2016,
    leadOfficer: 'Mohammad Farooq',
  },
];

export const INITIAL_WORKERS = [
  {
    id: 'w-1',
    name: 'Ramesh Kumar',
    nameHi: 'रमेश कुमार',
    avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=400&q=80',
    category: 'plumber',
    secondarySkills: ['Water Motor Repair', 'RO Servicing', 'Sanitary Fittings'],
    rating: 4.9,
    ratingCount: 148,
    completedJobs: 382,
    experienceYears: 15,
    coopId: 'coop-gzb-1',
    coopName: 'Ghaziabad Shramik Sahakari Samiti',
    membershipId: 'GZB-PLUM-0842',
    isVerified: true,
    verificationDate: '2022-04-10',
    status: 'available', // available | busy | offline
    hourlyRate: 249,
    emergencyRate: 349,
    locationName: 'Indirapuram, Ghaziabad',
    lat: 28.6415,
    lng: 77.3713,
    distanceKm: 1.4, // relative to demo customer (Indirapuram center 28.6380, 77.3620)
    responseTimeMin: 12,
    phone: '+91 98712 34567',
    email: 'ramesh.kumar@coserve.coop',
    bio: '15+ years of certified master plumbing experience. Specializes in instant leak detection, high-pressure booster systems, and water heater maintenance. Proud founding member of Ghaziabad Labour Co-op.',
    certifications: [
      'National Skill Development Corp (NSDC) - Level 4 Master Plumber',
      'UP Labour Welfare Board Verified ID: LWB-UP-9921',
      'Cooperative Safety & Hygiene Certified 2025'
    ],
    punctualityScore: 99,
    qualityScore: 98,
    behaviourScore: 100,
    insuranceCover: 'Active (₹5,00,000 Ayushman Sahakar)',
    welfareBalance: 4250,
    reviews: [
      {
        id: 'rev-1',
        customerName: 'Pooja Verma',
        rating: 5,
        date: '2026-08-18',
        comment: 'Ramesh ji reached in 10 minutes during our midnight pipe burst! Repaired swiftly with genuine parts. Great cooperative initiative.',
        punctuality: 5,
        quality: 5,
        behaviour: 5
      },
      {
        id: 'rev-2',
        customerName: 'Amit Saxena',
        rating: 5,
        date: '2026-08-11',
        comment: 'Very polite, fair pricing, and clear breakdown. Didn’t overcharge like private apps do.',
        punctuality: 5,
        quality: 5,
        behaviour: 5
      }
    ]
  },
  {
    id: 'w-2',
    name: 'Sunil Sharma',
    nameHi: 'सुनील शर्मा',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    category: 'electrician',
    secondarySkills: ['Inverter Repair', 'Heavy Load MCB Wiring', 'Smart Switchboard'],
    rating: 4.8,
    ratingCount: 194,
    completedJobs: 420,
    experienceYears: 12,
    coopId: 'coop-noida-2',
    coopName: 'Noida Craft & Trades Co-op Federation',
    membershipId: 'NOI-ELEC-1123',
    isVerified: true,
    verificationDate: '2021-09-15',
    status: 'available',
    hourlyRate: 299,
    emergencyRate: 399,
    locationName: 'Sector 62, Noida',
    lat: 28.6258,
    lng: 77.3688,
    distanceKm: 2.1,
    responseTimeMin: 18,
    phone: '+91 98111 87654',
    email: 'sunil.sharma@coserve.coop',
    bio: 'Government licensed Grade-A Electrician with 12 years of experience handling residential transformers, tripping faults, and home theater wiring.',
    certifications: [
      'Govt. Electrical Supervisor License #E-9411',
      'NSDC Certified Solar Rooftop & Inverter Tech',
      'Noida Co-op Safety Badge'
    ],
    punctualityScore: 97,
    qualityScore: 99,
    behaviourScore: 98,
    insuranceCover: 'Active (₹5,00,000 Ayushman Sahakar)',
    welfareBalance: 6100,
    reviews: [
      {
        id: 'rev-3',
        customerName: 'Kunal Aggarwal',
        rating: 5,
        date: '2026-08-14',
        comment: 'Resolved a complicated tripping issue that two other private app electricians failed to diagnose. Highly skilled.',
        punctuality: 5,
        quality: 5,
        behaviour: 5
      }
    ]
  },
  {
    id: 'w-3',
    name: 'Mohammad Tariq',
    nameHi: 'मोहम्मद तारिक',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    category: 'carpenter',
    secondarySkills: ['Modular Kitchen Design', 'Antique Wood Polish', 'Door Lock Installation'],
    rating: 4.9,
    ratingCount: 112,
    completedJobs: 290,
    experienceYears: 16,
    coopId: 'coop-gzb-1',
    coopName: 'Ghaziabad Shramik Sahakari Samiti',
    membershipId: 'GZB-CARP-0312',
    isVerified: true,
    verificationDate: '2022-01-20',
    status: 'available',
    hourlyRate: 349,
    emergencyRate: 449,
    locationName: 'Vaishali Sector 4, Ghaziabad',
    lat: 28.6472,
    lng: 77.3421,
    distanceKm: 2.8,
    responseTimeMin: 22,
    phone: '+91 97188 44321',
    email: 'tariq.woodcraft@coserve.coop',
    bio: '3rd generation artisan carpenter. Precision woodworking, modern hydraulic fittings, and soundproof door restoration.',
    certifications: [
      'Master Craftsman Award 2024 (UP Handicraft Board)',
      'Cooperative Certified Furniture Specialist'
    ],
    punctualityScore: 98,
    qualityScore: 100,
    behaviourScore: 99,
    insuranceCover: 'Active (₹5,00,000 Ayushman Sahakar)',
    welfareBalance: 3890,
    reviews: [
      {
        id: 'rev-4',
        customerName: 'Shalini Gupta',
        rating: 5,
        date: '2026-08-09',
        comment: 'Flawless hinge replacement and sliding wardrobe realignment. Very respectful and clean worker.',
        punctuality: 5,
        quality: 5,
        behaviour: 5
      }
    ]
  },
  {
    id: 'w-4',
    name: 'Geeta Devi',
    nameHi: 'गीता देवी',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    category: 'caregiver',
    secondarySkills: ['Post-Operative Care', 'Diabetic Diet Prep', 'Physiotherapy Assistance'],
    rating: 5.0,
    ratingCount: 88,
    completedJobs: 215,
    experienceYears: 10,
    coopId: 'coop-delhi-3',
    coopName: 'NCR Karigar Sahakari Union',
    membershipId: 'NCR-CARE-0441',
    isVerified: true,
    verificationDate: '2023-03-12',
    status: 'available',
    hourlyRate: 599,
    emergencyRate: 749,
    locationName: 'Vasundhara Sector 14, Ghaziabad',
    lat: 28.6589,
    lng: 77.3690,
    distanceKm: 2.3,
    responseTimeMin: 25,
    phone: '+91 98990 12349',
    email: 'geeta.care@coserve.coop',
    bio: 'Certified compassionate eldercare nurse and patient attendant. Deeply trusted by over 50 families across Ghaziabad and East Delhi.',
    certifications: [
      'Red Cross Certified First Responder & CPR',
      'Geriatric Care Certification (Govt. AIIMS Affiliated Program)',
      'Verified Police & Cooperative Background Check'
    ],
    punctualityScore: 100,
    qualityScore: 100,
    behaviourScore: 100,
    insuranceCover: 'Active (₹5,00,000 Ayushman Sahakar)',
    welfareBalance: 5400,
    reviews: [
      {
        id: 'rev-5',
        customerName: 'Dr. R.K. Mehta',
        rating: 5,
        date: '2026-08-16',
        comment: 'Geeta ji took care of my 84-year-old mother with utmost empathy and medical diligence. A blessing to have cooperative care.',
        punctuality: 5,
        quality: 5,
        behaviour: 5
      }
    ]
  },
  {
    id: 'w-5',
    name: 'Rajesh Bind',
    nameHi: 'राजेश बिंद',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    category: 'cleaner',
    secondarySkills: ['Sofa Sanitization', 'Balcony Pressure Wash', 'Pest Prevention'],
    rating: 4.8,
    ratingCount: 167,
    completedJobs: 340,
    experienceYears: 8,
    coopId: 'coop-gzb-1',
    coopName: 'Ghaziabad Shramik Sahakari Samiti',
    membershipId: 'GZB-CLN-0919',
    isVerified: true,
    verificationDate: '2023-06-18',
    status: 'available',
    hourlyRate: 399,
    emergencyRate: 499,
    locationName: 'Kaushambi, Ghaziabad',
    lat: 28.6388,
    lng: 77.3245,
    distanceKm: 3.9,
    responseTimeMin: 30,
    phone: '+91 98733 90812',
    email: 'rajesh.bind@coserve.coop',
    bio: 'Professional deep cleaning specialist using eco-friendly German equipment and non-toxic solutions.',
    certifications: [
      'Chemical Safety & Sanitization Certificate',
      'Cooperative Green Cleaning Standard Badge'
    ],
    punctualityScore: 97,
    qualityScore: 98,
    behaviourScore: 99,
    insuranceCover: 'Active (₹5,00,000 Ayushman Sahakar)',
    welfareBalance: 2900,
    reviews: [
      {
        id: 'rev-6',
        customerName: 'Deepak Chopra',
        rating: 5,
        date: '2026-08-05',
        comment: 'Made our 3BHK look brand new before housewarming. Very hard-working and polite team.',
        punctuality: 5,
        quality: 5,
        behaviour: 5
      }
    ]
  },
  {
    id: 'w-6',
    name: 'Dinesh Yadav',
    nameHi: 'दिनेश यादव',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
    category: 'technician',
    secondarySkills: ['Inverter AC PCB Repair', 'Gas Refilling', 'Microwave Troubleshooting'],
    rating: 4.9,
    ratingCount: 205,
    completedJobs: 512,
    experienceYears: 14,
    coopId: 'coop-noida-2',
    coopName: 'Noida Craft & Trades Co-op Federation',
    membershipId: 'NOI-TECH-0211',
    isVerified: true,
    verificationDate: '2021-05-10',
    status: 'available',
    hourlyRate: 399,
    emergencyRate: 499,
    locationName: 'Sector 59, Noida',
    lat: 28.6080,
    lng: 77.3620,
    distanceKm: 3.5,
    responseTimeMin: 20,
    phone: '+91 98109 23411',
    email: 'dinesh.tech@coserve.coop',
    bio: 'Factory-certified multi-brand appliance technician for Daikin, LG, Samsung, Voltas, and Whirlpool.',
    certifications: [
      'Refrigeration & HVAC Certified (ITI Pusa Delhi)',
      'Ozone Friendly Gas Handling License'
    ],
    punctualityScore: 99,
    qualityScore: 99,
    behaviourScore: 98,
    insuranceCover: 'Active (₹5,00,000 Ayushman Sahakar)',
    welfareBalance: 7800,
    reviews: [
      {
        id: 'rev-7',
        customerName: 'Neha Tyagi',
        rating: 5,
        date: '2026-08-17',
        comment: 'Fixed our AC cooling coil problem in one visit. Very honest technician who explained why the capacitor had leaked.',
        punctuality: 5,
        quality: 5,
        behaviour: 5
      }
    ]
  },
  {
    id: 'w-7',
    name: 'Balwant Singh',
    nameHi: 'बलवंत सिंह',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    category: 'painter',
    secondarySkills: ['Waterproofing', 'Texture Wall Design', 'Wood Staining'],
    rating: 4.7,
    ratingCount: 76,
    completedJobs: 180,
    experienceYears: 18,
    coopId: 'coop-delhi-3',
    coopName: 'NCR Karigar Sahakari Union',
    membershipId: 'NCR-PNT-0988',
    isVerified: true,
    verificationDate: '2022-08-14',
    status: 'available',
    hourlyRate: 499,
    emergencyRate: 599,
    locationName: 'Anand Vihar, Delhi / Gzb Border',
    lat: 28.6480,
    lng: 77.3150,
    distanceKm: 4.8,
    responseTimeMin: 35,
    phone: '+91 99104 55678',
    email: 'balwant.paint@coserve.coop',
    bio: '18 years of residential and commercial painting mastery. Expert in Asian Paints Royale finishes and anti-dampness treatments.',
    certifications: [
      'Asian Paints Master Applicator Certified',
      'Dr. Fixit Waterproofing Specialist'
    ],
    punctualityScore: 96,
    qualityScore: 98,
    behaviourScore: 97,
    insuranceCover: 'Active (₹5,00,000 Ayushman Sahakar)',
    welfareBalance: 3200,
    reviews: []
  },
  {
    id: 'w-8',
    name: 'Harish Mali',
    nameHi: 'हरीश माली',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    category: 'gardener',
    secondarySkills: ['Terrace Gardening', 'Bonsai Pruning', 'Kitchen Herbs Setup'],
    rating: 4.9,
    ratingCount: 64,
    completedJobs: 130,
    experienceYears: 9,
    coopId: 'coop-gzb-1',
    coopName: 'Ghaziabad Shramik Sahakari Samiti',
    membershipId: 'GZB-GDN-0102',
    isVerified: true,
    verificationDate: '2023-01-11',
    status: 'available',
    hourlyRate: 299,
    emergencyRate: 399,
    locationName: 'Raj Nagar Extension, Ghaziabad',
    lat: 28.6920,
    lng: 77.4120,
    distanceKm: 6.2,
    responseTimeMin: 40,
    phone: '+91 98701 44520',
    email: 'harish.garden@coserve.coop',
    bio: 'Passionate botanist and horticulturist helping transform urban balconies and home lawns into vibrant green sanctuaries.',
    certifications: [
      'Govt. Horticulture Nursery Certified Specialist',
      'Organic Pest Control Badge'
    ],
    punctualityScore: 98,
    qualityScore: 100,
    behaviourScore: 100,
    insuranceCover: 'Active (₹5,00,000 Ayushman Sahakar)',
    welfareBalance: 2100,
    reviews: []
  }
];

// Pending workers awaiting Cooperative Admin Verification
export const INITIAL_PENDING_WORKERS = [
  {
    id: 'w-pending-1',
    name: 'Vikram Rajput',
    nameHi: 'विक्रम राजपूत',
    category: 'electrician',
    phone: '+91 98234 11223',
    email: 'vikram.rajput@gmail.com',
    locationName: 'Crossings Republik, Ghaziabad',
    address: 'Flat 402, Tower B, Supertech Livingston, Crossings Republik',
    experienceYears: 7,
    hourlyRate: 299,
    coopName: 'Ghaziabad Shramik Sahakari Samiti',
    coopMembershipId: 'GZB-APPL-2026-901',
    primarySkill: 'Home Inverter & MCB specialist',
    additionalSkills: ['Solar Panel Repair', 'LED Panel Installation'],
    appliedDate: '2026-08-23',
    status: 'pending_verification',
    documents: [
      { name: 'Aadhaar Card (UIDAI Verified)', status: 'verified_auto', file: 'aadhaar_vikram.pdf' },
      { name: 'ITI Electrical Trade Certificate', status: 'pending_review', file: 'iti_electrical_cert.pdf' },
      { name: 'Cooperative Society Letter of Recommendation', status: 'pending_review', file: 'coop_endorsement.pdf' }
    ]
  },
  {
    id: 'w-pending-2',
    name: 'Kamla Devi',
    nameHi: 'कमला देवी',
    category: 'caregiver',
    phone: '+91 97112 88990',
    email: 'kamla.care@gmail.com',
    locationName: 'Sector 63, Noida',
    address: 'Plot 12, Chhijarsi, Sector 63, Noida',
    experienceYears: 6,
    hourlyRate: 499,
    coopName: 'Noida Craft & Trades Co-op Federation',
    coopMembershipId: 'NOI-APPL-2026-442',
    primarySkill: 'Senior Citizen Care & Vital Monitoring',
    additionalSkills: ['Bedridden Patient Care', 'Post-Op Nutrition'],
    appliedDate: '2026-08-24',
    status: 'pending_verification',
    documents: [
      { name: 'Aadhaar Card', status: 'verified_auto', file: 'aadhaar_kamla.pdf' },
      { name: 'First Aid & CPR Certification', status: 'pending_review', file: 'firstaid_cert.pdf' },
      { name: 'Police Verification Clearance', status: 'pending_review', file: 'police_clearance.pdf' }
    ]
  }
];

// Pre-populated demo bookings
export const INITIAL_BOOKINGS = [
  {
    id: 'BK-2026-8941',
    workerId: 'w-1',
    workerName: 'Ramesh Kumar',
    workerAvatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=400&q=80',
    category: 'plumber',
    serviceTitle: 'Emergency Kitchen Pipe Burst & Valve Repair',
    isEmergency: true,
    status: 'completed', // completed | in_progress | accepted | pending | cancelled
    scheduledDate: '2026-08-22',
    scheduledTime: '11:30 AM',
    customerName: 'Aakash Sharma',
    customerPhone: '+91 99887 76655',
    customerAddress: 'Tower 4, Flat 702, Shipra Sun City, Indirapuram, Ghaziabad',
    customerCoords: [28.6380, 77.3620],
    totalAmount: 500,
    breakdown: {
      workerEarning: 400, // 80%
      coopWelfare: 50,    // 10%
      insuranceFund: 30,  // 6%
      platformFee: 20     // 4%
    },
    paymentMethod: 'UPI (GPay)',
    paymentStatus: 'paid',
    rated: true,
    userRating: {
      overall: 5,
      punctuality: 5,
      quality: 5,
      behaviour: 5,
      review: 'Arrived in 12 mins! Super efficient and courteous.'
    },
    timeline: [
      { time: '11:15 AM', label: 'Emergency Request Placed' },
      { time: '11:17 AM', label: 'Worker Ramesh Kumar Accepted' },
      { time: '11:28 AM', label: 'Worker Arrived at Indirapuram location' },
      { time: '11:58 AM', label: 'Work Completed & Inspected' },
      { time: '12:00 PM', label: 'Payment Settled & Welfare Credited' }
    ]
  },
  {
    id: 'BK-2026-9022',
    workerId: 'w-2',
    workerName: 'Sunil Sharma',
    workerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    category: 'electrician',
    serviceTitle: 'Main Inverter Line & Tripping Diagnostics',
    isEmergency: false,
    status: 'in_progress',
    scheduledDate: '2026-08-24',
    scheduledTime: '06:00 PM',
    customerName: 'Aakash Sharma',
    customerPhone: '+91 99887 76655',
    customerAddress: 'Tower 4, Flat 702, Shipra Sun City, Indirapuram, Ghaziabad',
    customerCoords: [28.6380, 77.3620],
    totalAmount: 399,
    breakdown: {
      workerEarning: 319,
      coopWelfare: 40,
      insuranceFund: 24,
      platformFee: 16
    },
    paymentMethod: 'Cash after Service',
    paymentStatus: 'pending',
    rated: false,
    timeline: [
      { time: '05:10 PM', label: 'Booking Confirmed' },
      { time: '05:15 PM', label: 'Worker Assigned & Notified' },
      { time: '05:45 PM', label: 'Worker En Route (Distance: 1.2 km)' },
      { time: '06:02 PM', label: 'Service In Progress' }
    ]
  }
];

// AI Demand Intelligence Insights & Forecast data
export const AI_DEMAND_INSIGHTS = {
  highDemandAlerts: [
    {
      id: 'alert-1',
      severity: 'high',
      title: 'Plumbing Surge Alert — Monsoon Drain Overload',
      message: 'Plumbing services demand is forecasted to surge by +35% in Ghaziabad (Indirapuram & Vaishali) over next 72h.',
      recommendation: 'Deploy 12 additional verified plumbers on active standby in Sector 62 & Indirapuram.',
      category: 'plumber',
      region: 'Ghaziabad Trans-Hindon',
      actionNeeded: 'Deploy Standby Fleet'
    },
    {
      id: 'alert-2',
      severity: 'medium',
      title: 'Low Electrician Availability Near Crossings Republik',
      message: 'Only 3 certified electricians currently available within 5km radius. Estimated wait time rising to 45 mins.',
      recommendation: 'Re-route 4 cooperative electricians from Noida Sector 63 border.',
      category: 'electrician',
      region: 'Crossings Republik',
      actionNeeded: 'Dynamic Re-route'
    },
    {
      id: 'alert-3',
      severity: 'info',
      title: 'Senior Caregiver Weekend Spike',
      message: 'Weekend caregiving requests predicted to climb by 22% across East Delhi & Vaishali.',
      recommendation: 'Notify 8 certified cooperative nurses to activate on-call weekend availability.',
      category: 'caregiver',
      region: 'East Delhi & Vaishali',
      actionNeeded: 'Send Broadcast Alert'
    }
  ],
  categoryDemandChart: [
    { category: 'Plumbing', currentDemand: 280, predictedDemand: 380, availableWorkers: 42 },
    { category: 'Electrician', currentDemand: 310, predictedDemand: 340, availableWorkers: 38 },
    { category: 'Carpentry', currentDemand: 160, predictedDemand: 175, availableWorkers: 29 },
    { category: 'Deep Cleaning', currentDemand: 240, predictedDemand: 310, availableWorkers: 35 },
    { category: 'Caregiver', currentDemand: 190, predictedDemand: 235, availableWorkers: 24 },
    { category: 'Appliance Tech', currentDemand: 220, predictedDemand: 260, availableWorkers: 31 }
  ],
  regionalDemandChart: [
    { region: 'Indirapuram', demandIndex: 94, workersActive: 28, shortage: 8 },
    { region: 'Sector 62 Noida', demandIndex: 88, workersActive: 34, shortage: 2 },
    { region: 'Vaishali', demandIndex: 76, workersActive: 20, shortage: 4 },
    { region: 'Crossings Republik', demandIndex: 82, workersActive: 12, shortage: 9 },
    { region: 'Raj Nagar Extn', demandIndex: 65, workersActive: 18, shortage: 1 },
    { region: 'Vasundhara', demandIndex: 71, workersActive: 22, shortage: 3 }
  ],
  weeklyTrends: [
    { day: 'Mon', completedJobs: 112, fairWagesDisbursed: 48200, welfareFundAccumulated: 6020 },
    { day: 'Tue', completedJobs: 128, fairWagesDisbursed: 55400, welfareFundAccumulated: 6920 },
    { day: 'Wed', completedJobs: 145, fairWagesDisbursed: 63100, welfareFundAccumulated: 7880 },
    { day: 'Thu', completedJobs: 139, fairWagesDisbursed: 60800, welfareFundAccumulated: 7600 },
    { day: 'Fri', completedJobs: 184, fairWagesDisbursed: 81200, welfareFundAccumulated: 10150 },
    { day: 'Sat', completedJobs: 240, fairWagesDisbursed: 108500, welfareFundAccumulated: 13560 },
    { day: 'Sun', completedJobs: 265, fairWagesDisbursed: 119800, welfareFundAccumulated: 14970 }
  ]
};

// Transparency breakdown helper
export const calculateFareBreakdown = (baseFare) => {
  const workerPayout = Math.round(baseFare * 0.80);      // 80% to worker
  const coopWelfare = Math.round(baseFare * 0.10);       // 10% to cooperative welfare fund
  const insuranceCover = Math.round(baseFare * 0.06);    // 6% to accidental & health insurance
  const platformFee = baseFare - workerPayout - coopWelfare - insuranceCover; // 4% maintenance
  
  return {
    total: baseFare,
    workerPayout,
    coopWelfare,
    insuranceCover,
    platformFee,
    percentages: {
      worker: '80%',
      welfare: '10%',
      insurance: '6%',
      platform: '4%'
    }
  };
};

export const DEMO_LOCATION = {
  name: 'Indirapuram, Ghaziabad (Shipra Sun City)',
  lat: 28.6380,
  lng: 77.3620,
  pincode: '201014'
};
