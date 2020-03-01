import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

const Nav = styled.nav`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  z-index:2;
`;

const NavList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
`;

const NavItem = styled.li`
  background-color: rgba(255,255,255,.1);

  border-radius: 4px;
  margin-right: 8px;
  padding: 2px 10px;
  cursor: pointer;
  text-shadow: 2px 2px 4px #000000;
  a {
    text-decoration: none;
    color: rgba(255,255,255,.4);
  }
`;

function MainNav() {
  return (
    <Nav>
      <NavList>
        <NavItem>
          <Link to="/outline">Outline</Link>
        </NavItem>
        <NavItem>
          <Link to="/popup">Popup</Link>
        </NavItem>
        <NavItem>
          <Link to="/ghost">Ghost</Link>
        </NavItem>
        <NavItem>
          <Link to="/gdog">GDog</Link>
        </NavItem>
        <NavItem>
          <Link to="/blamo">Blamo</Link>
        </NavItem>
        <NavItem>
          <Link to="/seagulls">Seagulls</Link>
        </NavItem>
      </NavList>
    </Nav>
  );
}

export default MainNav;
