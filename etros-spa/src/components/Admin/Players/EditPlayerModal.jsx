import React, { useState } from "react";
import { useUpdatePlayer } from "../../../api/playerApi";

const EditPlayerModal = ({ player, onClose, onPlayerUpdated }) => {
  const { update } = useUpdatePlayer();
  const [formData, setFormData] = useState({
    name: player.name,
    number: player.number,
    position: player.position || ["PointGuard"],
    bornYear: player.bornYear,
    height: player.height || "",
    weight: player.weight || "",
    imageUrl: player.imageUrl || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedPlayer = await update(player._id, formData);
      onPlayerUpdated(updatedPlayer);
      onClose();
    } catch (error) {
      console.error("Failed to update player:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "position") {
      setFormData((prev) => ({
        ...prev,
        [name]: [value],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
        <div className="flex justify-between items-center border-b p-4">
          <h3 className="text-lg font-medium">Edit Player</h3>
          <button onClick={onClose}>
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
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Jersey Number
              </label>
              <input
                type="text"
                name="number"
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                value={formData.number}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Position
              </label>
              <select
                name="position"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                value={formData.position[0]}
                onChange={handleChange}
              >
                <option value="PointGuard">Point Guard</option>
                <option value="ShootingGuard">Shooting Guard</option>
                <option value="PowerForward">Power Forward</option>
                <option value="SmallForward">Small Forward</option>
                <option value="Center">Center</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Born Year
              </label>
              <input
                type="number"
                name="bornYear"
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                value={formData.bornYear}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Height
              </label>
              <input
                type="text"
                name="height"
                placeholder="6'5"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                value={formData.height}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Weight (lbs)
              </label>
              <input
                type="number"
                name="weight"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                value={formData.weight}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="text"
              name="imageUrl"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              value={formData.imageUrl}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-500 text-black rounded-lg text-sm"
            >
              Update Player
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPlayerModal;
