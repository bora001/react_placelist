import React from "react";
import "./Place.scss";
import "../../App.scss";
const Login = () => {
  return (
    <section className=" section_login">
      <form class="form_login form_box" action="/login" method="POST">
        <h2>Login</h2>
        <input type="text" placeholder="Username" name="username" required />
        <input
          type="password"
          placeholder="password"
          name="password"
          required
        />
        <input type="submit" class="btn_submit" value="Login" name="type" />
      </form>
    </section>
  );
};

export default Login;
