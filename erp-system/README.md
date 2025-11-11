# ERP System

A comprehensive, production-ready Enterprise Resource Planning (ERP) system built with Next.js 14, TypeScript, and PostgreSQL. This system provides a complete business management solution with modern UI, real-time features, and scalable architecture.

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **ORM:** Prisma
- **Database:** PostgreSQL (for production), SQLite (for local development)
- **Authentication:** NextAuth.js
- **UI:** Tailwind CSS, shadcn/ui
- **Form Management:** React Hook Form, Zod
- **Containerization:** Docker

## Getting Started

### Prerequisites
- Node.js 18+
- Docker and Docker Compose

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd erp-system
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Set up environment variables**
    ```bash
    cp .env.example .env
    ```

    Update `.env` with your configuration. For local development, the `DATABASE_URL` is set to use SQLite.

4.  **Set up the database**
    ```bash
    npx prisma migrate dev
    ```

5.  **Start the development server**
    ```bash
    npm run dev
    ```

### Docker Deployment

To run the application using Docker (with a PostgreSQL database), use the following command:

```bash
docker-compose up --build
```
