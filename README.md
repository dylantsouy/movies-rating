# 🎮 Movies Rating

A modern, responsive movie information platform built with **Next.js** and **TMDB API**, inspired by streaming platforms like Netflix. Explore trending movies, cast details, and actor filmographies with rich UI and smooth UX.

---

## 📝 Table of Contents

- [About](#about)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Development Guidelines](#development-guidelines)
- [Code Quality & Formatting](#code-quality--formatting)
- [Pre-commit Hooks](#pre-commit-hooks)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Authors](#authors)

---

## 😮 About <a name="about"></a>

**Movies Rating** is a full-featured movie browsing platform where users can:

- Discover trending and top-rated movies via **TMDB API**
- View detailed cast information and actor filmographies
- Experience a responsive Netflix-style UI using shadcn and Tailwind CSS
- Enjoy fast data loading with API caching powered by React Query

The project emphasizes **performance**, **code quality**, and **modern web practices**.

---

## ⛏️ Tech Stack <a name="tech-stack"></a>

| Category          | Stack                                                                         |
| ----------------- | ----------------------------------------------------------------------------- |
| **Framework**     | [Next.js (App Router)](https://nextjs.org/)                                   |
| **Language**      | [TypeScript](https://www.typescriptlang.org/)                                 |
| **Styling**       | [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/) |
| **UI Components** | [Lucide Icons](https://lucide.dev/)                                           |
| **State / Data**  | [React Query](https://tanstack.com/query)                                     |
| **Lint / Format** | ESLint, Prettier, TypeScript ESLint, Commitizen                               |
| **Deployment**    | [Vercel](https://vercel.com/)                                                 |

---

## 🚀 Getting Started <a name="getting-started"></a>

### 1. Clone the project

```bash
git clone https://github.com/dylantsouy/movies-rating.git
cd movies-rating
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🛠 Development Guidelines <a name="development-guidelines"></a>

- ✅ Use functional components and TypeScript types
- 📦 Group reusable components under `src/components/`
- 📁 Organize API functions under `src/lib/utils/`
- 💡 Follow the import alias convention: `@/` → `src/`
- 🔠 Keep UI components presentational and pure

---

## 📏 Code Quality & Formatting <a name="code-quality--formatting"></a>

- **Linting**: ESLint with TypeScript, React, React Hooks, import/order, A11y, and Prettier plugins
- **Formatting**: Prettier with custom configuration (2-space indent, single quote, trailing commas off)
- **Import Order**: Enforced with pathGroups (`react`, `next/**`, `@/**`, `~/**`)

### Commands

```bash
npm run lint        # Lint all files
npm run lint:fix    # Auto-fix lint issues
npm run format      # Format files with Prettier
npm run check-types # Type checking
```

---

## 🧪 Pre-commit Hooks <a name="pre-commit-hooks"></a>

- **Husky** + **lint-staged** for automatic lint/format on commit
- **Commitizen** + custom adapter for conventional commit messages
- **Commitlint** to enforce commit message structure

### Sample Commit

```
feat(auth): add login page layout

- Implemented login/logout flow with JWT authentication
- Optimized for mobile-first experience

BREAKING CHANGE: N/A
Closes: N/A
Refs: N/A
Signed-off-by: Dylan Tsou <bear817005@gmail.com>
```

---

## 🚀 Deployment <a name="deployment"></a>

This project is ready to deploy on [Vercel](https://vercel.com/) with zero config. Just connect your GitHub repo and deploy!

```bash
npm run build
npm start
```

---

## 🤝 Contributing <a name="contributing"></a>

PRs and Issues are welcome. Please follow the code style and use `npm run lint && npm run format` before pushing.

---

## 👨‍💼 Authors <a name="authors"></a>

- **Dylan Zou** – [GitHub @dylantsouy](https://github.com/dylantsouy)

---
