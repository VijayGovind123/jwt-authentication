import React from "react";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <header>
      <Link className="links" to="/">
        OrientBell tiles
      </Link>

      <Link className="links" to="/register">
        Register
      </Link>
      <Link className="links" to="/login">
        Login
      </Link>
      <Link className="links" to="/protected">
        Protected
      </Link>
    </header>
  );
}
export default Navbar;
