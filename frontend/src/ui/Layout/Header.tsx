import React, { useState, useMemo, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { BiSearch } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchSongsStart } from "../../redux/slices/songSlice";

const Container = styled.header`
  padding: 1.5rem 2rem;
  background-color: var(--second-background-color);
  border-bottom: 1px solid var(--accent-color);
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 2rem;
`;

const PageTitle = styled.h2`
  color: var(--text-color);
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  text-transform: capitalize;
  justify-self: start;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--background-color);
  border: 1px solid var(--accent-color);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  gap: 0.75rem;
  width: 100%;
  max-width: 500px;
  transition: border-color 0.3s ease;
  justify-self: center;

  &:focus-within {
    border-color: var(--primary-color);
  }
`;

const SearchInput = styled.input`
  background: none;
  border: none;
  outline: none;
  color: var(--text-color);
  font-size: 0.875rem;
  flex: 1;

  &::placeholder {
    color: var(--text-color-secondary);
  }
`;

const SearchIcon = styled(BiSearch)`
  color: var(--text-color-secondary);
  font-size: 1.125rem;
`;

// Empty div to balance the grid layout
const RightPlaceholder = styled.div`
  justify-self: end;
`;

const Header: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const pageTitle = useMemo(() => {
    const path = location.pathname.substring(1);
    if (path === "") return "Dashboard";
    if (path.startsWith("playlists/")) return "Playlist Details";
    return path;
  }, [location.pathname]);

  // Only show search on the songs page for now
  const showSearch = location.pathname === "/songs";

  // Clear search query when navigating away from a searchable page
  useEffect(() => {
    if (!showSearch) {
      setSearchQuery("");
    }
  }, [showSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Clear previous debounce timeout
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Set a new timeout to avoid firing API calls on every keystroke
    debounceTimeout.current = setTimeout(() => {
      if (location.pathname === "/songs") {
        // Dispatch search action for songs
        dispatch(fetchSongsStart({ search: value, page: 1, limit: 12 }));
      }
      // Future: else if (location.pathname === "/playlists") { ... }
    }, 500); // 500ms debounce delay
  };

  return (
    <Container>
      <PageTitle>{pageTitle}</PageTitle>

      {showSearch ? (
        <SearchContainer>
          <SearchIcon />
          <SearchInput
            type="text"
            placeholder={`Search ${pageTitle.toLowerCase()}...`}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </SearchContainer>
      ) : (
        <div /> // Empty div to keep the grid centered
      )}

      <RightPlaceholder />
    </Container>
  );
};

export default Header;
