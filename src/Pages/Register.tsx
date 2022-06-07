import React, { useState, useRef } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  getAuth,
} from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

type inputDataType = {
  email?: string;
  username?: string;
  password?: string;
  passwordConfirm?: string;
};

const Register = () => {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState<inputDataType>();
  const ref = useRef<HTMLFormElement>(null);

  const getData = (e: React.FormEvent) => {
    const target = e.target as HTMLFormElement;
    const { name, value } = target;
    setInputData((prev) => ({
      ...inputData,
      [name]: value,
    }));
  };
  const register = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputData!.password == inputData!.passwordConfirm) {
      postData();
    } else {
      alert("Incorrect password");
    }
  };

  const postData = async () => {
    const { email, password } = inputData!;
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        email!,
        password!
      ).then((res) => {
        updateProfile(getAuth().currentUser!, {
          displayName: inputData!.username,
        });
        res.user.uid && navigate("/login");
      });
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
        ref.current!.reset();
      }
    }
  };

  return (
    <section className="section_register">
      <form
        className="form_register form_box"
        ref={ref}
        onSubmit={register}
        onChange={getData}
      >
        <h2>Register</h2>
        <input type="text" placeholder="Email" name="email" required />
        <input type="text" placeholder="Username" name="username" required />
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
        <input
          type="submit"
          className="btn_submit"
          value="Register"
          name="type"
        />
      </form>
    </section>
  );
};

export default Register;
