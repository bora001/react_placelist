import React, { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase, ref as dataRef, push } from "firebase/database";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Post = () => {
  const [inputData, setInputData] = useState({});
  const storage = getStorage();
  const userInfo = useSelector((state) => state.user);
  const navigate = useNavigate();

  const addImg = (e) => {
    const { name, value } = e.target;

    if (e.target.files) {
      const n = Math.random().toString(36).slice(2);
      const id = n + n + ".";
      let reader = new FileReader();
      let file = e.target.files[0];

      const type = file.name.split(".")[1];
      const blob = file.slice(0, file.size);
      const newFile = new File([blob], id + type, { type: file.type });

      reader.onloadend = () => {
        setInputData(() => ({
          id: n + n,
          ...inputData,
          file: newFile,
          img: reader.result,
        }));
      };
      reader.readAsDataURL(newFile);
    } else {
      setInputData((inputData) => ({ ...inputData, [name]: value }));
    }
  };

  const postData = (e) => {
    e.preventDefault();
    if (userInfo.userUid) {
      const storageRef = ref(storage, inputData.file.name);
      uploadBytes(storageRef, inputData.file).then((url) => {
        getDownloadURL(url.ref).then((url) => {
          const db = getDatabase();
          const newData = {
            ...inputData,
            img: url,
            user: userInfo.userUid,
          };
          push(dataRef(db, "Place"), newData);
          const { file, ...rest } = newData;
          const newPlace = Object.assign({}, { ...rest });
          navigate("/list");
          // dispatch(userAction.setList([...userInfo.placelist, newPlace]));
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
        <input type="text" placeholder="Name" name="name" required />
        <input type="text" placeholder="Location" name="location" required />
        <div className="pre_img"></div>
        <label htmlFor="input_img">Image</label>
        <input
          type="file"
          id="input_img"
          name="img"
          accept="image/*"
          required
        />
        {inputData.img && <img src={inputData.img} />}
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
