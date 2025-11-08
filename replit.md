# EcoSphere AI

## Overview

EcoSphere AI is a full-stack sustainability tracking web application that helps users monitor their carbon footprint, discover eco-friendly routes, and receive AI-powered recommendations for sustainable living. The platform features gamification elements (points, badges, leaderboards) to encourage environmental consciousness and includes city-level aggregated insights for urban optimization.

**Tech Stack:**
- Frontend: React with TypeScript, Vite, Wouter (routing), TanStack Query
- UI Framework: shadcn/ui components with Radix UI primitives, Tailwind CSS
- Backend: Express.js with TypeScript
- Database: PostgreSQL via Neon serverless with Drizzle ORM
- Charts: Chart.js for data visualization
- Maps: Leaflet.js for route mapping
- Session Management: express-session with in-memory store

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Component-Based React Application**: The application follows a modular component structure with reusable UI components organized in `/client/src/components/`. Page-level components are in `/client/src/pages/`.

**Routing Strategy**: Uses Wouter for lightweight client-side routing. Protected routes are wrapped with a `ProtectedRoute` component that checks authentication status before rendering.

**State Management**: TanStack Query (React Query) handles server state with configured defaults for no automatic refetching. The query client is configured with custom fetch functions that handle authentication (401) responses.

**Authentication Pattern**: Session-based authentication using cookies. Auth state is managed through utility functions in `/client/src/lib/auth.ts` that interact with backend endpoints. A local `currentUser` variable caches the authenticated user.

**Design System**: Implements shadcn/ui with the "new-york" style variant. Uses CSS custom properties for theming with both light and dark mode support. Theme switching is client-side via localStorage.

**UI Component Library**: Extensive use of Radix UI primitives wrapped in shadcn/ui components for accessibility and consistent styling. All components use Tailwind CSS with custom design tokens defined in `/client/src/index.css`.

### Backend Architecture

**Express Server**: Node.js server using ES modules with TypeScript. The server setup includes session middleware, JSON parsing, and custom logging.

**Session Management**: Uses `express-session` with an in-memory store (`memorystore`). Sessions persist for 7 days with HTTP-only cookies. In production, cookies use the `secure` flag. Express is configured with `app.set('trust proxy', true)` to properly recognize HTTPS connections behind Replit's reverse proxy, ensuring secure cookies work correctly in production deployments.

**Authentication**: Password hashing uses Node's `scrypt` with random salts. Passwords are stored as `hash.salt` format. Timing-safe comparison prevents timing attacks during login.

**Route Protection**: Middleware function `requireAuth` checks for `req.session.userId` before allowing access to protected endpoints.

**Storage Layer Abstraction**: The `/server/storage.ts` file defines an `IStorage` interface and implements all database operations, providing a clean separation between business logic and data access.

### Database Architecture

**ORM Choice**: Drizzle ORM selected for type-safe database operations with PostgreSQL. Schema definitions are co-located in `/shared/schema.ts` for sharing between client and server.

**Database Provider**: Neon serverless PostgreSQL with WebSocket support for serverless environments. Connection pooling is handled via `@neondatabase/serverless` package.

**Schema Design**:
- **users**: Core user accounts (id, username, hashed password, city)
- **userMetrics**: Gamification data (green points, CO2 saved, level, rank, badges count, challenges)
- **activities**: Activity log for carbon tracking (type, CO2 impact, points earned, metadata as JSON)
- **globalStats**: Aggregated platform statistics (total users, CO2 saved, cities)
- **badges**: User achievements (badge type, title, description, unlock date)

**Data Relationships**: Foreign key constraints with cascade deletes ensure referential integrity. User metrics and activities are tied to users and automatically cleaned up when users are deleted.

**Schema Validation**: Zod schemas generated from Drizzle tables via `drizzle-zod` provide runtime validation for inserts and updates.

### API Design

**RESTful Endpoints**:
- `/api/auth/register` - User registration with validation
- `/api/auth/login` - Session-based login
- `/api/auth/logout` - Session termination
- `/api/user/metrics` - Fetch user gamification stats
- `/api/user/activities` - Activity history
- `/api/leaderboard` - Global rankings
- `/api/global-stats` - Platform-wide statistics

**Error Handling**: Validation errors are converted to readable messages using `zod-validation-error`. API responses follow consistent JSON format with error messages.

**Data Flow**: Client components use TanStack Query hooks to fetch data. Mutations trigger cache invalidation to keep UI in sync. The query client wraps fetch calls with credential inclusion for session cookies.

### Build and Development

**Development Mode**: Vite dev server runs in middleware mode within Express, enabling HMR while preserving API routes. The setup uses dynamic imports for Replit-specific plugins.

**Production Build**: Two-step process:
1. Vite builds client bundle to `/dist/public`
2. esbuild bundles server code to `/dist`

**TypeScript Configuration**: Shared tsconfig uses `bundler` module resolution with path aliases for `@/` (client), `@shared/` (shared), and `@assets/` (assets).

**Path Aliases**: Consistent import paths across the application reduce relative import complexity and improve refactoring.

## External Dependencies

### UI and Component Libraries
- **shadcn/ui**: Pre-built accessible components based on Radix UI
- **Radix UI**: Unstyled, accessible component primitives (40+ packages including Dialog, Dropdown, Toast, etc.)
- **Tailwind CSS**: Utility-first CSS framework with PostCSS processing
- **Lucide React**: Icon library for consistent iconography
- **class-variance-authority**: Type-safe component variant API
- **cmdk**: Command palette component

### Data Visualization
- **Chart.js**: Canvas-based charting library for carbon footprint visualization
- **react-chartjs-2**: React wrapper for Chart.js with TypeScript support
- **Leaflet.js**: Interactive map library for eco-route visualization

### Forms and Validation
- **React Hook Form**: Performant form state management
- **Zod**: TypeScript-first schema validation
- **@hookform/resolvers**: Zod integration for React Hook Form

### Backend Services
- **Neon Database**: Serverless PostgreSQL with WebSocket support
- **Drizzle ORM**: Type-safe SQL query builder and migration tool
- **express-session**: Session middleware for Express
- **memorystore**: In-memory session store (note: not suitable for production at scale)

### Development Tools
- **Vite**: Build tool and dev server with HMR
- **TypeScript**: Type safety across frontend and backend
- **esbuild**: Fast JavaScript bundler for server code
- **Replit Plugins**: Development tooling for Replit environment (cartographer, dev banner, runtime error overlay)

### Routing and Data Fetching
- **Wouter**: Lightweight routing library (~1.5KB)
- **TanStack Query**: Async state management and data synchronization

### Future Considerations
The application currently uses an in-memory session store which will not persist across server restarts or scale horizontally. For production, consider migrating to `connect-pg-simple` (already installed) to store sessions in PostgreSQL, or use Redis for better performance.