import { type ComponentType, Suspense } from 'react'

import ErrorBoundary from '@/components/errorBoundary'
import LoadingFallback from '@/components/loadingFallback'

interface SuspenseRouteProps {
  component: ComponentType
}

export default function SuspenseRoute({
  component: Component,
}: SuspenseRouteProps) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <Component />
      </Suspense>
    </ErrorBoundary>
  )
}
