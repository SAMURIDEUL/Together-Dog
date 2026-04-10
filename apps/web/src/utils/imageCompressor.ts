import imageCompression from 'browser-image-compression';

/**
 * browser-image-compression 라이브러리를 활용한 이미지 압축 유틸리티
 * EXIF 자동 회전, Web Worker를 통한 비동기 처리, 확장자 강제 변환 등을 지원합니다.
 */

export const compressImage = async (
  file: File,
  options = { maxWidth: 1920, maxSizeMB: 1 },
): Promise<File> => {
  if (!file.type.startsWith('image/')) {
    return file; // 이미지가 아니면 원본 반환
  }

  try {
    const compressionOptions = {
      maxSizeMB: options.maxSizeMB,
      maxWidthOrHeight: options.maxWidth,
      useWebWorker: true,
      fileType: 'image/jpeg', // 백엔드 통일을 위해 JPEG로 포맷 강제 변환
    };

    const compressedBlob = await imageCompression(file, compressionOptions);

    // 백엔드 415(Unsupported Media Type) 에러 방지용: 고유 식별자 추가
    const baseName = file.name.replace(/\.[^/.]+$/, '');
    const uniqueSuffix =
      Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
    const newFileName = `${baseName}_${uniqueSuffix}.jpg`;

    // 완전히 독립적인 메모리 참조를 갖도록 Blob을 한 번 더 복제(Clone)합니다.
    // 브라우저 캐싱/참조 꼬임으로 인해 Axios가 멀티파트를 망가뜨려 415 에러가 나는 것을 방지합니다.
    const clonedBlob = new Blob([compressedBlob], { type: 'image/jpeg' });
    return new File([clonedBlob], newFileName, {
      type: 'image/jpeg',
    });
  } catch (error) {
    console.error('Image compression failed:', error);
    return file; // 에러 발생 시 원본 파일 반환
  }
};
