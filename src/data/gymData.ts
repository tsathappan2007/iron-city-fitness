export interface Offer {
  id: string;
  title: string;
  description: string;
  code: string;
  badge: string;
  endsInDays?: number;
}

export interface Membership {
  id: string;
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  features: string[];
  isPopular: boolean;
  badge?: string;
  target: string;
}

export interface Trainer {
  id: string;
  name: string;
  nickname?: string;
  specialty: string;
  bio: string;
  experience: string;
  certifications: string[];
  quote: string;
  image: string;
}

export interface GymClass {
  id: string;
  name: string;
  trainer: string;
  day: string; // 'Monday', 'Tuesday', etc.
  time: string; // e.g., '07:00 AM'
  shift: 'Morning' | 'Afternoon' | 'Evening';
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  room: string;
  spotsLeft: number;
  totalSpots: number;
}

export interface FacilityZone {
  id: string;
  name: string;
  tagline: string;
  description: string;
  premiumEquipment: string[];
  image: string;
}

export const GYM_INFO = {
  name: "Iron City Fitness",
  tagline: "FORGE YOUR LEGACY. CRUSH YOUR GOALS.",
  description: "Where grit meets iron. Welcome to the city's premier 24/7 fitness arena, engineered for those who refuse to settle. Equipped with elite competition-grade gear, coached by world-class trainers, and backed by an unbreakable community.",
  workingHours: {
    weekdays: { days: "Monday - Friday", hours: "5:00 AM - 11:00 PM" },
    saturdays: { days: "Saturdays", hours: "6:00 AM - 9:00 PM" },
    sundays: { days: "Sundays", hours: "7:00 AM - 8:00 PM" },
    vipNote: "Platinum Elite members enjoy 24/7/365 keycard access."
  },
  capacity: {
    current: 42,
    max: 120,
    status: "Optimal Lifting Conditions"
  }
};

export const OFFERS: Offer[] = [
  {
    id: "offer-1",
    title: "SUMMER SHRED SPECIAL",
    description: "Get 20% off all annual memberships + zero sign-up fees. Kickstart your transformation today!",
    code: "SHRED20",
    badge: "Limited Time",
    endsInDays: 2
  },
  {
    id: "offer-2",
    title: "BRING A FITNESS BUDDY",
    description: "Refer a friend to Iron City Fitness. When they join, you get 1 month of premium access completely free!",
    code: "FITBUDDY",
    badge: "Member Perk"
  },
  {
    id: "offer-3",
    title: "ELITE ASSESSMENT TRIAL",
    description: "Book a tour today and receive a complimentary 30-minute fitness assessment and 3D body composition scan.",
    code: "EVOLVE30",
    badge: "New Joiner"
  }
];

export const MEMBERSHIPS: Membership[] = [
  {
    id: "steel-access",
    name: "Steel Access",
    monthlyPrice: 1999,
    annualPrice: 1499,
    description: "Essential 24/7 access to our world-class strength floor and cardio arena.",
    features: [
      "24/7 Electronic Keycard Access",
      "Full access to Strength Floor & Cardio Arena",
      "Complimentary locker and shower usage",
      "1x Elite Coach fitness consultation",
      "Free high-speed member Wi-Fi"
    ],
    isPopular: false,
    target: "Best for independent lifters who want high-quality iron and 24/7 flexibility."
  },
  {
    id: "iron-core",
    name: "Iron Core",
    monthlyPrice: 3999,
    annualPrice: 2999,
    description: "Our most popular tier, combining heavy training, group classes, and recovery.",
    features: [
      "Everything in Steel Access",
      "Unlimited group fitness & HIIT classes",
      "Daily Sauna & Eucalyptus Steam Room access",
      "10% discount on supplements & apparel",
      "2x complimentary guest passes per month",
      "Access to member-only seminars & events"
    ],
    isPopular: true,
    badge: "Most Popular",
    target: "Perfect for active lifters seeking group energy, specialized classes, and steam recovery."
  },
  {
    id: "platinum-elite",
    name: "Platinum Elite",
    monthlyPrice: 9999,
    annualPrice: 7999,
    description: "The ultimate VIP athletic package. Elite training, custom nutrition, and luxury recovery.",
    features: [
      "Everything in Iron Core",
      "4x 1-on-1 private training sessions per month",
      "Custom nutrition and macro-planning protocol",
      "Unlimited Recovery Spa access (Massage chairs & Cold Plunges)",
      "Daily premium towel service",
      "1x complimentary post-workout protein shake per day",
      "Priority booking for all studio classes"
    ],
    isPopular: false,
    target: "Designed for goal-oriented individuals seeking premium guidance, maximum accountability, and complete recovery."
  }
];

