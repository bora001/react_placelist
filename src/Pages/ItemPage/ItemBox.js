import React from "react";
import ItemMap from "./ItemMap";

const ItemBox = (props) => {
  return (
    <div className="item_box">
      <div className="detail_box">
        <div className="img_box">
          <img src={props.place.img} alt="" />
        </div>
        <div className="txt_box">
          <div className="intro_box">
            <h3>{props.place.name}</h3>
            <div className="rate_input">
              <p>&#9733;&#9733;&#9733;&#9733;&#9733;</p>
              <p
                className="filled"
                //   style="width: ${average * 20}%"
              >
                &#9733;&#9733;&#9733;&#9733;&#9733;
              </p>
            </div>
            <p className="current_rate">average</p>
          </div>
          <p>{props.place.location}</p>
        </div>
      </div>
      <div className="opt_box">
        <ItemMap />
        {props.uid == props.place.user && (
          <button className="del_place">Delete</button>
        )}
      </div>
    </div>
  );
};

export default ItemBox;
