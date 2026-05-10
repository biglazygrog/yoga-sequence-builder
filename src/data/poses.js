// Rocket Yoga pose library — created by Larry Schultz, derived from Ashtanga.
// Joint array (15 entries): each entry is [x, y, z] in Three.js world space.
// Y is up. Figure stands with feet near Y=0.
//
// Joint indices:
//  0  HEAD        1  NECK
//  2  L_SHOULDER  3  R_SHOULDER
//  4  L_ELBOW     5  R_ELBOW
//  6  L_HAND      7  R_HAND
//  8  SPINE
//  9  L_HIP      10  R_HIP
// 11  L_KNEE     12  R_KNEE
// 13  L_FOOT     14  R_FOOT

export const POSES = [

  // ── SURYA NAMASKAR ───────────────────────────────────────────────────────

  {
    id: 'tadasana',
    englishName: 'Mountain Pose',
    sanskritName: 'Tadasana',
    emoji: '🏔️',
    category: 'standing',
    series: ['surya', 'rocket1'],
    difficulty: 'beginner',
    duration: 10,
    description: 'The foundation of all standing poses. Stand tall, grounded and alert.',
    benefits: ['Improves posture', 'Strengthens thighs and ankles', 'Grounds the nervous system'],
    cues: ['Root through all four corners of your feet', 'Lift the kneecaps', 'Crown of head rises'],
    joints: [
      [0, 2.2, 0],      // HEAD
      [0, 2.0, 0],      // NECK
      [-0.35, 1.8, 0],  // L_SHOULDER
      [0.35, 1.8, 0],   // R_SHOULDER
      [-0.45, 1.4, 0],  // L_ELBOW
      [0.45, 1.4, 0],   // R_ELBOW
      [-0.45, 1.0, 0],  // L_HAND
      [0.45, 1.0, 0],   // R_HAND
      [0, 1.3, 0],      // SPINE
      [-0.18, 0.9, 0],  // L_HIP
      [0.18, 0.9, 0],   // R_HIP
      [-0.18, 0.5, 0],  // L_KNEE
      [0.18, 0.5, 0],   // R_KNEE
      [-0.18, 0.0, 0],  // L_FOOT
      [0.18, 0.0, 0],   // R_FOOT
    ],
  },

  {
    id: 'uttanasana',
    englishName: 'Standing Forward Fold',
    sanskritName: 'Uttanasana',
    emoji: '🙇',
    category: 'standing',
    series: ['surya', 'rocket1'],
    difficulty: 'beginner',
    duration: 15,
    description: 'A deep fold that releases the hamstrings and quiets the mind.',
    benefits: ['Stretches hamstrings and calves', 'Relieves tension in spine', 'Calms the mind'],
    cues: ['Hinge from the hip crease', 'Micro-bend the knees if needed', 'Let the head hang heavy'],
    joints: [
      [0, 0.5, -0.5],    // HEAD
      [0, 0.7, -0.4],    // NECK
      [-0.3, 0.95, -0.25], // L_SHOULDER
      [0.3, 0.95, -0.25],  // R_SHOULDER
      [-0.3, 0.55, -0.55], // L_ELBOW
      [0.3, 0.55, -0.55],  // R_ELBOW
      [-0.2, 0.08, -0.3],  // L_HAND
      [0.2, 0.08, -0.3],   // R_HAND
      [0, 1.25, 0.05],   // SPINE
      [-0.18, 1.05, 0.1],  // L_HIP
      [0.18, 1.05, 0.1],   // R_HIP
      [-0.18, 0.55, 0.05], // L_KNEE
      [0.18, 0.55, 0.05],  // R_KNEE
      [-0.18, 0.0, 0],   // L_FOOT
      [0.18, 0.0, 0],    // R_FOOT
    ],
  },

  {
    id: 'ardha-uttanasana',
    englishName: 'Half Forward Fold',
    sanskritName: 'Ardha Uttanasana',
    emoji: '↗️',
    category: 'standing',
    series: ['surya'],
    difficulty: 'beginner',
    duration: 5,
    description: 'Flat-back lift halfway up — spine parallel to the floor.',
    benefits: ['Lengthens the spine', 'Prepares for full forward fold', 'Strengthens the back'],
    cues: ['Draw shoulder blades together', 'Spine long and flat', 'Fingertips on shins or floor'],
    joints: [
      [0, 1.3, -0.45],    // HEAD
      [0, 1.32, -0.3],    // NECK
      [-0.35, 1.32, -0.15], // L_SHOULDER
      [0.35, 1.32, -0.15],  // R_SHOULDER
      [-0.35, 0.85, -0.3],  // L_ELBOW
      [0.35, 0.85, -0.3],   // R_ELBOW
      [-0.2, 0.5, -0.05],   // L_HAND
      [0.2, 0.5, -0.05],    // R_HAND
      [0, 1.32, 0],       // SPINE
      [-0.18, 1.1, 0.1],  // L_HIP
      [0.18, 1.1, 0.1],   // R_HIP
      [-0.18, 0.55, 0.05], // L_KNEE
      [0.18, 0.55, 0.05],  // R_KNEE
      [-0.18, 0.0, 0],    // L_FOOT
      [0.18, 0.0, 0],     // R_FOOT
    ],
  },

  {
    id: 'phalakasana',
    englishName: 'Plank Pose',
    sanskritName: 'Phalakasana',
    emoji: '📏',
    category: 'prone',
    series: ['surya', 'rocket1', 'rocket2'],
    difficulty: 'beginner',
    duration: 10,
    description: 'Full-body straight-line hold — the foundation of every vinyasa.',
    benefits: ['Builds core and arm strength', 'Tones the whole body', 'Improves posture'],
    cues: ['Body in one straight line', 'Press floor away with straight arms', 'Engage the belly'],
    joints: [
      [0, 0.9, -0.85],    // HEAD
      [0, 1.0, -0.65],    // NECK
      [-0.35, 1.05, -0.45], // L_SHOULDER
      [0.35, 1.05, -0.45],  // R_SHOULDER
      [-0.35, 0.6, -0.65],  // L_ELBOW
      [0.35, 0.6, -0.65],   // R_ELBOW
      [-0.35, 0.08, -0.85], // L_HAND
      [0.35, 0.08, -0.85],  // R_HAND
      [0, 1.0, 0.05],     // SPINE
      [-0.18, 0.98, 0.2], // L_HIP
      [0.18, 0.98, 0.2],  // R_HIP
      [-0.18, 0.55, 0.6], // L_KNEE
      [0.18, 0.55, 0.6],  // R_KNEE
      [-0.18, 0.08, 1.0], // L_FOOT
      [0.18, 0.08, 1.0],  // R_FOOT
    ],
  },

  {
    id: 'chaturanga-dandasana',
    englishName: 'Four-Limbed Staff',
    sanskritName: 'Chaturanga Dandasana',
    emoji: '⬇️',
    category: 'prone',
    series: ['surya', 'rocket1', 'rocket2'],
    difficulty: 'intermediate',
    duration: 5,
    description: 'Low push-up position — elbows at 90° and body parallel to the floor.',
    benefits: ['Strengthens arms, wrists and core', 'Builds heat', 'Vinyasa transition'],
    cues: ['Elbows hug the ribs', 'Body stays parallel to floor', 'Look slightly forward'],
    joints: [
      [0, 0.42, -0.85],    // HEAD
      [0, 0.52, -0.65],    // NECK
      [-0.35, 0.58, -0.45], // L_SHOULDER
      [0.35, 0.58, -0.45],  // R_SHOULDER
      [-0.35, 0.32, -0.6],  // L_ELBOW
      [0.35, 0.32, -0.6],   // R_ELBOW
      [-0.35, 0.08, -0.8],  // L_HAND
      [0.35, 0.08, -0.8],   // R_HAND
      [0, 0.58, 0.05],    // SPINE
      [-0.18, 0.55, 0.2], // L_HIP
      [0.18, 0.55, 0.2],  // R_HIP
      [-0.18, 0.28, 0.6], // L_KNEE
      [0.18, 0.28, 0.6],  // R_KNEE
      [-0.18, 0.08, 1.0], // L_FOOT
      [0.18, 0.08, 1.0],  // R_FOOT
    ],
  },

  {
    id: 'urdhva-mukha-svanasana',
    englishName: 'Upward-Facing Dog',
    sanskritName: 'Urdhva Mukha Svanasana',
    emoji: '🐾',
    category: 'prone',
    series: ['surya', 'rocket1', 'rocket2'],
    difficulty: 'beginner',
    duration: 5,
    description: 'Chest-opening backbend — the counter-pose to Chaturanga.',
    benefits: ['Opens the chest', 'Strengthens the spine', 'Stretches the abdomen'],
    cues: ['Press through straight arms', 'Thighs lift off the floor', 'Roll shoulders back and down'],
    joints: [
      [0, 1.5, -0.35],    // HEAD
      [0, 1.35, -0.2],    // NECK
      [-0.35, 1.1, -0.05], // L_SHOULDER
      [0.35, 1.1, -0.05],  // R_SHOULDER
      [-0.35, 0.6, -0.4],  // L_ELBOW
      [0.35, 0.6, -0.4],   // R_ELBOW
      [-0.35, 0.08, -0.65], // L_HAND
      [0.35, 0.08, -0.65],  // R_HAND
      [0, 0.75, 0.2],     // SPINE
      [-0.18, 0.25, 0.3], // L_HIP
      [0.18, 0.25, 0.3],  // R_HIP
      [-0.18, 0.08, 0.65], // L_KNEE
      [0.18, 0.08, 0.65],  // R_KNEE
      [-0.18, 0.08, 1.0], // L_FOOT
      [0.18, 0.08, 1.0],  // R_FOOT
    ],
  },

  {
    id: 'adho-mukha-svanasana',
    englishName: 'Downward-Facing Dog',
    sanskritName: 'Adho Mukha Svanasana',
    emoji: '🐕',
    category: 'standing',
    series: ['surya', 'rocket1'],
    difficulty: 'beginner',
    duration: 15,
    description: 'An inversion that simultaneously stretches and strengthens the whole body.',
    benefits: ['Lengthens the spine', 'Strengthens arms and legs', 'Calms the mind'],
    cues: ['Press the floor away', 'Send hips high and back', 'Heels reach toward the floor'],
    joints: [
      [0, 0.7, -0.8],     // HEAD
      [0, 0.9, -0.6],     // NECK
      [-0.35, 1.2, -0.5], // L_SHOULDER
      [0.35, 1.2, -0.5],  // R_SHOULDER
      [-0.35, 0.6, -0.9], // L_ELBOW
      [0.35, 0.6, -0.9],  // R_ELBOW
      [-0.35, 0.08, -1.2], // L_HAND
      [0.35, 0.08, -1.2], // R_HAND
      [0, 1.5, 0.1],      // SPINE
      [-0.18, 1.4, 0.15], // L_HIP
      [0.18, 1.4, 0.15],  // R_HIP
      [-0.18, 0.7, 0.7],  // L_KNEE
      [0.18, 0.7, 0.7],   // R_KNEE
      [-0.18, 0.08, 1.1], // L_FOOT
      [0.18, 0.08, 1.1],  // R_FOOT
    ],
  },

  // ── ROCKET I – STANDING ──────────────────────────────────────────────────

  {
    id: 'utkatasana',
    englishName: 'Chair Pose',
    sanskritName: 'Utkatasana',
    emoji: '💺',
    category: 'standing',
    series: ['surya', 'rocket1'],
    difficulty: 'beginner',
    duration: 15,
    description: 'Fierce pose — like sitting in an invisible chair with arms raised.',
    benefits: ['Strengthens thighs and glutes', 'Builds heat', 'Tones the spine'],
    cues: ['Weight in the heels', 'Knees track over second toe', 'Torso leans forward slightly'],
    joints: [
      [0, 2.0, -0.15],     // HEAD
      [0, 1.85, -0.1],     // NECK
      [-0.35, 1.65, -0.05], // L_SHOULDER
      [0.35, 1.65, -0.05],  // R_SHOULDER
      [-0.3, 2.05, -0.05],  // L_ELBOW
      [0.3, 2.05, -0.05],   // R_ELBOW
      [-0.25, 2.45, -0.05], // L_HAND
      [0.25, 2.45, -0.05],  // R_HAND
      [0, 1.2, 0],        // SPINE
      [-0.18, 0.8, -0.1], // L_HIP
      [0.18, 0.8, -0.1],  // R_HIP
      [-0.18, 0.45, 0.3], // L_KNEE
      [0.18, 0.45, 0.3],  // R_KNEE
      [-0.18, 0.0, 0.0],  // L_FOOT
      [0.18, 0.0, 0.0],   // R_FOOT
    ],
  },

  {
    id: 'virabhadrasana-1',
    englishName: 'Warrior I',
    sanskritName: 'Virabhadrasana I',
    emoji: '⚔️',
    category: 'standing',
    series: ['surya', 'rocket1'],
    difficulty: 'beginner',
    duration: 20,
    description: 'A powerful standing pose that builds strength, stability and focus.',
    benefits: ['Strengthens legs and core', 'Opens hips and chest', 'Builds concentration'],
    cues: ['Square the hips toward the front', 'Sink the back knee toward the floor', 'Reach strongly through the fingertips'],
    joints: [
      [0, 2.2, -0.1],      // HEAD
      [0, 2.0, -0.05],     // NECK
      [-0.35, 1.8, 0],     // L_SHOULDER
      [0.35, 1.8, 0],      // R_SHOULDER
      [-0.35, 2.2, 0],     // L_ELBOW
      [0.35, 2.2, 0],      // R_ELBOW
      [-0.3, 2.65, 0],     // L_HAND
      [0.3, 2.65, 0],      // R_HAND
      [0, 1.35, 0],        // SPINE
      [-0.18, 0.95, -0.4], // L_HIP
      [0.18, 0.95, 0.5],   // R_HIP
      [-0.18, 0.5, -0.6],  // L_KNEE
      [0.18, 0.45, 0.45],  // R_KNEE
      [-0.18, 0.0, -0.8],  // L_FOOT
      [0.18, 0.0, 0.8],    // R_FOOT
    ],
  },

  {
    id: 'virabhadrasana-2',
    englishName: 'Warrior II',
    sanskritName: 'Virabhadrasana II',
    emoji: '🏹',
    category: 'standing',
    series: ['rocket1'],
    difficulty: 'beginner',
    duration: 20,
    description: 'Side-facing warrior with arms extended — a foundation of the Rocket standing series.',
    benefits: ['Strengthens legs', 'Opens hips and groin', 'Builds stamina and focus'],
    cues: ['Stack front knee over ankle', 'Arms parallel to the floor', 'Gaze past front fingertips'],
    joints: [
      [0, 2.1, 0],        // HEAD
      [0, 1.9, 0],        // NECK
      [-0.5, 1.75, 0],    // L_SHOULDER
      [0.5, 1.75, 0],     // R_SHOULDER
      [-1.0, 1.75, 0],    // L_ELBOW
      [1.0, 1.75, 0],     // R_ELBOW
      [-1.4, 1.75, 0],    // L_HAND
      [1.4, 1.75, 0],     // R_HAND
      [0, 1.3, 0],        // SPINE
      [-0.15, 0.9, -0.6], // L_HIP
      [0.15, 0.9, 0.5],   // R_HIP
      [-0.2, 0.5, -0.8],  // L_KNEE
      [0.15, 0.5, 0.5],   // R_KNEE
      [-0.25, 0.0, -0.9], // L_FOOT
      [0.15, 0.0, 0.8],   // R_FOOT
    ],
  },

  {
    id: 'virabhadrasana-3',
    englishName: 'Warrior III',
    sanskritName: 'Virabhadrasana III',
    emoji: '🦅',
    category: 'balance',
    series: ['rocket1'],
    difficulty: 'intermediate',
    duration: 15,
    description: 'One-legged balance with body and lifted leg parallel to the floor.',
    benefits: ['Strengthens standing leg and core', 'Improves balance', 'Tones the whole back body'],
    cues: ['Flex the lifted foot', 'Hips level to the floor', 'Arms reach forward like an arrow'],
    joints: [
      [0, 1.1, -0.95],    // HEAD
      [0, 1.1, -0.75],    // NECK
      [-0.3, 1.1, -0.55], // L_SHOULDER
      [0.3, 1.1, -0.55],  // R_SHOULDER
      [-0.2, 1.1, -0.95], // L_ELBOW
      [0.2, 1.1, -0.95],  // R_ELBOW
      [-0.15, 1.1, -1.35], // L_HAND
      [0.15, 1.1, -1.35], // R_HAND
      [0, 1.1, 0],        // SPINE
      [-0.18, 1.0, 0.05], // L_HIP
      [0.18, 1.0, 0.05],  // R_HIP
      [-0.18, 1.0, 0.55], // L_KNEE (lifted leg)
      [0.18, 0.55, 0.05], // R_KNEE (standing)
      [-0.18, 1.0, 1.1],  // L_FOOT (extended back)
      [0.18, 0.0, 0.0],   // R_FOOT (grounded)
    ],
  },

  {
    id: 'utthita-trikonasana',
    englishName: 'Triangle Pose',
    sanskritName: 'Utthita Trikonasana',
    emoji: '📐',
    category: 'standing',
    series: ['rocket1'],
    difficulty: 'beginner',
    duration: 20,
    description: 'A lateral stretch that forms a triangle shape with the body and floor.',
    benefits: ['Stretches hamstrings and hips', 'Strengthens core', 'Improves balance'],
    cues: ['Lengthen both sides of the torso equally', 'Stack hips on top of each other', 'Spread the fingers wide'],
    joints: [
      [0.1, 1.45, 0],      // HEAD
      [0.1, 1.3, 0],       // NECK
      [-0.6, 1.1, 0],      // L_SHOULDER
      [0.5, 1.4, 0],       // R_SHOULDER
      [-0.9, 0.6, 0],      // L_ELBOW
      [0.7, 1.8, 0],       // R_ELBOW
      [-1.0, 0.15, 0],     // L_HAND
      [0.7, 2.2, 0],       // R_HAND
      [0, 1.0, 0],         // SPINE
      [-0.15, 0.85, -0.7], // L_HIP
      [0.15, 0.85, 0.5],   // R_HIP
      [-0.15, 0.45, -0.7], // L_KNEE
      [0.15, 0.45, 0.5],   // R_KNEE
      [-0.15, 0.0, -0.8],  // L_FOOT
      [0.15, 0.0, 0.7],    // R_FOOT
    ],
  },

  {
    id: 'parivrtta-trikonasana',
    englishName: 'Revolved Triangle',
    sanskritName: 'Parivrtta Trikonasana',
    emoji: '🔄',
    category: 'standing',
    series: ['rocket1'],
    difficulty: 'intermediate',
    duration: 20,
    description: 'A twisting triangle that challenges balance, strength and flexibility.',
    benefits: ['Detoxifying twist', 'Strengthens legs', 'Improves spinal rotation'],
    cues: ['Ground the back heel firmly', 'Rotate from the belly, not the shoulder', 'Keep hips as square as possible'],
    joints: [
      [0.15, 1.5, 0.1],    // HEAD
      [0.1, 1.38, 0.05],   // NECK
      [-0.5, 1.15, 0.1],   // L_SHOULDER (top arm)
      [0.4, 0.9, -0.05],   // R_SHOULDER (bottom arm)
      [-0.75, 1.55, 0.05], // L_ELBOW
      [0.55, 0.5, -0.05],  // R_ELBOW
      [-0.85, 1.95, 0.0],  // L_HAND (up)
      [0.55, 0.1, -0.05],  // R_HAND (down)
      [0, 1.0, 0],         // SPINE
      [-0.15, 0.85, -0.6], // L_HIP
      [0.15, 0.85, 0.5],   // R_HIP
      [-0.15, 0.45, -0.7], // L_KNEE
      [0.15, 0.45, 0.5],   // R_KNEE
      [-0.15, 0.0, -0.85], // L_FOOT
      [0.15, 0.0, 0.75],   // R_FOOT
    ],
  },

  {
    id: 'utthita-parsvakonasana',
    englishName: 'Extended Side Angle',
    sanskritName: 'Utthita Parsvakonasana',
    emoji: '↙️',
    category: 'standing',
    series: ['rocket1'],
    difficulty: 'beginner',
    duration: 20,
    description: 'A side lunge with one arm extended overhead in a long diagonal line.',
    benefits: ['Strengthens legs and core', 'Opens the side body', 'Improves stamina'],
    cues: ['Create one straight line from back foot to top hand', 'Front knee stays over ankle', 'Open the chest to the ceiling'],
    joints: [
      [0, 1.55, 0.2],      // HEAD
      [0, 1.42, 0.15],     // NECK
      [-0.4, 1.35, 0.1],   // L_SHOULDER
      [0.35, 1.25, 0],     // R_SHOULDER
      [-0.9, 1.6, 0.05],   // L_ELBOW (arm over)
      [0.45, 0.7, -0.1],   // R_ELBOW (arm down)
      [-1.3, 1.85, 0],     // L_HAND (overhead)
      [0.35, 0.1, -0.2],   // R_HAND (floor/shin)
      [0, 1.1, 0],         // SPINE
      [-0.15, 0.9, -0.6],  // L_HIP
      [0.15, 0.9, 0.45],   // R_HIP
      [-0.15, 0.5, -0.85], // L_KNEE (bent)
      [0.15, 0.5, 0.5],    // R_KNEE (straight)
      [-0.15, 0.0, -0.9],  // L_FOOT
      [0.15, 0.0, 0.8],    // R_FOOT
    ],
  },

  {
    id: 'prasarita-padottanasana',
    englishName: 'Wide-Legged Forward Fold',
    sanskritName: 'Prasarita Padottanasana',
    emoji: '🦵',
    category: 'standing',
    series: ['rocket1'],
    difficulty: 'beginner',
    duration: 30,
    description: 'Standing wide-legged fold — a semi-inversion that stretches the inner legs.',
    benefits: ['Stretches inner legs and hips', 'Releases the spine', 'Gentle inversion'],
    cues: ['Feet parallel, wide apart', 'Fold from the hip crease', 'Crown of head reaches for the floor'],
    joints: [
      [0, 0.2, 0],         // HEAD
      [0, 0.38, 0],        // NECK
      [-0.45, 0.65, 0],    // L_SHOULDER
      [0.45, 0.65, 0],     // R_SHOULDER
      [-0.8, 0.3, 0],      // L_ELBOW
      [0.8, 0.3, 0],       // R_ELBOW
      [-0.9, 0.08, 0],     // L_HAND
      [0.9, 0.08, 0],      // R_HAND
      [0, 1.0, 0],         // SPINE
      [-0.8, 0.95, 0],     // L_HIP
      [0.8, 0.95, 0],      // R_HIP
      [-0.8, 0.5, 0],      // L_KNEE
      [0.8, 0.5, 0],       // R_KNEE
      [-0.9, 0.0, 0],      // L_FOOT
      [0.9, 0.0, 0],       // R_FOOT
    ],
  },

  {
    id: 'parsvottanasana',
    englishName: 'Pyramid Pose',
    sanskritName: 'Parsvottanasana',
    emoji: '🔺',
    category: 'standing',
    series: ['rocket1'],
    difficulty: 'beginner',
    duration: 20,
    description: 'An intense stretch over one straight leg with square hips.',
    benefits: ['Stretches hamstrings', 'Improves balance', 'Calms the mind'],
    cues: ['Square hips forward', 'Hinge from the hip, not waist', 'Hands behind back or on shin'],
    joints: [
      [0, 0.6, -0.55],     // HEAD
      [0, 0.78, -0.45],    // NECK
      [-0.3, 1.0, -0.3],   // L_SHOULDER
      [0.3, 1.0, -0.3],    // R_SHOULDER
      [-0.4, 0.7, 0.2],    // L_ELBOW (reverse prayer behind back)
      [0.4, 0.7, 0.2],     // R_ELBOW
      [-0.35, 0.85, 0.4],  // L_HAND
      [0.35, 0.85, 0.4],   // R_HAND
      [0, 1.25, -0.1],     // SPINE
      [-0.18, 1.05, -0.1], // L_HIP
      [0.18, 1.05, 0.55],  // R_HIP
      [-0.18, 0.5, -0.3],  // L_KNEE (front, straight)
      [0.18, 0.5, 0.55],   // R_KNEE (back, straight)
      [-0.18, 0.0, -0.5],  // L_FOOT (front)
      [0.18, 0.0, 0.7],    // R_FOOT (back)
    ],
  },

  {
    id: 'ardha-chandrasana',
    englishName: 'Half Moon Pose',
    sanskritName: 'Ardha Chandrasana',
    emoji: '🌙',
    category: 'balance',
    series: ['rocket1'],
    difficulty: 'intermediate',
    duration: 20,
    description: 'Balancing on one leg with the other extended horizontally — a crescent of the body.',
    benefits: ['Strengthens standing leg', 'Improves balance and focus', 'Opens the hip of lifted leg'],
    cues: ['Stack hips open to the side', 'Reach both hands in opposite directions', 'Flex the lifted foot'],
    joints: [
      [0.1, 1.5, 0.1],     // HEAD
      [0.05, 1.38, 0.05],  // NECK
      [-0.05, 1.25, 0],    // L_SHOULDER (top)
      [0.2, 1.0, 0.05],    // R_SHOULDER (bottom)
      [-0.1, 1.65, 0],     // L_ELBOW
      [0.2, 0.55, 0.05],   // R_ELBOW
      [-0.1, 2.05, 0],     // L_HAND (up)
      [0.2, 0.08, 0.05],   // R_HAND (down to floor)
      [0.1, 1.05, 0.05],   // SPINE
      [-0.55, 1.0, 0],     // L_HIP (lifted leg)
      [0.2, 0.95, 0],      // R_HIP (standing)
      [-1.0, 0.95, 0],     // L_KNEE (extended)
      [0.2, 0.5, 0],       // R_KNEE (standing)
      [-1.4, 0.95, 0],     // L_FOOT (extended)
      [0.2, 0.0, 0],       // R_FOOT (grounded)
    ],
  },

  {
    id: 'vrksasana',
    englishName: 'Tree Pose',
    sanskritName: 'Vrksasana',
    emoji: '🌳',
    category: 'balance',
    series: ['rocket1'],
    difficulty: 'beginner',
    duration: 20,
    description: 'A single-leg balance that cultivates stillness and concentration.',
    benefits: ['Strengthens standing leg', 'Improves balance and focus', 'Opens hip of bent leg'],
    cues: ['Find a fixed gaze point (drishti)', 'Press foot into thigh and thigh into foot', 'Breathe steadily'],
    joints: [
      [0, 2.2, 0],         // HEAD
      [0, 2.0, 0],         // NECK
      [-0.35, 1.8, 0],     // L_SHOULDER
      [0.35, 1.8, 0],      // R_SHOULDER
      [-0.1, 2.25, 0],     // L_ELBOW
      [0.1, 2.25, 0],      // R_ELBOW
      [-0.05, 2.6, 0],     // L_HAND
      [0.05, 2.6, 0],      // R_HAND
      [0, 1.3, 0],         // SPINE
      [-0.18, 0.9, 0],     // L_HIP
      [0.18, 0.9, 0],      // R_HIP
      [-0.45, 0.75, 0.2],  // L_KNEE (bent out)
      [0.18, 0.5, 0],      // R_KNEE (standing)
      [-0.38, 0.55, 0.1],  // L_FOOT (on inner thigh)
      [0.18, 0.0, 0],      // R_FOOT (grounded)
    ],
  },

  // ── ROCKET I – SEATED ────────────────────────────────────────────────────

  {
    id: 'dandasana',
    englishName: 'Staff Pose',
    sanskritName: 'Dandasana',
    emoji: '📊',
    category: 'seated',
    series: ['rocket1'],
    difficulty: 'beginner',
    duration: 10,
    description: 'Seated with legs straight — the foundation of all seated poses.',
    benefits: ['Improves posture', 'Stretches hamstrings', 'Strengthens the back'],
    cues: ['Sit on the front of your sitting bones', 'Flex the feet', 'Hands beside hips'],
    joints: [
      [0, 1.55, 0],        // HEAD
      [0, 1.4, 0],         // NECK
      [-0.35, 1.2, 0],     // L_SHOULDER
      [0.35, 1.2, 0],      // R_SHOULDER
      [-0.5, 0.95, 0.1],   // L_ELBOW
      [0.5, 0.95, 0.1],    // R_ELBOW
      [-0.5, 0.65, 0.2],   // L_HAND
      [0.5, 0.65, 0.2],    // R_HAND
      [0, 0.9, 0.1],       // SPINE
      [-0.18, 0.65, 0.15], // L_HIP
      [0.18, 0.65, 0.15],  // R_HIP
      [-0.18, 0.35, -0.6], // L_KNEE (legs extended)
      [0.18, 0.35, -0.6],  // R_KNEE
      [-0.18, 0.08, -1.1], // L_FOOT
      [0.18, 0.08, -1.1],  // R_FOOT
    ],
  },

  {
    id: 'paschimottanasana',
    englishName: 'Seated Forward Fold',
    sanskritName: 'Paschimottanasana',
    emoji: '🧘',
    category: 'seated',
    series: ['rocket1'],
    difficulty: 'beginner',
    duration: 30,
    description: 'A deep forward fold stretching the entire back body from feet to head.',
    benefits: ['Stretches hamstrings and spine', 'Calms the nervous system', 'Stimulates abdominal organs'],
    cues: ['Hinge from the hips, not the waist', 'Lead with the chest, not the chin', 'Soften with each exhale'],
    joints: [
      [0, 0.6, -0.9],      // HEAD
      [0, 0.75, -0.7],     // NECK
      [-0.35, 0.9, -0.5],  // L_SHOULDER
      [0.35, 0.9, -0.5],   // R_SHOULDER
      [-0.35, 0.5, -0.9],  // L_ELBOW
      [0.35, 0.5, -0.9],   // R_ELBOW
      [-0.3, 0.1, -1.2],   // L_HAND
      [0.3, 0.1, -1.2],    // R_HAND
      [0, 1.0, -0.2],      // SPINE
      [-0.18, 0.7, 0.2],   // L_HIP
      [0.18, 0.7, 0.2],    // R_HIP
      [-0.18, 0.35, -0.6], // L_KNEE
      [0.18, 0.35, -0.6],  // R_KNEE
      [-0.18, 0.08, -1.1], // L_FOOT
      [0.18, 0.08, -1.1],  // R_FOOT
    ],
  },

  {
    id: 'purvottanasana',
    englishName: 'Reverse Plank',
    sanskritName: 'Purvottanasana',
    emoji: '🌉',
    category: 'seated',
    series: ['rocket1'],
    difficulty: 'intermediate',
    duration: 15,
    description: 'Upward-facing plank — the counter-pose to Paschimottanasana.',
    benefits: ['Strengthens arms and wrists', 'Opens the chest', 'Stretches the front body'],
    cues: ['Press through straight arms', 'Lift the hips high', 'Point the toes or flex the feet'],
    joints: [
      [0, 1.5, 0.4],       // HEAD
      [0, 1.35, 0.25],     // NECK
      [-0.35, 1.1, 0],     // L_SHOULDER
      [0.35, 1.1, 0],      // R_SHOULDER
      [-0.45, 0.6, 0.45],  // L_ELBOW
      [0.45, 0.6, 0.45],   // R_ELBOW
      [-0.4, 0.08, 0.85],  // L_HAND
      [0.4, 0.08, 0.85],   // R_HAND
      [0, 0.85, -0.1],     // SPINE
      [-0.18, 0.85, -0.1], // L_HIP
      [0.18, 0.85, -0.1],  // R_HIP
      [-0.18, 0.45, -0.55], // L_KNEE
      [0.18, 0.45, -0.55], // R_KNEE
      [-0.18, 0.08, -1.0], // L_FOOT
      [0.18, 0.08, -1.0],  // R_FOOT
    ],
  },

  {
    id: 'janu-sirsasana',
    englishName: 'Head-to-Knee Pose',
    sanskritName: 'Janu Sirsasana',
    emoji: '🦵',
    category: 'seated',
    series: ['rocket1'],
    difficulty: 'beginner',
    duration: 30,
    description: 'Seated fold over one extended leg with the other foot drawn to the inner thigh.',
    benefits: ['Stretches hamstrings asymmetrically', 'Massages abdominal organs', 'Calming'],
    cues: ['Rotate torso toward extended leg', 'Lead with the sternum', 'Breathe into the back'],
    joints: [
      [0, 0.5, -0.8],      // HEAD
      [0, 0.65, -0.65],    // NECK
      [-0.3, 0.85, -0.45], // L_SHOULDER
      [0.3, 0.85, -0.45],  // R_SHOULDER
      [-0.3, 0.5, -0.8],   // L_ELBOW
      [0.3, 0.5, -0.8],    // R_ELBOW
      [-0.18, 0.1, -1.1],  // L_HAND
      [0.18, 0.1, -1.1],   // R_HAND
      [0, 0.95, 0.05],     // SPINE
      [-0.18, 0.7, 0.1],   // L_HIP
      [0.18, 0.7, 0.1],    // R_HIP
      [-0.18, 0.35, -0.6], // L_KNEE (extended)
      [0.45, 0.4, 0.3],    // R_KNEE (bent out)
      [-0.18, 0.08, -1.05], // L_FOOT
      [0.35, 0.2, 0.25],   // R_FOOT (at inner thigh)
    ],
  },

  {
    id: 'marichyasana-a',
    englishName: 'Sage Pose A',
    sanskritName: 'Marichyasana A',
    emoji: '🔮',
    category: 'seated',
    series: ['rocket1'],
    difficulty: 'intermediate',
    duration: 30,
    description: 'A forward fold with one leg bent, binding around the shin.',
    benefits: ['Stretches the spine', 'Stimulates digestion', 'Shoulder and hip opener'],
    cues: ['Hug the bent knee in tight', 'Bind wrist behind the back', 'Hinge forward with long spine'],
    joints: [
      [0, 0.55, -0.5],     // HEAD
      [0, 0.7, -0.4],      // NECK
      [-0.3, 0.9, -0.25],  // L_SHOULDER
      [0.3, 0.9, -0.25],   // R_SHOULDER
      [-0.45, 0.6, -0.1],  // L_ELBOW
      [0.3, 0.5, -0.5],    // R_ELBOW
      [-0.15, 0.45, 0.1],  // L_HAND (binding)
      [0.1, 0.3, -0.7],    // R_HAND
      [0, 0.95, 0.05],     // SPINE
      [-0.18, 0.7, 0.1],   // L_HIP
      [0.18, 0.7, 0.1],    // R_HIP
      [-0.18, 0.35, -0.6], // L_KNEE (extended)
      [0.18, 0.55, 0.25],  // R_KNEE (bent)
      [-0.18, 0.08, -1.0], // L_FOOT
      [0.18, 0.1, 0.45],   // R_FOOT (on floor)
    ],
  },

  {
    id: 'marichyasana-c',
    englishName: 'Sage Twist C',
    sanskritName: 'Marichyasana C',
    emoji: '🌀',
    category: 'seated',
    series: ['rocket1'],
    difficulty: 'intermediate',
    duration: 30,
    description: 'A deep seated twist with one leg bent — a classic Rocket I detox pose.',
    benefits: ['Deep spinal rotation', 'Massages digestive organs', 'Relieves back tension'],
    cues: ['Lengthen the spine on the inhale', 'Deepen the twist on the exhale', 'Keep both sitting bones down'],
    joints: [
      [0.2, 1.5, 0.2],     // HEAD (turned)
      [0.1, 1.38, 0.15],   // NECK
      [-0.3, 1.15, 0.25],  // L_SHOULDER
      [0.4, 1.15, -0.15],  // R_SHOULDER
      [-0.45, 0.9, 0.55],  // L_ELBOW (pressing knee)
      [0.6, 0.85, -0.15],  // R_ELBOW (behind)
      [-0.45, 0.65, 0.6],  // L_HAND
      [0.6, 0.55, -0.05],  // R_HAND
      [0, 0.9, 0.1],       // SPINE
      [-0.18, 0.65, 0.15], // L_HIP
      [0.18, 0.65, 0.15],  // R_HIP
      [-0.18, 0.35, -0.65], // L_KNEE (extended)
      [0.18, 0.55, 0.35],  // R_KNEE (bent)
      [-0.18, 0.08, -1.05], // L_FOOT
      [0.18, 0.1, 0.5],    // R_FOOT
    ],
  },

  {
    id: 'navasana',
    englishName: 'Boat Pose',
    sanskritName: 'Navasana',
    emoji: '⛵',
    category: 'seated',
    series: ['rocket1'],
    difficulty: 'intermediate',
    duration: 15,
    description: 'A challenging core pose balancing on the sitting bones in a V shape.',
    benefits: ['Strengthens core and hip flexors', 'Improves balance', 'Stimulates digestive organs'],
    cues: ['Keep spine long, not rounded', 'Flex the feet', 'Breathe even when it burns'],
    joints: [
      [0, 1.6, -0.4],      // HEAD
      [0, 1.45, -0.3],     // NECK
      [-0.35, 1.25, -0.2], // L_SHOULDER
      [0.35, 1.25, -0.2],  // R_SHOULDER
      [-0.7, 1.0, -0.05],  // L_ELBOW
      [0.7, 1.0, -0.05],   // R_ELBOW
      [-1.0, 0.7, 0.2],    // L_HAND
      [1.0, 0.7, 0.2],     // R_HAND
      [0, 0.85, 0.0],      // SPINE
      [-0.2, 0.65, 0.1],   // L_HIP
      [0.2, 0.65, 0.1],    // R_HIP
      [-0.2, 0.35, 0.5],   // L_KNEE
      [0.2, 0.35, 0.5],    // R_KNEE
      [-0.2, 0.08, 0.9],   // L_FOOT
      [0.2, 0.08, 0.9],    // R_FOOT
    ],
  },

  {
    id: 'upavishtha-konasana',
    englishName: 'Wide-Angle Seated Forward Bend',
    sanskritName: 'Upavishtha Konasana',
    emoji: '🧩',
    category: 'seated',
    series: ['rocket1'],
    difficulty: 'intermediate',
    duration: 30,
    description: 'Seated with legs spread wide, folding forward between them.',
    benefits: ['Opens inner groins deeply', 'Stretches hamstrings', 'Calming for the nervous system'],
    cues: ['Walk hands forward between the legs', 'Keep the spine long', 'Let gravity do the work'],
    joints: [
      [0, 0.45, 0],        // HEAD
      [0, 0.6, 0],         // NECK
      [-0.5, 0.85, 0],     // L_SHOULDER
      [0.5, 0.85, 0],      // R_SHOULDER
      [-0.85, 0.45, 0],    // L_ELBOW
      [0.85, 0.45, 0],     // R_ELBOW
      [-1.0, 0.1, 0],      // L_HAND
      [1.0, 0.1, 0],       // R_HAND
      [0, 0.8, 0.15],      // SPINE
      [-0.55, 0.65, 0.1],  // L_HIP
      [0.55, 0.65, 0.1],   // R_HIP
      [-0.8, 0.3, 0],      // L_KNEE (wide legs)
      [0.8, 0.3, 0],       // R_KNEE
      [-1.0, 0.08, 0],     // L_FOOT
      [1.0, 0.08, 0],      // R_FOOT
    ],
  },

  {
    id: 'baddha-konasana',
    englishName: 'Bound Angle Pose',
    sanskritName: 'Baddha Konasana',
    emoji: '🦋',
    category: 'seated',
    series: ['rocket1'],
    difficulty: 'beginner',
    duration: 30,
    description: 'Butterfly pose — seated with soles of feet together, knees wide.',
    benefits: ['Opens inner groins and hips', 'Stimulates abdominal organs', 'Soothes menstrual discomfort'],
    cues: ['Sit tall on your sitting bones', 'Allow knees to release toward the floor', 'Fold forward only if the spine stays long'],
    joints: [
      [0, 1.55, 0],        // HEAD
      [0, 1.4, 0],         // NECK
      [-0.35, 1.2, 0],     // L_SHOULDER
      [0.35, 1.2, 0],      // R_SHOULDER
      [-0.55, 0.95, 0.1],  // L_ELBOW
      [0.55, 0.95, 0.1],   // R_ELBOW
      [-0.35, 0.6, 0.25],  // L_HAND
      [0.35, 0.6, 0.25],   // R_HAND
      [0, 0.9, 0],         // SPINE
      [-0.18, 0.7, 0.1],   // L_HIP
      [0.18, 0.7, 0.1],    // R_HIP
      [-0.5, 0.4, 0.3],    // L_KNEE (wide)
      [0.5, 0.4, 0.3],     // R_KNEE
      [-0.25, 0.15, 0.3],  // L_FOOT (soles together)
      [0.25, 0.15, 0.3],   // R_FOOT
    ],
  },

  {
    id: 'kurmasana',
    englishName: 'Tortoise Pose',
    sanskritName: 'Kurmasana',
    emoji: '🐢',
    category: 'seated',
    series: ['rocket1'],
    difficulty: 'advanced',
    duration: 20,
    description: 'A deep hip opener with the torso folded under spread legs.',
    benefits: ['Deep hip and groin stretch', 'Stretches the spine', 'Very calming'],
    cues: ['Slide the arms under the knees', 'Chest melts toward the floor', 'Breathe slowly and steadily'],
    joints: [
      [0, 0.12, 0.1],      // HEAD
      [0, 0.22, 0],        // NECK
      [-0.5, 0.3, 0.15],   // L_SHOULDER
      [0.5, 0.3, 0.15],    // R_SHOULDER
      [-0.75, 0.15, 0.2],  // L_ELBOW
      [0.75, 0.15, 0.2],   // R_ELBOW
      [-0.9, 0.08, 0.3],   // L_HAND
      [0.9, 0.08, 0.3],    // R_HAND
      [0, 0.45, 0.25],     // SPINE
      [-0.35, 0.5, 0.25],  // L_HIP
      [0.35, 0.5, 0.25],   // R_HIP
      [-0.45, 0.25, -0.2], // L_KNEE
      [0.45, 0.25, -0.2],  // R_KNEE
      [-0.5, 0.08, -0.5],  // L_FOOT
      [0.5, 0.08, -0.5],   // R_FOOT
    ],
  },

  // ── ROCKET II – ARM BALANCES & BACKBENDS ─────────────────────────────────

  {
    id: 'vasisthasana',
    englishName: 'Side Plank',
    sanskritName: 'Vasisthasana',
    emoji: '🏋️',
    category: 'balance',
    series: ['rocket2'],
    difficulty: 'intermediate',
    duration: 15,
    description: 'Balancing on one hand and one foot in a side-facing plank.',
    benefits: ['Strengthens arms and core', 'Improves lateral stability', 'Tones the obliques'],
    cues: ['Stack feet or stagger them', 'Press the floor away', 'Top arm reaches straight up'],
    joints: [
      [0.15, 1.5, -0.2],   // HEAD
      [0.1, 1.35, -0.15],  // NECK
      [0.1, 1.15, -0.1],   // L_SHOULDER (top)
      [0.05, 0.7, -0.15],  // R_SHOULDER (base)
      [0.05, 1.6, -0.05],  // L_ELBOW (top arm up)
      [0, 0.35, -0.4],     // R_ELBOW
      [0.05, 2.0, 0],      // L_HAND (up)
      [0, 0.08, -0.65],    // R_HAND (floor)
      [0.1, 0.9, 0.15],    // SPINE
      [0.1, 0.8, 0.25],    // L_HIP
      [0, 0.75, 0.25],     // R_HIP
      [0.05, 0.45, 0.7],   // L_KNEE
      [0, 0.4, 0.65],      // R_KNEE
      [0.05, 0.08, 1.1],   // L_FOOT
      [0, 0.08, 1.0],      // R_FOOT
    ],
  },

  {
    id: 'bakasana',
    englishName: 'Crow Pose',
    sanskritName: 'Bakasana',
    emoji: '🐦',
    category: 'balance',
    series: ['rocket2'],
    difficulty: 'intermediate',
    duration: 10,
    description: 'Arms-only balance with knees resting on the back of the upper arms.',
    benefits: ['Builds arm and wrist strength', 'Improves focus', 'Core strengthener'],
    cues: ['Gaze slightly forward', 'Round the upper back', 'Squeeze knees toward midline'],
    joints: [
      [0, 1.1, -0.5],      // HEAD
      [0, 1.0, -0.4],      // NECK
      [-0.35, 0.9, -0.25], // L_SHOULDER
      [0.35, 0.9, -0.25],  // R_SHOULDER
      [-0.3, 0.55, -0.3],  // L_ELBOW
      [0.3, 0.55, -0.3],   // R_ELBOW
      [-0.3, 0.08, -0.5],  // L_HAND
      [0.3, 0.08, -0.5],   // R_HAND
      [0, 0.9, 0.0],       // SPINE
      [-0.2, 0.8, 0.25],   // L_HIP
      [0.2, 0.8, 0.25],    // R_HIP
      [-0.35, 0.65, -0.1], // L_KNEE (on upper arm)
      [0.35, 0.65, -0.1],  // R_KNEE
      [-0.3, 0.75, 0.3],   // L_FOOT (lifted)
      [0.3, 0.75, 0.3],    // R_FOOT (lifted)
    ],
  },

  {
    id: 'astavakrasana',
    englishName: 'Eight-Angle Pose',
    sanskritName: 'Astavakrasana',
    emoji: '🔀',
    category: 'balance',
    series: ['rocket2'],
    difficulty: 'advanced',
    duration: 10,
    description: 'An arm balance with both legs wrapped around one arm — a Rocket II signature.',
    benefits: ['Extreme arm and core strength', 'Improves concentration', 'Wrist and shoulder strengthener'],
    cues: ['Hook the top leg over the arm first', 'Squeeze legs together tightly', 'Lean torso forward'],
    joints: [
      [0.3, 1.15, -0.3],   // HEAD
      [0.2, 1.05, -0.25],  // NECK
      [-0.2, 0.85, -0.15], // L_SHOULDER
      [0.5, 0.85, -0.2],   // R_SHOULDER
      [-0.35, 0.45, -0.15], // L_ELBOW
      [0.5, 0.45, -0.2],   // R_ELBOW
      [-0.4, 0.08, -0.35], // L_HAND
      [0.5, 0.08, -0.3],   // R_HAND
      [0.1, 0.75, 0.15],   // SPINE
      [-0.15, 0.6, 0.3],   // L_HIP
      [0.3, 0.6, 0.25],    // R_HIP
      [0.6, 0.55, 0.0],    // L_KNEE (legs extended sideways)
      [0.9, 0.5, 0.0],     // R_KNEE
      [1.2, 0.45, -0.1],   // L_FOOT
      [1.4, 0.4, -0.15],   // R_FOOT
    ],
  },

  {
    id: 'pincha-mayurasana',
    englishName: 'Forearm Balance',
    sanskritName: 'Pincha Mayurasana',
    emoji: '🦚',
    category: 'inverted',
    series: ['rocket2', 'rocket3'],
    difficulty: 'advanced',
    duration: 10,
    description: 'Balancing on forearms with the body fully inverted — the peacock feather pose.',
    benefits: ['Strengthens shoulders and core', 'Calms the mind through inversion', 'Builds proprioception'],
    cues: ['Forearms shoulder-width apart', 'Press down through inner wrists', 'Engage core to stay tall'],
    joints: [
      [0, 0.25, -0.2],     // HEAD
      [0, 0.4, -0.1],      // NECK
      [-0.3, 0.65, 0],     // L_SHOULDER
      [0.3, 0.65, 0],      // R_SHOULDER
      [-0.3, 0.08, -0.35], // L_ELBOW
      [0.3, 0.08, -0.35],  // R_ELBOW
      [-0.3, 0.08, -0.7],  // L_HAND
      [0.3, 0.08, -0.7],   // R_HAND
      [0, 1.1, 0],         // SPINE
      [-0.18, 1.6, 0],     // L_HIP
      [0.18, 1.6, 0],      // R_HIP
      [-0.18, 2.0, 0],     // L_KNEE
      [0.18, 2.0, 0],      // R_KNEE
      [-0.18, 2.4, 0],     // L_FOOT
      [0.18, 2.4, 0],      // R_FOOT
    ],
  },

  {
    id: 'adho-mukha-vrksasana',
    englishName: 'Handstand',
    sanskritName: 'Adho Mukha Vrksasana',
    emoji: '🤸',
    category: 'inverted',
    series: ['rocket2', 'rocket3'],
    difficulty: 'advanced',
    duration: 10,
    description: 'Full handstand — the pinnacle of arm strength and body awareness.',
    benefits: ['Builds arm strength', 'Improves balance', 'Energizing and empowering'],
    cues: ['Stack hips over shoulders over wrists', 'Engage the core and glutes', 'Breathe freely'],
    joints: [
      [0, 0.2, 0],         // HEAD
      [0, 0.35, 0],        // NECK
      [-0.35, 0.55, 0],    // L_SHOULDER
      [0.35, 0.55, 0],     // R_SHOULDER
      [-0.35, 0.3, 0],     // L_ELBOW (straight)
      [0.35, 0.3, 0],      // R_ELBOW
      [-0.35, 0.08, 0],    // L_HAND
      [0.35, 0.08, 0],     // R_HAND
      [0, 1.1, 0],         // SPINE
      [-0.18, 1.65, 0],    // L_HIP
      [0.18, 1.65, 0],     // R_HIP
      [-0.18, 2.05, 0],    // L_KNEE
      [0.18, 2.05, 0],     // R_KNEE
      [-0.18, 2.45, 0],    // L_FOOT
      [0.18, 2.45, 0],     // R_FOOT
    ],
  },

  {
    id: 'salabhasana',
    englishName: 'Locust Pose',
    sanskritName: 'Salabhasana',
    emoji: '🦗',
    category: 'prone',
    series: ['rocket2'],
    difficulty: 'beginner',
    duration: 15,
    description: 'On the belly, lifting chest and legs — a foundational backbend.',
    benefits: ['Strengthens the entire back body', 'Improves posture', 'Stimulates the digestive organs'],
    cues: ['Reach legs back and up', 'Lift chest away from the floor', 'Arms alongside the body or extended'],
    joints: [
      [0, 0.75, -0.3],     // HEAD
      [0, 0.6, -0.1],      // NECK
      [-0.4, 0.5, 0.0],    // L_SHOULDER
      [0.4, 0.5, 0.0],     // R_SHOULDER
      [-0.65, 0.25, 0.25], // L_ELBOW
      [0.65, 0.25, 0.25],  // R_ELBOW
      [-0.7, 0.08, 0.5],   // L_HAND
      [0.7, 0.08, 0.5],    // R_HAND
      [0, 0.35, 0.2],      // SPINE
      [-0.18, 0.1, 0.35],  // L_HIP
      [0.18, 0.1, 0.35],   // R_HIP
      [-0.18, 0.35, 0.65], // L_KNEE (lifted)
      [0.18, 0.35, 0.65],  // R_KNEE
      [-0.18, 0.55, 0.9],  // L_FOOT
      [0.18, 0.55, 0.9],   // R_FOOT
    ],
  },

  {
    id: 'dhanurasana',
    englishName: 'Bow Pose',
    sanskritName: 'Dhanurasana',
    emoji: '🏹',
    category: 'prone',
    series: ['rocket2'],
    difficulty: 'intermediate',
    duration: 15,
    description: 'On the belly, hands hold the ankles as the body arches into a bow shape.',
    benefits: ['Opens the chest and hip flexors', 'Strengthens the back', 'Energizing backbend'],
    cues: ['Kick feet up and back into hands', 'Keep thighs hip-width', 'Breathe into the chest'],
    joints: [
      [0, 1.1, -0.3],      // HEAD
      [0, 0.9, -0.1],      // NECK
      [-0.4, 0.7, 0.05],   // L_SHOULDER
      [0.4, 0.7, 0.05],    // R_SHOULDER
      [-0.5, 0.45, 0.4],   // L_ELBOW
      [0.5, 0.45, 0.4],    // R_ELBOW
      [-0.35, 0.35, 0.85], // L_HAND (holding ankles)
      [0.35, 0.35, 0.85],  // R_HAND
      [0, 0.6, 0.2],       // SPINE
      [-0.18, 0.15, 0.35], // L_HIP
      [0.18, 0.15, 0.35],  // R_HIP
      [-0.18, 0.5, 0.7],   // L_KNEE
      [0.18, 0.5, 0.7],    // R_KNEE
      [-0.18, 0.85, 0.5],  // L_FOOT (up)
      [0.18, 0.85, 0.5],   // R_FOOT
    ],
  },

  {
    id: 'ustrasana',
    englishName: 'Camel Pose',
    sanskritName: 'Ustrasana',
    emoji: '🐪',
    category: 'supine',
    series: ['rocket2'],
    difficulty: 'intermediate',
    duration: 20,
    description: 'Kneeling backbend with hands on heels — a heart-opening Rocket II pose.',
    benefits: ['Deep chest and hip-flexor opener', 'Strengthens the back', 'Energizing'],
    cues: ['Push hips forward over knees', 'Lengthen spine before arching', 'Hands on heels or blocks'],
    joints: [
      [0, 1.4, 0.5],       // HEAD
      [0, 1.55, 0.35],     // NECK
      [-0.4, 1.65, 0.1],   // L_SHOULDER
      [0.4, 1.65, 0.1],    // R_SHOULDER
      [-0.4, 1.2, 0.45],   // L_ELBOW
      [0.4, 1.2, 0.45],    // R_ELBOW
      [-0.3, 0.6, 0.55],   // L_HAND (on heels)
      [0.3, 0.6, 0.55],    // R_HAND
      [0, 1.55, 0.2],      // SPINE
      [-0.18, 1.0, 0.2],   // L_HIP
      [0.18, 1.0, 0.2],    // R_HIP
      [-0.18, 0.08, 0.1],  // L_KNEE (on floor)
      [0.18, 0.08, 0.1],   // R_KNEE
      [-0.18, 0.08, 0.45], // L_FOOT (instep on floor)
      [0.18, 0.08, 0.45],  // R_FOOT
    ],
  },

  {
    id: 'setu-bandha',
    englishName: 'Bridge Pose',
    sanskritName: 'Setu Bandha Sarvangasana',
    emoji: '🌁',
    category: 'supine',
    series: ['rocket2'],
    difficulty: 'beginner',
    duration: 20,
    description: 'On the back with hips lifted — a gentle preparatory backbend.',
    benefits: ['Opens the chest and hip flexors', 'Strengthens the glutes', 'Calming'],
    cues: ['Press feet firmly into the floor', 'Clasp hands beneath the hips', 'Lift hips high'],
    joints: [
      [0, 0.1, -0.5],      // HEAD
      [0, 0.1, -0.3],      // NECK
      [-0.4, 0.1, -0.1],   // L_SHOULDER
      [0.4, 0.1, -0.1],    // R_SHOULDER
      [-0.5, 0.1, 0.2],    // L_ELBOW
      [0.5, 0.1, 0.2],     // R_ELBOW
      [-0.5, 0.1, 0.5],    // L_HAND (clasped)
      [0.5, 0.1, 0.5],     // R_HAND
      [0, 0.85, 0.0],      // SPINE
      [-0.18, 0.9, 0.15],  // L_HIP
      [0.18, 0.9, 0.15],   // R_HIP
      [-0.18, 0.55, 0.5],  // L_KNEE (bent)
      [0.18, 0.55, 0.5],   // R_KNEE
      [-0.18, 0.08, 0.85], // L_FOOT
      [0.18, 0.08, 0.85],  // R_FOOT
    ],
  },

  {
    id: 'urdhva-dhanurasana',
    englishName: 'Wheel Pose',
    sanskritName: 'Urdhva Dhanurasana',
    emoji: '🌈',
    category: 'supine',
    series: ['rocket2', 'rocket3'],
    difficulty: 'advanced',
    duration: 10,
    description: 'Full backbend — a wheel or upward bow — the peak of the Rocket backbending series.',
    benefits: ['Strengthens arms, legs, spine', 'Opens the chest fully', 'Energizing and invigorating'],
    cues: ['Press evenly through all four limbs', 'Spin the inner thighs toward each other', 'Breathe into the chest'],
    joints: [
      [0, 0.75, 0.3],      // HEAD
      [0, 0.9, 0.1],       // NECK
      [-0.4, 1.2, -0.3],   // L_SHOULDER
      [0.4, 1.2, -0.3],    // R_SHOULDER
      [-0.4, 0.65, -0.7],  // L_ELBOW
      [0.4, 0.65, -0.7],   // R_ELBOW
      [-0.35, 0.08, -0.85], // L_HAND
      [0.35, 0.08, -0.85], // R_HAND
      [0, 1.6, 0],         // SPINE (arched high)
      [-0.2, 1.1, 0.5],    // L_HIP
      [0.2, 1.1, 0.5],     // R_HIP
      [-0.2, 0.55, 0.7],   // L_KNEE
      [0.2, 0.55, 0.7],    // R_KNEE
      [-0.2, 0.08, 0.65],  // L_FOOT
      [0.2, 0.08, 0.65],   // R_FOOT
    ],
  },

  // ── ROCKET III – INVERSIONS & FINISHING ──────────────────────────────────

  {
    id: 'sirsasana',
    englishName: 'Headstand',
    sanskritName: 'Sirsasana',
    emoji: '🎯',
    category: 'inverted',
    series: ['rocket3'],
    difficulty: 'advanced',
    duration: 60,
    description: 'The king of asanas — balancing on the crown of the head, fully inverted.',
    benefits: ['Increases blood flow to brain', 'Builds shoulder and core strength', 'Deeply calming'],
    cues: ['Head in the center of the hands', 'Press down through forearms', 'Engage core to lift'],
    joints: [
      [0, 0.1, 0],         // HEAD (on floor)
      [0, 0.28, 0],        // NECK
      [-0.35, 0.48, -0.05], // L_SHOULDER
      [0.35, 0.48, -0.05], // R_SHOULDER
      [-0.45, 0.1, -0.3],  // L_ELBOW
      [0.45, 0.1, -0.3],   // R_ELBOW
      [-0.35, 0.1, -0.55], // L_HAND
      [0.35, 0.1, -0.55],  // R_HAND
      [0, 1.15, 0],        // SPINE
      [-0.18, 1.65, 0],    // L_HIP
      [0.18, 1.65, 0],     // R_HIP
      [-0.18, 2.05, 0],    // L_KNEE
      [0.18, 2.05, 0],     // R_KNEE
      [-0.18, 2.45, 0],    // L_FOOT
      [0.18, 2.45, 0],     // R_FOOT
    ],
  },

  {
    id: 'salamba-sarvangasana',
    englishName: 'Shoulderstand',
    sanskritName: 'Salamba Sarvangasana',
    emoji: '🕯️',
    category: 'inverted',
    series: ['rocket3'],
    difficulty: 'intermediate',
    duration: 60,
    description: 'The queen of asanas — an inversion that reverses the effects of gravity.',
    benefits: ['Stimulates thyroid', 'Improves venous return', 'Calms the nervous system'],
    cues: ['Stack ankles over hips over shoulders', 'Support the back with both hands', 'Gaze toward your toes'],
    joints: [
      [0, 0.15, 0],        // HEAD
      [0, 0.3, 0],         // NECK
      [-0.35, 0.4, 0],     // L_SHOULDER
      [0.35, 0.4, 0],      // R_SHOULDER
      [-0.5, 0.9, 0],      // L_ELBOW
      [0.5, 0.9, 0],       // R_ELBOW
      [-0.45, 1.3, 0],     // L_HAND
      [0.45, 1.3, 0],      // R_HAND
      [0, 1.1, 0],         // SPINE
      [-0.18, 1.6, 0],     // L_HIP
      [0.18, 1.6, 0],      // R_HIP
      [-0.18, 2.0, 0],     // L_KNEE
      [0.18, 2.0, 0],      // R_KNEE
      [-0.18, 2.4, 0],     // L_FOOT
      [0.18, 2.4, 0],      // R_FOOT
    ],
  },

  {
    id: 'halasana',
    englishName: 'Plow Pose',
    sanskritName: 'Halasana',
    emoji: '🌾',
    category: 'inverted',
    series: ['rocket3'],
    difficulty: 'intermediate',
    duration: 30,
    description: 'From shoulderstand, legs lower over the head with toes touching the floor.',
    benefits: ['Deep cervical stretch', 'Calms the nervous system', 'Stimulates thyroid'],
    cues: ['Interlace hands on the floor', 'Keep legs straight', 'Breathe slowly into the back'],
    joints: [
      [0, 0.1, -0.4],      // HEAD
      [0, 0.1, -0.2],      // NECK
      [-0.35, 0.1, 0.0],   // L_SHOULDER
      [0.35, 0.1, 0.0],    // R_SHOULDER
      [-0.45, 0.1, 0.3],   // L_ELBOW
      [0.45, 0.1, 0.3],    // R_ELBOW
      [-0.45, 0.1, 0.55],  // L_HAND (clasped)
      [0.45, 0.1, 0.55],   // R_HAND
      [0, 0.8, 0.1],       // SPINE
      [-0.18, 1.4, 0.1],   // L_HIP
      [0.18, 1.4, 0.1],    // R_HIP
      [-0.18, 1.35, -0.25], // L_KNEE (over head)
      [0.18, 1.35, -0.25], // R_KNEE
      [-0.18, 0.1, -0.8],  // L_FOOT (on floor behind)
      [0.18, 0.1, -0.8],   // R_FOOT
    ],
  },

  {
    id: 'karnapidasana',
    englishName: 'Ear Pressure Pose',
    sanskritName: 'Karnapidasana',
    emoji: '👂',
    category: 'inverted',
    series: ['rocket3'],
    difficulty: 'intermediate',
    duration: 20,
    description: 'From plow, knees bend beside the ears — the deepest cervical stretch.',
    benefits: ['Relieves tinnitus', 'Deeply calming', 'Intense neck and shoulder release'],
    cues: ['Lower knees gently beside ears', 'Arms extend on the floor', 'Breathe slowly'],
    joints: [
      [0, 0.1, -0.3],      // HEAD
      [0, 0.1, -0.15],     // NECK
      [-0.35, 0.1, 0.0],   // L_SHOULDER
      [0.35, 0.1, 0.0],    // R_SHOULDER
      [-0.4, 0.1, 0.35],   // L_ELBOW
      [0.4, 0.1, 0.35],    // R_ELBOW
      [-0.4, 0.1, 0.6],    // L_HAND
      [0.4, 0.1, 0.6],     // R_HAND
      [0, 0.75, 0.1],      // SPINE
      [-0.18, 1.35, 0.1],  // L_HIP
      [0.18, 1.35, 0.1],   // R_HIP
      [-0.35, 0.1, -0.35], // L_KNEE (beside ear)
      [0.35, 0.1, -0.35],  // R_KNEE
      [-0.2, 0.35, -0.5],  // L_FOOT
      [0.2, 0.35, -0.5],   // R_FOOT
    ],
  },

  {
    id: 'padmasana',
    englishName: 'Lotus Pose',
    sanskritName: 'Padmasana',
    emoji: '🪷',
    category: 'seated',
    series: ['rocket3'],
    difficulty: 'advanced',
    duration: 60,
    description: 'Cross-legged with each foot on the opposite thigh — the classic meditation seat.',
    benefits: ['Opens the hips deeply', 'Stabilizes the mind', 'Classical pranayama and meditation pose'],
    cues: ['Place each foot high on the opposite thigh', 'Keep spine tall', 'Rest hands on knees'],
    joints: [
      [0, 1.55, 0],        // HEAD
      [0, 1.4, 0],         // NECK
      [-0.35, 1.2, 0],     // L_SHOULDER
      [0.35, 1.2, 0],      // R_SHOULDER
      [-0.5, 0.95, 0.1],   // L_ELBOW
      [0.5, 0.95, 0.1],    // R_ELBOW
      [-0.45, 0.65, 0.25], // L_HAND
      [0.45, 0.65, 0.25],  // R_HAND
      [0, 0.9, 0],         // SPINE
      [-0.25, 0.65, 0.15], // L_HIP
      [0.25, 0.65, 0.15],  // R_HIP
      [-0.55, 0.5, 0.35],  // L_KNEE
      [0.55, 0.5, 0.35],   // R_KNEE
      [0.4, 0.55, 0.25],   // L_FOOT (on right thigh)
      [-0.4, 0.55, 0.25],  // R_FOOT (on left thigh)
    ],
  },

  {
    id: 'balasana',
    englishName: "Child's Pose",
    sanskritName: 'Balasana',
    emoji: '🌑',
    category: 'prone',
    series: ['rocket1', 'rocket2', 'rocket3'],
    difficulty: 'beginner',
    duration: 30,
    description: 'A resting pose that gently stretches the hips, thighs and back.',
    benefits: ['Releases tension in back and shoulders', 'Calms the mind', 'Gentle hip opener'],
    cues: ['Sink hips toward heels', 'Extend arms forward', 'Every exhale, melt a little deeper'],
    joints: [
      [0, 0.12, -0.5],     // HEAD
      [0, 0.22, -0.3],     // NECK
      [-0.35, 0.35, -0.1], // L_SHOULDER
      [0.35, 0.35, -0.1],  // R_SHOULDER
      [-0.5, 0.2, -0.7],   // L_ELBOW
      [0.5, 0.2, -0.7],    // R_ELBOW
      [-0.5, 0.08, -1.1],  // L_HAND
      [0.5, 0.08, -1.1],   // R_HAND
      [0, 0.55, 0.25],     // SPINE
      [-0.2, 0.55, 0.45],  // L_HIP
      [0.2, 0.55, 0.45],   // R_HIP
      [-0.2, 0.3, 0.65],   // L_KNEE
      [0.2, 0.3, 0.65],    // R_KNEE
      [-0.2, 0.1, 0.9],    // L_FOOT
      [0.2, 0.1, 0.9],     // R_FOOT
    ],
  },

  {
    id: 'savasana',
    englishName: 'Corpse Pose',
    sanskritName: 'Savasana',
    emoji: '😴',
    category: 'supine',
    series: ['rocket1', 'rocket2', 'rocket3'],
    difficulty: 'beginner',
    duration: 300,
    description: 'Final relaxation — the most important pose. Let the practice integrate.',
    benefits: ['Deep nervous system reset', 'Integrates the practice', 'Reduces stress hormones'],
    cues: ['Let every muscle soften completely', 'Nothing to do, nowhere to go', 'Simply receive'],
    joints: [
      [0, 0.1, -1.1],      // HEAD
      [0, 0.1, -0.85],     // NECK
      [-0.45, 0.1, -0.55], // L_SHOULDER
      [0.45, 0.1, -0.55],  // R_SHOULDER
      [-0.65, 0.1, -0.2],  // L_ELBOW
      [0.65, 0.1, -0.2],   // R_ELBOW
      [-0.75, 0.1, 0.2],   // L_HAND
      [0.75, 0.1, 0.2],    // R_HAND
      [0, 0.1, 0],         // SPINE
      [-0.2, 0.1, 0.3],    // L_HIP
      [0.2, 0.1, 0.3],     // R_HIP
      [-0.2, 0.1, 0.7],    // L_KNEE
      [0.2, 0.1, 0.7],     // R_KNEE
      [-0.2, 0.1, 1.1],    // L_FOOT
      [0.2, 0.1, 1.1],     // R_FOOT
    ],
  },
]

export const CATEGORIES = ['all', 'standing', 'balance', 'seated', 'inverted', 'supine', 'prone']

export const SERIES     = ['all', 'surya', 'rocket1', 'rocket2', 'rocket3']
export const SERIES_LABELS = {
  all:     'All',
  surya:   'Surya A/B',
  rocket1: 'Rocket I',
  rocket2: 'Rocket II',
  rocket3: 'Rocket III',
}
export const SERIES_COLORS = {
  surya:   'bg-amber-900/60 text-amber-300 border-amber-700',
  rocket1: 'bg-emerald-900/60 text-emerald-300 border-emerald-700',
  rocket2: 'bg-blue-900/60 text-blue-300 border-blue-700',
  rocket3: 'bg-purple-900/60 text-purple-300 border-purple-700',
}
