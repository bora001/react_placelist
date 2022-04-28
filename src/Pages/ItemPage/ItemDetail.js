import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ItemBox from "./ItemBox";
import ReviewBox from "./ReviewBox";
import { devToken } from "../../dev";
import { async } from "@firebase/util";
const ItemDetail = (props) => {
  const [placeInfo, setPlaceInfo] = useState();
  const user = useSelector((state) => state.user);
  const { id } = useParams();

  useEffect(() => {
    axios.get(devToken.firebaseUrl + `Place.json`).then((data) => {
      let [place] = Object.values(data.data).filter((x) => x.id == id);
      setPlaceInfo(place);
    });
  }, []);

  return (
    <section className="section_place">
      <div className="place_box">
        {placeInfo && <ItemBox place={placeInfo} uid={user.userUid} />}
        <ReviewBox />
      </div>
    </section>
  );
};

export default ItemDetail;
