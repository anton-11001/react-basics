import React from "react";
import { useHistory } from "react-router-dom";
import Button from "../UI/button/Button";
import classes from "./PostItem.module.css";

const PostItem = ({ post, remove }) => {
  const router = useHistory();

  return (
    <article className={classes.post}>
      <div className={classes.content}>
        <strong className={classes.title}>
          {post.id}. {post.title}
        </strong>
        <p className={classes.body}>{post.body}</p>
      </div>

      <div className={classes.actions}>
        <Button
          variant="outline"
          onClick={() => router.push(`/posts/${post.id}`)}
        >
          Open
        </Button>
        <Button onClick={() => remove(post)}>Delete</Button>
      </div>
    </article>
  );
};

export default PostItem;
