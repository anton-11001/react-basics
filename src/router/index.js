import About from "../pages/About";
import Posts from "../pages/Posts";
import PostIdPage from "../pages/PostIdPage";
import Login from "../pages/Login/Login";
import Error from "../pages/Error/index";

export const privateRoutes = [
  { path: "/about", component: About, exact: true },
  { path: "/posts", component: Posts, exact: true },
  { path: "/posts/:id", component: PostIdPage, exact: true },
  { path: "*", component: Error, exact: true },
];

export const publicRoutes = [{ path: "/login", component: Login, exact: true }];
