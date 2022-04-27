import Header from "./UI/Header";
import "./App.scss";
import "mapbox-gl/dist/mapbox-gl.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainMap from "./UI/MainMap";
import List from "./UI/Pages/List";
import Login from "./UI/Pages/Login";
import Register from "./UI/Pages/Register";
import Post from "./UI/Pages/Post";
function App() {
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
