<div align="center">

# 💪 FitGuide

### Your All-in-One Workout, Nutrition & BMI Tracking Companion

FitGuide helps users plan workouts, track nutrition, monitor BMI, and stay accountable with group challenges — all synced securely across devices.

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-Build%20Tool-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](#-license)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Project Structure](#-project-structure) • [Roadmap](#-roadmap)

</div>

---

## 📖 About

**FitGuide** is a full-stack fitness web app that brings **workouts, nutrition, and BMI tracking** together in one place. Users can sign up, log their measurements and progress, and sync their data securely across devices via Supabase. It also includes **group challenges**, giving users a social, accountability-driven way to stay consistent with their fitness goals.

---

## ✨ Features

- 🏋️ **Workout Tracking** — Plan and log workouts to stay on top of training
- 🥗 **Nutrition Tracking** — Log meals and monitor nutritional intake
- 📏 **BMI Calculator & History** — Calculate BMI and save entries over time to track trends
- 🔐 **Full Authentication System** — Email/password sign up and sign in, powered by Supabase Auth
- ☁️ **Cross-Device Data Sync** — Signed-in users get their BMI entries and progress synced everywhere
- 🏆 **Group Challenges** — Join challenges with others for extra motivation and accountability *(requires an account)*
- 💾 **Persistent Saved Entries** — Measurements and logs are saved securely to your account
- ⚡ **Fast, Modern UI** — Built with React, TypeScript, Vite, and Tailwind CSS

---

## 🔑 Authentication

FitGuide ships with a complete auth system rather than a bolted-on login form:

| Piece | Role |
|---|---|
| **`AuthModal` component** | Dedicated sign-in / sign-up interface |
| **`useAuth` hook** | Manages authentication state throughout the app |
| **Supabase backend** | Handles secure account creation, password storage, and session management |

Certain features — saving BMI entries persistently, syncing data across devices, and joining group challenges — are **gated behind sign-in**, encouraging users to create an account to get the full experience.

---

## 🛠 Tech Stack

**Frontend**
- [React](https://react.dev/) (TypeScript) — component-based UI
- [Vite](https://vitejs.dev/) — fast dev server & build tool
- [TypeScript](https://www.typescriptlang.org/) — type safety across the codebase
- [Tailwind CSS](https://tailwindcss.com/) — utility-first styling
- [PostCSS](https://postcss.org/) — CSS processing pipeline

**Backend / Database**
- [Supabase](https://supabase.com/) — Postgres database, authentication, and data sync
  - Migrations tracked under `supabase/migrations`

**Tooling**
- [ESLint](https://eslint.org/) — code linting & quality enforcement
- Node.js / npm — package management

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js)
- A [Supabase](https://supabase.com/) project (free tier works) for auth and data storage

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Priyankayenni/FitGuide.git
cd FitGuide

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
```

Fill in your `.env` file with your Supabase credentials:

```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

```bash
# 4. Apply database migrations (from the Supabase CLI or dashboard)
#    Migration files live in supabase/migrations

# 5. Run the development server
npm run dev
```

The app will be available at **`http://localhost:5173`** (Vite's default port).

### Build for Production

```bash
npm run build
npm run preview
```

### Linting

```bash
npm run lint
```

---

## 📁 Project Structure

```
FitGuide/
├── .bolt/                    # Bolt.new project configuration
├── src/
│   ├── components/           # React UI components (AuthModal, trackers, etc.)
│   ├── hooks/                # Custom hooks (e.g. useAuth)
│   ├── lib/                  # Supabase client & utility functions
│   ├── pages/                 # App pages/routes
│   └── App.tsx                # Root component
├── supabase/
│   └── migrations/            # Database schema migrations
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```

> 📝 Update this tree if your actual folder names differ from the above.

---

## 🗺 Roadmap

- [ ] Host a live public demo
- [ ] Add workout plan templates / AI-suggested routines
- [ ] Expand nutrition tracking with a food database/API integration
- [ ] Add progress charts and analytics dashboard
- [ ] Push notifications/reminders for challenges and logging streaks
- [ ] Mobile app version

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Priyanka Yenni**
GitHub: [@Priyankayenni](https://github.com/Priyankayenni)

---

<div align="center">

If you find FitGuide useful, consider giving it a ⭐ on GitHub!

</div>
