import React, { useState } from "react";
import ReactMapGL from "react-map-gl";
import { devToken } from "../../dev";
import { Marker } from "react-map-gl";
import { itemBoxType } from "./ItemBox";

const ItemMap = (props: itemBoxType) => {
  const [viewState, setViewState] = useState({
    latitude: +props.placelist[0].geo.split(",")[1],
    longitude: +props.placelist[0].geo.split(",")[0],
    zoom: 10,
  });

  return (
    <div className="map-container item_map">
      <ReactMapGL
        {...viewState}
        mapboxAccessToken={devToken.mapToken}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <Marker
          key={props.placelist[0].id}
          longitude={+props.placelist[0].geo.split(",")[0]}
          latitude={+props.placelist[0].geo.split(",")[1]}
          anchor="bottom"
        />
      </ReactMapGL>
    </div>
  );
};

export default ItemMap;
