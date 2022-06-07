import React, { useState, useEffect } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase, ref as dataRef, update } from "firebase/database";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import { useNavigate } from "react-router";
import { devToken } from "../dev";
import { userAction } from "../Store/user-slice";

type locationListType = {
  geometry: { coordinates: number[] };
  id: string;
  place_name: string;
};

type inputDataType = {
  name?: string;
  location?: string;
  file?: File;
  id?: string;
  img?: string | ArrayBuffer;
  geo?: string | null;
};

const Post = () => {
  const [inputData, setInputData] = useState<inputDataType>();
  const [geoClicked, setGeoClicked] = useState<boolean>(false);
  const [locationList, setLocationList] = useState<locationListType[]>([]);
  const [previewURL, setPreviewURL] = useState<string>();
  const storage = getStorage();
  const userInfo = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getLocation = async (address: string) => {
      if (!geoClicked) {
        setInputData((inputData) => ({
          ...inputData,
          geo: null,
        }));
        const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${devToken.mapToken}&autocomplete=true`;
        const response = await fetch(endpoint);
        const results = await response.json();
        setLocationList(() => results.features);

        //[[dummy list, test]]
        //     setLocationList((address: any) => [
        //       {
        //         id: "123",
        //         place_name: "The Rocks, New South Wales, Australia",
        //         geometry: {
        //           coordinates: [151.209, -33.8599],
        //         },
        //       },
        //       {
        //         id: "78",
        //         place_name: "Australia",
        //         geometry: {
        //           coordinates: [151.209, -33.8599],
        //         },
        //       },
        //       {
        //         id: "456",
        //         place_name: "The Rocks, New South Wales, Australia",
        //         geometry: {
        //           coordinates: [9, -9],
        //         },
        //       },
        //     ]);
      }
    };
    let timer = setTimeout(() => {
      if (inputData?.location) getLocation(inputData?.location);
    }, 1200);
    //clean up when inputData.location is changed by 1.5s
    // if user type something in 1.5s, the timer won't work
    return () => clearTimeout(timer);
  }, [inputData?.location]);

  const addImg = (e: React.FormEvent) => {
    const target = e.target as HTMLFormElement;
    const { name, value } = target;
    setGeoClicked(false);

    if (target.name == "geo") {
      setGeoClicked(() => true);
      const locationInput = document.querySelector(
        'input[name="location"]'
      ) as HTMLInputElement;
      const clickedValue =
        target.parentElement?.querySelector("label")?.innerText;
      if (clickedValue) {
        locationInput.value = clickedValue;
      }
    }
    if (target.files) {
      const n = Math.random().toString(36).slice(2);
      const id = n + n + ".";
      let reader = new FileReader();
      let file = target.files[0];

      const type = file.name.split(".")[1];
      const blob = file.slice(0, file.size);
      const newFile = new File([blob], id + type, { type: file.type });
      reader.onloadend = () => {
        if (reader.result) {
          const imgData = reader.result;
          setInputData(() => ({
            id: n + n,
            ...inputData,
            file: newFile,
            img: imgData,
          }));
        }
      };
      reader.readAsDataURL(newFile);
      let imgBlob = new Blob([new ArrayBuffer(blob)], { type: newFile.type });
      const url = window.URL.createObjectURL(blob);
      setPreviewURL(() => url);
    }
    setInputData((inputData) => ({ ...inputData, [name]: value }));
  };

  const postData = (e: React.FormEvent) => {
    e.preventDefault();
    const btn = document.querySelector(
      "input[type='submit']"
    ) as HTMLInputElement;
    btn.type = "button";
    if (userInfo.userUid && inputData!.file) {
      //
      const storageRef = ref(storage, inputData!.file.name);
      uploadBytes(storageRef, inputData!.file).then((url) => {
        getDownloadURL(url.ref).then((url) => {
          const db = getDatabase();
          const newData = {
            ...inputData,
            img: url,
            user: userInfo.userUid,
            rate: 0,
            comments: 0,
          };
          update(dataRef(db, "Place/" + inputData!.id), newData);
          const { file, ...rest } = newData;
          const newPlace = Object.assign({}, { ...rest });
          navigate("/list");
          dispatch(userAction.setList([...userInfo.placelist, newPlace]));
        });
      });
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="section_new">
      <form className="form_new form_box" onChange={addImg} onSubmit={postData}>
        <h2>New PlaceList</h2>
        <input
          type="text"
          placeholder="Name"
          name="name"
          // value={inputData.name}
          required
        />
        <div className="input_box">
          <input type="text" placeholder="Location" name="location" required />
          {!inputData?.geo && (
            <div className="radio_box">
              {locationList &&
                locationList.map((list: any) => (
                  <div className="radio_item" key={list.id}>
                    <input
                      type="radio"
                      // data-geo={list.geometry.coordinates}
                      value={list.geometry.coordinates}
                      id={list.id}
                      name="geo"
                      required
                    />
                    <label htmlFor={list.id}>{list.place_name}</label>
                  </div>
                ))}
            </div>
          )}
        </div>
        <div className="pre_img"></div>
        <label htmlFor="input_img">Image</label>
        <input
          type="file"
          id="input_img"
          name="img"
          accept="image/*"
          required
        />
        {previewURL && <img src={previewURL} />}
        <input
          type="submit"
          className="btn_submit"
          value="Create New PlaceList"
          name="type"
        />
      </form>
    </section>
  );
};

export default Post;
