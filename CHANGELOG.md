# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### 0.1.1 (2025-08-03)


### Features

* add (prisma) support for RHEL and Debian OpenSSL 3.0.x binary targets ([5d51c6d](https://github.com/AlexOluwaseyi/leave-itt/commit/5d51c6dcdfcfa1f67ad9b09990533b9ade889839))
* Add AccessControlWrapper and useSessionUrlManager for role-based access control and URL rewriting. ([d59d26c](https://github.com/AlexOluwaseyi/leave-itt/commit/d59d26cedb0348cc3a5cd9f313311e64ef34a173))
* Add admin dashboard with booking settings, team members management, and special days configuration ([1f5398e](https://github.com/AlexOluwaseyi/leave-itt/commit/1f5398e482d62f43cbfdc8e8ff8ce2b20cd7bba2))
* Add binaryTargets configuration for Prisma client generator ([ba7856a](https://github.com/AlexOluwaseyi/leave-itt/commit/ba7856a3f43b4f103f581c7c4994e3e2b967ad9f))
* Add deployment status badges for production and development in README ([b46ec63](https://github.com/AlexOluwaseyi/leave-itt/commit/b46ec6361a978a4e4979e8dfebad480931015855))
* Add Password Reset Modal and API integration for password updates ([a29d61a](https://github.com/AlexOluwaseyi/leave-itt/commit/a29d61a75ec6ab64a5d054b6b06353e2d611b19c))
* Add Profile component with user details and booking history. ([515e7d6](https://github.com/AlexOluwaseyi/leave-itt/commit/515e7d698152b271078b39238e254f4c017e888b))
* Add Profile link to navigation menu ([441af46](https://github.com/AlexOluwaseyi/leave-itt/commit/441af46d520689f2cd883cd110a42ac2f2d9992c))
* Complete frontend implementation (desktop and mobile). ([95657ef](https://github.com/AlexOluwaseyi/leave-itt/commit/95657ef841f990a812c800d9b071328934ac8bc1))
* Enhance AdminDashboard to handle API errors with toast notifications and remove mock team members data ([284b462](https://github.com/AlexOluwaseyi/leave-itt/commit/284b462d5a28799c61155d1ac77748c06f3ebd1a))
* Enhance user management modals with team fetching and role-based access controls ([eb99ac0](https://github.com/AlexOluwaseyi/leave-itt/commit/eb99ac029e3c616ae048506dd46225c0255617d9))
* Implement admin dashboard. ([1fd85cd](https://github.com/AlexOluwaseyi/leave-itt/commit/1fd85cdcc5e124e1cc820173ad4e66756648a15b))
* Implement authentication and session. ([1836ce0](https://github.com/AlexOluwaseyi/leave-itt/commit/1836ce08f0d569c46849dae382f1bc46289bc75d))
* Implement booking management API with GET and POST endpoints for fetching and creating bookings ([e589051](https://github.com/AlexOluwaseyi/leave-itt/commit/e589051965e6a14b55435b6eb6745ff060c22e6b))
* Implement booking management functions and add Bookings type definition ([f7380be](https://github.com/AlexOluwaseyi/leave-itt/commit/f7380beef4ce2ff97769f5271046ea4d252ca217))
* Implement dashboard statistics, users and teams management functions. ([6187279](https://github.com/AlexOluwaseyi/leave-itt/commit/6187279e276117a08fac2e06ce997b4613e18ef5))
* Implement DELETE API for team management and enhance data fetching in TeamMembersContent ([50b9f2d](https://github.com/AlexOluwaseyi/leave-itt/commit/50b9f2d11bf03dcc9515dbcc39c3901fd200557c))
* Implement prisma client to fetch user from database for real implementation. ([d365919](https://github.com/AlexOluwaseyi/leave-itt/commit/d3659190b6cf9d336fc8d99361f7998ff25e0eef))
* Reached checkpoint - initial completion of UI ([46e3e42](https://github.com/AlexOluwaseyi/leave-itt/commit/46e3e4265fe9c6552af0c44c8e58c1e400e30460))
* Refactor BookingHistory component to fetch bookings and teams data from API, and add date parsing utility. ([59286cc](https://github.com/AlexOluwaseyi/leave-itt/commit/59286ccaffda72d348a9c91e3a9dcc97f43fda2b))
* Refactor mock data and types. ([6a7e345](https://github.com/AlexOluwaseyi/leave-itt/commit/6a7e3458de842c2f8b18ea347903d024a611e850))
* Refactor modals. ([5ec4eb0](https://github.com/AlexOluwaseyi/leave-itt/commit/5ec4eb0bc432c6a00c6bb28d93dfa5123604af96))
* Refactor TeamMembersContent to enhance user management with improved fetching, filtering, and sorting functionalities. ([9ade697](https://github.com/AlexOluwaseyi/leave-itt/commit/9ade697eb37f268f929431045bd36e83b367a501))
* Revise auto PR workflow conditions and clean up eslint configuration ([34f7450](https://github.com/AlexOluwaseyi/leave-itt/commit/34f745005d2987f16981508f31d176cc715fe21a))
* Set up and prisma client. ([fbd6eb1](https://github.com/AlexOluwaseyi/leave-itt/commit/fbd6eb1fed944c4abdd5477af9d4156f5e4358c6))
* Set up API routes ([26907d1](https://github.com/AlexOluwaseyi/leave-itt/commit/26907d131adf6e2e183fc89052c1ffe07a36d4dd))
* Set up authentication. ([c069fde](https://github.com/AlexOluwaseyi/leave-itt/commit/c069fdeed248d0678ddd6a595ee35610c4a176e1))
* Set up dashboard for admin overview. ([ee9542c](https://github.com/AlexOluwaseyi/leave-itt/commit/ee9542ca82fdf9dbaa93dc6f7219762bcc55d65f))
* Set up folder for modals to add members (single user or bulk users), and book leave. ([0248506](https://github.com/AlexOluwaseyi/leave-itt/commit/0248506e6f32dcdf07bb5d9a02ff48eb184b547d))
* Set up leave booking periods (usage undefined yet). ([4627ca1](https://github.com/AlexOluwaseyi/leave-itt/commit/4627ca1b404c384467455e86edf84f6aade8412c))
* Set up middleware to protect routes. ([afd2488](https://github.com/AlexOluwaseyi/leave-itt/commit/afd2488bc5cd501dede9d0fa4eb63d2b45ca95f1))
* Set up page to display all team members, activate/disable (or suspend) team members account as admin. ([f05cf09](https://github.com/AlexOluwaseyi/leave-itt/commit/f05cf093dff3259f50b9483c5297d604be4e670c))
* Set up session provider for app, used session provider in root layout. ([a10d1f7](https://github.com/AlexOluwaseyi/leave-itt/commit/a10d1f751963e04c14ff139a3974a933bd4d3a2c))
* Set up sign in page, use authentication from Auth.js v5 with credentials provider. ([4ff700e](https://github.com/AlexOluwaseyi/leave-itt/commit/4ff700e6694dab668a076e8626702db4866ccd1a))
* Setup calendar folder, moved Big Calendar and Custom Calendar Toolbar component. ([888b23c](https://github.com/AlexOluwaseyi/leave-itt/commit/888b23c45b21023c05d0a05e0f9e5ddefd3cbf86))
* Setup component to review leave booking history for team member on a monthly basis. ([1c4547e](https://github.com/AlexOluwaseyi/leave-itt/commit/1c4547ed5118e73c59c05fb38b113039fdfb454b))
* Setup contexts for sidebar, theme and also hook to check viewport size for responsive design. ([9778202](https://github.com/AlexOluwaseyi/leave-itt/commit/9778202836ca7a5bcd5f1fdd4ca380a946ca3e35))
* Setup folder for desktop sidebar, mobile header and footer. ([6d4a66d](https://github.com/AlexOluwaseyi/leave-itt/commit/6d4a66d741419d40685dbd73d51d7dcb2c9ae966))
* Setup mock data and interfaces ([9cfa33b](https://github.com/AlexOluwaseyi/leave-itt/commit/9cfa33b122ae9b72a96febe55e8675ae69c78e76))
* Setup pages and routes for different parts of app. ([ec91db8](https://github.com/AlexOluwaseyi/leave-itt/commit/ec91db84351ad709efa884b88720720959a6c3ef))
* Setup prisma database models. ([c7c64c8](https://github.com/AlexOluwaseyi/leave-itt/commit/c7c64c8f177875563388069b63d791348dd9e3f9))
* Setup settings page, include settings for bookings and special days (allowing for multiple leave application on same day. ([f75fca3](https://github.com/AlexOluwaseyi/leave-itt/commit/f75fca36dac25abe0df75a2237ae936749daf137))
* Setup up 'ui' folder and moved 'TabButton' component for better folder organization ([bbf3f75](https://github.com/AlexOluwaseyi/leave-itt/commit/bbf3f7565bfd89016cd84220e66e3067eb5b3351))
* Update .gitignore and eslint configuration to exclude additional file types and directories ([fa4c84a](https://github.com/AlexOluwaseyi/leave-itt/commit/fa4c84a64dabb414e7e1064bf14433dfdb2f7d03))
* Update authentication logic to use MockUsers for user validation and improve inactive (mock) user handling ([3b3f6f7](https://github.com/AlexOluwaseyi/leave-itt/commit/3b3f6f71b1cc613340eee4b8444fffdbc9c4cef6))
* Update import statements to use NavLinks from types for consistency in MobileFooterNav and Sidebar components ([b3a89b3](https://github.com/AlexOluwaseyi/leave-itt/commit/b3a89b357a178cb0e72ef6c8afce701069458fc9))
* Wrap AdminDashboard, BookingHistory, Settings, and TeamMembersContent with AccessControlWrapper for role-based access control and URL rewriting. ([228f12c](https://github.com/AlexOluwaseyi/leave-itt/commit/228f12c9bc1073e18e8fdbb8ca04a61adf45bcd4))


### Bug Fixes

* Clean up comments, usused imports and unnecessary codes. ([3304c00](https://github.com/AlexOluwaseyi/leave-itt/commit/3304c00a4c6f94fd6aea6742108430f877107128))
* clean up whitelines ([ed05a9d](https://github.com/AlexOluwaseyi/leave-itt/commit/ed05a9d9415a63f7f5cd3964360ff99bff1549bf))
* Contrast issue with current day. ([5f82b2d](https://github.com/AlexOluwaseyi/leave-itt/commit/5f82b2d031efec2e697f35bf45c44df37c7debe8))
* Error in sign in page component. ([2fa7b63](https://github.com/AlexOluwaseyi/leave-itt/commit/2fa7b6304e867ad698a6c514ea465522e7280046))
* Layout issue on home with Big Calendar components. ([1c00119](https://github.com/AlexOluwaseyi/leave-itt/commit/1c00119c33f429e0d82b3f8ea060bb35dd48929e))
* Reconfigure authentication configuration. ([420652f](https://github.com/AlexOluwaseyi/leave-itt/commit/420652f74be5ab8e2cf74a0ad5f19d8fb2f43960))
* Remove case sensitivity in username field on sign in page. ([7a8a360](https://github.com/AlexOluwaseyi/leave-itt/commit/7a8a360f667b0f70a10e9326c798c6cbf482aa10))
* Resolve 'Link' import error in sidebar component. ([7278e3d](https://github.com/AlexOluwaseyi/leave-itt/commit/7278e3d7c18220acf3faeea24c637cfaf847404d))
* Resolve issue with sign-in page. ([785756f](https://github.com/AlexOluwaseyi/leave-itt/commit/785756f6e84b8b0dd8f07f036893e14f62c6695c))
* Resolve issue with team members content page. ([cc203b5](https://github.com/AlexOluwaseyi/leave-itt/commit/cc203b55ddfa3500d7b4aceb14b57f85a4e13b3c))
* Resolve issue with using 'dark:' directive from TailwindCSS. ([cb69057](https://github.com/AlexOluwaseyi/leave-itt/commit/cb69057ec1ed6203ba053ea63e1c50eb45c2eb72))
* Revise signOut in header and sidebar, redirect user to sign in page after signing out. ([7208c33](https://github.com/AlexOluwaseyi/leave-itt/commit/7208c3305a571474458b22bd8c8b35e0f6da2bea))
* Set up logo and name as link to homepage on sidebar. ([99af406](https://github.com/AlexOluwaseyi/leave-itt/commit/99af406975d91afbf615133e7a0315407f523d55))
* Text contrast issues on dark mode. ([3ed28a1](https://github.com/AlexOluwaseyi/leave-itt/commit/3ed28a114a18ea7cdd34deba24b34a224d6cd514))
* Update and use 'dark:' directive from TailwindCSS for theme switching. ([9540603](https://github.com/AlexOluwaseyi/leave-itt/commit/95406032c4052f2a500c3df4d9cadbfc898e0e90))
* Update API route handlers to use NextRequest for improved request handling ([be660b9](https://github.com/AlexOluwaseyi/leave-itt/commit/be660b998209be6dd8c9f5a63e96509b87c4baa8))
* Update app name, to uppercase. ([a6f05a8](https://github.com/AlexOluwaseyi/leave-itt/commit/a6f05a83da3e2ea6d29f8357b7d3f6e7ec944943))
* Update layout for TeamMembersContent component to improve button alignment on desktop view. ([d33778a](https://github.com/AlexOluwaseyi/leave-itt/commit/d33778a22cfa0e66ca02c3cbb4c0c0753238a73a))
* Update Menu, Sidebar and MobileHeader Components ([6f8db4e](https://github.com/AlexOluwaseyi/leave-itt/commit/6f8db4e0becaab6259dc068483fd2070c3972735))
* Update mockUser in mock data, replace with 'user' object with username and password to test sign in. ([103d39c](https://github.com/AlexOluwaseyi/leave-itt/commit/103d39c41bcc9916c43c72c353829f1b69b69cb5))
* Update theme mode changes in background for leave booking modal. ([39d8ea6](https://github.com/AlexOluwaseyi/leave-itt/commit/39d8ea65bc10e0d91e6fd106ae7eadbbc43e38d7))
* Update z-index in sidebar. ([723217d](https://github.com/AlexOluwaseyi/leave-itt/commit/723217df19dfc389385e90bf541d6d67a9f6e0b5))

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Initial release]

### Added
- Initial project setup
- Core functionality implementation
- Basic documentation
- Configuration files
- Project structure

### Changed
- N/A

### Deprecated
- N/A

### Removed
- N/A

### Fixed
- N/A

### Security
- N/A



[Initial release]