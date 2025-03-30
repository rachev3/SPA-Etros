import React from "react";

const PlayerStatsListItem = ({ stat, player, onEditStat, onDeleteStat }) => {
  const [deleteConfirmId, setDeleteConfirmId] = React.useState(null);

  return (
    <tr key={stat._id} className="hover:bg-gray-50">
      <td className="px-4 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {player?.name} (#{player?.number})
        </div>
        <div className="text-sm text-gray-500">{player?.position}</div>
      </td>
      <td className="px-4 py-4 whitespace-nowrap">
        <div className="text-sm font-medium">{stat.totalPoints}</div>
        <div className="text-xs text-gray-500">
          Efficiency: {stat.efficiency}
        </div>
      </td>
      <td className="px-4 py-4 whitespace-nowrap">
        <div className="text-sm">
          {stat.fieldGoalsMade}/{stat.fieldGoalsAttempted}
        </div>
        <div className="text-xs text-gray-500">
          3PT: {stat.threePointsMade}/{stat.threePointsAttempted}
        </div>
      </td>
      <td className="px-4 py-4 whitespace-nowrap">
        <div className="text-sm">
          OFF: {stat.offensiveRebounds} DEF: {stat.defensiveRebounds}
        </div>
        <div className="text-xs text-gray-500">
          Total: {stat.offensiveRebounds + stat.defensiveRebounds}
        </div>
      </td>
      <td className="px-4 py-4 whitespace-nowrap">
        <div className="text-sm">
          AST: {stat.totalAssists} STL: {stat.totalSteals}
        </div>
        <div className="text-xs text-gray-500">
          BLK: {stat.totalBlocks} TO: {stat.totalTurnovers}
        </div>
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button
          onClick={() => onEditStat(stat)}
          className="text-blue-600 hover:text-blue-900 mr-3"
        >
          Edit
        </button>
        {deleteConfirmId === stat._id ? (
          <>
            <button
              onClick={() => {
                onDeleteStat(stat._id);
                setDeleteConfirmId(null);
              }}
              className="text-red-600 hover:text-red-900 mr-1"
            >
              Confirm
            </button>
            <button
              onClick={() => setDeleteConfirmId(null)}
              className="text-gray-600 hover:text-gray-900"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setDeleteConfirmId(stat._id)}
            className="text-red-600 hover:text-red-900"
          >
            Delete
          </button>
        )}
      </td>
    </tr>
  );
};

export default PlayerStatsListItem;
