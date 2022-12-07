import React, { useState } from "react";
import Input from "../UI/input/Input";
import Button from "../UI/button/Button";
import classes from "./PostForm.module.css";

const PostForm = ({ create }) => {
  const [post, setPost] = useState({ title: "", body: "" });

  const addNewPost = (e) => {
    e.preventDefault();

    const newPost = {
      ...post,
      id: Date.now(),
    };

    create(newPost);

    setPost({ title: "", body: "" });
  };

  return (
    <form className={classes.form}>
      <h3 className={classes.title}>Create Post</h3>

      <Input
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        placeholder="Post title"
      />

      <Input
        value={post.body}
        onChange={(e) => setPost({ ...post, body: e.target.value })}
        placeholder="Post description"
      />

      <Button onClick={addNewPost}>Create</Button>
    </form>
  );
};

export default PostForm;
