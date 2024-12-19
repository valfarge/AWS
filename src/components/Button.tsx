import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  isLoading,
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        "px-4 py-2 rounded-md font-medium transition-colors",
        variant === 'primary' && "bg-indigo-600 text-white hover:bg-indigo-700",
        variant === 'secondary' && "bg-gray-200 text-gray-900 hover:bg-gray-300",
        isLoading && "opacity-50 cursor-not-allowed",
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};