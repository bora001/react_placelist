import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getDatabase, get, ref as dataRef, push } from "firebase/database";
const ReviewBox = () => {
  const navigate = useNavigate();
  const ref = useRef();
  const params = useParams();
  const user = useSelector((state) => state.user);
  const [reviewData, setReviewData] = useState({ rate: 3 });

  const getData = (e) => {
    const { name, value } = e.target;
    setReviewData(() => ({ ...reviewData, [name]: value }));
  };

  const addReview = (e) => {
    e.preventDefault();
    if (user.userUid) {
      const data = { ...reviewData, user: user.userUid, placeId: params.id };
      const db = getDatabase();
      push(dataRef(db, "Comment/"), data);
      ref.current.reset();
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="review_box">
      <div className="review_add">
        <form
          className="form_box"
          onSubmit={addReview}
          onChange={getData}
          ref={ref}
        >
          <div className="top_box">
            <h3>Leave a Review</h3>
            <div className="rate_input">
              <p>&#9733;&#9733;&#9733;&#9733;&#9733;</p>
              <p
                className="filled"
                style={{ width: `${reviewData.rate * 20}%` }}
              >
                &#9733;&#9733;&#9733;&#9733;&#9733;
              </p>
              <input type="range" name="rate" min="1" max="5" step="0.5" />
            </div>
          </div>
          <div className="bottom_box">
            <textarea name="comment" required></textarea>
            <input
              type="submit"
              name="type"
              className="btn_submit"
              value="Leave a Review"
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
