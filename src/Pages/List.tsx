import React from "react";
import Items from "./Items";
import { useAppSelector } from "../Store/hooks";
import "./List.scss";

const List = () => {
  const user = useAppSelector((state) => state.user);

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
