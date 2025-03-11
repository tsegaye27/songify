import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { BiX } from "react-icons/bi";

const modalBg = "#1c1f2b";
const textColor = "#ffffff";
const overlayColor = "rgba(0, 0, 0, 0.7)";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${overlayColor}; /* Updated overlay color */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${modalBg}; /* Updated modal background color */
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5);
  max-width: 500px;
  width: 90%;
  position: relative; /* Positioning for the close button */
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px; /* Adjust as needed */
  right: 10px; /* Adjust as needed */
  background: transparent;
  border: none;
  color: ${textColor};
  font-size: 24px; /* Increase size for visibility */
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #ff4d4d; /* Change color on hover */
  }
`;

export const Title = styled.h2`
  color: ${textColor}; /* Updated text color */
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
      <ModalContent>
        <CloseButton onClick={onClose}>
          <BiX />
        </CloseButton>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
