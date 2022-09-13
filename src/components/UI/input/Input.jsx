import React, { forwardRef } from "react";
import classes from "./Input.module.css";

const Input = forwardRef(({ className = "", type = "text", ...props }, ref) => {
  const classNames = [classes.input, className].join(" ");

  return <input ref={ref} type={type} className={classNames} {...props} />;
});

export default Input;
