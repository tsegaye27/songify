import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { BiHome, BiMusic, BiListPlus, BiStar } from "react-icons/bi";
import logo from "../../public/logo.png";

const StyledSideNav = styled.nav`
  background-color: #333333;
  color: #ffffff;
  width: 250px;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 15rem;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #555555;
`;

const Logo = styled.img`
  width: 5rem;
`;

const H1 = styled.h1`
  font-size: 20px;
  text-align: center;
  margin-bottom: 1rem;
`;

const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Nav = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
`;

const NavLinks = styled(NavLink)`
  width: 100%;
  text-decoration: none;
  color: var(--text-color);
  border: none;
  transition: color 0.3s ease-in;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  padding: 1.5rem 0;

  &:hover {
    color: var(--accent-color);
  }
`;

const NavItem = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const NavLinkIcon = styled.div`
  display: flex;
  margin-right: 10px;
`;

const NavLinkText = styled.span`
  font-size: 16px;
`;

const SideNav: React.FC = () => {
  return (
    <StyledSideNav>
      <LogoContainer>
        <ImageContainer>
          <Logo src={logo} alt="Logo" />
        </ImageContainer>
        <H1>Songify</H1>
      </LogoContainer>
      <Nav>
        <NavItem>
          <NavLinks to="/">
            <NavLinkIcon>
              <BiHome />
            </NavLinkIcon>
            <NavLinkText>Home</NavLinkText>
          </NavLinks>
        </NavItem>
        <NavItem>
          <NavLinks to="/songs">
            <NavLinkIcon>
              <BiMusic />
            </NavLinkIcon>
            <NavLinkText>Songs</NavLinkText>
          </NavLinks>
        </NavItem>
        <NavItem>
          <NavLinks to="/playlists">
            <NavLinkIcon>
              <BiListPlus />
            </NavLinkIcon>
            <NavLinkText>Playlists</NavLinkText>
          </NavLinks>
        </NavItem>
        <NavItem>
          <NavLinks to="/favorites">
            <NavLinkIcon>
              <BiStar />
            </NavLinkIcon>
            <NavLinkText>Favorites</NavLinkText>
          </NavLinks>
        </NavItem>
      </Nav>
    </StyledSideNav>
  );
};

export default SideNav;
