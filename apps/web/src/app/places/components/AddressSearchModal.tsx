'use client';

import DaumPostcodeEmbed from 'react-daum-postcode';

interface AddressSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: unknown) => void;
}

export const AddressSearchModal = ({
  isOpen,
  onClose,
  onComplete,
}: AddressSearchModalProps) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
      <div className='relative w-full max-w-lg rounded-xl bg-white p-4 shadow-xl'>
        <button
          className='absolute right-4 top-4 text-gray-500 hover:text-gray-700'
          onClick={onClose}
        >
          ✕
        </button>
        <h3 className='mb-4 text-lg font-bold text-gray-900'>지역 검색</h3>
        <div className='h-[400px] border'>
          <DaumPostcodeEmbed
            style={{ height: '100%' }}
            onComplete={onComplete}
          />
        </div>
      </div>
    </div>
  );
};
