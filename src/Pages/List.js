import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./List.scss";
import Items from "./Items";
const List = (props) => {
  const [placelist, setPlacelist] = useState([]);
  const userInfo = useSelector((state) => state.user);

  useEffect(() => {
    setPlacelist(() => userInfo.placelist);
  }, [userInfo.placelist.length]);

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
