import React from "react";
import classes from "./Select.module.css";

const Select = ({
  options = [],
  defaultValue = "Select option",
  value,
  onChange,
  label,
  error,
  className = "",
  selectClassName = "",
  disabled = false,
  ...props
}) => {
  const handleChange = (event) => {
    const selectedOption = options.find(
      (option) => String(option.value) === event.target.value,
    );

    onChange(selectedOption ? selectedOption.value : event.target.value);
  };

  const selectClasses = [
    classes.select,
    error ? classes.error : "",
    selectClassName,
  ].join(" ");

  return (
    <label className={[classes.field, className].join(" ")}>
      {label && <span className={classes.label}>{label}</span>}

      <span className={classes.control}>
        <select
          className={selectClasses}
          value={value}
          disabled={disabled}
          onChange={handleChange}
          {...props}
        >
          <option disabled value="">
            {defaultValue}
          </option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.name}
            </option>
          ))}
        </select>
      </span>

      {error && <span className={classes.message}>{error}</span>}
    </label>
  );
};

export default Select;
