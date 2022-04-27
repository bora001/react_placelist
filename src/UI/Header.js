import React from "react";

const Header = () => {
  return (
    <div>
      <nav>
        <div class="logo">
          <a href="/">PlaceList</a>
        </div>
        <div class="menu">
          <div class="login_box login_true off">
            <a href="/list">List</a>
            <a href="/create">Post Place</a>
            <a href="/" onclick="logoutE()">
              logout
            </a>
          </div>
          <div class="login_box login_false off">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
