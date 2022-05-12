import React, { useRef, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { devToken } from "../dev";
import { Marker, Popup } from "react-map-gl";
import ReactMapGL from "react-map-gl";
import "./MainMap.scss";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { userAction } from "../Store/user-slice";
import { Link } from "react-router-dom";

const MainMap = () => {
  const [selectedStore, setSelectedStore] = useState(null);
  const [showPopup, setShowPopup] = useState(null);
  const [placeList, setPlaceList] = useState();
  const placelist = useSelector((state) => state.placelist);
  const dispatch = useDispatch();
  const [viewState, setViewState] = React.useState({
    latitude: -33.86854,
    longitude: 151.20776,
    zoom: 10,
  });
  useEffect(() => {
    axios.get(devToken.firebaseUrl + `Place.json`).then((data) => {
      dispatch(userAction.setList(Object.values(data.data)));
      // console.log(Object.values(data.data));
      setPlaceList(() => Object.values(data.data));
    });
  }, []);

  const clickMarker = (longitude, latitude, place) => {
    setViewState(() => ({
      longitude,
      latitude,
      zoom: 11,
    }));
    setTimeout(() => {
      setShowPopup(() => place);
    }, 200);
    // console.log(index);
    console.log(showPopup);
  };

  console.log(devToken.mapToken);
  return (
    <div className="map-container">
      <ReactMapGL
        {...viewState}
        mapboxAccessToken={devToken.mapToken}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onMove={(evt) => setViewState(evt.viewState)}
      >
        {placeList &&
          placeList.map((place, i) => (
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
            onClose={() => setSelectedStore(null)}
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
