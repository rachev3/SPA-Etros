import React, { useState } from "react";

const NewsManagement = () => {
  // Sample articles data matching the schema
  const [articles, setArticles] = useState([
    {
      _id: "1",
      title: "Team Secures Victory in Season Opener",
      content: "Full article content here...",
      author: "Admin",
      metaTitle: "Etros FC Season Opener Victory",
      metaDescription:
        "Etros FC started the season with an impressive 3-1 win against their rivals.",
      metaKeywords: ["football", "match", "victory", "season opener"],
      images: ["/images/match1.jpg", "/images/match2.jpg"],
      createdAt: "2023-09-15T10:00:00.000Z",
      updatedAt: "2023-09-15T10:00:00.000Z",
    },
    {
      _id: "2",
      title: "New Player Signing Announcement",
      content: "Full article content here...",
      author: "Admin",
      metaTitle: "Etros FC New Player Signing",
      metaDescription:
        "Etros FC is excited to announce the arrival of star midfielder Kevin Johnson.",
      metaKeywords: ["signing", "player", "transfer", "midfielder"],
      images: ["/images/player1.jpg"],
      createdAt: "2023-09-10T15:30:00.000Z",
      updatedAt: "2023-09-10T15:30:00.000Z",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.metaTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNew = () => {
    setCurrentArticle({
      title: "",
      content: "",
      author: "Admin",
      metaTitle: "",
      metaDescription: "",
      metaKeywords: [],
      images: [],
    });
    setIsAddModalOpen(true);
  };

  const handleEdit = (article) => {
    setCurrentArticle({ ...article });
    setIsEditModalOpen(true);
  };

  const handleDelete = (id) => {
    setArticles(articles.filter((article) => article._id !== id));
    setDeleteConfirmId(null);
  };

  const handleSave = (article, isNew = false) => {
    if (isNew) {
      const newArticle = {
        ...article,
        _id: Date.now().toString(), // Temporary ID generation
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setArticles([...articles, newArticle]);
      setIsAddModalOpen(false);
    } else {
      const updatedArticle = {
        ...article,
        updatedAt: new Date().toISOString(),
      };
      setArticles(
        articles.map((a) => (a._id === article._id ? updatedArticle : a))
      );
      setIsEditModalOpen(false);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setCurrentArticle({
      ...currentArticle,
      images: [...currentArticle.images, ...imageUrls],
    });
  };

  const handleRemoveImage = (index) => {
    setCurrentArticle({
      ...currentArticle,
      images: currentArticle.images.filter((_, i) => i !== index),
    });
  };

  const handleKeywordsChange = (e) => {
    const keywords = e.target.value.split(",").map((k) => k.trim());
    setCurrentArticle({
      ...currentArticle,
      metaKeywords: keywords,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">News Management</h1>
        <button
          onClick={handleAddNew}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Add Article
        </button>
      </div>

      {/* Search and filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
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
                Meta Title
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
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <tr key={article._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {article.title}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 line-clamp-1">
                      {article.metaDescription}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {article.author}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {article.metaTitle}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(article.createdAt).toLocaleDateString()}
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
                          onClick={() => handleEdit(article)}
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
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No articles found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Article Form Modal */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-lg font-medium">
                {isAddModalOpen ? "Add New Article" : "Edit Article"}
              </h3>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setIsEditModalOpen(false);
                }}
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
            <div className="p-4">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    value={currentArticle?.title || ""}
                    onChange={(e) =>
                      setCurrentArticle({
                        ...currentArticle,
                        title: e.target.value,
                      })
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
                    value={currentArticle?.content || ""}
                    onChange={(e) =>
                      setCurrentArticle({
                        ...currentArticle,
                        content: e.target.value,
                      })
                    }
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    value={currentArticle?.metaTitle || ""}
                    onChange={(e) =>
                      setCurrentArticle({
                        ...currentArticle,
                        metaTitle: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Meta Description
                  </label>
                  <textarea
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    rows="3"
                    value={currentArticle?.metaDescription || ""}
                    onChange={(e) =>
                      setCurrentArticle({
                        ...currentArticle,
                        metaDescription: e.target.value,
                      })
                    }
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Meta Keywords (comma-separated)
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    value={currentArticle?.metaKeywords?.join(", ") || ""}
                    onChange={handleKeywordsChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Images
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    onChange={handleImageUpload}
                  />
                  {currentArticle?.images?.length > 0 && (
                    <div className="mt-2 grid grid-cols-4 gap-2">
                      {currentArticle.images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image}
                            alt={`Article image ${index + 1}`}
                            className="w-full h-24 object-cover rounded"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddModalOpen(false);
                      setIsEditModalOpen(false);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSave(currentArticle, isAddModalOpen)}
                    className="px-4 py-2 bg-yellow-500 text-black rounded-lg text-sm"
                  >
                    {isAddModalOpen ? "Save Article" : "Update Article"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsManagement;
