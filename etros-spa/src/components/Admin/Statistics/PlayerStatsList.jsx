import React from "react";
import {
  usePlayerStatsByMatchId,
  useDeletePlayerStats,
} from "../../../api/playerStatsApi";
import { usePlayers } from "../../../api/playerApi";

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
                  <tr key={stat._id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {player?.name} (#{player?.number})
                      </div>
                      <div className="text-sm text-gray-500">
                        {player?.position}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium">
                        {stat.totalPoints}
                      </div>
                      <div className="text-xs text-gray-500">
                        Efficiency: {stat.efficiency}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        {stat.fieldGoalsMade}/{stat.fieldGoalsAttempted}
                      </div>
                      <div className="text-xs text-gray-500">
                        3PT: {stat.threePointsMade}/{stat.threePointsAttempted}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        OFF: {stat.offensiveRebounds} DEF:{" "}
                        {stat.defensiveRebounds}
                      </div>
                      <div className="text-xs text-gray-500">
                        Total: {stat.offensiveRebounds + stat.defensiveRebounds}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        AST: {stat.totalAssists} STL: {stat.totalSteals}
                      </div>
                      <div className="text-xs text-gray-500">
                        BLK: {stat.totalBlocks} TO: {stat.totalTurnovers}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => onEditStat(stat)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Edit
                      </button>
                      {deleteConfirmId === stat._id ? (
                        <>
                          <button
                            onClick={() => handleDeleteStat(stat._id)}
                            className="text-red-600 hover:text-red-900 mr-1"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(null)}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirmId(stat._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
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
