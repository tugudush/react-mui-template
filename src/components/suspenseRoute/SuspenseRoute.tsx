import { type ComponentType, Suspense } from 'react'

import LoadingFallback from '@/components/loadingFallback'

interface SuspenseRouteProps {
  component: ComponentType
}

export default function SuspenseRoute({
  component: Component,
}: SuspenseRouteProps) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Component />
    </Suspense>
  )
}
