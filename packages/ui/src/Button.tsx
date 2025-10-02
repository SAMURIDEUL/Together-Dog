// packages/ui/src/Button.tsx
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

// Tailwind 클래스 (bg-blue-500, text-white 등)를 사용하여 스타일링합니다.
export const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      type="button"
      className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-150"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
