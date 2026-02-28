/**
 * SKELETON LOADING INTEGRATION GUIDE
 *
 * This guide documents how to integrate skeleton loading components
 * throughout the application for better perceived performance.
 *
 * AVAILABLE COMPONENTS:
 * - Skeleton: Base component for custom skeletons
 * - SkeletonText: Multi-line text skeleton
 * - ProjectCardSkeleton: Project card loading state
 * - TableRowSkeleton, TableSkeletonRows: Table loading states
 * - DashboardStatSkeleton, DashboardStatGridSkeleton: Dashboard loading states
 * - SkeletonLoaders: Pre-built complex skeleton layouts
 *
 * INTEGRATION POINTS:
 *
 * 1. Marketplace Page (/app/marketplace/page.tsx)
 *    Use ProjectCardGridSkeleton while listings load
 *    Use DataTableSkeleton for table views
 *
 * 2. Blog Page (/app/blog/page.tsx)
 *    Use ProjectCardGridSkeleton for blog cards
 *    Use SkeletonText for article previews
 *
 * 3. Search Results (/app/search/page.tsx)
 *    Use ListSkeleton for result items
 *    Show multiple skeleton results while searching
 *
 * 4. Dashboard/Admin Pages
 *    Use DashboardStatGridSkeleton for stat cards
 *    Use DataTableSkeleton for data tables
 *    Use DashboardSkeleton for full page layout
 *
 * 5. Project Details Pages
 *    Use Skeleton for image areas
 *    Use SkeletonText for descriptions
 *    Use ContentSkeleton for full article pages
 *
 * BEST PRACTICES:
 * - Match skeleton dimensions exactly to actual components
 * - Show appropriate number of skeletons (e.g., 6 cards for grid)
 * - Animate skeletons with shimmer for visual feedback
 * - Respect prefers-reduced-motion for accessibility
 * - Keep skeleton display time under 3 seconds for best UX
 * - Use Suspense for server components when possible
 * - Import only what you need (direct imports, no barrel exports)
 *
 * COMMON IMPLEMENTATION PATTERN:
 *
 * 1. For Client Components:
 *    const isLoading = useState(true);
 *    useEffect(() => {
 *      fetchData().then(data => setData(data); setLoading(false););
 *    }, []);
 *    return isLoading ? SkeletonComponent() : DataComponent();
 *
 * 2. For Server Components with Suspense:
 *    function Page() {
 *      return (
 *        Suspense(fallback=SkeletonComponent)
 *          AsyncDataComponent()
 *      );
 *    }
 *
 * 3. For Conditional Rendering:
 *    return !isLoading && data ? DataComponent() : SkeletonComponent();
 *
 */
