import React, { useState } from "react";
import { devToken } from "../dev";
import { Marker, Popup } from "react-map-gl";
import ReactMapGL from "react-map-gl";
import { useAppSelector } from "../Store/hooks";
import { placeListType } from "../Store/user-slice";
import { Link } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import "./MainMap.scss";

const MainMap = () => {
  const [showPopup, setShowPopup] = useState<placeListType | null>(null);
  const placelist = useAppSelector((state) => state.user.placelist);
  const [viewState, setViewState] = React.useState({
    latitude: -33.86854,
    longitude: 151.20776,
    zoom: 10,
  });

  const clickMarker = (
    longitude: number,
    latitude: number,
    place: placeListType
  ) => {
    setViewState(() => ({
      longitude,
      latitude,
      zoom: 12,
    }));

    setTimeout(() => {
      setShowPopup(() => place);
    }, 200);
  };

  return (
    <div className="map-container">
      <ReactMapGL
        {...viewState}
        mapboxAccessToken={devToken.mapToken}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onMove={(evt) => setViewState(evt.viewState)}
      >
        {placelist &&
          placelist.map((place: placeListType, i) => (
            <Marker
              key={place.id}
              longitude={+place.geo.split(",")[0]}
              latitude={+place.geo.split(",")[1]}
              anchor="bottom"
              onClick={(e) =>
                clickMarker(
                  +place.geo.split(",")[0],
                  +place.geo.split(",")[1],
                  place
                )
              }
            />
          ))}
        {showPopup && (
          <Popup
            key={showPopup.id}
            longitude={+showPopup.geo.split(",")[0]}
            latitude={+showPopup.geo.split(",")[1]}
            onClose={() => setShowPopup(null)}
          >
            <Link to={`/place/${showPopup.id}`}>
              <img src={showPopup.img} alt="" />
            </Link>
            <div>{showPopup.name}</div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
};

export default MainMap;
