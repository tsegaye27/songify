import styled from "@emotion/styled";
import React from "react";
import { BiLeftArrow } from "react-icons/bi";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  background-color: #222;
  color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px 2px rgba(0, 255, 123, 0.674);
  max-height: 80%;
  min-height: 40%;
  min-width: 40%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: #333;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #555;
    border-radius: 10px;
    border: 3px solid #333; /* Adds padding around thumb */
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #777;
  }
`;

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: gray;
  cursor: pointer;
`;

const Title = styled.h2`
  font-size: 18px;
`;

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <ModalContainer>
      <ModalContent>
        {children}
        <Container onClick={onClose}>
          <BiLeftArrow />
          <Title>Back</Title>
        </Container>
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;
