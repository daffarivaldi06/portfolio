# Daffa Ahmad Rivaldi — Personal Portfolio 🚀

[![Live Portfolio](https://img.shields.io/badge/Live%20Site-daffarivaldi06.github.io%2Fportfolio-blue?style=for-the-badge&logo=githubpages&logoColor=white)](https://daffarivaldi06.github.io/portfolio/)
[![React](https://img.shields.io/badge/React%2018-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

A modern, responsive, and minimalist developer portfolio showcasing experience, projects, skills, and education. Built with **React 18**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**, powered by **Vite** for ultra-fast builds.

🌐 **Live Demo:** [https://daffarivaldi06.github.io/portfolio/](https://daffarivaldi06.github.io/portfolio/)

---

## ✨ Features

- **⚡ Fast & Lightweight:** Built using Vite with optimized bundle splitting.
- **🎨 Modern & Editorial Design:** Clean typography using *Instrument Serif* and *Inter*, subtle animations, and refined minimalism.
- **📱 Fully Responsive:** Seamless viewing across mobile, tablet, and desktop screens.
- **📦 Single Source of Truth:** All content (experience, projects, skills, education, bio) is decoupled and easily editable inside `src/data/content.ts`.
- **✨ Micro-Interactions:** Smooth page transitions and hover effects powered by Framer Motion.
- **🚀 One-Click GitHub Pages Deploy:** Integrated deployment script using `gh-pages`.

---

## 🛠️ Tech Stack

- **Framework:** [React 18](https://reactjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Hosting:** [GitHub Pages](https://pages.github.com/)

---

## 📁 Project Structure

```text
├── public/                 # Static assets (favicons, manifest)
├── src/
│   ├── components/         # Reusable UI sections (Hero, About, Projects, etc.)
│   ├── data/
│   │   └── content.ts      # 📄 Single source of truth for portfolio content
│   ├── hooks/              # Custom React hooks
│   ├── App.tsx             # Root application component
│   ├── index.css           # Global Tailwind and font styles
│   └── main.tsx            # React DOM mounting
├── index.html              # HTML shell & SEO meta tags
├── package.json            # Scripts & dependencies
├── tailwind.config.ts      # Tailwind design system configuration
└── vite.config.ts          # Vite build & GitHub Pages base configuration
```

---

## 🚀 Getting Started Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (version 18+ recommended).

### 1. Clone the repository
```bash
git clone https://github.com/daffarivaldi06/portfolio.git
cd portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

### 4. Build for production
```bash
npm run build
```

---

## 🚢 Deployment to GitHub Pages

This project is configured to deploy directly to GitHub Pages.

To deploy changes to the live site:
```bash
npm run deploy
```

This command will:
1. Trigger `predeploy` to build the latest assets (`tsc -b && vite build`) into `dist/`.
2. Push the bundled distribution folder to the `gh-pages` branch on GitHub.

The live site will be updated at:  
👉 **[https://daffarivaldi06.github.io/portfolio/](https://daffarivaldi06.github.io/portfolio/)**

---

## 📝 Updating Your Content

To customize your portfolio text, experiences, projects, or links:
1. Open [`src/data/content.ts`](src/data/content.ts).
2. Modify the data objects (`identity`, `about`, `experience`, `projects`, `skills`, `education`).
3. Save the file and run `npm run deploy`.

---

## 📬 Contact & Socials

- **Website:** [daffarivaldi06.github.io/portfolio](https://daffarivaldi06.github.io/portfolio/)
- **GitHub:** [@daffarivaldi06](https://github.com/daffarivaldi06)
- **LinkedIn:** [daffaahmad06](https://www.linkedin.com/in/daffaahmad06/)
- **Email:** [daffarivaldi06@gmail.com](mailto:daffarivaldi06@gmail.com)

---

⭐ *If you like this portfolio design, feel free to give the repository a star!*
