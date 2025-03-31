import React from "react";
import PlayersSection from "./PlayerSection";
import CoachesSection from "./CoachesSection";

const TeamPage = () => {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <section className="bg-black py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            Meet <span className="text-yellow-400">The Team</span>
          </h1>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mb-8"></div>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg">
            Our roster of talented players and experienced coaching staff are
            dedicated to achieving excellence on and off the court.
          </p>
        </div>
      </section>

      {/* Team Stats Section
      <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center">
            Team Statistics
          </h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mb-12"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-5xl font-bold text-yellow-500 mb-2">
                92.8
              </div>
              <div className="text-gray-600 font-medium uppercase tracking-wider text-sm">
                Points Per Game
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-5xl font-bold text-yellow-500 mb-2">
                43.2
              </div>
              <div className="text-gray-600 font-medium uppercase tracking-wider text-sm">
                Rebounds Per Game
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-5xl font-bold text-yellow-500 mb-2">
                22.5
              </div>
              <div className="text-gray-600 font-medium uppercase tracking-wider text-sm">
                Assists Per Game
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-5xl font-bold text-yellow-500 mb-2">7.3</div>
              <div className="text-gray-600 font-medium uppercase tracking-wider text-sm">
                Steals Per Game
              </div>
            </div>
          </div>

          <div className="mt-12 bg-black rounded-lg overflow-hidden shadow-lg">
            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold text-yellow-400 mb-1">
                2022-2023 Season
              </h3>
              <p className="text-gray-300">
                Regular Season Record: 42-18 | Playoff Record: 16-4
              </p>
            </div>
          </div>
        </div>
      </section> */}

      <PlayersSection />

      <CoachesSection />
    </div>
  );
};

export default TeamPage;
