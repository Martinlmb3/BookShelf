<div align="center">

![BookShelf Logo](frontend/public/images/BookShelf%20-%20logo.svg)

</div>

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js_14-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot_3.5.5-6DB33F?logo=spring-boot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java_17-ED8B00?logo=openjdk&logoColor=white)](https://www.java.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)
[![Zod](https://img.shields.io/badge/Zod-3E67B1?logo=zod&logoColor=white)](https://zod.dev/)
[![Vercel](https://img.shields.io/badge/Vercel-black?logo=vercel&logoColor=white)](https://vercel.com/)

</div>

---

<h1 align="center">BookShelf</h1>

<p align="center">A modern, full-stack digital library platform for book enthusiasts. Manage your personal book collection, discover new reads, track your reading progress, and organize your literary journey — all in one beautifully designed application.</p>

## ✨ Features

- **🏠 Landing Page** — Modern homepage with hero section and recently added books
- **🔐 Authentication** — Email/password with JWT, email verification, and planned Google & Apple OAuth
- **📚 Book Management** — Add books with ISBN, title, author, cover upload, and synopsis
- **📖 Collection Dashboard** — Personal library with statistics, search, edit, and delete
- **❤️ Wishlist & Liked** — Save books to wishlist and mark favourites
- **🌐 Book Discovery** — Browse books across categories with filtering and sorting
- **📤 Book Upload** — Upload books with cover images
- **🤖 AI Chat** — Ask questions about a selected book via AI
- **📱 Responsive Design** — Mobile-first with dark theme and golden/purple accents

## 🚀 Tech Stack

### Frontend Stack

| Technology | Details |
| --- | --- |
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui + Radix UI |
| State / Data fetching | React Query (`@tanstack/react-query`) |
| HTTP client | Axios |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |

### Backend Stack

| Technology | Details |
| --- | --- |
| Framework | Spring Boot 3.5.5 |
| Language | Java 17 |
| Database | PostgreSQL |
| Authentication | Spring Security + JWT (HS256) |
| Email | Spring Mail (SMTP / Gmail) |
| API docs | Springdoc OpenAPI / Swagger UI |
| Build tool | Gradle |

## 📁 Project Structure

```text
BookShelf/
├── frontend/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                  # Landing page
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   ├── browse/page.tsx
│   │   ├── collection/page.tsx
│   │   ├── add-book/page.tsx
│   │   ├── ask-my-book/page.tsx      # AI book chat
│   │   └── documentation/page.tsx
│   ├── components/
│   │   ├── bookshop/                 # App-specific components
│   │   │   ├── navbar.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── login-form.tsx        # Email/password + OAuth buttons
│   │   │   ├── signup-form.tsx       # Email/password + OAuth buttons
│   │   │   ├── hero-section.tsx
│   │   │   ├── recently-added.tsx
│   │   │   ├── cta-section.tsx
│   │   │   ├── browse-content.tsx
│   │   │   └── collection-dashboard.tsx
│   │   └── ui/                       # shadcn/ui components
│   ├── services/
│   │   ├── api/
│   │   │   ├── axios.ts              # Axios instance with JWT interceptor
│   │   │   ├── book.ts
│   │   │   └── user.ts
│   │   └── auth/
│   │       ├── auth.ts               # useLogin / useSignup React Query hooks
│   │       └── storage.ts            # Token storage utilities
│   ├── schemas/
│   │   ├── auth.schema.ts            # Zod schemas for login and signup
│   │   └── user.schema.ts
│   └── lib/
│       ├── utils.ts
│       ├── wishlist.ts
│       └── liked.ts
├── backend/
│   └── src/main/java/com/martin/library/
│       ├── configuration/            # Security, JWT filter, app config
│       ├── user/
│       │   ├── controller/           # AuthenticationController, UserController
│       │   ├── service/              # AuthenticationService, JwtService
│       │   ├── model/
│       │   ├── repository/
│       │   ├── dto/request/
│       │   └── responses/
│       ├── book/
│       ├── uploadBook/
│       ├── genre/
│       ├── userBook/
│       ├── liked/
│       └── whishlist/
├── docs/
│   └── auth-guide.md
└── README.md
```

## 🛠️ Setup

### Prerequisites

- Node.js 18+
- Java 17+ JDK
- PostgreSQL running on port 5432 with a database named `bookshelf`

### Backend Setup

Create `backend/.env`:

```env
JWT_SECRET_KEY=your-base64-encoded-secret
JWT_EXPIRATION_TIME=3600000
SUPPORT_EMAIL=you@gmail.com
APP_PASSWORD=your-gmail-app-password
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
```

```bash
cd backend
gradlew.bat bootRun   # Windows
./gradlew bootRun     # Linux / Mac
```

Server runs at `http://localhost:8080`
Swagger UI: `http://localhost:8080/swagger-ui/index.html`

### Frontend Setup

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:3000`

## 🌐 API Endpoints

### Authentication (no token required)

| Method | Path | Body / Params | Returns |
| --- | --- | --- | --- |
| POST | `/auth/signup` | `{ username, email, password }` | User object |
| POST | `/auth/login` | `{ email, password }` | `{ token, expiresIn }` |
| POST | `/auth/verify` | `{ email, verificationCode }` | 200 OK |
| POST | `/auth/resend` | `?email=` | 200 OK |

### Books (JWT required)

| Method | Path | Description |
| --- | --- | --- |
| GET | `/books` | All books |
| GET | `/books/{id}` | Book by ID |
| POST | `/books` | Create book |
| PUT | `/books/{id}` | Update book |
| DELETE | `/books/{id}` | Delete book |

## 🔐 Auth Flow

```text
Signup  →  email verification (6-digit code)  →  Login  →  JWT stored in localStorage
All requests  →  axios interceptor adds  Authorization: Bearer <token>
401 response  →  token removed  →  redirect to /login
```

### Planned: OAuth 2.0

- Google Sign-In — via Spring Security OAuth2 client
- Apple Sign-In — via Apple Developer Services

See [docs/auth-guide.md](docs/auth-guide.md) for the full implementation plan.

## 📦 Deployment

### Frontend — Vercel

1. Connect GitHub repository to Vercel
2. Set root directory: `frontend`
3. Add environment variable: `NEXT_PUBLIC_API_URL=https://your-api-domain.com`
4. Deploy on push to `main`

### Backend — Self-hosted

1. Provision a PostgreSQL database
2. Set all environment variables from `backend/.env`
3. Build: `./gradlew build`
4. Run the JAR or deploy to any JVM-compatible host (Railway, Render, AWS, etc.)

## 📝 Documentation

Internal docs live in [`docs/`](docs/):

- [`auth-guide.md`](docs/auth-guide.md) — Auth system, known bugs, localStorage vs cookies, Google & Apple OAuth implementation

## 👨‍💻 Author

**Martin Lumumba**

- GitHub: [@Martinlmb3](https://github.com/Martinlmb3)
- Project: [BookShop](https://github.com/Martinlmb3/BookShop)

---

BookShelf — your personal digital library, beautifully organized. 📚
