import styled from "@emotion/styled";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 20px;
  font-family: monospace;
  color: #ccc;
  text-align: center;
  margin: 1rem;
`;

const ExploreLink = styled(NavLink)`
  text-align: center;
  color: white;
  margin: 1rem;
  text-decoration: none;
  display: block;
  background-color: #111;
  padding: 15px;
  font-size: 18px;
  border-radius: 10px;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 1px 1px 5px 2px #ec1313f1;
  }
`;

const Home: React.FC = () => {
  useEffect(() => {
    document.title = "Home";
  }, []);
  return (
    <StyledHome>
      <Title>Explore Top Trending Songs according to XYZ</Title>
      <ExploreLink to="/songs">Go to Songs</ExploreLink>
    </StyledHome>
  );
};

export default Home;
