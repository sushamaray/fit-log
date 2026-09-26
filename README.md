# 💪 FitLog — Workout Library

FitLog is a modern, responsive workout library and personal workout planning application built with Next.js. It allows users to explore workouts, view detailed exercise information, build a daily workout plan, save workouts for later, and track completed exercises.

The application uses a dark, focused gym-inspired interface designed to make workout planning simple and distraction-free.

---

## 🚀 Live Project

**Live Link:** https://fit-log-sushamaray.vercel.app/

**GitHub Repository:** https://github.com/sushamaray/fit-log

---

## ✨ Features

### 1. 🏋️ Workout Library

Browse a complete library of 12 workouts fetched from the FitLog API.

Each workout card includes:

- Workout image
- Muscle group tags
- Workout name
- Equipment
- Duration
- Calories burned
- Rating

### 2. 🔎 Workout Details

Click any workout to open its dedicated details page.

The details page provides:

- Workout description
- Muscle group tags
- Equipment
- Difficulty
- Sets
- Reps
- Duration
- Calories
- Rating
- Step-by-step instructions

Users can also add workouts to their daily plan or save them for later.

### 3. 📋 Today's Workout Plan

Users can build a personalized daily workout plan.

Features include:

- Maximum 5 workouts per plan
- Live exercise count
- Total workout minutes
- Total calories
- Today's progress tracking
- Mark workouts as completed
- Remove workouts from the plan
- View workout details directly from the plan

### 4. 🔖 Save Workouts for Later

Users can save workouts they want to revisit later.

Saved workouts are available from the **Saved** tab on the My Plan page.

Users can:

- View saved workouts
- Open workout details
- Remove saved workouts

### 5. 🔔 Toast Notifications

FitLog provides instant feedback for important user actions.

Toast notifications are displayed when users:

- Add a workout to today's plan
- Save a workout
- Mark a workout as done
- Remove a workout from the plan
- Remove a saved workout
- Try to add a duplicate workout

### 6. 📊 Workout Sorting

The workout library can be sorted using:

- Duration
- Calories
- Rating

The default sorting option is **Duration**.

### 7. 💾 Local Storage Persistence

Workout plan, saved workouts, and completed workout data are stored in the browser's local storage.

This allows the user's workout data to remain available after refreshing the page.

### 8. 📱 Responsive Design

The application is designed to work across:

- Mobile devices
- Tablets
- Laptops
- Desktop screens

### 9. ⚡ Loading & Error States

FitLog includes user-friendly loading and error handling.

The application provides:

- Workout loading states
- Workout-not-found handling
- Custom navigation for invalid workout IDs
- Next.js not-found handling

---

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| **Next.js** | React framework and application architecture |
| **React** | Building reusable UI components |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Styling and responsive design |
| **Lucide React** | UI icons |
| **React Toastify** | Toast notifications |
| **Next.js Image** | Optimized image rendering |
| **LocalStorage** | Client-side data persistence |
| **FitLog REST API** | Workout data source |

---

## 🔌 API

FitLog uses the provided FitLog REST API.

### All Workouts

```text
https://api.abcz.workers.dev/api/fitlog
```

### Single Workout

```text
https://api.abcz.workers.dev/api/fitlog/:id
```

The API provides workout information including:

- ID
- Name
- Image
- Muscle groups
- Equipment
- Difficulty
- Duration
- Calories burned
- Sets
- Reps
- Rating
- Description
- Instructions

---

## 📂 Project Structure

```text
fit-log/
├── public/
│
├── src/
│   ├── app/
│   │   ├── my-plan/
│   │   │   └── page.tsx
│   │   ├── workout/
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   ├── WorkoutCard.tsx
│   │   ├── WorkoutLibrary.tsx
│   │   ├── WorkoutActions.tsx
│   │   └── Footer.tsx
│   ├── context/
│   │   └── FitLogContext.tsx
│   └── lib/
│       └── api.ts
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Go to the project directory

```bash
cd fit-log
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🏗️ Production Build

```bash
npm run build
```

To start the production server:

```bash
npm start
```

---

## 🎯 Core User Flow

```text
Home
  │
  ├── Browse Workout Library
  │       │
  │       └── Select Workout
  │               │
  │               ▼
  │         Workout Details
  │               │
  │        ┌──────┴──────┐
  │        ▼             ▼
  │   Add to Plan     Save for Later
  │        │             │
  │        └──────┬──────┘
  │               ▼
  │            My Plan
  │               │
  │        ┌──────┴──────┐
  │        ▼             ▼
  │   Today's Plan     Saved
  │        │
  │        ├── View Details
  │        ├── Mark as Done
  │        └── Remove
  │
  └── Sort Workouts
       ├── Duration
       ├── Calories
       └── Rating
```

---

## 📌 Project Highlights

- Responsive workout library
- API-powered workout data
- Dynamic workout detail pages
- Personalized daily workout planning
- Five-workout daily limit
- Saved workout collection
- Workout completion tracking
- LocalStorage persistence
- Workout sorting
- Toast notifications
- Responsive dark-themed UI
- Reusable React components

---

## 👨‍💻 Development

Built as a frontend project using modern React and Next.js development practices, with reusable components, client-side state management, API integration, and responsive UI design.

---

## 📄 License

This project was created for educational purposes.
