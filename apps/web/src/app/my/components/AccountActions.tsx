'use client';

import { useRouter } from 'next/navigation';

import { useLogoutMutation } from '@/hooks/queries/useAuthMutation';
import { useDeleteAccountMutation } from '@/hooks/queries/useUserQuery';
import { useAuthStore } from '@/stores/useAuthStore';
import { useModalStore } from '@/stores/useModalStore';
import { useToastStore } from '@/stores/useToastStore';

export const AccountActions = () => {
  const router = useRouter();
  const { setLogout } = useAuthStore();
  const { openModal, closeModal } = useModalStore();
  const { addToast } = useToastStore();

  const { mutate: logoutMutate, isPending: isLoggingOut } = useLogoutMutation({
    onSuccess: () => {
      setLogout();
      addToast('로그아웃 되었습니다.', 'success');
      router.push('/');
    },
    onError: (error) => {
      // 서버 에러여도 로컬 상태는 초기화
      setLogout();
      addToast('로그아웃 중 오류가 발생했습니다.', 'error');
      console.error('Logout error:', error);
      router.push('/');
    },
  });

  const { mutate: deleteAccount, isPending: isDeleting } =
    useDeleteAccountMutation({
      onSuccess: () => {
        setLogout();
        addToast('회원 탈퇴가 완료되었습니다.', 'default');
        router.push('/');
      },
      onError: () => {
        addToast('회원 탈퇴에 실패했습니다.', 'error');
      },
    });

  const handleLogout = () => {
    openModal({
      title: '로그아웃',
      content: '정말 로그아웃 하시겠습니까?',
      primaryAction: {
        label: '로그아웃',
        onClick: () => {
          closeModal();
          logoutMutate();
        },
      },
      secondaryAction: {
        label: '취소',
        onClick: closeModal,
      },
    });
  };

  const handleDeleteAccount = () => {
    openModal({
      title: '⚠️ 회원 탈퇴',
      content:
        '정말로 탈퇴하시겠습니까?\n탈퇴 후에는 모든 데이터가 삭제되며 복구할 수 없습니다.',
      primaryAction: {
        label: '탈퇴하기',
        onClick: () => {
          closeModal();
          deleteAccount();
        },
      },
      secondaryAction: {
        label: '취소',
        onClick: closeModal,
      },
    });
  };

  return (
    <section className='space-y-3'>
      {/* 로그아웃 */}
      <button
        className='w-full rounded-2xl border border-gray-100 bg-white p-4 text-left text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50'
        disabled={isLoggingOut}
        type='button'
        onClick={handleLogout}
      >
        {isLoggingOut ? '로그아웃 중...' : '로그아웃'}
      </button>

      {/* 회원 탈퇴 */}
      <button
        className='w-full rounded-2xl border border-red-100 bg-white p-4 text-left text-sm font-medium text-red-500 shadow-sm transition-colors hover:bg-red-50'
        disabled={isDeleting}
        type='button'
        onClick={handleDeleteAccount}
      >
        {isDeleting ? '탈퇴 처리 중...' : '회원 탈퇴'}
      </button>
    </section>
  );
};
