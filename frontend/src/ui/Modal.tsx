import React, { useEffect } from "react";
import styled from "@emotion/styled";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: var(--modal-bg);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 90%;
`;

export const Title = styled.h2`
  color: var(--text-color);
  text-align: center;
`;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={(e) => e.target === e.currentTarget && onClose()}>
      <ModalContent>{children}</ModalContent>
    </ModalOverlay>
  );
};

export default Modal;

