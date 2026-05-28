/* ==========================================================
   Bento Academy Grade Hub - State and Mathematics Orchestration
   ========================================================== */

// Global Application States
let currentTab = 'weighted';
let weightedCategories = [];
let boosterStates = { b1: false, b2: false };
let gpaLevel = 'hs'; // 'hs' or 'college'
let gpaCourses = [];

// Static classroom teaching content
const ANECDOTES_AND_JOKES = [
  "Why did the student wear glasses in math class? To improve their di-vision! 🤓",
  "There are 3 types of people in this world: Those who can count, and those who can't! 📐",
  "Why was the fraction worried about marrying the decimal? Because she would have to convert! 💍",
  "Math is the only place where someone buys 40 watermelons and no one asks questions! 🍉"
];

const WEIGHTED_EXPLANATIONS = [
  "Weighted systems calculate totals by scaling components based on their impact coefficient. e.g., an 80% on a 50% Exam carries more points than a 100% on a 10% Quiz!",
  "Always keep your component weights totaling exactly 100. If your weights do not equal 100, we proportionalize them so you get a reliable course score!",
  "What-If boosters let you simulate minor extracurricular assignments or study adjustments to lift your general average immediately without modifying current files!"
];

/* Custom Letter Grade Converters & Visual styling */
function getLetterGrade(avg) {
  if (avg >= 90) return 'A';
  if (avg >= 80) return 'B';
  if (avg >= 70) return 'C';
  if (avg >= 60) return 'D';
  return 'F';
}

function getGradeBadgeColor(letter) {
  switch (letter) {
    case 'A': return 'bg-[#4ECDC4] text-black border-[#1A1A1A]';
    case 'B': return 'bg-[#FFE66D] text-black border-[#1A1A1A]';
    case 'C': return 'bg-amber-300 text-black border-[#1A1A1A]';
    case 'D': return 'bg-orange-300 text-black border-[#1A1A1A]';
    default: return 'bg-[#FF6B6B] text-white border-black';
  }
}

/* ==========================================================
   FLOWER SCATTER CELEBRATION ENGINE
   ========================================================== */
