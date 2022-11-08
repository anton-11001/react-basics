import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostService from "../../API/PostService";
import Loader from "../../components/UI/loader/Loader";
import { useFetching } from "../../hooks/useFetching";
import classes from "./PostIdPage.module.css";

const PostIdPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  const [fetchPostById, isPostLoading, postError] = useFetching(
    async (postId) => {
      const response = await PostService.getById(postId);
      setPost(response.data);
    },
  );

  const [fetchComments, areCommentsLoading, commentsError] = useFetching(
    async (postId) => {
      const response = await PostService.getCommentsByPostId(postId);
      setComments(response.data);
    },
  );

  useEffect(() => {
    fetchPostById(id);
    fetchComments(id);
  }, [id]);

  return (
    <main className={classes.page}>
      <section className={classes.postSection}>
        <p className={classes.eyebrow}>Post #{id}</p>
        <h1 className={classes.title}>Post details</h1>

        {postError && (
          <p className={classes.error}>Failed to load post: {postError}</p>
        )}

        {isPostLoading ? (
          <div className={classes.loader}>
            <Loader />
          </div>
        ) : (
          <article className={classes.postCard}>
            <h2 className={classes.postTitle}>{post.title}</h2>
            <p className={classes.postBody}>{post.body}</p>
          </article>
        )}
      </section>

      <section className={classes.commentsSection}>
        <div className={classes.commentsHeader}>
          <h2 className={classes.commentsTitle}>Comments</h2>
          <span className={classes.count}>{comments.length}</span>
        </div>

        {commentsError && (
          <p className={classes.error}>
            Failed to load comments: {commentsError}
          </p>
        )}

        {areCommentsLoading ? (
          <div className={classes.loader}>
            <Loader />
          </div>
        ) : comments.length ? (
          <div className={classes.commentsList}>
            {comments.map((comment) => (
              <article className={classes.comment} key={comment.id}>
                <h3 className={classes.commentEmail}>{comment.email}</h3>
                <p className={classes.commentBody}>{comment.body}</p>
              </article>
            ))}
          </div>
        ) : (
          <p className={classes.empty}>No comments yet.</p>
        )}
      </section>
    </main>
  );
};

export default PostIdPage;
