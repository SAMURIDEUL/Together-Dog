import { iconPaths } from '@together-dog/ui';

// 제한사항 키워드 데이터 타입 정의
export interface RestrictionKeyword {
  keyword: string;
  name: keyof typeof iconPaths.restriction;
  label: string;
  variant?: 'default' | 'positive' | 'warning';
}
