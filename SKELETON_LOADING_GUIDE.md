# Skeleton Loading System - Complete Integration Guide

## Overview

The skeleton loading system provides a smooth perceived performance enhancement for the FarmCredit application. Users see content shape placeholders while actual data loads, reducing perceived wait time and improving user experience.

## System Components

### Base Components

#### `Skeleton` Component
**File:** `/components/atoms/Skeleton.tsx`

Basic skeleton element with variants and animation control.

```tsx
import { Skeleton, SkeletonText } from "@/components/atoms/Skeleton";

// Single skeleton
<Skeleton className="h-6 w-32" />

// Circle skeleton
<Skeleton variant="circle" className="h-8 w-8" />

// Text skeleton (default rounded)
<Skeleton variant="text" />

// Multi-line text
<SkeletonText lines={3} />

// Without animation
<Skeleton animate={false} />
```

### Specialized Components

#### `ProjectCardSkeleton`
**File:** `/components/molecules/ProjectCard/ProjectCardSkeleton.tsx`

Matches ProjectCard dimensions exactly.

#### `TableRowSkeleton` & `TableSkeletonRows`
**File:** `/components/molecules/TableRowSkeleton.tsx`

For data table loading states with configurable columns.

```tsx
<TableSkeletonRows rows={5} columns={4} />
```

#### `DashboardStatSkeleton`
**File:** `/components/molecules/DashboardStatSkeleton.tsx`

Single stat card skeleton.

```tsx
<DashboardStatGridSkeleton count={4} />
```

### Pre-built Complex Loaders

**File:** `/components/molecules/SkeletonLoaders.tsx`

High-level skeleton components for common layouts:

- **ProjectCardGridSkeleton** - Grid of project cards
- **DataTableSkeleton** - Complete table with header
- **HeroSectionSkeleton** - Hero image and text
- **CardGridSkeleton** - Generic card grid
- **ListSkeleton** - List of items
- **ContentSkeleton** - Article/detail page
- **DashboardSkeleton** - Full dashboard layout

## Animation System

### CSS Shimmer Animation

The shimmer effect is defined in `/app/globals.css`:

```css
.skeleton-shimmer {
  background: linear-gradient(
    90deg,
    var(--muted) 0%,
    rgba(255, 255, 255, 0.1) 20%,
    var(--muted) 40%,
    var(--muted) 100%
  );
  background-size: 1000px 100%;
  animation: skeleton-shimmer 2s infinite;
}
```

### Accessibility

The animation respects `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  .skeleton-shimmer {
    animation: none;
    background: var(--muted);
  }
}
```

## Integration Guide

### Pattern 1: Client Component with useState/useEffect

```tsx
import { ProjectCardGridSkeleton } from "@/components/molecules/SkeletonLoaders";

export function MyComponent() {
  const [listings, setListings] = useState(null);

  useEffect(() => {
    fetchListings().then(data => {
      setListings(data);
    });
  }, []);

  return (
    <div>
      {!listings ? (
        <ProjectCardGridSkeleton count={6} />
      ) : (
        <ActualComponent listings={listings} />
      )}
    </div>
  );
}
```

### Pattern 2: Server Component with Suspense

```tsx
import { Suspense } from "react";
import { ProjectCardGridSkeleton } from "@/components/molecules/SkeletonLoaders";

export default function Page() {
  return (
    <Suspense fallback={<ProjectCardGridSkeleton count={6} />}>
      <AsyncListings />
    </Suspense>
  );
}

async function AsyncListings() {
  const data = await fetchListings();
  return <ActualComponent listings={data} />;
}
```

### Pattern 3: Conditional Rendering

```tsx
const isLoading = data === null;
const shouldShowContent = !isLoading && data;

return shouldShowContent ? <Content /> : <SkeletonComponent />;
```

## Integration Points

### Marketplace Page
**File:** `/app/marketplace/page.tsx`

```tsx
import { ProjectCardGridSkeleton } from "@/components/molecules/SkeletonLoaders";

// Show skeleton while fetching listings
{isLoading ? <ProjectCardGridSkeleton count={6} /> : <MarketplaceGrid />}
```

### Blog Page
**File:** `/app/blog/page.tsx`

```tsx
// Show skeletons for blog post cards
{isLoading ? <ProjectCardGridSkeleton count={3} /> : <BlogGrid />}
```

### Search Results
**File:** `/app/search/page.tsx`

