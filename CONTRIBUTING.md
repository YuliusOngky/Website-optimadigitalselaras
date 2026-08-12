# Contributing Guidelines

## Code Style

- Use TypeScript for type safety
- Follow ESLint configuration
- Use camelCase for variables and functions
- Use PascalCase for components and classes

## Running Tests & Linting

```bash
npm run lint
npm run lint:fix
```

## Git Workflow

1. Create feature branch from `main`
2. Commit with clear messages
3. Push and create pull request
4. Ensure linting passes
5. Request code review

## Branch Naming

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation
- `refactor/description` - Code refactoring

## Commit Messages

Use clear, descriptive commit messages:

```
feat: Add new component
fix: Resolve issue with animation
docs: Update README
refactor: Improve code structure
```

## Component Guidelines

- Keep components small and focused
- Use proper TypeScript types
- Include JSDoc comments for complex logic
- Use custom hooks for reusable logic
- Export components as default

## CSS/Styling

- Use Bootstrap utilities when possible
- Keep custom CSS in component files
- Use CSS variables for theming
- Mobile-first approach

## Performance

- Lazy load heavy components
- Optimize images
- Monitor bundle size
- Use React.memo for expensive renders

---

Thank you for contributing! 🙏
