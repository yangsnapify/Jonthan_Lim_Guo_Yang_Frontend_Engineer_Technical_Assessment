import type { ReactNode } from 'react';

interface BackButtonProps {
  children: ReactNode;
  onClick: () => void;
}

export function BackButton({ children, onClick }: BackButtonProps) {
  return (
    <button type="button" className="back-button" onClick={onClick}>
      ← {children}
    </button>
  );
}
