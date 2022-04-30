import React, { useState, useEffect } from "react";
import { devToken } from "../dev";
import "./List.scss";
import Items from "./Items";
import axios from "axios";
import { useLocation } from "react-router-dom";

const List = (props) => {
  const [placelist, setPlacelist] = useState([]);
  const location = useLocation();
  useEffect(() => {
    axios.get(devToken.firebaseUrl + `Place.json`).then((data) => {
      setPlacelist(() => Object.values(data.data));
    });
  }, [location.key]);

  return (
    <section className="section_list">
      <div className="list_box">
        {placelist.map((place) => (
          <Items key={Math.random().toString(36).slice(2)} place={place} />
        ))}
      </div>
    </section>
  );
};

export default List;
