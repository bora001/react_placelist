import React, { useEffect, useState } from "react";
import { getDatabase, get, ref as dataRef, push } from "firebase/database";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ReviewList = (props) => {
  const [reviewList, setReviewList] = useState([]);
  const location = useLocation();
  const id = props.params.id;
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const db = getDatabase();
    get(dataRef(db, "Comment/")).then((res) => {
      res.val() && setReviewList(() => Object.values(res.val()[id]));
    });
  }, [location.key]);
  console.log(reviewList);
  return (
    <div className="review_list">
      {reviewList &&
        reviewList.map((list) => (
          <div
            className="review_item"
            key={Math.random().toString(36).slice(2)}
          >
            <div className="rate_input">
              <p>&#9733;&#9733;&#9733;&#9733;&#9733;</p>
              <p className="filled" style={{ width: `${list.rate * 20}%` }}>
                &#9733;&#9733;&#9733;&#9733;&#9733;
              </p>
            </div>
            <div className="review_txt">
              <h3>{list.username}</h3>
              <p>{list.comment}</p>
            </div>
            {user.userUid == list.user && (
              <button className="del_review">❌</button>
            )}
          </div>
        ))}
    </div>
  );
};

export default ReviewList;
