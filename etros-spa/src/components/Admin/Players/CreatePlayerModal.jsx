import React, { useState } from "react";
import { useCreatePlayer } from "../../../api/playerApi";

const CreatePlayerModal = ({ onClose, onPlayerCreated }) => {
  const { create } = useCreatePlayer();
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    position: ["ShootingGuard"],
    bornYear: "",
    height: "",
    weight: "",
    imageUrl: "",
  });

  const POSITIONS = [
    { value: "PointGuard", label: "Point Guard" },
    { value: "ShootingGuard", label: "Shooting Guard" },
    { value: "PowerForward", label: "Power Forward" },
    { value: "SmallForward", label: "Small Forward" },
    { value: "Center", label: "Center" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setValidationErrors({});
    setIsSubmitting(true);

    try {
      // Basic validation before API call
      if (!formData.name) throw new Error("Name is required");
      if (!formData.number) throw new Error("Jersey number is required");
      if (!formData.bornYear) throw new Error("Born year is required");

      // Format the data for API
      const payload = {
        name: formData.name,
        number: formData.number,
        position: formData.position,
        bornYear: Number(formData.bornYear),
      };

      // Only add optional fields if they exist
      if (formData.height) payload.height = formData.height;
      if (formData.weight) payload.weight = Number(formData.weight);
      if (formData.imageUrl) payload.imageUrl = formData.imageUrl;

      // Make API call
      const result = await create(payload);

      onPlayerCreated(result);
      onClose();
    } catch (err) {
      console.error("Create player error:", err);

      // Handle different error types according to the API error format
      if (err.response && err.response.data) {
        const errorData = err.response.data;

        // Handle validation errors specifically
        if (errorData.errorCode === "VALIDATION_ERROR") {
          if (errorData.details) {
            setValidationErrors(errorData.details);
          }
          setError(
            errorData.message || "Please correct the errors in the form"
          );
        }
        // Handle duplicate value errors
        else if (errorData.errorCode === "DUPLICATE_VALUE") {
          setError(
            errorData.message || "A player with this information already exists"
          );
        }
        // Handle other error types
        else {
          setError(errorData.message || `Error: ${err.response.status}`);
        }
      } else if (err.request) {
        // Network error - request made but no response
        setError(
          "Unable to connect to the server. Please check your connection."
        );
      } else {
        // Client-side error
        setError(err.message || "An error occurred while creating the player");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Clear validation error when field is edited
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    if (name === "position") {
      const selectedOptions = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      setFormData((prev) => ({
        ...prev,
        position: selectedOptions,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Function to get error message for a field
  const getFieldError = (fieldName) => {
    return validationErrors[fieldName];
  };

  return (
    <div className="fixed inset-0 bg-gray-600/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
        <div className="flex justify-between items-center border-b p-4">
          <h3 className="text-lg font-medium">Add New Player</h3>
          <button
            onClick={onClose}
            disabled={isSubmitting}
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
          <div className="p-4 bg-red-50 border-l-4 border-red-400 text-red-700">
            <p className="font-medium">Error</p>
            <p>{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                name="name"
                required
                className={`w-full border rounded-lg px-3 py-2 disabled:bg-gray-100 ${
                  getFieldError("name") ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.name}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              {getFieldError("name") && (
                <p className="mt-1 text-sm text-red-600">
                  {getFieldError("name")}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Jersey Number *
              </label>
              <input
                type="text"
                name="number"
                required
                className={`w-full border rounded-lg px-3 py-2 disabled:bg-gray-100 ${
                  getFieldError("number") ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.number}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              {getFieldError("number") && (
                <p className="mt-1 text-sm text-red-600">
                  {getFieldError("number")}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Position(s) *
              </label>
              <select
                name="position"
                required
                multiple
                size={5}
                className={`w-full border rounded-lg px-3 py-2 disabled:bg-gray-100 ${
                  getFieldError("position")
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                value={formData.position}
                onChange={handleChange}
                disabled={isSubmitting}
              >
                {POSITIONS.map((pos) => (
                  <option key={pos.value} value={pos.value}>
                    {pos.label}
                  </option>
                ))}
              </select>
              {getFieldError("position") ? (
                <p className="mt-1 text-sm text-red-600">
                  {getFieldError("position")}
                </p>
              ) : (
                <p className="text-sm text-gray-500 mt-1">
                  Hold Ctrl/Cmd to select multiple positions
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Born Year *
              </label>
              <input
                type="number"
                name="bornYear"
                required
                min="1950"
                max={new Date().getFullYear() - 15}
                className={`w-full border rounded-lg px-3 py-2 disabled:bg-gray-100 ${
                  getFieldError("bornYear")
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                value={formData.bornYear}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              {getFieldError("bornYear") && (
                <p className="mt-1 text-sm text-red-600">
                  {getFieldError("bornYear")}
                </p>
              )}
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
                className={`w-full border rounded-lg px-3 py-2 disabled:bg-gray-100 ${
                  getFieldError("height") ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.height}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              {getFieldError("height") && (
                <p className="mt-1 text-sm text-red-600">
                  {getFieldError("height")}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Weight (lbs)
              </label>
              <input
                type="number"
                name="weight"
                placeholder="180"
                min="100"
                max="400"
                className={`w-full border rounded-lg px-3 py-2 disabled:bg-gray-100 ${
                  getFieldError("weight") ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.weight}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              {getFieldError("weight") && (
                <p className="mt-1 text-sm text-red-600">
                  {getFieldError("weight")}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="url"
              name="imageUrl"
              placeholder="https://example.com/player-image.jpg"
              className={`w-full border rounded-lg px-3 py-2 disabled:bg-gray-100 ${
                getFieldError("imageUrl") ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.imageUrl}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            {getFieldError("imageUrl") && (
              <p className="mt-1 text-sm text-red-600">
                {getFieldError("imageUrl")}
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? "Creating..." : "Create Player"}
            </button>
          </div>
        </form>
        <div className="px-4 pb-4 text-sm text-gray-500">* Required fields</div>
      </div>
    </div>
  );
};

export default CreatePlayerModal;
