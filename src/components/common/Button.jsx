import { memo } from 'react';
import './Button.css';

export const Button = memo(function Button({ children, onClick, variant = 'primary', className = '', ...props }) {
  return (
    <button
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
});
