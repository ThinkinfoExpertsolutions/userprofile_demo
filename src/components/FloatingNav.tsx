
import React from "react";

interface LoginFloatingNavProps {
  className?: string;
  children?: React.ReactNode; // This allows the component to accept children
}

export const LoginFloatingNav: React.FC<LoginFloatingNavProps> = ({ className, children }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};