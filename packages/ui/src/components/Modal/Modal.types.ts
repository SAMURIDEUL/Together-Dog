import { ReactNode } from 'react';

export interface ModalProps {
  /** 모달 열림 여부 */
  isOpen: boolean;
  /** 모달 닫기 핸들러 (백드롭 클릭, 닫기 버튼, ESC 키) */
  onClose: () => void;
  /** 모달 제목 */
  title?: ReactNode;
  /** 모달 내용 */
  children: ReactNode;
  /** 닫기 버튼 표시 여부 */
  showCloseButton?: boolean;
  /** 주 버튼 (오른쪽 or 단독) */
  primaryAction?: {
    label: string;
    onClick: () => void;
    isDisabled?: boolean;
  };
  /** 보조 버튼 (왼쪽) */
  secondaryAction?: {
    label: string;
    onClick: () => void;
    isDisabled?: boolean;
  };
  /** 모달 너비 */
  width?: string;
  className?: string;
}
