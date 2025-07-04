# UltraShip Employee Manager – Full Stack GraphQL App

A modern, full stack employee management platform built with **React + Chakra UI (frontend)** and **Node.js + GraphQL + MongoDB (backend)**.

Built for performance, modularity, and beautiful UX, this app demonstrates scalable GraphQL API design, real-time UI updates, role-based access, and elegant view switching (grid/tile/detail modals).

---

## Live Demo & Code

- Frontend: [https://ultraship-tms.vercel.app/](https://ultraship-tms.vercel.app/)  
- Backend: [https://ultraship-tms.onrender.com/graphql](https://ultraship-tms.onrender.com/graphql)  
- GitHub Repo: [https://github.com/sehbanalam/UltraShip-TMS](https://github.com/sehbanalam/UltraShip-TMS)
- Postman Collection: [UltraShip-TMS API (Postman)](https://sehbanalam-120993.postman.co/workspace/My-Workspace~25d6bf71-89b2-48f2-8829-21dc8216ed77/collection/46451924-6d4f9386-1b66-4207-a5ea-1cf0bba83055?action=share&source=copy-link&creator=46451924)

---

## Tech Stack

**Frontend**
- React (Vite)
- Chakra UI
- Apollo Client
- React Router
- Framer Motion 
- Vercel (deployment)

**Backend**
- Node.js + Express
- Apollo Server (GraphQL)
- MongoDB + Mongoose
- JWT Auth with role-based access
- Render (deployment)

---

## Features Overview

| Feature | Description |
|--------|-------------|
| Role-based login | Admin vs Employee routing & features |
| Navigation | Horizontal menu + Hamburger (draIr) menu |
| Grid view | Employee records with icon-enhanced rows |
| Tile view | Compact cards with edit/delete/details |
| Details modal | Popup showing full record (with icons) |
| Edit modal | Pre-filled form with update mutation |
| Add employee | Admin-only modal with validations |
| Delete employee | With confirmation and real-time UI refresh |
| Pagination & sorting | Handled via GraphQL API |
| Dark mode | Full theme support with Chakra |
| Animations | Framer motion-poIred tile/card transitions |

---

## How to Run Locally

### 1. Clone the repo:

```bash
git clone https://github.com/sehbanalam/UltraShip-TMS
cd UltraShip-TMS
```

### 2. Setup Backend (`/backend`)

```bash
cd backend
npm install
```

Create `.env` file:

```env
MONGODB_URI=mongodb+srv://...yourcluster
JWT_SECRET=your-secret-key
```

Run backend:

```bash
npm start
```

GraphQL Playground: [http://localhost:4000/graphql](http://localhost:4000/graphql)

---

### 3. Setup Frontend (`/frontend`)

```bash
cd ../frontend
npm install
```

Run frontend:

```bash
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

---

## Test User Credentials

| Role   | Email              | Password  |
|--------|--------------------|-----------|
| Admin  | admin@test.com     | admin123  |
| User   | employee@test.com  | emp123    |

> You can register new users from the register API (admin/employee roles).

---

## Assignment Requirements Coverage

From the provided assignment document:

### Frontend Criteria

- Hamburger menu with 1-level submenu → Chakra DraIr
- Horizontal menu → Chakra HStack with routing
- Grid view (10-col layout) → Responsive, icon-labeled
- Tile view (compact with buttons) → Framer motion + role-based controls
- Details view → Modal with icons and structured data
- Edit / Delete → Modals + GraphQL mutation
- Role access → Admin can edit/delete/add; Employee has view-only
- Beautiful UI → Chakra theming, dark mode, hover effects, spacing

### Backend Criteria

- GraphQL API with:
  - `getEmployees(page, limit, sortBy)`
  - `getEmployee(id)`
  - `addEmployee`, `updateEmployee`, `deleteEmployee`
- MongoDB schema with: `id`, `name`, `age`, `class`, `subjects`, `attendance`
- JWT Auth and role-based access (`admin`, `employee`)
- Pagination & sorting supported
- Performance: Indexed queries, minimal field fetching
- Deployed on Render

---

## Folder Structure

```
UltraShip-TMS/
├── backend/
│   ├── models/
│   ├── resolvers/
│   ├── schema/
│   ├── index.js
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── apollo.ts
│   │   └── App.tsx
└── README.md
```

---

## What I’ve Done (Summary)

- Designed GraphQL schema and resolvers
- Added JWT authentication and role-based logic
- Built a modern React dashboard using Chakra UI
- Implemented reusable modals for view/edit
- Added framer motion and dark mode support
- Connected everything via Apollo Client
- Deployed backend (Render) and frontend (Vercel)
- Matched all assignment requirements (UI + functionality)
