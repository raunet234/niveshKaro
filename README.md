# NiveshMitra (niveshKaro) 🇮🇳

**India's First Investment Discovery Platform.** An intuitive, responsive, and aesthetically polished web application built on Next.js 15, React 19, and Tailwind CSS. It is designed to help investors discover verified investment opportunities in their local areas, assess risk/return profiles, and connect directly with businesses without intermediation fees.

---

## 🌟 Key Features

- 📍 **Pan-India Discovery**: Filter and explore opportunities across all 28 states and 8 Union Territories.
- 📊 **Risk & Return Transparency**: Visual metrics showing return percentages, structured risk levels (1-10), and verified badges.
- 📂 **Multi-Category Listings**: Browse opportunities spanning Real Estate, Franchises, Government Bonds, Mutual Funds, Agriculture, Gold, and more.
- 🤝 **Direct Connection**: Zero commissions or brokerages. Investors express interest and connect directly with business owners.
- ⚡ **Interactive Modules**:
  - **Risk Assessment Quiz**: Quick personalized quiz to evaluate risk tolerance.
  - **Comparison Tool**: Add and compare multiple investment opportunities side-by-side.
  - **Interactive State/City Selectors**: Simple region-based search mapping.
  - **Business Registry**: Simple onboarding flow for businesses to submit verification documents and list opportunities.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router & Turbopack enabled)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS custom variables
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tooling**: ESLint, PostCSS

---

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (v18.x or higher recommended) and `npm` installed.

### Installation

1. Clone the repository (if not already done):
   ```bash
   git clone https://github.com/raunet234/niveshKaro.git
   cd niveshKaro
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

### Running the App Locally

Start the development server with Turbopack enabled:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Building for Production

To create a production-optimized build of the project:
```bash
npm run build
```

To run the production build locally:
```bash
npm run start
```

---

## 📁 Directory Structure

```text
NiveshMitra/
├── src/
│   ├── app/                 # Next.js App Router (pages & routing)
│   │   ├── admin/           # Admin panel view
│   │   ├── business/        # Business registration & dashboard
│   │   ├── compare/         # Opportunity comparison page
│   │   ├── dashboard/       # Main browse and search dashboard
│   │   ├── learn/           # Investment education resources
│   │   ├── listing/[id]/    # Dynamic opportunity detail views
│   │   ├── profile/         # User profile page
│   │   ├── risk-quiz/       # Interactive risk-assessment quiz
│   │   ├── select-location/ # State & city selection portal
│   │   ├── globals.css      # Core styles & Tailwind directives
│   │   ├── layout.tsx       # Root layout configuration
│   │   └── page.tsx         # Interactive Home/Landing page
│   └── components/          # Reusable UI components (Navbar, Footer, etc.)
├── package.json             # Scripts & dependencies
├── tsconfig.json            # TypeScript configuration
├── next.config.ts           # Next.js application configuration
└── .gitignore               # Ignored build & environment files
```

---

## 📜 Disclaimer

All investment opportunities on **NiveshMitra** are for discovery and informational purposes only. The platform does not provide financial, legal, or investment advice. Investors are advised to perform independent due diligence before committing capital.
