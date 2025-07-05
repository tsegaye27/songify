import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { BiMusic, BiUser, BiDisc, BiRightArrowAlt } from "react-icons/bi";
import { BsCollectionPlay } from "react-icons/bs";
import { Loader, Button } from "../../ui";
import RootState from "../../redux/RootState";
import { fetchStatisticsStart } from "../../redux/slices/statisticsSlice";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background-color: var(--second-background-color);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  border: 1px solid var(--accent-color);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all var(--transition-base);
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
    border-color: var(--primary-color);
  }
`;

const StatIcon = styled.div`
  font-size: 2.5rem;
  color: var(--primary-color);
`;

const StatContent = styled.div`
  flex: 1;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 600;
  color: var(--text-color);
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: var(--text-color-secondary);
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const SectionTitle = styled.h2`
  color: var(--text-color);
  font-size: 1.5rem;
  margin: 0;
`;

const ShowAllButton = styled(Button)`
  font-size: 0.875rem;
`;

const ChartContainer = styled.div`
  background-color: var(--second-background-color);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  border: 1px solid var(--accent-color);
`;

const ChartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--accent-color);

  &:last-child {
    border-bottom: none;
  }
`;

const ChartLabel = styled.div`
  color: var(--text-color);
  font-weight: 500;
`;

const ChartValue = styled.div`
  color: var(--primary-color);
  font-weight: 600;
`;

const DashboardPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { statistics, loading, error } = useSelector(
    (state: RootState) => state.statistics,
  );

  useEffect(() => {
    dispatch(fetchStatisticsStart());
  }, [dispatch]);

  if (loading) {
    return <Loader message="Loading dashboard..." />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!statistics) {
    return <p>No statistics available</p>;
  }

  return (
    <>
      <Grid>
        <StatCard onClick={() => navigate("/songs")}>
          <StatIcon>
            <BiMusic />
          </StatIcon>
          <StatContent>
            <StatValue>{statistics.totals.songs}</StatValue>
            <StatLabel>Total Songs</StatLabel>
          </StatContent>
        </StatCard>

        <StatCard onClick={() => navigate("/songs")}>
          <StatIcon>
            <BiUser />
          </StatIcon>
          <StatContent>
            <StatValue>{statistics.totals.artists}</StatValue>
            <StatLabel>Artists</StatLabel>
          </StatContent>
        </StatCard>

        <StatCard onClick={() => navigate("/songs")}>
          <StatIcon>
            <BiDisc />
          </StatIcon>
          <StatContent>
            <StatValue>{statistics.totals.albums}</StatValue>
            <StatLabel>Albums</StatLabel>
          </StatContent>
        </StatCard>

        <StatCard onClick={() => navigate("/songs")}>
          <StatIcon>
            <BsCollectionPlay />
          </StatIcon>
          <StatContent>
            <StatValue>{statistics.totals.genres}</StatValue>
            <StatLabel>Genres</StatLabel>
          </StatContent>
        </StatCard>
      </Grid>

      <Section>
        <SectionHeader>
          <SectionTitle>Songs by Genre</SectionTitle>
          <ShowAllButton
            variant="ghost"
            size="sm"
            onClick={() => navigate("/songs")}
          >
            Show All <BiRightArrowAlt />
          </ShowAllButton>
        </SectionHeader>
        <ChartContainer>
          {statistics.songsByGenre.length === 0 ? (
            <ChartItem>
              <ChartLabel>No genre data available</ChartLabel>
              <ChartValue>-</ChartValue>
            </ChartItem>
          ) : (
            statistics.songsByGenre.slice(0, 5).map((item, index) => (
              <ChartItem key={index}>
                <ChartLabel>{item.genre}</ChartLabel>
                <ChartValue>{item.count} songs</ChartValue>
              </ChartItem>
            ))
          )}
        </ChartContainer>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>Top Artists</SectionTitle>
          <ShowAllButton
            variant="ghost"
            size="sm"
            onClick={() => navigate("/songs")}
          >
            Show All <BiRightArrowAlt />
          </ShowAllButton>
        </SectionHeader>
        <ChartContainer>
          {statistics.songsByArtist.length === 0 ? (
            <ChartItem>
              <ChartLabel>No artist data available</ChartLabel>
              <ChartValue>-</ChartValue>
            </ChartItem>
          ) : (
            statistics.songsByArtist.slice(0, 5).map((item, index) => (
              <ChartItem key={index}>
                <ChartLabel>{item.artist}</ChartLabel>
                <ChartValue>
                  {item.songCount} songs, {item.albumCount} albums
                </ChartValue>
              </ChartItem>
            ))
          )}
        </ChartContainer>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>Top Albums</SectionTitle>
          <ShowAllButton
            variant="ghost"
            size="sm"
            onClick={() => navigate("/songs")}
          >
            Show All <BiRightArrowAlt />
          </ShowAllButton>
        </SectionHeader>
        <ChartContainer>
          {statistics.songsByAlbum.length === 0 ? (
            <ChartItem>
              <ChartLabel>No album data available</ChartLabel>
              <ChartValue>-</ChartValue>
            </ChartItem>
          ) : (
            statistics.songsByAlbum.slice(0, 5).map((item, index) => (
              <ChartItem key={index}>
                <ChartLabel>
                  {item.album} - {item.artist}
                </ChartLabel>
                <ChartValue>{item.songCount} songs</ChartValue>
              </ChartItem>
            ))
          )}
        </ChartContainer>
      </Section>
    </>
  );
};

export default DashboardPage;
