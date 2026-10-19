# QuickerStay 🏨

A production-ready, full-stack MERN (MongoDB, Express, React, Node.js) hotel booking application designed with modern user authentication, secure payment automation, real-time availability checks, and an automated transactional email pipeline.

---

## Core Features

### Client-Side Experience
- **Secure Authentication:** Integrated with **Clerk Auth** for zero-friction social logins (Google OAuth) and robust user profile management.

- **Dynamic Room Booking:** Interactive booking panel supporting dynamic guest counts, real-time price calculations, and immediate room-availability validation algorithms.

- **Persistent Activity Tracking:** Syncs search history across devices by saving recent destination searches to a database layer.

- **Comprehensive Booking Portal:** Dedicated client panel tracking reservation status, historical itineraries, and direct invoice routing.

### Property Owner Dashboard
- **Property Listing Management:** Comprehensive forms for owners to seamlessly list new properties, upload metadata, configure room metrics, and modify availability.

- **Financial Analytics Suite:** A real-time data aggregation engine tracking **Total Reservations**, **Total Revenue Accrued**, and granular order breakdowns.
- **Booking Management:** Live order tracking board reflecting payment completions and customer fulfillment workflows.

### Backend Architecture & Automated Pipelines
- **Secure Payment Gateway:** Configured with the **Stripe API** to execute sandbox checkouts utilizing cryptographic metadata binding.

- **Anti-Fraud Security Webhooks:** Handles asynchronous transaction confirmations via an Express raw buffer verification layer.

- **Transactional Email Pipeline:** Triggered asynchronously by **Nodemailer and Brevo (SMTP)** to send branded, no-reply booking confirmations equipped with custom call-to-action redirects.

---

## Technology Stack

- **Frontend:** React.js, Tailwind CSS, Vite, Clerk SDK, Axios, React Router Dom
- **Backend:** Node.js, Express.js, Mongoose ODM
- **Database:** MongoDB Atlas (Cloud Cluster)
- **Third-Party Integrations:** Stripe API, Brevo SMTP Service, Svix Webhook Verification

---

## Installation & Setup

### Prerequisites
Ensure you have **Node.js** and **npm** installed on your local machine.

### 1. Clone the Repository
```bash
git clone https://github.com
cd hotel-booking
```

### 2. Configure Environment Variables

Create a `.env` file in your `/server` directory:
```env
PORT=4000
MONGO_URI=your_mongodb_atlas_connection_string
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_signing_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_signing_secret
SENDER_EMAIL=your_verified_brevo_sender_email
SMTP_PASSWORD=your_brevo_smtp_key
VITE_FRONTEND_URL=http://localhost:5173
```

Create a `.env` file in your `/client` directory:
```env
VITE_BACKEND_URL=http://localhost:4000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### 3. Install Dependencies & Run Locally

**Start the Backend Server:**
```bash
cd server
npm install
npm run dev
```

**Start the Frontend Client:**
```bash
cd ../client
npm install
npm run dev
```

---

## Production Deployment

This architecture is optimized for cloud serverless hosting and is currently deployed live:
- **Frontend Client:** Hosted on **Vercel** with optimized production bundle caching.
- **Backend Server API:** Hosted on **Vercel / Render** with fully configured production CORS origins and global environment variable syncing.
- **Database Layer:** Hosted on **MongoDB Atlas** with dynamically whitelisted network access rules (`0.0.0.0/0`) for serverless environments.
