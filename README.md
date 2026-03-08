<div align="center">

![BookShop Logo](frontend/public/images/BookShop%20-%20logo.svg)

</div>

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?logo=spring-boot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java-ED8B00?logo=openjdk&logoColor=white)](https://www.java.com/)
[![React](https://img.shields.io/badge/React_19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)
[![Zod](https://img.shields.io/badge/Zod-3E67B1?logo=zod&logoColor=white)](https://zod.dev/)
[![AWS](https://custom-icon-badges.demolab.com/badge/AWS-%23FF9900.svg?logo=aws&logoColor=white)](https://aws.amazon.com/)
[![Vercel](https://img.shields.io/badge/Vercel-black?logo=vercel&logoColor=white)](https://vercel.com/)

</div>

---

<h1 align="center">BookShelf</h1>

<p align="center">A modern, full-stack digital library platform for book enthusiasts. Manage your personal book collection, discover new reads, track your reading progress, and organize your literary journey — all in one beautifully designed application.</p>

## ✨ Features

- **🏠 Landing Page**: Modern, responsive homepage with hero section and recently added books
- **🔐 User Authentication**: Secure login and sign-up with Spring Security and JWT
- **📚 Book Management**: Add books with ISBN, title, author, cover upload, and synopsis
- **📖 Collection Dashboard**: Personal library with statistics, search, edit, and delete functionality
- **🌐 Book Discovery**: Browse books across categories with advanced filtering and sorting
- **📤 Drag & Drop Upload**: Intuitive book cover upload with drag-and-drop or file selection
- **☁️ File Storage**: AWS S3 integration for book cover and image hosting
- **📱 Responsive Design**: Mobile-first approach with modern UI components
- **🎨 Dark Theme**: Sleek dark mode design with golden and purple accents
- **🔍 Smart Search**: Search by title, author, or ISBN across your collection and the store
- **📊 Reading Stats**: Track total books, currently reading, read this year, and pages logged

## 🚀 Tech Stack

### Frontend

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript, React 19
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI (30+ components)
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts
- **Fonts**: Inter (sans-serif), JetBrains Mono (monospace)

### Backend

- **Framework**: Spring Boot 3.x
- **Language**: Java 17
- **Database**: H2 (development), PostgreSQL (production)
- **Authentication**: Spring Security + JWT
- **File Storage**: AWS S3
- **API Documentation**: Swagger / OpenAPI
- **Build Tool**: Gradle

## 📁 Project Structure

```
BookShop/
├── frontend/                     # Next.js frontend application
│   ├── app/                      # App router pages
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Landing page
│   │   ├── login/page.tsx        # Login page
│   │   ├── signup/page.tsx       # Sign up page
│   │   ├── browse/page.tsx       # Browse library
│   │   ├── collection/page.tsx   # User's book collection
│   │   └── add-book/page.tsx     # Add new book
│   ├── components/
│   │   ├── bookshop/             # Custom BookShop components
│   │   │   ├── navbar.tsx        # Navigation bar (public & auth)
│   │   │   ├── footer.tsx        # Footer component
│   │   │   ├── login-form.tsx    # Login form
│   │   │   ├── signup-form.tsx   # Sign up form
│   │   │   ├── add-book-form.tsx # Add book with drag-drop
│   │   │   ├── collection-dashboard.tsx  # Collection management
│   │   │   ├── browse-content.tsx        # Book browsing & filters
│   │   │   ├── hero-section.tsx          # Landing hero section
│   │   │   ├── recently-added.tsx        # Recently added books
│   │   │   └── cta-section.tsx           # Call-to-action section
│   │   ├── ui/                   # shadcn/ui components
│   │   └── theme-provider.tsx    # Theme provider
│   ├── hooks/                    # Custom React hooks
│   ├── lib/                      # Utility functions
│   └── public/images/            # Static assets & book covers
├── backend/                      # Spring Boot API
│   ├── src/main/java/
│   │   └── com/bookshop/
│   │       ├── controller/       # REST controllers
│   │       ├── service/          # Business logic
│   │       ├── model/            # Entity models
│   │       ├── repository/       # Data access
│   │       └── config/           # Security & app configuration
│   ├── src/main/resources/
│   │   └── application.properties
│   └── build.gradle              # Gradle configuration
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 18+ and npm
- Java 17+ JDK
- PostgreSQL database (optional for production)
- Gradle (wrapper included)

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run at `http://localhost:3000`

### Backend Setup

```bash
cd backend
./gradlew bootRun
```

The backend API will run at `http://localhost:8080`

## 🌐 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Books

- `GET /api/books` - Get all books
- `GET /api/books/{id}` - Get book details
- `POST /api/books` - Add a new book
- `PUT /api/books/{id}` - Update a book
- `DELETE /api/books/{id}` - Delete a book
- `GET /api/books/search` - Search books by title, author, or ISBN

### Collection

- `GET /api/collection` - Get user's book collection
- `POST /api/collection` - Add book to collection
- `DELETE /api/collection/{id}` - Remove book from collection
- `GET /api/collection/stats` - Get reading statistics

### Users

- `GET /api/users/{id}` - Get user profile
- `PUT /api/users/{id}` - Update user profile

## 🗄️ Database Schema

Key entities include:

- **Users**: User profiles and authentication data
- **Books**: Book details, ISBN, cover, and descriptions
- **Collection**: User-book relationships and reading status
- **Categories**: Book categorization (Fiction, Non-Fiction, Sci-Fi, Mystery, Biography)
- **ReadingStats**: Progress tracking and reading history

## 📝 Pages

- `/` - Landing page with hero and featured books
- `/login` - User login with email/password
- `/signup` - User registration
- `/browse` - Browse all books with category filters, ratings, and sorting
- `/collection` - Personal book collection dashboard
- `/add-book` - Add a new book to your collection

## 🎨 UI Components

Built with modern, accessible components:

- Responsive navigation with public and authenticated variants
- Book cards with genre tags and rating badges
- Category filters (Fiction, Non-Fiction, Sci-Fi & Fantasy, Mystery, Biography)
- Sort options (Newest, Best Rating, A-Z, Z-A)
- Collection table with search, edit, and delete actions
- Drag-and-drop file upload for book covers
- Toast notifications for user feedback
- Code-editor styled sign-up form

## 🔧 Development

### Frontend Development

```bash
npm run dev          # Start development server (Turbo)
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
```

### Backend Development

```bash
./gradlew bootRun    # Start with hot reload
./gradlew test       # Run tests
./gradlew build      # Build production JAR
```

## 📦 Deployment

### Frontend (Vercel)

1. Connect GitHub repository to Vercel
2. Set build command: `cd frontend && npm run build`
3. Set output directory: `frontend/.next`
4. Configure environment variables
5. Deploy automatically on push to main

### Backend Deployment

1. Configure PostgreSQL connection string
2. Set environment variables (JWT secret, DB credentials, AWS S3 keys)
3. Configure AWS S3 bucket for image storage
4. Build JAR: `./gradlew build`
5. Deploy to cloud provider (AWS, Azure, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Martin Lumumba**

- GitHub: [@Martinlmb3](https://github.com/Martinlmb3)
- Project: [BookShop](https://github.com/Martinlmb3/BookShop)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the React framework
- [Spring Boot](https://spring.io/projects/spring-boot) for the backend framework
- [shadcn/ui](https://ui.shadcn.com) for the component library
- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [Lucide](https://lucide.dev) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com) for styling
- [AWS S3](https://aws.amazon.com/s3/) for file storage

---

**BookShop** - Your personal digital library, beautifully organized. 📚✨
