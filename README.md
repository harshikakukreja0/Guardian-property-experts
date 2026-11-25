# Guardian Property Experts — Unified Real Estate, Investment & Advisory Portal

[![Next.js](https://img.shields.io/badge/Next.js-15.1.0-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/State-Zustand-443e38)](https://zustand-demo.pmnd.rs/)

**Guardian Property Experts** is India's premier real estate, investment, and advisory platform. Built with an institutional architecture, it bridges high-intent buyers, homeowners, broker partners, and corporate developers through transparent legal verification, architectural diligence, and unified advisory workflows.

---

## 🏛️ System Architecture & Code Structure

The project follows a modular, feature-driven Next.js App Router architecture:

```
Gpe/
├── public/
│   ├── images/                      # Curated high-resolution architectural & skyline assets
│   ├── logo/                        # Official high-resolution transparent SVG & PNG branding assets
│   ├── robots.txt                   # Search crawler directives
│   └── sitemap.xml                  # Canonical search index
├── src/
│   ├── app/                         # Next.js 15 App Router pages & server routes
│   │   ├── auth/                    # Unified authentication flows (Login, Register, Forgot Password)
│   │   ├── builders/                # Tier-1 master builders & developer showcase
│   │   ├── buy/                     # Verified residential properties catalog (filter & search)
│   │   ├── commercial/              # Grade-A office parks, co-working, & retail spaces
│   │   ├── dashboard/               # 8 Independent Role-Based Workspaces
│   │   │   ├── broker/              # Broker partner CRM & pipeline
│   │   │   ├── builder/             # Master builder inventory & lead management
│   │   │   ├── customer/            # Buyer/Tenant dashboard & saved properties
│   │   │   ├── operations/          # Verification & diligence operations
│   │   │   ├── owner/               # Direct homeowner listing manager
│   │   │   ├── sales-crm/           # Lead routing & CRM analytics
│   │   │   ├── super-admin/         # CMS, stamp duty slabs & lead control center
│   │   │   └── support/             # Concierge verification desk
│   │   ├── news/                    # Real estate market intelligence, price indices & RERA advisory
│   │   ├── projects/                # Upcoming & new township launches
│   │   ├── property/[slug]/         # Detailed verified property profile & tour booking
│   │   ├── rent/                    # Zero-brokerage & verified rental listings
│   │   ├── services/                # Specialized Financial & Legal Tools
│   │   │   ├── agreements/          # Digital 4-step rental/sale agreement workflow
│   │   │   ├── home-loan/           # Bank EMI calculator & pre-approval lead assistant
│   │   │   └── stamp-duty/          # Multi-state interactive registration fee calculator
│   │   ├── submit-property/         # 4-stage property listing submission engine
│   │   ├── layout.tsx               # Root application layout with providers
│   │   └── page.tsx                 # Core homepage with dynamic city headline & minimal hero
│   ├── components/                  # Reusable UI component library
│   │   ├── common/                  # Global components (MainHeader, MainFooter, SearchBar)
│   │   ├── dashboard/               # DataTable, StatsCard, Sidebar, & Header
│   │   ├── project/                 # BuilderCard, ProjectCard
│   │   ├── property/                # PropertyCard, FeaturedPropertyCard, PropertyMap, Modals
│   │   └── ui/                      # Accessible primitives (Badge, Button, Card, Input)
│   ├── services/
│   │   └── mock/                    # Seed mock datasets (Properties, Builders, Projects, Users)
│   ├── store/                       # Client state management (Zustand)
│   │   ├── authStore.ts             # Auth state, session persistence, role switcher
│   │   └── filterStore.ts           # Global search filters & dynamic city synchronizer
│   ├── types/                       # Strict TypeScript interfaces
│   │   ├── property.types.ts        # Property schema, BHK, categories & amenities
│   │   └── user.types.ts            # User roles, permission matrices & profiles
│   └── utils/                       # Currency formatting, date helpers & math utilities
├── next.config.ts                   # Next.js configuration
├── tailwind.config.ts               # Brand tokens, custom color palette & theme extensions
└── tsconfig.json                    # Strict TypeScript compilation settings
```

---

## 🎨 Brand Identity & Design System

Guardian Property Experts features an executive identity inspired by modern architectural publications:

- **Primary Forest Green**: `#064B25` — Trust, prestige, and corporate authority.
- **Deep Emerald**: `#003D1C` — Structural depth and interactive hover states.
- **Secondary Leaf Green**: `#16803B` — Verified badges, action states, and tags.
- **Light Green Tint**: `#F0F7F0` — Subtle card backgrounds and active selections.
- **Apple-Style Mirror Glass**: Translucent `backdrop-blur-2xl` with specular highlights for navigation capsules and the modern footer.

---

## 🚀 Key Platform Features

1. **Dynamic City Synchronizer & Single-Line Minimal Hero**
   - Location selection in the navbar dynamically updates the hero headline (e.g. *Houses & Properties in Mumbai*, *Houses & Properties in Delhi NCR*), subheadings, and quick BHK filters.
   - Clean, center-aligned single-line title adhering to modern real-estate UI conventions (Housing.com reference).
   - Form-fitted frosted gradient brand crest capsule with zero empty void.

2. **Specialized Financial & Legal Advisory Tools**
   - **Stamp Duty Calculator** (`/services/stamp-duty`): Multi-state registration fee calculator across Maharashtra, Delhi NCR, Karnataka, Telangana, and Tamil Nadu.
   - **Home Loan Assistant** (`/services/home-loan`): Interactive EMI amortization calculator, bank comparison, and pre-approval eligibility estimation.
   - **Legal Agreement Generator** (`/services/agreements`): 4-step wizard to create legally compliant residential rental and sale agreements with PDF export.

3. **8 Role-Based Workspaces & Quick Role Switcher**
   - Integrated quick role switcher directly in the navbar to test and demonstrate distinct dashboards for **Super Admin**, **Operations Admin**, **Sales CRM**, **Broker Partner**, **Master Builder**, **Homeowner**, **Customer**, and **Support**.

4. **Market Intelligence & Price Index** (`/news`)
   - Micro-market capital appreciation benchmarks, gross rental yields, and RERA compliance advisory guides.

5. **Apple-Style Glass Footer**
   - Translucent grey glass finish with glossy top reflection, concise 4-column navigation, and direct customer concierge badges.

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 18.18+ or 20.x
- npm / pnpm / yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/harshikakukreja0/Guardian-property-experts.git
cd Guardian-property-experts

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

### Production Build
```bash
# Build the application
npm run build

# Start the production server
npm start
```

---

## 📄 License
Copyright © 2026 Guardian Property Experts India Pvt. Ltd. All rights reserved.
