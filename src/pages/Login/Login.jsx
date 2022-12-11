import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import Input from "../../components/UI/input/Input";
import Button from "../../components/UI/button/Button";
import { AuthContext } from "../../context";
import classes from "./Login.module.css";

const Login = () => {
  const { setIsAuth } = useContext(AuthContext);

  const history = useHistory();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const login = (event) => {
    event.preventDefault();

    if (!credentials.username.trim() || !credentials.password.trim()) {
      setError("Username and password are required.");
      return;
    }

    setError("");
    setIsAuth(true);
    localStorage.setItem("auth", "true");

    setCredentials({ username: "", password: "" });

    history.push("/posts");
  };

  const updateCredentials = (field, value) => {
    setCredentials({ ...credentials, [field]: value });

    if (error) {
      setError("");
    }
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
            value={credentials.username}
            onChange={(event) =>
              updateCredentials("username", event.target.value)
            }
            placeholder="Enter username"
            autoComplete="username"
          />
        </label>

        <label className={classes.field}>
          <span className={classes.label}>Password</span>
          <Input
            type="password"
            value={credentials.password}
            onChange={(event) =>
              updateCredentials("password", event.target.value)
            }
            placeholder="Enter password"
            autoComplete="current-password"
          />
        </label>

        {error && <p className={classes.error}>{error}</p>}

        <Button className={classes.submit} type="submit">
          Sign in
        </Button>
      </form>
    </main>
  );
};

export default Login;
