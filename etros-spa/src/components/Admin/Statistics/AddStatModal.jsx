import React, { useState, useEffect } from "react";
import { useCreatePlayerStats } from "../../../api/playerStatsApi";
import { usePlayers } from "../../../api/playerApi";

const AddStatModal = ({ matchId, onClose, onSuccess }) => {
  const { create: createPlayerStats } = useCreatePlayerStats();
  const { players } = usePlayers();
  const [error, setError] = useState(null);
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
    totalRebounds: 0,
    assists: 0,
    steals: 0,
    blocks: 0,
    turnovers: 0,
    fouls: 0,
    efficiency: 0,
    points: 0,
    plusMinus: 0,
  });

  useEffect(() => {
    const twoPointPoints = formData.twoPointsMade * 2;
    const threePointPoints = formData.threePointsMade * 3;
    const freeThrowPoints = formData.freeThrowsMade;
    const totalPoints = twoPointPoints + threePointPoints + freeThrowPoints;

    const totalRebounds =
      formData.offensiveRebounds + formData.defensiveRebounds;

    setFormData((prev) => ({
      ...prev,
      points: totalPoints,
      totalRebounds,
      fieldGoalsMade: formData.twoPointsMade + formData.threePointsMade,
      fieldGoalsAttempted:
        formData.twoPointsAttempted + formData.threePointsAttempted,
    }));
  }, [
    formData.twoPointsMade,
    formData.twoPointsAttempted,
    formData.threePointsMade,
    formData.threePointsAttempted,
    formData.freeThrowsMade,
    formData.offensiveRebounds,
    formData.defensiveRebounds,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numValue = name === "playerId" ? value : parseInt(value) || 0;

    setFormData((prev) => ({
      ...prev,
      [name]: numValue,
    }));

    setError(null);
  };

  const validateStats = () => {
    if (formData.twoPointsMade > formData.twoPointsAttempted) {
      setError("Two points made cannot exceed attempts");
      return false;
    }
    if (formData.threePointsMade > formData.threePointsAttempted) {
      setError("Three points made cannot exceed attempts");
      return false;
    }
    if (formData.freeThrowsMade > formData.freeThrowsAttempted) {
      setError("Free throws made cannot exceed attempts");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.playerId) {
      setError("Please select a player");
      return;
    }

    if (!validateStats()) {
      return;
    }

    try {
      await createPlayerStats(formData);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error saving stat:", error);
      setError(error.message || "Failed to save statistic");
    }
  };

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

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

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
                {players?.map((player) => (
                  <option key={player._id} value={player._id}>
                    {player.name} (#{player.number})
                  </option>
                ))}
              </select>
            </div>

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
                  max={formData.fieldGoalsAttempted}
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
                  min={formData.fieldGoalsMade}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
            </div>

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
                  max={formData.twoPointsAttempted}
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
                  min={formData.twoPointsMade}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
            </div>

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
                  max={formData.threePointsAttempted}
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
                  min={formData.threePointsMade}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
            </div>

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
                  max={formData.freeThrowsAttempted}
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
                  min={formData.freeThrowsMade}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
            </div>

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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assists
                </label>
                <input
                  type="number"
                  name="assists"
                  value={formData.assists}
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
                  name="steals"
                  value={formData.steals}
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
                  name="blocks"
                  value={formData.blocks}
                  onChange={handleChange}
                  min="0"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Turnovers
                </label>
                <input
                  type="number"
                  name="turnovers"
                  value={formData.turnovers}
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
                  name="fouls"
                  value={formData.fouls}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Points
                </label>
                <input
                  type="number"
                  name="points"
                  value={formData.points}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                  readonly
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Efficiency
                </label>
                <input
                  type="number"
                  name="efficiency"
                  value={formData.efficiency}
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
