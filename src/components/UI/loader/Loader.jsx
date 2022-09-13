import React from "react";
import classes from "./Loader.module.css";

const Loader = ({
  size = 40,
  color = "navy",
  centered = false,
  fullScreen = false,
}) => {
  const style = {
    width: size,
    height: size,
    borderColor: color,
  };

  const classNames = [
    classes.loader,
    centered ? classes.centered : "",
    fullScreen ? classes.fullScreen : "",
  ].join(" ");

  return (
    <div className={classNames}>
      <div className={classes.spinner} style={style} />
    </div>
  );
};

export default Loader;
