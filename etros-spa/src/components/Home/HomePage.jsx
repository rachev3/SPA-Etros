import { Link } from "react-router";

import React from "react";
import LatestNews from "./LatestNews";
import UpcomingMatches from "./UpcomingMatches";
import TeamHighlights from "./TeamHighlights";
import Sponsors from "./Sponsors";

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <section
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://placehold.co/1600x900/111/333?text=ETROS+BASKETBALL')",
        }}
      >
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center text-white p-4">
            <h1 className="text-5xl font-bold mb-4 text-white">
              <span className="text-yellow-400">ETROS</span> BASKETBALL
            </h1>
            <p className="text-xl mb-8 tracking-wider text-gray-200">
              Where Legends Are Made
            </p>
            <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-8 rounded transition-colors duration-200 shadow-lg">
              <Link to="/schedule">View Schedule</Link>
            </button>
          </div>
        </div>
      </section>

      <LatestNews />

      <TeamHighlights />

      <UpcomingMatches />

      <Sponsors />
    </>
  );
};

export default HomePage;
