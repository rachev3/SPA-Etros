# Etros Basketball SPA - Project Documentation

## Project Overview

The Etros Basketball SPA is a single-page application built with React that serves as a comprehensive website for a basketball team named "Etros". The website provides information about the team, news, schedule, player details, and includes an administrative section for content management.

## Getting Started

Follow these steps to run the project locally:

1. **Clone the repository and navigate to project directory**

   ```bash
   cd etros-spa
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**

   - The application will be running at `http://localhost:5173`
   - You should see the Etros Basketball homepage
   - **Note**: The backend API may take 30 seconds to 1 minute to wake up on first request, as it's hosted on a free tier service that goes to sleep after inactivity

## Tech Stack

- **Frontend Framework**: React 19
- **Routing**: React Router 7
- **Styling**: Tailwind CSS 4
- **HTTP Client**: Axios
- **Date Management**: date-fns
- **Build Tool**: Vite 6

## Project Structure

```
etros-spa/
├── public/            # Static assets
├── src/               # Source code
│   ├── api/           # API integration modules
│   ├── components/    # React components organized by feature
│   ├── context/       # React context for state management
│   ├── hooks/         # Custom React hooks
│   ├── layout/        # Layout components
│   ├── services/      # Business logic services
│   ├── utils/         # Utility functions
│   ├── App.jsx        # Main application component
│   ├── App.css        # Global styles
│   └── main.jsx       # Application entry point
├── index.html         # HTML entry point
├── package.json       # Project dependencies and scripts
└── vite.config.js     # Vite configuration
```

## Key Features

1. **Public-Facing Pages**:

   - Home page with team highlights, latest news, upcoming matches, and sponsors
   - Team roster and player details
   - Match schedule and match details
   - News section with articles
   - About page

2. **Authentication System**:

   - User registration
   - User login
   - Protected routes

3. **Admin Panel**:
   - News management (create, update, delete articles)
   - Matches management (schedule, results)
   - Players management (roster, profile information)
   - Player statistics management

## Routing Structure

The application uses React Router for navigation with the following route structure:

### Public Routes

- `/` - Home page
- `/team` - Team roster
- `/team/player/:id` - Individual player profile
- `/schedule` - Match schedule
- `/match/:id` - Individual match details
- `/news` - News listings
- `/news/article/:id` - Individual news article
- `/about` - About the team
- `/login` - Login page (accessible only to non-authenticated users)
- `/register` - Registration page (accessible only to non-authenticated users)

### Admin Routes

- `/admin` - Admin dashboard (default: news management)
- `/admin/news` - News management
- `/admin/matches` - Matches management
- `/admin/players` - Players management
- `/admin/player-statistics` - Player statistics management

## State Management

The application uses React Context API for state management:

- `UserContext` - Manages user authentication state, provides login and logout functionality

## API Integration

The application communicates with a backend API through the following modules:

- `authApi.js` - Authentication operations (login, register, profile)
- `articleApi.js` - News article operations
- `playerApi.js` - Player information operations
- `matchApi.js` - Match scheduling and results operations
- `playerStatsApi.js` - Player statistics operations
- `commentApi.js` - User comments operations

## Component Organization

Components are organized by feature/page:

- `Admin/` - Administrative interface components
- `Auth/` - Authentication components
- `Home/` - Homepage components
- `News/` - News-related components
- `Team/` - Team roster and player components
- `Match/` - Match details components
- `Schedule/` - Schedule-related components
- `About/` - About page components
- `Navigation/` - Header navigation components
- `Footer/` - Footer components
- `shared/` - Reusable UI components

## Security and Authentication

The application implements authentication using JWT tokens:

- Tokens are stored in localStorage
- Protected routes redirect unauthenticated users
- Admin routes are restricted to admin users only

## Development Workflow

To work with this project:

1. **Installation**:

   ```
   npm install
   ```

2. **Development Server**:

   ```
   npm run dev
   ```

3. **Build for Production**:

   ```
   npm run build
   ```

4. **Preview Production Build**:
   ```
   npm run preview
   ```

## Future Enhancements

Potential areas for future development:

1. Implement real-time updates for match scores
2. Add user comments and interaction features on news articles
3. Enhance player statistics visualization
4. Add multi-language support
5. Implement performance optimizations for image loading
