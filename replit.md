# Overview

DocuTutor is an AI-powered educational platform designed to help students learn more effectively by generating custom study materials from their documents. The application allows users to upload PDF files and automatically generates quizzes, flashcards, and study guides using AI technology. It features mood-based study sessions, progress tracking, and a study journal to create a comprehensive learning environment.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The frontend is built using **React with TypeScript** and follows a component-based architecture:

- **UI Framework**: React with TypeScript for type safety and component reusability
- **Styling**: Tailwind CSS with a custom design system featuring teal and coral color schemes, CSS variables for theming
- **Component Library**: Radix UI primitives with shadcn/ui for consistent, accessible UI components
- **Routing**: React Router for client-side navigation between different study modules
- **State Management**: React Query (TanStack Query) for server state management and caching
- **Build Tool**: Vite for fast development and optimized production builds

The frontend implements a modular page structure with dedicated sections for:
- Dashboard (overview and quick access)
- Quiz Generation (PDF upload and AI quiz creation)
- Flashcards (interactive study cards)
- Study Guides (comprehensive study materials)
- Progress Tracking (analytics and performance metrics)
- Study Journal (reflection and motivation tracking)

## Backend Architecture

The backend follows a **Node.js/Express** server architecture:

- **Server Framework**: Express.js with TypeScript for type-safe server development
- **Development Setup**: Custom Vite integration for seamless full-stack development
- **Storage Interface**: Abstracted storage layer with in-memory implementation (MemStorage class)
- **Route Structure**: Modular route registration system with API prefix convention
- **Error Handling**: Centralized error handling middleware with structured error responses

The storage interface is designed for extensibility, currently implementing an in-memory solution but structured to easily swap in database implementations.

## Data Storage Solutions

- **Database ORM**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Schema Management**: Centralized schema definitions in shared directory with Zod validation
- **Migration System**: Drizzle Kit for database migrations and schema management
- **Current Implementation**: In-memory storage for development, with database infrastructure ready for production

The user schema includes basic authentication fields (username, password) with room for expansion.

## Authentication and Authorization

The application includes infrastructure for user management:
- User schema with unique username constraints
- Password-based authentication preparation
- Session management infrastructure (connect-pg-simple for PostgreSQL sessions)
- Storage methods for user creation and retrieval

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL serverless driver for database connectivity
- **drizzle-orm & drizzle-kit**: Database ORM and migration tools
- **@tanstack/react-query**: Server state management and caching
- **react-router-dom**: Client-side routing
- **zod**: Runtime type validation and schema definition

### UI and Styling
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

### Development Tools
- **vite**: Build tool and development server
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production builds
- **@replit/vite-plugin-***: Replit-specific development enhancements

### Additional Libraries
- **date-fns**: Date manipulation and formatting
- **react-hook-form**: Form state management
- **embla-carousel-react**: Carousel/slider components
- **nanoid**: Unique ID generation
- **cmdk**: Command palette functionality