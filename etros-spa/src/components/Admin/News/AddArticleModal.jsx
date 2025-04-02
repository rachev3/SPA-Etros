import React, { useState } from "react";
import { useActionState } from "react";
import { useCreateArticle } from "../../../api/articleApi";

const AddArticleModal = ({ onClose, onSuccess }) => {
  const { create } = useCreateArticle();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "Admin",
  });

  const [imageUrls, setImageUrls] = useState([""]);

  const addImageField = () => {
    setImageUrls([...imageUrls, ""]);
  };

  const handleImageChange = (index, value) => {
    const newUrls = [...imageUrls];
    newUrls[index] = value;
    setImageUrls(newUrls);
  };

  const removeImageField = (index) => {
    if (imageUrls.length > 1) {
      const newUrls = imageUrls.filter((_, i) => i !== index);
      setImageUrls(newUrls);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const articleData = {
        ...formData,
        images: imageUrls.filter((url) => url.trim()),
      };
      await create(articleData);
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Failed to create article:", err);
      return "Failed to create article";
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b p-4">
          <h3 className="text-lg font-medium">Add New Article</h3>
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
        <div className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                name="title"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content *
              </label>
              <textarea
                name="content"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                rows="10"
                value={formData.content}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Author
              </label>
              <input
                type="text"
                name="author"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                value={formData.author}
                onChange={handleChange}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Image URLs
                </label>
                <button
                  type="button"
                  onClick={addImageField}
                  className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1 rounded-lg transition-colors"
                >
                  + Add Image URL
                </button>
              </div>
              <div className="space-y-2">
                {imageUrls.map((url, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                      placeholder="https://example.com/image.jpg"
                    />
                    {imageUrls.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageField(index)}
                        className="text-red-500 hover:text-red-700"
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
                    )}
                  </div>
                ))}
              </div>
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
                className="px-4 py-2 bg-yellow-500 text-black rounded-lg text-sm hover:bg-yellow-600 transition-colors"
              >
                Save Article
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddArticleModal;
