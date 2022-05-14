import { useParams } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import {
  getDatabase,
  get,
  ref as dataRef,
  remove,
  update,
} from "firebase/database";

const ReviewBox = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const ref = useRef();
  const user = useSelector((state) => state.user);
  const [reviewData, setReviewData] = useState({ rate: 3 });
  const [reviewList, setReviewList] = useState([]);
  const paramsId = params.id;
  useEffect(() => {
    const db = getDatabase();
    get(dataRef(db, "Comments/" + paramsId)).then((res) => {
      if (res.val()) {
        const reviews = Object.values(res.val());
        setReviewList(() => reviews);
        const rate = reviews.reduce((a, b) => Number(a.rate) + Number(b.rate));
        setReviewData(() => rate / reviews.length);
      }
    });
  }, []);

  const delComment = (cmId, cmRate) => {
    const db = getDatabase();
    get(dataRef(db, "Comments/" + paramsId)).then((res) => {
      const newList = Object.values(res.val()).filter(
        (item) => item.commentId !== cmId
      );
      remove(dataRef(db, "Comments/" + paramsId + "/" + cmId));
      setReviewList(() => newList);
      get(dataRef(db, "Place/" + paramsId)).then((res) => {
        const newPlaceInfo = {
          ...res.val(),
          rate:
            res.val().comments > 1
              ? (res.val().rate / res.val().comments) * 2 - cmRate
              : 0,
          comments: res.val().comments - 1,
        };
        update(dataRef(db, "Place/" + paramsId), newPlaceInfo);
        props.setRate(() => newPlaceInfo.rate / newPlaceInfo.comments);
      });
    });
  };

  const addReview = (e) => {
    e.preventDefault();
    const random = Math.random().toString(36).slice(2);
    const commentId = random + random;
    if (user.userUid) {
      const comment = {
        ...reviewData,
        user: user.userUid,
        commentId,
        username: getAuth().currentUser.displayName,
      };
      const db = getDatabase();
      update(dataRef(db, "Comments/" + paramsId + "/" + commentId), comment);
      setReviewList(() => [...reviewList, comment]);
      get(dataRef(db, "Place/" + paramsId)).then((res) => {
        const newPlaceInfo = {
          ...res.val(),
          rate: res.val().rate
            ? res.val().rate + reviewData.rate / 1
            : reviewData.rate / 1,
          comments: res.val().comments ? res.val().comments + 1 : 1,
        };
        update(dataRef(db, "Place/" + paramsId), newPlaceInfo);
        props.setRate(() => newPlaceInfo.rate / newPlaceInfo.comments);
      });
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
                  onClick={() => delComment(list.commentId, list.rate)}
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
