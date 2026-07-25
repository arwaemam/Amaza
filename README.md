# AmazePMS Website Redesign

A premium, award-winning website redesign for AmazePMS property management system built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion + GSAP + Lenis Smooth Scroll
- **Testing**: Jest + React Testing Library + Fast-check (Property-based testing)
- **Linting**: ESLint + Prettier
- **Performance**: Optimized for Core Web Vitals

## 📦 Installation

Make sure you have Node.js 18.17.0 or higher installed.

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:property` - Run property-based tests

## 🎨 Design System

The project includes a comprehensive design system with:

- **Colors**: Primary, neutral, and semantic color palettes
- **Typography**: Responsive fluid typography with Inter font
- **Spacing**: 8px grid system for consistent spacing
- **Animations**: Smooth animations with performance optimization
- **Glassmorphism**: Modern glass effects with fallbacks

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js 14 app directory
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles and design system
├── lib/                   # Utility libraries
│   ├── utils.ts          # Utility functions
│   ├── constants.ts      # App constants
│   └── types.ts          # TypeScript type definitions
└── components/           # React components (will be added in Phase 2)
```

## 📱 Responsive Breakpoints

- `xs`: 475px
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px
- `3xl`: 1600px

## ♿ Accessibility

The project follows WCAG 2.1 AA guidelines:

- Semantic HTML structure
- Proper color contrast ratios (4.5:1 for normal text, 3:1 for large text)
- Keyboard navigation support
- Screen reader compatibility
- Reduced motion preferences support

## ⚡ Performance

Optimized for Core Web Vitals:

- **LCP**: < 2.5 seconds
- **FID**: < 100 milliseconds  
- **CLS**: < 0.1
- **Lighthouse Score**: > 90

## 🧪 Testing

The project includes comprehensive testing setup:

- **Unit Tests**: Jest + React Testing Library
- **Property-based Tests**: Fast-check for correctness validation
- **Type Safety**: TypeScript strict mode
- **Code Quality**: ESLint + Prettier

## 🔧 Configuration

All configuration files are properly set up:

- `next.config.js` - Next.js configuration with performance optimizations
- `tailwind.config.ts` - Tailwind CSS with custom design system
- `tsconfig.json` - TypeScript configuration with strict mode
- `.eslintrc.json` - ESLint rules for code quality
- `.prettierrc` - Prettier formatting rules
- `jest.config.js` - Jest testing configuration

## 🌟 Features

- **Premium Design**: Apple-level attention to detail
- **Advanced Animations**: 60fps performance with Framer Motion and GSAP
- **Smooth Scrolling**: Lenis integration for buttery smooth scrolling
- **Glassmorphism**: Modern glass effects with browser fallbacks
- **Mobile-first**: Responsive design from 320px to 2560px
- **SEO Optimized**: Complete metadata and structured data
- **Type Safe**: Full TypeScript coverage

## 📈 Development Phases

- [x] **Phase 1**: Project setup, dependencies, design system foundation
- [ ] **Phase 2**: Core UI components and layout
- [ ] **Phase 3**: Main website sections and content
- [ ] **Phase 4**: Animations and interactions
- [ ] **Phase 5**: Responsive optimization and accessibility
- [ ] **Phase 6**: Testing and deployment

## 🤝 Contributing

1. Follow the established code style (ESLint + Prettier)
2. Write tests for new components
3. Ensure TypeScript strict mode compliance
4. Test responsive design across all breakpoints
5. Verify accessibility compliance

## 📝 License

This project is part of a frontend development hiring assignment for Dacitos Technologies.

---

Built with ❤️ using Next.js 14 and modern web technologies.