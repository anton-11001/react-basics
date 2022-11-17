import React, { useEffect, useRef, useState } from "react";
import PostService from "../API/PostService";
import { usePosts } from "../hooks/usePosts";
import { useFetching } from "../hooks/useFetching";
import { getPageCount } from "../utils/pages";
import Button from "../components/UI/button/Button";
import PostForm from "../components/PostForm/PostForm";
import Modal from "../components/UI/modal/Modal";
import PostFilter from "../components/PostFilter/PostFilter";
import PostList from "../components/PostList";
import Loader from "../components/UI/loader/Loader";
import { useObserver } from "../hooks/useObserver";
import Select from "../components/UI/select/Select";
import classes from "./Posts.module.css";

function PostsLazyLoading() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef();

  const [fetchPosts, isPostsLoading, postError] = useFetching(
    async (limit, page) => {
      const response = await PostService.getAll(limit, page);
      setPosts([...posts, ...response.data]);
      const totalCount = response.headers["x-total-count"];
      setTotalPages(getPageCount(totalCount, limit));
    },
  );

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1);
  });

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <div className="App">
      <Modal open={modal} onClose={() => setModal(false)}>
        <PostForm create={createPost} />
      </Modal>
      <div className={classes.toolbar}>
        <PostFilter filter={filter} setFilter={setFilter} />

        <Button className={classes.createButton} onClick={() => setModal(true)}>
          Create post
        </Button>
      </div>
      {postError && <h1>Failed to load posts: {postError}</h1>}
      <PostList
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title="Lazy loaded posts"
      />
      <div ref={lastElement} style={{ height: 20 }} />
      {isPostsLoading && (
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
        >
          <Loader />
        </div>
      )}
    </div>
  );
}

export default PostsLazyLoading;
