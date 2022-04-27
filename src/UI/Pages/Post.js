import React from "react";

const Post = () => {
  return (
    <section className="section_new">
      <form
        className="form_new form_box"
        method="post"
        onsubmit="return false;"
        enctype="multipart/form-data"
      >
        <h2>New PlaceList</h2>
        <input type="text" placeholder="Name" name="name" required />
        <input type="text" placeholder="Location" name="location" required />
        <div className="pre_img"></div>
        <label for="input_img">Image</label>
        <input type="file" id="input_img" name="img" required />
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
