import React, { useState, useRef } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userAction } from "../Store/user-slice";
import "./Place.scss";
import "../App.scss";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({});
  const ref = useRef();

  const getData = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({
      ...inputData,
      [name]: value,
    }));
  };
  const login = async (e) => {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        inputData.email,
        inputData.password
      );

      if (user) {
        navigate("/");
        dispatch(userAction.setUser(user.user.uid));
      }
    } catch (err) {
      ref.current.reset();
      console.log(err.message);
    }
  };

  return (
    <section className="section_login">
      <form
        className="form_login form_box"
        ref={ref}
        onSubmit={login}
        onChange={getData}
      >
        <h2>Login</h2>
        <input type="text" placeholder="Email" name="email" required />
        <input
          type="password"
          placeholder="password"
          name="password"
          required
        />
        <input type="submit" className="btn_submit" value="Login" name="type" />
      </form>
    </section>
  );
};

export default Login;
