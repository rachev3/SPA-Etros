import { Link } from "react-router";

import React from "react";
import LatestNews from "./LatestNews";
import UpcomingMatches from "./UpcomingMatches";
import TeamVideos from "./TeamVideos";
import Sponsors from "./Sponsors";

const HomePage = () => {
  return (
    <>
      <section
        className="relative h-[600px] md:h-[700px] bg-cover bg-center bg-no-repeat mt-[-1px]"
        style={{
          backgroundImage: "url('/main.jpg')",
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
            <Link
              to="/schedule"
              className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-8 rounded transition-colors duration-200 shadow-lg"
            >
              View Schedule
            </Link>
          </div>
        </div>
      </section>

      <LatestNews />

      <TeamVideos />

      <UpcomingMatches />

      <Sponsors />
    </>
  );
};

export default HomePage;
