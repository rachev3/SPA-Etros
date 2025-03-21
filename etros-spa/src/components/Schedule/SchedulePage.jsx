import React, { useState } from "react";

const SchedulePage = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  // Mock data for upcoming games
  const upcomingGames = [
    {
      id: 1,
      opponent: "Phoenix Suns",
      date: "2023-08-12",
      time: "19:30",
      location: "Etros Arena",
      isHome: true,
    },
    {
      id: 2,
      opponent: "LA Lakers",
      date: "2023-08-18",
      time: "20:00",
      location: "Staples Center",
      isHome: false,
    },
    {
      id: 3,
      opponent: "Miami Heat",
      date: "2023-08-25",
      time: "19:00",
      location: "Etros Arena",
      isHome: true,
    },
    {
      id: 4,
      opponent: "Brooklyn Nets",
      date: "2023-09-02",
      time: "18:30",
      location: "Barclays Center",
      isHome: false,
    },
    {
      id: 5,
      opponent: "Chicago Bulls",
      date: "2023-09-10",
      time: "19:30",
      location: "Etros Arena",
      isHome: true,
    },
  ];

  // Mock data for past results
  const pastResults = [
    {
      id: 1,
      opponent: "Boston Celtics",
      date: "2023-07-15",
      result: "W 102-98",
      location: "TD Garden",
      isHome: false,
    },
    {
      id: 2,
      opponent: "Golden State Warriors",
      date: "2023-07-08",
      result: "L 95-105",
      location: "Etros Arena",
      isHome: true,
    },
    {
      id: 3,
      opponent: "Dallas Mavericks",
      date: "2023-06-30",
      result: "W 112-104",
      location: "Etros Arena",
      isHome: true,
    },
    {
      id: 4,
      opponent: "Toronto Raptors",
      date: "2023-06-23",
      result: "W 99-92",
      location: "Scotiabank Arena",
      isHome: false,
    },
    {
      id: 5,
      opponent: "Milwaukee Bucks",
      date: "2023-06-16",
      result: "L 88-97",
      location: "Fiserv Forum",
      isHome: false,
    },
  ];

  // Mock data for full season schedule
  const seasonSchedule = [
    { month: "August 2023", games: upcomingGames },
    {
      month: "September 2023",
      games: [
        {
          id: 6,
          opponent: "Denver Nuggets",
          date: "2023-09-18",
          time: "19:00",
          location: "Ball Arena",
          isHome: false,
        },
        {
          id: 7,
          opponent: "Utah Jazz",
          date: "2023-09-24",
          time: "18:30",
          location: "Etros Arena",
          isHome: true,
        },
      ],
    },
    {
      month: "October 2023",
      games: [
        {
          id: 8,
          opponent: "Memphis Grizzlies",
          date: "2023-10-05",
          time: "19:30",
          location: "Etros Arena",
          isHome: true,
        },
        {
          id: 9,
          opponent: "Philadelphia 76ers",
          date: "2023-10-12",
          time: "20:00",
          location: "Wells Fargo Center",
          isHome: false,
        },
        {
          id: 10,
          opponent: "New York Knicks",
          date: "2023-10-19",
          time: "19:00",
          location: "Etros Arena",
          isHome: true,
        },
      ],
    },
  ];

  // Format date as Month Day, Year
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white">
      {/* Hero section */}
      <section className="bg-black py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            <span className="text-yellow-400">Season</span> Schedule
          </h1>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mb-8"></div>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg">
            Follow Etros Basketball throughout the season with our complete game
            schedule and results.
          </p>
        </div>
      </section>

      {/* Schedule Tabs Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex border-b border-gray-200 mb-8">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`py-3 px-6 font-medium text-lg transition-colors duration-200 border-b-2 -mb-px ${
                activeTab === "upcoming"
                  ? "border-yellow-500 text-black"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Upcoming Games
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`py-3 px-6 font-medium text-lg transition-colors duration-200 border-b-2 -mb-px ${
                activeTab === "past"
                  ? "border-yellow-500 text-black"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Past Results
            </button>
            <button
              onClick={() => setActiveTab("season")}
              className={`py-3 px-6 font-medium text-lg transition-colors duration-200 border-b-2 -mb-px ${
                activeTab === "season"
                  ? "border-yellow-500 text-black"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Full Season
            </button>
          </div>

          {/* Upcoming Games Tab Content */}
          {activeTab === "upcoming" && (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 bg-black">
                <h2 className="text-2xl font-bold text-yellow-400">
                  Upcoming Games
                </h2>
              </div>
              <div>
                {upcomingGames.map((game) => (
                  <div
                    key={game.id}
                    className="p-6 flex flex-col md:flex-row justify-between items-center border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0">
                      <div className="text-center md:text-left md:mr-8 mb-4 md:mb-0">
                        <div className="text-sm text-gray-500">
                          {formatDate(game.date)}
                        </div>
                        <div className="text-lg font-bold">{game.time}</div>
                      </div>
                      <div className="text-center md:text-left">
                        <div className="text-xl font-bold mb-1">
                          {game.isHome ? "Etros vs " : "Etros at "}{" "}
                          {game.opponent}
                        </div>
                        <div className="text-gray-600">
                          {game.location}{" "}
                          {game.isHome && (
                            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded">
                              HOME
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button className="bg-black hover:bg-gray-900 text-white py-2 px-4 rounded transition-colors duration-200 text-sm">
                        Buy Tickets
                      </button>
                      <button className="bg-yellow-500 hover:bg-yellow-400 text-black py-2 px-4 rounded transition-colors duration-200 text-sm">
                        Game Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Past Results Tab Content */}
          {activeTab === "past" && (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 bg-black">
                <h2 className="text-2xl font-bold text-yellow-400">
                  Past Results
                </h2>
              </div>
              <div>
                {pastResults.map((game) => (
                  <div
                    key={game.id}
                    className="p-6 flex flex-col md:flex-row justify-between items-center border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0">
                      <div className="text-center md:text-left md:mr-8 mb-4 md:mb-0">
                        <div className="text-sm text-gray-500">
                          {formatDate(game.date)}
                        </div>
                        <div
                          className={`text-lg font-bold ${
                            game.result.startsWith("W")
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {game.result}
                        </div>
                      </div>
                      <div className="text-center md:text-left">
                        <div className="text-xl font-bold mb-1">
                          {game.isHome ? "Etros vs " : "Etros at "}{" "}
                          {game.opponent}
                        </div>
                        <div className="text-gray-600">
                          {game.location}{" "}
                          {game.isHome && (
                            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded">
                              HOME
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <button className="bg-black hover:bg-gray-900 text-white py-2 px-4 rounded transition-colors duration-200 text-sm">
                        Game Recap
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Full Season Schedule Tab Content */}
          {activeTab === "season" && (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 bg-black">
                <h2 className="text-2xl font-bold text-yellow-400">
                  2023-2024 Season Schedule
                </h2>
              </div>
              {seasonSchedule.map((monthData, index) => (
                <div key={index}>
                  <div className="p-4 bg-purple-900 text-white font-bold">
                    {monthData.month}
                  </div>
                  {monthData.games.map((game) => (
                    <div
                      key={game.id}
                      className="p-6 flex flex-col md:flex-row justify-between items-center border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0">
                        <div className="text-center md:text-left md:mr-8 mb-4 md:mb-0">
                          <div className="text-sm text-gray-500">
                            {formatDate(game.date)}
                          </div>
                          <div className="text-lg font-bold">{game.time}</div>
                        </div>
                        <div className="text-center md:text-left">
                          <div className="text-xl font-bold mb-1">
                            {game.isHome ? "Etros vs " : "Etros at "}{" "}
                            {game.opponent}
                          </div>
                          <div className="text-gray-600">
                            {game.location}{" "}
                            {game.isHome && (
                              <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded">
                                HOME
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <button className="bg-black hover:bg-gray-900 text-white py-2 px-4 rounded transition-colors duration-200 text-sm">
                          {new Date(game.date) < new Date()
                            ? "Game Recap"
                            : "Buy Tickets"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Calendar Download Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-purple-900 to-black text-white">
        <div className="max-w-5xl mx-auto rounded-lg bg-black bg-opacity-50 p-8 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h2 className="text-2xl font-bold mb-2">Never Miss a Game</h2>
              <p className="text-gray-300">
                Download our season schedule to your calendar and stay updated
                with all Etros Basketball games.
              </p>
            </div>
            <div className="flex flex-col space-y-3">
              <button className="bg-yellow-500 hover:bg-yellow-400 text-black py-3 px-6 rounded-lg transition-colors duration-200 font-bold flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Add to Calendar
              </button>
              <button className="bg-white hover:bg-gray-100 text-black py-3 px-6 rounded-lg transition-colors duration-200 font-bold flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Venue Information */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center">Our Venue</h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mb-12"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://placehold.co/800x500/111/333?text=Etros+Arena"
                alt="Etros Arena"
                className="w-full h-auto"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4">Etros Arena</h3>
              <div className="mb-6">
                <p className="text-gray-700 mb-4">
                  Experience the excitement of Etros Basketball at our
                  state-of-the-art arena located in the heart of the city.
                </p>
                <p className="text-gray-700 mb-4">
                  Our 18,000-seat venue offers excellent sightlines from every
                  seat, premium food and beverage options, and an electric
                  atmosphere for every home game.
                </p>
              </div>

              <div className="bg-gray-100 p-6 rounded-lg">
                <h4 className="font-bold text-lg mb-2">Location & Parking</h4>
                <p className="text-gray-700 mb-2">
                  123 Main Street, Veliko Tarnovo, Bulgaria
                </p>
                <p className="text-gray-700 mb-4">
                  Convenient parking available in adjacent garages and lots.
                </p>

                <button className="bg-black hover:bg-gray-900 text-white py-2 px-4 rounded transition-colors duration-200 text-sm flex items-center mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Get Directions
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SchedulePage;
