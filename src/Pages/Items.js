import React from "react";
import { Link } from "react-router-dom";

const Items = (props) => {
  return (
    <div className="list_item">
      <div className="img_box">
        <img src={props.place.img} alt="" />
      </div>
      <div className="txt_box">
        <h3>{props.place.name}</h3>
        <div className="rate_box">
          <div className="rate_input">
            <p>&#9733;&#9733;&#9733;&#9733;&#9733;</p>
            <p
              className="filled"
              //   style="width: ${
              //   average * 20
              // }%"
            >
              &#9733;&#9733;&#9733;&#9733;&#9733;
            </p>
          </div>
        </div>
        <p>{props.place.location}</p>
        <Link to={`/place/${props.place.id}`} className="btn_view">
          View the place
        </Link>
      </div>
    </div>
  );
};

export default Items;
