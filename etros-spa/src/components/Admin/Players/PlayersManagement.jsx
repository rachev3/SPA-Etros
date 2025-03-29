import React, { useState } from "react";
import { Link } from "react-router";
import { usePlayers, useDeletePlayer } from "../../../api/playerApi";
import CreatePlayerModal from "./CreatePlayerModal";
import EditPlayerModal from "./EditPlayerModal";
import PlayerListItem from "./PlayerListItem";

const PlayersManagement = () => {
  const { players, loading, error, refetch } = usePlayers();
  const { deletePlayer } = useDeletePlayer();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const handleEdit = (player) => {
    setCurrentPlayer(player);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deletePlayer(id);
      await refetch();
      setDeleteConfirmId(null);
    } catch (error) {
      console.error("Failed to delete player:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Players Management</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Add Player
        </button>
      </div>

      {/* Players table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Player
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Position
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Born Year
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {players.length > 0 ? (
              players.map((player) => (
                <PlayerListItem
                  key={player._id}
                  player={player}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  deleteConfirmId={deleteConfirmId}
                  setDeleteConfirmId={setDeleteConfirmId}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No players found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Create Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-600/20 backdrop-blur-sm flex items-center justify-center z-50">
          <CreatePlayerModal
            onClose={() => setIsAddModalOpen(false)}
            onPlayerCreated={async () => {
              await refetch();
              setIsAddModalOpen(false);
            }}
          />
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && currentPlayer && (
        <div className="fixed inset-0 bg-gray-600/20 backdrop-blur-sm flex items-center justify-center z-50">
          <EditPlayerModal
            player={currentPlayer}
            onClose={() => {
              setIsEditModalOpen(false);
              setCurrentPlayer(null);
            }}
            onPlayerUpdated={async () => {
              await refetch();
              setIsEditModalOpen(false);
              setCurrentPlayer(null);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PlayersManagement;
