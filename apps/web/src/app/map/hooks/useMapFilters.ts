'use client';

import { useMemo, useState } from 'react';

import { SortOrder } from '@/utils/map/filterUtils';

import { DEFAULT_FILTERS, MapFilters } from '../components/FilterPanel';

export const useMapFilters = () => {
  const [keyword, setKeyword] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([3]); // 기본값: 카페
  const [filters, setFilters] = useState<MapFilters>(DEFAULT_FILTERS);
  const [sortBy, setSortBy] = useState<SortOrder>('rating');

  const toggleCategory = (id: number) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const activeChips = useMemo(() => {
    const chips: { handleRemove: () => void; id: string; label: string }[] = [];
    if (filters.minRating === 4) {
      chips.push({
        handleRemove: () => setFilters({ ...filters, minRating: null }),
        id: 'rating',
        label: '★ 4.0+',
      });
    }
    if (filters.hasParking) {
      chips.push({
        handleRemove: () => setFilters({ ...filters, hasParking: null }),
        id: 'parking',
        label: '주차',
      });
    }
    filters.sizeLimit.forEach((size) =>
      chips.push({
        handleRemove: () =>
          setFilters({
            ...filters,
            sizeLimit: filters.sizeLimit.filter((s) => s !== size),
          }),
        id: `size-${size}`,
        label: size,
      }),
    );
    filters.essentialPolicies.forEach((p) =>
      chips.push({
        handleRemove: () =>
          setFilters({
            ...filters,
            essentialPolicies: filters.essentialPolicies.filter((x) => x !== p),
          }),
        id: `p-${p}`,
        label: p,
      }),
    );
    return chips;
  }, [filters]);

  const activeFilterCount =
    activeChips.length +
    (filters.isIndoor ? 1 : 0) +
    (filters.isOutdoor ? 1 : 0);

  return {
    keyword,
    setKeyword,
    selectedCategories,
    setSelectedCategories,
    toggleCategory,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    activeChips,
    activeFilterCount,
  };
};
