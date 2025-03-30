import React, { useState } from "react";
import MatchSelector from "./MatchSelector";
import PlayerStatsList from "./PlayerStatsList";
import { useDeletePlayerStats } from "../../../api/playerStatsApi";
import { useMatches } from "../../../api/matchApi";

const PlayerStatisticsManagement = () => {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { deletePlayerStats } = useDeletePlayerStats();
  const {
    matches,
    loading: matchesLoading,
    error: matchesError,
    pagination,
    refetch: refetchMatches,
  } = useMatches(currentPage, 3, "playerStats:player");

  const handleSuccess = async () => {
    await refetchMatches();
    if (selectedMatch) {
      const updatedMatch = matches.find((m) => m._id === selectedMatch._id);
      if (updatedMatch) {
        setSelectedMatch(updatedMatch);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePlayerStats(id);
      await handleSuccess();
    } catch (error) {
      console.error("Error deleting stat:", error);
      alert("Failed to delete statistic");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">
        Player Statistics Management
      </h1>

      <MatchSelector
        selectedMatch={selectedMatch}
        onMatchSelect={setSelectedMatch}
        matches={matches}
        loading={matchesLoading}
        error={matchesError}
        pagination={pagination}
        onPageChange={setCurrentPage}
        currentPage={currentPage}
      />

      {selectedMatch ? (
        <PlayerStatsList
          selectedMatch={selectedMatch}
          onAddStatSuccess={handleSuccess}
          onEditStatSuccess={handleSuccess}
          onDeleteStat={handleDelete}
        />
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Select a Match
          </h3>
          <p className="text-gray-500">
            Please select a match from above to view or manage player
            statistics.
          </p>
        </div>
      )}
    </div>
  );
};

export default PlayerStatisticsManagement;
