'use client';

import { CONSTANTS } from '@shared/config/constants';
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
  const [hasError, setHasError] = useState(false);
  const objectUrlRef = useRef<string | null>(null);

  // 환경 변수에서 백엔드 베이스 URL을 가져옵니다. (설정되지 않은 경우 로컬호스트를 기본값으로 사용)
  const backendBaseUrl =
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

  useEffect(() => {
    let isMounted = true;
    setHasError(false);

    const isUploadPath =
      typeof src === 'string' &&
      (src.includes('uploads') || src.includes('review_images')) &&
      (src.startsWith(backendBaseUrl) ||
        (!src.startsWith('http') && !src.startsWith('//')));

    if (isUploadPath) {
      const fetchImage = async () => {
        try {
          const token = localStorage.getItem(CONSTANTS.STORAGE_KEYS.AUTH_TOKEN);
          let fetchUrl = src;

          if (!src.startsWith('http') && !src.startsWith('//')) {
            const hasLeadingSlash = src.startsWith('/');
            fetchUrl = `${backendBaseUrl}${hasLeadingSlash ? '' : '/'}${src}`;
          }

          const response = await fetch(fetchUrl, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          });

          if (!response.ok) throw new Error(`HTTP ${response.status}`);

          const blob = await response.blob();
          if (isMounted) {
            const url = URL.createObjectURL(blob);
            objectUrlRef.current = url;
            setObjectUrl(url);
          }
        } catch (error) {
          console.error(`[AuthorizedImage] Failed to load: ${src}`, error);
          if (isMounted) setHasError(true);
        }
      };

      fetchImage();
    } else {
      setObjectUrl(src);
      objectUrlRef.current = src;
    }

    return () => {
      isMounted = false;
      // Ref를 사용하여 최신 Blob URL을 안전하게 해제
      if (objectUrlRef.current && objectUrlRef.current.startsWith('blob:')) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
    };
  }, [src, backendBaseUrl]);

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
