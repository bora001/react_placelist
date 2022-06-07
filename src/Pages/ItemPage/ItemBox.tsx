import React from "react";
import ItemMap from "./ItemMap";
import { placeType } from "../../Store/user-slice";
type rateType = {
  rate: number;
};
export type itemBoxType = placeType & rateType;

const ItemBox = (props: itemBoxType) => {
  return (
    <div className="item_box">
      <div className="detail_box">
        <div className="img_box">
          <img src={props.placelist[0].img} alt="" />
        </div>
        <div className="txt_box">
          <div className="intro_box">
            <h3>{props.placelist[0].name}</h3>
            <div className="rate_input">
              <p>&#9733;&#9733;&#9733;&#9733;&#9733;</p>
              <p
                className="filled"
                style={{
                  width: `${props.rate ? props.rate * 20 : 50}%`,
                }}
              >
                &#9733;&#9733;&#9733;&#9733;&#9733;
              </p>
            </div>
            <p className="current_rate">{props.rate ? props.rate : ""}</p>
          </div>
          <p>{props.placelist[0].location}</p>
        </div>
      </div>
      <div className="opt_box">
        <ItemMap {...props} />
        {props.userUid == props.placelist[0].user && (
          <button className="del_place">Delete</button>
        )}
      </div>
    </div>
  );
};

export default ItemBox;
