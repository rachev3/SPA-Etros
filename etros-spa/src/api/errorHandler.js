export const handleApiError = (error) => {
  if (error.response) {
    // The request was made and the server responded with an error status
    return {
      status: error.response.status,
      message: error.response.data.message || "An error occurred on the server",
      data: error.response.data,
    };
  } else if (error.request) {
    // The request was made but no response was received
    return {
      status: 0,
      message: "No response from server. Please check your connection",
      data: null,
    };
  } else {
    // Something happened in setting up the request
    return {
      status: 0,
      message: error.message || "Error processing request",
      data: null,
    };
  }
};
