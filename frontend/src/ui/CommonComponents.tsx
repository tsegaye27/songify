import styled from "@emotion/styled";

export const AddSongButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }
`;

export const AddSongContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--text-color);
  cursor: pointer;
`;

export const AddNewSongContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

export const StyledSongList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  gap: clamp(0.5rem, 1vw, 1rem);
  padding: clamp(0.5rem, 1vw, 1rem);
  justify-content: center;
  align-items: center;
  margin-top: clamp(0.5rem, 1vw, 1rem);

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  }
`;

export const EmptyListContainer = styled.div`
  text-align: center;
  padding: 20px;
  color: #888;
  font-size: 16px;
`;
