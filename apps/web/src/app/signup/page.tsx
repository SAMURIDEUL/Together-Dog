import { SignUpForm } from "./SignUpForm";


export default function SignUpPage() {
  return (
    <div className='flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-4 py-12'>
      <div className='w-full max-w-md space-y-8'>
        <div className='text-center'>
          <h1 className='font-nanum text-4xl font-bold text-gray-900'>
            환영합니다! 👋
          </h1>
          <p className='mt-3 text-gray-600'>
            함께하개 회원이 되어 다양한 장소를 기록해 보세요.
          </p>
        </div>

        <div className='rounded-2xl border border-gray-100 bg-white p-8 shadow-sm'>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}
