import React from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const CommentsSection = ({
  articleId,
  comments,
  loading,
  error,
  refetchComments,
  currentUser,
}) => {
  const commentsList = Array.isArray(comments) ? comments : [];
  const isLoggedIn = !!currentUser;

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold mb-6">
        Comments {commentsList.length > 0 && `(${commentsList.length})`}
      </h3>

      <div className="mb-8">
        {loading ? (
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="border-b border-gray-200 py-4">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-red-600 text-center py-6">
            Error loading comments: {error}
          </div>
        ) : commentsList.length === 0 ? (
          <p className="text-gray-600 text-center py-6">
            Be the first to comment on this article!
          </p>
        ) : (
          <div className="space-y-2">
            {commentsList.map((comment) => (
              <Comment
                key={comment._id}
                comment={comment}
                currentUser={currentUser}
                onDelete={refetchComments}
                onEdit={refetchComments}
              />
            ))}
          </div>
        )}
      </div>

      {isLoggedIn ? (
        <CommentForm articleId={articleId} onCommentAdded={refetchComments} />
      ) : (
        <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
          <p className="text-gray-700 mb-2">Want to join the conversation?</p>
          <p className="text-gray-600">
            <a href="/login" className="text-yellow-600 hover:underline">
              Sign in
            </a>{" "}
            to post a comment.
          </p>
        </div>
      )}
    </div>
  );
};

export default CommentsSection;
