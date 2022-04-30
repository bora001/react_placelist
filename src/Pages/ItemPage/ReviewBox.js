import { useParams } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import {
  getDatabase,
  get,
  ref as dataRef,
  push,
  remove,
} from "firebase/database";

const ReviewBox = () => {
  const params = useParams();
  const navigate = useNavigate();
  const ref = useRef();
  const user = useSelector((state) => state.user);
  const [reviewData, setReviewData] = useState({ rate: 3 });
  const [reviewList, setReviewList] = useState([]);
  const id = params.id;

  useEffect(() => {
    const db = getDatabase();
    get(dataRef(db, "Comment/")).then((res) => {
      res.val() && setReviewList(() => Object.values(res.val()[id]));
    });
  }, []);

  const delComment = (cmId) => {
    const db = getDatabase();
    get(dataRef(db, "Comment/")).then((res) => {
      const [clicked] = Object.entries(res.val()[id]).filter(
        (x) => x[1].commentId == cmId
      );
      remove(dataRef(db, "Comment/" + id + "/" + clicked[0]));
      setReviewList(() => reviewList.filter((list) => list.commentId !== cmId));
    });
  };

  const addReview = (e) => {
    e.preventDefault();
    if (user.userUid) {
      const data = {
        ...reviewData,
        user: user.userUid,
        placeId: params.id,
        username: getAuth().currentUser.displayName,
        commentId: Math.random().toString(36).slice(2),
      };
      const db = getDatabase();
      push(dataRef(db, "Comment/" + params.id), data);
      setReviewList(() => [...reviewList, data]);
      ref.current.reset();
    } else {
      navigate("/login");
    }
  };

  const getData = (e) => {
    const { name, value } = e.target;
    setReviewData(() => ({ ...reviewData, [name]: value }));
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
                <button
                  className="del_review"
                  onClick={() => delComment(list.commentId)}
                >
                  ❌
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ReviewBox;
