export type Vertical = "property" | "ev" | "digital" | "fnb" | "health" | "travel";
export type Difficulty = "easy" | "medium" | "hard";

export interface Task {
  id: string;
  title: string;
  description: string;
  points: number;
  vertical: Vertical;
  difficulty: Difficulty;
  timeEstimate: string;
  steps: string[];
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  pointCost: number;
  priceMYR: number;
  vertical: Vertical;
  vendor: string;
  value: string;
  stock: number;
}

export const VERTICAL_LABELS: Record<Vertical, string> = {
  property: "Property",
  ev: "EV & Mobility",
  digital: "Digital",
  fnb: "F&B & Lifestyle",
  health: "Health & Wellness",
  travel: "Travel & Tourism",
};

export const VERTICAL_COLORS: Record<Vertical, string> = {
  property: "bg-blue-100 text-blue-700",
  ev: "bg-green-100 text-green-700",
  digital: "bg-violet-100 text-violet-700",
  fnb: "bg-orange-100 text-orange-700",
  health: "bg-rose-100 text-rose-700",
  travel: "bg-cyan-100 text-cyan-700",
};

export const tasks: Task[] = [
  {
    id: "refer-tenant",
    title: "Refer a Tenant",
    description: "Refer a contact who successfully rents a property through our partner agents.",
    points: 5000,
    vertical: "property",
    difficulty: "medium",
    timeEstimate: "1–2 weeks",
    steps: [
      "Share your unique referral link with a potential tenant",
      "They sign up using your link",
      "They complete a successful tenancy agreement",
      "Points credited within 7 days",
    ],
  },
  {
    id: "ev-test-drive",
    title: "Test Drive an EV",
    description: "Book and complete a test drive at any participating EV dealership.",
    points: 1500,
    vertical: "ev",
    difficulty: "easy",
    timeEstimate: "2–3 hours",
    steps: [
      "Select a participating dealership from the list",
      "Book your preferred time slot",
      "Attend the test drive and scan the QR code at the venue",
      "Points credited instantly",
    ],
  },
  {
    id: "store-checkin",
    title: "Check In at Partner Store",
    description: "Visit and check in at any GanjaranX partner outlet to earn quick points.",
    points: 200,
    vertical: "digital",
    difficulty: "easy",
    timeEstimate: "15 mins",
    steps: [
      "Find a partner store near you",
      "Visit the store and open GanjaranX",
      "Tap Check In and scan the store QR code",
      "Points credited immediately",
    ],
  },
  {
    id: "watch-sponsored-video",
    title: "Watch a Sponsored Video",
    description: "Watch a short sponsored video from our brand partners and answer a quick poll.",
    points: 100,
    vertical: "digital",
    difficulty: "easy",
    timeEstimate: "3 mins",
    steps: [
      "Choose a video from the sponsored feed",
      "Watch the full video without skipping",
      "Answer a quick poll about the ad",
      "Points credited instantly",
    ],
  },
  {
    id: "ev-charging-signup",
    title: "Subscribe to EV Charging Plan",
    description: "Subscribe to a monthly EV charging plan with any of our mobility partners.",
    points: 3000,
    vertical: "ev",
    difficulty: "medium",
    timeEstimate: "30 mins",
    steps: [
      "Browse available charging plans",
      "Select and subscribe to a plan",
      "Complete your first charge session",
      "Points credited within 24 hours",
    ],
  },
  {
    id: "property-survey",
    title: "Complete Property Survey",
    description: "Fill out a 5-minute survey about your property preferences for our partner developers.",
    points: 500,
    vertical: "property",
    difficulty: "easy",
    timeEstimate: "5 mins",
    steps: [
      "Open the survey form",
      "Answer all questions honestly",
      "Submit your response",
      "Points credited within 1 hour",
    ],
  },
  {
    id: "restaurant-review",
    title: "Dine & Review",
    description: "Visit a partner restaurant, dine in, and leave a verified review on our platform.",
    points: 400,
    vertical: "fnb",
    difficulty: "easy",
    timeEstimate: "1 hour",
    steps: [
      "Choose a partner restaurant near you",
      "Dine in and scan the table QR code",
      "Submit your review with a photo",
      "Points credited within 24 hours",
    ],
  },
  {
    id: "grocery-spend",
    title: "Spend RM 100 at Partner Grocer",
    description: "Shop at any GanjaranX partner supermarket and earn bonus points on your spend.",
    points: 800,
    vertical: "fnb",
    difficulty: "easy",
    timeEstimate: "30 mins",
    steps: [
      "Shop at any participating supermarket",
      "Spend a minimum of RM 100",
      "Scan your receipt in the app",
      "Points credited within 48 hours",
    ],
  },
  {
    id: "gym-trial",
    title: "Try a Gym Free Trial",
    description: "Book and attend a free trial session at any GanjaranX partner gym.",
    points: 600,
    vertical: "health",
    difficulty: "easy",
    timeEstimate: "2 hours",
    steps: [
      "Select a partner gym from the list",
      "Book your free trial session",
      "Attend the session and check in via QR",
      "Points credited immediately",
    ],
  },
  {
    id: "health-screening",
    title: "Complete a Health Screening",
    description: "Undergo a basic health screening package at a partner clinic or pharmacy.",
    points: 1200,
    vertical: "health",
    difficulty: "medium",
    timeEstimate: "1–2 hours",
    steps: [
      "Find a partner clinic or pharmacy",
      "Book the GanjaranX health screening package",
      "Complete your screening",
      "Upload your results and claim points",
    ],
  },
  {
    id: "hotel-review",
    title: "Stay & Review a Partner Hotel",
    description: "Book a stay at a partner hotel and submit a detailed review after check-out.",
    points: 2000,
    vertical: "travel",
    difficulty: "medium",
    timeEstimate: "1–2 days",
    steps: [
      "Book any partner hotel through GanjaranX",
      "Complete your stay",
      "Submit a review with photos within 48 hours",
      "Points credited after review is verified",
    ],
  },
  {
    id: "travel-survey",
    title: "Complete a Travel Preferences Survey",
    description: "Help our travel partners understand your preferences and earn points for your time.",
    points: 300,
    vertical: "travel",
    difficulty: "easy",
    timeEstimate: "5 mins",
    steps: [
      "Open the travel survey form",
      "Answer all questions",
      "Submit your response",
      "Points credited within 1 hour",
    ],
  },
];

