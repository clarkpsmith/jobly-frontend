import React, { useContext } from "react";

import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import UserContext from "../common/UserContext";

function NavBar({ logOut }) {
  const { currentUser } = useContext(UserContext);

  return (
    <div>
      <Navbar className="navbar" expand="md">
        <NavLink exact to="/" className="navbar-brand">
          Jobly
        </NavLink>

        <Nav className="ml-auto" navbar>
          {currentUser ? (
            <>
              <NavItem>
                <NavLink className="navlinks" to="/companies">
                  Companies
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="navlinks" to="/jobs">
                  Jobs
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="navlinks" to="/profile">
                  Profile
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="navlinks-logout" to="/" onClick={logOut}>
                  Log Out {currentUser.username}
                </NavLink>
              </NavItem>
            </>
          ) : (
            <>
              <NavItem>
                <NavLink className="navlinks" to="/login">
                  Login
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="navlinks" to="/signup">
                  Sign Up
                </NavLink>
              </NavItem>
            </>
          )}
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;
