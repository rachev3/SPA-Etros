import React, { useState } from "react";
import { useArticles, useDeleteArticle } from "../../../api/articleApi";
import { formatLongDate } from "../../../utils/dateUtils";
import AddArticleModal from "./AddArticleModal";
import EditArticleModal from "./EditArticleModal";

const NewsManagement = () => {
  const { articles, loading, error, refetch } = useArticles();
  const { deleteArticle } = useDeleteArticle();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editArticleId, setEditArticleId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const handleAddNew = () => {
    setIsAddModalOpen(true);
  };

  const handleEdit = (articleId) => {
    setEditArticleId(articleId);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteArticle(id);
      await refetch();
      setDeleteConfirmId(null);
    } catch (err) {
      console.error("Failed to delete article:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{error}</span>
          <button
            onClick={refetch}
            className="ml-2 text-sm underline hover:text-red-800"
          >
            Try Again
          </button>
        </div>
      )}

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">News Management</h1>
        <button
          onClick={handleAddNew}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Add Article
        </button>
      </div>

      {/* Articles table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Author
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {articles.map((article) => (
              <tr key={article._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {article.title}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{article.author}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {formatLongDate(article.createdAt)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {deleteConfirmId === article._id ? (
                    <div className="flex justify-end items-center space-x-2">
                      <span className="text-xs text-gray-600">Confirm?</span>
                      <button
                        onClick={() => handleDelete(article._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(null)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button
                        onClick={() => handleEdit(article._id)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(article._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {isAddModalOpen && (
        <AddArticleModal
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={refetch}
        />
      )}

      {isEditModalOpen && editArticleId && (
        <EditArticleModal
          articleId={editArticleId}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditArticleId(null);
          }}
          onSuccess={refetch}
        />
      )}
    </div>
  );
};

export default NewsManagement;