export const rewards: Reward[] = [
  {
    id: "ev-charging-rm50",
    title: "RM 50 EV Charging Credit",
    description: "Top up your EV charging wallet, valid at all ChargEV and IKEA EV stations nationwide.",
    pointCost: 5000,
    priceMYR: 50,
    vertical: "ev",
    vendor: "ChargEV",
    value: "RM 50",
    stock: 200,
  },
  {
    id: "fb-voucher-rm30",
    title: "RM 30 F&B Voucher",
    description: "Redeem at any of our 50+ F&B partner outlets across Klang Valley.",
    pointCost: 2500,
    priceMYR: 30,
    vertical: "fnb",
    vendor: "GanjaranX Partners",
    value: "RM 30",
    stock: 500,
  },
  {
    id: "hotel-1night",
    title: "1 Night Hotel Stay",
    description: "Enjoy a one-night stay at a 3-star partner hotel. Blackout dates apply.",
    pointCost: 15000,
    priceMYR: 250,
    vertical: "travel",
    vendor: "Best Western Malaysia",
    value: "RM 250",
    stock: 20,
  },
  {
    id: "legal-drafting",
    title: "Legal Document Drafting",
    description: "Get a one-page legal document drafted by our partner law firm.",
    pointCost: 8000,
    priceMYR: 150,
    vertical: "digital",
    vendor: "LegalEase MY",
    value: "RM 150",
    stock: 50,
  },
  {
    id: "agent-fee-discount",
    title: "Agent Fee Discount Voucher",
    description: "10% off agent fee on your next tenancy agreement through GanjaranX partner agents.",
    pointCost: 4000,
    priceMYR: 300,
    vertical: "property",
    vendor: "PropNex Malaysia",
    value: "Up to RM 300",
    stock: 100,
  },
  {
    id: "ev-accessories",
    title: "EV Accessories RM 80 Voucher",
    description: "Shop EV cables, adapters, and accessories at any EV Plug partner store.",
    pointCost: 6500,
    priceMYR: 80,
    vertical: "ev",
    vendor: "EV Plug MY",
    value: "RM 80",
    stock: 75,
  },
  {
    id: "restaurant-voucher-rm50",
    title: "RM 50 Restaurant Voucher",
    description: "Dine at over 100 partner restaurants across Malaysia with this voucher.",
    pointCost: 4500,
    priceMYR: 50,
    vertical: "fnb",
    vendor: "GanjaranX Dining",
    value: "RM 50",
    stock: 300,
  },
  {
    id: "grocery-cashback-rm20",
    title: "RM 20 Grocery Cashback",
    description: "Get RM 20 cashback on your next grocery run at partner supermarkets.",
    pointCost: 1800,
    priceMYR: 20,
    vertical: "fnb",
    vendor: "Jaya Grocer / Village Grocer",
    value: "RM 20",
    stock: 400,
  },
  {
    id: "gym-month-pass",
    title: "1-Month Gym Membership",
    description: "Enjoy one month of unlimited gym access at any GanjaranX partner fitness centre.",
    pointCost: 9000,
    priceMYR: 120,
    vertical: "health",
    vendor: "Celebrity Fitness",
    value: "RM 120",
    stock: 60,
  },
  {
    id: "wellness-spa-rm80",
    title: "RM 80 Spa & Wellness Voucher",
    description: "Treat yourself to a relaxing spa session at partner wellness centres nationwide.",
    pointCost: 7000,
    priceMYR: 80,
    vertical: "health",
    vendor: "Rekindle Wellness",
    value: "RM 80",
    stock: 80,
  },
  {
    id: "flight-voucher-rm100",
    title: "RM 100 Flight Voucher",
    description: "Save on your next domestic or short-haul flight with our airline partners.",
    pointCost: 10000,
    priceMYR: 100,
    vertical: "travel",
    vendor: "AirAsia / Batik Air",
    value: "RM 100",
    stock: 150,
  },
  {
    id: "travel-insurance-rm50",
    title: "RM 50 Travel Insurance",
    description: "Get covered for your next trip with a complimentary travel insurance plan.",
    pointCost: 4200,
    priceMYR: 50,
    vertical: "travel",
    vendor: "Etiqa Insurance",
    value: "RM 50",
    stock: 200,
  },
  {
    id: "property-legal-rm200",
    title: "RM 200 Property Legal Fees Voucher",
    description: "Offset legal fees on your next property purchase or tenancy through our partners.",
    pointCost: 18000,
    priceMYR: 200,
    vertical: "property",
    vendor: "TanSri Law Chambers",
    value: "RM 200",
    stock: 30,
  },
];
