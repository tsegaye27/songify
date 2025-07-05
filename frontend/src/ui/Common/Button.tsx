import React from "react";
import styled from "@emotion/styled";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "success" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  fullWidth?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  outline: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;

  ${(props) => {
    switch (props.size) {
      case "sm":
        return `
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        `;
      case "lg":
        return `
          padding: 1rem 2rem;
          font-size: 1.125rem;
        `;
      default:
        return `
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
        `;
    }
  }}

  ${(props) => {
    switch (props.variant) {
      case "secondary":
        return `
          background-color: var(--background-color);
          color: var(--text-color);
          border: 1px solid var(--accent-color);
          
          &:hover:not(:disabled) {
            background-color: var(--accent-color);
          }
        `;
      case "danger":
        return `
          background-color: var(--red-primary);
          color: white;
          
          &:hover:not(:disabled) {
            background-color: #ff1a1a;
            transform: translateY(-1px);
          }
        `;
      case "success":
        return `
          background-color: var(--green-primary);
          color: #000;
          
          &:hover:not(:disabled) {
            background-color: #28e85c;
            transform: translateY(-1px);
          }
        `;
      case "ghost":
        return `
          background-color: transparent;
          color: var(--text-color-secondary);
          
          &:hover:not(:disabled) {
            background-color: var(--background-color);
            color: var(--text-color);
          }
        `;
      default:
        return `
          background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
          color: #000;
          font-weight: 700;
          
          &:hover:not(:disabled) {
            background: var(--secondary-color);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
          }
        `;
    }
  }}

  ${(props) => props.fullWidth && "width: 100%;"}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }
`;

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </StyledButton>
  );
};

export default Button;
