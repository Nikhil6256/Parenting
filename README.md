# 🌿 Rise With Rupali — Parenting Coach & Course Platform

A full-stack parenting coach website and course-selling platform built with **Next.js 14**, **MongoDB**, **Razorpay**, **Cloudinary**, and **Bunny.net**.

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Razorpay account (test keys)
- Cloudinary account (free tier is fine)

### 2. Clone & Install

```bash
cd rise-with-rupali
npm install
```

### 3. Set Up Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in your values:

| Variable | Description |
|---|---|
| `MONGODB_URI` | Your MongoDB Atlas connection string |
| `NEXTAUTH_URL` | `http://localhost:3000` for local dev |
| `NEXTAUTH_SECRET` | Any random 32+ char string |
| `RAZORPAY_KEY_ID` | From Razorpay Dashboard → API Keys |
| `RAZORPAY_KEY_SECRET` | From Razorpay Dashboard |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Same as RAZORPAY_KEY_ID (client-side) |
| `CLOUDINARY_CLOUD_NAME` | From Cloudinary Dashboard |
| `CLOUDINARY_API_KEY` | From Cloudinary Dashboard |
| `CLOUDINARY_API_SECRET` | From Cloudinary Dashboard |
| `BUNNY_LIBRARY_ID` | Your Bunny.net Video Library ID |
| `BUNNY_CDN_HOSTNAME` | Your Bunny.net CDN hostname |
| `SMTP_HOST` | `smtp.gmail.com` (or your SMTP provider) |
| `SMTP_USER` | Your email address |
| `SMTP_PASS` | Gmail App Password (not your main password) |
| `OWNER_EMAIL` | Where to receive contact notifications |
| `SEED_OWNER_EMAIL` | Owner account email |
| `SEED_OWNER_PASSWORD` | Initial owner password |

### 4. Seed the Owner Account

```bash
npm run seed
```

This creates the single owner account. **Change the password after first login!**

### 5. Run Development Server

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 📁 Folder Structure

```
rise-with-rupali/
├── app/
│   ├── (public)/           # Public pages (Home, About, Courses, Blog, Contact)
│   ├── (auth)/             # Login & Signup pages
│   ├── (customer)/         # Protected customer routes
│   │   ├── my-courses/     # Customer course dashboard
│   │   ├── checkout/       # Razorpay checkout
│   │   └── profile/        # Profile management
│   ├── admin/              # Owner-only admin dashboard
│   │   ├── courses/        # Course CRUD
│   │   ├── orders/         # Orders view
│   │   ├── customers/      # Customer list
│   │   └── blog/           # Blog CRUD
│   └── api/                # All API routes
├── components/
│   ├── layout/             # Navbar, Footer, AdminSidebar, CustomerSidebar
│   ├── home/               # Hero, About, Featured Courses, Testimonials, FAQ, CTA
│   └── courses/            # BuyButton, CourseSidebar
├── lib/                    # Utilities (mongoose, auth, razorpay, cloudinary, mail)
├── models/                 # Mongoose models (User, Course, Order, BlogPost, ContactMessage)
├── scripts/                # Seed scripts
└── types/                  # TypeScript type definitions
```

---

## 🔐 Role-Based Access

| Role | Access |
|---|---|
| **Owner** | `/admin/**`, all API routes |
| **Customer** | `/my-courses/**`, `/profile`, `/checkout/**` |
| **Guest** | All public pages, signup/login |

- Middleware protects routes **server-side** — customers get 403 if they hit admin API routes directly
- Owner account can only be created via the seed script (not public signup)

---

## 💳 Payment Flow (Razorpay)

1. Student clicks "Buy Now" on course page
2. If not logged in → redirect to login → back to checkout
3. Checkout page calls `POST /api/orders/create` (server-side Razorpay order)
4. Razorpay modal opens in browser
5. On payment success, frontend calls `POST /api/orders/verify`
6. Server verifies HMAC-SHA256 signature
7. On success: order marked `paid`, course added to student's `purchasedCourses`, confirmation email sent
8. Student redirected to `/my-courses`

---

## 🎥 Bunny.net Video Integration

1. Upload videos to your Bunny.net video library
2. Copy the embed URL: `https://iframe.mediadelivery.net/embed/{libraryId}/{videoId}`
3. Paste this URL in the "Bunny video URL" field when creating/editing lessons in the admin
4. The course player renders it in a responsive iframe

---

## 📸 Cloudinary Image Upload

For course thumbnails and blog covers:
1. Get your Cloudinary API credentials from your dashboard
2. Upload images directly to Cloudinary
3. Copy the secure URL (`https://res.cloudinary.com/...`)
4. Paste in the thumbnail URL field in admin

---

## 🛠️ Admin Dashboard

**URL:** `/admin` (owner only)

| Page | Description |
|---|---|
| Dashboard | Revenue, courses, students stats + recent orders |
| Courses | Create/edit/delete courses with curriculum builder |
| Orders | View all purchases with payment status |
| Students | Browse registered customers |
| Blog | Write and publish blog posts |

---

## 📚 Customer Dashboard

**URL:** `/my-courses` (logged in customers)

| Page | Description |
|---|---|
| My Courses | All purchased courses with continue button |
| Course Player | Video player (Bunny embed), lesson navigation |
| Profile | Update name, change password |

---

## 🌐 SEO

- Dynamic `generateMetadata` on course and blog pages
- `sitemap.xml` auto-generated from DB
- `robots.txt` blocks admin/api/private routes
- Semantic HTML throughout
- Open Graph tags on all pages

---

## 📧 Contact Form

Contact form submissions are:
1. Validated with Zod (server-side)
2. Saved to MongoDB (`ContactMessage` collection)
3. Emailed to `OWNER_EMAIL` via Nodemailer (optional — requires SMTP env vars)

---

## 🔑 Environment Variables Reference

See `.env.example` for the complete list. The minimum required to run locally:
- `MONGODB_URI`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `RAZORPAY_KEY_ID` + `RAZORPAY_KEY_SECRET` + `NEXT_PUBLIC_RAZORPAY_KEY_ID`

---

## 📜 License

Private project — Rise With Rupali. All rights reserved.
