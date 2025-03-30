import React, { useState } from "react";
import { useMatches } from "../../api/matchApi";
import { formatLongDate } from "../../utils/dateUtils";

const SchedulePage = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [currentPage, setCurrentPage] = useState(1);
  const matchesPerPage = 5;

  const { matches, loading, error, pagination } = useMatches(
    currentPage,
    matchesPerPage
  );

  // Filter matches based on the active tab
  const filteredMatches = matches.filter((match) => {
    const isUpcoming = new Date(match.date) > new Date();
    return activeTab === "upcoming" ? isUpcoming : !isUpcoming;
  });

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
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
          </div>

          {/* Matches Content */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 bg-black">
              <h2 className="text-2xl font-bold text-yellow-400">
                {activeTab === "upcoming" ? "Upcoming Games" : "Past Results"}
              </h2>
            </div>
            <div>
              {filteredMatches.length > 0 ? (
                filteredMatches.map((match) => (
                  <div
                    key={match._id}
                    className="p-6 flex flex-col md:flex-row justify-between items-center border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0">
                      <div className="text-center md:text-left md:mr-8 mb-4 md:mb-0">
                        <div className="text-sm text-gray-500">
                          {formatLongDate(match.date)}
                        </div>
                        <div className="text-lg font-bold">{match.time}</div>
                      </div>
                      <div className="text-center md:text-left">
                        <div className="text-xl font-bold mb-1">
                          {match.isHome ? "Etros vs " : "Etros at "}{" "}
                          {match.opponent}
                        </div>
                        <div className="text-gray-600">
                          {match.location}
                          {match.isHome && (
                            <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded">
                              HOME
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      {activeTab === "upcoming" ? (
                        <>
                          <button className="bg-black hover:bg-gray-900 text-white py-2 px-4 rounded transition-colors duration-200 text-sm">
                            Buy Tickets
                          </button>
                          <button className="bg-yellow-500 hover:bg-yellow-400 text-black py-2 px-4 rounded transition-colors duration-200 text-sm">
                            Game Details
                          </button>
                        </>
                      ) : (
                        <button className="bg-black hover:bg-gray-900 text-white py-2 px-4 rounded transition-colors duration-200 text-sm">
                          Game Recap
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-gray-500">
                  No {activeTab === "upcoming" ? "upcoming" : "past"} matches
                  found.
                </div>
              )}
            </div>
          </div>

          {/* Pagination Controls */}
          {pagination.totalPages > 1 && (
            <div className="mt-8 flex justify-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-yellow-500 text-black hover:bg-yellow-600"
                }`}
              >
                Previous
              </button>

              <div className="flex space-x-1">
                {[...Array(pagination.totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === index + 1
                        ? "bg-yellow-500 text-black"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === pagination.totalPages}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === pagination.totalPages
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-yellow-500 text-black hover:bg-yellow-600"
                }`}
              >
                Next
              </button>
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
