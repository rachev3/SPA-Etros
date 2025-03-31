import React from "react";
import { Link } from "react-router";
import { useArticles } from "../../api/articleApi";
import { formatLongDate } from "../../utils/dateUtils";

const LatestNews = () => {
  const { articles, loading, error } = useArticles(1, 3);

  const renderNewsCards = () => {
    if (loading) {
      return [...Array(3)].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
        >
          <div className="w-full h-48 bg-gray-200" />
          <div className="p-6 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-6 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      ));
    }

    if (error) {
      return (
        <div className="col-span-3 text-center py-8">
          <p className="text-red-600">Failed to load latest news</p>
        </div>
      );
    }

    return articles.map((article, index) => (
      <div
        key={article._id || `article-${index}`}
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-transform duration-300 hover:-translate-y-1"
      >
        <Link to={`/news/article/${article._id}`} className="block">
          <img
            src={
              article.images?.[0] ||
              "https://placehold.co/600x400/111/333?text=News"
            }
            alt={article.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <p className="text-gray-500 text-sm mb-2">
              {formatLongDate(article.createdAt)}
            </p>
            <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
            <p className="text-gray-700 mb-4 line-clamp-3">{article.content}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">By {article.author}</span>
              <span className="text-yellow-500 font-semibold hover:text-yellow-400 inline-flex items-center transition-colors duration-200">
                Read More
                <svg
                  className="h-4 w-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </span>
            </div>
          </div>
        </Link>
      </div>
    ));
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-2 text-center">
          Latest Team News
        </h2>
        <div className="w-20 h-1 bg-yellow-400 mx-auto mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {renderNewsCards()}
        </div>
        <div className="text-center mt-8">
          <Link
            to="/news"
            className="inline-block bg-black hover:bg-gray-900 text-white font-bold py-3 px-8 rounded transition-colors duration-200 shadow-md"
          >
            View All News
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
