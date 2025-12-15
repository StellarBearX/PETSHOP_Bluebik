# Pet Shop Application

A full-stack application with Next.js frontend and Kotlin backend using PostgreSQL.

## Project Structure

```
PETSHOP_Bluebik/
├── frontend/          # Next.js + Tailwind CSS
├── backend/           # Kotlin + Ktor + PostgreSQL
├── docker-compose.yml # PostgreSQL database setup
└── README.md
```

## Prerequisites

- Node.js 18+ and npm/yarn
- JDK 17+
- Docker and Docker Compose (for PostgreSQL)
- Gradle 8.5+ (optional, for generating wrapper)

## Setup Instructions

### 1. Database Setup

Start PostgreSQL using Docker Compose:

```bash
docker-compose up -d
```

This will start a PostgreSQL database on `localhost:5432` with:
- Database: `petshop`
- User: `postgres`
- Password: `postgres`

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

**First-time setup:** If you have Gradle installed, generate the wrapper:

```bash
gradle wrapper --gradle-version 8.5
```

If you don't have Gradle installed, you can download it from https://gradle.org/install/ or use the wrapper jar directly (download from Gradle releases).

Run the backend application:

```bash
./gradlew run
```

Or on Windows:

```bash
gradlew.bat run
```

The backend will start on `http://localhost:8080`

### 3. Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will start on `http://localhost:3000`

## Environment Variables

### Backend

Create a `.env` file in the `backend` directory or set environment variables:

```bash
DATABASE_URL=jdbc:postgresql://localhost:5432/petshop
DB_USER=postgres
DB_PASSWORD=postgres
```

## API Endpoints

- `GET /api/health` - Health check endpoint

## Technologies Used

### Frontend
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS

### Backend
- Kotlin
- Ktor (HTTP server)
- PostgreSQL
- HikariCP (Connection pooling)
- Gradle

## Development

### Frontend Development

```bash
cd frontend
npm run dev
```

### Backend Development

```bash
cd backend
./gradlew run
```

### Building for Production

#### Frontend
```bash
cd frontend
npm run build
npm start
```

#### Backend
```bash
cd backend
./gradlew build
./gradlew run
```

## License

MIT License - see LICENSE file for details

