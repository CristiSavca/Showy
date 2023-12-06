import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";

const Navbar = ({ isLoggedIn }) => {
  return (
    <>
      <Nav>
        <NavMenu>
          {isLoggedIn && (
            <>
              <NavLink to="/feed" activeStyle>
                Feed
              </NavLink>
              <NavLink to="/profile" activeStyle>
                Profile
              </NavLink>
            </>
          )}
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
