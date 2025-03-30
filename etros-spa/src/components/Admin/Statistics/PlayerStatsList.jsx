import React, { useState } from "react";
import PlayerStatsListItem from "./PlayerStatsListItem";
import AddStatModal from "./AddStatModal";
import EditStatModal from "./EditStatModal";

const PlayerStatsList = ({
  selectedMatch,
  onAddStatSuccess,
  onEditStatSuccess,
  onDeleteStat,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentStat, setCurrentStat] = useState(null);

  const handleEditStat = (stat) => {
    setCurrentStat(stat);
    setIsEditModalOpen(true);
  };

  // Get unique players from playerStats
  const players = selectedMatch.playerStats
    ? selectedMatch.playerStats
        .map((stat) => stat.player)
        .filter(
          (player, index, self) =>
            index === self.findIndex((p) => p._id === player._id)
        )
    : [];

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
          onClick={() => setIsAddModalOpen(true)}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Add Player Stats
        </button>
      </div>

      {selectedMatch.playerStats && selectedMatch.playerStats.length > 0 ? (
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
              {selectedMatch.playerStats.map((stat) => (
                <PlayerStatsListItem
                  key={stat._id}
                  stat={stat}
                  player={stat.player}
                  onEditStat={handleEditStat}
                  onDeleteStat={onDeleteStat}
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
          <div className="mt-6">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              <svg
                className="-ml-1 mr-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add Player Stats
            </button>
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <AddStatModal
          matchId={selectedMatch._id}
          players={players}
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={onAddStatSuccess}
        />
      )}

      {isEditModalOpen && currentStat && (
        <EditStatModal
          stat={currentStat}
          players={players}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setCurrentStat(null);
          }}
          onSuccess={onEditStatSuccess}
        />
      )}
    </div>
  );
};

export default PlayerStatsList;
