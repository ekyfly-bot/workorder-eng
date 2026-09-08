# Work Order Engineering - Frontend

Modern web application for hotel operations work order management built with Next.js, React, and TypeScript.

## 🎯 Overview

This is the frontend application for the Work Order Engineering system - a comprehensive solution for managing maintenance and engineering tasks in hotel operations. The application provides real-time work order tracking, staff assignment management, analytics dashboards, and mobile-first features.

## ✨ Features

- **Work Order Management**: Create, assign, and track maintenance tasks
- **Real-time Updates**: WebSocket-based live status updates
- **Responsive Dashboard**: KPI metrics and performance analytics
- **Staff Management**: User roles, permissions, and department assignment
- **Authentication**: Secure JWT-based authentication with refresh tokens
- **File Uploads**: Photo and document attachment for work orders
- **Analytics**: Comprehensive reports and performance metrics
- **Mobile Ready**: Responsive design for all devices

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js 14+ with App Router
- **Language**: TypeScript 5+
- **UI Styling**: Tailwind CSS 3+
- **State Management**: Zustand (lightweight)
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios with interceptors
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or pnpm 8+

### Installation
```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run type-check       # Type check
npm run format           # Format code
npm test                 # Run tests
```

## 📁 Project Structure

- `app/` - Next.js app router pages and API routes
- `components/` - Reusable React components
- `lib/` - Utilities, hooks, API client, types
- `styles/` - Global CSS
- `public/` - Static assets

## 🔐 Authentication

JWT-based authentication with automatic token refresh:
- Email/password login
- Secure token storage
- Protected routes
- Auto logout on expiration

## 🎨 UI Components

- **Button**: Multiple variants (primary, secondary, danger, outline)
- **Card**: Flexible card layout
- **Input/TextArea/Select**: Form elements with validation
- **Loading/Skeleton**: Loading states
- **Full Tailwind CSS support**

## 📚 Documentation

- `plan.md` - Application planning and requirements
- `flowcharts.md` - System architecture and user flows
- `frontend-structure.md` - Detailed project structure

## 🆘 Support

Check existing issues or create a new one for bugs and questions.
Work order for ENG HKPG
