import './Button.css';

export function Button({ children, onClick, variant = 'primary', className = '', ...props }) {
  return (
    <button
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
