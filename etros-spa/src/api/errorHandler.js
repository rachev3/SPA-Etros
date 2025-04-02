export const handleApiError = (error) => {
  if (error.response) {
    return {
      status: error.response.status,
      message: error.response.data.message || "An error occurred on the server",
      data: error.response.data,
    };
  } else if (error.request) {
    return {
      status: 0,
      message: "No response from server. Please check your connection",
      data: null,
    };
  } else {
    return {
      status: 0,
      message: error.message || "Error processing request",
      data: null,
    };
  }
};
