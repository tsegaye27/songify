import styled from "@emotion/styled";
import { BiSearch } from "react-icons/bi"; // Import the BiSearch icon

const StyledHeader = styled.header`
  background-color: #181818;
  color: #ffffff;
  padding: 3rem 4rem 1rem 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #333333;
  border-radius: 24px;
  padding: 8px 16px;

  border: 1px solid #00e1ff;
  /* border: 1px solid #00e1ff; */
`;

const SearchInput = styled.input`
  border: none;
  background-color: transparent;
  color: #ffffff;
  font-size: 16px;
  outline: none;
  margin-right: 10px;

  &::placeholder {
    color: #aaaaaa;
  }
`;

const SearchIcon = styled(BiSearch)`
  font-size: 20px;
  color: #aaaaaa;
`;

const Header: React.FC = () => {
  return (
    <StyledHeader>
      <SearchContainer>
        <SearchInput type="text" placeholder="Search" />
        <SearchIcon />
      </SearchContainer>
    </StyledHeader>
  );
};

export default Header;
