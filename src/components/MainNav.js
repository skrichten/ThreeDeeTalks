import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

const Nav = styled.nav`
  position: fixed;
  top: 20px;
  left: 20px;
  display: flex;
`;

const NavList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
`;

const NavItem = styled.li`
  background-color: rgba(0,0,0,0);
  border: solid 2px rgba(255,255,255,.3);
  border-radius: 4px;
  margin-right: 8px;
  padding: 2px 10px;
  cursor: pointer;
  a {
    text-decoration: none;
    color: rgba(255,255,255,.3);
  }
`;

function MainNav({ routes }) {
  return (
    <Nav>
      <NavList>
        <NavItem>
          <Link to="/fox">Fox</Link>
        </NavItem>
        <NavItem>
          <Link to="/ghost">Ghost</Link>
        </NavItem>
      </NavList>
    </Nav>
  );
}

export default MainNav;
