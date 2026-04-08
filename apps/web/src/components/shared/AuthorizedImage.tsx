'use client';

import { CONSTANTS } from '@shared/config/constants';
import Image, { ImageProps } from 'next/image';
import { useEffect, useState } from 'react';

export interface AuthorizedImageProps extends Omit<ImageProps, 'src'> {
  src: string;
}

export const AuthorizedImage = ({
  src,
  alt,
  ...props
}: AuthorizedImageProps) => {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // URL에 /uploads/ 혹은 review_images가 포함된 경우에만 토큰을 실어서 fetch
    const isUploadPath =
      typeof src === 'string' &&
      (src.includes('uploads') || src.includes('review_images'));

    if (isUploadPath) {
      let isMounted = true;

      const fetchImage = async () => {
        try {
          const token = localStorage.getItem(CONSTANTS.STORAGE_KEYS.AUTH_TOKEN);

          // 백엔드 베이스 URL (MVP 기간 동안 지현님 요청으로 Railway 주소 강제 적용)
          const backendBaseUrl = 'https://together-dog.up.railway.app';

          let fetchUrl = src;
          if (!src.startsWith('http')) {
            const hasLeadingSlash = src.startsWith('/');
            fetchUrl = `${backendBaseUrl}${hasLeadingSlash ? '' : '/'}${src}`;
          }

          const response = await fetch(fetchUrl, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          });

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }

          const blob = await response.blob();

          if (isMounted) {
            const url = URL.createObjectURL(blob);
            setObjectUrl(url);
          }
        } catch (error) {
          console.error(`[AuthorizedImage] Failed to load: ${src}`, error);
          if (isMounted) setHasError(true);
        }
      };

      fetchImage();

      return () => {
        isMounted = false;
        if (objectUrl && objectUrl.startsWith('blob:')) {
          URL.revokeObjectURL(objectUrl);
        }
      };
    } else {
      // 일반 URL은 그대로 사용
      setObjectUrl(src);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  if (hasError) {
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

  // blob: URL인 경우 Next.js의 이미지 최적화(/_next/image)가 불가능하므로 unoptimized 강제
  const isBlob = objectUrl.startsWith('blob:');

  return (
    <Image
      alt={alt}
      src={objectUrl}
      unoptimized={isBlob || props.unoptimized}
      {...props}
    />
  );
};
