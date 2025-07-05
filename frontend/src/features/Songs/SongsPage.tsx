import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongsStart } from "../../redux/slices/songSlice";
import RootState from "../../redux/RootState";
import { Loader, EmptyState, Button } from "../../ui";
import { BiPlus, BiMusic, BiFilter } from "react-icons/bi";
import SongItem from "./components/SongItem";
import AddSongModal from "./components/AddSongModal";
import Pagination from "../../ui/Common/Pagination";
import styled from "@emotion/styled";
import { fetchGenres, fetchAlbums } from "../../api/songsAPI";

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 400px);
`;
const GridWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  color: var(--text-color);
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: var(--second-background-color);
  border-radius: var(--radius-lg);
  border: 1px solid var(--accent-color);
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FilterLabel = styled.label`
  color: var(--text-color);
  font-size: 0.875rem;
  font-weight: 500;
`;

const FilterSelect = styled.select`
  padding: 0.75rem;
  border: 1px solid var(--accent-color);
  border-radius: var(--radius-md);
  background-color: var(--background-color);
  color: var(--text-color);
  font-size: 0.875rem;
  min-width: 200px;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const ClearFiltersButton = styled(Button)`
  margin-top: 1.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const SongsPage: React.FC = () => {
  const dispatch = useDispatch();
  const { songs, loading, error, pagination } = useSelector(
    (state: RootState) => state.songs,
  );
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    album: "",
    genre: "",
    page: 1,
    limit: 10,
  });

  const [genres, setGenres] = useState<string[]>([]);
  const [albums, setAlbums] = useState<string[]>([]);

  useEffect(() => {
    const getFilterOptions = async () => {
      try {
        const [fetchedGenres, fetchedAlbums] = await Promise.all([
          fetchGenres(),
          fetchAlbums(),
        ]);
        setGenres(fetchedGenres);
        setAlbums(fetchedAlbums);
      } catch (error) {
        console.error("Failed to fetch filter options:", error);
      }
    };
    getFilterOptions();
  }, []);

  useEffect(() => {
    dispatch(fetchSongsStart(filters));
  }, [dispatch, filters]);

  const handleFilterChange = (key: string, value: string | number) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: key !== "page" ? 1 : (value as number),
    }));
  };

  const clearFilters = () => {
    setFilters({
      genre: "",
      album: "",
      page: 1,
      limit: 10,
    });
  };

  if (loading && songs.length === 0) {
    return <Loader message="Fetching your music..." />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <PageHeader>
        <PageTitle>Songs</PageTitle>
        <Button variant="primary" onClick={() => setAddModalOpen(true)}>
          <BiPlus /> Add Song
        </Button>
      </PageHeader>

      <FiltersContainer>
        <FilterGroup>
          <FilterLabel>Filter by Genre</FilterLabel>
          <FilterSelect
            value={filters.genre}
            onChange={(e) => handleFilterChange("genre", e.target.value)}
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </FilterSelect>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Filter by Album</FilterLabel>
          <FilterSelect
            value={filters.album}
            onChange={(e) => handleFilterChange("album", e.target.value)}
          >
            <option value="">All Albums</option>
            {albums.map((album) => (
              <option key={album} value={album}>
                {album}
              </option>
            ))}
          </FilterSelect>
        </FilterGroup>

        <ClearFiltersButton
          variant="secondary"
          size="sm"
          onClick={clearFilters}
        >
          <BiFilter /> Clear Filters
        </ClearFiltersButton>
      </FiltersContainer>
      <ContentWrapper>
        {songs.length === 0 ? (
          <EmptyState
            icon={<BiMusic />}
            title="No Songs Found"
            description="No songs match your current filters. Try adjusting your search criteria."
          />
        ) : (
          <GridWrapper>
            <Grid>
              {songs.map((song) => (
                <SongItem key={song._id} song={song} />
              ))}
            </Grid>
          </GridWrapper>
        )}
        {songs.length > 0 && pagination && pagination.totalPages > 1 && (
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={(p) => setFilters((f) => ({ ...f, page: p }))}
          />
        )}
      </ContentWrapper>
      <AddSongModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
      />
    </>
  );
};

export default SongsPage;
