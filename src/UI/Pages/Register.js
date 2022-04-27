import React from "react";

const Register = () => {
  return (
    <section class="section_register">
      <form class="form_register form_box" method="POST" action="/register">
        <h2>Register</h2>
        <input type="text" placeholder="UserName" name="username" required />
        <input
          type="password"
          placeholder="password"
          name="password"
          required
        />
        <input
          type="password"
          placeholder="password confirm"
          name="passwordConfirm"
          required
        />
        <input type="submit" class="btn_submit" value="Register" name="type" />
      </form>
    </section>
  );
};

export default Register;
