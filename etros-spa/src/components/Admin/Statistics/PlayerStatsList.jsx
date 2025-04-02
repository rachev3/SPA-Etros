import React, { useState, useEffect } from "react";
import PlayerStatsListItem from "./PlayerStatsListItem";
import { usePlayerStatsByMatchId } from "../../../api/playerStatsApi";
import AddStatModal from "./AddStatModal";
import EditStatModal from "./EditStatModal";
import { useDeletePlayerStats } from "../../../api/playerStatsApi";
import LoadingSpinner from "../../shared/LoadingSpinner";

const PlayerStatsList = ({ matchId, refreshTrigger }) => {
  const {
    playerStats: stats,
    loading: statsLoading,
    error: statsError,
    refetch: refetchStats,
  } = usePlayerStatsByMatchId(matchId);

  useEffect(() => {
    if (refreshTrigger > 0) {
      refetchStats();
    }
  }, [matchId, refreshTrigger, refetchStats]);

  const [editModalData, setEditModalData] = useState(null);
  const { deletePlayerStats } = useDeletePlayerStats();

  const handleDelete = async (statId) => {
    try {
      await deletePlayerStats(statId);
      refetchStats();
    } catch (error) {
      console.error("Error deleting stat:", error);
    }
  };

  if (statsLoading) {
    return <LoadingSpinner containerHeight="py-4" size="medium" />;
  }

  if (statsError) {
    return (
      <div className="text-center py-4 text-red-600">
        Error loading stats: {statsError}
      </div>
    );
  }

  const hasStats = stats && stats.length > 0;

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      {hasStats ? (
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
              {stats.map((stat) => (
                <PlayerStatsListItem
                  key={stat._id}
                  stat={stat}
                  onEdit={() => setEditModalData(stat)}
                  onDelete={() => handleDelete(stat._id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No statistics recorded
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by adding player statistics for this match.
          </p>
        </div>
      )}

      {editModalData && (
        <EditStatModal
          stat={editModalData}
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

export default PlayerStatsList;
