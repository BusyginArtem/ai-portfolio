# Quick Migration Checklist

Use this checklist during your migration from Next.js 14.2.4 → 16 & React 18 → 19.2

## Pre-Migration

- [ ] Verify Node.js version: `node --version` (needs 20.9+)
- [ ] Create backup branch: `git branch migration-backup`
- [ ] Commit current work: `git commit -am "Pre-migration backup"`

## Step 1: Core Dependencies

```bash
npm install next@latest react@latest react-dom@latest
```

- [ ] Next.js updated to 16.x
- [ ] React updated to 19.2.x
- [ ] React DOM updated to 19.2.x

## Step 2: TypeScript Types

```bash
npm install -D @types/react@latest @types/react-dom@latest @types/node@latest typescript@latest
```

- [ ] @types/react updated
- [ ] @types/react-dom updated
- [ ] @types/node updated
- [ ] TypeScript updated (if needed)

## Step 3: ESLint

```bash
npm install -D eslint@latest eslint-config-next@latest
```

- [ ] ESLint updated
- [ ] eslint-config-next updated to match Next.js 16

## Step 4: Run Codemod

```bash
npx @next/codemod@canary upgrade latest
```

- [ ] Codemod completed successfully
- [ ] Reviewed all automated changes
- [ ] No unexpected modifications

## Step 5: Manual Code Updates

### Async API Updates

Search for and update these patterns:

- [ ] `params` in page components → `Promise<{...}>` with `await`
- [ ] `searchParams` in page components → `Promise<{...}>` with `await`
- [ ] `cookies()` → `await cookies()`
- [ ] `headers()` → `await headers()`
- [ ] `draftMode()` → `await draftMode()`

**Files to check:**
- [ ] `app/page.tsx`
- [ ] `app/upload/page.tsx`
- [ ] `app/layout.tsx`
- [ ] Any other page/layout files
- [ ] Route handlers using cookies/headers

### Middleware Migration

- [ ] Checked for `middleware.ts` or `middleware.js` (none found ✓)
- [ ] If found, renamed to `proxy.ts` and updated

### Config Updates

- [ ] Reviewed `next.config.mjs`
- [ ] Removed deprecated experimental flags (if any)
- [ ] Kept `serverComponentsExternalPackages` (still valid)

## Step 6: Dependency Updates

Update React-dependent packages (test each one):

- [ ] `@ai-sdk/react` - check compatibility
- [ ] `next-themes` - update to latest
- [ ] `@xyflow/react` - check React 19 support
- [ ] Radix UI packages - update if needed:
  - [ ] `@radix-ui/react-avatar`
  - [ ] `@radix-ui/react-collapsible`
  - [ ] `@radix-ui/react-dialog`
  - [ ] `@radix-ui/react-dropdown-menu`
  - [ ] `@radix-ui/react-hover-card`
  - [ ] `@radix-ui/react-label`
  - [ ] `@radix-ui/react-progress`
  - [ ] `@radix-ui/react-scroll-area`
  - [ ] `@radix-ui/react-select`
  - [ ] `@radix-ui/react-slot`
  - [ ] `@radix-ui/react-tooltip`
  - [ ] `@radix-ui/react-use-controllable-state`
- [ ] `motion` - check React 19 compatibility
- [ ] `@gsap/react` - should be fine, but verify

## Step 7: Build & Test

- [ ] `npm run build` - succeeds without errors
- [ ] `npm run dev` - starts successfully
- [ ] All pages load correctly
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Linting passes: `npm run lint`

## Step 8: Feature Testing

Test all major features:

- [ ] Home page loads
- [ ] Upload page works
- [ ] Chat/AI features work
- [ ] File uploads work
- [ ] Database operations work
- [ ] Theme switching works
- [ ] All Radix UI components function
- [ ] Animations work (GSAP, Motion)
- [ ] Navigation works
- [ ] API routes work

## Step 9: Final Checks

- [ ] All tests pass (if you have tests)
- [ ] No runtime errors
- [ ] Performance is acceptable
- [ ] Production build works: `npm run build && npm run start`
- [ ] Code reviewed and committed

## Common Issues to Watch For

- [ ] TypeScript errors about Promise types
- [ ] "params is not a function" errors
- [ ] Component ref issues (React 19)
- [ ] Package compatibility warnings
- [ ] Build-time errors
- [ ] Runtime errors in browser console

## Notes

- No middleware file found - skip middleware → proxy migration
- Current route handlers look compatible (using standard Request API)
- Most dependencies should work, but test thoroughly

---

**Migration Date:** _______________
**Completed By:** _______________
**Issues Encountered:** _______________


