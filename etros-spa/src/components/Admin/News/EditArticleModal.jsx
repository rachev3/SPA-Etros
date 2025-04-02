import { useState, useEffect } from "react";
import { useArticle, useUpdateArticle } from "../../../api/articleApi";
import { useActionState } from "react";
import LoadingSpinner from "../../shared/LoadingSpinner";

const EditArticleModal = ({ articleId, onClose, onSuccess }) => {
  const { article, loading, error } = useArticle(articleId);
  const { update } = useUpdateArticle();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [imageUrls, setImageUrls] = useState([""]);

  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title || "",
        content: article.content || "",
      });
      setImageUrls(article.images?.length ? article.images : [""]);
    }
  }, [article]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await update(articleId, {
        ...formData,
        images: imageUrls.filter((url) => url.trim()),
      });
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Failed to update article:", err);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white rounded shadow-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
          <LoadingSpinner size="medium" containerHeight="h-32" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-gray-600/20 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  if (!article) return null;

  return (
    <div className="fixed inset-0 bg-gray-600/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b p-4">
          <h3 className="text-lg font-medium">Edit Article</h3>
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
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content *
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                rows="10"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                required
              ></textarea>
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
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg text-sm"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditArticleModal;
