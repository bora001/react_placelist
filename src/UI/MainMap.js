import React, { useRef, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { devToken } from "../dev";
import { Marker } from "react-map-gl";
import ReactMapGL from "react-map-gl";
import "./MainMap.scss";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { userAction } from "../Store/user-slice";
const MainMap = () => {
  const [placeList, setPlaceList] = useState();
  const placelist = useSelector((state) => state.placelist);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(devToken.firebaseUrl + `Place.json`).then((data) => {
      dispatch(userAction.setList(Object.values(data.data)));
      console.log(Object.values(data.data));
      setPlaceList(() => Object.values(data.data));
    });
  }, []);
  // console.log(placeList);

  const [viewport, setViewport] = useState({
    latitude: -33.86854,
    longitude: 151.20776,
    zoom: 3,
  });

  return (
    <div className="map-container">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={devToken.mapToken}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      ></ReactMapGL>
    </div>
  );
};

export default MainMap;
