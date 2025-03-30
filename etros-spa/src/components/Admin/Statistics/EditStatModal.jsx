import React, { useState } from "react";
import { useUpdatePlayerStats } from "../../../api/playerStatsApi";

const EditStatModal = ({ stat, players, isOpen, onClose, onSuccess }) => {
  const { update: updatePlayerStats } = useUpdatePlayerStats();

  // Initialize form data with correct field names and defaults based on model
  const [formData, setFormData] = useState({
    playerId: stat.player?._id || "",
    fieldGoalsMade: stat.fieldGoalsMade || 0,
    fieldGoalsAttempted: stat.fieldGoalsAttempted || 0, // Fixed typo from fieldgoalsAttempted
    twoPointsMade: stat.twoPointsMade || 0,
    twoPointsAttempted: stat.twoPointsAttempted || 0,
    threePointsMade: stat.threePointsMade || 0,
    threePointsAttempted: stat.threePointsAttempted || 0,
    freeThrowsMade: stat.freeThrowsMade || 0,
    freeThrowsAttempted: stat.freeThrowsAttempted || 0,
    offensiveRebounds: stat.offensiveRebounds || 0,
    defensiveRebounds: stat.defensiveRebounds || 0,
    totalAssists: stat.totalAssists || 0,
    totalSteals: stat.totalSteals || 0,
    totalBlocks: stat.totalBlocks || 0,
    totalTurnovers: stat.totalTurnovers || 0,
    totalFouls: stat.totalFouls || 0,
    plusMinus: stat.plusMinus || 0,
    // These fields are calculated on the server
    efficiency: stat.efficiency || 0,
    totalPoints: stat.totalPoints || 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "playerId" ? value : parseInt(value) || 0,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Remove calculated fields before sending to API
      const { efficiency, totalPoints, ...statsToUpdate } = formData;
      await updatePlayerStats(stat._id, statsToUpdate);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error updating stat:", error);
      alert("Failed to update statistic");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-gray-600/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Edit Player Statistics
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
            {/* Player Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Player
              </label>
              <select
                name="playerId"
                value={formData.playerId}
                onChange={handleChange}
                required
                disabled
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
              >
                <option value="">Select a player</option>
                {players?.map((player) => (
                  <option key={player._id} value={player._id}>
                    {player.name} (#{player.number})
                  </option>
                ))}
              </select>
            </div>

            {/* Display calculated stats */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Total Points
                  </label>
                  <div className="mt-1 text-lg font-semibold text-yellow-600">
                    {formData.totalPoints}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Efficiency Rating
                  </label>
                  <div className="mt-1 text-lg font-semibold text-yellow-600">
                    {formData.efficiency}
                  </div>
                </div>
              </div>
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
                Update Statistics
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditStatModal;
