import React from "react";
import { useParams, Link } from "react-router";
import { useArticle } from "../../../api/articleApi";
import { useArticleComments } from "../../../api/commentApi";
import { useAuth } from "../../../hooks/useAuth";
import ArticleHero from "./ArticleHero";
import ArticleDetails from "./ArticleDetails";
import ArticleBody from "./ArticleBody";
import CommentsSection from "./CommentSection";
import LoadingSpinner from "../../shared/LoadingSpinner";

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

  if (articleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (articleError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Article
          </h2>
          <p className="text-gray-600 mb-6">{articleError}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-yellow-500 text-black px-6 py-2 rounded-lg hover:bg-yellow-400 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Article Not Found
          </h2>
          <p className="text-gray-600 mb-6">
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
    <div className="min-h-screen bg-white">
      <ArticleHero article={article} />
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
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
