import React, { useState } from "react";
import ReactMapGL from "react-map-gl";
import { devToken } from "../../dev";
import { Marker } from "react-map-gl";

const ItemMap = (props) => {
  const [viewport, setViewport] = useState({
    longitude: props.place.geo.split(",")[0],
    latitude: props.place.geo.split(",")[1],
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
          longitude={props.place.geo.split(",")[0]}
          latitude={props.place.geo.split(",")[1]}
          anchor="bottom"
        />
      </ReactMapGL>
    </div>
  );
};

export default ItemMap;
