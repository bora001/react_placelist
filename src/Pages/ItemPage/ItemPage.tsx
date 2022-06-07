import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../Store/hooks";
import ItemBox from "./ItemBox";
import ReviewBox from "./ReviewBox";
import { placeListType } from "../../Store/user-slice";

const ItemPage = () => {
  const [placeInfo, setPlaceInfo] = useState<placeListType[]>();
  const [placeRate, setPlaceRate] = useState<number>(3);
  const user = useAppSelector((state) => state.user);
  const { id } = useParams();

  useEffect(() => {
    const [placeDetail] = user.placelist.filter((item) => item.id == id);

    if (placeDetail) {
      setPlaceInfo(() => [placeDetail]);
      setPlaceRate(() =>
        isNaN(placeDetail.rate / placeDetail.comments)
          ? 0
          : placeDetail.rate / placeDetail.comments
      );
    }
  }, [user.placelist]);

  return (
    <section className="section_place">
      {placeInfo && (
        <div className="place_box">
          <ItemBox
            placelist={placeInfo}
            userUid={user.userUid}
            rate={placeRate}
          />
          <ReviewBox placelist={placeInfo} setRate={setPlaceRate} />
        </div>
      )}
    </section>
  );
};

export default ItemPage;
