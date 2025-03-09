import styled from "@emotion/styled";
import { BiSearch } from "react-icons/bi";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../redux/slices/searchSlice";
import RootState from "../redux/RootState";

const StyledHeader = styled.header`
  position: relative;
  background-color: rgba(0, 0, 0, 0.1);
  color: var(--text-color);
  padding: 3rem 4rem 1rem 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("/banner.jpg");
    background-size: cover;
    opacity: 0.5; /* Instead of blur */
    z-index: -1;
  }

  @media (max-width: 768px) {
    padding: 2rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--second-background-color);
  border-radius: 24px;
  padding: 8px 16px;
  width: 20rem;
  border: 1px solid #00e1ff;
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
`;

const SearchIcon = styled(BiSearch)`
  font-size: 20px;
  color: var(--tertiary-color);
`;

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.search.query);

  const memoizedSearchQuery = useMemo(() => searchQuery, [searchQuery]);

  function handleSearchQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setSearchQuery(event.target.value));
  }

  return (
    <StyledHeader>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Type here to search..."
          value={memoizedSearchQuery}
          onChange={handleSearchQueryChange}
        />
        <SearchIcon />
      </SearchContainer>
    </StyledHeader>
  );
};

export default Header;
