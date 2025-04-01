import React from "react";
import { useCreateComment, useUpdateComment } from "../../../api/commentApi";
import { useActionState } from "react";

const CommentForm = ({
  articleId,
  onCommentAdded,
  commentContent,
  commentId,
  isEditing = false,
  onCancel,
}) => {
  const { create } = useCreateComment();
  const { update } = useUpdateComment();
  const [error, submitAction, isPending] = useActionState(
    async (_, formData) => {
      try {
        const comment = {
          content: formData.get("comment"),
          articleId: articleId,
        };
        if (isEditing) {
          await update(commentId, comment);
        } else {
          await create(comment);
        }

        onCommentAdded();
        formData.target?.reset();
        if (onCancel) onCancel();
        return null;
      } catch (err) {
        return err.message || "Failed to post comment. Please try again.";
      }
    }
  );

  return (
    <form
      action={submitAction}
      className="mt-8 space-y-4 border-t border-gray-200 pt-8"
    >
      <h4 className="text-xl font-semibold mb-4">
        {isEditing ? "Edit Comment" : "Add a Comment"}
      </h4>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg">
          {error}
        </div>
      )}
      <div>
        <label
          htmlFor="comment"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Your Comment
        </label>
        <textarea
          id="comment"
          name="comment"
          required
          rows={4}
          defaultValue={commentContent}
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          placeholder="Share your thoughts..."
        />
      </div>
      <div className="flex space-x-3">
        <button
          type="submit"
          disabled={isPending}
          className={`px-4 py-2 bg-yellow-500 text-black rounded-lg text-sm ${
            isPending ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-600"
          } transition-colors`}
        >
          {isPending
            ? "Posting..."
            : isEditing
            ? "Save Changes"
            : "Post Comment"}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default CommentForm;
