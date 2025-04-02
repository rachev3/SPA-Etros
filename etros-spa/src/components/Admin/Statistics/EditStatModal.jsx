import React, { useState } from "react";
import { useUpdatePlayerStats } from "../../../api/playerStatsApi";
import { usePlayers } from "../../../api/playerApi";
import { useActionState } from "react";

const EditStatModal = ({ stat, isOpen, onClose, onSuccess }) => {
  const { update: updatePlayerStats } = useUpdatePlayerStats();
  const { players } = usePlayers();
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    playerId: stat.player?._id || "",
    fieldGoalsMade: stat.fieldGoalsMade || 0,
    fieldGoalsAttempted: stat.fieldGoalsAttempted || 0,
    twoPointsMade: stat.twoPointsMade || 0,
    twoPointsAttempted: stat.twoPointsAttempted || 0,
    threePointsMade: stat.threePointsMade || 0,
    threePointsAttempted: stat.threePointsAttempted || 0,
    freeThrowsMade: stat.freeThrowsMade || 0,
    freeThrowsAttempted: stat.freeThrowsAttempted || 0,
    offensiveRebounds: stat.offensiveRebounds || 0,
    defensiveRebounds: stat.defensiveRebounds || 0,
    assists: stat.assists || 0,
    steals: stat.steals || 0,
    blocks: stat.blocks || 0,
    turnovers: stat.turnovers || 0,
    fouls: stat.fouls || 0,
    plusMinus: stat.plusMinus || 0,
    efficiency: stat.efficiency || 0,
    points: stat.points || 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseInt(value) || 0,
    });
    // Clear error when user makes changes
    setError(null);
  };

  const [submitAction, isPending] = useActionState(async (_, formData) => {
    try {
      await updatePlayerStats(stat._id, formData);
      onSuccess(stat.matchId);
      onClose();
      return null;
    } catch (error) {
      console.error("Error updating stat:", error);
      setError(error.message || "Failed to update statistic");
      return "Failed to update statistic";
    }
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-lg max-w-4xl w-full mx-4 my-8">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-semibold">Edit Player Statistics</h3>
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {error && (
          <div className="mx-4 mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form action={submitAction} className="p-4">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Player
            </label>
            <select
              name="playerId"
              className="w-full border border-gray-300 rounded px-3 py-2"
              defaultValue={stat.player?._id || ""}
            >
              <option value="">-- Select Player --</option>
              {players?.map((player) => (
                <option key={player._id} value={player._id}>
                  {player.name} (#{player.number})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Field Goals Made
              </label>
              <input
                type="number"
                name="fieldGoalsMade"
                className="w-full border border-gray-300 rounded px-3 py-2"
                min="0"
                max={formData.fieldGoalsAttempted}
                defaultValue={formData.fieldGoalsMade}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Field Goals Attempted
              </label>
              <input
                type="number"
                name="fieldGoalsAttempted"
                className="w-full border border-gray-300 rounded px-3 py-2"
                min={formData.fieldGoalsMade}
                defaultValue={formData.fieldGoalsAttempted}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                2PT Made
              </label>
              <input
                type="number"
                name="twoPointsMade"
                className="w-full border border-gray-300 rounded px-3 py-2"
                min="0"
                max={formData.twoPointsAttempted}
                defaultValue={formData.twoPointsMade}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                2PT Attempted
              </label>
              <input
                type="number"
                name="twoPointsAttempted"
                className="w-full border border-gray-300 rounded px-3 py-2"
                min={formData.twoPointsMade}
                defaultValue={formData.twoPointsAttempted}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                3PT Made
              </label>
              <input
                type="number"
                name="threePointsMade"
                className="w-full border border-gray-300 rounded px-3 py-2"
                min="0"
                max={formData.threePointsAttempted}
                defaultValue={formData.threePointsMade}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                3PT Attempted
              </label>
              <input
                type="number"
                name="threePointsAttempted"
                className="w-full border border-gray-300 rounded px-3 py-2"
                min={formData.threePointsMade}
                defaultValue={formData.threePointsAttempted}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Free Throws Made
              </label>
              <input
                type="number"
                name="freeThrowsMade"
                className="w-full border border-gray-300 rounded px-3 py-2"
                min="0"
                max={formData.freeThrowsAttempted}
                defaultValue={formData.freeThrowsMade}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Free Throws Attempted
              </label>
              <input
                type="number"
                name="freeThrowsAttempted"
                className="w-full border border-gray-300 rounded px-3 py-2"
                min={formData.freeThrowsMade}
                defaultValue={formData.freeThrowsAttempted}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Offensive Rebounds
              </label>
              <input
                type="number"
                name="offensiveRebounds"
                className="w-full border border-gray-300 rounded px-3 py-2"
                min="0"
                defaultValue={formData.offensiveRebounds}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Defensive Rebounds
              </label>
              <input
                type="number"
                name="defensiveRebounds"
                className="w-full border border-gray-300 rounded px-3 py-2"
                min="0"
                defaultValue={formData.defensiveRebounds}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assists
              </label>
              <input
                type="number"
                name="assists"
                className="w-full border border-gray-300 rounded px-3 py-2"
                min="0"
                defaultValue={formData.assists}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Steals
              </label>
              <input
                type="number"
                name="steals"
                className="w-full border border-gray-300 rounded px-3 py-2"
                min="0"
                defaultValue={formData.steals}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Blocks
              </label>
              <input
                type="number"
                name="blocks"
                className="w-full border border-gray-300 rounded px-3 py-2"
                min="0"
                defaultValue={formData.blocks}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Turnovers
              </label>
              <input
                type="number"
                name="turnovers"
                className="w-full border border-gray-300 rounded px-3 py-2"
                min="0"
                defaultValue={formData.turnovers}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fouls
              </label>
              <input
                type="number"
                name="fouls"
                className="w-full border border-gray-300 rounded px-3 py-2"
                min="0"
                defaultValue={formData.fouls}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                +/- Rating
              </label>
              <input
                type="number"
                name="plusMinus"
                className="w-full border border-gray-300 rounded px-3 py-2"
                defaultValue={formData.plusMinus}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Efficiency
              </label>
              <input
                type="number"
                name="efficiency"
                className="w-full border border-gray-300 rounded px-3 py-2"
                min="0"
                defaultValue={formData.efficiency}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Points
              </label>
              <input
                type="number"
                name="points"
                className="w-full border border-gray-300 rounded px-3 py-2"
                min="0"
                defaultValue={formData.points}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className={`px-4 py-2 bg-green-600 text-white rounded shadow ${
                isPending
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-green-700"
              }`}
            >
              {isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStatModal;
