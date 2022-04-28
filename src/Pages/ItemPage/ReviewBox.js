import React from "react";

const ReviewBox = () => {
  return (
    <div className="review_box">
      <div className="review_add">
        <form
          action=""
          className="form_box"
          //   onsubmit="return false"
        >
          <div className="top_box">
            <h3>Leave a Review</h3>
            <div className="rate_input">
              <p>&#9733;&#9733;&#9733;&#9733;&#9733;</p>
              <p className="filled">&#9733;&#9733;&#9733;&#9733;&#9733;</p>
              <input
                type="range"
                name="rate"
                min="1"
                max="5"
                step="0.5"
                // value="3"
              />
            </div>
          </div>
          <div className="bottom_box">
            <textarea name="comment" id="" required></textarea>
            <input
              type="submit"
              name="type"
              className="btn_submit"
              //   value="Leave a Review"
            />
          </div>
        </form>
      </div>

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
    </div>
  );
};

export default ReviewBox;
