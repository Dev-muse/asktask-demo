# AskTask Demo

A dynamic Next.js 15 application that consumes a GraphQL API to display tasks, with authentication via email/password or Google OAuth. Users can browse public tasks and view their own tasks in the admin dashboard.

---

## About

AskTask Demo allows users to:

- Browse a list of public tasks from a GraphQL API
- Login via email/password or Google OAuth
- View and manage their own tasks in an admin dashboard
- Sort tasks by status
- See error messages and loading states for better UX
- Benefit from a performant Next.js App Router setup with server-side data fetching

The app is styled with [DaisyUI](https://daisyui.com) and follows Next.js best practices.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Dev-muse/asktask-demo.git
cd asktask-demo
```

## 2. Install dependencies

```bash
npm install
# or
yarn
# or
pnpm install
```

## 3. Set up environment variables

Copy .env.example to .env and fill in your credentials:
```bash
cp .env.example .env
```

## Edit .env:
GRAPHQL_ENDPOINT=https://asktask-api.stagelab.co.uk/graphql
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXTAUTH_SECRET=your-random-secret


## 4. Run the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Features

- **Task Browsing:** View all public tasks
- **User Authentication:** Email/password and Google OAuth login
- **Admin Dashboard:** View and manage user-specific tasks
- **Sorting:** Sort tasks by status (A-Z, Z-A)
- **Server-Side Rendering:** Data fetched on the server for performance
- **Error Handling:** Graceful handling of API errors
- **Responsive Styling:** Built with DaisyUI for easy customization


## Folder Structure
```bash
app/           # Pages and routes
components/    # Reusable components (Navbar, LoginForm, TaskList, LoginButton, etc.)
lib/           # GraphQL helpers (graphql.ts, queries.ts)
types/         # TypeScript type definitions
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/getting-started/introduction)
- [GraphQL Docs](https://graphql.org/learn/)
- [DaisyUI](https://daisyui.com)


## Deployment

The easiest way to deploy this app is using [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme).  
For more details, see the [Next.js Deployment Docs](https://nextjs.org/docs/app/building-your-application/deploying).
