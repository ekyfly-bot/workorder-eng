# Plan Aplikasi Work Order Engineering - Hotel Operasional

## Overview
Membangun sistem work order engineering terintegrasi untuk manajemen perbaikan dan pemeliharaan fasilitas hotel. Aplikasi mencakup backend API (Next.js), database (PostgreSQL), dan frontend mobile (Flutter) serta web dashboard.

**Tech Stack:**
- Backend: Next.js (API Routes + Server Components)
- Database: PostgreSQL
- Frontend Web: Next.js + React
- Mobile App: Flutter
- Authentication: JWT + OAuth2
- Real-time Updates: WebSockets / Firebase Cloud Messaging

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Layer                            │
├──────────────────────┬──────────────────────────────────────┤
│   Flutter Mobile     │    Next.js Web Dashboard            │
│   (iOS + Android)    │    (React)                          │
└──────────────────────┴──────────────────────────────────────┘
              ↓                           ↓
┌──────────────────────────────────────────────────────────────┐
│              Next.js Backend (API Routes)                   │
│  ├─ Work Order Management                                  │
│  ├─ User & Role Management                                 │
│  ├─ Assignment & Scheduling                                │
│  ├─ File Upload (Photos/Documents)                         │
│  └─ Real-time Notifications                                │
└──────────────────────────────────────────────────────────────┘
              ↓
