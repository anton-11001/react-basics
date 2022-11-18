import React, { useEffect, useState } from "react";
import PostService from "../API/PostService";
import Button from "../components/UI/button/Button";
import Loader from "../components/UI/loader/Loader";
import Modal from "../components/UI/modal/Modal";
import Pagination from "../components/UI/pagination/Pagination";
import Select from "../components/UI/select/Select";
import PostFilter from "../components/PostFilter/PostFilter";
import PostForm from "../components/PostForm/PostForm";
import PostList from "../components/PostList";
import { useFetching } from "../hooks/useFetching";
import { usePosts } from "../hooks/usePosts";
import { getPageCount } from "../utils/pages";
import classes from "./Posts.module.css";

function PostsPagination() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const [fetchPosts, isPostsLoading, postError] = useFetching(
    async (limit, page) => {
      const response = await PostService.getAll(limit, page);
      const totalCount = response.headers["x-total-count"];

      setPosts(response.data);
      setTotalPages(getPageCount(totalCount, limit));
    },
  );

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit]);

  const createPost = (newPost) => {
    setPosts([newPost, ...posts]);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const changePage = (page) => {
    setPage(page);
  };

  const changeLimit = (value) => {
    setLimit(value);
    setPage(1);
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

      {isPostsLoading ? (
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
        >
          <Loader />
        </div>
      ) : (
        <PostList
          remove={removePost}
          posts={sortedAndSearchedPosts}
          title="Posts with pagination"
        />
      )}

      <div className={classes.paginationToolbar}>
        <div className={classes.limitControl}>
          <span className={classes.limitLabel}>Posts per page:</span>
          <Select
            className={classes.limitSelectField}
            selectClassName={classes.limitSelect}
            defaultValue="Select limit"
            value={limit}
            onChange={changeLimit}
            options={[
              { value: 5, name: "5" },
              { value: 10, name: "10" },
              { value: 25, name: "25" },
            ]}
          />
        </div>

        <Pagination
          className={classes.pagination}
          page={page}
          changePage={changePage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}

export default PostsPagination;
