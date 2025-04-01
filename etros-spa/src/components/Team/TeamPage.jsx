import React from "react";
import PlayersSection from "./PlayerSection";
import CoachesSection from "./CoachesSection";

const TeamPage = () => {
  return (
    <div className="bg-white">
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
      <PlayersSection />

      <CoachesSection />
    </div>
  );
};

export default TeamPage;
