import React from "react";
import { Link } from "react-router";
import { useArticles } from "../../api/articleApi";
import { formatLongDate } from "../../utils/dateUtils";

const NewsPage = () => {
  const { articles, loading, error } = useArticles();

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-yellow-500 text-black px-6 py-2 rounded-lg hover:bg-yellow-400 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero section */}
      <section className="bg-black py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            <span className="text-yellow-400">Latest</span> News
          </h1>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mb-8"></div>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg">
            Stay up to date with the latest news, announcements, and stories
            from Etros Basketball.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
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
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-500 text-sm">
                        {formatLongDate(article.createdAt)}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 hover:text-yellow-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-700 mb-4 line-clamp-3">
                      {article.content}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        By {article.author}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsPage;
