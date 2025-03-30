import React, { useState } from "react";
import { useCreatePlayerStats } from "../../../api/playerStatsApi";
import { usePlayers } from "../../../api/playerApi";

const AddStatModal = ({ matchId, onClose, onSuccess }) => {
  const { create: createPlayerStats } = useCreatePlayerStats();
  const {
    players,
    loading: playersLoading,
    error: playersError,
  } = usePlayers();
  const [formData, setFormData] = useState({
    matchId,
    playerId: "",
    fieldGoalsMade: 0,
    fieldGoalsAttempted: 0,
    twoPointsMade: 0,
    twoPointsAttempted: 0,
    threePointsMade: 0,
    threePointsAttempted: 0,
    freeThrowsMade: 0,
    freeThrowsAttempted: 0,
    offensiveRebounds: 0,
    defensiveRebounds: 0,
    totalAssists: 0,
    totalSteals: 0,
    totalBlocks: 0,
    totalTurnovers: 0,
    totalFouls: 0,
    plusMinus: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "playerId" ? value : parseInt(value, 10) || 0,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.playerId) {
      alert("Please select a player");
      return;
    }

    try {
      await createPlayerStats({
        ...formData,
        playerId: formData.playerId,
      });
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error saving stat:", error);
      alert("Failed to save statistic");
    }
  };

  if (playersLoading) {
    return (
      <div className="fixed inset-0  bg-gray-600/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (playersError) {
    return (
      <div className="fixed inset-0  bg-gray-600/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6">
          <p className="text-red-600">
            Failed to load players. Please try again later.
          </p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  if (!players || players.length === 0) {
    return (
      <div className="fixed inset-0 bg-gray-600/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6">
          <p className="text-gray-600">
            No players available. Please add players first.
          </p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-600/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Add Player Statistics
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Player
              </label>
              <select
                name="playerId"
                value={formData.playerId}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              >
                <option value="">Select a player</option>
                {players.map((player) => (
                  <option key={player._id} value={player._id}>
                    {player.name} (#{player.number})
                  </option>
                ))}
              </select>
            </div>

            {/* Field Goals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Field Goals Made
                </label>
                <input
                  type="number"
                  name="fieldGoalsMade"
                  value={formData.fieldGoalsMade}
                  onChange={handleChange}
                  min="0"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Field Goals Attempted
                </label>
                <input
                  type="number"
                  name="fieldGoalsAttempted"
                  value={formData.fieldGoalsAttempted}
                  onChange={handleChange}
                  min="0"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
            </div>

            {/* Two Points */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Two Points Made
                </label>
                <input
                  type="number"
                  name="twoPointsMade"
                  value={formData.twoPointsMade}
                  onChange={handleChange}
                  min="0"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Two Points Attempted
                </label>
                <input
                  type="number"
                  name="twoPointsAttempted"
                  value={formData.twoPointsAttempted}
                  onChange={handleChange}
                  min="0"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
            </div>

            {/* Three Points */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Three Points Made
                </label>
                <input
                  type="number"
                  name="threePointsMade"
                  value={formData.threePointsMade}
                  onChange={handleChange}
                  min="0"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Three Points Attempted
                </label>
                <input
                  type="number"
                  name="threePointsAttempted"
                  value={formData.threePointsAttempted}
                  onChange={handleChange}
                  min="0"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
            </div>

            {/* Free Throws */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Free Throws Made
                </label>
                <input
                  type="number"
                  name="freeThrowsMade"
                  value={formData.freeThrowsMade}
                  onChange={handleChange}
                  min="0"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Free Throws Attempted
                </label>
                <input
                  type="number"
                  name="freeThrowsAttempted"
                  value={formData.freeThrowsAttempted}
                  onChange={handleChange}
                  min="0"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
            </div>

            {/* Rebounds */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Offensive Rebounds
                </label>
                <input
                  type="number"
                  name="offensiveRebounds"
                  value={formData.offensiveRebounds}
                  onChange={handleChange}
                  min="0"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Defensive Rebounds
                </label>
                <input
                  type="number"
                  name="defensiveRebounds"
                  value={formData.defensiveRebounds}
                  onChange={handleChange}
                  min="0"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
            </div>

            {/* Other Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assists
                </label>
                <input
                  type="number"
                  name="totalAssists"
                  value={formData.totalAssists}
                  onChange={handleChange}
                  min="0"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Steals
                </label>
                <input
                  type="number"
                  name="totalSteals"
                  value={formData.totalSteals}
                  onChange={handleChange}
                  min="0"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blocks
                </label>
                <input
                  type="number"
                  name="totalBlocks"
                  value={formData.totalBlocks}
                  onChange={handleChange}
                  min="0"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Turnovers
                </label>
                <input
                  type="number"
                  name="totalTurnovers"
                  value={formData.totalTurnovers}
                  onChange={handleChange}
                  min="0"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fouls
                </label>
                <input
                  type="number"
                  name="totalFouls"
                  value={formData.totalFouls}
                  onChange={handleChange}
                  min="0"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Plus/Minus
                </label>
                <input
                  type="number"
                  name="plusMinus"
                  value={formData.plusMinus}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-colors"
              >
                Save Statistics
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStatModal;
