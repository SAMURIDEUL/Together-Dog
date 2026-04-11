'use client';

import { CONSTANTS } from '@shared/config/constants';
import { useQuery } from '@tanstack/react-query';
import Image, { ImageProps } from 'next/image';
import { useEffect, useRef, useState } from 'react';

export interface AuthorizedImageProps extends Omit<ImageProps, 'src'> {
  src: string;
}

export const AuthorizedImage = ({
  src,
  alt,
  ...props
}: AuthorizedImageProps) => {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  // 환경 변수에서 백엔드 베이스 URL을 가져옵니다. (설정되지 않은 경우 Next.js 프록시를 타도록 빈 문자열 사용)
  const backendBaseUrl = process.env.NEXT_PUBLIC_API_URL || '';

  const isUploadPath =
    typeof src === 'string' &&
    (src.includes('uploads') || src.includes('review_images')) &&
    (src.startsWith(backendBaseUrl) ||
      (!src.startsWith('http') && !src.startsWith('//')));

  let fetchUrl = src;
  if (isUploadPath && !src.startsWith('http') && !src.startsWith('//')) {
    const hasLeadingSlash = src.startsWith('/');
    fetchUrl = `${backendBaseUrl}${hasLeadingSlash ? '' : '/'}${src}`;
  }

  const { data: blob, isError } = useQuery({
    queryKey: ['authorized-image', fetchUrl],
    queryFn: async () => {
      const token = localStorage.getItem(CONSTANTS.STORAGE_KEYS.AUTH_TOKEN);
      const response = await fetch(fetchUrl, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      return await response.blob();
    },
    enabled: isUploadPath,
    staleTime: 1000 * 60 * 5, // 5분 동안은 캐시된 Blob 사용
  });

  useEffect(() => {
    if (!isUploadPath) {
      setObjectUrl(src);
      objectUrlRef.current = src;
      return;
    }

    if (blob) {
      const url = URL.createObjectURL(blob);
      setObjectUrl(url);
      objectUrlRef.current = url;

      return () => {
        URL.revokeObjectURL(url);
        objectUrlRef.current = null;
      };
    }
  }, [src, isUploadPath, blob]);

  if (isError) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 text-[10px] text-gray-400 ${props.className || ''}`}
      >
        이미지 오류
      </div>
    );
  }

  if (!objectUrl) {
    return (
      <div className={`animate-pulse bg-gray-100 ${props.className || ''}`} />
    );
  }

  const isBlob = objectUrl.startsWith('blob:');

  return (
    <Image
      alt={alt}
      src={objectUrl}
      {...props}
      unoptimized={isBlob || props.unoptimized}
    />
  );
};
