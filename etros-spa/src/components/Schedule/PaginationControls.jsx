import React from "react";

const PaginationControls = ({ currentPage, totalPages, onChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 mb-8 flex justify-center space-x-2">
      <button
        onClick={() => onChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg ${
          currentPage === 1
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-yellow-500 text-black hover:bg-yellow-600"
        }`}
      >
        Previous
      </button>

      <div className="flex space-x-1">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => onChange(index + 1)}
            className={`px-4 py-2 rounded-lg ${
              currentPage === index + 1
                ? "bg-yellow-500 text-black"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <button
        onClick={() => onChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-yellow-500 text-black hover:bg-yellow-600"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
