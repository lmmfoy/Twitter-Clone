import styled from "styled-components";
import Logo from "./logo";
import { NavLink } from "react-router-dom";
import { COLORS } from "./constants";
import GlobalStyle from "./GlobalStyles.js";
import { CurrentUserContext } from "./CurrentUserContext";

import { FiHome } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { FiBell } from "react-icons/fi";
import { FiBookmark } from "react-icons/fi";
import { useContext } from "react";

const Sidebar = () => {
  const {currentUser} = useContext(CurrentUserContext)
  const profileLink = `/${currentUser}`

  return (
    <>
      <GlobalStyle />
      <StyledSidebar>
      <div className="logo">
        <Logo/>
      </div>
        <nav>
          <ul>
            <li>
              <NavigationLink exact to="/">
              <FiHome class="icon"/>
              Home
              </NavigationLink>
            </li>
            <li>
              <NavigationLink to={profileLink}>
              <FiUser class="icon"/>
              Profile
              </NavigationLink>
            </li>
            <li>
              <NavigationLink to="/notifications">
              <FiBell class="icon"/>
              Notifications
              </NavigationLink>
            </li>
            <li>
              <NavigationLink to="/bookmarks">
              <FiBookmark class="icon"/>
              Bookmarks
              </NavigationLink>
            </li>
          </ul>
        </nav>
      </StyledSidebar>
    </>
  );
};

const StyledSidebar = styled.div`
  width: 250px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 20px 40px 0 0;
  font-weight: 600;

  .logo {
    width: 175px;
    margin-bottom: 25px;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

    .icon {
      margin-right: 20px;
    }
`;

const NavigationLink = styled(NavLink)`
  text-decoration: none;
  color: black;
  padding: 15px;
  border-radius: 30px;
  
  &.active, :hover{
    color: ${COLORS.primary};

  }

  :hover {
    background-color: ${COLORS.highlightBackground};
  }
`;

export default Sidebar;
