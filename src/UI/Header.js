import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div>
      <nav>
        <div className="logo">
          <Link to="/">PlaceList</Link>
        </div>
        <div className="menu">
          <div className="login_box login_true">
            <Link to="/list">List</Link>
            <Link to="/post">Post Place</Link>
            <Link to="/">Logout</Link>
            {/* <a href="/" onclick="logoutE()"></a> */}
          </div>
          <div className="login_box login_false">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
