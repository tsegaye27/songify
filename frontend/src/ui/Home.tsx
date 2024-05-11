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
  padding: 10px;
  font-size: 18px;
  border-radius: 10px;
  border: 1px solid #ec1313f1;
  cursor: pointer;
  transition: background-color 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

  &:hover {
    background-color: #ec1313f1;
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
