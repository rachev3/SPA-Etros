import React, { useState } from "react";
import { useParams, Link } from "react-router";
import { usePlayer } from "../../api/playerApi";
import LoadingSpinner from "../shared/LoadingSpinner";

const PlayerDetailsPage = () => {
  const { id } = useParams();
  const { player, loading, error } = usePlayer(id, "statsHistory");
  const [activeTab, setActiveTab] = useState("stats");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const calculateAverages = (statsHistory) => {
    if (!statsHistory || statsHistory.length === 0) return null;

    const totals = statsHistory.reduce(
      (acc, stat) => ({
        points: acc.points + (stat.points || 0),
        rebounds: acc.rebounds + (stat.totalRebounds || 0),
        assists: acc.assists + (stat.assists || 0),
        steals: acc.steals + (stat.steals || 0),
        blocks: acc.blocks + (stat.blocks || 0),
        fieldGoalsMade: acc.fieldGoalsMade + (stat.fieldGoalsMade || 0),
        fieldGoalsAttempted:
          acc.fieldGoalsAttempted + (stat.fieldGoalsAttempted || 0),
        threePointsMade: acc.threePointsMade + (stat.threePointsMade || 0),
        threePointsAttempted:
          acc.threePointsAttempted + (stat.threePointsAttempted || 0),
        freeThrowsMade: acc.freeThrowsMade + (stat.freeThrowsMade || 0),
        freeThrowsAttempted:
          acc.freeThrowsAttempted + (stat.freeThrowsAttempted || 0),
        efficiency: acc.efficiency + (stat.efficiency || 0),
      }),
      {
        points: 0,
        rebounds: 0,
        assists: 0,
        steals: 0,
        blocks: 0,
        fieldGoalsMade: 0,
        fieldGoalsAttempted: 0,
        threePointsMade: 0,
        threePointsAttempted: 0,
        freeThrowsMade: 0,
        freeThrowsAttempted: 0,
        efficiency: 0,
      }
    );

    const gamesPlayed = statsHistory.length;

    return {
      ppg: (totals.points / gamesPlayed).toFixed(1),
      rpg: (totals.rebounds / gamesPlayed).toFixed(1),
      apg: (totals.assists / gamesPlayed).toFixed(1),
      spg: (totals.steals / gamesPlayed).toFixed(1),
      bpg: (totals.blocks / gamesPlayed).toFixed(1),
      fgPercentage: (
        (totals.fieldGoalsMade / totals.fieldGoalsAttempted) * 100 || 0
      ).toFixed(1),
      threePtPercentage: (
        (totals.threePointsMade / totals.threePointsAttempted) * 100 || 0
      ).toFixed(1),
      ftPercentage: (
        (totals.freeThrowsMade / totals.freeThrowsAttempted) * 100 || 0
      ).toFixed(1),
      efficiency: (totals.efficiency / gamesPlayed).toFixed(1),
    };
  };

  if (loading) {
    return <LoadingSpinner size="large" />;
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

  if (!player) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Player Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The player you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/team"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Back to Team Page
          </Link>
        </div>
      </div>
    );
  }

  const averages = calculateAverages(player.statsHistory);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full h-96 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
        <img
          src={"/clap.jpg"}
          alt={`${player.name} action shot`}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute bottom-0 left-0 right-0 p-8 z-20 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end md:items-center">
            <div className="md:mr-8 mb-4 md:mb-0 w-28 h-28 md:w-36 md:h-36 bg-gray-800 rounded-full border-4 border-yellow-400 overflow-hidden">
              <img
                src={
                  player.imageUrl ||
                  "https://placehold.co/600x800/111/333?text=Player"
                }
                alt={player.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-baseline">
                <h1 className="text-3xl md:text-5xl font-bold text-white">
                  {player.name}
                </h1>
                <span className="ml-3 text-2xl md:text-3xl font-bold text-yellow-400">
                  #{player.number}
                </span>
              </div>
              <p className="text-xl text-gray-300 mt-1">
                {Array.isArray(player.position)
                  ? player.position.join(", ")
                  : player.position}
              </p>
              <div className="flex mt-3 space-x-4">
                {player.socialMedia &&
                  Object.entries(player.socialMedia).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <span className="sr-only">{platform}</span>
                      {platform === "twitter" && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                        </svg>
                      )}
                      {platform === "facebook" && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                        </svg>
                      )}
                      {platform === "instagram" && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      )}
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 md:pr-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="bg-black py-3 px-4">
                <h2 className="text-white font-bold text-lg">
                  Personal Information
                </h2>
                <div className="w-16 h-1 bg-yellow-400 mt-1"></div>
              </div>
              <div className="p-5">
                <table className="w-full text-left">
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 text-gray-500 font-medium">Height</th>
                      <td className="py-3 font-semibold text-gray-800">
                        {player.height ? `${player.height} cm` : "N/A"}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 text-gray-500 font-medium">Weight</th>
                      <td className="py-3 font-semibold text-gray-800">
                        {player.weight ? `${player.weight} kg` : "N/A"}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 text-gray-500 font-medium">Age</th>
                      <td className="py-3 font-semibold text-gray-800">
                        {player.bornYear
                          ? new Date().getFullYear() - player.bornYear
                          : "N/A"}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 text-gray-500 font-medium">Born</th>
                      <td className="py-3 font-semibold text-gray-800">
                        {player.bornYear || "N/A"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="md:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex">
                  <button
                    onClick={() => handleTabChange("stats")}
                    className={`px-6 py-4 text-sm font-medium transition-colors ${
                      activeTab === "stats"
                        ? "border-b-2 border-yellow-500 text-yellow-600 bg-gray-50"
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Statistics
                  </button>
                </nav>
              </div>

              <div className="p-6">
                {activeTab === "stats" && (
                  <div>
                    <div className="grid grid-cols-4 gap-4 mb-8">
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <p className="text-sm text-gray-500 mb-1">PPG</p>
                        <p className="text-2xl font-bold text-gray-800">
                          {averages?.ppg || "0.0"}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <p className="text-sm text-gray-500 mb-1">RPG</p>
                        <p className="text-2xl font-bold text-gray-800">
                          {averages?.rpg || "0.0"}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <p className="text-sm text-gray-500 mb-1">APG</p>
                        <p className="text-2xl font-bold text-gray-800">
                          {averages?.apg || "0.0"}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <p className="text-sm text-gray-500 mb-1">EFF</p>
                        <p className="text-2xl font-bold text-gray-800">
                          {averages?.efficiency || "0.0"}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mb-8">
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <p className="text-sm text-gray-500 mb-1">FG%</p>
                        <p className="text-2xl font-bold text-gray-800">
                          {averages?.fgPercentage || "0.0"}%
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <p className="text-sm text-gray-500 mb-1">3P%</p>
                        <p className="text-2xl font-bold text-gray-800">
                          {averages?.threePtPercentage || "0.0"}%
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <p className="text-sm text-gray-500 mb-1">FT%</p>
                        <p className="text-2xl font-bold text-gray-800">
                          {averages?.ftPercentage || "0.0"}%
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <p className="text-sm text-gray-500 mb-1">BPG</p>
                        <p className="text-2xl font-bold text-gray-800">
                          {averages?.bpg || "0.0"}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold text-gray-800">
                        Stats History
                      </h2>
                      <p className="text-sm text-gray-500">
                        {player.statsHistory?.length || 0} Games Played
                      </p>
                    </div>

                    {player.statsHistory && player.statsHistory.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                PTS
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                REB
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                AST
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                STL
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                BLK
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                FG
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                3PT
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                FT
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                +/-
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                EFF
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {player.statsHistory.map((stat, index) => (
                              <tr
                                key={stat._id || index}
                                className="hover:bg-gray-50"
                              >
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {new Date(
                                    stat.createdAt
                                  ).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {stat.points || 0}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {stat.totalRebounds || 0}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {stat.assists || 0}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {stat.steals || 0}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {stat.blocks || 0}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {stat.fieldGoalsMade || 0}/
                                  {stat.fieldGoalsAttempted || 0}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {stat.threePointsMade || 0}/
                                  {stat.threePointsAttempted || 0}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {stat.freeThrowsMade || 0}/
                                  {stat.freeThrowsAttempted || 0}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {stat.plusMinus || 0}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {stat.efficiency || 0}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">
                          No stats available for this player yet.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerDetailsPage;
