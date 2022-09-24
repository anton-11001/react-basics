import React, { useContext } from "react";
import Input from "../../components/UI/input/Input";
import Button from "../../components/UI/button/Button";
import { AuthContext } from "../../context";
import classes from "./Login.module.css";

const Login = () => {
  const { setIsAuth } = useContext(AuthContext);

  const login = (event) => {
    event.preventDefault();
    setIsAuth(true);
    localStorage.setItem("auth", "true");
  };

  return (
    <main className={classes.page}>
      <form className={classes.form} onSubmit={login}>
        <div className={classes.header}>
          <h1 className={classes.title}>Sign in</h1>
          <p className={classes.subtitle}>
            Enter your credentials to continue.
          </p>
        </div>

        <label className={classes.field}>
          <span className={classes.label}>Username</span>
          <Input
            type="text"
            placeholder="Enter username"
            autoComplete="username"
          />
        </label>

        <label className={classes.field}>
          <span className={classes.label}>Password</span>
          <Input
            type="password"
            placeholder="Enter password"
            autoComplete="current-password"
          />
        </label>

        <Button className={classes.submit} type="submit">
          Sign in
        </Button>
      </form>
    </main>
  );
};

export default Login;
