import React, { useState } from "react";

const NewsManagement = () => {
  // Sample articles data
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: "Team Secures Victory in Season Opener",
      excerpt:
        "Etros FC started the season with an impressive 3-1 win against their rivals.",
      author: "John Davis",
      category: "Match Report",
      status: "Published",
      publishDate: "2023-09-15",
    },
    {
      id: 2,
      title: "New Player Signing Announcement",
      excerpt:
        "Etros FC is excited to announce the arrival of star midfielder Kevin Johnson.",
      author: "Sarah Miller",
      category: "Club News",
      status: "Published",
      publishDate: "2023-09-10",
    },
    {
      id: 3,
      title: "Upcoming Training Camp Details",
      excerpt: "Details about the pre-season training camp have been released.",
      author: "Mike Thompson",
      category: "Event",
      status: "Draft",
      publishDate: null,
    },
    {
      id: 4,
      title: "Interview with Coach Williams",
      excerpt:
        "Coach Williams discusses strategy and expectations for the new season.",
      author: "Sarah Miller",
      category: "Interview",
      status: "Published",
      publishDate: "2023-09-05",
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
      article.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNew = () => {
    setCurrentArticle({
      id: articles.length + 1,
      title: "",
      excerpt: "",
      author: "",
      category: "Club News",
      status: "Draft",
      publishDate: null,
    });
    setIsAddModalOpen(true);
  };

  const handleEdit = (article) => {
    setCurrentArticle({ ...article });
    setIsEditModalOpen(true);
  };

  const handleDelete = (id) => {
    setArticles(articles.filter((article) => article.id !== id));
    setDeleteConfirmId(null);
  };

  const handleSave = (article, isNew = false) => {
    if (isNew) {
      setArticles([...articles, article]);
      setIsAddModalOpen(false);
    } else {
      setArticles(articles.map((a) => (a.id === article.id ? article : a)));
      setIsEditModalOpen(false);
    }
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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
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
          <div className="flex items-center space-x-2">
            <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 focus:border-transparent">
              <option value="">All Categories</option>
              <option value="match-report">Match Report</option>
              <option value="club-news">Club News</option>
              <option value="interview">Interview</option>
              <option value="event">Event</option>
            </select>
            <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 focus:border-transparent">
              <option value="">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </div>

      {/* Articles table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Title
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Author
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {article.title}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 line-clamp-1">
                      {article.excerpt}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {article.author}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {article.category}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        article.status === "Published"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {article.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {article.publishDate || "Not published"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {deleteConfirmId === article.id ? (
                      <div className="flex justify-end items-center space-x-2">
                        <span className="text-xs text-gray-600">Confirm?</span>
                        <button
                          onClick={() => handleDelete(article.id)}
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
                          onClick={() => setDeleteConfirmId(article.id)}
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
                  colSpan="6"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No articles found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">{filteredArticles.length}</span>{" "}
          of <span className="font-medium">{articles.length}</span> articles
        </div>
        <div className="flex space-x-2">
          <button
            disabled
            className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50"
          >
            Previous
          </button>
          <button
            disabled
            className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Add Article Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-lg font-medium">Add New Article</h3>
              <button onClick={() => setIsAddModalOpen(false)}>
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
                    Title
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
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Excerpt
                  </label>
                  <textarea
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    rows="3"
                    value={currentArticle?.excerpt || ""}
                    onChange={(e) =>
                      setCurrentArticle({
                        ...currentArticle,
                        excerpt: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Author
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      value={currentArticle?.author || ""}
                      onChange={(e) =>
                        setCurrentArticle({
                          ...currentArticle,
                          author: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      value={currentArticle?.category || "Club News"}
                      onChange={(e) =>
                        setCurrentArticle({
                          ...currentArticle,
                          category: e.target.value,
                        })
                      }
                    >
                      <option value="Match Report">Match Report</option>
                      <option value="Club News">Club News</option>
                      <option value="Interview">Interview</option>
                      <option value="Event">Event</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      value={currentArticle?.status || "Draft"}
                      onChange={(e) =>
                        setCurrentArticle({
                          ...currentArticle,
                          status: e.target.value,
                        })
                      }
                    >
                      <option value="Published">Published</option>
                      <option value="Draft">Draft</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Publish Date
                    </label>
                    <input
                      type="date"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      disabled={currentArticle?.status !== "Published"}
                      value={currentArticle?.publishDate || ""}
                      onChange={(e) =>
                        setCurrentArticle({
                          ...currentArticle,
                          publishDate: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content
                  </label>
                  <textarea
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    rows="10"
                  ></textarea>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSave(currentArticle, true)}
                    className="px-4 py-2 bg-yellow-500 text-black rounded-lg text-sm"
                  >
                    Save Article
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Article Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-lg font-medium">Edit Article</h3>
              <button onClick={() => setIsEditModalOpen(false)}>
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
                    Title
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
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Excerpt
                  </label>
                  <textarea
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    rows="3"
                    value={currentArticle?.excerpt || ""}
                    onChange={(e) =>
                      setCurrentArticle({
                        ...currentArticle,
                        excerpt: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Author
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      value={currentArticle?.author || ""}
                      onChange={(e) =>
                        setCurrentArticle({
                          ...currentArticle,
                          author: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      value={currentArticle?.category || ""}
                      onChange={(e) =>
                        setCurrentArticle({
                          ...currentArticle,
                          category: e.target.value,
                        })
                      }
                    >
                      <option value="Match Report">Match Report</option>
                      <option value="Club News">Club News</option>
                      <option value="Interview">Interview</option>
                      <option value="Event">Event</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      value={currentArticle?.status || ""}
                      onChange={(e) => {
                        const newStatus = e.target.value;
                        const newPublishDate =
                          newStatus === "Published" &&
                          !currentArticle.publishDate
                            ? new Date().toISOString().split("T")[0]
                            : currentArticle.publishDate;
                        setCurrentArticle({
                          ...currentArticle,
                          status: newStatus,
                          publishDate: newPublishDate,
                        });
                      }}
                    >
                      <option value="Published">Published</option>
                      <option value="Draft">Draft</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Publish Date
                    </label>
                    <input
                      type="date"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      disabled={currentArticle?.status !== "Published"}
                      value={currentArticle?.publishDate || ""}
                      onChange={(e) =>
                        setCurrentArticle({
                          ...currentArticle,
                          publishDate: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content
                  </label>
                  <textarea
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    rows="10"
                  ></textarea>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSave(currentArticle)}
                    className="px-4 py-2 bg-yellow-500 text-black rounded-lg text-sm"
                  >
                    Update Article
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