export const TRAINERS: Trainer[] = [
  {
    id: "trainer-marcus",
    name: "Marcus Vance",
    nickname: "The Titan",
    specialty: "Strength & Powerlifting",
    bio: "Marcus is a competitive powerlifter with over 8 years of coaching experience. He specializes in barbell mechanics, structural strength, and developing an ironclad competitive mindset.",
    experience: "8+ Years",
    certifications: [
      "CSCS (Certified Strength & Conditioning Specialist)",
      "USAPL Level 1 Coach (USA Powerlifting)",
      "B.S. in Exercise Science"
    ],
    quote: "Strength isn't just about moving weight; it's about building an unbreakable mind.",
    image: "/trainer_marcus.png"
  },
  {
    id: "trainer-sarah",
    name: "Sarah Jenkins",
    specialty: "Functional Fitness & HIIT",
    bio: "Sarah is a former collegiate athlete who brings athletic intensity to every class. Her high-octane HIIT and functional strength templates are designed to torch fat and build athletic endurance.",
    experience: "6+ Years",
    certifications: [
      "NASM-PES (Performance Enhancement Specialist)",
      "CrossFit Level 2 Coach",
      "FMS Level 1 (Functional Movement Screen)"
    ],
    quote: "Motion is medicine. Challenge your limits today so they become your warm-ups tomorrow.",
    image: "/trainer_sarah.png"
  },
  {
    id: "trainer-alex",
    name: "Alex Rivera",
    specialty: "Body Recomposition & Nutrition",
    bio: "Alex blends exercise science with practical nutrition to help clients sculpt their dream physiques. He focuses on sustainable fat loss, muscle hypertrophy, and lifestyle habit formation.",
    experience: "10+ Years",
    certifications: [
      "ISSA Master Personal Trainer",
      "Precision Nutrition Level 1 (PN1)",
      "NASM Certified Nutrition Coach (CNC)"
    ],
    quote: "Fitness is a science. With precise programming and solid nutrition, your results are inevitable.",
    image: "/trainer_alex.png"
  },
  {
    id: "trainer-elena",
    name: "Elena Rostova",
    specialty: "Mobility, Yoga & Core Recovery",
    bio: "Elena helps heavy lifters and high-intensity athletes stay injury-free. She teaches joint longevity, active mobility, core stabilization, and nervous system down-regulation.",
    experience: "5+ Years",
    certifications: [
      "RYT-500 Yoga Alliance Certified Teacher",
      "FRCms (Functional Range Conditioning Specialist)",
      "NASM Corrective Exercise Specialist (CES)"
    ],
    quote: "True power requires balance. To lift heavy and run fast, you must first master your mobility.",
    image: "/trainer_elena.png"
  }
];

