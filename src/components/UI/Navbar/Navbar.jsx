import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import Button from "../button/Button";
import { AuthContext } from "../../../context";
import classes from "./Navbar.module.css";

const links = [
  { to: "/posts", label: "Lazy loading" },
  { to: "/posts-pagination", label: "Pagination" },
];

const Navbar = ({ className = "" }) => {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem("auth");
  };

  return (
    <header className={[classes.navbar, className].join(" ")}>
      <Link className={classes.brand} to={isAuth ? "/posts" : "/login"}>
        React Basics
      </Link>

      <nav className={classes.links} aria-label="Main navigation">
        {links.map((link) => (
          <NavLink
            key={link.to}
            className={classes.link}
            activeClassName={classes.active}
            exact={link.exact ?? true}
            to={link.to}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className={classes.actions}>
        {isAuth ? (
          <Button variant="outline" size="sm" onClick={logout}>
            Logout
          </Button>
        ) : (
          <Link className={classes.loginLink} to="/login">
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
