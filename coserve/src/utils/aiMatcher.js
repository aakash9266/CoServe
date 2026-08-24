// AI-Powered Smart Worker Matching Algorithm & Scoring Engine

export const calculateWorkerMatchScore = (worker, criteria = {}) => {
  const {
    targetCategory = '',
    searchQuery = '',
    maxDistanceKm = 10,
    isEmergency = false,
  } = criteria;

  let score = 0;
  const reasons = [];

  // 1. Skill & Category Relevance (Max 35 pts)
  if (targetCategory && worker.category.toLowerCase() === targetCategory.toLowerCase()) {
    score += 35;
    reasons.push(`Primary certified category matches requested service (${worker.category})`);
  } else if (searchQuery && worker.secondarySkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))) {
    score += 25;
    reasons.push(`Specialized skill match: "${worker.secondarySkills.find(s => s.toLowerCase().includes(searchQuery.toLowerCase()))}"`);
  } else {
    score += 15;
  }

  // 2. Proximity & ETA Score (Max 25 pts)
  const distance = worker.distanceKm || 2.5;
  if (distance <= 2.0) {
    score += 25;
    reasons.push(`Nearest available cooperative provider (${distance.toFixed(1)} km away, ~${worker.responseTimeMin || 12} mins ETA)`);
  } else if (distance <= 4.0) {
    score += 18;
    reasons.push(`Close service proximity (${distance.toFixed(1)} km)`);
  } else {
    const distScore = Math.max(5, Math.round(25 - (distance / maxDistanceKm) * 20));
    score += distScore;
    reasons.push(`Within service radius (${distance.toFixed(1)} km)`);
  }

  // 3. Rating & Community Trust (Max 20 pts)
  const rating = worker.rating || 4.5;
  const ratingScore = Math.round((rating / 5.0) * 20);
  score += ratingScore;
  if (rating >= 4.8) {
    reasons.push(`Top-tier cooperative rating (${rating} ⭐ across ${worker.ratingCount || 50}+ verified households)`);
  }

  // 4. Experience & Cooperative Verification (Max 15 pts)
  const exp = worker.experienceYears || 5;
  if (exp >= 10) {
    score += 15;
    reasons.push(`Master tradesperson with ${exp} years of proven craftsmanship`);
  } else if (exp >= 5) {
    score += 10;
    reasons.push(`Experienced verified worker (${exp} years)`);
  } else {
    score += 6;
  }

  // 5. Live Availability & Emergency Readiness (Max 5 pts)
  if (worker.status === 'available') {
    score += 5;
    if (isEmergency) {
      reasons.push('Instant SOS dispatch standby active');
    }
  } else {
    score -= 10;
  }

  // Cooperative membership bonus
  if (worker.isVerified) {
    reasons.push(`Verified member of ${worker.coopName}`);
  }

  // Cap between 60% and 99% for realistic prototype feel
  const finalMatchScore = Math.min(98, Math.max(65, score));

  return {
    score: finalMatchScore,
    reasons: reasons.slice(0, 4), // top 4 key highlights
    isTopMatch: finalMatchScore >= 90
  };
};

export const rankWorkersForService = (workers, criteria = {}) => {
  return workers
    .map(worker => {
      const match = calculateWorkerMatchScore(worker, criteria);
      return {
        ...worker,
        aiMatchScore: match.score,
        aiReasons: match.reasons,
        isTopMatch: match.isTopMatch
      };
    })
    .sort((a, b) => b.aiMatchScore - a.aiMatchScore);
};
