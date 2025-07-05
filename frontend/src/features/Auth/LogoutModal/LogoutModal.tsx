import React from "react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/slices/authSlice";
import RootState from "../../../redux/RootState";
import { BiX } from "react-icons/bi";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background-color: var(--second-background-color);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  width: 90%;
  max-width: 400px;
  border: 1px solid var(--accent-color);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Title = styled.h3`
  color: var(--text-color);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: var(--text-color-secondary);
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: color 0.3s ease;

  &:hover {
    color: var(--text-color);
  }
`;

const Content = styled.div`
  color: var(--text-color-secondary);
  margin-bottom: 2rem;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const Button = styled.button<{ variant?: "danger" | "secondary" }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  ${(props) =>
    props.variant === "danger"
      ? `
    background-color: var(--red-primary);
    color: white;

    &:hover {
      background-color: #ff1a1a;
      transform: translateY(-1px);
    }
  `
      : `
    background-color: var(--background-color);
    color: var(--text-color);
    border: 1px solid var(--accent-color);

    &:hover {
      background-color: var(--accent-color);
    }
  `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const loading = useSelector((s: RootState) => s.auth.loading);

  const handleLogout = () => {
    dispatch(logout());
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>Sign Out</Title>
          <CloseButton onClick={onClose}>
            <BiX size={24} />
          </CloseButton>
        </Header>
        <Content>Are you sure you want to sign out of your account?</Content>
        <ButtonContainer>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="danger" onClick={handleLogout} disabled={loading}>
            {loading ? "Signing Out..." : "Sign Out"}
          </Button>
        </ButtonContainer>
      </Modal>
    </Overlay>
  );
};

export default LogoutModal;
