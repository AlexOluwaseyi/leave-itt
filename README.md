# LEAVE-IT

A modern leave management system built with Next.js, designed to streamline employee leave booking and records.

---
**Production:**
[![Netlify Status](https://api.netlify.com/api/v1/badges/034ecc4a-733b-4ad6-af54-261edfe61b68/deploy-status)](https://app.netlify.com/projects/leave-it/deploys)
**Development:**
[![Netlify Status](https://api.netlify.com/api/v1/badges/034ecc4a-733b-4ad6-af54-261edfe61b68/deploy-status?branch=dev)](https://app.netlify.com/projects/leave-it/deploys)

## 📖 Storyline

**The Problem:**
In many organizations today, managing employee leave requests is a chaotic manual process. Employees submit leave requests through chat applications like WhatsApp or Microsoft Teams, creating a scattered trail of messages that's difficult to track and manage. Managers find themselves scrolling through endless chat histories, trying to piece together who requested what dates, when requests were made, and whether they've been approved or denied. This leads to:

- **Missed requests** buried in chat threads
- **Double bookings** when multiple employees request the same critical dates
- **No centralized record** of leave history or patterns
- **Time-consuming manual tracking** for managers
- **Poor visibility** into team availability and leave balances

**The Solution:**
Leave-It eliminates this chaos by providing a centralized, digital platform where:

- **Employees** can easily select and request leave dates through an intuitive calendar interface
- **Managers** get a clear dashboard to review, approve, or deny requests with full context
- **Administrators** have complete oversight with analytics and team management tools
- **Everyone** benefits from a permanent, searchable record of all leave activities

**The Impact:**
No more lost requests in chat threads. No more manual spreadsheet tracking. Just a streamlined, professional leave management system that scales with your organization's needs.  

&nbsp;

*"From chat chaos to organized clarity - Leave-It transforms how your team manages time off."*

---

## 🚀 Features

- **Role-Based Authentication**: Secure login system with Admin, Manager, and Member roles
- **Leave Management**: Request, approve, and track leave applications
- **Calendar Integration**: Visual calendar view powered by React Big Calendar
- **User Management**: Admin dashboard for managing users and teams
- **Bulk Import**: CSV import functionality for adding multiple users
- **Dashboard Analytics**: Statistics and insights for leave patterns
- **Dark/Light Theme**: Toggle between themes for better user experience
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Cloud storage**: Neon
- **Authentication**: Auth.js v5
- **UI Components**: React Big Calendar, Lucide Icons
- **Deployment**: Netlify

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm/yarn/pnpm/bun

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/.git
   cd 
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   ```bash
   touch .env
   ```

   Update `.env` with your database URL and authentication secrets:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/leaveitt"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"
   AUTH_SECRET="your-auth-secret"
   ```

4. **Set up the database**

   ```bash
   npx prisma migrate dev
   npx prisma db seed  # Optional: seed with sample data
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📊 Default Roles & Access

- **Admin**: Full system access, user management, system settings.
- **Manager**: Team management, team leave requests, add new members to team(s).
- **Member**: Book leave days, view own leave history, manage own profile (password reset).

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 📁 Project Structure

```bash
src/
├── app/                # Next.js 14 app router
│   ├── api/            # API routes
│   ├── auth/           # Authentication pages
│   ├── dashboard/      # Dashboard page
│   ├── history/        # Booking history page
│   ├── profile/        # Profile page
│   ├── settings/       # Settings page 
│   └── teams/          # Team management page
├── components/         # Reusable components
│   ├── calendar/       # Calendar components
│   ├── menu/           # Sidebar and header components
│   ├── modals/         # Modal components
│   └── ui/             # UI components
├── context/            # Custom context managers
├── hooks/              # Custom hooks
├── lib/                # Utility functions
├── types/              # TypeScript type definitions
└── hooks/              # Custom hooks
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<!-- ## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Prisma](https://prisma.io/) for database management
- [NextAuth.js](https://next-auth.js.org/) for authentication
- [React Big Calendar](https://jquense.github.io/react-big-calendar/) for calendar functionality -->
