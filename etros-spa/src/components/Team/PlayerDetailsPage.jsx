import React, { useState } from "react";
import { useParams, Link } from "react-router";
import { usePlayer } from "../../api/playerApi";

const PlayerDetailsPage = () => {
  const { id } = useParams();
  const { player, loading, error } = usePlayer(id);
  const [activeTab, setActiveTab] = useState("stats");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  // Error state
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

  // No player found state
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

  // Mock data for stats and other player details that might not be provided by the API
  const playerData = {
    ...player,
    age: new Date().getFullYear() - player.bornYear,
    birthDate: `${player.bornYear}`,
    birthplace: player.birthplace || "Information not available",
    college: player.college || "Information not available",
    yearsWithTeam: player.yearsWithTeam || "N/A",
    position: Array.isArray(player.position)
      ? player.position.join(", ")
      : player.position,
    image:
      player.imageUrl || "https://placehold.co/600x800/111/333?text=Player",
    coverImage:
      player.coverImage ||
      "https://placehold.co/1600x900/111/333?text=Player+Action+Shot",
    stats: player.stats || {
      gamesPlayed: 0,
      pointsPerGame: 0,
      reboundsPerGame: 0,
      assistsPerGame: 0,
      stealsPerGame: 0,
      blocksPerGame: 0,
      fieldGoalPercentage: 0,
      threePointPercentage: 0,
      freeThrowPercentage: 0,
      minutesPerGame: 0,
      plusMinus: 0,
      efficiency: 0,
    },
    recentGames: player.recentGames || [],
    bio:
      player.bio || `${player.name} is a player for the Etros basketball team.`,
    highlights: player.highlights || [],
    gallery: player.gallery || [
      "https://placehold.co/800x600/111/333?text=No+Images+Available",
    ],
    socialMedia: player.socialMedia || {
      twitter: "#",
      instagram: "#",
      facebook: "#",
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section with player image and basic info */}
      <div className="w-full h-96 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
        <img
          src={playerData.coverImage}
          alt={`${playerData.name} action shot`}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute bottom-0 left-0 right-0 p-8 z-20 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end md:items-center">
            <div className="md:mr-8 mb-4 md:mb-0 w-28 h-28 md:w-36 md:h-36 bg-gray-800 rounded-full border-4 border-yellow-400 overflow-hidden">
              <img
                src={playerData.image}
                alt={playerData.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-baseline">
                <h1 className="text-3xl md:text-5xl font-bold text-white">
                  {playerData.name}
                </h1>
                <span className="ml-3 text-2xl md:text-3xl font-bold text-yellow-400">
                  #{playerData.number}
                </span>
              </div>
              <p className="text-xl text-gray-300 mt-1">
                {playerData.position}
              </p>
              <div className="flex mt-3 space-x-4">
                {Object.entries(playerData.socialMedia).map(
                  ([platform, url]) => (
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
                    </a>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row">
          {/* Left column - personal info */}
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
                        {playerData.height || "N/A"}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 text-gray-500 font-medium">Weight</th>
                      <td className="py-3 font-semibold text-gray-800">
                        {playerData.weight ? `${playerData.weight} lbs` : "N/A"}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 text-gray-500 font-medium">Age</th>
                      <td className="py-3 font-semibold text-gray-800">
                        {playerData.age}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 text-gray-500 font-medium">Born</th>
                      <td className="py-3 font-semibold text-gray-800">
                        {playerData.birthDate}
                        <br />
                        <span className="text-sm font-normal text-gray-500">
                          {playerData.birthplace}
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 text-gray-500 font-medium">
                        College
                      </th>
                      <td className="py-3 font-semibold text-gray-800">
                        {playerData.college}
                      </td>
                    </tr>
                    <tr>
                      <th className="py-3 text-gray-500 font-medium">
                        Experience
                      </th>
                      <td className="py-3 font-semibold text-gray-800">
                        {playerData.yearsWithTeam}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {playerData.highlights.length > 0 && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <div className="bg-black py-3 px-4">
                  <h2 className="text-white font-bold text-lg">
                    Career Highlights
                  </h2>
                  <div className="w-16 h-1 bg-yellow-400 mt-1"></div>
                </div>
                <div className="p-5">
                  <ul className="space-y-3">
                    {playerData.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Right column - statistics, bio, etc. */}
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
                  <button
                    onClick={() => handleTabChange("bio")}
                    className={`px-6 py-4 text-sm font-medium transition-colors ${
                      activeTab === "bio"
                        ? "border-b-2 border-yellow-500 text-yellow-600 bg-gray-50"
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Biography
                  </button>
                  {playerData.gallery.length > 0 && (
                    <button
                      onClick={() => handleTabChange("gallery")}
                      className={`px-6 py-4 text-sm font-medium transition-colors ${
                        activeTab === "gallery"
                          ? "border-b-2 border-yellow-500 text-yellow-600 bg-gray-50"
                          : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      Gallery
                    </button>
                  )}
                </nav>
              </div>

              {/* Tab content */}
              <div className="p-6">
                {/* Statistics Tab */}
                {activeTab === "stats" && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                      Season Statistics
                    </h2>

                    {/* Key stats grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <div className="text-3xl font-bold text-yellow-500">
                          {playerData.stats.pointsPerGame}
                        </div>
                        <div className="text-sm font-medium text-gray-500 uppercase">
                          PPG
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <div className="text-3xl font-bold text-yellow-500">
                          {playerData.stats.assistsPerGame}
                        </div>
                        <div className="text-sm font-medium text-gray-500 uppercase">
                          APG
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <div className="text-3xl font-bold text-yellow-500">
                          {playerData.stats.reboundsPerGame}
                        </div>
                        <div className="text-sm font-medium text-gray-500 uppercase">
                          RPG
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <div className="text-3xl font-bold text-yellow-500">
                          {playerData.stats.efficiency}
                        </div>
                        <div className="text-sm font-medium text-gray-500 uppercase">
                          EFF
                        </div>
                      </div>
                    </div>

                    {/* Detailed stats */}
                    <div className="bg-gray-50 rounded-lg p-5 mb-8">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Detailed Statistics
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Games Played</p>
                          <p className="text-lg font-semibold">
                            {playerData.stats.gamesPlayed}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            Minutes Per Game
                          </p>
                          <p className="text-lg font-semibold">
                            {playerData.stats.minutesPerGame}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Field Goal %</p>
                          <p className="text-lg font-semibold">
                            {playerData.stats.fieldGoalPercentage * 100}%
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">3PT %</p>
                          <p className="text-lg font-semibold">
                            {playerData.stats.threePointPercentage * 100}%
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Free Throw %</p>
                          <p className="text-lg font-semibold">
                            {playerData.stats.freeThrowPercentage * 100}%
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            Steals Per Game
                          </p>
                          <p className="text-lg font-semibold">
                            {playerData.stats.stealsPerGame}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            Blocks Per Game
                          </p>
                          <p className="text-lg font-semibold">
                            {playerData.stats.blocksPerGame}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Plus/Minus</p>
                          <p className="text-lg font-semibold">
                            {playerData.stats.plusMinus > 0
                              ? `+${playerData.stats.plusMinus}`
                              : playerData.stats.plusMinus}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Recent Games */}
                    {playerData.recentGames.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                          Recent Games
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Date
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Opponent
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  PTS
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
                                  Result
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {playerData.recentGames.map((game, index) => (
                                <tr key={index}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {formatDate(game.date)}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {game.opponent}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {game.points}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {game.rebounds}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {game.assists}
                                  </td>
                                  <td
                                    className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                                      game.result === "W"
                                        ? "text-green-600"
                                        : "text-red-600"
                                    }`}
                                  >
                                    {game.result}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Biography Tab */}
                {activeTab === "bio" && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                      Player Biography
                    </h2>
                    {typeof playerData.bio === "string" &&
                      playerData.bio.split("\n\n").map((paragraph, index) => (
                        <p
                          key={index}
                          className="mb-4 text-gray-700 leading-relaxed"
                        >
                          {paragraph}
                        </p>
                      ))}
                  </div>
                )}

                {/* Gallery Tab */}
                {activeTab === "gallery" && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                      Player Gallery
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {playerData.gallery.map((image, index) => (
                        <div
                          key={index}
                          className="overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
                        >
                          <img
                            src={image}
                            alt={`${playerData.name} - Image ${index + 1}`}
                            className="w-full h-60 object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-purple-900 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Want to see {playerData.name} in action?
          </h2>
          <p className="text-purple-200 mb-6">
            Get your tickets for the next home game!
          </p>
          <Link
            to="/schedule"
            className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-8 rounded-lg transition-colors duration-200 shadow-md"
          >
            View Schedule & Buy Tickets
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PlayerDetailsPage;
