import React, { useState, useEffect } from "react";
import Header from "./UI/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainMap from "./UI/MainMap";
import List from "./Pages/List";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Post from "./Pages/Post";
import "mapbox-gl/dist/mapbox-gl.css";
import ItemDetail from "./Pages/ItemPage/ItemDetail";
import axios from "axios";
import { userAction } from "./Store/user-slice";
import { devToken } from "./dev";
import { useSelector, useDispatch } from "react-redux";
import "./App.scss";

function App() {
  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      const result = await axios.get(devToken.firebaseUrl + `Place.json`);
      dispatch(userAction.setList(Object.values(result.data)));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
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
        <Route path="/place/:id" element={<ItemDetail />} exact />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
