import React, { useRef, useEffect, useState } from "react";
import ReactMapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { devToken } from "../../dev";
import { Marker } from "react-map-gl";

const ItemMap = (props) => {
  const [viewport, setViewport] = useState({
    latitude: props.place.geo.split(",")[0],
    longitude: props.place.geo.split(",")[1],
    zoom: 10,
  });

  return (
    <div className="map-container item_map">
      <ReactMapGL
        {...viewport}
        mapboxAccessToken={devToken.mapToken}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        <Marker
          key={props.place.id}
          longitude={props.place.geo.split(",")[1]}
          latitude={props.place.geo.split(",")[0]}
          anchor="bottom"
        >
          <img
            src="https://cdn.pixabay.com/photo/2015/12/14/20/29/tracker-1093167_960_720.png"
            className="map_marker"
          />
        </Marker>
      </ReactMapGL>
    </div>
  );
};

export default ItemMap;
