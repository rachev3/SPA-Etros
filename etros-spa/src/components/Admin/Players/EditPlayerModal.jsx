import { useState } from "react";
import { useUpdatePlayer } from "../../../api/playerApi";
import { useActionState } from "react";

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

  const POSITIONS = [
    { value: "PointGuard", label: "Point Guard" },
    { value: "ShootingGuard", label: "Shooting Guard" },
    { value: "PowerForward", label: "Power Forward" },
    { value: "SmallForward", label: "Small Forward" },
    { value: "Center", label: "Center" },
  ];

  const [error, submitAction, isPending] = useActionState(
    async (_, formData) => {
      try {
        const formDataObj = {
          name: formData.get("name"),
          number: formData.get("number"),
          position: [formData.get("position")],
          bornYear: parseInt(formData.get("bornYear")),
          height: formData.get("height")
            ? parseInt(formData.get("height"))
            : "",
          weight: formData.get("weight")
            ? parseInt(formData.get("weight"))
            : "",
          imageUrl: formData.get("imageUrl") || "",
        };

        const updatedPlayer = await update(player._id, formDataObj);
        onPlayerUpdated(updatedPlayer);
        onClose();
        return null;
      } catch (error) {
        console.error("Failed to update player:", error);
        return error.message || "Failed to update player";
      }
    }
  );

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
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 m-4 rounded-lg">
            {error}
          </div>
        )}
        <form action={submitAction} className="p-4 space-y-4">
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
                defaultValue={formData.name}
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
                defaultValue={formData.number}
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
                defaultValue={formData.position[0]}
              >
                {POSITIONS.map((pos) => (
                  <option key={pos.value} value={pos.value}>
                    {pos.label}
                  </option>
                ))}
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
                defaultValue={formData.bornYear}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Height (cm)
              </label>
              <input
                type="number"
                name="height"
                placeholder="185"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                defaultValue={formData.height}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Weight (kg)
              </label>
              <input
                type="number"
                name="weight"
                placeholder="82"
                min="40"
                max="180"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                defaultValue={formData.weight}
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
              placeholder="https://example.com/player-image.jpg"
              defaultValue={formData.imageUrl}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className={`px-4 py-2 bg-green-600 text-white rounded-lg ${
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

export default EditPlayerModal;
