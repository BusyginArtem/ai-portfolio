# Migration Guide: Next.js 14.2.4 → Next.js 16 & React 18 → React 19.2

## 📋 Current State Analysis

**Current Versions:**
- Next.js: `14.2.4`
- React: `^18`
- React DOM: `^18`
- TypeScript: `^5`
- Node.js: `^20` (check your actual version)

**Key Dependencies to Review:**
- Radix UI components (may need updates for React 19)
- `@ai-sdk/react`: `^2.0.86` (check React 19 compatibility)
- `@gsap/react`: `^2.1.2` (should be compatible)
- `@xyflow/react`: `^12.8.6` (check compatibility)
- `next-themes`: `^0.3.0` (may need update)
- `eslint-config-next`: `14.2.4` (must update to match Next.js version)

---

## ✅ Prerequisites

Before starting the migration:

1. **Node.js Version**: Ensure you're running **Node.js 20.9 or higher**
   ```bash
   node --version
   ```

2. **TypeScript Version**: Next.js 16 requires **TypeScript 5.1 or higher**
   - Your current version: `^5` (should be fine, but verify)

3. **Backup Your Project**: 
   ```bash
   git commit -am "Pre-migration backup"
   git branch migration-backup
   ```

4. **Check for Middleware**: If you have a `middleware.ts` or `middleware.js` file, note its location (will need to be migrated to `proxy.js`)

---

## 🚀 Step-by-Step Migration Process

### Step 1: Update Core Dependencies

Update Next.js, React, and React DOM:

```bash
npm install next@latest react@latest react-dom@latest
```

This will install:
- Next.js: `^16.0.0` (or latest)
- React: `^19.2.0`
- React DOM: `^19.2.0`

### Step 2: Update TypeScript Types

Update React and Node type definitions:

```bash
npm install -D @types/react@latest @types/react-dom@latest @types/node@latest typescript@latest
```

### Step 3: Update ESLint Configuration

Update ESLint to match Next.js 16:

```bash
npm install -D eslint@latest eslint-config-next@latest
```

This will update `eslint-config-next` from `14.2.4` to `16.x.x`.

### Step 4: Run Next.js Codemod

Use the official Next.js codemod to automate code transformations:

```bash
npx @next/codemod@canary upgrade latest
```

This tool will:
- Automatically update code patterns
- Handle many breaking changes
- Provide interactive guidance
- Create backups

### Step 5: Update Other Dependencies

Review and update React-dependent packages. Check compatibility first:

```bash
# Check for outdated packages
npm outdated

# Update packages that support React 19
npm install @ai-sdk/react@latest
npm install next-themes@latest
npm install @xyflow/react@latest  # Check if newer version supports React 19
```

**Important**: Test each package update individually to ensure compatibility.

---

## 🔧 Breaking Changes to Address

### 1. Async Request APIs (CRITICAL)

Next.js 16 makes several APIs asynchronous. You **must** update your code:

**Before (Next.js 14):**
```typescript
// app/page.tsx or app/layout.tsx
export default function Page({ params, searchParams }) {
  const id = params.id;
  const query = searchParams.query;
  // ...
}
```

**After (Next.js 16):**
```typescript
// app/page.tsx or app/layout.tsx
export default async function Page({ 
  params, 
  searchParams 
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ query?: string }>;
}) {
  const { id } = await params;
  const { query } = await searchParams;
  // ...
}
```

**APIs that are now async:**
- `cookies()` - use `await cookies()`
- `headers()` - use `await headers()`
- `draftMode()` - use `await draftMode()`
- `params` - use `await params`
- `searchParams` - use `await searchParams`

**Action Required:**
- Search your codebase for these APIs
- Update all usages to be async/await
- Update function signatures to accept `Promise<>` types

### 2. Middleware → Proxy Migration

If you have a `middleware.ts` or `middleware.js` file:

1. **Rename** `middleware.ts` → `proxy.ts` (or `.js` equivalent)
2. Update the export signature if needed
3. Review Next.js 16 proxy documentation for any API changes

**Action Required:**
- Check if you have a middleware file
- Rename and update if present

### 3. Remove AMP Support

If you have any AMP-related configurations, remove them:
- Remove `amp: true` from page configs
- Remove AMP-specific imports
- Remove AMP-related Next.js config options

### 4. Experimental Features

Review your `next.config.mjs`:

**Current config:**
```javascript
experimental: {
  serverComponentsExternalPackages: ["pdf-parse", "mammoth"],
}
```

**Check for:**
- `experimental.ppr` - removed in Next.js 16
- Other experimental flags that may be deprecated
- Update to new stable APIs where applicable

### 5. React 19 Changes

**Key React 19 Breaking Changes:**

1. **Ref as a Prop**: Refs are now passed as props, not in a `ref` key
   - Most libraries handle this automatically
   - Check custom components using refs

2. **Form Actions**: New form handling (usually backward compatible)

3. **useFormStatus/useFormState**: New hooks (additive, not breaking)

