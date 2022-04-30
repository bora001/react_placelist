import React from "react";

const ReviewList = () => {
  return (
    <div className="review_list">
      <div className="review_item">
        <div className="rate_input">
          <p>&#9733;&#9733;&#9733;&#9733;&#9733;</p>
          <p
            className="filled"
            //   style="width: ${comment.rate * 20}%"
          >
            &#9733;&#9733;&#9733;&#9733;&#9733;
          </p>
        </div>
        <div className="review_txt">
          <h3>username</h3>
          <p>comment</p>
        </div>
        <button className="del_review">❌</button>
      </div>
    </div>
  );
};

export default ReviewList;
