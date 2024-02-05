import React from "react";
import { Spinner, Button } from "react-bootstrap";

const LoadingButton = ({
  variant = "primary",
  loading = false,
  animation,
  spinnerSize,
  buttonSize,
  children,
  className
}) => {
  return (
    <Button
      variant={variant}
      className={`d-flex flex-row align-items-center ${className}`}
      size={buttonSize}
    >
      {loading && (
        <Spinner className="mr-2" animation={animation} size={spinnerSize} />
      )}
      {children}
    </Button>
  );
};

export default LoadingButton;
