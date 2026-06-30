# Kevin Kipkoech — Professional Booking Website

A modern, full-stack booking website built with Next.js 15, TypeScript, Tailwind CSS, Prisma & PostgreSQL.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env.local` and update values:
```bash
cp .env.example .env.local
```

Update at minimum:
- `DATABASE_URL` — your PostgreSQL connection string
- `SESSION_SECRET` — random 32+ character string
- `ADMIN_USERNAME` / `ADMIN_PASSWORD` — your admin credentials

### 3. Set Up Database
```bash
# Push schema to database
npm run prisma:push

# Seed admin user
npx prisma db seed
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
app/
  (main)/           # Public pages with navbar/footer
    page.tsx        # Home page
    book/           # Booking page
  admin/            # Admin dashboard (protected)
    login/
    dashboard/
  api/              # API routes
    bookings/
    admin/
components/
  sections/         # Home page sections
  ui/               # Shared UI components
lib/                # Utilities, validation, DB client
prisma/             # Database schema & seed
public/             # Static assets
```

---

## 🔑 Admin Access

1. Navigate to `/admin/login`
2. Use credentials from your `.env.local`
3. Default: `admin` / `Admin@2024!` *(change this!)*

### Admin Features
- View all bookings with search & filter
- Update booking status (Pending → Confirmed → Completed)
- Delete bookings
- Export to Excel
- WhatsApp customers directly
- Live statistics dashboard

---

## 📦 Deployment (Vercel)

### 1. Push to GitHub
```bash
git init && git add . && git commit -m "initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

### 2. Deploy on Vercel
- Import your GitHub repository on [vercel.com](https://vercel.com)
- Add all environment variables from `.env.example`
- Deploy!

### 3. Post-Deploy: Create Admin
Visit `https://your-domain.com/api/admin/setup` once to create the admin account.

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 15 | Full-stack framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Prisma | ORM |
| PostgreSQL | Database |
| iron-session | Authentication |
| Zod | Validation |
| xlsx | Excel export |
| react-hot-toast | Notifications |

---

## 📞 Contact

**Kevin Kipkoech**
- WhatsApp: [+254 740 272 542](https://wa.me/254740272542)
- Email: admin@yourdomain.com
