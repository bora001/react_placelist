import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ItemBox from "./ItemBox";
import ReviewBox from "./ReviewBox";
const ItemDetail = () => {
  const [placeInfo, setPlaceInfo] = useState();
  const [placeRate, setPlaceRate] = useState(3);
  const user = useSelector((state) => state.user);
  const { id } = useParams();

  useEffect(() => {
    const [placeDetail] = user.placelist.filter((item) => item.id == id);

    if (placeDetail) {
      setPlaceInfo(() => placeDetail);
      setPlaceRate(() => placeDetail.rate / placeDetail.comments);
    }
  }, [user.placelist]);

  return (
    <section className="section_place">
      {placeInfo && (
        <div className="place_box">
          <ItemBox place={placeInfo} uid={user.userUid} rate={placeRate} />
          <ReviewBox place={placeInfo} setRate={setPlaceRate} />
        </div>
      )}
    </section>
  );
};

export default ItemDetail;
