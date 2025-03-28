import React from "react";
import { useMatches } from "../../../api/matchApi";

const MatchSelector = ({ selectedMatch, onMatchSelect }) => {
  const { matches, loading: matchesLoading } = useMatches();

  if (matchesLoading) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchSelector;
