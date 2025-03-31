import React, { useState } from "react";
import { useActionState, useOptimistic } from "react";
import { useCreateArticle } from "../../../api/articleApi";

const AddArticleModal = ({ onClose, onSuccess }) => {
  const { create } = useCreateArticle();
  const [article, setArticle] = useState({
    title: "",
    content: "",
    author: "Admin",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: [],
    images: [],
  });

  // Use useActionState to handle the form submission
  const [error, submitAction, isPending] = useActionState(
    async (_, formData) => {
      try {
        const articleData = {
          title: formData.get("title"),
          content: formData.get("content"),
          author: formData.get("author") || "Admin",
          metaTitle: formData.get("metaTitle"),
          metaDescription: formData.get("metaDescription"),
          metaKeywords:
            formData
              .get("metaKeywords")
              ?.split(",")
              .map((k) => k.trim()) || [],
          images:
            formData
              .get("images")
              ?.split("\n")
              .filter((url) => url.trim()) || [],
        };

        await create(articleData);
        onSuccess();
        onClose();
        return null; // No error
      } catch (err) {
        console.error("Failed to create article:", err);
        return err.message || "Failed to create article"; // Return error message
      }
    }
  );

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
          <form action={submitAction} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                name="title"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                defaultValue={article.title}
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
                defaultValue={article.content}
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meta Title
              </label>
              <input
                type="text"
                name="metaTitle"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                defaultValue={article.metaTitle}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meta Description
              </label>
              <textarea
                name="metaDescription"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                rows="3"
                defaultValue={article.metaDescription}
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meta Keywords (comma-separated)
              </label>
              <input
                type="text"
                name="metaKeywords"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                defaultValue={article.metaKeywords.join(", ")}
                placeholder="news, article, basketball"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URLs (one per line)
              </label>
              <textarea
                name="images"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                rows="3"
                defaultValue={article.images.join("\n")}
                placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
              ></textarea>
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
                disabled={isPending}
                className={`px-4 py-2 bg-yellow-500 text-black rounded-lg text-sm ${
                  isPending
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-yellow-600"
                } transition-colors`}
              >
                {isPending ? "Saving..." : "Save Article"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddArticleModal;
