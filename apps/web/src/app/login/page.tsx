import Link from 'next/link';

import { LoginForm } from './components/LoginForm';

export default function LoginPage() {
  return (
    <main className='mx-auto flex w-full max-w-md flex-col px-4 pt-10 md:pt-20'>
      <div className='mb-8'>
        <h1 className='flex flex-col items-center justify-center text-xl font-bold text-gray-900 md:text-2xl'>
          함께하는 강아지, <br /> Together Dog
        </h1>
        <p className='mt-2 flex flex-col items-center justify-center text-sm text-gray-400'>
          투개더 독에 로그인해 주세요!
        </p>
      </div>

      <LoginForm />

      <div className='mt-8 text-center text-sm'>
        <span className='mr-2 text-gray-400'>아직 회원이 아니신가요?</span>
        <Link
          className='font-bold text-blue-500 hover:text-blue-600'
          href='/signup'
        >
          1분만에 회원가입 완료
        </Link>
      </div>
    </main>
  );
}
