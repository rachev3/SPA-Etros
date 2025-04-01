import React, { useState } from "react";
import { useParams, Link } from "react-router";
import { usePlayer } from "../../api/playerApi";

const PlayerDetailsPage = () => {
  const { id } = useParams();
  const { player, loading, error } = usePlayer(id);
  const [activeTab, setActiveTab] = useState("bio");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full h-96 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
        <img
          src={
            player.coverImage ||
            "https://placehold.co/1600x900/111/333?text=Player+Action+Shot"
          }
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
                {Object.entries(player.socialMedia || {}).map(
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
                        {player.height || "N/A"}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 text-gray-500 font-medium">Weight</th>
                      <td className="py-3 font-semibold text-gray-800">
                        {player.weight ? `${player.weight} lbs` : "N/A"}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 text-gray-500 font-medium">Age</th>
                      <td className="py-3 font-semibold text-gray-800">
                        {new Date().getFullYear() - player.bornYear}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 text-gray-500 font-medium">Born</th>
                      <td className="py-3 font-semibold text-gray-800">
                        {player.bornYear}
                        <br />
                        <span className="text-sm font-normal text-gray-500">
                          {player.birthplace || "Information not available"}
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 text-gray-500 font-medium">
                        College
                      </th>
                      <td className="py-3 font-semibold text-gray-800">
                        {player.college || "Information not available"}
                      </td>
                    </tr>
                    <tr>
                      <th className="py-3 text-gray-500 font-medium">
                        Experience
                      </th>
                      <td className="py-3 font-semibold text-gray-800">
                        {player.yearsWithTeam || "N/A"}
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
                    onClick={() => handleTabChange("bio")}
                    className={`px-6 py-4 text-sm font-medium transition-colors ${
                      activeTab === "bio"
                        ? "border-b-2 border-yellow-500 text-yellow-600 bg-gray-50"
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Biography
                  </button>
                </nav>
              </div>

              <div className="p-6">
                {activeTab === "bio" && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                      Player Biography
                    </h2>
                    {typeof player.bio === "string" &&
                      player.bio.split("\n\n").map((paragraph, index) => (
                        <p
                          key={index}
                          className="mb-4 text-gray-700 leading-relaxed"
                        >
                          {paragraph}
                        </p>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-purple-900 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Want to see {player.name} in action?
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
