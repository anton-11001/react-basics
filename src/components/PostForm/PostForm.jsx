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
    <form className={classes.form} onSubmit={addNewPost}>
      <div className={classes.header}>
        <h3 className={classes.title}>Create post</h3>
        <p className={classes.subtitle}>Add a title and short description.</p>
      </div>

      <Input
        className={classes.input}
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        placeholder="Post title"
      />

      <Input
        className={classes.input}
        value={post.body}
        onChange={(e) => setPost({ ...post, body: e.target.value })}
        placeholder="Post description"
      />

      <Button className={classes.submit} type="submit">
        Create
      </Button>
    </form>
  );
};

export default PostForm;
