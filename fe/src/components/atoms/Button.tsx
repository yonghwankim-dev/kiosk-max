interface ButtonProps {
  label: string;
  className: string;
  isSelected?: boolean;
  selectedClassName?: string;
  onClick: () => void;
  disabled?: boolean;
}

export default function Button({ label, className, isSelected, selectedClassName, onClick, disabled }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${className} ${isSelected ? `${selectedClassName}` : ''}`}
    >
      {label}
    </button>
  );
}
