'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

interface SearchParamsWrapperProps {
  children: (hasAuthRequired: boolean) => ReactNode;
}

export function SearchParamsWrapper({ children }: SearchParamsWrapperProps) {
  const searchParams = useSearchParams();
  const hasAuthRequired = searchParams?.get('auth') === 'required';

  return children(hasAuthRequired);
}
