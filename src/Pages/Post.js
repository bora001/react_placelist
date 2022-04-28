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
      let reader = new FileReader();
      let file = e.target.files[0];
      reader.onloadend = () => {
        setInputData(() => ({
          ...inputData,
          file,
          img: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setInputData((inputData) => ({ ...inputData, [name]: value }));
    }
  };

  const postData = (e) => {
    e.preventDefault();
    if (userInfo.userUid) {
      const n = Math.random().toString(36).slice(2);
      const id = n + n + ".";
      const type = inputData.file.name.split(".")[1];
      const storageRef = ref(storage, id + type);
      // const storageRef = ref(storage, inputData.file.name);
      uploadBytes(storageRef, inputData.file);
      getDownloadURL(ref(storage, inputData.file.name)).then((url) => {
        console.log(url);
        const db = getDatabase();
        push(dataRef(db, "Place"), {
          ...inputData,
          img: url,
          user: userInfo.userUid,
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
