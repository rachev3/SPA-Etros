import React from "react";
import ScheduleTabs from "./ScheduleTabs";
import StayInLoopSection from "./StayInLoopSection";
import VenueInfo from "./VenueInfo";

const SchedulePage = () => {
  return (
    <div className="bg-white">
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

      <ScheduleTabs />
      <StayInLoopSection />
      <VenueInfo />
    </div>
  );
};

export default SchedulePage;
