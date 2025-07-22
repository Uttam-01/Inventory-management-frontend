# 📦 Inventory Management Admin Panel (Frontend)

A modern, role-based Inventory Management Admin Panel built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **TanStack Query**, and **Zod**. It enables administrators to efficiently manage vendors, materials, inventory, and user roles in a modular and scalable architecture.

---

## 🚀 Tech Stack

| Category     | Technology                  |
|--------------|-----------------------------|
| Frontend     | Next.js 14 (App Router)     |
| Language     | TypeScript                  |
| Styling      | Tailwind CSS                |
| Forms        | Zod                         |
| Data Fetching| TanStack Query (React Query)|
| API Client   | Axios                       |
| State Mgmt   | Zustand  

---

## 📁 Folder Structure

```
.
├── app/                       # Next.js App Router pages and routing
│   ├── layout.tsx            # Root layout with common UI
│   └── page.tsx              # Main dashboard or landing
│   └── [routes]/             # Feature-based routes (inventory/, vendor/, etc.)
├── components/               # UI and domain-specific components
│   ├── layout/               # Navbar, sidebar, footer
│   ├── ui/                   # Buttons, modals, loaders
│   └── shared/               # Generic reusable components
├── lib/
│   ├── hooks/                # Custom hooks (API, logic)
│   ├── constants/            # Role mappings, routes, etc.
│   ├── schemas/              # Zod schemas and types.
│   └── store/                # Zustand store.
├── public/                   # Static assets (images, icons)
├── store/                    # Zustand or global state
├── styles/ or globals.css    # Tailwind/global CSS
├── ErrorBoundary.tsx         # Global error handling component
├── RoleProtection.tsx        # Role-based access component
├── types/                    # Custom TypeScript types/interfaces
└── ...
```

---

## 🧩 Key Features

- ✅ **Role-Based Access Control** using `RoleProtection.tsx`
- 🧠 **Zod-Based Form Validation** for reliability and type safety
- ♻️ **Global Data Caching and Refetching** using TanStack Query
- 💥 **Error Boundaries** to gracefully catch rendering errors
- 📦 **Dynamic API Integration** with clear separation of concerns
- 🔍 **Vendor, Machine and Component Filtering**
- 🔁 **Material In/Out, allotment Management**
- ⚙️ **Work Order and Inventory Oversight**

---

## 📸 Screenshots (Adding Soon)
---

## 🧪 Project Modules

| Module                 | Description                                      |
|------------------------|--------------------------------------------------|
| `vendor/`              | Vendor add/edit, filtering, list view            |
| `inventory/`           | Material IN/OUT with status tracking             |
| `auth/`                | Admin login/authentication (with token support) |
| `user-account-management/` | Role assignment, user list, access protection |
| `work-order-master/`   | Work order creation and tracking (WIP)          |
| `product-price-comparison/` | Price checking between vendors (if used)    |

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/inventory-admin-frontend.git
cd inventory-admin-frontend
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set environment variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_API_BASE_URL=https://your-backend-url.com/api
```

### 4. Run development server

```bash
npm run dev
# or
yarn dev
```

Visit `http://localhost:3000` in your browser.

---

## 🧰 Scripts

| Command        | Description                     |
|----------------|---------------------------------|
| `npm run dev`  | Starts development server        |
| `npm run build`| Builds production-ready app      |
| `npm run start`| Starts the production server     |
| `npm run lint` | Runs ESLint for code quality     |

---

## 🧑‍💻 Developer Notes

- Always use `queryClient.invalidateQueries` after create/update/delete operations.
- Wrap protected pages with `RoleProtection` and define allowed roles.
- Use `ErrorBoundary` at route/page level to capture and display fallback UI.
- Keep Zod schemas close to form logic and ensure validation on both client and server (if backend also supports it).
- Create modular API hooks using Axios for each domain (vendor, inventory, auth, etc.).

---

## 🌍 Deployment

This app can be deployed to:

- **Vercel** (Next.js native)
- **Netlify** (with configuration)
- **Docker + Nginx** (for containerized environments)

*Add specific steps once backend integration is complete.*

---

## 💡 Improvements Planned

- [ ] Add pagination to large lists (TanStack pagination)
- [ ] Add dark mode toggle
- [ ] Unit tests with `Jest + React Testing Library`
- [ ] SSR-friendly authentication (for protected server-rendered pages)
- [ ] Global toast notifications for feedback

---

## 📄 License

This project is under the [MIT License](LICENSE).

---

## 👤 Author

**Uttam Sharma**  
Frontend Developer | MERN | TypeScript | Spring Boot  
GitHub: [@Uttam-01](https://github.com/Uttam-01)  
LinkedIn: ([https://linkedin.com/in/your-profile](https://www.linkedin.com/in/uttamsharma1234/))  
Email: uttam95081@gmail.com

---
