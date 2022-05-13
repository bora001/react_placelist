import React, { useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { devToken } from "../dev";
import { Marker, Popup } from "react-map-gl";
import ReactMapGL from "react-map-gl";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./MainMap.scss";

const MainMap = () => {
  const [showPopup, setShowPopup] = useState(null);
  const placelist = useSelector((state) => state.user.placelist);
  const [viewState, setViewState] = React.useState({
    latitude: -33.86854,
    longitude: 151.20776,
    zoom: 10,
  });

  const clickMarker = (longitude, latitude, place) => {
    setViewState(() => ({
      longitude,
      latitude,
      zoom: 11,
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
          placelist.map((place, i) => (
            <Marker
              key={place.id}
              longitude={place.geo.split(",")[1]}
              latitude={place.geo.split(",")[0]}
              anchor="bottom"
              onClick={() =>
                clickMarker(
                  place.geo.split(",")[1],
                  place.geo.split(",")[0],
                  place
                )
              }
            >
              <img
                src="https://cdn.pixabay.com/photo/2015/12/14/20/29/tracker-1093167_960_720.png"
                className="map_marker"
              />
            </Marker>
          ))}
        {showPopup && (
          <Popup
            key={showPopup.id}
            offsetLeft={10}
            longitude={showPopup.geo.split(",")[1]}
            latitude={showPopup.geo.split(",")[0]}
            onClose={() => setShowPopup(false)}
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
