import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router";

const PlayerDetailsPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("stats");

  // Mock data for a player - in a real app this would be fetched based on the ID
  const [player, setPlayer] = useState({
    id: id || "1",
    name: "Marcus Williams",
    number: 23,
    position: "Point Guard",
    height: "6'3\"",
    weight: "185 lbs",
    age: 26,
    birthDate: "July 15, 1997",
    birthplace: "Los Angeles, CA",
    college: "University of Kentucky",
    yearsWithTeam: 4,
    image: "https://placehold.co/600x800/111/333?text=Player+23",
    coverImage: "https://placehold.co/1600x900/111/333?text=Player+Action+Shot",
    stats: {
      gamesPlayed: 82,
      pointsPerGame: 18.7,
      reboundsPerGame: 4.2,
      assistsPerGame: 7.3,
      stealsPerGame: 1.8,
      blocksPerGame: 0.5,
      fieldGoalPercentage: 0.45,
      threePointPercentage: 0.38,
      freeThrowPercentage: 0.88,
      minutesPerGame: 32.5,
      plusMinus: 6.2,
      efficiency: 21.3,
    },
    recentGames: [
      {
        date: "2023-11-12",
        opponent: "Chicago Bulls",
        points: 24,
        rebounds: 5,
        assists: 8,
        result: "W",
      },
      {
        date: "2023-11-10",
        opponent: "LA Lakers",
        points: 18,
        rebounds: 3,
        assists: 10,
        result: "L",
      },
      {
        date: "2023-11-08",
        opponent: "Boston Celtics",
        points: 22,
        rebounds: 4,
        assists: 6,
        result: "W",
      },
      {
        date: "2023-11-05",
        opponent: "Miami Heat",
        points: 15,
        rebounds: 6,
        assists: 9,
        result: "W",
      },
      {
        date: "2023-11-03",
        opponent: "Dallas Mavericks",
        points: 26,
        rebounds: 3,
        assists: 7,
        result: "L",
      },
    ],
    bio: `Marcus Williams is a dynamic point guard known for his exceptional court vision and scoring ability. Born and raised in Los Angeles, Williams developed his skills playing in competitive youth leagues throughout Southern California.

During his college career at the University of Kentucky, Williams emerged as one of the nation's top point guards, earning All-American honors in his junior year before declaring for the draft. His ability to control the pace of the game and make split-second decisions caught the attention of Etros scouts.

Since joining Etros Basketball, Williams has established himself as the team's floor general and a fan favorite. His leadership both on and off the court has been instrumental in the team's recent success, including the 2023 National Championship.

Williams is heavily involved in community initiatives, particularly those focused on youth basketball development. He hosts an annual basketball camp for underprivileged children and has established a foundation that provides educational scholarships to deserving students.`,
    highlights: [
      "All-Star selection (2021, 2022, 2023)",
      "Bulgarian League Assist Leader (2022)",
      "Team Captain (since 2022)",
      "Bulgarian National Team player",
      "2023 National Championship MVP",
    ],
    gallery: [
      "https://placehold.co/800x600/111/333?text=Action+Shot+1",
      "https://placehold.co/800x600/111/333?text=Action+Shot+2",
      "https://placehold.co/800x600/111/333?text=Action+Shot+3",
      "https://placehold.co/800x600/111/333?text=Team+Photo",
      "https://placehold.co/800x600/111/333?text=Community+Event",
      "https://placehold.co/800x600/111/333?text=Award+Ceremony",
    ],
    socialMedia: {
      twitter: "https://twitter.com",
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
    },
  });

  // In a real app, you'd fetch the player data based on the ID
  useEffect(() => {
    // Simulating data loading
    console.log(`Fetching data for player with ID: ${id}`);
    // In a real app: fetchPlayerData(id).then(data => setPlayer(data));
  }, [id]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section with player image and basic info */}
      <div className="w-full h-96 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
        <img
          src={player.coverImage}
          alt={`${player.name} action shot`}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute bottom-0 left-0 right-0 p-8 z-20 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end md:items-center">
            <div className="md:mr-8 mb-4 md:mb-0 w-28 h-28 md:w-36 md:h-36 bg-gray-800 rounded-full border-4 border-yellow-400 overflow-hidden">
              <img
                src={player.image}
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
              <p className="text-xl text-gray-300 mt-1">{player.position}</p>
              <div className="flex mt-3 space-x-4">
                {Object.entries(player.socialMedia).map(([platform, url]) => (
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
                ))}
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
                        {player.height}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 text-gray-500 font-medium">Weight</th>
                      <td className="py-3 font-semibold text-gray-800">
                        {player.weight}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 text-gray-500 font-medium">Age</th>
                      <td className="py-3 font-semibold text-gray-800">
                        {player.age}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 text-gray-500 font-medium">Born</th>
                      <td className="py-3 font-semibold text-gray-800">
                        {player.birthDate}
                        <br />
                        <span className="text-sm font-normal text-gray-500">
                          {player.birthplace}
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 text-gray-500 font-medium">
                        College
                      </th>
                      <td className="py-3 font-semibold text-gray-800">
                        {player.college}
                      </td>
                    </tr>
                    <tr>
                      <th className="py-3 text-gray-500 font-medium">
                        Experience
                      </th>
                      <td className="py-3 font-semibold text-gray-800">
                        {player.yearsWithTeam} seasons
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="bg-black py-3 px-4">
                <h2 className="text-white font-bold text-lg">
                  Career Highlights
                </h2>
                <div className="w-16 h-1 bg-yellow-400 mt-1"></div>
              </div>
              <div className="p-5">
                <ul className="space-y-3">
                  {player.highlights.map((highlight, index) => (
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
                </nav>
              </div>

              {/* Tab content */}
              <div className="p-6">
                {/* Statistics Tab */}
                {activeTab === "stats" && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                      2023-24 Season Statistics
                    </h2>

                    {/* Key stats grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <div className="text-3xl font-bold text-yellow-500">
                          {player.stats.pointsPerGame}
                        </div>
                        <div className="text-sm font-medium text-gray-500 uppercase">
                          PPG
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <div className="text-3xl font-bold text-yellow-500">
                          {player.stats.assistsPerGame}
                        </div>
                        <div className="text-sm font-medium text-gray-500 uppercase">
                          APG
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <div className="text-3xl font-bold text-yellow-500">
                          {player.stats.reboundsPerGame}
                        </div>
                        <div className="text-sm font-medium text-gray-500 uppercase">
                          RPG
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <div className="text-3xl font-bold text-yellow-500">
                          {player.stats.efficiency}
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
                            {player.stats.gamesPlayed}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            Minutes Per Game
                          </p>
                          <p className="text-lg font-semibold">
                            {player.stats.minutesPerGame}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Field Goal %</p>
                          <p className="text-lg font-semibold">
                            {player.stats.fieldGoalPercentage * 100}%
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">3PT %</p>
                          <p className="text-lg font-semibold">
                            {player.stats.threePointPercentage * 100}%
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Free Throw %</p>
                          <p className="text-lg font-semibold">
                            {player.stats.freeThrowPercentage * 100}%
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            Steals Per Game
                          </p>
                          <p className="text-lg font-semibold">
                            {player.stats.stealsPerGame}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            Blocks Per Game
                          </p>
                          <p className="text-lg font-semibold">
                            {player.stats.blocksPerGame}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Plus/Minus</p>
                          <p className="text-lg font-semibold">
                            {player.stats.plusMinus > 0
                              ? `+${player.stats.plusMinus}`
                              : player.stats.plusMinus}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Recent Games */}
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
                            {player.recentGames.map((game, index) => (
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
                  </div>
                )}

                {/* Biography Tab */}
                {activeTab === "bio" && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                      Player Biography
                    </h2>
                    {player.bio.split("\n\n").map((paragraph, index) => (
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
                      {player.gallery.map((image, index) => (
                        <div
                          key={index}
                          className="overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
                        >
                          <img
                            src={image}
                            alt={`${player.name} - Image ${index + 1}`}
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
