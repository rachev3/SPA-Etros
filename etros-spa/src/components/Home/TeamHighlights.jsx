import React from "react";

const TeamHighlights = () => {
  return (
    <section className="py-16 px-4 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-2 text-center">Team Highlights</h2>
        <div className="w-20 h-1 bg-yellow-400 mx-auto mb-12"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Highlight 1 */}
          <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
            <div className="aspect-video relative">
              <img
                src="https://placehold.co/600x400/111/333?text=Highlights"
                alt="Season Highlights"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-yellow-500 hover:bg-yellow-400 text-black rounded-full w-16 h-16 flex items-center justify-center transition-colors duration-200 shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-semibold text-yellow-400">
                Season Highlights
              </h3>
              <p className="text-gray-400 mt-2">
                Watch the best moments from our championship season
              </p>
            </div>
          </div>

          {/* Highlight 2 */}
          <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
            <div className="aspect-video relative">
              <img
                src="https://placehold.co/600x400/111/333?text=Interviews"
                alt="Player Interviews"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-yellow-500 hover:bg-yellow-400 text-black rounded-full w-16 h-16 flex items-center justify-center transition-colors duration-200 shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-semibold text-yellow-400">
                Player Interviews
              </h3>
              <p className="text-gray-400 mt-2">
                Exclusive interviews with our star players
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamHighlights;
