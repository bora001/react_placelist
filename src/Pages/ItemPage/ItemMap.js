import React, { useRef, useEffect, useState } from "react";
import ReactMapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { devToken } from "../../dev";

const ItemMap = () => {
  const [viewport, setViewport] = useState({
    latitude: -33.86854,
    longitude: 151.20776,
    zoom: 3,
  });

  return (
    <div className="map-container">
      <ReactMapGL
        {...viewport}
        mapboxAccessToken={devToken.mapToken}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      ></ReactMapGL>
    </div>
  );
};

export default ItemMap;
