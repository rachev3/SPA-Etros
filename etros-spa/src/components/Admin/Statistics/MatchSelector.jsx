import React from "react";

const MatchSelector = ({ matches, onMatchSelect, selectedMatchId }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-medium mb-4">Select Match</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {matches.map((match) => (
          <div
            key={match._id}
            onClick={() => onMatchSelect(match)}
            className={`border p-4 rounded-lg cursor-pointer transition-colors ${
              selectedMatchId === match._id
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
    </div>
  );
};

export default MatchSelector;
