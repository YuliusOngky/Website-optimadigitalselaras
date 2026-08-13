# Website OptimaDigitalSelaras

Professional web solution for **PT Optima Digital Selaras** - Digital Ecosystem Enabler.

**Live:** [www.optimadigitalselaras.com](https://www.optimadigitalselaras.com)

## Production vs this repo

The **live homepage** is standalone Optima HTML on GIOS NAS `192.168.1.20`, Docker `optima-web` (nginx **:8088**), behind Cloudflare. It includes the hero video and brand animations.

This GitHub repo still contains the **Vite + React Orisa template** (`src/`). That SPA is **not** what Cloudflare serves. Do not deploy `npm run build` / `dist/` onto `optima-web` or you will replace the live Optima page.

See [DEPLOYMENT.md](DEPLOYMENT.md) for the real stack.

## Overview

React + TypeScript template (Orisa) kept in-repo for components and a possible future SPA. Live marketing site is the Optima HTML on GIOS.

## 📋 Features

- ✨ Modern, responsive design
- 🎨 Advanced GSAP animations and effects
- 📱 Mobile-optimized experience
- 🔍 SEO-friendly structure
- 🎯 Multiple page variations (15+ homepage versions)
- 📦 Pre-built components and sections
- 🛣️ React Router integration
- 🎭 Dark/Light theme support
- ⚡ Fast build with Vite

## 🛠️ Tech Stack

- **Frontend:** React 19 + TypeScript
- **Build Tool:** Vite 6
- **Styling:** Bootstrap 5, Custom CSS
- **Animations:** GSAP, Swiper, WOW.js
- **Routing:** React Router v6
- **Linting:** ESLint

## 📁 Project Structure

```
.
├── src/
│   ├── pages/           # Page components (Home, About, Services, etc.)
│   ├── shared/          # Reusable components
│   │   ├── header/      # Header variations
│   │   ├── footer/      # Footer variations
│   │   ├── sections/    # Page sections
│   │   ├── cards/       # Card components
│   │   ├── effects/     # Animation effects
│   │   ├── hooks/       # Custom React hooks
│   │   └── components/  # Common components
│   ├── layouts/         # Layout components
│   ├── types/           # TypeScript types
│   ├── seo/             # SEO utilities
│   ├── data/            # Static data
│   ├── App.tsx          # Main app component
│   └── main.tsx         # Entry point
├── public/              # Static assets
├── dist/                # Build output
├── index.html           # HTML template
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
├── eslint.config.js     # ESLint configuration
└── package.json         # Project dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Fix linting issues
npm run lint:fix
```

### Development

The development server runs at `http://localhost:5173` by default.

- Hot module replacement (HMR) enabled
- TypeScript type checking
- ESLint validation

### Build & Deploy

```bash
# Build optimized production bundle
npm run build

# Output goes to `dist/` directory
# Ready for deployment to any static hosting service
```

## 📄 Pages

### Homepage Variations
- Home 1-15: Multiple modern homepage designs

### Portfolio
- Portfolio Gallery (6 variations)
- Portfolio Details (6 variations)
- Specialized layouts: Cinema, Curtain, Horizontal, Split, Stack, Vista, Zstack

### Services
- Service Showcase (3 variations)
- Service Details

### About
- About Pages (3 variations)

### Additional Pages
- Team & Team Details
- Contact Pages
- Blog & Blog Details
- FAQ
- Pricing
- Product Archive, Details, Cart, Checkout
- Coming Soon
- 404 Not Found

## 🎨 Components

### Reusable Components
- Headers (15 variations)
- Footers (15 variations)
- Cards (Article, Portfolio, Product, Team, Testimonial)
- Common elements (Tabs, Pagination, Back to Top, Sidebar)

### Effects & Animations
- Scroll animations
- Pin effects
- Parallax effects
- Text reveal & scramble
- Image hover effects
- Cursor trail
- And more...

## 🎯 Key Sections

Each page can be composed from reusable sections:
- Hero sections
- About sections
- Service showcase
- Portfolio gallery
- Testimonials
- CTA sections
- FAQ sections
- Team sections

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for development:

```env
VITE_APP_NAME=Website OptimaDigitalSelaras
```

### Vite Configuration

- **Port:** 5173
- **Strict port mode:** Enabled
- **Alias:** `@` → `src/`

## 📱 Responsive Design

- Mobile-first approach
- Bootstrap grid system
- Custom breakpoints for all components
- Touch-friendly interactions

## ♿ Accessibility

- Semantic HTML
- ARIA labels
- Keyboard navigation
- Color contrast compliance
- Focus management

## 📊 Performance

- Code splitting
- Lazy loading components
- Image optimization
- CSS minification
- Tree-shaking unused code

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 is already in use:
```bash
# Modify vite.config.ts or specify different port
npm run dev -- --port 3000
```

### Build Issues
```bash
# Clear dependencies and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📝 License

MIT License - See LICENSE file for details

## 👥 Author

Yulius Ongky - PT Optima Digital Selaras

## 📞 Contact

- Email: marketing@optimadigital.co.id
- Phone: +62 812 988 5679
- Website: www.optimadigitalselaras.com

## 🤝 Contributing

Contributions welcome! Please follow the project's code style and conventions.

---

**Project Status:** Production Ready ✅  
**Last Updated:** August 2026  
**Node Version:** 18+ recommended
