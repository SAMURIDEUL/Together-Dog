'use client';

import { Button } from '@together-dog/ui';

import { useToastStore } from '@/stores/useToastStore';

export default function ToastTestPage() {
  const { addToast } = useToastStore();

  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-4 p-4'>
      <h1 className='text-2xl font-bold'>Toast Test Page</h1>
      <div className='flex flex-col gap-2'>
        <Button
          size='lg'
          onClick={() => addToast('This is a default toast.', 'default')}
        >
          Trigger Default Toast
        </Button>
        <Button
          className='bg-green-600 text-white hover:bg-green-700'
          size='lg'
          onClick={() => addToast('Operation successful!', 'success')}
        >
          Trigger Success Toast
        </Button>
        <Button
          className='bg-red-600 text-white hover:bg-red-700'
          size='lg'
          onClick={() => addToast('Operation failed.', 'error')}
        >
          Trigger Error Toast
        </Button>
        <Button
          size='lg'
          variant='secondary'
          onClick={() => {
            addToast('Fast Toast (1s)', 'default', 1000);
          }}
        >
          Short Duration (1s)
        </Button>
      </div>
    </div>
  );
}
