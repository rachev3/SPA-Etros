import React from "react";
import { useParams, Link } from "react-router";
import { useArticle } from "../../../api/articleApi";
import { useArticleComments } from "../../../api/commentApi";
import { useAuth } from "../../../hooks/useAuth";
import ArticleHero from "./ArticleHero";
import ArticleDetails from "./ArticleDetails";
import ArticleBody from "./ArticleBody";
import CommentsSection from "./CommentSection";

const ArticlePage = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const {
    article,
    loading: articleLoading,
    error: articleError,
  } = useArticle(id);
  const {
    comments,
    loading: commentsLoading,
    error: commentsError,
    refetch: refetchComments,
  } = useArticleComments(id);

  // Loading state
  if (articleLoading) {
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
  if (articleError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600">{articleError}</p>
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

  // Article not found
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
      <ArticleHero article={article} />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <ArticleDetails article={article} />
        <ArticleBody article={article} />
        <CommentsSection
          articleId={id}
          comments={comments}
          loading={commentsLoading}
          error={commentsError}
          refetchComments={refetchComments}
          currentUser={user}
        />
      </div>
    </div>
  );
};

export default ArticlePage;
