import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userAction } from "../Store/user-slice";
import { getAuth, signOut } from "firebase/auth";

const Header = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.userUid);
  const auth = getAuth();

  const logout = () => {
    dispatch(userAction.setUser(null));
    signOut(auth);
  };
  return (
    <div>
      <nav>
        <div className="logo">
          <Link to="/">PlaceList</Link>
        </div>
        <div className="menu">
          <Link to="/list">List</Link>

          {isLogin ? (
            <div className="login_box">
              <Link to="/post">Post Place</Link>

              <Link to="/" onClick={logout}>
                Logout
              </Link>
            </div>
          ) : (
            <div className="login_box ">
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