4. **TypeScript Types**: Update `@types/react` to match React 19

**Action Required:**
- Review custom components using refs
- Test form submissions
- Update TypeScript types

---

## 📝 Code Updates Checklist

### Files to Review and Update:

- [ ] **All page components** (`app/**/page.tsx`) - Update params/searchParams to async
- [ ] **All layout components** (`app/**/layout.tsx`) - Update params/searchParams to async
- [ ] **Route handlers** (`app/**/route.ts`) - Update cookies/headers to async
- [ ] **Server components** - Update any direct API usage
- [ ] **Middleware** → Rename to `proxy.ts` if exists
- [ ] **next.config.mjs** - Remove deprecated experimental flags
- [ ] **Custom hooks** - Review for React 19 compatibility
- [ ] **Components using refs** - Verify React 19 compatibility

### Example: Updating a Page Component

**Before:**
```typescript
// app/projects/[id]/page.tsx
export default function ProjectPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  return <div>Project {params.id}</div>;
}
```

**After:**
```typescript
// app/projects/[id]/page.tsx
export default async function ProjectPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  return <div>Project {id}</div>;
}
```

---

## 🧪 Testing Checklist

After migration, thoroughly test:

- [ ] **Build succeeds**: `npm run build`
- [ ] **Development server starts**: `npm run dev`
- [ ] **All pages load correctly**
- [ ] **Dynamic routes work** (with async params)
- [ ] **Search params work** (with async searchParams)
- [ ] **API routes function properly**
- [ ] **Forms submit correctly**
- [ ] **Client-side navigation works**
- [ ] **Server components render correctly**
- [ ] **Radix UI components function** (test all used components)
- [ ] **AI SDK components work** (test chat/streaming features)
- [ ] **Theme switching works** (next-themes)
- [ ] **Database operations work** (drizzle-orm)
- [ ] **File uploads work** (if applicable)
- [ ] **No console errors or warnings**

---

## 🔍 Dependency Compatibility Check

### Packages to Verify:

1. **@radix-ui/* packages**: 
   - Most should work, but test each component
   - Update to latest versions if issues occur

2. **@ai-sdk/react**: 
   - Check for React 19 compatibility
   - May need update to latest version

3. **@xyflow/react**: 
   - Verify React 19 support
   - May need version update

4. **next-themes**: 
   - Should work, but update to latest

5. **drizzle-orm**: 
   - Should be compatible (not React-dependent)

6. **@gsap/react**: 
   - Should be compatible with React 19

7. **motion**: 
   - Check React 19 compatibility
   - Update if needed

---

## 🐛 Common Issues & Solutions

### Issue 1: "params is not a function"
**Solution**: Make the component async and await params:
```typescript
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // ...
}
```

### Issue 2: TypeScript errors with React types
**Solution**: Update `@types/react` and `@types/react-dom`:
```bash
npm install -D @types/react@latest @types/react-dom@latest
```

### Issue 3: Radix UI components not working
**Solution**: Update Radix UI packages to latest versions:
```bash
npm install @radix-ui/react-dialog@latest @radix-ui/react-dropdown-menu@latest
# ... update all used Radix packages
```

### Issue 4: Build errors with async APIs
**Solution**: Ensure all server components using cookies/headers/params are async:
```typescript
// Before
const cookieStore = cookies();

// After
const cookieStore = await cookies();
```

---

## 📚 Additional Resources

- [Next.js 16 Upgrade Guide](https://nextjs.org/docs/app/guides/upgrading/version-16)
- [Next.js 16 Blog Post](https://nextjs.org/blog/next-16)
- [React 19 Release Notes](https://react.dev/blog/2024/12/05/react-19)
- [React 19 Upgrade Guide](https://react.dev/blog/2024/12/05/react-19-upgrade-guide)

---

## 🎯 Migration Order Recommendation

1. ✅ Update Node.js if needed (20.9+)
2. ✅ Create backup branch
3. ✅ Update core dependencies (Next.js, React, React DOM)
4. ✅ Update TypeScript types
5. ✅ Run Next.js codemod
6. ✅ Update ESLint config
7. ✅ Manually fix async API usages
8. ✅ Rename middleware → proxy (if exists)
9. ✅ Update other dependencies one by one
10. ✅ Test thoroughly
11. ✅ Fix any compatibility issues
12. ✅ Final testing and deployment

---

## ⚠️ Important Notes

- **Do not skip the codemod** - it handles many transformations automatically
- **Test incrementally** - don't update everything at once
- **Check for middleware** - this is a breaking change that's easy to miss
- **Async APIs are critical** - your app will break if you don't update these
- **Some packages may not support React 19 yet** - check each package's documentation
- **Consider updating in a feature branch** - don't merge until fully tested

---

## 🆘 Need Help?

If you encounter issues:
1. Check the Next.js 16 migration guide
2. Review React 19 breaking changes
3. Check individual package documentation
4. Review error messages carefully (they often point to the solution)
5. Test in isolation (create a minimal reproduction)

Good luck with your migration! 🚀



