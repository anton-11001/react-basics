import React, { useCallback, useEffect } from "react";
import classes from "./Modal.module.css";

const Modal = ({
  children,
  open = false,
  onClose,
  className = "",
}) => {
  const closeModal = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [closeModal, open]);

  const rootClasses = [
    classes.modal,
    open ? classes["modal--active"] : "",
    className,
  ].join(" ");

  return (
    <div
      className={rootClasses}
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      onClick={closeModal}
    >
      <div
        className={classes["modal__content"]}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
