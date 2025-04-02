import React from "react";

const LoadingSpinner = ({ size = "medium", containerHeight = "h-64" }) => {
  const sizes = {
    small: "h-4 w-4",
    medium: "h-8 w-8",
    large: "h-12 w-12",
  };

  const spinnerSize = sizes[size] || sizes.medium;

  return (
    <div className={`flex justify-center items-center ${containerHeight}`}>
      <div
        className={`animate-spin rounded-full ${spinnerSize} border-b-2 border-yellow-500`}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
