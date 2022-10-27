import PostsLazyLoading from "../pages/Posts/PostsLazyLoading";
import PostsPagination from "../pages/Posts/PostsPagination";
import PostIdPage from "../pages/PostIdPage/PostIdPage";
import Login from "../pages/Login/Login";
import Error from "../pages/Error/index";

export const privateRoutes = [
  { path: "/posts", component: PostsLazyLoading, exact: true },
  { path: "/posts-pagination", component: PostsPagination, exact: true },
  { path: "/posts/:id", component: PostIdPage, exact: true },
  { path: "*", component: Error, exact: true },
];

export const publicRoutes = [{ path: "/login", component: Login, exact: true }];
