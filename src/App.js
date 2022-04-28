import React, { useEffect } from "react";
import Header from "./UI/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainMap from "./UI/MainMap";
import List from "./Pages/List";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Post from "./Pages/Post";
import "mapbox-gl/dist/mapbox-gl.css";
import "./App.scss";
import axios from "axios";
import { devToken } from "./dev";
import { userAction } from "./Store/user-slice";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);

  useEffect(() => {
    axios
      .get(devToken.firebaseUrl + `Place.json`)
      .then((data) => dispatch(userAction.setList(Object.values(data.data))));
  }, []);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainMap />} exact />
        <Route path="/list" element={<List />} exact />
        <Route path="/login" element={<Login />} exact />
        <Route path="/register" element={<Register />} exact />
        <Route path="/post" element={<Post />} exact />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
