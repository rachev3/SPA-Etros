import React from "react";
import {
  usePlayerStatsByMatchId,
  useDeletePlayerStats,
} from "../../../api/playerStatsApi";
import { usePlayers } from "../../../api/playerApi";
import PlayerStatsListItem from "./PlayerStatsListItem";

const PlayerStatsList = ({ selectedMatch, onEditStat, onAddStat }) => {
  const {
    playerStats: filteredStats,
    loading: statsLoading,
    refetch: refetchStats,
  } = usePlayerStatsByMatchId(selectedMatch._id);
  const { deletePlayerStats } = useDeletePlayerStats();
  const { players } = usePlayers();
  const [deleteConfirmId, setDeleteConfirmId] = React.useState(null);

  const getPlayerById = (id) => {
    return players.find((player) => player._id === id);
  };

  const handleDeleteStat = async (id) => {
    try {
      await deletePlayerStats(id);
      await refetchStats();
      setDeleteConfirmId(null);
    } catch (error) {
      console.error("Error deleting stat:", error);
      alert("Failed to delete statistic");
    }
  };

  if (statsLoading) {
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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">
          Player Stats for{" "}
          <span className="text-yellow-600">
            Etros vs {selectedMatch.opponent}
          </span>
        </h2>
        <button
          onClick={onAddStat}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Add Player Stats
        </button>
      </div>

      {filteredStats.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Player
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Points
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Field Goals
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rebounds
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Other Stats
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStats.map((stat) => {
                const player = getPlayerById(stat.playerId);
                return (
                  <PlayerStatsListItem
                    key={stat._id}
                    stat={stat}
                    player={player}
                    onEditStat={onEditStat}
                    onDeleteStat={handleDeleteStat}
                    deleteConfirmId={deleteConfirmId}
                    setDeleteConfirmId={setDeleteConfirmId}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No statistics recorded for this match yet. Click "Add Player Stats" to
          begin.
        </div>
      )}
    </div>
  );
};

export default PlayerStatsList;
