import React, { useState } from "react";
import MatchSelector from "./MatchSelector";
import PlayerStatsList from "./PlayerStatsList";
import { useDeletePlayerStats } from "../../../api/playerStatsApi";
import { useMatches } from "../../../api/matchApi";
import { usePlayerStatsByMatchId } from "../../../api/playerStatsApi";
import AddStatModal from "./AddStatModal";
import EditStatModal from "./EditStatModal";
import { usePlayers } from "../../../api/playerApi";

const PlayerStatisticsManagement = () => {
  const [selectedMatchId, setSelectedMatchId] = useState(null);
  const {
    matches,
    loading: matchesLoading,
    error: matchesError,
  } = useMatches();

  // Only fetch player stats when we have a valid matchId
  const {
    playerStats,
    loading: statsLoading,
    error: statsError,
    refetch: refetchStats,
  } = usePlayerStatsByMatchId(selectedMatchId || "no-request");

  // State for modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [editModalData, setEditModalData] = useState(null);

  // Get players for the modals
  const { players } = usePlayers();

  // Delete functionality
  const { deletePlayerStats } = useDeletePlayerStats();

  const handleDelete = async (statId) => {
    try {
      await deletePlayerStats(statId);
      refetchStats();
    } catch (error) {
      console.error("Error deleting stat:", error);
    }
  };

  // Handle match selection
  const handleMatchSelect = (match) => {
    setSelectedMatchId(match._id);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">
        Player Statistics Management
      </h1>

      {matchesLoading && <div>Loading matches...</div>}
      {matchesError && <div>Error loading matches: {matchesError}</div>}
      {matches && (
        <MatchSelector
          matches={matches}
          onMatchSelect={handleMatchSelect}
          selectedMatchId={selectedMatchId}
        />
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

          {statsLoading && <div>Loading player stats...</div>}
          {statsError && <div>Error loading player stats: {statsError}</div>}
          {playerStats && (
            <PlayerStatsList
              stats={playerStats}
              onEdit={(stat) => setEditModalData(stat)}
              onDelete={handleDelete}
            />
          )}
        </div>
      )}

      {showAddModal && (
        <AddStatModal
          matchId={selectedMatchId}
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            setShowAddModal(false);
            refetchStats();
          }}
        />
      )}

      {editModalData && (
        <EditStatModal
          stat={editModalData}
          players={players}
          isOpen={!!editModalData}
          onClose={() => setEditModalData(null)}
          onSuccess={() => {
            setEditModalData(null);
            refetchStats();
          }}
        />
      )}
    </div>
  );
};

export default PlayerStatisticsManagement;