const canvas = document.getElementById('flower-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;
let flowers = [];
const FLOWER_EMOJIS = ['🌸', '🌺', '🌼', '🌻', '⭐', '🌹', '🌷', '🏵️'];
let animationFrameId = null;

// Adjust for Retina Displays
function resizeCanvas() {
  if (!canvas) return;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  if(ctx) ctx.scale(dpr, dpr);
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createFlower(burst = false) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const size = Math.random() * 15 + 18;
  const emoji = FLOWER_EMOJIS[Math.floor(Math.random() * FLOWER_EMOJIS.length)];
  
  if (burst) {
    return {
      x: width * (0.3 + Math.random() * 0.4),
      y: height * (0.4 + Math.random() * 0.3),
      size,
      emoji,
      vx: (Math.random() - 0.5) * 8,
      vy: (Math.random() - 0.5) * 8 - 4,
      angle: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.08,
      alpha: 1,
      decay: Math.random() * 0.008 + 0.004,
    };
  } else {
    return {
      x: Math.random() * width,
      y: -30,
      size,
      emoji,
      vx: (Math.random() - 0.5) * 2,
      vy: Math.random() * 2 + 1.5,
      angle: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.03,
      alpha: 1,
      decay: 0,
    };
  }
}

function triggerPassingBurst() {
  for (let i = 0; i < 45; i++) {
    flowers.push(createFlower(true));
  }
}

function updateAndDrawFlowers() {
  if (!ctx || !canvas) return;
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  
  // Continuously rain from top if user average is passing
  const passes = getActiveAverage() >= 60;
  if (passes && Math.random() < 0.06 && flowers.length < 80) {
    flowers.push(createFlower(false));
  }

  for (let i = flowers.length - 1; i >= 0; i--) {
    const f = flowers[i];
    f.x += f.vx;
    f.y += f.vy;
    f.angle += f.rotationSpeed;
    if (f.decay > 0) f.alpha -= f.decay;

    ctx.save();
    ctx.globalAlpha = Math.max(0, f.alpha);
    ctx.font = ${f.size}px sans-serif;
    ctx.translate(f.x, f.y);
    ctx.rotate(f.angle);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(f.emoji, 0, 0);
    ctx.restore();

    if (f.y > window.innerHeight + 40 || f.alpha <= 0 || f.x < -40 || f.x > window.innerWidth + 40) {
      flowers.splice(i, 1);
    }
  }
  animationFrameId = requestAnimationFrame(updateAndDrawFlowers);
}

/* ==========================================================
   STATE ORCHESTRATION FUNCTIONS
   ========================================================== */

// General app initiation
window.addEventListener('DOMContentLoaded', () => {
  seedSampleWeighted();
  seedSampleGpa();
  switchTab('weighted');
  runFinalExamCalc();
  updateAndDrawFlowers();
});

function switchTab(tabId) {
  currentTab = tabId;
  document.querySelectorAll('.tab-pane').forEach(el => el.classList.add('hidden'));
  document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
  
  document.getElementById(pane-${tabId}).classList.remove('hidden');
  document.getElementById(tab-${tabId}).classList.add('active');

  const avg = getActiveAverage();
  triggerMascotReaction(avg, tabId);
}

function getActiveAverage() {
  let baseSum = 0;
  let weightSum = 0;
  if (weightedCategories.length === 0) return 0;
  
  weightedCategories.forEach(c => {
    baseSum += (c.score * c.weight) / 100;
    weightSum += c.weight;
  });

  let average = weightSum > 0 ? (baseSum / weightSum) * 100 : 0;
  
  // Add booster boosts dynamically
  if (boosterStates.b1) average += 3.0;
  if (boosterStates.b2) average += 5.0;

  return Math.min(average, 150); // upper logical cap (extra credit)
}

function updateWeightedVisuals() {
  const avg = getActiveAverage();
  const letter = getLetterGrade(avg);
  
  // Update scoreboard elements
  document.getElementById('weighted-avg-display').innerText = ${avg.toFixed(1)}%;
  const letterDisplay = document.getElementById('weighted-letter-display');
  letterDisplay.innerText = letter;
  letterDisplay.className = font-mono font-black text-base border-2 border-black rounded-lg px-2.5 py-0.5 ${getGradeBadgeColor(letter)};

  // Display weights check status
  let totalW = 0;
  weightedCategories.forEach(c => totalW += c.weight);
  const badge = document.getElementById('weight-total-badge');
  badge.innerText = ${totalW}%;
  
  if (totalW === 100) {
    badge.className = "font-mono font-black text-xs px-2.5 py-1 rounded-md border-2 border-black bg-[#4ECDC4] text-black";
    document.getElementById('weight-total-help').innerText = "Perfect! Your component weights total exactly 100%";
  } else {
    badge.className = "font-mono font-black text-xs px-2.5 py-1 rounded-md border-2 border-black bg-[#FF6B6B] text-white";
    document.getElementById('weight-total-help').innerText = Warning: Weight total of ${totalW}% differs from standard 100%! We are mathematically normalizing it!;
  }

  // Handle FAIL BANNER visibility
  const failBanner = document.getElementById('fail-banner');
  if (avg > 0 && avg < 60) {
    failBanner.classList.remove('hidden');
  } else {
    failBanner.classList.add('hidden');
  }

  triggerMascotReaction(avg, currentTab);
}

/* Add Category component on standard submission */
function addWeightedCategory(event) {
  event.preventDefault();
  const nameInput = document.getElementById('w-name');
  const scoreInput = document.getElementById('w-score');
  const weightInput = document.getElementById('w-weight');

  const name = nameInput.value.trim();
  const score = parseFloat(scoreInput.value);
  const weight = parseInt(weightInput.value);

  if (name && !isNaN(score) && !isNaN(weight)) {
    weightedCategories.push({ id: Date.now().toString(), name, score, weight });
    nameInput.value = '';
    scoreInput.value = '';
    weightInput.value = '';
    
    // Play happy audio indicator or scatter flowers if it crosses pass threshold!
    const legacyPass = (getActiveAverage() - (boosterStates.b1?3:0) - (boosterStates.b2?5:0)) < 60;
    renderWeightedTable();
    updateWeightedVisuals();
    
    if (legacyPass && getActiveAverage() >= 60) {
      triggerPassingBurst();
    }
  }
}

function deleteWeightedRow(id) {
  weightedCategories = weightedCategories.filter(c => c.id !== id);
  renderWeightedTable();
  updateWeightedVisuals();
}

function renderWeightedTable() {
  const container = document.getElementById('weighted-table-list');
  container.innerHTML = '';

  if (weightedCategories.length === 0) {
    container.innerHTML = `
      <div class="border-4 border-dashed border-stone-300 p-8 rounded-2xl text-center">
        <span class="text-2xl mb-1">📝</span>
        <h4 class="font-black text-stone-600 text-xs">No grades recorded yet</h4>
        <p class="text-[9px] text-stone-400">Class parameters will appear here!</p>
      </div>`;
    return;
  }

  weightedCategories.forEach(c => {
    const row = document.createElement('div');
    row.className = "grid grid-cols-12 items-center bg-white hover:bg-[#FFFBEB]/40 border-4 border-black rounded-xl p-3 shadow-sm transition-all";
    row.innerHTML = `
      <div class="col-span-4 text-xs font-black text-[#1A1A1A] truncate pr-1">${c.name}</div>
      <div class="col-span-3 text-xs text-center font-black font-mono">Weight: ${c.weight}%</div>
      <div class="col-span-3 text-center">
        <span class="px-2 py-0.5 rounded-lg font-mono text-xs font-black border-2 border-black ${getGradeBadgeColor(getLetterGrade(c.score))}">
          ${c.score.toFixed(1)}%
        </span>
      </div>
      <div class="col-span-2 text-center">
        <button onclick="deleteWeightedRow('${c.id}')" class="text-stone-400 hover:text-red-500 p-1.5 rounded-md transition-all border border-transparent hover:border-black inline-flex cursor-pointer">
          🗑️
        </button>
      </div>`;
    container.appendChild(row);
  });
}

function seedSampleWeighted() {
  weightedCategories = [
    { id: '1', name: 'Exams & Quizzes', score: 55, weight: 50 },
    { id: '2', name: 'Homework Packs', score: 62, weight: 30 },
    { id: '3', name: 'Lab Participation', score: 45, weight: 20 }
  ];
  renderWeightedTable();
  updateWeightedVisuals();
}

/* Grade Booster Toggle buttons triggers */
function toggleBooster(key) {
  boosterStates[key] = !boosterStates[key];
  const btn = document.getElementById(booster-${key});
  const check = document.getElementById(booster-check-${key});
  
  if (boosterStates[key]) {
    btn.className = "booster-btn w-full text-left p-3.5 rounded-2xl border-4 border-black flex items-center justify-between transition-all cursor-pointer bg-[#FFE66D]/45 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]";
    check.className = "w-5 h-5 rounded border-2 border-black bg-[#4ECDC4] flex items-center justify-center font-black text-xs text-black";
    check.innerText = "✓";
    
    // Trigger burst if toggling on pushes total above passing
    if (getActiveAverage() >= 60) {
      triggerPassingBurst();
    }
  } else {
    btn.className = "booster-btn w-full text-left p-3.5 rounded-2xl border-4 border-black flex items-center justify-between transition-all cursor-pointer bg-white";
    check.className = "w-5 h-5 rounded border-2 border-black bg-white flex items-center justify-center";
    check.innerText = "";
  }
  updateWeightedVisuals();
}

/* ==========================================================
   GPA MATRIX CALCULATION SUBMODULE
   ========================================================== */
function setGpaLevel(level) {
  gpaLevel = level;
  document.getElementById('gpa-scale-hs').className = px-3 py-1 text-[10px] font-black rounded-lg transition-all cursor-pointer ${level==='hs' ? 'bg-[#FF6B6B] text-white border-2 border-black' : ''};
  document.getElementById('gpa-scale-col').className = px-3 py-1 text-[10px] font-black rounded-lg transition-all cursor-pointer ${level==='college' ? 'bg-[#FF6B6B] text-white border-2 border-black' : ''};

  document.getElementById('gpa-explainer').innerText = level === 'hs' 
    ? "Includes weighted boosts (+1.0 point) for Advanced Placement (AP) courses."
    : "Standard college 4.0 scale. Courses evaluate identically without honor multiplier adjustments.";

  document.getElementById('gpa-ap-wrap').className = level==='hs' ? 'p-3 bg-[#FFFBEB] border-4 border-black rounded-xl' : 'hidden';
  
  recalculateGpa();
}

function addGpaCourse(event) {
  event.preventDefault();
  const nameInput = document.getElementById('gpa-course-name');
  const creditsSelect = document.getElementById('gpa-course-credits');
  const gradeSelect = document.getElementById('gpa-course-grade');
  const apCheckbox = document.getElementById('gpa-course-ap');

  const name = nameInput.value.trim();
  const credits = parseInt(creditsSelect.value);
  const letterGrade = gradeSelect.value;
  const isAP = gpaLevel === 'hs' ? apCheckbox.checked : false;

  if (name) {
    gpaCourses.push({ id: Date.now().toString(), name, credits, letterGrade, isAP });
    nameInput.value = '';
    apCheckbox.checked = false;
    
    renderGpaTable();
    recalculateGpa();
  }
}

function deleteGpaRow(id) {
  gpaCourses = gpaCourses.filter(c => c.id !== id);
  renderGpaTable();
  recalculateGpa();
}

function getGradePoints(letter) {
  switch (letter) {
    case 'A': return 4.0;
    case 'A-': return 3.7;
    case 'B+': return 3.3;
    case 'B': return 3.0;
    case 'B-': return 2.7;
    case 'C+': return 2.3;
    case 'C': return 2.0;
    case 'D': return 1.0;
    default: return 0.0;
  }
}

function recalculateGpa() {
  let totalCredits = 0;
  let weightedPointsSum = 0;
  let unweightedPointsSum = 0;

  gpaCourses.forEach(c => {
    const pts = getGradePoints(c.letterGrade);
    totalCredits += c.credits;
    unweightedPointsSum += pts * c.credits;

    let weightedPts = pts;
    if (gpaLevel === 'hs' && c.isAP) {
      weightedPts += 1.0;
    }
    weightedPointsSum += weightedPts * c.credits;
  });

  const activeGpa = totalCredits > 0 
    ? (gpaLevel === 'hs' ? weightedPointsSum / totalCredits : unweightedPointsSum / totalCredits) 
    : 4.0;

  document.getElementById('gpa-calculated-val').innerText = activeGpa.toFixed(2);
  document.getElementById('gpa-credits-val').innerText = totalCredits;
  document.getElementById('gpa-max-scale').innerText = Scale: ${gpaLevel === 'hs' ? '5.0 (Weighted)' : '4.0 (College)'};

  const honorsBanner = document.getElementById('gpa-honors-banner');
  if (gpaCourses.length > 0) {
    honorsBanner.classList.remove('hidden');
    if (activeGpa >= 3.8) {
      honorsBanner.innerHTML = 'Academic Honors: <strong class="underline decoration-wavy text-emerald-800">SUMMA CUM LAUDE 👑</strong>';
      honorsBanner.className = "p-4 text-center rounded-[20px] text-xs font-black uppercase tracking-wide border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-emerald-100 text-emerald-950";
    } else if (activeGpa >= 3.5) {
      honorsBanner.innerHTML = 'Academic Honors: <strong class="underline decoration-wavy">MAGNA CUM LAUDE ⭐</strong>';
      honorsBanner.className = "p-4 text-center rounded-[20px] text-xs font-black uppercase tracking-wide border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-amber-100 text-amber-950";
    } else {
      honorsBanner.innerHTML = 'Academic Honors: <strong class="underline">HONORS LIST 🌱</strong>';
      honorsBanner.className = "p-4 text-center rounded-[20px] text-xs font-black uppercase tracking-wide border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-[#FFFBEB] text-black";
    }
  } else {
    honorsBanner.classList.add('hidden');
  }

  // Sync mascot bubble on GPA update
  if (currentTab === 'gpa') {
    triggerMascotReaction(activeGpa * 20, 'gpa'); // Map GPA safely to standard percentage scaling
  }
}

function renderGpaTable() {
  const container = document.getElementById('gpa-course-list');
  container.innerHTML = '';

  if (gpaCourses.length === 0) {
    container.innerHTML = `
      <div class="border-4 border-dashed border-stone-300 p-8 rounded-2xl text-center">
        <span class="text-2xl mb-1">📝</span>
        <h4 class="font-black text-stone-600 text-xs">No courses registered</h4>
        <p class="text-[9px] text-stone-400">Add classes with parameters on the left</p>
      </div>`;
    return;
  }

  gpaCourses.forEach(c => {
    const row = document.createElement('div');
    row.className = "grid grid-cols-12 items-center bg-white hover:bg-[#FFFBEB]/40 border-4 border-black rounded-xl p-3 shadow-sm transition-all";
    row.innerHTML = `
      <div class="col-span-4 text-xs font-black text-[#1A1A1A] truncate pr-1">${c.name}</div>
      <div class="col-span-3 text-xs text-center font-black font-mono">${c.credits} Credits</div>
      <div class="col-span-3 text-center flex items-center justify-center gap-2">
        <span class="px-2 py-0.5 rounded-lg font-mono text-xs font-black border-2 border-black ${getGradeBadgeColor(c.letterGrade)}">
          ${c.letterGrade}
        </span>
        ${c.isAP ? '<span class="bg-[#FFE66D] text-[9px] border border-black font-black px-1.5 py-0.5 rounded uppercase">AP</span>' : ''}
      </div>
      <div class="col-span-2 text-center">
        <button onclick="deleteGpaRow('${c.id}')" class="text-stone-400 hover:text-red-500 p-1.5 rounded-md transition-all border border-transparent hover:border-black inline-flex cursor-pointer">
          🗑️
        </button>
      </div>`;
    container.appendChild(row);
  });
}

function seedSampleGpa() {
  gpaCourses = [
    { id: '1', name: 'AP Physics', credits: 4, letterGrade: 'A', isAP: true },
    { id: '2', name: 'English Honor', credits: 3, letterGrade: 'B+', isAP: false },
    { id: '3', name: 'World History', credits: 3, letterGrade: 'A-', isAP: true }
  ];
  renderGpaTable();
  setGpaLevel('hs');
}

/* ==========================================================
   FINAL EXAM PREDICTION FORMULAS
   ========================================================== */
function runFinalExamCalc() {
  const current = parseFloat(document.getElementById('final-current-slider').value);
  const target = parseFloat(document.getElementById('final-target-slider').value);
  const weight = parseFloat(document.getElementById('final-weight-slider').value);

  // Sync numerical labels
  document.getElementById('final-current-val').innerText = ${current}%;
  document.getElementById('final-target-val').innerText = ${target}%;
  document.getElementById('final-weight-val').innerText = ${weight}%;

  // Apply Reverse Matrix Formula
  const currentFactor = current * (1 - (weight / 100));
  const required = (target - currentFactor) / (weight / 100);

  const displayNeeded = document.getElementById('final-required-needed');
  displayNeeded.innerText = required > 100 ? ${required.toFixed(0)}% : ${required.toFixed(1)}%;

  const status = document.getElementById('final-status-badge');
  const advice = document.getElementById('final-advice-para');

  if (required <= 60) {
    status.className = "text-xs font-black uppercase tracking-widest block mb-1 text-emerald-500";
    status.innerText = "STATUS: VERY EASY";
    advice.innerText = "A simple pass score gets you your target! Don't stress.";
  } else if (required <= 85) {
    status.className = "text-xs font-black uppercase tracking-widest block mb-1 text-sky-500";
    status.innerText = "STATUS: COMFORTABLE";
    advice.innerText = "A completely average effort will guarantee this desired course outcome!";
  } else if (required <= 100) {
    status.className = "text-xs font-black uppercase tracking-widest block mb-1 text-amber-500";
    status.innerText = "STATUS: CRITICAL FOCUS";
    advice.innerText = "Requires active study
