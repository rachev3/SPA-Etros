import React from "react";

const MatchListItem = ({
  match,
  onEdit,
  onDelete,
  deleteConfirmId,
  setDeleteConfirmId,
}) => {
  return (
    <tr key={match._id} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          {new Date(match.date).toLocaleDateString()}
        </div>
        <div className="text-sm text-gray-500">
          {new Date(match.date).toLocaleTimeString()}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {match.opponent}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{match.location}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
          ${
            match.status === "finished"
              ? "bg-green-100 text-green-800"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {match.status === "finished" ? (
          <div>
            <div className="text-sm font-medium text-gray-900">
              {match.ourScore} - {match.opponentScore}
            </div>
            <div
              className={`text-sm ${
                match.result === "Win"
                  ? "text-green-600"
                  : match.result === "Loss"
                  ? "text-red-600"
                  : "text-gray-500"
              }`}
            >
              {match.result}
            </div>
          </div>
        ) : (
          <span className="text-sm text-gray-500">-</span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        {deleteConfirmId === match._id ? (
          <div className="flex justify-end items-center space-x-2">
            <span className="text-xs text-gray-600">Confirm?</span>
            <button
              onClick={() => onDelete(match._id)}
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
              onClick={() => onEdit(match)}
              className="text-blue-600 hover:text-blue-900 mr-3"
            >
              Edit
            </button>
            <button
              onClick={() => setDeleteConfirmId(match._id)}
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

export default MatchListItem;
