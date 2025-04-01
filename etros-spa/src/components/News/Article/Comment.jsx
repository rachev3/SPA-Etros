import React, { useState } from "react";
import { useDeleteComment } from "../../../api/commentApi";
import { formatLongDate } from "../../../utils/dateUtils";
import CommentForm from "./CommentForm";

const Comment = ({ comment, onDelete, onEdit, currentUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { deleteComment } = useDeleteComment();
  const isOwner = currentUser._id && comment.author._id === currentUser._id;

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        await deleteComment(comment._id);
        onDelete();
      } catch (error) {
        console.error("Failed to delete comment:", error);
      }
    }
  };

  if (!comment) return null;

  if (isEditing) {
    return (
      <div className="py-4">
        <CommentForm
          articleId={comment.articleId}
          commentContent={comment.content}
          commentId={comment._id}
          isEditing={true}
          onCommentAdded={() => {
            onEdit();
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className="border-b border-gray-200 py-4 last:border-0">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <span className="font-medium text-gray-900">
            {comment.author?.username || "Anonymous"}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            {formatLongDate(comment.createdAt)}
          </span>
          {isOwner && (
            <div className="flex items-center space-x-2 ml-4">
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-600 hover:text-yellow-600 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              <button
                onClick={handleDelete}
                className="text-gray-600 hover:text-red-600 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
      <p className="text-gray-700 whitespace-pre-wrap">{comment.content}</p>
    </div>
  );
};

export default Comment;