```tsx
import { ListSkeleton } from "@/components/molecules/SkeletonLoaders";

// Show skeleton while searching
{isLoading ? <ListSkeleton count={5} /> : <SearchResults />}
```

### Dashboard Pages

```tsx
import { DashboardSkeleton } from "@/components/molecules/SkeletonLoaders";

// Show skeleton while loading dashboard
{isLoading ? <DashboardSkeleton /> : <Dashboard />}
```

### Data Tables

```tsx
import { DataTableSkeleton } from "@/components/molecules/SkeletonLoaders";

// Show table skeleton while loading
{isLoading ? <DataTableSkeleton rows={5} columns={4} /> : <Table />}
```

## Features

✅ **Animated Shimmer** - Smooth 2-second infinite animation
✅ **Dimension Matching** - Skeletons match actual components exactly
✅ **Prefers-Reduced-Motion** - Respects user accessibility preferences
✅ **Theme Support** - Works with light and dark modes
✅ **TypeScript Strict** - Full type safety, no `any` types
✅ **WCAG 2.1 AA** - Accessible implementation
✅ **Direct Imports** - No barrel exports
✅ **Responsive** - Works across all breakpoints

## Best Practices

1. **Match Dimensions** - Ensure skeleton dimensions match actual components
2. **Appropriate Count** - Show correct number of skeletons (e.g., 6 for grid)
3. **Short Duration** - Keep loading under 3 seconds for best UX
4. **Subtle Animation** - Shimmer provides visual feedback without distraction
5. **Semantic HTML** - Use proper HTML elements and ARIA labels
6. **Testing** - Test with `prefers-reduced-motion` enabled

## Example: Complete Integration

```tsx
"use client";

import { useState, useEffect } from "react";
import { ProjectCardGridSkeleton } from "@/components/molecules/SkeletonLoaders";

export default function Marketplace() {
  const [listings, setListings] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch("/api/listings");
        const data = await response.json();
        setListings(data);
      } catch (err) {
        setError(err);
      }
    };

    fetchListings();
  }, []);

  return (
    <main>
      <h1>Carbon Credit Marketplace</h1>

      {error ? (
        <div>Error loading listings</div>
      ) : !listings ? (
        <ProjectCardGridSkeleton count={6} />
      ) : (
        <MarketplaceGrid listings={listings} />
      )}
    </main>
  );
}
```

## Customization

### Create Custom Skeleton Layout

```tsx
import { Skeleton, SkeletonText } from "@/components/atoms/Skeleton";

export function CustomSkeleton() {
  return (
    <div className="p-4 space-y-4">
      <Skeleton className="h-48 w-full rounded-lg" />
      <SkeletonText lines={2} />
      <div className="flex gap-2">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 flex-1" />
      </div>
    </div>
  );
}
```

### Adjust Animation Speed

Modify the animation in `globals.css`:

```css
.skeleton-shimmer {
  animation: skeleton-shimmer 1.5s infinite; /* faster */
}
```

## Files

- `components/atoms/Skeleton.tsx` - Base component
- `components/molecules/TableRowSkeleton.tsx` - Table skeletons
- `components/molecules/DashboardStatSkeleton.tsx` - Stat card skeletons
- `components/molecules/ProjectCard/ProjectCardSkeleton.tsx` - Project card skeleton
- `components/molecules/SkeletonLoaders.tsx` - Pre-built complex layouts
- `lib/skeleton-integration-guide.ts` - Integration documentation
- `lib/skeleton-examples.tsx` - Usage examples
- `app/globals.css` - Animation definitions

## Testing

Test skeleton visibility and animations:

```bash
# Manual testing
1. Open DevTools
2. Throttle network (Slow 3G)
3. Navigate to a page with skeletons
4. Verify smooth shimmer animation
5. Check Elements tab for proper HTML structure

# Accessibility testing
1. Enable prefers-reduced-motion in system settings
2. Verify animation is disabled
3. Check that skeletons are still visible and properly timed
```

## Performance Notes

- Skeletons are lightweight (CSS-based animations)
- No JavaScript overhead for animation
- Respects `prefers-reduced-motion` automatically
- Minimal DOM impact compared to actual content

## Support

For questions or issues with skeleton integration, refer to:
- `lib/skeleton-integration-guide.ts` - Integration guide
- `lib/skeleton-examples.tsx` - Code examples
- Component files for implementation details
