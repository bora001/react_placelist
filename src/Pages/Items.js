import React, { useState } from "react";
import { Link } from "react-router-dom";

const Items = (props) => {
  const [average, setAverage] = useState(
    props.place.rate / props.place.comments
  );
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
              style={{
                width: `${average ? average * 20 : 50}%`,
              }}
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
