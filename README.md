# Authentication App with Phone Verification

This project consists of a React frontend and a NestJS backend with phone verification using AWS SNS.

## Prerequisites

- Docker and Docker Compose installed on your machine
- AWS account with SNS access (for SMS functionality)

## Project Structure

```
.
├── frontend/          # React frontend
└── backend/          # NestJS backend
```

## Quick Start with Docker

1. First, create a `docker-compose.yml` file in the root directory:

```yaml
version: '3.8'

services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    ports:
      - "5173:5173"
    depends_on:
      - backend
    environment:
      - VITE_API_URL=http://localhost:3000

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    depends_on:
      - postgres
    environment:
      - DB_HOST=postgres
      - DB_PORT=5432
      - DB_USERNAME=postgres
      - DB_PASSWORD=postgres
      - DB_DATABASE=auth_db
      - AWS_ACCESS_KEY_ID=your_access_key_id
      - AWS_SECRET_ACCESS_KEY=your_secret_access_key
      - AWS_REGION=eu-west-3

  postgres:
    image: postgres:15-alpine
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=auth_db
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

2. Create `Dockerfile.frontend` in the root directory:

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
```

3. Create `Dockerfile` in the backend directory:

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
```

4. Update AWS credentials:
   - Open `docker-compose.yml`
   - Replace `your_access_key_id` and `your_secret_access_key` with your actual AWS credentials

5. Start the application:
```bash
docker-compose up --build
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- API Documentation: http://localhost:3000/api

## Development Without Docker

### Frontend

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

### Backend

1. Install dependencies:
```bash
cd backend
npm install
```

2. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the values with your configuration

3. Start development server:
```bash
npm run dev
```

## Features

- User registration with email and phone number
- Phone number verification via SMS
- Country selection with flags for phone numbers
- Form validation
- Responsive design
- PostgreSQL database
- AWS SNS integration for SMS

## API Documentation

Once the backend is running, visit http://localhost:3000/api to view the Swagger documentation.

## Security Notes

- Never commit `.env` files or AWS credentials
- Use environment variables for sensitive data
- Enable CORS only for trusted domains in production
- Use HTTPS in production
- Implement rate limiting for SMS verification