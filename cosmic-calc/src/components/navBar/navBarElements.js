// import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
  background: #52366c;
  height: 85px;
  display: flex;
  justify-content: right;
  z-index: 12;
  textdecoration: ;
  font-family: "Bubblegum Sans", sans-serif;
  font-weight: 900;
  border-radius: 9%;
  border: 1px solid darkblue;
  font-size: 18px;
`;

export const NavLink = styled(Link)`
  color: orange;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: red;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  padding-left: 30cm;

  align-items: right;
  justifycontent: flex-end;
  @media screen and (max-width: 800px) {
    display: none;
  }
`;