export const FACILITY_ZONES: FacilityZone[] = [
  {
    id: "zone-strength",
    name: "The Iron Dungeon",
    tagline: "Heavy Metal Strength Floor",
    description: "The beating heart of Iron City. A heavy-duty lifting arena engineered for serious powerlifters, Olympic weightlifters, and bodybuilders. Designed with high-impact rubber flooring and professional lighting.",
    premiumEquipment: [
      "6x Eleiko Olympic Competition Power Racks & Platforms",
      "Over 3,000 lbs of calibrated steel & bumper plates",
      "Custom urethane dumbbells ranging from 5 lbs to 150 lbs",
      "Hammer Strength plate-loaded machines (Chest Press, V-Squat, Iso-Row)",
      "Specialty bars (Kabuki strength bars, safety squat bars, trap bars)"
    ],
    image: "/facility_strength.png"
  },
  {
    id: "zone-cardio",
    name: "The Cardio Arena",
    tagline: "High-Tech Conditioning Deck",
    description: "A premium cardio suite configured with advanced interactive consoles and panoramic glass views. Programmed with performance tracking so you can monitor your aerobic and anaerobic progression.",
    premiumEquipment: [
      "Matrix premium touchscreen treadmills with virtual run courses",
      "Concept2 Rowers, SkiErgs, and BikeErgs",
      "Woodway Curve motorless self-powered treadmills",
      "StairMaster Gauntlets with customizable fat-burning programs",
      "Assault Fitness AirBikes for high-intensity sprint training"
    ],
    image: "/facility_cardio.png"
  },
  {
    id: "zone-crossfit",
    name: "The CrossFit Box",
    tagline: "Functional Fitness Playground",
    description: "A massive, open-concept functional training room. Perfect for high-intensity metabolic conditioning, gymnastics work, and group team-training sessions.",
    premiumEquipment: [
      "Custom 30-foot Rogue Fitness rig with multiple pull-up stations",
      "Competition kettlebells (12kg to 48kg) and wall balls",
      "20-foot heavy climbing ropes and gymnastics rings",
      "Soft-sided plyometric jump boxes",
      "Gymnastics mats, sleds, and heavy turf pushing lanes"
    ],
    image: "/facility_crossfit.png"
  },
  {
    id: "zone-recovery",
    name: "Recovery & Wellness Spa",
    tagline: "Muscle Reconstruction & Relaxation",
    description: "Maximize your athletic longevity. Our recovery suite is designed to reduce muscle soreness, down-regulate the nervous system, and accelerate healing between intense lifting sessions.",
    premiumEquipment: [
      "Custom cedar-wood dry Finnish sauna (heats to 195°F)",
      "Aromatherapy eucalyptus steam room",
      "Dual commercial-grade cold plunge tubs (chilled to a steady 42°F)",
      "Theragun compression zone equipped with massage guns & leg sleeves",
      "Zero-gravity luxury recovery chairs"
    ],
    image: "/facility_recovery.png"
  }
];

