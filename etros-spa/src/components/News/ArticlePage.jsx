import React from "react";
import { useParams, Link } from "react-router";
import { useArticle } from "../../api/articleApi";
import { formatLongDate, formatTime } from "../../utils/dateUtils";

const ArticlePage = () => {
  const { id } = useParams();
  const { article, loading, error } = useArticle(id);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-10 w-64 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 w-40 bg-gray-300 rounded"></div>
        </div>
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

  // If no article is found
  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Article Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The article you're looking for doesn't exist.
          </p>
          <Link
            to="/news"
            className="bg-yellow-500 text-black px-6 py-2 rounded-lg hover:bg-yellow-400 transition-colors"
          >
            Back to News
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero image and title section */}
      <div className="relative">
        <div className="w-full h-[50vh] relative overflow-hidden">
          <img
            src={article.images?.[0] || "/placeholder-image.jpg"}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="mb-4 flex items-center">
              <span className="text-gray-300 text-sm">
                {formatLongDate(article.createdAt)}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
              {article.title}
            </h1>
            {article.metaDescription && (
              <p className="text-xl text-gray-200 mb-4">
                {article.metaDescription}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Article content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between mb-8">
          {/* Author info */}
          <div className="flex items-center mb-4 md:mb-0">
            <div>
              <p className="font-bold text-gray-900">By {article.author}</p>
              <p className="text-sm text-gray-600">
                {formatLongDate(article.createdAt)} at{" "}
                {formatTime(article.createdAt)}
              </p>
            </div>
          </div>

          {/* Meta Keywords */}
          {article.metaKeywords && article.metaKeywords.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {article.metaKeywords.map((keyword, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-800 text-xs px-3 py-1 rounded-full"
                >
                  #{keyword}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Main article content */}
        <div
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Image gallery */}
        {article.images && article.images.length > 1 && (
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Image Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {article.images.map((image, index) => (
                <div key={index} className="aspect-w-16 aspect-h-9">
                  <img
                    src={image}
                    alt={`${article.title} - Image ${index + 1}`}
                    className="object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlePage;
