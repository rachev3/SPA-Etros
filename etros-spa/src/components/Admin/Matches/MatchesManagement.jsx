import React, { useState } from "react";
import CreateMatchModal from "./CreateMatchModal";
import EditMatchModal from "./EditMatchModal";
import { useMatches, useDeleteMatch } from "../../../api/matchApi";

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
      // You might want to show an error message to the user here
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
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
      </div>
    );
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

      {/* Matches table */}
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
                <tr key={match._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(match.date).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(match.date).toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {match.opponent}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {match.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${
                        match.status === "finished"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {match.status.charAt(0).toUpperCase() +
                        match.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {match.status === "finished" ? (
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {match.ourScore} - {match.opponentScore}
                        </div>
                        <div
                          className={`text-sm ${
                            match.result === "Win"
                              ? "text-green-600"
                              : match.result === "Loss"
                              ? "text-red-600"
                              : "text-gray-500"
                          }`}
                        >
                          {match.result}
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {deleteConfirmId === match._id ? (
                      <div className="flex justify-end items-center space-x-2">
                        <span className="text-xs text-gray-600">Confirm?</span>
                        <button
                          onClick={() => handleDelete(match._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(null)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button
                          onClick={() => handleEdit(match)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(match._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
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

      {/* Create Match Modal */}
      <CreateMatchModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleCreateSuccess}
      />

      {/* Edit Match Modal */}
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
