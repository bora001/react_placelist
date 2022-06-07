import React, { useState, useRef } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../Store/hooks";
import { userAction } from "../Store/user-slice";
import { inputDataType } from "./Register";
import "./Place.scss";
import "../App.scss";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [inputData, setInputData] = useState<inputDataType>({});
  const ref = useRef<HTMLFormElement>(null);

  const getData = (e: React.FormEvent) => {
    const target = e.target as HTMLFormElement;
    const { name, value } = target;
    setInputData((prev) => ({
      ...inputData,
      [name]: value,
    }));
  };
  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        inputData!.email!,
        inputData!.password!
      );

      if (user) {
        navigate("/");
        dispatch(userAction.setUser(user.user.uid));
      }
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
        ref.current!.reset();
      }
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