export const TIMETABLE: GymClass[] = [
  // Monday
  {
    id: "c-1",
    name: "Barbell Mechanics",
    trainer: "Marcus Vance",
    day: "Monday",
    time: "06:30 AM",
    shift: "Morning",
    duration: "60 mins",
    difficulty: "Intermediate",
    room: "The Iron Dungeon",
    spotsLeft: 3,
    totalSpots: 12
  },
  {
    id: "c-2",
    name: "Iron Shred HIIT",
    trainer: "Sarah Jenkins",
    day: "Monday",
    time: "08:00 AM",
    shift: "Morning",
    duration: "45 mins",
    difficulty: "Advanced",
    room: "The CrossFit Box",
    spotsLeft: 8,
    totalSpots: 20
  },
  {
    id: "c-3",
    name: "Mobility for Lifters",
    trainer: "Elena Rostova",
    day: "Monday",
    time: "12:30 PM",
    shift: "Afternoon",
    duration: "50 mins",
    difficulty: "Beginner",
    room: "The CrossFit Box",
    spotsLeft: 14,
    totalSpots: 15
  },
  {
    id: "c-4",
    name: "Hypertrophy Blueprint",
    trainer: "Alex Rivera",
    day: "Monday",
    time: "06:00 PM",
    shift: "Evening",
    duration: "60 mins",
    difficulty: "Intermediate",
    room: "The Iron Dungeon",
    spotsLeft: 1,
    totalSpots: 15
  },
  {
    id: "c-5",
    name: "MetCon Fire",
    trainer: "Sarah Jenkins",
    day: "Monday",
    time: "07:15 PM",
    shift: "Evening",
    duration: "45 mins",
    difficulty: "Advanced",
    room: "The CrossFit Box",
    spotsLeft: 0,
    totalSpots: 18
  },

  // Tuesday
  {
    id: "c-6",
    name: "Powerlifting Foundations",
    trainer: "Marcus Vance",
    day: "Tuesday",
    time: "07:00 AM",
    shift: "Morning",
    duration: "75 mins",
    difficulty: "Intermediate",
    room: "The Iron Dungeon",
    spotsLeft: 5,
    totalSpots: 10
  },
  {
    id: "c-7",
    name: "Vinyasa Flow & Core",
    trainer: "Elena Rostova",
    day: "Tuesday",
    time: "09:00 AM",
    shift: "Morning",
    duration: "60 mins",
    difficulty: "Beginner",
    room: "The CrossFit Box",
    spotsLeft: 12,
    totalSpots: 25
  },
  {
    id: "c-8",
    name: "Lean Muscle Strategy",
    trainer: "Alex Rivera",
    day: "Tuesday",
    time: "05:30 PM",
    shift: "Evening",
    duration: "60 mins",
    difficulty: "Beginner",
    room: "The Iron Dungeon",
    spotsLeft: 7,
    totalSpots: 15
  },
  {
    id: "c-9",
    name: "CrossFit WOD",
    trainer: "Sarah Jenkins",
    day: "Tuesday",
    time: "06:45 PM",
    shift: "Evening",
    duration: "60 mins",
    difficulty: "Advanced",
    room: "The CrossFit Box",
    spotsLeft: 4,
    totalSpots: 16
  },

  // Wednesday
  {
    id: "c-10",
    name: "Heavy Squat Clinic",
    trainer: "Marcus Vance",
    day: "Wednesday",
    time: "06:30 AM",
    shift: "Morning",
    duration: "60 mins",
    difficulty: "Advanced",
    room: "The Iron Dungeon",
    spotsLeft: 2,
    totalSpots: 8
  },
  {
    id: "c-11",
    name: "Cardio Engine HIIT",
    trainer: "Sarah Jenkins",
    day: "Wednesday",
    time: "12:00 PM",
    shift: "Afternoon",
    duration: "45 mins",
    difficulty: "Intermediate",
    room: "The Cardio Arena",
    spotsLeft: 9,
    totalSpots: 20
  },
  {
    id: "c-12",
    name: "Spinal Decompression",
    trainer: "Elena Rostova",
    day: "Wednesday",
    time: "06:00 PM",
    shift: "Evening",
    duration: "65 mins",
    difficulty: "Beginner",
    room: "The CrossFit Box",
    spotsLeft: 11,
    totalSpots: 20
  },
  {
    id: "c-13",
    name: "Glute & Posterior Chain",
    trainer: "Alex Rivera",
    day: "Wednesday",
    time: "07:15 PM",
    shift: "Evening",
    duration: "60 mins",
    difficulty: "Intermediate",
    room: "The Iron Dungeon",
    spotsLeft: 3,
    totalSpots: 15
  },

  // Thursday
  {
    id: "c-14",
    name: "Deadlift Mechanics",
    trainer: "Marcus Vance",
    day: "Thursday",
    time: "07:00 AM",
    shift: "Morning",
    duration: "60 mins",
    difficulty: "Intermediate",
    room: "The Iron Dungeon",
    spotsLeft: 4,
    totalSpots: 10
  },
  {
    id: "c-15",
    name: "Joint Longevity",
    trainer: "Elena Rostova",
    day: "Thursday",
    time: "09:30 AM",
    shift: "Morning",
    duration: "60 mins",
    difficulty: "Beginner",
    room: "The CrossFit Box",
    spotsLeft: 15,
    totalSpots: 18
  },
  {
    id: "c-16",
    name: "Full Body Recomp",
    trainer: "Alex Rivera",
    day: "Thursday",
    time: "06:00 PM",
    shift: "Evening",
    duration: "60 mins",
    difficulty: "Intermediate",
    room: "The Iron Dungeon",
    spotsLeft: 6,
    totalSpots: 15
  },
  {
    id: "c-17",
    name: "Engine Conditioning",
    trainer: "Sarah Jenkins",
    day: "Thursday",
    time: "07:15 PM",
    shift: "Evening",
    duration: "50 mins",
    difficulty: "Advanced",
    room: "The Cardio Arena",
    spotsLeft: 2,
    totalSpots: 22
  },

  // Friday
  {
    id: "c-18",
    name: "Barbell Complex HIIT",
    trainer: "Sarah Jenkins",
    day: "Friday",
    time: "06:30 AM",
    shift: "Morning",
    duration: "45 mins",
    difficulty: "Advanced",
    room: "The CrossFit Box",
    spotsLeft: 5,
    totalSpots: 15
  },
  {
    id: "c-19",
    name: "Bench Press Intensity",
    trainer: "Marcus Vance",
    day: "Friday",
    time: "12:00 PM",
    shift: "Afternoon",
    duration: "60 mins",
    difficulty: "Intermediate",
    room: "The Iron Dungeon",
    spotsLeft: 0,
    totalSpots: 10
  },
  {
    id: "c-20",
    name: "Deep Stretch Yoga",
    trainer: "Elena Rostova",
    day: "Friday",
    time: "05:30 PM",
    shift: "Evening",
    duration: "75 mins",
    difficulty: "Beginner",
    room: "The CrossFit Box",
    spotsLeft: 18,
    totalSpots: 30
  },

  // Saturday
  {
    id: "c-21",
    name: "Weekend Warrior WOD",
    trainer: "Sarah Jenkins",
    day: "Saturday",
    time: "08:30 AM",
    shift: "Morning",
    duration: "75 mins",
    difficulty: "Intermediate",
    room: "The CrossFit Box",
    spotsLeft: 10,
    totalSpots: 25
  },
  {
    id: "c-22",
    name: "Powerlifter's Heavy Club",
    trainer: "Marcus Vance",
    day: "Saturday",
    time: "10:30 AM",
    shift: "Morning",
    duration: "90 mins",
    difficulty: "Advanced",
    room: "The Iron Dungeon",
    spotsLeft: 1,
    totalSpots: 8
  },
  {
    id: "c-23",
    name: "Total Body Sculpt",
    trainer: "Alex Rivera",
    day: "Saturday",
    time: "01:00 PM",
    shift: "Afternoon",
    duration: "60 mins",
    difficulty: "Intermediate",
    room: "The Iron Dungeon",
    spotsLeft: 5,
    totalSpots: 15
  },

  // Sunday
  {
    id: "c-24",
    name: "Nervous System Recovery",
    trainer: "Elena Rostova",
    day: "Sunday",
    time: "09:00 AM",
    shift: "Morning",
    duration: "90 mins",
    difficulty: "Beginner",
    room: "The CrossFit Box",
    spotsLeft: 15,
    totalSpots: 25
  },
  {
    id: "c-25",
    name: "Hypertrophy Sunday",
    trainer: "Alex Rivera",
    day: "Sunday",
    time: "11:30 AM",
    shift: "Morning",
    duration: "60 mins",
    difficulty: "Intermediate",
    room: "The Iron Dungeon",
    spotsLeft: 8,
    totalSpots: 15
  }
];
