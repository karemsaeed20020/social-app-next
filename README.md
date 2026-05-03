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

