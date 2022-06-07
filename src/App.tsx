import React, { useState, useEffect } from "react";
import Header from "./UI/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainMap from "./UI/MainMap";
import List from "./Pages/List";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Post from "./Pages/Post";
import "mapbox-gl/dist/mapbox-gl.css";
import ItemPage from "./Pages/ItemPage/ItemPage";
import axios from "axios";
import { userAction } from "./Store/user-slice";
import { devToken } from "./dev";
import { useAppDispatch } from "./Store/hooks";
import "./App.scss";

function App() {
  const dispatch = useAppDispatch();
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
        <Route path="/" element={<MainMap />} />
        <Route path="/list" element={<List />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post" element={<Post />} />
        <Route path="/place/:id" element={<ItemPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
