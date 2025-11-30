# Mus Nguyen - Portfolio

A professional portfolio website built for the S5Tech Frontend Mentorship Program (Battle I).

![Portfolio Preview](https://via.placeholder.com/800x400/0a0a0f/6366f1?text=Mus+Nguyen+Portfolio)

## 🚀 Tech Stack

- **React 18** + **TypeScript** - Core framework
- **React Router v6** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework
- **Vite** - Next-generation frontend tooling
- **clsx** - Conditional class names utility
- **ESLint** + **Prettier** - Code quality tools

## ✨ Features

- 🎨 **Modern Dark Theme** - Professional and eye-catching design
- 🌊 **Smooth Animations** - Scroll-triggered fade-in effects
- 📱 **Fully Responsive** - Works on all device sizes
- ⚡ **Fast Performance** - Optimized with Vite
- 🔍 **SEO Friendly** - Proper meta tags and structure
- ♿ **Accessible** - Follows WCAG guidelines

## 📁 Project Structure

```
portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── icons/          # SVG icon components
│   │   ├── layout/         # Header, Footer, Layout
│   │   ├── sections/       # Page sections
│   │   └── ui/             # Reusable UI components
│   ├── data/               # Static data (experience, projects, etc.)
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Page components
│   ├── styles/             # Global CSS
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/muss5tech/portfolio.git

# Navigate to project directory
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

| Command           | Description               |
| ----------------- | ------------------------- |
| `npm run dev`     | Start development server  |
| `npm run build`   | Build for production      |
| `npm run preview` | Preview production build  |
| `npm run lint`    | Lint code with ESLint     |
| `npm run format`  | Format code with Prettier |

## 📝 Git Workflow

### Branch Naming Convention

```
[type]/[label]
```

Where:

- `type` = `feat` | `update` | `fix`
- `label` = `short-description-in-lowercase`

### Commit Guidelines

Each commit should be atomic and focused:

```bash
feat: initialize project with vite react-ts template
feat: configure tailwindcss and global styles
feat: setup eslint and prettier configuration
feat: add reusable ui components
feat: add layout components
feat: add portfolio data
feat: implement hero section with animations
feat: implement tech stack section
feat: implement experience timeline section
feat: implement projects section
feat: implement contact section
feat: setup react-router and page structure
feat: add scroll-triggered animations
update: polish ui and ensure responsive design
```

## 🎨 Design System

### Colors

| Variable               | Value     | Usage                     |
| ---------------------- | --------- | ------------------------- |
| `background-primary`   | `#0a0a0f` | Main background           |
| `background-secondary` | `#12121a` | Secondary background      |
| `accent-primary`       | `#6366f1` | Primary accent (Indigo)   |
| `accent-secondary`     | `#8b5cf6` | Secondary accent (Violet) |
| `foreground-primary`   | `#ffffff` | Primary text              |
| `foreground-secondary` | `#a1a1aa` | Secondary text            |

### Typography

- **Display Font**: Space Grotesk
- **Body Font**: Inter
- **Mono Font**: JetBrains Mono

### Animations

- `fade-in-up` - Default entrance animation
- `fade-in-down` - Top entrance animation
- `fade-in-left` / `fade-in-right` - Side entrance animations
- `glow` - Glowing effect for interactive elements
- `pulse-slow` - Online status indicator

## 📄 License

MIT License - feel free to use this as a template for your own portfolio!

## 🙏 Acknowledgments

- S5Tech for the mentorship opportunity
- Design inspiration from modern developer portfolios
- The React and TailwindCSS communities

---

Made with ❤️ by [Mus Nguyen](https://github.com/muss5tech)
