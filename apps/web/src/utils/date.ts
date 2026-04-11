/**
 * Date 객체나 날짜 문자열을 받아서 로컬 시간 기준 'YYYY-MM-DD' 형식으로 반환합니다.
 * 주로 <input type="date">의 value 값으로 사용하기 위해 쓰입니다.
 */
export const formatToLocalYYYYMMDD = (dateInput?: Date | string) => {
  const date = dateInput ? new Date(dateInput) : new Date();

  // 날짜가 유효하지 않으면 빈 문자열 반환
  if (isNaN(date.getTime())) return '';

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

/**
 * 날짜 문자열을 "YYYY. MM. DD" 형식으로 변환합니다 (마지막 점 제외).
 * 주로 화면 출력용으로 사용됩니다.
 */
export const formatDisplayDate = (dateStr?: string) => {
  if (!dateStr) return '';

  // "2025-03-15 00-00-00" 같은 비표준 포맷 대응
  const normalizedStr = dateStr.replace(
    /(\d{4}-\d{2}-\d{2})\s(\d{2})-(\d{2})-(\d{2})/,
    '$1T$2:$3:$4',
  );

  const date = new Date(normalizedStr);
  if (isNaN(date.getTime())) return dateStr;

  return date
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\.$/, '');
};
