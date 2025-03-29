import React from "react";
import { Link } from "react-router";

const PlayerListItem = ({
  player,
  onEdit,
  onDelete,
  deleteConfirmId,
  setDeleteConfirmId,
}) => {
  return (
    <tr key={player._id} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center">
            {player.imageUrl ? (
              <img
                src={player.imageUrl}
                alt={player.name}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <span className="text-gray-600 font-medium">
                {player.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            )}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {player.name}
            </div>
            <div className="text-xs text-gray-500">#{player.number}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          {player.position?.join(", ")}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{player.bornYear}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        {deleteConfirmId === player._id ? (
          <div className="flex justify-end items-center space-x-2">
            <span className="text-xs text-gray-600">Confirm?</span>
            <button
              onClick={() => onDelete(player._id)}
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
            <Link
              to={`/admin/players/${player._id}/stats`}
              className="text-green-600 hover:text-green-900 mr-3"
            >
              Stats
            </Link>
            <button
              onClick={() => onEdit(player)}
              className="text-blue-600 hover:text-blue-900 mr-3"
            >
              Edit
            </button>
            <button
              onClick={() => setDeleteConfirmId(player._id)}
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

export default PlayerListItem;
