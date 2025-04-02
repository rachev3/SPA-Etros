import React, { useState } from "react";
import CreateMatchModal from "./CreateMatchModal";
import EditMatchModal from "./EditMatchModal";
import { useMatches, useDeleteMatch } from "../../../api/matchApi";
import MatchListItem from "./MatchListItem";
import LoadingSpinner from "../../shared/LoadingSpinner";

const MatchesManagement = () => {
  const { matches, loading, error, refetch } = useMatches();
  const { deleteMatch } = useDeleteMatch();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentMatch, setCurrentMatch] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const handleAddNew = () => {
    setIsCreateModalOpen(true);
  };

  const handleEdit = (match) => {
    setCurrentMatch(match);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteMatch(id);
      await refetch();
      setDeleteConfirmId(null);
    } catch (err) {
      console.error("Failed to delete match:", err);
    }
  };

  const handleCreateSuccess = async () => {
    setIsCreateModalOpen(false);
    await refetch();
  };

  const handleUpdateSuccess = async () => {
    setIsEditModalOpen(false);
    await refetch();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        Error loading matches: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Matches Management</h1>
        <button
          onClick={handleAddNew}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Add Match
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Opponent
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Location
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Result
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
            {matches.length > 0 ? (
              matches.map((match) => (
                <MatchListItem
                  key={match._id}
                  match={match}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  deleteConfirmId={deleteConfirmId}
                  setDeleteConfirmId={setDeleteConfirmId}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No matches found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <CreateMatchModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleCreateSuccess}
      />

      <EditMatchModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={handleUpdateSuccess}
        match={currentMatch}
      />
    </div>
  );
};

export default MatchesManagement;
