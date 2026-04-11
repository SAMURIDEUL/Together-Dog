import Compressor from 'compressorjs-next';

/**
 * compressorjs-next 라이브러리를 활용한 이미지 압축 유틸리티
 * browser-image-compression의 대안으로, 더 활발하게 유지보수되는 라이브러리입니다.
 * EXIF 회전 처리, 품질 조절, 포맷 변환 등을 지원합니다.
 */

export const compressImage = async (
  file: File,
  options: { maxWidth?: number; maxSizeMB?: number } = {},
): Promise<File> => {
  const { maxWidth = 1920 } = options;
  if (!file.type.startsWith('image/')) {
    return file; // 이미지가 아니면 원본 반환
  }

  return new Promise((resolve) => {
    new Compressor(file, {
      quality: 0.8, // 기본 품질 설정
      maxWidth: maxWidth,
      maxHeight: maxWidth, // 정사각형 비율 유지 혹은 최대 크기 제한
      mimeType: 'image/jpeg', // 백엔드 통일을 위해 JPEG로 포맷 강제 변환
      success: (result) => {
        // 백엔드 415(Unsupported Media Type) 에러 방지용: 고유 식별자 추가
        const baseName = file.name.replace(/\.[^/.]+$/, '');
        const uniqueSuffix =
          Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
        const newFileName = `${baseName}_${uniqueSuffix}.jpg`;

        // 결과물이 Blob인 경우 File 객체로 변환하여 반환
        const compressedFile = new File([result], newFileName, {
          type: 'image/jpeg',
          lastModified: Date.now(),
        });

        resolve(compressedFile);
      },
      error: (err) => {
        console.error('Image compression failed:', err.message);
        resolve(file); // 에러 발생 시 원본 파일 반환
      },
    });
  });
};
