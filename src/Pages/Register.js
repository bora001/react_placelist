import React, { useState, useRef } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

const Register = () => {
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
  const register = (e) => {
    e.preventDefault();
    if (inputData.password == inputData.passwordConfirm) {
      console.log("correct");
      postData();
    } else {
      alert("Incorrect password");
    }
  };

  const postData = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        inputData.email,
        inputData.password
      );
      user.user.uid && navigate("/login");
    } catch (err) {
      alert(err.message);
      ref.current.reset();
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
