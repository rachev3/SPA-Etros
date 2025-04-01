import React, { useState } from "react";
import { Link } from "react-router";
import { useArticles } from "../../api/articleApi";
import { formatLongDate } from "../../utils/dateUtils";

const ArticleGridSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;

  const { articles, loading, error, pagination } = useArticles(
    currentPage,
    articlesPerPage
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <section className="py-16 flex justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400"></div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-gray-600">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-yellow-500 text-black px-6 py-2 rounded-lg hover:bg-yellow-400 transition-colors"
        >
          Try Again
        </button>
      </section>
    );
  }

  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <div
              key={article._id || `article-${index}`}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <Link to={`/news/article/${article._id}`} className="block">
                <img
                  src={article.images?.[0] || "/placeholder-image.jpg"}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <span className="text-gray-500 text-sm">
                    {formatLongDate(article.createdAt)}
                  </span>
                  <h3 className="text-xl font-semibold mb-2 hover:text-yellow-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {article.content}
                  </p>
                  <span className="text-sm text-gray-600">
                    By {article.author}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {pagination.totalPages > 1 && (
          <div className="mt-8 flex justify-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-yellow-500 text-black hover:bg-yellow-600"
              }`}
            >
              Previous
            </button>

            <div className="flex space-x-1">
              {[...Array(pagination.totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === index + 1
                      ? "bg-yellow-500 text-black"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === pagination.totalPages}
              className={`px-4 py-2 rounded-lg ${
                currentPage === pagination.totalPages
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-yellow-500 text-black hover:bg-yellow-600"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ArticleGridSection;
