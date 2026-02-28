/**
 * SKELETON LOADING - INTEGRATION EXAMPLES
 *
 * This file shows practical examples of how to integrate skeleton loading
 * components throughout the application.
 *
 * File: lib/skeleton-examples.tsx
 */

import React, { useState, useEffect } from "react";
import { ProjectCardGridSkeleton } from "@/components/molecules/SkeletonLoaders";
import { DashboardSkeleton } from "@/components/molecules/SkeletonLoaders";
import { ListSkeleton } from "@/components/molecules/SkeletonLoaders";

/**
 * EXAMPLE 1: Marketplace Page with Loading State
 *
 * Shows skeleton grid while fetching product listings
 */
export function MarketplaceLoadingExample() {
  const [listings, setListings] = useState<unknown[] | null>(null);
  const isLoading = listings === null;

  useEffect(() => {
    const timer = setTimeout(() => {
      setListings([]);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h1>Carbon Credit Marketplace</h1>
      {isLoading ? (
        <ProjectCardGridSkeleton count={6} />
      ) : (
        <div>{/* Render actual listings */}</div>
      )}
    </div>
  );
}

/**
 * EXAMPLE 2: Dashboard with Multiple Skeleton Types
 *
 * Shows dashboard skeletons while loading stats and charts
 */
export function DashboardLoadingExample() {
  const [dashboardData, setDashboardData] = useState<unknown | null>(null);
  const isLoading = dashboardData === null;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDashboardData({});
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isLoading ? (
        <DashboardSkeleton />
      ) : (
        <div>{/* Render actual dashboard */}</div>
      )}
    </div>
  );
}

/**
 * EXAMPLE 3: Search Results with List Skeletons
 *
 * Shows skeleton list while fetching search results
 */
export function SearchResultsLoadingExample() {
  const [results, setResults] = useState<unknown[] | null>(null);
  const isLoading = results === null;

  useEffect(() => {
    const timer = setTimeout(() => {
      setResults([]);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h2>Search Results</h2>
      {isLoading ? (
        <ListSkeleton count={5} />
      ) : (
        <div>{/* Render actual results */}</div>
      )}
    </div>
  );
}

/**
 * INTEGRATION PATTERN FOR CLIENT COMPONENTS
 *
 * Use this pattern for data fetching in client components:
 *
 * export function MyComponent() {
 *   const [data, setData] = useState<DataType | null>(null);
 *   const [isLoading, setIsLoading] = useState(true);
 *
 *   useEffect(() => {
 *     fetch('/api/data')
 *       .then(res => res.json())
 *       .then(data => {
 *         setData(data);
 *         setIsLoading(false);
 *       })
 *       .catch(error => {
 *         console.error(error);
 *         setIsLoading(false);
 *       });
 *   }, []);
 *
 *   return (
 *     isLoading ? <SkeletonComponent /> : <DataComponent data={data} />
 *   );
 * }
 */

/**
 * INTEGRATION PATTERN FOR SERVER COMPONENTS
 *
 * Use Suspense with server components:
 *
 * import { Suspense } from 'react';
 *
 * export default function Page() {
 *   return (
 *     <Suspense fallback={<ProjectCardGridSkeleton count={6} />}>
 *       <ListingsList />
 *     </Suspense>
 *   );
 * }
 *
 * async function ListingsList() {
 *   const data = await fetch('/api/listings');
 *   return <div>{...}</div>;
 * }
 */

/**
 * AVAILABLE SKELETON COMPONENTS FOR IMPORT
 *
 * From @/components/atoms/Skeleton:
 * - Skeleton (base component)
 * - SkeletonText (multi-line text)
 *
 * From @/components/molecules/ProjectCard:
 * - ProjectCardSkeleton (single card)
 *
 * From @/components/molecules/TableRowSkeleton:
 * - TableRowSkeleton (single row)
 * - TableSkeletonRows (multiple rows)
 *
 * From @/components/molecules/DashboardStatSkeleton:
 * - DashboardStatSkeleton (single stat card)
 * - DashboardStatGridSkeleton (4-column grid)
 *
 * From @/components/molecules/SkeletonLoaders:
 * - ProjectCardGridSkeleton (3-column grid)
 * - DataTableSkeleton (full table)
 * - HeroSectionSkeleton (hero with image)
 * - CardGridSkeleton (generic card grid)
 * - ListSkeleton (list items)
 * - ContentSkeleton (article/detail page)
 * - DashboardSkeleton (full dashboard)
 */
