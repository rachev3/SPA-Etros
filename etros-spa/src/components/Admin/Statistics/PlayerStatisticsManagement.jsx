import React, { useState } from "react";
import PlayerStatsList from "./PlayerStatsList";
import { useMatches } from "../../../api/matchApi";
import AddStatModal from "./AddStatModal";

const PlayerStatisticsManagement = () => {
  const [selectedMatchId, setSelectedMatchId] = useState(null);
  const {
    matches,
    loading: matchesLoading,
    error: matchesError,
  } = useMatches();
  const [showAddModal, setShowAddModal] = useState(false);
  const [statsRefreshTrigger, setStatsRefreshTrigger] = useState(0);

  const handleMatchSelect = (matchId) => {
    setSelectedMatchId(matchId);
  };

  const handleStatAdded = async () => {
    setShowAddModal(false);
    setStatsRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">
        Player Statistics Management
      </h1>
      {matchesLoading && <div>Loading matches...</div>}
      {matchesError && <div>Error loading matches: {matchesError}</div>}
      {matches && (
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium mb-4">Select Match</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {matches.map((match) => (
              <div
                key={match._id}
                onClick={() => handleMatchSelect(match._id)}
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
              </div>
            ))}
          </div>
        </div>
      )}
      {selectedMatchId && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Player Statistics</h2>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Add Player Stats
            </button>
          </div>
          <PlayerStatsList
            matchId={selectedMatchId}
            refreshTrigger={statsRefreshTrigger}
            key={selectedMatchId}
          />
        </div>
      )}

      {showAddModal && (
        <AddStatModal
          matchId={selectedMatchId}
          onClose={() => setShowAddModal(false)}
          onSuccess={handleStatAdded}
        />
      )}
    </div>
  );
};

export default PlayerStatisticsManagement;
