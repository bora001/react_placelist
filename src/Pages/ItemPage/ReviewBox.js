import { useParams } from "react-router-dom";
import AddReview from "./AddReview";
import ReviewList from "./ReviewList";

const ReviewBox = () => {
  const params = useParams();
  return (
    <div className="review_box">
      <AddReview params={params} />
      <ReviewList params={params} />
    </div>
  );
};

export default ReviewBox;
