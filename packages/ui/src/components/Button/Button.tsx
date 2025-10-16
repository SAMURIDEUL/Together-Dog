// packages/ui/src/Button.tsx
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

// Tailwind 클래스 (bg-blue-500, text-white 등)를 사용하여 스타일링합니다.
export const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      className='rounded-lg bg-indigo-600 px-4 py-2 text-white shadow-md transition duration-150 hover:bg-indigo-700'
      type='button'
      onClick={onClick}
    >
      {children}
    </button>
  );
};
