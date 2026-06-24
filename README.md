# Iron City Fitness | Premium Interactive Demo Website

A state-of-the-art, fully responsive single-page web application built as a high-fidelity client demo for **Iron City Fitness**, a premier 24/7 athletic training and strength conditioning facility. 

This project is engineered with a modern high-contrast dark aesthetic, utilizing glassmorphism, responsive components, and simulated interactive features to provide an authentic member portal experience.

---

## 🛠️ Technology Stack

*   **Core**: React 19, TypeScript, Vite
*   **Styling**: Tailwind CSS v4 (incorporating custom themes and variables)
*   **Icons**: Lucide React & optimized inline SVGs
*   **Typography**: Google Fonts integration:
    *   *Headings*: **Barlow Condensed** (strong, bold, athletic aesthetic)
    *   *Body*: **Outfit** (clean, modern, highly legible)
*   **Code Quality**: Oxlint & TypeScript strict typing

---

## 🌟 Key Features & Client Requirements

The website implements all six client requirements using dynamic, stateful components and high-fidelity simulated data:

### 1. Slogan & Brand Identity (Requirement 1)
*   **Impacting Slogan**: `FORGE YOUR LEGACY. CRUSH YOUR GOALS.` styled in high-impact, uppercase typography.
*   **Live Gym Capacity Widget**: Displays a real-time gym occupancy counter (`42 / 120` active members) with a pulsating green status indicator ("Optimal Lifting Conditions") to encourage member visits.
*   **Glassmorphic Container**: The entire hero section content is wrapped in a translucent glass panel with high backdrop blur and adjusted transparency, floating over a dark, moody gym backdrop.

### 2. Offers & Promotions (Requirement 2)
*   Displays three prominent card layouts containing active promotions (`Summer Shred`, `Refer a Friend`, and `Complimentary Fitness Assessment`).
*   **Live Countdown Timer**: An active, real-time ticking clock (Days, Hours, Minutes, Seconds) built into the time-limited summer shred promotion to drive urgency.
*   Clearly visible coupon badges (e.g., `SHRED20`, `FITBUDDY`) with dashed border outlines.

### 3. Pricing & Membership Calculator (Requirement 3)
*   **Membership Tiers**: Side-by-side pricing cards detailing the `Steel Access` (₹1,999/mo), `Iron Core` (₹3,999/mo), and `Platinum Elite` (₹9,999/mo) plans.
*   **Cost Calculator**: An interactive playground where users can:
    *   Toggle between base tiers.
    *   Choose commitment cycles (Monthly or Annual with a 15% discount).
    *   Scale personal training sessions (using a slider up to 8 sessions/mo, adding ₹1,500/session).
    *   Add premium services (Nutrition coaching, sauna access, towel service).
    *   Observe the estimated monthly investment update dynamically in Indian Rupee format (₹).
*   **Digital Contract Simulator**: Clicking "Generate Contract" opens a glassmorphic agreement modal detailing their customized plan. Users can type their name to digitally sign the terms and receive a signed contract preview with a secure registration ID.

### 4. Class Timetables, Shifts & Hours (Requirement 4)
*   **General Hours Card**: Explicitly outlines weekly operational schedules and notes 24/7 access details for VIP members.
*   **Interactive Scheduler**:
    *   **Day Selector**: Filters the schedule by weekday (Monday to Sunday).
    *   **Shift Selector**: Filters classes by shift time (All, Morning, Afternoon, Evening).
    *   **Search Input**: Allows users to filter classes by name, trainer, or training room in real-time.
    *   **Booking Simulator**: Clicking "Book Spot" decreases the available slots by one, changes the button state to "Booked ✓", and triggers a screen-edge toast notification.

### 5. Trainer Profiles & Biographies (Requirement 5)
*   Showcases profiles for four elite coaches: Marcus "The Titan" Vance, Sarah Jenkins, Alex Rivera, and Elena Rostova.
*   Each profile card includes:
    *   Coaching specialties and personal philosophy quotes.
    *   Certified credentials (CSCS, USAPL, CrossFit L2, Precision Nutrition).
    *   Years of experience and links to simulated social channels.

### 6. Facilities & Specialized Zones (Requirement 6)
*   An interactive tabbed dashboard to explore specialized gym zones: `The Iron Dungeon (Strength)`, `The Cardio Arena`, `The CrossFit Box`, and `Recovery & Wellness Spa`.
*   Selecting a zone dynamically updates its description, featured premium equipment grid (e.g., Eleiko platforms, Rogue rigs, Concept2 rowers), and corresponding photography.

---

## 📂 Project Structure

```text
├── public/                  # Static assets
│   ├── gym_hero.png         # High-impact hero background
│   ├── facility_*.png       # Facility zone photos
│   └── trainer_*.png        # Professional coach portraits
├── src/
│   ├── data/
│   │   └── gymData.ts       # Structured TypeScript simulated data layer
│   ├── App.tsx              # Main single-page application and interactive logic
│   ├── index.css            # Tailwind directives, theme variables, and scrollbar styles
│   └── main.tsx             # React DOM root mounting
├── index.html               # Google Fonts imports & metadata title
├── vite.config.ts           # Tailwind CSS Vite plugin configuration
├── package.json             # Package manifests and scripts
└── README.md                # Project documentation
```

---

## 🚀 Getting Started

To run the development server and preview the website locally:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### 2. Install Dependencies
Navigate to the project root directory and install the packages:
```bash
npm install
```

### 3. Run the Development Server
Launch the Vite local server:
```bash
npm run dev
```
Open the local URL (typically `http://localhost:5173`) in your browser to interact with the demo.

### 4. Build for Production
To compile and bundle the project for production deployment:
```bash
npm run build
```
This compiles the TypeScript files and outputs optimized HTML, CSS, and JS chunks into the `dist/` directory.
