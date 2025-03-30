import React from "react";

const MatchSelector = ({
  selectedMatch,
  onMatchSelect,
  matches,
  loading: matchesLoading,
  error,
  pagination,
  onPageChange,
  currentPage,
}) => {
  const handlePageChange = (newPage) => {
    onPageChange(newPage);
  };

  if (matchesLoading) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="text-center text-red-600 py-4">
          Failed to load matches. Please try again later.
        </div>
      </div>
    );
  }

  if (!matches || matches.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="text-center py-4">
          <p className="text-gray-500">No matches available.</p>
          <p className="text-sm text-gray-400 mt-1">
            Add matches in the Matches Management section first.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-medium mb-4">Select Match</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {matches.map((match) => (
          <div
            key={match._id}
            onClick={() => onMatchSelect(match)}
            className={`border p-4 rounded-lg cursor-pointer transition-colors ${
              selectedMatch?._id === match._id
                ? "border-yellow-500 bg-yellow-50"
                : "border-gray-200 hover:border-yellow-300 hover:bg-yellow-50/50"
            }`}
          >
            <p className="font-medium text-gray-800">{match.opponent}</p>
            <p className="text-sm text-gray-500">
              {new Date(match.date).toLocaleDateString()} • {match.location}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {match.playerStats?.length || 0} player statistics recorded
            </p>
          </div>
        ))}
      </div>

      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Previous
          </button>

          {[...Array(pagination.totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pagination.totalPages}
            className={`px-3 py-1 rounded ${
              currentPage === pagination.totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MatchSelector;
