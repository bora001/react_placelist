import React from "react";
import "./List.scss";
const List = () => {
  return (
    <section className="section_list">
      <div className="list_box">
        <div className="list_item">
          <div className="img_box">
            <img src="" alt="" />
          </div>
          <div className="txt_box">
            <h3>name</h3>
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
            <p>address</p>
            <a href="/place/${item._id}" className="btn_view">
              View the place
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default List;
