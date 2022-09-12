import React, { forwardRef } from "react";
import classes from "./Button.module.css";

const Button = forwardRef(
  (
    {
      children,
      className = "",
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      ...props
    },
    ref,
  ) => {
    const classNames = [
      classes.button,
      classes[variant],
      classes[size],
      isLoading ? classes.loading : "",
      className,
    ].join(" ");

    return (
      <button
        ref={ref}
        className={classNames}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? "Loading..." : children}
      </button>
    );
  },
);

export default Button;
