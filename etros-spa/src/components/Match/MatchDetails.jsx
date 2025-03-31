import React from "react";
import { useMatch } from "../../api/matchApi";
import { useParams } from "react-router";

const MatchDetails = () => {
  const { id } = useParams();
  const { match, loading, error } = useMatch(id, "playerStats.player");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600 mb-4">
            Match Not Found
          </h2>
        </div>
      </div>
    );
  }

  const calculatePercentage = (made, attempted) => {
    if (!attempted || attempted === 0) return "0.0";
    return ((made / attempted) * 100).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Match Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Match Status Banner */}
          <div
            className={`px-6 py-2 ${
              match.status === "upcoming" ? "bg-yellow-500" : "bg-green-500"
            }`}
          >
            <span className="text-black font-semibold uppercase text-sm">
              {match.status === "upcoming" ? "Upcoming Match" : "Final Score"}
            </span>
          </div>

          {/* Match Basic Info */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  ETROS vs {match.opponent}
                </h1>
                <p className="text-gray-600 mt-1">
                  {new Date(match.date).toLocaleDateString()} • {match.location}
                </p>
              </div>
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <span className="block text-4xl font-bold text-gray-900">
                    {match.ourScore || "-"}
                  </span>
                  <span className="text-sm text-gray-600">ETROS</span>
                </div>
                <span className="text-gray-400 text-2xl">-</span>
                <div className="text-center">
                  <span className="block text-4xl font-bold text-gray-900">
                    {match.opponentScore || "-"}
                  </span>
                  <span className="text-sm text-gray-600">
                    {match.opponent}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Statistics */}
        <div className="mt-8 bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-black">
            <h2 className="text-xl font-bold text-yellow-500">
              Team Statistics
            </h2>
          </div>

          <div className="p-6">
            {/* Shooting Stats */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Shooting
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">
                    Field Goals
                  </h4>
                  <p className="text-2xl font-bold text-gray-900">
                    {match.teamStats.fieldGoalsMade}/
                    {match.teamStats.fieldGoalsAttempted}
                  </p>
                  <p className="text-sm text-gray-600">
                    {calculatePercentage(
                      match.teamStats.fieldGoalsMade,
                      match.teamStats.fieldGoalsAttempted
                    )}
                    %
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">
                    2-Point
                  </h4>
                  <p className="text-2xl font-bold text-gray-900">
                    {match.teamStats.twoPointsMade}/
                    {match.teamStats.twoPointsAttempted}
                  </p>
                  <p className="text-sm text-gray-600">
                    {calculatePercentage(
                      match.teamStats.twoPointsMade,
                      match.teamStats.twoPointsAttempted
                    )}
                    %
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">
                    3-Point
                  </h4>
                  <p className="text-2xl font-bold text-gray-900">
                    {match.teamStats.threePointsMade}/
                    {match.teamStats.threePointsAttempted}
                  </p>
                  <p className="text-sm text-gray-600">
                    {calculatePercentage(
                      match.teamStats.threePointsMade,
                      match.teamStats.threePointsAttempted
                    )}
                    %
                  </p>
                </div>
              </div>
            </div>

            {/* Other Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-600 mb-1">
                  Free Throws
                </h4>
                <p className="text-xl font-bold text-gray-900">
                  {match.teamStats.freeThrowsMade}/
                  {match.teamStats.freeThrowsAttempted}
                </p>
                <p className="text-sm text-gray-600">
                  {calculatePercentage(
                    match.teamStats.freeThrowsMade,
                    match.teamStats.freeThrowsAttempted
                  )}
                  %
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-600 mb-1">
                  Total Rebounds
                </h4>
                <p className="text-xl font-bold text-gray-900">
                  {match.teamStats.totalRebounds}
                </p>
                <p className="text-sm text-gray-600">
                  Off: {match.teamStats.offensiveRebounds} • Def:{" "}
                  {match.teamStats.defensiveRebounds}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-600 mb-1">
                  Assists
                </h4>
                <p className="text-xl font-bold text-gray-900">
                  {match.teamStats.assists}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-600 mb-1">
                  Steals
                </h4>
                <p className="text-xl font-bold text-gray-900">
                  {match.teamStats.steals}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-600 mb-1">
                  Blocks
                </h4>
                <p className="text-xl font-bold text-gray-900">
                  {match.teamStats.blocks}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-600 mb-1">
                  Turnovers
                </h4>
                <p className="text-xl font-bold text-gray-900">
                  {match.teamStats.turnovers}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-600 mb-1">
                  Fouls
                </h4>
                <p className="text-xl font-bold text-gray-900">
                  {match.teamStats.fouls}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-600 mb-1">
                  Total Points
                </h4>
                <p className="text-xl font-bold text-gray-900">
                  {match.teamStats.points}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Player Stats Section */}
        <div className="mt-8 bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-black">
            <h2 className="text-xl font-bold text-yellow-500">
              Player Statistics
            </h2>
          </div>
          <div className="p-6 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Player
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Points
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    FG
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    2PT
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    3PT
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    FT
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    REB
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    AST
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    STL
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    BLK
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    TO
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    PF
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    +/-
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    EFF
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {match.playerStats.map((stat) => (
                  <tr key={stat._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {stat.player.name} #{stat.player.number}
                      </div>
                      <div className="text-xs text-gray-500">
                        {stat.player.position?.join(", ")}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{stat.points}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {stat.fieldGoalsMade}/{stat.fieldGoalsAttempted}
                      </div>
                      <div className="text-xs text-gray-500">
                        {calculatePercentage(
                          stat.fieldGoalsMade,
                          stat.fieldGoalsAttempted
                        )}
                        %
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {stat.twoPointsMade}/{stat.twoPointsAttempted}
                      </div>
                      <div className="text-xs text-gray-500">
                        {calculatePercentage(
                          stat.twoPointsMade,
                          stat.twoPointsAttempted
                        )}
                        %
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {stat.threePointsMade}/{stat.threePointsAttempted}
                      </div>
                      <div className="text-xs text-gray-500">
                        {calculatePercentage(
                          stat.threePointsMade,
                          stat.threePointsAttempted
                        )}
                        %
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {stat.freeThrowsMade}/{stat.freeThrowsAttempted}
                      </div>
                      <div className="text-xs text-gray-500">
                        {calculatePercentage(
                          stat.freeThrowsMade,
                          stat.freeThrowsAttempted
                        )}
                        %
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {stat.totalRebounds}
                      </div>
                      <div className="text-xs text-gray-500">
                        {stat.offensiveRebounds}/{stat.defensiveRebounds}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {stat.assists}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{stat.steals}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{stat.blocks}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {stat.turnovers}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{stat.fouls}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className={`text-sm font-medium ${
                          stat.plusMinus >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {stat.plusMinus > 0 ? "+" : ""}
                        {stat.plusMinus}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {stat.efficiency}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;
