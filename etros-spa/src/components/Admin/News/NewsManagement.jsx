import React, { useState } from "react";
import { useArticles, useDeleteArticle } from "../../../api/articleApi";
import AddArticleModal from "./AddArticleModal";
import EditArticleModal from "./EditArticleModal";
import NewsListItem from "./NewsListItem";
import LoadingSpinner from "../../shared/LoadingSpinner";

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
    return <LoadingSpinner size="large" />;
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
              <NewsListItem
                key={article._id}
                article={article}
                onEdit={handleEdit}
                onDelete={handleDelete}
                deleteConfirmId={deleteConfirmId}
                setDeleteConfirmId={setDeleteConfirmId}
              />
            ))}
          </tbody>
        </table>
      </div>

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
