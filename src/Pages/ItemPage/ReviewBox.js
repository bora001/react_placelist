import AddReview from "./AddReview";
import ReviewList from "./ReviewList";
const ReviewBox = () => {
  return (
    <div className="review_box">
      <AddReview />
      <ReviewList />
    </div>
  );
};

export default ReviewBox;
