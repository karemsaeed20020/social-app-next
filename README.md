<p align="center">
  <img src="public/logo.png" alt="Social App Logo" width="80" height="80" />
</p>

<h1 align="center">Social App</h1>

<p align="center">
  A modern, full-featured social media application built with <strong>Next.js 16</strong>, <strong>React 19</strong>, and <strong>TypeScript</strong>. It supports multilingual content (English & Arabic), dark/light themes, real-time notifications, and a rich set of social interactions.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss" alt="Tailwind CSS" />
</p>

---
## 📑 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [📜 Available Scripts](#-available-scripts)
- [🌍 Internationalization (i18n)](#-internationalization-i18n)
- [🎨 Theming](#-theming)
- [🔐 Authentication & Middleware](#-authentication--middleware)
- [📦 Key Packages](#-key-packages)

---

## ✨ Features

### 🔐 Authentication

- **Login** — Secure sign-in with form validation.
- **Signup** — User registration with full validation.
- **Logout** — Session-based logout with cookie management.
- **Change Password** — Update password from the settings page.
- **Route Protection** — Middleware-based protection for authenticated and guest routes.

- ### 📰 Feed & Posts

- **News Feed** — Infinite scrolling feed with paginated posts.
- **Create Post** — Create posts with text and/or image, with privacy level selection (`Public`, `Following`, `Only Me`).
- **Edit & Delete Posts** — Full CRUD operations on your own posts.
- **Like & Unlike Posts** — Toggle like on any post.
- **Bookmark Posts** — Save posts for later viewing.
- **Share Posts** — Share/repost other users' posts with your own comment.
- **Post Privacy Filters** — Filter feed by `All`, `Following`, `My Posts`, or `Saved` posts.
- **Single Post View** — Dedicated page for viewing a single post with all its details.
- **Image Lightbox** — Full-screen image viewer for post images.
- **Emoji Picker** — Rich emoji input for comments and posts
### 💬 Comments & Replies

- **Add Comments** — Comment on any post with text and image.
- **Edit & Delete Comments** — Modify or remove your own comments.
- **Like Comments** — Toggle like on comments.
- **Nested Replies** — Reply to comments with threaded conversation support.
- **Emoji Picker** — Rich emoji input for comments and posts.

### 👤 Profile

- **View Profile** — View your own profile with stats (posts, followers, following).
- **View Other Users' Profiles** — Visit any user's profile page.
- **Update Profile Photo** — Upload and change your avatar.
- **Update/Delete Cover Photo** — Upload a new cover or remove the existing one.
- **Profile Tabs** — Browse user content through organized tabs.
- **User Posts List** — View all posts by a specific user.

### 👥 Social & Users

- **Suggested Friends** — Discover new people to follow with suggestion cards.
- **Follow / Unfollow Users** — Toggle follow status on any user.
- **Search Users** — Search for users by name with debounced input.
- **User Profiles** — View detailed profiles of other users.

### 🔔 Notifications

- **Real-Time Notification Count** — Unread notification badge in the navbar.
- **Notification List** — View all notifications with infinite scrolling.
- **Mark as Read** — Mark individual notifications as read.
- **Mark All as Read** — Bulk mark all notifications as read.
- **Notification Types** — Supports likes, comments, follows, and shares.

### ⚙️ Settings

- **Change Password** — Secure password change form with validation.
- **Theme Toggle** — Switch between Dark and Light mode.
- **Language Switch** — Switch between English and Arabic.

### 🌍 Internationalization

- **English (en)** — Full English language support.
- **Arabic (ar)** — Full Arabic language support with RTL layout.
- **Locale-Based Routing** — URL-based locale prefix (`/en/...`, `/ar/...`).
### 🎨 UI/UX

- **Dark & Light Themes** — Full theme support with `next-themes`.
- **Responsive Design** — Mobile-first responsive layout with 3-column desktop grid.
- **Skeleton Loaders** — Smooth loading states across all pages.
- **Toast Notifications** — User feedback with `sonner` toast messages.
- **Glassmorphism Navbar** — Sticky navbar with backdrop blur effect.
- **Infinite Scrolling** — Seamless content loading with `react-intersection-observer`.
- **State Screens** — Reusable empty, error, and loading state components.

---

## 🛠️ Tech Stack

### Core Framework

| Technology       | Version | Description                     |
| ---------------- | ------- | ------------------------------- |
| **Next.js**      | 16.1.6  | React framework with App Router |
| **React**        | 19.2.4  | UI library                      |
| **TypeScript**   | 5.9.3   | Type-safe JavaScript            |
| **Tailwind CSS** | 4.2.1   | Utility-first CSS framework     |


### State & Data Management

| Package                   | Description                             |
| ------------------------- | --------------------------------------- |
| **@tanstack/react-query** | Server state management & data fetching |
| **react-hook-form**       | Performant form handling                |
| **zod**                   | Schema-based form validation            |
| **js-cookie**             | Cookie-based token management           |

### UI Components & Styling

| Package                       | Description                           |
| ----------------------------- | ------------------------------------- |
| **Radix UI**                  | Accessible, unstyled UI primitives    |
| **shadcn/ui**                 | Pre-built components (New York style) |
| **Lucide React**              | Beautiful icon library                |
| **class-variance-authority**  | Component variant management          |
| **clsx** + **tailwind-merge** | Conditional class utilities           |
| **tw-animate-css**            | Tailwind animation utilities          |

### Internationalization & Theming

| Package         | Description                           |
| --------------- | ------------------------------------- |
| **next-intl**   | Full i18n support with locale routing |
| **next-themes** | Dark/Light theme management           |

### Media & Interaction

| Package                         | Description                  |
| ------------------------------- | ---------------------------- |
| **yet-another-react-lightbox**  | Full-screen image lightbox   |
| **emoji-picker-react**          | Emoji picker for text inputs |
| **react-intersection-observer** | Infinite scroll detection    |
| **react-day-picker**            | Date picker component        |
| **sonner**                      | Toast notification system    |

### Developer Tools

| Package                             | Description                      |
| ----------------------------------- | -------------------------------- |
| **@tanstack/react-query-devtools**  | React Query debugging tools      |
| **ESLint** + **eslint-config-next** | Code linting                     |
| **knip**                            | Unused dependency detection      |
| **git-cz**                          | Conventional commits             |
| **rimraf**                          | Cross-platform directory cleanup |

---
## 📁 Project Structure

```
social-app-next/
├── public/                        # Static assets (logo, images)
├── src/
│   ├── app/
│   │   └── [locale]/              # Locale-based routing (en, ar)
│   │       ├── (auth)/            # Auth pages (login, signup)
│   │       │   ├── login/
│   │       │   └── signup/
│   │       ├── (main)/            # Main app layout with navbar & sidebars
│   │       │   ├── feed/
│   │       │   ├── posts/         # Single post page
│   │       │   ├── profile/
│   │       │   ├── user/          # Other user profiles
│   │       │   ├── notifications/
│   │       │   ├── settings/
│   │       │   └── suggested-friends/
│   │       └── layout.tsx         # Root layout with providers
│   │
│   ├── core/                      # Core app configuration
│   │   ├── constants/             # API endpoints & route constants
│   │   ├── i18n/                  # Internationalization config & routing
│   │   ├── lib/                   # Utilities (API fetch, time formatting)
│   │   ├── messages/              # Translation files (en.ts, ar.ts)
│   │   └── providers/             # React Query provider
│   │
│   ├── features/                  # Feature-based modules
│   │   ├── auth/                  # Authentication (login, signup, shared)
│   │   │   ├── login/             # Login form, hook, schema, service
│   │   │   ├── signup/            # Signup form, hook, schema, service
│   │   │   └── shared/            # Shared auth components & utilities
│   │   │
│   │   ├── feed/                  # Feed & posts feature
│   │   │   ├── components/        # Post card, creator, comments, sidebars
│   │   │   ├── hooks/             # Posts, comments, users hooks
│   │   │   ├── models/            # Post, Comment, SharedPost types
│   │   │   ├── schemas/           # Zod validation schemas
│   │   │   ├── services/          # API service functions
│   │   │   └── constants/         # Feed-specific constants
│   │   │
│   │   ├── profile/               # User profile feature
│   │   │   ├── components/        # Profile header, info, stats, tabs
│   │   │   ├── hooks/             # Profile data hooks
│   │   │   ├── models/            # Profile types
│   │   │   └── services/          # Profile API services
│   │   │
│   │   ├── notifications/         # Notifications feature
│   │   │   ├── components/        # Notification list, item, skeleton
│   │   │   ├── hooks/             # Notification hooks
│   │   │   ├── models/            # Notification types
│   │   │   └── services/          # Notification API services
│   │   │
│   │   └── settings/              # Settings feature
│   │       ├── components/        # Change password form
│   │       ├── hooks/             # Settings hooks
│   │       └── schemas/           # Password change validation
│   │
│   ├── shared/                    # Shared/reusable modules
│   │   ├── components/
│   │   │   ├── ui/                # Base UI components (Button, Dialog, Input, etc.)
│   │   │   ├── shared/            # Shared components (StateScreen, InfiniteList, etc.)
│   │   │   └── layout/            # Layout components (Navbar)
│   │   ├── hooks/                 # Shared hooks (useUserData)
│   │   └── models/                # Global types (Locale, Direction, Privacy)
│   │
│   ├── globals.css                # Global styles & Tailwind config
│   └── proxy.ts                   # Middleware (auth guards, i18n routing)
│
├── components.json                # shadcn/ui configuration
├── next.config.ts                 # Next.js configuration with next-intl
├── tailwind.config.ts             # Tailwind CSS configuration
├── tsconfig.json                  # TypeScript configuration
├── eslint.config.mjs              # ESLint flat config
├── postcss.config.mjs             # PostCSS configuration
└── package.json                   # Dependencies & scripts
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** >= 18.x
- **Yarn** (recommended) or npm

### 1. Clone the Repository

```bash
git clone https://github.com/Kerolos2000/social-app-next.git
cd social-app-next
```

### 2. Install Dependencies

```bash
yarn install
# or
npm install
```

### 3. Run the Development Server

```bash
yarn dev
# or
npm run dev
```

This will start the app with **Turbopack** for fast development. The `.next` cache is automatically cleaned before each dev start.

### 4. Open in Browser

Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

> The app will automatically redirect to the default locale (`/en/login` or `/en/feed` based on auth status).

---

## 📜 Available Scripts

| Script   | Command       | Description                                      |
| -------- | ------------- | ------------------------------------------------ |
| `dev`    | `yarn dev`    | Start dev server with Turbopack (clears `.next`) |
| `build`  | `yarn build`  | Create production build                          |
| `start`  | `yarn start`  | Start production server                          |
| `lint`   | `yarn lint`   | Run ESLint checks                                |
| `commit` | `yarn commit` | Create conventional commit with `git-cz`         |

---

## 🌍 Internationalization (i18n)

The app uses **next-intl** for full internationalization support:

- **Supported Locales**: `en` (English), `ar` (Arabic)
- **Default Locale**: `en`
- **RTL Support**: Arabic locale automatically switches to RTL layout
- **URL Structure**: `/{locale}/...` (e.g., `/en/feed`, `/ar/feed`)
- **Translation Files**: Located at `src/core/messages/en.ts` and `src/core/messages/ar.ts`

All text in the application is fully translatable, including:

- Navigation labels
- Form labels & validation messages
- Error messages & empty states
- Button labels & tooltips
- Notification content

---

## 🎨 Theming

The app supports **Dark** and **Light** themes using `next-themes`:

- Theme preference is persisted across sessions
- Seamless switching via the settings sidebar or settings page
- All components respect the active theme through CSS variables
- Uses Tailwind CSS dark mode utilities

---

## 🔐 Authentication & Middleware

### Authentication Flow

1. Users sign up or log in via the auth pages.
2. A JWT token is stored as a cookie (`token`).
3. The token is automatically attached to all API requests via `clientApiFetch`.
4. User data is retrieved from the token using `js-cookie`.

### Middleware (`proxy.ts`)

The middleware handles:

- **Protected Routes**: Redirects unauthenticated users to `/login` (e.g., `/feed`).
- **Guest Routes**: Redirects authenticated users away from `/login` and `/signup`.
- **Locale Detection**: Applies the correct locale from the URL.
- **i18n Middleware**: Integrates `next-intl` middleware for locale-based routing.

---

## 📦 Key Packages

| Package                 | Purpose                                                                      |
| ----------------------- | ---------------------------------------------------------------------------- |
| `next`                  | Full-stack React framework with App Router, Server Components, and Turbopack |
| `react-hook-form`       | Performant, flexible form handling with minimal re-renders                   |
| `zod`                   | TypeScript-first schema validation for forms and API data                    |
| `@tanstack/react-query` | Powerful server state management, caching, and synchronization               |
| `next-intl`             | Complete internationalization with locale routing and translations           |
| `next-themes`           | Theme management for dark/light mode with system preference support          |
| `radix-ui`              | Accessible, composable UI primitives                                         |
| `lucide-react`          | Comprehensive, customizable icon library                                     |
| `sonner`                | Elegant toast notifications                                                  |
| `emoji-picker-react`    | Feature-rich emoji picker component                                          |
| `date-fns`              | Lightweight date utility library                                             |
| `@vercel/analytics`     | Web analytics for performance monitoring                                     |

---

<p align="center">
  Built with ❤️ using Next.js, React, and TypeScript
</p>
