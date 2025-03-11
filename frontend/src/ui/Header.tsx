import styled from "@emotion/styled";
import { BiSearch } from "react-icons/bi";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../redux/slices/searchSlice";
import RootState from "../redux/RootState";

const StyledHeader = styled.header`
  position: relative;
  background-color: rgba(0, 0, 0, 0.3); /* Darker background */
  color: var(--text-color);
  padding: 3rem 4rem 1rem 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4); /* Increased shadow for depth */

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("/banner.jpg");
    background-size: cover;
    opacity: 0.4; /* Adjusted opacity for better visibility */
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
  padding: 0.1rem 1rem;
  width: 20rem;
  border: 1px solid var(--accent-color); /* Updated border color */
  transition: border 0.3s ease;

  &:hover {
    border-color: var(--primary-color); /* Border change on hover */
  }
`;

const SearchInput = styled.input`
  border: none;
  background-color: transparent;
  color: var(--text-color);
  font-size: 16px;
  outline: none;
  padding: 8px 0; /* Vertical padding for input */
  flex: 1; /* Allows input to use available space */

  &::placeholder {
    color: var(--text-color); /* Different color for placeholder */
    opacity: 0.8; /* Slight transparency for placeholder */
  }
`;

const SearchIcon = styled(BiSearch)`
  font-size: 20px;
  color: var(--tertiary-color);
  margin-left: 10px; /* Space between the input and icon */
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