┌──────────────────────────────────────────────────────────────┐
│              PostgreSQL Database                            │
│  ├─ Users & Authentication                                 │
│  ├─ Work Orders & Tasks                                    │
│  ├─ Assignments & Schedules                                │
│  ├─ Maintenance History                                    │
│  └─ Audit Logs                                             │
└──────────────────────────────────────────────────────────────┘
```

---

## Core Features

### 1. **Work Order Management**
- Buat work order baru (form lengkap dengan deskripsi, lokasi, prioritas)
- List work order dengan filter (status, prioritas, tanggal, departemen)
- Detail work order dengan history
- Update status (Pending → In Progress → Completed → Closed)
- Assign work order ke staff teknis
- Add comments dan attachments (foto, dokumen)
- Approval workflow (QA/Supervisor review)

### 2. **User & Role Management**
- Roles: Admin, Supervisor, Staff Teknis, Kepala Departemen
- User profile management
- Skill/expertise tagging untuk staff
- Department assignment
- Access control & permissions

### 3. **Assignment & Scheduling**
- Auto-assign work order berdasarkan skill, ketersediaan staff
- Manual assignment dengan drag-drop (web)
- Real-time notification ke staff yang di-assign
- Schedule management (kalender view)
- Overtime tracking & shift management

### 4. **Maintenance History & Analytics**
- Complete audit trail setiap work order
- Equipment maintenance history
- Parts/inventory tracking
- KPI dashboard (completion rate, avg resolution time, staff performance)
- Monthly/yearly reports

### 5. **File Management**
- Upload foto progress kerja
- Attach completion documentation
- Before/after photo comparison
- PDF report generation

### 6. **Real-time Features**
- Push notifications (mobile & web)
- Live status updates
- In-app chat untuk komunikasi staff-supervisor
- Real-time assignment updates

### 7. **Mobile-Specific Features** (Flutter)
- Offline mode dengan sync when online
- GPS tracking untuk on-site verification
- Camera integration untuk photo capture
- Barcode/QR code scanning untuk asset tracking
- Voice recording untuk notes

---

## Database Schema (PostgreSQL)

### Core Tables
```
- users (id, name, email, password_hash, role, department, phone)
- roles (id, name, permissions)
- user_permissions (user_id, permission_id)
- departments (id, name, building)
- work_orders (id, title, description, status, priority, location, created_by, assigned_to, created_at, completed_at)
- work_order_comments (id, work_order_id, user_id, comment, created_at, media_url)
- work_order_history (id, work_order_id, old_status, new_status, changed_by, changed_at)
- assignments (id, work_order_id, staff_id, assigned_at, started_at, completed_at)
- maintenance_logs (id, asset_id, work_order_id, maintenance_type, notes)
- assets (id, name, location, category, last_maintenance, next_maintenance)
- notifications (id, user_id, type, message, is_read, created_at)
- audit_logs (id, user_id, action, resource_type, resource_id, timestamp)
```

---

## Development Phases

### Phase 1: Project Setup & Infrastructure
- [ ] Setup Next.js project dengan TypeScript
- [ ] Configure PostgreSQL database & migrations (Prisma/TypeORM)
- [ ] Setup authentication (JWT + NextAuth.js)
- [ ] Configure environment variables & deployment
- [ ] Setup Flutter project structure
- [ ] API documentation (OpenAPI/Swagger)

### Phase 2: Core Backend API
- [ ] User & Authentication API
- [ ] Work Order CRUD API
- [ ] Assignment API
- [ ] File upload API (AWS S3/Local storage)
- [ ] Role-based access control (RBAC) middleware
- [ ] Error handling & logging

### Phase 3: Frontend Web (Next.js + React)
- [ ] Authentication pages (login, register, forgot password)
- [ ] Dashboard dengan KPI widgets
- [ ] Work Order list & detail pages
- [ ] Create/edit work order form
- [ ] User management interface
- [ ] Assignment calendar view
- [ ] Reports & analytics page

### Phase 4: Mobile App (Flutter)
- [ ] Authentication (login dengan biometric support)
- [ ] Work order list (dengan filter/search)
- [ ] Work order detail & update status
- [ ] Photo capture & upload
- [ ] GPS location tracking
- [ ] Offline sync mechanism
- [ ] Push notifications

### Phase 5: Real-time Features
- [ ] WebSocket implementation untuk live updates
- [ ] Push notification system (Firebase Cloud Messaging)
- [ ] Real-time assignment notifications
- [ ] Live chat/comments feature

### Phase 6: Advanced Features & Optimization
- [ ] Analytics dashboard dengan charts
- [ ] Report generation (PDF export)
- [ ] Maintenance history & equipment tracking
- [ ] Performance optimization & caching
- [ ] Security hardening & penetration testing

### Phase 7: Testing & Deployment
- [ ] Unit tests (backend & frontend)
- [ ] Integration tests
- [ ] E2E tests (Playwright/Cypress untuk web)
- [ ] Performance testing & load testing
- [ ] Staging deployment & QA
- [ ] Production deployment & monitoring

---

## Technical Decisions

| Aspect | Choice | Reasoning |
|--------|--------|-----------|
| API Framework | Next.js API Routes | Monolithic setup, easier deployment |
| ORM | Prisma | Type-safe, great DX, excellent migration tools |
| Auth | NextAuth.js + JWT | Flexible, secure, easy integration |
| File Storage | AWS S3 / Minio | Scalable, secure, CDN-ready |
| Real-time | Socket.io / Firebase | Easy WebSocket implementation |
| Mobile State | Riverpod / GetX | Reactive, easy-to-use state management |
| Testing | Jest + Vitest | Fast, comprehensive coverage |
| Deployment | Docker + Docker Compose | Consistent environments |

---

## Non-Functional Requirements

- **Performance**: API response < 200ms, mobile app smooth animations (60fps)
- **Scalability**: Support 500+ concurrent users
- **Availability**: 99.5% uptime SLA
- **Security**: OWASP Top 10 compliance, end-to-end encryption untuk file
- **Backup**: Daily automated backups, disaster recovery plan
- **Monitoring**: Error tracking (Sentry), analytics (PostHog/Mixpanel)
- **Accessibility**: WCAG 2.1 AA compliance for web

---

## Deployment Strategy

1. **Local Development**: Docker Compose (backend, db, redis)
2. **Staging**: Docker + managed PostgreSQL
3. **Production**: 
   - Backend: Cloud provider (AWS ECS, Google Cloud Run, atau DigitalOcean App Platform)
   - Database: Managed PostgreSQL (AWS RDS, Google Cloud SQL)
   - File Storage: AWS S3
   - CDN: CloudFront / Cloudflare
   - Mobile: Apple App Store + Google Play Store

---

## Success Criteria

- ✅ Aplikasi fully functional dengan semua core features
- ✅ Mobile app dapat offline sync
- ✅ 95%+ test coverage untuk critical paths
- ✅ Response time < 200ms untuk 95% API calls
- ✅ Mobile app battery efficient (< 5% CPU when idle)
- ✅ User can create & complete work order dalam < 5 menit
- ✅ Staff menerima assignment notification dalam < 5 detik
