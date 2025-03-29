import React from "react";
import { formatLongDate } from "../../../utils/dateUtils";

const NewsListItem = ({
  article,
  onEdit,
  onDelete,
  deleteConfirmId,
  setDeleteConfirmId,
}) => {
  return (
    <tr key={article._id} className="hover:bg-gray-50">
      <td className="px-6 py-4">
        <div className="text-sm font-medium text-gray-900">{article.title}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{article.author}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          {formatLongDate(article.createdAt)}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        {deleteConfirmId === article._id ? (
          <div className="flex justify-end items-center space-x-2">
            <span className="text-xs text-gray-600">Confirm?</span>
            <button
              onClick={() => onDelete(article._id)}
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
              onClick={() => onEdit(article._id)}
              className="text-blue-600 hover:text-blue-900 mr-3"
            >
              Edit
            </button>
            <button
              onClick={() => setDeleteConfirmId(article._id)}
              className="text-red-600 hover:text-red-900"
            >
              Delete
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default NewsListItem;
