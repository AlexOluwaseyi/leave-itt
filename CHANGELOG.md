# Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.3] - 2025-08-05

### 🚀 Features

#### UI Redesign

- Redesigned UI for modals and sign-in page with improved user experience
- Enhanced Profile component with comprehensive user and booking data fetching
- Added loading states and error handling for better user feedback

#### Access Control

- Enhanced access control logic in AdminDashboard to support both ADMIN and MANAGER roles
- Updated fallback routes for different user roles for better navigation flow

### 🔄 Refactor

#### Data Management

- Implement polling with setInterval for repeated database fetching at intervals
- Update booking data fetching to only occur when user is authenticated
- Remove unused router logic and access control checks from AccessControlWrapper component

### 🐛 Bug Fixes

#### Error Handling

- Improved error handling and error message throwing from functions and API routes
- Enhanced error feedback throughout the application with better toast implementations

#### Component Management

- Fix modal success callback prop names for consistency across components
- Resolve booking data fetching issues with proper authentication checks

---

## [0.1.2] - 2025-08-03

### 🐛 Bug Fixes

#### Data fetching and component re-rendering

- Fix page re-rendering on home page due to incorrect useEffect implementation

---

## [0.1.1] - 2025-08-03

### 🚀 Features

#### Authentication & Authorization

- Implement NextAuth.js authentication with credentials provider
- Add role-based access control with AccessControlWrapper
- Add session management and URL rewriting
- Implement middleware for route protection

#### User Management

- Add admin dashboard with user and team management
- Implement bulk user import via CSV
- Add user profile component with password reset functionality
- Support for user status management (active/inactive)

#### Leave Booking System

- Implement booking management with calendar integration (React Big Calendar)
- Add booking history and statistics
- Support for leave approval workflows
- Implement booking periods and special days configuration

#### Dashboard & Interface

- Complete responsive UI implementation (desktop and mobile)
- Add dark/light theme support
- Implement admin dashboard with statistics
- Add settings page for booking configuration

#### Database & API

- Set up Prisma ORM with PostgreSQL
- Implement comprehensive API routes for users, teams, and bookings
- Add database models for users, teams, bookings, and settings
- Support for RHEL and Debian OpenSSL 3.0.x binary targets

---

### 🐛 Bug Fixes

#### UI/UX Improvements

- Fix dark mode text contrast issues
- Resolve calendar layout and styling problems
- Fix responsive design issues on mobile
- Improve button alignment and component layouts

#### Authentication & Security

- Remove case sensitivity in username field
- Fix sign-in page redirect issues
- Improve session handling and logout functionality

#### Code Quality

- Clean up unused imports and unnecessary code
- Fix TypeScript import errors
- Improve error handling across components
- Update API route handlers for better request handling

---

### 📝 Documentation

- Add deployment status badges
- Update README with project information
- Add comprehensive changelog documentation

---

##

[0.1.3]: https://github.com/alexoluwaseyi/leave-itt/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/alexoluwaseyi/leave-itt/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/alexoluwaseyi/leave-itt/releases/tag/v0.1.1
