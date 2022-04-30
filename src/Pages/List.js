import React, { useState, useEffect } from "react";
import { devToken } from "../dev";
import "./List.scss";
import Items from "./Items";
import axios from "axios";
import { userAction } from "../Store/user-slice";
import { useDispatch, useSelector } from "react-redux";

const List = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    axios.get(devToken.firebaseUrl + `Place.json`).then((data) => {
      dispatch(userAction.setList(Object.values(data.data)));
    });
  }, [user.placelist.length]);

  return (
    <section className="section_list">
      <div className="list_box">
        {user.placelist.map((place) => (
          <Items key={Math.random().toString(36).slice(2)} place={place} />
        ))}
      </div>
    </section>
  );
};

export default List;
