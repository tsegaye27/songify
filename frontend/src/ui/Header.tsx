import styled from "@emotion/styled";
import { BiSearch } from "react-icons/bi";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../redux/slices/searchSlice";
import RootState from "../redux/RootState";

const StyledHeader = styled.header`
  position: relative;
  background-image: url("/banner.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: rgba(0, 0, 0, 0.1);
  color: var(--text-color);
  padding: 3rem 4rem 1rem 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("/banner.jpg");
    background-position: center;
    background-size: cover;
    filter: blur(5px);
    z-index: -1;
  }

  @media (max-width: 768px) {
    padding: 2rem 2rem 1rem 2rem;
  }

  @media (max-width: 480px) {
    padding: 1rem 1rem 0.5rem 1rem;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--second-background-color);
  border-radius: 24px;
  padding: 8px 16px;
  width: 20rem;
  justify-content: space-between;
  border: 1px solid #00e1ff;

  @media (max-width: 768px) {
    width: 15rem;
  }

  @media (max-width: 480px) {
    width: 10rem;
    padding: 6px 12px;
  }
`;

const SearchInput = styled.input`
  border: none;
  background-color: transparent;
  color: var(--text-color);
  font-size: 16px;
  outline: none;
  margin-right: 10px;

  &::placeholder {
    color: var(--tertiary-color);
  }

  @media (max-width: 480px) {
    font-size: 14px;
    margin-right: 5px;
  }
`;

const SearchIcon = styled(BiSearch)`
  font-size: 20px;
  color: var(--tertiary-color);

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.search.query);

  function handleSearchQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setSearchQuery(event.target.value));
  }

  return (
    <StyledHeader>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Type here to search..."
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
        <SearchIcon />
      </SearchContainer>
    </StyledHeader>
  );
};

export default Header;
