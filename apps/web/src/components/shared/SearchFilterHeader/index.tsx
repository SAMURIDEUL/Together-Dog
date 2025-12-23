'use client';

import { cn, Icon, SearchIcon } from '@together-dog/ui';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { type ComponentProps, useEffect, useState } from 'react';

const REGIONS = ['전체', '성수동', '연남동', '강남역', '송리단길', '한남동'];

export const SearchFilterHeader = ({
  className,
  ...props
}: ComponentProps<'header'>) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
  const activeRegion = searchParams.get('region') || '전체';
  const currentView = pathname === '/map' ? 'map' : 'list';

  // Sync keyword state with URL search params (e.g., when navigating back)
  useEffect(() => {
    setKeyword(searchParams.get('keyword') || '');
  }, [searchParams]);

  const handleSearch = (newKeyword: string = keyword) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newKeyword.trim()) {
      params.set('keyword', newKeyword.trim());
    } else {
      params.delete('keyword');
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleRegionClick = (region: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (region === '전체') {
      params.delete('region');
    } else {
      params.set('region', region);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const toggleView = () => {
    const targetPath = currentView === 'map' ? '/places' : '/map';
    router.push(`${targetPath}?${searchParams.toString()}`);
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md',
        className,
      )}
      {...props}
    >
      <div className='mx-auto max-w-screen-xl px-4 py-4 md:px-8'>
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          {/* Search Bar */}
          <div className='relative max-w-lg flex-1'>
            <SearchIcon className='absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400' />
            <input
              className='w-full rounded-full border border-gray-200 bg-gray-50 py-2.5 pl-11 pr-4 text-sm outline-none transition-all focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100'
              placeholder='장소나 지역을 검색해보세요'
              type='text'
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>

          {/* View Toggle */}
          <div className='flex items-center gap-2'>
            <button
              className={cn(
                'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all',
                currentView === 'list'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
              )}
              onClick={() => currentView !== 'list' && toggleView()}
            >
              <Icon group='general' name='info' size={16} />{' '}
              {/* Replace with List Icon if available */}
              리스트
            </button>
            <button
              className={cn(
                'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all',
                currentView === 'map'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
              )}
              onClick={() => currentView !== 'map' && toggleView()}
            >
              <Icon group='general' name='map' size={16} />
              지도
            </button>
          </div>
        </div>

        {/* Region Chips */}
        <div className='scrollbar-none mt-4 flex flex-wrap gap-2 overflow-x-auto pb-2'>
          {REGIONS.map((region) => (
            <button
              key={region}
              className={cn(
                'whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium transition-all',
                activeRegion === region
                  ? 'bg-gray-900 text-white'
                  : 'border border-gray-200 bg-white text-gray-600 hover:border-gray-400',
              )}
              onClick={() => handleRegionClick(region)}
            >
              {region}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
